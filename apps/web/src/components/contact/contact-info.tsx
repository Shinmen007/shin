import { Mail, Phone, MapPin, Calendar, Github, Linkedin, LucideIcon } from "lucide-react";

interface ContactInfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  subtext: string;
  href: string;
  target?: string;
  rel?: string;
}

interface SocialLink {
  icon: LucideIcon;
  href: string;
  title: string;
}

interface ClientLogo {
  name: string;
  label: string;
}

export function ContactInfo() {
  const contactInfo: ContactInfoItem[] = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@roshankhatri.dev",
      subtext: "Typically replies within one business day",
      href: "mailto:hello@roshankhatri.dev",
    },
    {
      icon: Phone,
      label: "Consultation Call",
      value: "+1 (555) 123-4567",
      subtext: "Ideal for scoped project discussions",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      subtext: "Partnering with teams worldwide",
      href: "#",
    },
    {
      icon: Calendar,
      label: "Schedule",
      value: "Book a Strategy Session",
      subtext: "30-minute discovery call",
      href: "https://calendly.com/roshankhatri",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: Github,
      href: "https://github.com/roshankhatri",
      title: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/roshankhatri",
      title: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:hello@roshankhatri.dev",
      title: "Email",
    },
  ];

  const clientLogos: ClientLogo[] = [
    { name: "Stripe", label: "Stripe" },
    { name: "Figma", label: "Figma" },
    { name: "Vercel", label: "Vercel" },
    { name: "Notion", label: "Notion" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold text-white">Contact Details</h2>
        <p className="mb-4 text-sm text-slate-400">
          Share a few details about your needs and Ill follow up with a clear next stepno
          spam, ever.
        </p>

        {/* Contact Methods */}
        <div className="space-y-3">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <a
                key={index}
                href={info.href}
                target={info.target}
                rel={info.rel}
                className="group block rounded-xl border border-cyber-cyan/30 bg-neutral-900/50 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyber-cyan hover:bg-cyber-cyan/5 hover:shadow-lg hover:shadow-cyber-cyan/20"
              >
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 text-cyber-cyan transition-colors group-hover:from-cyber-cyan/30 group-hover:to-cyber-purple/30">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-cyber-cyan/70">
                      {info.label}
                    </p>
                    <p className="mt-1 text-base font-semibold text-white transition-colors group-hover:text-cyber-cyan">
                      {info.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{info.subtext}</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Connect Online
        </h3>
        <div className="flex gap-3">
          {socialLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                target={link.title === "Email" ? undefined : "_blank"}
                rel={link.title === "Email" ? undefined : "noopener noreferrer"}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyber-cyan/30 bg-neutral-900/60 text-cyber-cyan/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyber-cyan hover:bg-cyber-cyan/10 hover:text-cyber-cyan hover:shadow-lg hover:shadow-cyber-cyan/30"
                title={link.title}
              >
                <IconComponent className="h-5 w-5" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Client Logos / Social Proof */}
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
          Trusted by teams using
        </p>
        <div className="flex flex-wrap gap-3 rounded-xl border border-cyber-cyan/20 bg-neutral-900/40 p-3 backdrop-blur-sm">
          {clientLogos.map((logo) => (
            <div
              key={logo.name}
              className="inline-flex items-center gap-2 rounded-lg bg-black/40 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan" />
              <span>{logo.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Response Time Card */}
      <div className="overflow-hidden rounded-xl border border-cyber-cyan/30 bg-gradient-to-br from-cyber-cyan/10 to-cyber-purple/10 p-4 backdrop-blur-sm">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyber-cyan/80">
          Response Commitment
        </p>
        <p className="text-xs leading-relaxed text-slate-200">
          I aim to respond to all messages within 24 hours during the workweek. Time-sensitive
          product launches and incidents are prioritized.
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs text-cyber-cyan">
          <div className="h-2 w-2 animate-pulse rounded-full bg-cyber-cyan" />
          <span>Usually online · Pacific Time (PT)</span>
        </div>
      </div>
    </div>
  );
}
