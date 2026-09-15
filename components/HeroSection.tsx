'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Sparkles, Award, Users, Flame, ChevronRight, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOpenRegister: () => void;
  onScrollToSlots: () => void;
}

export default function HeroSection({ onOpenRegister, onScrollToSlots }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-4 pb-10 md:pt-6 md:pb-14 border-b border-amber-100">
      
      {/* Background Video (GARBA.mp4) with High Visibility */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-70 filter saturate-125 brightness-105"
        >
          <source src="/GARBA.mp4" type="video/mp4" />
        </video>
        {/* Soft Ambient White/Amber Tint Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/35 to-white/75 backdrop-blur-[0.5px]"></div>
      </div>

      {/* Background Decorative Ambient Festive Golden Yellow Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[650px] bg-radial-gradient from-yellow-200/25 to-transparent pointer-events-none blur-3xl opacity-50 z-0"></div>
      <div className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-amber-300/15 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute top-1/4 -right-24 w-[420px] h-[420px] rounded-full bg-yellow-300/15 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-amber-200/15 blur-3xl pointer-events-none z-0"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Top Badges - Namo Club Kishangarh Presents & Co Powered By (Centered Stack) */}
        <div className="flex flex-col items-center justify-center gap-1.5 sm:gap-2.5 mb-2 sm:mb-4 px-1">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-1 sm:py-2 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-stone-950 font-black shadow-md shadow-amber-500/20 border border-amber-300 ring-2 ring-yellow-200 transform hover:scale-105 transition-all text-center max-w-full">
            <span className="text-[10px] min-[360px]:text-xs sm:text-sm md:text-base tracking-wider uppercase font-black">
              NAMO CLUB KISHANGARH PRESENTS
            </span>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-stone-950 flex-shrink-0" />
          </div>
          
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-0.5 sm:py-1.5 rounded-full bg-white/95 border border-amber-300 text-[10px] min-[360px]:text-xs sm:text-sm font-bold text-amber-950 shadow-sm text-center max-w-full">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 flex-shrink-0" />
            <span className="truncate max-w-[280px] sm:max-w-none">Co Powered By The Frozen Night Event and Entertainment</span>
          </div>
        </div>

        {/* Official TFN Logo */}
        <div className="inline-flex items-center justify-center my-1.5 sm:my-3">
          <img
            src="/images/TFN.png"
            alt="The Frozen Night (TFN) Logo"
            className="w-24 h-24 min-[360px]:w-28 min-[360px]:h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Sub-heading Tag */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 px-2">
          <div className="h-px w-4 sm:w-8 bg-amber-300"></div>
          <p className="text-[9px] min-[360px]:text-[10px] sm:text-xs text-amber-800 font-sans tracking-wider sm:tracking-widest uppercase font-extrabold text-center">
            Kishangarh's Biggest Garba & Dandiya Festival 2026
          </p>
          <div className="h-px w-4 sm:w-8 bg-amber-300"></div>
        </div>

        {/* Main Garba Festival Title */}
        <h1 className="text-2xl min-[360px]:text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-[#22060c] tracking-tight leading-[1.15] my-1 sm:my-2 px-2">
          Garba Raas <br className="hidden sm:inline" />
          <span className="garba-gradient-text font-serif italic text-3xl min-[360px]:text-4xl sm:text-5xl md:text-7xl block sm:inline mt-0.5 sm:mt-0">
            Dandiya Mahotsav
          </span>
        </h1>

        {/* Descriptive Summary */}
        <p className="text-xs sm:text-sm md:text-base text-stone-700 font-medium max-w-2xl mx-auto mt-1 sm:mt-1.5 px-2 leading-relaxed">
          Experience the divine joy of Navratri! Learn authentic Gujarat moves, graceful spins, live dhol rhythms, and stage choreography by renowned mentors <strong className="text-amber-700 font-bold">Manish & Neel Sir</strong>.
        </p>

        {/* Free Family Pass Highlight Banner */}
        <div className="mt-2.5 sm:mt-4 mb-3.5 sm:mb-5 max-w-2xl mx-auto bg-gradient-to-r from-amber-50/90 via-yellow-50/70 to-amber-50/90 border-2 border-amber-300 rounded-2xl p-2.5 sm:p-4 text-center shadow-sm relative overflow-hidden group hover:border-amber-500 transition-all">
          <div className="flex items-center justify-center gap-1 sm:gap-2 text-amber-900 font-extrabold text-[9px] min-[360px]:text-[10px] sm:text-xs tracking-wider uppercase">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 flex-shrink-0" />
            <span>SPECIAL INCLUSION FOR ALL ENROLLEES</span>
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 flex-shrink-0" />
          </div>
          <p className="text-xs min-[360px]:text-sm sm:text-lg md:text-xl font-serif font-black garba-gradient-text mt-0.5 sm:mt-1 leading-snug">
            EVERY PARTICIPANT GETS A FREE FAMILY PASS FOR ONE DAY!
          </p>
          <p className="text-[9px] min-[360px]:text-[10px] sm:text-xs text-stone-700 mt-0.5 font-semibold flex items-center justify-center gap-1.5 sm:gap-2">
            <span>Dance</span> • <span>Learn</span> • <span>Grow</span> • <span>Celebrate Together</span>
          </p>
        </div>

        {/* 4 Essential Highlights Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 min-[360px]:gap-2 sm:gap-3 text-left max-w-4xl mx-auto my-2.5 sm:my-4">
          
          {/* Pillar 1: Workshop Dates */}
          <div className="bg-white border-2 border-amber-200 rounded-xl sm:rounded-2xl p-2 min-[360px]:p-2.5 sm:p-3.5 hover:border-amber-400 hover:shadow-sm transition-all">
            <div className="flex items-center gap-1 sm:gap-2 text-amber-800 mb-0.5 sm:mb-1">
              <div className="p-0.5 min-[360px]:p-1 sm:p-1.5 rounded-lg bg-amber-50 flex-shrink-0">
                <Calendar className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 text-amber-600" />
              </div>
              <span className="text-[9px] min-[360px]:text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider truncate">Workshop</span>
            </div>
            <div className="text-[11px] min-[360px]:text-xs sm:text-sm md:text-base font-black text-amber-950">13 Sept – 11 Oct</div>
            <div className="text-[8px] min-[360px]:text-[9px] sm:text-[11px] font-semibold text-amber-700 truncate">30-Day Intensive</div>
          </div>

          {/* Pillar 2: Booking Period */}
          <div className="bg-white border-2 border-yellow-200 rounded-2xl p-2.5 sm:p-3.5 hover:border-yellow-400 hover:shadow-sm transition-all">
            <div className="flex items-center gap-1.5 sm:gap-2 text-amber-800 mb-0.5 sm:mb-1">
              <div className="p-1 sm:p-1.5 rounded-lg bg-yellow-50 flex-shrink-0">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider truncate">Booking Period</span>
            </div>
            <div className="text-xs sm:text-sm md:text-base font-black text-amber-950">9th to 19th Sept</div>
            <div className="text-[9px] sm:text-[11px] font-semibold text-amber-700 truncate">Limited Capacity</div>
          </div>

          {/* Pillar 3: Batch Timings */}
          <div className="bg-white border-2 border-amber-200 rounded-2xl p-2.5 sm:p-3.5 hover:border-amber-400 hover:shadow-sm transition-all">
            <div className="flex items-center gap-1.5 sm:gap-2 text-amber-800 mb-0.5 sm:mb-1">
              <div className="p-1 sm:p-1.5 rounded-lg bg-amber-50 flex-shrink-0">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider truncate">Timings</span>
            </div>
            <div className="text-xs sm:text-sm md:text-base font-black text-amber-950">9:00 AM – 9:00 PM</div>
            <div className="text-[9px] sm:text-[11px] font-semibold text-amber-700 truncate">Morning & Evening</div>
          </div>

          {/* Pillar 4: Top Venues */}
          <div className="bg-white border-2 border-yellow-200 rounded-2xl p-2.5 sm:p-3.5 hover:border-yellow-400 hover:shadow-sm transition-all">
            <div className="flex items-center gap-1.5 sm:gap-2 text-amber-800 mb-0.5 sm:mb-1">
              <div className="p-1 sm:p-1.5 rounded-lg bg-yellow-50 flex-shrink-0">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider truncate">3 Venues</span>
            </div>
            <div className="text-xs sm:text-sm md:text-base font-black text-amber-950 truncate">TFN & Bang Hall</div>
            <div className="text-[9px] sm:text-[11px] font-semibold text-amber-700 truncate">Kishangarh</div>
          </div>

        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 mt-4 sm:mt-5 px-2">
          <button
            onClick={onOpenRegister}
            id="hero-register-btn"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 ring-2 ring-amber-300 hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 tracking-wide cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-stone-950 flex-shrink-0" />
            <span>BOOK YOUR SLOT NOW</span>
            <ChevronRight className="w-4 h-4 text-stone-950/80 flex-shrink-0" />
          </button>

          <button
            onClick={onScrollToSlots}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-white hover:bg-amber-50/80 border-2 border-amber-400 text-amber-900 font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>View Batches & Venues</span>
          </button>
        </div>

        {/* Trust Metrics */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-amber-100 text-[10px] sm:text-xs font-bold text-stone-700">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>Grand Finale on 18th Oct</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>Live Dhol & Maha Aarti</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>100% Female Safe Environment</span>
          </div>
        </div>

      </div>
    </section>
  );
}
