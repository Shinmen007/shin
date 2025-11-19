"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Post error:", error);
  }, [error]);

  return (
    <div className="container flex min-h-screen items-center justify-center py-12">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>

        <h1 className="mb-4 text-3xl font-bold">Failed to load article</h1>

        <p className="text-muted-foreground mb-8 text-lg">
          We encountered an error while loading this article. Please try again or return to the blog.
        </p>

        {error.message && (
          <div className="bg-muted/50 mb-8 rounded-lg border p-4">
            <p className="text-muted-foreground text-sm font-mono">{error.message}</p>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={reset}
            className="gap-2"
            variant="default"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>

          <Button
            asChild
            variant="outline"
            className="gap-2"
          >
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
