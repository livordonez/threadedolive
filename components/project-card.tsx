import Link from "next/link";
import { CraftPill } from "@/components/craft-pill";
import { SanityImage } from "@/components/sanity-image";
import { formatMonthYear } from "@/lib/utils";
import type { Project } from "@/sanity/lib/types";

export function ProjectCard({
  project,
}: {
  project: Project;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-olive-900/10 bg-white/85 shadow-[0_20px_50px_rgba(37,33,29,0.06)] transition-transform duration-200 hover:-translate-y-1 motion-reduce:transform-none">
      <Link href={`/makes/${project.slug}`} className="flex h-full flex-col">
        <SanityImage
          image={project.mainImage}
          alt={`${project.title} main image`}
          label={project.title}
          aspect="portrait"
        />
        <div className="flex h-full flex-col gap-5 p-6">
          <div className="flex flex-wrap items-center gap-3">
            {project.craftType ? <CraftPill craft={project.craftType} /> : null}
            {project.completionDate ? (
              <p className="text-xs uppercase tracking-[0.2em] text-charcoal-700">
                {formatMonthYear(project.completionDate)}
              </p>
            ) : null}
          </div>
          <div className="space-y-3">
            <h3 className="font-serif text-3xl leading-none tracking-[-0.04em] text-olive-900">
              {project.title}
            </h3>
            {project.materialsOrYarn ? (
              <p className="text-sm leading-7 text-charcoal-700">
                {project.materialsOrYarn}
              </p>
            ) : null}
          </div>
          <span className="mt-auto text-sm font-semibold uppercase tracking-[0.18em] text-olive-900">
            Story Behind the Make
          </span>
        </div>
      </Link>
    </article>
  );
}
