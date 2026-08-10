import { NavigationEditor } from "@/components/admin/navigation-editor";
import { getNavigation } from "@/lib/cms-data";

export default async function NavigationAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) { const [items, query] = await Promise.all([getNavigation(true), searchParams]); return <div className="mx-auto max-w-5xl"><header className="mb-7"><p className="admin-eyebrow">Public site</p><h1 className="admin-title">Navigation</h1><p className="admin-help mt-3">Rename, show, hide, and reorder the links visitors see.</p>{query.saved ? <p className="mt-3 text-sm font-semibold text-olive-700">Saved.</p> : null}</header><NavigationEditor initialItems={items} /></div>; }
