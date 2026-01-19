
import React, { useState } from 'react';
import { X, Smartphone, Link as LinkIcon, Gift, CheckCircle, ExternalLink, ShieldCheck, CreditCard } from 'lucide-react';
import { Product, Order, Voucher } from '../types.ts';
import { APP_CONFIG } from '../constants.tsx';

interface CheckoutModalProps {
  product: Product;
  onClose: () => void;
  onComplete: (order: Order) => void;
}

export default function CheckoutModal({ product, onClose, onComplete }: CheckoutModalProps) {
  const [wa, setWa] = useState('');
  const [groupLink, setGroupLink] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [step, setStep] = useState<'info' | 'payment'>('info');

  const totalPrice = Math.max(0, product.price - discount);

  const applyVoucher = () => {
    const vouchers: Voucher[] = JSON.parse(localStorage.getItem('san_vouchers') || '[]');
    const found = vouchers.find(v => v.code.toUpperCase() === voucherCode.toUpperCase());
    
    if (found) {
      const isExpired = new Date(found.expiry) < new Date();
      if (!isExpired) {
        setDiscount(found.discount);
        alert(`Voucher Berhasil! Diskon Rp ${found.discount.toLocaleString()}`);
      } else {
        alert('Voucher sudah kadaluwarsa.');
      }
    } else {
      alert('Voucher tidak ditemukan.');
    }
  };

  const handlePaymentSubmit = () => {
    if (product.type === 'panel' && !wa) return alert('Masukkan nomor WhatsApp Anda!');
    if (product.type === 'bot' && !groupLink) return alert('Masukkan link grup WhatsApp!');
    
    const orderId = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const order: Order = {
      id: orderId,
      productId: product.id,
      productName: product.name,
      price: totalPrice,
      customerWhatsApp: wa || groupLink,
      customerNote: `Checkout ${product.name}`,
      status: 'success',
      timestamp: Date.now(),
      voucherCode: voucherCode
    };

    onComplete(order);
    
    const msg = `🚀 *PESANAN BARU - SAN SHOP*\n\n` +
                `📌 *Order ID:* ${orderId}\n` +
                `📦 *Produk:* ${product.name}\n` +
                `📊 *Spesifikasi:* ${product.specs}\n` +
                `💰 *Total Bayar:* Rp ${totalPrice.toLocaleString()}\n` +
                `📱 *Kontak:* ${wa || groupLink}\n\n` +
                `✅ *Status:* Konfirmasi Pembayaran\n\n` +
                `_Mohon segera diproses, terima kasih!_`;

    const waLink = `https://wa.me/${APP_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(waLink, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-3xl" onClick={onClose}></div>
      
      <div className="relative w-full max-w-xl glass-card rounded-[3.5rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="p-12">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">Pembayaran</h2>
              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Keamanan Sistem Aktif</span>
              </div>
            </div>
            <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {step === 'info' && (
            <div className="space-y-10">
              <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/5">
                <div className="flex items-center gap-6 mb-8">
                  <div className={`p-4 rounded-2xl ${product.type === 'panel' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{product.name}</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Tipe: {product.type === 'panel' ? 'Cloud Panel' : 'Rental Bot'}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-400 font-medium">Alokasi Spesifikasi:</span>
                   <span className="text-white font-bold">{product.specs}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500">
                    {product.type === 'panel' ? <Smartphone className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                  </div>
                  <input 
                    type="text" 
                    placeholder={product.type === 'panel' ? 'Nomor WhatsApp (Contoh: 08xx)' : 'Link Grup WhatsApp'}
                    className="w-full bg-slate-900 border border-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl py-6 pl-16 pr-8 outline-none transition-all text-white font-bold placeholder:text-slate-600"
                    value={product.type === 'panel' ? wa : groupLink}
                    onChange={(e) => product.type === 'panel' ? setWa(e.target.value) : setGroupLink(e.target.value)}
                  />
                </div>

                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500">
                      <Gift className="w-5 h-5" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Punya Kode Promo?"
                      className="w-full bg-slate-900 border border-white/10 focus:border-blue-500 rounded-2xl py-6 pl-16 pr-8 outline-none transition-all text-white font-bold placeholder:text-slate-600"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={applyVoucher}
                    className="bg-white text-slate-950 px-10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-xl active:scale-95"
                  >
                    Gunakan
                  </button>
                </div>
              </div>

              <div className="pt-10 border-t border-white/5 flex flex-col gap-6">
                <div className="flex justify-between items-end">
                  <span className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Total Pembayaran</span>
                  <span className="text-4xl font-black text-white">Rp {totalPrice.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => setStep('payment')}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-[2rem] font-black text-lg transition-all transform active:scale-95 shadow-2xl shadow-blue-500/20"
                >
                  Verifikasi Pembayaran
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-10 text-center py-6">
              <div className="w-28 h-28 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20 shadow-2xl">
                <CheckCircle className="w-14 h-14 text-blue-500" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white mb-4">Selesaikan Pembayaran</h3>
                <p className="text-slate-400 leading-relaxed max-w-sm mx-auto">
                  Transfer sebesar <strong>Rp {totalPrice.toLocaleString()}</strong> via Saweria untuk mengaktifkan layanan Anda secara instan.
                </p>
              </div>

              <div className="space-y-4">
                <a 
                  href={APP_CONFIG.SAWERIA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-[2rem] font-black flex items-center justify-center gap-3 transition-all shadow-2xl shadow-blue-500/30 active:scale-95"
                >
                  Bayar via Saweria <ExternalLink className="w-5 h-5" />
                </a>
                
                <button 
                  onClick={handlePaymentSubmit}
                  className="w-full bg-white/5 border border-white/10 text-white hover:bg-white/10 py-6 rounded-[2rem] font-black transition-all"
                >
                  Konfirmasi & Hubungi Admin
                </button>
              </div>
              <button 
                onClick={() => setStep('info')} 
                className="text-slate-600 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
              >
                Kembali ke Detail
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
