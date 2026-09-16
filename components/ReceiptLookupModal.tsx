'use client';

import React, { useState } from 'react';
import { X, Search, Download, AlertCircle } from 'lucide-react';
import { Registration } from '@/lib/types';
import { downloadRegistrationReceipt } from '@/lib/receipt-generator';

interface ReceiptLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReceiptLookupModal({ isOpen, onClose }: ReceiptLookupModalProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<Registration[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    setLoading(true);
    setError('');
    setResults([]);
    setHasSearched(true);

    try {
      // If it looks like a registration ID
      if (q.toUpperCase().startsWith('TFN')) {
        const res = await fetch(`/api/registrations/${q.toUpperCase()}`);
        const data = await res.json();
        if (data.success && data.registration) {
          setResults([data.registration]);
        } else {
          setError('No registration found with this ID. Please double-check your ID.');
        }
      } else {
        // Search by phone or name
        const res = await fetch(`/api/registrations?search=${encodeURIComponent(q)}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.registrations) && data.registrations.length > 0) {
          setResults(data.registrations);
        } else {
          setError('No registration found with this mobile number or name.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Error searching for registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border-2 border-pink-200 rounded-3xl p-4 sm:p-8 shadow-2xl my-auto overflow-hidden">
        {/* Top Multi-color Ribbon */}
        <div className="w-full h-1 bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600 absolute top-0 left-0 right-0"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-950 hover:bg-slate-100 rounded-full transition cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6 pt-2">
          <div className="w-12 h-12 rounded-full bg-pink-50 border-2 border-pink-200 flex items-center justify-center mx-auto mb-2 text-pink-600 shadow-sm">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black festive-gradient-text">
            Find Registration & Download Receipt
          </h3>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Enter your 10-digit mobile number or Registration ID (e.g. TFN-2026-XXXX)
          </p>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 9829012345 or TFN-2026-1001"
              className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-pink-500 font-medium"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-yellow-400 text-slate-950 font-black text-sm rounded-xl hover:brightness-110 transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>Search</span>
            </button>
          </div>
        </form>

        {/* Error State */}
        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Results List */}
        <div className="mt-6 max-h-[50vh] overflow-y-auto space-y-4">
          {results.map((reg) => {
            const isPaid = reg.paymentStatus === 'PAYMENT_VERIFIED';
            return (
              <div
                key={reg.id}
                className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-pink-300 transition shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3 pb-3 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-heading font-black text-pink-600">
                        {reg.id}
                      </span>
                      <span
                        className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                          isPaid
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-yellow-100 text-yellow-900 border border-yellow-300'
                        }`}
                      >
                        {isPaid ? 'PAID & CONFIRMED' : 'PAYMENT SUBMITTED'}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mt-1">
                      {reg.participantName}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium">{reg.categoryLabel}</p>
                  </div>

                  <button
                    onClick={() => downloadRegistrationReceipt(reg)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-yellow-400 text-slate-950 font-black text-xs hover:brightness-110 transition shadow-sm cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-500 text-[11px] font-semibold block">Location:</span>
                    <strong className="text-slate-900">{reg.locationName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] font-semibold block">Batch Timing:</span>
                    <strong className="text-slate-900">{reg.batchTime}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] font-semibold block">Amount Paid:</span>
                    <strong className="text-pink-600 font-extrabold text-sm">₹{reg.totalAmount}</strong>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600 font-medium">
                  <span>Registered on: {new Date(reg.createdAt).toLocaleDateString('en-IN')}</span>
                  <span className="text-pink-600 font-bold">★ Free Family Pass Included</span>
                </div>
              </div>
            );
          })}

          {hasSearched && !loading && results.length === 0 && !error && (
            <div className="text-center py-8 text-slate-500 text-xs font-medium">
              No matching bookings found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
