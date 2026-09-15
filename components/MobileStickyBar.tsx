'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface MobileStickyBarProps {
  onOpenRegister: () => void;
}

export default function MobileStickyBar({ onOpenRegister }: MobileStickyBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white/98 backdrop-blur-md border-t-2 border-amber-200 shadow-2xl flex flex-col">
      <div className="w-full h-[3px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
      <div className="p-3 px-4 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
            <span>Slots Open • Kishangarh</span>
          </div>
          <div className="text-sm font-black text-stone-950 font-serif">
            From ₹2000 <span className="text-xs font-bold text-amber-700">/ Free Family Pass</span>
          </div>
        </div>

        <button
          onClick={onOpenRegister}
          id="mobile-sticky-register-btn"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer ring-1 ring-amber-300"
        >
          <Sparkles className="w-4 h-4 text-stone-950" />
          <span>Register Now</span>
        </button>
      </div>
    </div>
  );
}
