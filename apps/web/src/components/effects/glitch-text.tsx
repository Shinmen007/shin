"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  color?: 'cyan' | 'magenta' | 'purple' | 'multi';
}

/**
 * Cyberpunk glitch text effect with RGB split and distortion
 */
export function GlitchText({ text, className, intensity = 'medium', color = 'cyan' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = intensity === 'high' ? 2000 : intensity === 'medium' ? 4000 : 6000;

    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, glitchInterval);

    return () => clearInterval(interval);
  }, [intensity]);

  const colorClasses = {
    cyan: 'text-cyber-cyan',
    magenta: 'text-cyber-magenta',
    purple: 'text-cyber-purple',
    multi: 'gradient-text',
  };

  return (
    <div className={cn("relative inline-block", className)}>
      {/* Main text */}
      <motion.span
        className={cn("relative z-10", colorClasses[color])}
        animate={isGlitching ? {
          x: [0, -2, 2, -1, 1, 0],
          y: [0, 1, -1, 2, -2, 0],
        } : {}}
        transition={{ duration: 0.2 }}
        style={{
          textShadow: isGlitching
            ? '0 0 10px currentColor, 0 0 20px currentColor, 2px 2px 0 #ff00ff, -2px -2px 0 #00ffff'
            : '0 0 10px currentColor',
        }}
      >
        {text}
      </motion.span>

      {/* RGB split layers */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-cyber-cyan opacity-70 pointer-events-none"
            initial={{ x: 0 }}
            animate={{ x: -3, y: 1 }}
            transition={{ duration: 0.1 }}
            aria-hidden="true"
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-cyber-magenta opacity-70 pointer-events-none"
            initial={{ x: 0 }}
            animate={{ x: 3, y: -1 }}
            transition={{ duration: 0.1 }}
            aria-hidden="true"
          >
            {text}
          </motion.span>
        </>
      )}

      {/* Scanline overlay */}
      {isGlitching && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.1) 2px, rgba(0,245,255,0.1) 4px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  );
}

/**
 * Matrix-style falling text effect
 */
export function MatrixText({ className }: { className?: string }) {
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    const columnCount = Math.floor(window.innerWidth / 20);
    const newColumns = Array(columnCount).fill(0).map(() =>
      chars[Math.floor(Math.random() * chars.length)]
    );
    setColumns(newColumns);

    const interval = setInterval(() => {
      setColumns(prev => prev.map(() =>
        Math.random() > 0.95 ? chars[Math.floor(Math.random() * chars.length)] : prev[Math.floor(Math.random() * prev.length)]
      ));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("fixed inset-0 overflow-hidden pointer-events-none opacity-10 z-0", className)}>
      <div className="flex gap-1 text-cyber-cyan font-mono text-xs">
        {columns.map((char, i) => (
          <motion.div
            key={i}
            className="flex flex-col"
            animate={{
              y: ['0%', '100%'],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          >
            {char}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * Terminal typing effect
 */
export function TerminalText({ lines, className }: { lines: string[]; className?: string }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= lines.length) return;

    const line = lines[currentLineIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex < line.length) {
        setCurrentText(line.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentText('');
        }, 1000);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex, lines]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className={cn("font-mono text-cyber-cyan", className)}>
      {lines.slice(0, currentLineIndex).map((line, i) => (
        <div key={i} className="mb-2">
          <span className="text-cyber-magenta">{'>'}</span> {line}
        </div>
      ))}
      {currentLineIndex < lines.length && (
        <div className="mb-2">
          <span className="text-cyber-magenta">{'>'}</span> {currentText}
          <span className={cn("inline-block w-2 h-4 bg-cyber-cyan ml-1", cursorVisible ? 'opacity-100' : 'opacity-0')} />
        </div>
      )}
    </div>
  );
}
