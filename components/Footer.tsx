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
    <footer className="bg-white border-t-2 border-amber-200 pt-0 pb-24 md:pb-16 text-stone-950">
      {/* Vibrant Golden Yellow Festive Accent Ribbon */}
      <div className="w-full h-[3px] bg-gradient-to-r from-amber-500 via-yellow-400 via-amber-400 to-amber-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* 4 Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-amber-100 text-xs sm:text-sm">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/images/TFN.png"
                alt="TFN Logo"
                className="w-11 h-11 object-contain flex-shrink-0"
              />
              <div>
                <h3 className="text-base font-serif font-bold text-stone-950">
                  THE FROZEN NIGHT
                </h3>
                <p className="text-[10px] text-amber-800 uppercase tracking-widest font-extrabold">
                  Event & Entertainment
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              Kishangarh's premier dance academy presenting the biggest Garba-Raas & Dandiya Mahotsav masterclass.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-extrabold text-stone-950 uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-stone-700 font-medium">
              <li>
                <a href="#about" className="hover:text-amber-700 transition">About Workshop</a>
              </li>
              <li>
                <a href="#learn" className="hover:text-amber-700 transition">Curriculum (8 Styles)</a>
              </li>
              <li>
                <a href="#slots" className="hover:text-amber-700 transition">Batches & Timings</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-amber-700 transition">Fees & Free Pass</a>
              </li>
              <li>
                <a href="#prizes" className="hover:text-amber-700 transition">Prize Categories</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Details */}
          <div>
            <h4 className="text-xs font-extrabold text-stone-950 uppercase tracking-wider mb-3">
              Event Details
            </h4>
            <ul className="space-y-2 text-xs text-stone-700 font-medium">
              <li className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span><strong>Workshop:</strong> 13 Sept – 11 Oct</span>
              </li>
              <li className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <span><strong>Grand Finale:</strong> 18th October</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>TFN Studio & Bang Marriage Hall</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Action Buttons */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-stone-950 uppercase tracking-wider mb-3">
              Registrations & Help
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenRegister}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 font-black text-xs shadow-md hover:brightness-105 transition cursor-pointer ring-1 ring-amber-300"
              >
                Book Your Slot
              </button>
              <button
                onClick={onOpenLookup}
                className="w-full py-2 px-3 rounded-xl bg-white border-2 border-amber-200 text-amber-950 font-bold text-xs hover:bg-amber-50 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-amber-700" />
                <span>Find / Download Receipt</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-stone-500 font-medium">
          <p>© 2026 The Frozen Night. All rights reserved.</p>
          
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-950 shadow-sm">
            <span className="text-stone-600">Designed & Developed by</span>
            <strong className="text-amber-800 font-black">The Dynamite Technologies</strong>
            <span className="text-stone-400">•</span>
            <span className="text-amber-800 font-bold">Kishangarh</span>
          </div>

          <p className="text-amber-800 font-semibold">
            Garba Raas Dandiya Mahotsav 2026
          </p>
        </div>

      </div>
    </footer>
  );
}
