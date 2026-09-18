'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Phone, MapPin, Calendar, Search } from 'lucide-react';

interface FooterProps {
  onOpenRegister: () => void;
  onOpenLookup: () => void;
}

export default function Footer({ onOpenRegister, onOpenLookup }: FooterProps) {
  return (
    <footer className="bg-white border-t-2 border-pink-100 pt-0 pb-24 md:pb-16 text-slate-900">
      {/* Vibrant Festive Multi-Color Top Accent Ribbon */}
      <div className="w-full h-1 bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* 4 Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100 text-xs sm:text-sm">
          
          {/* Col 1: Brand with Equal Sized Logos */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/namo-club-logo.png"
                alt="Namo Club Logo"
                className="w-11 h-11 rounded-full object-contain flex-shrink-0 border border-amber-300 ring-2 ring-pink-50"
              />
              <img
                src="/images/TFN.png"
                alt="TFN Logo"
                className="w-11 h-11 rounded-full object-contain flex-shrink-0"
              />
              <div>
                <h3 className="text-base font-heading font-black text-slate-900 tracking-wide">
                  THE FROZEN NIGHT
                </h3>
                <p className="text-[10px] text-pink-600 uppercase tracking-widest font-extrabold">
                  Event & Entertainment
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Kishangarh's premier dance academy presenting the grandest Garba-Raas & Dandiya Mahotsav masterclass.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li>
                <a href="#about" className="hover:text-pink-600 transition">About Workshop</a>
              </li>
              <li>
                <a href="#learn" className="hover:text-emerald-600 transition">Curriculum (8 Styles)</a>
              </li>
              <li>
                <a href="#slots" className="hover:text-yellow-600 transition">Batches & Timings</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-pink-600 transition">Fees & Free Pass</a>
              </li>
              <li>
                <a href="#prizes" className="hover:text-emerald-600 transition">Prize Categories</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Details & Helpline */}
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 font-heading">
              Event & Helplines
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              <li className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                <span><strong className="text-slate-900">Workshop:</strong> 13 Sept – 11 Oct</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Bang Marriage Hall & TFN Studio</span>
              </li>
              <li className="pt-2 flex flex-col gap-2 border-t border-slate-100">
                <a
                  href="tel:8385969285"
                  className="flex items-center gap-1.5 text-slate-900 hover:text-pink-600 font-bold transition"
                >
                  <Phone className="w-3.5 h-3.5 text-pink-600" />
                  <span>Neel Sir: <span className="font-mono text-slate-950 font-black">+91 83859 69285</span> <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Call/WA</span></span>
                </a>
                <a
                  href="tel:8432223222"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-pink-600 font-medium transition"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Manish Sir: <span className="font-mono text-slate-900 font-bold">+91 84322 23222</span> <span className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-semibold">Call</span></span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Action Buttons */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 font-heading">
              Registrations & Help
            </h4>
            <div className="space-y-2.5">
              <button
                onClick={onOpenRegister}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-black text-xs shadow-md hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                Book Your Slot
              </button>
              <button
                onClick={onOpenLookup}
                className="w-full py-2 px-3 rounded-xl bg-white border-2 border-pink-200 text-slate-900 font-bold text-xs hover:bg-pink-50 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-pink-600" />
                <span>Find / Download Receipt</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <p>© 2026 The Frozen Night. All rights reserved.</p>
          
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
            <span className="text-slate-500">Designed & Developed by</span>
            <strong className="text-pink-600 font-black">The Dynamite Technologies</strong>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700 font-bold">Kishangarh</span>
          </div>

          <p className="text-pink-600 font-bold font-heading">
            Garba Raas Dandiya Mahotsav 2026
          </p>
        </div>

      </div>
    </footer>
  );
}
