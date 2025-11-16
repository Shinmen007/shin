import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Send,
  MapPin,
  Clock,
  MessageSquare,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Roshan Khatri",
  description:
    "Get in touch with Roshan Khatri for collaboration, project inquiries, or just to say hello.",
  openGraph: {
    title: "Contact | Roshan Khatri",
    description:
      "Get in touch with Roshan Khatri for collaboration, project inquiries, or just to say hello.",
    type: "website",
  },
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@roshankhatri.dev",
      href: "mailto:hello@roshankhatri.dev",
      description: "Best for detailed inquiries",
      color: "cyan",
    },
    {
      icon: Github,
      title: "GitHub",
      value: "@roshankhatri",
      href: "https://github.com/roshankhatri",
      description: "Check out my code",
      color: "magenta",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "Roshan Khatri",
      href: "https://linkedin.com/in/roshankhatri",
      description: "Let's connect professionally",
      color: "purple",
    },
  ];

  const quickInfo = [
    {
      icon: MapPin,
      label: "Location",
      value: "Available Remote",
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24 hours",
    },
    {
      icon: MessageSquare,
      label: "Availability",
      value: "Open for opportunities",
    },
  ];

  const workTypes = [
    "Full-time positions",
    "Contract projects",
    "Consulting opportunities",
    "Open source collaboration",
    "Speaking engagements",
    "Technical writing",
  ];

  return (
    <div className="relative overflow-hidden bg-black">
      {/* Void black background just for contact page */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-black" />

      <div className="relative z-10 container py-12 max-w-6xl">
        {/* Hero Section */}
        <section className="mb-14 space-y-8 border-t border-slate-900/80 pt-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/60 bg-black/80 px-4 py-2 text-xs font-medium text-slate-300 shadow-[0_0_30px_rgba(0,255,255,0.35)] backdrop-blur-lg">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                </span>
                <span>Currently open for new opportunities</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-[2.9rem] sm:text-[3.5rem] md:text-[4rem] font-bold leading-tight tracking-tight">
                  <span className="gradient-text">Let's Create Something Great</span>
                </h1>
                <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                  Share your idea, product, or challenge and I'll help you turn it into a polished, performant experience.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/50 bg-slate-950/80 px-4 py-2 shadow-[0_0_40px_rgba(0,255,255,0.35)]">
                  <Button size="sm" variant="neon" className="group shadow-none">
                    <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Start a conversation
                  </Button>
                  <span className="text-xs text-slate-300">Replies within 24 hours</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <Card className="relative border-slate-900/90 bg-black/90 backdrop-blur-2xl overflow-hidden shadow-[0_0_40px_rgba(15,23,42,0.9)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500 animate-gradient" />
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Snapshot</p>
                      <CardTitle className="text-lg text-slate-50">Contact Overview</CardTitle>
                    </div>
                    <Badge variant="cyan" className="px-3 py-1 text-[11px]">
                      Available
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {quickInfo.map((info) => (
                      <div
                        key={info.label}
                        className="group flex items-center gap-3 rounded-xl border border-slate-900 bg-slate-950/80 p-3 transition-all hover:border-cyan-400/80 hover:bg-cyan-500/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/40">
                          <info.icon className="h-4 w-4 text-cyan-300" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                            {info.label}
                          </p>
                          <p className="text-sm font-medium text-slate-100">{info.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-slate-900 bg-gradient-to-r from-cyan-500/18 via-slate-950/85 to-purple-500/18 p-4 text-xs text-slate-300 shadow-[0_0_32px_rgba(15,23,42,0.9)]">
                    <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300">
                      <Sparkles className="h-3 w-3" />
                      Collaboration Fit
                    </div>
                    <p className="mt-2 leading-relaxed">
                      I focus on building polished, performant experiences with a strong eye for detail
                      and thoughtful UX. Let's make something that feels as good as it looks.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <div className="relative my-4">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800/90 to-transparent" />
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Contact Form - Takes up more space */}
          <div className="lg:col-span-3 space-y-8">
            <Card className="border-slate-900/90 bg-black/90 backdrop-blur-2xl shadow-[0_0_72px_rgba(15,23,42,1)]">
              <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500 animate-gradient" />
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl flex items-center gap-2 text-slate-50">
                      <span className="relative flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/60 bg-cyan-500/15 shadow-[0_0_18px_rgba(0,255,255,0.35)]">
                        <Sparkles className="h-3 w-3 text-cyan-300" />
                      </span>
                      Send me a message
                    </CardTitle>
                    <CardDescription className="text-base text-slate-300">
                      Tell me a bit about what you're working on and how I can help.
                    </CardDescription>
                  </div>
                  <div className="hidden sm:flex flex-col items-end gap-1 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Typically replies in &lt; 24 hours</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-slate-100"
                      >
                        Name <span className="text-rose-400">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        className="bg-slate-950/80 border-slate-800/80 text-slate-50 placeholder:text-slate-500 focus:border-cyan-400/80 focus-visible:ring-cyan-400/80"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-slate-100"
                      >
                        Email <span className="text-rose-400">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="bg-slate-950/80 border-slate-800/80 text-slate-50 placeholder:text-slate-500 focus:border-cyan-400/80 focus-visible:ring-cyan-400/80"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-slate-100"
                    >
                      Subject <span className="text-rose-400">*</span>
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Project inquiry, collaboration, speaking..."
                      required
                      className="bg-slate-950/80 border-slate-800/80 text-slate-50 placeholder:text-slate-500 focus:border-cyan-400/80 focus-visible:ring-cyan-400/80"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-slate-100"
                    >
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project, timeline, and what you're looking to achieve..."
                      required
                      rows={8}
                      className="bg-slate-950/80 border-slate-800/80 text-slate-50 placeholder:text-slate-500 focus:border-cyan-400/80 focus-visible:ring-cyan-400/80 resize-none"
                    />
                    <p className="text-[11px] text-slate-400">
                      I'll only use this information to respond to your inquiry.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                      type="submit"
                      size="lg"
                      variant="neon"
                      className="w-full sm:w-auto group shadow-[0_0_48px_rgba(0,255,255,0.6)]"
                    >
                      <span className="flex items-center">
                        <Send className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        Send message
                      </span>
                    </Button>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-700 bg-slate-950/80">
                        <CheckCircle2 className="h-3 w-3 text-cyan-300" />
                      </div>
                      <span>No spam. No newsletter. Just a direct reply.</span>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Work Types */}
            <Card className="border-slate-900/80 bg-slate-950/85 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-xl text-slate-50">I'm open to</CardTitle>
                <CardDescription className="text-slate-300">
                  Here are the types of opportunities I'm interested in:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {workTypes.map((type) => (
                    <div key={type} className="flex items-center gap-2 text-slate-200">
                      <CheckCircle2 className="h-5 w-5 text-cyan-300 flex-shrink-0" />
                      <span className="text-sm">{type}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Methods Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-50">
                <span className="gradient-text">Other ways to reach me</span>
              </h2>
              <p className="text-slate-300">
                Prefer a different channel? Reach out through any of these platforms:
              </p>
            </div>

            <div className="space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block group"
                >
                  <Card className="border-slate-900/80 bg-slate-950/85 backdrop-blur-xl hover:border-cyan-400/80 hover:shadow-[0_0_40px_rgba(0,255,255,0.45)] transition-all duration-300 hover:-translate-y-0.5">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`h-12 w-12 rounded-xl bg-cyber-${method.color}/20 border border-cyber-${method.color}/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <method.icon className={`h-6 w-6 text-cyber-${method.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-slate-50 group-hover:text-cyan-300 transition-colors">
                              {method.title}
                            </h3>
                            <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>
                          <p className="text-sm text-slate-300 mb-1 break-all">{method.value}</p>
                          <p className="text-xs text-slate-400">{method.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>

            {/* Info Card */}
            <Card className="border-cyan-500/50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,255,255,0.3)]">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300">
                  <Sparkles className="h-5 w-5" />
                  <h3 className="font-semibold">Quick response, thoughtful answers</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  I typically respond to all inquiries within 24 hours. If you don't hear back from me,
                  please check your spam folder or try reaching out through a different channel.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-14 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold md:text-4xl text-slate-50">
              <span className="gradient-text">Frequently Asked Questions</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Here are some common questions I receive. Don't see yours? Feel free to ask.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Card className="border-slate-900/80 bg-slate-950/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-lg text-slate-50">
                  What's your typical project timeline?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Project timelines vary based on scope and complexity. Small projects may take 2-4 weeks,
                  while larger applications can take 2-6 months. I'll provide a detailed timeline after
                  understanding your requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-900/80 bg-slate-950/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-lg text-slate-50">Do you work with startups?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Absolutely. I love working with startups and helping bring innovative ideas to life.
                  I'm flexible with engagement models and can discuss equity arrangements for the right
                  opportunity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-900/80 bg-slate-950/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-lg text-slate-50">What technologies do you work with?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  I specialize in React, Next.js, TypeScript, Node.js, and Three.js. I'm also experienced
                  with various databases, cloud platforms, and modern development tools. Check out my
                  Projects page for examples of my work.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-900/80 bg-slate-950/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-lg text-slate-50">Are you available for remote work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Yes. I work remotely with clients and teams worldwide. I'm comfortable with various
                  time zones and use modern collaboration tools to ensure smooth communication and
                  project delivery.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="mt-10 h-24 w-full bg-gradient-to-b from-transparent via-black/60 to-black" />
      </div>
    </div>
  );
}
