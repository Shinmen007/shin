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
    } catch (_) {
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
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-cyber-cyan uppercase tracking-widest flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-cyber-cyan border-t-transparent rounded-full"
            />
            Form Progress
          </span>
          <motion.span 
            className="text-sm font-mono font-bold"
            animate={{
              color: progress === 100 ? '#00ff88' : '#00f5ff',
            }}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
        <div className="relative h-3 bg-black/50 rounded-full overflow-hidden border-2 border-cyber-cyan/30 backdrop-blur-sm">
          <motion.div
            className="h-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
          {progress === 100 && (
            <motion.div
              className="absolute inset-0 bg-cyber-success/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>
      </div>

      {/* Name field */}
      <div className="relative group">
        <label className={`absolute left-0 transition-all duration-300 ${focusedField === "name" || formData.name ? "-top-6 text-xs text-cyber-cyan" : "top-3 text-gray-400"}`}>
          Your Name
        </label>
        <div className="relative">
          {/* Holographic Input Container */}
          <div className="relative overflow-hidden">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              required
              className="w-full bg-transparent border-b-2 border-gray-700 py-3 text-white font-mono focus:outline-none focus:border-transparent transition-colors relative z-10"
            />
            
            {/* Animated Bottom Border */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-cyber-cyan w-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: focusedField === "name" ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Background Glow on Focus */}
            <motion.div
              className="absolute inset-0 bg-cyber-cyan/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: focusedField === "name" ? 1 : 0 }}
            />
          </div>

          {/* Corner Brackets */}
          <AnimatePresence>
            {focusedField === "name" && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -10, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -10, y: -10 }}
                  className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan"
                />
                <motion.div
                  initial={{ opacity: 0, x: 10, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 10, y: 10 }}
                  className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyber-cyan"
                />
              </>
            )}
          </AnimatePresence>
          
          {formData.name && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-0 top-3 text-cyber-success"
            >
              <CheckCircle2 className="h-5 w-5" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Email field */}
      <div className="relative group mt-8">
        <label className={`absolute left-0 transition-all duration-300 ${focusedField === "email" || formData.email ? "-top-6 text-xs text-cyber-magenta" : "top-3 text-gray-400"}`}>
          Email Address
        </label>
        <div className="relative">
           {/* Holographic Input Container */}
           <div className="relative overflow-hidden">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              required
              className="w-full bg-transparent border-b-2 border-gray-700 py-3 text-white font-mono focus:outline-none focus:border-transparent transition-colors relative z-10"
            />
            
            {/* Animated Bottom Border */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-cyber-magenta w-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: focusedField === "email" ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
             
            {/* Background Glow on Focus */}
            <motion.div
              className="absolute inset-0 bg-cyber-magenta/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: focusedField === "email" ? 1 : 0 }}
            />
          </div>

          {/* Corner Brackets */}
          <AnimatePresence>
            {focusedField === "email" && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -10, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -10, y: -10 }}
                  className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyber-magenta"
                />
                <motion.div
                  initial={{ opacity: 0, x: 10, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 10, y: 10 }}
                  className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyber-magenta"
                />
              </>
            )}
          </AnimatePresence>

          {formData.email && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-0 top-3 text-cyber-success"
            >
              <CheckCircle2 className="h-5 w-5" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Subject field */}
      <div className="relative group mt-8">
        <label className={`absolute left-0 transition-all duration-300 ${focusedField === "subject" || formData.subject ? "-top-6 text-xs text-cyber-purple" : "top-3 text-gray-400"}`}>
          Subject
        </label>
        <div className="relative">
           {/* Holographic Input Container */}
           <div className="relative overflow-hidden">
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              onFocus={() => setFocusedField("subject")}
              onBlur={() => setFocusedField(null)}
              required
              className="w-full bg-transparent border-b-2 border-gray-700 py-3 text-white font-mono focus:outline-none focus:border-transparent transition-colors relative z-10"
            />
            
            {/* Animated Bottom Border */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-cyber-purple w-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: focusedField === "subject" ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Background Glow on Focus */}
            <motion.div
              className="absolute inset-0 bg-cyber-purple/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: focusedField === "subject" ? 1 : 0 }}
            />
          </div>

          {/* Corner Brackets */}
          <AnimatePresence>
            {focusedField === "subject" && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -10, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -10, y: -10 }}
                  className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyber-purple"
                />
                <motion.div
                  initial={{ opacity: 0, x: 10, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 10, y: 10 }}
                  className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyber-purple"
                />
              </>
            )}
          </AnimatePresence>

          {formData.subject && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-0 top-3 text-cyber-success"
            >
              <CheckCircle2 className="h-5 w-5" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Message field */}
      <div className="relative group mt-8">
        <label className={`absolute left-0 transition-all duration-300 ${focusedField === "message" || formData.message ? "-top-6 text-xs text-cyber-cyan" : "top-3 text-gray-400"}`}>
          Message
        </label>
        <div className="relative">
          <div className="relative overflow-hidden">
            <textarea
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              required
              rows={5}
              maxLength={1000}
              className="w-full bg-transparent border-b-2 border-gray-700 py-3 text-white font-mono focus:outline-none focus:border-transparent transition-colors resize-none relative z-10"
            />
            
             {/* Animated Bottom Border */}
             <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple w-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: focusedField === "message" ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Background Glow on Focus */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-cyber-cyan/5 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: focusedField === "message" ? 1 : 0 }}
            />
          </div>

          {/* Corner Brackets */}
          <AnimatePresence>
            {focusedField === "message" && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -10, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: -10, y: -10 }}
                  className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan"
                />
                <motion.div
                  initial={{ opacity: 0, x: 10, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 10, y: 10 }}
                  className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyber-purple"
                />
              </>
            )}
          </AnimatePresence>

          <motion.div 
            className="absolute bottom-2 right-0 text-xs font-mono text-gray-500"
            animate={{
              color: formData.message.length > 900 ? '#ff0055' : formData.message.length > 700 ? '#ffaa00' : '#6b7280',
            }}
          >
            {formData.message.length} / 1000
          </motion.div>
        </div>
      </div>

      {/* Submit button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          disabled={isSubmitting || status === "success"}
          variant="holographic"
          size="lg"
          enableSound
          glowIntensity="high"
          className="w-full group relative overflow-hidden h-14"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/20 via-cyber-magenta/20 to-cyber-purple/20"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center gap-3 relative z-10"
              >
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="font-bold">Sending Message...</span>
              </motion.span>
            ) : status === "success" ? (
              <motion.span
                key="success"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="flex items-center gap-3 relative z-10"
              >
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-bold">Message Sent Successfully!</span>
              </motion.span>
            ) : (
              <motion.span
                key="default"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center gap-3 relative z-10"
              >
                <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <span className="font-bold">Send Message</span>
                <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

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
                <p className="text-sm text-gray-300">I&apos;ll get back to you within 24 hours.</p>
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
