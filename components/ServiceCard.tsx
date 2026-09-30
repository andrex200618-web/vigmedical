"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ServiceDetail } from "@/data/services";
import { Check } from "lucide-react";

interface ServiceCardProps {
  service: ServiceDetail;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div
      id={service.id}
      className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 h-full scroll-mt-24 animate-fade-in-up"
    >
      <div>
        {/* Service Image Header */}
        <div className="relative h-48 overflow-hidden">
          {service.image && (
            <Image
              src={service.image}
              unoptimized
              alt={service.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-base font-extrabold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors leading-snug">
            {service.title}
          </h3>

          <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
            {service.description}
          </p>

          {/* Top items preview */}
          <ul className="space-y-2 mb-4">
            {service.items.slice(0, 2).map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-slate-600">
                <Check size={13} className="text-primary-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
            {service.items.length > 2 && (
              <li className="text-xs font-semibold text-primary-600 flex items-center gap-1 pt-0.5">
                + {service.items.length - 2} más incluidos
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Button */}
      <div className="p-6 pt-0 mt-auto">
        <div className="pt-4 border-t border-slate-100">
          <Link
            href={`/servicios/${service.id}`}
            className="w-full block bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all text-center shadow-sm shadow-primary-500/10 hover:shadow-md active:scale-95"
          >
            Cotizar
          </Link>
        </div>
      </div>
    </div>
  );
}
