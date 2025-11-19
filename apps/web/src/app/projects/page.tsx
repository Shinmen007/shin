import { Metadata } from "next";
import { allProjects } from "contentlayer/generated";
import { ProjectsGrid } from "@/components/projects/projects-grid";

export const metadata: Metadata = {
  title: "Projects | Roshan Khatri",
  description:
    "Explore my portfolio of full-stack projects featuring AI/ML, 3D graphics, real-time systems, and modern web applications.",
  openGraph: {
    title: "Projects | Roshan Khatri",
    description:
      "Explore my portfolio of full-stack projects featuring AI/ML, 3D graphics, real-time systems, and modern web applications.",
    type: "website",
  },
};

export default function ProjectsPage() {
  // Sort projects by date (newest first)
  const projects = allProjects
    .filter((project) => project.published)
    .sort((a, b) => {
      const dateA = new Date(a.dates.end || a.dates.start);
      const dateB = new Date(b.dates.end || b.dates.start);
      return dateB.getTime() - dateA.getTime();
    });

  // Extract unique tags and stack items for filters
  const allTags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort();

  const allStackItems = Array.from(new Set(projects.flatMap((project) => project.stack))).sort();

  return (
    <div className="container py-12">
      <div className="mb-16 space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
            A collection of full-stack projects showcasing expertise in AI/ML, 3D graphics,
            real-time systems, and modern web development.
          </p>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <div className="bg-cyber-cyan h-2 w-2 animate-pulse rounded-full" />
            <span>{projects.length} Projects</span>
          </div>
          <div className="bg-border h-4 w-px" />
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <div className="bg-cyber-magenta h-2 w-2 animate-pulse rounded-full" />
            <span>{allTags.length} Categories</span>
          </div>
          <div className="bg-border h-4 w-px" />
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <div className="bg-cyber-purple h-2 w-2 animate-pulse rounded-full" />
            <span>{allStackItems.length} Technologies</span>
          </div>
        </div>
      </div>

      <ProjectsGrid projects={projects} allTags={allTags} allStackItems={allStackItems} />
    </div>
  );
}
