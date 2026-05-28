# El Aula — Hosting de proyectos HTML

App Next.js para que tus alumnos suban su archivo `.html` y quede hosteado con su nombre, más un dashboard que enlaza a cada proyecto.

## Cómo funciona
- `/subir` — el alumno pone su nombre + su `.html`. Se guarda en Vercel Blob en `alumnos/{su-nombre}/index.html`.
- `/dashboard` — lista todos los proyectos con enlace directo a la URL pública de cada uno.
- La URL de cada alumno es la que devuelve Vercel Blob (queda visible al subir y en el dashboard).

## Deploy en Vercel (5 pasos)

1. **Sube esto a un repo de GitHub.** (O usa `vercel` CLI directamente.)
2. En vercel.com → **Add New → Project** → importa el repo.
3. Antes o después del primer deploy, activa el almacenamiento:
   **Storage → Create → Blob** y conéctalo al proyecto.
   Eso crea automáticamente la variable de entorno `BLOB_READ_WRITE_TOKEN`.
4. Si ya habías desplegado sin el Blob, haz **Redeploy** para que tome el token.
5. Listo. Comparte `tudominio.vercel.app/subir` con los alumnos y usa `/dashboard` en clase.

## Local
```bash
npm install
# crea .env.local con un token de Blob:  BLOB_READ_WRITE_TOKEN=vercel_blob_xxx
npm run dev
```
El token local se obtiene en el panel de tu Blob store en Vercel.

## Notas
- Límite por archivo: 2 MB (editable en `app/api/upload/route.js`).
- Si un alumno sube de nuevo con el mismo nombre, **reemplaza** su versión (allowOverwrite).
- Los nombres se convierten a slug (sin acentos ni espacios) para la ruta.
- Los HTML se sirven desde el CDN de Blob como páginas públicas.
