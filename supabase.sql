create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  info text default '',
  status text not null default 'new' check (status in ('new','reviewed','accepted','rejected')),
  created_at timestamptz not null default now()
);

alter table public.applications enable row level security;
-- The website server uses the Supabase service-role key, so no public policy is needed.
