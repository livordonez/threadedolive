import { notFound } from "next/navigation";
import { MakeEditor } from "@/components/admin/make-editor";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Make } from "@/lib/cms-types";

export default async function EditMakePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) { const { id } = await params; const supabase = await createSupabaseServerClient(); const { data } = await supabase.from("makes").select("*").eq("id", id).maybeSingle(); if (!data) notFound(); const { saved } = await searchParams; return <div className="mx-auto max-w-5xl"><header className="mb-7"><p className="admin-eyebrow">{(data as Make).status}</p><h1 className="admin-title">Edit Make</h1>{saved ? <p className="mt-3 text-sm font-semibold text-olive-700">Saved.</p> : null}</header><MakeEditor make={data as Make} /></div>; }
