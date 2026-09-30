import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { trainingsData } from "@/data/trainings";
import {
  Clock,
  Users,
  CheckCircle,
  Award,
  Layers,
} from "lucide-react";
import QuoteFormPanel from "@/components/QuoteFormPanel";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return trainingsData.map((course) => ({ id: course.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const course = trainingsData.find((c) => c.id === id);
  if (!course) return {};
  return {
    title: `${course.category} | Vigmedical`,
    description: course.description,
    alternates: { canonical: `/capacitaciones/${course.id}` },
    openGraph: { title: course.title, description: course.description, url: `/capacitaciones/${course.id}`, images: [course.image] },
  };
}

export default async function TrainingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const course = trainingsData.find((c) => c.id === id);
  if (!course) notFound();

  return (
    <div className="w-full bg-white min-h-screen">

      {/* ── HERO BANNER ─────────────────────────────────────── */}
      <section className="relative h-[280px] sm:h-[340px] md:h-[400px] w-full overflow-hidden flex items-center justify-center text-center">
        {/* Course image background */}
        <Image
          src={course.image}
          unoptimized
          alt={course.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] sm:object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-950/75 via-secondary-950/70 to-secondary-950/85" />
        {/* Grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
        {/* Red glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,5,20,0.12),transparent_65%)]" />

        <div className="relative z-10 flex flex-col items-center px-4 animate-title-reveal">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-2xl uppercase drop-shadow-lg text-center">
            {course.title}
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-4 rounded-full shadow-[0_0_12px_rgba(227,5,20,0.8)]" />

          {/* Meta pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-5">
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-xs font-semibold py-1.5 px-4 rounded-full">
              <Clock size={12} className="text-primary-400" />
              {course.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-xs font-semibold py-1.5 px-4 rounded-full">
              <Users size={12} className="text-primary-400" />
              {course.targetAudience}
            </span>
          </div>
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
                  Descripción del Curso
                </span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Syllabus card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-7 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle size={16} className="text-primary-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Temario Principal
                </span>
              </div>
              <ul className="space-y-3">
                {course.syllabus.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-[10px] font-extrabold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* RIGHT — Sticky CTA panel */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm sticky top-24">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-primary-500 to-primary-600" />

              <div className="p-6 space-y-5">
                <h3 className="text-base font-extrabold text-secondary-900">
                  ¿Interesado en este curso?
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Solicita una cotización adaptada a la cantidad de trabajadores y el sector de tu empresa.
                </p>

                {/* Info rows */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Duración</span>
                    <span className="font-bold text-secondary-900 flex items-center gap-1.5">
                      <Clock size={12} className="text-primary-600" />
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Modalidad</span>
                    <span className="bg-primary-50 text-primary-700 font-bold py-0.5 px-2.5 rounded-md">
                      {course.modality}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-500 font-medium">Público</span>
                    <span className="font-semibold text-secondary-900 text-right max-w-[130px] leading-tight">
                      {course.targetAudience}
                    </span>
                  </div>
                </div>

                {/* Certificate badge */}
                <div className="flex items-center gap-2.5 bg-primary-50 border border-primary-100 rounded-xl py-3 px-3.5">
                  <Award size={15} className="text-primary-600 shrink-0" />
                  <span className="text-xs text-primary-700 font-semibold leading-tight">
                    Incluye certificación e informe final
                  </span>
                </div>

                {/* Interactive Quote Form Panel */}
                <QuoteFormPanel itemTitle={course.title} itemType="capacitacion" />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
