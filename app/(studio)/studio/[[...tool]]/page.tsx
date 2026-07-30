import type { Metadata, Viewport } from "next";
import { connection } from "next/server";
import { EmptyState } from "@/components/empty-state";
import { isSanityConfigured } from "@/sanity/lib/env";
import config from "../../../../sanity.config";
import { NextStudio } from "next-sanity/studio";

export const metadata: Metadata = {
  referrer: "same-origin",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function StudioPage() {
  await connection();

  if (!isSanityConfigured) {
    return (
      <section className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-20 sm:px-10">
        <EmptyState
          title="Sanity project setup required"
          description="Run `npx sanity@latest init`, sign in, create or select the Threaded Olive project, choose the `production` dataset, and then add the generated project ID and dataset to your local env file."
        />
      </section>
    );
  }

  return <NextStudio config={config} />;
}
