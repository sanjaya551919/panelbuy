
import React from 'react';
import { CheckCircle2, Download, Home, ShieldCheck } from 'lucide-react';
import { Order } from '../types';

interface ReceiptProps {
  order: Order;
  onClose: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({ order, onClose }) => {
  const downloadReceipt = () => {
    alert("Struk pembelian sedang diproses untuk diunduh...");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 space-y-8 animate-in fade-in duration-500">
      <div className="w-full max-w-md bg-white text-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-500/10">
        <div className="bg-blue-600 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)]"></div>
          <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-4 relative z-10" />
          <h2 className="text-2xl font-black text-white relative z-10 uppercase tracking-tight">Pembayaran Berhasil!</h2>
          <p className="text-blue-100 text-xs font-bold uppercase tracking-widest relative z-10">Invoice Resmi San Shop</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID Pesanan</p>
              <p className="font-mono text-sm font-bold">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Waktu</p>
              <p className="text-sm font-bold">{new Date(order.timestamp).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-slate-500">Produk:</span>
              <span className="text-sm font-bold uppercase">{order.productName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-slate-500">Kontak:</span>
              <span className="text-sm font-bold">{order.customerWhatsApp}</span>
            </div>
            {order.voucherCode && (
              <div className="flex justify-between text-blue-600 font-bold">
                <span className="text-sm">Voucher:</span>
                <span className="text-sm uppercase">{order.voucherCode}</span>
              </div>
            )}
            <div className="flex justify-between pt-4 border-t-2 border-dashed border-slate-100">
              <span className="text-lg font-black text-slate-900 uppercase">Total:</span>
              <span className="text-xl font-black text-blue-600">Rp {order.price.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-2xl flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <p className="text-[10px] text-slate-600 leading-tight font-bold uppercase tracking-tighter">
              Pesanan Anda sedang diproses. Simpan invoice ini sebagai bukti yang sah.
            </p>
          </div>
        </div>

        <div className="px-8 pb-8 flex gap-2">
          <button 
            onClick={downloadReceipt}
            className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all uppercase text-xs"
          >
            <Download className="w-5 h-5" /> Simpan Gambar
          </button>
          <button 
            onClick={onClose}
            className="p-4 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-100 transition-all"
          >
            <Home className="w-6 h-6" />
          </button>
        </div>
      </div>

      <p className="text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase">Terima kasih telah berbelanja di San Shop!</p>
    </div>
  );
};

export default Receipt;
