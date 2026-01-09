import { ArrowUpRight, Triangle } from "lucide-react";
import Link from "next/link";
import { ProjectsList } from "@/components/projects-list";

export default function ProjectsPage() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <header className="space-y-4 animate-in fade-in duration-700">
        <h1 className="text-5xl font-bold bg-linear-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
          Projects
        </h1>
        <p className="text-muted-foreground text-base animate-in fade-in slide-in-from-left-3 duration-700 delay-100">
          Selected work, experiments, and things I&apos;m building
        </p>
      </header>

      {/* Project List */}
      <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <ProjectsList />
      </section>

      {/* More */}
      <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-foreground flex items-center gap-2">
            <span className="text-muted-foreground inline-block hover:rotate-180 transition-transform duration-500">
              <Triangle className="w-4 h-4" />
            </span>
            <span className="bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              More
            </span>
          </h2>
          <Link
            href="https://github.com/raicdev"
            target="_blank"
            className="group text-sm text-muted-foreground hover:text-foreground transition-all flex items-center gap-1"
          >
            <span className="group-hover:underline underline-offset-4">View on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          Open-source prototypes, tiny experiments, and works in progress live on my GitHub.
        </p>
      </section>
    </div>
  );
}
