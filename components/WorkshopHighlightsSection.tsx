'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Ticket, Sparkles, AlertCircle } from 'lucide-react';

interface WorkshopHighlightsSectionProps {
  onOpenRegister: () => void;
  onScrollToSlots: () => void;
}

export default function WorkshopHighlightsSection({
  onOpenRegister,
  onScrollToSlots,
}: WorkshopHighlightsSectionProps) {
  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      
      {/* Container with premium card aesthetics */}
      <div className="space-y-4">
        
        {/* Highlight 1: Special Announcement & Free Family Pass Bar */}
        <div className="rounded-3xl bg-slate-900 border-2 border-pink-500/50 p-4 sm:p-5 shadow-2xl shadow-pink-500/15 text-center space-y-3 relative overflow-hidden backdrop-blur-xl">
          {/* Top Multi-color accent ribbon */}
          <div className="w-full h-1 bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600 absolute top-0 left-0 right-0"></div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider shadow animate-pulse">
              🚨 1 TO 11 OCT BATCHES OPEN
            </span>
            <span className="text-sm sm:text-base font-bold text-white">
              Special Batches: Female (<strong className="text-yellow-300 font-extrabold">₹1500</strong>) & Male Dandiya (<strong className="text-yellow-300 font-extrabold">₹1400</strong>)
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-xs sm:text-sm font-semibold text-pink-200">
              Garba, Dandiya & Maha Arti Tracks
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 border-t border-slate-800 text-xs sm:text-sm font-bold text-yellow-300">
            <div className="flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-yellow-400 flex-shrink-0 animate-bounce" />
              <span>★ Every participant gets a <strong className="text-white underline decoration-yellow-400 decoration-2">Free Family Pass</strong> for 1 Day!</span>
            </div>
            <div className="flex items-center gap-1.5 text-red-300 text-[11px] sm:text-xs font-medium bg-red-950/60 px-2.5 py-0.5 rounded-full border border-red-800/80">
              <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span>Regular slots are fully booked</span>
            </div>
          </div>
        </div>

        {/* Highlight 2: 4 Key Pillars Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
          
          {/* Card 1: Workshop Dates (Pink) */}
          <div className="bg-white border-2 border-pink-200 hover:border-pink-400 rounded-2xl p-3.5 sm:p-4 shadow-md hover:shadow-lg transition-all group">
            <div className="flex items-center gap-2 text-pink-600 mb-1.5">
              <div className="p-1.5 rounded-xl bg-pink-50 border border-pink-200 flex-shrink-0 group-hover:bg-pink-100 transition">
                <Calendar className="w-4 h-4 text-pink-600" />
              </div>
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider">Special Dates</span>
            </div>
            <div className="text-sm sm:text-base font-black text-slate-900 font-heading">1st to 11th Oct</div>
            <div className="text-xs text-pink-700 font-semibold mt-0.5">11-Day Special Masterclass</div>
          </div>

          {/* Card 2: Syllabus (Emerald) */}
          <div className="bg-white border-2 border-emerald-200 hover:border-emerald-400 rounded-2xl p-3.5 sm:p-4 shadow-md hover:shadow-lg transition-all group">
            <div className="flex items-center gap-2 text-emerald-600 mb-1.5">
              <div className="p-1.5 rounded-xl bg-emerald-50 border border-emerald-200 flex-shrink-0 group-hover:bg-emerald-100 transition">
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider">Syllabus</span>
            </div>
            <div className="text-xs sm:text-sm font-black text-slate-900 font-heading leading-snug">Garba, Dandiya & Maha Arti</div>
            <div className="text-xs text-emerald-700 font-semibold mt-0.5">All 3 Styles Included</div>
          </div>

          {/* Card 3: Timings (Gold/Yellow) */}
          <div className="bg-white border-2 border-yellow-200 hover:border-yellow-400 rounded-2xl p-3.5 sm:p-4 shadow-md hover:shadow-lg transition-all group">
            <div className="flex items-center gap-2 text-yellow-700 mb-1.5">
              <div className="p-1.5 rounded-xl bg-yellow-50 border border-yellow-200 flex-shrink-0 group-hover:bg-yellow-100 transition">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider">Timings</span>
            </div>
            <div className="text-xs sm:text-sm font-black text-slate-900 font-heading leading-snug">5–6 PM, 6–7 PM, 11–12 PM, 12–1 PM</div>
            <div className="text-xs text-yellow-800 font-semibold mt-0.5">Morning & Evening Batches</div>
          </div>

          {/* Card 4: Venues (Navy/Blue) */}
          <div className="bg-white border-2 border-blue-200 hover:border-blue-400 rounded-2xl p-3.5 sm:p-4 shadow-md hover:shadow-lg transition-all group">
            <div className="flex items-center gap-2 text-blue-600 mb-1.5">
              <div className="p-1.5 rounded-xl bg-blue-50 border border-blue-200 flex-shrink-0 group-hover:bg-blue-100 transition">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider">Venues</span>
            </div>
            <div className="text-xs sm:text-sm font-black text-slate-900 font-heading leading-snug">Bang Marriage Hall & TFN Studio</div>
            <div className="text-xs text-blue-700 font-semibold mt-0.5">Kishangarh • Both Venues Open</div>
          </div>

        </div>

      </div>
    </section>
  );
}
