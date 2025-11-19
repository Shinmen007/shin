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
const EnhancedHero = dynamic(() => import("@/components/hero/enhanced-hero").then(mod => ({ default: mod.EnhancedHero })), {
  loading: () => <div className="min-h-screen bg-black" />,
});

const EnhancedTechArsenal = dynamic(() => import("@/components/skills/enhanced-tech-arsenal").then(mod => ({ default: mod.EnhancedTechArsenal })), {
  loading: () => <div className="min-h-[600px] bg-black" />,
});

const LiveDataFeed = dynamic(() => import("@/components/effects/data-viz").then(mod => ({ default: mod.LiveDataFeed })), {
  loading: () => <div className="h-64 bg-black/50 animate-pulse rounded-xl" />,
});

export default function HomePage() {
  const { playClick, playSuccess } = useAudioSystem();

  // Get featured projects and recent posts
  const featuredProjects = allProjects
    .filter((project) => project.published && project.tags.includes("Featured"))
    .slice(0, 3);

  const recentPosts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 2);

  const skills = [
    { label: 'React/Next.js', value: 95, max: 100 },
    { label: 'TypeScript', value: 90, max: 100 },
    { label: 'Three.js/WebGL', value: 85, max: 100 },
    { label: 'Node.js/Backend', value: 88, max: 100 },
    { label: 'System Design', value: 92, max: 100 },
  ];

  const technologies = [
    'react', 'nextjs', 'typescript', 'tailwind',
    'threejs', 'nodejs', 'postgresql', 'docker',
    'graphql', 'redis', 'github', 'vercel',
  ];

  return (
    <div className="flex flex-col relative">
      {/* Enhanced Hero Section - Pure CSS, No Three.js */}
      <EnhancedHero />

      {/* Enhanced Tech Arsenal Section */}
      <EnhancedTechArsenal />

      {/* Featured Projects */}
      <section className="from-background via-background/98 to-background relative overflow-hidden bg-gradient-to-b py-24">
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-16 max-w-4xl space-y-6 text-center"
          >
            <GlitchText text="FEATURED PROJECTS" className="text-4xl md:text-6xl font-black" color="magenta" />
            <p className="text-muted-foreground/90 text-lg md:text-xl">
              Transforming ideas into production-ready solutions with real impact
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <CyberpunkCard
                    variant="holographic"
                    enable3D
                    enableSound
                    glowColor={['cyan', 'magenta', 'purple'][index % 3] as any}
                    intensity="high"
                    className="h-full p-6 space-y-4"
                  >
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="cyan">{tag}</Badge>
                      ))}
                    </div>

                    <h3 className="text-2xl font-bold gradient-text">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground">
                      {project.summary}
                    </p>

                    <div className="flex gap-2 flex-wrap">
                      {project.stack.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-cyber-cyan/20">
                      <span className="text-sm font-semibold text-cyber-cyan">View Details</span>
                      <ArrowRight className="h-4 w-4 text-cyber-cyan" />
                    </div>
                  </CyberpunkCard>
                </Link>
              </motion.div>
            ))}
          </div>
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
