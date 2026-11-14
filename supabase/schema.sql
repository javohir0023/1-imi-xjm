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
