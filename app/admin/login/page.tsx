import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Acceso administrativo | Vigmedical", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  if (await getAdminUser()) redirect("/admin");
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-slate-100 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <Image
            src="/api/media/logo"
            alt="Vigmedical"
            width={512}
            height={110}
            unoptimized
            className="mx-auto h-16 w-auto object-contain sm:h-20"
          />
          <h1 className="sr-only">Iniciar sesión</h1>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}
