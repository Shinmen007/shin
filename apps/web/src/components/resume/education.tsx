"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of California, Berkeley",
    location: "Berkeley, CA",
    period: "2016 - 2020",
    gpa: "3.8/4.0",
    honors: "Magna Cum Laude",
    coursework: [
      "Data Structures & Algorithms",
      "Database Systems",
      "Web Development",
      "Computer Graphics",
      "Software Engineering",
      "Distributed Systems"
    ],
    achievements: [
      "Dean's List for 6 consecutive semesters",
      "Led student hackathon team to 1st place finish",
      "Published research paper on web performance optimization"
    ]
  }
];

const certifications = [
  "AWS Certified Solutions Architect",
  "Google Cloud Professional Developer",
  "MongoDB Certified Developer"
];

export function Education() {
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
            <GraduationCap className="h-8 w-8 text-cyber-magenta" />
            <h2 className="text-4xl md:text-5xl font-black text-white">
              EDUCATION
            </h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-magenta/50 to-transparent" />
        </div>
        <p className="text-gray-400 font-mono text-lg">
          [ Academic foundation and continuous learning ]
        </p>
      </motion.div>

      {/* Education Cards */}
      <div className="space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative p-6 md:p-8 rounded-xl bg-black/60 backdrop-blur-xl border-2 border-cyber-magenta/40 hover:border-cyber-magenta/60 transition-all duration-300 group"
            style={{
              boxShadow: '0 0 30px rgba(255,0,255,0.1)',
            }}
          >
            {/* Corner brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyber-magenta opacity-60" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyber-cyan opacity-60" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyber-purple opacity-60" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyber-magenta opacity-60" />

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-cyber-magenta transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-xl font-bold text-cyber-magenta mb-3">
                    {edu.institution}
                  </p>
                </div>
                {edu.honors && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-magenta/10 border-2 border-cyber-magenta/40">
                    <Award className="h-5 w-5 text-cyber-magenta" />
                    <span className="text-sm font-bold text-cyber-magenta">{edu.honors}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-sm font-mono text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-cyber-cyan" />
                  <span>{edu.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-cyber-purple" />
                  <span>{edu.period}</span>
                </div>
                {edu.gpa && (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30">
                    <span className="text-cyber-cyan font-bold">GPA: {edu.gpa}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Grid Layout for Coursework and Achievements */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Relevant Coursework */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-cyber-cyan" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                    Relevant Coursework
                  </h4>
                </div>
                <div className="space-y-2">
                  {edu.coursework.map((course, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center gap-2 text-gray-400"
                    >
                      <div className="w-2 h-2 rounded-full bg-cyber-cyan" />
                      <span className="text-sm">{course}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Academic Achievements */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-cyber-magenta" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                    Academic Achievements
                  </h4>
                </div>
                <div className="space-y-3">
                  {edu.achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-cyber-magenta/10 border-2 border-cyber-magenta/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-cyber-magenta">{i + 1}</span>
                      </div>
                      <span className="text-sm text-gray-400 leading-relaxed">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Certifications */}
      {certifications.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 p-6 rounded-xl bg-black/40 backdrop-blur-xl border-2 border-cyber-purple/40"
        >
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-cyber-purple" />
            Professional Certifications
          </h4>
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="px-4 py-2 rounded-lg bg-black/60 border-2 border-cyber-purple/40 text-cyber-purple font-mono text-sm font-bold hover:border-cyber-purple transition-all"
              >
                {cert}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
