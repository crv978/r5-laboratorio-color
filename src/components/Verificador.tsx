"use client";
import { useState } from "react";
import { useColoresUrl } from "../hooks/useColoresUrl";
import { razon, truncar, evaluar, sugerirTexto } from "../lib/contraste";
import { SelectorColor } from "./SelectorColor";
import styles from "../app/page.module.css";

type EyeDropperType = { open: () => Promise<{ sRGBHex: string }> };
declare global {
  interface Window {
    EyeDropper?: new () => EyeDropperType;
  }
}
export default function Verificador() {
  const { texto, fondo, setTexto, setFondo, aviso } = useColoresUrl();
  const r = razon(texto, fondo);
  const [propuesta, setPropuesta] = useState<string | null>(null);
  const elegir = async () => {
    if (!("EyeDropper" in window) || !window.EyeDropper) return;
    try {
      const x = new window.EyeDropper();
      const y = await x.open();
      setTexto(y.sRGBHex.toLowerCase());
    } catch {}
  };
  return (
    <>
      {aviso && (
        <p role="alert" className={styles.aviso}>
          {aviso}
        </p>
      )}
      <div className={styles.verificador}>
        <section
          className={styles.selectores}
          aria-label="Selección de colores"
        >
          <SelectorColor
            key={`texto-${texto}`}
            label="Color de texto"
            nombre="Texto"
            valor={texto}
            onChange={setTexto}
          />
          <SelectorColor
            key={`fondo-${fondo}`}
            label="Color de fondo"
            nombre="Fondo"
            valor={fondo}
            onChange={setFondo}
          />
          <button
            type="button"
            className={styles.secondary}
            onClick={() => {
              setTexto(fondo);
              setFondo(texto);
            }}
          >
            Intercambiar
          </button>
          {typeof window !== "undefined" && "EyeDropper" in window && (
            <button type="button" className={styles.secondary} onClick={elegir}>
              Elegir de la pantalla
            </button>
          )}
        </section>
        <section className={styles.resultados} aria-live="polite">
          <h2>Resultados</h2>
          <p
            className={styles.ratio}
            aria-label={`Razón de contraste ${truncar(r).toFixed(2).replace(".", ",")} a 1`}
          >
            {truncar(r).toFixed(2).replace(".", ",")} : 1
          </p>
          <ul>
            {evaluar(r).map((x) => (
              <li key={x.id}>
                <strong>{x.nombre}:</strong>{" "}
                <span>{x.cumple ? "✓ Cumple" : "✗ No cumple"}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setPropuesta(sugerirTexto(texto, fondo))}
          >
            Sugerir corrección
          </button>
          {propuesta && (
            <div className={styles.correccion}>
              <p>
                {propuesta
                  ? `Color propuesto: ${propuesta}. Razón: ${truncar(razon(propuesta, fondo)).toFixed(2).replace(".", ",")} : 1`
                  : "No es posible con este fondo; cambie el fondo"}
              </p>
              {propuesta && (
                <button type="button" onClick={() => setTexto(propuesta)}>
                  Usar este color
                </button>
              )}
            </div>
          )}
        </section>
        <section className={styles.previewZone} aria-label="Vista previa">
          <h2>Vista previa</h2>
          <article
            className={styles.preview}
            style={
              { "--texto": texto, "--fondo": fondo } as React.CSSProperties
            }
          >
            <h3>Título de ejemplo</h3>
            <p>Este párrafo demuestra el contraste elegido.</p>
            <button type="button">Botón</button>
          </article>
        </section>
      </div>
    </>
  );
}
