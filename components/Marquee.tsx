
import React from 'react';
import { Zap } from 'lucide-react';

interface MarqueeProps {
  text: string;
  duration?: number;
}

const Marquee: React.FC<MarqueeProps> = ({ text, duration = 20 }) => {
  return (
    <div className="relative group overflow-hidden">
      <div className="flex items-center gap-6 glass-card border-blue-500/10 rounded-3xl p-4 shadow-2xl">
        <div className="bg-blue-600 p-2.5 rounded-xl flex-shrink-0 shadow-lg shadow-blue-500/20">
          <Zap className="w-4 h-4 text-white fill-current" />
        </div>
        <div className="marquee-container flex-1" style={{ '--duration': `${duration}s` } as React.CSSProperties}>
          <div className="marquee-content text-slate-300 text-sm font-bold tracking-tight">
            {text} &nbsp;&bull;&nbsp; {text} &nbsp;&bull;&nbsp; {text}
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

export default Marquee;
