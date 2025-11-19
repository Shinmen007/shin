"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Palette,
  Rocket,
  Users,
  Trophy,
  Sparkles,
  Zap,
  Heart,
  Globe,
  BookOpen,
  Briefcase,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Target,
  Cpu,
  Database,
  Layout,
  Terminal,
  GitBranch,
  Boxes,
  Brain,
  Star,
  Award,
  Coffee,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Animated Counter Component
function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="gradient-text text-4xl font-bold md:text-5xl">
      {count}
      {suffix}
    </div>
  );
}

// Animated Progress Bar
function SkillBar({ skill, level, delay = 0 }: { skill: string; level: number; delay?: number }) {
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setTimeout(() => setWidth(level), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible, level, delay]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-foreground text-sm font-semibold">{skill}</span>
        <span className="text-cyber-cyan text-sm font-bold">{level}%</span>
      </div>
      <div className="bg-muted/30 border-border/50 relative h-3 w-full overflow-hidden rounded-full border">
        <div
          className="from-cyber-cyan via-cyber-magenta to-cyber-purple absolute inset-y-0 left-0 rounded-full bg-gradient-to-r transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        >
          <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
        <div
          className="bg-cyber-cyan/20 absolute inset-y-0 left-0 rounded-full blur-md transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function AboutPage() {
  const stats = [
    { label: "Years of Experience", value: 5, icon: TrendingUp, suffix: "+" },
    { label: "Projects Completed", value: 50, icon: Trophy, suffix: "+" },
    { label: "Technologies Mastered", value: 30, icon: Code2, suffix: "+" },
    { label: "Happy Clients", value: 25, icon: Users, suffix: "+" },
  ];

  const skills = {
    frontend: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript / JavaScript", level: 92 },
      { name: "Three.js / WebGL", level: 88 },
      { name: "Tailwind CSS", level: 96 },
      { name: "HTML5 / CSS3", level: 98 },
    ],
    backend: [
      { name: "Node.js / Express", level: 90 },
      { name: "Python / FastAPI", level: 85 },
      { name: "PostgreSQL / MongoDB", level: 87 },
      { name: "GraphQL / REST APIs", level: 92 },
      { name: "Redis / Caching", level: 83 },
    ],
    tools: [
      { name: "Git / GitHub", level: 94 },
      { name: "Docker / K8s", level: 82 },
      { name: "AWS / Vercel", level: 86 },
      { name: "CI/CD Pipelines", level: 85 },
      { name: "Figma / Design", level: 88 },
    ],
  };

  const expertise = [
    {
      icon: Layout,
      title: "Frontend Architecture",
      description:
        "Crafting scalable, performant frontend architectures with React, Next.js, and modern build tools. Expert in state management, routing, and optimization.",
      color: "cyan",
      gradient: "from-cyber-cyan/10 to-cyber-cyan/5",
    },
    {
      icon: Database,
      title: "Backend Development",
      description:
        "Building robust RESTful and GraphQL APIs with Node.js, Python, and designing efficient database schemas for scalable applications.",
      color: "magenta",
      gradient: "from-cyber-magenta/10 to-cyber-magenta/5",
    },
    {
      icon: Boxes,
      title: "3D Graphics & WebGL",
      description:
        "Creating immersive 3D experiences using Three.js, React Three Fiber, shaders, and advanced WebGL techniques for interactive web applications.",
      color: "purple",
      gradient: "from-cyber-purple/10 to-cyber-purple/5",
    },
    {
      icon: Brain,
      title: "AI/ML Integration",
      description:
        "Integrating machine learning models, natural language processing, and AI-powered features into modern web applications.",
      color: "cyan",
      gradient: "from-cyber-cyan/10 to-cyber-cyan/5",
    },
    {
      icon: Rocket,
      title: "Performance Optimization",
      description:
        "Achieving exceptional performance with code splitting, lazy loading, image optimization, and achieving perfect Lighthouse scores.",
      color: "magenta",
      gradient: "from-cyber-magenta/10 to-cyber-magenta/5",
    },
    {
      icon: Terminal,
      title: "DevOps & Cloud",
      description:
        "Managing cloud infrastructure, implementing CI/CD pipelines, containerization with Docker, and deployment automation.",
      color: "purple",
      gradient: "from-cyber-purple/10 to-cyber-purple/5",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Quality First",
      description:
        "I believe in writing clean, maintainable code that stands the test of time. Every line matters.",
      color: "cyan",
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description:
        "Constantly exploring new technologies and approaches to solve problems in creative ways.",
      color: "magenta",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Great products are built by great teams. I value communication, feedback, and shared success.",
      color: "purple",
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description:
        "The tech landscape evolves rapidly. I stay current through continuous learning and experimentation.",
      color: "cyan",
    },
  ];

  const journey = [
    {
      year: "2024",
      title: "Senior Full-Stack Developer",
      description:
        "Leading development of high-performance web applications with focus on AI/ML integration and 3D experiences.",
      icon: Briefcase,
      color: "cyan",
    },
    {
      year: "2022",
      title: "Full-Stack Developer",
      description:
        "Built scalable web applications and contributed to open-source projects. Specialized in React and Node.js ecosystems.",
      icon: Code2,
      color: "magenta",
    },
    {
      year: "2020",
      title: "Frontend Developer",
      description:
        "Started professional journey focusing on modern frontend frameworks and responsive design.",
      icon: Palette,
      color: "purple",
    },
    {
      year: "2019",
      title: "Computer Science Degree",
      description:
        "Graduated with honors, building strong foundations in algorithms, data structures, and software engineering.",
      icon: GraduationCap,
      color: "cyan",
    },
  ];

  const interests = [
    { icon: Coffee, label: "Coffee Enthusiast", color: "cyan" },
    { icon: GitBranch, label: "Open Source", color: "magenta" },
    { icon: Cpu, label: "Tech Innovation", color: "purple" },
    { icon: Award, label: "Competitive Coding", color: "cyan" },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="bg-cyber-cyan/5 absolute left-1/4 top-0 h-96 w-96 animate-pulse rounded-full blur-3xl"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="bg-cyber-magenta/5 absolute right-1/4 top-1/3 h-96 w-96 animate-pulse rounded-full blur-3xl"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
        <div
          className="bg-cyber-purple/5 absolute bottom-0 left-1/3 h-96 w-96 animate-pulse rounded-full blur-3xl"
          style={{ animationDuration: "12s", animationDelay: "4s" }}
        />
      </div>

      <div className="container max-w-7xl py-12 md:py-20">
        {/* Hero Section */}
        <section className="relative mb-32">
          <div className="space-y-8">
            {/* Badge with animation */}
            <div className="animate-in fade-in slide-in-from-bottom-1 inline-flex duration-700">
              <Badge
                variant="cyan"
                className="shadow-cyber-cyan/30 animate-pulse-glow px-5 py-2.5 text-sm font-semibold shadow-lg backdrop-blur-xl"
              >
                <Sparkles
                  className="mr-2 h-4 w-4 animate-spin"
                  style={{ animationDuration: "3s" }}
                />
                About Me
              </Badge>
            </div>

            {/* Main Heading with staggered animation */}
            <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6 delay-150 duration-1000">
              <h1 className="text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl">
                <span className="gradient-text relative inline-block">
                  Building Digital Experiences
                  <span
                    className="gradient-text pointer-events-none absolute inset-0 animate-pulse opacity-30 blur-2xl"
                    style={{ animationDuration: "4s" }}
                  >
                    Building Digital Experiences
                  </span>
                </span>
              </h1>
              <p className="text-muted-foreground max-w-4xl text-xl leading-relaxed md:text-2xl">
                I'm a passionate{" "}
                <span className="text-cyber-cyan font-bold">full-stack developer</span> with a love
                for creating exceptional digital experiences. With expertise spanning from{" "}
                <span className="text-cyber-magenta font-bold">pixel-perfect frontend design</span>{" "}
                to <span className="text-cyber-purple font-bold">robust backend architecture</span>,
                I bring ideas to life through code.
              </p>
            </div>

            {/* Interests Pills */}
            <div className="animate-in fade-in slide-in-from-bottom-3 flex flex-wrap gap-3 pt-4 delay-300 duration-1000">
              {interests.map((interest, index) => (
                <div
                  key={interest.label}
                  className={`group flex items-center gap-2 rounded-full border px-4 py-2 border-cyber-${interest.color}/30 bg-cyber-${interest.color}/5 backdrop-blur-xl hover:border-cyber-${interest.color} hover:bg-cyber-${interest.color}/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyber-${interest.color}/30 cursor-default`}
                >
                  <interest.icon
                    className={`h-4 w-4 text-cyber-${interest.color} transition-transform group-hover:scale-110`}
                  />
                  <span className="text-sm font-medium">{interest.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Animated Stats Grid */}
          <div className="animate-in fade-in slide-in-from-bottom-4 grid grid-cols-2 gap-6 pt-16 delay-500 duration-1000 md:grid-cols-4">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className="border-border/50 from-background/80 via-background/60 to-background/40 hover:border-cyber-cyan/50 hover:shadow-cyber-cyan/20 group relative overflow-hidden bg-gradient-to-br backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                {/* Animated gradient background */}
                <div className="from-cyber-cyan/0 via-cyber-cyan/5 to-cyber-magenta/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-all duration-500 group-hover:opacity-100" />

                {/* Corner glow */}
                <div className="bg-cyber-cyan/30 absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <CardContent className="relative space-y-4 p-6 text-center md:p-8">
                  <div className="bg-cyber-cyan/10 border-cyber-cyan/20 inline-flex h-14 w-14 items-center justify-center rounded-xl border transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                    <stat.icon className="text-cyber-cyan h-7 w-7" />
                  </div>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-32 space-y-8">
          <div className="space-y-6">
            <div className="inline-flex">
              <Badge
                variant="outline"
                className="border-cyber-magenta/40 text-cyber-magenta px-4 py-2 text-sm font-medium"
              >
                <Heart className="mr-2 h-4 w-4" />
                My Story
              </Badge>
            </div>

            <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
              <span className="gradient-text">The Journey So Far</span>
            </h2>

            <div className="text-muted-foreground grid gap-8 text-lg leading-relaxed md:grid-cols-2">
              <div className="space-y-6">
                <p className="border-cyber-cyan relative border-l-2 pl-6">
                  My journey into software development began with a simple curiosity about how
                  websites work. That curiosity grew into a{" "}
                  <span className="text-cyber-cyan font-semibold">
                    passion for creating beautiful, functional, and performant web applications
                  </span>{" "}
                  that make a difference in people's lives.
                </p>
                <p className="border-cyber-magenta relative border-l-2 pl-6">
                  Over the years, I've had the privilege of working on diverse projects—from{" "}
                  <span className="text-cyber-magenta font-semibold">
                    e-commerce platforms handling millions of users
                  </span>{" "}
                  to{" "}
                  <span className="text-cyber-purple font-semibold">
                    interactive 3D experiences
                  </span>{" "}
                  that push the boundaries of what's possible on the web.
                </p>
              </div>
              <div className="space-y-6">
                <p className="border-cyber-purple relative border-l-2 pl-6">
                  Each project has taught me something new and reinforced my commitment to
                  continuous learning and improvement. I believe in{" "}
                  <span className="text-cyber-purple font-semibold">
                    writing code that not only works but is elegant, maintainable, and scalable
                  </span>
                  .
                </p>
                <p className="border-cyber-cyan relative border-l-2 pl-6">
                  Today, I specialize in building full-stack applications with modern technologies,
                  exploring the intersection of{" "}
                  <span className="text-cyber-cyan font-semibold">AI/ML and web development</span>,
                  creating more intelligent and intuitive user experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-32 space-y-12">
          <div className="space-y-6 text-center">
            <div className="inline-flex">
              <Badge
                variant="outline"
                className="border-cyber-purple/40 text-cyber-purple px-4 py-2 text-sm font-medium"
              >
                <Code2 className="mr-2 h-4 w-4" />
                Technical Skills
              </Badge>
            </div>
            <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
              <span className="gradient-text">My Tech Stack</span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
              A comprehensive overview of my technical expertise across different domains
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Frontend Skills */}
            <Card className="border-border/50 from-background/90 to-background/70 hover:border-cyber-cyan/50 relative overflow-hidden bg-gradient-to-br backdrop-blur-xl transition-all duration-500">
              <div className="from-cyber-cyan/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-50" />
              <CardHeader className="relative space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-cyber-cyan/10 border-cyber-cyan/20 flex h-12 w-12 items-center justify-center rounded-xl border">
                    <Layout className="text-cyber-cyan h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl">Frontend</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-4">
                {skills.frontend.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill.name}
                    level={skill.level}
                    delay={index * 100}
                  />
                ))}
              </CardContent>
            </Card>

            {/* Backend Skills */}
            <Card className="border-border/50 from-background/90 to-background/70 hover:border-cyber-magenta/50 relative overflow-hidden bg-gradient-to-br backdrop-blur-xl transition-all duration-500">
              <div className="from-cyber-magenta/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-50" />
              <CardHeader className="relative space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-cyber-magenta/10 border-cyber-magenta/20 flex h-12 w-12 items-center justify-center rounded-xl border">
                    <Database className="text-cyber-magenta h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl">Backend</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-4">
                {skills.backend.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill.name}
                    level={skill.level}
                    delay={index * 100}
                  />
                ))}
              </CardContent>
            </Card>

            {/* Tools & DevOps */}
            <Card className="border-border/50 from-background/90 to-background/70 hover:border-cyber-purple/50 relative overflow-hidden bg-gradient-to-br backdrop-blur-xl transition-all duration-500">
              <div className="from-cyber-purple/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-50" />
              <CardHeader className="relative space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-cyber-purple/10 border-cyber-purple/20 flex h-12 w-12 items-center justify-center rounded-xl border">
                    <Terminal className="text-cyber-purple h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl">Tools & DevOps</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-4">
                {skills.tools.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill.name}
                    level={skill.level}
                    delay={index * 100}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="mb-32 space-y-12">
          <div className="space-y-6">
            <div className="inline-flex">
              <Badge
                variant="outline"
                className="border-cyber-cyan/40 text-cyber-cyan px-4 py-2 text-sm font-medium"
              >
                <Rocket className="mr-2 h-4 w-4" />
                Expertise
              </Badge>
            </div>
            <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
              <span className="gradient-text">What I Do Best</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl text-lg">
              My expertise spans the full development lifecycle, from concept to deployment. Here's
              what I bring to the table:
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item, index) => (
              <Card
                key={item.title}
                className="border-border/50 from-background/90 to-background/70 hover:border-cyber-cyan/50 hover:shadow-cyber-cyan/20 group relative overflow-hidden bg-gradient-to-br backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Corner glow effect */}
                <div className="bg-cyber-cyan/20 absolute -right-24 -top-24 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <CardHeader className="relative space-y-4 pb-4">
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-cyber-${item.color}/10 border border-cyber-${item.color}/20 text-cyber-${item.color} transition-all duration-500 group-hover:rotate-12 group-hover:scale-110`}
                  >
                    <item.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="group-hover:text-cyber-cyan text-xl transition-colors duration-300">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>

                {/* Bottom accent line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyber-${item.color} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
              </Card>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-32 space-y-12">
          <div className="space-y-6 text-center">
            <div className="inline-flex">
              <Badge
                variant="outline"
                className="border-cyber-magenta/40 text-cyber-magenta px-4 py-2 text-sm font-medium"
              >
                <Heart className="mr-2 h-4 w-4" />
                Core Values
              </Badge>
            </div>
            <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
              <span className="gradient-text">Guiding Principles</span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
              These principles guide my work and shape how I approach every project
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="border-border/50 from-background/90 to-background/70 hover:border-cyber-purple/50 hover:shadow-cyber-purple/20 group relative overflow-hidden bg-gradient-to-br backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="from-cyber-purple/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <CardContent className="relative space-y-4 p-6">
                  <div
                    className={`h-12 w-12 rounded-xl bg-cyber-${value.color}/10 border border-cyber-${value.color}/20 flex items-center justify-center transition-all duration-300 group-hover:rotate-12 group-hover:scale-110`}
                  >
                    <value.icon className={`h-6 w-6 text-cyber-${value.color}`} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="group-hover:text-cyber-purple text-xl font-bold transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="mb-32 space-y-12">
          <div className="space-y-6">
            <div className="inline-flex">
              <Badge
                variant="outline"
                className="border-cyber-purple/40 text-cyber-purple px-4 py-2 text-sm font-medium"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Journey
              </Badge>
            </div>
            <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
              <span className="gradient-text">Professional Timeline</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl text-lg">
              A timeline of my professional growth and key milestones
            </p>
          </div>

          <div className="relative space-y-8">
            {/* Animated Timeline line */}
            <div className="from-cyber-cyan via-cyber-magenta to-cyber-purple absolute bottom-12 left-8 top-12 w-px overflow-hidden bg-gradient-to-b md:left-12">
              <div className="animate-shimmer absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-50" />
            </div>

            {journey.map((item, index) => (
              <div
                key={item.year}
                className="animate-in fade-in slide-in-from-left group relative pl-24 duration-700 md:pl-32"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Animated Timeline dot */}
                <div
                  className={`border-background absolute left-6 top-8 h-6 w-6 rounded-full border-4 md:left-10 bg-cyber-${item.color} shadow-lg shadow-cyber-${item.color}/50 z-10 transition-all duration-500 group-hover:rotate-180 group-hover:scale-150`}
                >
                  <div
                    className={`absolute inset-0 rounded-full bg-cyber-${item.color} animate-ping opacity-75`}
                  />
                </div>

                <Card className="border-border/50 from-background/90 to-background/70 hover:border-cyber-cyan/50 hover:shadow-cyber-cyan/20 bg-gradient-to-br backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  <div className="from-cyber-cyan/0 via-cyber-cyan/5 absolute inset-0 rounded-lg bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <CardContent className="relative p-6 md:p-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                      <div
                        className={`h-14 w-14 rounded-xl bg-cyber-${item.color}/10 border border-cyber-${item.color}/20 flex flex-shrink-0 items-center justify-center transition-all duration-300 group-hover:rotate-12 group-hover:scale-110`}
                      >
                        <item.icon className={`h-7 w-7 text-cyber-${item.color}`} />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <Badge variant="cyan" className="px-3 py-1 text-base font-bold">
                            {item.year}
                          </Badge>
                          <h3 className="text-xl font-bold md:text-2xl">{item.title}</h3>
                        </div>
                        <p className="text-muted-foreground text-base leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <Card className="border-cyber-cyan/30 from-cyber-cyan/10 via-background/80 to-cyber-magenta/10 hover:border-cyber-cyan/50 group relative overflow-hidden border-2 bg-gradient-to-br backdrop-blur-xl transition-all duration-500">
            {/* Animated background */}
            <div className="from-cyber-cyan/5 via-cyber-magenta/5 to-cyber-purple/5 animate-gradient absolute inset-0 bg-gradient-to-r" />

            {/* Glowing orbs */}
            <div className="bg-cyber-cyan/20 absolute -left-24 -top-24 h-48 w-48 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150" />
            <div className="bg-cyber-magenta/20 absolute -bottom-24 -right-24 h-48 w-48 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-150" />

            <CardContent className="relative space-y-8 p-8 text-center md:p-16">
              <div className="space-y-4">
                <div className="inline-flex">
                  <Badge
                    variant="cyan"
                    className="animate-pulse-glow px-4 py-2 text-sm font-semibold"
                  >
                    <Star className="mr-2 h-4 w-4" />
                    Let's Collaborate
                  </Badge>
                </div>
                <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
                  <span className="gradient-text">Let's Build Something Amazing</span>
                </h2>
                <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
                  I'm always excited to work on new projects and collaborate with talented people.
                  Let's create something exceptional together.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button
                  size="lg"
                  variant="neon"
                  asChild
                  className="group/btn relative overflow-hidden"
                >
                  <Link href="/contact">
                    <span className="relative z-10 flex items-center">
                      Get in Touch
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                    <div className="from-cyber-cyan/20 via-cyber-magenta/20 to-cyber-purple/20 absolute inset-0 bg-gradient-to-r opacity-0 blur-xl transition-opacity group-hover/btn:opacity-100" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-cyber-cyan/40 hover:bg-cyber-cyan/10 hover:border-cyber-cyan backdrop-blur-sm"
                >
                  <Link href="/projects">
                    View My Work
                    <Zap className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
