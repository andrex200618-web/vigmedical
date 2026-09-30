"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Mail,
  HeartPulse,
  ChevronDown,
  Stethoscope,
  Activity,
  ShieldAlert,
  Gauge,
  Layout,
  ClipboardCheck,
  Shield,
  Home,
  HeartHandshake,
  GraduationCap,
} from "lucide-react";
import { servicesData } from "@/data/services";
import { trainingsData } from "@/data/trainings";

type LucideIconType = React.ComponentType<{ size?: number; className?: string }>;
const iconMap: Record<string, LucideIconType> = {
  HeartPulse,
  Stethoscope,
  Activity,
  ShieldAlert,
  Gauge,
  Layout,
  ClipboardCheck,
  Shield,
  Home,
  HeartHandshake,
  GraduationCap,
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const trigger = menuButtonRef.current;
    closeButtonRef.current?.focus();
    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = drawerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleDialogKeys);
    return () => {
      document.removeEventListener("keydown", handleDialogKeys);
      trigger?.focus();
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
    { name: "Capacitaciones", path: "/capacitaciones" },
    { name: "Normas Legales", path: "/normas-legales" },
    { name: "Nosotros", path: "/nosotros" },
    { name: "Contáctanos", path: "/contactanos" },
  ];

  return (
    <header className="w-full z-50">
      {/* Main Navbar */}
      <nav className="relative w-full bg-white border-b border-slate-100 py-4 px-4 md:px-8 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/api/media/logo"
              unoptimized
              alt="VIGMEDICAL"
              width={512}
              height={110}
              className="h-12 w-auto object-contain transition-transform group-hover:scale-[1.02] sm:h-14 lg:h-[4.5rem]"
            />
          </Link>

          {/* Desktop Menu - Centered */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              const dropdownServices = servicesData.flatMap((cat) => cat.details);

              if (link.name === "Servicios") {
                return (
                  <div key={link.path} className="relative group py-2">
                    <Link
                      href={link.path}
                      className={`px-2.5 xl:px-4 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all flex items-center gap-1 whitespace-nowrap ${
                        isActive
                          ? "text-primary-700 bg-primary-50 font-semibold"
                          : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180 text-slate-400 group-hover:text-primary-600" />
                    </Link>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[320px] bg-white border border-slate-100 shadow-xl rounded-2xl p-2 opacity-0 pointer-events-none translate-y-2 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 transition-all duration-200 z-50">
                      {dropdownServices.map((service) => {
                        const ServiceIcon = iconMap[service.icon] || HeartPulse;
                        return (
                          <Link
                            key={service.id}
                            href={`/servicios/${service.id}`}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group/item"
                          >
                            <div className="bg-primary-50 text-primary-600 p-2 rounded-lg shrink-0 transition-colors group-hover/item:bg-primary-600 group-hover/item:text-white">
                              <ServiceIcon size={16} />
                            </div>
                            <span className="text-xs font-semibold text-secondary-900 group-hover/item:text-primary-600 transition-colors leading-tight">
                              {service.title}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              if (link.name === "Capacitaciones") {
                return (
                  <div key={link.path} className="relative group py-2">
                    <Link
                      href={link.path}
                      className={`px-2.5 xl:px-4 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all flex items-center gap-1 whitespace-nowrap ${
                        isActive
                          ? "text-primary-700 bg-primary-50 font-semibold"
                          : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180 text-slate-400 group-hover:text-primary-600" />
                    </Link>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[320px] bg-white border border-slate-100 shadow-xl rounded-2xl p-2 opacity-0 pointer-events-none translate-y-2 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 transition-all duration-200 z-50">
                      {trainingsData.map((course) => {
                        return (
                          <Link
                            key={course.id}
                            href={`/capacitaciones/${course.id}`}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group/item"
                          >
                            <div className="bg-primary-50 text-primary-600 p-2 rounded-lg shrink-0 transition-colors group-hover/item:bg-primary-600 group-hover/item:text-white">
                              <GraduationCap size={16} />
                            </div>
                            <span className="text-xs font-semibold text-secondary-900 group-hover/item:text-primary-600 transition-colors leading-tight">
                              {course.title}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-2.5 xl:px-4 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "text-primary-700 bg-primary-50 font-semibold"
                      : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Social Icons (Desktop) / Mobile Toggle Button */}
          <div className="flex items-center gap-3">
            {/* Social Icons (Desktop) */}
            <div className="hidden lg:flex items-center gap-2">
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

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-primary-600 hover:bg-slate-50 transition-colors focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (Menu Overlay) */}
      <div
        ref={drawerRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-2xl p-6 transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Mobile Drawer Header */}
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <Image
                src="/api/media/logo"
                unoptimized
                alt="VIGMEDICAL"
                width={512}
                height={110}
                className="h-12 w-auto object-contain sm:h-14"
              />
            </Link>
            <button
              ref={closeButtonRef}
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-secondary-900 hover:bg-slate-50 transition-colors"
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`w-full text-center px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? "text-primary-700 bg-primary-50 font-semibold"
                      : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Drawer Footer */}
        <div className="border-t border-slate-100 pt-6 mt-auto">          <div className="flex justify-center gap-4 mb-5">
            <a
              href="https://www.facebook.com/profile.php?id=61564278111339"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-100/80 text-slate-600 hover:text-white hover:bg-[#1877F2] flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
              aria-label="Facebook"
            >
              <svg
                className="w-5 h-5 fill-current"
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
              className="w-10 h-10 rounded-full bg-slate-100/80 text-slate-600 hover:text-white hover:bg-black flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
              aria-label="TikTok"
            >
              <svg
                className="w-5 h-5 fill-current"
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
              className="w-10 h-10 rounded-full bg-slate-100/80 text-slate-600 hover:text-white hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
              aria-label="Instagram"
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 0 0 1.384 2.126A5.868 5.868 0 0 0 4.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 0 0 2.126-1.384 5.86 5.86 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126A5.847 5.847 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
              </svg>
            </a>
          </div>
          <div className="text-xs text-slate-500 flex flex-col gap-1 items-center">
            <span className="flex items-center gap-1.5">
              <Phone size={12} className="text-primary-600" /> +51 916 333 270
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={12} className="text-primary-600" /> contacto@vigmedical.com
            </span>
          </div>
        </div>
      </div>

    </header>
  );
}
