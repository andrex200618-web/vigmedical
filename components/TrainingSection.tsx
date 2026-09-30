"use client";

import React from "react";
import Image from "next/image";
import ExternalEmbed from "@/components/ExternalEmbed";
import Link from "next/link";
import { trainingsData } from "@/data/trainings";
import { Clock } from "lucide-react";

interface TrainingSectionProps {
  hideTitle?: boolean;
}

export default function TrainingSection({ hideTitle = false }: TrainingSectionProps) {

  return (
    <>
      {/* ── COURSES GRID ─────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">

          {/* Section Header */}
          {!hideTitle && (
            <div className="text-center max-w-4xl mx-auto mb-12 animate-title-reveal">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold title-red-gradient leading-tight uppercase tracking-tight">
                NUESTRAS CAPACITACIONES
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-3.5 rounded-full shadow-[0_0_8px_rgba(227,5,20,0.5)]" />
            </div>
          )}

          {/* Courses Grid — 2 columns, wider & taller */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingsData.map((course) => (
              <div
                key={course.id}
                id={course.id}
                className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group scroll-mt-24 animate-fade-in-up"
              >
                {/* Image — taller */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={course.image}
                    unoptimized
                    alt={course.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-base font-extrabold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {course.description}
                  </p>

                  {/* Duration badge */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-5">
                    <Clock size={13} className="text-primary-600 shrink-0" />
                    <span>{course.duration}</span>
                  </div>

                  {/* Footer button */}
                  <div className="mt-auto">
                    <Link
                      href={`/capacitaciones/${course.id}`}
                      className="w-full block bg-primary-600 hover:bg-primary-700 text-white text-center text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
                    >
                      Cotizar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO SECTION ─────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">

          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold title-red-gradient leading-tight uppercase tracking-tight">
              MIRA CÓMO CAPACITAMOS A TU EQUIPO
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
              Metodologías dinámicas, certificación incluida y contenido adaptado al nivel de riesgo de tu sector.
            </p>
          </div>

          {/* YouTube Embed */}
          <ExternalEmbed src="https://www.youtube-nocookie.com/embed/yxyVz_AMp8g?start=3&rel=0&modestbranding=1" title="Nuestras capacitaciones – Vigmedical" provider="YouTube" externalUrl="https://www.youtube.com/watch?v=yxyVz_AMp8g&t=3s" showDirectly />

        </div>
      </section>
    </>
  );
}
