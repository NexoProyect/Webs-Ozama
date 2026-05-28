import { list } from "@vercel/blob";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const slug = params.slug;

  try {
    const { blobs } = await list({ prefix: `alumnos/${slug}/index.html` });
    const blob = blobs.find((b) => b.pathname === `alumnos/${slug}/index.html`);

    if (!blob) {
      return new Response("Proyecto no encontrado.", {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const res = await fetch(blob.url, { cache: "no-store" });
    const html = await res.text();

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": "inline",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return new Response("Error al cargar el proyecto.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
