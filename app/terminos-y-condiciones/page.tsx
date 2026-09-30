import React from "react";
import { ShieldCheck, FileText } from "lucide-react";
import { company } from "@/data/company";

export const metadata = {
  title: "Términos y Condiciones | Vigmedical",
  description:
    "Términos y condiciones de uso de los servicios médicos ocupacionales y capacitaciones brindados por Vigmedical.",
  alternates: { canonical: "/terminos-y-condiciones" },
};

export default function TerminosPage() {
  return (
    <div className="w-full bg-white min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[400px] w-full bg-gradient-to-br from-secondary-950 via-slate-900 to-secondary-900 text-white flex flex-col items-center justify-center text-center overflow-hidden px-4 md:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,5,20,0.15),transparent_65%)]" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center animate-title-reveal">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight uppercase drop-shadow-md text-white">
            TÉRMINOS Y CONDICIONES
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-4 rounded-full shadow-[0_0_12px_rgba(227,5,20,0.8)]" />
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto animate-fade-in-up">
        <div className="space-y-8 text-slate-700 text-sm leading-relaxed">
          <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100">
            <div className="p-3 bg-primary-50 text-primary-600 rounded-2xl shrink-0">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-secondary-900">
                Condiciones de Uso y Servicios
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Última actualización: Julio 2026
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-secondary-900 mb-2">
              1. Identificación de la Empresa
            </h3>
            <p>
              {company.legalName}, con RUC N° {company.ruc}, nombre comercial {company.tradeName} y domicilio en {company.address}, es una empresa especializada en servicios de Salud Ocupacional, Exámenes Médicos Ocupacionales (EMO), Monitoreo e Higiene Laboral, y Capacitaciones en Seguridad y Salud en el Trabajo (SST), operando en cumplimiento con el marco legal peruano de la Ley N° 29783.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-secondary-900 mb-2">
              2. Confidencialidad y Protección de Datos Médicos
            </h3>
            <p>
              De conformidad con la Ley N° 29733 (Ley de Protección de Datos Personales) y la Ley General de Salud N° 26842, todas las historias clínicas, resultados de exámenes médicos ocupacionales e información médica de los colaboradores son de carácter confidencial y reservado.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-secondary-900 mb-2">
              3. Cotizaciones y Prestación de Servicios
            </h3>
            <p>
              Las cotizaciones emitidas a través de nuestros canales oficiales (sitio web, WhatsApp y correo corporativo) tienen una validez determinada en cada propuesta comercial. Los servicios contratados se programarán previa coordinación de fechas y protocolos solicitados por la empresa cliente.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-secondary-900 mb-2">
              4. Cumplimiento Normativo
            </h3>
            <p>
              Los procedimientos y evaluaciones se diseñan tomando como referencia los lineamientos aplicables emitidos por el Ministerio de Salud (MINSA), SUNAFIL y los reglamentos sectoriales. El alcance normativo específico se confirma en cada propuesta y debe revisarse según la actividad del cliente.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-primary-50 border border-primary-100 rounded-2xl p-5 mt-8">
            <ShieldCheck size={20} className="text-primary-600 shrink-0" />
            <p className="text-xs text-primary-800 font-semibold leading-relaxed">
              Para cualquier consulta legal o aclaración sobre nuestros términos y condiciones, puede escribir a <span className="underline font-bold">informes@vigmedical.com</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
