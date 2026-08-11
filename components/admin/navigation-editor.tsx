"use client";

import { useState } from "react";
import { saveNavigationAction } from "@/app/admin/actions";
import { AdminActionForm } from "@/components/admin/action-form";
import type { NavigationItem } from "@/lib/cms-types";

export function NavigationEditor({ initialItems }: { initialItems: NavigationItem[] }) {
  const [items, setItems] = useState(initialItems);
  function move(index: number, direction: -1 | 1) { const target = index + direction; if (target < 0 || target >= items.length) return; const next = [...items]; [next[index], next[target]] = [next[target], next[index]]; setItems(next); }
  return <AdminActionForm action={saveNavigationAction} className="space-y-5"><input type="hidden" name="items" value={JSON.stringify(items)} /><div className="space-y-3">{items.map((item, index) => <div key={item.id} className="admin-panel flex flex-wrap items-center gap-3"><div className="min-w-[12rem] flex-1"><label className="admin-label">Label<input value={item.label} onChange={(event) => setItems(items.map((candidate) => candidate.id === item.id ? { ...candidate, label: event.target.value } : candidate))} className="admin-input mt-2" /></label><p className="mt-2 text-xs text-charcoal-700">{item.href}</p></div><label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={item.visible} onChange={(event) => setItems(items.map((candidate) => candidate.id === item.id ? { ...candidate, visible: event.target.checked } : candidate))} className="h-5 w-5 accent-olive-700" />Shown</label><button type="button" onClick={() => move(index, -1)} disabled={index === 0} className="admin-mini">Up</button><button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1} className="admin-mini">Down</button></div>)}</div><button className="admin-button">Save Navigation</button></AdminActionForm>;
}
