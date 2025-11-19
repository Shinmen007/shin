"use client";

import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin, MapPin, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlitchText } from "@/components/effects/glitch-text";

export function ResumeHero() {
  const contactInfo = [
    { icon: Mail, text: "hello@roshankhatri.dev", href: "mailto:hello@roshankhatri.dev" },
    { icon: Github, text: "github.com/roshankhatri", href: "https://github.com/roshankhatri" },
    { icon: Linkedin, text: "linkedin.com/in/roshankhatri", href: "https://linkedin.com/in/roshankhatri" },
  ];

  const stats = [
    { label: "Years Experience", value: "4+", icon: Calendar },
    { label: "Projects Completed", value: "50+", icon: Award },
    { label: "Tech Stack", value: "20+", icon: Award },
  ];

  return (
    <section className="relative overflow-hidden bg-black border-b border-cyber-cyan/20">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto">
          {/* Main Info */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-4">
                <GlitchText
                  text="ROSHAN KHATRI"
                  intensity="medium"
                  color="cyan"
                  className="inline-block"
                />
              </h1>
              <p className="text-2xl sm:text-3xl font-bold text-cyber-magenta mb-2">
                Full-Stack Developer & 3D Specialist
              </p>
              <p className="text-lg text-gray-400 font-mono max-w-2xl mx-auto">
                [ Building scalable web applications • Real-time systems • 3D experiences ]
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {contactInfo.map((contact, i) => (
                <a
                  key={i}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 border-2 border-cyber-cyan/20 hover:border-cyber-cyan/60 transition-all text-sm font-mono text-gray-400 hover:text-cyber-cyan"
                >
                  <contact.icon className="h-4 w-4" />
                  <span>{contact.text}</span>
                </a>
              ))}
            </motion.div>

            {/* Download Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-cyber-cyan/10 border-2 border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/20 font-bold gap-2"
                asChild
              >
                <a href="/api/resume" download>
                  <Download className="h-5 w-5" />
                  DOWNLOAD RESUME
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-black/60 border-2 border-cyber-cyan/20 text-center"
              >
                <stat.icon className="h-8 w-8 text-cyber-cyan mx-auto mb-3" />
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
