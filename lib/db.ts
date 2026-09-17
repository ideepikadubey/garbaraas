import fs from 'fs';
import path from 'path';
import { Slot, Registration, AdminSettings, SlotStatus, PaymentStatus, BookingStatus } from './types';
import { supabase } from './supabase';

interface DatabaseSchema {
  slots: Slot[];
  registrations: Registration[];
  settings: AdminSettings;
}

// Default Seed Slots matching Poster 4
const DEFAULT_SLOTS: Slot[] = [
  {
    id: 'slot-tfn-1',
    locationId: 'loc-tfn',
    locationName: 'TFN Studio',
    locationAddress: 'The Frozen Night Dance Academy Studio, Kishangarh',
    batchName: 'Batch 1',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    capacity: 35,
    bookedSeats: 0,
    status: 'AVAILABLE',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'slot-tfn-2',
    locationId: 'loc-tfn',
    locationName: 'TFN Studio',
    locationAddress: 'The Frozen Night Dance Academy Studio, Kishangarh',
    batchName: 'Batch 2',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    capacity: 35,
    bookedSeats: 0,
    status: 'AVAILABLE',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'slot-bang-1',
    locationId: 'loc-bang',
    locationName: 'Bang Marriage Hall',
    locationAddress: 'Near City Station, Kishangarh',
    batchName: 'Batch 1',
    startTime: '12:00 PM',
    endTime: '01:00 PM',
    capacity: 50,
    bookedSeats: 0,
    status: 'AVAILABLE',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'slot-bang-2',
    locationId: 'loc-bang',
    locationName: 'Bang Marriage Hall',
    locationAddress: 'Near City Station, Kishangarh',
    batchName: 'Batch 2',
    startTime: '01:00 PM',
    endTime: '02:00 PM',
    capacity: 50,
    bookedSeats: 0,
    status: 'AVAILABLE',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'slot-bang-3',
    locationId: 'loc-bang',
    locationName: 'Bang Marriage Hall',
    locationAddress: 'Near City Station, Kishangarh',
    batchName: 'Batch 3',
    startTime: '02:00 PM',
    endTime: '03:00 PM',
    capacity: 50,
    bookedSeats: 0,
    status: 'AVAILABLE',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'slot-bang-4',
    locationId: 'loc-bang',
    locationName: 'Bang Marriage Hall',
    locationAddress: 'Near City Station, Kishangarh',
    batchName: 'Batch 4',
    startTime: '03:00 PM',
    endTime: '04:00 PM',
    capacity: 50,
    bookedSeats: 0,
    status: 'AVAILABLE',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'slot-bang-5',
    locationId: 'loc-bang',
    locationName: 'Bang Marriage Hall',
    locationAddress: 'Near City Station, Kishangarh',
    batchName: 'Batch 5',
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    capacity: 50,
    bookedSeats: 0,
    status: 'AVAILABLE',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'slot-cricket-1',
    locationId: 'loc-cricket',
    locationName: 'Cricket Academy (Turf, Kishangarh)',
    locationAddress: 'Opposite Crystal Park, Kishangarh',
    batchName: 'Batch 1',
    startTime: '06:00 PM',
    endTime: '07:00 PM',
    capacity: 60,
    bookedSeats: 0,
    status: 'AVAILABLE',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'slot-cricket-2',
    locationId: 'loc-cricket',
    locationName: 'Cricket Academy (Turf, Kishangarh)',
    locationAddress: 'Opposite Crystal Park, Kishangarh',
    batchName: 'Batch 2',
    startTime: '07:00 PM',
    endTime: '08:00 PM',
    capacity: 60,
    bookedSeats: 0,
    status: 'AVAILABLE',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'slot-bang-eve-1',
    locationId: 'loc-bang',
    locationName: 'Bang Marriage Hall',
    locationAddress: 'Near City Station, Kishangarh',
    batchName: 'Evening Batch',
    startTime: '08:00 PM',
    endTime: '09:00 PM',
    capacity: 60,
    bookedSeats: 0,
    status: 'AVAILABLE',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'slot-bang-boys-1',
    locationId: 'loc-bang',
    locationName: 'Bang Marriage Hall',
    locationAddress: 'Near City Station, Kishangarh',
    batchName: 'Boys Dandiya Workshop (27 Sep – 11 Oct)',
    startTime: '05:00 PM',
    endTime: '06:00 PM',
    capacity: 50,
    bookedSeats: 0,
    status: 'AVAILABLE',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'slot-crystal-boys-1',
    locationId: 'loc-crystal',
    locationName: 'Crystal Park',
    locationAddress: 'Opposite Crystal Park, Turf Grounds, Kishangarh',
    batchName: 'Boys Dandiya Workshop (27 Sep – 11 Oct)',
    startTime: '07:00 PM',
    endTime: '08:00 PM',
    capacity: 50,
    bookedSeats: 0,
    status: 'AVAILABLE',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'slot-bang-female-15d',
    locationId: 'loc-bang',
    locationName: 'Bang Marriage Hall',
    locationAddress: 'Near City Station, Kishangarh',
    batchName: 'Special Girls Garba Workshop (26 Sep – 11 Oct)',
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    capacity: 50,
    bookedSeats: 0,
    status: 'AVAILABLE',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const DEFAULT_SETTINGS: AdminSettings = {
  upiId: process.env.NEXT_PUBLIC_UPI_ID || 'thefrozennight@upi',
  merchantName: process.env.NEXT_PUBLIC_UPI_MERCHANT_NAME || 'The Frozen Night Events',
  supportPhone1: '8385969285', // Neel Sir (Primary)
  supportPhone2: '8432223222', // Manish Sir (Call Only)
  priceFemale: 2500,
  priceOldStudentGroup: 2200,
  priceKids: 2000,
  priceBoysDandiya: 1500,
  workshopDates: '13th September to 11th October',
  bookingDates: '9th September to 30th September',
  announcement: 'Special Girls Workshop (26 Sep–11 Oct) & Boys Dandiya (27 Sep–11 Oct) open for registrations! Grand Competitions on 18th & 19th Oct.',
};

const DEFAULT_REGISTRATIONS: Registration[] = [];

// Helper to map DB row to Slot type
function mapDbSlot(row: any): Slot {
  return {
    id: row.id,
    locationId: row.location_id || row.locationId || 'loc-default',
    locationName: row.location_name || row.locationName,
    locationAddress: row.location_address || row.locationAddress,
    batchName: row.batch_name || row.batchName,
    startTime: row.start_time || row.startTime,
    endTime: row.end_time || row.endTime,
    capacity: Number(row.capacity),
    bookedSeats: Number(row.booked_seats ?? row.bookedSeats ?? 0),
    status: (row.status as SlotStatus) || 'AVAILABLE',
    isActive: row.is_active ?? row.isActive ?? true,
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
    updatedAt: row.updated_at || row.updatedAt || new Date().toISOString(),
  };
}

// Helper to map DB row to Registration type
function mapDbRegistration(row: any): Registration {
  return {
    id: row.id,
    category: row.category,
    categoryLabel: row.category_label || row.categoryLabel,
    participantName: row.participant_name || row.participantName,
    mobile: row.mobile,
    whatsapp: row.whatsapp,
    email: row.email,
    age: row.age ? Number(row.age) : undefined,
    gender: row.gender,
    city: row.city,
    address: row.address,
    emergencyName: row.emergency_name || row.emergencyName,
    emergencyPhone: row.emergency_phone || row.emergencyPhone,
    isKids: row.is_kids ?? row.isKids ?? false,
    guardianName: row.guardian_name || row.guardianName,
    guardianPhone: row.guardian_phone || row.guardianPhone,
    childAge: row.child_age ?? row.childAge,
    isOldStudent: row.is_old_student ?? row.isOldStudent ?? false,
    fatherOrHusbandName: row.father_or_husband_name || row.fatherOrHusbandName,
    isGroup: row.is_group ?? row.isGroup ?? false,
    membersCount: Number(row.members_count ?? row.membersCount ?? 1),
    groupLeaderName: row.group_leader_name || row.groupLeaderName,
    groupLeaderPhone: row.group_leader_phone || row.groupLeaderPhone,
    groupMembers: typeof row.group_members === 'string'
      ? (() => { try { return JSON.parse(row.group_members); } catch { return undefined; } })()
      : (row.group_members || row.groupMembers),
    slotId: row.slot_id || row.slotId,
    workshopDate: row.workshop_date || row.workshopDate,
    locationName: row.location_name || row.locationName,
    batchTime: row.batch_time || row.batchTime,
    feePerPerson: Number(row.fee_per_person ?? row.feePerPerson ?? 0),
    totalAmount: Number(row.total_amount ?? row.totalAmount ?? 0),
    hasFreeFamilyPass: row.has_free_family_pass ?? row.hasFreeFamilyPass ?? true,
    paymentStatus: (row.payment_status || row.paymentStatus || 'PAYMENT_PENDING') as PaymentStatus,
    bookingStatus: (row.booking_status || row.bookingStatus || 'PENDING') as BookingStatus,
    utrNumber: row.utr_number || row.utrNumber,
    paymentDate: row.payment_date || row.paymentDate,
    paymentScreenshot: row.payment_screenshot || row.paymentScreenshot,
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
    updatedAt: row.updated_at || row.updatedAt || new Date().toISOString(),
  };
}

import os from 'os';

const DB_FILE = path.join(os.tmpdir(), 'tfn_garba_db.json');

// Local File & In-Memory Transaction Handling
let transactionLock = Promise.resolve();

let inMemoryDb: DatabaseSchema = {
  slots: DEFAULT_SLOTS,
  registrations: DEFAULT_REGISTRATIONS,
  settings: DEFAULT_SETTINGS,
};

function executeWithLock<T>(operation: () => Promise<T> | T): Promise<T> {
  const result = transactionLock.then(async () => {
    return await operation();
  });
  transactionLock = result.then(() => {}, () => {});
  return result;
}

function ensureDbFile(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const data = JSON.parse(content) as DatabaseSchema;
      if (Array.isArray(data.slots) && data.slots.length > 0) {
        inMemoryDb = data;
        return inMemoryDb;
      }
    }
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(inMemoryDb, null, 2), 'utf-8');
    } catch {}
    return inMemoryDb;
  } catch {
    return inMemoryDb;
  }
}

function writeDbFile(data: DatabaseSchema): void {
  inMemoryDb = data;
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.warn('File write fallback to memory storage:', e);
  }
}

// ==========================================
// Public Database API with Supabase Sync
// ==========================================

export async function getSlots(): Promise<Slot[]> {
  let baseSlots: Slot[] = [];
  if (supabase) {
    try {
      const { data, error } = await supabase.from('slots').select('*').order('id', { ascending: true });
      if (!error && Array.isArray(data) && data.length > 0) {
        baseSlots = data.map(mapDbSlot);
      } else if (!error && Array.isArray(data) && data.length === 0) {
        const seedRows = DEFAULT_SLOTS.map((s) => ({
          id: s.id,
          location_id: s.locationId,
          location_name: s.locationName,
          location_address: s.locationAddress,
          batch_name: s.batchName,
          start_time: s.startTime,
          end_time: s.endTime,
          capacity: s.capacity,
          booked_seats: 0,
          status: 'AVAILABLE',
          is_active: s.isActive,
        }));
        await supabase.from('slots').insert(seedRows);
        baseSlots = DEFAULT_SLOTS;
      }
    } catch (e) {
      console.warn('Supabase getSlots fallback to local DB:', e);
    }
  }

  if (baseSlots.length === 0) {
    baseSlots = await executeWithLock(() => {
      const db = ensureDbFile();
      return db.slots;
    });
  }

  // Calculate real live booked seats from all active registrations
  const regs = await getRegistrations();
  return baseSlots.map((slot) => {
    const slotRegs = regs.filter((r) => r.slotId === slot.id && r.bookingStatus !== 'CANCELLED');
    const realBooked = slotRegs.reduce((acc, r) => acc + (r.membersCount || 1), 0);
    const capacity = slot.capacity || 40;
    let status: SlotStatus = 'AVAILABLE';
    if (realBooked >= capacity) {
      status = 'FULL';
    } else if (capacity - realBooked <= 5 && realBooked > 0) {
      status = 'ALMOST_FULL';
    }
    return {
      ...slot,
      bookedSeats: realBooked,
      status,
    };
  });
}

export async function getSlotById(slotId: string): Promise<Slot | null> {
  const slots = await getSlots();
  return slots.find((s) => s.id === slotId) || null;
}

export async function updateSlot(slotId: string, updates: Partial<Slot>): Promise<Slot | null> {
  if (supabase) {
    try {
      const dbUpdates: any = {};
      if (updates.capacity !== undefined) dbUpdates.capacity = updates.capacity;
      if (updates.bookedSeats !== undefined) dbUpdates.booked_seats = updates.bookedSeats;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.batchName !== undefined) dbUpdates.batch_name = updates.batchName;
      if (updates.startTime !== undefined) dbUpdates.start_time = updates.startTime;
      if (updates.endTime !== undefined) dbUpdates.end_time = updates.endTime;
      dbUpdates.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('slots')
        .update(dbUpdates)
        .eq('id', slotId)
        .select()
        .single();

      if (!error && data) {
        const updated = mapDbSlot(data);
        executeWithLock(() => {
          const db = ensureDbFile();
          const idx = db.slots.findIndex((s) => s.id === slotId);
          if (idx !== -1) {
            db.slots[idx] = updated;
            writeDbFile(db);
          }
        });
        return updated;
      }
    } catch (e) {
      console.warn('Supabase updateSlot fallback:', e);
    }
  }

  return executeWithLock(() => {
    const db = ensureDbFile();
    const index = db.slots.findIndex((s) => s.id === slotId);
    if (index === -1) return null;

    const slot = db.slots[index];
    const newCapacity = updates.capacity !== undefined ? updates.capacity : slot.capacity;
    const newBooked = updates.bookedSeats !== undefined ? updates.bookedSeats : slot.bookedSeats;

    let newStatus: SlotStatus = slot.status;
    if (newBooked >= newCapacity) {
      newStatus = 'FULL';
    } else if (newCapacity - newBooked <= 5) {
      newStatus = 'ALMOST_FULL';
    } else {
      newStatus = 'AVAILABLE';
    }

    const updated: Slot = {
      ...slot,
      ...updates,
      capacity: newCapacity,
      bookedSeats: newBooked,
      status: updates.status || newStatus,
      updatedAt: new Date().toISOString(),
    };

    db.slots[index] = updated;
    writeDbFile(db);
    return updated;
  });
}

export async function addSlot(slotData: Omit<Slot, 'id' | 'createdAt' | 'updatedAt' | 'bookedSeats' | 'status'>): Promise<Slot> {
  const id = `slot-${Date.now()}`;
  if (supabase) {
    try {
      const row = {
        id,
        location_id: slotData.locationId,
        location_name: slotData.locationName,
        location_address: slotData.locationAddress,
        batch_name: slotData.batchName,
        start_time: slotData.startTime,
        end_time: slotData.endTime,
        capacity: slotData.capacity,
        booked_seats: 0,
        status: 'AVAILABLE',
        is_active: slotData.isActive ?? true,
      };

      const { data, error } = await supabase.from('slots').insert([row]).select().single();
      if (!error && data) {
        const created = mapDbSlot(data);
        executeWithLock(() => {
          const db = ensureDbFile();
          db.slots.push(created);
          writeDbFile(db);
        });
        return created;
      }
    } catch (e) {
      console.warn('Supabase addSlot fallback:', e);
    }
  }

  return executeWithLock(() => {
    const db = ensureDbFile();
    const newSlot: Slot = {
      ...slotData,
      id,
      bookedSeats: 0,
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.slots.push(newSlot);
    writeDbFile(db);
    return newSlot;
  });
}

export async function deleteSlot(slotId: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('slots').delete().eq('id', slotId);
      if (!error) {
        executeWithLock(() => {
          const db = ensureDbFile();
          db.slots = db.slots.filter((s) => s.id !== slotId);
          writeDbFile(db);
        });
        return true;
      }
    } catch (e) {
      console.warn('Supabase deleteSlot fallback:', e);
    }
  }

  return executeWithLock(() => {
    const db = ensureDbFile();
    const prevLen = db.slots.length;
    db.slots = db.slots.filter((s) => s.id !== slotId);
    if (db.slots.length !== prevLen) {
      writeDbFile(db);
      return true;
    }
    return false;
  });
}

export async function createRegistrationAtomic(
  regData: Omit<Registration, 'id' | 'createdAt' | 'updatedAt'>
): Promise<{ success: boolean; registration?: Registration; error?: string }> {
  const randomHex = Math.floor(1000 + Math.random() * 9000);
  const regId = `TFN-2026-${randomHex}`;

  // Try Supabase first if available
  if (supabase) {
    try {
      const { data: slotData, error: slotErr } = await supabase
        .from('slots')
        .select('*')
        .eq('id', regData.slotId)
        .single();

      let slotDataObj: any = slotData;
      if (slotErr || !slotData) {
        const fallbackSlot = await getSlotById(regData.slotId);
        if (!fallbackSlot) {
          return { success: false, error: 'Selected batch does not exist.' };
        }
        // Seed this slot into Supabase
        await supabase.from('slots').insert([{
          id: fallbackSlot.id,
          location_id: fallbackSlot.locationId,
          location_name: fallbackSlot.locationName,
          location_address: fallbackSlot.locationAddress,
          batch_name: fallbackSlot.batchName,
          start_time: fallbackSlot.startTime,
          end_time: fallbackSlot.endTime,
          capacity: fallbackSlot.capacity,
          booked_seats: 0,
          status: 'AVAILABLE',
          is_active: true,
        }]);
        slotDataObj = {
          capacity: fallbackSlot.capacity,
          booked_seats: 0,
        };
      }

      const capacity = Number(slotDataObj.capacity);
      const booked = Number(slotDataObj.booked_seats || 0);
      const seatsNeeded = regData.membersCount || 1;
      const remaining = capacity - booked;

      if (remaining < seatsNeeded) {
        return {
          success: false,
          error: `Sorry, this batch has only ${Math.max(0, remaining)} seats left!`,
        };
      }

      const newBooked = booked + seatsNeeded;
      let newStatus: SlotStatus = 'AVAILABLE';
      if (newBooked >= capacity) {
        newStatus = 'FULL';
      } else if (capacity - newBooked <= 5) {
        newStatus = 'ALMOST_FULL';
      }

      // Update slot seats in Supabase
      await supabase
        .from('slots')
        .update({
          booked_seats: newBooked,
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq('id', regData.slotId);

      // Insert registration in Supabase
      const regRow = {
        id: regId,
        category: regData.category,
        category_label: regData.categoryLabel,
        participant_name: regData.participantName,
        mobile: regData.mobile,
        whatsapp: regData.whatsapp || regData.mobile,
        email: regData.email,
        age: regData.age ? Number(regData.age) : null,
        gender: regData.gender,
        city: regData.city || 'Kishangarh',
        address: regData.address,
        emergency_name: regData.emergencyName,
        emergency_phone: regData.emergencyPhone,
        is_kids: regData.isKids,
        guardian_name: regData.guardianName,
        guardian_phone: regData.guardianPhone,
        child_age: regData.childAge ? Number(regData.childAge) : null,
        is_old_student: regData.isOldStudent,
        father_or_husband_name: regData.fatherOrHusbandName,
        is_group: regData.isGroup,
        members_count: regData.membersCount,
        group_leader_name: regData.groupLeaderName,
        group_leader_phone: regData.groupLeaderPhone,
        group_members: regData.groupMembers,
        slot_id: regData.slotId,
        workshop_date: regData.workshopDate,
        location_name: regData.locationName,
        batch_time: regData.batchTime,
        fee_per_person: regData.feePerPerson,
        total_amount: regData.totalAmount,
        has_free_family_pass: regData.hasFreeFamilyPass,
        payment_status: 'PAYMENT_PENDING',
        booking_status: 'PENDING',
      };

      const { data: createdRow, error: insertErr } = await supabase
        .from('registrations')
        .insert([regRow])
        .select()
        .single();

      if (!insertErr && createdRow) {
        const mappedReg = mapDbRegistration(createdRow);
        // Also keep local fallback synced
        executeWithLock(() => {
          const db = ensureDbFile();
          db.registrations.push(mappedReg);
          writeDbFile(db);
        });
        return { success: true, registration: mappedReg };
      }
    } catch (e) {
      console.warn('Supabase createRegistration error, executing local fallback:', e);
    }
  }

  // Fallback to local locked execution
  return executeWithLock(async () => {
    const db = ensureDbFile();

    const slotIndex = db.slots.findIndex((s) => s.id === regData.slotId);
    if (slotIndex === -1) {
      return { success: false, error: 'Selected workshop slot does not exist' };
    }

    const slot = db.slots[slotIndex];
    const seatsNeeded = regData.membersCount || 1;
    const remainingSeats = slot.capacity - slot.bookedSeats;

    if (remainingSeats < seatsNeeded) {
      return {
        success: false,
        error: `Sorry, this batch has only ${Math.max(0, remainingSeats)} seats left!`,
      };
    }

    const newBookedSeats = slot.bookedSeats + seatsNeeded;
    let newStatus: SlotStatus = 'AVAILABLE';
    if (newBookedSeats >= slot.capacity) {
      newStatus = 'FULL';
    } else if (slot.capacity - newBookedSeats <= 5) {
      newStatus = 'ALMOST_FULL';
    }

    db.slots[slotIndex] = {
      ...slot,
      bookedSeats: newBookedSeats,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };

    const newRegistration: Registration = {
      ...regData,
      id: regId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.registrations.push(newRegistration);
    writeDbFile(db);

    return {
      success: true,
      registration: newRegistration,
    };
  });
}

export async function submitPaymentDetails(
  id: string,
  utrNumber: string,
  paymentDate: string,
  paymentScreenshot?: string
): Promise<{ success: boolean; registration?: Registration; error?: string }> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .update({
          utr_number: utrNumber.trim(),
          payment_date: paymentDate || new Date().toISOString().split('T')[0],
          payment_screenshot: paymentScreenshot,
          payment_status: 'PAYMENT_SUBMITTED',
          updated_at: new Date().toISOString(),
        })
        .eq('id', id.toUpperCase())
        .select()
        .single();

      if (!error && data) {
        const updated = mapDbRegistration(data);
        executeWithLock(() => {
          const db = ensureDbFile();
          const idx = db.registrations.findIndex((r) => r.id.toUpperCase() === id.toUpperCase());
          if (idx !== -1) {
            db.registrations[idx] = updated;
            writeDbFile(db);
          }
        });
        return { success: true, registration: updated };
      }
    } catch (e) {
      console.warn('Supabase submitPaymentDetails error, falling back:', e);
    }
  }

  return executeWithLock(() => {
    const db = ensureDbFile();
    const index = db.registrations.findIndex((r) => r.id.toUpperCase() === id.toUpperCase());
    if (index === -1) {
      return { success: false, error: 'Registration not found' };
    }

    const reg = db.registrations[index];
    const updated: Registration = {
      ...reg,
      utrNumber: utrNumber.trim(),
      paymentDate: paymentDate || new Date().toISOString().split('T')[0],
      paymentScreenshot: paymentScreenshot || reg.paymentScreenshot,
      paymentStatus: 'PAYMENT_SUBMITTED',
      updatedAt: new Date().toISOString(),
    };

    db.registrations[index] = updated;
    writeDbFile(db);
    return { success: true, registration: updated };
  });
}

export async function getRegistrationById(id: string): Promise<Registration | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('id', id.toUpperCase())
        .single();

      if (!error && data) {
        return mapDbRegistration(data);
      }
    } catch (e) {
      console.warn('Supabase getRegistrationById fallback:', e);
    }
  }

  return executeWithLock(() => {
    const db = ensureDbFile();
    return db.registrations.find((r) => r.id.toUpperCase() === id.toUpperCase()) || null;
  });
}

export async function getRegistrationByMobile(mobile: string): Promise<Registration[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .or(`mobile.ilike.%${mobile}%,whatsapp.ilike.%${mobile}%`);

      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map(mapDbRegistration);
      }
    } catch (e) {
      console.warn('Supabase getRegistrationByMobile fallback:', e);
    }
  }

  return executeWithLock(() => {
    const db = ensureDbFile();
    return db.registrations.filter((r) => r.mobile.includes(mobile) || (r.whatsapp && r.whatsapp.includes(mobile)));
  });
}

export async function getRegistrations(filters?: {
  search?: string;
  category?: string;
  location?: string;
  paymentStatus?: string;
  bookingStatus?: string;
}): Promise<Registration[]> {
  if (supabase) {
    try {
      let query = supabase.from('registrations').select('*').order('created_at', { ascending: false });

      if (filters?.search) {
        const q = filters.search.trim();
        query = query.or(`id.ilike.%${q}%,participant_name.ilike.%${q}%,mobile.ilike.%${q}%,utr_number.ilike.%${q}%`);
      }
      if (filters?.category && filters.category !== 'ALL') {
        query = query.eq('category', filters.category);
      }
      if (filters?.location && filters.location !== 'ALL') {
        query = query.ilike('location_name', `%${filters.location}%`);
      }
      if (filters?.paymentStatus && filters.paymentStatus !== 'ALL') {
        query = query.eq('payment_status', filters.paymentStatus);
      }
      if (filters?.bookingStatus && filters.bookingStatus !== 'ALL') {
        query = query.eq('booking_status', filters.bookingStatus);
      }

      const { data, error } = await query;
      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map(mapDbRegistration);
      }
    } catch (e) {
      console.warn('Supabase getRegistrations fallback:', e);
    }
  }

  return executeWithLock(() => {
    const db = ensureDbFile();
    let list = [...db.registrations];

    if (!filters) return list.reverse();

    if (filters.search) {
      const q = filters.search.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.id.toLowerCase().includes(q) ||
          r.participantName.toLowerCase().includes(q) ||
          r.mobile.includes(q) ||
          (r.utrNumber && r.utrNumber.toLowerCase().includes(q))
      );
    }

    if (filters.category && filters.category !== 'ALL') {
      list = list.filter((r) => r.category === filters.category);
    }

    if (filters.location && filters.location !== 'ALL') {
      list = list.filter((r) => r.locationName.includes(filters.location!));
    }

    if (filters.paymentStatus && filters.paymentStatus !== 'ALL') {
      list = list.filter((r) => r.paymentStatus === filters.paymentStatus);
    }

    if (filters.bookingStatus && filters.bookingStatus !== 'ALL') {
      list = list.filter((r) => r.bookingStatus === filters.bookingStatus);
    }

    return list.reverse();
  });
}

export async function updateRegistrationStatus(
  id: string,
  paymentStatus: PaymentStatus,
  bookingStatus: BookingStatus
): Promise<{ success: boolean; registration?: Registration; error?: string }> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .update({
          payment_status: paymentStatus,
          booking_status: bookingStatus,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id.toUpperCase())
        .select()
        .single();

      if (!error && data) {
        const mapped = mapDbRegistration(data);
        executeWithLock(() => {
          const db = ensureDbFile();
          const idx = db.registrations.findIndex((r) => r.id.toUpperCase() === id.toUpperCase());
          if (idx !== -1) {
            db.registrations[idx] = mapped;
            writeDbFile(db);
          }
        });
        return { success: true, registration: mapped };
      }
    } catch (e) {
      console.warn('Supabase updateRegistrationStatus error, fallback:', e);
    }
  }

  return executeWithLock(() => {
    const db = ensureDbFile();
    const index = db.registrations.findIndex((r) => r.id.toUpperCase() === id.toUpperCase());
    if (index === -1) {
      return { success: false, error: 'Registration not found' };
    }

    const reg = db.registrations[index];
    if (bookingStatus === 'CANCELLED' && reg.bookingStatus !== 'CANCELLED') {
      const slotIndex = db.slots.findIndex((s) => s.id === reg.slotId);
      if (slotIndex !== -1) {
        const slot = db.slots[slotIndex];
        const newBooked = Math.max(0, slot.bookedSeats - (reg.membersCount || 1));
        db.slots[slotIndex] = {
          ...slot,
          bookedSeats: newBooked,
          status: 'AVAILABLE',
          updatedAt: new Date().toISOString(),
        };
      }
    }

    const updated: Registration = {
      ...reg,
      paymentStatus,
      bookingStatus,
      updatedAt: new Date().toISOString(),
    };

    db.registrations[index] = updated;
    writeDbFile(db);
    return { success: true, registration: updated };
  });
}

export async function getAdminSettings(): Promise<AdminSettings> {
  return executeWithLock(() => {
    const db = ensureDbFile();
    return db.settings;
  });
}

export async function updateAdminSettings(newSettings: Partial<AdminSettings>): Promise<AdminSettings> {
  return executeWithLock(() => {
    const db = ensureDbFile();
    db.settings = {
      ...db.settings,
      ...newSettings,
    };
    writeDbFile(db);
    return db.settings;
  });
}

export async function getDashboardMetrics(): Promise<{
  totalRegistrations: number;
  paidCount: number;
  pendingCount: number;
  todayBookings: number;
  totalRevenue: number;
  pendingRevenue: number;
  totalAvailableSeats: number;
  totalBookedSeats: number;
}> {
  const [allRegs, allSlots] = await Promise.all([getRegistrations(), getSlots()]);

  const totalRegistrations = allRegs.length;
  const paidRegs = allRegs.filter((r) => r.paymentStatus === 'PAYMENT_VERIFIED');
  const paidCount = paidRegs.length;
  const pendingRegs = allRegs.filter((r) => r.paymentStatus !== 'PAYMENT_VERIFIED' && r.bookingStatus !== 'CANCELLED');
  const pendingCount = pendingRegs.length;

  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const todayBookings = allRegs.filter((r) => new Date(r.createdAt) >= oneDayAgo).length;

  const totalRevenue = paidRegs.reduce((acc, r) => acc + (r.totalAmount || 0), 0);
  const pendingRevenue = pendingRegs.reduce((acc, r) => acc + (r.totalAmount || 0), 0);

  const totalCapacity = allSlots.reduce((acc, s) => acc + (s.capacity || 0), 0);
  const totalBookedSeats = allSlots.reduce((acc, s) => acc + (s.bookedSeats || 0), 0);
  const totalAvailableSeats = Math.max(0, totalCapacity - totalBookedSeats);

  return {
    totalRegistrations,
    paidCount,
    pendingCount,
    todayBookings,
    totalRevenue,
    pendingRevenue,
    totalAvailableSeats,
    totalBookedSeats,
  };
}
