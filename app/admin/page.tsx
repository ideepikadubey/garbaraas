'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Download,
  Filter,
  LogOut,
  RefreshCw,
  Plus,
  Edit2,
  Trash2,
  QrCode,
  Settings,
  Calendar,
  Eye,
  FileText,
  Lock,
  Sparkles,
  MapPin,
  Check,
  X,
  TrendingUp,
} from 'lucide-react';
import { Slot, Registration, AdminSettings, PaymentStatus, BookingStatus } from '@/lib/types';
import { downloadRegistrationReceipt } from '@/lib/receipt-generator';

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Admin Tab: 'registrations' | 'slots' | 'settings'
  const [activeTab, setActiveTab] = useState<'registrations' | 'slots' | 'settings'>('registrations');

  // Metrics State
  const [metrics, setMetrics] = useState<any>(null);

  // Registrations Table State
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loadingRegs, setLoadingRegs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [locationFilter, setLocationFilter] = useState('ALL');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('ALL');

  // Slots State
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [editingSlot, setEditingSlot] = useState<Slot | null>(null);
  const [newSlotModalOpen, setNewSlotModalOpen] = useState(false);

  // Settings State
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState('');

  // Screenshot / View Modal
  const [viewingRegistration, setViewingRegistration] = useState<Registration | null>(null);

  // Check saved session on mount
  useEffect(() => {
    const saved = localStorage.getItem('tfn_admin_logged_in');
    if (saved === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch Dashboard Data
  const loadDashboardData = async () => {
    try {
      setLoadingRegs(true);
      setLoadingSlots(true);

      const [metricsRes, regsRes, slotsRes, settingsRes] = await Promise.all([
        fetch('/api/admin/metrics', { cache: 'no-store' }),
        fetch('/api/registrations', { cache: 'no-store' }),
        fetch('/api/slots', { cache: 'no-store' }),
        fetch('/api/admin/settings', { cache: 'no-store' }),
      ]);

      const metricsData = await metricsRes.json();
      if (metricsData.success) setMetrics(metricsData.metrics);

      const regsData = await regsRes.json();
      if (regsData.success) setRegistrations(regsData.registrations);

      const slotsData = await slotsRes.json();
      if (slotsData.success) setSlots(slotsData.slots);

      const settingsData = await settingsRes.json();
      if (settingsData.success) setSettings(settingsData.settings);
    } catch (e) {
      console.error('Error fetching admin data:', e);
    } finally {
      setLoadingRegs(false);
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('tfn_admin_logged_in', 'true');
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login network error');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('tfn_admin_logged_in');
  };

  // Status Action (Verify / Cancel)
  const handleStatusUpdate = async (
    regId: string,
    paymentStatus: PaymentStatus,
    bookingStatus: BookingStatus
  ) => {
    try {
      const res = await fetch(`/api/registrations/${regId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'UPDATE_STATUS',
          paymentStatus,
          bookingStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setRegistrations((prev) =>
          prev.map((r) => (r.id === regId ? data.registration : r))
        );
        loadDashboardData();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  // Slot update
  const handleSaveSlot = async (slot: Slot) => {
    try {
      const res = await fetch('/api/slots', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slot),
      });
      const data = await res.json();
      if (data.success) {
        setSlots((prev) => prev.map((s) => (s.id === slot.id ? data.slot : s)));
        setEditingSlot(null);
        loadDashboardData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Add new slot
  const handleAddSlot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSlot = {
      locationId: (formData.get('locationId') as string) || 'loc-custom',
      locationName: formData.get('locationName') as string,
      locationAddress: formData.get('locationAddress') as string,
      batchName: formData.get('batchName') as string,
      startTime: formData.get('startTime') as string,
      endTime: formData.get('endTime') as string,
      capacity: parseInt(formData.get('capacity') as string, 10) || 40,
      isActive: true,
    };

    try {
      const res = await fetch('/api/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSlot),
      });
      const data = await res.json();
      if (data.success) {
        setSlots((prev) => [...prev, data.slot]);
        setNewSlotModalOpen(false);
        loadDashboardData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSavingSettings(true);
    setSettingsMessage('');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        setSettingsMessage('Settings saved successfully!');
        setTimeout(() => setSettingsMessage(''), 3000);
      }
    } catch (err: any) {
      setSettingsMessage('Failed to save settings: ' + err.message);
    } finally {
      setSavingSettings(false);
    }
  };

  // Filtered registrations
  const filteredRegistrations = registrations.filter((r) => {
    if (categoryFilter !== 'ALL' && r.category !== categoryFilter) return false;
    if (locationFilter !== 'ALL' && !r.locationName.includes(locationFilter)) return false;
    if (paymentStatusFilter !== 'ALL' && r.paymentStatus !== paymentStatusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.id.toLowerCase().includes(q) ||
        r.participantName.toLowerCase().includes(q) ||
        r.mobile.includes(q) ||
        (r.utrNumber && r.utrNumber.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // ================= LOGIN SCREEN (Light Theme) =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border-2 border-pink-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          <div className="w-full h-1 bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600 absolute top-0 left-0 right-0"></div>

          <div className="text-center mb-6 pt-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-amber-500 flex items-center justify-center mx-auto mb-3 shadow-md text-white">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-heading font-black text-slate-900">
              TFN Organizer Portal
            </h2>
            <p className="text-xs text-pink-600 font-semibold mt-1">
              The Frozen Night – Event and Entertainment • Kishangarh
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-700 font-bold mb-1">
                Admin Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-pink-500 font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-slate-700 font-bold mb-1">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-pink-500 font-medium"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-black text-sm shadow-md hover:brightness-110 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {loginLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Lock className="w-4 h-4" />
              )}
              <span>Login to Dashboard</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-pink-600 hover:text-pink-800 font-bold">
              ← Return to Workshop Website
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // ================= MAIN DASHBOARD (Light Theme) =================
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      
      {/* Top Admin Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <img src="/images/TFN.png" alt="TFN Logo" className="w-9 h-9 object-contain flex-shrink-0" />
          <div>
            <h1 className="text-base sm:text-lg font-serif font-bold text-stone-950 leading-tight">
              TFN Garba Workshop Admin
            </h1>
            <p className="text-[11px] text-amber-800 font-semibold">
              Kishangarh, Rajasthan • Live Database Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={loadDashboardData}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700 transition cursor-pointer"
            title="Refresh All Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <a
            href="/api/admin/export"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 ring-1 ring-amber-300 font-bold text-xs hover:brightness-105 transition shadow-2xs cursor-pointer"
            download
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </a>

          <Link
            href="/"
            target="_blank"
            className="text-xs text-stone-700 hover:text-amber-800 font-bold px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-300"
          >
            View Live Site ↗
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-stone-600 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* ================= 6 STATS CARDS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          
          {/* Total Registrations */}
          <div className="bg-white border-2 border-stone-200 hover:border-amber-300 rounded-2xl p-4 shadow-2xs transition">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">
              Total Registrations
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-black text-stone-950 mt-1">
              {metrics ? metrics.totalRegistrations : '...'}
            </div>
            <div className="text-[11px] text-amber-800 font-semibold mt-0.5">All categories</div>
          </div>

          {/* Paid Registrations */}
          <div className="bg-white border-2 border-emerald-200 hover:border-emerald-400 rounded-2xl p-4 shadow-2xs transition">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700">
              Paid & Verified
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-black text-emerald-700 mt-1">
              {metrics ? metrics.paidCount : '...'}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Confirmed passes</div>
          </div>

          {/* Pending Payments */}
          <div className="bg-white border-2 border-amber-200 hover:border-amber-400 rounded-2xl p-4 shadow-2xs transition">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700">
              Pending Payments
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-black text-amber-700 mt-1">
              {metrics ? metrics.pendingCount : '...'}
            </div>
            <div className="text-[11px] text-amber-600 font-semibold mt-0.5">Needs Verification</div>
          </div>

          {/* Today's Bookings */}
          <div className="bg-white border-2 border-amber-200 hover:border-amber-400 rounded-2xl p-4 shadow-2xs transition">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800">
              Today's Bookings
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-black text-amber-800 mt-1">
              {metrics ? metrics.todayBookings : '...'}
            </div>
            <div className="text-[11px] text-stone-500 font-semibold mt-0.5">Past 24 hours</div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white border-2 border-amber-300 hover:border-amber-500 rounded-2xl p-4 shadow-2xs transition bg-gradient-to-br from-white to-amber-50/50">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-900">
              Total Revenue
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-black text-amber-800 mt-1">
              ₹{metrics ? metrics.totalRevenue : '0'}
            </div>
            <div className="text-[10px] text-stone-500 font-medium mt-0.5">
              Pending: ₹{metrics ? metrics.pendingRevenue : '0'}
            </div>
          </div>

          {/* Available Seats */}
          <div className="bg-white border-2 border-stone-200 hover:border-stone-400 rounded-2xl p-4 shadow-2xs transition">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">
              Available Seats
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-black text-stone-950 mt-1">
              {metrics ? metrics.totalAvailableSeats : '...'}
            </div>
            <div className="text-[11px] text-emerald-700 font-bold mt-0.5">
              Booked: {metrics ? metrics.totalBookedSeats : '0'} seats
            </div>
          </div>

        </div>

        {/* ================= TAB NAVIGATION ================= */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
          <button
            onClick={() => setActiveTab('registrations')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'registrations'
                ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 shadow-md ring-1 ring-amber-300'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Registrations ({registrations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('slots')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'slots'
                ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 shadow-md ring-1 ring-amber-300'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Workshop Slots & Capacity ({slots.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 shadow-md ring-1 ring-amber-300'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Payment & UPI Settings</span>
          </button>
        </div>

        {/* ================= TAB 1: REGISTRATIONS MANAGEMENT ================= */}
        {activeTab === 'registrations' && (
          <div className="space-y-4">
            
            {/* Search & Filter Controls */}
            <div className="bg-white p-4 rounded-2xl border-2 border-stone-200 shadow-2xs flex flex-wrap gap-3 items-center justify-between">
              
              <div className="flex-1 min-w-[240px] relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Name, Mobile, ID (TFN-XXXX), or UTR..."
                  className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-950 placeholder-stone-400 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-stone-50 border-2 border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-500 font-semibold"
                >
                  <option value="ALL">All Categories</option>
                  <option value="FEMALE">Female (₹2500)</option>
                  <option value="FEMALE_15DAY">Special Girls 15-Day (₹1800)</option>
                  <option value="OLD_STUDENT">Old TFN Student (₹2200)</option>
                  <option value="GROUP">Group 5+ (₹2200)</option>
                  <option value="KIDS">Kids Girls 1-Month (₹2000)</option>
                  <option value="KIDS_15DAY">Kids Girls 15-Day (₹1500)</option>
                  <option value="BOYS_DANDIYA">Boys Dandiya (₹1600)</option>
                </select>

                {/* Location Filter */}
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="bg-stone-50 border-2 border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-500 font-semibold"
                >
                  <option value="ALL">All Locations</option>
                  <option value="TFN Studio">TFN Studio</option>
                  <option value="Bang Marriage Hall">Bang Marriage Hall</option>
                  <option value="Cricket Academy">Kishangarh Cricket Academy</option>
                </select>

                {/* Payment Status Filter */}
                <select
                  value={paymentStatusFilter}
                  onChange={(e) => setPaymentStatusFilter(e.target.value)}
                  className="bg-stone-50 border-2 border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-500 font-semibold"
                >
                  <option value="ALL">All Payment Statuses</option>
                  <option value="PAYMENT_VERIFIED">Verified (Paid)</option>
                  <option value="PAYMENT_SUBMITTED">Submitted (Pending)</option>
                  <option value="PAYMENT_PENDING">Pending Payment</option>
                  <option value="PAYMENT_REFUNDED">Refunded</option>
                </select>

                <a
                  href="/api/admin/export"
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 ring-1 ring-amber-300 font-bold flex items-center gap-1 hover:brightness-105 transition shadow-2xs"
                  download
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </a>
              </div>
            </div>

            {/* Registrations Table */}
            <div className="bg-white rounded-2xl border-2 border-stone-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 text-stone-700 uppercase tracking-wider text-[10px] border-b border-stone-200 font-bold">
                    <tr>
                      <th className="p-3.5">ID / Date</th>
                      <th className="p-3.5">Participant</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Location & Batch</th>
                      <th className="p-3.5">Amount / UTR</th>
                      <th className="p-3.5">Payment Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {filteredRegistrations.map((reg) => {
                      const isPaid = reg.paymentStatus === 'PAYMENT_VERIFIED';
                      const isSubmitted = reg.paymentStatus === 'PAYMENT_SUBMITTED';

                      return (
                        <tr key={reg.id} className="hover:bg-amber-50/40 transition">
                          {/* ID & Date */}
                          <td className="p-3.5">
                            <span className="font-mono font-bold text-amber-800 block">
                              {reg.id}
                            </span>
                            <span className="text-[10px] text-stone-500">
                              {new Date(reg.createdAt).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                              })}
                            </span>
                          </td>

                          {/* Participant */}
                          <td className="p-3.5">
                            <div className="font-bold text-stone-950">{reg.participantName}</div>
                            <div className="text-[11px] text-stone-600 font-mono">
                              +91 {reg.mobile}
                            </div>
                            {reg.fatherOrHusbandName && (
                              <div className="text-[10px] text-amber-800 font-semibold">
                                S/O, W/O: {reg.fatherOrHusbandName}
                              </div>
                            )}
                            {reg.isKids && reg.guardianName && (
                              <div className="text-[10px] text-amber-800 font-semibold">
                                Guardian: {reg.guardianName}
                              </div>
                            )}
                          </td>

                          {/* Category */}
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-800 font-semibold block w-max">
                              {reg.category}
                            </span>
                            {reg.isGroup && (
                              <span className="text-[10px] text-amber-800 font-bold">
                                {reg.membersCount} members
                              </span>
                            )}
                          </td>

                          {/* Location & Batch */}
                          <td className="p-3.5">
                            <div className="font-bold text-stone-900">{reg.locationName}</div>
                            <div className="text-[11px] text-amber-900 font-semibold">
                              {reg.batchTime}
                            </div>
                          </td>

                          {/* Amount / UTR */}
                          <td className="p-3.5">
                            <div className="font-black text-stone-950 text-sm">₹{reg.totalAmount}</div>
                            <div className="text-[10px] text-stone-500 font-mono truncate max-w-[130px]">
                              {reg.utrNumber ? `UTR: ${reg.utrNumber}` : 'No UTR yet'}
                            </div>
                          </td>

                          {/* Payment Status */}
                          <td className="p-3.5">
                            {isPaid ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                              </span>
                            ) : isSubmitted ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                                <Clock className="w-3 h-3 text-amber-600" /> Submitted
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                                <XCircle className="w-3 h-3 text-red-600" /> Unpaid
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                            {/* Verify Button */}
                            {!isPaid && (
                              <button
                                onClick={() =>
                                  handleStatusUpdate(reg.id, 'PAYMENT_VERIFIED', 'CONFIRMED')
                                }
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-500 transition cursor-pointer shadow-2xs"
                                title="Mark Payment Verified & Confirm"
                              >
                                Verify
                              </button>
                            )}

                            {/* View Screenshot / Details */}
                            <button
                              onClick={() => setViewingRegistration(reg)}
                              className="p-1.5 rounded-lg bg-stone-100 border border-stone-300 text-stone-700 hover:text-amber-800 transition cursor-pointer"
                              title="View Registration Pass Details & UTR"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {/* Download PDF Receipt */}
                            <button
                              onClick={() => downloadRegistrationReceipt(reg)}
                              className="p-1.5 rounded-lg bg-stone-100 border border-stone-300 text-stone-700 hover:text-amber-800 transition cursor-pointer"
                              title="Download PDF Receipt"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>

                            {/* Cancel Booking (Restores seat) */}
                            {reg.bookingStatus !== 'CANCELLED' && (
                              <button
                                onClick={() =>
                                  handleStatusUpdate(reg.id, 'PAYMENT_FAILED', 'CANCELLED')
                                }
                                className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                                title="Cancel Registration & Free Up Seat"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}

                    {filteredRegistrations.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-stone-500 text-xs">
                          No registrations found matching the selected filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: SLOTS & CAPACITY MANAGEMENT (Light Theme) ================= */}
        {activeTab === 'slots' && (
          <div className="space-y-4">
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-serif font-bold text-stone-950">
                  Workshop Locations & Batches Capacity
                </h3>
                <p className="text-xs text-stone-600 font-medium">
                  Real-time live seat tracking synced with active registrations.
                </p>
              </div>

              <button
                onClick={() => setNewSlotModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 font-bold text-xs ring-1 ring-amber-300 hover:brightness-105 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Batch</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots.map((slot) => {
                const remaining = Math.max(0, slot.capacity - slot.bookedSeats);
                const isFull = slot.status === 'FULL' || remaining <= 0;
                const percentBooked = Math.min(100, Math.round((slot.bookedSeats / slot.capacity) * 100));

                return (
                  <div
                    key={slot.id}
                    className="p-5 rounded-2xl bg-white border-2 border-stone-200 hover:border-amber-300 flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-md transition"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-stone-950 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" />
                          <span>{slot.locationName}</span>
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            isFull
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : remaining <= 5 && slot.bookedSeats > 0
                              ? 'bg-amber-50 text-amber-800 border border-amber-300'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          }`}
                        >
                          {slot.status}
                        </span>
                      </div>

                      <div className="text-base font-serif font-bold text-amber-800 flex items-center gap-1 my-1">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span>{slot.batchName}: {slot.startTime} – {slot.endTime}</span>
                      </div>

                      {/* Live Seat Stats & Visual Progress Bar */}
                      <div className="mt-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-2">
                        <div className="flex justify-between text-stone-700 font-semibold">
                          <span>Max Capacity:</span>
                          <strong className="text-stone-950">{slot.capacity} seats</strong>
                        </div>
                        <div className="flex justify-between text-stone-700 font-semibold">
                          <span>Booked Seats:</span>
                          <strong className="text-amber-800 font-bold">{slot.bookedSeats} seats</strong>
                        </div>
                        <div className="flex justify-between text-stone-700 font-semibold">
                          <span>Remaining Seats:</span>
                          <strong className={remaining <= 5 && remaining > 0 ? 'text-amber-700 font-bold' : remaining === 0 ? 'text-red-600 font-bold' : 'text-emerald-700 font-bold'}>
                            {remaining} seats
                          </strong>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-stone-200 rounded-full h-2 mt-1.5 overflow-hidden">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              isFull
                                ? 'bg-red-500'
                                : remaining <= 5
                                ? 'bg-amber-500'
                                : 'bg-gradient-to-r from-amber-500 to-yellow-400'
                            }`}
                            style={{ width: `${percentBooked}%` }}
                          ></div>
                        </div>
                        <div className="text-[10px] text-stone-500 text-right font-semibold">
                          {percentBooked}% Filled
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs">
                      <button
                        onClick={() => setEditingSlot(slot)}
                        className="text-amber-800 hover:text-amber-950 flex items-center gap-1 font-bold cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Capacity</span>
                      </button>

                      <button
                        onClick={() =>
                          handleSaveSlot({
                            ...slot,
                            status: slot.status === 'FULL' ? 'AVAILABLE' : 'FULL',
                          })
                        }
                        className="px-3 py-1 rounded-xl bg-stone-100 border border-stone-300 text-stone-800 text-[11px] font-bold hover:bg-stone-200 transition cursor-pointer"
                      >
                        {slot.status === 'FULL' ? 'Mark Available' : 'Mark Full'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ================= TAB 3: SETTINGS (Light Theme) ================= */}
        {activeTab === 'settings' && settings && (
          <div className="max-w-2xl bg-white p-6 rounded-3xl border-2 border-stone-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-950">
                Event Pricing & Payment Settings
              </h3>
              <p className="text-xs text-stone-600 font-medium">
                Update UPI payment receiver, customer support helplines, and workshop ticket rates.
              </p>
            </div>

            {settingsMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold">
                {settingsMessage}
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    UPI ID (for QR payment generation)
                  </label>
                  <input
                    type="text"
                    value={settings.upiId}
                    onChange={(e) => setSettings({ ...settings, upiId: e.target.value })}
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-950 font-mono text-xs focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    Merchant / Receiver Name
                  </label>
                  <input
                    type="text"
                    value={settings.merchantName}
                    onChange={(e) => setSettings({ ...settings, merchantName: e.target.value })}
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-950 text-xs focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    Helpline / WhatsApp (Neel Sir)
                  </label>
                  <input
                    type="text"
                    value={settings.supportPhone1}
                    onChange={(e) => setSettings({ ...settings, supportPhone1: e.target.value })}
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-950 font-mono text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    Helpline Number 2 (Neel Sir)
                  </label>
                  <input
                    type="text"
                    value={settings.supportPhone2}
                    onChange={(e) => setSettings({ ...settings, supportPhone2: e.target.value })}
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-950 font-mono text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    Female Admission Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={settings.priceFemale}
                    onChange={(e) =>
                      setSettings({ ...settings, priceFemale: parseInt(e.target.value, 10) || 0 })
                    }
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-950 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    Old TFN / Group Fee per Person (₹)
                  </label>
                  <input
                    type="number"
                    value={settings.priceOldStudentGroup}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        priceOldStudentGroup: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-950 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    Kids Girls Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={settings.priceKids}
                    onChange={(e) =>
                      setSettings({ ...settings, priceKids: parseInt(e.target.value, 10) || 0 })
                    }
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-950 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    Kids 15-Day Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={settings.priceKids15Day ?? 1500}
                    onChange={(e) =>
                      setSettings({ ...settings, priceKids15Day: parseInt(e.target.value, 10) || 0 })
                    }
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-950 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    Workshop Duration Label
                  </label>
                  <input
                    type="text"
                    value={settings.workshopDates}
                    onChange={(e) => setSettings({ ...settings, workshopDates: e.target.value })}
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-950 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 font-black text-xs sm:text-sm ring-1 ring-amber-300 hover:brightness-105 transition shadow-md flex items-center gap-2 cursor-pointer"
                >
                  {savingSettings ? (
                    <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Settings className="w-4 h-4" />
                  )}
                  <span>Save Configuration</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      {/* ================= EDIT CAPACITY MODAL (Light Theme) ================= */}
      {editingSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl relative">
            <h4 className="text-base font-serif font-bold text-stone-950">
              Edit Batch Capacity
            </h4>
            <p className="text-xs text-stone-600 font-medium">
              {editingSlot.locationName} ({editingSlot.batchName})
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Max Capacity (Seats)</label>
                <input
                  type="number"
                  value={editingSlot.capacity}
                  onChange={(e) =>
                    setEditingSlot({
                      ...editingSlot,
                      capacity: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl p-2.5 text-stone-950 text-xs focus:outline-none focus:border-amber-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Status</label>
                <select
                  value={editingSlot.status}
                  onChange={(e) =>
                    setEditingSlot({
                      ...editingSlot,
                      status: e.target.value as any,
                    })
                  }
                  className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl p-2.5 text-stone-950 text-xs focus:outline-none focus:border-amber-500 font-semibold"
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="ALMOST_FULL">Almost Full</option>
                  <option value="FULL">Full</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingSlot(null)}
                className="px-4 py-2 rounded-xl text-xs text-stone-600 hover:bg-stone-100 font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveSlot(editingSlot)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 font-black text-xs ring-1 ring-amber-300 hover:brightness-105 transition shadow-sm cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD NEW SLOT MODAL (Light Theme) ================= */}
      {newSlotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form
            onSubmit={handleAddSlot}
            className="bg-white border-2 border-amber-300 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl text-xs"
          >
            <h4 className="text-base font-serif font-bold text-stone-950">
              Add New Workshop Batch
            </h4>

            <div className="space-y-3">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Location Name</label>
                <input
                  name="locationName"
                  placeholder="e.g. Bang Marriage Hall"
                  className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl p-2.5 text-stone-950 text-xs focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Address</label>
                <input
                  name="locationAddress"
                  placeholder="e.g. Near City Station, Kishangarh"
                  className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl p-2.5 text-stone-950 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Batch Name</label>
                  <input
                    name="batchName"
                    placeholder="Batch 6"
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl p-2.5 text-stone-950 text-xs focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Start Time</label>
                  <input
                    name="startTime"
                    placeholder="05:00 PM"
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl p-2.5 text-stone-950 text-xs focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-bold mb-1">End Time</label>
                  <input
                    name="endTime"
                    placeholder="06:00 PM"
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl p-2.5 text-stone-950 text-xs focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Maximum Capacity</label>
                <input
                  name="capacity"
                  type="number"
                  defaultValue={50}
                  className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl p-2.5 text-stone-950 text-xs focus:outline-none focus:border-amber-500 font-bold"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setNewSlotModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-stone-600 hover:bg-stone-100 font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 font-black text-xs ring-1 ring-amber-300 hover:brightness-105 transition shadow-sm cursor-pointer"
              >
                Create Batch
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= VIEW REGISTRATION & SCREENSHOT MODAL (Light Theme) ================= */}
      {viewingRegistration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-start pb-3 border-b border-stone-200">
              <div>
                <span className="text-xs font-mono font-bold text-amber-800">
                  {viewingRegistration.id}
                </span>
                <h4 className="text-lg font-bold text-stone-950">
                  {viewingRegistration.participantName}
                </h4>
              </div>
              <button
                onClick={() => setViewingRegistration(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div>
                <span className="text-stone-500 block text-[11px] font-semibold">Mobile:</span>
                <strong className="text-stone-950 font-mono">+91 {viewingRegistration.mobile}</strong>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px] font-semibold">Category:</span>
                <strong className="text-stone-950">{viewingRegistration.categoryLabel}</strong>
              </div>
              {viewingRegistration.fatherOrHusbandName && (
                <div className="col-span-2">
                  <span className="text-stone-500 block text-[11px] font-semibold">Father's / Husband's Name:</span>
                  <strong className="text-amber-900 font-bold">{viewingRegistration.fatherOrHusbandName}</strong>
                </div>
              )}
              {viewingRegistration.isKids && viewingRegistration.guardianName && (
                <div className="col-span-2">
                  <span className="text-stone-500 block text-[11px] font-semibold">Parent / Guardian:</span>
                  <strong className="text-stone-950">{viewingRegistration.guardianName} ({viewingRegistration.guardianPhone})</strong>
                </div>
              )}
              <div>
                <span className="text-stone-500 block text-[11px] font-semibold">Location:</span>
                <strong className="text-stone-950">{viewingRegistration.locationName}</strong>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px] font-semibold">Timing:</span>
                <strong className="text-amber-800 font-bold">{viewingRegistration.batchTime}</strong>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px] font-semibold">Amount:</span>
                <strong className="text-stone-950 font-bold">₹{viewingRegistration.totalAmount}</strong>
              </div>
              <div>
                <span className="text-stone-500 block text-[11px] font-semibold">UTR / Txn Ref:</span>
                <strong className="text-amber-800 font-mono font-bold">
                  {viewingRegistration.utrNumber || 'None'}
                </strong>
              </div>
            </div>

            {/* Group Members Breakdown if Group Registration */}
            {viewingRegistration.groupMembers && viewingRegistration.groupMembers.length > 0 && (
              <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-300 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                    Enrolled Group Members ({viewingRegistration.groupMembers.length} Members)
                  </span>
                </div>
                <div className="divide-y divide-amber-200 text-xs max-h-44 overflow-y-auto pr-1">
                  {viewingRegistration.groupMembers.map((mem, idx) => (
                    <div key={idx} className="py-2 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-stone-950">
                          {idx + 1}. {mem.name} {idx === 0 && <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-extrabold ml-1">LEADER</span>}
                        </div>
                        {mem.fatherOrHusbandName && (
                          <div className="text-[10px] text-stone-600">
                            Father/Husband: {mem.fatherOrHusbandName}
                          </div>
                        )}
                      </div>
                      <div className="text-right text-[11px] text-stone-700">
                        {mem.mobile ? <span className="font-mono block">+91 {mem.mobile}</span> : null}
                        {mem.age ? <span className="text-stone-500 block">Age: {mem.age}</span> : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Screenshot View if present */}
            {viewingRegistration.paymentScreenshot && (
              <div>
                <span className="text-[11px] text-stone-600 font-bold block mb-1">
                  Attached Payment Screenshot:
                </span>
                <img
                  src={viewingRegistration.paymentScreenshot}
                  alt="Payment Proof"
                  className="max-h-48 w-auto rounded-xl border-2 border-stone-200 object-contain mx-auto shadow-sm"
                />
              </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t border-stone-200">
              <button
                onClick={() => downloadRegistrationReceipt(viewingRegistration)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 font-black text-xs ring-1 ring-amber-300 hover:brightness-105 flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Receipt</span>
              </button>

              {viewingRegistration.paymentStatus !== 'PAYMENT_VERIFIED' && (
                <button
                  onClick={() => {
                    handleStatusUpdate(viewingRegistration.id, 'PAYMENT_VERIFIED', 'CONFIRMED');
                    setViewingRegistration(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-500 transition cursor-pointer shadow-2xs"
                >
                  Verify Payment Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
