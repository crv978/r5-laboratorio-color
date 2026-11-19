import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Laboratorio de color y contraste",
  description: "Herramienta WCAG para verificar contrastes y generar paletas",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <a className="skip" href="#contenido">
          Saltar al contenido
        </a>
        <header>
          <Link className="brand" href="/">
            Laboratorio de color
          </Link>
          <nav aria-label="Navegación principal">
            <Link href="/">Contraste</Link>
            <Link href="/paleta">Paleta</Link>
            <Link href="/guardadas">Guardadas</Link>
          </nav>
        </header>
        <main id="contenido">{children}</main>
        <footer>Herramienta de accesibilidad · WCAG 2.2</footer>
      </body>
    </html>
  );
}
