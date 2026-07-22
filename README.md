# Martins Propiedades

Sitio web para venta y alquiler de propiedades en Buenos Aires.

**Stack**: Next.js 14 + Tailwind CSS + Supabase (base de datos, auth y storage) + Netlify (hosting).

## Cómo publicar este sitio (sin instalar nada en tu computadora)

1. Subí todos estos archivos a un repositorio nuevo en GitHub.
2. En Netlify, elegí "Import from Git" y conectá ese repositorio.
   Netlify detecta automáticamente que es un proyecto Next.js.
3. En **Site settings → Environment variables**, agregá:
   - `NEXT_PUBLIC_SUPABASE_URL` → la Project URL de tu Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → tu Publishable key de Supabase
4. Deploy. Netlify te da una URL tipo `martins-propiedades.netlify.app`.
5. Cuando quieras, conectá tu dominio propio desde **Domain settings**.

## Cargar propiedades

Por ahora no hay panel de administración: cargá las propiedades directamente
desde el **Table Editor** de Supabase, en la tabla `imoveis` (y sus fotos en
`imagens_imovel`, con las URLs de las imágenes subidas al bucket `imoveis-fotos`).

Recordá marcar `destaque = true` en las propiedades que quieras que aparezcan
en la home.

## Antes de publicar, reemplazá

- El número de WhatsApp de ejemplo (`5491100000000`) en:
  - `components/layout/Footer.tsx`
  - `app/imoveis/[slug]/page.tsx`
- El texto de la página "Sobre nosotros" y demás páginas institucionales
  (todavía no incluidas en este proyecto).
