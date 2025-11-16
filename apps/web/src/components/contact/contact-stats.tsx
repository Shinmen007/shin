import { Award, Users, Code, Zap, LucideIcon } from "lucide-react";

interface StatItem {
  icon: LucideIcon;
  number: string;
  text: string;
  color: string;
}

export function ContactStats() {
  const stats: StatItem[] = [
    { icon: Award, number: "50+", text: "Projects", color: "from-blue-500 to-cyan-500" },
    { icon: Users, number: "30+", text: "Clients", color: "from-purple-500 to-pink-500" },
    { icon: Code, number: "8+", text: "Years", color: "from-green-500 to-emerald-500" },
    { icon: Zap, number: "4h", text: "Response", color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-cyber-cyan/30 bg-gradient-to-br from-neutral-900/50 to-black/50 p-6 transition-all duration-300 hover:border-cyber-cyan hover:shadow-xl hover:shadow-cyber-cyan/20"
          >
            {/* Gradient background on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
            />

            <div
              className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} mb-3 shadow-lg`}
            >
              <IconComponent className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white text-glow-cyan">{stat.number}</div>
            <div className="mt-1 text-sm text-slate-400">{stat.text}</div>
          </div>
        );
      })}
    </div>
  );
}
