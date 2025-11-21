import { Mail, Github, Linkedin, MapPin, ExternalLink } from "lucide-react";
import { CyberpunkCard } from "@/components/ui/cyberpunk-card";
import { CyberpunkLogo } from "@/components/ui/cyberpunk-logo";
import { useState, useEffect } from "react";

export function EnhancedContactInfo() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kathmandu' 
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const contactMethods = [
    {
      icon: Mail,
      title: "EMAIL",
      value: "hello@roshankhatri.dev",
      href: "mailto:hello@roshankhatri.dev",
      color: "cyan" as const,
    },
    {
      icon: Github,
      title: "GITHUB",
      value: "@roshankhatri",
      href: "https://github.com/roshankhatri",
      color: "magenta" as const,
    },
    {
      icon: Linkedin,
      title: "LINKEDIN",
      value: "/in/roshankhatri",
      href: "https://linkedin.com/in/roshankhatri",
      color: "purple" as const,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Profile / Status Widget */}
      <CyberpunkCard variant="glass" className="p-5 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
            <CyberpunkLogo className="w-20 h-20" />
         </div>
         <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
                <CyberpunkLogo className="w-16 h-16" />
                <div>
                    <h3 className="font-black text-xl text-white tracking-wider mb-1">ROSHAN KHATRI</h3>
                    <div className="flex items-center gap-2">
                        <div className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-cyber-success opacity-75 animate-ping" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyber-success" />
                        </div>
                        <span className="text-xs font-bold text-cyber-success tracking-widest">AVAILABLE FOR WORK</span>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs font-mono mb-2">
                <div className="bg-white/5 p-3 rounded border border-white/10 hover:border-cyber-magenta/50 transition-colors group/item">
                    <div className="text-gray-500 mb-1 group-hover/item:text-cyber-magenta transition-colors">LOCATION</div>
                    <div className="text-white flex items-center gap-2 font-bold">
                        <MapPin className="w-3 h-3 text-cyber-magenta" />
                        Kathmandu
                    </div>
                </div>
                 <div className="bg-white/5 p-3 rounded border border-white/10 hover:border-cyber-cyan/50 transition-colors group/item">
                    <div className="text-gray-500 mb-1 group-hover/item:text-cyber-cyan transition-colors">LOCAL TIME</div>
                    <div className="text-cyber-cyan font-bold">
                        {time || "--:--:--"}
                    </div>
                </div>
            </div>
         </div>
      </CyberpunkCard>

      {/* Contact Channels Widget */}
      <CyberpunkCard variant="glass" className="p-0 overflow-hidden">
         <div className="bg-white/5 px-5 py-3 border-b border-white/10 flex justify-between items-center">
             <span className="text-xs font-bold text-gray-400 tracking-widest">CHANNELS</span>
             <div className="flex gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                 <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
             </div>
         </div>
         <div className="divide-y divide-white/5">
            {contactMethods.map((method) => (
                <a 
                    key={method.title}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
                >
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded bg-cyber-${method.color}/10 text-cyber-${method.color} group-hover:text-white group-hover:bg-cyber-${method.color} transition-all`}>
                            <method.icon className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-gray-400 group-hover:text-cyber-cyan transition-colors">{method.title}</div>
                            <div className="text-sm text-white font-mono">{method.value}</div>
                        </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
                </a>
            ))}
         </div>
      </CyberpunkCard>
    </div>
  );
}
