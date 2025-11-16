import { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import { BlogGrid } from "@/components/blog/blog-grid";

export const metadata: Metadata = {
  title: "Blog | Roshan Khatri",
  description:
    "Technical articles on full-stack development, AI/ML, 3D graphics, performance optimization, and modern web architecture.",
  openGraph: {
    title: "Blog | Roshan Khatri",
    description:
      "Technical articles on full-stack development, AI/ML, 3D graphics, performance optimization, and modern web architecture.",
    type: "website",
  },
};

export default function BlogPage() {
  // Sort posts by date (newest first)
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });

  // Extract unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  return (
    <div className="container py-12">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <span className="gradient-text">Blog</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Technical deep-dives, tutorials, and insights on building
          high-performance web applications.
        </p>
      </div>

      <BlogGrid posts={posts} allTags={allTags} />
    </div>
  );
}
