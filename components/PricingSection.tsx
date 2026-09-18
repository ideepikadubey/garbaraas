'use client';

import React from 'react';
import { Check, Sparkles, Star, Users } from 'lucide-react';
import { CategoryType } from '@/lib/types';

interface PricingSectionProps {
  onSelectCategory: (category: CategoryType) => void;
}

export default function PricingSection({ onSelectCategory }: PricingSectionProps) {
  return (
    <section id="pricing" className="relative py-10 md:py-16 bg-white border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs text-pink-700 uppercase tracking-widest font-black mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            Simple Transparent Pricing
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-tight">
            WORKSHOP <span className="festive-gradient-text">FEES & CATEGORIES</span>
          </h2>
          <div className="h-[3.5px] w-24 sm:w-32 mx-auto my-3 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600"></div>
          <p className="text-xs sm:text-base text-slate-600 font-medium">
            One full month of intensive learning, choreography, live music rehearsals, and eligibility for the Kishangarh competition round.
          </p>
        </div>

        {/* Highlight Banner: Free Family Pass */}
        <div className="mb-12 max-w-3xl mx-auto rounded-3xl bg-gradient-to-r from-pink-50/90 via-amber-50/70 to-pink-50/90 border-2 border-pink-300 p-6 sm:p-7 text-center shadow-md relative overflow-hidden">
          <div className="inline-flex items-center gap-2 text-pink-800 font-serif font-bold text-xs sm:text-sm tracking-widest uppercase mb-1">
            <Star className="w-4 h-4 fill-pink-500 text-pink-500" />
            Special Navratri Gift
            <Star className="w-4 h-4 fill-pink-500 text-pink-500" />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-black festive-gradient-text mt-1">
            EVERY PARTICIPANT GETS A FREE FAMILY PASS FOR ONE DAY!
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 mt-2 font-semibold tracking-wide">
            Bring your family to witness your performance and celebrate Kishangarh's biggest Garba celebration!
          </p>
          <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-white border border-pink-300 text-xs font-mono font-black text-pink-900 shadow-xs">
            Dance • Learn • Grow • Together
          </div>
        </div>

        {/* 4 Pricing Cards with Distinct Vibrant Garba Identities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          
          {/* Card 1: Female (Rani Pink Theme) */}
          <div className="relative rounded-3xl bg-white border-2 border-pink-300 p-5 sm:p-6 flex flex-col justify-between hover:border-pink-500 hover:shadow-pink-500/15 hover:shadow-lg transition-all duration-300 group">
            <div>
              <div className="text-xs uppercase font-black tracking-widest text-pink-700 mb-1">
                Category A • Flagship
              </div>
              <h3 className="text-xl font-serif font-black text-slate-900 group-hover:text-pink-600 transition">
                Female Admission
              </h3>
              <p className="text-xs text-pink-800 mt-0.5 font-bold">
                (Only Females • Open Age)
              </p>

              <div className="my-5 pb-3 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-serif font-black text-pink-600">₹2500</span>
                  <span className="text-xs font-semibold text-slate-500">/ 1 Month</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Full 30-day comprehensive workshop</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 font-medium mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span>All 8 Traditional Styles</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span>Free Family Pass for 1 Day</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span>Choreography by Manish & Neel Sir</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span>Eligible for Queen of Kishangarh</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span>15-Day Workshop Option (2 Patterns Taught)</span>
                </li>
              </ul>
            </div>

            <div className="space-y-1.5">
              <button
                onClick={() => onSelectCategory('FEMALE')}
                className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-black text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-95 transition cursor-pointer"
              >
                Register Full Month (₹2500)
              </button>
              <button
                onClick={() => onSelectCategory('FEMALE_15DAY')}
                className="w-full py-1.5 px-2 rounded-xl bg-pink-50 border border-pink-300 text-pink-800 font-black text-[11px] hover:bg-pink-100 transition cursor-pointer"
              >
                Special 15-Day Batch (₹1800)
              </button>
            </div>
          </div>

          {/* Card 2: Old TFN / Group (Featured - Golden Saffron Theme) */}
          <div className="relative rounded-3xl bg-white border-2 border-amber-400 p-5 sm:p-6 flex flex-col justify-between shadow-lg hover:shadow-amber-500/20 transition-all duration-300 group">
            
            {/* Best Value Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md flex items-center gap-1 whitespace-nowrap">
              <Users className="w-3 h-3" />
              <span>GROUP / ALUMNI</span>
            </div>

            <div>
              <div className="text-xs uppercase font-black tracking-widest text-amber-700 mb-1 mt-1">
                Category B • Best Value
              </div>
              <h3 className="text-xl font-serif font-black text-slate-900 group-hover:text-amber-600 transition">
                Old Student / Group
              </h3>
              <p className="text-xs text-amber-800 font-bold mt-0.5">
                (Old Student OR 5+ Group)
              </p>

              <div className="my-5 pb-3 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-serif font-black text-amber-600">₹2200</span>
                  <span className="text-xs font-semibold text-slate-500">/ person</span>
                </div>
                <p className="text-[11px] text-emerald-700 mt-1 font-bold">Save ₹300 per participant</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 font-medium mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Valid for Previous TFN Students</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Valid for New Groups (5+ Members)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Free Family Pass for Every Member</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Group Formations & Coordination</span>
                </li>
              </ul>
            </div>

            <div className="space-y-1.5">
              <button
                onClick={() => onSelectCategory('GROUP')}
                className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-95 transition cursor-pointer"
              >
                Register Group (₹2200/ea)
              </button>
              <button
                onClick={() => onSelectCategory('OLD_STUDENT')}
                className="w-full py-1.5 px-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 font-black text-[11px] hover:bg-amber-100 transition cursor-pointer"
              >
                Old TFN Student (₹2200)
              </button>
            </div>
          </div>

          {/* Card 3: Kids (Emerald Green Theme) */}
          <div className="relative rounded-3xl bg-white border-2 border-emerald-300 p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-500 hover:shadow-emerald-500/15 hover:shadow-lg transition-all duration-300 group">
            <div>
              <div className="text-xs uppercase font-black tracking-widest text-emerald-700 mb-1">
                Category C • Juniors
              </div>
              <h3 className="text-xl font-serif font-black text-slate-900 group-hover:text-emerald-700 transition">
                Kids Girls
              </h3>
              <p className="text-xs text-emerald-800 mt-0.5 font-bold">
                (Age 7–16 Years • Girls Only)
              </p>

              <div className="my-5 pb-3 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-serif font-black text-emerald-600">₹2000</span>
                  <span className="text-xs font-semibold text-slate-500">/ 1 Month</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Specially tailored kid-friendly pacing</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 font-medium mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Age 7 to 16 Years (Girls)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Safe & Female-Led Environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Eligible for Princess Title</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Free Family Pass for 1 Day</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectCategory('KIDS')}
              className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 text-white font-black text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-95 transition cursor-pointer"
            >
              Register Kids (₹2000)
            </button>
          </div>

          {/* Card 4: Boys Dandiya Special (Royal Blue & Navy Theme) */}
          <div className="relative rounded-3xl bg-white border-2 border-blue-300 p-5 sm:p-6 flex flex-col justify-between hover:border-blue-500 shadow-md hover:shadow-blue-500/15 hover:shadow-lg transition-all duration-300 group">
            
            {/* New Batch Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-black text-[10px] uppercase tracking-wider shadow-md flex items-center gap-1 whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              <span>NEW ANNOUNCED</span>
            </div>

            <div>
              <div className="text-xs uppercase font-black tracking-widest text-blue-700 mb-1 mt-1">
                Category D • Boys & Men
              </div>
              <h3 className="text-xl font-serif font-black text-slate-900 group-hover:text-blue-700 transition">
                Boys Dandiya Class
              </h3>
              <p className="text-xs text-blue-800 mt-0.5 font-bold">
                (Age 8–40 Years • Boys & Men)
              </p>

              <div className="my-5 pb-3 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-serif font-black text-blue-600">₹1600</span>
                  <span className="text-xs font-semibold text-slate-500">/ 15 Days</span>
                </div>
                <p className="text-[11px] text-blue-700 mt-1 font-bold">Starts 27th Sept • 27 Sep - 11 Oct</p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 font-medium mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Dandiya Steps, Patterns & Strategy</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Manish Sir & Neel Sir Guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>19 Oct Open Round Competition</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Includes Free 1-Day Family Pass</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectCategory('BOYS_DANDIYA')}
              className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-black text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-95 transition cursor-pointer"
            >
              Register Boys (₹1600)
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
