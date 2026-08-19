"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TopClientSection from "@/components/TopClientSection";
import TypingTitleSection from "@/components/TypingTitleSection";
import HorizontalProcessSection from "@/components/HorizontalProcessSection";
import WhyMeSection from "@/components/WhyMeSection";
import FooterSection from "@/components/FooterSection";
import ContactModal from "@/components/ContactModal";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { lang, setLang } = useLanguage();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#121212] text-white selection:bg-[#00DC6C] selection:text-black overflow-x-clip snap-y snap-proximity">
      {/* Dynamic Top Navigation Bar (Floating Hero Pill -> Minimal Fixed Topnav) */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Section 1: Hero Section */}
      <HeroSection
        lang={lang}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Section 2: Typing Title 100vh Scroll Animation ("I design the product / Then I ship it") */}
      <TypingTitleSection />

      {/* Section 3: Horizontal Scroll Process Cards ("How a product actually gets made") */}
      <HorizontalProcessSection
        lang={lang}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Section 4: Top Client logos & Featured Projects Scroll-Snap Flow (ROGO + Rạng Đông) */}
      <TopClientSection
        lang={lang}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Section 5: Why me & Top-to-Bottom Appear Animation + Running Marquee Ticker */}
      <WhyMeSection
        lang={lang}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Section 6: Footer (Top green banner + Bottom dark branding block) */}
      <FooterSection
        lang={lang}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Interactive Contact Modal Popup */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        lang={lang}
      />
    </main>
  );
}
