'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Sparkles, Award, Flame, ChevronRight, ShieldCheck, Volume2, VolumeX } from 'lucide-react';

interface HeroSectionProps {
  onOpenRegister: () => void;
  onScrollToSlots?: () => void;
}

export default function HeroSection({ onOpenRegister }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  // Attempt autoplay with sound, and listen for first user interaction if blocked
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 0.8;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlayingSound(true);
          setIsMuted(false);
        })
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});

          const handleFirstInteraction = () => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.volume = 0.8;
              videoRef.current.play().catch(() => {});
              setIsMuted(false);
              setIsPlayingSound(true);
            }
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
          };

          window.addEventListener('click', handleFirstInteraction, { once: true });
          window.addEventListener('touchstart', handleFirstInteraction, { once: true });
        });
    }
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (videoRef.current.muted || isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.8;
      videoRef.current.play().catch(() => {});
      setIsMuted(false);
      setIsPlayingSound(true);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
      setIsPlayingSound(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-6 pb-14 sm:pt-10 sm:pb-20 md:pt-12 md:pb-24 border-b border-pink-500/20">
      
      {/* Background Video with High Visibility & Audio */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          className="w-full h-full object-cover opacity-75 filter saturate-125 brightness-105"
        >
          <source src="/GARBA.mp4" type="video/mp4" />
        </video>
        {/* Soft Contrast Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/60 to-slate-950/90 backdrop-blur-[0.5px]"></div>
      </div>

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-radial-gradient from-pink-500/15 via-blue-800/10 to-transparent pointer-events-none blur-3xl opacity-60 z-0"></div>
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-pink-600/20 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none z-0"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Sound Toggle (Subtle & Clean) */}
        <div className="flex justify-end mb-3 sm:mb-4">
          <button
            onClick={toggleSound}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all shadow-md cursor-pointer border ${
              !isMuted
                ? 'bg-pink-600 text-white border-pink-400 ring-2 ring-pink-400/50 animate-pulse'
                : 'bg-slate-900/80 backdrop-blur-md text-pink-300 border-pink-500/40 hover:bg-slate-900'
            }`}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-white" />
                <span>Music On 🎵</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-pink-400" />
                <span>Play Song 🔊</span>
              </>
            )}
          </button>
        </div>

        {/* Presenters Branding Header: Prominently Highlighted Badges */}
        <div className="flex flex-col items-center justify-center gap-2 mb-6 px-1">
          {/* Namo Club Kishangarh Presents - Vibrant Glowing Highlight Badge */}
          <div className="inline-flex items-center gap-2 px-5 sm:px-8 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-black shadow-xl shadow-pink-500/30 border-2 border-pink-200 ring-2 ring-pink-400/60 transform hover:scale-105 transition-all text-center">
            <Sparkles className="w-4 h-4 text-yellow-300 flex-shrink-0 animate-pulse" />
            <span className="text-xs sm:text-sm md:text-base tracking-wider uppercase font-black">
              NAMO CLUB KISHANGARH PRESENTS
            </span>
            <Sparkles className="w-4 h-4 text-yellow-300 flex-shrink-0 animate-pulse" />
          </div>
          
          {/* Co Powered By The Frozen Night - Sleek Radiant Badge */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-1 sm:py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-pink-400/60 text-xs sm:text-sm font-bold text-pink-100 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
            <span>Co Powered By <strong className="text-white font-extrabold">The Frozen Night Event & Entertainment</strong></span>
          </div>
        </div>

        {/* Presenter Logos: Symmetrical & Balanced */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mb-6">
          {/* Namo Club Logo (Glowing) */}
          <div className="flex flex-col items-center group">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 opacity-80 blur-md group-hover:opacity-100 transition animate-pulse"></div>
              <img
                src="/images/namo-club-logo.png"
                alt="Namo Club Kishangarh Logo"
                className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain rounded-full border-2 border-amber-300 shadow-[0_0_20px_rgba(250,204,21,0.6)] transform group-hover:scale-105 transition duration-300"
              />
            </div>
            <span className="text-xs font-bold text-amber-300 mt-2 font-heading tracking-wide">
              नमो क्लब किशनगढ़
            </span>
          </div>

          {/* Divider */}
          <div className="h-10 w-px bg-gradient-to-b from-transparent via-slate-600 to-transparent"></div>

          {/* TFN Logo (Clean) */}
          <div className="flex flex-col items-center group">
            <div className="relative">
              <img
                src="/images/TFN.png"
                alt="The Frozen Night Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain rounded-full transform group-hover:scale-105 transition duration-300"
              />
            </div>
            <span className="text-xs font-bold text-slate-200 mt-2 font-heading tracking-wide">
              The Frozen Night
            </span>
          </div>
        </div>

        {/* Main Title Section with Agraham Font */}
        <div className="space-y-3 mb-8">
          <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-pink-400">
            Kishangarh's Grandest Garba & Dandiya Mahotsav 2026
          </p>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white tracking-tight leading-[1.1]">
            Garba Raas <br className="hidden sm:inline" />
            <span className="festive-gradient-text font-heading italic block sm:inline mt-1 sm:mt-0 drop-shadow-[0_2px_20px_rgba(236,72,153,0.5)]">
              Dandiya Mahotsav
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed pt-1">
            Master authentic Gujarat steps, graceful spins, live dhol beats, and stage choreography with renowned mentors <strong className="text-yellow-300 font-semibold">Manish & Neel Sir</strong>.
          </p>
        </div>

        {/* Hero CTA - Single High-Impact Booking Button with Crisp White Text */}
        <div className="flex items-center justify-center mb-8">
          <button
            onClick={onOpenRegister}
            id="hero-register-btn"
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 text-white font-black text-sm sm:text-base shadow-2xl shadow-pink-500/40 hover:brightness-110 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer ring-2 ring-pink-300/80 tracking-wide"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 flex-shrink-0 animate-pulse" />
            <span className="text-white font-black drop-shadow-sm">BOOK YOUR SLOT NOW</span>
            <ChevronRight className="w-4 h-4 text-white flex-shrink-0" />
          </button>
        </div>

        {/* Trust Badges: Clean Minimalist Bottom Line */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 border-t border-slate-800/80 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
            <span>Grand Finale 18th Oct</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
            <span>Live Dhol & Maha Aarti</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>100% Female Safe Environment</span>
          </div>
        </div>

      </div>
    </section>
  );
}
