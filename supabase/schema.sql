-- Supabase > SQL Editor ga qo'yib "Run" bosing (bir marta).

create table if not exists public.applications (
  id           text primary key,
  student_name text not null,
  parent_name  text not null default '',
  phone        text not null,
  grade        text not null default '5-sinf',
  region       text not null default 'Urganch shahar',
  message      text not null default '',
  status       text not null default 'yangi',
  notes        text not null default '',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz
);

create table if not exists public.contact_messages (
  id         text primary key,
  name       text not null,
  email      text not null default '',
  phone      text not null default '',
  subject    text not null default '',
  message    text not null,
  status     text not null default 'yangi',
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create index if not exists applications_created_idx    on public.applications (created_at desc);
create index if not exists contact_messages_created_idx on public.contact_messages (created_at desc);

-- Xavfsizlik: RLS yoqiladi va hech qanday ommaviy policy berilmaydi.
-- Faqat server (SUPABASE_SERVICE_ROLE_KEY) bu jadvallarga kira oladi.
alter table public.applications     enable row level security;
alter table public.contact_messages enable row level security;

-- ===== Yangiliklar, o'qituvchilar, sinxron holati va rasmlar =====
create table if not exists public.news (
  id           text primary key,
  data         jsonb not null,
  status       text not null default 'published',
  published_at timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists public.teachers (
  id         integer primary key,
  data       jsonb not null,
  deleted    boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_kv (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

create index if not exists news_published_idx on public.news (published_at desc);

alter table public.news     enable row level security;
alter table public.teachers enable row level security;
alter table public.site_kv  enable row level security;

-- O'qituvchi rasmlari uchun ochiq (faqat o'qish) bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('teacher-photos', 'teacher-photos', true, 3145728, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
