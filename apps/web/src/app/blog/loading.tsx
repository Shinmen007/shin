"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Skeleton */}
      <div className="relative overflow-hidden bg-black border-b border-cyber-cyan/20 py-32">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl space-y-8">
            {/* Badge skeleton */}
            <motion.div
              className="flex justify-center"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="h-10 w-48 rounded-full bg-cyber-cyan/10 border-2 border-cyber-cyan/30" />
            </motion.div>

            {/* Title skeleton */}
            <motion.div
              className="flex justify-center gap-4"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            >
              <div className="h-16 w-32 rounded bg-cyber-cyan/20" />
              <div className="h-16 w-32 rounded bg-cyber-magenta/20" />
            </motion.div>

            {/* Subtitle skeleton */}
            <motion.div
              className="flex justify-center"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            >
              <div className="h-6 w-96 rounded bg-gray-800" />
            </motion.div>

            {/* Stats skeleton */}
            <div className="grid grid-cols-3 gap-6 mt-16">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-xl bg-black/60 border-2 border-cyber-cyan/20"
                  animate={{
                    borderColor: [
                      'rgba(0,245,255,0.2)',
                      'rgba(0,245,255,0.4)',
                      'rgba(0,245,255,0.2)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-lg bg-cyber-cyan/10" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-10 w-20 mx-auto rounded bg-cyber-cyan/20" />
                    <div className="h-4 w-24 mx-auto rounded bg-gray-800" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-16">
        {/* Search skeleton */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="h-14 rounded-xl bg-black/60 border-2 border-cyber-cyan/20" />
        </motion.div>

        {/* Filter tags skeleton */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="h-10 w-24 rounded-lg bg-black/40 border-2 border-cyber-cyan/20"
              animate={{
                borderColor: [
                  'rgba(0,245,255,0.2)',
                  'rgba(255,0,255,0.3)',
                  'rgba(0,245,255,0.2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>

        {/* Grid skeleton */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="rounded-xl border-2 border-cyber-cyan/20 bg-black/60 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                borderColor: [
                  'rgba(0,245,255,0.2)',
                  'rgba(255,0,255,0.3)',
                  'rgba(179,0,255,0.2)',
                  'rgba(0,245,255,0.2)',
                ],
              }}
              transition={{
                opacity: { duration: 0.5, delay: i * 0.1 },
                y: { duration: 0.5, delay: i * 0.1 },
                borderColor: { duration: 4, repeat: Infinity, delay: i * 0.2 },
              }}
            >
              {/* Image skeleton */}
              <div className="relative h-48 bg-gradient-to-br from-cyber-cyan/10 to-cyber-magenta/10">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-cyan/10 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.2,
                  }}
                />
              </div>

              {/* Content skeleton */}
              <div className="p-6 space-y-4">
                <div className="flex gap-2">
                  <div className="h-6 w-16 rounded bg-cyber-cyan/20" />
                  <div className="h-6 w-20 rounded bg-cyber-magenta/20" />
                </div>
                <div className="space-y-2">
                  <div className="h-6 w-full rounded bg-gray-800" />
                  <div className="h-6 w-3/4 rounded bg-gray-800" />
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-full rounded bg-gray-900" />
                  <div className="h-4 w-5/6 rounded bg-gray-900" />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-cyber-cyan/20">
                  <div className="flex gap-4">
                    <div className="h-4 w-20 rounded bg-gray-800" />
                    <div className="h-4 w-16 rounded bg-gray-800" />
                  </div>
                  <div className="h-4 w-4 rounded-full bg-cyber-cyan/20" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Loading indicator */}
        <motion.div
          className="flex justify-center items-center gap-3 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="text-cyber-cyan font-mono text-sm font-bold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            [ LOADING DATA ]
          </motion.div>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-cyber-cyan"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
