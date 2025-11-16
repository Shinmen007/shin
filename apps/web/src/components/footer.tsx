"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/roshankhatri",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/roshankhatri",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/roshankhatri",
    icon: Twitter,
  },
  {
    name: "Email",
    href: "mailto:hello@roshankhatri.dev",
    icon: Mail,
  },
];

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { name: "Home", href: "/" },
      { name: "Projects", href: "/projects" },
      { name: "Blog", href: "/blog" },
      { name: "About", href: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Resume", href: "/api/resume" },
      { name: "RSS Feed", href: "/feed.xml" },
      { name: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-gradient-to-b from-background via-background to-background/95 overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-cyber-cyan/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyber-magenta/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="group flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="gradient-text text-2xl font-bold flex items-center gap-2">
                  Roshan Khatri
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-cyber-cyan" />
                  </motion.div>
                </span>
              </motion.div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full-Stack Developer crafting performant, accessible web experiences
              with modern technologies and creative solutions.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                    aria-label={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute -inset-2 rounded-lg bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple opacity-0 group-hover:opacity-75 blur-lg"
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm transition-all group-hover:border-cyber-cyan/50 group-hover:bg-cyber-cyan/10">
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-cyber-cyan transition-colors" />
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Links */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (sectionIndex + 1) * 0.1 }}
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <div className="h-px w-6 bg-gradient-to-r from-cyber-cyan to-transparent" />
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (sectionIndex + 1) * 0.1 + linkIndex * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="group relative inline-flex items-center text-sm text-muted-foreground transition-all hover:text-foreground"
                    >
                      <motion.span
                        className="absolute -left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                      >
                        →
                      </motion.span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* CTA */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <div className="h-px w-6 bg-gradient-to-r from-cyber-cyan to-transparent" />
              Get in Touch
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Interested in working together? Let's create something amazing.
            </p>
            <Link href="/contact">
              <motion.div
                className="relative inline-flex items-center justify-center rounded-xl border-2 border-cyber-cyan/40 bg-background/50 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-cyber-cyan overflow-hidden group"
                whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.8)" }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 via-cyber-magenta/20 to-cyber-purple/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                  }}
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
                <span className="relative z-10">Contact Me</span>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-16 border-t border-border/40 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground flex items-center gap-2">
              © {new Date().getFullYear()} Roshan Khatri. Made with
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              </motion.span>
              and lots of coffee
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Built with{" "}
              <span className="font-semibold text-cyber-cyan">Next.js</span>,{" "}
              <span className="font-semibold text-cyber-magenta">TypeScript</span>, and{" "}
              <span className="font-semibold text-cyber-purple">Three.js</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
