import { NextResponse } from 'next/server';
import { getRegistrations } from '@/lib/db';

export async function GET() {
  try {
    const list = await getRegistrations();

    const headers = [
      'Registration ID',
      'Participant Name',
      'Father / Husband Name',
      'Category',
      'Mobile',
      'WhatsApp',
      'Email',
      'Age',
      'Gender',
      'City',
      'Address',
      'Location',
      'Batch Timing',
      'Participants Count',
      'Group Members Details',
      'Fee Per Person',
      'Total Amount',
      'Payment Status',
      'Booking Status',
      'UTR Number',
      'Payment Date',
      'Guardian Name',
      'Guardian Phone',
      'Group Leader Name',
      'Group Leader Phone',
      'Created At',
    ];

    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = list.map((r) => {
      const groupMembersStr = r.groupMembers && r.groupMembers.length > 0
        ? r.groupMembers.map((m, i) => `[${i + 1}] ${m.name}${m.fatherOrHusbandName ? ` (S/O,W/O: ${m.fatherOrHusbandName})` : ''}${m.mobile ? ` Mob: ${m.mobile}` : ''}${m.age ? ` Age: ${m.age}` : ''}`).join('; ')
        : '';

      return [
        escapeCsv(r.id),
        escapeCsv(r.participantName),
        escapeCsv(r.fatherOrHusbandName || ''),
        escapeCsv(r.categoryLabel),
        escapeCsv(r.mobile),
        escapeCsv(r.whatsapp),
        escapeCsv(r.email),
        escapeCsv(r.age),
        escapeCsv(r.gender),
        escapeCsv(r.city),
        escapeCsv(r.address),
        escapeCsv(r.locationName),
        escapeCsv(r.batchTime),
        escapeCsv(r.membersCount),
        escapeCsv(groupMembersStr),
        escapeCsv(r.feePerPerson),
        escapeCsv(r.totalAmount),
        escapeCsv(r.paymentStatus),
        escapeCsv(r.bookingStatus),
        escapeCsv(r.utrNumber || ''),
        escapeCsv(r.paymentDate || ''),
        escapeCsv(r.guardianName || ''),
        escapeCsv(r.guardianPhone || ''),
        escapeCsv(r.groupLeaderName || ''),
        escapeCsv(r.groupLeaderPhone || ''),
        escapeCsv(r.createdAt),
      ];
    });

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="TFN_Garba_Registrations_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
