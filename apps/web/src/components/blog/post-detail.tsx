"use client";

import { Post } from "contentlayer/generated";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { PostCard } from "@/components/blog/post-card";

interface PostDetailProps {
  post: Post;
  related?: Post[];
}

export function PostDetail({ post, related = [] }: PostDetailProps) {
  const MDXContent = useMDXComponent(post.body.code);

  // Format publication date
  const publishDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <ReadingProgress />
      <article className="container py-12 max-w-4xl">
      {/* Header */}
      <header className="space-y-6 mb-12">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to blog
        </Link>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.publishedAt}>{publishDate}</time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{Math.ceil(post.readingTime.minutes)} min read</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <span className="gradient-text">{post.title}</span>
        </h1>

        {/* Summary */}
        <p className="text-xl text-muted-foreground">{post.summary}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-sm">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

        {/* MDX Content */}
        <div className="prose prose-neutral dark:prose-invert prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-headings:gradient-text prose-a:text-cyber-cyan prose-a:no-underline hover:prose-a:underline prose-code:text-cyber-magenta prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] max-w-none">
          <MDXContent />
        </div>
      </article>
      {related.length > 0 && (
        <div className="container max-w-6xl pb-20">
          <div className="mb-8 mt-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              <span className="gradient-text">Related Articles</span>
            </h2>
            <Link
              href="/blog"
              className="text-sm text-cyber-cyan hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
