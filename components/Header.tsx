
import React from 'react';
import { ShoppingBag, Sparkles, Globe, ShieldCheck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="px-6 pt-10">
      <header className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-10 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 p-4 rounded-3xl shadow-2xl transition-all transform group-hover:scale-105">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
               <h1 className="text-2xl font-black tracking-tight text-white leading-none uppercase">SAN <span className="text-blue-500">SHOP</span></h1>
               <Sparkles className="w-4 h-4 text-blue-400 opacity-50" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <ShieldCheck className="w-3 h-3 text-blue-500" />
              <p className="text-[9px] text-slate-500 font-bold tracking-[0.3em] uppercase">Eksperiens Premium</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 backdrop-blur-3xl">
            <Globe className="w-4 h-4 text-blue-400" />
            <div className="h-4 w-px bg-white/10"></div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Global Node</span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
