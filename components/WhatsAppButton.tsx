"use client";

import React, { useState, useEffect } from "react";
import { company } from "@/data/company";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds, then hide after 7 seconds
    const showTimer = setTimeout(() => setShowTooltip(true), 3000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 10000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const phoneNumber = company.whatsappNumber;
  const message = encodeURIComponent(
    "Hola Vigmedical, deseo saber más información sobre la empresa y sus servicios."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Dynamic Tooltip */}
      {showTooltip && (
        <div className="bg-primary-600 text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-lg shadow-primary-900/20 border border-primary-700 animate-fade-in-up whitespace-nowrap relative">
          <span>¿Necesitas ayuda? ¡Escríbenos!</span>
          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-primary-600 transform rotate-45 border-r border-t border-primary-700"></div>
        </div>
      )}

      {/* Button floating */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setShowTooltip(false)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 group relative border-2 border-white/20"
        aria-label="Contactar por WhatsApp"
      >
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping group-hover:animate-none pointer-events-none -z-10" />

        {/* WhatsApp Icon SVG */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.59 1.988 14.113.965 11.999.965 6.562.965 2.13 5.335 2.127 10.765c-.001 1.71.463 3.383 1.343 4.881l-.997 3.642 3.734-.979zM15.748 13.5c-.282-.14-.1.353-.872-.73l-.856-.4c-.166-.08-.3-.079-.43.089-.13.166-.5.624-.612.75-.113.127-.227.14-.509.001-.282-.14-1.189-.439-2.266-1.396-.838-.747-1.403-1.671-1.567-1.953-.165-.28-.018-.432.122-.571.127-.125.282-.33.424-.495.142-.166.19-.283.284-.47.095-.19.047-.356-.024-.497-.071-.14-.624-1.503-.856-2.061-.226-.546-.475-.472-.656-.482-.17-.008-.364-.01-.559-.01-.195 0-.514.074-.783.37-.269.296-1.024 1.002-1.024 2.443 0 1.44 1.049 2.836 1.196 3.033.147.197 2.064 3.153 5.001 4.423.699.302 1.244.482 1.671.618.702.223 1.34.191 1.845.115.563-.085 1.733-.708 1.979-1.393.246-.684.246-1.27.173-1.393-.073-.12-.27-.26-.552-.4z" />
        </svg>
      </a>
    </div>
  );
}
