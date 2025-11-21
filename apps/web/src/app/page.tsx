"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { CyberpunkCard } from "@/components/ui/cyberpunk-card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Mail, Award, Star } from "lucide-react";
import Link from "next/link";
import { allProjects, allPosts } from "contentlayer/generated";
import { GlitchText } from "@/components/effects/glitch-text";
import { motion } from "framer-motion";
import { useAudioSystem } from "@/lib/audio-system";

// Dynamic imports for heavy components
const RedesignedHero = dynamic(() => import("@/components/hero/redesigned-hero").then(mod => mod.RedesignedHero), {
  loading: () => <div className="min-h-screen bg-black" />,
  ssr: false,
});

const EnhancedTechArsenal = dynamic(() => import("@/components/skills/enhanced-tech-arsenal").then(mod => mod.EnhancedTechArsenal), {
  loading: () => <div className="min-h-[600px] bg-black" />,
  ssr: false,
});

const LiveDataFeed = dynamic(() => import("@/components/effects/data-viz").then(mod => mod.LiveDataFeed), {
  loading: () => <div className="h-64 bg-black/50 animate-pulse rounded-xl" />,
  ssr: false,
});

export default function HomePage() {
  const { playSuccess } = useAudioSystem();

  // Get featured projects and recent posts
  const featuredProjects = allProjects
    .filter((project) => project.published && project.tags.includes("Featured"))
    .slice(0, 3);

  return (
    <div className="relative flex flex-col">
      {/* Redesigned Hero Section - Modern & Clean */}
      <RedesignedHero />

      {/* Enhanced Tech Arsenal Section */}
      <EnhancedTechArsenal />

      {/* Featured Projects - Enhanced */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-black to-background py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-0 w-96 h-96 bg-cyber-cyan rounded-full blur-[150px] opacity-10"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyber-magenta rounded-full blur-[150px] opacity-10"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-20 max-w-3xl"
          >
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center mb-6"
            >
              <Badge variant="outline" className="px-4 py-2 border-cyber-magenta/50 text-cyber-magenta">
                <Star className="h-3 w-3 mr-2 fill-cyber-magenta" />
                Featured Work
              </Badge>
            </motion.div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-cyber-cyan to-cyber-magenta bg-clip-text text-transparent">
                Projects That Make
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyber-magenta via-cyber-purple to-white bg-clip-text text-transparent">
                An Impact
              </span>
            </h2>

            {/* Description */}
            <p className="text-center text-muted-foreground text-lg md:text-xl leading-relaxed">
              A curated selection of my finest work — from innovative web applications
              to immersive 3D experiences that push technological boundaries
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.7,
                  type: 'spring',
                  stiffness: 100,
                }}
              >
                <Link href={`/projects/${project.slug}`} className="group block h-full">
                  <motion.div
                    className="relative h-full rounded-2xl border-2 bg-black/40 backdrop-blur-xl p-8 transition-all duration-300 overflow-hidden"
                    style={{
                      borderColor: ['#00f5ff', '#ff00ff', '#9d00ff'][index % 3] + '40',
                    }}
                    whileHover={{
                      y: -8,
                      borderColor: ['#00f5ff', '#ff00ff', '#9d00ff'][index % 3],
                    }}
                  >
                    {/* Animated Background Gradient */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${['#00f5ff', '#ff00ff', '#9d00ff'][index % 3]}15, transparent 40%)`,
                      }}
                    />

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity">
                      <div
                        className="absolute top-4 right-4 w-16 h-16 rounded-full blur-2xl"
                        style={{
                          backgroundColor: ['#00f5ff', '#ff00ff', '#9d00ff'][index % 3],
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="relative space-y-6">
                      {/* Project Number & Tags */}
                      <div className="flex items-start justify-between gap-4">
                        <motion.div
                          className="text-6xl font-black opacity-10 group-hover:opacity-20 transition-opacity"
                          style={{
                            color: ['#00f5ff', '#ff00ff', '#9d00ff'][index % 3],
                          }}
                        >
                          0{index + 1}
                        </motion.div>
                        <div className="flex flex-wrap gap-2 justify-end">
                          {project.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              className="text-xs px-2 py-1 border"
                              style={{
                                borderColor: ['#00f5ff', '#ff00ff', '#9d00ff'][index % 3] + '60',
                                color: ['#00f5ff', '#ff00ff', '#9d00ff'][index % 3],
                                backgroundColor: ['#00f5ff', '#ff00ff', '#9d00ff'][index % 3] + '10',
                              }}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyber-cyan group-hover:bg-clip-text transition-all duration-300">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {project.summary}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                        {project.stack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-muted-foreground font-medium hover:bg-white/10 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.stack.length > 4 && (
                          <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-muted-foreground font-medium">
                            +{project.stack.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* View Project Link */}
                      <motion.div
                        className="flex items-center gap-2 pt-4 font-semibold"
                        style={{
                          color: ['#00f5ff', '#ff00ff', '#9d00ff'][index % 3],
                        }}
                      >
                        <span className="text-sm">Explore Project</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"
                      style={{
                        background: `linear-gradient(135deg, ${['#00f5ff', '#ff00ff', '#9d00ff'][index % 3]}40, transparent)`,
                      }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Projects CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-16"
          >
            <Button
              variant="outline"
              size="lg"
              asChild
              className="group border-2 border-cyber-cyan/50 hover:border-cyber-cyan hover:bg-cyber-cyan/10 text-base px-8 py-6"
            >
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Live Data Feed Section */}
      <section className="border-border/40 border-t py-24 bg-black/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <LiveDataFeed className="w-full" />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24 border-t border-border/40">
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <CyberpunkCard
              variant="holographic"
              intensity="high"
              glowColor="multi"
              className="max-w-4xl mx-auto p-12 text-center space-y-8"
            >
              <GlitchText text="LET'S BUILD SOMETHING AMAZING" className="text-3xl md:text-5xl font-black" />

              <p className="text-muted-foreground/90 text-lg md:text-xl max-w-2xl mx-auto">
                I'm always interested in hearing about new projects, opportunities, and collaborations.
                Let's create the future together.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="holographic"
                  asChild
                  enableSound
                  glowIntensity="high"
                  onClick={() => playSuccess()}
                >
                  <Link href="/contact">
                    <span className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Start a Conversation
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="plasma"
                  asChild
                  enableSound
                  glowIntensity="high"
                >
                  <a href="/api/resume" download>
                    <span className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Download Resume
                    </span>
                  </a>
                </Button>
              </div>
            </CyberpunkCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
