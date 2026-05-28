"use client";
import "../globals.css";
import Link from "next/link";
import { useState } from "react";

export default function Subir() {
  const [nombre, setNombre] = useState("");
  const [file, setFile] = useState(null);
  const [estado, setEstado] = useState(null); // {tipo, texto, url}
  const [cargando, setCargando] = useState(false);

  async function enviar() {
    setEstado(null);
    if (!nombre.trim()) return setEstado({ tipo: "err", texto: "Escribe tu nombre." });
    if (!file) return setEstado({ tipo: "err", texto: "Selecciona tu archivo .html" });

    setCargando(true);
    try {
      const fd = new FormData();
      fd.append("nombre", nombre);
      fd.append("archivo", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setEstado({ tipo: "ok", texto: `¡Listo, ${data.nombre}! Tu proyecto está publicado.`, slug: data.slug });
    } catch (e) {
      setEstado({ tipo: "err", texto: e.message });
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="wrap">
      <header className="site">
        <Link className="brand" href="/" style={{ textDecoration: "none", color: "inherit" }}>El&nbsp;Aula</Link>
        <nav>
          <Link href="/subir">Subir</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </header>

      <h1 className="title" style={{ fontSize: "clamp(2.2rem,6vw,3.8rem)" }}>
        Sube tu <em>proyecto</em>
      </h1>
      <p className="lede">Tu nombre define tu URL. Si vuelves a subir, reemplaza tu versión anterior.</p>

      <div className="card" style={{ maxWidth: 560 }}>
        {estado && (
          <div className={`msg ${estado.tipo}`}>
            {estado.texto}
            {estado.slug && (
              <> <a href={`/p/${estado.slug}`} style={{ color: "inherit", textDecoration: "underline" }}>Ver mi proyecto →</a></>
            )}
          </div>
        )}

        <label>Tu nombre</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ana García" />

        <label>Archivo HTML</label>
        <input type="file" accept=".html,text/html" onChange={(e) => setFile(e.target.files?.[0] || null)} />

        <button className="btn" onClick={enviar} disabled={cargando}>
          {cargando ? "Subiendo…" : "Publicar"}
        </button>
      </div>
    </main>
  );
}
