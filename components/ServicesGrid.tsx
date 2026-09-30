"use client";

import React, { useState, useEffect, useMemo } from "react";
import { servicesData as fallbackServices, type ServiceCategory } from "@/data/services";
import ServiceCard from "./ServiceCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ServicesGridProps {
  isCarousel?: boolean;
  hideTitle?: boolean;
  services?: ServiceCategory[];
}

export default function ServicesGrid({ isCarousel = false, hideTitle = false, services = fallbackServices }: ServicesGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // All service details
  const filteredDetails = useMemo(() => {
    return services.flatMap((cat) => cat.details);
  }, [services]);

  useEffect(() => {
    if (!isCarousel) return;

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isCarousel]);

  const totalItems = filteredDetails.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="py-16 md:py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative group/slider">
        
        {/* Title */}
        {!hideTitle && (
          <div className="text-center max-w-4xl mx-auto mb-12 animate-title-reveal">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold title-red-gradient leading-tight uppercase tracking-tight">
              NUESTROS SERVICIOS OCUPACIONALES
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-3.5 rounded-full shadow-[0_0_8px_rgba(227,5,20,0.5)]" />
          </div>
        )}

        {isCarousel ? (
          <>
            {/* Left Arrow Control */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-slate-200 bg-white/95 hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-primary-600 transition-all shadow-lg active:scale-95 cursor-pointer md:opacity-0 md:group-hover/slider:opacity-100 focus:opacity-100"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right Arrow Control */}
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-slate-200 bg-white/95 hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-primary-600 transition-all shadow-lg active:scale-95 cursor-pointer md:opacity-0 md:group-hover/slider:opacity-100 focus:opacity-100"
              aria-label="Siguiente"
            >
              <ChevronRight size={20} />
            </button>

            {/* Slider Container */}
            <div className="overflow-hidden px-2">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translate3d(-${currentIndex * (100 / itemsPerView)}%, 0, 0)`,
                }}
              >
                {filteredDetails.map((service, index) => (
                  <div
                    key={index}
                    className="shrink-0 px-2 md:px-4"
                    style={{
                      width: `${100 / itemsPerView}%`,
                    }}
                  >
                    <div className="h-full">
                      <ServiceCard service={service} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicators/Dots */}
            {maxIndex > 0 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? "w-8 bg-primary-600" : "w-2 bg-slate-300"
                    }`}
                    aria-label={`Ir al slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          /* Downwards Vertical Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredDetails.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
