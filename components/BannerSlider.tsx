
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerSliderProps {
  images: string[];
}

const BannerSlider: React.FC<BannerSliderProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-52 md:h-80 rounded-[3rem] overflow-hidden group border border-white/10 shadow-2xl">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
        <button
          onClick={() => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
          className="p-3 rounded-2xl bg-black/40 backdrop-blur-xl text-white opacity-0 group-hover:opacity-100 transition-all pointer-events-auto border border-white/10 hover:bg-white/10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
          className="p-3 rounded-2xl bg-black/40 backdrop-blur-xl text-white opacity-0 group-hover:opacity-100 transition-all pointer-events-auto border border-white/10 hover:bg-white/10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-8 left-10 flex gap-2.5">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === current ? 'w-10 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]' : 'w-2.5 bg-white/20'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
