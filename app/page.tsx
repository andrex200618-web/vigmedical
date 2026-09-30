import React, { Suspense } from "react";
import ServicesGrid from "@/components/ServicesGrid";
import TrainingSection from "@/components/TrainingSection";
import Image from "next/image";
import { getManagedServices } from "@/lib/service-cms";

export default async function Home() {
  const services = await getManagedServices();
  return (
    <div className="w-full">
      {/* 1. Hero Banner — 600px, mismo estilo que las demás páginas */}
      <section className="relative h-[600px] w-full bg-gradient-to-br from-secondary-950 via-slate-900 to-secondary-900 text-white flex flex-col items-center justify-center text-center overflow-hidden px-4">
        {/* Grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
        {/* Red glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,5,20,0.15),transparent_65%)]" />
        <div className="max-w-4xl mx-auto relative z-10 px-4 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight select-none text-white drop-shadow-md uppercase text-center">
            BIENVENIDOS A VIGMEDICAL
          </h1>
          <p className="mt-5 text-base sm:text-lg md:text-2xl font-semibold tracking-wide text-slate-200 uppercase">
            SALUD OCUPACIONAL AL ALCANCE DE TUS MANOS
          </p>
          <div className="mt-6 h-1 w-20 rounded-full bg-primary-600 shadow-[0_0_14px_rgba(227,5,20,0.75)]" />
        </div>
      </section>

      {/* 2. Descripción Institucional */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* Texto */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-extrabold title-red-gradient leading-tight mb-6 text-center uppercase tracking-tight">
                ¿Quiénes somos?
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto -mt-3 mb-6 rounded-full shadow-[0_0_8px_rgba(227,5,20,0.5)]" />
              <p className="text-slate-600 text-base leading-relaxed mb-4">
                En Vigmedical, somos una institución privada especializada en asesoría, consultoría, auditoría e implementación en salud ocupacional, seguridad y salud en el trabajo, ergonomía e higiene industrial. Nuestro compromiso es cumplir de forma estricta con la normatividad nacional vigente, ofreciendo soluciones integrales que garantizan la prevención de riesgos laborales y la protección de la salud de los trabajadores.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Contamos con un equipo multidisciplinario de profesionales altamente calificados, infraestructura moderna y equipos de última tecnología, lo que nos permite brindar servicios con altos estándares de calidad y excelencia. En Vigmedical trabajamos para mejorar las condiciones laborales, reducir accidentes y enfermedades ocupacionales, y promover entornos de trabajo seguros y saludables para empresas de todos los sectores.
              </p>
            </div>

            {/* Imagen — mismo ancho que el texto, altura proporcional */}
            <div className="relative flex-1 w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-slate-100">
              <Image
                src="/api/media/team"
                unoptimized
                alt="Equipo Vigmedical"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
            </div>

          </div>
        </div>
      </section>


      {/* 3. Grid de Servicios */}
      <div className="bg-slate-50 border-y border-slate-100">
        <Suspense fallback={<div className="py-20 text-center text-slate-500">Cargando servicios...</div>}>
          <ServicesGrid isCarousel={true} services={services} />
        </Suspense>
      </div>

      {/* 4. Cursos y Capacitaciones */}
      <Suspense fallback={<div className="py-20 text-center text-slate-500">Cargando capacitaciones...</div>}>
        <TrainingSection />
      </Suspense>
    </div>
  );
}
