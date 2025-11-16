"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, Zap } from "lucide-react";
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
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const navRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const navbarOpacity = useTransform(scrollY, [0, 100], [0.85, 1]);
  const navbarBlur = useTransform(scrollY, [0, 100], [16, 28]);
  const navbarScale = useTransform(scrollY, [0, 100], [0.98, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        scrolled ? "py-3" : "py-5"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Main container with enhanced glassmorphism */}
      <motion.div
        className="container mx-auto px-4 sm:px-6"
        style={{
          opacity: navbarOpacity,
          scale: navbarScale,
        }}
      >
        <motion.nav
          ref={navRef}
          className={cn(
            "relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-700",
            "bg-gradient-to-br from-background/90 via-background/80 to-background/90",
            "shadow-2xl shadow-cyber-purple/10",
            scrolled
              ? "border-cyber-cyan/50 shadow-[0_8px_32px_rgba(34,211,238,0.25),0_0_60px_rgba(157,0,255,0.15)]"
              : "border-border/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
          )}
          style={{
            backdropFilter: `blur(${navbarBlur}px) saturate(180%)`,
          }}
          whileHover={{
            borderColor: "rgba(34, 211, 238, 0.7)",
          }}
        >
          {/* Dynamic gradient background that follows mouse */}
          <motion.div
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${mouseX}% ${mouseY}%, rgba(34, 211, 238, 0.15), rgba(157, 0, 255, 0.1), transparent 40%)`,
            }}
          />

          {/* Animated mesh gradient */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: "linear-gradient(135deg, rgba(34, 211, 238, 0.05) 0%, rgba(255, 0, 255, 0.05) 50%, rgba(157, 0, 255, 0.05) 100%)",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />

          {/* Shine effect - enhanced */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: "linear-gradient(110deg, transparent 25%, rgba(255, 255, 255, 0.1) 48%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 52%, transparent 75%)",
            }}
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
          />

          <div className="relative flex h-16 sm:h-18 items-center justify-between px-6 sm:px-8">
            {/* Enhanced Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Rotating gradient glow */}
                <motion.div
                  className="absolute -inset-3 rounded-xl bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple opacity-0 blur-2xl group-hover:opacity-75 transition-opacity duration-700"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Logo text with enhanced gradient */}
                <span className="relative text-3xl font-black tracking-tighter flex items-center gap-2">
                  <span className="bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                    RK
                  </span>
                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="h-5 w-5 text-cyber-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  </motion.div>
                </span>
              </motion.div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-1">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1 + index * 0.08,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <Link href={item.href}>
                      <motion.div
                        className={cn(
                          "relative px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-300",
                          "group cursor-pointer overflow-hidden"
                        )}
                        whileHover={{ scale: 1.08, y: -3 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        {/* Active indicator with enhanced glow */}
                        {isActive && (
                          <>
                            <motion.div
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyber-cyan/25 via-cyber-magenta/25 to-cyber-purple/25 border-2 border-cyber-cyan/60"
                              layoutId="activeNav"
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 35,
                              }}
                            />
                            <motion.div
                              className="absolute inset-0 rounded-xl blur-xl bg-gradient-to-r from-cyber-cyan/40 via-cyber-magenta/40 to-cyber-purple/40"
                              animate={{
                                opacity: [0.4, 0.7, 0.4],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            {/* Electric particles effect for active */}
                            <motion.div
                              className="absolute inset-0 rounded-xl"
                              style={{
                                background: "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.4), transparent 70%)",
                              }}
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                          </>
                        )}

                        {/* Enhanced hover glow */}
                        <motion.div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                          style={{
                            background: "radial-gradient(circle at center, rgba(34, 211, 238, 0.4), rgba(157, 0, 255, 0.2), transparent 70%)",
                          }}
                          transition={{ duration: 0.4 }}
                        />

                        {/* Hover border glow */}
                        <motion.div
                          className="absolute inset-0 rounded-xl border-2 border-transparent opacity-0 group-hover:opacity-100 group-hover:border-cyber-cyan/40"
                          transition={{ duration: 0.3 }}
                        />

                        <span
                          className={cn(
                            "relative z-10 transition-all duration-300 flex items-center gap-1.5",
                            isActive
                              ? "text-cyber-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                              : "text-muted-foreground group-hover:text-foreground group-hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.3)]"
                          )}
                        >
                          {item.name}
                          {isActive && (
                            <motion.span
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              <Zap className="h-3 w-3 text-cyber-cyan" />
                            </motion.span>
                          )}
                        </span>

                        {/* Enhanced underline animation */}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple rounded-full opacity-0 group-hover:opacity-100"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Enhanced Mobile menu button */}
            <motion.div
              className="md:hidden"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className="relative group h-11 w-11"
              >
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyber-cyan/30 to-cyber-purple/30 opacity-0 group-hover:opacity-100 blur-xl"
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-cyber-cyan/50 transition-colors duration-300"
                />
                <motion.div
                  animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6 text-cyber-cyan" />
                  ) : (
                    <Menu className="h-6 w-6 group-hover:text-cyber-cyan transition-colors" />
                  )}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </motion.nav>
      </motion.div>

      {/* Enhanced Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden overflow-hidden"
      >
        <motion.div
          className="container mx-auto px-4 sm:px-6 mt-3"
          initial={false}
          animate={{
            y: mobileMenuOpen ? 0 : -30,
          }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative rounded-3xl border-2 border-cyber-cyan/40 bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-2xl p-5 shadow-[0_8px_32px_rgba(34,211,238,0.2),0_0_60px_rgba(157,0,255,0.15)] overflow-hidden">
            {/* Animated background for mobile menu */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                background: "radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.2), rgba(157, 0, 255, 0.1), transparent 70%)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative space-y-2">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <motion.div
                        className={cn(
                          "relative block rounded-2xl px-5 py-4 text-base font-bold transition-all duration-300 overflow-hidden",
                          isActive
                            ? "bg-gradient-to-r from-cyber-cyan/25 via-cyber-magenta/25 to-cyber-purple/25 text-cyber-cyan border-2 border-cyber-cyan/60 shadow-lg shadow-cyber-cyan/30"
                            : "text-muted-foreground hover:bg-gradient-to-r hover:from-cyber-cyan/10 hover:to-cyber-purple/10 hover:text-foreground border-2 border-transparent hover:border-cyber-cyan/30"
                        )}
                        whileHover={{ scale: 1.03, x: 8 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Active item glow */}
                        {isActive && (
                          <>
                            <motion.div
                              className="absolute inset-0 rounded-2xl blur-2xl bg-gradient-to-r from-cyber-cyan/50 via-cyber-magenta/50 to-cyber-purple/50"
                              animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [0.95, 1.05, 0.95],
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            {/* Sparkle effect */}
                            <motion.div
                              className="absolute right-4 top-1/2 -translate-y-1/2"
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
                              <Sparkles className="h-4 w-4 text-cyber-cyan drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                            </motion.div>
                          </>
                        )}

                        {/* Hover gradient background */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100"
                          style={{
                            background: "linear-gradient(90deg, rgba(34, 211, 238, 0.1), rgba(157, 0, 255, 0.1))",
                          }}
                        />

                        <span className="relative z-10 flex items-center gap-2">
                          {isActive && (
                            <motion.span
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
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

            {/* Decorative element */}
            <motion.div
              className="mt-4 pt-4 border-t border-cyber-cyan/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: mobileMenuOpen ? 1 : 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
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
                  <Sparkles className="h-3 w-3 text-cyber-cyan" />
                </motion.div>
                <span className="bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent font-semibold">
                  Navigate with style
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
