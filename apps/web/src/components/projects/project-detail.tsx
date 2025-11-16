"use client";

import { Project } from "contentlayer/generated";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  Github,
  Calendar,
  TrendingUp,
  Users,
  Zap,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer2/hooks";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const MDXContent = useMDXComponent(project.body.code);

  // Format dates
  const startDate = new Date(project.dates.start).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
  const endDate = project.dates.end
    ? new Date(project.dates.end).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : "Present";

  return (
    <article className="container py-12 max-w-4xl">
      {/* Header */}
      <header className="space-y-6 mb-12">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to projects
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => {
            const variant =
              tag === "Featured"
                ? "cyan"
                : tag.includes("AI")
                  ? "magenta"
                  : tag.includes("3D")
                    ? "purple"
                    : "default";

            return (
              <Badge key={tag} variant={variant as any}>
                {tag}
              </Badge>
            );
          })}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <span className="gradient-text">{project.title}</span>
        </h1>

        {/* Summary */}
        <p className="text-xl text-muted-foreground">{project.summary}</p>

        {/* Links & Date */}
        <div className="flex flex-wrap items-center gap-4">
          {project.repoUrl && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                View Code
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button variant="neon" size="sm" asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground ml-auto">
            <Calendar className="h-4 w-4" />
            <span>
              {startDate} – {endDate}
            </span>
          </div>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyber-cyan/10">
                <Zap className="h-5 w-5 text-cyber-cyan" />
              </div>
              <div>
                <p className="text-2xl font-bold">{project.metrics.lighthouse}</p>
                <p className="text-xs text-muted-foreground">Lighthouse</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyber-magenta/10">
                <TrendingUp className="h-5 w-5 text-cyber-magenta" />
              </div>
              <div>
                <p className="text-2xl font-bold">{project.metrics.perfScore}</p>
                <p className="text-xs text-muted-foreground">Performance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyber-purple/10">
                <Users className="h-5 w-5 text-cyber-purple" />
              </div>
              <div>
                <p className="text-2xl font-bold">{project.metrics.users}</p>
                <p className="text-xs text-muted-foreground">Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Award className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{project.metrics.uptime}</p>
                <p className="text-xs text-muted-foreground">Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <Card className="mb-12 border-cyber-cyan/20">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-cyber-cyan" />
              Key Highlights
            </h2>
            <ul className="space-y-2">
              {project.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyber-cyan mt-1.5 flex-shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Tech Stack */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* MDX Content (Case Study) */}
      <div className="prose prose-neutral dark:prose-invert prose-pre:bg-muted prose-pre:border prose-pre:border-border max-w-none">
        <MDXContent />
      </div>
    </article>
  );
}
