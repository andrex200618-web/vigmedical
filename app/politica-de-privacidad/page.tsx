import type { Metadata } from "next";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Política de Privacidad | Vigmedical",
  description: "Información sobre el tratamiento y protección de datos personales en Vigmedical.",
  alternates: { canonical: "/politica-de-privacidad" },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-16 text-slate-700 leading-relaxed">
      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-950 mb-8">Política de Privacidad</h1>
      <p className="mb-8">Última actualización: 6 de septiembre de 2026</p>
      <div className="space-y-7">
        <section><h2 className="text-xl font-bold text-slate-950 mb-2">1. Responsable</h2><p>{company.legalName}, RUC N° {company.ruc}, con domicilio en {company.address}, es responsable del tratamiento de los datos recopilados mediante este sitio.</p></section>
        <section><h2 className="text-xl font-bold text-slate-950 mb-2">2. Datos y finalidades</h2><p>Los formularios pueden recopilar nombres, documento, domicilio, teléfono, correo y el contenido de consultas o reclamaciones. Se utilizan para responder solicitudes, preparar cotizaciones, gestionar servicios y atender obligaciones de protección al consumidor.</p></section>
        <section><h2 className="text-xl font-bold text-slate-950 mb-2">3. Base legal</h2><p>Tratamos los datos con el consentimiento informado del titular, para atender medidas solicitadas por este y, en el Libro de Reclamaciones, para cumplir obligaciones legales. Aplicamos la Ley N° 29733 y su Reglamento aprobado por el D.S. N° 016-2024-JUS.</p></section>
        <section><h2 className="text-xl font-bold text-slate-950 mb-2">4. Conservación</h2><p>Las consultas comerciales se conservan hasta 24 meses desde la última interacción. Las hojas de reclamación, respuestas y constancias se conservan por un mínimo de dos años desde su presentación o más tiempo cuando una obligación o procedimiento vigente lo requiera.</p></section>
        <section><h2 className="text-xl font-bold text-slate-950 mb-2">5. Encargados y transferencias</h2><p>La información se aloja mediante Supabase y Vercel, proveedores tecnológicos que pueden procesar datos fuera del Perú bajo medidas contractuales y técnicas de seguridad. Los contenidos de YouTube y Google Maps solo se conectan después de tu autorización. No vendemos datos personales ni los utilizamos para publicidad ajena.</p></section>
        <section><h2 className="text-xl font-bold text-slate-950 mb-2">6. Derechos ARCO</h2><p>Puedes solicitar información, acceso, rectificación, cancelación u oposición escribiendo a administracion@vigmedical.com, acreditando tu identidad e indicando la solicitud concreta. También puedes acudir ante la Autoridad Nacional de Protección de Datos Personales.</p></section>
        <section><h2 className="text-xl font-bold text-slate-950 mb-2">7. Contacto</h2><p>Correo: administracion@vigmedical.com. Dirección: {company.address}.</p></section>
      </div>
    </article>
  );
}
