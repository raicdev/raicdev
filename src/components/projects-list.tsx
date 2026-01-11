import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";

const baseClasses =
  "group block space-y-1 p-3 -mx-3 rounded-lg hover:bg-muted/50 transition-all duration-300 border border-transparent hover:border-border hover:shadow-sm animate-in fade-in slide-in-from-left-2";

type ProjectsListProps = {
  items?: Project[];
  animationDelayStart?: number;
  animationDelayStep?: number;
};

export function ProjectsList({
  items = projects,
  animationDelayStart = 400,
  animationDelayStep = 100,
}: ProjectsListProps) {
  return (
    <div className="space-y-4">
      {items.map((project, index) => {
        const isExternal = project.href?.startsWith("http");
        const wrapperStyle = {
          animationDelay: `${animationDelayStart + index * animationDelayStep}ms`,
        };

        const content = (
          <>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-base font-medium text-foreground group-hover:text-foreground/90 transition-colors">
                {project.name}
              </h3>
              {project.href ? (
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              ) : null}
            </div>
            <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
              {project.description}
            </p>
          </>
        );

        if (!project.href) {
          return (
            <div key={project.name} className={baseClasses} style={wrapperStyle}>
              {content}
            </div>
          );
        }

        if (isExternal) {
          return (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className={baseClasses}
              style={wrapperStyle}
            >
              {content}
            </a>
          );
        }

        return (
          <Link
            key={project.name}
            to={project.href}
            className={baseClasses}
            style={wrapperStyle}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}
