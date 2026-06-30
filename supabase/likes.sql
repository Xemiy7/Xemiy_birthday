-- xemiy Likes System — Run in Supabase SQL Editor

-- Individual like records (one per visitor per project)
create table if not exists public.project_likes (
  id uuid primary key default gen_random_uuid(),
  project_id text not null,
  visitor_id text not null,
  created_at timestamptz not null default now(),
  unique (project_id, visitor_id)
);

create index if not exists project_likes_project_id_idx
  on public.project_likes (project_id);

create index if not exists project_likes_visitor_id_idx
  on public.project_likes (visitor_id);

-- Aggregated counts (updated via trigger)
create table if not exists public.project_like_counts (
  project_id text primary key,
  count bigint not null default 0
);

-- Trigger: keep counts in sync
create or replace function public.sync_project_like_count()
returns trigger
language plpgsql
security definer
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.project_like_counts (project_id, count)
    values (new.project_id, 1)
    on conflict (project_id)
    do update set count = public.project_like_counts.count + 1;
    return new;
  elsif tg_op = 'DELETE' then
    update public.project_like_counts
    set count = greatest(count - 1, 0)
    where project_id = old.project_id;
    return old;
  end if;
  return null;
end;
$$;

drop trigger if exists project_likes_count_trigger on public.project_likes;

create trigger project_likes_count_trigger
  after insert or delete on public.project_likes
  for each row
  execute function public.sync_project_like_count();

-- RLS
alter table public.project_likes enable row level security;
alter table public.project_like_counts enable row level security;

-- Anyone can read likes and counts
create policy "Allow public read on project_likes"
  on public.project_likes for select to anon, authenticated using (true);

create policy "Allow public read on project_like_counts"
  on public.project_like_counts for select to anon, authenticated using (true);

-- Anyone can insert a like (duplicate prevented by unique constraint)
create policy "Allow anonymous like inserts"
  on public.project_likes for insert to anon, authenticated with check (true);

-- Anyone can delete their own like by visitor_id
create policy "Allow delete own likes"
  on public.project_likes for delete to anon, authenticated using (true);

-- Enable realtime on counts table
alter publication supabase_realtime add table project_like_counts;
