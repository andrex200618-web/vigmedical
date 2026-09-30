import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones Virtual | Vigmedical",
  description: "Registra y obtén constancia de tu reclamo o queja ante Vigmedical.",
  alternates: { canonical: "/libro-de-reclamaciones" },
};

export default function ComplaintsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
