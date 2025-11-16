import { Target, Sparkles, TrendingUp, Shield, LucideIcon } from "lucide-react";

interface BenefitItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export function ContactBenefits() {
  const benefits: BenefitItem[] = [
    { icon: Target, title: "Strategic Focus", desc: "Aligned with your business goals" },
    { icon: Sparkles, title: "Quality Design", desc: "Pixel-perfect, modern interfaces" },
    { icon: TrendingUp, title: "Results Driven", desc: "Measurable impact and growth" },
    { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade solutions" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {benefits.map((benefit, index) => {
        const IconComponent = benefit.icon;
        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl border border-cyber-cyan/20 bg-neutral-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyber-cyan hover:shadow-lg hover:shadow-cyber-cyan/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/0 to-cyber-purple/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 text-cyber-cyan transition-colors group-hover:from-cyber-cyan/30 group-hover:to-cyber-purple/30">
                <IconComponent className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-white text-glow-cyan">{benefit.title}</h3>
              <p className="text-sm text-slate-400">{benefit.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
