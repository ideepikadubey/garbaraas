'use client';

import React, { useState, useEffect } from 'react';
import { Clock, MapPin, CheckCircle2, AlertTriangle, XCircle, Sparkles, RefreshCw } from 'lucide-react';
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
    { id: 'TFN Studio', name: 'TFN Studio' },
    { id: 'Bang Marriage Hall', name: 'Bang Marriage Hall' },
    { id: 'Cricket Academy', name: 'Kishangarh Cricket Academy' },
  ];

  const filteredSlots = slots.filter((slot) => {
    if (selectedLocation === 'ALL') return true;
    return slot.locationName.includes(selectedLocation);
  });

  return (
    <section id="slots" className="relative py-10 md:py-16 bg-white border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-xs text-pink-700 uppercase tracking-widest font-black mb-2 shadow-xs">
            <Clock className="w-3.5 h-3.5 text-pink-500" />
            Live Workshop Batch Availability
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-tight">
            WORKSHOP <span className="festive-gradient-text">LOCATIONS & TIMINGS</span>
          </h2>
          <div className="h-[3.5px] w-24 sm:w-32 mx-auto my-3 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600"></div>
          <p className="text-xs sm:text-base text-slate-600 font-medium">
            Pick your preferred location and timing batch below. Seats are allocated on a verified first-come, first-served basis.
          </p>
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

        {/* Slots Grid */}
        {loading && slots.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-10 h-10 border-3 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm font-bold text-pink-700">Loading live workshop batches...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSlots.map((slot) => {
              const remaining = Math.max(0, slot.capacity - slot.bookedSeats);
              const isFull = slot.status === 'FULL' || remaining <= 0;
              const isFewLeft = !isFull && (slot.status === 'ALMOST_FULL' || remaining <= 5);
              const percentFilled = Math.min(100, Math.round((slot.bookedSeats / slot.capacity) * 100));

              // Location-based theme matching
              const isTFN = slot.locationName.includes('TFN');
              const isCricket = slot.locationName.includes('Cricket') || slot.locationName.includes('Turf');
              const isBoys = slot.batchName.includes('Boys');
              const isNightBang = slot.locationName.includes('Bang') && slot.startTime.includes('8:00');

              let themeCard = 'bg-white border-2 border-pink-200 hover:border-pink-400 shadow-sm hover:shadow-pink-500/15 hover:shadow-lg';
              let themeIconColor = 'text-pink-600';
              let themeBatchBg = 'bg-pink-50/70 border border-pink-200';
              let themeBatchText = 'text-pink-900';
              let themeProgressGradient = 'bg-gradient-to-r from-pink-500 to-rose-400';

              if (isBoys) {
                themeCard = 'bg-white border-2 border-blue-300 hover:border-blue-500 shadow-sm hover:shadow-blue-500/15 hover:shadow-lg';
                themeIconColor = 'text-blue-600';
                themeBatchBg = 'bg-blue-50/80 border border-blue-200';
                themeBatchText = 'text-blue-900';
                themeProgressGradient = 'bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400';
              } else if (isTFN) {
                themeCard = 'bg-white border-2 border-pink-300 hover:border-pink-500 shadow-sm hover:shadow-pink-500/15 hover:shadow-lg';
                themeIconColor = 'text-pink-600';
                themeBatchBg = 'bg-pink-50/70 border border-pink-200';
                themeBatchText = 'text-pink-900';
                themeProgressGradient = 'bg-gradient-to-r from-pink-600 via-rose-500 to-amber-400';
              } else if (isCricket) {
                themeCard = 'bg-white border-2 border-emerald-300 hover:border-emerald-500 shadow-sm hover:shadow-emerald-500/15 hover:shadow-lg';
                themeIconColor = 'text-emerald-600';
                themeBatchBg = 'bg-emerald-50/70 border border-emerald-200';
                themeBatchText = 'text-emerald-900';
                themeProgressGradient = 'bg-gradient-to-r from-emerald-600 to-teal-400';
              } else if (isNightBang) {
                themeCard = 'bg-white border-2 border-purple-300 hover:border-purple-500 shadow-sm hover:shadow-purple-500/15 hover:shadow-lg';
                themeIconColor = 'text-purple-600';
                themeBatchBg = 'bg-purple-50/70 border border-purple-200';
                themeBatchText = 'text-purple-900';
                themeProgressGradient = 'bg-gradient-to-r from-purple-600 to-pink-500';
              }

              return (
                <div
                  key={slot.id}
                  className={`relative rounded-3xl p-5 border-2 transition-all duration-200 flex flex-col justify-between ${
                    isFull
                      ? 'bg-slate-50 border-slate-200 opacity-75'
                      : themeCard
                  }`}
                >
                  <div>
                    {/* Top Location and Status Badge */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className={`flex items-center gap-1.5 ${themeIconColor} text-xs font-black mb-0.5`}>
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{slot.locationName}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-semibold truncate max-w-[200px]">
                          {slot.locationAddress}
                        </p>
                      </div>

                      {/* Status Tag */}
                      {isFull ? (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-red-100 text-red-700 border border-red-300">
                          <XCircle className="w-3 h-3" /> Full
                        </span>
                      ) : isFewLeft ? (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                          <AlertTriangle className="w-3 h-3" /> Few Left
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3" /> Available
                        </span>
                      )}
                    </div>

                    {/* Batch Name & Timing */}
                    <div className={`rounded-2xl p-3 border my-3 ${themeBatchBg}`}>
                      <div className={`text-xs uppercase font-black ${themeBatchText} tracking-wider`}>
                        {slot.batchName}
                      </div>
                      <div className="text-lg sm:text-xl font-serif font-black text-slate-900 flex items-center gap-2 mt-0.5">
                        <Clock className={`w-4 h-4 ${themeIconColor}`} />
                        <span>{slot.startTime} – {slot.endTime}</span>
                      </div>
                    </div>

                    {/* Batch Status */}
                    <div className="mt-3 flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-500 font-semibold text-[11px]">Batch Status</span>
                      <span className="font-bold text-xs">
                        {isFull ? (
                          <span className="text-red-600 font-extrabold">Housefull</span>
                        ) : isFewLeft ? (
                          <span className="text-amber-700 font-extrabold">Filling Fast</span>
                        ) : (
                          <span className="text-emerald-700 font-extrabold">Open for Registration</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => !isFull && onSelectSlot(slot)}
                      disabled={isFull}
                      className={`w-full py-2.5 px-4 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isFull
                          ? 'bg-slate-200 text-slate-500 border border-slate-300 cursor-not-allowed'
                          : 'bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95'
                      }`}
                    >
                      {isFull ? (
                        <span>Slot Completely Full</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-yellow-300" />
                          <span>Select & Book This Batch</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
