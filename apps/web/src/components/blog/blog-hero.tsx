"use client";

import { motion } from "framer-motion";
import { BookOpen, Tag, TrendingUp, Sparkles, Zap } from "lucide-react";
import { GlitchText } from "@/components/effects/glitch-text";

interface BlogHeroProps {
  postsCount: number;
  tagsCount: number;
}

export function BlogHero({ postsCount, tagsCount }: BlogHeroProps) {
  const stats = [
    {
      icon: BookOpen,
      label: "Articles",
      value: postsCount,
      color: "#00f5ff",
    },
    {
      icon: Tag,
      label: "Topics",
      value: tagsCount,
      color: "#ff00ff",
    },
    {
      icon: TrendingUp,
      label: "Readers",
      value: "10K+",
      color: "#b300ff",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black border-b border-cyber-cyan/20">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan rounded-full blur-3xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-magenta rounded-full blur-3xl opacity-10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-cyan/10 border-2 border-cyber-cyan/30 backdrop-blur-xl shadow-lg shadow-cyber-cyan/20">
              <Zap className="h-4 w-4 text-cyber-cyan" />
              <span className="text-sm font-bold text-cyber-cyan tracking-wider">KNOWLEDGE BASE</span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-4">
              <GlitchText
                text="BLOG"
                intensity="medium"
                color="cyan"
                className="inline-block"
              />
              <span className="text-white"> & </span>
              <GlitchText
                text="INSIGHTS"
                intensity="medium"
                color="magenta"
                className="inline-block"
              />
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-lg sm:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-mono"
          >
            [ Technical deep-dives • System architecture • Performance optimization • Web3 & AI ]
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="relative group"
                >
                  <div
                    className="relative p-6 rounded-xl bg-black/60 backdrop-blur-xl border-2 transition-all duration-300"
                    style={{
                      borderColor: `${stat.color}30`,
                      boxShadow: `0 0 20px ${stat.color}15`,
                    }}
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <motion.div
                        className="p-3 rounded-lg"
                        style={{
                          background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                      </motion.div>
                    </div>

                    {/* Value */}
                    <div className="text-center">
                      <div className="text-4xl font-black mb-2" style={{ color: stat.color }}>
                        {stat.value}
                      </div>
                      <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none blur-xl"
                      style={{
                        background: `radial-gradient(circle at center, ${stat.color}30, transparent)`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />
    </section>
  );
}
