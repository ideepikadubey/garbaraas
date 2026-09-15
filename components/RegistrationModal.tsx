'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  Copy,
  Upload,
  Download,
  Share2,
  AlertCircle,
  Users,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { CategoryType, Slot, Registration } from '@/lib/types';
import { downloadRegistrationReceipt } from '@/lib/receipt-generator';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedCategory?: CategoryType;
  preSelectedSlot?: Slot;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  preSelectedCategory,
  preSelectedSlot,
}: RegistrationModalProps) {
  // Step State: 1 = Category, 2 = Details, 3 = Slot, 4 = Review, 5 = Payment, 6 = Confirmation
  const [step, setStep] = useState(1);

  // Form State
  const [category, setCategory] = useState<CategoryType>('FEMALE');
  const [isOldStudent, setIsOldStudent] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [membersCount, setMembersCount] = useState<number>(5);
  const [groupLeaderName, setGroupLeaderName] = useState('');
  const [groupLeaderPhone, setGroupLeaderPhone] = useState('');

  // Participant details
  const [participantName, setParticipantName] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<string>('22');
  const [gender, setGender] = useState('Female');
  const [city, setCity] = useState('Kishangarh');
  const [address, setAddress] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  // Kids specific
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [childAge, setChildAge] = useState('11');

  // Slot Selection
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Payment Details
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'UPI_QR'>('RAZORPAY');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [utrNumber, setUtrNumber] = useState('');
  const [paymentDate, setPaymentDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [screenshotData, setScreenshotData] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isRazorpayLoading, setIsRazorpayLoading] = useState(false);

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [createdRegistration, setCreatedRegistration] = useState<Registration | null>(null);

  // Default UPI config
  const upiId = process.env.NEXT_PUBLIC_UPI_ID || 'thefrozennight@upi';
  const merchantName = process.env.NEXT_PUBLIC_UPI_MERCHANT_NAME || 'The Frozen Night Events';

  // Dynamic Razorpay Script Loader
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle Online Payment via Razorpay
  const handleRazorpayPayment = async () => {
    if (!createdRegistration) {
      setErrorMessage('Registration record not found. Please try again.');
      return;
    }

    setIsRazorpayLoading(true);
    setErrorMessage('');

    try {
      // 1. Create order on server
      const orderRes = await fetch('/api/payment/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId: createdRegistration.id }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment gateway.');
      }

      // 2. Handle Simulated dev/demo mode if live keys are not set yet
      if (orderData.isSimulated) {
        const confirmSim = window.confirm(
          `🧪 [Test Gateway Mode]\n\nRazorpay keys not yet added in .env.local.\nWould you like to simulate a successful payment of ₹${createdRegistration.totalAmount} now?`
        );
        if (!confirmSim) {
          setIsRazorpayLoading(false);
          return;
        }

        const verifyRes = await fetch('/api/payment/razorpay/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            registrationId: createdRegistration.id,
            isSimulated: true,
            razorpay_payment_id: `pay_sim_${Date.now()}`,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          const finalReg = verifyData.registration || createdRegistration;
          setCreatedRegistration(finalReg);
          try {
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#db2777', '#f43f5e', '#fbbf24', '#ffffff'],
            });
          } catch (e) {}
          setStep(6);
          setTimeout(() => downloadRegistrationReceipt(finalReg), 800);
        }
        setIsRazorpayLoading(false);
        return;
      }

      // 3. Live Razorpay mode: Load SDK and open checkout modal
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'TFN - The Frozen Night',
        description: `Garba & Dandiya Workshop • ${createdRegistration.categoryLabel}`,
        order_id: orderData.orderId,
        prefill: {
          name: createdRegistration.participantName,
          contact: createdRegistration.mobile,
          email: createdRegistration.email || '',
        },
        theme: {
          color: '#db2777',
        },
        modal: {
          ondismiss: () => {
            setIsRazorpayLoading(false);
          },
        },
        handler: async function (response: any) {
          setIsRazorpayLoading(true);
          try {
            const verifyRes = await fetch('/api/payment/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                registrationId: createdRegistration.id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              const finalReg = verifyData.registration || createdRegistration;
              setCreatedRegistration(finalReg);
              try {
                confetti({
                  particleCount: 120,
                  spread: 90,
                  origin: { y: 0.6 },
                  colors: ['#db2777', '#f43f5e', '#fbbf24', '#ffffff'],
                });
              } catch (e) {}
              setStep(6);
              setTimeout(() => downloadRegistrationReceipt(finalReg), 800);
            } else {
              setErrorMessage(verifyData.error || 'Payment signature verification failed.');
            }
          } catch (err: any) {
            setErrorMessage(err.message || 'Error verifying payment.');
          } finally {
            setIsRazorpayLoading(false);
          }
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on('payment.failed', function (resp: any) {
        setErrorMessage(resp.error?.description || 'Payment was unsuccessful. Please try again.');
        setIsRazorpayLoading(false);
      });
      razorpayInstance.open();
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment gateway failed to initialize.');
    } finally {
      setIsRazorpayLoading(false);
    }
  };

  // Apply pre-selected category or slot when opened
  useEffect(() => {
    if (preSelectedCategory) {
      setCategory(preSelectedCategory);
      if (preSelectedCategory === 'OLD_STUDENT') {
        setIsOldStudent(true);
        setIsGroup(false);
      } else if (preSelectedCategory === 'GROUP') {
        setIsGroup(true);
        setIsOldStudent(false);
      } else {
        setIsOldStudent(false);
        setIsGroup(false);
      }
    }
  }, [preSelectedCategory]);

  useEffect(() => {
    if (preSelectedSlot) {
      setSelectedSlot(preSelectedSlot);
    }
  }, [preSelectedSlot]);

  // Fetch slots on open
  useEffect(() => {
    if (isOpen) {
      setLoadingSlots(true);
      fetch('/api/slots')
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.slots)) {
            setSlots(data.slots);
            if (!selectedSlot && data.slots.length > 0) {
              const firstAvail = data.slots.find((s: Slot) => s.status !== 'FULL');
              if (firstAvail) setSelectedSlot(firstAvail);
            }
          }
        })
        .finally(() => setLoadingSlots(false));
    }
  }, [isOpen]);

  // Pricing calculations
  const calculatePricing = () => {
    let pricePerPerson = 2500;
    if (category === 'KIDS') {
      pricePerPerson = 2000;
    } else if (category === 'OLD_STUDENT' || category === 'GROUP') {
      pricePerPerson = 2200;
    }

    const count = isGroup ? Math.max(5, membersCount) : 1;
    const total = pricePerPerson * count;

    return { pricePerPerson, count, total };
  };

  const { pricePerPerson, count, total } = calculatePricing();

  // Generate dynamic UPI QR Code when reaching Payment step
  useEffect(() => {
    if (step === 5) {
      // Standard UPI payment string
      // upi://pay?pa=<UPI_ID>&pn=<MERCHANT_NAME>&am=<AMOUNT>&cu=INR&tn=TFN_Garba_Registration
      const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
        merchantName
      )}&am=${total}&cu=INR&tn=TFN_Garba_Workshop`;

      QRCode.toDataURL(upiUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#140306',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('Error generating QR:', err));
    }
  }, [step, total, upiId, merchantName]);

  if (!isOpen) return null;

  // Step 1 -> 2
  const handleCategorySelect = (selectedCat: CategoryType) => {
    setCategory(selectedCat);
    if (selectedCat === 'OLD_STUDENT') {
      setIsOldStudent(true);
      setIsGroup(false);
    } else if (selectedCat === 'GROUP') {
      setIsGroup(true);
      setIsOldStudent(false);
    } else {
      setIsOldStudent(false);
      setIsGroup(false);
    }
    setStep(2);
  };

  // Step 2 validation
  const validateStep2 = () => {
    setErrorMessage('');
    if (!participantName.trim()) {
      setErrorMessage('Please enter the participant full name');
      return false;
    }

    const cleanMob = mobile.replace(/\D/g, '');
    if (cleanMob.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number');
      return false;
    }

    if (category === 'KIDS') {
      if (!guardianName.trim()) {
        setErrorMessage("Please enter the parent or guardian's full name");
        return false;
      }
      const cleanGuardMob = guardianPhone.replace(/\D/g, '');
      if (cleanGuardMob.length !== 10) {
        setErrorMessage("Please enter a valid 10-digit parent/guardian mobile number");
        return false;
      }
    }

    if (isGroup) {
      if (membersCount < 5) {
        setErrorMessage('Group admission requires a minimum of 5 members');
        return false;
      }
      if (!groupLeaderName.trim()) {
        setErrorMessage('Please enter group leader name');
        return false;
      }
    }

    return true;
  };

  // Step 3 validation
  const validateStep3 = () => {
    setErrorMessage('');
    if (!selectedSlot) {
      setErrorMessage('Please select an available workshop batch');
      return false;
    }
    const remaining = selectedSlot.capacity - selectedSlot.bookedSeats;
    if (remaining < count) {
      setErrorMessage(
        `This batch has only ${Math.max(0, remaining)} seats left. Your group requires ${count} seats.`
      );
      return false;
    }
    return true;
  };

  // Step 4 -> 5: Proceed to Payment & Server-side Slot Reservation
  const handleProceedToPayment = async () => {
    setSubmitting(true);
    setErrorMessage('');

    try {
      // Reserve slot on server atomically
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          participantName,
          mobile,
          whatsapp: whatsapp || mobile,
          email,
          age,
          gender: category === 'KIDS' || category === 'FEMALE' ? 'Female' : gender,
          city,
          address,
          emergencyName,
          emergencyPhone,
          isKids: category === 'KIDS',
          guardianName,
          guardianPhone,
          childAge: category === 'KIDS' ? childAge : undefined,
          isOldStudent,
          isGroup,
          membersCount: count,
          groupLeaderName,
          groupLeaderPhone,
          slotId: selectedSlot?.id,
          locationName: selectedSlot?.locationName,
          batchTime: `${selectedSlot?.batchName}: ${selectedSlot?.startTime} – ${selectedSlot?.endTime}`,
          workshopDate: '13th Sept to 11th Oct',
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Unable to reserve slot. Please try another batch.');
        return;
      }

      // Slot reserved successfully!
      setCreatedRegistration(data.registration);
      setStep(5); // Proceed to Payment QR screen
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error occurred while reserving your slot.');
    } finally {
      setSubmitting(false);
    }
  };

  // Step 5 -> 6: Submit Payment UTR & Complete
  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber.trim()) {
      setErrorMessage('Please enter the 12-digit UTR or Transaction ID from your payment app');
      return;
    }

    if (!createdRegistration) {
      setErrorMessage('Booking record not found. Please refresh and try again.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch(`/api/registrations/${createdRegistration.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'SUBMIT_PAYMENT',
          utrNumber: utrNumber.trim(),
          paymentDate,
          paymentScreenshot: screenshotData,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to submit payment details.');
        return;
      }

      // Updated registration with UTR
      const finalReg = data.registration;
      setCreatedRegistration(finalReg);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d9a635', '#fae8b0', '#991c3d', '#ffffff'],
        });
      } catch (err) {
        // graceful ignore
      }

      // Step 6: Confirmation
      setStep(6);

      // Auto-trigger PDF receipt download
      setTimeout(() => {
        downloadRegistrationReceipt(finalReg);
      }, 800);
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error submitting payment verification');
    } finally {
      setSubmitting(false);
    }
  };

  // Copy UPI ID
  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  // File to base64
  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // WhatsApp Share text
  const shareOnWhatsApp = () => {
    if (!createdRegistration) return;
    const msg = `🎉 *I just registered for TFN Garba & Dandiya Workshop in Kishangarh!*\n\n` +
      `🎫 *Registration ID:* ${createdRegistration.id}\n` +
      `📍 *Location:* ${createdRegistration.locationName}\n` +
      `⏰ *Batch:* ${createdRegistration.batchTime}\n` +
      `📅 *Dates:* 13th Sept to 11th Oct\n` +
      `🌟 Includes a Free Family Pass for 1 Day!\n\n` +
      `Register your batch now at: ${window.location.origin}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border-2 border-pink-300 rounded-3xl p-3.5 sm:p-7 shadow-2xl my-4 max-h-[94vh] flex flex-col justify-between overflow-hidden">
        
        {/* Top Garba Accent Ribbon */}
        <div className="w-full h-[3px] bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 absolute top-0 left-0 right-0"></div>

        {/* Top Ornate Bar */}
        <div className="flex items-center justify-between pb-3 pt-2 mb-2 border-b border-stone-200">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="p-[2px] rounded-full bg-gradient-to-tr from-garba-pink-600 via-rose-500 to-pink-400 shadow-sm">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-pink-200 flex items-center justify-center text-maroon-950 font-serif font-black text-xs">
                TFN
              </div>
            </div>
            <div>
              <h3 className="text-xs sm:text-base font-serif font-bold text-maroon-950 truncate max-w-[220px] sm:max-w-none">
                TFN Garba & Dandiya Registration
              </h3>
              <p className="text-[10px] sm:text-[11px] text-garba-pink-800 font-semibold">
                13th Sept – 11th Oct • Kishangarh, Rajasthan
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-maroon-950 hover:bg-pink-50 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 6-Step Progress Indicator */}
        <div className="py-2 px-1 mb-3">
          <div className="grid grid-cols-6 gap-1 sm:gap-2 text-center text-[10px] sm:text-xs">
            {[
              { num: 1, label: 'Category' },
              { num: 2, label: 'Details' },
              { num: 3, label: 'Slot' },
              { num: 4, label: 'Review' },
              { num: 5, label: 'Payment' },
              { num: 6, label: 'Success' },
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center">
                <div
                  className={`w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold mb-1 transition-all text-[10px] sm:text-xs ${
                    step === s.num
                      ? 'bg-gradient-to-r from-garba-pink-600 via-rose-500 to-pink-500 text-white shadow-md scale-105'
                      : step > s.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-100 text-stone-500 border border-stone-300'
                  }`}
                >
                  {step > s.num ? <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> : s.num}
                </div>
                <span
                  className={`hidden sm:inline-block truncate ${
                    step === s.num ? 'text-garba-orange-800 font-bold' : 'text-stone-500'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Scrollable Step Body */}
        <div className="overflow-y-auto flex-1 pr-1 pb-2">
          
          {/* ================= STEP 1: SELECT CATEGORY ================= */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h4 className="text-lg font-serif font-black garba-gradient-text">
                  Step 1: Choose Your Registration Category
                </h4>
                <p className="text-xs text-stone-600 font-medium">
                  Select your participant category from the options below:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                
                {/* Female */}
                <div
                  onClick={() => handleCategorySelect('FEMALE')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    category === 'FEMALE' && !isOldStudent && !isGroup
                      ? 'bg-garba-pink-50/80 border-garba-pink-500 shadow-md'
                      : 'bg-white border-garba-pink-200 hover:border-garba-pink-400'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-garba-pink-700">Category A</span>
                    <span className="text-xl font-black font-serif text-garba-pink-600">₹2500</span>
                  </div>
                  <h5 className="text-base font-bold text-maroon-950 mt-1">Female Admission</h5>
                  <p className="text-xs text-stone-600 mt-0.5 font-medium">(Only Females • Open Age)</p>
                  <div className="mt-3 pt-2 border-t border-stone-200 text-[11px] text-stone-700 space-y-1 font-medium">
                    <div>✓ All 8 Dance Styles</div>
                    <div>✓ Free Family Pass (1 Day)</div>
                    <div>✓ Manish & Neel Sir Mentorship</div>
                  </div>
                </div>

                {/* Old TFN / Group */}
                <div
                  onClick={() => handleCategorySelect('GROUP')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    isGroup || isOldStudent
                      ? 'bg-garba-orange-50/80 border-garba-orange-500 shadow-md'
                      : 'bg-white border-garba-orange-200 hover:border-garba-orange-400'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-garba-orange-700">Category B</span>
                    <span className="text-xl font-black font-serif text-garba-orange-600">₹2200</span>
                  </div>
                  <h5 className="text-base font-bold text-maroon-950 mt-1">Group (5+) / Old TFN</h5>
                  <p className="text-xs text-garba-orange-800 font-bold mt-0.5">(Alumni or 5+ Members)</p>
                  <div className="mt-3 pt-2 border-t border-stone-200 text-[11px] text-stone-700 space-y-1 font-medium">
                    <div>✓ ₹300 Discount per member</div>
                    <div>✓ Free Family Pass for all</div>
                    <div>✓ Group choreography formation</div>
                  </div>
                </div>

                {/* Kids */}
                <div
                  onClick={() => handleCategorySelect('KIDS')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    category === 'KIDS'
                      ? 'bg-garba-teal-50/80 border-garba-teal-500 shadow-md'
                      : 'bg-white border-garba-teal-200 hover:border-garba-teal-400'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-garba-teal-700">Category C</span>
                    <span className="text-xl font-black font-serif text-garba-teal-700">₹2000</span>
                  </div>
                  <h5 className="text-base font-bold text-maroon-950 mt-1">Kids Girls</h5>
                  <p className="text-xs text-stone-600 mt-0.5 font-medium">(Age 7–16 Years • Girls Only)</p>
                  <div className="mt-3 pt-2 border-t border-stone-200 text-[11px] text-stone-700 space-y-1 font-medium">
                    <div>✓ Princess Title Eligibility</div>
                    <div>✓ Free Family Pass for parents</div>
                    <div>✓ Safe, supportive coaching</div>
                  </div>
                </div>

              </div>

              {/* Group Configuration if Group chosen */}
              {isGroup && (
                <div className="p-4 rounded-xl bg-garba-orange-50 border-2 border-garba-orange-300 mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h6 className="text-xs font-bold text-garba-orange-900 uppercase tracking-wide">
                        Group Booking: Number of Members (Minimum 5)
                      </h6>
                      <p className="text-[11px] text-stone-600 font-medium">₹2200 per member automatically calculated</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setMembersCount((prev) => Math.max(5, prev - 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-garba-orange-300 text-garba-orange-900 font-bold shadow-sm cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-black text-maroon-950 text-base">
                        {membersCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setMembersCount((prev) => prev + 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-garba-orange-300 text-garba-orange-900 font-bold shadow-sm cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-garba-orange-200 flex justify-between items-center text-xs">
                    <span className="text-stone-700 font-medium">Total Group Payable:</span>
                    <span className="text-sm font-black text-garba-orange-800">₹{2200 * membersCount}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 2: PARTICIPANT DETAILS ================= */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-3">
                <h4 className="text-lg font-serif font-bold text-maroon-950">
                  Step 2: Participant Information
                </h4>
                <p className="text-xs text-stone-600 font-medium">
                  Please enter participant details accurately for the official entry pass.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-maroon-950 font-bold mb-1">
                    Participant Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={participantName}
                    onChange={(e) => setParticipantName(e.target.value)}
                    placeholder="e.g. Pooja Sharma"
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-maroon-950 placeholder-stone-400 text-xs focus:outline-none focus:border-garba-orange-500"
                    required
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-maroon-950 font-bold mb-1">
                    Primary Mobile Number (10 digits) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-stone-100 border-2 border-r-0 border-stone-200 rounded-l-xl text-maroon-950 font-mono font-bold text-xs">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                      placeholder="9829012345"
                      className="w-full bg-stone-50 border-2 border-stone-200 rounded-r-xl px-3.5 py-2.5 text-maroon-950 placeholder-stone-400 text-xs focus:outline-none focus:border-garba-orange-500 font-mono"
                      required
                    />
                  </div>
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-maroon-950 font-bold mb-1">
                    WhatsApp Number (for slot updates)
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-stone-100 border-2 border-r-0 border-stone-200 rounded-l-xl text-maroon-950 font-mono font-bold text-xs">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ''))}
                      placeholder="Same as mobile if blank"
                      className="w-full bg-stone-50 border-2 border-stone-200 rounded-r-xl px-3.5 py-2.5 text-maroon-950 placeholder-stone-400 text-xs focus:outline-none focus:border-garba-orange-500 font-mono"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-maroon-950 font-bold mb-1">
                    Email Address (for PDF receipt)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="pooja@example.com"
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-maroon-950 placeholder-stone-400 text-xs focus:outline-none focus:border-garba-orange-500"
                  />
                </div>

                {/* Age & Gender */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-maroon-950 font-bold mb-1">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min={category === 'KIDS' ? 7 : 14}
                      max={category === 'KIDS' ? 16 : 80}
                      value={category === 'KIDS' ? childAge : age}
                      onChange={(e) => {
                        if (category === 'KIDS') setChildAge(e.target.value);
                        else setAge(e.target.value);
                      }}
                      className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3 py-2.5 text-maroon-950 text-xs focus:outline-none focus:border-garba-orange-500 font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-maroon-950 font-bold mb-1">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3 py-2.5 text-maroon-950 text-xs focus:outline-none focus:border-garba-orange-500 font-medium"
                    >
                      <option value="Female">Female</option>
                      {category !== 'KIDS' && category !== 'FEMALE' && <option value="Male">Male</option>}
                    </select>
                  </div>
                </div>

                {/* City & Address */}
                <div>
                  <label className="block text-maroon-950 font-bold mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Kishangarh"
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-maroon-950 placeholder-stone-400 text-xs focus:outline-none focus:border-garba-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-maroon-950 font-bold mb-1">Local Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Madanganj, Kishangarh"
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-maroon-950 placeholder-stone-400 text-xs focus:outline-none focus:border-garba-orange-500"
                  />
                </div>

                {/* CONDITIONAL: KIDS SPECIFIC */}
                {category === 'KIDS' && (
                  <div className="sm:col-span-2 p-3.5 rounded-xl bg-garba-teal-50 border-2 border-garba-teal-300 space-y-3">
                    <div className="text-xs font-bold text-garba-teal-900 uppercase tracking-wide">
                      Parent / Guardian Information (Mandatory for Kids 7-16)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-700 font-medium text-xs mb-1">
                          Parent / Guardian Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={guardianName}
                          onChange={(e) => setGuardianName(e.target.value)}
                          placeholder="e.g. Sunita Sharma"
                          className="w-full bg-white border border-garba-teal-300 rounded-lg px-3 py-2 text-maroon-950 text-xs focus:outline-none focus:border-garba-teal-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-stone-700 font-medium text-xs mb-1">
                          Parent Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          maxLength={10}
                          value={guardianPhone}
                          onChange={(e) => setGuardianPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="9829012345"
                          className="w-full bg-white border border-garba-teal-300 rounded-lg px-3 py-2 text-maroon-950 text-xs focus:outline-none focus:border-garba-teal-500 font-mono"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* CONDITIONAL: OLD TFN STUDENT */}
                {category === 'OLD_STUDENT' && (
                  <div className="sm:col-span-2 p-3.5 rounded-xl bg-garba-orange-50 border border-garba-orange-300 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-garba-orange-900">Are you an old TFN student?</span>
                      <p className="text-[11px] text-stone-600 font-medium">Eligible for alumni discount rate of ₹2200</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsOldStudent(true)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                          isOldStudent ? 'bg-garba-orange-500 text-white' : 'bg-white text-stone-700 border border-stone-300'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsOldStudent(false)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                          !isOldStudent ? 'bg-garba-orange-500 text-white' : 'bg-white text-stone-700 border border-stone-300'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}

                {/* CONDITIONAL: GROUP SPECIFIC */}
                {isGroup && (
                  <div className="sm:col-span-2 p-3.5 rounded-xl bg-garba-orange-50 border border-garba-orange-300 space-y-3">
                    <div className="text-xs font-bold text-garba-orange-900 uppercase tracking-wide">
                      Group Coordinator Details
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-700 font-medium text-xs mb-1">Group Leader Name *</label>
                        <input
                          type="text"
                          value={groupLeaderName}
                          onChange={(e) => setGroupLeaderName(e.target.value)}
                          placeholder="Leader Name"
                          className="w-full bg-white border border-garba-orange-300 rounded-lg px-3 py-2 text-maroon-950 text-xs focus:outline-none focus:border-garba-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-stone-700 font-medium text-xs mb-1">Group Leader Mobile *</label>
                        <input
                          type="tel"
                          maxLength={10}
                          value={groupLeaderPhone}
                          onChange={(e) => setGroupLeaderPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="Leader Mobile"
                          className="w-full bg-white border border-garba-orange-300 rounded-lg px-3 py-2 text-maroon-950 text-xs focus:outline-none focus:border-garba-orange-500 font-mono"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* ================= STEP 3: WORKSHOP SLOT SELECTION ================= */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-3">
                <h4 className="text-lg font-serif font-bold text-maroon-950">
                  Step 3: Select Your Workshop Batch
                </h4>
                <p className="text-xs text-stone-600 font-medium">
                  Pick your preferred hall location and time batch. Seats are allocated dynamically.
                </p>
              </div>

              {/* Fixed Dates Banner */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs">
                <div className="flex items-center gap-2 text-maroon-950 font-bold">
                  <Calendar className="w-4 h-4 text-garba-orange-600" />
                  <span>Workshop Duration: <strong>13th September to 11th October</strong></span>
                </div>
                <span className="text-[11px] text-stone-600 font-semibold">1 Month Everyday</span>
              </div>

              {/* Slot Cards List */}
              {loadingSlots ? (
                <div className="py-12 text-center text-garba-orange-800 text-xs font-bold">
                  <div className="w-8 h-8 border-2 border-garba-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  Loading batch availability...
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[45vh] overflow-y-auto pr-1">
                  {slots.map((slot) => {
                    const remaining = Math.max(0, slot.capacity - slot.bookedSeats);
                    const isFull = slot.status === 'FULL' || remaining < count;
                    const isSelected = selectedSlot?.id === slot.id;

                    return (
                      <div
                        key={slot.id}
                        onClick={() => !isFull && setSelectedSlot(slot)}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isFull
                            ? 'bg-stone-50 border-stone-300 opacity-60 cursor-not-allowed'
                            : isSelected
                            ? 'bg-amber-50/90 border-amber-500 shadow-md'
                            : 'bg-white border-stone-200 hover:border-amber-400'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-1 mb-1">
                            <span className="text-xs font-bold text-maroon-950 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-garba-orange-600 flex-shrink-0" />
                              <span className="truncate">{slot.locationName}</span>
                            </span>

                            {isFull ? (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-300 font-bold">
                                FULL
                              </span>
                            ) : remaining <= 5 ? (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-bold">
                                {remaining} left
                              </span>
                            ) : (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                                Available
                              </span>
                            )}
                          </div>

                          <div className="text-sm font-serif font-bold text-garba-orange-800 flex items-center gap-1.5 my-1">
                            <Clock className="w-4 h-4 text-garba-orange-600" />
                            <span>{slot.startTime} – {slot.endTime}</span>
                          </div>
                          <div className="text-[11px] text-stone-600 font-medium">{slot.batchName}</div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-stone-200 flex items-center justify-between text-[11px]">
                          <span className="text-stone-500 font-semibold">
                            {slot.bookedSeats} / {slot.capacity} seats booked
                          </span>
                          {isSelected && (
                            <span className="text-garba-orange-700 font-extrabold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Selected
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 4: BOOKING SUMMARY REVIEW ================= */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center mb-3">
                <h4 className="text-lg font-serif font-bold text-maroon-950">
                  Step 4: Review Your Registration Summary
                </h4>
                <p className="text-xs text-stone-600 font-medium">
                  Please verify all details before proceeding to payment.
                </p>
              </div>

              {/* Review Card */}
              <div className="p-5 rounded-2xl bg-stone-50 border-2 border-amber-300 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-garba-orange-800 tracking-wider">
                      REGISTRATION SUMMARY
                    </span>
                    <h5 className="text-lg font-serif font-bold text-maroon-950 mt-0.5">
                      {participantName}
                    </h5>
                    <p className="text-xs text-stone-600 font-mono">+91 {mobile}</p>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs text-garba-orange-800 hover:underline font-bold cursor-pointer"
                  >
                    Edit Details →
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-500 block text-[11px] font-semibold">Category:</span>
                    <strong className="text-maroon-950">
                      {category === 'FEMALE' && 'Female Admission Fee'}
                      {category === 'OLD_STUDENT' && 'Old TFN Student Admission'}
                      {category === 'GROUP' && `Group Registration (${count} Members)`}
                      {category === 'KIDS' && `Kids Girls (Age 7-16)`}
                    </strong>
                  </div>

                  <div>
                    <span className="text-stone-500 block text-[11px] font-semibold">Workshop Dates:</span>
                    <strong className="text-maroon-950">13th Sept to 11th Oct</strong>
                  </div>

                  <div>
                    <span className="text-stone-500 block text-[11px] font-semibold">Selected Hall Location:</span>
                    <strong className="text-maroon-950">{selectedSlot?.locationName}</strong>
                  </div>

                  <div>
                    <span className="text-stone-500 block text-[11px] font-semibold">Batch Timing:</span>
                    <strong className="text-garba-orange-800 font-extrabold">
                      {selectedSlot?.batchName} ({selectedSlot?.startTime} – {selectedSlot?.endTime})
                    </strong>
                  </div>
                </div>

                {/* Free Family Pass Banner */}
                <div className="p-3 rounded-xl bg-amber-100/70 border border-amber-300 text-center">
                  <div className="text-xs font-bold text-garba-orange-900 flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-garba-orange-600" />
                    <span>Family Pass: FREE – One Day Pass Included!</span>
                  </div>
                </div>

                {/* Pricing Calculation Row */}
                <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-700 font-medium">
                    <span>Fee per Participant:</span>
                    <span>₹{pricePerPerson}</span>
                  </div>
                  {isGroup && (
                    <div className="flex justify-between text-stone-700 font-medium">
                      <span>Number of Participants:</span>
                      <span>{count}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-maroon-950 pt-2 border-t border-stone-200">
                    <span>Total Payable Amount:</span>
                    <span className="text-2xl font-serif font-black text-garba-pink-700">₹{total}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 5: DEDICATED PAYMENT PAGE ================= */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="text-center mb-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-[11px] text-emerald-800 font-bold mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Slot Temporarily Reserved (ID: {createdRegistration?.id})</span>
                </div>
                <h4 className="text-xl font-serif font-bold text-maroon-950">
                  Select Payment Method
                </h4>
                <p className="text-xs text-stone-600 font-medium">
                  Total Amount Payable: <strong className="text-garba-pink-700 font-bold text-sm">₹{total}</strong>
                </p>
              </div>

              {/* Payment Mode Selector Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-2xl border border-stone-200">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('RAZORPAY')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'RAZORPAY'
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                      : 'text-stone-700 hover:text-maroon-950'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Pay Online (Instant)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI_QR')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'UPI_QR'
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                      : 'text-stone-700 hover:text-maroon-950'
                  }`}
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Scan UPI QR (Manual)</span>
                </button>
              </div>

              {/* OPTION 1: RAZORPAY INSTANT PAYMENT */}
              {paymentMethod === 'RAZORPAY' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-pink-300 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-garba-pink-700 tracking-wider">
                        AUTOMATED SECURE PAYMENT
                      </span>
                      <h5 className="text-base sm:text-lg font-serif font-bold text-maroon-950 mt-0.5">
                        UPI • Cards • NetBanking • Wallets
                      </h5>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-stone-500 block uppercase font-bold">Total Fee</span>
                      <span className="text-2xl sm:text-3xl font-serif font-black text-garba-pink-700">₹{total}</span>
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-pink-50/70 border border-pink-200">
                      <div className="font-bold text-garba-pink-900 flex items-center gap-1 mb-0.5">
                        <Check className="w-3.5 h-3.5 text-garba-pink-600" /> Instant Activation
                      </div>
                      <p className="text-[11px] text-stone-600">Automated verification without waiting for manual confirmation.</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-pink-50/70 border border-pink-200">
                      <div className="font-bold text-garba-pink-900 flex items-center gap-1 mb-0.5">
                        <Download className="w-3.5 h-3.5 text-garba-pink-600" /> Auto PDF Receipt
                      </div>
                      <p className="text-[11px] text-stone-600">Official Pass generated & downloaded instantly upon success.</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-pink-50/70 border border-pink-200">
                      <div className="font-bold text-garba-pink-900 flex items-center gap-1 mb-0.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-garba-pink-600" /> 100% Encrypted
                      </div>
                      <p className="text-[11px] text-stone-600">Bank-grade 256-bit secure gateway powered by Razorpay.</p>
                    </div>
                  </div>

                  {/* Accepted Payment Modes Badges */}
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-stone-600 font-semibold text-[11px]">All Payment Modes Supported:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['GPay', 'PhonePe', 'Paytm', 'UPI QR', 'Credit/Debit Cards', 'NetBanking'].map((badge) => (
                        <span key={badge} className="px-2 py-0.5 rounded-md bg-white border border-stone-200 text-[10px] font-bold text-stone-700 shadow-2xs">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Razorpay Launch Button */}
                  <button
                    type="button"
                    onClick={handleRazorpayPayment}
                    disabled={isRazorpayLoading}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-garba-pink-600 via-rose-500 to-pink-500 text-white font-extrabold text-sm sm:text-base hover:brightness-105 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isRazorpayLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Sparkles className="w-5 h-5" />
                    )}
                    <span>PAY ₹{total} SECURELY ONLINE</span>
                  </button>
                </div>
              )}

              {/* OPTION 2: MANUAL UPI QR */}
              {paymentMethod === 'UPI_QR' && (
                <form onSubmit={handleSubmitPayment} className="space-y-4">
                  {/* QR & UPI Section */}
                  <div className="p-4 rounded-2xl bg-stone-50 border-2 border-pink-300 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
                    
                    {/* QR Code */}
                    <div className="bg-white p-3 rounded-2xl shadow-md border border-stone-200 flex flex-col items-center flex-shrink-0">
                      {qrDataUrl ? (
                        <img
                          src={qrDataUrl}
                          alt="UPI Payment QR Code"
                          className="w-40 h-40 sm:w-44 sm:h-44 object-contain"
                        />
                      ) : (
                        <div className="w-40 h-40 flex items-center justify-center text-xs text-stone-500">
                          Generating QR...
                        </div>
                      )}
                      <span className="text-[9px] font-black text-maroon-950 tracking-wider mt-1 uppercase">
                        SCAN & PAY WITH ANY UPI APP
                      </span>
                    </div>

                    {/* Amount & UPI Details */}
                    <div className="flex-1 text-center sm:text-left space-y-2.5">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-garba-pink-800 font-bold">
                          Amount Payable
                        </span>
                        <div className="text-2xl sm:text-3xl font-serif font-black text-garba-pink-700">
                          ₹{total}
                        </div>
                      </div>

                      {/* UPI ID copy */}
                      <div className="p-2 rounded-xl bg-white border border-stone-200 shadow-sm">
                        <span className="text-[10px] text-stone-500 block uppercase font-bold">
                          Pay directly to UPI ID:
                        </span>
                        <div className="flex items-center justify-between gap-2 mt-0.5">
                          <span className="font-mono text-xs font-bold text-maroon-950 truncate">
                            {upiId}
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="px-2.5 py-1 rounded bg-pink-100 text-maroon-950 text-[11px] font-bold flex items-center gap-1 hover:bg-pink-200 transition cursor-pointer"
                          >
                            {copiedUpi ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Proof Submission */}
                  <div className="p-3.5 rounded-xl bg-stone-50 border-2 border-stone-200 space-y-3">
                    <div className="text-xs font-bold text-maroon-950 uppercase tracking-wide">
                      Submit Payment Verification Details
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {/* UTR / Transaction ID */}
                      <div>
                        <label className="block text-maroon-950 font-bold mb-1">
                          12-Digit UTR / Transaction ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={utrNumber}
                          onChange={(e) => setUtrNumber(e.target.value)}
                          placeholder="e.g. 429182901842"
                          className="w-full bg-white border-2 border-stone-200 rounded-xl px-3.5 py-2 text-maroon-950 placeholder-stone-400 text-xs focus:outline-none focus:border-pink-500 font-mono"
                          required
                        />
                      </div>

                      {/* Payment Date */}
                      <div>
                        <label className="block text-maroon-950 font-bold mb-1">Payment Date</label>
                        <input
                          type="date"
                          value={paymentDate}
                          onChange={(e) => setPaymentDate(e.target.value)}
                          className="w-full bg-white border-2 border-stone-200 rounded-xl px-3.5 py-2 text-maroon-950 text-xs focus:outline-none focus:border-pink-500 font-medium"
                        />
                      </div>

                      {/* Screenshot upload */}
                      <div className="sm:col-span-2">
                        <label className="block text-maroon-950 font-bold mb-1">
                          Payment Screenshot (Optional / Recommended)
                        </label>
                        <div className="flex items-center gap-3">
                          <label className="cursor-pointer px-3.5 py-1.5 rounded-xl bg-white border-2 border-stone-200 hover:border-pink-400 text-maroon-950 text-xs font-bold flex items-center gap-2 transition shadow-sm">
                            <Upload className="w-3.5 h-3.5 text-garba-pink-600" />
                            <span>{screenshotData ? 'Change Screenshot' : 'Upload Receipt Screenshot'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleScreenshotUpload}
                              className="hidden"
                            />
                          </label>
                          {screenshotData && (
                            <span className="text-xs text-emerald-700 flex items-center gap-1 font-bold">
                              <Check className="w-3.5 h-3.5" /> Screenshot Attached
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Payment Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-garba-pink-600 via-rose-500 to-pink-500 text-white font-extrabold text-sm sm:text-base hover:brightness-105 transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Check className="w-5 h-5" />
                    )}
                    <span>SUBMIT MANUAL PAYMENT VERIFICATION</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ================= STEP 6: CONFIRMATION & PDF RECEIPT ================= */}
          {step === 6 && createdRegistration && (
            <div className="space-y-4 text-center py-2">
              
              {/* Festive Big Check Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center mx-auto shadow-md animate-bounce">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <h4 className="text-2xl sm:text-3xl font-serif font-black text-maroon-950">
                REGISTRATION SUCCESSFUL!
              </h4>
              <p className="text-xs sm:text-sm text-garba-orange-800 font-bold">
                Welcome to the TFN Garba & Dandiya Workshop • Kishangarh
              </p>

              {/* Official Registration Badge Card */}
              <div className="p-5 rounded-2xl bg-stone-50 border-2 border-emerald-400 text-left max-w-lg mx-auto shadow-sm space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-[10px] uppercase font-extrabold text-stone-500">Registration ID</span>
                  <span className="text-lg font-mono font-black text-garba-pink-700">
                    {createdRegistration.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-stone-500 text-[11px] font-semibold block">Participant:</span>
                    <strong className="text-maroon-950">{createdRegistration.participantName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[11px] font-semibold block">Category:</span>
                    <strong className="text-maroon-950">{createdRegistration.categoryLabel}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[11px] font-semibold block">Hall Location:</span>
                    <strong className="text-maroon-950">{createdRegistration.locationName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[11px] font-semibold block">Batch Timing:</span>
                    <strong className="text-garba-orange-800 font-extrabold">{createdRegistration.batchTime}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[11px] font-semibold block">Amount Paid:</span>
                    <strong className="text-maroon-950">₹{createdRegistration.totalAmount}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[11px] font-semibold block">Status:</span>
                    <strong className="text-amber-800 font-extrabold">PAYMENT SUBMITTED</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200 text-center">
                  <span className="text-[11px] text-garba-orange-800 font-extrabold">
                    ★ FREE FAMILY PASS INCLUDED WITH THIS PASS ★
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
                <button
                  onClick={() => downloadRegistrationReceipt(createdRegistration)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-garba-pink-600 via-garba-orange-500 to-garba-yellow-500 text-white font-extrabold text-xs sm:text-sm hover:brightness-105 transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD RECEIPT (PDF)</span>
                </button>

                <button
                  onClick={shareOnWhatsApp}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs sm:text-sm hover:bg-emerald-500 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share on WhatsApp</span>
                </button>
              </div>

              <p className="text-[11px] text-stone-500 font-medium">
                Please save your Registration ID ({createdRegistration.id}) for future entry at the studio.
              </p>
            </div>
          )}

        </div>

        {/* Modal Navigation Footer (Steps 1 to 4) */}
        {step <= 4 && (
          <div className="pt-3 mt-2 border-t border-stone-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="px-4 py-2 rounded-xl bg-stone-100 border border-stone-300 text-maroon-950 text-xs font-bold hover:bg-stone-200 transition flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div></div>
            )}

            {step === 1 && (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-garba-pink-600 via-garba-orange-500 to-garba-yellow-500 text-white text-xs sm:text-sm font-extrabold hover:brightness-105 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={() => {
                  if (validateStep2()) setStep(3);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-garba-pink-600 via-garba-orange-500 to-garba-yellow-500 text-white text-xs sm:text-sm font-extrabold hover:brightness-105 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Select Workshop Slot</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                onClick={() => {
                  if (validateStep3()) setStep(4);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-garba-pink-600 via-garba-orange-500 to-garba-yellow-500 text-white text-xs sm:text-sm font-extrabold hover:brightness-105 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Review Summary</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 4 && (
              <button
                type="button"
                onClick={handleProceedToPayment}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-garba-pink-600 via-garba-orange-500 to-garba-yellow-500 text-white text-xs sm:text-sm font-extrabold hover:brightness-105 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>PROCEED TO PAYMENT (₹{total})</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
