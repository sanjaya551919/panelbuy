
import React, { useState } from 'react';
import { Server, Bot, ArrowUpRight, Cpu, Layers, ShieldCheck, Zap, Star, Activity, HardDrive, Terminal, Smartphone } from 'lucide-react';
import { Product, ProductType } from '../types.ts';
import { PANEL_VARIANTS, BOT_VARIANTS, APP_VARIANTS } from '../constants.tsx';

interface ProductListProps {
  onSelect: (p: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onSelect }) => {
  const [activeCategory, setActiveCategory] = useState<ProductType>('panel');

  const getVariants = () => {
    switch(activeCategory) {
      case 'panel': return PANEL_VARIANTS;
      case 'bot': return BOT_VARIANTS;
      case 'app': return APP_VARIANTS;
      default: return PANEL_VARIANTS;
    }
  };

  const variants = getVariants();

  return (
    <div className="space-y-16">
      {/* Selector Kategori Premium */}
      <div className="flex justify-center">
        <div className="bg-slate-900/40 p-1.5 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl flex items-center shadow-2xl flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveCategory('panel')}
            className={`flex items-center gap-3 px-8 py-4 rounded-[2rem] text-sm font-black transition-all duration-500 ${
              activeCategory === 'panel' 
              ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' 
              : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Server className="w-4 h-4" />
            Cloud Panel
          </button>
          <button
            onClick={() => setActiveCategory('bot')}
            className={`flex items-center gap-3 px-8 py-4 rounded-[2rem] text-sm font-black transition-all duration-500 ${
              activeCategory === 'bot' 
              ? 'bg-purple-600 text-white shadow-xl shadow-purple-500/30' 
              : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Bot className="w-4 h-4" />
            Sewa Bot
          </button>
          <button
            onClick={() => setActiveCategory('app')}
            className={`flex items-center gap-3 px-8 py-4 rounded-[2rem] text-sm font-black transition-all duration-500 ${
              activeCategory === 'app' 
              ? 'bg-green-600 text-white shadow-xl shadow-green-500/30' 
              : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            Aplikasi Premium
          </button>
        </div>
      </div>

      {/* Info Stats Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between transition-all duration-500 group">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <Activity className="w-6 h-6 text-blue-500" />
            </div>
            <div>
               <p className="text-3xl font-black text-white">99.9%</p>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Stabilitas Server</p>
            </div>
         </div>
         <div className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between border-blue-500/10 bg-blue-500/5 group">
            <div className="w-12 h-12 rounded-2xl bg-blue-400/10 flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
               <Terminal className="w-6 h-6 text-blue-400" />
            </div>
            <div>
               <p className="text-3xl font-black text-white">Instan</p>
               <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">Pengiriman Pesanan</p>
            </div>
         </div>
         <div className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:-rotate-6 transition-transform">
               <HardDrive className="w-6 h-6 text-purple-500" />
            </div>
            <div>
               <p className="text-3xl font-black text-white">NVMe SSD</p>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Penyimpanan Cepat</p>
            </div>
         </div>
      </div>

      {/* Grid Produk */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {variants.map((v) => (
          <div 
            key={v.id}
            onClick={() => onSelect(v)}
            className="group relative cursor-pointer"
          >
            <div className={`absolute inset-0 blur-3xl opacity-0 group-hover:opacity-5 transition-opacity rounded-[3rem] ${
              v.type === 'panel' ? 'bg-blue-500' : v.type === 'bot' ? 'bg-purple-500' : 'bg-green-500'
            }`}></div>
            <div className="relative glass-card rounded-[3rem] p-1 h-full overflow-hidden transition-all duration-500 hover:-translate-y-2">
              <div className="bg-slate-950/20 rounded-[2.8rem] p-10 h-full border border-white/5 flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-5 rounded-2xl shadow-lg transition-transform group-hover:scale-110 ${
                    v.type === 'panel' ? 'bg-blue-600 text-white' : v.type === 'bot' ? 'bg-purple-600 text-white' : 'bg-green-600 text-white'
                  }`}>
                    {v.type === 'panel' ? <Cpu className="w-7 h-7" /> : v.type === 'bot' ? <Layers className="w-7 h-7" /> : <Smartphone className="w-7 h-7" />}
                  </div>
                  {v.price >= 5000 && (
                    <div className="bg-amber-500/10 text-amber-500 p-2.5 rounded-xl border border-amber-500/20">
                      <Star className="w-5 h-5 fill-amber-500" />
                    </div>
                  )}
                </div>
                
                <h4 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors uppercase">{v.name}</h4>
                <div className="flex items-center gap-3 mb-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Stok Ready</span>
                </div>

                <div className="space-y-4 mb-12 flex-1">
                  {v.specs.split('|').map((spec, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm text-slate-300 font-medium">
                      <ShieldCheck className={`w-4 h-4 ${v.type === 'panel' ? 'text-blue-500' : v.type === 'bot' ? 'text-purple-500' : 'text-green-500'}`} />
                      {spec.trim()}
                    </div>
                  ))}
                  <div className="flex items-center gap-4 text-sm text-slate-300 font-medium opacity-60">
                    <Zap className="w-4 h-4 text-slate-400" />
                    Garansi Aktif & Support
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Harga Mulai</p>
                    <p className="text-3xl font-black text-white tracking-tighter">
                      <span className="text-sm font-medium mr-1 opacity-30 italic">Rp</span>
                      {v.price.toLocaleString()}
                    </p>
                  </div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                    v.type === 'panel' ? 'bg-blue-600 shadow-xl shadow-blue-500/20' : 
                    v.type === 'bot' ? 'bg-purple-600 shadow-xl shadow-purple-500/30' : 
                    'bg-green-600 shadow-xl shadow-green-500/30'
                  } group-hover:rotate-45`}>
                    <ArrowUpRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
