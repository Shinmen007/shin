"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, CheckCircle, Trophy, Star } from "lucide-react";

const certifications = [
  {
    name: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    date: "2023",
    credential: "AWS-SAA-2023-XXX",
    verifyUrl: "https://aws.amazon.com/certification/verify",
    skills: ["Cloud Architecture", "AWS Services", "Security", "Cost Optimization"],
    featured: true
  },
  {
    name: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    date: "2023",
    credential: "GCP-PD-2023-XXX",
    verifyUrl: "https://cloud.google.com/certification",
    skills: ["GCP", "Kubernetes", "App Engine", "Cloud Functions"],
    featured: true
  },
  {
    name: "MongoDB Certified Developer",
    issuer: "MongoDB University",
    date: "2022",
    credential: "MONGO-DEV-2022-XXX",
    verifyUrl: "https://university.mongodb.com/verify_certificate",
    skills: ["MongoDB", "NoSQL", "Aggregation", "Performance Tuning"],
    featured: false
  },
  {
    name: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta (via Coursera)",
    date: "2022",
    credential: "META-FE-2022-XXX",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify",
    skills: ["React", "JavaScript", "HTML/CSS", "Version Control"],
    featured: false
  },
  {
    name: "Advanced React & Redux",
    issuer: "Udemy",
    date: "2021",
    credential: "UDEMY-RR-2021-XXX",
    verifyUrl: "#",
    skills: ["React", "Redux", "Middleware", "Testing"],
    featured: false
  }
];

const achievements = [
  {
    title: "Hackathon Winner",
    description: "1st Place at TechCrunch Disrupt Hackathon 2023",
    icon: Trophy,
    color: "#ffd700"
  },
  {
    title: "Open Source Contributor",
    description: "Active contributor to Next.js and React Three Fiber",
    icon: Star,
    color: "#00f5ff"
  },
  {
    title: "Technical Speaker",
    description: "Presented at 5+ tech conferences on web performance",
    icon: Award,
    color: "#ff00ff"
  }
];

export function Certifications() {
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
            <Award className="h-8 w-8 text-cyber-purple" />
            <h2 className="text-4xl md:text-5xl font-black text-white">
              CERTIFICATIONS & AWARDS
            </h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-purple/50 to-transparent" />
        </div>
        <p className="text-gray-400 font-mono text-lg">
          [ Professional certifications and notable achievements ]
        </p>
      </motion.div>

      {/* Certifications Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative p-6 rounded-xl bg-black/60 backdrop-blur-xl border-2 transition-all duration-300 group ${
              cert.featured
                ? 'border-cyber-purple/60 hover:border-cyber-purple'
                : 'border-cyber-purple/30 hover:border-cyber-purple/50'
            }`}
            style={{
              boxShadow: cert.featured
                ? '0 0 40px rgba(179,0,255,0.2)'
                : '0 0 20px rgba(179,0,255,0.1)',
            }}
          >
            {/* Featured Badge */}
            {cert.featured && (
              <div className="absolute -top-3 -right-3">
                <motion.div
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-purple border-2 border-cyber-purple/50 shadow-lg shadow-cyber-purple/50"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Star className="h-4 w-4 text-black fill-black" />
                  <span className="text-xs font-black text-black">FEATURED</span>
                </motion.div>
              </div>
            )}

            {/* Corner brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyber-purple opacity-60" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyber-cyan opacity-60" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyber-magenta opacity-60" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyber-purple opacity-60" />

            {/* Content */}
            <div className="space-y-4">
              {/* Header */}
              <div>
                <h3 className="text-xl font-black text-white mb-2 group-hover:text-cyber-purple transition-colors">
                  {cert.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-cyber-purple">{cert.issuer}</p>
                  <span className="text-xs font-mono text-gray-500">{cert.date}</span>
                </div>
              </div>

              {/* Credential ID */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-cyber-purple/30">
                <span className="text-xs font-mono text-gray-400">Credential ID:</span>
                <span className="text-xs font-mono text-cyber-purple font-bold">{cert.credential}</span>
              </div>

              {/* Skills */}
              <div>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded bg-cyber-purple/10 border border-cyber-purple/30 text-xs font-mono text-cyber-purple"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verify Link */}
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyber-purple/10 border-2 border-cyber-purple/40 hover:border-cyber-purple hover:bg-cyber-purple/20 transition-all group/link"
              >
                <CheckCircle className="h-4 w-4 text-cyber-purple" />
                <span className="text-sm font-bold text-cyber-purple">Verify Certificate</span>
                <ExternalLink className="h-4 w-4 text-cyber-purple group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Notable Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
          <Trophy className="h-6 w-6 text-cyber-magenta" />
          Notable Achievements
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-6 rounded-xl bg-black/60 backdrop-blur-xl border-2 border-cyber-cyan/30 hover:border-cyber-cyan/60 transition-all duration-300 group text-center"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/60 border-2 mb-4"
                  style={{
                    borderColor: achievement.color,
                    boxShadow: `0 0 20px ${achievement.color}40`,
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="h-8 w-8" style={{ color: achievement.color }} />
                </motion.div>
                <h4 className="text-lg font-black text-white mb-2">{achievement.title}</h4>
                <p className="text-sm text-gray-400">{achievement.description}</p>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${achievement.color}20, transparent)`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
