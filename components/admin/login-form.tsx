"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/admin/actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);
  return (
    <form action={action} className="mt-8 space-y-5">
      <label className="block text-sm font-semibold">Email<input name="email" type="email" autoComplete="email" required className="admin-input mt-2" /></label>
      <label className="block text-sm font-semibold">Password<input name="password" type="password" autoComplete="current-password" required className="admin-input mt-2" /></label>
      {state.error ? <p role="alert" className="rounded-xl bg-pimento-100 px-4 py-3 text-sm text-pimento-700">{state.error}</p> : null}
      <button disabled={pending} className="admin-button w-full">{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
