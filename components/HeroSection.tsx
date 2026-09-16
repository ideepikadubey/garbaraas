'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Sparkles, Award, Users, Flame, ChevronRight, ShieldCheck, Volume2, VolumeX, Music } from 'lucide-react';

interface HeroSectionProps {
  onOpenRegister: () => void;
  onScrollToSlots: () => void;
}

export default function HeroSection({ onOpenRegister, onScrollToSlots }: HeroSectionProps) {
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
          // Autoplay with sound was prevented by browser policy.
          // Start muted first so video plays visually, then unmute on first user click.
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
    <section className="relative overflow-hidden bg-slate-950 pt-4 pb-10 md:pt-6 md:pb-14 border-b border-pink-500/30">
      
      {/* Background Video (GARBA.mp4) with High Visibility & Audio */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          className="w-full h-full object-cover opacity-80 filter saturate-125 brightness-105"
        >
          <source src="/GARBA.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Multi-color Deep Contrast Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/65 to-slate-950/90 backdrop-blur-[0.5px]"></div>
      </div>

      {/* Background Decorative Ambient Festive Multi-Color Glows (Pink, Navy, Green, Gold) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[650px] bg-radial-gradient from-pink-500/20 via-blue-700/15 to-transparent pointer-events-none blur-3xl opacity-70 z-0"></div>
      <div className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-pink-600/25 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute top-1/4 -right-24 w-[420px] h-[420px] rounded-full bg-emerald-500/20 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-yellow-500/20 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute top-2/3 -left-20 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl pointer-events-none z-0"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Floating / Top Music Sound Control Badge */}
        <div className="flex justify-end mb-2">
          <button
            onClick={toggleSound}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-black transition-all shadow-lg cursor-pointer border ${
              !isMuted
                ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white border-pink-300 ring-2 ring-pink-400 animate-pulse'
                : 'bg-slate-900/80 backdrop-blur-md text-pink-300 border-pink-500/50 hover:bg-slate-900'
            }`}
            title={!isMuted ? 'Click to mute Garba song' : 'Click to play Garba song'}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-white" />
                <span>Garba Song Playing 🎵</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-pink-400" />
                <span>Play Song 🔊</span>
              </>
            )}
          </button>
        </div>

        {/* Top Badges - Namo Club Kishangarh Presents & Co Powered By */}
        <div className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 mb-3 px-1">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-7 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-black shadow-lg shadow-pink-500/30 border border-pink-300 ring-2 ring-pink-200 transform hover:scale-105 transition-all text-center max-w-full">
            <span className="text-[10px] min-[360px]:text-xs sm:text-sm md:text-base tracking-wider uppercase font-black">
              NAMO CLUB KISHANGARH PRESENTS
            </span>
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300 flex-shrink-0 animate-pulse" />
          </div>
          
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-0.5 sm:py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-pink-400/50 text-[10px] min-[360px]:text-xs sm:text-sm font-bold text-pink-100 shadow-md text-center max-w-full">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 flex-shrink-0" />
            <span className="truncate max-w-[280px] sm:max-w-none">Co Powered By The Frozen Night Event and Entertainment</span>
          </div>
        </div>

        {/* Grand Dual Presenter Logos: Namo Club Kishangarh & TFN */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 my-2 sm:my-3">
          {/* Namo Club Kishangarh Official Logo (Glowing) */}
          <div className="flex flex-col items-center group">
            <div className="relative">
              {/* Vibrant Golden Glowing Aura */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 opacity-80 blur-md group-hover:opacity-100 transition animate-pulse"></div>
              <img
                src="/images/namo-club-logo.png"
                alt="Namo Club Kishangarh Logo"
                className="relative w-20 h-20 min-[360px]:w-24 min-[360px]:h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain rounded-full border-2 border-amber-400/90 shadow-[0_0_25px_rgba(250,204,21,0.6)] transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-amber-300 mt-1.5 font-serif tracking-wide drop-shadow">
              नमो क्लब किशनगढ़
            </span>
          </div>

          {/* Festive Divider Sparkle */}
          <div className="flex flex-col items-center justify-center px-1">
            <span className="text-pink-400 font-serif font-black text-xl sm:text-2xl">×</span>
            <div className="h-6 w-px bg-gradient-to-b from-transparent via-pink-400/60 to-transparent my-1"></div>
            <span className="text-[9px] sm:text-[10px] font-mono text-emerald-300 uppercase tracking-widest font-bold">Partner</span>
          </div>

          {/* Official TFN Logo (Clean, Non-Glowing) */}
          <div className="flex flex-col items-center group">
            <div className="relative">
              <img
                src="/images/TFN.png"
                alt="The Frozen Night (TFN) Logo"
                className="w-20 h-20 min-[360px]:w-24 min-[360px]:h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain rounded-full transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-slate-200 mt-1.5 font-serif tracking-wide">
              The Frozen Night
            </span>
          </div>
        </div>

        {/* Sub-heading Tag */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 px-2">
          <div className="h-px w-4 sm:w-8 bg-gradient-to-r from-transparent to-pink-400"></div>
          <p className="text-[9px] min-[360px]:text-[10px] sm:text-xs text-pink-300 font-sans tracking-wider sm:tracking-widest uppercase font-black text-center">
            Kishangarh's Grandest Garba & Dandiya Festival 2026
          </p>
          <div className="h-px w-4 sm:w-8 bg-gradient-to-l from-transparent to-emerald-400"></div>
        </div>

        {/* Main Garba Festival Title */}
        <h1 className="text-2xl min-[360px]:text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white tracking-tight leading-[1.15] my-1 sm:my-2 px-2 drop-shadow-md">
          Garba Raas <br className="hidden sm:inline" />
          <span className="festive-gradient-text font-serif italic text-3xl min-[360px]:text-4xl sm:text-5xl md:text-7xl block sm:inline mt-0.5 sm:mt-0 drop-shadow-[0_2px_16px_rgba(236,72,153,0.5)]">
            Dandiya Mahotsav
          </span>
        </h1>

        {/* Descriptive Summary */}
        <p className="text-xs sm:text-sm md:text-base text-slate-200 font-medium max-w-2xl mx-auto mt-1 sm:mt-1.5 px-2 leading-relaxed">
          Experience the divine joy of Navratri! Learn authentic Gujarat moves, graceful spins, live dhol rhythms, and stage choreography by renowned mentors <strong className="text-yellow-300 font-bold">Manish & Neel Sir</strong>.
        </p>

        {/* NEW ANNOUNCEMENT: Boys Dandiya & Girls Special Batch Highlight */}
        <div className="mt-3 mb-2 max-w-2xl mx-auto rounded-2xl bg-gradient-to-r from-slate-900/95 via-indigo-950/90 to-slate-900/95 border-2 border-pink-400/90 p-3 sm:p-4 text-center shadow-xl shadow-pink-500/20 backdrop-blur-md relative overflow-hidden">
          <div className="flex items-center justify-center gap-1.5 text-pink-300 font-black text-[10px] sm:text-xs tracking-wider uppercase">
            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-black text-[9px] sm:text-[10px] uppercase shadow">NEW BATCHES OPEN</span>
            <span className="text-yellow-300">BOYS DANDIYA & GIRLS FAST-TRACK!</span>
          </div>
          <p className="text-sm sm:text-base md:text-lg font-serif font-black text-white mt-1">
            Boys Dandiya (22 Sep–2 Oct • <span className="text-emerald-300">₹1100</span>) | Girls Special (25 Sep–11 Oct • <span className="text-pink-300">₹1500</span>)
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-slate-300 mt-1 font-semibold">
            <span>📍 Bang Marriage Hall & Crystal Park</span>
            <span>•</span>
            <span className="text-emerald-300">⚡ 5 Patterns for Boys (10 Days)</span>
            <span>•</span>
            <span className="text-yellow-300">🗓️ Open Registrations</span>
          </div>
        </div>

        {/* Free Family Pass Highlight Banner */}
        <div className="mt-2 mb-3.5 sm:mb-5 max-w-2xl mx-auto bg-gradient-to-r from-slate-900/90 via-emerald-950/70 to-slate-900/90 border-2 border-emerald-400/80 rounded-2xl p-2.5 sm:p-4 text-center shadow-lg shadow-emerald-500/20 relative overflow-hidden group hover:border-emerald-300 transition-all backdrop-blur-md">
          <div className="flex items-center justify-center gap-1 sm:gap-2 text-emerald-300 font-extrabold text-[9px] min-[360px]:text-[10px] sm:text-xs tracking-wider uppercase">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 flex-shrink-0" />
            <span>SPECIAL INCLUSION FOR ALL ENROLLEES</span>
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 flex-shrink-0" />
          </div>
          <p className="text-xs min-[360px]:text-sm sm:text-lg md:text-xl font-serif font-black garba-gradient-text mt-0.5 sm:mt-1 leading-snug">
            EVERY PARTICIPANT GETS A FREE FAMILY PASS FOR ONE DAY!
          </p>
          <p className="text-[9px] min-[360px]:text-[10px] sm:text-xs text-slate-200 mt-0.5 font-semibold flex items-center justify-center gap-1.5 sm:gap-2">
            <span className="text-pink-300">Dance</span> • <span className="text-yellow-300">Learn</span> • <span className="text-emerald-300">Grow</span> • <span className="text-cyan-300">Celebrate Together</span>
          </p>
        </div>

        {/* 4 Essential Highlights Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 min-[360px]:gap-2 sm:gap-3 text-left max-w-4xl mx-auto my-2.5 sm:my-4">
          
          {/* Pillar 1: Workshop Dates (Pink Accent) */}
          <div className="bg-slate-900/80 backdrop-blur-md border-2 border-pink-500/60 rounded-xl sm:rounded-2xl p-2 min-[360px]:p-2.5 sm:p-3.5 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/20 transition-all">
            <div className="flex items-center gap-1 sm:gap-2 text-pink-300 mb-0.5 sm:mb-1">
              <div className="p-0.5 min-[360px]:p-1 sm:p-1.5 rounded-lg bg-pink-500/20 flex-shrink-0">
                <Calendar className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 text-pink-400" />
              </div>
              <span className="text-[9px] min-[360px]:text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider truncate">Workshop</span>
            </div>
            <div className="text-[11px] min-[360px]:text-xs sm:text-sm md:text-base font-black text-white">13 Sept – 11 Oct</div>
            <div className="text-[8px] min-[360px]:text-[9px] sm:text-[11px] font-semibold text-pink-300 truncate">30-Day Intensive</div>
          </div>

          {/* Pillar 2: Booking Period (Emerald Accent) */}
          <div className="bg-slate-900/80 backdrop-blur-md border-2 border-emerald-500/60 rounded-xl sm:rounded-2xl p-2 min-[360px]:p-2.5 sm:p-3.5 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition-all">
            <div className="flex items-center gap-1 sm:gap-2 text-emerald-300 mb-0.5 sm:mb-1">
              <div className="p-0.5 min-[360px]:p-1 sm:p-1.5 rounded-lg bg-emerald-500/20 flex-shrink-0">
                <Calendar className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 text-emerald-400" />
              </div>
              <span className="text-[9px] min-[360px]:text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider truncate">Booking Period</span>
            </div>
            <div className="text-[11px] min-[360px]:text-xs sm:text-sm md:text-base font-black text-white">9th to 19th Sept</div>
            <div className="text-[8px] min-[360px]:text-[9px] sm:text-[11px] font-semibold text-emerald-300 truncate">Limited Capacity</div>
          </div>

          {/* Pillar 3: Batch Timings (Yellow/Gold Accent) */}
          <div className="bg-slate-900/80 backdrop-blur-md border-2 border-yellow-500/60 rounded-xl sm:rounded-2xl p-2 min-[360px]:p-2.5 sm:p-3.5 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20 transition-all">
            <div className="flex items-center gap-1 sm:gap-2 text-yellow-300 mb-0.5 sm:mb-1">
              <div className="p-0.5 min-[360px]:p-1 sm:p-1.5 rounded-lg bg-yellow-500/20 flex-shrink-0">
                <Clock className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 text-yellow-400" />
              </div>
              <span className="text-[9px] min-[360px]:text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider truncate">Timings</span>
            </div>
            <div className="text-[11px] min-[360px]:text-xs sm:text-sm md:text-base font-black text-white">9:00 AM – 9:00 PM</div>
            <div className="text-[8px] min-[360px]:text-[9px] sm:text-[11px] font-semibold text-yellow-300 truncate">Morning & Evening</div>
          </div>

          {/* Pillar 4: Top Venues (Royal Blue/Cyan Accent) */}
          <div className="bg-slate-900/80 backdrop-blur-md border-2 border-blue-500/60 rounded-xl sm:rounded-2xl p-2 min-[360px]:p-2.5 sm:p-3.5 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20 transition-all">
            <div className="flex items-center gap-1 sm:gap-2 text-cyan-300 mb-0.5 sm:mb-1">
              <div className="p-0.5 min-[360px]:p-1 sm:p-1.5 rounded-lg bg-blue-500/20 flex-shrink-0">
                <MapPin className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 text-cyan-400" />
              </div>
              <span className="text-[9px] min-[360px]:text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider truncate">3 Venues</span>
            </div>
            <div className="text-[11px] min-[360px]:text-xs sm:text-sm md:text-base font-black text-white truncate">TFN & Bang Hall</div>
            <div className="text-[8px] min-[360px]:text-[9px] sm:text-[11px] font-semibold text-cyan-300 truncate">Kishangarh</div>
          </div>

        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 mt-4 sm:mt-5 px-2">
          <button
            onClick={onOpenRegister}
            id="hero-register-btn"
            className="w-full sm:w-auto px-7 sm:px-9 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-black text-sm sm:text-base shadow-xl shadow-pink-500/30 ring-2 ring-pink-300 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 tracking-wide cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 flex-shrink-0 animate-pulse" />
            <span>BOOK YOUR SLOT NOW</span>
            <ChevronRight className="w-4 h-4 text-white/90 flex-shrink-0" />
          </button>

          <button
            onClick={onScrollToSlots}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 backdrop-blur-md border-2 border-emerald-400 text-emerald-300 font-bold text-xs sm:text-sm shadow-md hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
          >
            <Users className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>View Batches & Venues</span>
          </button>
        </div>

        {/* Trust Metrics */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-800 text-[10px] sm:text-xs font-bold text-slate-200">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
            <span>Grand Finale on 18th Oct</span>
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
