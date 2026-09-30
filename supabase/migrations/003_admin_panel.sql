alter table public.contact_messages
  add column if not exists status text not null default 'NUEVO'
    check (status in ('NUEVO', 'EN_PROCESO', 'ATENDIDO')),
  add column if not exists handled_at timestamptz;

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);
create index if not exists contact_messages_status_idx
  on public.contact_messages (status);
create index if not exists complaints_created_at_idx
  on public.complaints (created_at desc);
create index if not exists complaints_status_idx
  on public.complaints (status);

-- El panel consulta mediante service_role después de verificar la sesión y el
-- rol en el servidor. No se concede acceso directo a usuarios del navegador.
revoke all on table public.contact_messages from anon, authenticated;
revoke all on table public.complaints from anon, authenticated;

-- Después de crear el usuario en Authentication > Users, reemplaza el correo:
-- update auth.users
-- set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
-- where email = 'admin@vigmedical.com';
