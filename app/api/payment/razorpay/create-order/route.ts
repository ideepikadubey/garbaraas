import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getRegistrationById } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { registrationId } = await req.json();

    if (!registrationId) {
      return NextResponse.json({ success: false, error: 'Registration ID is required' }, { status: 400 });
    }

    const reg = await getRegistrationById(registrationId);
    if (!reg) {
      return NextResponse.json({ success: false, error: 'Registration record not found' }, { status: 404 });
    }

    const keyId =
      process.env.RAZORPAY_KEY_ID ||
      process.env.PAYMENT_GATEWAY_KEY ||
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_KEY;
    const keySecret =
      process.env.RAZORPAY_KEY_SECRET ||
      process.env.PAYMENT_GATEWAY_SECRET;

    // If Razorpay keys are not configured yet, offer a simulated dev test order or inform user
    if (!keyId || !keySecret) {
      // Mock order for testing preview if keys haven't been entered yet
      return NextResponse.json({
        success: true,
        isSimulated: true,
        orderId: `order_sim_${Date.now()}`,
        amount: reg.totalAmount * 100,
        currency: 'INR',
        keyId: 'rzp_test_simulated',
        registration: reg,
        message: 'Razorpay keys not set in .env.local yet. Running in simulated test mode.',
      });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: Math.round(reg.totalAmount * 100), // amount in paise
      currency: 'INR',
      receipt: reg.id,
      notes: {
        registrationId: reg.id,
        participantName: reg.participantName,
        mobile: reg.mobile,
        category: reg.category,
        slotId: reg.slotId,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      isSimulated: false,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      registration: reg,
    });
  } catch (error: any) {
    console.error('Razorpay create-order error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Error creating Razorpay order' }, { status: 500 });
  }
}
