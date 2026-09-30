import React from "react";
import LegalNormsTable from "@/components/LegalNormsTable";

export const metadata = {
  title: "Buscador de Normas Legales de SST | Vigmedical",
  description: "Consulta el marco legal en Seguridad y Salud en el Trabajo aplicable en el Perú: Ley N° 29783, D.S. N° 005-2012-TR, R.M. 312-2011-MINSA y más.",
  alternates: { canonical: "/normas-legales" },
};

export default function NormasLegalesPage() {
  return (
    <div className="w-full">
      {/* 1. Page Header Banner */}
      <section className="relative h-[400px] w-full bg-gradient-to-br from-secondary-950 via-slate-900 to-secondary-900 text-white flex flex-col items-center justify-center text-center overflow-hidden px-4 border-b border-slate-800">
        {/* Decorative background grid and glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,5,20,0.15),transparent_65%)] animate-pulse duration-[8000ms]" />
        
        <div className="max-w-4xl mx-auto relative z-10 px-4 flex flex-col items-center animate-title-reveal">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight select-none text-white drop-shadow-md text-center">
            NORMAS LEGALES DE<br />
            <span className="text-white block mt-2">
              SEGURIDAD Y SALUD EN EL TRABAJO
            </span>
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-4 rounded-full shadow-[0_0_12px_rgba(227,5,20,0.8)]" />
        </div>
      </section>

      {/* 2. Interactive Legal Norms Search Table */}
      <div className="bg-white">
        <div role="note" className="max-w-7xl mx-auto px-4 md:px-8 pt-10">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Compilación referencial con información incorporada hasta 2024. No constituye asesoría legal. Antes de tomar decisiones, verifica la vigencia y modificaciones directamente en El Peruano, gob.pe o con un profesional especializado.
          </div>
        </div>
        <LegalNormsTable />
      </div>
    </div>
  );
}
