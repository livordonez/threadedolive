import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { logoutAction } from "@/app/admin/actions";

const links = [
  ["Dashboard", "/admin"],
  ["Makes", "/admin/makes"],
  ["Muses", "/admin/muses"],
  ["Moments", "/admin/moments"],
  ["Pages", "/admin/pages"],
  ["About", "/admin/about"],
  ["Navigation", "/admin/navigation"],
  ["Site Settings", "/admin/settings"],
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f3ea] text-charcoal-900 lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="admin-textile-bg border-b border-olive-900/10 px-5 py-5 text-linen-0 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
        <Link href="/admin" className="flex items-center gap-3">
          <BrandMark className="h-10 w-auto text-linen-0" loading="eager" sizes="60px" />
          <div><p className="font-serif text-2xl">Threaded Olive</p><p className="text-[0.65rem] uppercase tracking-[0.22em] text-brass-100">Editor</p></div>
        </Link>
        <nav className="mt-7 flex gap-2 overflow-x-auto pb-2 lg:flex-col" aria-label="Editor navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-semibold text-linen-0/85 hover:bg-white/10 hover:text-white">{label}</Link>
          ))}
        </nav>
        <form action={logoutAction} className="mt-5 lg:mt-10">
          <button className="text-sm text-linen-0/65 underline underline-offset-4">Sign out</button>
        </form>
      </aside>
      <main className="min-w-0 p-5 sm:p-8 lg:p-10">{children}</main>
    </div>
  );
}
