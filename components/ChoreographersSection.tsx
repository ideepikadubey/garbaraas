'use client';

import React from 'react';
import { Phone, MessageCircle, MapPin, Sparkles, Heart } from 'lucide-react';

export default function ChoreographersSection() {
  return (
    <section id="about" className="relative py-10 md:py-16 bg-white border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-pink-50/50 via-white to-blue-50/50 border-2 border-pink-200 p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Master Choreographers Info */}
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs text-pink-700 uppercase tracking-widest font-black mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                Master Mentors
              </div>

              <h2 className="text-xl min-[360px]:text-2xl sm:text-3xl md:text-4xl font-serif font-black text-slate-900 leading-tight">
                Choreographed by <br />
                <span className="festive-gradient-text text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl font-serif font-black">
                  MANISH & NEEL SIR
                </span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-3 sm:mt-4 leading-relaxed font-medium">
                With over a decade of dedication to Indian classical and folk dance arts, Manish Sir and Neel Sir bring unmatched expertise in authentic Gujarat Garba-Raas rhythms, Dandiya pair formations, and modern festive performance techniques.
              </p>

              <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 bg-pink-50 px-3.5 sm:px-4 py-1.5 rounded-2xl border border-pink-200 text-pink-900 font-bold shadow-xs">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-600" />
                  <span>Personal Attention to Every Batch</span>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 px-3.5 sm:px-4 py-1.5 rounded-2xl border border-amber-200 text-amber-900 font-bold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                  <span>Beginner to Advanced Friendly</span>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200">
                <div className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                  <MapPin className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900 font-bold">Studio Headquarters:</strong> TFN – The Frozen Night Dance Academy Studio, Kishangarh, Rajasthan.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col: Direct Mentor Contact Card */}
            <div className="md:col-span-5 rounded-3xl bg-white border-2 border-pink-300 p-4 sm:p-7 shadow-md">
              <div className="text-center pb-4 border-b border-pink-100">
                <p className="text-xs uppercase font-black tracking-widest festive-gradient-text">
                  Direct Mentor Contact
                </p>
                <h3 className="text-xl font-serif font-black text-slate-900 mt-1">
                  Have Any Questions?
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  Speak directly with mentor Neel Sir
                </p>
              </div>

              <div className="space-y-3 my-5">
                {/* Neel Sir Call Card */}
                <a
                  href="tel:8385969285"
                  className="flex items-center justify-between p-3 rounded-2xl bg-pink-50 border-2 border-pink-400 hover:border-pink-500 hover:bg-pink-100 transition text-slate-950 group cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-pink-600 text-white shadow-xs">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-pink-900 uppercase font-black flex items-center gap-1.5">
                        <span>Neel Sir</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-pink-200 text-pink-900 font-black">Mr. Dandiya 2019</span>
                      </div>
                      <div className="text-xs sm:text-sm font-mono font-black text-slate-900">+91 83859 69285</div>
                    </div>
                  </div>
                  <span className="text-xs font-black bg-pink-600 text-white px-2.5 py-1 rounded-lg group-hover:scale-105 transition shadow-xs">
                    Call →
                  </span>
                </a>

                {/* WhatsApp Chat with Neel Sir */}
                <a
                  href="https://wa.me/918385969285?text=Hello%20Neel%20Sir%2C%20I%20want%20information%20regarding%20the%20TFN%20Garba%20workshop%20in%20Kishangarh"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black transition shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Chat with Neel Sir on WhatsApp</span>
                </a>

                {/* Manish Sir Call Card */}
                <a
                  href="tel:8432223222"
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/70 transition text-slate-900 group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white text-slate-700 border border-slate-200 shadow-xs">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-700 uppercase font-bold flex items-center gap-1.5">
                        <span>Manish Sir</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-semibold">Mr. Dandiya 2016</span>
                      </div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-slate-900">+91 84322 23222</div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-600 group-hover:text-blue-700 transition font-bold">
                    Call →
                  </span>
                </a>
              </div>

              <a
                href="https://wa.me/918385969285?text=Hello%20Sir%2C%20I%20want%20information%20regarding%20the%20TFN%20Garba%20workshop%20in%20Kishangarh"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-black text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (Admissions)</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
