import { Hero3DClient } from "@/components/hero/hero-3d-client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Github, Linkedin, Mail, Code2, Zap, Users, Award, TrendingUp, Star } from "lucide-react";
import Link from "next/link";
import { allProjects, allPosts } from "contentlayer/generated";
import { SkillsShowcase3D } from "@/components/skills/skills-showcase-3d";

export default async function HomePage() {
  // Get featured projects and recent posts
  const featuredProjects = allProjects
    .filter((project) => project.published && project.tags.includes("Featured"))
    .slice(0, 3);

  const recentPosts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 2);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] w-full overflow-hidden border-b border-border/40">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Hero3DClient />
        </div>

        {/* Enhanced gradient overlays for depth and readability */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-background via-background/90 to-background/50" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-background/40" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,15,0.85)_90%)]" />

        {/* Animated grid overlay with parallax effect */}
        <div className="pointer-events-none absolute inset-0 z-[1] animate-pulse bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" style={{ animationDuration: '8s' }} />

        {/* Corner accent glows */}
        <div className="pointer-events-none absolute -top-40 -left-40 z-[1] h-80 w-80 rounded-full bg-cyber-cyan/10 blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="pointer-events-none absolute -bottom-40 -right-40 z-[1] h-80 w-80 rounded-full bg-cyber-magenta/10 blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="pointer-events-none absolute top-1/3 right-1/4 z-[1] h-60 w-60 rounded-full bg-cyber-purple/8 blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />

        {/* Animated accent lines with flowing gradient */}
        <div className="pointer-events-none absolute left-0 top-1/2 z-[1] h-px w-full -translate-y-1/2">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-cyber-cyan/60 via-cyber-magenta/40 to-transparent animate-pulse" style={{ animationDuration: '4s' }} />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-0 z-[1] h-full w-px -translate-x-1/2">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-cyber-purple/30 to-transparent animate-pulse" style={{ animationDuration: '6s' }} />
        </div>

        {/* Diagonal accent lines for extra depth */}
        <div className="pointer-events-none absolute -left-1/4 top-0 z-[1] h-full w-px rotate-12">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-cyber-cyan/20 to-transparent animate-pulse" style={{ animationDuration: '7s' }} />
        </div>
        <div className="pointer-events-none absolute -right-1/4 top-0 z-[1] h-full w-px -rotate-12">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-cyber-magenta/20 to-transparent animate-pulse" style={{ animationDuration: '9s' }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[100vh] items-center">
          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-4xl space-y-10">
              {/* Status Badge with enhanced animation */}
              <div className="inline-flex animate-in fade-in slide-in-from-bottom-1 duration-700">
                <Badge
                  variant="cyan"
                  className="group relative animate-pulse-glow px-5 py-2.5 text-sm font-medium shadow-lg shadow-cyber-cyan/30 backdrop-blur-sm border border-cyber-cyan/30 hover:shadow-xl hover:shadow-cyber-cyan/50 transition-all duration-300"
                >
                  <span className="relative mr-2 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyber-cyan opacity-75"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyber-cyan shadow-lg shadow-cyber-cyan/50"></span>
                  </span>
                  <span className="relative z-10">Available for opportunities</span>
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan/20 to-cyber-cyan/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />
                </Badge>
              </div>

              {/* Main Heading with stagger animation */}
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-150">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    <div className="h-px w-16 bg-gradient-to-r from-cyber-cyan via-cyber-cyan/50 to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
                    <span className="relative">
                      Full-Stack Developer
                      <span className="absolute -bottom-0.5 left-0 h-px w-full bg-gradient-to-r from-cyber-cyan to-transparent opacity-50" />
                    </span>
                  </div>

                  <h1 className="relative text-6xl font-bold leading-[1.1] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
                    <span className="gradient-text inline-block animate-in fade-in slide-in-from-bottom-3 duration-1000 delay-300 relative z-10">
                      Roshan Khatri
                      {/* Text glow effect - behind the text */}
                      <span className="absolute inset-0 -z-10 gradient-text blur-2xl opacity-20 animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} aria-hidden="true">
                        Roshan Khatri
                      </span>
                    </span>
                  </h1>
                </div>

                <h2 className="relative text-2xl font-semibold text-foreground/90 sm:text-3xl md:text-4xl lg:text-5xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                  Crafting{" "}
                  <span className="relative inline-block group">
                    <span className="text-cyber-cyan relative z-10">immersive digital</span>
                    <span className="absolute -bottom-1 left-0 h-1.5 w-full bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple blur-sm"></span>
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple"></span>
                  </span>
                  <br />
                  experiences with code
                </h2>
              </div>

              {/* Description with tech highlights */}
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-700">
                I engineer high-performance web applications that blend cutting-edge technology
                with exceptional user experiences. Specializing in{" "}
                <span className="font-semibold text-cyber-cyan hover:text-cyber-cyan/80 transition-colors cursor-default">React</span>,{" "}
                <span className="font-semibold text-cyber-magenta hover:text-cyber-magenta/80 transition-colors cursor-default">Next.js</span>,{" "}
                <span className="font-semibold text-cyber-purple hover:text-cyber-purple/80 transition-colors cursor-default">Three.js</span>, and
                building scalable backend architectures that power modern digital products.
              </p>

              {/* CTA Buttons with enhanced effects */}
              <div className="flex flex-wrap gap-4 pt-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-1000">
                <Button size="lg" variant="neon" asChild className="group relative overflow-hidden shadow-xl shadow-cyber-cyan/30 hover:shadow-2xl hover:shadow-cyber-cyan/50 transition-all duration-300">
                  <Link href="/projects">
                    <span className="relative z-10 flex items-center">
                      View Projects
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:scale-110" />
                    </span>
                    {/* Multi-layer glow effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/30 via-cyber-magenta/30 to-cyber-purple/30 opacity-0 blur-2xl transition-opacity group-hover:opacity-100 pointer-events-none" />
                    <span className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/10 via-cyber-magenta/10 to-cyber-purple/10 opacity-0 blur-xl transition-opacity group-hover:opacity-100 pointer-events-none" />
                  </Link>
                </Button>

                <Button size="lg" variant="outline" asChild className="group relative overflow-hidden border-cyber-cyan/40 hover:border-cyber-cyan hover:bg-cyber-cyan/10 shadow-lg shadow-cyber-cyan/20 hover:shadow-xl hover:shadow-cyber-cyan/40 backdrop-blur-sm transition-all duration-300">
                  <Link href="/contact">
                    <span className="relative z-10 flex items-center">
                      Get in Touch
                      <Mail className="ml-2 h-4 w-4 transition-all group-hover:scale-110 group-hover:rotate-12" />
                    </span>
                    {/* Shimmer effect */}
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                  </Link>
                </Button>

                <Button size="lg" variant="ghost" asChild className="group relative overflow-hidden hover:bg-background/50 backdrop-blur-sm border border-transparent hover:border-cyber-purple/30 shadow-lg shadow-transparent hover:shadow-cyber-purple/20 transition-all duration-300">
                  <a href="/api/resume" download>
                    <span className="relative z-10 flex items-center">
                      <Award className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                      Resume
                      <ArrowRight className="ml-2 h-4 w-4 -rotate-45 transition-all duration-300 group-hover:rotate-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </Button>
              </div>

              {/* Social Links with enhanced design */}
              <div className="flex gap-3 pt-6 animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-1200">
                <a
                  href="https://github.com/roshankhatri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-12 w-12 items-center justify-center rounded-xl border-2 border-border/50 bg-background/60 backdrop-blur-md text-muted-foreground transition-all duration-300 hover:border-cyber-cyan/60 hover:bg-cyber-cyan/10 hover:text-cyber-cyan hover:shadow-xl hover:shadow-cyber-cyan/30 hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                  <span className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1 bg-background/95 backdrop-blur-sm border border-cyber-cyan/30 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg shadow-cyber-cyan/20 z-50 pointer-events-none">
                    GitHub
                  </span>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-cyber-cyan/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />
                </a>
                <a
                  href="https://linkedin.com/in/roshankhatri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-12 w-12 items-center justify-center rounded-xl border-2 border-border/50 bg-background/60 backdrop-blur-md text-muted-foreground transition-all duration-300 hover:border-cyber-magenta/60 hover:bg-cyber-magenta/10 hover:text-cyber-magenta hover:shadow-xl hover:shadow-cyber-magenta/30 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                  <span className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1 bg-background/95 backdrop-blur-sm border border-cyber-magenta/30 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg shadow-cyber-magenta/20 z-50 pointer-events-none">
                    LinkedIn
                  </span>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-cyber-magenta/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />
                </a>
                <a
                  href="mailto:hello@roshankhatri.dev"
                  className="group relative flex h-12 w-12 items-center justify-center rounded-xl border-2 border-border/50 bg-background/60 backdrop-blur-md text-muted-foreground transition-all duration-300 hover:border-cyber-purple/60 hover:bg-cyber-purple/10 hover:text-cyber-purple hover:shadow-xl hover:shadow-cyber-purple/30 hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                  <span className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1 bg-background/95 backdrop-blur-sm border border-cyber-purple/30 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg shadow-cyber-purple/20 z-50 pointer-events-none">
                    Email
                  </span>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-cyber-purple/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce">
          <div className="relative flex flex-col items-center gap-3 text-muted-foreground/70 group cursor-pointer">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-cyber-cyan/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300" />

            <span className="relative text-xs font-semibold uppercase tracking-[0.2em] transition-colors group-hover:text-cyber-cyan">
              Scroll
            </span>

            {/* Enhanced mouse indicator */}
            <div className="relative flex h-8 w-5 items-start justify-center rounded-full border-2 border-current p-1 group-hover:border-cyber-cyan transition-colors">
              <div className="h-2 w-1.5 animate-scroll-indicator rounded-full bg-current group-hover:bg-cyber-cyan" />
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full bg-cyber-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Pulse rings */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-cyber-cyan/50 opacity-0 group-hover:opacity-100">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyber-cyan opacity-75" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with Enhanced Header */}
      <section className="relative py-24 border-b border-border/40 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyber-magenta/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-16 space-y-6 text-center max-w-4xl mx-auto">
            {/* Section Badge */}
            <div className="inline-flex animate-in fade-in slide-in-from-bottom-1 duration-700">
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm font-medium border-cyber-cyan/40 text-cyber-cyan"
              >
                <Code2 className="mr-2 h-4 w-4" />
                Technical Arsenal
              </Badge>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-150">
              <span className="gradient-text">Skills & Technologies</span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-3 duration-1000 delay-300">
              A comprehensive overview of my technical expertise across frontend, backend, DevOps, and tools.
              From building beautiful user interfaces to architecting scalable backend systems.
            </p>

            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyber-cyan to-cyber-cyan" />
              <div className="h-2 w-2 rounded-full bg-cyber-cyan animate-pulse" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent via-cyber-cyan to-cyber-cyan" />
            </div>
          </div>

          <SkillsShowcase3D />
        </div>
      </section>

      {/* Featured Projects - Enterprise Grade Design */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-background via-background/98 to-background">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-cyber-cyan/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-cyber-magenta/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-purple/2 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
        </div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Premium Section Header */}
          <div className="mb-20 text-center max-w-4xl mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-flex animate-in fade-in slide-in-from-bottom-1 duration-700">
              <Badge
                variant="outline"
                className="px-5 py-2.5 text-sm font-semibold border-cyber-cyan/40 text-cyber-cyan backdrop-blur-xl bg-cyber-cyan/5 hover:bg-cyber-cyan/10 transition-all duration-300"
              >
                <Star className="mr-2 h-4 w-4" />
                Featured Work
              </Badge>
            </div>

            {/* Main Heading with Gradient */}
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-150">
              <h2 className="text-5xl font-bold md:text-6xl lg:text-7xl">
                <span className="gradient-text">Exceptional Projects</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Transforming ideas into production-ready solutions.
                <br className="hidden md:block" />
                <span className="text-cyber-cyan font-semibold">Real impact, real results.</span>
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="flex items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-1000 delay-300">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyber-cyan to-cyber-cyan" />
              <div className="flex gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-cyber-cyan animate-pulse" />
                <div className="h-1.5 w-1.5 rounded-full bg-cyber-magenta animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="h-1.5 w-1.5 rounded-full bg-cyber-purple animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent via-cyber-cyan to-cyber-cyan" />
            </div>

            {/* View All Button - Desktop */}
            <div className="hidden md:block animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="group relative overflow-hidden border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-cyan/10 hover:border-cyber-cyan transition-all duration-300"
              >
                <Link href="/projects" className="relative">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore All Projects
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan/10 to-cyber-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Premium Project Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-700">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block animate-in fade-in slide-in-from-bottom duration-1000"
                style={{ animationDelay: `${800 + index * 100}ms` }}
              >
                <Card className="h-full relative overflow-hidden border-2 border-border/40 bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-xl transition-all duration-700 hover:border-cyber-cyan/60 hover:shadow-2xl hover:shadow-cyber-cyan/20 hover:scale-[1.03] hover:-translate-y-2">
                  {/* Animated Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/0 via-cyber-cyan/5 to-cyber-magenta/5 opacity-0 group-hover:opacity-100 transition-all duration-700" />

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Corner Accent Glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyber-cyan/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyber-magenta/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Rotating Border Effect */}
                  <div className="absolute -inset-[2px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple opacity-20 blur-xl animate-spin" style={{ animationDuration: '8s' }} />
                  </div>

                  <CardHeader className="relative space-y-4 pb-6">
                    {/* Tags with Enhanced Design */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 2).map((tag, tagIndex) => (
                        <Badge
                          key={tag}
                          variant="cyan"
                          className="relative overflow-hidden px-3 py-1 font-semibold transition-all duration-500 group-hover:shadow-lg group-hover:shadow-cyber-cyan/30 group-hover:scale-105"
                          style={{ animationDelay: `${tagIndex * 50}ms` }}
                        >
                          <span className="relative z-10">{tag}</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </Badge>
                      ))}
                    </div>

                    {/* Project Title with Icon */}
                    <div className="space-y-3">
                      <CardTitle className="text-2xl font-bold transition-all duration-500 group-hover:text-cyber-cyan group-hover:translate-x-1">
                        <span className="flex items-center gap-2">
                          {project.title}
                          <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                        </span>
                      </CardTitle>

                      {/* Description */}
                      <CardDescription className="text-base leading-relaxed group-hover:text-muted-foreground/90 transition-colors duration-500">
                        {project.summary}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="relative space-y-6">
                    {/* Tech Stack */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-3 font-semibold">Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.slice(0, 4).map((tech, techIndex) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="relative overflow-hidden px-3 py-1 border-border/50 backdrop-blur-sm transition-all duration-500 group-hover:border-cyber-cyan/50 group-hover:bg-cyber-cyan/5 group-hover:scale-105"
                            style={{ transitionDelay: `${techIndex * 30}ms` }}
                          >
                            <span className="relative z-10 text-xs font-medium">{tech}</span>
                          </Badge>
                        ))}
                        {project.stack.length > 4 && (
                          <Badge variant="outline" className="border-border/50 backdrop-blur-sm px-3 py-1">
                            <span className="text-xs font-medium">+{project.stack.length - 4} more</span>
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* View Project CTA */}
                    <div className="pt-2 border-t border-border/30 group-hover:border-cyber-cyan/30 transition-colors duration-500">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground group-hover:text-cyber-cyan transition-colors duration-500 font-medium">
                          View Project Details
                        </span>
                        <div className="h-8 w-8 rounded-full border border-border/50 flex items-center justify-center group-hover:border-cyber-cyan group-hover:bg-cyber-cyan/10 transition-all duration-500 group-hover:scale-110">
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-cyber-cyan transition-colors duration-500" />
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </Card>
              </Link>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-12 text-center md:hidden">
            <Button size="lg" variant="outline" asChild className="border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-cyan/10">
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="bg-muted/30 py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold md:text-4xl">Recent Writing</h2>
                <p className="mt-2 text-muted-foreground">
                  Thoughts on development, performance, and architecture
                </p>
              </div>

              <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href="/blog">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {recentPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <Card className="h-full transition-all hover:border-cyber-magenta/50 hover:shadow-glow-magenta">
                    <CardHeader>
                      <div className="mb-3 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="magenta">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="group-hover:text-cyber-magenta">
                        {post.title}
                      </CardTitle>
                      <CardDescription>
                        {post.summary}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        · {post.readingTime.text}
                      </p>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Button variant="outline" asChild>
                <Link href="/blog">
                  View All Posts <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card className="border-cyber-cyan/30 bg-gradient-to-br from-cyber-cyan/5 to-cyber-magenta/5">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl">Let's Work Together</CardTitle>
              <CardDescription className="text-lg">
                I'm always interested in hearing about new projects and opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="neon" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/api/resume">Download Resume</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
