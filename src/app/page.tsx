import { Suspense } from "react";
import Verificador from "../components/Verificador";
export default function Home() {
  return (
    <>
      <h1>Verificador de contraste</h1>
      <Suspense fallback={<p>Cargando colores…</p>}>
        <Verificador />
      </Suspense>
    </>
  );
}
