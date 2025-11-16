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
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
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
    <div ref={ref} className="text-4xl md:text-5xl font-bold gradient-text">
      {count}{suffix}
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
        <span className="text-sm font-semibold text-foreground">{skill}</span>
        <span className="text-sm font-bold text-cyber-cyan">{level}%</span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted/30 border border-border/50">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-cyber-cyan/20 blur-md transition-all duration-1000 ease-out"
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
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyber-magenta/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
      </div>

      <div className="container py-12 md:py-20 max-w-7xl">
        {/* Hero Section */}
        <section className="mb-32 relative">
          <div className="space-y-8">
            {/* Badge with animation */}
            <div className="inline-flex animate-in fade-in slide-in-from-bottom-1 duration-700">
              <Badge
                variant="cyan"
                className="px-5 py-2.5 text-sm font-semibold shadow-lg shadow-cyber-cyan/30 backdrop-blur-xl animate-pulse-glow"
              >
                <Sparkles className="mr-2 h-4 w-4 animate-spin" style={{ animationDuration: '3s' }} />
                About Me
              </Badge>
            </div>

            {/* Main Heading with staggered animation */}
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-150">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="gradient-text inline-block relative">
                  Building Digital Experiences
                  <span className="absolute inset-0 gradient-text blur-2xl opacity-30 animate-pulse pointer-events-none" style={{ animationDuration: '4s' }}>
                    Building Digital Experiences
                  </span>
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl leading-relaxed">
                I'm a passionate{" "}
                <span className="font-bold text-cyber-cyan">full-stack developer</span> with a love for creating
                exceptional digital experiences. With expertise spanning from{" "}
                <span className="font-bold text-cyber-magenta">pixel-perfect frontend design</span> to{" "}
                <span className="font-bold text-cyber-purple">robust backend architecture</span>, I bring ideas to
                life through code.
              </p>
            </div>

            {/* Interests Pills */}
            <div className="flex flex-wrap gap-3 pt-4 animate-in fade-in slide-in-from-bottom-3 duration-1000 delay-300">
              {interests.map((interest, index) => (
                <div
                  key={interest.label}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-${interest.color}/30 bg-cyber-${interest.color}/5 backdrop-blur-xl hover:border-cyber-${interest.color} hover:bg-cyber-${interest.color}/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyber-${interest.color}/30 cursor-default`}
                >
                  <interest.icon className={`h-4 w-4 text-cyber-${interest.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-sm font-medium">{interest.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Animated Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className="group relative overflow-hidden border-border/50 bg-gradient-to-br from-background/80 via-background/60 to-background/40 backdrop-blur-xl hover:border-cyber-cyan/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyber-cyan/20"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/0 via-cyber-cyan/5 to-cyber-magenta/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Corner glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyber-cyan/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="relative p-6 md:p-8 text-center space-y-4">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <stat.icon className="h-7 w-7 text-cyber-cyan" />
                  </div>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-32 space-y-8">
          <div className="space-y-6">
            <div className="inline-flex">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-cyber-magenta/40 text-cyber-magenta">
                <Heart className="mr-2 h-4 w-4" />
                My Story
              </Badge>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="gradient-text">The Journey So Far</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 text-lg text-muted-foreground leading-relaxed">
              <div className="space-y-6">
                <p className="relative pl-6 border-l-2 border-cyber-cyan">
                  My journey into software development began with a simple curiosity about how websites work. That
                  curiosity grew into a <span className="font-semibold text-cyber-cyan">passion for creating beautiful, functional, and performant web applications</span> that make a difference in people's lives.
                </p>
                <p className="relative pl-6 border-l-2 border-cyber-magenta">
                  Over the years, I've had the privilege of working on diverse projects—from{" "}
                  <span className="font-semibold text-cyber-magenta">e-commerce platforms handling millions of users</span> to{" "}
                  <span className="font-semibold text-cyber-purple">interactive 3D experiences</span> that push the boundaries of what's possible on the web.
                </p>
              </div>
              <div className="space-y-6">
                <p className="relative pl-6 border-l-2 border-cyber-purple">
                  Each project has taught me something new and reinforced my commitment to continuous learning and
                  improvement. I believe in <span className="font-semibold text-cyber-purple">writing code that not only works but is elegant, maintainable, and scalable</span>.
                </p>
                <p className="relative pl-6 border-l-2 border-cyber-cyan">
                  Today, I specialize in building full-stack applications with modern technologies, exploring the
                  intersection of <span className="font-semibold text-cyber-cyan">AI/ML and web development</span>, creating more
                  intelligent and intuitive user experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-32 space-y-12">
          <div className="space-y-6 text-center">
            <div className="inline-flex">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-cyber-purple/40 text-cyber-purple">
                <Code2 className="mr-2 h-4 w-4" />
                Technical Skills
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="gradient-text">My Tech Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A comprehensive overview of my technical expertise across different domains
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Frontend Skills */}
            <Card className="relative overflow-hidden border-border/50 bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-xl hover:border-cyber-cyan/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 to-transparent opacity-50" />
              <CardHeader className="relative space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center">
                    <Layout className="h-6 w-6 text-cyber-cyan" />
                  </div>
                  <CardTitle className="text-2xl">Frontend</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-4">
                {skills.frontend.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill.name} level={skill.level} delay={index * 100} />
                ))}
              </CardContent>
            </Card>

            {/* Backend Skills */}
            <Card className="relative overflow-hidden border-border/50 bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-xl hover:border-cyber-magenta/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-magenta/5 to-transparent opacity-50" />
              <CardHeader className="relative space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-cyber-magenta/10 border border-cyber-magenta/20 flex items-center justify-center">
                    <Database className="h-6 w-6 text-cyber-magenta" />
                  </div>
                  <CardTitle className="text-2xl">Backend</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-4">
                {skills.backend.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill.name} level={skill.level} delay={index * 100} />
                ))}
              </CardContent>
            </Card>

            {/* Tools & DevOps */}
            <Card className="relative overflow-hidden border-border/50 bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-xl hover:border-cyber-purple/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/5 to-transparent opacity-50" />
              <CardHeader className="relative space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-cyber-purple/10 border border-cyber-purple/20 flex items-center justify-center">
                    <Terminal className="h-6 w-6 text-cyber-purple" />
                  </div>
                  <CardTitle className="text-2xl">Tools & DevOps</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-4">
                {skills.tools.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill.name} level={skill.level} delay={index * 100} />
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="mb-32 space-y-12">
          <div className="space-y-6">
            <div className="inline-flex">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-cyber-cyan/40 text-cyber-cyan">
                <Rocket className="mr-2 h-4 w-4" />
                Expertise
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="gradient-text">What I Do Best</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              My expertise spans the full development lifecycle, from concept to deployment. Here's what I bring to the
              table:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, index) => (
              <Card
                key={item.title}
                className="group relative overflow-hidden border-border/50 bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-xl hover:border-cyber-cyan/50 hover:shadow-2xl hover:shadow-cyber-cyan/20 transition-all duration-500 hover:scale-105"
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Corner glow effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyber-cyan/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardHeader className="relative space-y-4 pb-4">
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-cyber-${item.color}/10 border border-cyber-${item.color}/20 text-cyber-${item.color} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                  >
                    <item.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-cyber-cyan transition-colors duration-300">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base leading-relaxed">{item.description}</CardDescription>
                </CardContent>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyber-${item.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </Card>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-32 space-y-12">
          <div className="space-y-6 text-center">
            <div className="inline-flex">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-cyber-magenta/40 text-cyber-magenta">
                <Heart className="mr-2 h-4 w-4" />
                Core Values
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="gradient-text">Guiding Principles</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These principles guide my work and shape how I approach every project
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="group relative overflow-hidden border-border/50 bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-xl hover:border-cyber-purple/50 hover:shadow-2xl hover:shadow-cyber-purple/20 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="relative p-6 space-y-4">
                  <div className={`h-12 w-12 rounded-xl bg-cyber-${value.color}/10 border border-cyber-${value.color}/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                    <value.icon className={`h-6 w-6 text-cyber-${value.color}`} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl group-hover:text-cyber-purple transition-colors">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
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
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-cyber-purple/40 text-cyber-purple">
                <TrendingUp className="mr-2 h-4 w-4" />
                Journey
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="gradient-text">Professional Timeline</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              A timeline of my professional growth and key milestones
            </p>
          </div>

          <div className="space-y-8 relative">
            {/* Animated Timeline line */}
            <div className="absolute left-8 md:left-12 top-12 bottom-12 w-px bg-gradient-to-b from-cyber-cyan via-cyber-magenta to-cyber-purple overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-50 animate-shimmer" />
            </div>

            {journey.map((item, index) => (
              <div
                key={item.year}
                className="group relative pl-24 md:pl-32 animate-in fade-in slide-in-from-left duration-700"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Animated Timeline dot */}
                <div className={`absolute left-6 md:left-10 top-8 h-6 w-6 rounded-full border-4 border-background bg-cyber-${item.color} shadow-lg shadow-cyber-${item.color}/50 group-hover:scale-150 group-hover:rotate-180 transition-all duration-500 z-10`}>
                  <div className={`absolute inset-0 rounded-full bg-cyber-${item.color} animate-ping opacity-75`} />
                </div>

                <Card className="border-border/50 bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-xl hover:border-cyber-cyan/50 hover:shadow-2xl hover:shadow-cyber-cyan/20 transition-all duration-500 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />

                  <CardContent className="relative p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className={`h-14 w-14 rounded-xl bg-cyber-${item.color}/10 border border-cyber-${item.color}/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                        <item.icon className={`h-7 w-7 text-cyber-${item.color}`} />
                      </div>
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <Badge variant="cyan" className="font-bold text-base px-3 py-1">
                            {item.year}
                          </Badge>
                          <h3 className="font-bold text-xl md:text-2xl">{item.title}</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-base">{item.description}</p>
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
          <Card className="group relative overflow-hidden border-2 border-cyber-cyan/30 bg-gradient-to-br from-cyber-cyan/10 via-background/80 to-cyber-magenta/10 backdrop-blur-xl hover:border-cyber-cyan/50 transition-all duration-500">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/5 via-cyber-magenta/5 to-cyber-purple/5 animate-gradient" />

            {/* Glowing orbs */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyber-cyan/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyber-magenta/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />

            <CardContent className="relative p-8 md:p-16 text-center space-y-8">
              <div className="space-y-4">
                <div className="inline-flex">
                  <Badge variant="cyan" className="px-4 py-2 text-sm font-semibold animate-pulse-glow">
                    <Star className="mr-2 h-4 w-4" />
                    Let's Collaborate
                  </Badge>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  <span className="gradient-text">Let's Build Something Amazing</span>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  I'm always excited to work on new projects and collaborate with talented people. Let's create
                  something exceptional together.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Button size="lg" variant="neon" asChild className="group/btn relative overflow-hidden">
                  <Link href="/contact">
                    <span className="relative z-10 flex items-center">
                      Get in Touch
                      <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 via-cyber-magenta/20 to-cyber-purple/20 opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity" />
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
