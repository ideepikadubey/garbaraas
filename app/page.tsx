'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WorkshopHighlightsSection from '@/components/WorkshopHighlightsSection';
import WhatYouWillLearn from '@/components/WhatYouWillLearn';
import UrgencyBannerSection from '@/components/UrgencyBannerSection';
import SpecialWorkshopsSection from '@/components/SpecialWorkshopsSection';
import SlotsSection from '@/components/SlotsSection';
import PricingSection from '@/components/PricingSection';
import PrizeCategoriesSection from '@/components/PrizeCategoriesSection';
import ChoreographersSection from '@/components/ChoreographersSection';
import Footer from '@/components/Footer';
import MobileStickyBar from '@/components/MobileStickyBar';
import FloatingCallButton from '@/components/FloatingCallButton';
import RegistrationModal from '@/components/RegistrationModal';
import ReceiptLookupModal from '@/components/ReceiptLookupModal';
import { CategoryType, Slot } from '@/lib/types';

export default function HomePage() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [lookupModalOpen, setLookupModalOpen] = useState(false);

  const [preSelectedCategory, setPreSelectedCategory] = useState<CategoryType | undefined>(undefined);
  const [preSelectedSlot, setPreSelectedSlot] = useState<Slot | undefined>(undefined);

  const handleOpenRegister = (category?: CategoryType) => {
    setPreSelectedCategory(category);
    setPreSelectedSlot(undefined);
    setRegisterModalOpen(true);
  };

  const handleSelectSlot = (slot: Slot) => {
    setPreSelectedSlot(slot);
    const isBoysSlot = slot.batchName.toLowerCase().includes('boys');
    if (isBoysSlot) {
      setPreSelectedCategory('BOYS_DANDIYA');
    } else {
      setPreSelectedCategory('FEMALE');
    }
    setRegisterModalOpen(true);
  };

  const handleScrollToSlots = () => {
    const el = document.getElementById('slots');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-mandala-pattern">
      
      {/* Top Sticky Navigation */}
      <Navbar
        onOpenRegister={() => handleOpenRegister()}
        onOpenLookup={() => setLookupModalOpen(true)}
      />

      {/* Main Festive Hero Section */}
      <HeroSection
        onOpenRegister={() => handleOpenRegister()}
        onScrollToSlots={handleScrollToSlots}
      />

      {/* Workshop Highlights Strip (New Batches Announcement, Free Pass & 4 Info Cards) */}
      <WorkshopHighlightsSection
        onOpenRegister={() => handleOpenRegister()}
        onScrollToSlots={handleScrollToSlots}
      />

      {/* 8 Learning Modules */}
      <WhatYouWillLearn />

      {/* High-Converting Urgency / FOMO Banner ("बाद में? Baad Me Class Full Ho Jaati Hai!!") */}
      <UrgencyBannerSection
        onOpenRegister={() => handleOpenRegister()}
        onScrollToSlots={handleScrollToSlots}
      />

      {/* Real-time Workshop Locations & Slots Availability */}
      <SlotsSection onSelectSlot={handleSelectSlot} />

      {/* Newly Announced Special Workshops (15-Day Female Garba & 15-Day Boys Dandiya) */}
      <SpecialWorkshopsSection
        onSelectCategory={handleOpenRegister}
        onScrollToSlots={handleScrollToSlots}
      />

      {/* Pricing Tiers & Free Family Pass Banner */}
      <PricingSection onSelectCategory={handleOpenRegister} />

      {/* Prize Categories (Adults & Kids) */}
      <PrizeCategoriesSection />

      {/* Choreographers Manish & Neel Sir & Contact */}
      <ChoreographersSection />

      {/* Footer */}
      <Footer
        onOpenRegister={() => handleOpenRegister()}
        onOpenLookup={() => setLookupModalOpen(true)}
      />

      {/* Mobile Sticky CTA Bar */}
      <MobileStickyBar onOpenRegister={() => handleOpenRegister()} />

      {/* Floating Direct Call & Helpline Button */}
      <FloatingCallButton />

      {/* Multi-step Registration & Payment Modal */}
      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        preSelectedCategory={preSelectedCategory}
        preSelectedSlot={preSelectedSlot}
      />

      {/* Receipt Lookup & Re-download Modal */}
      <ReceiptLookupModal
        isOpen={lookupModalOpen}
        onClose={() => setLookupModalOpen(false)}
      />

    </main>
  );
}

