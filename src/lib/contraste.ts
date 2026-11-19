import { hexARgb, hslAHex, rgbAHsl } from "./color";
export function luminancia(hex: string): number {
  const rgb = hexARgb(hex);
  if (!rgb) return 0;
  const lineal = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lineal[0] + 0.7152 * lineal[1] + 0.0722 * lineal[2];
}
export function razon(a: string, b: string): number {
  const la = luminancia(a),
    lb = luminancia(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
export function truncar(r: number): number {
  return Math.floor(r * 100) / 100;
}
export function evaluar(r: number) {
  return [
    {
      id: "aa-normal",
      nombre: "AA, texto normal",
      minimo: 4.5,
      cumple: r >= 4.5,
    },
    { id: "aa-grande", nombre: "AA, texto grande", minimo: 3, cumple: r >= 3 },
    {
      id: "aaa-normal",
      nombre: "AAA, texto normal",
      minimo: 7,
      cumple: r >= 7,
    },
    {
      id: "aaa-grande",
      nombre: "AAA, texto grande",
      minimo: 4.5,
      cumple: r >= 4.5,
    },
    {
      id: "aa-ui",
      nombre: "AA, componentes de interfaz y gráficos",
      minimo: 3,
      cumple: r >= 3,
    },
  ];
}
export function sugerirTexto(texto: string, fondo: string): string | null {
  const rgb = hexARgb(texto);
  if (!rgb) return null;
  const hsl = rgbAHsl(...rgb);
  const fondoLum = luminancia(fondo);
  const direccion = fondoLum > 0.5 ? -1 : 1;
  for (let l = hsl[2]; l >= 0 && l <= 100; l += direccion) {
    const propuesta = hslAHex(hsl[0], hsl[1], l);
    if (razon(propuesta, fondo) >= 4.5) return propuesta;
  }
  return null;
}
