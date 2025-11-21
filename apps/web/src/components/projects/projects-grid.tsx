"use client";

import { useState, useMemo } from "react";
import { Project } from "contentlayer/generated";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "./project-card";
import { Search, X, Filter, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectsGridProps {
  projects: Project[];
  allTags: string[];
  allStackItems: string[];
}

export function ProjectsGrid({ projects, allTags, allStackItems }: ProjectsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStack, setSelectedStack] = useState<string[]>([]);

  // Filter projects based on search and selected filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.stack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

      // Tag filter
      const matchesTags =
        selectedTags.length === 0 || selectedTags.some((tag) => project.tags.includes(tag));

      // Stack filter
      const matchesStack =
        selectedStack.length === 0 || selectedStack.some((tech) => project.stack.includes(tech));

      return matchesSearch && matchesTags && matchesStack;
    });
  }, [projects, searchQuery, selectedTags, selectedStack]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleStack = (tech: string) => {
    setSelectedStack((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedStack([]);
  };

  const hasActiveFilters =
    searchQuery !== "" || selectedTags.length > 0 || selectedStack.length > 0;

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-background/40 border-border/50 space-y-6 rounded-2xl border p-6 shadow-lg backdrop-blur-xl"
      >
        {/* Search */}
        <div className="relative max-w-2xl">
          <Search className="text-muted-foreground absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search projects by name, description, or technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background/60 border-border/60 focus:border-cyber-cyan/50 h-12 pl-12 text-base transition-colors"
          />
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSearchQuery("")}
              className="text-muted-foreground hover:text-foreground absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </div>

        {/* Filter Tags */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="text-cyber-cyan h-4 w-4" />
              <h3 className="text-sm font-semibold">Filter by Category</h3>
            </div>
            {hasActiveFilters && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="hover:bg-destructive/10 hover:text-destructive h-8 text-xs"
                >
                  <X className="mr-1 h-3 w-3" />
                  Clear all
                </Button>
              </motion.div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag, index) => {
              const isSelected = selectedTags.includes(tag);
              const variant = isSelected
                ? tag === "Featured"
                  ? "cyan"
                  : tag.includes("AI")
                    ? "magenta"
                    : "purple"
                : "outline";

              return (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Badge
                    variant={variant as any}
                    className="cursor-pointer px-4 py-2 text-sm font-medium transition-all hover:scale-105 active:scale-95"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag === "Featured" && <Sparkles className="mr-1 inline-block h-3 w-3" />}
                    {tag}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Filter Stack */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-cyber-purple h-1 w-1 rounded-full" />
            <h3 className="text-sm font-semibold">Filter by Technology</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {allStackItems.map((tech, index) => {
              const isSelected = selectedStack.includes(tech);
              return (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <Badge
                    variant={isSelected ? "default" : "outline"}
                    className="cursor-pointer px-3 py-1.5 text-xs transition-all hover:scale-105 active:scale-95"
                    onClick={() => toggleStack(tech)}
                  >
                    {tech}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-border/50 border-t pt-4"
          >
            <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
              <span className="font-medium">Active filters:</span>
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer gap-1"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
              {selectedStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="cursor-pointer gap-1"
                  onClick={() => toggleStack(tech)}
                >
                  {tech}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Results count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="border-border/50 flex items-center justify-between border-b pb-4"
      >
        <div className="flex items-center gap-3">
          <div className="from-cyber-cyan via-cyber-magenta to-cyber-purple h-8 w-1 rounded-full bg-gradient-to-b" />
          <p className="text-sm font-medium">
            {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}{" "}
            <span className="text-muted-foreground">
              {hasActiveFilters ? "match your filters" : "available"}
            </span>
          </p>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-16 text-center"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-4 inline-block"
            >
              <Search className="text-muted-foreground/30 h-16 w-16" />
            </motion.div>
            <h3 className="mb-2 text-xl font-semibold">No projects found</h3>
            <p className="text-muted-foreground mx-auto mb-6 max-w-md">
              We couldn&apos;t find any projects matching your criteria. Try adjusting your filters or
              search query.
            </p>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="hover:bg-cyber-cyan/10 hover:border-cyber-cyan/50 hover:text-cyber-cyan gap-2 transition-colors"
            >
              <X className="h-4 w-4" />
              Clear filters
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
