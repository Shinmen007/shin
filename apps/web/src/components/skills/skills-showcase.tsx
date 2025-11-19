"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  level: number; // 0-100
  category: "frontend" | "backend" | "devops" | "languages" | "tools";
  icon?: string;
}

const skills: Skill[] = [
  // Frontend
  { name: "React", level: 95, category: "frontend" },
  { name: "Next.js", level: 95, category: "frontend" },
  { name: "TypeScript", level: 90, category: "frontend" },
  { name: "Three.js", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 95, category: "frontend" },
  { name: "Vue.js", level: 80, category: "frontend" },
  { name: "Redux", level: 85, category: "frontend" },
  { name: "Zustand", level: 90, category: "frontend" },

  // Backend
  { name: "Node.js", level: 90, category: "backend" },
  { name: "Express", level: 90, category: "backend" },
  { name: "PostgreSQL", level: 85, category: "backend" },
  { name: "MongoDB", level: 85, category: "backend" },
  { name: "Redis", level: 80, category: "backend" },
  { name: "GraphQL", level: 85, category: "backend" },
  { name: "REST APIs", level: 95, category: "backend" },
  { name: "Prisma", level: 90, category: "backend" },

  // DevOps & Tools
  { name: "Docker", level: 85, category: "devops" },
  { name: "AWS", level: 80, category: "devops" },
  { name: "Vercel", level: 95, category: "devops" },
  { name: "GitHub Actions", level: 85, category: "devops" },
  { name: "Terraform", level: 75, category: "devops" },
  { name: "Kubernetes", level: 70, category: "devops" },

  // Languages
  { name: "JavaScript", level: 95, category: "languages" },
  { name: "TypeScript", level: 95, category: "languages" },
  { name: "Python", level: 85, category: "languages" },
  { name: "Go", level: 75, category: "languages" },
  { name: "SQL", level: 85, category: "languages" },
  { name: "HTML/CSS", level: 95, category: "languages" },

  // Tools
  { name: "Git", level: 95, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Figma", level: 80, category: "tools" },
  { name: "Linear", level: 90, category: "tools" },
  { name: "Notion", level: 85, category: "tools" },
  { name: "Postman", level: 90, category: "tools" },
];

const categories = [
  { id: "all", label: "All Skills", color: "cyan" },
  { id: "frontend", label: "Frontend", color: "cyan" },
  { id: "backend", label: "magenta" },
  { id: "devops", label: "DevOps", color: "purple" },
  { id: "languages", label: "Languages", color: "success" },
  { id: "tools", label: "Tools", color: "muted" },
] as const;

export function SkillsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  const getSkillColor = (category: Skill["category"]) => {
    switch (category) {
      case "frontend":
        return "cyan";
      case "backend":
        return "magenta";
      case "devops":
        return "purple";
      case "languages":
        return "success";
      case "tools":
        return "muted";
      default:
        return "default";
    }
  };

  const getLevelLabel = (level: number) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Proficient";
    return "Intermediate";
  };

  return (
    <div className="space-y-8">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300",
              "border-2 hover:scale-105 active:scale-95",
              selectedCategory === category.id
                ? "border-cyber-cyan bg-cyber-cyan/20 text-cyber-cyan shadow-cyber-cyan/20 shadow-lg"
                : "border-border bg-background/50 text-muted-foreground hover:border-cyber-cyan/50 hover:text-foreground"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredSkills.map((skill) => {
          const isHovered = hoveredSkill === skill.name;
          const color = getSkillColor(skill.category);

          return (
            <Card
              key={skill.name}
              className={cn(
                "group relative overflow-hidden transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-lg",
                isHovered && "ring-cyber-cyan ring-offset-background ring-2 ring-offset-2"
              )}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Gradient Background */}
              <div
                className={cn(
                  "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  color === "cyan" && "from-cyber-cyan/10 bg-gradient-to-br to-transparent",
                  color === "magenta" && "from-cyber-magenta/10 bg-gradient-to-br to-transparent",
                  color === "purple" && "from-cyber-purple/10 bg-gradient-to-br to-transparent",
                  color === "success" && "from-success/10 bg-gradient-to-br to-transparent"
                )}
              />

              <CardContent className="relative space-y-4 p-6">
                {/* Skill Name & Badge */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-foreground group-hover:text-cyber-cyan font-semibold transition-colors">
                    {skill.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      color === "cyan" && "border-cyber-cyan/50 text-cyber-cyan",
                      color === "magenta" && "border-cyber-magenta/50 text-cyber-magenta",
                      color === "purple" && "border-cyber-purple/50 text-cyber-purple",
                      color === "success" && "border-success/50 text-success"
                    )}
                  >
                    {getLevelLabel(skill.level)}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="text-muted-foreground flex justify-between text-xs">
                    <span>Proficiency</span>
                    <span className="text-foreground font-medium">{skill.level}%</span>
                  </div>
                  <div className="bg-muted relative h-2 w-full overflow-hidden rounded-full">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500 ease-out",
                        color === "cyan" && "from-cyber-cyan to-cyber-cyan/80 bg-gradient-to-r",
                        color === "magenta" &&
                          "from-cyber-magenta to-cyber-magenta/80 bg-gradient-to-r",
                        color === "purple" &&
                          "from-cyber-purple to-cyber-purple/80 bg-gradient-to-r",
                        color === "success" && "from-success to-success/80 bg-gradient-to-r",
                        isHovered && "shadow-lg"
                      )}
                      style={{
                        width: `${skill.level}%`,
                        boxShadow: isHovered
                          ? `0 0 10px ${
                              color === "cyan"
                                ? "rgba(0, 245, 255, 0.5)"
                                : color === "magenta"
                                  ? "rgba(255, 0, 255, 0.5)"
                                  : color === "purple"
                                    ? "rgba(157, 0, 255, 0.5)"
                                    : "rgba(0, 255, 136, 0.5)"
                            }`
                          : undefined,
                      }}
                    />
                  </div>
                </div>

                {/* Category Label */}
                <div className="text-muted-foreground text-xs uppercase tracking-wider">
                  {skill.category}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Skills Summary */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-cyber-cyan/30 bg-cyber-cyan/5">
          <CardContent className="p-6 text-center">
            <div className="text-cyber-cyan text-3xl font-bold">
              {skills.filter((s) => s.category === "frontend").length}
            </div>
            <div className="text-muted-foreground text-sm">Frontend Technologies</div>
          </CardContent>
        </Card>

        <Card className="border-cyber-magenta/30 bg-cyber-magenta/5">
          <CardContent className="p-6 text-center">
            <div className="text-cyber-magenta text-3xl font-bold">
              {skills.filter((s) => s.category === "backend").length}
            </div>
            <div className="text-muted-foreground text-sm">Backend Technologies</div>
          </CardContent>
        </Card>

        <Card className="border-cyber-purple/30 bg-cyber-purple/5">
          <CardContent className="p-6 text-center">
            <div className="text-cyber-purple text-3xl font-bold">
              {skills.filter((s) => s.category === "devops").length}
            </div>
            <div className="text-muted-foreground text-sm">DevOps Tools</div>
          </CardContent>
        </Card>

        <Card className="border-success/30 bg-success/5">
          <CardContent className="p-6 text-center">
            <div className="text-success text-3xl font-bold">
              {skills.filter((s) => s.level >= 90).length}
            </div>
            <div className="text-muted-foreground text-sm">Expert Level Skills</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
