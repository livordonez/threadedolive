import Link from "next/link";
import { CraftPill } from "@/components/craft-pill";
import { MediaPlaceholder } from "@/components/media-placeholder";
import type { ProjectSummary } from "@/lib/types";
import { formatMonthYear } from "@/lib/utils";

export function ProjectCard({
  project,
}: {
  project: ProjectSummary;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-olive-900/10 bg-white/85 shadow-[0_20px_50px_rgba(37,33,29,0.06)] transition-transform duration-200 hover:-translate-y-1 motion-reduce:transform-none">
      <Link href={`/portfolio/${project.slug}`} className="flex h-full flex-col">
        <MediaPlaceholder image={project.featuredImage} aspect="portrait" />
        <div className="flex h-full flex-col gap-5 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <CraftPill craft={project.craft} />
            <p className="text-xs uppercase tracking-[0.2em] text-charcoal-700">
              {formatMonthYear(project.completedOn)}
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-serif text-3xl leading-none tracking-[-0.04em] text-olive-900">
              {project.title}
            </h3>
            <p className="text-sm leading-7 text-charcoal-700">
              {project.excerpt}
            </p>
          </div>
          <span className="mt-auto text-sm font-semibold uppercase tracking-[0.18em] text-olive-900">
            View project
          </span>
        </div>
      </Link>
    </article>
  );
}
