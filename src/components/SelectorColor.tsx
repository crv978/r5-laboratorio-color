"use client";
import { useState } from "react";
import { normalizarHex } from "../lib/color";
import styles from "../app/page.module.css";
export function SelectorColor({
  label,
  nombre,
  valor,
  onChange,
}: {
  label: string;
  nombre: string;
  valor: string;
  onChange: (v: string) => void;
}) {
  const [texto, setTexto] = useState(valor),
    [error, setError] = useState("");
  const aceptar = (valorNuevo: string) => {
    setTexto(valorNuevo);
    const normal = normalizarHex(valorNuevo);
    if (normal) {
      setError("");
      onChange(normal);
    } else setError("Hexadecimal inválido. Usa 3 o 6 dígitos hexadecimales.");
  };
  return (
    <fieldset className={styles.selector}>
      <legend>{label}</legend>
      <label htmlFor={`${nombre}-picker`}>
        Selector de {nombre.toLowerCase()}
      </label>
      <input
        id={`${nombre}-picker`}
        type="color"
        value={valor}
        onChange={(e) => aceptar(e.target.value)}
      />
      <label htmlFor={`${nombre}-hex`}>Color hexadecimal</label>
      <input
        id={`${nombre}-hex`}
        value={texto}
        onChange={(e) => aceptar(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${nombre}-error` : undefined}
      />
      {error && (
        <p id={`${nombre}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
