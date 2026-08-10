import { AboutEditor } from "@/components/admin/about-editor";
import { getAbout } from "@/lib/cms-data";

export default async function AboutAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) { const [about, query] = await Promise.all([getAbout(), searchParams]); return <div className="mx-auto max-w-5xl"><header className="mb-7"><p className="admin-eyebrow">Public page</p><h1 className="admin-title">About</h1>{query.saved ? <p className="mt-3 text-sm font-semibold text-olive-700">Saved.</p> : null}</header><AboutEditor about={about} /></div>; }
