"use client";

import React, { useState } from "react";
import { MessageCircle, Mail, Building2, User, Phone, Users } from "lucide-react";
import { company } from "@/data/company";

interface QuoteFormPanelProps {
  itemTitle: string;
  itemType: "servicio" | "capacitacion";
}

export default function QuoteFormPanel({
  itemTitle,
  itemType,
}: QuoteFormPanelProps) {
  const [empresa, setEmpresa] = useState("");
  const [contacto, setContacto] = useState("");
  const [celular, setCelular] = useState("");
  const [cantidad, setCantidad] = useState("");

  const handleWhatsApp = () => {
    let msg = `Hola Vigmedical, deseo solicitar una cotización para ${
      itemType === "servicio" ? "el servicio" : "la capacitación"
    }: *${itemTitle}*.\n\n`;

    msg += `*Empresa:* ${empresa.trim() || "(No especificado)"}\n`;
    msg += `*Contacto:* ${contacto.trim() || "(No especificado)"}\n`;
    msg += `*Celular:* ${celular.trim() || "(No especificado)"}\n`;
    msg += `*N° de ${itemType === "servicio" ? "Trabajadores" : "Participantes"}:* ${
      cantidad.trim() || "(No especificado)"
    }`;

    const url = `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleMail = () => {
    const subject = `Cotización ${
      itemType === "servicio" ? "Servicio" : "Capacitación"
    }: ${itemTitle}`;

    let body = `Hola Vigmedical,\n\nDeseo solicitar una cotización para ${
      itemType === "servicio" ? "el servicio" : "la capacitación"
    }: ${itemTitle}.\n\n`;

    body += `Empresa: ${empresa.trim() || "No especificado"}\n`;
    body += `Nombre de Contacto: ${contacto.trim() || "No especificado"}\n`;
    body += `Celular / Teléfono: ${celular.trim() || "No especificado"}\n`;
    body += `N° de ${itemType === "servicio" ? "Trabajadores" : "Participantes"}: ${
      cantidad.trim() || "No especificado"
    }\n\n`;
    body += `Solicitado desde vigmedical.com`;

    const url = `mailto:${company.emails.information}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  return (
    <div className="space-y-4">
      {/* Form Fields */}
      <div className="space-y-3 pt-2">
        <div>
          <label htmlFor="quote-company" className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Empresa
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Building2 size={14} />
            </div>
            <input
              id="quote-company"
              type="text"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              placeholder="Nombre de tu empresa"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-secondary-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="quote-contact" className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Tu Nombre
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User size={14} />
            </div>
            <input
              id="quote-contact"
              type="text"
              value={contacto}
              onChange={(e) => setContacto(e.target.value)}
              placeholder="Nombre de contacto"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-secondary-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="quote-phone" className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Celular
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                <Phone size={13} />
              </div>
              <input
                id="quote-phone"
                type="tel"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                placeholder="912 345 678"
                className="w-full pl-8 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-secondary-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="quote-quantity" className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              {itemType === "servicio" ? "Trabajadores" : "Participantes"}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                <Users size={13} />
              </div>
              <input
                id="quote-quantity"
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                placeholder="Ej: 20"
                className="w-full pl-8 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-secondary-900 focus:outline-none focus:border-primary-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-2 pt-2">
        <button
          type="button"
          onClick={handleWhatsApp}
          className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-emerald-500/15 hover:shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] text-xs uppercase tracking-wide cursor-pointer"
        >
          <MessageCircle size={15} />
          Cotizar por WhatsApp
        </button>

        <button
          type="button"
          onClick={handleMail}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98] text-xs uppercase tracking-wide cursor-pointer"
        >
          <Mail size={15} />
          Cotizar por Correo
        </button>
      </div>
    </div>
  );
}
