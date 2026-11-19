"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { normalizarHex } from "../../lib/color";
import { generarPaleta, aVariablesCss } from "../../lib/paleta";
import styles from "../page.module.css";

function PaletaContent() {
  const params = useSearchParams();
  const baseInicial = normalizarHex(params.get("base") ?? "") ?? "#1a73e8";
  const [entrada, setEntrada] = useState(baseInicial),
    [base, setBase] = useState(baseInicial),
    [error, setError] = useState(""),
    [aviso, setAviso] = useState(""),
    [manual, setManual] = useState("");
  const paleta = generarPaleta(base);
  const copiar = async (texto: string) => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("sin API");
      await navigator.clipboard.writeText(texto);
      setAviso("Copiado");
      setManual("");
    } catch {
      setAviso(
        "La API del portapapeles no está disponible; copia el texto manualmente.",
      );
      setManual(texto);
    }
  };
  const cambiar = (v: string) => {
    setEntrada(v);
    const n = normalizarHex(v);
    if (n) {
      setError("");
      setBase(n);
    } else setError("Hexadecimal inválido");
  };
  return (
    <>
      <h1>Generador de paleta</h1>
      <label htmlFor="base">Color base</label>
      <input
        id="base"
        type="text"
        value={entrada}
        onChange={(e) => cambiar(e.target.value)}
        aria-invalid={!!error}
      />
      <input
        type="color"
        aria-label="Selector de color base"
        value={base}
        onChange={(e) => cambiar(e.target.value)}
      />
      {error && <p role="alert">{error}</p>}
      <button type="button" onClick={() => copiar(aVariablesCss(paleta))}>
        Copiar como variables CSS
      </button>
      <p aria-live="polite">{aviso}</p>
      {manual && (
        <textarea readOnly aria-label="Texto para copiar" value={manual} />
      )}
      <ul className={styles.palette} aria-label="Tonos de la paleta">
        {paleta.map((t) => (
          <li key={t.nivel} style={{ "--tono": t.hex } as React.CSSProperties}>
            <button type="button" onClick={() => copiar(t.hex)}>
              <strong>{t.nivel}</strong>
              <span>{t.hex}</span>
              <small>
                Blanco {t.contrasteBlanco}:1 · Negro {t.contrasteNegro}:1 ·
                Mejor sobre {t.mejor}
              </small>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function PaletaPage() {
  return (
    <Suspense fallback={<p>Cargando paleta…</p>}>
      <PaletaContent />
    </Suspense>
  );
}
