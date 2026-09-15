# The Frozen Night (TFN) – Garba & Dandiya Workshop Web Application
**Kishangarh, Rajasthan • 13th September to 11th October**

A production-ready, festive, responsive slot-booking and registration platform for **The Frozen Night (TFN) Event and Entertainments**. Designed using the official event reference posters featuring deep burgundy/maroon themes, glowing diyas, Rajasthani palace silhouettes, gold ornate borders, real-time batch capacity tracking, anti double-booking concurrency control, dynamic UPI QR payment verification, and automatic professional PDF receipt generation.

---

## 🌟 Features Overview

1. **Festive Visual Identity (Matches Reference Posters)**:
   - Deep royal maroon (`#22050b`, `#120306`) with shimmering gold accents (`#d9a635`, `#fae8b0`).
   - "Namo Club Kishangarh Presents गरबा-रास डांडिया महोत्सव".
   - Official Reference Poster Gallery viewer modal to inspect all original promotional posters directly on site.
2. **Dynamic Slot & Capacity System (Poster 4)**:
   - **TFN Studio**: Batch 1 (9:00 AM – 10:00 AM), Batch 2 (10:00 AM – 11:00 AM)
   - **Bang Marriage Hall**: Batches 1 to 5 (12:00 PM – 5:00 PM)
   - **Cricket Academy (Turf Kishangarh)**: Batches 1 & 2 (6:00 PM – 8:00 PM)
   - **Bang Marriage Hall (Evening)**: Batch 1 (8:00 PM – 9:00 PM)
   - Real-time badges: `Available`, `Few Seats Left`, `Full` (disabled when capacity is reached).
3. **Multi-Step Booking Flow**:
   - **Step 1: Category**: Female (₹2500), Old TFN Student / Group 5+ (₹2200), Kids Girls 7–16 Years (₹2000). Dynamic member counter for groups.
   - **Step 2: Participant Details**: 10-digit Indian phone validation, conditional Kids guardian fields, group coordinator details.
   - **Step 3: Slot Selection**: Interactive card picker with live seat availability.
   - **Step 4: Booking Summary**: Summary card with line items and **Free Family Pass** highlight.
   - **Step 5: Dedicated Payment Page**: High-resolution UPI QR code generator (`qrcode`), copy UPI button, UTR number submission, and optional screenshot proof.
   - **Step 6: Success & PDF Receipt**: Confetti animation, unique Registration ID (`TFN-2026-XXXX`), and automatic PDF receipt download!
4. **Professional PDF Receipt Engine**:
   - Programmatically generated via `jspdf`.
   - Royal burgundy banner, TFN crest, participant details, assigned batch, amount, Free Family Pass voucher stamp, helpline contacts, and tagline: *"Dance | Learn | Grow | Together"*.
5. **Anti Double-Booking Protection**:
   - Strict server-side mutex locking prevents race conditions when concurrent users attempt to book the last available seat simultaneously.
6. **Full-Featured Admin Dashboard (`/admin`)**:
   - Secure login (`admin` / `tfnkishangarh2026`).
   - 6 KPI stat cards: Total Registrations, Paid, Pending, Today's Bookings, Total Revenue, Available Slots.
   - Search by Name, Mobile, Registration ID, or UTR.
   - Filter by Category, Location, and Payment Status.
   - One-click Payment Verification and Cancellation (restores slot seats).
   - Capacity management (edit batch limits, toggle full status, add new batches).
   - Export all registrations to CSV for Excel.
   - Individual PDF receipt download.
7. **Find My Receipt Lookup Tool**:
   - Allows participants to lookup their registration pass by Registration ID or mobile number anytime.

---

## 🚀 Quick Start (Local Development)

The application includes an **embedded transactional database** with seeded data, so you can run and test the complete app immediately without needing any external database setup!

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Configuration & Environment Variables

Create or edit `.env.local` in the project root:

```ini
# ==========================================
# UPI & PAYMENT CONFIGURATION
# ==========================================
# Your real merchant UPI ID (e.g. your Google Pay / PhonePe / Paytm merchant VPA)
NEXT_PUBLIC_UPI_ID=thefrozennight@upi

# Merchant or Academy Name shown in payment apps
NEXT_PUBLIC_UPI_MERCHANT_NAME=The Frozen Night Events

# Support phone numbers displayed on site and receipts
NEXT_PUBLIC_SUPPORT_PHONE_1=8432223222
NEXT_PUBLIC_SUPPORT_PHONE_2=8385969285

# ==========================================
# ADMIN CREDENTIALS
# ==========================================
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tfnkishangarh2026
ADMIN_SECRET_SESSION=tfn-garba-secret-salt-kishangarh-2026

# ==========================================
# OPTIONAL PAYMENT GATEWAYS (Razorpay/Cashfree)
# ==========================================
PAYMENT_GATEWAY_KEY=
PAYMENT_GATEWAY_SECRET=

# ==========================================
# OPTIONAL SUPABASE / POSTGRESQL (Production)
# ==========================================
# If left blank, the app uses its high-speed local transactional database.
# For production on Supabase, add your connection strings:
DATABASE_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## 🗄️ Database: Supabase vs Node.js

### How it works:
- **Local Dev / Immediate Testing**: The embedded database manager (`lib/db.ts`) handles atomic slot decrementing, UTR submissions, and registration persistence in `data/database.json`.
- **Production Supabase Deployment**:
  1. Create a free project on [Supabase.com](https://supabase.com).
  2. Open the **SQL Editor** in Supabase.
  3. Copy and run the entire SQL script from `supabase_schema.sql` (creates tables `slots`, `registrations`, `admin_settings`, and the atomic stored procedure `book_slot_atomic`).
  4. Paste your Supabase `DATABASE_URL` or `SUPABASE_URL` + keys into `.env.local`.

---

## 🔐 Admin Portal Access

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Default Username**: `admin`
- **Default Password**: `tfnkishangarh2026`

From the admin panel you can:
- Verify submitted UTR payments (instantly changes status to PAID).
- Modify seat capacities for any batch (e.g., raise from 35 to 50).
- Download individual participant PDF receipts or export the full CSV.
- Update UPI ID and pricing dynamically.

---

## 🌐 Deploying to Production

### Option A: Vercel (Recommended for Next.js)
1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select this repository.
4. In Environment Variables, add:
   - `NEXT_PUBLIC_UPI_ID`
   - `NEXT_PUBLIC_UPI_MERCHANT_NAME`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `DATABASE_URL` (your Supabase PostgreSQL URI)
5. Click **Deploy**.

### Option B: Render / VPS
1. Connect repository on [render.com](https://render.com) as a **Web Service**.
2. Environment: `Node`.
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Add your environment variables and launch!

---

## 📞 Event Contact & Credits

- **Organized by**: THE FROZEN NIGHT – Event and Entertainments
- **Choreographed by**: Manish & Neel Sir
- **Helplines**: `+91 843 222 3222` | `+91 838 596 9285`
- **Location**: TFN Dance Academy Studio, Kishangarh, Rajasthan
- **Tagline**: *Dance | Learn | Grow | Together*
