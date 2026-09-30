import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { servicesData } from "@/data/services";
import { getManagedService } from "@/lib/service-cms";
import {
  CheckCircle,
  ShieldCheck,
  Layers,
} from "lucide-react";
import QuoteFormPanel from "@/components/QuoteFormPanel";

interface PageProps {
  params: Promise<{ id: string }>;
}

const allServices = servicesData.flatMap((cat) => cat.details);

export async function generateStaticParams() {
  return allServices.map((service) => ({ id: service.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const service = await getManagedService(id);
  if (!service) return {};
  return {
    title: `${service.title} | Vigmedical`,
    description: service.description,
    alternates: { canonical: `/servicios/${service.id}` },
    openGraph: { title: service.title, description: service.description, url: `/servicios/${service.id}`, images: [service.image] },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const service = await getManagedService(id);
  if (!service) notFound();

  return (
    <div className="w-full bg-white min-h-screen">

      {/* ── HERO BANNER ─────────────────────────────────────── */}
      <section className="relative h-[280px] sm:h-[340px] md:h-[400px] w-full overflow-hidden flex items-center justify-center text-center">
        {/* Service image background */}
        {service.image && (
          <Image
            src={service.image}
            unoptimized
            alt={service.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%] sm:object-center"
          />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-950/75 via-secondary-950/70 to-secondary-950/85" />
        {/* Grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
        {/* Red glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,5,20,0.12),transparent_65%)]" />

        <div className="relative z-10 flex flex-col items-center px-4 animate-title-reveal">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-2xl uppercase drop-shadow-lg text-center">
            {service.title}
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-4 rounded-full shadow-[0_0_12px_rgba(227,5,20,0.8)]" />
        </div>
      </section>

      {/* ── CONTENT ─────────────────────────────────────────── */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* LEFT — Main info */}
          <div className="lg:col-span-2 space-y-6">

            {/* Description card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-7 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Layers size={16} className="text-primary-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Descripción del Servicio
                </span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Alcance card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-7 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle size={16} className="text-primary-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Alcance Incluido
                </span>
              </div>
              <ul className="space-y-3">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-[10px] font-extrabold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compliance note */}
            <div className="flex items-start gap-3 bg-primary-50 border border-primary-100 rounded-2xl p-5">
              <ShieldCheck size={18} className="text-primary-600 mt-0.5 shrink-0" />
              <p className="text-sm text-primary-800 leading-relaxed">
                Servicio diseñado tomando como referencia la Ley N° 29783 y los lineamientos aplicables de MINSA y SUNAFIL. El alcance se valida para cada cliente y sector.
              </p>
            </div>

          </div>

          {/* RIGHT — Sticky CTA panel */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm sticky top-24">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-primary-500 to-primary-600" />

              <div className="p-6 space-y-5">
                <h3 className="text-base font-extrabold text-secondary-900">
                  ¿Interesado en este servicio?
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Solicita una cotización personalizada directamente por WhatsApp.
                </p>

                {/* Info rows */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Categoría</span>
                    <span className="bg-primary-50 text-primary-700 font-bold py-0.5 px-2.5 rounded-md">
                      {service.categoryTitle}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Ítems incluidos</span>
                    <span className="font-bold text-secondary-900">
                      {service.items.length} actividades
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-500 font-medium">Normativa</span>
                    <span className="font-semibold text-secondary-900 text-right max-w-[130px] leading-tight">
                      Ley N° 29783
                    </span>
                  </div>
                </div>

                {/* Interactive Quote Form Panel */}
                <QuoteFormPanel itemTitle={service.title} itemType="servicio" />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
