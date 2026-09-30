import Link from "next/link";

export default function NotFound() {
  return <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"><p className="text-primary-600 font-bold">Error 404</p><h1 className="text-4xl font-extrabold text-slate-950 mt-2">Página no encontrada</h1><p className="text-slate-600 mt-4">La dirección solicitada no existe o fue trasladada.</p><Link href="/" className="mt-8 bg-primary-600 text-white font-bold px-6 py-3 rounded-xl">Volver al inicio</Link></section>;
}
