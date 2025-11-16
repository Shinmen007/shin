"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "devops" | "languages" | "tools";
  logo: string;
  color: string;
}

const skills: Skill[] = [
  // Frontend
  {
    name: "React",
    level: 95,
    category: "frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    level: 95,
    category: "frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#000000",
  },
  {
    name: "TypeScript",
    level: 90,
    category: "frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178C6",
  },
  {
    name: "Three.js",
    level: 85,
    category: "frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
    color: "#000000",
  },
  {
    name: "Tailwind CSS",
    level: 95,
    category: "frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    color: "#06B6D4",
  },
  {
    name: "Vue.js",
    level: 80,
    category: "frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    color: "#4FC08D",
  },
  {
    name: "Redux",
    level: 85,
    category: "frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    color: "#764ABC",
  },
  {
    name: "Vite",
    level: 90,
    category: "frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    color: "#646CFF",
  },
  {
    name: "React Native",
    level: 85,
    category: "frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
  },
  {
    name: "HTML5",
    level: 95,
    category: "frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#E34F26",
  },
  {
    name: "CSS3",
    level: 95,
    category: "frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#1572B6",
  },
  {
    name: "Bootstrap",
    level: 90,
    category: "frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    color: "#7952B3",
  },
  {
    name: "Framer Motion",
    level: 92,
    category: "frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
    color: "#0055FF",
  },
  {
    name: "SASS",
    level: 88,
    category: "frontend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
    color: "#CC6699",
  },

  // Backend
  {
    name: "Node.js",
    level: 90,
    category: "backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
  },
  {
    name: "Express",
    level: 90,
    category: "backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    color: "#000000",
  },
  {
    name: "PostgreSQL",
    level: 85,
    category: "backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#4169E1",
  },
  {
    name: "MongoDB",
    level: 85,
    category: "backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
  },
  {
    name: "Redis",
    level: 80,
    category: "backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    color: "#DC382D",
  },
  {
    name: "GraphQL",
    level: 85,
    category: "backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    color: "#E10098",
  },
  {
    name: "Prisma",
    level: 90,
    category: "backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    color: "#2D3748",
  },
  {
    name: "Supabase",
    level: 88,
    category: "backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    color: "#3ECF8E",
  },
  {
    name: "MySQL",
    level: 85,
    category: "backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    color: "#4479A1",
  },
  {
    name: "PHP",
    level: 80,
    category: "backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    color: "#777BB4",
  },
  {
    name: "Firebase",
    level: 85,
    category: "backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    color: "#FFCA28",
  },
  {
    name: "NestJS",
    level: 82,
    category: "backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
    color: "#E0234E",
  },
  {
    name: "Django",
    level: 78,
    category: "backend",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    color: "#092E20",
  },

  // DevOps & Tools
  {
    name: "Docker",
    level: 85,
    category: "devops",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "#2496ED",
  },
  {
    name: "AWS",
    level: 80,
    category: "devops",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    color: "#FF9900",
  },
  {
    name: "Kubernetes",
    level: 70,
    category: "devops",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    color: "#326CE5",
  },
  {
    name: "GitHub Actions",
    level: 85,
    category: "devops",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    color: "#2088FF",
  },
  {
    name: "Terraform",
    level: 75,
    category: "devops",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
    color: "#7B42BC",
  },
  {
    name: "Nginx",
    level: 80,
    category: "devops",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
    color: "#009639",
  },
  {
    name: "Jenkins",
    level: 75,
    category: "devops",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
    color: "#D24939",
  },
  {
    name: "GitLab CI",
    level: 82,
    category: "devops",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
    color: "#FC6D26",
  },
  {
    name: "Vercel",
    level: 95,
    category: "devops",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    color: "#000000",
  },

  // Languages
  {
    name: "JavaScript",
    level: 95,
    category: "languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
  },
  {
    name: "Python",
    level: 85,
    category: "languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#3776AB",
  },
  {
    name: "Go",
    level: 75,
    category: "languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    color: "#00ADD8",
  },
  {
    name: "Rust",
    level: 70,
    category: "languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
    color: "#000000",
  },
  {
    name: "C++",
    level: 80,
    category: "languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    color: "#00599C",
  },
  {
    name: "Java",
    level: 78,
    category: "languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    color: "#007396",
  },
  {
    name: "Bash",
    level: 85,
    category: "languages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
    color: "#4EAA25",
  },

  // Tools
  {
    name: "Git",
    level: 95,
    category: "tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
  },
  {
    name: "GitHub",
    level: 95,
    category: "tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    color: "#181717",
  },
  {
    name: "VS Code",
    level: 95,
    category: "tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    color: "#007ACC",
  },
  {
    name: "Figma",
    level: 80,
    category: "tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    color: "#F24E1E",
  },
  {
    name: "Postman",
    level: 90,
    category: "tools",
    logo: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
    color: "#FF6C37",
  },
  {
    name: "Slack",
    level: 92,
    category: "tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    color: "#4A154B",
  },
  {
    name: "Jira",
    level: 88,
    category: "tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    color: "#0052CC",
  },
  {
    name: "Notion",
    level: 90,
    category: "tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg",
    color: "#000000",
  },
  {
    name: "Webpack",
    level: 85,
    category: "tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
    color: "#8DD6F9",
  },
];

const categories = [
  {
    id: "all",
    label: "All Skills",
    icon: "https://api.iconify.design/lucide:sparkles.svg?color=%2300f5ff",
    iconDark: "https://api.iconify.design/lucide:sparkles.svg?color=%2300f5ff"
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "https://api.iconify.design/lucide:layout-dashboard.svg?color=%2300f5ff",
    iconDark: "https://api.iconify.design/lucide:layout-dashboard.svg?color=%2300f5ff"
  },
  {
    id: "backend",
    label: "Backend",
    icon: "https://api.iconify.design/lucide:server.svg?color=%23ff00ff",
    iconDark: "https://api.iconify.design/lucide:server.svg?color=%23ff00ff"
  },
  {
    id: "devops",
    label: "DevOps",
    icon: "https://api.iconify.design/lucide:rocket.svg?color=%239d00ff",
    iconDark: "https://api.iconify.design/lucide:rocket.svg?color=%239d00ff"
  },
  {
    id: "languages",
    label: "Languages",
    icon: "https://api.iconify.design/lucide:code-2.svg?color=%2300ff88",
    iconDark: "https://api.iconify.design/lucide:code-2.svg?color=%2300ff88"
  },
  {
    id: "tools",
    label: "Tools",
    icon: "https://api.iconify.design/lucide:wrench.svg?color=%2399a0a8",
    iconDark: "https://api.iconify.design/lucide:wrench.svg?color=%2399a0a8"
  },
] as const;

function SkillCard3D({ skill, index }: { skill: Skill; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  // Enhanced 3D translation for depth effect
  const translateZ = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

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

  const getCategoryColor = () => {
    switch (skill.category) {
      case "frontend":
        return "from-cyber-cyan/20 to-cyber-cyan/5";
      case "backend":
        return "from-cyber-magenta/20 to-cyber-magenta/5";
      case "devops":
        return "from-cyber-purple/20 to-cyber-purple/5";
      case "languages":
        return "from-success/20 to-success/5";
      case "tools":
        return "from-muted-foreground/20 to-muted-foreground/5";
      default:
        return "from-muted/20 to-muted/5";
    }
  };

  const getLevelLabel = (level: number) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Proficient";
    return "Intermediate";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-500 cursor-pointer",
          "border-2 border-border/40",
          "bg-gradient-to-br backdrop-blur-xl",
          getCategoryColor(),
          isHovered && "border-cyber-cyan/60 shadow-2xl"
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(0)",
          boxShadow: isHovered
            ? `0 25px 50px -12px ${skill.color}40, 0 0 0 1px ${skill.color}20, inset 0 0 20px ${skill.color}10`
            : "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${skill.color}30, transparent 70%)`,
          }}
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.3, 0.5, 0.3] : 0.3,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        {/* Enhanced Glow effect with multiple layers */}
        <motion.div
          className="absolute -inset-[2px] rounded-xl opacity-0 blur-2xl"
          style={{
            background: `radial-gradient(circle at center, ${skill.color}60, ${skill.color}30 50%, transparent 70%)`,
          }}
          animate={{
            opacity: isHovered ? 0.8 : 0,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Outer glow ring */}
        <motion.div
          className="absolute -inset-[3px] rounded-xl opacity-0 blur-3xl"
          style={{
            background: `conic-gradient(from 0deg, ${skill.color}40, transparent, ${skill.color}40)`,
          }}
          animate={{
            opacity: isHovered ? 0.6 : 0,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            opacity: { duration: 0.4 },
            rotate: { duration: 3, repeat: Infinity, ease: "linear" }
          }}
        />

        {/* Shine effect with enhanced animation */}
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{
            background:
              "linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.15) 45%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.15) 55%, transparent 80%)",
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? ["0%", "200%"] : "0%",
          }}
          transition={{
            opacity: { duration: 0.3 },
            x: { duration: 1.2, ease: "easeInOut" }
          }}
        />

        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 rounded-lg" />

        <CardContent
          className="relative p-6 space-y-4"
          style={{
            transform: "translateZ(75px)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Logo Container with enhanced 3D effect */}
          <motion.div
            className="relative flex items-center justify-center h-24 w-24 mx-auto mb-4"
            style={{
              transform: "translateZ(100px)",
            }}
            animate={{
              rotateZ: isHovered ? [0, 5, -5, 0] : 0,
              y: isHovered ? [0, -5, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            {/* Multi-layered logo background glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl blur-2xl"
              style={{
                background: `radial-gradient(circle, ${skill.color}80, ${skill.color}40, transparent)`,
              }}
              animate={{
                scale: isHovered ? [1, 1.3, 1] : 1,
                opacity: isHovered ? [0.6, 0.9, 0.6] : 0.4,
              }}
              transition={{
                duration: 2,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut",
              }}
            />

            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                boxShadow: `0 0 0 2px ${skill.color}30`,
              }}
              animate={{
                scale: isHovered ? [1, 1.15, 1] : 1,
                opacity: isHovered ? [0.5, 1, 0.5] : 0,
              }}
              transition={{
                duration: 1.5,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut",
              }}
            />

            {/* Logo background with depth */}
            <motion.div
              className="relative w-20 h-20 rounded-2xl border-2 p-4 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
                borderColor: `${skill.color}40`,
                boxShadow: `0 8px 32px ${skill.color}30, inset 0 0 20px rgba(255,255,255,0.05)`,
                backdropFilter: "blur(10px)",
              }}
              whileHover={{
                scale: 1.1,
                borderColor: `${skill.color}80`,
              }}
            >
              <Image
                src={skill.logo}
                alt={`${skill.name} logo`}
                width={56}
                height={56}
                className="object-contain drop-shadow-2xl relative z-10"
                style={{
                  filter: isHovered ? `drop-shadow(0 0 8px ${skill.color})` : "none",
                }}
              />

              {/* Spinning ring behind logo */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `conic-gradient(from 0deg, transparent, ${skill.color}40, transparent)`,
                }}
                animate={{
                  rotate: isHovered ? 360 : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: isHovered ? Infinity : 0,
                  ease: "linear",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Skill Name & Badge */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <motion.h3
                className="font-bold text-lg text-foreground transition-all duration-300"
                style={{
                  transform: "translateZ(60px)",
                  textShadow: isHovered ? `0 0 20px ${skill.color}60` : "none",
                  color: isHovered ? skill.color : "inherit",
                }}
              >
                {skill.name}
              </motion.h3>
              <motion.div
                style={{ transform: "translateZ(60px)" }}
                whileHover={{ scale: 1.1 }}
              >
                <Badge
                  variant="outline"
                  className="text-xs font-semibold border-2 transition-all duration-300"
                  style={{
                    borderColor: isHovered ? `${skill.color}80` : `${skill.color}40`,
                    color: skill.color,
                    backgroundColor: `${skill.color}15`,
                    boxShadow: isHovered ? `0 0 20px ${skill.color}40` : "none",
                  }}
                >
                  {getLevelLabel(skill.level)}
                </Badge>
              </motion.div>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="space-y-2" style={{ transform: "translateZ(50px)" }}>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className="font-medium">Proficiency</span>
                <motion.span
                  className="font-bold tabular-nums"
                  style={{
                    color: skill.color,
                  }}
                  animate={{
                    scale: isHovered ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  {skill.level}%
                </motion.span>
              </div>

              {/* Progress container with 3D effect */}
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted/30 border border-border/20"
                style={{
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                {/* Background track glow */}
                <div
                  className="absolute inset-0 rounded-full opacity-20"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${skill.color}20, transparent)`,
                  }}
                />

                {/* Animated progress bar */}
                <motion.div
                  className="relative h-full rounded-full overflow-hidden"
                  style={{
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc, ${skill.color})`,
                    boxShadow: isHovered
                      ? `0 0 20px ${skill.color}80, inset 0 1px 2px rgba(255,255,255,0.3)`
                      : `0 0 10px ${skill.color}40, inset 0 1px 2px rgba(255,255,255,0.2)`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.05 + 0.3,
                    ease: "easeOut",
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0"
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

                  {/* Highlight strip */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[40%] rounded-full"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.3), transparent)",
                    }}
                  />

                  {/* Animated particles */}
                  {isHovered && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full bg-white"
                          style={{
                            left: `${20 + i * 25}%`,
                            top: "50%",
                          }}
                          animate={{
                            y: [-2, -8, -2],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Category Tag with enhanced styling */}
            <motion.div
              className="flex items-center gap-2 text-xs uppercase tracking-wider pt-2"
              style={{
                transform: "translateZ(40px)",
                color: `${skill.color}cc`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: skill.color,
                  boxShadow: `0 0 8px ${skill.color}`,
                }}
              />
              <span className="font-semibold">{skill.category}</span>
            </motion.div>
          </div>
        </CardContent>

        {/* Enhanced corner accents */}
        <motion.div
          className="absolute top-0 right-0 w-24 h-24 opacity-30 blur-3xl rounded-full"
          style={{
            background: `radial-gradient(circle, ${skill.color}, transparent)`,
          }}
          animate={{
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-0 w-24 h-24 opacity-20 blur-3xl rounded-full"
          style={{
            background: `radial-gradient(circle, ${skill.color}, transparent)`,
          }}
          animate={{
            scale: isHovered ? [1, 1.3, 1] : 1,
            opacity: isHovered ? [0.2, 0.5, 0.2] : 0.2,
          }}
          transition={{
            duration: 2.5,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Animated border particles */}
        {isHovered && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: skill.color,
                  boxShadow: `0 0 10px ${skill.color}`,
                }}
                initial={{
                  top: i % 2 === 0 ? "0%" : "100%",
                  left: i < 2 ? "0%" : "100%",
                }}
                animate={{
                  top: i % 2 === 0 ? ["0%", "100%", "0%"] : ["100%", "0%", "100%"],
                  left: i < 2 ? ["0%", "100%", "0%"] : ["100%", "0%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.75,
                  ease: "linear",
                }}
              />
            ))}
          </>
        )}
      </Card>
    </motion.div>
  );
}

export function SkillsShowcase3D() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category.id;
          return (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "group relative overflow-hidden rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300",
                "border-2 hover:scale-105 active:scale-95 backdrop-blur-sm",
                isSelected
                  ? "border-cyber-cyan bg-cyber-cyan/20 text-cyber-cyan shadow-2xl shadow-cyber-cyan/30"
                  : "border-border/50 bg-background/40 text-muted-foreground hover:border-cyber-cyan/50 hover:text-foreground hover:bg-background/60"
              )}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{
                y: -3,
                boxShadow: isSelected
                  ? "0 20px 40px -12px rgba(34, 211, 238, 0.4)"
                  : "0 10px 20px -10px rgba(0, 0, 0, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: isSelected
                  ? "0 10px 30px -5px rgba(34, 211, 238, 0.3), 0 0 0 1px rgba(34, 211, 238, 0.2)"
                  : "none",
              }}
            >
              {/* Animated background glow for selected */}
              {isSelected && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/30 via-cyber-cyan/15 to-transparent"
                    layoutId="categoryHighlight"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />

                  {/* Pulsing glow effect */}
                  <motion.div
                    className="absolute -inset-[2px] rounded-xl blur-lg bg-cyber-cyan/30"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [0.95, 1.05, 0.95],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Spinning ring */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "conic-gradient(from 0deg, transparent, rgba(34, 211, 238, 0.3), transparent)",
                    }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </>
              )}

              {/* Hover shimmer effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                }}
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              />

              <span className="relative flex items-center gap-2 z-10">
                <motion.span
                  className="flex items-center justify-center"
                  animate={{
                    rotate: isSelected ? [0, 10, -10, 0] : 0,
                    scale: isSelected ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={category.icon}
                    alt={`${category.label} icon`}
                    width={20}
                    height={20}
                    className="object-contain"
                    style={{
                      filter: isSelected ? "drop-shadow(0 0 8px currentColor)" : "none",
                    }}
                  />
                </motion.span>
                {category.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Skills Grid with enhanced 3D perspective and improved responsiveness */}
      <motion.div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        style={{
          perspective: "1500px",
          perspectiveOrigin: "center",
        }}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredSkills.map((skill, index) => (
          <SkillCard3D key={skill.name} skill={skill} index={index} />
        ))}
      </motion.div>

      {/* Skills Summary with enhanced visual design */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-16"
      >
        {[
          {
            count: skills.filter((s) => s.category === "frontend").length,
            label: "Frontend",
            color: "cyber-cyan",
            gradient: "from-cyber-cyan/10 to-cyber-cyan/5",
          },
          {
            count: skills.filter((s) => s.category === "backend").length,
            label: "Backend",
            color: "cyber-magenta",
            gradient: "from-cyber-magenta/10 to-cyber-magenta/5",
          },
          {
            count: skills.filter((s) => s.category === "devops").length,
            label: "DevOps",
            color: "cyber-purple",
            gradient: "from-cyber-purple/10 to-cyber-purple/5",
          },
          {
            count: skills.filter((s) => s.level >= 90).length,
            label: "Expert",
            color: "success",
            gradient: "from-success/10 to-success/5",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            whileHover={{
              scale: 1.05,
              y: -8,
              transition: { duration: 0.3 },
            }}
          >
            <Card
              className={cn(
                "relative overflow-hidden border-2 border-border/40 backdrop-blur-xl",
                "bg-gradient-to-br backdrop-blur-sm transition-all duration-500 cursor-pointer group",
                stat.gradient,
                "hover:border-opacity-60 hover:shadow-2xl"
              )}
              style={{
                boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle at 50% 50%, var(--${stat.color})30, transparent 70%)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Glow effect on hover */}
              <motion.div
                className="absolute -inset-[2px] rounded-xl blur-xl opacity-0 group-hover:opacity-60"
                style={{
                  background: `radial-gradient(circle, var(--${stat.color})60, transparent)`,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(110deg, transparent, rgba(255,255,255,0.1), transparent)",
                }}
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />

              <CardContent className="relative p-6 text-center space-y-3">
                <motion.div
                  className={cn("text-5xl font-bold gradient-text", `text-${stat.color}`)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.15,
                    textShadow: `0 0 20px var(--${stat.color})`,
                  }}
                >
                  {stat.count}
                </motion.div>
                <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">
                  {stat.label} {stat.label !== "Expert" && "Technologies"}
                  {stat.label === "Expert" && "Level Skills"}
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-2 right-2 w-12 h-12 opacity-20 blur-2xl rounded-full"
                  style={{
                    background: `radial-gradient(circle, var(--${stat.color}), transparent)`,
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
