'use client';

import React from 'react';
import { Check, Sparkles, Star, ChevronRight } from 'lucide-react';
import { CategoryType } from '@/lib/types';

interface PricingSectionProps {
  onSelectCategory: (category: CategoryType) => void;
}

export default function PricingSection({ onSelectCategory }: PricingSectionProps) {
  return (
    <section id="pricing" className="relative py-12 md:py-18 bg-white border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs text-pink-700 uppercase tracking-widest font-black mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
            Active Workshop Categories
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-tight">
            WORKSHOP <span className="festive-gradient-text">CATEGORIES & FEES</span>
          </h2>
          <div className="h-[3.5px] w-24 sm:w-32 mx-auto my-3 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600"></div>
          <p className="text-xs sm:text-base text-slate-600 font-medium">
            Open for both <strong>Females (₹1500)</strong> and <strong>Males / Boys (₹1400)</strong>. Choose your category to register for the 1 to 11 Oct intensive batches!
          </p>
        </div>

        {/* 🌟 DUAL ACTIVE SPOTLIGHT HERO CARDS: FEMALE (₹1500) & MALE (₹1400) 🌟 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 max-w-5xl mx-auto">
          
          {/* Card 1: Female Masterclass (₹1500) */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-pink-500 shadow-2xl shadow-pink-500/20 bg-gradient-to-br from-pink-950 via-slate-900 to-rose-950 text-white p-6 sm:p-7 flex flex-col justify-between">
            <div className="h-1.5 w-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-400 absolute top-0 left-0 right-0"></div>

            <div>
              {/* Category Tag */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-wider shadow">
                  <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
                  <span>🌸 FEMALE ADMISSION</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400 text-emerald-300 text-[11px] font-bold">
                  🟢 SLOTS OPEN
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-black text-white">
                Special Female Workshop
              </h3>
              <p className="text-xs text-pink-200 font-semibold mt-0.5">
                1st to 11th Oct (11 Days Intensive • All Ages)
              </p>

              {/* Price Display */}
              <div className="my-4 p-3.5 rounded-2xl bg-white/10 border border-pink-500/30 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl sm:text-4xl font-serif font-black text-yellow-300">₹1500</span>
                  <span className="text-xs text-pink-200 font-medium"> / Person</span>
                </div>
                <span className="text-[11px] text-pink-200 font-bold bg-pink-500/30 px-2.5 py-1 rounded-full border border-pink-400">
                  Full 11-Day Course
                </span>
              </div>

              {/* Syllabus / Features */}
              <div className="space-y-2 text-xs text-slate-200">
                <div className="flex items-center gap-2 font-bold text-yellow-200">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Includes: Garba + Dandiya + Maha Arti</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Free 1-Day Family Pass Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>18 Oct Grand Competition Eligibility</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Venues: Bang Marriage Hall & TFN Studio</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-4 border-t border-pink-500/30">
              <button
                onClick={() => onSelectCategory('FEMALE_OCT_SPECIAL')}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-black text-xs sm:text-sm shadow-xl hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer ring-2 ring-pink-300"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>BOOK FEMALE ADMISSION (₹1500)</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Card 2: Male / Boys Dandiya Masterclass (₹1400) */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-blue-500 shadow-2xl shadow-blue-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-6 sm:p-7 flex flex-col justify-between">
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 absolute top-0 left-0 right-0"></div>

            <div>
              {/* Category Tag */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-wider shadow">
                  <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
                  <span>🕺 MALE / BOYS ADMISSION</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400 text-emerald-300 text-[11px] font-bold">
                  🟢 SLOTS OPEN
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-black text-white">
                Boys Dandiya Workshop
              </h3>
              <p className="text-xs text-blue-200 font-semibold mt-0.5">
                1st to 11th Oct (11 Days Intensive • All Ages)
              </p>

              {/* Price Display */}
              <div className="my-4 p-3.5 rounded-2xl bg-white/10 border border-blue-500/30 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl sm:text-4xl font-serif font-black text-yellow-300">₹1400</span>
                  <span className="text-xs text-blue-200 font-medium"> / Person</span>
                </div>
                <span className="text-[11px] text-blue-200 font-bold bg-blue-500/30 px-2.5 py-1 rounded-full border border-blue-400">
                  Full 11-Day Course
                </span>
              </div>

              {/* Syllabus / Features */}
              <div className="space-y-2 text-xs text-slate-200">
                <div className="flex items-center gap-2 font-bold text-yellow-200">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Dandiya Masterclass + Formations + Fast Steps</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Free 1-Day Family Pass Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>18 Oct Grand Competition Round Eligibility</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Venues: Bang Marriage Hall & TFN Studio</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-4 border-t border-blue-500/30">
              <button
                onClick={() => onSelectCategory('BOYS_DANDIYA')}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 text-white font-black text-xs sm:text-sm shadow-xl hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer ring-2 ring-blue-300"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>BOOK MALE DANDIYA (₹1400)</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

        </div>

        {/* Free Family Pass Banner */}
        <div className="mb-10 max-w-3xl mx-auto rounded-3xl bg-gradient-to-r from-pink-50/90 via-amber-50/70 to-pink-50/90 border-2 border-pink-300 p-5 sm:p-6 text-center shadow-md relative overflow-hidden">
          <div className="inline-flex items-center gap-2 text-pink-800 font-serif font-bold text-xs sm:text-sm tracking-widest uppercase mb-1">
            <Star className="w-4 h-4 fill-pink-500 text-pink-500" />
            Special Navratri Gift
            <Star className="w-4 h-4 fill-pink-500 text-pink-500" />
          </div>
          <h3 className="text-lg sm:text-2xl font-serif font-black festive-gradient-text mt-0.5">
            EVERY PARTICIPANT GETS A FREE FAMILY PASS FOR ONE DAY!
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 mt-1 font-semibold tracking-wide">
            Bring your family to witness your performance and celebrate Kishangarh's biggest Garba celebration!
          </p>
        </div>
      </div>
    </section>
  );
}

