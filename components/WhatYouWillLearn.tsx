'use client';

import React from 'react';
import { Sparkles, Music, Flame, Heart, Zap, Award, Compass, Users } from 'lucide-react';

const MODULES = [
  {
    title: 'GARBA',
    subtitle: 'Traditional Steps',
    description: 'Learn the foundational 2-taali, 3-taali, popat, and authentic Gujarati rotations with grace.',
    icon: Sparkles,
    cardTheme: 'bg-white border-pink-200 hover:border-pink-500 shadow-sm hover:shadow-pink-500/20 hover:shadow-lg',
    badgeColor: 'border-pink-300 bg-pink-50 text-pink-700',
    iconColor: 'text-pink-600',
    accentText: 'text-pink-600',
    numColor: 'text-pink-600',
  },
  {
    title: 'MAHA AARTI',
    subtitle: 'Devotional Energy',
    description: 'Special devotional sequence performed with diyas and thalis to evoke Maa Durga’s divine blessings.',
    icon: Flame,
    cardTheme: 'bg-white border-yellow-200 hover:border-yellow-500 shadow-sm hover:shadow-yellow-500/20 hover:shadow-lg',
    badgeColor: 'border-yellow-300 bg-yellow-50 text-amber-700',
    iconColor: 'text-amber-600',
    accentText: 'text-amber-700',
    numColor: 'text-amber-600',
  },
  {
    title: 'DANDIYA',
    subtitle: 'Graceful Moves',
    description: 'Master rhythmic stick-striking formations, pairs coordination, circular swivels, and synchronized beats.',
    icon: Zap,
    cardTheme: 'bg-white border-blue-200 hover:border-blue-500 shadow-sm hover:shadow-blue-500/20 hover:shadow-lg',
    badgeColor: 'border-blue-300 bg-blue-50 text-blue-700',
    iconColor: 'text-blue-600',
    accentText: 'text-blue-700',
    numColor: 'text-blue-600',
  },
  {
    title: 'GHUMAR',
    subtitle: 'Live Dhol',
    description: 'Royal Rajasthani swirls set to pulsating live dhol beats and traditional Kishangarh folk melodies.',
    icon: Music,
    cardTheme: 'bg-white border-emerald-200 hover:border-emerald-500 shadow-sm hover:shadow-emerald-500/20 hover:shadow-lg',
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
    cardTheme: 'bg-white border-orange-200 hover:border-orange-500 shadow-sm hover:shadow-orange-500/20 hover:shadow-lg',
    badgeColor: 'border-orange-300 bg-orange-50 text-orange-700',
    iconColor: 'text-orange-600',
    accentText: 'text-orange-700',
    numColor: 'text-orange-600',
  },
  {
    title: 'KHODIYAR',
    subtitle: 'Special Performance',
    description: 'Sacred choreography and ceremonial storytelling moves dedicated with devotion to Maa Khodiyar.',
    icon: Award,
    cardTheme: 'bg-white border-purple-200 hover:border-purple-500 shadow-sm hover:shadow-purple-500/20 hover:shadow-lg',
    badgeColor: 'border-purple-300 bg-purple-50 text-purple-700',
    iconColor: 'text-purple-600',
    accentText: 'text-purple-700',
    numColor: 'text-purple-600',
  },
  {
    title: 'LIVE GARBA EXPERIENCE',
    subtitle: 'Real Vibes',
    description: 'Immerse yourself in authentic ground rehearsals with real concert sound and festive atmosphere.',
    icon: Users,
    cardTheme: 'bg-white border-cyan-200 hover:border-cyan-500 shadow-sm hover:shadow-cyan-500/20 hover:shadow-lg',
    badgeColor: 'border-cyan-300 bg-cyan-50 text-cyan-700',
    iconColor: 'text-cyan-600',
    accentText: 'text-cyan-700',
    numColor: 'text-cyan-600',
  },
  {
    title: 'CONFIDENCE & FITNESS',
    subtitle: 'Stage Presence',
    description: 'Transform your posture, stamina, and expressive grace so you shine on every Navratri night!',
    icon: Heart,
    cardTheme: 'bg-white border-rose-200 hover:border-rose-500 shadow-sm hover:shadow-rose-500/20 hover:shadow-lg',
    badgeColor: 'border-rose-300 bg-rose-50 text-rose-700',
    iconColor: 'text-rose-600',
    accentText: 'text-rose-700',
    numColor: 'text-rose-600',
  },
];

export default function WhatYouWillLearn() {
  return (
    <section id="learn" className="relative py-10 md:py-16 bg-white border-b border-pink-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs text-pink-700 uppercase tracking-widest font-black mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            Official TFN Masterclass Curriculum
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-tight">
            YOU WILL <span className="festive-gradient-text">LEARN</span>
          </h2>
          <div className="h-[3.5px] w-24 sm:w-32 mx-auto my-3 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600"></div>
          <p className="text-xs sm:text-base text-slate-600 font-medium">
            A comprehensive 30-day masterclass designed for beginners and experienced dancers alike, curated by top choreographers Manish & Neel Sir.
          </p>
        </div>

        {/* 8 Module Cards Grid with Vibrant Multi-Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MODULES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`group relative rounded-3xl ${item.cardTheme} border-2 p-6 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl border ${item.badgeColor} shadow-xs`}>
                      <Icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <span className={`text-xs font-mono font-black ${item.numColor}`}>
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-black text-slate-900 group-hover:text-pink-600 transition">
                    {item.title}
                  </h3>
                  <p className={`text-xs uppercase tracking-wider ${item.accentText} font-black mb-2`}>
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span>Authentic Choreography</span>
                  <span className="text-pink-600 font-black">★ TFN Certified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Value Pillars at Bottom */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          
          <div className="flex items-center gap-3.5 p-4 rounded-3xl bg-white border-2 border-pink-200 shadow-sm hover:border-pink-400 hover:shadow-md transition">
            <div className="w-11 h-11 rounded-2xl bg-pink-50 border border-pink-300 flex items-center justify-center flex-shrink-0">
              <span className="text-pink-600 font-bold text-lg">📍</span>
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">Comfortable Locations</h4>
              <p className="text-xs text-pink-700 font-semibold">Centrally located premium halls across Kishangarh</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-3xl bg-white border-2 border-emerald-200 shadow-sm hover:border-emerald-400 hover:shadow-md transition">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-center flex-shrink-0">
              <span className="text-emerald-600 font-bold text-lg">🏆</span>
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">Exciting Prizes Await You!</h4>
              <p className="text-xs text-emerald-700 font-semibold">Queen & Princess of Kishangarh title trophies</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-3xl bg-white border-2 border-blue-200 shadow-sm hover:border-blue-400 hover:shadow-md transition">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-300 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold text-lg">💃</span>
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">Festive Vibrance</h4>
              <p className="text-xs text-blue-700 font-semibold">Perfect your moves and be part of the royal vibe</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
