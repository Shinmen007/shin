import { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import { BlogGrid } from "@/components/blog/blog-grid";
import { BlogHero } from "@/components/blog/blog-hero";

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
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();

  return (
    <div className="min-h-screen bg-black">
      {/* Content */}
      <div className="relative">
        <BlogHero postsCount={posts.length} tagsCount={allTags.length} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <BlogGrid posts={posts} allTags={allTags} />
        </div>
      </div>
    </div>
  );
}
