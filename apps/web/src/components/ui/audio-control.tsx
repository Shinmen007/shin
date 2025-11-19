"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music, Settings } from "lucide-react";
import { audioSystem } from "@/lib/audio-system";
import { cn } from "@/lib/utils";

export function AudioControl() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [volume, setVolume] = React.useState(30);
  const [ambientVolume, setAmbientVolume] = React.useState(15);
  const [isAmbientPlaying, setIsAmbientPlaying] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    // Initialize audio system on first user interaction
    const initAudio = () => {
      audioSystem.initialize();
      window.removeEventListener('click', initAudio);
    };

    window.addEventListener('click', initAudio, { once: true });

    return () => {
      window.removeEventListener('click', initAudio);
    };
  }, []);

  const toggleAudio = () => {
    const newState = audioSystem.toggle();
    setIsEnabled(newState);

    if (!newState) {
      setIsAmbientPlaying(false);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    audioSystem.setVolume(value / 100);
  };

  const handleAmbientVolumeChange = (value: number) => {
    setAmbientVolume(value);
    audioSystem.setAmbientVolume(value / 100);
  };

  const toggleAmbient = async () => {
    if (!isEnabled) {
      audioSystem.enable();
      setIsEnabled(true);
    }

    if (isAmbientPlaying) {
      audioSystem.stopAmbient();
      setIsAmbientPlaying(false);
    } else {
      await audioSystem.startAmbient();
      setIsAmbientPlaying(true);
    }
  };

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-0 w-72 rounded-xl border-2 border-cyber-cyan/50 bg-black/95 backdrop-blur-2xl shadow-2xl shadow-cyber-cyan/30 overflow-hidden"
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(255,0,255,0.2), rgba(157,0,255,0.2))',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Scanline effect */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.1) 2px, rgba(0,245,255,0.1) 4px)',
              }}
              animate={{ y: [0, 16] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />

            <div className="relative z-10 p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-cyber-cyan/30 pb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Settings className="h-5 w-5 text-cyber-cyan" />
                </motion.div>
                <h3 className="text-lg font-bold text-white tracking-wider" style={{ fontFamily: 'monospace' }}>
                  AUDIO CONTROL
                </h3>
              </div>

              {/* Master toggle */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 font-semibold">System Audio</span>
                  <motion.button
                    onClick={toggleAudio}
                    className={cn(
                      "relative w-12 h-6 rounded-full transition-colors duration-300",
                      isEnabled ? "bg-cyber-cyan/40" : "bg-gray-700"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={cn(
                        "absolute top-1 h-4 w-4 rounded-full shadow-lg",
                        isEnabled
                          ? "bg-cyber-cyan right-1 shadow-cyber-cyan/50"
                          : "bg-gray-400 left-1"
                      )}
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-2 text-xs">
                  <motion.div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      isEnabled ? "bg-cyber-cyan" : "bg-gray-600"
                    )}
                    animate={isEnabled ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className={cn(
                    "font-mono",
                    isEnabled ? "text-cyber-cyan" : "text-gray-600"
                  )}>
                    {isEnabled ? "ONLINE" : "OFFLINE"}
                  </span>
                </div>
              </div>

              {/* Master volume */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-400 font-semibold">Effects Volume</label>
                  <span className="text-xs text-cyber-cyan font-mono">{volume}%</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    disabled={!isEnabled}
                    className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer slider-thumb"
                    style={{
                      background: `linear-gradient(to right, rgba(0,245,255,0.6) 0%, rgba(0,245,255,0.6) ${volume}%, rgba(55,65,81,1) ${volume}%, rgba(55,65,81,1) 100%)`,
                    }}
                  />
                </div>
              </div>

              {/* Ambient music */}
              <div className="space-y-3 border-t border-cyber-cyan/20 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 font-semibold">Ambient Music</span>
                  <motion.button
                    onClick={toggleAmbient}
                    disabled={!isEnabled}
                    className={cn(
                      "p-2 rounded-lg transition-all duration-300 disabled:opacity-30",
                      isAmbientPlaying
                        ? "bg-cyber-magenta/20 text-cyber-magenta border border-cyber-magenta/50"
                        : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-cyber-magenta/30"
                    )}
                    whileHover={isEnabled ? { scale: 1.05 } : {}}
                    whileTap={isEnabled ? { scale: 0.95 } : {}}
                  >
                    <Music className="h-4 w-4" />
                  </motion.button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-400 font-semibold">Music Volume</label>
                  <span className="text-xs text-cyber-magenta font-mono">{ambientVolume}%</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={ambientVolume}
                    onChange={(e) => handleAmbientVolumeChange(Number(e.target.value))}
                    disabled={!isEnabled || !isAmbientPlaying}
                    className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer slider-thumb"
                    style={{
                      background: `linear-gradient(to right, rgba(255,0,255,0.6) 0%, rgba(255,0,255,0.6) ${ambientVolume}%, rgba(55,65,81,1) ${ambientVolume}%, rgba(55,65,81,1) 100%)`,
                    }}
                  />
                </div>
              </div>

              {/* Info text */}
              <p className="text-xs text-gray-500 text-center font-mono pt-2 border-t border-cyber-cyan/20">
                EXPERIMENTAL AUDIO SYSTEM v2.0
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full border-2 border-cyber-cyan/50 bg-black/90 backdrop-blur-xl shadow-xl shadow-cyber-cyan/30 overflow-hidden group"
        whileHover={{ scale: 1.1, borderColor: 'rgba(0,245,255,1)' }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(0,245,255,0.3), rgba(255,0,255,0.2), transparent)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Pulse rings */}
        {isEnabled && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyber-cyan"
              animate={{
                scale: [1, 1.5],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyber-cyan"
              animate={{
                scale: [1, 1.5],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 0.5,
              }}
            />
          </>
        )}

        {/* Icon */}
        <motion.div
          className="relative z-10 flex items-center justify-center h-full"
          animate={isEnabled ? { rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isEnabled ? (
            <Volume2 className="h-6 w-6 text-cyber-cyan drop-shadow-[0_0_10px_rgba(0,245,255,1)]" />
          ) : (
            <VolumeX className="h-6 w-6 text-gray-500" />
          )}
        </motion.div>

        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyber-cyan/40" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan/40" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyber-cyan/40" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyber-cyan/40" />
      </motion.button>
    </motion.div>
  );
}
