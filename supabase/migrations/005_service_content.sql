create table if not exists public.service_content (
  id text primary key,
  title text not null check (char_length(title) between 3 and 160),
  description text not null check (char_length(description) between 10 and 2000),
  items jsonb not null default '[]'::jsonb check (jsonb_typeof(items) = 'array'),
  storage_path text,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

alter table public.service_content enable row level security;
revoke all on table public.service_content from anon, authenticated;
grant all on table public.service_content to service_role;
