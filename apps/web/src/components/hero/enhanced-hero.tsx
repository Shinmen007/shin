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

      {/* Floating Code Symbols - Enhanced */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => {
          const xStart = (i * 120) % 100;
          const xEnd = ((i + 5) * 120) % 100;
          const symbols = ['<', '>', '{', '}', '/', '*', '#', '@', '()', '[]', '</>','λ'];
          const colors = ['text-cyber-cyan/20', 'text-cyber-magenta/20', 'text-cyber-purple/20'];
          return (
            <motion.div
              key={i}
              className={`absolute ${colors[i % 3]} font-mono text-xl md:text-3xl font-bold`}
              style={{
                left: `${xStart}%`,
                top: '-50px',
                textShadow: `0 0 10px currentColor`,
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [`${xStart}%`, `${xEnd}%`],
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 12 + (i * 2),
                repeat: Infinity,
                delay: i * 1.5,
                ease: 'linear',
              }}
            >
              {symbols[i]}
            </motion.div>
          );
        })}
      </div>

      {/* Holographic Border Frame */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 m-4 md:m-8 border-2 border-cyber-cyan/20 rounded-2xl"
          animate={{
            boxShadow: [
              '0 0 20px rgba(0,245,255,0.3), inset 0 0 20px rgba(0,245,255,0.1)',
              '0 0 40px rgba(255,0,255,0.3), inset 0 0 40px rgba(255,0,255,0.1)',
              '0 0 20px rgba(0,245,255,0.3), inset 0 0 20px rgba(0,245,255,0.1)',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Corner Accents */}
      <div className="absolute inset-0 pointer-events-none p-4 md:p-8">
        {[
          { top: 0, left: 0, rotation: 0 },
          { top: 0, right: 0, rotation: 90 },
          { bottom: 0, right: 0, rotation: 180 },
          { bottom: 0, left: 0, rotation: 270 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-12 md:w-16 md:h-16"
            style={{
              ...pos,
              borderTop: '3px solid rgba(0,245,255,0.5)',
              borderLeft: '3px solid rgba(0,245,255,0.5)',
              transform: `rotate(${pos.rotation}deg)`,
            }}
            animate={{
              borderColor: [
                'rgba(0,245,255,0.5)',
                'rgba(255,0,255,0.5)',
                'rgba(157,0,255,0.5)',
                'rgba(0,245,255,0.5)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
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
                className="space-y-6 relative"
              >
                {/* Title with dividers */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  <motion.div
                    className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"
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
                    <Code2 className="h-4 w-4 text-cyber-cyan animate-pulse" />
                    Full-Stack Developer & 3D Artist
                    <Sparkles className="h-4 w-4 text-cyber-magenta animate-pulse" />
                  </span>
                  <motion.div
                    className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-cyber-magenta to-transparent"
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

                {/* Energy Rings Around Name */}
                <div className="relative">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border-2 opacity-20"
                      style={{
                        borderColor: i === 0 ? '#00f5ff' : i === 1 ? '#ff00ff' : '#9d00ff',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={{
                        scale: [1, 1.5 + i * 0.5, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.7,
                        ease: 'easeOut',
                      }}
                    />
                  ))}

                  {/* Name with enhanced glitch */}
                  <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-none relative z-10">
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
                </div>

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

              {/* Enhanced Tech Stack Pills with Magnetic Effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-2 md:gap-3 max-w-4xl mx-auto px-4"
              >
                {techStack.map((tech, i) => (
                  <motion.div
                    key={tech.text}
                    initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{
                      delay: 0.8 + i * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      scale: 1.15,
                      y: -8,
                      rotateZ: Math.random() * 10 - 5,
                    }}
                    className="relative px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-black/70 backdrop-blur-md font-mono text-xs md:text-sm font-bold transition-all cursor-default group overflow-hidden"
                    style={{
                      border: `2px solid ${tech.color}40`,
                      boxShadow: `0 0 25px ${tech.color}30, inset 0 0 15px ${tech.color}10`,
                    }}
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(135deg, ${tech.color}20, transparent)`,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${tech.color}40, transparent)`,
                      }}
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />

                    <span className="relative z-10" style={{ color: tech.color, textShadow: `0 0 10px ${tech.color}` }}>
                      {tech.text}
                    </span>

                    {/* Enhanced Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-xl pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${tech.color}60, transparent)`,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Particle burst on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${tech.color}30 0%, transparent 60%)`,
                      }}
                      animate={{
                        scale: [1, 1.5],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced CTA Buttons with 3D Effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-4 md:pt-6 px-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    variant="holographic"
                    size="lg"
                    asChild
                    enableSound
                    glowIntensity="high"
                    className="group text-sm md:text-base px-6 md:px-8 py-4 md:py-6 relative overflow-hidden"
                    onClick={() => playClick()}
                  >
                    <Link href="/projects">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      />
                      <span className="flex items-center gap-2 md:gap-3 relative z-10">
                        <Zap className="h-4 w-4 md:h-5 md:w-5 group-hover:animate-pulse" />
                        Explore Projects
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                        </motion.div>
                      </span>
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    variant="plasma"
                    size="lg"
                    asChild
                    enableSound
                    glowIntensity="high"
                    className="group text-sm md:text-base px-6 md:px-8 py-4 md:py-6"
                  >
                    <Link href="/contact">
                      <span className="flex items-center gap-2 md:gap-3">
                        <Mail className="h-4 w-4 md:h-5 md:w-5 group-hover:animate-bounce" />
                        Get in Touch
                      </span>
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    variant="neon"
                    size="lg"
                    asChild
                    enableSound
                    className="group text-sm md:text-base px-6 md:px-8 py-4 md:py-6"
                  >
                    <a href="/api/resume" download>
                      <span className="flex items-center gap-2 md:gap-3">
                        <Award className="h-4 w-4 md:h-5 md:w-5 group-hover:rotate-12 transition-transform" />
                        Resume
                      </span>
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Enhanced Social links with Orbital Animation */}
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
                    className="group relative flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl border-2 bg-black/70 backdrop-blur-md transition-all duration-300"
                    initial={{ opacity: 0, scale: 0, rotateY: -180 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ delay: 1.2 + index * 0.15, type: 'spring', stiffness: 200 }}
                    whileHover={{
                      scale: 1.3,
                      y: -10,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      borderColor: `${social.color}80`,
                      boxShadow: `0 0 20px ${social.color}30`,
                    }}
                  >
                    {/* Rotating ring */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-50"
                      style={{
                        borderColor: social.color,
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />

                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <social.icon
                        className="h-6 w-6 md:h-7 md:w-7 text-muted-foreground group-hover:text-white transition-colors relative z-10"
                        style={{
                          filter: 'drop-shadow(0 0 8px currentColor)'
                        }}
                      />
                    </motion.div>

                    {/* Enhanced Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${social.color}80, transparent)`,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Orbital particles */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      {[0, 120, 240].map((angle) => (
                        <div
                          key={angle}
                          className="absolute w-1 h-1 rounded-full"
                          style={{
                            backgroundColor: social.color,
                            boxShadow: `0 0 8px ${social.color}`,
                            left: '50%',
                            top: '50%',
                            transform: `rotate(${angle}deg) translateX(25px)`,
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom scroll indicator with Glow */}
      <motion.div
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="group relative flex flex-col items-center gap-3 md:gap-4 cursor-pointer">
          <motion.span
            className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-cyber-cyan transition-colors relative"
            animate={{
              textShadow: [
                '0 0 10px rgba(0,245,255,0)',
                '0 0 20px rgba(0,245,255,0.5)',
                '0 0 10px rgba(0,245,255,0)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            Scroll to Explore
            {/* Underline animation */}
            <motion.div
              className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"
              animate={{
                width: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.span>

          <div className="relative">
            {/* Pulsing outer rings */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-cyber-cyan/30"
                animate={{
                  scale: [1, 1.5 + i * 0.3],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Main scroll mouse */}
            <motion.div
              className="relative flex h-12 w-7 items-start justify-center rounded-full border-2 border-cyber-cyan/60 group-hover:border-cyber-cyan p-1.5 transition-all shadow-lg shadow-cyber-cyan/30 bg-black/50 backdrop-blur-sm"
              animate={{
                y: [0, 8, 0],
                boxShadow: [
                  '0 0 20px rgba(0,245,255,0.3)',
                  '0 0 30px rgba(0,245,255,0.5)',
                  '0 0 20px rgba(0,245,255,0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{
                scale: 1.1,
              }}
            >
              <motion.div
                className="h-2.5 w-2.5 rounded-full bg-cyber-cyan shadow-lg shadow-cyber-cyan/70"
                animate={{
                  y: [0, 18, 0],
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </div>

          {/* Down arrow below */}
          <motion.div
            className="flex flex-col gap-1"
            animate={{
              y: [0, 5, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-cyber-cyan/60 mx-auto" />
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-cyber-cyan/40 mx-auto" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
