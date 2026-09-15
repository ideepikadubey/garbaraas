'use client';

import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, Award, Users, Flame, ChevronRight, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOpenRegister: () => void;
  onScrollToSlots: () => void;
}

export default function HeroSection({ onOpenRegister, onScrollToSlots }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-pink-50/20 to-white pt-4 pb-10 md:pt-6 md:pb-14 border-b border-pink-100">
      
      {/* Background Decorative Ambient Festive Pink Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[650px] bg-radial-gradient from-pink-200/20 to-transparent pointer-events-none blur-3xl opacity-40"></div>
      <div className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-pink-300/10 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/4 -right-24 w-[420px] h-[420px] rounded-full bg-rose-300/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-pink-200/10 blur-3xl pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Badges - Namo Club & Organizer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-pink-600 via-rose-600 to-pink-500 text-white shadow-md shadow-pink-500/25 border border-white ring-2 ring-pink-300 transform hover:scale-105 transition-all text-center">
            <span className="text-xs sm:text-sm md:text-base font-black tracking-wider sm:tracking-widest uppercase">
              NAMO CLUB KISHANGARH PRESENTS
            </span>
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-200 flex-shrink-0" />
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-pink-200 text-xs sm:text-sm font-bold text-garba-pink-950 shadow-sm text-center">
            <Sparkles className="w-3.5 h-3.5 text-pink-600 flex-shrink-0" />
            <span>The Frozen Night • Event & Entertainments</span>
          </div>
        </div>

        {/* TFN Crest & Diya Lights */}
        <div className="inline-flex items-center justify-center mb-2 sm:mb-2.5">
          <div className="relative">
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-garba-pink-400 bg-gradient-to-b from-pink-50 via-white to-rose-50 flex flex-col items-center justify-center shadow-md">
              <span className="garba-gradient-text font-serif font-black text-lg sm:text-2xl tracking-widest leading-none">TFN</span>
              <span className="text-[7px] sm:text-[9px] text-garba-pink-950 tracking-wider mt-0.5 font-extrabold uppercase">KISHANGARH</span>
            </div>
            {/* Floating Diya Icons */}
            <div className="absolute -left-3 sm:-left-3.5 top-1/2 -translate-y-1/2 diya-flicker">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-garba-pink-500 fill-garba-pink-400/30" />
            </div>
            <div className="absolute -right-3 sm:-right-3.5 top-1/2 -translate-y-1/2 diya-flicker">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-400/30" />
            </div>
          </div>
        </div>

        {/* Sub-heading Tag */}
        <div className="flex items-center justify-center gap-2 mb-1 px-2">
          <div className="h-px w-6 sm:w-8 bg-pink-300"></div>
          <p className="text-[10px] sm:text-xs text-garba-pink-800 font-sans tracking-widest uppercase font-extrabold text-center">
            Kishangarh's Biggest Garba & Dandiya Festival 2026
          </p>
          <div className="h-px w-6 sm:w-8 bg-pink-300"></div>
        </div>

        {/* Main Garba Workshop Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-[#22060c] tracking-tight leading-[1.1] my-1 sm:my-2 px-2">
          Garba & Dandiya <br className="hidden sm:inline" />
          <span className="garba-gradient-text font-serif italic text-4xl sm:text-5xl md:text-7xl block sm:inline mt-0.5 sm:mt-0">
            Classes by TFN
          </span>
        </h1>

        {/* Descriptive Summary */}
        <p className="text-xs sm:text-sm md:text-base text-stone-700 font-medium max-w-2xl mx-auto mt-1 sm:mt-1.5 px-2 leading-relaxed">
          Experience the divine joy of Navratri! Learn authentic Gujarat moves, graceful spins, live dhol rhythms, and stage choreography by renowned mentors <strong className="text-garba-pink-600 font-bold">Manish & Neel Sir</strong>.
        </p>

        {/* Free Family Pass Highlight Banner */}
        <div className="mt-3 sm:mt-4 mb-4 sm:mb-5 max-w-2xl mx-auto bg-gradient-to-r from-pink-50/90 via-white to-rose-50/90 border-2 border-pink-300 rounded-2xl p-3 sm:p-4 text-center shadow-sm relative overflow-hidden group hover:border-garba-pink-500 transition-all">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-garba-pink-800 font-extrabold text-[10px] sm:text-xs tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-garba-pink-600 flex-shrink-0" />
            <span>SPECIAL INCLUSION FOR ALL ENROLLEES</span>
            <Sparkles className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
          </div>
          <p className="text-sm sm:text-lg md:text-xl font-serif font-black garba-gradient-text mt-1 leading-snug">
            EVERY PARTICIPANT GETS A FREE FAMILY PASS FOR ONE DAY!
          </p>
          <p className="text-[10px] sm:text-xs text-stone-700 mt-0.5 font-semibold flex items-center justify-center gap-1.5 sm:gap-2">
            <span>Dance</span> • <span>Learn</span> • <span>Grow</span> • <span>Celebrate Together</span>
          </p>
        </div>

        {/* 4 Essential Highlights Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 text-left max-w-4xl mx-auto my-3 sm:my-4">
          
          {/* Pillar 1: Workshop Dates */}
          <div className="bg-white border-2 border-pink-200 rounded-2xl p-2.5 sm:p-3.5 hover:border-garba-pink-500 hover:shadow-sm transition-all">
            <div className="flex items-center gap-1.5 sm:gap-2 text-garba-pink-800 mb-0.5 sm:mb-1">
              <div className="p-1 sm:p-1.5 rounded-lg bg-pink-50 flex-shrink-0">
                <Calendar className="w-3.5 h-3.5 text-garba-pink-600" />
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider truncate">Workshop</span>
            </div>
            <div className="text-xs sm:text-sm md:text-base font-black text-garba-pink-950">13 Sept – 11 Oct</div>
            <div className="text-[9px] sm:text-[11px] font-semibold text-garba-pink-700 truncate">30-Day Intensive</div>
          </div>

          {/* Pillar 2: Booking Period */}
          <div className="bg-white border-2 border-rose-200 rounded-2xl p-2.5 sm:p-3.5 hover:border-rose-500 hover:shadow-sm transition-all">
            <div className="flex items-center gap-1.5 sm:gap-2 text-rose-800 mb-0.5 sm:mb-1">
              <div className="p-1 sm:p-1.5 rounded-lg bg-rose-50 flex-shrink-0">
                <Calendar className="w-3.5 h-3.5 text-rose-600" />
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider truncate">Booking Period</span>
            </div>
            <div className="text-xs sm:text-sm md:text-base font-black text-rose-950">9th to 19th Sept</div>
            <div className="text-[9px] sm:text-[11px] font-semibold text-rose-700 truncate">Limited Capacity</div>
          </div>

          {/* Pillar 3: Batch Timings */}
          <div className="bg-white border-2 border-fuchsia-200 rounded-2xl p-2.5 sm:p-3.5 hover:border-fuchsia-500 hover:shadow-sm transition-all">
            <div className="flex items-center gap-1.5 sm:gap-2 text-fuchsia-800 mb-0.5 sm:mb-1">
              <div className="p-1 sm:p-1.5 rounded-lg bg-fuchsia-50 flex-shrink-0">
                <Clock className="w-3.5 h-3.5 text-fuchsia-600" />
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider truncate">Timings</span>
            </div>
            <div className="text-xs sm:text-sm md:text-base font-black text-fuchsia-950">9:00 AM – 9:00 PM</div>
            <div className="text-[9px] sm:text-[11px] font-semibold text-fuchsia-700 truncate">Morning & Evening</div>
          </div>

          {/* Pillar 4: Top Venues */}
          <div className="bg-white border-2 border-pink-200 rounded-2xl p-2.5 sm:p-3.5 hover:border-garba-pink-500 hover:shadow-sm transition-all">
            <div className="flex items-center gap-1.5 sm:gap-2 text-garba-pink-800 mb-0.5 sm:mb-1">
              <div className="p-1 sm:p-1.5 rounded-lg bg-pink-50 flex-shrink-0">
                <MapPin className="w-3.5 h-3.5 text-garba-pink-600" />
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider truncate">3 Venues</span>
            </div>
            <div className="text-xs sm:text-sm md:text-base font-black text-garba-pink-950 truncate">TFN & Bang Hall</div>
            <div className="text-[9px] sm:text-[11px] font-semibold text-garba-pink-700 truncate">Kishangarh</div>
          </div>

        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 mt-4 sm:mt-5 px-2">
          <button
            onClick={onOpenRegister}
            id="hero-register-btn"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-garba-pink-600 via-rose-500 to-pink-500 text-white font-black text-sm sm:text-base shadow-lg shadow-pink-500/25 hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 tracking-wide cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-pink-200 flex-shrink-0" />
            <span>BOOK YOUR SLOT NOW</span>
            <ChevronRight className="w-4 h-4 text-white/80 flex-shrink-0" />
          </button>

          <button
            onClick={onScrollToSlots}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-white hover:bg-pink-50/80 border-2 border-garba-pink-500 text-garba-pink-800 font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4 text-garba-pink-600 flex-shrink-0" />
            <span>View Batches & Venues</span>
          </button>
        </div>

        {/* Trust Metrics */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-pink-100 text-[10px] sm:text-xs font-bold text-stone-700">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-garba-pink-600 flex-shrink-0" />
            <span>Grand Finale on 18th Oct</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
            <span>Live Dhol & Maha Aarti</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-garba-pink-600 flex-shrink-0" />
            <span>100% Female Safe Environment</span>
          </div>
        </div>

      </div>
    </section>
  );
}


