import { NextRequest, NextResponse } from 'next/server';
import { verifyAlumni } from '@/lib/alumniVerifier';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentName, fatherOrHusbandName } = body;

    if (!studentName || typeof studentName !== 'string') {
      return NextResponse.json(
        { success: false, verified: false, error: 'Student name is required.' },
        { status: 400 }
      );
    }

    const result = verifyAlumni(studentName, fatherOrHusbandName || '');

    return NextResponse.json({
      success: true,
      verified: result.verified,
      message: result.message,
      matchedRecord: result.matchedRecord,
      matchType: result.matchType,
    });
  } catch (error: any) {
    console.error('Error verifying alumni:', error);
    return NextResponse.json(
      {
        success: false,
        verified: false,
        error: error.message || 'Internal server error while verifying alumni.',
      },
      { status: 500 }
    );
  }
}
