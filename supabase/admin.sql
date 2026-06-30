-- xemiy Admin — Projects & CMS — Run in Supabase SQL Editor

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  long_description text,
  category text not null,
  client text,
  year int not null default extract(year from now()),
  software text[] default '{}',
  tags text[] default '{}',
  cover_image text,
  gallery_images jsonb default '[]',
  before_image text,
  after_image text,
  featured boolean not null default false,
  size text not null default 'medium' check (size in ('short', 'medium', 'tall', 'wide')),
  likes_seed int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_slug_idx on public.projects (slug);
create index if not exists projects_featured_idx on public.projects (featured) where featured = true;
create index if not exists projects_category_idx on public.projects (category);
create index if not exists projects_published_idx on public.projects (published);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- RLS: public read published, service role full access
alter table public.projects enable row level security;

create policy "Public read published projects"
  on public.projects for select
  to anon, authenticated
  using (published = true);

create policy "Service role full access on projects"
  on public.projects for all
  to service_role
  using (true)
  with check (true);

-- Allow anon read all for admin API via service role only - public uses published policy
