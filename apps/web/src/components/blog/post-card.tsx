import Link from "next/link";
import { Post } from "contentlayer/generated";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const publishDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group relative overflow-hidden transition-all duration-300 border-border/60 hover:border-cyber-cyan/50 hover:shadow-[0_0_0_1px_var(--cyber-cyan),0_8px_24px_-8px_rgba(0,255,255,0.3)]">
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-cyber-cyan/10 via-transparent to-cyber-magenta/10" />
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.publishedAt}>{publishDate}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{Math.ceil(post.readingTime.minutes)} min</span>
            </div>
          </div>
          <h2 className="text-xl font-semibold leading-snug tracking-tight group-hover:text-cyber-cyan transition-colors">
            {post.title}
          </h2>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {post.summary}
            </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="cyan"
                className="text-[10px] tracking-wide font-medium border-cyber-cyan/40 bg-cyber-cyan/5 group-hover:bg-cyber-cyan/10"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
