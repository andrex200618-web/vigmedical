import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, Zap, Heart } from "lucide-react";

export default function AboutSection() {
  const values = [
    {
      title: "Médicos Especialistas",
      description: "Contamos con un staff de médicos ocupacionales y enfermeros altamente calificados y certificados.",
      icon: Heart,
      color: "text-rose-500 bg-rose-50",
    },
    {
      title: "Conformidad Legal",
      description: "Diseñamos nuestros protocolos y monitoreos tomando como referencia la Ley N° 29783 y las disposiciones aplicables de SUNAFIL.",
      icon: ShieldCheck,
      color: "text-primary-600 bg-primary-50",
    },
    {
      title: "Resultados Digitales",
      description: "Entregamos informes médicos detallados y consolidados de forma rápida mediante canales seguros.",
      icon: Zap,
      color: "text-amber-500 bg-amber-50",
    },
    {
      title: "Equipos Calibrados",
      description: "Gestionamos la calibración de los dispositivos de diagnóstico según el servicio y los requisitos aplicables.",
      icon: Award,
      color: "text-primary-500 bg-primary-50",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">
              SOBRE NOSOTROS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold title-red-gradient leading-tight mb-6 animate-title-reveal uppercase tracking-tight">
              ¿QUIÉNES SOMOS?
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              En Vigmedical, nos dedicamos a ofrecer soluciones integrales diseñadas para proteger el activo más valioso de tu organización: tus colaboradores. Brindamos soporte médico y técnico oportuno y especializado, ayudando a las empresas a crear ambientes de trabajo seguros, productivos y conformes con la ley.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              Creemos que la medicina preventiva es la clave para potenciar la competitividad de las empresas. Por ello, diseñamos planes a medida de acuerdo con el rubro comercial, ya sea construcción, minería, comercio, manufactura o servicios de oficina.
            </p>
            <div>
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-bold text-base transition-colors border-b-2 border-primary-500/20 hover:border-primary-600 pb-1"
              >
                Conoce más de nuestra historia y valores
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right Cards Column */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up">
            {values.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-100 hover:border-primary-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className={`p-3 rounded-xl w-fit mb-4 transition-transform group-hover:scale-110 ${item.color}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
