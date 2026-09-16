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
          <div className="bg-white/98 backdrop-blur-md rounded-3xl border-2 border-pink-200 p-4 shadow-2xl w-[calc(100vw-32px)] max-w-72 animate-in fade-in slide-in-from-bottom-3 duration-200 text-slate-950">
            <div className="flex items-center justify-between pb-2 border-b border-pink-100">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse"></div>
                <span className="text-xs font-black uppercase tracking-wider text-pink-900">
                  Contact Mentor
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-pink-50 rounded-full cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-slate-600 mt-2 font-medium">
              Have questions about batches, fees, or passes? Call or WhatsApp:
            </p>

            <div className="space-y-2.5 mt-3">
              {/* Neel Sir Call */}
              <a
                href="tel:8385969285"
                className="flex items-center justify-between p-3 rounded-2xl bg-pink-50 border-2 border-pink-400 hover:border-pink-500 hover:bg-pink-100 transition text-slate-950 group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-pink-600 text-white shadow-xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-pink-900 uppercase font-black">Neel Sir</span>
                      <span className="text-[8px] px-1.5 py-0.5 bg-pink-200 text-pink-900 rounded font-black uppercase tracking-wider">Call / WA</span>
                    </div>
                    <span className="font-mono text-xs sm:text-sm font-black text-slate-900">+91 83859 69285</span>
                  </div>
                </div>
                <span className="text-[10px] bg-pink-600 text-white px-2 py-1 rounded-md font-black group-hover:scale-105 transition">
                  Call
                </span>
              </a>

              {/* WhatsApp Quick Chat with Neel Sir */}
              <a
                href="https://wa.me/918385969285?text=Hello%20Neel%20Sir%2C%20I%20want%20information%20regarding%20the%20TFN%20Garba%20workshop%20in%20Kishangarh"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Chat with Neel Sir on WhatsApp</span>
              </a>

              {/* Manish Sir Call */}
              <a
                href="tel:8432223222"
                className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition text-slate-900 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-200 text-slate-800">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-600 uppercase font-bold">Manish Sir</span>
                      <span className="text-[8px] px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded font-semibold uppercase tracking-wider">Call Only</span>
                    </div>
                    <span className="font-mono text-xs text-slate-800">+91 84322 23222</span>
                  </div>
                </div>
                <span className="text-[10px] bg-slate-200 group-hover:bg-blue-600 text-slate-800 group-hover:text-white px-2 py-1 rounded-md font-bold transition">
                  Call
                </span>
              </a>
            </div>
          </div>
        )}

        {/* Main Floating Button */}
        <div className="relative group flex items-center gap-2">
          {/* Hover Pill Label on Desktop */}
          <div className="hidden md:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-pink-200 shadow-md text-xs font-bold text-slate-800 opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            <span><strong className="text-pink-800">Neel Sir (+91 83859 69285)</strong> • Manish Sir (+91 84322 23222)</span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Contact Choreographer Neel Sir"
            className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-500 text-white shadow-[0_6px_25px_rgba(236,72,153,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none ring-2 ring-white"
          >
            {/* Subtle Ring Animation */}
            <span className="absolute inset-0 rounded-full bg-pink-400 opacity-40 animate-ping pointer-events-none"></span>
            
            <div className="relative">
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Phone className="w-5 h-5 sm:w-6 sm:h-6" />}
            </div>
          </button>
        </div>

      </div>
    </>
  );
}
