# Vigmedical

Sitio web corporativo construido con Next.js y Supabase.

## Configuración del formulario de contacto

El navegador envía el formulario únicamente a `POST /api/contact`. La Route
Handler valida el contenido, limita solicitudes mediante un contador distribuido
en Supabase asociado a un hash de la IP, verifica Cloudflare
Turnstile y guarda el mensaje con una clave privada del servidor. Nunca expongas
`SUPABASE_SERVICE_ROLE_KEY` con el prefijo `NEXT_PUBLIC_`.

1. Copia `.env.local.example` como `.env.local` y configura todos sus valores.
2. Ejecuta en Supabase `supabase/migrations/001_contact_messages_security.sql`.
3. Configura los mismos secretos en el proveedor de hosting.
4. Genera `RATE_LIMIT_SECRET` con al menos 32 caracteres aleatorios. Debe ser el
   mismo en todas las instancias de Vercel y nunca debe exponerse al navegador.
5. Como capa adicional, puedes habilitar reglas de firewall en Vercel para
   `/api/contact`.

Si `TURNSTILE_SECRET_KEY` no está configurada, el endpoint se mantiene utilizable
solo en desarrollo; en producción rechaza la validación CAPTCHA.

## Libro de Reclamaciones

Ejecuta también `supabase/migrations/002_complaints_book.sql`. La identidad legal
del proveedor se centraliza en `data/company.ts`; cualquier cambio registral debe
actualizarse allí para mantener consistentes todas las páginas y constancias.

## Panel administrativo

El panel está disponible en `/admin` y usa Supabase Auth. Las páginas y las
acciones verifican la sesión y el rol `admin` en el servidor antes de consultar
con la clave privada. Los usuarios autenticados no reciben acceso directo a las
tablas mediante RLS.

1. Ejecuta las migraciones `001`, `002`, `003`, `004` y `005` en orden desde el SQL Editor de
   Supabase.
2. En **Authentication > Users**, crea el primer usuario con correo y una
   contraseña robusta.
3. En el SQL Editor, asigna el rol reemplazando el correo:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
  || '{"role":"admin"}'::jsonb
where email = 'admin@vigmedical.com';
```

4. Copia la `anon key` del proyecto a `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Esta clave
   identifica al proyecto y puede estar en el navegador; la `service_role` debe
   permanecer únicamente en el servidor.
5. En producción configura las mismas variables en el hosting y entra en
   `https://tu-dominio/admin/login`.

Para revocar acceso, elimina el usuario o quita `role: admin` de
`raw_app_meta_data`. No habilites el registro público de administradores.

### Biblioteca de imágenes

La sección **Imágenes** del panel permite reemplazar el logotipo, imagen principal,
fotografías institucionales y fotografías de servicios/capacitaciones. La migración
`004_media_library.sql` crea el bucket público `site-images` y el catálogo de medios.
Las cargas están limitadas a administradores, formatos JPG/PNG/WebP/AVIF y 5 MB.
Si Supabase aún no está configurado, el sitio conserva automáticamente las imágenes
locales como respaldo.

### Contenido de servicios

La sección **Servicios** permite modificar individualmente el título, descripción,
alcances y fotografía de cada servicio. La migración `005_service_content.sql` crea
el catálogo correspondiente. El inicio, el listado de servicios y cada página de
detalle consumen estos datos y recurren al contenido local si la base no está lista.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
