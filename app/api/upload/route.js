import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "edge";

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export async function POST(req) {
  try {
    const form = await req.formData();
    const nombre = (form.get("nombre") || "").toString().trim();
    const file = form.get("archivo");

    if (!nombre) {
      return NextResponse.json({ error: "Falta el nombre." }, { status: 400 });
    }
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Falta el archivo HTML." }, { status: 400 });
    }
    if (!file.name.toLowerCase().endsWith(".html") && file.type !== "text/html") {
      return NextResponse.json({ error: "El archivo debe ser .html" }, { status: 400 });
    }
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: "Máximo 2 MB." }, { status: 400 });
    }

    const slug = slugify(nombre);
    if (!slug) {
      return NextResponse.json({ error: "Nombre inválido." }, { status: 400 });
    }

    const html = await file.text();

    const page = await put(`alumnos/${slug}/index.html`, html, {
      access: "public",
      contentType: "text/html; charset=utf-8",
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    await put(
      `alumnos/${slug}/meta.json`,
      JSON.stringify({ nombre, slug, actualizado: new Date().toISOString() }),
      {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
      }
    );

    return NextResponse.json({ ok: true, nombre, slug, url: page.url });
  } catch (err) {
    return NextResponse.json(
      { error: "Error al subir: " + (err?.message || "desconocido") },
      { status: 500 }
    );
  }
}
