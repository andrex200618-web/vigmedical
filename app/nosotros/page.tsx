import React from "react";
import Image from "next/image";
import { ShieldCheck, HeartHandshake, Eye, Target, Award, Users2 } from "lucide-react";

export const metadata = {
  title: "Nosotros | Vigmedical Salud Ocupacional",
  description: "Conoce nuestra historia, misión, visión y los valores corporativos que rigen el actuar de Vigmedical como aliado estratégico en salud y seguridad ocupacional.",
  alternates: { canonical: "/nosotros" },
};

export default function NosotrosPage() {
  const values = [
    {
      title: "Integridad y Confidencialidad",
      description: "Tratamos la información clínica de tus colaboradores con los más altos estándares éticos y de privacidad de acuerdo a ley.",
      icon: ShieldCheck,
    },
    {
      title: "Orientación al Cliente",
      description: "Entendemos las necesidades operativas de tu sector para proponer soluciones ágiles, eficaces y sin fricciones.",
      icon: HeartHandshake,
    },
    {
      title: "Excelencia Médica",
      description: "Utilizamos metodologías y equipos modernos para garantizar diagnósticos confiables y precisos.",
      icon: Award,
    },
    {
      title: "Trabajo en Equipo",
      description: "Médicos, enfermeros, ingenieros y asesores comerciales integrados para brindarte un soporte integral.",
      icon: Users2,
    },
  ];

  return (
    <div className="w-full">
      {/* 1. Page Header Banner */}
      <section className="relative h-[400px] w-full bg-gradient-to-br from-secondary-950 via-slate-900 to-secondary-900 text-white flex flex-col items-center justify-center text-center overflow-hidden px-4">
        {/* Decorative background grid and glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,5,20,0.15),transparent_65%)] animate-pulse duration-[8000ms]" />

        <div className="max-w-4xl mx-auto relative z-10 px-4 flex flex-col items-center animate-title-reveal">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight select-none text-white drop-shadow-md uppercase text-center">
            NOSOTROS
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-4 rounded-full shadow-[0_0_12px_rgba(227,5,20,0.8)]" />
        </div>
      </section>

      {/* 2. ¿Quiénes somos? Section */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:items-stretch">
            {/* Text Column */}
            <div className="lg:col-span-7 space-y-5 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold title-red-gradient tracking-tight text-center mb-5 uppercase animate-title-reveal">
                ¿QUIÉNES SOMOS?
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed text-justify font-medium">
                En <strong className="text-secondary-900 font-bold">Vigmedical</strong>, somos una institución privada especializada en asesoría, consultoría, auditoría e implementación en salud ocupacional, seguridad y salud en el trabajo, ergonomía e higiene industrial. Nuestro compromiso es cumplir de forma estricta con la normatividad nacional vigente, ofreciendo soluciones integrales que garantizan la prevención de riesgos laborales y la protección de la salud de los trabajadores.
              </p>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed text-justify font-medium">
                Contamos con un equipo multidisciplinario de profesionales altamente calificados, infraestructura moderna y equipos de última tecnología, lo que nos permite brindar servicios con altos estándares de calidad y excelencia. En Vigmedical trabajamos para mejorar las condiciones laborales, reducir accidentes y enfermedades ocupacionales, y promover entornos de trabajo seguros y saludables para empresas de todos los sectores.
              </p>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-0">
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
                <Image
                  src="/api/media/about"
                  unoptimized
                  alt="Equipo Vigmedical"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {/* Mision Card */}
            <div className="bg-slate-50 border border-slate-100 p-8 md:p-10 rounded-3xl relative overflow-hidden hover:shadow-md transition-shadow group text-center">
              <div className="bg-white text-primary-600 p-4 rounded-2xl w-fit mx-auto mb-6 shadow-sm transition-colors group-hover:bg-primary-600 group-hover:text-white">
                <Target size={28} />
              </div>
              <h2 className="text-2xl font-extrabold text-secondary-900 mb-4">
                Nuestra Misión
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                Brindar servicios integrales y de excelencia en salud ocupacional, medicina preventiva y seguridad en el trabajo. Acompañamos a las organizaciones a construir culturas de prevención activa, protegiendo la salud integral de sus colaboradores y optimizando la productividad y cumplimiento normativo de la empresa.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-slate-50 border border-slate-100 p-8 md:p-10 rounded-3xl relative overflow-hidden hover:shadow-md transition-shadow group text-center">
              <div className="bg-white text-primary-600 p-4 rounded-2xl w-fit mx-auto mb-6 shadow-sm transition-colors group-hover:bg-primary-600 group-hover:text-white">
                <Eye size={28} />
              </div>
              <h2 className="text-2xl font-extrabold text-secondary-900 mb-4">
                Nuestra Visión
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                Ser reconocidos a nivel nacional como la corporación líder en salud ocupacional, distinguiéndonos por nuestra innovación tecnológica, rigurosidad diagnóstica, tiempos ágiles de respuesta y alto compromiso ético y social. Buscamos ser el socio estratégico indispensable para la sostenibilidad empresarial de nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600 mb-2 block">
              Pilar Institucional
            </span>
            <h2 className="text-3xl font-extrabold text-secondary-900 leading-tight">
              Los valores que guían nuestro día a día
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((v, index) => {
              const Icon = v.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-50 border border-slate-100 hover:border-primary-100 p-6.5 rounded-2xl shadow-sm hover:shadow-md transition-all group text-center"
                >
                  <div className="bg-white text-primary-600 p-3 rounded-xl w-fit mx-auto mb-5 shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
