
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header.tsx';
import BannerSlider from './components/BannerSlider.tsx';
import Marquee from './components/Marquee.tsx';
import ProductList from './components/ProductList.tsx';
import CheckoutModal from './components/CheckoutModal.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import ChatBot from './components/ChatBot.tsx';
import Receipt from './components/Receipt.tsx';
import { Product, Order, AdminSettings } from './types.ts';
import { Wifi, ShieldAlert, Lock, ArrowLeft, ArrowRight, ShieldCheck, ShoppingBag, Terminal } from 'lucide-react';

const HotspotAccess: React.FC = () => {
  const [step, setStep] = useState<'verify' | 'show'>('verify');
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('show');
    }, 2500);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-bold uppercase text-[10px] tracking-widest">
          <ArrowLeft className="w-3 h-3" /> Kembali ke Beranda
        </Link>
        
        <div className="premium-glass rounded-[3.5rem] p-12 overflow-hidden relative shadow-2xl border-blue-500/10">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Wifi className="w-64 h-64 text-blue-500" />
          </div>

          <div className="relative z-10 space-y-10">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-blue-600/10 rounded-[2.5rem] flex items-center justify-center mx-auto border border-blue-500/20 shadow-2xl">
                <Wifi className="w-12 h-12 text-blue-500 animate-pulse" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Akses Hotspot San</h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <ShieldCheck className="w-3 h-3 text-blue-500" />
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Otoritas Akses Terenkripsi</p>
                </div>
              </div>
            </div>

            {step === 'verify' ? (
              <div className="space-y-8">
                <div className="bg-blue-500/5 border border-blue-500/10 p-8 rounded-3xl space-y-4">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-500" />
                    <span className="text-xs font-black text-white uppercase tracking-widest">Sistem Verifikasi</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    Sandi ini hanya diperuntukkan bagi pengguna internal San Shop. Segala bentuk penyalahgunaan akan terekam oleh sistem keamanan kami.
                  </p>
                </div>
                
                <button 
                  onClick={handleVerify}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-2xl font-black uppercase tracking-widest shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-4 text-xs"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Tampilkan Sandi Hotspot
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-4">Nama Hotspot (SSID)</label>
                    <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 text-white font-black text-xl tracking-tight flex items-center justify-between">
                      <span>SAN-NETWORK-PRIVATE</span>
                      <Terminal className="w-5 h-5 text-blue-500/50" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-4">Sandi Hotspot</label>
                    <div className="bg-blue-600 border border-blue-400/30 rounded-3xl p-8 text-white font-black text-4xl tracking-tighter text-center shadow-xl">
                      sannobjtvvkn
                    </div>
                  </div>
                </div>
                <div className="text-center pt-4">
                   <p className="text-[9px] font-black text-green-500 uppercase tracking-[0.5em] animate-pulse">Akses Berhasil Dibuka</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [adminSettings, setAdminSettings] = useState<AdminSettings>({
    marqueeText: "🔥 UPDATE: AM Premium 1th (17k) & CapCut Premium 1th (20k) telah tersedia!",
    marqueeDuration: 20,
    ads: [
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
    ]
  });

  useEffect(() => {
    const saved = localStorage.getItem('san_admin_settings');
    if (saved) setAdminSettings(JSON.parse(saved));
    const activeOrder = localStorage.getItem('active_order');
    if (activeOrder) setCurrentOrder(JSON.parse(activeOrder));
  }, []);

  const handleOrderComplete = (order: Order) => {
    setCurrentOrder(order);
    localStorage.setItem('active_order', JSON.stringify(order));
    const history = JSON.parse(localStorage.getItem('order_history') || '[]');
    history.push(order);
    localStorage.setItem('order_history', JSON.stringify(history));
  };

  if (currentOrder && currentOrder.status !== 'failed') {
    return <Receipt order={currentOrder} onClose={() => {
      setCurrentOrder(null);
      localStorage.removeItem('active_order');
    }} />;
  }

  return (
    <div className="min-h-screen pb-24">
      <Header />
      <div className="max-w-5xl mx-auto px-6 mt-12">
        <Link to="/hotspot" className="group relative block overflow-hidden rounded-[2.5rem] premium-glass p-8 border-blue-500/10 shadow-2xl transition-all hover:border-blue-500/30">
          <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12 translate-x-12 -translate-y-6 group-hover:scale-110 transition-transform">
            <Wifi className="w-48 h-48 text-blue-500" />
          </div>
          <div className="relative flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="text-white font-black uppercase text-lg tracking-tight">Cek Sandi Hotspot</h3>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3 text-blue-500" />
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Identitas Nexus Alpha</p>
                </div>
              </div>
            </div>
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12 space-y-12">
        <BannerSlider images={adminSettings.ads} />
        <Marquee text={adminSettings.marqueeText} duration={adminSettings.marqueeDuration} />
        <main className="py-6">
          <ProductList onSelect={setSelectedProduct} />
        </main>
      </div>

      {selectedProduct && (
        <CheckoutModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          onComplete={handleOrderComplete}
        />
      )}
      <ChatBot />
      <footer className="max-w-5xl mx-auto px-6 py-20 border-t border-white/5 text-center mt-20">
        <div className="flex flex-col items-center gap-6">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
               <ShoppingBag className="w-4 h-4 text-white" />
             </div>
             <h2 className="text-xl font-black text-white uppercase tracking-tighter">SAN <span className="text-blue-500">SHOP</span></h2>
           </div>
           <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] max-w-xs leading-loose">
             © 2025 San Shop • Infrastruktur Digital Indonesia Terpadu
           </p>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/adm" element={<AdminPanel />} />
        <Route path="/hotspot" element={<HotspotAccess />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
