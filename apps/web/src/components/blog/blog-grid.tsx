"use client";

import { useState, useMemo } from "react";
import { Post } from "contentlayer/generated";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "./post-card";
import { Search, X, Filter, Database, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface BlogGridProps {
  posts: Post[];
  allTags: string[];
}

export function BlogGrid({ posts, allTags }: BlogGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => post.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery !== "" || selectedTags.length > 0;

  return (
    <div className="space-y-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8">
        <div className="relative max-w-2xl mx-auto">
          <motion.div className="relative" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyber-cyan" />
            <Input type="text" placeholder="Search articles by title, content, or tags..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 pr-12 text-base bg-black/60 border-2 border-cyber-cyan/30 focus:border-cyber-cyan rounded-xl backdrop-blur-xl font-mono placeholder:text-gray-600 text-white shadow-lg shadow-cyber-cyan/10 transition-all" />
            <AnimatePresence>
              {searchQuery && (
                <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyber-cyan transition-colors">
                  <X className="h-5 w-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.div className="flex items-center justify-center gap-2 text-sm font-mono text-gray-500"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Filter className="h-4 w-4 text-cyber-cyan" />
            <span>FILTER BY TOPIC</span>
            <Sparkles className="h-3 w-3 text-cyber-magenta" />
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {allTags.map((tag, index) => {
              const isSelected = selectedTags.includes(tag);
              const colors = ['#00f5ff', '#ff00ff', '#b300ff'];
              const color = colors[index % colors.length];

              return (
                <motion.div key={tag} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Badge className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 border-2 ${
                      isSelected ? 'bg-black/80 backdrop-blur-xl' : 'bg-black/40 backdrop-blur-xl'
                    }`}
                      style={{
                        borderColor: isSelected ? color : 'rgba(255,255,255,0.1)',
                        color: isSelected ? color : '#9ca3af',
                        boxShadow: isSelected ? `0 0 20px ${color}40` : 'none',
                      }}
                      onClick={() => toggleTag(tag)}>
                      {tag}
                      {isSelected && <X className="ml-2 h-3 w-3" />}
                    </Badge>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="flex items-center justify-between border-b border-cyber-cyan/20 pb-4">
        <p className="text-sm font-mono text-gray-500">
          <motion.span className="text-cyber-cyan font-bold" key={filteredPosts.length}
            initial={{ scale: 1.5, color: "#00f5ff" }} animate={{ scale: 1, color: "#00f5ff" }}>
            {filteredPosts.length}
          </motion.span> / <span className="text-white font-bold">{posts.length}</span> articles
        </p>
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <Button variant="ghost" size="sm" onClick={clearFilters}
                className="h-8 text-xs font-bold text-gray-500 hover:text-cyber-cyan hover:bg-cyber-cyan/10 border border-cyber-cyan/20">
                <X className="mr-1 h-3 w-3" />
                CLEAR FILTERS
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence mode="wait">
        {filteredPosts.length > 0 ? (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}>
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="empty" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center space-y-6 py-20 text-center">
            <div className="relative">
              <Database className="h-20 w-20 text-cyber-cyan/30" />
              <motion.div className="absolute inset-0 blur-xl bg-cyber-cyan/20 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">NO DATA FOUND</h3>
              <p className="text-gray-500 max-w-md font-mono text-sm">
                [ Your search yielded no results. Try different keywords or clear filters ]
              </p>
            </div>

            <Button onClick={clearFilters}
              className="gap-2 bg-cyber-cyan/10 border-2 border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 font-bold">
              <X className="h-4 w-4" />
              RESET SEARCH
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
