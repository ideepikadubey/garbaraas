import { NextResponse } from 'next/server';
import { getRegistrationById, submitPaymentDetails, updateRegistrationStatus } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const registration = await getRegistrationById(id);
    if (!registration) {
      return NextResponse.json({ success: false, error: 'Registration not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, registration });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    // 1. User submitting payment (UTR number)
    if (body.action === 'SUBMIT_PAYMENT') {
      const { utrNumber, paymentDate, paymentScreenshot } = body;
      if (!utrNumber || !utrNumber.trim()) {
        return NextResponse.json({ success: false, error: 'Transaction / UTR number is required' }, { status: 400 });
      }

      const result = await submitPaymentDetails(id, utrNumber, paymentDate, paymentScreenshot);
      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: 400 });
      }
      return NextResponse.json({
        success: true,
        registration: result.registration,
        message: 'Payment details submitted successfully. Your payment is being verified.',
      });
    }

    // 2. Admin updating status (Verify, Cancel, Refund)
    if (body.action === 'UPDATE_STATUS') {
      const { paymentStatus, bookingStatus } = body;
      const result = await updateRegistrationStatus(id, paymentStatus, bookingStatus);
      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: 400 });
      }
      return NextResponse.json({
        success: true,
        registration: result.registration,
        message: 'Registration status updated successfully',
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid action specified' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
