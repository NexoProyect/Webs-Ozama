import "./globals.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className="wrap">
      <header className="site">
        <span className="brand">El&nbsp;Aula</span>
        <nav>
          <Link href="/subir">Subir</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </header>

      <h1 className="title">
        Sube tu HTML.<br />
        <em>Hostéalo</em> con tu nombre.
      </h1>
      <p className="lede">
        Cada alumno publica su proyecto en un clic y queda accesible en una URL propia.
        El dashboard reúne todos los trabajos del grupo en un solo lugar.
      </p>

      <div className="row">
        <Link className="btn" href="/subir">Subir mi proyecto</Link>
        <Link className="btn ghost" href="/dashboard">Ver el dashboard</Link>
      </div>
    </main>
  );
}
