'use client';

import React, { useState } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';

export default function FloatingCallButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Backdrop on Mobile when Open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs sm:hidden animate-in fade-in duration-150"
        />
      )}

      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2.5">
        
        {/* Expanded Quick Contact Card */}
        {isOpen && (
          <div className="bg-white/98 backdrop-blur-md rounded-2xl border-2 border-amber-200 p-4 shadow-2xl w-[calc(100vw-32px)] max-w-72 animate-in fade-in slide-in-from-bottom-3 duration-200 text-stone-950">
            <div className="flex items-center justify-between pb-2 border-b border-amber-100">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Contact Mentor
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 hover:bg-amber-50 rounded-full cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-stone-600 mt-2 font-medium">
              Have questions about batches, fees, or passes? Speak directly with Neel Sir:
            </p>

            <div className="space-y-2.5 mt-3">
              {/* Neel Sir Call */}
              <a
                href="tel:8385969285"
                className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/90 border border-amber-300 hover:border-amber-400 hover:bg-amber-100 text-amber-950 text-xs font-bold transition group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-white border border-amber-200 text-amber-600 shadow-sm">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-amber-800 uppercase font-black">Neel Sir</div>
                    <span className="font-mono text-xs">+91 838 596 9285</span>
                  </div>
                </div>
                <span className="text-[10px] bg-amber-500 text-stone-950 px-2.5 py-1 rounded-md font-bold shadow-xs">
                  Call
                </span>
              </a>

              {/* WhatsApp Quick Chat with Neel Sir */}
              <a
                href="https://wa.me/918385969285?text=Hello%20Neel%20Sir%2C%20I%20want%20information%20regarding%20the%20TFN%20Garba%20workshop%20in%20Kishangarh"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Chat with Neel Sir on WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* Main Floating Button */}
        <div className="relative group flex items-center gap-2">
          {/* Hover Pill Label on Desktop */}
          <div className="hidden md:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-amber-200 shadow-md text-xs font-bold text-stone-800 opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Contact Mentor: <strong className="text-amber-800">Neel Sir (+91 8385969285)</strong></span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Contact Choreographer Neel Sir"
            className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-500 text-stone-950 shadow-[0_6px_20px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none ring-2 ring-white"
          >
            {/* Subtle Ring Animation */}
            <span className="absolute inset-0 rounded-full bg-yellow-400 opacity-30 animate-ping pointer-events-none"></span>
            
            <div className="relative">
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Phone className="w-5 h-5 sm:w-6 sm:h-6" />}
            </div>
          </button>
        </div>

      </div>
    </>
  );
}
