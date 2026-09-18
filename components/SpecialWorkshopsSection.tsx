'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, ChevronRight, Award, Flame, AlertCircle, Phone, Info, Zap } from 'lucide-react';
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
            <span>OFFICIAL 15-DAY WORKSHOP POSTERS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-white">
            FAST-TRACK <span className="festive-gradient-text">FESTIVE WORKSHOPS</span>
          </h2>
          <div className="h-[3.5px] w-28 sm:w-36 mx-auto my-3 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600"></div>
          <p className="text-xs sm:text-base text-slate-300 font-medium">
            Specially tailored for participants joining mid-season! Learn competition-ready choreography, live dhol beats, and master skills in just 15 days.
          </p>
        </div>

        {/* Dual Official Posters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          
          {/* Card 1: Girls Special 15-Day Workshop Poster */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-pink-400/90 shadow-2xl shadow-pink-500/20 bg-slate-900/90 backdrop-blur-xl group flex flex-col justify-between">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-rose-600 rounded-3xl opacity-20 blur-lg group-hover:opacity-40 transition duration-500 pointer-events-none"></div>
            
            <div>
              {/* Poster Header Tag */}
              <div className="p-3.5 bg-gradient-to-r from-pink-900/80 to-slate-900 border-b border-pink-500/30 flex items-center justify-between">
                <span className="px-3 py-0.5 rounded-full bg-pink-500 text-white text-[11px] font-black uppercase tracking-wider shadow">
                  Girls 15-Day Special
                </span>
                <span className="text-xs font-bold text-pink-200">
                  26 Sep – 11 Oct • ₹1800
                </span>
              </div>

              {/* Poster Image */}
              <div className="relative w-full overflow-hidden bg-black/40">
                <img
                  src="/web%20banner.png"
                  alt="Special 15-Day Garba Workshop Poster - Girls (₹1800)"
                  className="w-full h-auto object-contain block transform group-hover:scale-[1.01] transition-transform duration-500"
                />
              </div>

              {/* Highlights Summary */}
              <div className="p-4 bg-slate-950/70 border-t border-pink-500/20 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-pink-300 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 flex-shrink-0" />
                  <span><strong>18 Oct:</strong> Grand Garba Competition (Entry Included)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-yellow-400">★</span>
                  <span>Learn: Garba, Dandiya, Ghoomar, Maha Aarti & Live Dhol</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-4 bg-slate-950 border-t border-pink-500/30">
              <button
                onClick={() => onSelectCategory('FEMALE_15DAY')}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-black text-xs sm:text-sm shadow-lg hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer ring-1 ring-pink-300"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>BOOK GIRLS WORKSHOP (₹1800)</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Card 2: Boys Dandiya Workshop Poster */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/90 shadow-2xl shadow-amber-500/20 bg-slate-900/90 backdrop-blur-xl group flex flex-col justify-between">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-blue-600 rounded-3xl opacity-20 blur-lg group-hover:opacity-40 transition duration-500 pointer-events-none"></div>
            
            <div>
              {/* Poster Header Tag */}
              <div className="p-3.5 bg-gradient-to-r from-amber-950/80 to-slate-900 border-b border-amber-500/30 flex items-center justify-between">
                <span className="px-3 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[11px] font-black uppercase tracking-wider shadow">
                  Boys Dandiya Masterclass
                </span>
                <span className="text-xs font-bold text-amber-200">
                  27 Sep – 11 Oct • ₹1600
                </span>
              </div>

              {/* Poster Image */}
              <div className="relative w-full overflow-hidden bg-black/40">
                <img
                  src="/webbaneerboys.png"
                  alt="Boys Dandiya Workshop Poster (₹1600)"
                  className="w-full h-auto object-contain block transform group-hover:scale-[1.01] transition-transform duration-500"
                />
              </div>

              {/* Highlights Summary */}
              <div className="p-4 bg-slate-950/70 border-t border-amber-500/20 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-amber-300 font-semibold">
                  <Award className="w-3.5 h-3.5 text-yellow-300 flex-shrink-0" />
                  <span><strong>19 Oct:</strong> Open Round Competition Eligibility</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-yellow-400">★</span>
                  <span>Mentors: Manish Sir (Mr. Kishangarh '16) & Neel Sir ('19)</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-4 bg-slate-950 border-t border-amber-500/30">
              <button
                onClick={() => onSelectCategory('BOYS_DANDIYA')}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 text-white font-black text-xs sm:text-sm shadow-lg hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer ring-1 ring-amber-300"
              >
                <Zap className="w-4 h-4 text-yellow-300" />
                <span>BOOK BOYS DANDIYA (₹1600)</span>
                <ChevronRight className="w-4 h-4 text-white" />
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
