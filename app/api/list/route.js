import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "alumnos/" });

    const map = new Map();
    for (const b of blobs) {
      const m = b.pathname.match(/^alumnos\/([^/]+)\/index\.html$/);
      if (m) {
        const slug = m[1];
        const prev = map.get(slug);
        if (!prev || new Date(b.uploadedAt) > new Date(prev.uploadedAt)) {
          map.set(slug, { slug, url: b.url, uploadedAt: b.uploadedAt });
        }
      }
    }

    const metas = await Promise.all(
      [...map.values()].map(async (item) => {
        const meta = blobs.find(
          (b) => b.pathname === `alumnos/${item.slug}/meta.json`
        );
        let nombre = item.slug;
        if (meta) {
          try {
            const r = await fetch(meta.url, { cache: "no-store" });
            const j = await r.json();
            if (j?.nombre) nombre = j.nombre;
          } catch {}
        }
        return { ...item, nombre };
      })
    );

    metas.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    return NextResponse.json({ alumnos: metas });
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Error al listar" },
      { status: 500 }
    );
  }
}
