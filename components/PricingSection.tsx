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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs text-garba-pink-800 uppercase tracking-widest font-bold mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-garba-pink-600" />
            Simple Transparent Pricing
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-maroon-950 tracking-tight">
            WORKSHOP <span className="garba-gradient-text">FEES & CATEGORIES</span>
          </h2>
          <div className="h-[3px] w-24 sm:w-32 mx-auto my-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500"></div>
          <p className="text-xs sm:text-base text-stone-700 font-medium">
            One full month of intensive learning, choreography, live music rehearsals, and eligibility for the Kishangarh competition round.
          </p>
        </div>

        {/* Highlight Banner: Free Family Pass */}
        <div className="mb-12 max-w-3xl mx-auto rounded-3xl bg-gradient-to-r from-pink-50/90 via-white to-rose-50/90 border-2 border-pink-300 p-6 sm:p-7 text-center shadow-md relative overflow-hidden">
          <div className="inline-flex items-center gap-2 text-garba-pink-800 font-serif font-bold text-xs sm:text-sm tracking-widest uppercase mb-1">
            <Star className="w-4 h-4 fill-garba-pink-500 text-garba-pink-500" />
            Special Navratri Gift
            <Star className="w-4 h-4 fill-garba-pink-500 text-garba-pink-500" />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-black garba-gradient-text mt-1">
            EVERY PARTICIPANT GETS A FREE FAMILY PASS FOR ONE DAY!
          </h3>
          <p className="text-xs sm:text-sm text-stone-700 mt-2 font-semibold tracking-wide">
            Bring your family to witness your performance and celebrate Kishangarh's biggest Garba celebration!
          </p>
          <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-white border border-pink-200 text-xs font-mono font-bold text-garba-pink-800 shadow-sm">
            Dance • Learn • Grow • Together
          </div>
        </div>

        {/* 3 Pricing Cards with Distinct Garba Identities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Card 1: Female (Rani Pink Theme) */}
          <div className="relative rounded-3xl bg-white border-2 border-garba-pink-300 p-6 sm:p-7 flex flex-col justify-between hover:border-garba-pink-500 hover:shadow-md transition-all duration-300 group">
            <div>
              <div className="text-xs uppercase font-extrabold tracking-widest text-garba-pink-700 mb-1">
                Category A • Flagship
              </div>
              <h3 className="text-2xl font-serif font-bold text-maroon-950 group-hover:text-garba-pink-700 transition">
                Female Admission
              </h3>
              <p className="text-xs text-garba-pink-800 mt-0.5 font-bold">
                (Only Females • Open Age)
              </p>

              <div className="my-6 pb-4 border-b border-stone-200">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-serif font-black text-garba-pink-600">₹2500</span>
                  <span className="text-xs font-semibold text-stone-600">/ 1 Month</span>
                </div>
                <p className="text-[11px] text-stone-600 mt-1 font-medium">Full 30-day comprehensive workshop</p>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-maroon-900 font-medium mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-garba-pink-600 flex-shrink-0 mt-0.5" />
                  <span>All 8 Traditional & Devotional Styles</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-garba-pink-600 flex-shrink-0 mt-0.5" />
                  <span>Free Family Pass for 1 Day</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-garba-pink-600 flex-shrink-0 mt-0.5" />
                  <span>Choreography by Manish & Neel Sir</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-garba-pink-600 flex-shrink-0 mt-0.5" />
                  <span>Eligible for Queen of Kishangarh Title</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectCategory('FEMALE')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-garba-pink-600 to-garba-pink-500 text-white font-extrabold text-sm hover:brightness-110 transition shadow-sm cursor-pointer"
            >
              Register as Female (₹2500)
            </button>
          </div>

          {/* Card 2: Old TFN / Group (Featured - Kesariya Orange Theme) */}
          <div className="relative rounded-3xl bg-white border-2 border-garba-orange-400 p-6 sm:p-7 flex flex-col justify-between shadow-lg transition-all duration-300 transform md:-translate-y-2 group">
            
            {/* Best Value Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-garba-pink-600 via-garba-orange-500 to-garba-yellow-500 text-white font-black text-xs uppercase tracking-widest shadow-md flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>GROUP / ALUMNI OFFER</span>
            </div>

            <div>
              <div className="text-xs uppercase font-extrabold tracking-widest text-garba-orange-700 mb-1 mt-1">
                Category B • Best Value
              </div>
              <h3 className="text-2xl font-serif font-bold text-maroon-950 group-hover:text-garba-orange-600 transition">
                Old Students / Group
              </h3>
              <p className="text-xs text-garba-orange-800 font-bold mt-0.5">
                (Old TFN Students OR 5+ Members Group)
              </p>

              <div className="my-6 pb-4 border-b border-stone-200">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-serif font-black text-garba-orange-600">₹2200</span>
                  <span className="text-xs font-semibold text-stone-600">/ per person</span>
                </div>
                <p className="text-[11px] text-emerald-700 mt-1 font-bold">Save ₹300 per participant</p>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-maroon-900 font-medium mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-garba-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Valid for Previous TFN Students</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-garba-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Valid for any New Group of 5+ Members</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-garba-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Free Family Pass for Every Member</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-garba-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Group Formation Choreography</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => onSelectCategory('GROUP')}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-garba-orange-500 to-garba-yellow-500 text-maroon-950 font-black text-sm hover:brightness-105 transition shadow-sm cursor-pointer"
              >
                Register Group 5+ (₹2200/ea)
              </button>
              <button
                onClick={() => onSelectCategory('OLD_STUDENT')}
                className="w-full py-2 px-3 rounded-lg bg-garba-orange-50 border border-garba-orange-300 text-garba-orange-900 font-bold text-xs hover:bg-garba-orange-100 transition cursor-pointer"
              >
                I am an Old TFN Student (₹2200)
              </button>
            </div>
          </div>

          {/* Card 3: Kids (Peacock Teal Theme) */}
          <div className="relative rounded-3xl bg-white border-2 border-garba-teal-300 p-6 sm:p-7 flex flex-col justify-between hover:border-garba-teal-500 hover:shadow-md transition-all duration-300 group">
            <div>
              <div className="text-xs uppercase font-extrabold tracking-widest text-garba-teal-700 mb-1">
                Category C • Juniors
              </div>
              <h3 className="text-2xl font-serif font-bold text-maroon-950 group-hover:text-garba-teal-700 transition">
                Kids Girls
              </h3>
              <p className="text-xs text-garba-teal-800 mt-0.5 font-bold">
                (Age 7–16 Years • Girls Only)
              </p>

              <div className="my-6 pb-4 border-b border-stone-200">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-serif font-black text-garba-teal-700">₹2000</span>
                  <span className="text-xs font-semibold text-stone-600">/ 1 Month</span>
                </div>
                <p className="text-[11px] text-stone-600 mt-1 font-medium">Specially tailored kid-friendly pacing</p>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-maroon-900 font-medium mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-garba-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Age 7 to 16 Years (Girls Only)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-garba-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Safe & Supportive Female Environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-garba-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Eligible for Princess of Kishangarh</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-garba-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Free Family Pass for Parents Included</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectCategory('KIDS')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-700 to-garba-teal-600 text-white font-extrabold text-sm hover:brightness-110 transition shadow-sm cursor-pointer"
            >
              Register Kids (₹2000)
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

