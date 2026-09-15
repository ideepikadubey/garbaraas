'use client';

import React, { useState } from 'react';
import { Sparkles, Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenLookup: () => void;
}

export default function Navbar({ onOpenRegister, onOpenLookup }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-[0_4px_20px_rgba(236,72,153,0.04)] transition-all">
      {/* Vibrant Pink Festive Top Accent Ribbon */}
      <div className="w-full h-[3px] bg-gradient-to-r from-garba-pink-500 via-rose-500 via-pink-400 to-garba-pink-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo & Brand - Clean, White & Pink Accent */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-garba-pink-600 via-rose-500 to-pink-400 p-[2px] shadow-sm">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className="text-garba-pink-600 font-serif font-black text-base sm:text-lg tracking-wider">TFN</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-sm sm:text-base md:text-lg font-serif font-extrabold text-[#22060c] tracking-tight leading-tight">
                  THE FROZEN NIGHT
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-pink-50 border border-pink-200 text-[10px] uppercase font-bold text-garba-pink-700 tracking-wider">
                  Kishangarh
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-500 font-medium tracking-wide">
                Garba & Dandiya Classes 2026
              </p>
            </div>
          </div>

          {/* Desktop Nav Links - Clean & Minimal */}
          <div className="hidden md:flex items-center gap-7">
            <a href="#about" className="text-sm text-stone-700 hover:text-garba-pink-600 font-semibold transition">
              About
            </a>
            <a href="#learn" className="text-sm text-stone-700 hover:text-garba-pink-600 font-semibold transition">
              Curriculum
            </a>
            <a href="#slots" className="text-sm text-stone-700 hover:text-garba-pink-600 font-semibold transition">
              Batches & Slots
            </a>
            <a href="#pricing" className="text-sm text-stone-700 hover:text-garba-pink-600 font-semibold transition">
              Pricing
            </a>
            <a href="#prizes" className="text-sm text-stone-700 hover:text-garba-pink-600 font-semibold transition">
              Prizes
            </a>

            <button
              onClick={onOpenLookup}
              className="flex items-center gap-1.5 text-xs text-garba-pink-950 hover:text-garba-pink-700 border border-pink-200 hover:border-pink-300 rounded-full px-3.5 py-1.5 bg-pink-50/60 hover:bg-pink-100/70 shadow-sm transition font-semibold cursor-pointer"
              title="Search Registration & Download Receipt"
            >
              <Search className="w-3.5 h-3.5 text-garba-pink-600" />
              <span>Find Receipt</span>
            </button>
          </div>

          {/* Desktop Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenRegister}
              id="nav-register-btn"
              className="relative group overflow-hidden rounded-full p-[2px] focus:outline-none shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-garba-pink-600 via-rose-500 to-pink-500 rounded-full"></span>
              <span className="relative flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-garba-pink-600 via-rose-500 to-pink-500 text-white font-black text-sm tracking-wide transition-all group-hover:brightness-105">
                <Sparkles className="w-4 h-4 text-pink-200" />
                <span>Register Now</span>
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenLookup}
              className="p-2 text-garba-pink-700 border border-pink-200 rounded-lg bg-pink-50"
              title="Find Receipt"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-800 rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-pink-100 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-garba-pink-600 via-rose-500 to-pink-500 text-white font-bold text-sm rounded-xl text-center shadow-md"
            >
              ✨ Register Now
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLookup();
              }}
              className="w-full py-2.5 px-3 bg-pink-50 border border-pink-200 text-garba-pink-900 font-bold text-sm rounded-xl text-center"
            >
              Find Receipt
            </button>
          </div>

          <div className="space-y-1 pt-2 border-t border-gray-100">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-gray-800 font-semibold"
            >
              About Workshop
            </a>
            <a
              href="#learn"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-gray-800 font-semibold"
            >
              What You'll Learn (8 Styles)
            </a>
            <a
              href="#slots"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-gray-800 font-semibold"
            >
              Batches & Slots
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-gray-800 font-semibold"
            >
              Fees & Family Pass
            </a>
            <a
              href="#prizes"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-gray-800 font-semibold"
            >
              Prize Categories
            </a>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
            <span className="text-garba-pink-800 font-bold">Kishangarh • 2026</span>
            <span className="text-stone-400">Garba & Dandiya Mahotsav</span>
          </div>
        </div>
      )}
    </nav>
  );
}
