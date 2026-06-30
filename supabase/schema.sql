-- xemiy Booking System — Run in Supabase SQL Editor

-- Bookings table
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_type text not null check (booking_type in ('exact_design', 'new_project')),
  project_slug text,
  project_title text,
  name text not null,
  email text not null,
  phone text not null,
  country text not null,
  project_type text not null,
  budget text not null,
  deadline date,
  description text not null,
  preferred_style text not null,
  attachment_urls text[] default '{}',
  reference_image_urls text[] default '{}',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
create index if not exists bookings_email_idx on public.bookings (email);

-- RLS
alter table public.bookings enable row level security;

-- Allow anonymous inserts (form submissions)
create policy "Allow anonymous booking inserts"
  on public.bookings
  for insert
  to anon
  with check (true);

-- Storage bucket for uploads
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'booking-uploads',
  'booking-uploads',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'application/zip']
)
on conflict (id) do nothing;

-- Storage policies: allow anonymous upload to booking-uploads
create policy "Allow anonymous uploads"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'booking-uploads');

create policy "Allow anonymous read own uploads"
  on storage.objects
  for select
  to anon
  using (bucket_id = 'booking-uploads');
