import { redirect } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { LoginForm } from "@/components/admin/login-form";
import { getAdmin } from "@/lib/admin-auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function AdminLoginPage() {
  if (await getAdmin()) redirect("/admin");
  const configured = isSupabaseConfigured();
  return <div className="admin-textile-bg grid min-h-screen place-items-center px-5 py-12"><div className="w-full max-w-md rounded-[2rem] bg-linen-0 p-8 shadow-2xl sm:p-10"><div className="flex items-center gap-3 text-olive-900"><BrandMark className="h-12" /><div><h1 className="font-serif text-3xl">Threaded Olive</h1><p className="text-xs font-bold uppercase tracking-[0.2em] text-pimento-700">Private editor</p></div></div>{configured ? <><p className="mt-7 text-sm leading-7 text-charcoal-700">Sign in with the owner account. There is no public registration.</p><LoginForm /></> : <div className="mt-7 rounded-2xl bg-olive-50 p-5 text-sm leading-7 text-charcoal-700"><p className="font-bold text-olive-900">Supabase setup is still needed.</p><p className="mt-2">Add the two values from <code>.env.example</code>, then run the included database migration. The setup guide has the exact steps.</p></div>}</div></div>;
}
