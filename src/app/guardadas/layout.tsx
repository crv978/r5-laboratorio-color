import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paletas guardadas | Laboratorio de color",
  description:
    "Consulta, copia o elimina las paletas guardadas en el navegador.",
};

export default function GuardadasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
