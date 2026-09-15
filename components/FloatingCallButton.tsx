'use client';

import React, { useState } from 'react';
import { Phone, X } from 'lucide-react';

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
          <div className="bg-white/98 backdrop-blur-md rounded-2xl border-2 border-pink-200 p-4 shadow-2xl w-[calc(100vw-32px)] max-w-72 animate-in fade-in slide-in-from-bottom-3 duration-200 text-maroon-950">
            <div className="flex items-center justify-between pb-2 border-b border-pink-100">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-garba-pink-500 animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-wider text-garba-pink-800">
                  Contact Mentors
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 hover:bg-pink-50 rounded-full cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-stone-600 mt-2 font-medium">
              Have questions about batches, fees, or passes? Speak directly with our lead mentors:
            </p>

            <div className="space-y-2 mt-3">
              {/* Manish Sir */}
              <a
                href="tel:8432223222"
                className="flex items-center justify-between p-2.5 rounded-xl bg-pink-50/80 border border-pink-200 hover:border-pink-400 hover:bg-pink-100/70 text-garba-pink-950 text-xs font-bold transition group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-white border border-pink-200 text-garba-pink-600 shadow-sm">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-garba-pink-700 uppercase font-black">Manish Sir</div>
                    <span className="font-mono text-xs">+91 843 222 3222</span>
                  </div>
                </div>
                <span className="text-[10px] bg-garba-pink-600 text-white px-2.5 py-1 rounded-md font-bold shadow-xs">
                  Call
                </span>
              </a>

              {/* Neel Sir */}
              <a
                href="tel:8385969285"
                className="flex items-center justify-between p-2.5 rounded-xl bg-rose-50/80 border border-rose-200 hover:border-rose-400 hover:bg-rose-100/70 text-rose-950 text-xs font-bold transition group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-white border border-rose-200 text-rose-600 shadow-sm">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-rose-700 uppercase font-black">Neel Sir</div>
                    <span className="font-mono text-xs">+91 838 596 9285</span>
                  </div>
                </div>
                <span className="text-[10px] bg-rose-600 text-white px-2.5 py-1 rounded-md font-bold shadow-xs">
                  Call
                </span>
              </a>

              {/* WhatsApp Quick Chat */}
              <a
                href="https://wa.me/918432223222?text=Hello%20Manish%20Sir%2C%20I%20want%20information%20regarding%20the%20TFN%20Garba%20workshop%20in%20Kishangarh"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition"
              >
                <span>💬 Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* Main Floating Button */}
        <div className="relative group flex items-center gap-2">
          {/* Hover Pill Label on Desktop */}
          <div className="hidden md:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-pink-200 shadow-md text-xs font-bold text-stone-800 opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-garba-pink-500 animate-pulse"></span>
            <span>Contact Mentors: <strong className="text-garba-pink-700">Manish Sir & Neel Sir</strong></span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Contact Choreographers Manish Sir & Neel Sir"
            className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-garba-pink-600 via-rose-500 to-pink-500 text-white shadow-[0_6px_20px_rgba(236,72,153,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none ring-2 ring-white"
          >
            {/* Subtle Ring Animation */}
            <span className="absolute inset-0 rounded-full bg-pink-400 opacity-30 animate-ping pointer-events-none"></span>
            
            <div className="relative">
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Phone className="w-5 h-5 sm:w-6 sm:h-6" />}
            </div>
          </button>
        </div>

      </div>
    </>
  );
}
