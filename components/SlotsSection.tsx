'use client';

import React, { useState, useEffect } from 'react';
import { Clock, MapPin, CheckCircle2, AlertTriangle, XCircle, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { Slot } from '@/lib/types';

interface SlotsSectionProps {
  onSelectSlot: (slot: Slot) => void;
}

export default function SlotsSection({ onSelectSlot }: SlotsSectionProps) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string>('ALL');

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/slots');
      const data = await res.json();
      if (data.success && Array.isArray(data.slots)) {
        setSlots(data.slots);
      }
    } catch (e) {
      console.error('Error loading slots:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  // Distinct locations
  const locations = [
    { id: 'ALL', name: 'All Locations' },
    { id: 'The Frozen Studio', name: 'The Frozen Studio' },
    { id: 'Bang Marriage Hall', name: 'Bang Marriage Hall' },
    { id: 'Cricket Academy', name: 'Kishangarh Cricket Academy' },
  ];

  const filteredSlots = slots.filter((slot) => {
    if (selectedLocation === 'ALL') return true;
    return slot.locationName.includes(selectedLocation) || (selectedLocation === 'The Frozen Studio' && slot.locationName.includes('TFN'));
  });

  return (
    <section id="slots" className="relative py-10 md:py-16 bg-white border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs text-pink-700 uppercase tracking-widest font-black mb-2 shadow-xs">
            <Clock className="w-3.5 h-3.5 text-pink-500" />
            Live Workshop Batch Availability
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-tight">
            WORKSHOP <span className="festive-gradient-text">LOCATIONS & TIMINGS</span>
          </h2>
          <div className="h-[3.5px] w-24 sm:w-32 mx-auto my-3 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600"></div>
          <p className="text-xs sm:text-base text-slate-600 font-medium">
            Seats are allocated on a verified first-come, first-served basis.
          </p>
        </div>

        {/* 🚨 Urgent Notice: Regular Batches Housefull & 1 to 11 Oct Special Open */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-50 via-pink-50 to-amber-50 border-2 border-pink-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-pink-600 text-white font-black flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">
                Notice: All Regular Workshop Batches Are Fully Booked!
              </h4>
              <p className="text-xs text-slate-700 font-medium mt-0.5">
                Newly Added Active Batches: <strong className="text-pink-700">1 to 11 Oct Special Batches (Female: ₹1500 | Male: ₹1400)</strong> at <strong className="text-pink-700">Bang Marriage Hall (5–6 PM & 6–7 PM)</strong> & <strong className="text-pink-700">The Frozen Studio (11 AM–12 PM & 12–1 PM)</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-black text-xs">
              🟢 4 Active Batches Open
            </span>
          </div>
        </div>

        {/* Location Filter Tabs & Refresh with Garba Color Badges */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="flex flex-nowrap overflow-x-auto gap-2 pb-2 sm:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {locations.map((loc) => {
              const isSelected = selectedLocation === loc.id;
              const activeClass = 'bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white shadow-md font-black ring-2 ring-pink-300';

              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc.id)}
                  className={`px-3.5 sm:px-5 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                    isSelected
                      ? activeClass
                      : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-pink-300 shadow-xs'
                  }`}
                >
                  {loc.name}
                </button>
              );
            })}
          </div>

          <button
            onClick={fetchSlots}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-2xl bg-white border-2 border-pink-200 text-xs font-bold text-pink-700 hover:bg-pink-50 transition shadow-xs cursor-pointer self-end sm:self-auto"
            title="Refresh availability"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Batches</span>
          </button>
        </div>

        {/* Slots Content */}
        {loading && slots.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-10 h-10 border-3 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm font-bold text-pink-700">Loading live workshop batches...</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* ⭐ 1. SPECIAL & FINAL BATCHES (1 TO 11 OCT) - ACTIVE & OPEN */}
            {(() => {
              const activeSlots = filteredSlots.filter(
                (s) => s.id.startsWith('slot-oct-') || s.batchName.toLowerCase().includes('special & final') || s.batchName.toLowerCase().includes('1 to 11 oct')
              );

              if (activeSlots.length === 0) return null;

              return (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 uppercase tracking-wide">
                      ⭐ Special & Final Batches <span className="text-pink-600">(1st to 11th Oct • Open for Booking)</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                    {activeSlots.map((slot) => {
                      const remaining = Math.max(0, slot.capacity - slot.bookedSeats);
                      const isFull = slot.status === 'FULL' || remaining <= 0;

                      return (
                        <div
                          key={slot.id}
                          className="relative rounded-3xl p-6 border-2 border-pink-400 bg-gradient-to-br from-white via-pink-50/50 to-amber-50/50 shadow-xl shadow-pink-500/15 ring-2 ring-pink-300 flex flex-col justify-between"
                        >
                          {/* Live Special Badge */}
                          <div className="absolute -top-3 right-5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-black text-[10px] uppercase tracking-wider shadow-md flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
                            <span>1–11 OCT SPECIAL BATCH</span>
                          </div>

                          <div>
                            {/* Location & Status */}
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <div>
                                <div className="flex items-center gap-1.5 text-pink-700 text-xs font-black mb-0.5">
                                  <MapPin className="w-3.5 h-3.5" />
                                  <span>{slot.locationName}</span>
                                </div>
                                <p className="text-[11px] text-slate-600 font-semibold truncate max-w-[220px]">
                                  {slot.locationAddress}
                                </p>
                              </div>

                              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Available
                              </span>
                            </div>

                            {/* Batch Timing Card */}
                            <div className="rounded-2xl p-4 border border-pink-300 bg-pink-100/70 my-3">
                              <div className="inline-block px-2.5 py-0.5 rounded-full bg-pink-600 text-white font-black text-[10px] uppercase tracking-wider mb-1.5">
                                1 to 11 Oct • Female (₹1500) | Male (₹1400)
                              </div>
                              <div className="text-xs uppercase font-black text-pink-950 tracking-wide">
                                {slot.batchName}
                              </div>
                              <div className="text-xl sm:text-2xl font-serif font-black text-slate-900 flex items-center gap-2 mt-1.5">
                                <Clock className="w-5 h-5 text-pink-600" />
                                <span>{slot.startTime} – {slot.endTime}</span>
                              </div>
                              <p className="text-[11px] text-pink-800 font-bold mt-1">
                                Open for Both Female & Male Registrations
                              </p>
                            </div>

                            {/* Availability Status */}
                            <div className="mt-3 flex items-center justify-between text-xs pt-1">
                              <span className="text-slate-500 font-semibold text-[11px]">Availability Status</span>
                              <span className="font-bold text-xs text-emerald-700 flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-emerald-600" />
                                🟢 Registrations Open
                              </span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="mt-5 pt-3 border-t border-pink-200">
                            <button
                              onClick={() => onSelectSlot(slot)}
                              className="w-full py-3 px-4 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white shadow-lg shadow-pink-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer ring-2 ring-pink-300"
                            >
                              <Sparkles className="w-4 h-4 text-yellow-300" />
                              <span>Select & Book 1–11 Oct Batch</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* ⛔ 2. PAST REGISTRATION DATES & SLOTS (ALL HOUSEFULL) */}
            <div>
              <div className="flex items-center justify-between mb-4 border-t border-slate-200 pt-6">
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-black text-xs border border-red-200">
                    REGISTRATIONS CLOSED
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-black text-slate-700 uppercase tracking-wide">
                    Past Workshop Batches (All Slots Housefull)
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 opacity-75">
                {filteredSlots
                  .filter(
                    (s) =>
                      !s.id.startsWith('slot-oct-') &&
                      !s.batchName.toLowerCase().includes('special & final') &&
                      !s.batchName.toLowerCase().includes('1 to 11 oct')
                  )
                  .map((slot) => {
                    return (
                      <div
                        key={slot.id}
                        className="relative rounded-3xl p-5 border-2 border-slate-200 bg-slate-50 flex flex-col justify-between"
                      >
                        <div>
                          {/* Top Location and Status Badge */}
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div>
                              <div className="flex items-center gap-1.5 text-slate-600 text-xs font-black mb-0.5">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{slot.locationName}</span>
                              </div>
                              <p className="text-[11px] text-slate-500 font-semibold truncate max-w-[200px]">
                                {slot.locationAddress}
                              </p>
                            </div>

                            {/* Red Housefull Ribbon */}
                            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-red-600 text-white shadow-xs">
                              <XCircle className="w-3 h-3" /> HOUSEFULL
                            </span>
                          </div>

                          {/* Batch Name & Timing */}
                          <div className="rounded-2xl p-3.5 border border-slate-200 bg-white my-3">
                            <div className="text-xs uppercase font-black text-slate-700 tracking-wide">
                              {slot.batchName}
                            </div>
                            <div className="text-base sm:text-lg font-serif font-black text-slate-500 flex items-center gap-2 mt-1">
                              <Clock className="w-4 h-4 text-slate-400" />
                              <span>{slot.startTime} – {slot.endTime}</span>
                            </div>
                          </div>

                          {/* Batch Status */}
                          <div className="mt-2 flex items-center justify-between text-xs pt-1">
                            <span className="text-slate-400 font-semibold text-[11px]">Availability Status</span>
                            <span className="text-red-600 font-black text-xs">
                              ⛔ 100% Seats Booked
                            </span>
                          </div>
                        </div>

                        {/* Disabled Action Button */}
                        <div className="mt-4 pt-3 border-t border-slate-200">
                          <button
                            disabled
                            className="w-full py-2.5 px-4 rounded-2xl font-bold text-xs bg-slate-200 text-slate-500 border border-slate-300 cursor-not-allowed flex items-center justify-center gap-1.5"
                          >
                            <XCircle className="w-3.5 h-3.5 text-slate-400" />
                            <span>Batch Housefull (Sold Out)</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
