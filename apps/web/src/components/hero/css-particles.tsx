"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Pure CSS particle system - no Three.js, maximum performance
 */
export function CSSParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate 50 particles (lightweight)
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    color: ['#00f5ff', '#ff00ff', '#9d00ff'][Math.floor(Math.random() * 3)],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Animated grid background
 */
export function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Static grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,245,255,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,245,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Animated scanning lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,245,255,0.2) 50%, transparent 100%)',
          height: '200px',
        }}
        animate={{
          y: ['-200px', '100vh'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Horizontal sweep */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,0,255,0.2) 50%, transparent 100%)',
          width: '200px',
        }}
        animate={{
          x: ['-200px', '100vw'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

/**
 * Geometric shapes floating
 */
export function FloatingShapes() {
  const shapes = [
    { type: 'circle', size: 100, x: 10, y: 20, duration: 15, color: '#00f5ff' },
    { type: 'square', size: 80, x: 85, y: 30, duration: 20, color: '#ff00ff' },
    { type: 'triangle', size: 90, x: 50, y: 60, duration: 18, color: '#9d00ff' },
    { type: 'circle', size: 60, x: 70, y: 80, duration: 12, color: '#00f5ff' },
    { type: 'square', size: 70, x: 30, y: 70, duration: 16, color: '#ff00ff' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, -50, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 2,
          }}
        >
          {shape.type === 'circle' && (
            <div
              className="w-full h-full rounded-full border-2 opacity-20"
              style={{
                borderColor: shape.color,
                boxShadow: `0 0 40px ${shape.color}`,
              }}
            />
          )}
          {shape.type === 'square' && (
            <div
              className="w-full h-full border-2 opacity-20"
              style={{
                borderColor: shape.color,
                boxShadow: `0 0 40px ${shape.color}`,
                transform: 'rotate(45deg)',
              }}
            />
          )}
          {shape.type === 'triangle' && (
            <div
              className="w-0 h-0 opacity-20"
              style={{
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid ${shape.color}`,
                filter: `drop-shadow(0 0 40px ${shape.color})`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Hexagon pattern overlay
 */
export function HexagonPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-5">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
            <polygon
              points="50,0 100,25 100,75 50,100 0,75 0,25"
              fill="none"
              stroke="#00f5ff"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
}

/**
 * Animated circles with glow - Enhanced
 */
export function GlowingCircles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large cyan circle */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,255,0.4) 0%, rgba(0,245,255,0.2) 40%, transparent 70%)',
          left: '5%',
          top: '15%',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.7, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Medium magenta circle */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,0,255,0.4) 0%, rgba(255,0,255,0.2) 40%, transparent 70%)',
          right: '10%',
          top: '25%',
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Purple circle */}
      <motion.div
        className="absolute w-80 h-80 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(157,0,255,0.4) 0%, rgba(157,0,255,0.2) 40%, transparent 70%)',
          left: '45%',
          bottom: '15%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.8, 0.3],
          x: [0, 30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Additional accent circles */}
      <motion.div
        className="absolute w-64 h-64 rounded-full blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,255,0.3) 0%, transparent 70%)',
          right: '25%',
          bottom: '30%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />

      <motion.div
        className="absolute w-72 h-72 rounded-full blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,0,255,0.3) 0%, transparent 70%)',
          left: '30%',
          top: '50%',
        }}
        animate={{
          scale: [1, 1.35, 1],
          opacity: [0.2, 0.55, 0.2],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />
    </div>
  );
}

/**
 * Data stream visualization
 */
export function DataStream() {
  const streams = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${(i * 12) + 5}%`,
    delay: i * 0.5,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute w-px bg-gradient-to-b from-transparent via-cyber-cyan to-transparent"
          style={{
            left: stream.left,
            height: '200px',
          }}
          animate={{
            y: ['-200px', '100vh'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: stream.duration,
            repeat: Infinity,
            delay: stream.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
