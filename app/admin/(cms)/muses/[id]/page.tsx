import { notFound } from "next/navigation";
import { MuseEditor } from "@/components/admin/muse-editor";
import { getMuseById } from "@/lib/cms-data";

export default async function EditMusePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) { const [muse, query] = await Promise.all([getMuseById((await params).id), searchParams]); if (!muse) notFound(); return <div className="mx-auto max-w-5xl"><header className="mb-7"><p className="admin-eyebrow">{muse.status}</p><h1 className="admin-title">Edit Muse</h1>{query.saved ? <p className="mt-3 text-sm font-semibold text-olive-700">Saved.</p> : null}</header><MuseEditor muse={muse} /></div>; }
