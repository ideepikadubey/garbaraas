-- =======================================================
-- TFN GARBA & DANDIYA WORKSHOP - SUPABASE / POSTGRES SCHEMA
-- Kishangarh, Rajasthan
-- =======================================================

-- 1. Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Slots Table
CREATE TABLE IF NOT EXISTS slots (
    id VARCHAR(64) PRIMARY KEY,
    location_id VARCHAR(64) NOT NULL,
    location_name VARCHAR(128) NOT NULL,
    location_address VARCHAR(256),
    batch_name VARCHAR(64) NOT NULL,
    start_time VARCHAR(32) NOT NULL,
    end_time VARCHAR(32) NOT NULL,
    capacity INT NOT NULL DEFAULT 40,
    booked_seats INT NOT NULL DEFAULT 0,
    status VARCHAR(32) NOT NULL DEFAULT 'AVAILABLE', -- 'AVAILABLE', 'ALMOST_FULL', 'FULL'
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
    id VARCHAR(64) PRIMARY KEY, -- e.g. TFN-2026-XXXX
    category VARCHAR(64) NOT NULL, -- 'FEMALE', 'OLD_STUDENT', 'GROUP', 'KIDS'
    category_label VARCHAR(128) NOT NULL,
    participant_name VARCHAR(128) NOT NULL,
    mobile VARCHAR(16) NOT NULL,
    whatsapp VARCHAR(16),
    email VARCHAR(128),
    age INT,
    gender VARCHAR(16) NOT NULL,
    city VARCHAR(128) DEFAULT 'Kishangarh',
    address TEXT,
    emergency_name VARCHAR(128),
    emergency_phone VARCHAR(16),
    
    -- Kids specific
    is_kids BOOLEAN DEFAULT FALSE,
    guardian_name VARCHAR(128),
    guardian_phone VARCHAR(16),
    child_age INT,
    
    -- Old Student / Group specific
    is_old_student BOOLEAN DEFAULT FALSE,
    father_or_husband_name VARCHAR(128),
    is_group BOOLEAN DEFAULT FALSE,
    members_count INT DEFAULT 1,
    group_leader_name VARCHAR(128),
    group_leader_phone VARCHAR(16),
    group_members JSONB,
    
    -- Workshop Slot
    slot_id VARCHAR(64) NOT NULL REFERENCES slots(id),
    workshop_date VARCHAR(64) NOT NULL DEFAULT '13th Sept to 11th Oct',
    location_name VARCHAR(128) NOT NULL,
    batch_time VARCHAR(64) NOT NULL,
    
    -- Pricing
    fee_per_person INT NOT NULL,
    total_amount INT NOT NULL,
    has_free_family_pass BOOLEAN DEFAULT TRUE,
    
    -- Payment & Booking Statuses
    payment_status VARCHAR(32) NOT NULL DEFAULT 'PAYMENT_PENDING',
    -- 'PAYMENT_PENDING', 'PAYMENT_SUBMITTED', 'PAYMENT_VERIFIED', 'PAYMENT_FAILED', 'PAYMENT_REFUNDED'
    booking_status VARCHAR(32) NOT NULL DEFAULT 'PENDING',
    -- 'PENDING', 'CONFIRMED', 'CANCELLED'
    
    utr_number VARCHAR(64),
    payment_date VARCHAR(64),
    payment_screenshot TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Admin Settings Table (Configurable UPI, Merchant, Pricing)
CREATE TABLE IF NOT EXISTS admin_settings (
    key VARCHAR(64) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Anti Double-Booking Concurrency Function & Stored Procedure (Clean & Secure)
CREATE OR REPLACE FUNCTION public.book_slot_atomic(
    p_slot_id VARCHAR(64),
    p_members_count INT
)
RETURNS JSONB 
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
    v_capacity INT;
    v_booked INT;
    v_remaining INT;
BEGIN
    -- Select with row lock to prevent race conditions
    SELECT capacity, booked_seats INTO v_capacity, v_booked
    FROM slots
    WHERE id = p_slot_id FOR UPDATE;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', 'Slot not found');
    END IF;
    
    v_remaining := v_capacity - v_booked;
    
    IF v_remaining < p_members_count THEN
        RETURN jsonb_build_object(
            'success', false, 
            'error', 'Slot is full or insufficient seats remaining',
            'remaining', v_remaining
        );
    END IF;
    
    -- Increment booked seats
    UPDATE slots
    SET booked_seats = booked_seats + p_members_count,
        status = CASE 
            WHEN (booked_seats + p_members_count) >= capacity THEN 'FULL'
            WHEN (capacity - (booked_seats + p_members_count)) <= 5 THEN 'ALMOST_FULL'
            ELSE 'AVAILABLE'
        END,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_slot_id;
    
    RETURN jsonb_build_object('success', true, 'remaining', v_remaining - p_members_count);
END;
$$;

-- Revoke insecure public execute on rls_auto_enable if present
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_proc p 
        JOIN pg_namespace n ON p.pronamespace = n.oid 
        WHERE n.nspname = 'public' AND p.proname = 'rls_auto_enable'
    ) THEN
        EXECUTE 'REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;';
    END IF;
END $$;

-- 6. Disable RLS or Allow Public Access for Anon API Key
ALTER TABLE slots DISABLE ROW LEVEL SECURITY;
ALTER TABLE registrations DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings DISABLE ROW LEVEL SECURITY;

-- 7. Seed Default Initial Slots (Baseline with real-time seat allocation)
INSERT INTO slots (id, location_id, location_name, location_address, batch_name, start_time, end_time, capacity, booked_seats, status)
VALUES
  ('slot-tfn-1', 'loc-tfn', 'TFN Studio', 'The Frozen Night Dance Academy Studio, Kishangarh', 'Batch 1', '09:00 AM', '10:00 AM', 35, 0, 'AVAILABLE'),
  ('slot-tfn-2', 'loc-tfn', 'TFN Studio', 'The Frozen Night Dance Academy Studio, Kishangarh', 'Batch 2', '10:00 AM', '11:00 AM', 35, 0, 'AVAILABLE'),
  ('slot-bang-1', 'loc-bang', 'Bang Marriage Hall', 'Near City Station, Kishangarh', 'Batch 1', '12:00 PM', '01:00 PM', 50, 0, 'AVAILABLE'),
  ('slot-bang-2', 'loc-bang', 'Bang Marriage Hall', 'Near City Station, Kishangarh', 'Batch 2', '01:00 PM', '02:00 PM', 50, 0, 'AVAILABLE'),
  ('slot-bang-3', 'loc-bang', 'Bang Marriage Hall', 'Near City Station, Kishangarh', 'Batch 3', '02:00 PM', '03:00 PM', 50, 0, 'AVAILABLE'),
  ('slot-bang-4', 'loc-bang', 'Bang Marriage Hall', 'Near City Station, Kishangarh', 'Batch 4', '03:00 PM', '04:00 PM', 50, 0, 'AVAILABLE'),
  ('slot-bang-5', 'loc-bang', 'Bang Marriage Hall', 'Near City Station, Kishangarh', 'Batch 5', '04:00 PM', '05:00 PM', 50, 0, 'AVAILABLE'),
  ('slot-cricket-1', 'loc-cricket', 'Cricket Academy (Turf, Kishangarh)', 'Opposite Crystal Park, Kishangarh', 'Batch 1', '06:00 PM', '07:00 PM', 60, 0, 'AVAILABLE'),
  ('slot-cricket-2', 'loc-cricket', 'Cricket Academy (Turf, Kishangarh)', 'Opposite Crystal Park, Kishangarh', 'Batch 2', '07:00 PM', '08:00 PM', 60, 0, 'AVAILABLE'),
  ('slot-bang-eve-1', 'loc-bang', 'Bang Marriage Hall', 'Near City Station, Kishangarh', 'Evening Batch', '08:00 PM', '09:00 PM', 60, 0, 'AVAILABLE')
ON CONFLICT (id) DO NOTHING;
