'use client';

import React from 'react';
import { Phone, MessageCircle, MapPin, Sparkles, Heart } from 'lucide-react';

export default function ChoreographersSection() {
  return (
    <section id="about" className="relative py-10 md:py-16 bg-white border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-pink-50/40 via-white to-rose-50/40 border-2 border-pink-200 p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Master Choreographers Info */}
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-50 border border-pink-200 text-xs text-garba-pink-800 uppercase tracking-widest font-bold mb-3 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-garba-pink-600" />
                Master Mentors
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-maroon-950 leading-tight">
                Choreographed by <br />
                <span className="garba-gradient-text text-3xl sm:text-4xl md:text-5xl font-serif font-black">
                  MANISH & NEEL SIR
                </span>
              </h2>

              <p className="text-sm sm:text-base text-stone-700 mt-4 leading-relaxed font-medium">
                With over a decade of dedication to Indian classical and folk dance arts, Manish Sir and Neel Sir bring unmatched expertise in authentic Gujarat Garba-Raas rhythms, Dandiya pair formations, and modern festive performance techniques.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 bg-pink-50 px-3.5 py-1.5 rounded-xl border border-pink-200 text-garba-pink-900 font-semibold shadow-sm">
                  <Heart className="w-4 h-4 text-garba-pink-600" />
                  <span>Personal Attention to Every Batch</span>
                </div>
                <div className="flex items-center gap-1.5 bg-rose-50 px-3.5 py-1.5 rounded-xl border border-rose-200 text-rose-900 font-semibold shadow-sm">
                  <Sparkles className="w-4 h-4 text-rose-600" />
                  <span>Beginner to Advanced Friendly</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-pink-100">
                <div className="flex items-start gap-2 text-xs text-stone-600 font-medium">
                  <MapPin className="w-4 h-4 text-garba-pink-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-maroon-950 font-bold">Studio Headquarters:</strong> TFN – The Frozen Night Dance Academy Studio, Kishangarh, Rajasthan.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col: Direct Mentor Contact Card */}
            <div className="md:col-span-5 rounded-3xl bg-white border-2 border-pink-300 p-6 sm:p-7 shadow-md">
              <div className="text-center pb-4 border-b border-pink-100">
                <p className="text-xs uppercase font-black tracking-widest garba-gradient-text">
                  Direct Mentor Contact
                </p>
                <h3 className="text-xl font-serif font-bold text-maroon-950 mt-1">
                  Have Any Questions?
                </h3>
                <p className="text-xs text-stone-600 font-medium mt-1">
                  Speak directly with our lead choreographers
                </p>
              </div>

              <div className="space-y-3 my-6">
                <a
                  href="tel:8432223222"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-pink-50/80 border border-pink-200 hover:border-pink-400 hover:bg-pink-100/70 transition text-maroon-950 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white text-garba-pink-600 border border-pink-200 shadow-sm">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-garba-pink-700 uppercase font-extrabold">Manish Sir</div>
                      <div className="text-sm font-mono font-black text-maroon-950">843 222 3222</div>
                    </div>
                  </div>
                  <span className="text-xs text-garba-pink-700 group-hover:translate-x-1 transition font-bold">
                    Call →
                  </span>
                </a>

                <a
                  href="tel:8385969285"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200 hover:border-rose-400 hover:bg-rose-100/70 transition text-maroon-950 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white text-rose-600 border border-rose-200 shadow-sm">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-rose-700 uppercase font-extrabold">Neel Sir</div>
                      <div className="text-sm font-mono font-black text-maroon-950">838 596 9285</div>
                    </div>
                  </div>
                  <span className="text-xs text-rose-700 group-hover:translate-x-1 transition font-bold">
                    Call →
                  </span>
                </a>
              </div>

              <a
                href="https://wa.me/918432223222?text=Hello%20Manish%20Sir%2C%20I%20want%20information%20regarding%20the%20TFN%20Garba%20workshop%20in%20Kishangarh"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-garba-pink-600 via-rose-500 to-pink-500 hover:brightness-105 text-white font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

