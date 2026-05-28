"use client";
import "../globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [alumnos, setAlumnos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/list", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setAlumnos(d.alumnos);
      })
      .catch((e) => setError(e.message));
  }, []);

  return (
    <main className="wrap">
      <header className="site">
        <Link className="brand" href="/" style={{ textDecoration: "none", color: "inherit" }}>El&nbsp;Aula</Link>
        <nav>
          <Link href="/subir">Subir</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </header>

      <div className="section-head">
        <h1 className="title" style={{ fontSize: "clamp(2.2rem,6vw,3.8rem)", marginBottom: 0 }}>
          Proyectos del <em>grupo</em>
        </h1>
        {alumnos && <span className="count">{alumnos.length} publicados</span>}
      </div>

      {error && <div className="msg err">{error}</div>}
      {!alumnos && !error && <div className="loading">Cargando proyectos…</div>}
      {alumnos && alumnos.length === 0 && (
        <div className="empty">Aún no hay proyectos. <Link href="/subir" style={{ color: "var(--accent)" }}>Sé el primero →</Link></div>
      )}

      {alumnos && alumnos.length > 0 && (
        <div className="grid">
          {alumnos.map((a, i) => (
            <a key={a.slug} className="tile" href={a.url} target="_blank" rel="noreferrer">
              <span className="tile-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="tile-name">{a.nombre}</span>
              <span className="tile-meta">
                /{a.slug} · {new Date(a.uploadedAt).toLocaleDateString("es", { day: "2-digit", month: "short" })}
              </span>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
