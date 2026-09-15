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
    <section className="relative overflow-hidden bg-stone-950 pt-4 pb-10 md:pt-6 md:pb-14 border-b border-amber-500/30">
      
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
        {/* Cinematic Black Opacity Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85 backdrop-blur-[0.5px]"></div>
      </div>

      {/* Background Decorative Ambient Festive Golden Yellow Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[650px] bg-radial-gradient from-yellow-500/20 to-transparent pointer-events-none blur-3xl opacity-60 z-0"></div>
      <div className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-amber-500/20 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute top-1/4 -right-24 w-[420px] h-[420px] rounded-full bg-yellow-400/20 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-amber-600/20 blur-3xl pointer-events-none z-0"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Floating / Top Music Sound Control Badge */}
        <div className="flex justify-end mb-2">
          <button
            onClick={toggleSound}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-lg cursor-pointer border ${
              !isMuted
                ? 'bg-amber-500 text-stone-950 border-amber-300 ring-2 ring-yellow-300 animate-pulse'
                : 'bg-black/70 backdrop-blur-md text-amber-300 border-amber-500/50 hover:bg-black/90'
            }`}
            title={!isMuted ? 'Click to mute Garba song' : 'Click to play Garba song'}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-stone-950" />
                <span>Garba Song Playing 🎵</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                <span>Play Song 🔊</span>
              </>
            )}
          </button>
        </div>

        {/* Top Badges - Namo Club Kishangarh Presents & Co Powered By (Centered Stack) */}
        <div className="flex flex-col items-center justify-center gap-1.5 sm:gap-2.5 mb-2 sm:mb-4 px-1">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-1 sm:py-2 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 font-black shadow-lg shadow-amber-500/30 border border-amber-300 ring-2 ring-yellow-200 transform hover:scale-105 transition-all text-center max-w-full">
            <span className="text-[10px] min-[360px]:text-xs sm:text-sm md:text-base tracking-wider uppercase font-black">
              NAMO CLUB KISHANGARH PRESENTS
            </span>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-stone-950 flex-shrink-0" />
          </div>
          
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-0.5 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/80 text-[10px] min-[360px]:text-xs sm:text-sm font-bold text-amber-200 shadow-md text-center max-w-full">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate max-w-[280px] sm:max-w-none">Co Powered By The Frozen Night Event and Entertainment</span>
          </div>
        </div>

        {/* Official TFN Logo */}
        <div className="inline-flex items-center justify-center my-1.5 sm:my-3">
          <img
            src="/images/TFN.png"
            alt="The Frozen Night (TFN) Logo"
            className="w-24 h-24 min-[360px]:w-28 min-[360px]:h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain filter drop-shadow-[0_4px_16px_rgba(234,179,8,0.4)] hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Sub-heading Tag */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 px-2">
          <div className="h-px w-4 sm:w-8 bg-amber-400"></div>
          <p className="text-[9px] min-[360px]:text-[10px] sm:text-xs text-amber-300 font-sans tracking-wider sm:tracking-widest uppercase font-extrabold text-center">
            Kishangarh's Biggest Garba & Dandiya Festival 2026
          </p>
          <div className="h-px w-4 sm:w-8 bg-amber-400"></div>
        </div>

        {/* Main Garba Festival Title */}
        <h1 className="text-2xl min-[360px]:text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-white tracking-tight leading-[1.15] my-1 sm:my-2 px-2 drop-shadow-md">
          Garba Raas <br className="hidden sm:inline" />
          <span className="garba-gradient-text font-serif italic text-3xl min-[360px]:text-4xl sm:text-5xl md:text-7xl block sm:inline mt-0.5 sm:mt-0 drop-shadow-[0_2px_12px_rgba(234,179,8,0.5)]">
            Dandiya Mahotsav
          </span>
        </h1>

        {/* Descriptive Summary */}
        <p className="text-xs sm:text-sm md:text-base text-amber-100 font-medium max-w-2xl mx-auto mt-1 sm:mt-1.5 px-2 leading-relaxed">
          Experience the divine joy of Navratri! Learn authentic Gujarat moves, graceful spins, live dhol rhythms, and stage choreography by renowned mentors <strong className="text-yellow-300 font-bold">Manish & Neel Sir</strong>.
        </p>

        {/* Free Family Pass Highlight Banner */}
        <div className="mt-2.5 sm:mt-4 mb-3.5 sm:mb-5 max-w-2xl mx-auto bg-gradient-to-r from-black/80 via-amber-950/60 to-black/80 border-2 border-amber-400/90 rounded-2xl p-2.5 sm:p-4 text-center shadow-lg relative overflow-hidden group hover:border-amber-300 transition-all backdrop-blur-md">
          <div className="flex items-center justify-center gap-1 sm:gap-2 text-amber-300 font-extrabold text-[9px] min-[360px]:text-[10px] sm:text-xs tracking-wider uppercase">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 flex-shrink-0" />
            <span>SPECIAL INCLUSION FOR ALL ENROLLEES</span>
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 flex-shrink-0" />
          </div>
          <p className="text-xs min-[360px]:text-sm sm:text-lg md:text-xl font-serif font-black garba-gradient-text mt-0.5 sm:mt-1 leading-snug">
            EVERY PARTICIPANT GETS A FREE FAMILY PASS FOR ONE DAY!
          </p>
          <p className="text-[9px] min-[360px]:text-[10px] sm:text-xs text-amber-100/90 mt-0.5 font-semibold flex items-center justify-center gap-1.5 sm:gap-2">
            <span>Dance</span> • <span>Learn</span> • <span>Grow</span> • <span>Celebrate Together</span>
          </p>
        </div>

        {/* 4 Essential Highlights Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 min-[360px]:gap-2 sm:gap-3 text-left max-w-4xl mx-auto my-2.5 sm:my-4">
          
          {/* Pillar 1: Workshop Dates */}
          <div className="bg-black/65 backdrop-blur-md border-2 border-amber-400/50 rounded-xl sm:rounded-2xl p-2 min-[360px]:p-2.5 sm:p-3.5 hover:border-amber-400 hover:shadow-lg transition-all">
            <div className="flex items-center gap-1 sm:gap-2 text-amber-300 mb-0.5 sm:mb-1">
              <div className="p-0.5 min-[360px]:p-1 sm:p-1.5 rounded-lg bg-amber-500/20 flex-shrink-0">
                <Calendar className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 text-amber-400" />
              </div>
              <span className="text-[9px] min-[360px]:text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider truncate">Workshop</span>
            </div>
            <div className="text-[11px] min-[360px]:text-xs sm:text-sm md:text-base font-black text-white">13 Sept – 11 Oct</div>
            <div className="text-[8px] min-[360px]:text-[9px] sm:text-[11px] font-semibold text-amber-300 truncate">30-Day Intensive</div>
          </div>

          {/* Pillar 2: Booking Period */}
          <div className="bg-black/65 backdrop-blur-md border-2 border-yellow-400/50 rounded-xl sm:rounded-2xl p-2 min-[360px]:p-2.5 sm:p-3.5 hover:border-yellow-400 hover:shadow-lg transition-all">
            <div className="flex items-center gap-1 sm:gap-2 text-amber-300 mb-0.5 sm:mb-1">
              <div className="p-0.5 min-[360px]:p-1 sm:p-1.5 rounded-lg bg-yellow-500/20 flex-shrink-0">
                <Calendar className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 text-amber-400" />
              </div>
              <span className="text-[9px] min-[360px]:text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider truncate">Booking Period</span>
            </div>
            <div className="text-[11px] min-[360px]:text-xs sm:text-sm md:text-base font-black text-white">9th to 19th Sept</div>
            <div className="text-[8px] min-[360px]:text-[9px] sm:text-[11px] font-semibold text-amber-300 truncate">Limited Capacity</div>
          </div>

          {/* Pillar 3: Batch Timings */}
          <div className="bg-black/65 backdrop-blur-md border-2 border-amber-400/50 rounded-xl sm:rounded-2xl p-2 min-[360px]:p-2.5 sm:p-3.5 hover:border-amber-400 hover:shadow-lg transition-all">
            <div className="flex items-center gap-1 sm:gap-2 text-amber-300 mb-0.5 sm:mb-1">
              <div className="p-0.5 min-[360px]:p-1 sm:p-1.5 rounded-lg bg-amber-500/20 flex-shrink-0">
                <Clock className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 text-amber-400" />
              </div>
              <span className="text-[9px] min-[360px]:text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider truncate">Timings</span>
            </div>
            <div className="text-[11px] min-[360px]:text-xs sm:text-sm md:text-base font-black text-white">9:00 AM – 9:00 PM</div>
            <div className="text-[8px] min-[360px]:text-[9px] sm:text-[11px] font-semibold text-amber-300 truncate">Morning & Evening</div>
          </div>

          {/* Pillar 4: Top Venues */}
          <div className="bg-black/65 backdrop-blur-md border-2 border-yellow-400/50 rounded-xl sm:rounded-2xl p-2 min-[360px]:p-2.5 sm:p-3.5 hover:border-yellow-400 hover:shadow-lg transition-all">
            <div className="flex items-center gap-1 sm:gap-2 text-amber-300 mb-0.5 sm:mb-1">
              <div className="p-0.5 min-[360px]:p-1 sm:p-1.5 rounded-lg bg-yellow-500/20 flex-shrink-0">
                <MapPin className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 text-amber-400" />
              </div>
              <span className="text-[9px] min-[360px]:text-[10px] sm:text-[11px] uppercase font-extrabold tracking-wider truncate">3 Venues</span>
            </div>
            <div className="text-[11px] min-[360px]:text-xs sm:text-sm md:text-base font-black text-white truncate">TFN & Bang Hall</div>
            <div className="text-[8px] min-[360px]:text-[9px] sm:text-[11px] font-semibold text-amber-300 truncate">Kishangarh</div>
          </div>

        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 mt-4 sm:mt-5 px-2">
          <button
            onClick={onOpenRegister}
            id="hero-register-btn"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/30 ring-2 ring-amber-300 hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 tracking-wide cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-stone-950 flex-shrink-0" />
            <span>BOOK YOUR SLOT NOW</span>
            <ChevronRight className="w-4 h-4 text-stone-950/80 flex-shrink-0" />
          </button>

          <button
            onClick={onScrollToSlots}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-black/60 hover:bg-black/80 backdrop-blur-md border-2 border-amber-400 text-amber-300 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>View Batches & Venues</span>
          </button>
        </div>

        {/* Trust Metrics */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-amber-500/30 text-[10px] sm:text-xs font-bold text-amber-100">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>Grand Finale on 18th Oct</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>Live Dhol & Maha Aarti</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>100% Female Safe Environment</span>
          </div>
        </div>

      </div>
    </section>
  );
}
