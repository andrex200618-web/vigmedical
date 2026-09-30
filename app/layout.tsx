import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vigmedical.com"),
  title: "Vigmedical | Salud Ocupacional, Exámenes Médicos & SST en el Perú",
  description:
    "Especialistas en Evaluaciones Médicas Ocupacionales (EMO), Monitoreo e Higiene Ocupacional, y Asesoría en Seguridad y Salud en el Trabajo de acuerdo a la Ley N° 29783. Soluciones premium para empresas.",
  keywords: [
    "salud ocupacional",
    "medicina del trabajo",
    "examenes medicos ocupacionales",
    "EMO",
    "ley 29783",
    "monitoreo de ruido",
    "ergonomia peru",
    "seguridad y salud en el trabajo",
    "vigmedical",
  ],
  authors: [{ name: "Corporación Cahuana" }],
  icons: { icon: "/api/media/favicon" },
  robots: "index, follow",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "Vigmedical",
    title: "Vigmedical | Salud Ocupacional y SST en Cusco, Perú",
    description: "Servicios de salud ocupacional, seguridad y salud en el trabajo, higiene industrial y ergonomía para empresas en Perú.",
    url: "/",
    images: [{ url: "/api/media/hero", width: 1024, height: 1024, alt: "Vigmedical salud ocupacional" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vigmedical | Salud Ocupacional y SST",
    description: "Soluciones de salud ocupacional y SST para empresas en Perú.",
    images: ["/api/media/hero"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className="h-full antialiased scroll-smooth"
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["Organization", "LocalBusiness"],
          name: "Vigmedical S.A.C.",
          legalName: "VIGMEDICAL SOCIEDAD ANONIMA CERRADA",
          taxID: "20611580267",
          url: "https://vigmedical.com",
          email: "informes@vigmedical.com",
          telephone: "+51916333270",
          address: { "@type": "PostalAddress", streetAddress: "Av. Cusco Nro. 100 Int. B, Urb. San Sebastián", addressLocality: "San Sebastián", addressRegion: "Cusco", addressCountry: "PE" },
          sameAs: ["https://www.facebook.com/profile.php?id=61564278111339", "https://www.tiktok.com/@vigmedical", "https://www.instagram.com/vigmedical.salud/"]
        }).replace(/</g, "\\u003c") }} />
        {/* Global sticky header */}
        <Header />
        
        {/* Main pages wrapper */}
        <main className="flex-1 w-full flex flex-col">{children}</main>

        {/* Global footer & floating action buttons */}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
