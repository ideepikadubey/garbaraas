'use client';

import React from 'react';
import { Crown, Trophy, Sparkles, Award, Zap, Heart, Calendar } from 'lucide-react';

export default function PrizeCategoriesSection() {
  return (
    <section id="prizes" className="relative py-10 md:py-16 bg-white border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs text-garba-pink-800 uppercase tracking-widest font-bold mb-2 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-garba-pink-600" />
            TFN Grand Annual Awards
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-maroon-950 tracking-tight">
            PRIZE <span className="garba-gradient-text">CATEGORIES</span>
          </h2>
          <div className="h-[3px] w-24 sm:w-32 mx-auto my-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500"></div>
          <p className="text-xs sm:text-base text-stone-700 font-medium">
            Showcase your talent, energy, and royal festive attire on stage during the grand finale rounds.
          </p>
          
          <div className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-50 border-2 border-pink-300 text-garba-pink-900 text-xs sm:text-sm font-extrabold shadow-sm">
            <Calendar className="w-4 h-4 text-garba-pink-600" />
            <span>TFN COMPETITION ROUNDS ON 18TH OCTOBER IN KISHANGARH</span>
          </div>
        </div>

        {/* 2 Main Category Divisions (Kids & Adults - Strict Poster 3 Theme) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* KIDS CATEGORY (5 cols) - Rani Pink / Fuchsia Theme from Poster */}
          <div className="lg:col-span-5 rounded-3xl bg-white border-2 border-garba-pink-300 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-garba-pink-600 to-rose-600 text-white mb-3 shadow-sm">
                <Crown className="w-4 h-4" />
                <span className="text-xs uppercase font-black tracking-wider">KIDS CATEGORY</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-maroon-950 mb-1">
                Age 7 – 16 Years (Girls)
              </h3>
              <p className="text-xs text-garba-pink-800 font-semibold mb-6">
                Special junior stage for budding young talent in Kishangarh.
              </p>

              <div className="space-y-4">
                {/* Award 1 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-garba-pink-50/70 border border-garba-pink-200 hover:border-garba-pink-400 transition">
                  <div className="w-12 h-12 rounded-xl bg-garba-pink-100 border border-garba-pink-300 flex items-center justify-center flex-shrink-0 text-garba-pink-700 shadow-sm">
                    <Crown className="w-6 h-6 text-garba-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-bold text-maroon-950">
                      Princess of Kishangarh
                    </h4>
                    <p className="text-xs text-garba-pink-700 font-bold">Grand Junior Championship Trophy</p>
                    <p className="text-[11px] text-stone-600 mt-1 font-medium">Evaluated on rhythm, smile, steps coordination, and grace.</p>
                  </div>
                </div>

                {/* Award 2 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-garba-pink-50/70 border border-garba-pink-200 hover:border-garba-pink-400 transition">
                  <div className="w-12 h-12 rounded-xl bg-garba-pink-100 border border-garba-pink-300 flex items-center justify-center flex-shrink-0 text-garba-pink-700 shadow-sm">
                    <Sparkles className="w-6 h-6 text-garba-pink-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-bold text-maroon-950">
                      Best Dressup Princess
                    </h4>
                    <p className="text-xs text-garba-pink-700 font-bold">Traditional Attire & Royal Styling</p>
                    <p className="text-[11px] text-stone-600 mt-1 font-medium">Evaluated on chaniya choli authenticity, jewelry & accessories.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-200 text-center">
              <span className="text-xs text-garba-orange-800 font-bold">Special Certificates & Gifts for All Kids</span>
            </div>
          </div>

          {/* ADULTS CATEGORY (7 cols) - Royal Jamuni Purple Theme from Poster */}
          <div className="lg:col-span-7 rounded-3xl bg-white border-2 border-garba-purple-300 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-garba-purple-700 to-indigo-700 text-white mb-3 shadow-sm">
                <Trophy className="w-4 h-4" />
                <span className="text-xs uppercase font-black tracking-wider">ADULTS CATEGORY</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-maroon-950 mb-1">
                Females (Open Age)
              </h3>
              <p className="text-xs text-garba-purple-800 font-semibold mb-6">
                Prestigious awards recognized throughout the Kishangarh festive season.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Award 1 */}
                <div className="p-4 rounded-2xl bg-garba-purple-50/70 border border-garba-purple-200 hover:border-garba-purple-400 transition">
                  <div className="flex items-center gap-2 text-garba-purple-800 mb-2">
                    <Crown className="w-5 h-5 text-garba-orange-600" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Top Title</span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-maroon-950">
                    Queen of Kishangarh
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-1 font-medium">
                    The highest honor for the most exceptional and graceful garba dancer of the season.
                  </p>
                </div>

                {/* Award 2 */}
                <div className="p-4 rounded-2xl bg-garba-purple-50/70 border border-garba-purple-200 hover:border-garba-purple-400 transition">
                  <div className="flex items-center gap-2 text-garba-teal-700 mb-2">
                    <Award className="w-5 h-5 text-garba-teal-600" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Performer</span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-maroon-950">
                    Best Performer of the Year
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-1 font-medium">
                    Awarded for choreography mastery, speed, agility, and crowd-electrifying expressions.
                  </p>
                </div>

                {/* Award 3 */}
                <div className="p-4 rounded-2xl bg-garba-purple-50/70 border border-garba-purple-200 hover:border-garba-purple-400 transition">
                  <div className="flex items-center gap-2 text-garba-pink-700 mb-2">
                    <Sparkles className="w-5 h-5 text-garba-pink-600" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Attire</span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-maroon-950">
                    Best Dressup Queen
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-1 font-medium">
                    Recognizing elegance, traditional Gujarati/Rajasthani outfits, makeup, and royal styling.
                  </p>
                </div>

                {/* Award 4 */}
                <div className="p-4 rounded-2xl bg-garba-purple-50/70 border border-garba-purple-200 hover:border-garba-purple-400 transition">
                  <div className="flex items-center gap-2 text-garba-orange-700 mb-2">
                    <Zap className="w-5 h-5 text-garba-orange-600" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Stamina</span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-maroon-950">
                    Best Energetic Player
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-1 font-medium">
                    For the dancer who maintains unyielding energy and enthusiasm through all fast hinch rounds.
                  </p>
                </div>

                {/* Award 5 (Span full) */}
                <div className="sm:col-span-2 p-4 rounded-2xl bg-garba-purple-50/70 border border-garba-purple-200 hover:border-garba-purple-400 transition flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0 text-amber-800">
                    <Heart className="w-5 h-5 text-garba-pink-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-bold text-maroon-950">
                      Best Motivational Performer
                    </h4>
                    <p className="text-[11px] text-stone-600 font-medium">
                      Celebrating the participant who brings infectious enthusiasm and uplifts everyone in their batch!
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-200 text-center">
              <span className="text-xs text-garba-purple-900 font-bold">Trophy Presentation by Esteemed Kishangarh Guests</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

