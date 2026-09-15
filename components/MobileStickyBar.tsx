'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface MobileStickyBarProps {
  onOpenRegister: () => void;
}

export default function MobileStickyBar({ onOpenRegister }: MobileStickyBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white/98 backdrop-blur-md border-t-2 border-pink-200 shadow-2xl flex flex-col">
      <div className="w-full h-[3px] bg-gradient-to-r from-garba-pink-500 via-rose-500 to-pink-500"></div>
      <div className="p-3 px-4 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-garba-pink-800 text-[10px] font-extrabold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-garba-pink-500 animate-ping"></span>
            <span>Slots Open • Kishangarh</span>
          </div>
          <div className="text-sm font-black text-maroon-950 font-serif">
            From ₹2000 <span className="text-xs font-bold text-garba-pink-600">/ Free Family Pass</span>
          </div>
        </div>

        <button
          onClick={onOpenRegister}
          id="mobile-sticky-register-btn"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-garba-pink-600 via-rose-500 to-pink-500 text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-pink-200" />
          <span>Register Now</span>
        </button>
      </div>
    </div>
  );
}

