import { notFound } from "next/navigation";
import { PageEditor } from "@/components/admin/page-editor";
import { getPageById } from "@/lib/cms-data";

export default async function EditPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) { const page = await getPageById((await params).id); if (!page) notFound(); const { saved } = await searchParams; return <div className="mx-auto max-w-5xl"><header className="mb-7"><p className="admin-eyebrow">{page.status}</p><h1 className="admin-title">Edit Page</h1>{saved ? <p className="mt-3 text-sm font-semibold text-olive-700">Saved.</p> : null}</header><PageEditor page={page} /></div>; }
