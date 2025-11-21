"use client";

import { Project } from "contentlayer/generated";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Calendar, TrendingUp, Users, Zap, Award, ArrowLeft, Star, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { motion } from "framer-motion";
import { useRef } from "react";

interface ProjectDetailProps {
  project: Project;
}

function MetricCard3D({ 
  icon: Icon, 
  value, 
  label, 
  color, 
  index 
}: { 
  icon: any; 
  value: string | number; 
  label: string; 
  color: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-${color}/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all`} />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative p-6 rounded-2xl bg-black/60 border-2 border-${color}/30 backdrop-blur-sm hover:border-${color}/60 transition-all duration-300`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flex items-center gap-3 mb-3" style={{ transform: 'translateZ(20px)' }}>
          <motion.div 
            className={`p-2.5 rounded-xl bg-${color}/20`}
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className={`h-6 w-6 text-${color}`} />
          </motion.div>
          <motion.div 
            className="text-4xl font-black text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
          >
            {value}
          </motion.div>
        </div>
        <div className="text-xs uppercase tracking-widest text-gray-400 font-bold" style={{ transform: 'translateZ(10px)' }}>
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const MDXContent = useMDXComponent(project.body.code);

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
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/10 via-black to-cyber-magenta/10" />
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-cyan/20 rounded-full blur-[120px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyber-magenta/20 rounded-full blur-[120px]"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      <article className="container max-w-6xl py-16 px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyber-cyan transition-all group mb-12"
          >
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyber-cyan/50 transition-all">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="font-medium">Back to Projects</span>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="mb-20">
          <motion.div 
            className="flex flex-wrap gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {project.tags.map((tag, i) => {
              const variant =
                tag === "Featured"
                  ? "cyan"
                  : tag.includes("AI")
                    ? "magenta"
                    : tag.includes("3D")
                      ? "purple"
                      : "default";

              return (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Badge variant={variant as any} className="text-sm px-4 py-1.5">
                    {tag}
                  </Badge>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white via-cyber-cyan to-cyber-magenta bg-clip-text text-transparent">
              {project.title}
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {project.summary}
          </motion.p>

          <motion.div 
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {project.liveUrl && (
              <Button variant="holographic" size="lg" asChild className="text-base">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Sparkles className="mr-2 h-5 w-5" />
                  View Live Demo
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button variant="outline" size="lg" asChild className="text-base">
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  Source Code
                </a>
              </Button>
            )}
            <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <Calendar className="h-4 w-4 text-cyber-cyan" />
              <span className="text-sm font-mono text-gray-400">
                {startDate} – {endDate}
              </span>
            </div>
          </motion.div>
        </div>

        {/* 3D Metrics Cards */}
        <div className="mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard3D
              icon={Zap}
              value={project.metrics.lighthouse}
              label="Lighthouse Score"
              color="cyber-cyan"
              index={0}
            />
            <MetricCard3D
              icon={TrendingUp}
              value={project.metrics.perfScore}
              label="Performance"
              color="cyber-magenta"
              index={1}
            />
            <MetricCard3D
              icon={Users}
              value={project.metrics.users}
              label="Active Users"
              color="cyber-purple"
              index={2}
            />
            <MetricCard3D
              icon={Award}
              value={project.metrics.uptime}
              label="Uptime"
              color="cyber-success"
              index={3}
            />
          </div>
        </div>

        {/* Highlights Section */}
        {project.highlights && project.highlights.length > 0 && (
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/10 via-cyber-magenta/10 to-cyber-purple/10 rounded-3xl blur-2xl" />
              <div className="relative p-8 md:p-10 rounded-3xl bg-black/40 border-2 border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-8">
                  <motion.div 
                    className="p-3 rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-magenta"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Star className="h-6 w-6 text-black" />
                  </motion.div>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-cyber-cyan to-cyber-magenta bg-clip-text text-transparent">
                    KEY ACHIEVEMENTS
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyber-cyan/50 transition-all cursor-pointer"
                    >
                      <motion.div 
                        className="mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-magenta flex-shrink-0"
                        animate={{
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      />
                      <span className="text-gray-300 leading-relaxed">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tech Stack */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            TECHNOLOGY STACK
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.stack.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-5 py-2.5 rounded-xl bg-white/5 border-2 border-white/10 hover:border-cyber-cyan/50 hover:bg-white/10 transition-all text-sm font-semibold text-gray-300 hover:text-cyber-cyan cursor-pointer"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Case Study Content */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl" />
            <div className="relative p-8 md:p-12 rounded-3xl bg-black/40 border-2 border-white/10 backdrop-blur-xl">
              <div className="prose prose-lg prose-invert prose-headings:font-black prose-headings:bg-gradient-to-r prose-headings:from-white prose-headings:to-gray-400 prose-headings:bg-clip-text prose-headings:text-transparent prose-h2:text-4xl prose-h2:mb-6 prose-h2:mt-12 prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg prose-li:text-gray-300 prose-strong:text-white prose-strong:font-bold prose-code:text-cyber-cyan prose-code:bg-black/50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-pre:bg-black/80 prose-pre:border-2 prose-pre:border-cyber-cyan/30 prose-pre:rounded-2xl prose-pre:p-6 prose-a:text-cyber-cyan prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-cyber-cyan prose-blockquote:bg-white/5 prose-blockquote:rounded-r-xl max-w-none">
                <MDXContent />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 via-cyber-magenta/20 to-cyber-purple/20 rounded-3xl blur-2xl" />
          <div className="relative p-10 rounded-3xl bg-black/60 border-2 border-white/10 backdrop-blur-xl text-center">
            <motion.h3 
              className="text-3xl font-black mb-4 bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Interested in This Project?
            </motion.h3>
            <p className="text-gray-400 mb-8 text-lg">
              Explore the live demo or dive into the source code
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {project.liveUrl && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="holographic" size="lg" asChild className="text-base">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Try Live Demo
                    </a>
                  </Button>
                </motion.div>
              )}
              {project.repoUrl && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" asChild className="text-base">
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-5 w-5" />
                      View Source Code
                    </a>
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
