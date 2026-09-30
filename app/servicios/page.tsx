import React, { Suspense } from "react";
import ServicesGrid from "@/components/ServicesGrid";
import { getManagedServices } from "@/lib/service-cms";

export const metadata = {
  title: "Servicios Médicos Ocupacionales | Vigmedical",
  description: "Exámenes médicos ocupacionales pre-empleo, periódicos, post-empleo, evaluaciones ergonómicas, monitoreo de riesgos físicos y consultoría en seguridad laboral.",
  alternates: { canonical: "/servicios" },
};

export default async function ServiciosPage() {
  const services = await getManagedServices();
  return (
    <div className="w-full">
      {/* 1. Hero Page Header */}
      <section className="relative h-[400px] w-full bg-gradient-to-br from-secondary-950 via-slate-900 to-secondary-900 text-white flex flex-col items-center justify-center text-center overflow-hidden px-4">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,5,20,0.15),transparent_65%)]" />
        <div className="max-w-4xl mx-auto relative z-10 px-4 flex flex-col items-center animate-title-reveal">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight select-none text-white drop-shadow-md uppercase text-center">
            NUESTROS SERVICIOS OCUPACIONALES
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-4 rounded-full shadow-[0_0_12px_rgba(227,5,20,0.8)]" />
        </div>
      </section>

      {/* 2. Interactive Filterable Services Grid */}
      <div className="bg-white">
        <Suspense fallback={<div className="py-20 text-center text-slate-500">Cargando servicios...</div>}>
          <ServicesGrid hideTitle={true} services={services} />
        </Suspense>
      </div>
    </div>
  );
}
