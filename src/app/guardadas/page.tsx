"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { normalizarHex } from "../../lib/color";
import { generarPaleta, aVariablesCss } from "../../lib/paleta";
import styles from "../page.module.css";
type Guardada = { id: string; nombre: string; base: string; creada: number };
export default function GuardadasPage() {
  const [items, setItems] = useState<Guardada[]>([]),
    [nombre, setNombre] = useState(""),
    [base, setBase] = useState("#1a73e8"),
    [aviso, setAviso] = useState("");
  const router = useRouter();
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const crudo = localStorage.getItem("paletas-r5");
        if (crudo) {
          const dato = JSON.parse(crudo);
          if (Array.isArray(dato)) {
            setItems(
              dato
                .filter(
                  (x) =>
                    typeof x.id === "string" &&
                    typeof x.nombre === "string" &&
                    normalizarHex(x.base),
                )
                .slice(0, 20),
            );
          }
        }
      } catch {
        setAviso("No se pudieron leer las paletas guardadas");
      }
    });
  }, []);
  const persist = (nuevas: Guardada[]) => {
    try {
      localStorage.setItem("paletas-r5", JSON.stringify(nuevas));
      setItems(nuevas);
    } catch {
      setAviso("No se pudo guardar en este navegador");
    }
  };
  const guardar = () => {
    if (!nombre.trim()) return;
    persist(
      [
        {
          id: crypto.randomUUID?.() || String(Date.now()),
          nombre: nombre.trim(),
          base,
          creada: Date.now(),
        },
        ...items,
      ].slice(0, 20),
    );
    setNombre("");
  };
  const copiar = async (paleta: Guardada) => {
    try {
      await navigator.clipboard.writeText(
        aVariablesCss(generarPaleta(paleta.base)),
      );
      setAviso("Copiado");
    } catch {
      setAviso("No fue posible copiar");
    }
  };
  return (
    <>
      <h1>Paletas guardadas</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          guardar();
        }}
      >
        <label htmlFor="nombre-paleta">Nombre</label>
        <input
          id="nombre-paleta"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label htmlFor="base-paleta">Color base</label>
        <input
          id="base-paleta"
          type="text"
          value={base}
          onChange={(e) => {
            const n = normalizarHex(e.target.value);
            if (n) setBase(n);
          }}
        />
        <button type="submit">Guardar paleta</button>
      </form>
      <p aria-live="polite">{aviso}</p>
      <ul className={styles.saved}>
        {items.map((p) => (
          <li key={p.id}>
            <h2>{p.nombre}</h2>
            <div className={styles.swatches}>
              {generarPaleta(p.base).map((t) => (
                <span
                  key={t.nivel}
                  style={{ background: t.hex }}
                  title={t.hex}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => router.push(`/paleta?base=${p.base.slice(1)}`)}
            >
              Abrir
            </button>
            <button type="button" onClick={() => copiar(p)}>
              Copiar
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm(`¿Borrar ${p.nombre}?`))
                  persist(items.filter((x) => x.id !== p.id));
              }}
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
      {items.length === 0 && <p>No hay paletas guardadas.</p>}
    </>
  );
}
