insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-images',
  'site-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.media_assets (
  key text primary key,
  label text not null,
  fallback_path text not null,
  storage_path text,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

insert into public.media_assets (key, label, fallback_path) values
  ('favicon', 'Favicon del navegador', '/favicon.png'),
  ('logo', 'Logotipo principal', '/logo.png'),
  ('hero', 'Imagen principal', '/images/hero/hero_occupational.png'),
  ('team', 'Equipo Vigmedical', '/vigmedical_team.png'),
  ('about', 'Página Nosotros', '/about_team.png'),
  ('medical-training', 'Capacitación médica', '/medical_training.png'),
  ('sst-training', 'Capacitación SST', '/sst_training.png')
on conflict (key) do update set label = excluded.label, fallback_path = excluded.fallback_path;

alter table public.media_assets enable row level security;
revoke all on table public.media_assets from anon, authenticated;
grant all on table public.media_assets to service_role;

-- El bucket es público únicamente para lectura de las imágenes publicadas.
-- Las cargas y eliminaciones pasan por acciones servidor con service_role.
drop policy if exists "Public site images" on storage.objects;
create policy "Public site images" on storage.objects for select
  using (bucket_id = 'site-images');
