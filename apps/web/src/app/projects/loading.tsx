import { SkeletonHero, SkeletonProjectGrid } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="relative min-h-screen">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-cyber-cyan/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyber-magenta/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyber-purple/10 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <SkeletonHero />
        <div className="py-12">
          <SkeletonProjectGrid />
        </div>
      </div>
    </div>
  );
}
