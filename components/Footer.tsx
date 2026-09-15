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
    <footer className="bg-white border-t-2 border-pink-200 pt-0 pb-24 md:pb-16 text-maroon-950">
      {/* Vibrant Pink Festive Accent Ribbon */}
      <div className="w-full h-[3px] bg-gradient-to-r from-garba-pink-500 via-rose-500 via-pink-400 to-garba-pink-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* 4 Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-pink-100 text-xs sm:text-sm">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-[2px] rounded-full bg-gradient-to-tr from-garba-pink-600 via-rose-500 to-pink-400 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-white border border-pink-200 flex items-center justify-center text-maroon-950 font-serif font-black text-sm">
                  TFN
                </div>
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-maroon-950">
                  THE FROZEN NIGHT
                </h3>
                <p className="text-[10px] text-garba-pink-700 uppercase tracking-widest font-extrabold">
                  Event & Entertainments
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              Kishangarh's premier dance academy presenting the biggest Garba-Raas & Dandiya Mahotsav masterclass.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-extrabold text-maroon-950 uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-stone-700 font-medium">
              <li>
                <a href="#about" className="hover:text-garba-pink-600 transition">About Workshop</a>
              </li>
              <li>
                <a href="#learn" className="hover:text-garba-pink-600 transition">Curriculum (8 Styles)</a>
              </li>
              <li>
                <a href="#slots" className="hover:text-garba-pink-600 transition">Batches & Timings</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-garba-pink-600 transition">Fees & Free Pass</a>
              </li>
              <li>
                <a href="#prizes" className="hover:text-garba-pink-600 transition">Prize Categories</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Details */}
          <div>
            <h4 className="text-xs font-extrabold text-maroon-950 uppercase tracking-wider mb-3">
              Event Details
            </h4>
            <ul className="space-y-2 text-xs text-stone-700 font-medium">
              <li className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-garba-pink-600 flex-shrink-0 mt-0.5" />
                <span><strong>Workshop:</strong> 13 Sept – 11 Oct</span>
              </li>
              <li className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span><strong>Grand Finale:</strong> 18th October</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-garba-pink-600 flex-shrink-0 mt-0.5" />
                <span>TFN Studio & Bang Marriage Hall</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Action Buttons */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-maroon-950 uppercase tracking-wider mb-3">
              Registrations & Help
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenRegister}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-garba-pink-600 via-rose-500 to-pink-500 text-white font-bold text-xs shadow-md hover:brightness-105 transition cursor-pointer"
              >
                Book Your Slot
              </button>
              <button
                onClick={onOpenLookup}
                className="w-full py-2 px-3 rounded-xl bg-white border-2 border-pink-200 text-garba-pink-900 font-bold text-xs hover:bg-pink-50 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-garba-pink-600" />
                <span>Find / Download Receipt</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-stone-500 font-medium">
          <p>© 2026 The Frozen Night. All rights reserved.</p>
          
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs font-semibold text-garba-pink-900 shadow-sm">
            <span className="text-stone-600">Designed & Developed by</span>
            <strong className="text-garba-pink-700 font-black">The Dynamite Technologies</strong>
            <span className="text-stone-400">•</span>
            <span className="text-garba-pink-800 font-bold">Kishangarh</span>
          </div>

          <p className="text-garba-pink-700 font-semibold">
            Garba-Raas & Dandiya Mahotsav 2026
          </p>
        </div>

      </div>
    </footer>
  );
}

