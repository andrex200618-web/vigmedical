import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Users, ClipboardCheck, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-red-50/20 to-white pt-8 pb-20 md:pb-28 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(227,5,20,0.08),transparent_50%)]" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary-100/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center animate-fade-in-up">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 text-xs font-semibold px-3.5 py-1.5 rounded-full w-fit mb-6 shadow-sm border border-primary-100/50">
              <ShieldCheck size={14} className="text-primary-600" />
              <span>Liderando la Medicina Preventiva y SST en el Perú</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-secondary-900 leading-[1.1] mb-6 animate-title-reveal">
              Cuidamos de tu <span className="title-red-gradient">talento</span>,<br />
              garantizamos tu <span className="text-secondary-800 border-b-4 border-primary-500/30">tranquilidad</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              Especialistas en Evaluaciones Médicas Ocupacionales, Monitoreos de Higiene Industrial y Asesorías Integrales en Seguridad y Salud en el Trabajo. Protege a tus colaboradores y cumple con SUNAFIL con un servicio médico corporativo premium.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <Link
                href="/servicios"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold text-base py-3.5 px-8 rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2 transform active:scale-95"
              >
                Ver Servicios
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contactanos"
                className="bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base py-3.5 px-8 rounded-xl border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2 transform active:scale-95"
              >
                Cotizar Ahora
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/60 max-w-lg">
              <div>
                <span className="block text-2xl md:text-3xl font-extrabold text-secondary-900">500+</span>
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mt-1">
                  Empresas Asesoradas
                </span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-extrabold text-secondary-900">99%</span>
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mt-1">
                  Aptitud y Conformidad
                </span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-extrabold text-secondary-900">10+</span>
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mt-1">
                  Años de Experiencia
                </span>
              </div>
            </div>

          </div>

          {/* Hero Right Media */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Visual Backdrops */}
            <div className="absolute w-[110%] h-[110%] bg-gradient-to-tr from-primary-200/20 to-red-100/10 rounded-3xl blur-2xl -z-10 pointer-events-none transform rotate-3" />
            
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] sm:aspect-[4/3.8] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 transform transition-transform duration-500 hover:rotate-1 motion-safe:animate-bounce-slow">
              <Image
                src="/api/media/hero"
                unoptimized
                alt="Medicina Ocupacional y Salud Laboral Vigmedical"
                fill
                priority
                className="object-cover object-[center_30%] sm:object-center"
                sizes="(max-width: 720px) 100vw, 50vw"
              />
              
              {/* Floating Widget 1 */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-xl shadow-lg border border-white/40 flex items-center gap-3.5 backdrop-blur-md">
                <div className="bg-primary-600 text-white p-2.5 rounded-lg">
                  <ClipboardCheck size={20} />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider leading-none mb-1">
                    Certificaciones Médicas
                  </span>
                  <span className="block text-sm font-bold text-secondary-900 leading-tight">
                    100% Homologadas por MINSA & SUNAFIL
                  </span>
                </div>
              </div>

              {/* Floating Widget 2 */}
              <div className="absolute top-4 right-4 bg-primary-500 text-white p-2 rounded-full shadow-md animate-pulse">
                <Users size={16} />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
