"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// no separate Button usage; CTA is rendered as a styled anchor
import { Mail, Github, Linkedin, Send, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

// Enhanced Contact Page with cleaner UI and glassy effects
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

  const workTypes = [
    "Full-time positions",
    "Contract projects",
    "Consulting opportunities",
    "Open source collaboration",
    "Speaking engagements",
    "Technical writing",
  ];

  // Form state and validation
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.match(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/)) next.email = "Valid email is required";
    if (!form.subject.trim()) next.subject = "Subject is required";
    if (!form.message.trim() || form.message.trim().length < 10)
      next.message = "Message should be at least 10 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      if ((window as any).toast?.success) {
        (window as any).toast.success(
          "Message sent",
          "Thanks for reaching out. I'll get back to you soon."
        );
      }
    }, 600);
  };

  const inputBase =
    "rounded border-slate-800/80 bg-slate-950/80 p-2 text-slate-50 placeholder:text-slate-500 focus:border-cyan-400/80 focus-visible:ring-cyan-400/80";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      {/* decorative header */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="h-80 w-80 -translate-x-40 -translate-y-40 rounded-full bg-cyan-500/20 blur-2xl" />
        <div className="h-72 w-72 -translate-x-20 -translate-y-20 rounded-full bg-purple-500/20 blur-2xl" />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <section className="mb-12">
          <div className="max-w-2xl">
            <h1 className="gradient-text text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Let's Create Something Great
            </h1>
            <p className="mt-4 text-slate-300/90">
              Share your idea, product, or challenge and I’ll help you turn it into a polished,
              performant experience.
            </p>
            <div className="mt-6">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 font-semibold text-white hover:shadow-lg"
              >
                <Send className="h-5 w-5" />
                Start a conversation
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <div className="col-span-3">
            <Card className="border-slate-800/60 bg-black/70 shadow-2xl backdrop-blur-2xl">
              <div className="px-6 pb-3 pt-6">
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-xl text-slate-50">Send me a message</CardTitle>
                    <div className="hidden items-center gap-1 text-xs text-slate-400 sm:flex">
                      <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                      <span>Typically replies within 24 hours</span>
                    </div>
                  </div>
                </CardHeader>
              </div>
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit} aria-label="Contact form">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-slate-100">
                        Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="name-input"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`${inputBase} ${errors.name ? "border-rose-500" : "border-slate-800/80"}`}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-xs text-rose-400">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-slate-100">
                        Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="email-input"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`${inputBase} ${errors.email ? "border-rose-500" : "border-slate-800/80"}`}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs text-rose-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-slate-100">
                      Subject <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="subject-input"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry, collaboration, speaking..."
                      required
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      className={`${inputBase} ${errors.subject ? "border-rose-500" : "border-slate-800/80"}`}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="text-xs text-rose-400">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-100">
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      id="message-input"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, timeline, and what you're looking to achieve..."
                      required
                      rows={8}
                      className={`${inputBase} ${errors.message ? "border-rose-500" : "border-slate-800/80"} resize-none`}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-rose-400">
                        {errors.message}
                      </p>
                    )}
                    <p className="text-[11px] text-slate-400">
                      I'll only use this information to respond to your inquiry.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      className="rounded bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 font-semibold text-white hover:shadow-lg disabled:opacity-60"
                      disabled={submitting}
                    >
                      {submitting ? "Sending..." : "Send message"}
                    </button>
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
            <Card className="mt-6 border-slate-900/80 bg-slate-950/85 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-xl text-slate-50">I'm open to</CardTitle>
                <div className="text-slate-300">
                  Here are the types of opportunities I'm interested in:
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {workTypes.map((type) => (
                    <div key={type} className="flex items-center gap-2 text-slate-200">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-cyan-300" />
                      <span className="text-sm">{type}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Methods Sidebar */}
          <div className="col-span-2 space-y-6 pt-2">
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
                  className="group block"
                >
                  <div className="rounded border-slate-900/80 bg-slate-950/85 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/80 hover:shadow-[0_0_40px_rgba(0,255,255,0.45)]">
                    <div className="flex items-center gap-4 p-6">
                      <div
                        className={`h-12 w-12 rounded-xl bg-cyber-${method.color}/20 border border-cyber-${method.color}/40 flex items-center justify-center`}
                      >
                        <method.icon className={`h-6 w-6 text-cyber-${method.color}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-slate-50 transition-colors group-hover:text-cyan-300">
                            {method.title}
                          </h3>
                          <ArrowRight className="h-4 w-4 text-slate-500 transition-all group-hover:translate-x-1 group-hover:text-cyan-300" />
                        </div>
                        <p className="mb-1 break-all text-sm text-slate-300">{method.value}</p>
                        <p className="text-xs text-slate-400">{method.description}</p>
                        {method.title === "Email" && (
                          <button
                            type="button"
                            onClick={() => navigator.clipboard.writeText(method.value)}
                            className="mt-2 text-xs text-slate-300 hover:text-slate-100 hover:underline"
                          >
                            Copy email
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick info */}
            <div className="rounded border-cyan-500/50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-0 shadow-[0_0_40px_rgba(0,255,255,0.3)] backdrop-blur-2xl">
              <div className="p-6">
                <div className="flex items-center gap-2 text-cyan-300">
                  <Sparkles className="h-5 w-5" />
                  <h3 className="font-semibold">Quick response, thoughtful answers</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  I typically respond to all inquiries within 24 hours. If you don't hear back,
                  please check your spam folder or try another channel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
