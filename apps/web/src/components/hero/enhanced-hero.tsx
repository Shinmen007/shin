"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlitchText } from "@/components/effects/glitch-text";
import { ArrowRight, Github, Linkedin, Mail, Award, Zap, Code2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useAudioSystem } from "@/lib/audio-system";
import {
  CSSParticles,
  AnimatedGrid,
  FloatingShapes,
  GlowingCircles,
  DataStream,
} from "./css-particles";
import { SplineScene } from "./spline-scene";

const techStack = [
  { text: 'React/Next.js', color: '#00f5ff' },
  { text: 'TypeScript', color: '#ff00ff' },
  { text: 'Three.js/WebGL', color: '#b300ff' },
  { text: 'Node.js', color: '#00f5ff' },
  { text: 'Cloud Architecture', color: '#ff00ff' },
  { text: 'Real-time Systems', color: '#b300ff' },
];

const socialLinks = [
  { href: "https://github.com/roshankhatri", icon: Github, label: "GitHub", color: '#00f5ff' },
  { href: "https://linkedin.com/in/roshankhatri", icon: Linkedin, label: "LinkedIn", color: '#ff00ff' },
  { href: "mailto:hello@roshankhatri.dev", icon: Mail, label: "Email", color: '#b300ff' },
];

export function EnhancedHero() {
  const { playClick } = useAudioSystem();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black border-b border-border/40">
      {/* Spline 3D Background */}
      <SplineScene />

      {/* Additional Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <GlowingCircles />
        <AnimatedGrid />
        <FloatingShapes />
        <CSSParticles />
        <DataStream />
      </div>

      {/* Floating Code Symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => {
          const xStart = (i * 150) % 100;
          const xEnd = ((i + 5) * 150) % 100;
          return (
            <motion.div
              key={i}
              className="absolute text-cyber-cyan/20 font-mono text-2xl"
              style={{
                left: `${xStart}%`,
                top: '-50px',
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [`${xStart}%`, `${xEnd}%`],
              }}
              transition={{
                duration: 15 + (i * 2),
                repeat: Infinity,
                delay: i * 2,
                ease: 'linear',
              }}
            >
              {['<', '>', '{', '}', '/', '*', '#', '@'][i]}
            </motion.div>
          );
        })}
      </div>

      {/* Content - Centered */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <div className="space-y-8 md:space-y-10">

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center"
              >
                <Badge
                  variant="cyan"
                  className="inline-flex items-center gap-2 px-6 py-3 backdrop-blur-xl border-2 border-cyber-cyan/50 shadow-lg shadow-cyber-cyan/30 text-sm md:text-base"
                >
                  <motion.span
                    className="relative flex h-3 w-3"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <span className="absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75 animate-ping" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-cyber-cyan shadow-lg shadow-cyber-cyan/50" />
                  </motion.span>
                  <span className="font-bold">AVAILABLE FOR OPPORTUNITIES</span>
                </Badge>
              </motion.div>

              {/* Main heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-6"
              >
                {/* Title with dividers */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  <motion.div
                    className="h-px w-16 md:w-20 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"
                    animate={{
                      scaleX: [0.5, 1, 0.5],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                  <span className="text-center whitespace-nowrap flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-cyber-cyan" />
                    Full-Stack Developer & 3D Artist
                    <Sparkles className="h-4 w-4 text-cyber-magenta" />
                  </span>
                  <motion.div
                    className="h-px w-16 md:w-20 bg-gradient-to-r from-transparent via-cyber-magenta to-transparent"
                    animate={{
                      scaleX: [0.5, 1, 0.5],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 1.5,
                    }}
                  />
                </div>

                {/* Name with enhanced glitch */}
                <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-none">
                  <motion.div
                    className="mb-2 md:mb-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <GlitchText
                      text="ROSHAN"
                      intensity="high"
                      color="cyan"
                      className="inline-block"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <GlitchText
                      text="KHATRI"
                      intensity="high"
                      color="magenta"
                      className="inline-block"
                    />
                  </motion.div>
                </h1>

                {/* Enhanced descriptions */}
                <motion.div
                  className="space-y-3 md:space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light px-4">
                    Building{" "}
                    <motion.span
                      className="gradient-text font-bold"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      next-generation digital experiences
                    </motion.span>
                    {" "}that push the boundaries of web technology
                  </p>

                  <motion.p
                    className="text-base sm:text-lg md:text-xl text-cyber-cyan/80 font-mono max-w-2xl mx-auto px-4"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    [ Architecting scalable systems • Crafting immersive 3D worlds • Engineering performant solutions ]
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Enhanced Tech Stack Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-2 md:gap-3 max-w-3xl mx-auto px-4"
              >
                {techStack.map((tech, i) => (
                  <motion.div
                    key={tech.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="relative px-3 md:px-4 py-2 rounded-lg bg-black/60 backdrop-blur-sm font-mono text-xs md:text-sm transition-all cursor-default group"
                    style={{
                      border: `2px solid ${tech.color}30`,
                      boxShadow: `0 0 20px ${tech.color}20`,
                    }}
                  >
                    <span style={{ color: tech.color }}>{tech.text}</span>

                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 blur-xl pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${tech.color}40, transparent)`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-4 md:pt-6 px-4"
              >
                <Button
                  variant="holographic"
                  size="lg"
                  asChild
                  enableSound
                  glowIntensity="high"
                  className="group text-sm md:text-base px-6 md:px-8 py-4 md:py-6"
                  onClick={() => playClick()}
                >
                  <Link href="/projects">
                    <span className="flex items-center gap-2 md:gap-3">
                      <Zap className="h-4 w-4 md:h-5 md:w-5" />
                      Explore Projects
                      <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Button>

                <Button
                  variant="plasma"
                  size="lg"
                  asChild
                  enableSound
                  glowIntensity="high"
                  className="text-sm md:text-base px-6 md:px-8 py-4 md:py-6"
                >
                  <Link href="/contact">
                    <span className="flex items-center gap-2 md:gap-3">
                      <Mail className="h-4 w-4 md:h-5 md:w-5" />
                      Get in Touch
                    </span>
                  </Link>
                </Button>

                <Button
                  variant="neon"
                  size="lg"
                  asChild
                  enableSound
                  className="text-sm md:text-base px-6 md:px-8 py-4 md:py-6"
                >
                  <a href="/api/resume" download>
                    <span className="flex items-center gap-2 md:gap-3">
                      <Award className="h-4 w-4 md:h-5 md:w-5" />
                      Resume
                    </span>
                  </a>
                </Button>
              </motion.div>

              {/* Enhanced Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex gap-4 md:gap-6 justify-center pt-6 md:pt-8"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl border-2 bg-black/60 backdrop-blur-md transition-all duration-300 hover:scale-125 hover:-translate-y-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, type: 'spring' }}
                    whileHover={{ rotate: 5 }}
                    style={{
                      borderColor: `${social.color}80`,
                    }}
                  >
                    <social.icon className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground group-hover:text-white transition-colors" />

                    {/* Enhanced Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-lg pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${social.color}, transparent)`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom scroll indicator */}
      <motion.div
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="group relative flex flex-col items-center gap-2 md:gap-3 cursor-pointer">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-cyber-cyan transition-colors">
            Scroll
          </span>

          <motion.div
            className="relative flex h-10 w-6 items-start justify-center rounded-full border-2 border-cyber-cyan/50 group-hover:border-cyber-cyan p-1 transition-colors shadow-lg shadow-cyber-cyan/20"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.div
              className="h-2 w-2 rounded-full bg-cyber-cyan shadow-lg shadow-cyber-cyan/50"
              animate={{
                y: [0, 16, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
