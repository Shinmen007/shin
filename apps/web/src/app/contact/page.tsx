"use client";

import { motion } from "framer-motion";
import { MessageCircle, Cpu, Wifi, Activity } from "lucide-react";
import { GlitchText } from "@/components/effects/glitch-text";
import { CyberpunkCard } from "@/components/ui/cyberpunk-card";
import { EnhancedContactForm } from "@/components/contact/enhanced-contact-form";
import { EnhancedContactInfo } from "@/components/contact/enhanced-contact-cards";
import { StatCounter } from "@/components/effects/data-viz";
import { CyberpunkHero3D } from "@/components/hero/cyberpunk-hero-3d";

// Mock submission function - replace with actual API call
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <div className="relative min-h-screen overflow-hidden bg-black text-white selection:bg-cyber-cyan/30 selection:text-cyber-cyan">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 -z-10">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 opacity-20">
          <CyberpunkHero3D />
        </div>
        
        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        
        {/* Header / Command Center Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6"
        >
            <div>
                <div className="flex items-center gap-2 text-cyber-cyan mb-2">
                    <Activity className="h-4 w-4 animate-pulse" />
                    <span className="text-xs font-mono tracking-widest uppercase">System Status: Online</span>
                </div>
                <GlitchText
                    text="COMMS_LINK_ESTABLISHED"
                    intensity="medium"
                    color="cyan"
                    className="text-4xl md:text-6xl font-black tracking-tighter"
                />
            </div>
            <div className="hidden md:flex items-center gap-8">
                <div className="text-right">
                    <div className="text-xs text-gray-500 font-mono uppercase mb-1">Network</div>
                    <div className="flex items-center gap-2 text-cyber-success">
                        <Wifi className="h-4 w-4" />
                        <span className="font-bold">Secure</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-gray-500 font-mono uppercase mb-1">Latency</div>
                    <div className="flex items-center gap-2 text-cyber-cyan">
                        <Cpu className="h-4 w-4" />
                        <span className="font-bold">12ms</span>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-24">
          
          {/* Left Column: Contact Info & Stats (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Holo-Profile Widget */}
            <EnhancedContactInfo />

             {/* Mini Stats Widgets */}
             <div className="grid grid-cols-2 gap-4">
                <CyberpunkCard variant="glass" className="p-4 text-center">
                    <div className="text-cyber-cyan text-2xl font-bold font-mono">
                        <StatCounter value={24} suffix="h" label="" duration={2} />
                    </div>
                    <div className="text-xs text-gray-500 uppercase mt-1">Avg. Response</div>
                </CyberpunkCard>
                <CyberpunkCard variant="glass" className="p-4 text-center">
                     <div className="text-cyber-magenta text-2xl font-bold font-mono">
                        <StatCounter value={100} suffix="%" label="" duration={2} />
                    </div>
                     <div className="text-xs text-gray-500 uppercase mt-1">Reply Rate</div>
                </CyberpunkCard>
             </div>
          </div>

          {/* Right Column: Contact Form (8 cols) */}
          <div className="lg:col-span-8">
            <CyberpunkCard
                variant="neon"
                enable3D
                intensity="medium"
                glowColor="cyan"
                className="h-full p-1 relative overflow-hidden"
              >
                {/* Decorative Grid Background inside Card */}
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,245,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,245,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                
                <div className="relative z-10 bg-black/40 p-8 md:p-10 h-full rounded-xl backdrop-blur-sm">
                    {/* Form Header */}
                    <div className="flex items-center justify-between mb-8">
                         <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <MessageCircle className="h-6 w-6 text-cyber-cyan" />
                            <span>TRANSMIT MESSAGE</span>
                         </h2>
                         <div className="flex gap-2">
                             <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-ping" />
                             <div className="w-2 h-2 bg-cyber-cyan rounded-full" />
                         </div>
                    </div>
                    
                    {/* The Enhanced Form */}
                    <EnhancedContactForm onSubmit={handleContactSubmit} />
                </div>
            </CyberpunkCard>
          </div>
        </div>

        {/* Footer Metrics / Decorative */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono uppercase tracking-wider">
            <div>
                System ID: SHIN-PORTFOLIO-V3
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
                <span>Encrypted Connection</span>
                <span>Global Node Access</span>
                <span>Ver: 3.4.2</span>
            </div>
        </div>

      </div>
    </div>
  );
}
