"use client";

import Link from "next/link";
import Image from "next/image";
import { Post } from "contentlayer/generated";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const publishDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const readingTime = Math.ceil(post.readingTime.minutes);

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <motion.div
        className="relative h-full flex flex-col overflow-hidden rounded-xl border-2 border-cyber-cyan/20 bg-black/60 backdrop-blur-xl transition-all duration-300 hover:border-cyber-cyan/60 hover:-translate-y-1"
        style={{
          boxShadow: '0 0 20px rgba(0,245,255,0.1)',
        }}
        whileHover={{
          boxShadow: '0 0 40px rgba(0,245,255,0.3), 0 0 60px rgba(255,0,255,0.2)',
        }}
      >
        {/* Glitch effect overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 via-transparent to-cyber-magenta/5" />
        </div>

        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-cyber-cyan/10 to-cyber-magenta/10">
          {post.cover && (
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Corner brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan opacity-60" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyber-magenta opacity-60" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyber-purple opacity-60" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyber-cyan opacity-60" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col p-6 space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag, i) => (
              <Badge
                key={tag}
                className={`px-2 py-0.5 text-xs font-bold rounded border-2 bg-black/40 backdrop-blur-sm ${
                  i === 0
                    ? 'border-cyber-cyan/40 text-cyber-cyan'
                    : 'border-cyber-magenta/40 text-cyber-magenta'
                }`}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-xl font-black leading-tight text-white group-hover:text-cyber-cyan transition-colors line-clamp-2">
            {post.title}
          </h2>

          {/* Summary */}
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
            {post.summary}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-cyber-cyan/20">
            <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-cyber-cyan" />
                <time dateTime={post.publishedAt}>{publishDate}</time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-cyber-magenta" />
                <span>{readingTime} min</span>
              </div>
            </div>

            <motion.div
              className="flex items-center gap-1 text-cyber-cyan text-sm font-bold"
              whileHover={{ x: 5 }}
            >
              <span className="hidden sm:inline">READ</span>
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </div>
        </div>

        {/* Bottom glow line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </motion.div>
    </Link>
  );
}
