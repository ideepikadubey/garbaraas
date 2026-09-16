'use client';

import React from 'react';
import { Crown, Trophy, Sparkles, Award, Zap, Heart, Calendar } from 'lucide-react';

export default function PrizeCategoriesSection() {
  return (
    <section id="prizes" className="relative py-10 md:py-16 bg-white border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs text-pink-700 uppercase tracking-widest font-black mb-2 shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-pink-500" />
            TFN Grand Annual Awards
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-tight">
            PRIZE <span className="festive-gradient-text">CATEGORIES</span>
          </h2>
          <div className="h-[3.5px] w-24 sm:w-32 mx-auto my-3 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600"></div>
          <p className="text-xs sm:text-base text-slate-600 font-medium">
            Showcase your talent, energy, and royal festive attire on stage during the grand finale rounds.
          </p>
          
          <div className="mt-4 sm:mt-5 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl sm:rounded-full bg-gradient-to-r from-pink-50 via-amber-50 to-blue-50 border-2 border-pink-300 text-slate-900 text-[10px] min-[360px]:text-xs sm:text-sm font-black shadow-xs text-center max-w-full">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-600 flex-shrink-0" />
            <span>TFN COMPETITION ROUNDS ON 18TH OCTOBER IN KISHANGARH</span>
          </div>
        </div>

        {/* 2 Main Category Divisions (Kids & Adults) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* KIDS CATEGORY (5 cols) - Rani Pink & Gold Theme */}
          <div className="lg:col-span-5 rounded-3xl bg-white border-2 border-pink-300 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-pink-500/15 hover:shadow-lg transition">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white mb-3 shadow-sm ring-1 ring-pink-300">
                <Crown className="w-4 h-4 text-yellow-300" />
                <span className="text-xs uppercase font-black tracking-wider">KIDS CATEGORY</span>
              </div>
              <h3 className="text-2xl font-serif font-black text-slate-900 mb-1">
                Age 7 – 16 Years (Girls)
              </h3>
              <p className="text-xs text-pink-700 font-bold mb-6">
                Special junior stage for budding young talent in Kishangarh.
              </p>

              <div className="space-y-4">
                {/* Award 1 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-pink-50/70 border border-pink-200 hover:border-pink-400 transition">
                  <div className="w-12 h-12 rounded-2xl bg-pink-100 border border-pink-300 flex items-center justify-center flex-shrink-0 text-pink-700 shadow-xs">
                    <Crown className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-black text-slate-900">
                      Princess of Kishangarh
                    </h4>
                    <p className="text-xs text-pink-700 font-bold">Grand Junior Championship Trophy</p>
                    <p className="text-[11px] text-slate-600 mt-1 font-medium">Evaluated on rhythm, smile, steps coordination, and grace.</p>
                  </div>
                </div>

                {/* Award 2 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 hover:border-amber-400 transition">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0 text-amber-800 shadow-xs">
                    <Sparkles className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-black text-slate-900">
                      Best Dressup Princess
                    </h4>
                    <p className="text-xs text-amber-800 font-bold">Traditional Attire & Royal Styling</p>
                    <p className="text-[11px] text-slate-600 mt-1 font-medium">Evaluated on chaniya choli authenticity, jewelry & accessories.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-center">
              <span className="text-xs text-pink-800 font-bold">Special Certificates & Gifts for All Kids</span>
            </div>
          </div>

          {/* ADULTS CATEGORY (7 cols) - Royal Navy & Cyan Theme */}
          <div className="lg:col-span-7 rounded-3xl bg-white border-2 border-blue-300 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-blue-500/15 hover:shadow-lg transition">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600 text-white mb-3 shadow-sm ring-1 ring-blue-300">
                <Trophy className="w-4 h-4 text-yellow-300" />
                <span className="text-xs uppercase font-black tracking-wider">ADULTS CATEGORY</span>
              </div>
              <h3 className="text-2xl font-serif font-black text-slate-900 mb-1">
                Females (Open Age)
              </h3>
              <p className="text-xs text-blue-700 font-bold mb-6">
                Prestigious awards recognized throughout the Kishangarh festive season.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Award 1 */}
                <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 hover:border-pink-400 transition">
                  <div className="flex items-center gap-2 text-pink-700 mb-2">
                    <Crown className="w-5 h-5 text-pink-600" />
                    <span className="text-[10px] uppercase font-black tracking-wider">Top Title</span>
                  </div>
                  <h4 className="text-base font-serif font-black text-slate-900">
                    Queen of Kishangarh
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1 font-medium">
                    The highest honor for the most exceptional and graceful garba dancer of the season.
                  </p>
                </div>

                {/* Award 2 */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:border-emerald-400 transition">
                  <div className="flex items-center gap-2 text-emerald-700 mb-2">
                    <Award className="w-5 h-5 text-emerald-600" />
                    <span className="text-[10px] uppercase font-black tracking-wider">Performer</span>
                  </div>
                  <h4 className="text-base font-serif font-black text-slate-900">
                    Best Performer of the Year
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1 font-medium">
                    Awarded for choreography mastery, speed, agility, and crowd-electrifying expressions.
                  </p>
                </div>

                {/* Award 3 */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 hover:border-amber-400 transition">
                  <div className="flex items-center gap-2 text-amber-700 mb-2">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    <span className="text-[10px] uppercase font-black tracking-wider">Attire</span>
                  </div>
                  <h4 className="text-base font-serif font-black text-slate-900">
                    Best Dressup Queen
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1 font-medium">
                    Recognizing elegance, traditional outfits, makeup, and royal styling.
                  </p>
                </div>

                {/* Award 4 */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 hover:border-blue-400 transition">
                  <div className="flex items-center gap-2 text-blue-700 mb-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <span className="text-[10px] uppercase font-black tracking-wider">Stamina</span>
                  </div>
                  <h4 className="text-base font-serif font-black text-slate-900">
                    Best Energetic Player
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1 font-medium">
                    For the dancer who maintains unyielding energy and enthusiasm through all fast hinch rounds.
                  </p>
                </div>

                {/* Award 5 (Span full) */}
                <div className="sm:col-span-2 p-4 rounded-2xl bg-gradient-to-r from-pink-50/70 via-white to-blue-50/70 border border-pink-200 hover:border-pink-400 transition flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-100 border border-pink-300 flex items-center justify-center flex-shrink-0 text-pink-700">
                    <Heart className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-black text-slate-900">
                      Best Motivational Performer
                    </h4>
                    <p className="text-[11px] text-slate-600 font-medium">
                      Celebrating the participant who brings infectious enthusiasm and uplifts everyone in their batch!
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-center">
              <span className="text-xs text-blue-900 font-bold">Trophy Presentation by Esteemed Kishangarh Guests</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
