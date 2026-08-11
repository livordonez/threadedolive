"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function AdminError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Admin route failed", error);
  }, [error]);

  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-olive-900/10 bg-white p-8 shadow-sm">
      <p className="admin-eyebrow">Editor interruption</p>
      <h1 className="admin-title mt-2">That did not finish.</h1>
      <p className="admin-help mt-4">
        Your editor is still available. Try loading this screen again; if the problem
        continues, return to the dashboard and try once more.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={() => unstable_retry()} className="admin-button">Try Again</button>
        <Link href="/admin" className="admin-button-secondary">Admin Home</Link>
      </div>
    </section>
  );
}
