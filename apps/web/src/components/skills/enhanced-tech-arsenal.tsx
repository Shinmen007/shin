"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { GlitchText } from "@/components/effects/glitch-text";
import { CyberpunkCard } from "@/components/ui/cyberpunk-card";
import { PremiumTechCard } from "./premium-tech-card";
import { CheckCircle2, Code2, Database, Cloud, Wrench, Zap } from "lucide-react";

interface TechItem {
  name: string;
  icon: string; // Simple Icons slug
  proficiency: number; // 0-100
  yearsExp: string;
  category: string;
}

interface TechStackCategories {
  frontend: TechItem[];
  backend: TechItem[];
  database: TechItem[];
  cloud: TechItem[];
  devops?: TechItem[];
  tools: TechItem[];
}

const techStack: TechStackCategories = {
  frontend: [
    { name: "React", icon: "react", proficiency: 95, yearsExp: "4+", category: "frontend" },
    { name: "Next.js", icon: "nextdotjs", proficiency: 95, yearsExp: "4+", category: "frontend" },
    { name: "TypeScript", icon: "typescript", proficiency: 90, yearsExp: "4+", category: "frontend" },
    { name: "JavaScript", icon: "javascript", proficiency: 95, yearsExp: "4+", category: "frontend" },
    { name: "Tailwind CSS", icon: "tailwindcss", proficiency: 95, yearsExp: "3+", category: "frontend" },
    { name: "Three.js", icon: "threedotjs", proficiency: 85, yearsExp: "2+", category: "frontend" },
    { name: "Redux", icon: "redux", proficiency: 85, yearsExp: "3+", category: "frontend" },
    { name: "Framer Motion", icon: "framer", proficiency: 90, yearsExp: "2+", category: "frontend" },
    { name: "HTML5", icon: "html5", proficiency: 95, yearsExp: "4+", category: "frontend" },
    { name: "CSS3", icon: "css3", proficiency: 95, yearsExp: "4+", category: "frontend" },
    { name: "Sass", icon: "sass", proficiency: 85, yearsExp: "3+", category: "frontend" },
    { name: "Webpack", icon: "webpack", proficiency: 80, yearsExp: "3+", category: "frontend" },
  ],
  backend: [
    { name: "Node.js", icon: "nodedotjs", proficiency: 90, yearsExp: "4+", category: "backend" },
    { name: "Express", icon: "express", proficiency: 90, yearsExp: "4+", category: "backend" },
    { name: "NestJS", icon: "nestjs", proficiency: 85, yearsExp: "2+", category: "backend" },
    { name: "Python", icon: "python", proficiency: 80, yearsExp: "3+", category: "backend" },
    { name: "FastAPI", icon: "fastapi", proficiency: 75, yearsExp: "2+", category: "backend" },
    { name: "GraphQL", icon: "graphql", proficiency: 85, yearsExp: "3+", category: "backend" },
    { name: "REST API", icon: "fastapi", proficiency: 95, yearsExp: "4+", category: "backend" },
    { name: "Socket.io", icon: "socketdotio", proficiency: 85, yearsExp: "3+", category: "backend" },
  ],
  database: [
    { name: "PostgreSQL", icon: "postgresql", proficiency: 90, yearsExp: "4+", category: "database" },
    { name: "MongoDB", icon: "mongodb", proficiency: 85, yearsExp: "4+", category: "database" },
    { name: "Redis", icon: "redis", proficiency: 85, yearsExp: "3+", category: "database" },
    { name: "MySQL", icon: "mysql", proficiency: 80, yearsExp: "4+", category: "database" },
    { name: "Supabase", icon: "supabase", proficiency: 85, yearsExp: "2+", category: "database" },
    { name: "Firebase", icon: "firebase", proficiency: 80, yearsExp: "3+", category: "database" },
    { name: "Prisma", icon: "prisma", proficiency: 85, yearsExp: "2+", category: "database" },
  ],
  cloud: [
    { name: "AWS", icon: "amazonaws", proficiency: 85, yearsExp: "3+", category: "cloud" },
    { name: "Vercel", icon: "vercel", proficiency: 90, yearsExp: "3+", category: "cloud" },
    { name: "Docker", icon: "docker", proficiency: 85, yearsExp: "3+", category: "cloud" },
    { name: "Kubernetes", icon: "kubernetes", proficiency: 75, yearsExp: "2+", category: "cloud" },
    { name: "GitHub Actions", icon: "githubactions", proficiency: 85, yearsExp: "3+", category: "cloud" },
    { name: "Netlify", icon: "netlify", proficiency: 80, yearsExp: "2+", category: "cloud" },
    { name: "Digital Ocean", icon: "digitalocean", proficiency: 80, yearsExp: "2+", category: "cloud" },
  ],
  tools: [
    { name: "Git", icon: "git", proficiency: 95, yearsExp: "4+", category: "tools" },
    { name: "GitHub", icon: "github", proficiency: 95, yearsExp: "4+", category: "tools" },
    { name: "VS Code", icon: "visualstudiocode", proficiency: 95, yearsExp: "4+", category: "tools" },
    { name: "Figma", icon: "figma", proficiency: 85, yearsExp: "3+", category: "tools" },
    { name: "Postman", icon: "postman", proficiency: 90, yearsExp: "4+", category: "tools" },
    { name: "Jest", icon: "jest", proficiency: 85, yearsExp: "3+", category: "tools" },
    { name: "Cypress", icon: "cypress", proficiency: 80, yearsExp: "2+", category: "tools" },
    { name: "ESLint", icon: "eslint", proficiency: 90, yearsExp: "4+", category: "tools" },
  ],
};

const categories = [
  { id: "all", name: "All Technologies", icon: Code2, color: "cyan" as const },
  { id: "frontend", name: "Frontend", icon: Zap, color: "cyan" as const },
  { id: "backend", name: "Backend", icon: Database, color: "magenta" as const },
  { id: "database", name: "Database", icon: Database, color: "purple" as const },
  { id: "cloud", name: "Cloud & DevOps", icon: Cloud, color: "cyan" as const },
  { id: "tools", name: "Tools", icon: Wrench, color: "magenta" as const },
];

export function EnhancedTechArsenal() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getFilteredTech = () => {
    if (selectedCategory === "all") {
      return Object.values(techStack).flat();
    }
    return techStack[selectedCategory as keyof typeof techStack] || [];
  };

  const filteredTech = getFilteredTech();

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return "cyber-cyan";
    if (proficiency >= 80) return "cyber-success";
    if (proficiency >= 70) return "cyber-magenta";
    return "cyber-purple";
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mb-16 text-center"
      >
        <GlitchText
          text="TECHNICAL ARSENAL"
          intensity="medium"
          color="cyan"
          className="text-4xl md:text-6xl font-black mb-6"
        />
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
          A comprehensive toolkit spanning the full stack, from pixel-perfect UIs to scalable cloud infrastructure
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <div className="text-center">
            <motion.div
              className="text-4xl md:text-5xl font-black gradient-text mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              {Object.values(techStack).flat().length}+
            </motion.div>
            <p className="text-sm text-gray-500 font-mono uppercase tracking-wider">Technologies</p>
          </div>
          <div className="text-center">
            <motion.div
              className="text-4xl md:text-5xl font-black gradient-text mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.3 }}
            >
              4
            </motion.div>
            <p className="text-sm text-gray-500 font-mono uppercase tracking-wider">Years Experience</p>
          </div>
          <div className="text-center">
            <motion.div
              className="text-4xl md:text-5xl font-black gradient-text mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.4 }}
            >
              5
            </motion.div>
            <p className="text-sm text-gray-500 font-mono uppercase tracking-wider">Tech Categories</p>
          </div>
        </div>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mb-12"
      >
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                group relative px-6 py-3 rounded-lg font-bold uppercase text-sm tracking-wider
                transition-all duration-300 overflow-hidden
                ${selectedCategory === category.id
                  ? 'bg-cyber-cyan/20 border-2 border-cyber-cyan text-cyber-cyan'
                  : 'bg-black/50 border-2 border-white/10 text-gray-400 hover:border-cyber-cyan/50 hover:text-white'
                }
              `}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative z-10 flex items-center gap-2">
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </div>

              {/* Animated background */}
              {selectedCategory === category.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/10 via-cyber-magenta/10 to-cyber-purple/10"
                  layoutId="categoryBg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Hover effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(circle at center, rgba(0,245,255,0.1), transparent)',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Tech Grid */}
      <div className="container mx-auto px-4">
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
        >
          {filteredTech.map((tech, index) => (
            <PremiumTechCard
              key={`${tech.name}-${tech.category}`}
              name={tech.name}
              icon={tech.icon}
              proficiency={tech.proficiency}
              yearsExp={tech.yearsExp}
              index={index}
            />
          ))}
        </motion.div>

        {/* Category Summary */}
        {selectedCategory !== "all" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <CyberpunkCard variant="holographic" intensity="high" className="p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-4">
                <div className="p-3 bg-cyber-cyan/20 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-cyber-cyan" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-black gradient-text">
                    {filteredTech.length} Technologies
                  </p>
                  <p className="text-sm text-gray-400">
                    in {categories.find(c => c.id === selectedCategory)?.name}
                  </p>
                </div>
              </div>
            </CyberpunkCard>
          </motion.div>
        )}
      </div>
    </section>
  );
}
