import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paleta de colores | Laboratorio de color",
  description: "Genera nueve tonos y exporta variables CSS.",
};

export default function PaletaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
