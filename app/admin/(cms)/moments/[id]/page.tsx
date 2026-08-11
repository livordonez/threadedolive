import { notFound } from "next/navigation";
import { MomentEditor } from "@/components/admin/moment-editor";
import { getMomentById } from "@/lib/cms-data";
import { richTextHtml } from "@/lib/rich-text";

export default async function EditMomentPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) { const [moment, query] = await Promise.all([getMomentById((await params).id), searchParams]); if (!moment) notFound(); return <div className="mx-auto max-w-5xl"><header className="mb-7"><p className="admin-eyebrow">{moment.status}</p><h1 className="admin-title">Edit Moment</h1>{query.saved ? <p className="mt-3 text-sm font-semibold text-olive-700">Saved.</p> : null}</header><MomentEditor moment={moment} initialBodyHtml={richTextHtml(moment.body)} /></div>; }
