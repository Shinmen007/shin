"use client";

import { Post } from "contentlayer/generated";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Eye, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <div className="relative h-full">
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyber-cyan/20 via-cyber-magenta/20 to-cyber-purple/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-full rounded-2xl bg-gradient-to-br from-black/90 to-black/70 border-2 border-white/10 group-hover:border-cyber-cyan/50 backdrop-blur-xl overflow-hidden transition-all duration-300"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyber-cyan/30 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyber-magenta/30 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,245,255,0.05), transparent 40%)',
            }}
          />

          {/* Holographic Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative p-6 space-y-4" style={{ transform: 'translateZ(20px)' }}>
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag, i) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Badge
                    className="text-xs px-3 py-1 border-2 font-bold"
                    style={{
                      borderColor: i === 0 ? '#00f5ff40' : '#ff00ff40',
                      color: i === 0 ? '#00f5ff' : '#ff00ff',
                      backgroundColor: i === 0 ? '#00f5ff10' : '#ff00ff10',
                    }}
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyber-cyan group-hover:to-cyber-magenta group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
              {post.title}
            </h3>

            {/* Summary */}
            <p className="text-gray-400 leading-relaxed line-clamp-3 text-sm">
              {post.summary}
            </p>

            {/* Meta info */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-cyber-cyan" />
                <span className="font-mono">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-cyber-magenta" />
                <span className="font-mono">{post.readingTime?.minutes || post.readingTime?.text || '5 min'}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs">
                <Eye className="h-3.5 w-3.5 text-cyber-purple" />
                <span className="text-gray-500 font-mono">{Math.floor(Math.random() * 1000) + 100}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <TrendingUp className="h-3.5 w-3.5 text-cyber-success" />
                <span className="text-gray-500 font-mono">+{Math.floor(Math.random() * 50) + 10}%</span>
              </div>
            </div>

            {/* Read more */}
            <motion.div
              className="flex items-center gap-2 pt-4 font-bold text-cyber-cyan"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span className="text-sm">Read Article</span>
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </div>

          {/* Scanline effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.3) 2px, rgba(0,245,255,0.3) 4px)',
            }}
            animate={{
              y: [0, 20],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-purple opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Link>
  );
}
