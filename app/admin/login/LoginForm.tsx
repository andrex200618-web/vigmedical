"use client";

import { useActionState } from "react";
import { LockKeyhole, LogIn, Mail } from "lucide-react";
import { loginAdmin, type LoginState } from "../actions";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAdmin, initialState);
  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="admin-email" className="mb-2 block text-sm font-bold text-slate-700">Correo administrativo</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input id="admin-email" name="email" type="email" autoComplete="username" required className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100" />
        </div>
      </div>
      <div>
        <label htmlFor="admin-password" className="mb-2 block text-sm font-bold text-slate-700">Contraseña</label>
        <div className="relative">
          <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input id="admin-password" name="password" type="password" autoComplete="current-password" minLength={8} required className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100" />
        </div>
      </div>
      {state.error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{state.error}</p>}
      <button disabled={pending} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 py-3 font-bold text-white hover:bg-primary-700 disabled:opacity-60">
        <LogIn size={18} /> {pending ? "Ingresando..." : "Ingresar al panel"}
      </button>
    </form>
  );
}
