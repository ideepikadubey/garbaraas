import { NextResponse } from 'next/server';
import { getRegistrations, createRegistrationAtomic, getAdminSettings } from '@/lib/db';
import { CategoryType } from '@/lib/types';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || undefined;
    const category = searchParams.get('category') || undefined;
    const location = searchParams.get('location') || undefined;
    const paymentStatus = searchParams.get('paymentStatus') || undefined;
    const bookingStatus = searchParams.get('bookingStatus') || undefined;

    const registrations = await getRegistrations({
      search,
      category,
      location,
      paymentStatus,
      bookingStatus,
    });

    return NextResponse.json({ success: true, registrations });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      category,
      participantName,
      mobile,
      whatsapp,
      email,
      age,
      gender,
      city,
      address,
      emergencyName,
      emergencyPhone,
      isKids,
      guardianName,
      guardianPhone,
      childAge,
      isOldStudent,
      isGroup,
      membersCount,
      groupLeaderName,
      groupLeaderPhone,
      slotId,
      locationName,
      batchTime,
      workshopDate,
    } = body;

    // 1. Validation
    if (!participantName || !participantName.trim()) {
      return NextResponse.json({ success: false, error: 'Participant name is required' }, { status: 400 });
    }

    const cleanMobile = (mobile || '').replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      return NextResponse.json({ success: false, error: 'Please enter a valid 10-digit Indian mobile number' }, { status: 400 });
    }

    if (!slotId) {
      return NextResponse.json({ success: false, error: 'Please select a workshop location and batch slot' }, { status: 400 });
    }

    // Kids validations
    if (category === 'KIDS') {
      if (!guardianName || !guardianName.trim()) {
        return NextResponse.json({ success: false, error: "Parent or Guardian's name is required for kids category" }, { status: 400 });
      }
      const cleanGuardianPhone = (guardianPhone || '').replace(/\D/g, '');
      if (cleanGuardianPhone.length !== 10) {
        return NextResponse.json({ success: false, error: "Parent or Guardian's 10-digit mobile number is required" }, { status: 400 });
      }
    }

    // Group validations
    const numMembers = isGroup ? Math.max(5, parseInt(membersCount, 10) || 5) : 1;
    if (isGroup && numMembers < 5) {
      return NextResponse.json({ success: false, error: 'Group registrations require a minimum of 5 members' }, { status: 400 });
    }

    // Pricing calculation
    const settings = await getAdminSettings();
    let feePerPerson = settings.priceFemale; // Default 2500
    let categoryLabel = 'Female Admission Fee';

    if (category === 'KIDS') {
      feePerPerson = settings.priceKids; // 2000
      categoryLabel = 'Kids Girls (7–16 Years)';
    } else if (category === 'GROUP') {
      feePerPerson = settings.priceOldStudentGroup; // 2200
      categoryLabel = `Group Registration (${numMembers} Members)`;
    } else if (category === 'OLD_STUDENT') {
      feePerPerson = settings.priceOldStudentGroup; // 2200
      categoryLabel = 'Old TFN Student Admission';
    }

    const totalAmount = feePerPerson * numMembers;

    // 2. Perform Atomic Reservation
    const result = await createRegistrationAtomic({
      category: category as CategoryType,
      categoryLabel,
      participantName: participantName.trim(),
      mobile: cleanMobile,
      whatsapp: (whatsapp || cleanMobile).replace(/\D/g, ''),
      email: (email || '').trim().toLowerCase(),
      age: parseInt(age, 10) || 20,
      gender: gender || (category === 'FEMALE' || category === 'KIDS' ? 'Female' : 'Female'),
      city: city ? city.trim() : 'Kishangarh',
      address: (address || '').trim(),
      emergencyName: (emergencyName || '').trim(),
      emergencyPhone: (emergencyPhone || '').replace(/\D/g, ''),
      isKids: !!isKids,
      guardianName: (guardianName || '').trim(),
      guardianPhone: (guardianPhone || '').replace(/\D/g, ''),
      childAge: childAge ? parseInt(childAge, 10) : undefined,
      isOldStudent: !!isOldStudent,
      isGroup: !!isGroup,
      membersCount: numMembers,
      groupLeaderName: (groupLeaderName || '').trim(),
      groupLeaderPhone: (groupLeaderPhone || '').replace(/\D/g, ''),
      slotId,
      locationName: locationName || 'TFN Studio',
      batchTime: batchTime || 'Batch Slot',
      workshopDate: workshopDate || settings.workshopDates,
      feePerPerson,
      totalAmount,
      hasFreeFamilyPass: true,
      paymentStatus: 'PAYMENT_PENDING',
      bookingStatus: 'PENDING',
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 409 });
    }

    return NextResponse.json({
      success: true,
      registration: result.registration,
      message: 'Slot reserved successfully. Please proceed to payment.',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
