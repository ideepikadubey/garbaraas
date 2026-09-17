'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface MobileStickyBarProps {
  onOpenRegister: () => void;
}

export default function MobileStickyBar({ onOpenRegister }: MobileStickyBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white/98 backdrop-blur-md border-t-2 border-pink-200 shadow-2xl flex flex-col">
      <div className="w-full h-[3.5px] bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600"></div>
      <div className="p-3 px-4 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-pink-700 text-[10px] font-black uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping"></span>
            <span>Slots Open • Kishangarh</span>
          </div>
          <div className="text-sm font-black text-slate-900 font-serif">
            From ₹1500 <span className="text-xs font-bold text-pink-600">/ Free Family Pass</span>
          </div>
        </div>

        <button
          onClick={onOpenRegister}
          id="mobile-sticky-register-btn"
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer ring-1 ring-pink-300 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          <span>Register Now</span>
        </button>
      </div>
    </div>
  );
}
