"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Clock, Calendar, ExternalLink } from "lucide-react";
import { CyberpunkCard } from "@/components/ui/cyberpunk-card";

export function EnhancedContactInfo() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@roshankhatri.dev",
      href: "mailto:hello@roshankhatri.dev",
      color: "cyan" as const,
      description: "Best for detailed inquiries",
    },
    {
      icon: Github,
      title: "GitHub",
      value: "@roshankhatri",
      href: "https://github.com/roshankhatri",
      color: "magenta" as const,
      description: "Check out my work",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "/in/roshankhatri",
      href: "https://linkedin.com/in/roshankhatri",
      color: "purple" as const,
      description: "Let's connect professionally",
    },
  ];

  const availability = [
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      color: "cyan" as const,
    },
    {
      icon: Calendar,
      title: "Availability",
      value: "Open to projects",
      color: "magenta" as const,
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Remote • Global",
      color: "purple" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Contact Methods */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <CyberpunkCard
          variant="neon"
          intensity="high"
          glowColor="cyan"
          className="p-6 space-y-6"
        >
          <div>
            <h3 className="text-xl font-black text-cyber-cyan mb-2" style={{ fontFamily: 'monospace' }}>
              CONTACT METHODS
            </h3>
            <p className="text-sm text-gray-400">
              Choose your preferred way to reach out
            </p>
          </div>

          <div className="space-y-4">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <div className="relative p-4 bg-black/50 border-2 border-cyber-cyan/30 rounded-lg hover:border-cyber-cyan transition-all duration-300 overflow-hidden">
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at center, rgba(0,245,255,0.1), transparent)`,
                    }}
                  />

                  <div className="relative z-10 flex items-start gap-4">
                    <div className={`p-2 rounded-lg bg-cyber-${method.color}/20 border border-cyber-${method.color}/50`}>
                      <method.icon className={`h-5 w-5 text-cyber-${method.color}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-white">{method.title}</h4>
                        <ExternalLink className="h-3 w-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className={`text-sm font-mono text-cyber-${method.color} mb-1`}>
                        {method.value}
                      </p>
                      <p className="text-xs text-gray-500">
                        {method.description}
                      </p>
                    </div>
                  </div>

                  {/* Scanline effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.1) 2px, rgba(0,245,255,0.1) 4px)',
                    }}
                    animate={{
                      y: [0, 16],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </CyberpunkCard>
      </motion.div>

      {/* Availability Info */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <CyberpunkCard
          variant="holographic"
          intensity="high"
          glowColor="magenta"
          className="p-6 space-y-6"
        >
          <div>
            <h3 className="text-xl font-black gradient-text mb-2" style={{ fontFamily: 'monospace' }}>
              AVAILABILITY
            </h3>
            <p className="text-sm text-gray-400">
              Current status and response times
            </p>
          </div>

          <div className="space-y-3">
            {availability.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-4 p-3 bg-black/30 rounded-lg border border-white/10"
              >
                <motion.div
                  className={`p-2 rounded-lg bg-cyber-${item.color}/20`}
                  animate={{
                    boxShadow: [
                      `0 0 0 rgba(var(--cyber-${item.color}), 0)`,
                      `0 0 20px rgba(var(--cyber-${item.color}), 0.5)`,
                      `0 0 0 rgba(var(--cyber-${item.color}), 0)`,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  <item.icon className={`h-5 w-5 text-cyber-${item.color}`} />
                </motion.div>

                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-0.5">{item.title}</p>
                  <p className="font-semibold text-white">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Status indicator */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <motion.div
                className="relative flex h-3 w-3"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyber-success opacity-75 animate-ping" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-cyber-success" />
              </motion.div>
              <div>
                <p className="text-sm font-bold text-cyber-success">Currently Available</p>
                <p className="text-xs text-gray-500">Accepting new projects</p>
              </div>
            </div>
          </div>
        </CyberpunkCard>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <CyberpunkCard
          variant="glass"
          intensity="medium"
          className="p-6"
        >
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <motion.p
                className="text-3xl font-black gradient-text mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
              >
                24h
              </motion.p>
              <p className="text-xs text-gray-500">Response Time</p>
            </div>
            <div>
              <motion.p
                className="text-3xl font-black gradient-text mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: 'spring' }}
              >
                100%
              </motion.p>
              <p className="text-xs text-gray-500">Reply Rate</p>
            </div>
          </div>
        </CyberpunkCard>
      </motion.div>
    </div>
  );
}
