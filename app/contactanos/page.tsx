import React from "react";
import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail } from "lucide-react";
import { company } from "@/data/company";
import ExternalEmbed from "@/components/ExternalEmbed";

export const metadata = {
  title: "Contáctanos | Vigmedical Salud Ocupacional",
  description: "Ponte en contacto con Vigmedical. Solicita cotizaciones para exámenes médicos pre-ocupacionales, periódicos y anuales, monitoreos ocupacionales y capacitaciones SST.",
  alternates: { canonical: "/contactanos" },
};

export default function ContactanosPage() {
  const contactDetails = [
    {
      title: "Ubicación Principal",
      value: company.address,
      icon: MapPin,
    },
    {
      title: "Central Telefónica",
      value: company.phones[0],
      icon: Phone,
    },
    {
      title: "Correo Electrónico",
      value: company.emails.information,
      icon: Mail,
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
            CONTÁCTANOS
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-4 rounded-full shadow-[0_0_12px_rgba(227,5,20,0.8)]" />
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Info cards & Map */}
            <div className="lg:col-span-7 space-y-8">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold text-secondary-900 mb-4">
                  ¿Cómo podemos ayudarte?
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
                  Ponte en contacto a través de nuestros canales oficiales o completa el formulario para poder ayudarte de manera personalizada.
                </p>
              </div>

              {/* Info Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {contactDetails.map((detail, index) => {
                  const Icon = detail.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white border border-slate-150 p-5 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center"
                    >
                      <div className="bg-primary-50 text-primary-600 p-2 rounded-lg w-fit mb-3">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                          {detail.title}
                        </h4>
                        <p className="text-xs font-bold text-secondary-900 leading-relaxed">
                          {detail.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Google Maps Container */}
              <div className="bg-white border border-slate-150 rounded-3xl p-5 shadow-sm overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Sede Principal (Cusco)
                  </span>
                </div>
                
                {/* Google Maps Embed iframe with Link Overlay */}
                <ExternalEmbed src="https://maps.google.com/maps?q=Av.%20Cusco%20Nro.%20100%20Int.%20B%2C%20Cusco%2C%20Peru&t=&z=17&ie=UTF8&iwloc=&output=embed" title="Ubicación Vigmedical" provider="Google Maps" externalUrl="https://maps.app.goo.gl/CVm2a4vyPrZW8XWb6" className="h-[250px]" />
              </div>
            </div>

            {/* Right Column: Contact form */}
            <div className="lg:col-span-5">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
