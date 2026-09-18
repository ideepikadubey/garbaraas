'use client';

import React from 'react';
import { Sparkles, Calendar, MapPin, Users, Award, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';
import { CategoryType } from '@/lib/types';

interface BoysDandiyaSectionProps {
  onSelectCategory: (category: CategoryType) => void;
  onScrollToSlots: () => void;
}

export default function BoysDandiyaSection({
  onSelectCategory,
  onScrollToSlots,
}: BoysDandiyaSectionProps) {
  return (
    <section id="boys-dandiya" className="relative py-12 md:py-18 bg-gradient-to-b from-stone-950 via-[#18080c] to-stone-950 border-y-2 border-amber-500/40 overflow-hidden text-white">
      
      {/* Background Ambient Golden Light Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-yellow-500/15 blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600/30 via-amber-500/30 to-red-600/30 border border-amber-400 text-xs text-yellow-300 uppercase tracking-widest font-black mb-3 shadow-lg backdrop-blur-md">
            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-bounce" />
            <span>SPECIAL ANNOUNCEMENT</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-white">
            BOYS <span className="garba-gradient-text">DANDIYA WORKSHOP</span>
          </h2>
          <div className="h-[3px] w-28 sm:w-36 mx-auto my-3 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
          <p className="text-xs sm:text-base text-amber-100/90 font-medium">
            Master energetic Dandiya formations, synchronized stick strikes, fast footwork, and authentic beats for Navratri 2026!
          </p>
        </div>

        {/* Highlight Card */}
        <div className="relative rounded-3xl bg-black/70 border-2 border-amber-400/80 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-wider shadow">
                  Boys & Men Special
                </span>
                <span className="px-3 py-1 rounded-full bg-stone-900 border border-amber-400/60 text-amber-300 text-xs font-bold">
                  Age: 8 to 40 Years
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white leading-snug">
                15-Day Intensive Dandiya Masterclass
              </h3>

              <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed font-normal">
                Specially designed for beginners and enthusiasts wanting high-energy Dandiya routines. Learn from professional choreographers with real stage readiness!
              </p>

              {/* 4 Feature Badges Grid matching official poster */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                
                <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-400/30 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 flex-shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">15-Day Workshop</div>
                    <div className="text-xs sm:text-sm text-yellow-300 font-bold">27 Sep to 11 Oct</div>
                    <div className="text-[11px] text-amber-200/80 font-semibold">19 Oct Open Round Competition</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-400/30 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">Star Instructors</div>
                    <div className="text-xs sm:text-sm text-yellow-300 font-bold">Manish Sir & Neel Sir</div>
                    <div className="text-[11px] text-amber-200/80 font-medium">Mr. Kishangarh 2016 & 2019</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-400/30 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">Curriculum Highlights</div>
                    <div className="text-xs sm:text-sm text-yellow-300 font-bold">Steps, Patterns & Strategy</div>
                    <div className="text-[11px] text-amber-200/80">Dress code & beat coordination</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-400/30 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">Premium Venues</div>
                    <div className="text-xs sm:text-sm text-yellow-300 font-bold">Bang Marriage Hall</div>
                    <div className="text-[11px] text-amber-200/80">Spacious AC Workshop Hall</div>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Pricing & Action Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-500/15 via-yellow-500/10 to-transparent border-2 border-amber-400/70 text-center">
              
              <div className="text-xs uppercase font-extrabold tracking-widest text-amber-300 mb-1">
                Special Workshop Fee
              </div>

              <div className="flex items-baseline justify-center gap-1.5 my-2">
                <span className="text-4xl sm:text-6xl font-serif font-black garba-gradient-text">₹1600</span>
                <span className="text-xs sm:text-sm font-bold text-amber-200">/ 15 Days</span>
              </div>

              <p className="text-xs text-amber-200/80 font-medium max-w-xs mb-6">
                Registration fee per member for 15-day intensive training & 19th Oct Open Round Competition eligibility.
              </p>

              <div className="w-full space-y-3">
                <button
                  onClick={() => onSelectCategory('BOYS_DANDIYA')}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 font-black text-sm shadow-lg shadow-amber-500/30 ring-2 ring-amber-300 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>ENROLL FOR BOYS DANDIYA (₹1600)</span>
                  <ChevronRight className="w-4 h-4 text-stone-950" />
                </button>

                <button
                  onClick={onScrollToSlots}
                  className="w-full py-2.5 px-4 rounded-xl bg-black/60 hover:bg-black/80 border border-amber-400/60 text-amber-300 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View Batches & Timings</span>
                </button>
              </div>

              {/* Free pass note */}
              <div className="mt-4 pt-3 border-t border-amber-500/30 flex items-center gap-1.5 text-[11px] text-amber-200/90 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                <span>Includes Free 1-Day Family Pass!</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
