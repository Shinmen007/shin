"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Cpu, Zap, Terminal } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const navRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const navbarOpacity = useTransform(scrollY, [0, 100], [0.92, 1]);
  const navbarBlur = useTransform(scrollY, [0, 100], [20, 32]);
  const navbarScale = useTransform(scrollY, [0, 100], [0.985, 1]);

  // Scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const progress = (scrollTop / trackLength) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', calculateScrollProgress, { passive: true });
    calculateScrollProgress();
    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Throttle scroll events to max 16ms (60fps)
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
        mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
      }
    };

    const nav = navRef.current;
    if (nav) {
      nav.addEventListener("mousemove", handleMouseMove);
      return () => nav.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Main container with enhanced glassmorphism */}
      <motion.div
        className="container mx-auto px-3 sm:px-6"
        style={{
          opacity: navbarOpacity,
          scale: navbarScale,
        }}
      >
        <motion.nav
          ref={navRef}
          className={cn(
            "relative overflow-hidden rounded-xl border-2 backdrop-blur-3xl transition-all duration-700",
            "bg-gradient-to-br from-black/90 via-[#0a0a0a]/85 to-black/90",
            "shadow-2xl",
            scrolled
              ? "border-cyber-cyan/70 shadow-[0_0_60px_rgba(0,245,255,0.4),0_0_100px_rgba(255,0,255,0.3),inset_0_0_20px_rgba(0,245,255,0.1)]"
              : "border-cyber-cyan/40 shadow-[0_8px_40px_rgba(0,245,255,0.2),0_0_60px_rgba(157,0,255,0.15)]"
          )}
          style={{
            backdropFilter: mounted ? `blur(${navbarBlur}px) saturate(150%) contrast(120%)` : "blur(20px) saturate(150%) contrast(120%)",
            boxShadow: scrolled
              ? "0 0 60px rgba(0,245,255,0.4), 0 0 100px rgba(255,0,255,0.3), inset 0 0 20px rgba(0,245,255,0.1)"
              : "0 8px 40px rgba(0,245,255,0.2), 0 0 60px rgba(157,0,255,0.15)",
          }}
          whileHover={{
            borderColor: "rgba(0, 245, 255, 1)",
            boxShadow: "0 0 80px rgba(0,245,255,0.6), 0 0 120px rgba(255,0,255,0.4), inset 0 0 30px rgba(0,245,255,0.15)",
          }}
        >
          {/* Cyberpunk grid background */}
          <motion.div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Dynamic neon gradient that follows mouse */}
          <motion.div
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              background: mounted
                ? `radial-gradient(600px circle at ${mouseX}% ${mouseY}%, rgba(0,245,255,0.25), rgba(255,0,255,0.18), transparent 50%)`
                : "radial-gradient(600px circle at 50% 50%, rgba(0,245,255,0.25), rgba(255,0,255,0.18), transparent 50%)",
            }}
          />

          {/* Animated neon pulse overlay */}
          <motion.div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(0,245,255,0.15) 0%, rgba(255,0,255,0.12) 50%, rgba(157,0,255,0.15) 100%)",
              backgroundSize: "200% 200%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Cyberpunk scanline effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(0deg, transparent 0%, rgba(0,245,255,0.03) 50%, transparent 100%)",
              backgroundSize: "100% 4px",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "0% 100%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Electric shimmer effect */}
          <motion.div
            className="absolute inset-0 opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-500"
            style={{
              background: "linear-gradient(110deg, transparent 25%, rgba(0,245,255,0.3) 48%, rgba(255,0,255,0.4) 50%, rgba(0,245,255,0.3) 52%, transparent 75%)",
            }}
            animate={{
              x: ["-200%", "300%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
          />

          {/* Corner accent lights */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyber-cyan/20 to-transparent rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyber-magenta/20 to-transparent rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-cyber-purple/20 to-transparent rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-cyber-cyan/20 to-transparent rounded-br-xl" />

          <div className="relative flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
            {/* Cyberpunk Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Outer glow ring */}
                <motion.div
                  className="absolute -inset-6 rounded-full opacity-0 blur-2xl group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle, rgba(0,245,255,0.8), rgba(255,0,255,0.6), transparent)",
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  }}
                />

                {/* Logo design */}
                <div className="relative flex items-center gap-3">
                  {/* Cyberpunk Icon */}
                  <motion.div
                    className="relative flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(0,245,255,0.5)",
                        "0 0 30px rgba(255,0,255,0.8)",
                        "0 0 20px rgba(0,245,255,0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {/* Hexagon background */}
                    <div className="absolute inset-0 w-10 h-10 sm:w-12 sm:h-12">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <motion.path
                          d="M 50,5 L 90,30 L 90,70 L 50,95 L 10,70 L 10,30 Z"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="3"
                          animate={{
                            pathLength: [0, 1, 1, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00f5ff" />
                            <stop offset="50%" stopColor="#ff00ff" />
                            <stop offset="100%" stopColor="#9d00ff" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-cyber-cyan drop-shadow-[0_0_15px_rgba(0,245,255,1)] relative z-10" />
                    </motion.div>
                  </motion.div>

                  {/* Cyberpunk Text */}
                  <div className="flex flex-col -space-y-1">
                    <motion.span
                      className="text-xl sm:text-2xl font-black tracking-wider"
                      style={{
                        fontFamily: "monospace",
                        textShadow: "0 0 10px rgba(0,245,255,0.8), 0 0 20px rgba(255,0,255,0.5)",
                      }}
                    >
                      <span className="bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple bg-clip-text text-transparent">
                        CYBER
                      </span>
                    </motion.span>
                    <motion.span
                      className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-cyber-cyan/80"
                      style={{
                        fontFamily: "monospace",
                        textShadow: "0 0 5px rgba(0,245,255,0.6)",
                      }}
                    >
                      PUNK
                    </motion.span>
                  </div>

                  {/* Terminal Icon */}
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Terminal className="h-4 w-4 text-cyber-magenta drop-shadow-[0_0_10px_rgba(255,0,255,1)]" />
                  </motion.div>
                </div>

                {/* Glitch effect overlay */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    opacity: [0, 0.3, 0],
                    x: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)",
                  }}
                />
              </motion.div>
            </Link>

            {/* Redesigned Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-1.5">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1 + index * 0.06,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <Link href={item.href}>
                      <motion.div
                        className={cn(
                          "relative px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300",
                          "group cursor-pointer overflow-hidden"
                        )}
                        whileHover={{ scale: 1.06, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {/* Cyberpunk Active state */}
                        {isActive && (
                          <>
                            <motion.div
                              className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyber-cyan/40 via-cyber-magenta/30 to-cyber-purple/40 border-2 border-cyber-cyan"
                              layoutId="activeNav"
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 40,
                              }}
                              style={{
                                boxShadow: "0 0 30px rgba(0,245,255,0.6), inset 0 0 15px rgba(0,245,255,0.3)",
                              }}
                            />
                            <motion.div
                              className="absolute inset-0 rounded-lg blur-lg bg-gradient-to-br from-cyber-cyan/60 via-cyber-magenta/50 to-cyber-purple/60"
                              animate={{
                                opacity: [0.5, 1, 0.5],
                                scale: [0.95, 1.05, 0.95],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            {/* Digital glitch bars */}
                            <motion.div
                              className="absolute left-0 right-0 h-px bg-cyber-cyan top-1/4"
                              animate={{
                                opacity: [0, 1, 0],
                                scaleX: [0, 1, 0],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 2,
                              }}
                            />
                            <motion.div
                              className="absolute left-0 right-0 h-px bg-cyber-magenta bottom-1/4"
                              animate={{
                                opacity: [0, 1, 0],
                                scaleX: [0, 1, 0],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 2,
                                delay: 0.3,
                              }}
                            />
                          </>
                        )}

                        {/* Cyberpunk hover glow */}
                        <motion.div
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
                          style={{
                            background: "radial-gradient(circle at center, rgba(0,245,255,0.4), rgba(255,0,255,0.25), transparent 70%)",
                            boxShadow: "0 0 20px rgba(0,245,255,0.4)",
                          }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Neon border on hover */}
                        <motion.div
                          className="absolute inset-0 rounded-lg border-2 border-transparent opacity-0 group-hover:opacity-100 group-hover:border-cyber-cyan/60"
                          transition={{ duration: 0.3 }}
                          style={{
                            boxShadow: "0 0 15px rgba(0,245,255,0.5)",
                          }}
                        />

                        <span
                          className={cn(
                            "relative z-10 transition-all duration-300 flex items-center gap-2",
                            isActive
                              ? "text-white font-black tracking-wide drop-shadow-[0_0_12px_rgba(0,245,255,1)]"
                              : "text-gray-400 font-bold group-hover:text-white group-hover:tracking-wide group-hover:drop-shadow-[0_0_10px_rgba(0,245,255,0.6)]"
                          )}
                          style={{
                            fontFamily: isActive ? "monospace" : "inherit",
                            textShadow: isActive ? "0 0 15px rgba(0,245,255,0.8), 0 0 30px rgba(255,0,255,0.5)" : undefined,
                          }}
                        >
                          {item.name}
                          {isActive && (
                            <motion.span
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{
                                scale: 1,
                                rotate: 0,
                              }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                              <motion.div
                                animate={{
                                  rotate: [0, 15, -15, 0],
                                }}
                                transition={{
                                  duration: 0.5,
                                  repeat: Infinity,
                                  repeatDelay: 2,
                                }}
                              >
                                <Zap className="h-4 w-4 text-cyber-cyan drop-shadow-[0_0_10px_rgba(0,245,255,1)]" />
                              </motion.div>
                            </motion.span>
                          )}
                        </span>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Redesigned Mobile menu button */}
            <motion.div
              className="md:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className="relative group h-10 w-10"
              >
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyber-cyan/40 to-cyber-purple/40 opacity-0 group-hover:opacity-100 blur-lg"
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-xl border border-transparent group-hover:border-cyber-cyan/60 transition-colors duration-300"
                />
                <motion.div
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5 text-cyber-cyan" />
                  ) : (
                    <Menu className="h-5 w-5 group-hover:text-cyber-cyan transition-colors" />
                  )}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </motion.nav>
      </motion.div>

      {/* Redesigned Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden overflow-hidden"
      >
        <motion.div
          className="container mx-auto px-3 sm:px-6 mt-2"
          initial={false}
          animate={{
            y: mobileMenuOpen ? 0 : -20,
          }}
          transition={{ duration: 0.35 }}
        >
          <div className="relative rounded-xl border-2 border-cyber-cyan/70 bg-gradient-to-br from-black/95 via-[#0a0a0a]/90 to-black/95 backdrop-blur-3xl p-4 shadow-[0_0_50px_rgba(0,245,255,0.4),0_0_100px_rgba(255,0,255,0.3),inset_0_0_30px_rgba(0,245,255,0.1)] overflow-hidden" style={{ boxShadow: "0 0 50px rgba(0,245,255,0.4), 0 0 100px rgba(255,0,255,0.3), inset 0 0 30px rgba(0,245,255,0.1)" }}>
            {/* Cyberpunk grid background for mobile */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,245,255,0.6) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,245,255,0.6) 1px, transparent 1px)
                `,
                backgroundSize: '15px 15px',
              }}
            />

            {/* Neon pulse background */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                background: "radial-gradient(circle at 50% 0%, rgba(0,245,255,0.35), rgba(255,0,255,0.25), transparent 70%)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative space-y-1.5">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <motion.div
                        className={cn(
                          "relative block rounded-lg px-4 py-3 text-base font-black transition-all duration-300 overflow-hidden",
                          isActive
                            ? "bg-gradient-to-br from-cyber-cyan/40 via-cyber-magenta/30 to-cyber-purple/40 text-white border-2 border-cyber-cyan shadow-lg shadow-cyber-cyan/50"
                            : "text-gray-400 hover:bg-gradient-to-br hover:from-cyber-cyan/20 hover:to-cyber-purple/20 hover:text-white border-2 border-transparent hover:border-cyber-cyan/50"
                        )}
                        style={{
                          fontFamily: isActive ? "monospace" : "inherit",
                          textShadow: isActive ? "0 0 15px rgba(0,245,255,0.9), 0 0 30px rgba(255,0,255,0.6)" : undefined,
                          boxShadow: isActive ? "0 0 30px rgba(0,245,255,0.5), inset 0 0 15px rgba(0,245,255,0.2)" : undefined,
                        }}
                        whileHover={{ scale: 1.02, x: 6 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Active item glow */}
                        {isActive && (
                          <>
                            <motion.div
                              className="absolute inset-0 rounded-xl blur-xl bg-gradient-to-br from-cyber-cyan/60 via-cyber-magenta/50 to-cyber-purple/60"
                              animate={{
                                opacity: [0.4, 0.7, 0.4],
                                scale: [0.96, 1.04, 0.96],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            {/* Digital CPU icon effect */}
                            <motion.div
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                              animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <Cpu className="h-4 w-4 text-cyber-cyan drop-shadow-[0_0_10px_rgba(0,245,255,1)]" />
                            </motion.div>
                          </>
                        )}

                        <span className="relative z-10 flex items-center gap-2">
                          {isActive && (
                            <motion.span
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                              <Zap className="h-4 w-4 text-cyber-cyan" />
                            </motion.span>
                          )}
                          {item.name}
                        </span>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Cyberpunk decorative footer */}
            <motion.div
              className="mt-3 pt-3 border-t-2 border-cyber-cyan/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: mobileMenuOpen ? 1 : 0 }}
              transition={{ delay: 0.25 }}
              style={{
                boxShadow: "0 -1px 10px rgba(0,245,255,0.3)",
              }}
            >
              <div className="flex items-center justify-center gap-2 text-xs">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Cpu className="h-3 w-3 text-cyber-cyan drop-shadow-[0_0_6px_rgba(0,245,255,1)]" />
                </motion.div>
                <span
                  className="bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple bg-clip-text text-transparent font-black tracking-wider"
                  style={{
                    fontFamily: "monospace",
                    textShadow: "0 0 10px rgba(0,245,255,0.5)",
                  }}
                >
                  CYBERPUNK.2077
                </span>
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <Terminal className="h-3 w-3 text-cyber-magenta drop-shadow-[0_0_6px_rgba(255,0,255,1)]" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left"
        style={{
          background: 'linear-gradient(90deg, #00f5ff 0%, #ff00ff 50%, #9d00ff 100%)',
          scaleX: scrollProgress / 100,
          boxShadow: `0 0 20px rgba(0,245,255,0.8), 0 0 40px rgba(255,0,255,0.6)`,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />

      {/* Status Indicator - Bottom Right */}
      <motion.div
        className="fixed bottom-6 right-6 z-40 hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          className="relative group cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute -inset-4 rounded-full blur-xl"
            style={{
              background: 'radial-gradient(circle, rgba(0,245,255,0.6), rgba(255,0,255,0.4), transparent)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Main status circle */}
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-cyber-cyan bg-black/80 backdrop-blur-xl shadow-lg shadow-cyber-cyan/50">
            <motion.div
              className="w-3 h-3 rounded-full bg-cyber-cyan"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(0,245,255,1)',
                  '0 0 20px rgba(0,245,255,1)',
                  '0 0 10px rgba(0,245,255,1)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            {/* Rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyber-magenta border-r-cyber-purple"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Tooltip */}
          <motion.div
            className="absolute right-14 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-black/90 backdrop-blur-xl border-2 border-cyber-cyan shadow-lg shadow-cyber-cyan/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
            style={{
              boxShadow: '0 0 20px rgba(0,245,255,0.4)',
            }}
          >
            <p className="text-sm font-bold text-cyber-cyan">SYSTEM ONLINE</p>
            <p className="text-xs text-gray-400 font-mono">{scrollProgress.toFixed(0)}% scrolled</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
