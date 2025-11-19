"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { audioSystem } from "@/lib/audio-system";

interface CyberpunkCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'holographic' | 'neon' | 'glass';
  intensity?: 'low' | 'medium' | 'high';
  enable3D?: boolean;
  enableSound?: boolean;
  glowColor?: 'cyan' | 'magenta' | 'purple' | 'multi';
}

/**
 * Advanced Cyberpunk Card with 3D transforms, holographic effects, and audio
 */
export const CyberpunkCard = React.forwardRef<HTMLDivElement, CyberpunkCardProps>(
  ({
    className,
    children,
    variant = 'default',
    intensity = 'medium',
    enable3D = true,
    enableSound = false,
    glowColor = 'cyan',
    ...props
  }, ref) => {
    const cardRef = React.useRef<HTMLDivElement>(null);

    // Mouse position tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for rotation
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
      stiffness: 150,
      damping: 20,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
      stiffness: 150,
      damping: 20,
    });

    // Glow position tracking
    const glowX = useSpring(0, { stiffness: 150, damping: 20 });
    const glowY = useSpring(0, { stiffness: 150, damping: 20 });

    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enable3D || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalize mouse position (-0.5 to 0.5)
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      mouseX.set(x);
      mouseY.set(y);

      // Update glow position (0 to 100%)
      const glowXPercent = ((e.clientX - rect.left) / rect.width) * 100;
      const glowYPercent = ((e.clientY - rect.top) / rect.height) * 100;

      glowX.set(glowXPercent);
      glowY.set(glowYPercent);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      if (enableSound) {
        audioSystem.play('hover');
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      mouseX.set(0);
      mouseY.set(0);
    };

    const variantClasses = {
      default: "border-border bg-card",
      holographic: "border-2 border-cyber-magenta/50 bg-gradient-to-br from-cyber-cyan/10 via-cyber-magenta/10 to-cyber-purple/10 backdrop-blur-xl",
      neon: "border-2 border-cyber-cyan/60 bg-black/80 backdrop-blur-md",
      glass: "border border-white/10 bg-white/5 backdrop-blur-2xl",
    };

    const getGlowColors = () => {
      switch (glowColor) {
        case 'cyan':
          return { primary: 'rgba(0,245,255,0.4)', secondary: 'rgba(0,245,255,0.2)' };
        case 'magenta':
          return { primary: 'rgba(255,0,255,0.4)', secondary: 'rgba(255,0,255,0.2)' };
        case 'purple':
          return { primary: 'rgba(157,0,255,0.4)', secondary: 'rgba(157,0,255,0.2)' };
        case 'multi':
        default:
          return { primary: 'rgba(0,245,255,0.4)', secondary: 'rgba(255,0,255,0.2)' };
      }
    };

    const glowColors = getGlowColors();

    return (
      <motion.div
        ref={cardRef}
        className={cn(
          "relative rounded-xl shadow-lg transition-all duration-300 overflow-hidden",
          variantClasses[variant],
          enable3D && "transform-gpu",
          className
        )}
        style={{
          rotateX: enable3D ? rotateX : 0,
          rotateY: enable3D ? rotateY : 0,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={enable3D ? { scale: 1.02, z: 50 } : { scale: 1.02 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {/* Dynamic spotlight glow following mouse */}
        {(variant === 'holographic' || variant === 'neon') && (
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${glowX}% ${glowY}%, ${glowColors.primary}, ${glowColors.secondary}, transparent 40%)`,
              opacity: isHovered ? 0.8 : 0,
            }}
          />
        )}

        {/* Animated gradient background */}
        {variant === 'holographic' && (
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(255,0,255,0.2), rgba(157,0,255,0.2))',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}

        {/* Scanline effect */}
        {intensity !== 'low' && (variant === 'holographic' || variant === 'neon') && (
          <motion.div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.05) 2px, rgba(0,245,255,0.05) 4px)',
            }}
            animate={{
              y: [0, 16],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}

        {/* Cyberpunk grid overlay */}
        {intensity === 'high' && variant === 'neon' && (
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />
        )}

        {/* Corner brackets */}
        {(variant === 'holographic' || variant === 'neon') && (
          <>
            <motion.div
              className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-current opacity-50"
              animate={{
                opacity: isHovered ? [0.5, 1, 0.5] : 0.5,
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-current opacity-50"
              animate={{
                opacity: isHovered ? [0.5, 1, 0.5] : 0.5,
              }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.25 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-current opacity-50"
              animate={{
                opacity: isHovered ? [0.5, 1, 0.5] : 0.5,
              }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-current opacity-50"
              animate={{
                opacity: isHovered ? [0.5, 1, 0.5] : 0.5,
              }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.75 }}
            />
          </>
        )}

        {/* Holographic shimmer effect */}
        {variant === 'holographic' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '200%' : '-100%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        )}

        {/* Outer glow on hover */}
        {isHovered && intensity !== 'low' && (
          <>
            <motion.div
              className="absolute -inset-1 rounded-xl blur-lg opacity-50"
              style={{
                background: glowColor === 'multi'
                  ? 'linear-gradient(135deg, rgba(0,245,255,0.5), rgba(255,0,255,0.5), rgba(157,0,255,0.5))'
                  : `radial-gradient(circle, ${glowColors.primary}, transparent)`,
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {intensity === 'high' && (
              <motion.div
                className="absolute -inset-2 rounded-xl blur-2xl opacity-30"
                style={{
                  background: `radial-gradient(circle, ${glowColors.primary}, transparent)`,
                }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
          </>
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

CyberpunkCard.displayName = "CyberpunkCard";

// Re-export standard card components for compatibility
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./card";
