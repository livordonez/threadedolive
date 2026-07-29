"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { ProjectCard } from "@/components/project-card";
import type { PortfolioFilter, ProjectSummary } from "@/lib/types";
import { crafts, portfolioFilters } from "@/lib/types";
import { cn } from "@/lib/utils";

function normalizeFilter(value: string | null): PortfolioFilter {
  if (!value) {
    return "All";
  }

  return crafts.includes(value as (typeof crafts)[number])
    ? (value as PortfolioFilter)
    : "All";
}

export function PortfolioBrowser({
  projects,
}: {
  projects: ProjectSummary[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFilter = normalizeFilter(searchParams.get("craft"));
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.craft === activeFilter);

  function setFilter(filter: PortfolioFilter) {
    const nextSearchParams = new URLSearchParams(searchParams.toString());

    if (filter === "All") {
      nextSearchParams.delete("craft");
    } else {
      nextSearchParams.set("craft", filter);
    }

    const query = nextSearchParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3" role="toolbar" aria-label="Filter portfolio by craft">
        {portfolioFilters.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setFilter(filter)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-200 motion-reduce:transition-none",
                isActive
                  ? "border-olive-900 bg-olive-900 text-linen-0"
                  : "border-olive-900/10 bg-white/80 text-olive-900 hover:border-olive-700/30 hover:bg-white",
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <p className="text-sm uppercase tracking-[0.18em] text-charcoal-700">
        {filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"}
        {activeFilter === "All" ? " across the studio" : ` in ${activeFilter}`}
      </p>

      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No projects in this filter yet"
          description="The filter state is working, but there is no sample content in this craft right now. Switch back to All or add a new project in content/projects."
          action={{ href: "/portfolio", label: "View all projects" }}
        />
      )}
    </div>
  );
}
