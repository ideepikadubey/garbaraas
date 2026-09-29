'use client';

import React from 'react';
import { Check, Sparkles, Star } from 'lucide-react';
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
            Official Workshop Admissions
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-tight">
            WORKSHOP <span className="festive-gradient-text">FEES & CATEGORIES</span>
          </h2>
          <div className="h-[3.5px] w-24 sm:w-32 mx-auto my-3 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600"></div>
          <p className="text-xs sm:text-base text-slate-600 font-medium">
            Learn authentic Gujarat steps, graceful spins, live dhol beats, and master skills under Kishangarh's top choreographers.
          </p>
        </div>

        {/* 🚨 HOUSEFULL ALERT & NEW 1 TO 11 OCT SPECIAL SPOTLIGHT HERO BANNER 🚨 */}
        <div className="mb-10 max-w-4xl mx-auto relative rounded-3xl overflow-hidden border-2 border-pink-500 shadow-2xl shadow-pink-500/20 bg-gradient-to-br from-pink-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8">
          
          {/* Top Decorative Festive Ribbon */}
          <div className="h-1.5 w-full bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600 absolute top-0 left-0 right-0"></div>

          {/* Floating Live Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-[11px] uppercase tracking-wider shadow-md mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            <span>🟢 NEW SPECIAL BATCH OPEN • REGISTER NOW</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 text-left space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-pink-500/30 border border-pink-400 text-pink-300 text-xs font-bold">
                  1st to 11th Oct (11 Days)
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/30 border border-amber-400 text-yellow-300 text-xs font-bold">
                  Females Only • Open Age
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400 text-emerald-300 text-xs font-bold">
                  Venues: Bang Marriage Hall (5–6 PM & 6–7 PM) & TFN Studio (11 AM–12 PM & 12–1 PM)
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-white leading-tight">
                Special Female Workshop <span className="text-yellow-300">(1 to 11 Oct)</span>
              </h3>
              <p className="text-xs sm:text-sm text-pink-100/90 font-medium">
                Specially introduced for new participants! Master <strong>Garba, Dandiya & Maha Arti</strong> with live dhol beats and qualify for the Kishangarh Grand Garba Competition.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-200">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>Garba + Dandiya + Maha Arti</strong> Included</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Free 1-Day Family Pass for All</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>18 Oct Grand Competition Eligibility</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Neel Sir & Manish Sir Choreography</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center text-center lg:text-right border-t lg:border-t-0 lg:border-l border-pink-500/30 pt-4 lg:pt-0 lg:pl-6">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Special Admission Fee
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-serif font-black text-yellow-300">₹1800</span>
                <span className="text-xs text-slate-300 font-semibold">/ Person</span>
              </div>
              <p className="text-[11px] text-emerald-300 font-bold mt-1">11-Day Complete Masterclass</p>
              
              <button
                onClick={() => onSelectCategory('FEMALE_OCT_SPECIAL')}
                className="mt-4 w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-pink-500/40 hover:scale-105 active:scale-95 transition cursor-pointer ring-2 ring-pink-300 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>BOOK 1–11 OCT SPECIAL (₹1800)</span>
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
