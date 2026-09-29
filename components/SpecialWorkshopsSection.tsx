'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, ChevronRight, Award, Flame, AlertCircle, Phone, Info, Zap, Check } from 'lucide-react';
import { CategoryType } from '@/lib/types';

interface SpecialWorkshopsSectionProps {
  onSelectCategory: (category: CategoryType) => void;
  onScrollToSlots: () => void;
}

export default function SpecialWorkshopsSection({
  onSelectCategory,
  onScrollToSlots,
}: SpecialWorkshopsSectionProps) {
  return (
    <section id="special-workshops" className="relative py-12 md:py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-y-2 border-pink-500/40 text-white overflow-hidden">
      
      {/* Festive ambient glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-600/30 via-rose-500/30 to-blue-600/30 border border-pink-400 text-xs text-pink-300 uppercase tracking-widest font-black mb-3 shadow-lg backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse" />
            <span>NEW 1 TO 11 OCT SPECIAL ADMISSION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-white">
            SPECIAL <span className="festive-gradient-text">FEMALES WORKSHOP</span>
          </h2>
          <div className="h-[3.5px] w-28 sm:w-36 mx-auto my-3 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600"></div>
          <p className="text-xs sm:text-base text-slate-300 font-medium">
            All earlier batches are housefull! Register for the newly added <strong className="text-yellow-300">1 to 11 Oct Festive Batch</strong> covering Garba, Dandiya, and Maha Arti.
          </p>
        </div>

        {/* Dual Cards Grid: 1-11 Oct Special (Active) + Previous (Housefull Notice) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 max-w-5xl mx-auto">
          
          {/* Card 1: 1 to 11 Oct Special Females Batch (Active & Glowing) */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-pink-400/90 shadow-2xl shadow-pink-500/30 bg-slate-900/95 backdrop-blur-xl group flex flex-col justify-between transition-all duration-300 hover:border-pink-300 ring-2 ring-pink-500/40">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl sm:rounded-3xl opacity-25 blur-lg group-hover:opacity-45 transition duration-500 pointer-events-none"></div>
            
            <div>
              {/* Poster Header Tag */}
              <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-pink-950/90 via-slate-900 to-slate-900 border-b border-pink-500/30 flex items-center justify-between">
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider shadow">
                  🟢 SLOTS OPEN (1–11 OCT)
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-pink-200">
                  Females Only • ₹1800
                </span>
              </div>

              {/* Poster Image (P2) */}
              <div className="relative w-full overflow-hidden bg-black/60 flex items-center justify-center">
                <img
                  src="/p2.png"
                  alt="Special Garba Workshop Poster - Females (₹1800 • Garba, Dandiya & Maha Arti)"
                  className="w-full h-auto max-h-[500px] sm:max-h-[560px] object-contain block transform group-hover:scale-[1.01] transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.indexOf('p2.jpeg') === -1) {
                      target.src = '/p2.jpeg';
                    }
                  }}
                />
              </div>

              {/* Highlights Summary */}
              <div className="p-4 bg-slate-950/90 border-t border-pink-500/30 text-xs space-y-2">
                <div className="flex items-center gap-2 text-yellow-300 font-bold text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4 text-yellow-300 flex-shrink-0" />
                  <span>Includes: Garba + Dandiya + Maha Arti + Live Dhol Beats</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-[11px] sm:text-xs">
                  <span className="text-emerald-400">★</span>
                  <span><strong>Bang Marriage Hall:</strong> 5:00 PM – 6:00 PM & 6:00 PM – 7:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-[11px] sm:text-xs">
                  <span className="text-emerald-400">★</span>
                  <span><strong>The Frozen Studio (TFN):</strong> 11:00 AM – 12:00 PM & 12:00 PM – 01:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-[11px] sm:text-xs">
                  <span className="text-emerald-400">★</span>
                  <span>Workshop Dates: 1st October to 11th October (11 Days Intensive)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-[11px] sm:text-xs">
                  <span className="text-emerald-400">★</span>
                  <span>18 Oct Grand Finale Competition Eligibility & Free Family Pass</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-3.5 sm:p-4 bg-slate-950 border-t border-pink-500/30">
              <button
                onClick={() => onSelectCategory('FEMALE_OCT_SPECIAL')}
                className="w-full py-3.5 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-black text-xs sm:text-sm shadow-lg hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer ring-2 ring-pink-300"
              >
                <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                <span>BOOK 1 TO 11 OCT SPECIAL (₹1800)</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Card 2: Boys Dandiya (Housefull) */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-700 shadow-xl bg-slate-900/80 backdrop-blur-xl group flex flex-col justify-between opacity-85">
            <div>
              {/* Poster Header Tag */}
              <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-900 border-b border-slate-700 flex items-center justify-between">
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-red-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider shadow">
                  ⛔ BATCH HOUSEFULL
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-400">
                  Boys Dandiya • ₹1600
                </span>
              </div>

              {/* Poster Image (P1) */}
              <div className="relative w-full overflow-hidden bg-black/60 flex items-center justify-center">
                <img
                  src="/p1.png"
                  alt="Boys Dandiya Workshop Poster - Manish & Neel Sir (₹1600)"
                  className="w-full h-auto max-h-[500px] sm:max-h-[560px] object-contain block opacity-75"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.indexOf('P1.jpeg') === -1) {
                      target.src = '/P1.jpeg';
                    }
                  }}
                />
              </div>

              {/* Highlights Summary */}
              <div className="p-4 bg-slate-950/80 border-t border-slate-800 text-xs space-y-2">
                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>All Boys Dandiya Slots Are Completely Booked</span>
                </div>
                <div className="text-slate-400 text-[11px]">
                  For waitlist or inquiries, please contact mentors Manish Sir or Neel Sir directly.
                </div>
              </div>
            </div>

            {/* Disabled Action Button */}
            <div className="p-3.5 sm:p-4 bg-slate-950 border-t border-slate-800">
              <button
                disabled
                className="w-full py-3.5 px-4 rounded-xl bg-slate-800 text-slate-400 font-black text-xs sm:text-sm cursor-not-allowed border border-slate-700 flex items-center justify-center gap-2"
              >
                <span>BOYS BATCH HOUSEFULL (SOLD OUT)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Helpline Contact Strip */}
        <div className="text-center text-xs text-slate-400">
          Have queries about batch timings or admissions? Call Neel Sir: <a href="tel:8385969285" className="text-pink-400 font-bold hover:underline">+91 8385969285</a> / Manish Sir: <a href="tel:8432223222" className="text-pink-400 font-bold hover:underline">+91 8432223222</a>
        </div>

      </div>
    </section>
  );
}
