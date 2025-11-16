"use client";

import Link from "next/link";
import { Project } from "contentlayer/generated";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, TrendingUp, Users, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isFeatured = project.tags.includes("Featured");
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.6, 0.6], ["18deg", "-18deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.6, 0.6], ["-18deg", "18deg"]);
  const translateZ = useTransform(mouseYSpring, [-0.6, 0.6], [60, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          rotateX,
          rotateY,
          translateZ,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{
          scale: 1.05,
          y: -6,
          transition: { type: "spring", stiffness: 260, damping: 20 },
        }}
        className="group h-full"
      >
        <div className="relative h-full" style={{ transformStyle: "preserve-3d" }}>
          {/* Floating base shadow */}
          <motion.div
            className="absolute -inset-x-6 bottom-0 h-10 rounded-full bg-cyber-cyan/15 blur-2xl opacity-0 pointer-events-none"
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
            style={{ transform: "translateZ(0px)" }}
          />

          <Card
            className={cn(
              "relative h-full overflow-hidden cursor-pointer transition-all duration-500",
              "border-2 border-border/40 bg-gradient-to-br backdrop-blur-xl",
              isFeatured
                ? "from-cyber-cyan/10 via-background/80 to-cyber-magenta/10 border-cyber-cyan/60"
                : "from-background/80 to-background/60"
            )}
            style={{
              transformStyle: "preserve-3d",
              boxShadow: isHovered
                ? isFeatured
                  ? "0 30px 60px -15px rgba(34, 211, 238, 0.6), 0 0 0 1px rgba(34, 211, 238, 0.4), inset 0 0 36px rgba(34, 211, 238, 0.16)"
                  : "0 25px 50px -12px rgba(15, 23, 42, 0.9), 0 0 0 1px rgba(148, 163, 184, 0.25)"
                : "0 10px 18px -6px rgba(15, 23, 42, 0.8)",
            }}
          >
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                background: isFeatured
                  ? "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.35), transparent 70%)"
                  : "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.12), transparent 70%)",
              }}
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
                opacity: isHovered ? [0.2, 0.4, 0.2] : 0.2,
              }}
              transition={{
                duration: 2,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut",
              }}
            />

            {/* Glow effects */}
            {isFeatured && (
              <>
                <motion.div
                  className="absolute -inset-[2px] rounded-xl blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(34, 211, 238, 0.45), rgba(34, 211, 238, 0.2), transparent)",
                  }}
                  animate={{
                    opacity: isHovered ? 0.9 : 0.25,
                  }}
                  transition={{ duration: 0.5 }}
                />

                <motion.div
                  className="absolute -inset-[3px] rounded-xl blur-3xl"
                  style={{
                    background:
                      "conic-gradient(from 0deg, rgba(34, 211, 238, 0.5), transparent, rgba(236, 72, 153, 0.5), transparent, rgba(34, 211, 238, 0.5))",
                  }}
                  animate={{
                    opacity: isHovered ? 0.9 : 0.3,
                    rotate: 360,
                  }}
                  transition={{
                    opacity: { duration: 0.5 },
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  }}
                />
              </>
            )}

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 opacity-0"
              style={{
                background:
                  "linear-gradient(110deg, transparent 15%, rgba(255, 255, 255, 0.14) 40%, rgba(255, 255, 255, 0.26) 50%, rgba(255, 255, 255, 0.14) 60%, transparent 85%)",
              }}
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? ["-150%", "150%"] : "-150%",
              }}
              transition={{
                opacity: { duration: 0.3 },
                x: { duration: 1.4, repeat: isHovered ? Infinity : 0, ease: "easeInOut" },
              }}
            />

            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 rounded-lg" />

            <CardHeader
              className="relative space-y-4"
              style={{
                transform: "translateZ(70px)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Tags with 3D effect */}
              <motion.div
                className="flex flex-wrap gap-2"
                style={{
                  transform: "translateZ(80px)",
                }}
              >
                {project.tags.map((tag, index) => {
                  const variant =
                    tag === "Featured"
                      ? "cyan"
                      : tag.includes("AI")
                        ? "magenta"
                        : tag.includes("3D")
                          ? "purple"
                          : "default";

                  return (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8, y: 4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <Badge
                        variant={variant as any}
                        className="text-xs font-semibold shadow-lg relative group"
                      >
                        {tag === "Featured" && (
                          <motion.div
                            animate={{
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="inline-block mr-1"
                          >
                            <Sparkles className="h-3 w-3" />
                          </motion.div>
                        )}
                        {tag}
                      </Badge>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Title with glow effect */}
              <motion.h3
                className="text-xl font-bold tracking-tight transition-all duration-300 relative"
                style={{
                  transform: "translateZ(90px)",
                  textShadow: isHovered
                    ? "0 0 22px rgba(34, 211, 238, 0.6)"
                    : "0 0 0 rgba(0,0,0,0)",
                }}
                whileHover={{
                  scale: 1.03,
                }}
              >
                <span
                  className={cn(
                    "transition-colors duration-300",
                    isHovered ? "gradient-text" : "",
                  )}
                >
                  {project.title}
                </span>
              </motion.h3>

              {/* Summary */}
              <motion.p
                className="text-sm text-muted-foreground line-clamp-3 leading-relaxed"
                style={{
                  transform: "translateZ(70px)",
                }}
              >
                {project.summary}
              </motion.p>
            </CardHeader>

            <CardContent
              className="relative space-y-4"
              style={{
                transform: "translateZ(50px)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-cyber-cyan" />
                  <span className="text-muted-foreground">
                    Lighthouse: {project.metrics.lighthouse}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3 text-cyber-magenta" />
                  <span className="text-muted-foreground">
                    Perf: {project.metrics.perfScore}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3 text-cyber-purple" />
                  <span className="text-muted-foreground">
                    Users: {project.metrics.users}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 inline-block rounded-full bg-success" />
                  <span className="text-muted-foreground">
                    {project.metrics.uptime} uptime
                  </span>
                </div>
              </div>

              {/* Stack */}
              <div className="space-y-2" style={{ transform: "translateZ(40px)" }}>
                <p className="text-xs font-medium text-muted-foreground">Tech Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 5).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.stack.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.stack.length - 5}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Enhanced Links */}
              <motion.div
                className="flex items-center gap-3 pt-2"
                style={{
                  transform: "translateZ(60px)",
                }}
              >
                {project.repoUrl && (
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      window.open(project.repoUrl, "_blank", "noopener,noreferrer");
                    }}
                    className="relative group"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      className="absolute -inset-2 rounded-lg bg-cyber-cyan/20 opacity-0 group-hover:opacity-100 blur-lg"
                      transition={{ duration: 0.3 }}
                    />
                    <Github className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors relative z-10" />
                    <span className="sr-only">View repository</span>
                  </motion.button>
                )}
                {project.liveUrl && (
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
                    }}
                    className="relative group"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      className="absolute -inset-2 rounded-lg bg-cyber-cyan/30 opacity-0 group-hover:opacity-100 blur-lg"
                      transition={{ duration: 0.3 }}
                    />
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-cyber-cyan transition-colors relative z-10" />
                    <span className="sr-only">View live demo</span>
                  </motion.button>
                )}
              </motion.div>

              {/* Corner accent glows */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-3xl rounded-full pointer-events-none"
                style={{
                  background: isFeatured
                    ? "radial-gradient(circle, rgba(34, 211, 238, 0.6), transparent)"
                    : "radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent)",
                }}
                animate={{
                  scale: isHovered ? [1, 1.3, 1] : 1,
                  opacity: isHovered ? [0.2, 0.4, 0.2] : 0.2,
                }}
                transition={{
                  duration: 2,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute bottom-0 left-0 w-32 h-32 opacity-15 blur-3xl rounded-full pointer-events-none"
                style={{
                  background: isFeatured
                    ? "radial-gradient(circle, rgba(202, 138, 227, 0.5), transparent)"
                    : "radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent)",
                }}
                animate={{
                  scale: isHovered ? [1, 1.2, 1] : 1,
                  opacity: isHovered ? [0.15, 0.3, 0.15] : 0.15,
                }}
                transition={{
                  duration: 2.5,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </Link>
  );
}
