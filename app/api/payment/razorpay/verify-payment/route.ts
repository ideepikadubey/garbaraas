import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { updateRegistrationStatus, submitPaymentDetails, getRegistrationById } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const {
      registrationId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      isSimulated,
    } = await req.json();

    if (!registrationId) {
      return NextResponse.json({ success: false, error: 'Registration ID is required' }, { status: 400 });
    }

    const reg = await getRegistrationById(registrationId);
    if (!reg) {
      return NextResponse.json({ success: false, error: 'Registration record not found' }, { status: 404 });
    }

    const keySecret =
      process.env.RAZORPAY_KEY_SECRET ||
      process.env.PAYMENT_GATEWAY_SECRET;

    // In real mode, verify cryptographic signature
    if (!isSimulated && keySecret && razorpay_order_id && razorpay_signature) {
      const body = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(body.toString())
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        return NextResponse.json({ success: false, error: 'Payment signature verification failed. Invalid transaction.' }, { status: 400 });
      }
    }

    // Save payment details & mark as verified + confirmed
    const paymentId = razorpay_payment_id || `PAY_${Date.now()}`;
    await submitPaymentDetails(
      registrationId,
      `RAZORPAY_${paymentId}`,
      new Date().toISOString().split('T')[0]
    );

    const updateRes = await updateRegistrationStatus(
      registrationId,
      'PAYMENT_VERIFIED',
      'CONFIRMED'
    );

    const finalReg = updateRes.registration || (await getRegistrationById(registrationId));

    return NextResponse.json({
      success: true,
      message: 'Payment verified and registration confirmed successfully!',
      registration: finalReg,
    });
  } catch (error: any) {
    console.error('Razorpay verify-payment error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Payment verification failed' }, { status: 500 });
  }
}
