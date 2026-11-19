import { describe, expect, it } from "vitest";
import { hexARgb, hslAHex, normalizarHex, rgbAHsl } from "../src/lib/color";
import { evaluar, razon, sugerirTexto, truncar } from "../src/lib/contraste";
import { aVariablesCss, generarPaleta } from "../src/lib/paleta";

describe("color", () => {
  it.each([
    ["#abc", "#aabbcc"],
    ["abc", "#aabbcc"],
    ["#AABBCC", "#aabbcc"],
  ])("normaliza %s", (x, y) => expect(normalizarHex(x)).toBe(y));

  it.each(["xyz", "#12", ""])("rechaza %s", (x) =>
    expect(normalizarHex(x)).toBeNull(),
  );

  it("viaja RGB-HSL-hex", () => {
    for (const h of ["#ff0000", "#00ff00", "#0000ff", "#123456", "#fafafa"]) {
      const rgb = hexARgb(h)!;
      const hex = hslAHex(...rgbAHsl(...rgb));
      for (let i = 0; i < 3; i++) {
        const a = parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
        const b = parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16);
        expect(Math.abs(a - b)).toBeLessThanOrEqual(1);
      }
    }
  });
});

describe("contraste", () => {
  it("calcula extremos", () => {
    expect(razon("#000000", "#ffffff")).toBe(21);
    expect(razon("#ffffff", "#ffffff")).toBe(1);
    expect(razon("#000000", "#ffffff")).toBe(razon("#ffffff", "#000000"));
  });

  it("trunca", () => {
    expect(truncar(razon("#777777", "#ffffff"))).toBe(4.47);
    expect(truncar(razon("#767676", "#ffffff"))).toBe(4.54);
    expect(truncar(4.499)).toBe(4.49);
  });

  it("evalúa", () => {
    const r = evaluar(4.48);
    expect(r[0].cumple).toBe(false);
    expect(r[1].cumple).toBe(true);
  });

  it("sugiere", () => {
    const propuesta = sugerirTexto("#777777", "#ffffff");
    expect(propuesta).not.toBeNull();
    expect(razon(propuesta!, "#ffffff")).toBeGreaterThanOrEqual(4.5);
  });
});

describe("paleta", () => {
  it("genera 9 tonos decrecientes", () => {
    const p = generarPaleta("#1a73e8");
    expect(p).toHaveLength(9);
    expect(p[0].nivel).toBe(100);
    expect(p[8].nivel).toBe(900);
    expect(p.every((x) => /^#[0-9a-f]{6}$/.test(x.hex))).toBe(true);
    expect(aVariablesCss(p)).toMatch(/^:root \{/);
  });
});
