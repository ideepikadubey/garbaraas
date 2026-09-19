export type CategoryType = 'FEMALE' | 'FEMALE_15DAY' | 'BOYS_DANDIYA' | 'OLD_STUDENT' | 'GROUP' | 'KIDS' | 'KIDS_15DAY';

export type PaymentStatus = 
  | 'PAYMENT_PENDING' 
  | 'PAYMENT_SUBMITTED' 
  | 'PAYMENT_VERIFIED' 
  | 'PAYMENT_FAILED' 
  | 'PAYMENT_REFUNDED';

export type BookingStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'CANCELLED';

export type SlotStatus = 'AVAILABLE' | 'ALMOST_FULL' | 'FULL';

export interface Slot {
  id: string;
  locationId: string;
  locationName: string;
  locationAddress: string;
  batchName: string;
  startTime: string;
  endTime: string;
  capacity: number;
  bookedSeats: number;
  status: SlotStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Registration {
  id: string; // e.g. TFN-2026-1042
  category: CategoryType;
  categoryLabel: string;
  participantName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  age?: number;
  gender: string;
  city: string;
  address: string;
  emergencyName?: string;
  emergencyPhone?: string;

  // Kids specific
  isKids: boolean;
  guardianName?: string;
  guardianPhone?: string;
  childAge?: number;

  // Old Student / Group specific
  isOldStudent: boolean;
  fatherOrHusbandName?: string;
  isGroup: boolean;
  membersCount: number;
  groupLeaderName?: string;
  groupLeaderPhone?: string;
  groupMembers?: Array<{
    name: string;
    age?: string | number;
    mobile?: string;
    fatherOrHusbandName?: string;
  }>;

  // Slot details
  slotId: string;
  workshopDate: string;
  locationName: string;
  batchTime: string;

  // Pricing
  feePerPerson: number;
  totalAmount: number;
  hasFreeFamilyPass: boolean;

  // Payment & Status
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  utrNumber?: string;
  paymentDate?: string;
  paymentScreenshot?: string;

  createdAt: string;
  updatedAt: string;
}

export interface AdminSettings {
  upiId: string;
  merchantName: string;
  supportPhone1: string;
  supportPhone2: string;
  priceFemale: number;
  priceFemale15Day?: number;
  priceOldStudentGroup: number;
  priceKids: number;
  priceKids15Day?: number;
  priceBoysDandiya?: number;
  workshopDates: string;
  bookingDates: string;
  qrImageUrl?: string;
  announcement?: string;
}
