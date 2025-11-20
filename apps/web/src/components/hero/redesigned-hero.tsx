"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail, Code2, Sparkles, Terminal, Cpu, Zap } from "lucide-react";
import Link from "next/link";
import { useAudioSystem } from "@/lib/audio-system";
import { useRef } from "react";
import { SplineScene } from "./spline-scene";

const roles = [
  "Full-Stack Developer",
  "3D Artist",
  "UI/UX Designer",
  "System Architect",
];

export function RedesignedHero() {
  const { playClick } = useAudioSystem();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-black to-background"
    >
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <SplineScene />
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/50 to-black/80 pointer-events-none" />

      {/* Animated Background Grid */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,245,255,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,245,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '80px 80px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Gradient Orbs - Reduced opacity since we have Spline */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-cyber-cyan rounded-full blur-[120px] opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/4 -right-40 w-96 h-96 bg-cyber-magenta rounded-full blur-[120px] opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyber-purple rounded-full blur-[120px] opacity-10"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-[10] flex min-h-screen flex-col items-center justify-center px-4 py-20"
      >
        <div className="max-w-7xl w-full mx-auto">

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <Badge
              variant="cyan"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold backdrop-blur-xl border-2 border-cyber-cyan/50 shadow-lg shadow-cyber-cyan/30"
            >
              <motion.span
                className="relative flex h-2 w-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-cyan" />
              </motion.span>
              AVAILABLE FOR WORK
            </Badge>
          </motion.div>

          {/* Main Hero Content - Split Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Text Content */}
            <div className="space-y-8 text-center lg:text-left">

              {/* Animated Role */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center gap-3 justify-center lg:justify-start"
              >
                <Terminal className="h-5 w-5 text-cyber-cyan" />
                <motion.div
                  className="font-mono text-sm md:text-base text-cyber-cyan font-bold"
                  key={roles[0]}
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  {`> ${roles[0]}_`}
                </motion.div>
              </motion.div>

              {/* Name - Big & Bold */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-2"
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight">
                  <motion.span
                    className="block bg-gradient-to-r from-white via-cyber-cyan to-white bg-clip-text text-transparent"
                    style={{
                      backgroundSize: '200% auto',
                    }}
                    animate={{
                      backgroundPosition: ['0% center', '200% center'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    ROSHAN
                  </motion.span>
                  <motion.span
                    className="block bg-gradient-to-r from-cyber-magenta via-cyber-purple to-cyber-magenta bg-clip-text text-transparent"
                    style={{
                      backgroundSize: '200% auto',
                    }}
                    animate={{
                      backgroundPosition: ['200% center', '0% center'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    KHATRI
                  </motion.span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
              >
                Crafting{" "}
                <span className="text-cyber-cyan font-semibold">immersive digital experiences</span>
                {" "}that blend cutting-edge technology with stunning visual design.
                Specializing in full-stack development, 3D web graphics, and scalable system architecture.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="holographic"
                    size="lg"
                    asChild
                    className="group text-base px-8 py-6"
                  >
                    <Link href="/projects">
                      <Zap className="h-5 w-5 mr-2" />
                      View Projects
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="text-base px-8 py-6 border-2 border-cyber-cyan/50 hover:border-cyber-cyan hover:bg-cyber-cyan/10"
                  >
                    <Link href="/contact">
                      <Mail className="h-5 w-5 mr-2" />
                      Get in Touch
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-center gap-4 justify-center lg:justify-start"
              >
                {[
                  { icon: Github, href: "https://github.com/roshankhatri", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com/in/roshankhatri", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:hello@roshankhatri.dev", label: "Email" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group relative flex h-12 w-12 items-center justify-center rounded-xl border-2 border-border bg-black/50 backdrop-blur-sm transition-all hover:border-cyber-cyan hover:bg-cyber-cyan/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-cyber-cyan transition-colors" />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Right: Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative hidden lg:block"
            >
              {/* 3D Cube Wireframe */}
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Rotating cubes */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Outer cube */}
                  <div className="relative w-80 h-80 border-2 border-cyber-cyan/30 rounded-2xl" />
                </motion.div>

                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotateY: -360, rotateX: 180 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Middle cube */}
                  <div className="relative w-64 h-64 border-2 border-cyber-magenta/30 rounded-2xl" />
                </motion.div>

                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotateZ: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Inner cube */}
                  <div className="relative w-48 h-48 border-2 border-cyber-purple/30 rounded-2xl" />
                </motion.div>

                {/* Center icon */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-cyber-cyan/20 via-cyber-magenta/20 to-cyber-purple/20 backdrop-blur-xl border-2 border-white/10 shadow-2xl">
                    <Code2 className="h-16 w-16 text-cyber-cyan" />
                  </div>
                </motion.div>

                {/* Floating tech icons */}
                {[
                  { icon: Terminal, color: 'text-cyber-cyan', delay: 0, x: -120, y: -80 },
                  { icon: Cpu, color: 'text-cyber-magenta', delay: 0.5, x: 120, y: -60 },
                  { icon: Sparkles, color: 'text-cyber-purple', delay: 1, x: -100, y: 100 },
                  { icon: Zap, color: 'text-cyber-cyan', delay: 1.5, x: 110, y: 90 },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`absolute p-4 rounded-xl bg-black/50 backdrop-blur-sm border-2 border-white/10 ${item.color}`}
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: item.x,
                      marginTop: item.y,
                    }}
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: item.delay,
                    }}
                  >
                    <item.icon className="h-8 w-8" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: 'Projects', value: '50+', icon: Code2 },
              { label: 'Experience', value: '5+', icon: Zap },
              { label: 'Technologies', value: '30+', icon: Cpu },
              { label: 'Happy Clients', value: '25+', icon: Sparkles },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group relative p-6 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-cyber-cyan/50 transition-all"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <stat.icon className="h-6 w-6 text-cyber-cyan mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>

                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-cyber-cyan/0 group-hover:bg-cyber-cyan/5 blur-xl pointer-events-none transition-all"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[20]"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
        >
          <span className="text-xs font-medium text-muted-foreground group-hover:text-cyber-cyan transition-colors">
            Scroll
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-cyber-cyan/50 group-hover:border-cyber-cyan flex items-start justify-center p-2 transition-colors">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-cyber-cyan"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
