'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Flame, Clock, ChevronRight, AlertCircle, CheckCircle2, Ticket } from 'lucide-react';

interface UrgencyBannerSectionProps {
  onOpenRegister: () => void;
  onScrollToSlots: () => void;
}

export default function UrgencyBannerSection({
  onOpenRegister,
  onScrollToSlots,
}: UrgencyBannerSectionProps) {
  return (
    <section className="relative py-12 md:py-18 overflow-hidden bg-gradient-to-b from-pink-500/10 via-slate-900/5 to-blue-500/10 border-y-2 border-pink-500/30">
      
      {/* Decorative festive ambient glows */}
      <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-pink-500/20 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border-2 border-pink-500/70 shadow-2xl shadow-pink-500/15 overflow-hidden">
          
          {/* Top Decorative Border Ribbon */}
          <div className="h-2 w-full bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600"></div>

          <div className="p-5 sm:p-8 md:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Visual Meme / Poster with Festive Frame */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative group max-w-md w-full">
                  
                  {/* Glowing halo behind poster */}
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-yellow-400 rounded-3xl blur-md opacity-80 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>
                  
                  {/* Poster Image Container */}
                  <div className="relative rounded-2xl overflow-hidden bg-slate-900 border-2 border-pink-300 shadow-2xl transform transition-transform duration-300 group-hover:scale-[1.02]">
                    <img
                      src="/images/baad-me-full.png"
                      alt="बाद में? BAAD ME CLASS FULL HO JAATI HAI !! - TFN Garba Class Admissions"
                      className="w-full h-auto object-cover block"
                    />
                    
                    {/* Subtle Shine Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-white/10 pointer-events-none"></div>
                  </div>

                  {/* Floating badge on top right */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-black text-[11px] sm:text-xs uppercase px-3 py-1 rounded-full shadow-lg border-2 border-yellow-300 flex items-center gap-1 rotate-2 animate-bounce">
                    <Flame className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                    <span>Don't Delay!</span>
                  </div>
                </div>
              </div>

              {/* Right Column: High Conversion Copy & Action */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left">
                
                {/* Urgent Eyebrow Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/20 border border-pink-400 text-pink-300 font-black text-xs uppercase tracking-wider mb-4 w-fit backdrop-blur-sm">
                  <Flame className="w-4 h-4 text-pink-400 animate-pulse" />
                  <span>Kishangarh's Most Anticipated Garba Workshop</span>
                </div>

                {/* Punchy Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-black text-white leading-tight tracking-tight">
                  <span className="text-yellow-300">"बाद में?"</span> <br className="hidden sm:inline" />
                  <span className="festive-gradient-text">Baad Me Class Full Ho Jaati Hai!</span>
                </h2>

                {/* Subtext description */}
                <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                  Every season, hundreds wait till the last week only to find their preferred batch and venue completely booked. 
                  Don't miss out on Kishangarh's grandest Garba celebration with renowned mentors <strong>Manish & Neel Sir</strong>!
                </p>

                {/* Key Quick Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
                  <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/5 border border-pink-500/30 backdrop-blur-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">Limited Batch Capacity</h4>
                      <p className="text-[11px] text-pink-200/90 font-medium">Strict caps per slot for personalized attention</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/5 border border-emerald-500/30 backdrop-blur-sm">
                    <Ticket className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">Free Family Pass Included</h4>
                      <p className="text-[11px] text-emerald-200/90 font-medium">1-Day free family pass for every enrollee</p>
                    </div>
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    onClick={onOpenRegister}
                    className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-black text-sm sm:text-base shadow-lg shadow-pink-500/30 ring-2 ring-pink-300 hover:shadow-xl hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-300 flex-shrink-0 animate-pulse" />
                    <span>BOOK YOUR SEAT NOW</span>
                    <ChevronRight className="w-4 h-4 text-white flex-shrink-0" />
                  </button>

                  <button
                    onClick={onScrollToSlots}
                    className="px-5 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 backdrop-blur-md border-2 border-emerald-400/80 text-emerald-300 font-bold text-xs sm:text-sm shadow-md hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                  >
                    <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Check Live Batches & Seats</span>
                  </button>
                </div>

                {/* Urgency Counter / Note */}
                <p className="text-[11px] sm:text-xs text-slate-300 font-semibold mt-4 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
                  <span>Workshop starts 13th September. Early bird bookings closing soon!</span>
                </p>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
