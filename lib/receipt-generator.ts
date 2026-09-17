import { jsPDF } from 'jspdf';
import { Registration } from './types';

// Helper to convert image URL to Base64 in browser
async function loadImageAsDataUrl(url: string): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
          return;
        }
      } catch (e) {
        console.warn('Canvas export failed for:', url, e);
      }
      resolve(null);
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

export function generateRegistrationPDF(
  registration: Registration,
  logoImages?: { namoLogo?: string; tfnLogo?: string }
): jsPDF {
  // A4 dimensions: 210 x 297 mm
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // 1. Clean White Background with Standard Outer Border
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Outer border (Clean slate border)
  doc.setDrawColor(203, 213, 225); // Slate-300
  doc.setLineWidth(0.6);
  doc.roundedRect(margin - 4, margin - 4, contentWidth + 8, pageHeight - (margin * 2) + 8, 2, 2, 'S');

  // 2. HEADER: Logos & Clean Standard Typography
  const headerTop = 15;

  // Left: Namo Club Logo
  if (logoImages?.namoLogo) {
    try {
      doc.addImage(logoImages.namoLogo, 'PNG', margin, headerTop, 20, 20);
    } catch (e) {
      // Fallback text monogram if image render fails
      doc.setFillColor(254, 243, 199);
      doc.roundedRect(margin, headerTop, 20, 20, 2, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(180, 83, 9);
      doc.text('NAMO\nCLUB', margin + 10, headerTop + 9, { align: 'center' });
    }
  } else {
    doc.setFillColor(254, 243, 199);
    doc.roundedRect(margin, headerTop, 20, 20, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(180, 83, 9);
    doc.text('NAMO\nCLUB', margin + 10, headerTop + 9, { align: 'center' });
  }

  // Right: TFN Logo
  if (logoImages?.tfnLogo) {
    try {
      doc.addImage(logoImages.tfnLogo, 'PNG', pageWidth - margin - 20, headerTop, 20, 20);
    } catch (e) {
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(pageWidth - margin - 20, headerTop, 20, 20, 2, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text('TFN', pageWidth - margin - 10, headerTop + 12, { align: 'center' });
    }
  } else {
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(pageWidth - margin - 20, headerTop, 20, 20, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text('TFN', pageWidth - margin - 10, headerTop + 12, { align: 'center' });
  }

  // Center Brand Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.text('NAMO CLUB KISHANGARH', pageWidth / 2, headerTop + 4, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105); // Slate-600
  doc.text('Co Powered By The Frozen Night Event and Entertainment', pageWidth / 2, headerTop + 9, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(190, 24, 93); // Rose-700 / Garba Pink
  doc.text('GARBA RAAS DANDIYA MAHOTSAV 2026', pageWidth / 2, headerTop + 15, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139); // Slate-500
  doc.text('Official Registration Pass & Payment Receipt', pageWidth / 2, headerTop + 19.5, { align: 'center' });

  // Top Divider Line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, headerTop + 24, pageWidth - margin, headerTop + 24);

  // 3. REGISTRATION META STRIP
  let y = headerTop + 28;

  doc.setFillColor(248, 250, 252); // Slate-50
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 16, 1.5, 1.5, 'FD');

  // Registration ID
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('REGISTRATION ID', margin + 5, y + 5.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(registration.id, margin + 5, y + 12);

  // Booking Date
  const bookingDateStr = registration.createdAt
    ? new Date(registration.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('DATE ISSUED', pageWidth / 2 - 10, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);
  doc.text(bookingDateStr, pageWidth / 2 - 10, y + 12);

  // Status Badge Pill
  const isPaid = registration.paymentStatus === 'PAYMENT_VERIFIED';
  doc.setFillColor(isPaid ? 240 : 254, isPaid ? 253 : 242, isPaid ? 244 : 242);
  doc.setDrawColor(isPaid ? 74 : 234, isPaid ? 222 : 179, isPaid ? 128 : 8);
  doc.setLineWidth(0.4);
  doc.roundedRect(pageWidth - margin - 48, y + 4, 43, 8, 1, 1, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(isPaid ? 21 : 161, isPaid ? 128 : 98, isPaid ? 61 : 7);
  doc.text(isPaid ? '✓ PAYMENT VERIFIED' : '● PAYMENT SUBMITTED', pageWidth - margin - 26.5, y + 9.5, {
    align: 'center',
  });

  y += 21;

  // Section Header Function
  const renderSectionHeader = (title: string, yPos: number) => {
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, yPos, contentWidth, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(title.toUpperCase(), margin + 3, yPos + 4.2);
  };

  // 4. PARTICIPANT & WORKSHOP DETAILS
  renderSectionHeader('1. Participant & Workshop Details', y);
  y += 8;

  const col1X = margin + 3;
  const col2X = margin + contentWidth / 2 + 3;

  const renderField = (label: string, value: string, xPos: number, yPos: number) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(label, xPos, yPos);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(value || 'N/A', xPos, yPos + 4.5);
  };

  renderField('Participant Name', registration.participantName, col1X, y);
  renderField('Admission Category', registration.categoryLabel, col2X, y);
  y += 10.5;

  if (registration.fatherOrHusbandName) {
    renderField("Father's / Husband's Name", registration.fatherOrHusbandName, col1X, y);
    renderField('Primary Mobile', `+91 ${registration.mobile}`, col2X, y);
    y += 10.5;
  } else {
    renderField('Primary Mobile', `+91 ${registration.mobile}`, col1X, y);
    renderField('WhatsApp', registration.whatsapp ? `+91 ${registration.whatsapp}` : `+91 ${registration.mobile}`, col2X, y);
    y += 10.5;
  }

  renderField('Age & Gender', `${registration.age ? `${registration.age} Yrs` : 'N/A'} • ${registration.gender || 'Female'}`, col1X, y);
  renderField('City / Address', `${registration.city || 'Kishangarh'} ${registration.address ? `(${registration.address})` : ''}`, col2X, y);
  y += 10.5;

  renderField('Assigned Hall Location', registration.locationName, col1X, y);
  renderField('Batch Timing', registration.batchTime, col2X, y);
  y += 10.5;

  renderField('Workshop Duration', registration.workshopDate || 'Workshop Schedule', col1X, y);
  renderField('Instructors / Mentors', 'Neel Sir & Manish Sir (TFN)', col2X, y);
  y += 11;

  // Guardian details if kids
  if (registration.isKids && registration.guardianName) {
    renderField('Parent / Guardian', `${registration.guardianName} (${registration.guardianPhone ? `+91 ${registration.guardianPhone}` : ''})`, col1X, y);
    y += 10;
  }

  // Group members if group registration
  if (registration.isGroup && registration.groupMembers && registration.groupMembers.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Enrolled Group Members (${registration.membersCount} Participants):`, col1X, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    const membersList = registration.groupMembers
      .slice(0, 10)
      .map((m, idx) => `${idx + 1}. ${m.name || 'Member'} ${m.mobile ? `(+91 ${m.mobile})` : ''}`)
      .join('  •  ');
    doc.text(membersList, col1X, y, { maxWidth: contentWidth - 6 });
    y += 7;
  }

  y += 2;

  // 5. PAYMENT & ACCOUNTING SUMMARY TABLE
  renderSectionHeader('2. Payment & Fee Statement', y);
  y += 8;

  // Table Box
  const tableY = y;
  const tableHeight = 26;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.rect(margin, tableY, contentWidth, tableHeight, 'FD');

  // Table Row Separator
  doc.line(margin, tableY + 6, margin + contentWidth, tableY + 6);

  // Table Headers
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('DESCRIPTION', margin + 4, tableY + 4.2);
  doc.text('FEE / PERSON', margin + 95, tableY + 4.2);
  doc.text('QTY', margin + 125, tableY + 4.2);
  doc.text('AMOUNT', margin + contentWidth - 4, tableY + 4.2, { align: 'right' });

  // Table Data Row
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`${registration.categoryLabel}`, margin + 4, tableY + 11.5);
  doc.text(`₹${registration.feePerPerson}`, margin + 95, tableY + 11.5);
  doc.text(`${registration.membersCount || 1}`, margin + 125, tableY + 11.5);

  doc.setFont('helvetica', 'bold');
  doc.text(`₹${registration.totalAmount}`, margin + contentWidth - 4, tableY + 11.5, { align: 'right' });

  // Payment Reference Sub-line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  const paymentRef = registration.utrNumber
    ? `Transaction / Reference ID: ${registration.utrNumber}`
    : 'Payment Mode: Online Payment Gateway / UPI';
  doc.text(paymentRef, margin + 4, tableY + 17.5);

  // Total Summary Pill
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, tableY + 20, margin + contentWidth, tableY + 20);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('TOTAL PAID:', margin + 95, tableY + 24.2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(190, 24, 93);
  doc.text(`₹${registration.totalAmount}`, margin + contentWidth - 4, tableY + 24.2, { align: 'right' });

  y += tableHeight + 6;

  // 6. FREE FAMILY PASS COMPLIMENTARY BOX
  doc.setFillColor(254, 243, 199); // Amber-100 warm gold
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, contentWidth, 12, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(146, 64, 14); // Amber-800
  doc.text('★ SPECIAL COMPLIMENTARY INCLUSION ★', pageWidth / 2, y + 4.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('THIS PASS INCLUDES 1-DAY FREE FAMILY PASS FOR GRAND FINALE CELEBRATIONS', pageWidth / 2, y + 9, {
    align: 'center',
  });

  y += 17;

  // 7. IMPORTANT GUIDELINES
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('IMPORTANT GUIDELINES & INSTRUCTIONS:', margin, y);
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  const guidelines = [
    '1. Please carry this digital or printed pass along with your Registration ID at the studio entrance.',
    '2. Arrive 10 minutes prior to your allocated batch time in comfortable traditional or dance attire.',
    '3. All registered workshop participants qualify for entry in the Grand Garba Competitions on 18th & 19th October.',
    '4. For slot adjustments, support, or batch queries, contact TFN Helpline: 8385969285 / 8432223222.',
  ];

  guidelines.forEach((g) => {
    doc.text(g, margin, y);
    y += 4;
  });

  // 8. FOOTER: VERIFICATION & HELPLINE
  const footerY = pageHeight - margin - 4;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, footerY - 3, pageWidth - margin, footerY - 3);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Organized by: Namo Club Kishangarh & The Frozen Night (TFN)', margin, footerY + 1.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Helpline: +91 8385969285 (Neel Sir) • +91 8432223222 (Manish Sir)', pageWidth - margin, footerY + 1.5, {
    align: 'right',
  });

  return doc;
}

export async function downloadRegistrationReceipt(registration: Registration) {
  let namoLogo: string | null = null;
  let tfnLogo: string | null = null;

  try {
    [namoLogo, tfnLogo] = await Promise.all([
      loadImageAsDataUrl('/images/namo-club-logo.png'),
      loadImageAsDataUrl('/images/TFN.png'),
    ]);
  } catch (e) {
    console.warn('Could not preload logos for PDF, using standard vector badges fallback:', e);
  }

  const doc = generateRegistrationPDF(registration, {
    namoLogo: namoLogo || undefined,
    tfnLogo: tfnLogo || undefined,
  });

  doc.save(`TFN_Receipt_${registration.id}.pdf`);
}
