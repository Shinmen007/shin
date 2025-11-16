"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Code2, Zap, Users, Star, TrendingUp, Award, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: "cyan" | "magenta" | "purple" | "success";
  description: string;
}

const stats: StatItem[] = [
  {
    icon: Code2,
    value: 50,
    suffix: "+",
    label: "Projects Delivered",
    color: "cyan",
    description: "Successfully completed and deployed"
  },
  {
    icon: Zap,
    value: 99,
    suffix: "%",
    label: "Performance Score",
    color: "magenta",
    description: "Average Lighthouse performance"
  },
  {
    icon: Users,
    value: 100,
    suffix: "K+",
    label: "Users Reached",
    color: "purple",
    description: "Across all platforms"
  },
  {
    icon: Award,
    value: 5,
    suffix: "+",
    label: "Years Experience",
    color: "success",
    description: "Building production software"
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setCount(Math.floor(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <div ref={ref} className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight">
      <span className="bg-gradient-to-br from-cyber-cyan via-cyber-magenta to-cyber-purple bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
        {count}
        {suffix}
      </span>
    </div>
  );
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const Icon = stat.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const colorMap = {
    cyan: {
      icon: "text-cyber-cyan",
      iconBg: "bg-cyber-cyan/10",
      iconHoverBg: "group-hover:bg-cyber-cyan/20",
      border: "border-cyber-cyan/40",
      hoverBorder: "group-hover:border-cyber-cyan/70",
      shadow: "group-hover:shadow-cyber-cyan/30",
      glow: "bg-cyber-cyan/5",
      hoverGlow: "group-hover:bg-cyber-cyan/15",
      pulse: "bg-cyber-cyan/30",
      gradient: "from-cyber-cyan/10 via-cyber-cyan/5 to-transparent",
    },
    magenta: {
      icon: "text-cyber-magenta",
      iconBg: "bg-cyber-magenta/10",
      iconHoverBg: "group-hover:bg-cyber-magenta/20",
      border: "border-cyber-magenta/40",
      hoverBorder: "group-hover:border-cyber-magenta/70",
      shadow: "group-hover:shadow-cyber-magenta/30",
      glow: "bg-cyber-magenta/5",
      hoverGlow: "group-hover:bg-cyber-magenta/15",
      pulse: "bg-cyber-magenta/30",
      gradient: "from-cyber-magenta/10 via-cyber-magenta/5 to-transparent",
    },
    purple: {
      icon: "text-cyber-purple",
      iconBg: "bg-cyber-purple/10",
      iconHoverBg: "group-hover:bg-cyber-purple/20",
      border: "border-cyber-purple/40",
      hoverBorder: "group-hover:border-cyber-purple/70",
      shadow: "group-hover:shadow-cyber-purple/30",
      glow: "bg-cyber-purple/5",
      hoverGlow: "group-hover:bg-cyber-purple/15",
      pulse: "bg-cyber-purple/30",
      gradient: "from-cyber-purple/10 via-cyber-purple/5 to-transparent",
    },
    success: {
      icon: "text-cyber-success",
      iconBg: "bg-cyber-success/10",
      iconHoverBg: "group-hover:bg-cyber-success/20",
      border: "border-cyber-success/40",
      hoverBorder: "group-hover:border-cyber-success/70",
      shadow: "group-hover:shadow-cyber-success/30",
      glow: "bg-cyber-success/5",
      hoverGlow: "group-hover:bg-cyber-success/15",
      pulse: "bg-cyber-success/30",
      gradient: "from-cyber-success/10 via-cyber-success/5 to-transparent",
    },
  };

  const colors = colorMap[stat.color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      {/* Main Card */}
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-3xl border-2 backdrop-blur-xl transition-all duration-700",
          "bg-gradient-to-br from-background/95 via-background/90 to-background/85",
          colors.border,
          colors.hoverBorder,
          "shadow-2xl",
          colors.shadow
        )}
        whileHover={{ scale: 1.05, y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700",
            "bg-gradient-to-br",
            colors.gradient
          )}
        />

        {/* Rotating glow orb */}
        <motion.div
          className={cn(
            "absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl transition-all duration-700",
            colors.glow,
            colors.hoverGlow
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Mesh pattern */}
        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: "linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.08) 50%, transparent 70%)",
          }}
          animate={{
            x: ["-200%", "200%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "linear",
          }}
        />

        {/* Content */}
        <div className="relative p-8 sm:p-10 space-y-6">
          {/* Icon with pulsing ring */}
          <div className="relative inline-flex">
            <motion.div
              className={cn(
                "relative z-10 rounded-2xl p-4 transition-all duration-500",
                colors.iconBg,
                colors.iconHoverBg,
                "shadow-lg"
              )}
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Icon className={cn("h-8 w-8", colors.icon)} strokeWidth={2.5} />
            </motion.div>

            {/* Pulsing rings */}
            <motion.div
              className={cn(
                "absolute inset-0 rounded-2xl",
                colors.pulse
              )}
              animate={{
                scale: [1, 1.4, 1.4],
                opacity: [0.5, 0, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.div
              className={cn(
                "absolute inset-0 rounded-2xl",
                colors.pulse
              )}
              animate={{
                scale: [1, 1.4, 1.4],
                opacity: [0.5, 0, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1,
              }}
            />

            {/* Sparkle effect on hover */}
            <motion.div
              className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className={cn("h-4 w-4", colors.icon)} />
            </motion.div>
          </div>

          {/* Counter */}
          <div className="space-y-3">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />

            {/* Label */}
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-foreground transition-colors">
                {stat.label}
              </h3>
              <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/90 transition-colors leading-relaxed">
                {stat.description}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom accent line */}
        <motion.div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r",
            colors.gradient,
            "opacity-0 group-hover:opacity-100"
          )}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Floating glow behind card */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 -z-10",
          colors.glow
        )}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden border-b border-border/40">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyber-cyan/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyber-magenta/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-purple/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Stats grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
