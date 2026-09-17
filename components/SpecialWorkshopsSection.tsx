'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, ChevronRight, Award, Flame, AlertCircle, Phone, Info } from 'lucide-react';
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
            <span>NEWLY ANNOUNCED SPECIAL WORKSHOPS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-white">
            FAST-TRACK <span className="festive-gradient-text">FESTIVE WORKSHOPS</span>
          </h2>
          <div className="h-[3.5px] w-28 sm:w-36 mx-auto my-3 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600"></div>
          <p className="text-xs sm:text-base text-slate-300 font-medium">
            Specially tailored for participants joining mid-season! Learn competition-ready choreography, live dhol beats, and master skills in just 15 days.
          </p>
        </div>

        {/* Official Featured Web Banner */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-pink-400/90 shadow-2xl shadow-pink-500/20 bg-slate-900/90 backdrop-blur-xl group mb-8">
          
          {/* Glowing Ambient Backdrop Behind Banner */}
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-yellow-400 to-blue-600 rounded-3xl opacity-25 blur-lg group-hover:opacity-40 transition duration-500 pointer-events-none"></div>

          {/* Web Banner Image */}
          <div className="relative w-full overflow-hidden rounded-3xl">
            <img
              src="/web%20banner.png"
              alt="Fast Track Festive Workshops Web Banner"
              className="w-full h-auto object-cover block transform group-hover:scale-[1.01] transition-transform duration-500"
            />
          </div>

          {/* Direct Action Registration Bar Below Web Banner */}
          <div className="relative p-4 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-t border-pink-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-xs">
              <span className="px-3.5 py-1.5 rounded-full bg-pink-600/30 border border-pink-400 text-pink-200 font-bold flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                <span>Girls Special (26 Sep–11 Oct): <strong>₹1500</strong></span>
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-blue-600/30 border border-blue-400 text-cyan-200 font-bold flex items-center gap-1.5 shadow-sm">
                <Flame className="w-3.5 h-3.5 text-yellow-300" />
                <span>Boys Dandiya (27 Sep–11 Oct): <strong>₹1500</strong></span>
              </span>
            </div>

            {/* Quick Registration CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
              <button
                onClick={() => onSelectCategory('FEMALE_15DAY')}
                className="flex-1 sm:flex-none py-3 px-5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-black text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-1.5 cursor-pointer ring-1 ring-pink-300"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>BOOK GIRLS (26 SEP - 11 OCT • ₹1500)</span>
              </button>

              <button
                onClick={() => onSelectCategory('BOYS_DANDIYA')}
                className="flex-1 sm:flex-none py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-black text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-1.5 cursor-pointer ring-1 ring-cyan-300"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>BOOK BOYS (27 SEP - 11 OCT • ₹1500)</span>
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
