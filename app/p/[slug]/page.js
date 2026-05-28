import "../../globals.css";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Viewer({ params }) {
  const slug = params.slug;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 24px",
          borderBottom: "2px solid var(--ink)",
          background: "var(--paper)",
          flexShrink: 0,
        }}
      >
        <span className="serif" style={{ fontWeight: 900, fontSize: "1.1rem" }}>
          El&nbsp;Aula <span style={{ color: "var(--muted)", fontWeight: 400 }}>/ {slug}</span>
        </span>
        <span style={{ display: "flex", gap: 12 }}>
          <a className="btn ghost" style={{ padding: "8px 16px", fontSize: "0.75rem" }} href={`/raw/${slug}`} target="_blank" rel="noreferrer">
            Abrir solo
          </a>
          <Link className="btn" style={{ padding: "8px 16px", fontSize: "0.75rem" }} href="/dashboard">
            ← Dashboard
          </Link>
        </span>
      </header>
      <iframe
        src={`/raw/${slug}`}
        title={slug}
        sandbox="allow-scripts allow-forms allow-popups allow-modals"
        style={{ flex: 1, width: "100%", border: "none", background: "#fff" }}
      />
    </div>
  );
}
