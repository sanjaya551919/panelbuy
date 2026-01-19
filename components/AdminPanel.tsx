
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Lock, Megaphone, Ticket, Image as ImageIcon, Trash2, LogOut, Search } from 'lucide-react';
import { APP_CONFIG } from '../constants.tsx';
import { Order, Voucher, AdminSettings } from '../types.ts';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'vouchers' | 'settings'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [settings, setSettings] = useState<AdminSettings>({
    marqueeText: "",
    marqueeDuration: 15,
    ads: ["", "", ""]
  });

  const [newVCode, setNewVCode] = useState('');
  const [newVDisc, setNewVDisc] = useState(0);
  const [newVExp, setNewVExp] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      setOrders(JSON.parse(localStorage.getItem('order_history') || '[]'));
      setVouchers(JSON.parse(localStorage.getItem('san_vouchers') || '[]'));
      const savedSettings = localStorage.getItem('san_admin_settings');
      if (savedSettings) setSettings(JSON.parse(savedSettings));
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === APP_CONFIG.ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Password Salah!');
    }
  };

  const saveSettings = () => {
    localStorage.setItem('san_admin_settings', JSON.stringify(settings));
    alert('Pengaturan Berhasil Disimpan!');
  };

  const addVoucher = () => {
    if (!newVCode || newVDisc <= 0 || !newVExp) return;
    const updated = [...vouchers, { code: newVCode.toUpperCase(), discount: newVDisc, expiry: newVExp }];
    setVouchers(updated);
    localStorage.setItem('san_vouchers', JSON.stringify(updated));
    setNewVCode(''); setNewVDisc(0); setNewVExp('');
  };

  const deleteVoucher = (code: string) => {
    const updated = vouchers.filter(v => v.code !== code);
    setVouchers(updated);
    localStorage.setItem('san_vouchers', JSON.stringify(updated));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 space-y-8 shadow-2xl">
          <div className="text-center">
            <div className="inline-flex p-4 rounded-3xl bg-blue-600/10 mb-4">
              <Lock className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-2xl font-black text-white">Akses Admin</h1>
            <p className="text-slate-500 mt-2">Masukkan kode rahasia untuk mengelola San Shop</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500 transition-all text-white font-mono tracking-widest text-center"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-white text-slate-950 font-black p-4 rounded-2xl hover:bg-blue-500 hover:text-white transition-all">
              Login Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-900 border-r border-white/5 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <LayoutDashboard className="w-6 h-6 text-blue-500" />
          <span className="font-black text-xl tracking-tight text-white uppercase">Panel Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${activeTab === 'orders' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
            <Search className="w-5 h-5" /> Pesanan
          </button>
          <button onClick={() => setActiveTab('vouchers')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${activeTab === 'vouchers' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
            <Ticket className="w-5 h-5" /> Voucher
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
            <Megaphone className="w-5 h-5" /> Pengaturan Toko
          </button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-3 p-4 rounded-2xl font-bold text-red-400 hover:bg-red-400/10 transition-all">
            <LogOut className="w-5 h-5" /> Keluar
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'orders' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-white uppercase">Riwayat Pesanan</h2>
            <div className="grid grid-cols-1 gap-4">
              {orders.length === 0 ? (
                <div className="bg-slate-900/50 border border-white/5 p-12 text-center rounded-[2rem]">
                  <p className="text-slate-500 font-medium">Belum ada pesanan yang masuk.</p>
                </div>
              ) : (
                orders.sort((a,b) => b.timestamp - a.timestamp).map(order => (
                  <div key={order.id} className="bg-slate-900 border border-white/10 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black text-blue-400 uppercase tracking-widest">{order.id}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${order.status === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                          {order.status === 'success' ? 'Sukses' : 'Gagal'}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white uppercase">{order.productName}</h4>
                      <p className="text-sm text-slate-400">{order.customerWhatsApp} • {new Date(order.timestamp).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-white">Rp {order.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'vouchers' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-white uppercase">Manajemen Voucher</h2>
            <div className="bg-slate-900 border border-white/10 p-8 rounded-[2rem] space-y-6">
              <h3 className="text-xl font-bold text-white">Tambah Voucher Baru</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" placeholder="Kode (Contoh: MERDEKA)" className="bg-slate-950 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-white" value={newVCode} onChange={e => setNewVCode(e.target.value)} />
                <input type="number" placeholder="Diskon (Rp)" className="bg-slate-950 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-white" value={newVDisc} onChange={e => setNewVDisc(parseInt(e.target.value))} />
                <input type="date" className="bg-slate-950 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 text-white" value={newVExp} onChange={e => setNewVExp(e.target.value)} />
              </div>
              <button onClick={addVoucher} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black p-4 rounded-2xl transition-all uppercase">Buat Voucher</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vouchers.map(v => (
                <div key={v.code} className="bg-slate-900 border border-white/10 p-6 rounded-3xl flex justify-between items-center">
                  <div>
                    <h4 className="text-xl font-black text-white">{v.code}</h4>
                    <p className="text-sm text-blue-400 font-bold">Diskon Rp {v.discount.toLocaleString()}</p>
                    <p className="text-xs text-slate-500 mt-1">Exp: {v.expiry}</p>
                  </div>
                  <button onClick={() => deleteVoucher(v.code)} className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-5 h-5" /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-white uppercase">Konfigurasi Toko</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] space-y-6">
                <div className="flex items-center gap-3">
                  <Megaphone className="w-6 h-6 text-blue-500" />
                  <h3 className="text-xl font-bold text-white">Teks Berjalan (Marquee)</h3>
                </div>
                <div className="space-y-4">
                  <textarea className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 mt-2 outline-none focus:border-blue-500 text-white min-h-[100px]" value={settings.marqueeText} onChange={e => setSettings({...settings, marqueeText: e.target.value})} placeholder="Masukkan pesan pengumuman..." />
                  <input type="number" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 mt-2 outline-none focus:border-blue-500 text-white" value={settings.marqueeDuration} onChange={e => setSettings({...settings, marqueeDuration: parseInt(e.target.value)})} placeholder="Kecepatan (detik)" />
                </div>
              </div>

              <div className="bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] space-y-6">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-6 h-6 text-blue-500" />
                  <h3 className="text-xl font-bold text-white">Banner Iklan (3 Slide)</h3>
                </div>
                <div className="space-y-4">
                  {settings.ads.map((ad, idx) => (
                    <input key={idx} type="text" className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 mt-2 outline-none focus:border-blue-500 text-white" value={ad} onChange={e => { const newAds = [...settings.ads]; newAds[idx] = e.target.value; setSettings({...settings, ads: newAds}); }} placeholder={`URL Gambar Slide ${idx + 1}`} />
                  ))}
                </div>
              </div>
            </div>
            <button onClick={saveSettings} className="w-full bg-white text-slate-950 font-black p-6 rounded-[2rem] hover:bg-blue-500 hover:text-white transition-all transform active:scale-[0.98] shadow-2xl uppercase">Simpan Semua Pengaturan</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
