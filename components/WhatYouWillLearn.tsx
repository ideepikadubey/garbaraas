'use client';

import React from 'react';
import { Sparkles, Music, Flame, Heart, Zap, Award, Compass, Users } from 'lucide-react';

const MODULES = [
  {
    title: 'GARBA',
    subtitle: 'Traditional Steps',
    description: 'Learn the foundational 2-taali, 3-taali, popat, and authentic Gujarati rotations with grace.',
    icon: Sparkles,
    cardTheme: 'bg-white border-garba-teal-200 hover:border-garba-teal-500 shadow-sm hover:shadow-md',
    badgeColor: 'border-garba-teal-300 bg-garba-teal-50 text-garba-teal-700',
    iconColor: 'text-garba-teal-600',
    accentText: 'text-garba-teal-700',
    numColor: 'text-garba-teal-600',
  },
  {
    title: 'MAHA AARTI',
    subtitle: 'Devotional Energy',
    description: 'Special devotional sequence performed with diyas and thalis to evoke Maa Durga’s divine blessings.',
    icon: Flame,
    cardTheme: 'bg-white border-garba-pink-200 hover:border-garba-pink-500 shadow-sm hover:shadow-md',
    badgeColor: 'border-garba-pink-300 bg-garba-pink-50 text-garba-pink-700',
    iconColor: 'text-garba-pink-600',
    accentText: 'text-garba-pink-700',
    numColor: 'text-garba-pink-600',
  },
  {
    title: 'DANDIYA',
    subtitle: 'Graceful Moves',
    description: 'Master rhythmic stick-striking formations, pairs coordination, circular swivels, and synchronized beats.',
    icon: Zap,
    cardTheme: 'bg-white border-rose-200 hover:border-rose-500 shadow-sm hover:shadow-md',
    badgeColor: 'border-rose-300 bg-rose-50 text-rose-700',
    iconColor: 'text-rose-600',
    accentText: 'text-rose-700',
    numColor: 'text-rose-600',
  },
  {
    title: 'GHUMAR',
    subtitle: 'Live Dhol',
    description: 'Royal Rajasthani swirls set to pulsating live dhol beats and traditional Kishangarh folk melodies.',
    icon: Music,
    cardTheme: 'bg-white border-emerald-200 hover:border-emerald-500 shadow-sm hover:shadow-md',
    badgeColor: 'border-emerald-300 bg-emerald-50 text-emerald-700',
    iconColor: 'text-emerald-600',
    accentText: 'text-emerald-700',
    numColor: 'text-emerald-600',
  },
  {
    title: 'HINCH',
    subtitle: 'Gujarati Swing',
    description: 'High-speed energetic footwork, dynamic hand clapping patterns, and thrilling tempo accelerations.',
    icon: Compass,
    cardTheme: 'bg-white border-garba-orange-200 hover:border-garba-orange-500 shadow-sm hover:shadow-md',
    badgeColor: 'border-garba-orange-300 bg-garba-orange-50 text-garba-orange-700',
    iconColor: 'text-garba-orange-600',
    accentText: 'text-garba-orange-700',
    numColor: 'text-garba-orange-600',
  },
  {
    title: 'KHODIYAR',
    subtitle: 'Special Performance',
    description: 'Sacred choreography and ceremonial storytelling moves dedicated with devotion to Maa Khodiyar.',
    icon: Award,
    cardTheme: 'bg-white border-lime-200 hover:border-lime-500 shadow-sm hover:shadow-md',
    badgeColor: 'border-lime-300 bg-lime-50 text-lime-700',
    iconColor: 'text-lime-600',
    accentText: 'text-lime-700',
    numColor: 'text-lime-600',
  },
  {
    title: 'LIVE GARBA EXPERIENCE',
    subtitle: 'Real Vibes',
    description: 'Immerse yourself in authentic ground rehearsals with real concert sound and festive atmosphere.',
    icon: Users,
    cardTheme: 'bg-white border-garba-purple-200 hover:border-garba-purple-500 shadow-sm hover:shadow-md',
    badgeColor: 'border-garba-purple-300 bg-garba-purple-50 text-garba-purple-700',
    iconColor: 'text-garba-purple-600',
    accentText: 'text-garba-purple-700',
    numColor: 'text-garba-purple-600',
  },
  {
    title: 'CONFIDENCE & FITNESS',
    subtitle: 'Stage Presence',
    description: 'Transform your posture, stamina, and expressive grace so you shine on every Navratri night!',
    icon: Heart,
    cardTheme: 'bg-white border-amber-200 hover:border-amber-500 shadow-sm hover:shadow-md',
    badgeColor: 'border-amber-300 bg-amber-50 text-amber-700',
    iconColor: 'text-amber-600',
    accentText: 'text-amber-700',
    numColor: 'text-amber-600',
  },
];

export default function WhatYouWillLearn() {
  return (
    <section id="learn" className="relative py-10 md:py-16 bg-white border-b border-pink-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs text-garba-pink-800 uppercase tracking-widest font-bold mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-garba-pink-600" />
            Official TFN Masterclass Curriculum
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-maroon-950 tracking-tight">
            YOU WILL <span className="garba-gradient-text">LEARN</span>
          </h2>
          <div className="h-[3px] w-24 sm:w-32 mx-auto my-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500"></div>
          <p className="text-xs sm:text-base text-stone-700 font-medium">
            A comprehensive 30-day masterclass designed for beginners and experienced dancers alike, curated by top choreographers Manish & Neel Sir.
          </p>
        </div>

        {/* 8 Module Cards Grid with Authentic Poster Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MODULES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`group relative rounded-2xl ${item.cardTheme} border-2 p-6 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl border ${item.badgeColor} shadow-sm`}>
                      <Icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <span className={`text-xs font-mono font-extrabold ${item.numColor}`}>
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-maroon-950 group-hover:text-garba-pink-700 transition">
                    {item.title}
                  </h3>
                  <p className={`text-xs uppercase tracking-wider ${item.accentText} font-bold mb-2`}>
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-maroon-800 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-600 font-medium">
                  <span>Authentic Choreography</span>
                  <span className="text-garba-orange-700 font-bold">★ TFN Certified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Value Pillars from Bottom of Poster */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border-2 border-garba-teal-200 shadow-sm hover:border-garba-teal-400 transition">
            <div className="w-11 h-11 rounded-full bg-garba-teal-50 border border-garba-teal-300 flex items-center justify-center flex-shrink-0">
              <span className="text-garba-teal-600 font-bold text-lg">📍</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-maroon-950 uppercase tracking-wide">Comfortable Locations</h4>
              <p className="text-xs text-garba-teal-800 font-medium">Centrally located premium halls across Kishangarh</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border-2 border-garba-orange-200 shadow-sm hover:border-garba-orange-400 transition">
            <div className="w-11 h-11 rounded-full bg-garba-orange-50 border border-garba-orange-300 flex items-center justify-center flex-shrink-0">
              <span className="text-garba-orange-600 font-bold text-lg">🏆</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-maroon-950 uppercase tracking-wide">Exciting Prizes Await You!</h4>
              <p className="text-xs text-garba-orange-800 font-medium">Queen & Princess of Kishangarh title trophies</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border-2 border-garba-pink-200 shadow-sm hover:border-garba-pink-400 transition">
            <div className="w-11 h-11 rounded-full bg-garba-pink-50 border border-garba-pink-300 flex items-center justify-center flex-shrink-0">
              <span className="text-garba-pink-600 font-bold text-lg">💃</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-maroon-950 uppercase tracking-wide">Festive Vibrance</h4>
              <p className="text-xs text-garba-pink-800 font-medium">Perfect your moves and be part of the royal vibe</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

