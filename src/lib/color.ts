export function normalizarHex(texto: string): string | null {
  const limpio = texto.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(limpio))
    return `#${limpio
      .split("")
      .map((c) => c + c)
      .join("")
      .toLowerCase()}`;
  if (/^[0-9a-fA-F]{6}$/.test(limpio)) return `#${limpio.toLowerCase()}`;
  return null;
}
export function hexARgb(hex: string): [number, number, number] | null {
  const normal = normalizarHex(hex);
  if (!normal) return null;
  return [
    parseInt(normal.slice(1, 3), 16),
    parseInt(normal.slice(3, 5), 16),
    parseInt(normal.slice(5, 7), 16),
  ];
}
export function rgbAHsl(
  r: number,
  g: number,
  b: number,
): [number, number, number] {
  const rn = r / 255,
    gn = g / 255,
    bn = b / 255,
    max = Math.max(rn, gn, bn),
    min = Math.min(rn, gn, bn),
    d = max - min;
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === rn) h = 60 * (((gn - bn) / d) % 6);
    else if (max === gn) h = 60 * ((bn - rn) / d + 2);
    else h = 60 * ((rn - gn) / d + 4);
  }
  if (h < 0) h += 360;
  return [h, s * 100, l * 100];
}
export function hslAHex(h: number, s: number, l: number): string {
  const sn = s / 100,
    ln = l / 100,
    c = (1 - Math.abs(2 * ln - 1)) * sn,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = ln - c / 2;
  let rp = 0,
    gp = 0,
    bp = 0;
  if (h < 60) [rp, gp, bp] = [c, x, 0];
  else if (h < 120) [rp, gp, bp] = [x, c, 0];
  else if (h < 180) [rp, gp, bp] = [0, c, x];
  else if (h < 240) [rp, gp, bp] = [0, x, c];
  else if (h < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];
  const canal = (n: number) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${canal(rp)}${canal(gp)}${canal(bp)}`;
}
