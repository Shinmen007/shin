"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, MessageCircle } from "lucide-react";
import { GlitchText } from "@/components/effects/glitch-text";
import { CyberpunkCard } from "@/components/ui/cyberpunk-card";
import { EnhancedContactForm } from "@/components/contact/enhanced-contact-form";
import { EnhancedContactInfo } from "@/components/contact/enhanced-contact-cards";
import { StatCounter } from "@/components/effects/data-viz";
import { CSSParticles, AnimatedGrid, GlowingCircles } from "@/components/hero/css-particles";

// Mock submission function - replace with actual API call
async function handleContactSubmit(_formData: any) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulate success
  if (Math.random() > 0.1) {
    return Promise.resolve();
  } else {
    throw new Error("Failed to send message");
  }
}

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <GlowingCircles />
        <AnimatedGrid />
        <CSSParticles />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 border-2 border-cyber-cyan/50 rounded-full bg-cyber-cyan/10 backdrop-blur-xl"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Sparkles className="h-4 w-4 text-cyber-cyan" />
            </motion.div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyber-cyan">
              Open for Collaboration
            </span>
          </motion.div>

          {/* Main Heading */}
          <div className="mb-8">
            <GlitchText
              text="LET'S CREATE TOGETHER"
              intensity="medium"
              color="multi"
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-4"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Have a project in mind? Let's discuss how we can bring your vision to life with cutting-edge technology.
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <StatCounter value={24} suffix="h" label="Response Time" duration={2} />
            <StatCounter value={100} suffix="%" label="Reply Rate" duration={2.5} />
            <StatCounter value={50} suffix="+" label="Projects Done" duration={3} />
          </motion.div>
        </motion.section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Contact Form - Takes 2 columns */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <CyberpunkCard
                variant="neon"
                enable3D
                intensity="high"
                glowColor="cyan"
                className="p-8"
              >
                {/* Form Header */}
                <div className="mb-8 pb-6 border-b border-cyber-cyan/20">
                  <div className="flex items-center gap-4 mb-3">
                    <motion.div
                      className="p-3 rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-purple"
                      animate={{
                        boxShadow: [
                          '0 0 0 rgba(0,245,255,0)',
                          '0 0 30px rgba(0,245,255,0.6)',
                          '0 0 0 rgba(0,245,255,0)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <MessageCircle className="h-6 w-6 text-black" />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-black gradient-text" style={{ fontFamily: 'monospace' }}>
                        SEND MESSAGE
                      </h2>
                      <p className="text-sm text-gray-400 mt-1">
                        Fill out the form and I'll get back to you within 24 hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Form */}
                <EnhancedContactForm onSubmit={handleContactSubmit} />
              </CyberpunkCard>
            </motion.div>
          </div>

          {/* Contact Info Sidebar - Takes 1 column */}
          <div className="lg:col-span-1">
            <EnhancedContactInfo />
          </div>
        </div>

        {/* Why Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <GlitchText
              text="WHY WORK WITH ME?"
              intensity="low"
              color="magenta"
              className="text-3xl md:text-5xl font-black mb-4"
            />
            <p className="text-gray-400 max-w-2xl mx-auto">
              Combining technical expertise with creative vision to deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Fast Turnaround",
                description: "Quick response times and efficient project delivery without compromising quality",
                color: "cyan" as const,
              },
              {
                icon: Sparkles,
                title: "Modern Stack",
                description: "Leveraging the latest technologies to build scalable and performant applications",
                color: "magenta" as const,
              },
              {
                icon: MessageCircle,
                title: "Clear Communication",
                description: "Regular updates and transparent collaboration throughout the project lifecycle",
                color: "purple" as const,
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <CyberpunkCard
                  variant="holographic"
                  enable3D
                  glowColor={benefit.color}
                  intensity="high"
                  className="p-6 h-full"
                >
                  <motion.div
                    className={`inline-flex p-4 rounded-xl bg-cyber-${benefit.color}/20 border-2 border-cyber-${benefit.color}/50 mb-4`}
                    animate={{
                      boxShadow: [
                        '0 0 0 rgba(0,245,255,0)',
                        '0 0 25px rgba(0,245,255,0.5)',
                        '0 0 0 rgba(0,245,255,0)',
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    <benefit.icon className={`h-6 w-6 text-cyber-${benefit.color}`} />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </CyberpunkCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <CyberpunkCard
            variant="holographic"
            intensity="high"
            glowColor="multi"
            className="p-12 text-center"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="inline-block mb-6"
            >
              <Sparkles className="h-12 w-12 text-cyber-cyan" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-black gradient-text mb-4" style={{ fontFamily: 'monospace' }}>
              READY TO START?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Whether you're building something new or scaling an existing product,
              let's create something amazing together.
            </p>

            <motion.div
              className="inline-flex items-center gap-2 text-cyber-cyan font-mono text-sm"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
              <span>I typically respond within 24 hours</span>
            </motion.div>
          </CyberpunkCard>
        </motion.section>
      </div>
    </div>
  );
}
