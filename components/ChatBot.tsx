
import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'bot', text: string}[]>([]);

  const handleAsk = () => {
    const userMsg = "Halo, kenapa panel saya belum aktif min?";
    setMessages([{ role: 'user', text: userMsg }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "Halo Kak! Mohon maaf atas kendalanya. Silakan hubungi admin di WhatsApp 6285896011259 dengan menyertakan bukti pembayaran ya kak, agar segera diproses. Terima kasih!" 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      {isOpen ? (
        <div className="w-80 bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-4">
          <div className="bg-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white leading-tight uppercase tracking-tighter">CS San Shop</h4>
                <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest">Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="h-64 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xs text-slate-500 italic">Ada kendala? Tanyakan pada asisten kami.</p>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none'}`}>
                    {m.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-white/5 bg-slate-900">
            {messages.length === 0 ? (
              <button 
                onClick={handleAsk}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between group"
              >
                Lapor Masalah 
                <Send className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <p className="text-[10px] text-center text-slate-500 italic uppercase font-black">Sesi berakhir.</p>
            )}
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-xl shadow-blue-500/20 transition-all transform hover:scale-110 active:scale-95 flex items-center gap-3"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="hidden md:inline font-bold text-sm pr-2">Bantuan</span>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
