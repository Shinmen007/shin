import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { ProjectDetail } from "@/components/projects/project-detail";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Roshan Khatri`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      publishedTime: project.dates.start,
      tags: project.tags,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project || !project.published) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
