"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { User, Mail, Phone, MessageSquare, Send, AlertCircle, CheckCircle } from "lucide-react";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const serviceName = searchParams.get("service");

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    mensaje: serviceName
      ? `Hola, estoy interesado en cotizar el servicio de: ${serviceName}. Agradecería que me brinden mayor información al respecto.`
      : "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nombres.trim()) newErrors.nombres = "El nombre es obligatorio.";
    if (!formData.apellidos.trim()) newErrors.apellidos = "El apellido es obligatorio.";
    
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingrese un correo electrónico válido.";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio.";
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.telefono)) {
      newErrors.telefono = "Ingrese un número de teléfono válido.";
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje no puede estar vacío.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const browserFormData = new FormData(e.currentTarget);
    const turnstileToken = browserFormData
      .get("cf-turnstile-response")
      ?.toString();
    const website = browserFormData.get("website")?.toString() || "";

    setLoading(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          website,
          turnstileToken,
          privacyAccepted,
        }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(
          result.message ||
            "No pudimos enviar tu mensaje. Inténtalo nuevamente más tarde.",
        );
      }

      setSubmitStatus("success");
      // Clear form
      setFormData({
        nombres: "",
        apellidos: "",
        email: "",
        telefono: "",
        mensaje: "",
      });
      setPrivacyAccepted(false);
    } catch (err: unknown) {
      setSubmitStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Ocurrió un error inesperado. Por favor, inténtalo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-150 p-6 md:p-10 rounded-3xl shadow-xl">
      <h3 className="text-2xl font-extrabold text-secondary-900 mb-2">Envíanos un mensaje</h3>
      <p className="text-slate-500 text-sm mb-8 leading-relaxed">
        Completa el siguiente formulario para que uno de nuestros asesores de salud ocupacional te contacte hoy mismo.
      </p>

      {/* Success Notification */}
      {submitStatus === "success" && (
        <div role="status" aria-live="polite" className="bg-primary-50 border border-primary-200 text-primary-800 p-4.5 rounded-2xl mb-8 flex items-start gap-3 animate-fade-in-up">
          <CheckCircle className="text-primary-500 shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-bold text-sm">¡Mensaje enviado con éxito!</h4>
            <p className="text-xs text-primary-700 mt-1">
              Gracias por escribirnos. Nuestro staff se pondrá en contacto contigo en breve para brindarte una propuesta personalizada.
            </p>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {submitStatus === "error" && (
        <div role="alert" className="bg-rose-50 border border-rose-200 text-rose-800 p-4.5 rounded-2xl mb-8 flex items-start gap-3 animate-fade-in-up">
          <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-bold text-sm">Error al enviar el mensaje</h4>
            <p className="text-xs text-rose-700 mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="absolute -left-[10000px]" aria-hidden="true">
          <label htmlFor="website">Sitio web</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Nombres */}
          <div>
            <label htmlFor="nombres" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Nombres *
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                id="nombres"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                required
                aria-invalid={Boolean(errors.nombres)}
                aria-describedby={errors.nombres ? "nombres-error" : undefined}
                className={`w-full pl-10.5 pr-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all text-secondary-900 ${
                  errors.nombres ? "border-rose-400 focus:border-rose-400" : "border-slate-200 focus:border-primary-500"
                }`}
                placeholder="Ej. Juan Carlos"
              />
            </div>
            {errors.nombres && <span id="nombres-error" className="text-xs font-semibold text-rose-500 mt-1.5 block">{errors.nombres}</span>}
          </div>

          {/* Apellidos */}
          <div>
            <label htmlFor="apellidos" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Apellidos *
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                required
                aria-invalid={Boolean(errors.apellidos)}
                aria-describedby={errors.apellidos ? "apellidos-error" : undefined}
                className={`w-full pl-10.5 pr-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all text-secondary-900 ${
                  errors.apellidos ? "border-rose-400 focus:border-rose-400" : "border-slate-200 focus:border-primary-500"
                }`}
                placeholder="Ej. Pérez Quispe"
              />
            </div>
            {errors.apellidos && <span id="apellidos-error" className="text-xs font-semibold text-rose-500 mt-1.5 block">{errors.apellidos}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Correo Electrónico */}
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Correo Electrónico *
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full pl-10.5 pr-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all text-secondary-900 ${
                  errors.email ? "border-rose-400 focus:border-rose-400" : "border-slate-200 focus:border-primary-500"
                }`}
                placeholder="ejemplo@correo.com"
              />
            </div>
            {errors.email && <span id="email-error" className="text-xs font-semibold text-rose-500 mt-1.5 block">{errors.email}</span>}
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Teléfono / WhatsApp *
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                aria-invalid={Boolean(errors.telefono)}
                aria-describedby={errors.telefono ? "telefono-error" : undefined}
                className={`w-full pl-10.5 pr-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all text-secondary-900 ${
                  errors.telefono ? "border-rose-400 focus:border-rose-400" : "border-slate-200 focus:border-primary-500"
                }`}
                placeholder="Ej. +51 987654321"
              />
            </div>
            {errors.telefono && <span id="telefono-error" className="text-xs font-semibold text-rose-500 mt-1.5 block">{errors.telefono}</span>}
          </div>
        </div>

        {/* Mensaje */}
        <div>
          <label htmlFor="mensaje" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Detalle de tu Consulta o Servicio a Cotizar *
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3.5 top-3 text-slate-400" size={16} />
            <textarea
              id="mensaje"
              name="mensaje"
              rows={4}
              value={formData.mensaje}
              onChange={handleChange}
              required
              minLength={10}
              aria-invalid={Boolean(errors.mensaje)}
              aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
              className={`w-full pl-10.5 pr-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:bg-white transition-all text-secondary-900 ${
                errors.mensaje ? "border-rose-400 focus:border-rose-400" : "border-slate-200 focus:border-primary-500"
              }`}
              placeholder="Descríbenos brevemente tu consulta laboral, cantidad aproximada de trabajadores o tipo de servicio que requieres cotizar..."
            />
          </div>
          {errors.mensaje && <span id="mensaje-error" className="text-xs font-semibold text-rose-500 mt-1.5 block">{errors.mensaje}</span>}
        </div>

        {turnstileSiteKey && (
          <>
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              strategy="afterInteractive"
            />
            <div
              className="cf-turnstile"
              data-sitekey={turnstileSiteKey}
              data-theme="light"
            />
          </>
        )}

        <label className="flex items-start gap-3 text-xs text-slate-600 leading-relaxed">
          <input type="checkbox" checked={privacyAccepted} onChange={(event) => setPrivacyAccepted(event.target.checked)} required className="mt-0.5" />
          <span>Autorizo el tratamiento de mis datos para atender esta consulta y declaro haber leído la <Link href="/politica-de-privacidad" className="font-bold text-primary-700 underline">Política de Privacidad</Link>. Los datos se conservarán hasta 24 meses. *</span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-primary-500/10 hover:shadow-lg flex items-center justify-center gap-2 transform active:scale-[0.98] ${
            loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Procesando solicitud...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Enviar Formulario</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={
      <div className="bg-white border border-slate-150 p-6 md:p-10 rounded-3xl shadow-xl flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    }>
      <ContactFormInner />
    </Suspense>
  );
}
