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
  QrCode,
} from 'lucide-react';
import { CategoryType, Slot, Registration } from '@/lib/types';
import { downloadRegistrationReceipt } from '@/lib/receipt-generator';
import { verifyAlumni, AlumniRecord } from '@/lib/alumniVerifier';

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
  const [fatherOrHusbandName, setFatherOrHusbandName] = useState('');

  // Alumni Season 2 Verification State
  const [alumniVerificationStatus, setAlumniVerificationStatus] = useState<'IDLE' | 'CHECKING' | 'VERIFIED' | 'FAILED'>('IDLE');
  const [alumniVerificationMsg, setAlumniVerificationMsg] = useState('');
  const [alumniMatchedRecord, setAlumniMatchedRecord] = useState<AlumniRecord | null>(null);

  // Group Members Details state (dynamic array for 5+ members)
  interface GroupMemberItem {
    name: string;
    age: string;
    mobile: string;
    fatherOrHusbandName: string;
  }
  const [groupMembers, setGroupMembers] = useState<GroupMemberItem[]>([
    { name: '', age: '', mobile: '', fatherOrHusbandName: '' },
    { name: '', age: '', mobile: '', fatherOrHusbandName: '' },
    { name: '', age: '', mobile: '', fatherOrHusbandName: '' },
    { name: '', age: '', mobile: '', fatherOrHusbandName: '' },
    { name: '', age: '', mobile: '', fatherOrHusbandName: '' },
  ]);

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
      } else if (preSelectedCategory === 'BOYS_DANDIYA') {
        setIsOldStudent(false);
        setIsGroup(false);
        setGender('Male');
        setAge('18');
      } else if (preSelectedCategory === 'FEMALE_15DAY') {
        setIsOldStudent(false);
        setIsGroup(false);
        setGender('Female');
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
              const isBoysCat = category === 'BOYS_DANDIYA';
              const firstAvail = data.slots.find((s: Slot) => {
                if (s.status === 'FULL') return false;
                const isBS = s.batchName.toLowerCase().includes('boys');
                return isBoysCat ? isBS : !isBS;
              });
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
    if (category === 'BOYS_DANDIYA') {
      pricePerPerson = 1600;
    } else if (category === 'FEMALE_15DAY') {
      pricePerPerson = 1800;
    } else if (category === 'KIDS_15DAY') {
      pricePerPerson = 1500;
    } else if (category === 'KIDS') {
      pricePerPerson = 2000;
    } else if (category === 'OLD_STUDENT' || category === 'GROUP') {
      pricePerPerson = 2200;
    }

    const count = isGroup ? Math.max(5, membersCount) : 1;
    const total = pricePerPerson * count;

    return { pricePerPerson, count, total };
  };

  const { pricePerPerson, count, total } = calculatePricing();

  const is15DayBatch = category === 'FEMALE_15DAY' || category === 'KIDS_15DAY' || category === 'BOYS_DANDIYA';
  const activeWorkshopDate = is15DayBatch ? '26th September to 11th October' : '13th September to 11th October';
  const activeWorkshopDateShort = is15DayBatch ? '26th Sept to 11th Oct (15-Day Batch)' : '13th Sept to 11th Oct (1-Month Batch)';

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
      setAlumniVerificationStatus('IDLE');
      setAlumniVerificationMsg('');
      setAlumniMatchedRecord(null);
    } else if (selectedCat === 'GROUP') {
      setIsGroup(true);
      setIsOldStudent(false);
    } else if (selectedCat === 'BOYS_DANDIYA') {
      setIsOldStudent(false);
      setIsGroup(false);
      setGender('Male');
      setAge('18');
    } else if (selectedCat === 'FEMALE_15DAY') {
      setIsOldStudent(false);
      setIsGroup(false);
      setGender('Female');
    } else {
      setIsOldStudent(false);
      setIsGroup(false);
      if (gender === 'Male') {
        setGender('Female');
      }
    }
    setStep(2);
  };

  // Direct manual check for Season 2 alumni
  const handleCheckAlumni = () => {
    setErrorMessage('');
    if (!participantName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!fatherOrHusbandName.trim()) {
      setErrorMessage("Please enter father's or husband's name for verification");
      return;
    }
    const res = verifyAlumni(participantName, fatherOrHusbandName);
    if (res.verified) {
      setAlumniVerificationStatus('VERIFIED');
      setAlumniVerificationMsg(res.message);
      setAlumniMatchedRecord(res.matchedRecord || null);
    } else {
      setAlumniVerificationStatus('FAILED');
      setAlumniVerificationMsg(res.message);
      setErrorMessage(res.message);
    }
  };

  const handleMembersCountChange = (newCount: number) => {
    const count = Math.max(5, newCount);
    setMembersCount(count);
    setGroupMembers((prev) => {
      const updated = [...prev];
      while (updated.length < count) {
        updated.push({ name: '', age: '', mobile: '', fatherOrHusbandName: '' });
      }
      return updated.slice(0, count);
    });
  };

  const handleGroupMemberChange = (index: number, field: 'name' | 'age' | 'mobile' | 'fatherOrHusbandName', value: string) => {
    setGroupMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      if (index === 0) {
        if (field === 'name') {
          setParticipantName(value);
          setGroupLeaderName(value);
        } else if (field === 'mobile') {
          setMobile(value);
          setGroupLeaderPhone(value);
        } else if (field === 'fatherOrHusbandName') {
          setFatherOrHusbandName(value);
        }
      }
      return updated;
    });
  };

  // Regex for 10-digit Indian mobile numbers (must start with 6, 7, 8, or 9)
  const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

  // Step 2 validation
  const validateStep2 = () => {
    setErrorMessage('');

    if (category === 'OLD_STUDENT' || isOldStudent) {
      if (!participantName.trim()) {
        setErrorMessage('Please enter the participant full name');
        return false;
      }
      if (!fatherOrHusbandName.trim()) {
        setErrorMessage("Please enter Father's or Husband's Name for Season 2 Alumni verification");
        return false;
      }
      const cleanMob = mobile.replace(/\D/g, '');
      if (!INDIAN_MOBILE_REGEX.test(cleanMob)) {
        setErrorMessage('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9');
        return false;
      }

      // Check Season 2 Database
      const res = verifyAlumni(participantName, fatherOrHusbandName);
      if (!res.verified) {
        setAlumniVerificationStatus('FAILED');
        setAlumniVerificationMsg(res.message);
        setErrorMessage(res.message);
        return false;
      }

      setAlumniVerificationStatus('VERIFIED');
      setAlumniVerificationMsg(res.message);
      setAlumniMatchedRecord(res.matchedRecord || null);
      return true;
    }

    if (isGroup) {
      if (membersCount < 5) {
        setErrorMessage('Group admission requires a minimum of 5 members');
        return false;
      }

      // Check Member 1 (Lead)
      const mem1 = groupMembers[0];
      const mem1Name = mem1?.name?.trim() || groupLeaderName.trim() || participantName.trim();
      if (!mem1Name) {
        setErrorMessage('Please enter the full name for Member 1 (Group Leader)');
        return false;
      }

      const mem1Mob = (mem1?.mobile || mobile || groupLeaderPhone).replace(/\D/g, '');
      if (!INDIAN_MOBILE_REGEX.test(mem1Mob)) {
        setErrorMessage('Please enter a valid 10-digit mobile number for Member 1 (Group Leader) starting with 6, 7, 8, or 9');
        return false;
      }

      // Validate all group members from index 0 to membersCount - 1
      for (let i = 0; i < membersCount; i++) {
        const member = groupMembers[i];
        if (!member || !member.name.trim()) {
          setErrorMessage(`Please enter the full name for Member ${i + 1}`);
          return false;
        }
        if (member.mobile) {
          const cleanMemMob = member.mobile.replace(/\D/g, '');
          if (cleanMemMob && !INDIAN_MOBILE_REGEX.test(cleanMemMob)) {
            setErrorMessage(`Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9 for Member ${i + 1}`);
            return false;
          }
        }
      }

      return true;
    }

    if (category === 'KIDS' || category === 'KIDS_15DAY') {
      if (!participantName.trim()) {
        setErrorMessage("Please enter the child's full name");
        return false;
      }
      if (!guardianName.trim()) {
        setErrorMessage("Please enter the parent or guardian's full name");
        return false;
      }
      const cleanGuardMob = guardianPhone.replace(/\D/g, '');
      if (!INDIAN_MOBILE_REGEX.test(cleanGuardMob)) {
        setErrorMessage("Please enter a valid 10-digit parent/guardian mobile number starting with 6, 7, 8, or 9");
        return false;
      }
      return true;
    }

    // Default FEMALE / Category
    if (!participantName.trim()) {
      setErrorMessage('Please enter the participant full name');
      return false;
    }

    const cleanMob = mobile.replace(/\D/g, '');
    if (!INDIAN_MOBILE_REGEX.test(cleanMob)) {
      setErrorMessage('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9');
      return false;
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
    const isBoysSlot = selectedSlot.batchName.toLowerCase().includes('boys');
    const isBoysCat = category === 'BOYS_DANDIYA';
    if (isBoysCat && !isBoysSlot) {
      setErrorMessage('Boys Dandiya participants can only register for dedicated Boys Dandiya workshop batches.');
      return false;
    }
    if (!isBoysCat && isBoysSlot) {
      setErrorMessage('This batch is strictly reserved for Boys Dandiya participants. Please choose a Girls Garba batch.');
      return false;
    }

    const remaining = selectedSlot.capacity - selectedSlot.bookedSeats;
    if (remaining < count) {
      setErrorMessage(
        `This batch does not have enough seats available for your selected group size.`
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
      const primaryName = isGroup ? (groupMembers[0]?.name || participantName || groupLeaderName) : participantName;
      const primaryMobile = isGroup ? (groupMembers[0]?.mobile || mobile || groupLeaderPhone) : mobile;
      const primaryFatherHusband = isGroup ? (groupMembers[0]?.fatherOrHusbandName || fatherOrHusbandName) : fatherOrHusbandName;

      // Reserve slot on server atomically
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          participantName: primaryName,
          mobile: primaryMobile,
          whatsapp: whatsapp || primaryMobile,
          email,
          age: isGroup ? (groupMembers[0]?.age || age) : age,
          gender: category === 'KIDS' || category === 'KIDS_15DAY' || category === 'FEMALE' || category === 'FEMALE_15DAY' ? 'Female' : gender,
          city,
          address,
          emergencyName,
          emergencyPhone,
          isKids: category === 'KIDS' || category === 'KIDS_15DAY',
          guardianName,
          guardianPhone,
          childAge: (category === 'KIDS' || category === 'KIDS_15DAY') ? childAge : undefined,
          isOldStudent: category === 'OLD_STUDENT' || isOldStudent,
          fatherOrHusbandName: primaryFatherHusband,
          isGroup,
          membersCount: count,
          groupLeaderName: isGroup ? primaryName : undefined,
          groupLeaderPhone: isGroup ? primaryMobile : undefined,
          groupMembers: isGroup ? groupMembers.slice(0, count) : undefined,
          slotId: selectedSlot?.id,
          locationName: selectedSlot?.locationName,
          batchTime: `${selectedSlot?.batchName}: ${selectedSlot?.startTime} – ${selectedSlot?.endTime}`,
          workshopDate: activeWorkshopDate,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border-2 border-pink-200 rounded-3xl p-3.5 sm:p-7 shadow-2xl my-4 max-h-[94vh] flex flex-col justify-between overflow-hidden">
        
        {/* Top Multi-Color Accent Ribbon */}
        <div className="w-full h-1 bg-gradient-to-r from-pink-500 via-yellow-400 via-emerald-400 to-blue-600 absolute top-0 left-0 right-0"></div>

        {/* Top Ornate Bar */}
        <div className="flex items-center justify-between pb-3 pt-2 mb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="p-[2px] rounded-full bg-gradient-to-tr from-pink-500 via-yellow-400 to-emerald-400 shadow-sm">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-pink-100 flex items-center justify-center p-0.5 overflow-hidden">
                <img src="/images/TFN.png" alt="TFN Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <div>
              <h3 className="text-xs sm:text-base font-heading font-bold text-slate-900 truncate max-w-[220px] sm:max-w-none">
                TFN Garba Raas Dandiya Registration
              </h3>
              <p className="text-[10px] sm:text-[11px] text-pink-600 font-semibold">
                13th Sept – 11th Oct • Kishangarh, Rajasthan
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-950 hover:bg-amber-50 rounded-full transition cursor-pointer"
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
                      ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 shadow-md ring-1 ring-amber-300 scale-105'
                      : step > s.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-100 text-stone-500 border border-stone-300'
                  }`}
                >
                  {step > s.num ? <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> : s.num}
                </div>
                <span
                  className={`hidden sm:inline-block truncate ${
                    step === s.num ? 'text-amber-800 font-bold' : 'text-stone-500'
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                
                {/* 1. Female Admission (1 Month) */}
                <div
                  onClick={() => handleCategorySelect('FEMALE')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    category === 'FEMALE' && !isOldStudent && !isGroup
                      ? 'bg-amber-50/80 border-amber-500 shadow-md ring-1 ring-amber-400'
                      : 'bg-white border-amber-200 hover:border-amber-400'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800">Cat A • Full Month</span>
                      <span className="text-lg font-black font-serif text-amber-600">₹2500</span>
                    </div>
                    <h5 className="text-sm font-bold text-stone-950 mt-1">Female Admission</h5>
                    <p className="text-[11px] text-stone-600 mt-0.5 font-medium">(1 Month • 13 Sep – 11 Oct)</p>
                    <div className="mt-2.5 pt-2 border-t border-stone-200 text-[10px] text-stone-700 space-y-0.5 font-medium">
                      <div>✓ 18 Oct Competition Included</div>
                      <div>✓ Free 1-Day Family Pass</div>
                    </div>
                  </div>
                </div>

                {/* 2. Special Girls Garba (15-Day Batch) */}
                <div
                  onClick={() => handleCategorySelect('FEMALE_15DAY')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    category === 'FEMALE_15DAY'
                      ? 'bg-amber-100/90 border-amber-500 shadow-md ring-1 ring-amber-400'
                      : 'bg-white border-amber-200 hover:border-amber-400'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full">15-Day Fast Track</span>
                      <span className="text-lg font-black font-serif text-amber-900">₹1800</span>
                    </div>
                    <h5 className="text-sm font-bold text-stone-950 mt-1">Special Girls Garba</h5>
                    <p className="text-[11px] text-amber-800 font-bold mt-0.5">(15 Days • 26 Sep – 11 Oct)</p>
                    <div className="mt-2.5 pt-2 border-t border-stone-200 text-[10px] text-stone-700 space-y-0.5 font-medium">
                      <div>✓ 2 Fast-Track Patterns Taught</div>
                      <div>✓ Free 1-Day Family Pass</div>
                    </div>
                  </div>
                </div>

                {/* 3. Kids 15-Day Special Workshop (₹1500) */}
                <div
                  onClick={() => handleCategorySelect('KIDS_15DAY')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    category === 'KIDS_15DAY'
                      ? 'bg-emerald-100/90 border-emerald-500 shadow-md ring-2 ring-emerald-400'
                      : 'bg-white border-emerald-300 hover:border-emerald-500'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-200 px-2 py-0.5 rounded-full">Kids Special • ₹1500</span>
                      <span className="text-lg font-black font-serif text-emerald-700">₹1500</span>
                    </div>
                    <h5 className="text-sm font-bold text-stone-950 mt-1">Kids 15-Day Workshop</h5>
                    <p className="text-[11px] text-emerald-800 font-bold mt-0.5">(Age 7–16 • 26 Sep – 11 Oct)</p>
                    <div className="mt-2.5 pt-2 border-t border-stone-200 text-[10px] text-stone-700 space-y-0.5 font-medium">
                      <div>✓ Special 15 Days Fast-Track Batch</div>
                      <div>✓ Princess Title Eligibility</div>
                      <div>✓ Free 1-Day Family Pass</div>
                    </div>
                  </div>
                </div>

                {/* 4. Kids Girls (1 Month Workshop) */}
                <div
                  onClick={() => handleCategorySelect('KIDS')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    category === 'KIDS'
                      ? 'bg-garba-teal-50/80 border-garba-teal-500 shadow-md ring-1 ring-teal-400'
                      : 'bg-white border-garba-teal-200 hover:border-garba-teal-400'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-garba-teal-700">Cat C • Full Month</span>
                      <span className="text-lg font-black font-serif text-garba-teal-700">₹2000</span>
                    </div>
                    <h5 className="text-sm font-bold text-maroon-950 mt-1">Kids Girls (1 Month)</h5>
                    <p className="text-[11px] text-stone-600 mt-0.5 font-medium">(Age 7–16 • 13 Sep – 11 Oct)</p>
                    <div className="mt-2.5 pt-2 border-t border-stone-200 text-[10px] text-stone-700 space-y-0.5 font-medium">
                      <div>✓ Full 30-Day Comprehensive Learning</div>
                      <div>✓ Princess Title Eligibility</div>
                    </div>
                  </div>
                </div>

                {/* 5. Season 2 Alumni (Old Student) */}
                <div
                  onClick={() => handleCategorySelect('OLD_STUDENT')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    category === 'OLD_STUDENT' || (isOldStudent && !isGroup)
                      ? 'bg-amber-100/90 border-amber-500 shadow-md ring-2 ring-amber-400'
                      : 'bg-white border-amber-300 hover:border-amber-400'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full">Season 2 Alumni</span>
                      <span className="text-lg font-black font-serif text-amber-900">₹2200</span>
                    </div>
                    <h5 className="text-sm font-bold text-stone-950 mt-1.5">Old TFN Student</h5>
                    <p className="text-[11px] text-amber-800 font-bold mt-0.5">₹300 Alumni Discount</p>
                    <div className="mt-2.5 pt-2 border-t border-stone-200 text-[10px] text-stone-700 space-y-0.5 font-medium">
                      <div>✓ Season 2 Database Verified</div>
                      <div>✓ Free 1-Day Family Pass</div>
                    </div>
                  </div>
                </div>

                {/* 6. Group Admission (5+ Members) */}
                <div
                  onClick={() => handleCategorySelect('GROUP')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    isGroup && !isOldStudent
                      ? 'bg-garba-orange-50/80 border-garba-orange-500 shadow-md ring-1 ring-garba-orange-400'
                      : 'bg-white border-garba-orange-200 hover:border-garba-orange-400'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-garba-orange-700">Group 5+</span>
                      <span className="text-lg font-black font-serif text-garba-orange-600">₹2200</span>
                    </div>
                    <h5 className="text-sm font-bold text-maroon-950 mt-1">Group Booking</h5>
                    <p className="text-[11px] text-garba-orange-800 font-bold mt-0.5">(Minimum 5 Members)</p>
                    <div className="mt-2.5 pt-2 border-t border-stone-200 text-[10px] text-stone-700 space-y-0.5 font-medium">
                      <div>✓ ₹300 Off per person</div>
                      <div>✓ Free Family Pass for all</div>
                    </div>
                  </div>
                </div>

                {/* 7. Boys Dandiya Special */}
                <div
                  onClick={() => handleCategorySelect('BOYS_DANDIYA')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    category === 'BOYS_DANDIYA'
                      ? 'bg-red-50/90 border-red-500 shadow-md ring-1 ring-red-400'
                      : 'bg-white border-red-200 hover:border-red-400'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-700">Cat D • New</span>
                      <span className="text-lg font-black font-serif text-red-600">₹1600</span>
                    </div>
                    <h5 className="text-sm font-bold text-maroon-950 mt-1">Boys Dandiya</h5>
                    <p className="text-[11px] text-red-700 mt-0.5 font-bold">(Age 8–40 Years • 26 Sep–11 Oct)</p>
                    <div className="mt-2.5 pt-2 border-t border-stone-200 text-[10px] text-stone-700 space-y-0.5 font-medium">
                      <div>✓ 15 Days Workshop</div>
                      <div>✓ 19 Oct Open Competition</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Group Configuration if Group chosen */}
              {isGroup && !isOldStudent && (
                <div className="p-4 rounded-xl bg-garba-orange-50 border-2 border-garba-orange-300 mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h6 className="text-xs font-bold text-garba-orange-900 uppercase tracking-wide">
                        Group Booking: Number of Members (Minimum 5)
                      </h6>
                      <p className="text-[11px] text-stone-600 font-medium">₹2200 per member • All member details collected in next step</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleMembersCountChange(membersCount - 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-garba-orange-300 text-garba-orange-900 font-bold shadow-sm cursor-pointer hover:bg-garba-orange-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-black text-maroon-950 text-base">
                        {membersCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleMembersCountChange(membersCount + 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-garba-orange-300 text-garba-orange-900 font-bold shadow-sm cursor-pointer hover:bg-garba-orange-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-garba-orange-200 flex justify-between items-center text-xs">
                    <span className="text-stone-700 font-medium">Total Group Payable ({membersCount} Members):</span>
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
                  {isGroup
                    ? `Step 2: Group Member Details (${membersCount} Members)`
                    : category === 'GROUP' && !isOldStudent
                    ? 'Step 2: Group & Member Details'
                    : category === 'KIDS' || category === 'KIDS_15DAY'
                    ? 'Step 2: Kids Participant & Parent Details'
                    : 'Step 2: Participant Information'}
                </h4>
                <p className="text-xs text-stone-600 font-medium">
                  {isGroup
                    ? `Please enter the individual details of each member (${membersCount} members) in your group.`
                    : (category === 'OLD_STUDENT' || isOldStudent)
                    ? "Please enter your name and Father's / Husband's Name for TFN alumni verification."
                    : 'Please enter participant details accurately for the official entry pass.'}
                </p>
              </div>

              {/* ================= GROUP (5+ MEMBERS) DYNAMIC FORM ================= */}
              {isGroup ? (
                <div className="space-y-4">
                  {/* Group Coordinator Info Banner */}
                  <div className="p-3.5 rounded-2xl bg-garba-orange-50 border-2 border-garba-orange-300 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-garba-orange-900 uppercase tracking-wide">
                        Group Coordinator & Address Info
                      </span>
                      <span className="text-[11px] font-bold text-garba-orange-800 bg-white px-2.5 py-0.5 rounded-full border border-garba-orange-300">
                        {membersCount} Members Total
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block text-maroon-950 font-bold mb-1">
                          Group WhatsApp (For Updates)
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-2.5 bg-stone-100 border-2 border-r-0 border-stone-200 rounded-l-xl text-maroon-950 font-mono font-bold text-xs">
                            +91
                          </span>
                          <input
                            type="tel"
                            maxLength={10}
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ''))}
                            placeholder="WhatsApp Number"
                            className="w-full bg-white border-2 border-stone-200 rounded-r-xl px-3 py-2 text-maroon-950 text-xs focus:outline-none focus:border-garba-orange-500 font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-maroon-950 font-bold mb-1">City</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Kishangarh"
                          className="w-full bg-white border-2 border-stone-200 rounded-xl px-3 py-2 text-maroon-950 text-xs focus:outline-none focus:border-garba-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-maroon-950 font-bold mb-1">Local Address / Area</label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="e.g. Madanganj, Kishangarh"
                          className="w-full bg-white border-2 border-stone-200 rounded-xl px-3 py-2 text-maroon-950 text-xs focus:outline-none focus:border-garba-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Individual Member Cards */}
                  <div className="space-y-3 max-h-[48vh] overflow-y-auto pr-1">
                    {Array.from({ length: membersCount }).map((_, idx) => {
                      const member = groupMembers[idx] || { name: '', age: '', mobile: '', fatherOrHusbandName: '' };
                      const isLead = idx === 0;

                      return (
                        <div
                          key={idx}
                          className={`p-3.5 rounded-2xl border-2 transition-all ${
                            isLead
                              ? 'bg-amber-50/60 border-amber-400 shadow-sm'
                              : 'bg-stone-50 border-stone-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2.5">
                            <span className="text-xs font-black text-maroon-950 flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-[10px] font-black">
                                {idx + 1}
                              </span>
                              <span>Member {idx + 1}</span>
                              {isLead && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold uppercase tracking-wide">
                                  Group Leader / Primary
                                </span>
                              )}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
                            {/* Member Name */}
                            <div className="sm:col-span-2">
                              <label className="block text-maroon-950 font-bold mb-1">
                                Member Full Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={member.name}
                                onChange={(e) => handleGroupMemberChange(idx, 'name', e.target.value)}
                                placeholder={`e.g. ${isLead ? 'Pooja Sharma (Leader)' : `Member ${idx + 1} Name`}`}
                                className="w-full bg-white border-2 border-stone-200 rounded-xl px-3 py-2 text-maroon-950 placeholder-stone-400 text-xs focus:outline-none focus:border-garba-orange-500"
                                required
                              />
                            </div>

                            {/* Father's or Husband's Name */}
                            <div className="sm:col-span-2">
                              <label className="block text-maroon-950 font-bold mb-1">
                                Father's / Husband's Name
                              </label>
                              <input
                                type="text"
                                value={member.fatherOrHusbandName}
                                onChange={(e) => handleGroupMemberChange(idx, 'fatherOrHusbandName', e.target.value)}
                                placeholder="Father or Husband Name"
                                className="w-full bg-white border-2 border-stone-200 rounded-xl px-3 py-2 text-maroon-950 placeholder-stone-400 text-xs focus:outline-none focus:border-garba-orange-500"
                              />
                            </div>

                            {/* Mobile */}
                            <div className="sm:col-span-2">
                              <label className="block text-maroon-950 font-bold mb-1">
                                Mobile Number {isLead ? <span className="text-red-500">*</span> : <span className="text-stone-500 font-normal">(Optional)</span>}
                              </label>
                              <div className="flex">
                                <span className="inline-flex items-center px-2.5 bg-stone-100 border-2 border-r-0 border-stone-200 rounded-l-xl text-maroon-950 font-mono font-bold text-xs">
                                  +91
                                </span>
                                <input
                                  type="tel"
                                  maxLength={10}
                                  value={member.mobile}
                                  onChange={(e) => handleGroupMemberChange(idx, 'mobile', e.target.value.replace(/\D/g, ''))}
                                  placeholder={isLead ? '9829012345 (Leader Phone)' : 'Mobile (optional)'}
                                  className="w-full bg-white border-2 border-stone-200 rounded-r-xl px-3 py-2 text-maroon-950 placeholder-stone-400 text-xs focus:outline-none focus:border-garba-orange-500 font-mono"
                                  required={isLead}
                                />
                              </div>
                            </div>

                            {/* Age */}
                            <div className="sm:col-span-2">
                              <label className="block text-maroon-950 font-bold mb-1">Age</label>
                              <input
                                type="number"
                                min={10}
                                max={80}
                                value={member.age}
                                onChange={(e) => handleGroupMemberChange(idx, 'age', e.target.value)}
                                placeholder="e.g. 22"
                                className="w-full bg-white border-2 border-stone-200 rounded-xl px-3 py-2 text-maroon-950 text-xs focus:outline-none focus:border-garba-orange-500"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* ================= SINGLE PARTICIPANT (ALUMNI / FEMALE / KIDS) FORM ================= */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-maroon-950 font-bold mb-1">
                      {category === 'KIDS' || category === 'KIDS_15DAY' ? 'Child Full Name (Girl)' : 'Participant Full Name'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={participantName}
                      onChange={(e) => {
                        setParticipantName(e.target.value);
                        if (category === 'OLD_STUDENT') setAlumniVerificationStatus('IDLE');
                      }}
                      placeholder="e.g. Pooja Sharma"
                      className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-maroon-950 placeholder-stone-400 text-xs focus:outline-none focus:border-amber-500 font-medium"
                      required
                    />
                  </div>

                  {/* Father's or Husband's Name (PROMINENT & MANDATORY FOR ALUMNI WITH VERIFICATION) */}
                  {(category === 'OLD_STUDENT' || isOldStudent) && (
                    <div className="sm:col-span-2 p-3.5 sm:p-4 rounded-2xl bg-amber-50 border-2 border-amber-400 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <label className="block text-amber-950 font-black text-xs">
                          Father's or Husband's Name <span className="text-red-600">*</span>
                        </label>
                        <span className="text-[10px] uppercase font-extrabold text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full border border-amber-300">
                          Season 2 Alumni Check
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={fatherOrHusbandName}
                          onChange={(e) => {
                            setFatherOrHusbandName(e.target.value);
                            setAlumniVerificationStatus('IDLE');
                          }}
                          placeholder="e.g. Mukesh Chhaparwal / Prakash Chand"
                          className="flex-1 bg-white border-2 border-amber-300 rounded-xl px-3.5 py-2 text-stone-950 placeholder-stone-400 text-xs focus:outline-none focus:border-amber-600 font-semibold"
                          required
                        />
                        <button
                          type="button"
                          onClick={handleCheckAlumni}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-black transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer flex-shrink-0"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Verify Record</span>
                        </button>
                      </div>

                      {/* Verification Status Feedback Banners */}
                      {alumniVerificationStatus === 'VERIFIED' && (
                        <div className="p-3 rounded-xl bg-emerald-100/90 border-2 border-emerald-500 text-emerald-950 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <div className="font-extrabold text-emerald-900">
                              ✓ Season 2 Alumni Verified!
                            </div>
                            <p className="text-[11px] text-emerald-800 font-medium">
                              {alumniVerificationMsg}
                            </p>
                            <div className="text-[11px] font-bold text-emerald-900 pt-0.5">
                              🎉 ₹300 Special Alumni Discount Applied (Payable Fee: ₹2200)
                            </div>
                          </div>
                        </div>
                      )}

                      {alumniVerificationStatus === 'FAILED' && (
                        <div className="p-3.5 rounded-xl bg-red-50 border-2 border-red-400 text-red-950 text-xs space-y-2 animate-in fade-in duration-200">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="font-black text-red-900">
                                ⚠️ Not Listed in Season 2 Alumni Records
                              </div>
                              <p className="text-[11px] text-red-800 mt-0.5 leading-relaxed font-medium">
                                We could not match "{participantName}" with Father/Husband "{fatherOrHusbandName}" in the Season 2 database.
                              </p>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-red-200 flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleCategorySelect('FEMALE')}
                              className="py-1.5 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] transition cursor-pointer shadow-xs"
                            >
                              Switch to Standard Female (₹2500)
                            </button>
                            <a
                              href="tel:8385969285"
                              className="py-1.5 px-3 rounded-lg bg-white border border-red-300 text-red-900 hover:bg-red-100 font-bold text-[11px] transition flex items-center gap-1"
                            >
                              Call Neel Sir for Help (+91 8385969285)
                            </a>
                          </div>
                        </div>
                      )}

                      {alumniVerificationStatus === 'IDLE' && (
                        <p className="text-[10px] text-stone-600 font-medium">
                          ℹ️ Enter your name & father/husband name as recorded in Season 2. Matching unlocks the ₹2200 alumni rate.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Father's or Husband's Name (Optional for General Female) */}
                  {category === 'FEMALE' && !isOldStudent && (
                    <div className="sm:col-span-2">
                      <label className="block text-maroon-950 font-bold mb-1">
                        Father's or Husband's Name <span className="text-stone-500 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={fatherOrHusbandName}
                        onChange={(e) => setFatherOrHusbandName(e.target.value)}
                        placeholder="e.g. Shri Rajesh Sharma"
                        className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-maroon-950 placeholder-stone-400 text-xs focus:outline-none focus:border-amber-500 font-medium"
                      />
                    </div>
                  )}

                  {/* Primary Mobile */}
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
                        className="w-full bg-stone-50 border-2 border-stone-200 rounded-r-xl px-3.5 py-2.5 text-maroon-950 placeholder-stone-400 text-xs focus:outline-none focus:border-amber-500 font-mono"
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
                        className="w-full bg-stone-50 border-2 border-stone-200 rounded-r-xl px-3.5 py-2.5 text-maroon-950 placeholder-stone-400 text-xs focus:outline-none focus:border-amber-500 font-mono"
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
                      className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-maroon-950 placeholder-stone-400 text-xs focus:outline-none focus:border-amber-500"
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
                        min={category === 'KIDS' || category === 'KIDS_15DAY' ? 7 : 14}
                        max={category === 'KIDS' || category === 'KIDS_15DAY' ? 16 : 80}
                        value={category === 'KIDS' || category === 'KIDS_15DAY' ? childAge : age}
                        onChange={(e) => {
                          if (category === 'KIDS' || category === 'KIDS_15DAY') setChildAge(e.target.value);
                          else setAge(e.target.value);
                        }}
                        className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3 py-2.5 text-maroon-950 text-xs focus:outline-none focus:border-amber-500 font-bold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-maroon-950 font-bold mb-1">Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3 py-2.5 text-maroon-950 text-xs focus:outline-none focus:border-amber-500 font-medium"
                      >
                        <option value="Female">Female</option>
                        {category !== 'KIDS' && category !== 'KIDS_15DAY' && category !== 'FEMALE' && category !== 'FEMALE_15DAY' && <option value="Male">Male</option>}
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
                      className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-maroon-950 placeholder-stone-400 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-maroon-950 font-bold mb-1">Local Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Madanganj, Kishangarh"
                      className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3.5 py-2.5 text-maroon-950 placeholder-stone-400 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* CONDITIONAL: KIDS SPECIFIC */}
                  {(category === 'KIDS' || category === 'KIDS_15DAY') && (
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
                            placeholder="e.g. Sunita Sharma / Rajesh Sharma"
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

                </div>
              )}
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

              {/* Dynamic Workshop Dates Banner */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs">
                <div className="flex items-center gap-2 text-maroon-950 font-bold">
                  <Calendar className="w-4 h-4 text-garba-orange-600 flex-shrink-0" />
                  <span>Workshop Duration: <strong>{activeWorkshopDate}</strong></span>
                </div>
                <span className="text-[11px] font-extrabold text-amber-900 px-2.5 py-0.5 rounded-full bg-amber-200/80 border border-amber-400">
                  {is15DayBatch ? '15-Day Fast-Track' : '1-Month Full Workshop'}
                </span>
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
                    const isBoysSlot = slot.batchName.toLowerCase().includes('boys');
                    const isBoysCat = category === 'BOYS_DANDIYA';
                    const isGenderMismatch = (isBoysCat && !isBoysSlot) || (!isBoysCat && isBoysSlot);
                    const isDisabled = isFull || isGenderMismatch;
                    const isSelected = selectedSlot?.id === slot.id;

                    const handleSlotClick = () => {
                      if (isGenderMismatch) {
                        if (isBoysCat) {
                          setErrorMessage('Boys Dandiya participants can only register for dedicated Boys Dandiya batches.');
                        } else {
                          setErrorMessage('This batch is strictly reserved for Boys Dandiya participants. Please select a Girls Garba batch.');
                        }
                        return;
                      }
                      if (!isFull) {
                        setErrorMessage('');
                        setSelectedSlot(slot);
                      }
                    };

                    return (
                      <div
                        key={slot.id}
                        onClick={handleSlotClick}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isFull
                            ? 'bg-stone-50 border-stone-300 opacity-60 cursor-not-allowed'
                            : isGenderMismatch
                            ? 'bg-stone-50 border-red-200 opacity-75'
                            : isSelected
                            ? 'bg-amber-50/90 border-amber-500 shadow-md ring-1 ring-amber-400'
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
                            ) : isGenderMismatch ? (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-800 border border-red-300 font-bold">
                                {isBoysSlot ? 'Boys Only' : 'Girls Only'}
                              </span>
                            ) : slot.status === 'ALMOST_FULL' ? (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-bold">
                                Few Spots Left
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
                            Batch Timing: {slot.startTime}
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
                      {isGroup ? (groupMembers[0]?.name || participantName || 'Group Registration') : participantName}
                    </h5>
                    <p className="text-xs text-stone-600 font-mono">
                      +91 {isGroup ? (groupMembers[0]?.mobile || mobile) : mobile}
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs text-garba-orange-800 hover:underline font-bold cursor-pointer"
                  >
                    Edit Details →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
                  <div>
                    <span className="text-stone-500 block text-[11px] font-semibold">Category:</span>
                    <strong className="text-maroon-950">
                      {category === 'FEMALE' && 'Female Admission Fee (1 Month)'}
                      {category === 'FEMALE_15DAY' && 'Special Girls Garba (15-Day Batch)'}
                      {category === 'BOYS_DANDIYA' && 'Boys Dandiya Workshop'}
                      {(category === 'OLD_STUDENT' || isOldStudent) && 'Old TFN Student (Alumni)'}
                      {isGroup && `Group Registration (${count} Members)`}
                      {category === 'KIDS' && `Kids Girls (1-Month Batch)`}
                      {category === 'KIDS_15DAY' && `Kids Girls (15-Day Special Batch • ₹1500)`}
                    </strong>
                  </div>

                  <div>
                    <span className="text-stone-500 block text-[11px] font-semibold">Workshop Dates:</span>
                    <strong className="text-maroon-950">{activeWorkshopDateShort}</strong>
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

                  {/* Show Father/Husband Name for Alumni */}
                  {(category === 'OLD_STUDENT' || isOldStudent || fatherOrHusbandName) && (
                    <div className="sm:col-span-2">
                      <span className="text-stone-500 block text-[11px] font-semibold">Father's / Husband's Name:</span>
                      <strong className="text-stone-950 font-bold">{fatherOrHusbandName || groupMembers[0]?.fatherOrHusbandName || 'N/A'}</strong>
                    </div>
                  )}
                </div>

                {/* Group Members List Summary */}
                {isGroup && (
                  <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                    <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wide block">
                      Enrolled Group Members ({count} Participants):
                    </span>
                    <div className="divide-y divide-stone-100 text-xs max-h-36 overflow-y-auto pr-1">
                      {groupMembers.slice(0, count).map((mem, idx) => (
                        <div key={idx} className="py-1.5 flex justify-between items-center">
                          <div>
                            <span className="font-bold text-stone-900">
                              {idx + 1}. {mem.name || `Member ${idx + 1}`}
                            </span>
                            {mem.fatherOrHusbandName && (
                              <span className="text-stone-500 text-[10px] block">
                                S/O, D/O, W/O: {mem.fatherOrHusbandName}
                              </span>
                            )}
                          </div>
                          <div className="text-right text-[11px] text-stone-600">
                            {mem.mobile ? `+91 ${mem.mobile}` : ''} {mem.age ? `(Age ${mem.age})` : ''}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
                  <div className="flex justify-between text-base font-bold text-stone-950 pt-2 border-t border-stone-200">
                    <span>Total Payable Amount:</span>
                    <span className="text-2xl font-sans font-black text-pink-600 tracking-tight">₹{total}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 5: SECURE PAYMENT GATEWAY ================= */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="text-center mb-2">
                <h4 className="text-xl font-heading font-black text-slate-900">
                  Complete Online Payment
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Registration ID: <span className="font-mono font-bold text-slate-900">{createdRegistration?.id}</span>
                </p>
              </div>

              {/* Minimal & Clean Payment Card */}
              <div className="p-5 sm:p-7 rounded-2xl bg-white border-2 border-slate-200 shadow-lg space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      TOTAL PAYABLE AMOUNT
                    </span>
                    <h5 className="text-sm sm:text-base font-bold text-slate-800 mt-0.5">
                      {createdRegistration?.categoryLabel || 'Workshop Admission Fee'}
                    </h5>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl sm:text-4xl font-sans font-black text-pink-600 tracking-tight">
                      ₹{total}
                    </span>
                  </div>
                </div>

                {/* Direct Pay Gateway Button */}
                <button
                  type="button"
                  onClick={handleRazorpayPayment}
                  disabled={isRazorpayLoading}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-black text-sm sm:text-base shadow-xl shadow-pink-500/25 hover:brightness-105 active:scale-[0.99] transition flex items-center justify-center gap-2.5 cursor-pointer ring-2 ring-pink-300"
                >
                  {isRazorpayLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                  )}
                  <span>PAY ₹{total} SECURELY NOW</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>256-Bit Bank Grade Encrypted Payment Gateway</span>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 6: CONFIRMATION & PDF RECEIPT ================= */}
          {step === 6 && createdRegistration && (
            <div className="space-y-4 text-center py-2">
              
              {/* Festive Big Check Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center mx-auto shadow-md animate-bounce">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <h4 className="text-2xl sm:text-3xl font-serif font-black text-stone-950">
                REGISTRATION SUCCESSFUL!
              </h4>
              <p className="text-xs sm:text-sm text-amber-800 font-bold">
                Welcome to the TFN Garba Raas Dandiya Workshop • Kishangarh
              </p>

              {/* Official Registration Badge Card */}
              <div className="p-5 rounded-2xl bg-stone-50 border-2 border-emerald-400 text-left max-w-lg mx-auto shadow-sm space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-[10px] uppercase font-extrabold text-stone-500">Registration ID</span>
                  <span className="text-lg font-mono font-black text-amber-800">
                    {createdRegistration.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-stone-500 text-[11px] font-semibold block">Participant:</span>
                    <strong className="text-stone-950">{createdRegistration.participantName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[11px] font-semibold block">Category:</span>
                    <strong className="text-stone-950">{createdRegistration.categoryLabel}</strong>
                  </div>
                  {createdRegistration.fatherOrHusbandName && (
                    <div>
                      <span className="text-stone-500 text-[11px] font-semibold block">Father's / Husband's Name:</span>
                      <strong className="text-stone-950">{createdRegistration.fatherOrHusbandName}</strong>
                    </div>
                  )}
                  {createdRegistration.isGroup && (
                    <div>
                      <span className="text-stone-500 text-[11px] font-semibold block">Group Size:</span>
                      <strong className="text-amber-800 font-bold">{createdRegistration.membersCount} Members Enrolled</strong>
                    </div>
                  )}
                  <div>
                    <span className="text-stone-500 text-[11px] font-semibold block">Hall Location:</span>
                    <strong className="text-stone-950">{createdRegistration.locationName}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[11px] font-semibold block">Batch Timing:</span>
                    <strong className="text-amber-800 font-extrabold">{createdRegistration.batchTime}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[11px] font-semibold block">Amount Paid:</span>
                    <strong className="text-stone-950">₹{createdRegistration.totalAmount}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[11px] font-semibold block">Status:</span>
                    <strong className="text-amber-800 font-extrabold">PAYMENT SUBMITTED</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200 text-center">
                  <span className="text-[11px] text-amber-800 font-extrabold">
                    ★ FREE FAMILY PASS INCLUDED WITH THIS PASS ★
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
                <button
                  onClick={() => downloadRegistrationReceipt(createdRegistration)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 font-black text-xs sm:text-sm ring-1 ring-amber-300 hover:brightness-105 transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
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
                className="px-4 py-2 rounded-xl bg-stone-100 border border-stone-300 text-stone-950 text-xs font-bold hover:bg-stone-200 transition flex items-center gap-1 cursor-pointer"
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
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 text-xs sm:text-sm font-black ring-1 ring-amber-300 hover:brightness-105 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
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
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 text-xs sm:text-sm font-black ring-1 ring-amber-300 hover:brightness-105 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
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
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 text-xs sm:text-sm font-black ring-1 ring-amber-300 hover:brightness-105 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
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
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 text-xs sm:text-sm font-black ring-1 ring-amber-300 hover:brightness-105 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></div>
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
