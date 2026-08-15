"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TopClientSection from "@/components/TopClientSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import TypingTitleSection from "@/components/TypingTitleSection";
import HorizontalProcessSection from "@/components/HorizontalProcessSection";
import WhyMeSection from "@/components/WhyMeSection";
import FooterSection from "@/components/FooterSection";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  const [lang, setLang] = useState<"vi" | "en">("en");
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#121212] text-white selection:bg-[#00DC6C] selection:text-black overflow-x-hidden">
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

      {/* Section 2: Top Client logos & Featured Projects Scroll-Snap Flow */}
      <TopClientSection
        lang={lang}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Section 3: Typing Title 100vh Scroll Animation ("How I design a product, from end to end") */}
      <TypingTitleSection />

      {/* Section 5: Horizontal Scroll Process Cards (01, 02, 03, 04) */}
      <HorizontalProcessSection
        lang={lang}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Section 6: Why me & Top-to-Bottom Appear Animation + Running Marquee Ticker */}
      <WhyMeSection
        lang={lang}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Section 7: Footer (Top green banner + Bottom dark branding block) */}
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
