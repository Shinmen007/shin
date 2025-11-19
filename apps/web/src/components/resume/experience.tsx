"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";

const experiences = [
  {
    title: "Senior Full-Stack Developer",
    company: "Tech Innovations Inc.",
    location: "Remote",
    period: "2022 - Present",
    description: "Leading development of scalable web applications and real-time systems",
    achievements: [
      "Architected and deployed microservices handling 1M+ daily requests",
      "Reduced API response time by 60% through optimization and caching strategies",
      "Mentored team of 5 junior developers in modern web technologies",
      "Implemented CI/CD pipeline reducing deployment time from hours to minutes"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"]
  },
  {
    title: "Full-Stack Developer",
    company: "Digital Solutions Ltd.",
    location: "San Francisco, CA",
    period: "2021 - 2022",
    description: "Developed and maintained multiple client-facing web applications",
    achievements: [
      "Built responsive e-commerce platform processing $2M+ in annual revenue",
      "Integrated real-time chat and notification systems using WebSockets",
      "Improved application performance with code splitting and lazy loading",
      "Collaborated with design team to implement pixel-perfect UIs"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "Redux", "Material-UI"]
  },
  {
    title: "Frontend Developer",
    company: "StartupXYZ",
    location: "Austin, TX",
    period: "2020 - 2021",
    description: "Focused on creating interactive and performant user interfaces",
    achievements: [
      "Developed reusable component library used across 5+ products",
      "Implemented 3D visualizations using Three.js for data analytics platform",
      "Optimized bundle size reducing initial load time by 40%",
      "Wrote comprehensive unit and integration tests achieving 85% coverage"
    ],
    technologies: ["React", "Three.js", "TypeScript", "Jest", "Webpack", "Sass"]
  }
];

export function Experience() {
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
            <Briefcase className="h-8 w-8 text-cyber-cyan" />
            <h2 className="text-4xl md:text-5xl font-black text-white">
              WORK EXPERIENCE
            </h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-cyan/50 to-transparent" />
        </div>
        <p className="text-gray-400 font-mono text-lg">
          [ Professional journey building impactful digital products ]
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative space-y-8">
        {/* Vertical line */}
        <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-cyan via-cyber-magenta to-cyber-purple opacity-30" />

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative pl-8 md:pl-20"
          >
            {/* Timeline dot */}
            <motion.div
              className="absolute left-0 md:left-8 top-6 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-black"
              style={{
                backgroundColor: index === 0 ? '#00f5ff' : index === 1 ? '#ff00ff' : '#b300ff',
                boxShadow: `0 0 20px ${index === 0 ? '#00f5ff' : index === 1 ? '#ff00ff' : '#b300ff'}`,
              }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            />

            {/* Content card */}
            <div
              className="relative p-6 md:p-8 rounded-xl bg-black/60 backdrop-blur-xl border-2 hover:border-opacity-100 transition-all duration-300 group"
              style={{
                borderColor: `${index === 0 ? '#00f5ff' : index === 1 ? '#ff00ff' : '#b300ff'}40`,
                boxShadow: `0 0 30px ${index === 0 ? '#00f5ff' : index === 1 ? '#ff00ff' : '#b300ff'}10`,
              }}
            >
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 opacity-60"
                style={{ borderColor: index === 0 ? '#00f5ff' : index === 1 ? '#ff00ff' : '#b300ff' }}
              />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 opacity-60"
                style={{ borderColor: index === 0 ? '#00f5ff' : index === 1 ? '#ff00ff' : '#b300ff' }}
              />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 opacity-60"
                style={{ borderColor: index === 0 ? '#00f5ff' : index === 1 ? '#ff00ff' : '#b300ff' }}
              />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 opacity-60"
                style={{ borderColor: index === 0 ? '#00f5ff' : index === 1 ? '#ff00ff' : '#b300ff' }}
              />

              {/* Header */}
              <div className="mb-4">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-cyber-cyan transition-colors">
                  {exp.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm font-mono text-gray-400">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-cyber-magenta" />
                    <span className="font-bold text-cyber-magenta">{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-cyber-cyan" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-cyber-purple" />
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-4 text-base md:text-lg">
                {exp.description}
              </p>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                  Key Achievements
                </h4>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400">
                      <ChevronRight className="h-5 w-5 text-cyber-cyan flex-shrink-0 mt-0.5" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-black/60 border-2 text-xs font-bold font-mono"
                      style={{
                        borderColor: `${index === 0 ? '#00f5ff' : index === 1 ? '#ff00ff' : '#b300ff'}40`,
                        color: index === 0 ? '#00f5ff' : index === 1 ? '#ff00ff' : '#b300ff',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
