import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="border-b border-border/20 bg-muted/5 py-24">
        <div className="container mx-auto max-w-5xl space-y-8">
          <Skeleton className="h-4 w-24" />
          <div className="flex flex-wrap gap-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-20" />
            ))}
          </div>
          <Skeleton className="h-16 w-full max-w-3xl md:h-20" />
          <Skeleton className="h-6 w-full max-w-2xl" />
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-20 w-40" />
            <Skeleton className="h-20 w-40" />
            <Skeleton className="ml-auto h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <article className="container mx-auto max-w-4xl px-4 py-16">
        <div className="space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <Skeleton className="mt-8 h-64 w-full rounded-xl" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </article>
    </div>
  );
}
