import { Metadata } from "next";
import { ResumeContent } from "@/components/resume/resume-content";

export const metadata: Metadata = {
  title: "Resume | Roshan Khatri",
  description:
    "Professional resume and career history of Roshan Khatri - Full-Stack Developer with 4 years of experience in React, Next.js, TypeScript, and modern web technologies.",
  openGraph: {
    title: "Resume | Roshan Khatri",
    description:
      "Professional resume and career history of Roshan Khatri - Full-Stack Developer specializing in React, Next.js, and scalable web applications.",
    type: "profile",
  },
};

export default function ResumePage() {
  return <ResumeContent />;
}
