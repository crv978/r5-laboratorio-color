import { hexARgb, hslAHex, rgbAHsl } from "./color";
import { razon } from "./contraste";
export type Tono = {
  nivel: number;
  hex: string;
  contrasteBlanco: string;
  contrasteNegro: string;
  mejor: "blanco" | "negro";
};
export function generarPaleta(hex: string): Tono[] {
  const rgb = hexARgb(hex);
  if (!rgb) return [];
  const [h, s] = rgbAHsl(...rgb);
  const luces = [92, 84, 74, 64, 54, 44, 34, 24, 14];
  return luces.map((l, i) => {
    const color = hslAHex(h, s, l);
    const b = razon(color, "#ffffff"),
      n = razon(color, "#000000");
    return {
      nivel: (i + 1) * 100,
      hex: color,
      contrasteBlanco: b.toFixed(2),
      contrasteNegro: n.toFixed(2),
      mejor: b >= n ? "blanco" : "negro",
    };
  });
}
export function aVariablesCss(paleta: Tono[]): string {
  return `:root {\n${paleta.map((t) => `  --color-${t.nivel}: ${t.hex};`).join("\n")}\n}`;
}
