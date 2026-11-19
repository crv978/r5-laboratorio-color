import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <h1>Página no encontrada</h1>
      <p>La dirección solicitada no existe en el Laboratorio de color.</p>
      <Link href="/">Volver al verificador</Link>
    </section>
  );
}
