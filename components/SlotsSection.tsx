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
    { id: 'Cricket Academy (Turf, Kishangarh)', name: 'Cricket Academy (Turf)' },
  ];

  const filteredSlots = slots.filter((slot) => {
    if (selectedLocation === 'ALL') return true;
    return slot.locationName.includes(selectedLocation);
  });

  return (
    <section id="slots" className="relative py-10 md:py-16 bg-white border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs text-amber-900 uppercase tracking-widest font-bold mb-2 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Live Real-Time Seat Availability
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-maroon-950 tracking-tight">
            WORKSHOP <span className="garba-gradient-text">LOCATIONS & TIMINGS</span>
          </h2>
          <div className="h-[3px] w-24 sm:w-32 mx-auto my-3 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
          <p className="text-xs sm:text-base text-stone-700 font-medium">
            Pick your preferred location and timing batch below. Seats are allocated on a verified first-come, first-served basis.
          </p>
        </div>

        {/* Location Filter Tabs & Refresh with Garba Color Badges */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="flex flex-nowrap overflow-x-auto gap-2 pb-2 sm:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {locations.map((loc) => {
              const isSelected = selectedLocation === loc.id;
              const activeClass = 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 shadow-md font-black ring-1 ring-amber-300';

              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc.id)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                    isSelected
                      ? activeClass
                      : 'bg-white border-2 border-stone-200 text-stone-800 hover:border-amber-400 shadow-sm'
                  }`}
                >
                  {loc.name}
                </button>
              );
            })}
          </div>

          <button
            onClick={fetchSlots}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border-2 border-amber-200 text-xs font-bold text-amber-900 hover:bg-amber-50 transition shadow-sm cursor-pointer self-end sm:self-auto"
            title="Refresh availability"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Seats</span>
          </button>
        </div>

        {/* Slots Grid */}
        {loading && slots.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm font-bold text-amber-800">Loading live workshop batches...</p>
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
              const isCricket = slot.locationName.includes('Cricket');
              const isNightBang = slot.locationName.includes('Bang') && slot.startTime.includes('8:00');

              let themeCard = 'bg-white border-2 border-amber-300 hover:border-amber-500 shadow-sm hover:shadow-md';
              let themeIconColor = 'text-amber-600';
              let themeBatchBg = 'bg-amber-50/70 border border-amber-200';
              let themeBatchText = 'text-amber-900';
              let themeProgressGradient = 'bg-gradient-to-r from-amber-500 to-yellow-400';

              if (isTFN) {
                themeCard = 'bg-white border-2 border-yellow-300 hover:border-yellow-500 shadow-sm hover:shadow-md';
                themeIconColor = 'text-amber-600';
                themeBatchBg = 'bg-yellow-50/70 border border-yellow-200';
                themeBatchText = 'text-amber-950';
                themeProgressGradient = 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600';
              } else if (isCricket) {
                themeCard = 'bg-white border-2 border-emerald-300 hover:border-emerald-500 shadow-sm hover:shadow-md';
                themeIconColor = 'text-emerald-600';
                themeBatchBg = 'bg-emerald-50/70 border border-emerald-200';
                themeBatchText = 'text-emerald-800';
                themeProgressGradient = 'bg-gradient-to-r from-emerald-600 to-teal-500';
              } else if (isNightBang) {
                themeCard = 'bg-white border-2 border-garba-purple-300 hover:border-garba-purple-500 shadow-sm hover:shadow-md';
                themeIconColor = 'text-garba-purple-600';
                themeBatchBg = 'bg-garba-purple-50/70 border border-garba-purple-200';
                themeBatchText = 'text-garba-purple-800';
                themeProgressGradient = 'bg-gradient-to-r from-garba-purple-600 to-amber-500';
              }

              return (
                <div
                  key={slot.id}
                  className={`relative rounded-2xl p-5 border-2 transition-all duration-200 flex flex-col justify-between ${
                    isFull
                      ? 'bg-stone-50 border-stone-300 opacity-75'
                      : themeCard
                  }`}
                >
                  <div>
                    {/* Top Location and Status Badge */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className={`flex items-center gap-1.5 ${themeIconColor} text-xs font-bold mb-0.5`}>
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{slot.locationName}</span>
                        </div>
                        <p className="text-[11px] text-stone-600 font-medium truncate max-w-[200px]">
                          {slot.locationAddress}
                        </p>
                      </div>

                      {/* Status Tag */}
                      {isFull ? (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-700 border border-red-300">
                          <XCircle className="w-3 h-3" /> Full
                        </span>
                      ) : isFewLeft ? (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                          <AlertTriangle className="w-3 h-3" /> Few Left
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3" /> Available
                        </span>
                      )}
                    </div>

                    {/* Batch Name & Timing */}
                    <div className={`rounded-xl p-3 border my-3 ${themeBatchBg}`}>
                      <div className={`text-xs uppercase font-extrabold ${themeBatchText} tracking-wider`}>
                        {slot.batchName}
                      </div>
                      <div className="text-lg sm:text-xl font-serif font-bold text-stone-950 flex items-center gap-2 mt-0.5">
                        <Clock className={`w-4 h-4 ${themeIconColor}`} />
                        <span>{slot.startTime} – {slot.endTime}</span>
                      </div>
                    </div>

                    {/* Capacity Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-stone-900 font-medium">
                          {isFull ? (
                            <span className="text-red-600 font-bold">Housefull</span>
                          ) : (
                            <span className="text-amber-800 font-bold">{remaining} seats left</span>
                          )}
                        </span>
                        <span className="text-stone-500 text-[11px] font-semibold">
                          {slot.bookedSeats} / {slot.capacity} Booked
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-stone-200 overflow-hidden border border-stone-300">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isFull
                              ? 'bg-red-500'
                              : isFewLeft
                              ? 'bg-amber-500'
                              : themeProgressGradient
                          }`}
                          style={{ width: `${percentFilled}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-5 pt-3 border-t border-stone-200">
                    <button
                      onClick={() => !isFull && onSelectSlot(slot)}
                      disabled={isFull}
                      className={`w-full py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isFull
                          ? 'bg-stone-200 text-stone-500 border border-stone-300 cursor-not-allowed'
                          : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 shadow-md ring-1 ring-amber-300 hover:scale-[1.02]'
                      }`}
                    >
                      {isFull ? (
                        <span>Slot Completely Full</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-stone-950" />
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
