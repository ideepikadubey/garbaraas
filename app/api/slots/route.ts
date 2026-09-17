import { NextResponse } from 'next/server';
import { getSlots, addSlot, updateSlot, deleteSlot } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const slots = await getSlots();
    return NextResponse.json({ success: true, slots });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newSlot = await addSlot(body);
    return NextResponse.json({ success: true, slot: newSlot });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ success: false, error: 'Slot ID required' }, { status: 400 });
    }
    const updated = await updateSlot(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Slot not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, slot: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Slot ID required' }, { status: 400 });
    }
    const deleted = await deleteSlot(id);
    return NextResponse.json({ success: true, deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
