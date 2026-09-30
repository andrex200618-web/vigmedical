import React from "react";
import Link from "next/link";
import Image from "next/image";
import { company } from "@/data/company";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="relative bg-white text-slate-600 pt-16 pb-8 border-t border-slate-100 overflow-hidden">
      {/* Decorative Red Beam Divider (Rayos Rojos) */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-primary-600 to-transparent shadow-[0_0_12px_rgba(227,5,20,0.8)]" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Foot Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12 text-center sm:text-left">
          
          {/* Column 1: Brand */}
          <div className="flex items-center justify-center sm:justify-start h-full min-h-[64px]">
            <Link href="/" className="flex items-center justify-center group">
              <Image
                src="/api/media/logo"
                unoptimized
                alt="VIGMEDICAL"
                width={512}
                height={110}
                className="h-16 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>
          </div>

          {/* Column 2: Services */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-bold text-secondary-900 uppercase tracking-wider mb-5">
              Nuestros Servicios
            </h4>
            <ul className="space-y-3 text-xs flex flex-col items-center sm:items-start">
              <li>
                <Link href="/servicios/medico-ocupacional-planta" className="hover:text-primary-600 transition-colors text-slate-500">
                  Médico Ocupacional de Planta
                </Link>
              </li>
              <li>
                <Link href="/servicios/salud-ocupacional-ds005" className="hover:text-primary-600 transition-colors text-slate-500">
                  Salud Ocupacional (D.S.005-2012 TR)
                </Link>
              </li>
              <li>
                <Link href="/servicios/monitoreo-higiene-ds055" className="hover:text-primary-600 transition-colors text-slate-500">
                  Monitoreo de Higiene (D.S.055-2010 EM)
                </Link>
              </li>
              <li>
                <Link href="/servicios/ergonomia-rm375" className="hover:text-primary-600 transition-colors text-slate-500">
                  Ergonomía (RM 375-2008 TR)
                </Link>
              </li>
              <li>
                <Link href="/servicios/auditoria-seguridad-sso" className="hover:text-primary-600 transition-colors text-slate-500">
                  Auditoría de Seguridad y Salud
                </Link>
              </li>
              <li>
                <Link href="/servicios/equipos-proteccion-personal" className="hover:text-primary-600 transition-colors text-slate-500">
                  Equipos de Protección Personal
                </Link>
              </li>
              <li>
                <Link href="/servicios/consulta-medica-domicilio" className="hover:text-primary-600 transition-colors text-slate-500">
                  Atención Médica a Domicilio
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-bold text-secondary-900 uppercase tracking-wider mb-5">
              Contáctanos
            </h4>
            <ul className="space-y-3 text-xs flex flex-col items-center sm:items-start">
              <li className="flex items-start justify-center sm:justify-start gap-2.5">
                <MapPin size={15} className="text-primary-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-slate-600">
                  {company.address}
                </span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2.5">
                <Phone size={15} className="text-primary-500 shrink-0" />
                <a href="tel:+51916333270" className="text-slate-600 hover:text-primary-600 transition-colors">
                  +51 916 333 270
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2.5">
                <Phone size={15} className="text-primary-500 shrink-0" />
                <a href="tel:+51996708829" className="text-slate-600 hover:text-primary-600 transition-colors">
                  +51 996 708 829
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2.5">
                <Mail size={15} className="text-primary-500 shrink-0" />
                <a href="mailto:operaciones@vigmedical.com" className="text-slate-600 hover:text-primary-600 transition-colors">
                  operaciones@vigmedical.com
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2.5">
                <Mail size={15} className="text-primary-500 shrink-0" />
                <a href="mailto:informes@vigmedical.com" className="text-slate-600 hover:text-primary-600 transition-colors">
                  informes@vigmedical.com
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2.5">
                <Mail size={15} className="text-primary-500 shrink-0" />
                <a href="mailto:gerencia@vigmedical.com" className="text-slate-600 hover:text-primary-600 transition-colors">
                  gerencia@vigmedical.com
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2.5">
                <Mail size={15} className="text-primary-500 shrink-0" />
                <a href="mailto:administracion@vigmedical.com" className="text-slate-600 hover:text-primary-600 transition-colors">
                  administracion@vigmedical.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Networks */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-bold text-secondary-900 uppercase tracking-wider mb-5">
              Nuestras Redes Sociales
            </h4>
            <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-5">
              <a
                href="https://www.facebook.com/profile.php?id=61564278111339"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100/80 text-slate-600 hover:text-white hover:bg-[#1877F2] flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2C11.54 2 9.68 3.66 9.68 6.7V9.32H6.61v3.56H9.68V22h4.59V12.88h3.1l.46-3.56H14.27V6.7c0-1.02.13-1.38 0.85-1.38Z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@vigmedical"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100/80 text-slate-600 hover:text-white hover:bg-black flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                aria-label="TikTok"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/vigmedical.salud/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100/80 text-slate-600 hover:text-white hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 0 0 1.384 2.126A5.868 5.868 0 0 0 4.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 0 0 2.126-1.384 5.86 5.86 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126A5.847 5.847 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
                </svg>
              </a>
            </div>

            {/* Legal Links */}
            <ul className="space-y-3 text-xs mt-4 flex flex-col items-center sm:items-start">
              <li><Link href="/politica-de-privacidad" className="text-slate-500 hover:text-primary-600 transition-colors">Política de Privacidad</Link></li>
              <li>
                <Link
                  href="/terminos-y-condiciones"
                  className="text-slate-500 hover:text-primary-600 transition-colors"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/libro-de-reclamaciones"
                  className="text-slate-500 hover:text-primary-600 transition-colors"
                >
                  Libro de Reclamaciones
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 pt-8 text-center">
          <div className="text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
            <span>Copyright &copy; {currentYear} <strong>Vigmedical</strong>. Todos los derechos reservados.</span>
            <span className="hidden sm:inline mx-3 text-slate-350">|</span>
            <span className="text-slate-400 font-semibold">
              Desarrollado por{" "}
              <span className="text-slate-600 font-bold hover:text-primary-600 transition-colors">
                Corporación Cahuana
              </span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
