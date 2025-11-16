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

export function ProjectsGrid({
  projects,
  allTags,
  allStackItems,
}: ProjectsGridProps) {
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
        project.stack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Tag filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => project.tags.includes(tag));

      // Stack filter
      const matchesStack =
        selectedStack.length === 0 ||
        selectedStack.some((tech) => project.stack.includes(tech));

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
    searchQuery !== "" ||
    selectedTags.length > 0 ||
    selectedStack.length > 0;

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 bg-background/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-lg"
      >
        {/* Search */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search projects by name, description, or technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-base bg-background/60 border-border/60 focus:border-cyber-cyan/50 transition-colors"
          />
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </div>

        {/* Filter Tags */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-cyber-cyan" />
              <h3 className="text-sm font-semibold">Filter by Category</h3>
            </div>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-8 text-xs hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-3 w-3 mr-1" />
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
                    className="cursor-pointer transition-all hover:scale-105 active:scale-95 px-4 py-2 text-sm font-medium"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag === "Featured" && (
                      <Sparkles className="h-3 w-3 mr-1 inline-block" />
                    )}
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
            <div className="h-1 w-1 rounded-full bg-cyber-purple" />
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
                    className="cursor-pointer transition-all hover:scale-105 active:scale-95 px-3 py-1.5 text-xs"
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
            className="pt-4 border-t border-border/50"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium">Active filters:</span>
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="gap-1 cursor-pointer"
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
                  className="gap-1 cursor-pointer"
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
        className="flex items-center justify-between border-b border-border/50 pb-4"
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-gradient-to-b from-cyber-cyan via-cyber-magenta to-cyber-purple rounded-full" />
          <p className="text-sm font-medium">
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}{" "}
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
            className="text-center py-16 px-4"
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
              className="inline-block mb-4"
            >
              <Search className="h-16 w-16 text-muted-foreground/30" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We couldn't find any projects matching your criteria. Try adjusting your filters or search query.
            </p>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="gap-2 hover:bg-cyber-cyan/10 hover:border-cyber-cyan/50 hover:text-cyber-cyan transition-colors"
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
