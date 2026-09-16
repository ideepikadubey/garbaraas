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

        {/* 2 Official Workshop Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* ================= WORKSHOP 1: SPECIAL 15-DAY FEMALE GARBA ================= */}
          <div className="relative rounded-3xl bg-slate-900/90 border-2 border-pink-400/90 p-5 sm:p-7 shadow-2xl shadow-pink-500/10 backdrop-blur-xl flex flex-col justify-between group hover:border-pink-300 transition-all duration-300">
            
            {/* Top Badge */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white font-black text-xs uppercase tracking-wider shadow">
                Females Special
              </span>
              <span className="px-3 py-1 rounded-full bg-red-600/90 border border-red-400 text-white font-bold text-xs">
                Last Date: 30 Sep
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              
              {/* Poster Thumbnail with Zoom Glow */}
              <div className="sm:col-span-5 flex justify-center">
                <div className="relative rounded-2xl overflow-hidden border-2 border-pink-400/80 shadow-xl group-hover:scale-105 transition-transform duration-300 max-w-[220px] w-full">
                  <img
                    src="/images/posters/poster-special-15day-female.jpg"
                    alt="Special 15-Day Garba Workshop (26 Sep - 11 Oct)"
                    className="w-full h-auto object-cover block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Details Column */}
              <div className="sm:col-span-7 space-y-3">
                <h3 className="text-xl sm:text-2xl font-serif font-black text-white leading-tight">
                  Special Girls <br />
                  <span className="text-pink-400">Garba Workshop</span>
                </h3>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-serif font-black text-pink-400">₹1500</span>
                  <span className="text-xs text-slate-300 font-semibold">/ Per Member</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  <em>Joining full month difficult due to festivals?</em> We created this special girls workshop (25 Sep – 11 Oct) so you never miss the Navratri joy!
                </p>

                <div className="space-y-1.5 text-xs text-slate-200 pt-1 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-pink-400 flex-shrink-0" />
                    <span><strong>Dates:</strong> 25 Sep – 11 Oct</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span><strong>18 Oct:</strong> Grand Garba Competition Entry Included!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span><strong>Learn:</strong> Dandiya Steps, Hinch, Khodiyar, Ghoomar & Live Dhol</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                onClick={() => onSelectCategory('FEMALE_15DAY')}
                className="py-3 px-5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-black text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>BOOK GIRLS WORKSHOP (25 SEP - 11 OCT • ₹1500)</span>
              </button>

              <div className="text-[11px] text-pink-300/90 text-center sm:text-right font-medium">
                Admissions: Neel (+91 8385969285)
              </div>
            </div>

          </div>

          {/* ================= WORKSHOP 2: SURPRISE BOYS DANDIYA WORKSHOP ================= */}
          <div className="relative rounded-3xl bg-slate-900/90 border-2 border-blue-400/90 p-5 sm:p-7 shadow-2xl shadow-blue-500/10 backdrop-blur-xl flex flex-col justify-between group hover:border-blue-300 transition-all duration-300">
            
            {/* Top Badge */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow">
                Surprise Announcement
              </span>
              <span className="px-3 py-1 rounded-full bg-yellow-400 text-slate-950 font-black text-xs">
                For 19 Oct Competition
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              
              {/* Poster Thumbnail with Zoom Glow */}
              <div className="sm:col-span-5 flex justify-center">
                <div className="relative rounded-2xl overflow-hidden border-2 border-blue-400/80 shadow-xl group-hover:scale-105 transition-transform duration-300 max-w-[220px] w-full">
                  <img
                    src="/images/posters/poster-boys-dandiya.jpg"
                    alt="Boys Dandiya Workshop (22 Sep - 2 Oct)"
                    className="w-full h-auto object-cover block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Details Column */}
              <div className="sm:col-span-7 space-y-3">
                <h3 className="text-xl sm:text-2xl font-serif font-black text-white leading-tight">
                  Boys Dandiya <br />
                  <span className="text-cyan-400">10-Day Workshop</span>
                </h3>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-serif font-black text-emerald-400">₹1100</span>
                  <span className="text-xs text-slate-300 font-semibold">/ Only</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Targeted training for the <strong>19 Oct Open Round Competition</strong> with Mr. Dandiya title holders!
                </p>

                <div className="space-y-1.5 text-xs text-slate-200 pt-1 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span><strong>Dates:</strong> 22 Sep to 2 Oct</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span><strong>Mentors:</strong> Neel Sir (2019) & Manish Sir (2016)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span><strong>Learn:</strong> 5 Patterns, Formations & Competition Strategies</span>
                  </div>
                </div>

                {/* Important Bring Dandiya Sticks Box */}
                <div className="p-2.5 rounded-2xl bg-blue-950/60 border border-blue-500/50 flex items-start gap-2 text-[11px] text-cyan-200 font-semibold">
                  <AlertCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>NOTE: Please bring your own Dandiya sticks for practice!</span>
                </div>
              </div>

            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                onClick={() => onSelectCategory('BOYS_DANDIYA')}
                className="py-3 px-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-black text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>REGISTER FOR BOYS DANDIYA (₹1100)</span>
              </button>

              <div className="text-[11px] text-cyan-300/90 text-center sm:text-right font-medium">
                Admissions: Neel (+91 8385969285)
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
