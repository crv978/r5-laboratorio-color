import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://r5-laboratorio-color.vercel.app/sitemap.xml",
  };
}
