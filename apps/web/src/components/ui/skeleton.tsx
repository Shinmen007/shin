import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      animate={{
        backgroundColor: [
          "hsl(220, 10%, 20%)",
          "hsl(220, 10%, 15%)",
          "hsl(220, 10%, 20%)",
        ],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      {...(props as any)}
    />
  );
}

const SkeletonHero = () => {
  return (
    <div className="min-h-[50vh] space-y-8 pt-20">
      <div className="flex justify-center">
        <Skeleton className="h-6 w-48 rounded-full" />
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-10 w-[500px] max-w-full rounded-xl" />
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-16 w-[600px] max-w-full rounded-lg" />
      </div>
      <div className="flex justify-center space-x-4 pt-10">
        <Skeleton className="h-10 w-24 rounded-full" />
        <Skeleton className="h-10 w-24 rounded-full" />
        <Skeleton className="h-10 w-24 rounded-full" />
      </div>
    </div>
  );
};

const SkeletonBlogGrid = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border-border/40 bg-background/50 rounded-xl border backdrop-blur-sm h-80">
          <div className="p-6 space-y-4">
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-4 bg-muted rounded w-4/6 mt-2" />
            <div className="flex space-x-2 mt-4">
              <div className="h-6 w-16 bg-muted rounded-full" />
              <div className="h-6 w-16 bg-muted rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SkeletonProjectGrid = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border-border/40 bg-background/50 rounded-xl border backdrop-blur-sm h-80">
          <div className="p-6 space-y-4">
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-4 bg-muted rounded w-4/6 mt-2" />
            <div className="flex space-x-2 mt-4">
              <div className="h-6 w-16 bg-muted rounded-full" />
              <div className="h-6 w-16 bg-muted rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { 
  Skeleton, 
  SkeletonHero, 
  SkeletonBlogGrid, 
  SkeletonProjectGrid 
};
