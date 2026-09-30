"use client";

import React, { useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { AlertCircle, BookOpen, CheckCircle2, Download, Printer, Send } from "lucide-react";
import { company } from "@/data/company";

const initialForm = {
  consumerName: "", documentType: "DNI", documentNumber: "", consumerAddress: "", phone: "", email: "",
  isMinor: false, guardianName: "", guardianDocument: "", itemType: "SERVICIO", itemDescription: "",
  amount: "", complaintType: "RECLAMO", detail: "", consumerRequest: "", acceptedTerms: false,
};
type Provider = { legalName: string; ruc: string; address: string };
type Confirmation = { code: string; submittedAt: string; snapshot: typeof initialForm; provider: Provider };

export default function LibroReclamacionesPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const legalName = company.legalName;
  const ruc = company.ruc;
  const address = company.address;

  const change = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = event.target as HTMLInputElement;
    setForm((current) => ({ ...current, [target.name]: target.type === "checkbox" ? target.checked : target.value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nativeForm = new FormData(event.currentTarget);
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
          website: nativeForm.get("website")?.toString() || "",
          turnstileToken: nativeForm.get("cf-turnstile-response")?.toString() || "",
        }),
      });
      const result = (await response.json()) as { message?: string; code?: string; submittedAt?: string; provider?: Provider };
      if (!response.ok || !result.code || !result.submittedAt || !result.provider) throw new Error(result.message || "No pudimos registrar la hoja.");
      setConfirmation({ code: result.code, submittedAt: result.submittedAt, snapshot: form, provider: result.provider });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "No pudimos registrar la hoja.");
    } finally { setLoading(false); }
  };

  const downloadReceipt = () => {
    if (!confirmation) return;
    const f = confirmation.snapshot;
    const provider = confirmation.provider;
    const representative = f.isMinor ? `\nRepresentante: ${f.guardianName}\nDocumento del representante: ${f.guardianDocument}` : "";
    const receipt = `HOJA DE RECLAMACIÓN VIRTUAL\nCódigo: ${confirmation.code}\nFecha: ${new Date(confirmation.submittedAt).toLocaleString("es-PE")}\n\nPROVEEDOR\n${provider.legalName}\nRUC: ${provider.ruc}\n${provider.address}\n\nCONSUMIDOR\n${f.consumerName}\n${f.documentType}: ${f.documentNumber}\nDomicilio: ${f.consumerAddress}\nTeléfono: ${f.phone}\nCorreo: ${f.email}${representative}\n\n${f.complaintType}\n${f.itemType}: ${f.itemDescription}\nMonto: S/ ${Number(f.amount).toFixed(2)}\nDetalle: ${f.detail}\nPedido: ${f.consumerRequest}\nAcciones del proveedor: Pendientes de respuesta\n\nEl proveedor responderá en un máximo de 15 días hábiles improrrogables.`;
    const url = URL.createObjectURL(new Blob([receipt], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = `${confirmation.code}.txt`; link.click(); URL.revokeObjectURL(url);
  };

  const inputClass = "mt-1 w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:bg-white";

  return (
    <div className="w-full bg-white min-h-screen">
      <section className="relative h-[320px] bg-gradient-to-br from-secondary-950 via-slate-900 to-secondary-900 text-white flex items-center justify-center text-center px-4">
        <div><h1 className="text-3xl md:text-5xl font-extrabold uppercase">Libro de Reclamaciones</h1><p className="mt-4 text-sm text-slate-300">Hoja de Reclamación Virtual</p></div>
      </section>
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="border-2 border-primary-500/30 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
          <header className="flex gap-4 pb-6 border-b"><BookOpen className="text-primary-600 shrink-0" /><div><h2 className="font-extrabold">Identificación del proveedor</h2><p className="text-sm text-slate-600">{legalName} · RUC {ruc}<br />{address}</p></div></header>
          {confirmation ? (
            <div role="status" className="bg-primary-50 border border-primary-200 rounded-2xl p-8 text-center space-y-5">
              <CheckCircle2 className="mx-auto text-primary-600" size={44} />
              <h2 className="text-xl font-extrabold">REGISTRADO CORRECTAMENTE</h2>
              <p className="text-sm">Código de seguimiento</p><p className="text-2xl font-mono font-bold text-primary-700">{confirmation.code}</p>
              <p className="text-sm text-slate-600">Fecha: {new Date(confirmation.submittedAt).toLocaleString("es-PE")}<br />Recibirás respuesta escrita en un máximo de 15 días hábiles improrrogables.</p>
              <div className="bg-white border rounded-xl p-5 text-left text-sm space-y-4">
                <div><h3 className="font-bold uppercase text-xs text-slate-500">Proveedor</h3><p>{confirmation.provider.legalName} · RUC {confirmation.provider.ruc}<br />{confirmation.provider.address}</p></div>
                <div><h3 className="font-bold uppercase text-xs text-slate-500">Consumidor</h3><p>{confirmation.snapshot.consumerName}<br />{confirmation.snapshot.documentType}: {confirmation.snapshot.documentNumber}<br />{confirmation.snapshot.consumerAddress}<br />{confirmation.snapshot.phone} · {confirmation.snapshot.email}</p>{confirmation.snapshot.isMinor && <p>Representante: {confirmation.snapshot.guardianName} · {confirmation.snapshot.guardianDocument}</p>}</div>
                <div><h3 className="font-bold uppercase text-xs text-slate-500">Producto o servicio</h3><p>{confirmation.snapshot.itemType}: {confirmation.snapshot.itemDescription}<br />Monto: S/ {Number(confirmation.snapshot.amount).toFixed(2)}</p></div>
                <div><h3 className="font-bold uppercase text-xs text-slate-500">{confirmation.snapshot.complaintType}</h3><p><strong>Detalle:</strong> {confirmation.snapshot.detail}<br /><strong>Pedido:</strong> {confirmation.snapshot.consumerRequest}<br /><strong>Acciones del proveedor:</strong> Pendientes de respuesta</p></div>
              </div>
              <div className="flex flex-wrap justify-center gap-3 print:hidden">
                <button type="button" onClick={downloadReceipt} className="bg-primary-600 text-white px-5 py-3 rounded-xl font-bold flex gap-2"><Download size={17} />Descargar constancia</button>
                <button type="button" onClick={() => window.print()} className="bg-slate-900 text-white px-5 py-3 rounded-xl font-bold flex gap-2"><Printer size={17} />Imprimir</button>
                <button type="button" onClick={() => window.location.reload()} className="border px-5 py-3 rounded-xl font-bold">Registrar otra hoja</button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-8">
              <div className="absolute -left-[10000px]" aria-hidden="true"><label htmlFor="complaint-website">Sitio web</label><input id="complaint-website" name="website" tabIndex={-1} autoComplete="off" /></div>
              <fieldset className="space-y-4"><legend className="font-bold uppercase text-sm mb-4">1. Identificación del consumidor</legend>
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="text-sm font-semibold">Nombres y apellidos *<input className={inputClass} name="consumerName" value={form.consumerName} onChange={change} maxLength={160} required /></label>
                  <label className="text-sm font-semibold">Tipo de documento *<select className={inputClass} name="documentType" value={form.documentType} onChange={change}><option>DNI</option><option>CE</option><option>PASAPORTE</option><option>RUC</option></select></label>
                  <label className="text-sm font-semibold">Número de documento *<input className={inputClass} name="documentNumber" value={form.documentNumber} onChange={change} maxLength={20} required /></label>
                  <label className="text-sm font-semibold">Domicilio *<input className={inputClass} name="consumerAddress" value={form.consumerAddress} onChange={change} maxLength={300} required /></label>
                  <label className="text-sm font-semibold">Teléfono *<input className={inputClass} type="tel" name="phone" value={form.phone} onChange={change} maxLength={20} required /></label>
                  <label className="text-sm font-semibold">Correo electrónico *<input className={inputClass} type="email" name="email" value={form.email} onChange={change} maxLength={254} required /></label>
                </div>
                <label className="flex gap-2 text-sm"><input type="checkbox" name="isMinor" checked={form.isMinor} onChange={change} />El consumidor es menor de edad</label>
                {form.isMinor && <div className="grid md:grid-cols-2 gap-4"><label className="text-sm font-semibold">Nombre del padre, madre o representante *<input className={inputClass} name="guardianName" value={form.guardianName} onChange={change} required /></label><label className="text-sm font-semibold">Documento del representante *<input className={inputClass} name="guardianDocument" value={form.guardianDocument} onChange={change} required /></label></div>}
              </fieldset>
              <fieldset className="space-y-4"><legend className="font-bold uppercase text-sm mb-4">2. Producto o servicio</legend>
                <div className="grid md:grid-cols-2 gap-4"><label className="text-sm font-semibold">Tipo *<select className={inputClass} name="itemType" value={form.itemType} onChange={change}><option value="SERVICIO">Servicio</option><option value="PRODUCTO">Producto</option></select></label><label className="text-sm font-semibold">Monto reclamado (S/) *<input className={inputClass} type="number" min="0" step="0.01" name="amount" value={form.amount} onChange={change} required /></label></div>
                <label className="text-sm font-semibold block">Descripción del producto o servicio *<input className={inputClass} name="itemDescription" value={form.itemDescription} onChange={change} maxLength={300} required /></label>
              </fieldset>
              <fieldset className="space-y-4"><legend className="font-bold uppercase text-sm mb-4">3. Detalle de la reclamación</legend>
                <label className="text-sm font-semibold block">Tipo *<select className={inputClass} name="complaintType" value={form.complaintType} onChange={change}><option value="RECLAMO">Reclamo — disconformidad con producto o servicio</option><option value="QUEJA">Queja — disconformidad con la atención</option></select></label>
                <label className="text-sm font-semibold block">Detalle *<textarea className={inputClass} rows={5} name="detail" value={form.detail} onChange={change} maxLength={3000} required /></label>
                <label className="text-sm font-semibold block">Pedido concreto del consumidor *<textarea className={inputClass} rows={4} name="consumerRequest" value={form.consumerRequest} onChange={change} maxLength={2000} required /></label>
              </fieldset>
              <div className="bg-slate-50 border rounded-xl p-4 text-xs text-slate-600 space-y-2"><p>La presentación de esta hoja no impide acudir a otros mecanismos de solución de controversias ni constituye requisito previo para interponer una denuncia ante Indecopi.</p><p>El proveedor responderá al correo indicado en un plazo máximo de 15 días hábiles improrrogables.</p></div>
              <label className="flex gap-3 text-sm"><input type="checkbox" name="acceptedTerms" checked={form.acceptedTerms} onChange={change} required /><span>Declaro que la información es verdadera y he leído la <Link href="/politica-de-privacidad" className="font-bold text-primary-700 underline">Política de Privacidad</Link>. Las hojas y constancias se conservarán por un mínimo de dos años. *</span></label>
              {siteKey && <><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" /><div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" /></>}
              {error && <div role="alert" className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl flex gap-2"><AlertCircle size={18} className="shrink-0" />{error}</div>}
              <button type="submit" disabled={loading} className="w-full bg-primary-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl flex justify-center gap-2"><Send size={18} />{loading ? "REGISTRANDO..." : "REGISTRAR"}</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
