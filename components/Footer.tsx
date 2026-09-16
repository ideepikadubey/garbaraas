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
    <footer className="bg-slate-900 border-t border-slate-800 pt-0 pb-24 md:pb-16 text-white">
      {/* Vibrant Festive Accent Ribbon */}
      <div className="w-full h-1 bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* 4 Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800 text-xs sm:text-sm">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/images/TFN.png"
                alt="TFN Logo"
                className="w-12 h-12 object-contain flex-shrink-0"
              />
              <div>
                <h3 className="text-base font-heading font-bold text-white tracking-wide">
                  THE FROZEN NIGHT
                </h3>
                <p className="text-[10px] text-pink-400 uppercase tracking-widest font-extrabold">
                  Event & Entertainment
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Kishangarh's premier dance academy presenting the grandest Garba-Raas & Dandiya Mahotsav masterclass.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <a href="#about" className="hover:text-pink-400 transition">About Workshop</a>
              </li>
              <li>
                <a href="#learn" className="hover:text-emerald-400 transition">Curriculum (8 Styles)</a>
              </li>
              <li>
                <a href="#slots" className="hover:text-yellow-400 transition">Batches & Timings</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-pink-400 transition">Fees & Free Pass</a>
              </li>
              <li>
                <a href="#prizes" className="hover:text-emerald-400 transition">Prize Categories</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Details & Helpline */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3">
              Event & Helplines
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Workshop:</strong> 13 Sept – 11 Oct</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Bang Marriage Hall & Crystal Park</span>
              </li>
              <li className="pt-2 flex flex-col gap-2 border-t border-slate-800">
                <a
                  href="tel:8385969285"
                  className="flex items-center gap-1.5 text-white hover:text-pink-300 font-bold transition"
                >
                  <Phone className="w-3.5 h-3.5 text-pink-400" />
                  <span>Neel Sir: <span className="font-mono text-yellow-300 font-black">+91 83859 69285</span> <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1 py-0.5 rounded font-semibold">Call/WA</span></span>
                </a>
                <a
                  href="tel:8432223222"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-pink-300 font-medium transition"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Manish Sir: <span className="font-mono text-white">+91 84322 23222</span> <span className="text-[9px] bg-slate-800 text-slate-300 px-1 py-0.5 rounded font-semibold">Call</span></span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Action Buttons */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3">
              Registrations & Help
            </h4>
            <div className="space-y-2.5">
              <button
                onClick={onOpenRegister}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-yellow-400 text-slate-950 font-black text-xs shadow-lg hover:brightness-110 transition cursor-pointer"
              >
                Book Your Slot
              </button>
              <button
                onClick={onOpenLookup}
                className="w-full py-2 px-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-bold text-xs hover:bg-slate-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-pink-400" />
                <span>Find / Download Receipt</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-medium">
          <p>© 2026 The Frozen Night. All rights reserved.</p>
          
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200 shadow-sm">
            <span className="text-slate-400">Designed & Developed by</span>
            <strong className="text-pink-400 font-black">The Dynamite Technologies</strong>
            <span className="text-slate-500">•</span>
            <span className="text-yellow-400 font-bold">Kishangarh</span>
          </div>

          <p className="text-pink-400 font-semibold font-heading">
            Garba Raas Dandiya Mahotsav 2026
          </p>
        </div>

      </div>
    </footer>
  );
}
