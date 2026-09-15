'use client';

import React from 'react';
import { Phone, MessageCircle, MapPin, Sparkles, Heart } from 'lucide-react';

export default function ChoreographersSection() {
  return (
    <section id="about" className="relative py-10 md:py-16 bg-white border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-amber-50/40 via-white to-yellow-50/40 border-2 border-amber-200 p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Master Choreographers Info */}
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs text-amber-900 uppercase tracking-widest font-bold mb-3 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Master Mentors
              </div>

              <h2 className="text-xl min-[360px]:text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-maroon-950 leading-tight">
                Choreographed by <br />
                <span className="garba-gradient-text text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl font-serif font-black">
                  MANISH & NEEL SIR
                </span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-stone-700 mt-3 sm:mt-4 leading-relaxed font-medium">
                With over a decade of dedication to Indian classical and folk dance arts, Manish Sir and Neel Sir bring unmatched expertise in authentic Gujarat Garba-Raas rhythms, Dandiya pair formations, and modern festive performance techniques.
              </p>

              <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 bg-amber-50 px-3 sm:px-3.5 py-1.5 rounded-xl border border-amber-200 text-amber-950 font-semibold shadow-sm">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                  <span>Personal Attention to Every Batch</span>
                </div>
                <div className="flex items-center gap-1.5 bg-yellow-50 px-3 sm:px-3.5 py-1.5 rounded-xl border border-yellow-200 text-amber-950 font-semibold shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                  <span>Beginner to Advanced Friendly</span>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-amber-100">
                <div className="flex items-start gap-2 text-xs text-stone-600 font-medium">
                  <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-maroon-950 font-bold">Studio Headquarters:</strong> TFN – The Frozen Night Dance Academy Studio, Kishangarh, Rajasthan.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col: Direct Mentor Contact Card */}
            <div className="md:col-span-5 rounded-3xl bg-white border-2 border-amber-300 p-4 sm:p-7 shadow-md">
              <div className="text-center pb-4 border-b border-amber-100">
                <p className="text-xs uppercase font-black tracking-widest garba-gradient-text">
                  Direct Mentor Contact
                </p>
                <h3 className="text-xl font-serif font-bold text-maroon-950 mt-1">
                  Have Any Questions?
                </h3>
                <p className="text-xs text-stone-600 font-medium mt-1">
                  Speak directly with lead choreographer Neel Sir
                </p>
              </div>

              <div className="space-y-3 my-6">
                {/* Neel Sir Call Card */}
                <a
                  href="tel:8385969285"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50/80 border border-amber-300 hover:border-amber-400 hover:bg-amber-100/70 transition text-stone-950 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white text-amber-600 border border-amber-200 shadow-sm">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-amber-800 uppercase font-extrabold">Neel Sir</div>
                      <div className="text-sm font-mono font-black text-stone-950">+91 838 596 9285</div>
                    </div>
                  </div>
                  <span className="text-xs text-amber-800 group-hover:translate-x-1 transition font-bold">
                    Call →
                  </span>
                </a>
              </div>

              <a
                href="https://wa.me/918385969285?text=Hello%20Neel%20Sir%2C%20I%20want%20information%20regarding%20the%20TFN%20Garba%20workshop%20in%20Kishangarh"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-105 text-stone-950 font-black text-xs sm:text-sm ring-1 ring-amber-300 transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Neel Sir on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
