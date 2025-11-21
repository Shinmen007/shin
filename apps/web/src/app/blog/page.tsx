import { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import { BlogGrid } from "@/components/blog/blog-grid";
import { BlogHero } from "@/components/blog/blog-hero";
import { CyberpunkHero3D } from "@/components/hero/cyberpunk-hero-3d";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog | Roshan Khatri",
  description:
    "Technical articles on full-stack development, AI/ML, 3D graphics, performance optimization, and modern web architecture.",
};

export default function BlogPage() {
  // Sort posts by date (newest first)
  const sortedPosts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });

  const featuredPost = sortedPosts[0];
  const remainingPosts = sortedPosts.slice(1);

  // Extract unique tags
  const allTags = Array.from(new Set(sortedPosts.flatMap((post) => post.tags))).sort();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
       {/* Animated Background */}
       <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-30">
          <CyberpunkHero3D />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <BlogHero postsCount={sortedPosts.length} tagsCount={allTags.length} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Featured Post Section */}
          {featuredPost && (
            <div className="mb-24">
              <div className="flex items-center gap-2 mb-8">
                <Sparkles className="h-5 w-5 text-cyber-cyan" />
                <h2 className="text-xl font-bold tracking-widest text-cyber-cyan uppercase">Featured Article</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-cyber-cyan/50 to-transparent" />
              </div>
              
              <div className="group relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Featured Post Image/Visual */}
                <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-cyber-cyan/50 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/20 via-cyber-magenta/20 to-cyber-purple/20 opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {/* Abstract 3D-like Graphic for Featured Post */}
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-32 h-32 md:w-48 md:h-48">
                        <div className="absolute inset-0 border-4 border-cyber-cyan/30 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-4 border-4 border-cyber-magenta/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                        <div className="absolute inset-8 border-4 border-cyber-purple/30 rounded-full animate-[spin_20s_linear_infinite]" />
                      </div>
                   </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>

                {/* Featured Post Content */}
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {featuredPost.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-cyber-cyan/30 text-cyber-cyan bg-cyber-cyan/10">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h1 className="text-4xl md:text-5xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 group-hover:from-cyber-cyan group-hover:via-white group-hover:to-cyber-magenta transition-all duration-500">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h1>

                  <p className="text-lg text-gray-400 leading-relaxed line-clamp-3">
                    {featuredPost.summary}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-gray-500 font-mono">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", { dateStyle: "long" })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readingTime?.text || "5 min read"}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <Button size="lg" className="bg-white text-black hover:bg-cyber-cyan hover:text-black font-bold transition-all duration-300 group-hover:scale-105">
                        Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Remaining Posts Grid */}
          <BlogGrid posts={remainingPosts} allTags={allTags} />
        </div>
      </div>
    </div>
  );
}
