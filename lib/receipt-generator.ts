import { jsPDF } from 'jspdf';
import { Registration } from './types';

export function generateRegistrationPDF(registration: Registration): jsPDF {
  // A4 size: 210 x 297 mm
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // 1. Page Background (Cream / Warm Parchment)
  doc.setFillColor(253, 248, 238); // #fdf8ee
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // 2. Ornate Double Border in Deep Maroon and Gold
  doc.setDrawColor(217, 166, 53); // Gold #d9a635
  doc.setLineWidth(1.5);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  doc.setDrawColor(78, 12, 28); // Deep Maroon #4e0c1c
  doc.setLineWidth(0.6);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Corner Ornaments (Gold Dots)
  doc.setFillColor(217, 166, 53);
  const corners = [
    [10, 10],
    [pageWidth - 10, 10],
    [10, pageHeight - 10],
    [pageWidth - 10, pageHeight - 10],
  ];
  corners.forEach(([x, y]) => {
    doc.circle(x, y, 2, 'F');
  });

  // 3. Top Banner (Deep Royal Burgundy)
  doc.setFillColor(34, 5, 11); // #22050b
  doc.rect(11, 11, pageWidth - 22, 42, 'F');

  // Gold Trim Line under Header
  doc.setDrawColor(217, 166, 53);
  doc.setLineWidth(1);
  doc.line(11, 53, pageWidth - 11, 53);

  // 4. Logo Crest / Monogram (Gold Circle)
  doc.setFillColor(217, 166, 53);
  doc.circle(28, 32, 14, 'F');
  doc.setFillColor(34, 5, 11);
  doc.circle(28, 32, 12.5, 'F');

  doc.setTextColor(217, 166, 53);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('TFN', 28, 36, { align: 'center' });

  // 5. Header Brand Typography
  doc.setTextColor(250, 232, 176); // Light Gold #fae8b0
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('THE FROZEN NIGHT', 48, 23);

  doc.setTextColor(230, 191, 77);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('EVENT AND ENTERTAINMENTS • KISHANGARH, RAJASTHAN', 48, 28);

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('GARBA & DANDIYA ONE MONTH WORKSHOP', 48, 36);

  doc.setTextColor(217, 166, 53);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.text('Workshop: 13th Sept to 11th Oct | Kishangarh', 48, 43);

  // 6. Registration ID & Booking Date Ribbon
  doc.setFillColor(247, 236, 211); // Light Cream Gold
  doc.roundedRect(16, 58, pageWidth - 32, 20, 3, 3, 'F');
  doc.setDrawColor(217, 166, 53);
  doc.setLineWidth(0.5);
  doc.roundedRect(16, 58, pageWidth - 32, 20, 3, 3, 'S');

  doc.setTextColor(62, 10, 22);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('REGISTRATION PASS / OFFICIAL RECEIPT', 22, 65);

  doc.setTextColor(153, 28, 61);
  doc.setFontSize(14);
  doc.text(registration.id, 22, 73);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(90, 70, 40);
  doc.text(`Booking Date: ${new Date(registration.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`, pageWidth - 22, 65, { align: 'right' });

  // Status Badge
  const isPaid = registration.paymentStatus === 'PAYMENT_VERIFIED';
  doc.setFillColor(isPaid ? 34 : 190, isPaid ? 139 : 120, isPaid ? 34 : 20);
  doc.roundedRect(pageWidth - 62, 68, 40, 7, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(isPaid ? 'PAID & CONFIRMED' : 'PAYMENT SUBMITTED', pageWidth - 42, 72.8, { align: 'center' });

  // 7. PARTICIPANT & WORKSHOP DETAILS GRID
  let y = 86;

  const drawSectionTitle = (title: string, yPos: number) => {
    doc.setFillColor(78, 12, 28);
    doc.rect(16, yPos, pageWidth - 32, 6.5, 'F');
    doc.setTextColor(250, 232, 176);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(title.toUpperCase(), 20, yPos + 4.6);
  };

  // Participant Section
  drawSectionTitle('1. Participant Details', y);
  y += 12;

  const leftColX = 20;
  const rightColX = 110;

  const addField = (label: string, value: string, x: number, yPos: number) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(110, 40, 50);
    doc.text(label, x, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 20, 20);
    doc.text(value || 'N/A', x, yPos + 4.5);
  };

  addField('Participant Name:', registration.participantName, leftColX, y);
  addField('Admission Category:', registration.categoryLabel, rightColX, y);
  y += 12;

  addField('Primary Mobile:', `+91 ${registration.mobile}`, leftColX, y);
  addField('WhatsApp Number:', registration.whatsapp ? `+91 ${registration.whatsapp}` : `+91 ${registration.mobile}`, rightColX, y);
  y += 12;

  addField('Age & Gender:', `${registration.age ? `${registration.age} Years` : 'N/A'} | ${registration.gender}`, leftColX, y);
  addField('City / Address:', `${registration.city} ${registration.address ? `(${registration.address})` : ''}`, rightColX, y);
  y += 12;

  if (registration.isKids && registration.guardianName) {
    addField('Guardian / Parent:', registration.guardianName, leftColX, y);
    addField('Guardian Contact:', registration.guardianPhone ? `+91 ${registration.guardianPhone}` : 'N/A', rightColX, y);
    y += 12;
  }

  if (registration.isGroup) {
    addField('Group Leader:', registration.groupLeaderName || registration.participantName, leftColX, y);
    addField('Total Group Members:', `${registration.membersCount} Participants`, rightColX, y);
    y += 12;
  }

  // Workshop & Slot Section
  y += 2;
  drawSectionTitle('2. Workshop Location & Batch Slot', y);
  y += 12;

  addField('Assigned Location:', registration.locationName, leftColX, y);
  addField('Batch Timing:', registration.batchTime, rightColX, y);
  y += 12;

  addField('Workshop Duration:', registration.workshopDate, leftColX, y);
  addField('Choreography By:', 'Manish & Neel Sir (TFN Academy)', rightColX, y);
  y += 14;

  // 8. Payment & Inclusions Section
  drawSectionTitle('3. Payment & Fee Summary', y);
  y += 11;

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(217, 166, 53);
  doc.setLineWidth(0.4);
  doc.rect(16, y, pageWidth - 32, 28, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text('Fee per Participant:', 22, y + 6);
  doc.text('Participants Count:', 22, y + 12);
  doc.text('Transaction / UTR Number:', 22, y + 18);
  doc.text('Payment Status:', 22, y + 24);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 20, 20);
  doc.text(`₹${registration.feePerPerson}`, 80, y + 6);
  doc.text(`${registration.membersCount || 1}`, 80, y + 12);
  doc.text(registration.utrNumber || 'To be reconciled', 80, y + 18);
  doc.setTextColor(isPaid ? 34 : 180, isPaid ? 139 : 100, isPaid ? 34 : 20);
  doc.text(isPaid ? 'VERIFIED & RECEIVED' : 'SUBMITTED FOR RECONCILIATION', 80, y + 24);

  // Total Amount Box
  doc.setFillColor(34, 5, 11);
  doc.rect(pageWidth - 75, y + 2, 55, 24, 'F');
  doc.setTextColor(250, 232, 176);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('TOTAL AMOUNT PAID', pageWidth - 47.5, y + 8, { align: 'center' });
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(`₹${registration.totalAmount}`, pageWidth - 47.5, y + 18, { align: 'center' });

  y += 34;

  // 9. Free Family Pass Golden Highlight Box (Strict Requirement from Poster)
  doc.setFillColor(255, 248, 225); // Gold Warm Glow
  doc.setDrawColor(217, 166, 53);
  doc.setLineWidth(0.8);
  doc.roundedRect(16, y, pageWidth - 32, 15, 2, 2, 'FD');

  doc.setTextColor(140, 90, 15);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('★ SPECIAL COMPLIMENTARY BENEFIT ★', pageWidth / 2, y + 5.5, { align: 'center' });

  doc.setTextColor(78, 12, 28);
  doc.setFontSize(10.5);
  doc.text('EVERY PARTICIPANT GETS A FREE FAMILY PASS FOR ONE DAY', pageWidth / 2, y + 11.5, { align: 'center' });

  y += 20;

  // 10. Important Guidelines / Instructions
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(90, 20, 30);
  doc.text('IMPORTANT GUIDELINES FOR PARTICIPANTS:', 16, y);
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(70, 70, 70);
  const guidelines = [
    '• Please present this digital or printed pass along with your Registration ID at the studio entrance.',
    '• Please arrive 10 minutes prior to your allocated batch time in comfortable traditional/dance attire.',
    '• All participants qualify for TFN Competition Rounds scheduled for 18th October in Kishangarh.',
    '• For slot changes or questions, contact TFN Helpdesk: 843 222 3222 / 838 596 9285.',
  ];
  guidelines.forEach((g) => {
    doc.text(g, 16, y);
    y += 4;
  });

  // 11. Footer with Brand Signature and Tagline
  const footerY = pageHeight - 20;
  doc.setDrawColor(217, 166, 53);
  doc.setLineWidth(0.4);
  doc.line(16, footerY - 2, pageWidth - 16, footerY - 2);

  doc.setTextColor(217, 166, 53);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Dance  |  Learn  |  Grow  |  Together', pageWidth / 2, footerY + 3, { align: 'center' });

  doc.setTextColor(120, 100, 100);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('The Frozen Night - Event and Entertainments • Kishangarh, Rajasthan • Helpline: +91 8432223222, +91 8385969285', pageWidth / 2, footerY + 7.5, { align: 'center' });

  return doc;
}

export function downloadRegistrationReceipt(registration: Registration) {
  const doc = generateRegistrationPDF(registration);
  doc.save(`TFN_Receipt_${registration.id}.pdf`);
}
