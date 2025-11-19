"use client";

import Link from "next/link";
import { Post } from "contentlayer/generated";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  ArrowUp,
  Eye,
  TrendingUp,
  Zap,
  Check,
  Copy,
} from "lucide-react";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { PostCard } from "@/components/blog/post-card";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

interface PostDetailProps {
  post: Post;
  related?: Post[];
}

export function PostDetail({ post, related = [] }: PostDetailProps) {
  const MDXContent = useMDXComponent(post.body.code);
  const heroRef = useRef<HTMLDivElement>(null);

  // Custom code block component
  const CodeBlock = ({ className, children, ...props }: any) => {
    const [copied, setCopied] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    const getCodeText = () => {
      if (!children) return "";
      if (typeof children === "string") return children;
      if (children.props && children.props.children) {
        return children.props.children;
      }
      return "";
    };

    const handleCopy = async () => {
      const codeText = getCodeText();
      if (!codeText) return;

      try {
        await navigator.clipboard.writeText(codeText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    };

    return (
      <div className="group relative my-8">
        <pre
          className={`${className} border-border/40 bg-muted/50 relative overflow-x-auto rounded-xl border backdrop-blur-sm`}
          {...props}
        >
          {/* Code language indicator */}
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
            </div>
          </div>

          <div className="px-4 pb-4 pt-12">{children}</div>

          {/* Copy button */}
          {isClient && (
            <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                variant="ghost"
                size="sm"
                className="bg-background/90 border-border/40 hover:bg-cyber-cyan/10 hover:border-cyber-cyan/50 h-8 border px-3 text-xs backdrop-blur-sm"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="mr-1.5 h-3 w-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-1.5 h-3 w-3" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          )}
        </pre>
      </div>
    );
  };

  // Parallax scroll effect for hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Format publication date
  const publishDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readingTime = Math.ceil(post.readingTime.minutes);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ReadingProgress />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="border-cyber-cyan/30 bg-background/90 hover:bg-cyber-cyan/10 hover:border-cyber-cyan rounded-full shadow-lg backdrop-blur-sm transition-all"
            >
              <ArrowUp className="text-cyber-cyan h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Parallax */}
      <motion.div
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative overflow-hidden"
      >
        {/* Animated gradient background */}
        <div className="from-cyber-cyan/5 via-cyber-magenta/5 to-cyber-purple/5 animate-gradient-xy absolute inset-0 bg-gradient-to-br" />

        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-30">
          <div className="bg-cyber-cyan/10 absolute left-20 top-20 h-32 w-32 animate-pulse rounded-full blur-3xl" />
          <div
            className="bg-cyber-magenta/10 absolute right-32 top-40 h-40 w-40 animate-pulse rounded-full blur-3xl"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="bg-cyber-purple/10 absolute bottom-20 left-1/3 h-36 w-36 animate-pulse rounded-full blur-3xl"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

        <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
          >
            {/* Back link */}
            <motion.div variants={itemVariants}>
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-cyber-cyan group inline-flex items-center gap-2 text-sm font-medium transition-all duration-300"
              >
                <motion.div
                  animate={{ x: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-2" />
                </motion.div>
                <span className="relative">
                  Back to blog
                  <span className="bg-cyber-cyan absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            </motion.div>

            {/* Tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ scale: 1.05, rotate: 1, y: -2 }}
                >
                  <Badge className="from-cyber-cyan/15 to-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/30 hover:border-cyber-cyan/60 hover:shadow-cyber-cyan/20 cursor-pointer border bg-gradient-to-r px-3 py-1 text-xs font-semibold backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Title with multiple layers */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="relative inline-block">
                <span className="gradient-text animate-gradient from-cyber-cyan via-cyber-magenta to-cyber-purple bg-gradient-to-r bg-[length:200%_200%] bg-clip-text text-transparent">
                  {post.title}
                </span>

                {/* Multiple glow layers for depth */}
                <motion.div
                  className="from-cyber-cyan via-cyber-magenta to-cyber-purple absolute inset-0 -z-10 bg-gradient-to-r opacity-20 blur-2xl"
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <motion.div
                  className="from-cyber-purple via-cyber-cyan to-cyber-magenta absolute inset-0 -z-20 bg-gradient-to-r opacity-10 blur-3xl"
                  animate={{
                    opacity: [0.05, 0.2, 0.05],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                />
              </span>
            </motion.h1>

            {/* Summary */}
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground max-w-3xl text-lg font-light leading-relaxed sm:text-xl"
            >
              {post.summary}
            </motion.p>

            {/* Metadata Bar */}
            <motion.div variants={itemVariants} className="relative">
              <div className="from-background/60 to-background/40 border-border/40 shadow-cyber-cyan/5 flex flex-wrap items-center gap-4 rounded-xl border bg-gradient-to-br p-4 shadow-xl backdrop-blur-xl sm:gap-6 sm:p-6">
                {/* Published date */}
                <motion.div
                  className="flex items-center gap-2.5 text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-cyber-cyan/10 border-cyber-cyan/20 rounded-lg border p-2">
                    <Calendar className="text-cyber-cyan h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground/70 text-xs uppercase tracking-wide">
                      Published
                    </span>
                    <time dateTime={post.publishedAt} className="text-foreground font-medium">
                      {publishDate}
                    </time>
                  </div>
                </motion.div>

                {/* Divider */}
                <div className="via-border hidden h-10 w-px bg-gradient-to-b from-transparent to-transparent sm:block" />

                {/* Reading time */}
                <motion.div
                  className="flex items-center gap-2.5 text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-cyber-magenta/10 border-cyber-magenta/20 rounded-lg border p-2">
                    <Clock className="text-cyber-magenta h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground/70 text-xs uppercase tracking-wide">
                      Duration
                    </span>
                    <span className="text-foreground font-medium">
                      {readingTime} min read
                    </span>
                  </div>
                </motion.div>

                {/* Divider */}
                <div className="via-border hidden h-10 w-px bg-gradient-to-b from-transparent to-transparent sm:block" />

                {/* Share button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-auto"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-cyber-cyan/30 hover:bg-cyber-cyan/10 hover:text-cyber-cyan hover:border-cyber-cyan/50 gap-2 shadow-lg backdrop-blur-sm transition-all duration-300"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: post.title,
                          text: post.summary,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                      }
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                </motion.div>
              </div>

              {/* Decorative glow */}
              <div className="from-cyber-cyan/20 via-cyber-magenta/20 to-cyber-purple/20 absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>

            {/* Divider with animation */}
            <motion.div variants={itemVariants} className="relative h-px">
              <div className="via-border absolute inset-0 bg-gradient-to-r from-transparent to-transparent" />
              <motion.div
                className="via-cyber-cyan absolute inset-0 bg-gradient-to-r from-transparent to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* MDX Content with enhanced styling */}
          <motion.div
            variants={itemVariants}
            className="prose prose-lg prose-neutral dark:prose-invert max-w-none
              prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-5xl prose-h1:mb-8 prose-h1:mt-12
              prose-h2:text-4xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border/40 prose-h2:text-foreground
              prose-h3:text-3xl prose-h3:mb-4 prose-h3:mt-10 prose-h3:text-foreground
              prose-p:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:mb-6
              prose-a:text-cyber-cyan prose-a:font-semibold prose-a:no-underline prose-a:decoration-cyber-cyan/30 prose-a:underline-offset-4 hover:prose-a:underline prose-a:transition-all
              prose-strong:text-foreground prose-strong:font-bold
              prose-blockquote:border-l-4 prose-blockquote:border-cyber-cyan prose-blockquote:bg-cyber-cyan/5 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:not-italic prose-blockquote:shadow-lg prose-blockquote:shadow-cyber-cyan/5 prose-blockquote:text-foreground
              prose-code:text-cyber-magenta prose-code:bg-cyber-magenta/10 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-semibold prose-code:text-sm prose-code:border prose-code:border-cyber-magenta/20 prose-code:before:content-[''] prose-code:after:content-['']
              prose-li:my-2 prose-li:text-muted-foreground prose-li:marker:text-cyber-cyan
              prose-ul:my-6 prose-ol:my-6
              prose-img:rounded-2xl prose-img:shadow-2xl prose-img:border prose-img:border-border/40 prose-img:my-10
              prose-hr:border-border/40 prose-hr:my-12
              prose-table:border prose-table:border-border/40 prose-table:rounded-xl prose-table:overflow-hidden
              prose-th:bg-muted/50 prose-th:p-4 prose-th:text-foreground
              prose-td:p-4 prose-td:text-muted-foreground"
          >
            <MDXContent components={{ pre: CodeBlock }} />
          </motion.div>

          {/* Article Footer */}
          <motion.div variants={itemVariants} className="mt-20 space-y-8">
            {/* Premium divider */}
            <div className="relative my-12 h-px">
              <div className="via-border absolute inset-0 bg-gradient-to-r from-transparent to-transparent" />
              <div className="via-cyber-purple/30 absolute inset-0 bg-gradient-to-r from-transparent to-transparent" />
            </div>

            <div className="from-muted/30 to-muted/10 border-border/40 flex flex-wrap items-center justify-between gap-6 rounded-2xl border bg-gradient-to-br p-8 backdrop-blur-sm">
              <div className="space-y-3">
                <p className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">
                  Topics Covered
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <motion.div
                      key={tag}
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={`/blog?tag=${tag}`}>
                        <Badge
                          variant="outline"
                          className="hover:bg-cyber-cyan/10 hover:text-cyber-cyan hover:border-cyber-cyan/50 cursor-pointer px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all duration-300"
                        >
                          #{tag}
                        </Badge>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="default"
                  className="from-cyber-cyan to-cyber-magenta hover:shadow-cyber-cyan/30 gap-2 bg-gradient-to-r transition-all duration-300 hover:shadow-lg"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <ArrowUp className="h-4 w-4" />
                  Back to top
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.article>
      </div>

      {/* Related Articles Section */}
      <AnimatePresence>
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden py-24"
          >
            {/* Background decoration */}
            <div className="via-muted/20 absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Section Header */}
              <motion.div
                className="mb-16 space-y-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="bg-cyber-cyan/10 border-cyber-cyan/20 text-cyber-cyan inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold"
                  whileHover={{ scale: 1.05 }}
                >
                  <TrendingUp className="h-4 w-4" />
                  Keep Reading
                </motion.div>

                <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                  <span className="gradient-text animate-gradient from-cyber-cyan via-cyber-magenta to-cyber-purple bg-gradient-to-r bg-clip-text text-transparent">
                    Related Articles
                  </span>
                </h2>

                <p className="text-muted-foreground mx-auto max-w-2xl text-lg sm:text-xl">
                  Continue your journey with these handpicked articles
                </p>
              </motion.div>

              {/* Articles Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {related.map((p, index) => (
                  <motion.div
                    key={p.slug}
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PostCard post={p} />
                  </motion.div>
                ))}
              </motion.div>

              {/* View all link */}
              <motion.div
                className="mt-16 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/blog">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-cyber-cyan/30 hover:bg-cyber-cyan hover:text-background hover:border-cyber-cyan group gap-2 shadow-lg backdrop-blur-sm transition-all duration-300"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View all articles</span>
                    <Zap className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
