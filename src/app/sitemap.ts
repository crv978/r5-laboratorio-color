import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/paleta", "/guardadas"].map((ruta) => ({
    url: `https://example.vercel.app${ruta}`,
    changeFrequency: "monthly",
    priority: ruta === "" ? 1 : 0.8,
  }));
}
