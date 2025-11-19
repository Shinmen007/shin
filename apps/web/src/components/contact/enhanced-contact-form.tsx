"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2, AlertCircle, Sparkles, Loader2 } from "lucide-react";
import { useAudioSystem } from "@/lib/audio-system";

interface EnhancedContactFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function EnhancedContactForm({ onSubmit }: EnhancedContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { playClick, playSuccess, playError } = useAudioSystem();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playClick();

    try {
      await onSubmit(formData);
      setStatus("success");
      playSuccess();
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      playError();
      setTimeout(() => setStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const progress = Object.values(formData).filter(Boolean).length / 4 * 100;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-cyber-cyan uppercase tracking-wider">
            Form Progress
          </span>
          <span className="text-xs font-mono text-cyber-cyan">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-cyber-cyan/30">
          <motion.div
            className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{
              boxShadow: '0 0 20px rgba(0,245,255,0.6)',
            }}
          />
        </div>
      </div>

      {/* Name field */}
      <div className="relative">
        <label className="block text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
          <span className="text-cyber-cyan">01</span>
          <span>Your Name</span>
          {formData.name && (
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="ml-auto"
            >
              <CheckCircle2 className="h-4 w-4 text-cyber-success" />
            </motion.span>
          )}
        </label>
        <div className="relative group">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            required
            className="w-full px-4 py-3 bg-black/50 border-2 border-cyber-cyan/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan transition-all duration-300 font-mono"
            placeholder="John Doe"
          />
          {focusedField === "name" && (
            <motion.div
              className="absolute inset-0 rounded-lg border-2 border-cyber-cyan pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                boxShadow: '0 0 20px rgba(0,245,255,0.5)',
              }}
            />
          )}
        </div>
      </div>

      {/* Email field */}
      <div className="relative">
        <label className="block text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
          <span className="text-cyber-magenta">02</span>
          <span>Email Address</span>
          {formData.email && (
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="ml-auto"
            >
              <CheckCircle2 className="h-4 w-4 text-cyber-success" />
            </motion.span>
          )}
        </label>
        <div className="relative group">
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            required
            className="w-full px-4 py-3 bg-black/50 border-2 border-cyber-magenta/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-magenta transition-all duration-300 font-mono"
            placeholder="john@example.com"
          />
          {focusedField === "email" && (
            <motion.div
              className="absolute inset-0 rounded-lg border-2 border-cyber-magenta pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                boxShadow: '0 0 20px rgba(255,0,255,0.5)',
              }}
            />
          )}
        </div>
      </div>

      {/* Subject field */}
      <div className="relative">
        <label className="block text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
          <span className="text-cyber-purple">03</span>
          <span>Subject</span>
          {formData.subject && (
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="ml-auto"
            >
              <CheckCircle2 className="h-4 w-4 text-cyber-success" />
            </motion.span>
          )}
        </label>
        <div className="relative group">
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            onFocus={() => setFocusedField("subject")}
            onBlur={() => setFocusedField(null)}
            required
            className="w-full px-4 py-3 bg-black/50 border-2 border-cyber-purple/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-purple transition-all duration-300 font-mono"
            placeholder="Project Inquiry"
          />
          {focusedField === "subject" && (
            <motion.div
              className="absolute inset-0 rounded-lg border-2 border-cyber-purple pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                boxShadow: '0 0 20px rgba(157,0,255,0.5)',
              }}
            />
          )}
        </div>
      </div>

      {/* Message field */}
      <div className="relative">
        <label className="block text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
          <span className="gradient-text">04</span>
          <span>Message</span>
          {formData.message && (
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="ml-auto"
            >
              <CheckCircle2 className="h-4 w-4 text-cyber-success" />
            </motion.span>
          )}
        </label>
        <div className="relative group">
          <textarea
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            required
            rows={6}
            className="w-full px-4 py-3 bg-black/50 border-2 border-cyber-cyan/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan transition-all duration-300 resize-none font-mono"
            placeholder="Tell me about your project..."
          />
          {focusedField === "message" && (
            <motion.div
              className="absolute inset-0 rounded-lg border-2 border-cyber-cyan pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                boxShadow: '0 0 20px rgba(0,245,255,0.5)',
              }}
            />
          )}
          <div className="absolute bottom-3 right-3 text-xs text-gray-500 font-mono">
            {formData.message.length} / 1000
          </div>
        </div>
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        disabled={isSubmitting || status === "success"}
        variant="holographic"
        size="lg"
        enableSound
        glowIntensity="high"
        className="w-full group relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending Message...
            </motion.span>
          ) : status === "success" ? (
            <motion.span
              key="success"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="flex items-center gap-2"
            >
              <CheckCircle2 className="h-5 w-5" />
              Message Sent!
            </motion.span>
          ) : (
            <motion.span
              key="default"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-2"
            >
              <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              Send Message
              <Sparkles className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </Button>

      {/* Status messages */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-cyber-success/10 border-2 border-cyber-success rounded-lg"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-cyber-success flex-shrink-0" />
              <div>
                <p className="font-bold text-cyber-success">Success!</p>
                <p className="text-sm text-gray-300">I'll get back to you within 24 hours.</p>
              </div>
            </div>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-cyber-error/10 border-2 border-cyber-error rounded-lg"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-cyber-error flex-shrink-0" />
              <div>
                <p className="font-bold text-cyber-error">Error!</p>
                <p className="text-sm text-gray-300">Failed to send message. Please try again.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
