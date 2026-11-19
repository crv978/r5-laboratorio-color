"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { normalizarHex } from "../lib/color";
export function useColoresUrl() {
  const router = useRouter();
  const params = useSearchParams();
  const [texto, setTexto] = useState(() => {
    const valor = params.get("texto");
    return valor ? (normalizarHex(valor) ?? "#767676") : "#767676";
  });
  const [fondo, setFondo] = useState(() => {
    const valor = params.get("fondo");
    return valor ? (normalizarHex(valor) ?? "#ffffff") : "#ffffff";
  });
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    const t = params.get("texto");
    const f = params.get("fondo");
    const nt = t ? normalizarHex(t) : "#767676";
    const nf = f ? normalizarHex(f) : "#ffffff";

    queueMicrotask(() => {
      setAviso(
        (t !== null && nt === null) || (f !== null && nf === null)
          ? "Uno de los colores de la URL no era válido. Se restauraron los valores seguros."
          : "",
      );
      setTexto(nt ?? "#767676");
      setFondo(nf ?? "#ffffff");
    });
  }, [params]);

  useEffect(() => {
    const url = `/?texto=${texto.slice(1)}&fondo=${fondo.slice(1)}`;
    router.replace(url, { scroll: false });
  }, [texto, fondo, router]);

  return { texto, fondo, setTexto, setFondo, aviso, setAviso };
}
