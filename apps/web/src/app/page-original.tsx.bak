import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Code2,
  Zap,
  Users,
  Award,
  TrendingUp,
  Star,
} from "lucide-react";
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
      <section className="border-border/40 relative min-h-[100vh] w-full overflow-hidden border-b bg-black">
        {/* Void Black Background */}
        <div className="absolute inset-0 z-0 bg-black" />

        {/* Animated glow orbs - subtle depth */}
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          {/* Top-left glow */}
          <div
            className="bg-cyber-cyan/20 absolute -left-32 -top-32 h-64 w-64 rounded-full blur-3xl"
            style={{
              animation: "float 20s ease-in-out infinite",
              animationDelay: "0s",
            }}
          />
          {/* Top-right glow */}
          <div
            className="bg-cyber-magenta/15 absolute -right-40 -top-40 h-80 w-80 rounded-full blur-3xl"
            style={{
              animation: "float 25s ease-in-out infinite",
              animationDelay: "3s",
            }}
          />
          {/* Bottom-center glow */}
          <div
            className="bg-cyber-purple/10 absolute -bottom-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl"
            style={{
              animation: "float 22s ease-in-out infinite",
              animationDelay: "5s",
            }}
          />
        </div>

        {/* Animated grid pattern overlay */}
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(34, 211, 238, 0.03) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(34, 211, 238, 0.03) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Animated accent lines */}
        <div className="pointer-events-none absolute left-0 top-1/3 z-[1] w-full h-px">
          <div
            className="h-full w-full bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent"
            style={{
              animation: "shimmer 8s ease-in-out infinite",
            }}
          />
        </div>

        {/* Radial gradient fade effect */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_80%)]" />

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[100vh] items-center">
          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-4xl space-y-10">
              {/* Status Badge with enhanced animation */}
              <div className="animate-in fade-in slide-in-from-bottom-1 inline-flex duration-700">
                <Badge
                  variant="cyan"
                  className="animate-pulse-glow shadow-cyber-cyan/30 border-cyber-cyan/30 hover:shadow-cyber-cyan/60 group relative border px-5 py-2.5 text-sm font-medium shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                >
                  <span className="relative mr-2 flex h-2.5 w-2.5">
                    <span className="bg-cyber-cyan absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                    <span className="bg-cyber-cyan shadow-cyber-cyan/50 animate-pulse-ring relative inline-flex h-2.5 w-2.5 rounded-full shadow-lg"></span>
                  </span>
                  <span className="relative z-10">Available for opportunities</span>
                  {/* Multi-layer hover glow effect */}
                  <div className="from-cyber-cyan/0 via-cyber-cyan/20 to-cyber-cyan/0 pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="from-cyber-cyan/0 via-cyber-cyan/10 to-cyber-cyan/0 pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                </Badge>
              </div>

              {/* Main Heading with stagger animation */}
              <div className="animate-in fade-in slide-in-from-bottom-2 space-y-4 delay-150 duration-1000 sm:space-y-6">
                <div className="space-y-2 sm:space-y-3">
                  <div className="text-muted-foreground flex items-center gap-2 text-xs font-semibold uppercase tracking-wider sm:gap-3 sm:text-sm">
                    <div
                      className="from-cyber-cyan via-cyber-cyan/50 h-px w-8 animate-pulse bg-gradient-to-r to-transparent sm:w-16"
                      style={{ animationDuration: "3s" }}
                    />
                    <span className="relative">
                      Full-Stack Developer
                      <span className="from-cyber-cyan absolute -bottom-0.5 left-0 h-px w-full bg-gradient-to-r to-transparent opacity-50" />
                    </span>
                  </div>

                  <h1 className="xs:text-5xl relative text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                    <span className="gradient-text animate-in fade-in slide-in-from-bottom-3 hover:animate-text-shimmer relative z-10 inline-block transition-all delay-300 duration-1000">
                      Roshan Khatri
                      {/* Text glow effect - behind the text - reduced on mobile */}
                      <span
                        className="gradient-text pointer-events-none absolute inset-0 -z-10 hidden animate-pulse opacity-10 blur-xl sm:inline sm:opacity-20 sm:blur-2xl"
                        style={{ animationDuration: "4s" }}
                        aria-hidden="true"
                      >
                        Roshan Khatri
                      </span>
                      {/* Additional enhanced glow layer */}
                      <span
                        className="gradient-text pointer-events-none absolute inset-0 -z-20 hidden animate-pulse opacity-5 blur-3xl sm:opacity-10 md:inline"
                        style={{ animationDuration: "5s" }}
                        aria-hidden="true"
                      >
                        Roshan Khatri
                      </span>
                    </span>
                  </h1>
                </div>

                <h2 className="text-foreground/90 xs:text-2xl animate-in fade-in slide-in-from-bottom-4 relative text-xl font-semibold leading-snug delay-500 duration-1000 sm:text-3xl md:text-4xl lg:text-5xl">
                  Crafting{" "}
                  <span className="group relative inline-block">
                    <span className="text-cyber-cyan relative z-10">immersive digital</span>
                    <span className="from-cyber-cyan via-cyber-magenta to-cyber-purple absolute -bottom-0.5 left-0 hidden h-1 w-full bg-gradient-to-r blur-sm sm:-bottom-1 sm:inline sm:h-1.5"></span>
                    <span className="from-cyber-cyan via-cyber-magenta to-cyber-purple absolute -bottom-0.5 left-0 h-px w-full bg-gradient-to-r sm:-bottom-1"></span>
                  </span>
                  <br />
                  experiences with code
                </h2>
              </div>

              {/* Description with tech highlights */}
              <p className="text-muted-foreground xs:text-base animate-in fade-in slide-in-from-bottom-5 max-w-2xl text-sm leading-relaxed delay-700 duration-1000 sm:text-lg md:text-xl">
                I engineer high-performance web applications that blend cutting-edge technology with
                exceptional user experiences. Specializing in{" "}
                <span className="text-cyber-cyan hover:text-cyber-cyan/80 cursor-default font-semibold transition-colors">
                  React
                </span>
                ,{" "}
                <span className="text-cyber-magenta hover:text-cyber-magenta/80 cursor-default font-semibold transition-colors">
                  Next.js
                </span>
                ,{" "}
                <span className="text-cyber-purple hover:text-cyber-purple/80 cursor-default font-semibold transition-colors">
                  Three.js
                </span>
                , and building scalable backend architectures that power modern digital products.
              </p>

              {/* CTA Buttons with enhanced effects */}
              <div className="animate-in fade-in slide-in-from-bottom-6 flex flex-col flex-wrap gap-3 pt-4 delay-1000 duration-1000 sm:flex-row sm:gap-4">
                <Button
                  size="lg"
                  variant="neon"
                  asChild
                  className="shadow-cyber-cyan/30 hover:shadow-cyber-cyan/60 group relative w-full overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:w-auto"
                >
                  <Link href="/projects">
                    <span className="relative z-10 flex items-center justify-center">
                      View Projects
                      <ArrowRight className="ml-2 h-5 w-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125" />
                    </span>
                    {/* Multi-layer glow effect with enhanced intensity */}
                    <span className="from-cyber-cyan/40 via-cyber-magenta/40 to-cyber-purple/40 pointer-events-none absolute inset-0 bg-gradient-to-r opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="from-cyber-cyan/20 via-cyber-magenta/20 to-cyber-purple/20 pointer-events-none absolute inset-0 bg-gradient-to-r opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="from-cyber-cyan/10 via-cyber-magenta/10 to-cyber-purple/10 pointer-events-none absolute inset-0 bg-gradient-to-r opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-cyber-cyan/40 hover:border-cyber-cyan hover:bg-cyber-cyan/15 shadow-cyber-cyan/20 hover:shadow-cyber-cyan/50 group relative w-full overflow-hidden shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:w-auto"
                >
                  <Link href="/contact">
                    <span className="relative z-10 flex items-center justify-center">
                      Get in Touch
                      <Mail className="ml-2 h-4 w-4 transition-all duration-300 group-hover:rotate-12 group-hover:scale-125" />
                    </span>
                    {/* Enhanced shimmer effect */}
                    <span className="via-cyber-cyan/30 pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    {/* Additional glow layer on hover */}
                    <span className="from-cyber-cyan/0 via-cyber-cyan/20 to-cyber-cyan/0 pointer-events-none absolute inset-0 bg-gradient-to-r opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="ghost"
                  asChild
                  className="hover:bg-background/50 hover:border-cyber-purple/30 hover:shadow-cyber-purple/20 group relative w-full overflow-hidden border border-transparent shadow-lg shadow-transparent backdrop-blur-sm transition-all duration-300 sm:w-auto"
                >
                  <a href="/api/resume" download>
                    <span className="relative z-10 flex items-center justify-center">
                      <Award className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                      Resume
                      <ArrowRight className="ml-2 h-4 w-4 -rotate-45 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-0" />
                    </span>
                  </a>
                </Button>
              </div>

              {/* Social Links with enhanced design */}
              <div className="animate-in fade-in slide-in-from-bottom-7 delay-1200 flex gap-3 pt-6 duration-1000">
                <a
                  href="https://github.com/roshankhatri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border/50 bg-background/60 text-muted-foreground hover:border-cyber-cyan/60 hover:bg-cyber-cyan/10 hover:text-cyber-cyan hover:shadow-cyber-cyan/50 group relative flex h-12 w-12 items-center justify-center rounded-xl border-2 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-125 hover:shadow-2xl sm:h-12 sm:w-12"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5 transition-all duration-300 group-hover:rotate-12 group-hover:scale-125" />
                  <span className="bg-background/95 border-cyber-cyan/40 shadow-cyber-cyan/30 pointer-events-none absolute -top-11 left-1/2 z-50 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-100 sm:inline-block">
                    GitHub
                  </span>
                  {/* Multi-layer glow effect */}
                  <div className="bg-cyber-cyan/30 pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="bg-cyber-cyan/15 pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                </a>
                <a
                  href="https://linkedin.com/in/roshankhatri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border/50 bg-background/60 text-muted-foreground hover:border-cyber-magenta/60 hover:bg-cyber-magenta/10 hover:text-cyber-magenta hover:shadow-cyber-magenta/50 group relative flex h-12 w-12 items-center justify-center rounded-xl border-2 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-125 hover:shadow-2xl sm:h-12 sm:w-12"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 transition-all duration-300 group-hover:rotate-12 group-hover:scale-125" />
                  <span className="bg-background/95 border-cyber-magenta/40 shadow-cyber-magenta/30 pointer-events-none absolute -top-11 left-1/2 z-50 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-100 sm:inline-block">
                    LinkedIn
                  </span>
                  {/* Multi-layer glow effect */}
                  <div className="bg-cyber-magenta/30 pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="bg-cyber-magenta/15 pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                </a>
                <a
                  href="mailto:hello@roshankhatri.dev"
                  className="border-border/50 bg-background/60 text-muted-foreground hover:border-cyber-purple/60 hover:bg-cyber-purple/10 hover:text-cyber-purple hover:shadow-cyber-purple/50 group relative flex h-12 w-12 items-center justify-center rounded-xl border-2 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-125 hover:shadow-2xl sm:h-12 sm:w-12"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5 transition-all duration-300 group-hover:rotate-12 group-hover:scale-125" />
                  <span className="bg-background/95 border-cyber-purple/40 shadow-cyber-purple/30 pointer-events-none absolute -top-11 left-1/2 z-50 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-100 sm:inline-block">
                    Email
                  </span>
                  {/* Multi-layer glow effect */}
                  <div className="bg-cyber-purple/30 pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="bg-cyber-purple/15 pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce">
          <div className="text-muted-foreground/70 group relative flex cursor-pointer flex-col items-center gap-3">
            {/* Glow effect */}
            <div className="bg-cyber-cyan/20 absolute inset-0 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

            <span className="group-hover:text-cyber-cyan relative text-xs font-semibold uppercase tracking-[0.2em] transition-colors">
              Scroll
            </span>

            {/* Enhanced mouse indicator */}
            <div className="group-hover:border-cyber-cyan relative flex h-8 w-5 items-start justify-center rounded-full border-2 border-current p-1 transition-colors">
              <div className="animate-scroll-indicator group-hover:bg-cyber-cyan h-2 w-1.5 rounded-full bg-current" />
              {/* Inner glow */}
              <div className="bg-cyber-cyan/10 absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* Pulse rings */}
            <div className="bg-cyber-cyan/50 absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full opacity-0 group-hover:opacity-100">
              <span className="bg-cyber-cyan absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with Enhanced Header */}
      <section className="border-border/40 relative overflow-hidden border-b py-16 sm:py-20 md:py-24">
        {/* Enhanced animated background elements with multiple layers */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="bg-cyber-cyan/8 animate-float-slow absolute left-1/4 top-0 h-48 w-48 rounded-full blur-3xl sm:h-96 sm:w-96"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="bg-cyber-magenta/8 animate-float-fast absolute bottom-0 right-1/4 h-48 w-48 rounded-full blur-3xl sm:h-96 sm:w-96"
            style={{ animationDuration: "6s", animationDelay: "1s" }}
          />
          <div
            className="bg-cyber-purple/5 absolute left-1/3 top-1/2 h-32 w-32 animate-pulse rounded-full blur-3xl sm:h-64 sm:w-64"
            style={{ animationDuration: "10s", animationDelay: "2s" }}
          />
        </div>

        {/* Subtle grid pattern overlay */}
        <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:50px_50px] md:block" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto mb-12 max-w-4xl space-y-4 text-center sm:mb-16 sm:space-y-6">
            {/* Section Badge with enhanced glow */}
            <div className="animate-in fade-in slide-in-from-bottom-1 inline-flex duration-700">
              <Badge
                variant="outline"
                className="border-cyber-cyan/40 text-cyber-cyan hover:border-cyber-cyan/60 hover:bg-cyber-cyan/5 hover:shadow-cyber-cyan/30 group px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:shadow-lg sm:px-4 sm:py-2 sm:text-sm"
              >
                <Code2 className="mr-2 h-3 w-3 transition-transform group-hover:scale-110 sm:h-4 sm:w-4" />
                Technical Arsenal
              </Badge>
            </div>

            {/* Main Heading with enhanced gradient */}
            <h2 className="xs:text-4xl animate-in fade-in slide-in-from-bottom-2 hover:animate-text-shimmer text-3xl font-bold transition-all delay-150 duration-1000 sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="gradient-text">Skills & Technologies</span>
            </h2>

            {/* Description with better color */}
            <p className="xs:text-base text-muted-foreground/90 animate-in fade-in slide-in-from-bottom-3 hover:text-muted-foreground mx-auto max-w-3xl text-sm leading-relaxed transition-colors delay-300 duration-1000 duration-300 sm:text-lg md:text-xl">
              A comprehensive overview of my technical expertise across frontend, backend, DevOps,
              and tools. From building beautiful user interfaces to architecting scalable backend
              systems.
            </p>

            {/* Enhanced Decorative line with animation */}
            <div className="animate-in fade-in slide-in-from-bottom-4 flex items-center justify-center gap-3 pt-4 delay-500 duration-1000 sm:gap-4">
              <div
                className="via-cyber-cyan to-cyber-cyan h-px w-12 animate-pulse bg-gradient-to-r from-transparent sm:w-20"
                style={{ animationDuration: "3s" }}
              />
              <div className="bg-cyber-cyan animate-pulse-ring h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5" />
              <div
                className="via-cyber-cyan to-cyber-cyan h-px w-12 animate-pulse bg-gradient-to-l from-transparent sm:w-20"
                style={{ animationDuration: "3s", animationDelay: "0.3s" }}
              />
            </div>
          </div>

          <SkillsShowcase3D />
        </div>
      </section>

      {/* Featured Projects - Enterprise Grade Design */}
      <section className="from-background via-background/98 to-background relative overflow-hidden bg-gradient-to-b py-16 sm:py-20 md:py-24 lg:py-32">
        {/* Animated Background Elements - reduced on mobile */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="bg-cyber-cyan/3 absolute left-10 top-20 h-48 w-48 animate-pulse rounded-full blur-3xl sm:h-80 sm:w-80 md:h-[500px] md:w-[500px]"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="bg-cyber-magenta/3 absolute bottom-20 right-10 h-48 w-48 animate-pulse rounded-full blur-3xl sm:h-80 sm:w-80 md:h-[500px] md:w-[500px]"
            style={{ animationDuration: "10s" }}
          />
          <div
            className="bg-cyber-purple/2 absolute left-1/2 top-1/2 hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full blur-3xl sm:block sm:h-96 sm:w-96 md:h-[600px] md:w-[600px]"
            style={{ animationDuration: "12s" }}
          />
        </div>

        {/* Animated Grid Background - hidden on mobile */}
        <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] md:block" />

        <div className="container relative z-10 mx-auto px-4">
          {/* Premium Section Header */}
          <div className="mx-auto mb-12 max-w-4xl space-y-6 text-center sm:mb-16 sm:space-y-8 md:mb-20">
            {/* Badge with enhanced interaction */}
            <div className="animate-in fade-in slide-in-from-bottom-1 inline-flex duration-700">
              <Badge
                variant="outline"
                className="border-cyber-cyan/40 text-cyber-cyan bg-cyber-cyan/5 hover:bg-cyber-cyan/15 hover:border-cyber-cyan/60 hover:shadow-cyber-cyan/30 group cursor-pointer px-4 py-2 text-xs font-semibold backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:shadow-lg sm:px-5 sm:py-2.5 sm:text-sm"
              >
                <Star className="mr-2 h-3 w-3 transition-transform duration-500 group-hover:rotate-180 sm:h-4 sm:w-4" />
                Featured Work
              </Badge>
            </div>

            {/* Main Heading with Gradient */}
            <div className="animate-in fade-in slide-in-from-bottom-2 space-y-3 delay-150 duration-1000 sm:space-y-4">
              <h2 className="xs:text-4xl hover:animate-text-shimmer cursor-pointer text-3xl font-bold transition-all sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="gradient-text">Exceptional Projects</span>
              </h2>
              <p className="xs:text-lg text-muted-foreground/90 hover:text-muted-foreground mx-auto max-w-3xl text-base leading-relaxed transition-colors duration-300 sm:text-xl md:text-2xl">
                Transforming ideas into production-ready solutions.
                <br className="hidden md:block" />
                <span className="text-cyber-cyan hover:text-cyber-cyan/80 font-semibold transition-colors">
                  Real impact, real results.
                </span>
              </p>
            </div>

            {/* Enhanced Decorative Elements */}
            <div className="animate-in fade-in slide-in-from-bottom-3 flex items-center justify-center gap-2 delay-300 duration-1000 sm:gap-3">
              <div
                className="via-cyber-cyan to-cyber-cyan h-px w-12 animate-pulse bg-gradient-to-r from-transparent sm:w-16"
                style={{ animationDuration: "3s" }}
              />
              <div className="flex gap-1 sm:gap-1.5">
                <div
                  className="bg-cyber-cyan animate-pulse-ring h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
                  style={{ animationDelay: "0s" }}
                />
                <div
                  className="bg-cyber-magenta animate-pulse-ring h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="bg-cyber-purple animate-pulse-ring h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
              <div
                className="via-cyber-cyan to-cyber-cyan h-px w-12 animate-pulse bg-gradient-to-l from-transparent sm:w-16"
                style={{ animationDuration: "3s" }}
              />
            </div>

            {/* View All Button - Desktop with enhanced hover */}
            <div className="animate-in fade-in slide-in-from-bottom-4 hidden delay-500 duration-1000 md:block">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-cyan/15 hover:border-cyber-cyan/60 hover:shadow-cyber-cyan/40 group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Link href="/projects" className="relative">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore All Projects
                    <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125" />
                  </span>
                  <div className="from-cyber-cyan/0 via-cyber-cyan/20 to-cyber-cyan/0 absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="from-cyber-cyan/0 via-cyber-cyan/10 to-cyber-cyan/0 absolute inset-0 bg-gradient-to-r opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Premium Project Cards Grid */}
          <div className="animate-in fade-in slide-in-from-bottom-5 grid gap-8 delay-700 duration-1000 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="animate-in fade-in slide-in-from-bottom group block duration-1000"
                style={{ animationDelay: `${800 + index * 100}ms` }}
              >
                <Card className="border-border/40 from-background/95 via-background/90 to-background/95 hover:border-cyber-cyan/80 hover:shadow-cyber-cyan/40 relative h-full overflow-hidden border-2 bg-gradient-to-br backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.05] hover:shadow-2xl">
                  {/* Animated Gradient Background */}
                  <div className="from-cyber-cyan/0 via-cyber-cyan/8 to-cyber-magenta/8 absolute inset-0 bg-gradient-to-br opacity-0 transition-all duration-500 group-hover:opacity-100" />

                  {/* Enhanced Shimmer Effect */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <div className="via-cyber-cyan/10 absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                  </div>

                  {/* Dynamic Corner Accent Glows */}
                  <div
                    className="bg-cyber-cyan/25 animate-pulse-ring absolute -right-32 -top-32 h-56 w-56 rounded-full opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-100"
                    style={{ animationDelay: "0s" }}
                  />
                  <div
                    className="bg-cyber-magenta/25 animate-pulse-ring absolute -bottom-32 -left-32 h-56 w-56 rounded-full opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-100"
                    style={{ animationDelay: "0.3s" }}
                  />

                  {/* Enhanced Rotating Border Effect */}
                  <div className="absolute -inset-1 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div
                      className="from-cyber-cyan via-cyber-magenta to-cyber-purple animate-rotate-gradient absolute inset-0 rounded-lg bg-gradient-to-r opacity-30 blur-lg"
                      style={{ animationDuration: "6s" }}
                    />
                  </div>

                  <CardHeader className="relative space-y-4 pb-6">
                    {/* Tags with Enhanced Design */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 2).map((tag, tagIndex) => (
                        <Badge
                          key={tag}
                          variant="cyan"
                          className="group-hover:shadow-cyber-cyan/30 relative overflow-hidden px-3 py-1 font-semibold transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg"
                          style={{ animationDelay: `${tagIndex * 50}ms` }}
                        >
                          <span className="relative z-10">{tag}</span>
                          <div className="from-cyber-cyan/20 absolute inset-0 bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </Badge>
                      ))}
                    </div>

                    {/* Project Title with Icon */}
                    <div className="space-y-3">
                      <CardTitle className="group-hover:text-cyber-cyan text-2xl font-bold transition-all duration-500 group-hover:translate-x-2">
                        <span className="flex items-center gap-2">
                          {project.title}
                          <ArrowRight className="h-5 w-5 -translate-x-3 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100" />
                        </span>
                      </CardTitle>

                      {/* Description */}
                      <CardDescription className="group-hover:text-muted-foreground/95 text-base leading-relaxed transition-all duration-500">
                        {project.summary}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="relative space-y-6">
                    {/* Tech Stack */}
                    <div>
                      <p className="text-muted-foreground/70 mb-3 text-xs font-semibold uppercase tracking-wider">
                        Tech Stack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.slice(0, 4).map((tech, techIndex) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="border-border/50 group-hover:border-cyber-cyan/50 group-hover:bg-cyber-cyan/5 relative overflow-hidden px-3 py-1 backdrop-blur-sm transition-all duration-500 group-hover:scale-105"
                            style={{ transitionDelay: `${techIndex * 30}ms` }}
                          >
                            <span className="relative z-10 text-xs font-medium">{tech}</span>
                          </Badge>
                        ))}
                        {project.stack.length > 4 && (
                          <Badge
                            variant="outline"
                            className="border-border/50 px-3 py-1 backdrop-blur-sm"
                          >
                            <span className="text-xs font-medium">
                              +{project.stack.length - 4} more
                            </span>
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* View Project CTA */}
                    <div className="border-border/30 group-hover:border-cyber-cyan/50 border-t pt-2 transition-all duration-500">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground group-hover:text-cyber-cyan font-medium transition-all duration-500 group-hover:translate-x-1">
                          View Project Details
                        </span>
                        <div className="border-border/50 group-hover:border-cyber-cyan/60 group-hover:bg-cyber-cyan/15 group-hover:shadow-cyber-cyan/30 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 group-hover:scale-125 group-hover:shadow-lg">
                          <ArrowRight className="text-muted-foreground group-hover:text-cyber-cyan h-4 w-4 transition-all duration-500 group-hover:translate-x-0.5 group-hover:scale-110" />
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  {/* Enhanced Bottom Accent Line with glow */}
                  <div className="via-cyber-cyan shadow-cyber-cyan/50 absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent to-transparent opacity-0 shadow-lg transition-opacity duration-500 group-hover:opacity-100" />
                </Card>
              </Link>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-12 text-center md:hidden">
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-cyan/10"
            >
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="bg-muted/30 py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="xs:text-3xl text-2xl font-bold sm:text-3xl md:text-4xl">
                  Recent Writing
                </h2>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                  Thoughts on development, performance, and architecture
                </p>
              </div>

              <Button variant="ghost" asChild className="hidden md:inline-flex">
                <Link href="/blog">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              {recentPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <Card className="hover:border-cyber-magenta/50 hover:shadow-glow-magenta h-full transition-all">
                    <CardHeader>
                      <div className="mb-3 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="magenta">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="group-hover:text-cyber-magenta">{post.title}</CardTitle>
                      <CardDescription>{post.summary}</CardDescription>
                      <p className="text-muted-foreground text-sm">
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
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="bg-cyber-cyan/10 animate-float-slow absolute right-0 top-0 h-96 w-96 rounded-full opacity-0 blur-3xl"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="bg-cyber-magenta/10 animate-float-slow absolute bottom-0 left-0 h-80 w-80 rounded-full opacity-0 blur-3xl"
            style={{ animationDuration: "10s", animationDelay: "1s" }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <Card className="border-cyber-cyan/40 from-cyber-cyan/8 via-background/95 to-cyber-magenta/8 hover:border-cyber-cyan/60 hover:shadow-cyber-cyan/30 group border-2 bg-gradient-to-br transition-all duration-500 hover:shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="xs:text-3xl group-hover:text-cyber-cyan text-2xl transition-colors duration-300 sm:text-3xl md:text-4xl">
                Let's Work Together
              </CardTitle>
              <CardDescription className="text-muted-foreground/90 group-hover:text-muted-foreground text-base transition-colors duration-300 sm:text-lg">
                I'm always interested in hearing about new projects and opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button
                size="lg"
                variant="neon"
                asChild
                className="group/btn shadow-cyber-cyan/30 hover:shadow-cyber-cyan/60 relative w-full overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:w-auto"
              >
                <Link href="/contact" className="relative">
                  <span className="relative z-10">Get in Touch</span>
                  <span className="from-cyber-cyan/20 via-cyber-magenta/20 to-cyber-cyan/20 absolute inset-0 bg-gradient-to-r opacity-0 blur-xl transition-opacity duration-300 group-hover/btn:opacity-100" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="group/btn border-cyber-cyan/40 hover:border-cyber-cyan/60 hover:bg-cyber-cyan/10 hover:shadow-cyber-cyan/40 relative w-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg sm:w-auto"
              >
                <Link href="/api/resume" className="relative z-10">
                  Download Resume
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
