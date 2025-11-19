"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { audioSystem } from "@/lib/audio-system";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg hover:shadow-destructive/30",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-lg",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        neon: "border-2 border-cyber-cyan bg-background text-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-xl hover:shadow-cyber-cyan/30 hover:border-cyber-cyan/80 group",
        holographic: "relative border-2 border-cyber-magenta bg-gradient-to-br from-cyber-cyan/20 via-cyber-magenta/20 to-cyber-purple/20 text-white hover:shadow-2xl hover:shadow-cyber-magenta/50 hover:border-cyber-magenta/100 group backdrop-blur-xl",
        plasma: "relative border-2 border-cyber-purple bg-gradient-to-r from-cyber-purple/30 via-cyber-magenta/30 to-cyber-cyan/30 text-white hover:shadow-2xl hover:shadow-cyber-purple/50 hover:border-cyber-purple/100 group backdrop-blur-xl",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  showRipple?: boolean;
  enableSound?: boolean;
  glowIntensity?: 'low' | 'medium' | 'high';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, showRipple = true, enableSound = false, glowIntensity = 'medium', onClick, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);
    const [isHovered, setIsHovered] = React.useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (showRipple && !props.disabled) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();

        setRipples((prev) => [...prev, { x, y, id }]);

        // Remove ripple after animation
        setTimeout(() => {
          setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
        }, 600);
      }

      // Play click sound
      if (enableSound) {
        audioSystem.play('click');
      }

      onClick?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(true);
      if (enableSound) {
        audioSystem.play('hover');
      }
      props.onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(false);
      props.onMouseLeave?.(e);
    };

    const isSpecialVariant = variant === 'holographic' || variant === 'plasma' || variant === 'neon';

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Holographic shimmer effect */}
        {isSpecialVariant && (
          <>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: isHovered ? '200%' : '-100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 opacity-50"
              style={{
                background: 'linear-gradient(135deg, rgba(0,245,255,0.3), rgba(255,0,255,0.3), rgba(157,0,255,0.3))',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Pulsing glow layers */}
            {glowIntensity !== 'low' && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-md blur-lg"
                  style={{
                    background: variant === 'holographic'
                      ? 'radial-gradient(circle, rgba(255,0,255,0.4), transparent)'
                      : variant === 'plasma'
                      ? 'radial-gradient(circle, rgba(157,0,255,0.4), transparent)'
                      : 'radial-gradient(circle, rgba(0,245,255,0.4), transparent)',
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                {glowIntensity === 'high' && (
                  <motion.div
                    className="absolute inset-0 rounded-md blur-2xl"
                    style={{
                      background: 'radial-gradient(circle, rgba(0,245,255,0.3), rgba(255,0,255,0.2), transparent)',
                    }}
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                      scale: [0.9, 1.1, 0.9],
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

            {/* Scanline effect */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.1) 2px, rgba(0,245,255,0.1) 4px)',
              }}
              animate={{
                y: [0, 8],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-60" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current opacity-60" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current opacity-60" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-60" />
          </>
        )}

        {/* Ripple effects */}
        {showRipple &&
          ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="animate-ripple pointer-events-none absolute rounded-full bg-white/30"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 0,
                height: 0,
              }}
            />
          ))}

        {/* Button content */}
        <span className="relative z-10">{props.children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
