"use client";

import dynamic from "next/dynamic";
import { ResumeHero } from "@/components/resume/resume-hero";

// Dynamic imports for heavy animated components
const Experience = dynamic(() => import("@/components/resume/experience").then(mod => mod.Experience), {
  loading: () => <div className="min-h-[600px] bg-black/50 animate-pulse rounded-xl" />,
  ssr: false,
});

const Education = dynamic(() => import("@/components/resume/education").then(mod => mod.Education), {
  loading: () => <div className="min-h-[400px] bg-black/50 animate-pulse rounded-xl" />,
  ssr: false,
});

const Skills = dynamic(() => import("@/components/resume/skills").then(mod => mod.Skills), {
  loading: () => <div className="min-h-[800px] bg-black/50 animate-pulse rounded-xl" />,
  ssr: false,
});

const Certifications = dynamic(() => import("@/components/resume/certifications").then(mod => mod.Certifications), {
  loading: () => <div className="min-h-[500px] bg-black/50 animate-pulse rounded-xl" />,
  ssr: false,
});

export function ResumeContent() {
  return (
    <div className="min-h-screen bg-black">
      <ResumeHero />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-24">
        <Experience />
        <Education />
        <Skills />
        <Certifications />
      </div>
    </div>
  );
}
