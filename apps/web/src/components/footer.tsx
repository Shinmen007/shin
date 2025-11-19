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
    <footer className="border-border/40 from-background via-background to-background/95 relative overflow-hidden border-t bg-gradient-to-b">
      {/* Animated background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="bg-cyber-cyan/10 absolute -right-40 -top-40 h-80 w-80 rounded-full blur-3xl"
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
          className="bg-cyber-magenta/10 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl"
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

      <div className="container relative z-10 mx-auto px-4 py-16">
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
                <span className="gradient-text flex items-center gap-2 text-2xl font-bold">
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
                    <Sparkles className="text-cyber-cyan h-4 w-4" />
                  </motion.div>
                </span>
              </motion.div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Full-Stack Developer crafting performant, accessible web experiences with modern
              technologies and creative solutions.
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
                    className="group relative"
                    aria-label={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="from-cyber-cyan via-cyber-magenta to-cyber-purple absolute -inset-2 rounded-lg bg-gradient-to-r opacity-0 blur-lg group-hover:opacity-75"
                      transition={{ duration: 0.3 }}
                    />
                    <div className="border-border/50 bg-background/50 group-hover:border-cyber-cyan/50 group-hover:bg-cyber-cyan/10 relative flex h-10 w-10 items-center justify-center rounded-lg border backdrop-blur-sm transition-all">
                      <Icon className="text-muted-foreground group-hover:text-cyber-cyan h-5 w-5 transition-colors" />
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
              <h3 className="text-foreground flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                <div className="from-cyber-cyan h-px w-6 bg-gradient-to-r to-transparent" />
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
                      className="text-muted-foreground hover:text-foreground group relative inline-flex items-center text-sm transition-all"
                    >
                      <motion.span
                        className="absolute -left-2 opacity-0 transition-opacity group-hover:opacity-100"
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                      >
                        →
                      </motion.span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
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
            <h3 className="text-foreground flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
              <div className="from-cyber-cyan h-px w-6 bg-gradient-to-r to-transparent" />
              Get in Touch
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Interested in working together? Let's create something amazing.
            </p>
            <Link href="/contact">
              <motion.div
                className="border-cyber-cyan/40 bg-background/50 text-cyber-cyan group relative inline-flex items-center justify-center overflow-hidden rounded-xl border-2 px-6 py-3 text-sm font-semibold backdrop-blur-sm"
                whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.8)" }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="from-cyber-cyan/20 via-cyber-magenta/20 to-cyber-purple/20 absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
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
          className="border-border/40 mt-16 border-t pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-muted-foreground flex items-center gap-2 text-center text-sm">
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
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              </motion.span>
              and lots of coffee
            </p>
            <p className="text-muted-foreground text-center text-sm">
              Built with <span className="text-cyber-cyan font-semibold">Next.js</span>,{" "}
              <span className="text-cyber-magenta font-semibold">TypeScript</span>, and{" "}
              <span className="text-cyber-purple font-semibold">Three.js</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
