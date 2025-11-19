"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { CheckCircle2, Sparkles, Zap } from "lucide-react";

interface PremiumTechCardProps {
  name: string;
  icon: string;
  proficiency: number;
  yearsExp: string;
  index: number;
}

export function PremiumTechCard({ name, icon, proficiency, yearsExp, index }: PremiumTechCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const getProficiencyColor = () => {
    if (proficiency >= 90) return { from: "#00f5ff", to: "#0099ff", shadow: "rgba(0,245,255,0.8)" };
    if (proficiency >= 80) return { from: "#00ff88", to: "#00cc66", shadow: "rgba(0,255,136,0.8)" };
    return { from: "#ff00ff", to: "#cc00cc", shadow: "rgba(255,0,255,0.8)" };
  };

  const colors = getProficiencyColor();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: index * 0.03,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05, z: 50 }}
      className="group relative cursor-pointer"
    >
      {/* Outer glow */}
      <motion.div
        className="absolute -inset-2 rounded-2xl opacity-0 blur-xl"
        style={{
          background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
        }}
        animate={{
          opacity: isHovered ? 0.6 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Card container */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl border-2 border-white/10 overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(135deg, ${colors.from}20, ${colors.to}20, transparent)`,
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : ["0% 0%"],
          }}
          transition={{
            duration: 3,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
        />

        {/* Holographic shimmer */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.3) 48%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.3) 52%, transparent 75%)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: isHovered ? ["200% 0", "-200% 0"] : ["200% 0"],
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
        />

        {/* Scanlines */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)',
          }}
        />

        {/* Corner accents */}
        <motion.div
          className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 opacity-50"
          style={{ borderColor: colors.from }}
          animate={{
            opacity: isHovered ? [0.5, 1, 0.5] : 0.5,
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 opacity-50"
          style={{ borderColor: colors.to }}
          animate={{
            opacity: isHovered ? [0.5, 1, 0.5] : 0.5,
          }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.25 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 opacity-50"
          style={{ borderColor: colors.to }}
          animate={{
            opacity: isHovered ? [0.5, 1, 0.5] : 0.5,
          }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 opacity-50"
          style={{ borderColor: colors.from }}
          animate={{
            opacity: isHovered ? [0.5, 1, 0.5] : 0.5,
          }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.75 }}
        />

        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Logo section */}
          <div className="relative mb-4">
            <motion.div
              className="relative w-full aspect-square flex items-center justify-center bg-black/50 rounded-xl p-6 border-2 border-white/10 overflow-hidden"
              animate={{
                borderColor: isHovered ? [colors.from, colors.to, colors.from] : "rgba(255,255,255,0.1)",
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Logo glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at center, ${colors.from}40, transparent 70%)`,
                }}
                animate={{
                  scale: isHovered ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Logo */}
              <motion.img
                src={`https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${icon}.svg`}
                alt={name}
                className="relative z-10 w-full h-full object-contain"
                style={{
                  filter: `brightness(0) invert(1) drop-shadow(0 0 ${isHovered ? 20 : 10}px ${colors.shadow})`,
                }}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? [0, 5, -5, 0] : 0,
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Floating particles */}
              {isHovered && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{ backgroundColor: colors.from }}
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                      }}
                      animate={{
                        x: [0, (Math.random() - 0.5) * 80],
                        y: [0, (Math.random() - 0.5) * 80],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>

            {/* Proficiency badge */}
            <motion.div
              className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full font-bold text-xs border-2 backdrop-blur-xl"
              style={{
                backgroundColor: `${colors.from}20`,
                borderColor: colors.from,
                color: colors.from,
                boxShadow: `0 0 20px ${colors.shadow}`,
              }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.03 + 0.2, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {proficiency}%
            </motion.div>

            {/* Sparkle effect on hover */}
            {isHovered && (
              <motion.div
                className="absolute -top-2 -left-2"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
              >
                <Sparkles className="h-4 w-4" style={{ color: colors.from }} />
              </motion.div>
            )}
          </div>

          {/* Tech name */}
          <motion.h3
            className="text-base font-black text-center mb-2"
            style={{
              textShadow: isHovered ? `0 0 10px ${colors.shadow}` : 'none',
              color: isHovered ? colors.from : 'white',
            }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.h3>

          {/* Experience */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle2 className="h-3 w-3" style={{ color: colors.from }} />
            <span className="text-xs text-gray-400 font-semibold">
              {yearsExp} years
            </span>
          </div>

          {/* Animated progress bar */}
          <div className="relative h-2 bg-black/50 rounded-full overflow-hidden border border-white/10">
            <motion.div
              className="h-full rounded-full relative"
              style={{
                background: `linear-gradient(90deg, ${colors.from}, ${colors.to})`,
                boxShadow: `0 0 15px ${colors.shadow}`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${proficiency}%` }}
              transition={{
                delay: index * 0.03 + 0.4,
                duration: 1,
                ease: "easeOut",
              }}
            >
              {/* Sliding highlight */}
              <motion.div
                className="absolute inset-0 bg-white/30"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                }}
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1,
                }}
              />
            </motion.div>

            {/* Pulse effect */}
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{ backgroundColor: colors.from }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Level indicator */}
          <motion.div
            className="mt-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center gap-1">
              <Zap className="h-3 w-3" style={{ color: colors.from }} />
              <span className="text-xs font-bold" style={{ color: colors.from }}>
                {proficiency >= 90 ? "Expert" : proficiency >= 80 ? "Advanced" : "Intermediate"}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom glow line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.from}, ${colors.to}, transparent)`,
            boxShadow: `0 0 20px ${colors.shadow}`,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}
