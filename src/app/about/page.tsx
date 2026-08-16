"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, Mail, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactModal from "@/components/ContactModal";

export default function AboutPage() {
  const [lang, setLang] = useState<"vi" | "en">("en");
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-[#00DC6C] selection:text-black overflow-x-hidden">
      {/* Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenContact={() => setContactModalOpen(true)}
      />

      <main className="pt-24 pb-20">
        
        {/* HERO SECTION (Screenshot 2) */}
        <section className="w-full pt-12 pb-24 px-6 md:px-12 lg:px-[80px] border-b border-white/5 bg-[#121212]">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image: Full Cutout Photo of KhanhTruong (Screenshot 2) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
                <Image
                  src="/images/KT_profilie.png"
                  alt="KhanhTruong Nguyen"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Right Content: Big Mission Statement & Skills Table (Screenshot 2) */}
            <div className="lg:col-span-7 space-y-12">
              {/* Main Headline */}
              <h1 className="font-mono text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight text-white tracking-tight">
                Bridging the gap between high-fidelity aesthetic vision and rigorous technical execution for enterprise and IoT platforms.
              </h1>

              {/* Skills Sub-table (What I Do & Expertise) */}
              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10 font-mono">
                {/* What I Do Column */}
                <div className="space-y-4">
                  <div className="text-xs uppercase tracking-widest text-white/50 font-bold">
                    What I Do
                  </div>
                  <ul className="space-y-2 text-base md:text-lg font-medium text-[#E8C468]">
                    <li>UX Research</li>
                    <li>Wireframing</li>
                    <li>UI Consulting</li>
                    <li>Consult DEV</li>
                  </ul>
                </div>

                {/* Expertise Column */}
                <div className="space-y-4">
                  <div className="text-xs uppercase tracking-widest text-white/50 font-bold">
                    Expertise
                  </div>
                  <ul className="space-y-2 text-base md:text-lg font-medium text-[#E8C468]">
                    <li>Saas</li>
                    <li>Mobile app</li>
                    <li>Desktop app</li>
                    <li>Web app</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: EXPERIENCE / MY JOURNEY (Screenshot 3) */}
        <section className="w-full py-24 px-6 md:px-12 lg:px-[80px] border-b border-white/5 bg-[#121212]">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Experience Tag, Big Title & CV Downloads (Screenshot 3) */}
            <div className="lg:col-span-4 space-y-8 pr-4">
              <div className="font-mono text-[24px] uppercase tracking-widest text-[#00DC6C] font-bold">
                Experience
              </div>

              <h2 className="font-sans text-5xl sm:text-6xl lg:text-[68px] font-bold text-white leading-none tracking-tight">
                <div>My</div>
                <div>journey</div>
              </h2>

              {/* Download CV Buttons */}
              <div className="space-y-4 pt-4">
                <a
                  href="/CV_NguyenKhanhTruong_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black font-mono text-sm font-bold px-6 py-3.5 rounded-xl hover:bg-neutral-200 transition-colors shadow-lg active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV – Tiếng Việt</span>
                </a>

                <a
                  href="/CV_NguyenKhanhTruong_EN_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#181818] border border-white/20 text-white font-mono text-sm font-bold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV – English</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Timeline List (Screenshot 3) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Job 1: UI/UX Product Designer */}
              <div className="relative pl-8 border-l-2 border-white/10 space-y-3">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#00DC6C] ring-4 ring-[#121212]" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    UI/UX Product Designer
                  </h3>
                  <span className="text-xs text-[#E8C468] uppercase tracking-wider font-semibold">
                    Jul 2024 – Jul 2026
                  </span>
                </div>

                <div className="font-mono text-sm text-[#00DC6C] font-semibold">
                  Rogo Solutions
                </div>

                <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed pt-1">
                  A whitelabel IoT & SaaS ecosystem — powering multi-tenant platforms for enterprise partners across Vietnam.
                </p>
              </div>

              {/* Job 2: Web & Graphic Designer */}
              <div className="relative pl-8 border-l-2 border-white/10 space-y-3">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#00DC6C]/40 border-2 border-[#00DC6C] ring-4 ring-[#121212]" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Web & Graphic Designer
                  </h3>
                  <span className="text-xs text-[#E8C468] uppercase tracking-wider font-semibold">
                    Aug 2023 – Oct 2024
                  </span>
                </div>

                <div className="font-mono text-sm text-[#00DC6C] font-semibold">
                  Think & Action Agency
                </div>

                <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed pt-1">
                  A leading branding & marketing agency in Hanoi, helping thousands of Vietnamese businesses build their brand identity.
                </p>
              </div>

              {/* Job 3: UX/UI Design Intern */}
              <div className="relative pl-8 border-l-2 border-white/10 space-y-3">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white/20 border-2 border-white/40 ring-4 ring-[#121212]" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    UX/UI Design Intern
                  </h3>
                  <span className="text-xs text-[#E8C468] uppercase tracking-wider font-semibold">
                    2022
                  </span>
                </div>

                <div className="font-mono text-sm text-[#00DC6C] font-semibold">
                  FPT Software – DES Department
                </div>

                <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed pt-1">
                  Vietnam's largest software company, delivering IT & digital transformation services to enterprises across 30+ countries.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 3: TRUSTED BY LOGOS MARQUEE (Screenshot 4) */}
        <section className="w-full py-16 px-6 border-b border-white/5 bg-[#121212] overflow-hidden">
          <div className="max-w-[1440px] mx-auto text-center space-y-8">
            <div className="font-mono text-xs uppercase tracking-widest text-white/60 font-bold">
              TRUSTED BY
            </div>

            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
              {["ROGO Solutions", "FPT Smart Home", "Rạng Đông", "AN TAXI", "VietinBank Securities", "VCBS", "THINK & ACTION"].map((partner) => (
                <span key={partner} className="font-mono text-lg md:text-xl font-bold text-white/80 tracking-wider">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: EDUCATION & CERTIFICATIONS (Screenshot 5) */}
        <section className="w-full py-24 px-6 md:px-12 lg:px-[80px] border-b border-white/5 bg-[#121212]">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Vertical Title: Education & Certifications (Screenshot 5) */}
            <div className="lg:col-span-3 flex lg:justify-start">
              <div className="font-mono text-3xl lg:text-[42px] font-bold leading-tight uppercase tracking-wider text-[#E8C468]">
                <div className="text-white">Education &</div>
                <div>Certifications</div>
              </div>
            </div>

            {/* Right Cards Grid (Screenshot 5) */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Card 1 (Left Tall Card): Design Craft & UX & AI Practice */}
              <div className="bg-[#161D19] border border-[#00DC6C]/20 p-8 rounded-3xl space-y-8">
                {/* Block A: Design Craft */}
                <div className="space-y-3">
                  <div className="font-mono text-xs font-bold text-[#00DC6C] uppercase">Design Craft</div>
                  <h3 className="font-mono text-2xl font-bold text-[#E8C468]">
                    FPT Arena Multimedia ADIM Certificate • 2022–2024
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed">
                    Formal visual design training — graphic design, layout, typography, and digital media production.
                  </p>
                </div>

                {/* Block B: UX & AI Practice */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="font-mono text-xs font-bold text-[#E8C468] uppercase">UX & AI Practice</div>
                  
                  <div className="space-y-2">
                    <h4 className="font-mono text-base font-bold text-white">
                      Google UX Design Professional Google Career Certificate • 2024
                    </h4>
                    <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed">
                      End-to-end UX methodology — research, wireframing, prototyping, and usability testing. Industry-standard certification.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h4 className="font-mono text-base font-bold text-white">
                      Google AI Essentials Google Career Certificate • 2025
                    </h4>
                    <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed">
                      Applied AI in real workflows — directly maps to Claude AI and Gemini CLI usage in current projects.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 & 3 (Right Stack Cards): Technical Foundation & Language */}
              <div className="space-y-8 flex flex-col justify-between">
                
                {/* Card 2: Technical Foundation */}
                <div className="bg-[#161D19] border border-[#00DC6C]/20 p-8 rounded-3xl space-y-4 flex-1">
                  <div className="font-mono text-xs font-bold text-[#00DC6C] uppercase">Technical Foundation</div>
                  <h3 className="font-mono text-2xl font-bold text-[#E8C468]">
                    Hanoi University of Industry • Electrical Engineering • 2019–2023
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed">
                    Electrical engineering background — directly relevant to IoT system design
                  </p>
                </div>

                {/* Card 3: Language */}
                <div className="bg-[#161D19] border border-[#00DC6C]/20 p-8 rounded-3xl space-y-4 flex-1">
                  <div className="font-mono text-xs font-bold text-[#00DC6C] uppercase">Language</div>
                  <h3 className="font-mono text-2xl font-bold text-[#E8C468]">
                    English • TOEIC 850 (B2)
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed">
                    Comfortable working with English-speaking clients and remote teams.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* SECTION 5: FEATURED PRODUCT / VISIT MY FEATURED WORK (Screenshot 6) */}
        <section className="w-full py-24 px-6 md:px-12 lg:px-[80px] border-b border-white/5 bg-[#121212]">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Headline */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-mono text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-tight tracking-tight">
                <div className="border-b border-white/20 pb-4 mb-4">Visit my</div>
                <div>featured work</div>
              </h2>

              <div className="pt-4">
                <Link
                  href="/works"
                  className="inline-flex items-center gap-3 bg-[#00DC6C] text-black font-mono text-base font-bold px-8 py-4 rounded-xl hover:bg-[#00c560] transition-colors shadow-2xl active:scale-95"
                >
                  <span>Explore Portfolio</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right Large Monitor Mockup (Screenshot 6) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-white/60 font-bold text-right">
                Featured product
              </div>

              <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#181818]">
                <Image
                  src="/images/Rogo_Platform_large.png"
                  alt="Featured product"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </section>

        {/* BOTTOM CTA BANNER: Green Background (Screenshot 7) */}
        <section className="w-full bg-[#00DC6C] text-black py-20 px-6 md:px-12 lg:px-[80px]">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Big Heading + Contact Button */}
            <div className="lg:col-span-7 space-y-8">
              <h2 className="font-mono text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none text-black">
                <div>Start something</div>
                <div>great together</div>
              </h2>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={() => setContactModalOpen(true)}
                  className="cta-btn h-[56px] min-h-[56px] rounded-[8px] bg-black hover:bg-neutral-900 text-white font-mono text-base font-bold px-8 transition-all flex items-center gap-3 cursor-pointer shadow-2xl active:scale-95"
                >
                  <span>Contact</span>
                  <span className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center font-bold">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column: Menu Links */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-12 lg:border-l lg:border-black/20 lg:pl-12">
              <div className="flex flex-col gap-6 font-mono text-3xl md:text-5xl font-bold uppercase tracking-wider text-black">
                <Link href="/works" className="hover:opacity-75 transition-opacity">
                  MY WORKS
                </Link>
                <Link href="/about" className="hover:opacity-75 transition-opacity">
                  ABOUT ME
                </Link>
                <button
                  onClick={() => setContactModalOpen(true)}
                  className="text-left hover:opacity-75 transition-opacity cursor-pointer"
                >
                  CONTACT
                </button>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-6 font-mono text-sm font-bold text-black/80 pt-8">
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Tiktok
                </a>
                <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Behance
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Linkedin
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* FOOTER TEXT (Screenshot 7) */}
        <footer className="w-full bg-[#121212] text-white py-12 px-6 md:px-12 lg:px-[80px] border-t border-white/10">
          <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 font-mono">
            <h1 className="text-4xl md:text-6xl font-bold text-[#00DC6C] tracking-tight">
              KhanhTruong Nguyen
            </h1>
            <div className="text-sm font-bold text-white">
              Vietnam 2026
            </div>
          </div>
        </footer>

      </main>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
