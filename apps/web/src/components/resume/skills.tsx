"use client";

import { motion } from "framer-motion";
import { Code2, Database, Cloud, Palette, Zap, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    color: "#00f5ff",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Three.js / WebGL", level: 85 },
      { name: "Framer Motion", level: 90 },
      { name: "Redux / Zustand", level: 85 },
    ]
  },
  {
    title: "Backend Development",
    icon: Database,
    color: "#ff00ff",
    skills: [
      { name: "Node.js / Express", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 85 },
      { name: "GraphQL", level: 80 },
      { name: "REST APIs", level: 95 },
      { name: "WebSockets", level: 85 },
    ]
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "#b300ff",
    skills: [
      { name: "AWS (EC2, S3, Lambda)", level: 85 },
      { name: "Docker / Kubernetes", level: 80 },
      { name: "CI/CD (GitHub Actions)", level: 90 },
      { name: "Vercel / Netlify", level: 95 },
      { name: "Nginx", level: 75 },
      { name: "Linux Administration", level: 80 },
    ]
  },
  {
    title: "Design & UX",
    icon: Palette,
    color: "#00f5ff",
    skills: [
      { name: "Figma / Adobe XD", level: 85 },
      { name: "Responsive Design", level: 95 },
      { name: "UI/UX Principles", level: 90 },
      { name: "Animation & Motion", level: 90 },
      { name: "Accessibility (WCAG)", level: 85 },
      { name: "Design Systems", level: 85 },
    ]
  },
  {
    title: "Performance & Optimization",
    icon: Zap,
    color: "#ff00ff",
    skills: [
      { name: "Web Performance", level: 90 },
      { name: "Code Splitting", level: 90 },
      { name: "Caching Strategies", level: 85 },
      { name: "Lighthouse Optimization", level: 90 },
      { name: "Bundle Optimization", level: 85 },
      { name: "SEO Best Practices", level: 85 },
    ]
  },
  {
    title: "Tools & Workflow",
    icon: Wrench,
    color: "#b300ff",
    skills: [
      { name: "Git / GitHub", level: 95 },
      { name: "VS Code", level: 95 },
      { name: "Jest / Testing Library", level: 85 },
      { name: "Webpack / Vite", level: 80 },
      { name: "Postman / Insomnia", level: 90 },
      { name: "Jira / Linear", level: 85 },
    ]
  }
];

export function Skills() {
  return (
    <section className="relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <Code2 className="h-8 w-8 text-cyber-cyan" />
            <h2 className="text-4xl md:text-5xl font-black text-white">
              TECHNICAL SKILLS
            </h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-cyan/50 to-transparent" />
        </div>
        <p className="text-gray-400 font-mono text-lg">
          [ Comprehensive technology stack and expertise levels ]
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {skillCategories.map((category, catIndex) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="relative p-6 rounded-xl bg-black/60 backdrop-blur-xl border-2 hover:border-opacity-100 transition-all duration-300 group"
              style={{
                borderColor: `${category.color}40`,
                boxShadow: `0 0 30px ${category.color}10`,
              }}
            >
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 opacity-60"
                style={{ borderColor: category.color }}
              />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 opacity-60"
                style={{ borderColor: category.color }}
              />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 opacity-60"
                style={{ borderColor: category.color }}
              />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 opacity-60"
                style={{ borderColor: category.color }}
              />

              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-3 rounded-lg border-2"
                  style={{
                    borderColor: `${category.color}40`,
                    backgroundColor: `${category.color}10`,
                  }}
                >
                  <Icon className="h-6 w-6" style={{ color: category.color }} />
                </div>
                <h3 className="text-xl font-black text-white group-hover:opacity-80 transition-opacity">
                  {category.title}
                </h3>
              </div>

              {/* Skills with Progress Bars */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * skillIndex }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-mono text-gray-300">{skill.name}</span>
                      <span className="text-xs font-bold font-mono" style={{ color: category.color }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative h-2 bg-gray-900 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                          boxShadow: `0 0 10px ${category.color}60`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1 * skillIndex, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Languages", value: "10+", color: "#00f5ff" },
          { label: "Frameworks", value: "15+", color: "#ff00ff" },
          { label: "Tools", value: "20+", color: "#b300ff" },
          { label: "Years Exp", value: "4+", color: "#00f5ff" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-xl bg-black/60 backdrop-blur-xl border-2 text-center"
            style={{
              borderColor: `${stat.color}40`,
              boxShadow: `0 0 20px ${stat.color}10`,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 40px ${stat.color}30`,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-3xl font-black mb-2" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
