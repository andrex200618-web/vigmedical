"use client";

import { useState } from "react";

interface ExternalEmbedProps {
  src: string;
  title: string;
  provider: string;
  externalUrl: string;
  className?: string;
  showDirectly?: boolean;
}

export default function ExternalEmbed({ src, title, provider, externalUrl, className = "aspect-video", showDirectly = false }: ExternalEmbedProps) {
  const [accepted, setAccepted] = useState(showDirectly);
  return (
    <div className={`relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 ${className}`}>
      {accepted ? (
        <iframe title={title} src={src} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full border-0" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <p className="text-sm font-bold text-slate-900">Contenido externo de {provider}</p>
          <p className="mt-2 max-w-md text-xs text-slate-600">Al mostrarlo, tu navegador se conectará con {provider}, que puede recibir información técnica como tu dirección IP.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setAccepted(true)} className="rounded-lg bg-primary-600 px-4 py-2 text-xs font-bold text-white">Mostrar contenido</button>
            <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-800">Abrir externamente</a>
          </div>
        </div>
      )}
    </div>
  );
}
