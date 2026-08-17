"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactModal from "@/components/ContactModal";
import FooterSection from "@/components/FooterSection";

const trustedPartners = [
  { name: "ROGO Solutions", src: "/images/Rogo_color.svg" },
  { name: "FPT Smart Home", src: "/images/FPTSmartHome_color.svg" },
  { name: "Rạng Đông", src: "/images/RangDong_color.svg" },
  { name: "AN TAXI", src: "/images/Antaxi_color.svg" },
  { name: "VietinBank Securities", src: "/images/VietinBankS_color.svg" },
  { name: "VCBS", src: "/images/VCBS_color.svg" },
  { name: "Think & Action", src: "/images/Think_Action_color.svg" },
];

export default function AboutPage() {
  const [lang, setLang] = useState<"vi" | "en">("en");
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-[#121212] text-white selection:bg-[#00DC6C] selection:text-black overflow-x-hidden scroll-smooth">
      {/* Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenContact={() => setContactModalOpen(true)}
      />

      <main className="w-full">
        
        {/* SECTION 1: HERO SECTION (Profile Photo + Mission + Skills) */}
        <section className="w-full min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-6 md:px-12 lg:px-[10vh] pt-[80px] pb-8 border-b border-white/5 bg-[#121212] relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Image: Full Cutout Photo of KhanhTruong */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[360px] lg:max-w-[400px] aspect-[3/4] rounded-[12px] overflow-hidden shadow-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
                <Image
                  src="/images/KT_profilie.png"
                  alt="KhanhTruong Nguyen"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Right Content: Mission Statement & Skills Table */}
            <div className="lg:col-span-7 space-y-8 lg:space-y-10">
              {/* Main Headline */}
              <h1 className="text-h4 sm:text-h3 font-bold leading-tight text-white tracking-tight">
                Bridging the gap between high-fidelity aesthetic vision and rigorous technical execution for enterprise and IoT platforms.
              </h1>

              {/* Skills Sub-table (What I Do & Expertise) */}
              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10">
                {/* What I Do Column */}
                <div className="space-y-3">
                  <div className="text-b3 font-bold uppercase tracking-widest text-white/50">
                    What I Do
                  </div>
                  <ul className="space-y-2 text-h7 md:text-h6 font-medium text-[#E8C468]">
                    <li>UX Research</li>
                    <li>Wireframing</li>
                    <li>UI Consulting</li>
                    <li>Consult DEV</li>
                  </ul>
                </div>

                {/* Expertise Column */}
                <div className="space-y-3">
                  <div className="text-b3 font-bold uppercase tracking-widest text-white/50">
                    Expertise
                  </div>
                  <ul className="space-y-2 text-h7 md:text-h6 font-medium text-[#E8C468]">
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

        {/* SECTION 2: EXPERIENCE / MY JOURNEY */}
        <section className="w-full min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-6 md:px-12 lg:px-[10vh] pt-[80px] pb-8 border-b border-white/5 bg-[#121212] relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Experience Tag, Big Title & CV Downloads */}
            <div className="lg:col-span-4 space-y-6 pr-4">
              <div className="text-h5 uppercase tracking-widest text-[#00DC6C] font-bold">
                Experience
              </div>

              <h2 className="text-h2 sm:text-h1 font-bold text-white tracking-tight">
                <div>My</div>
                <div>journey</div>
              </h2>

              {/* Download CV Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href="/CV_NguyenKhanhTruong_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black text-h7 font-bold px-6 py-3.5 rounded-[12px] hover:bg-neutral-200 transition-colors shadow-lg active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV – Tiếng Việt</span>
                </a>

                <a
                  href="/CV_NguyenKhanhTruong_EN_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#181818] border border-white/20 text-white text-h7 font-bold px-6 py-3.5 rounded-[12px] hover:bg-white/10 transition-colors active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV – English</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Timeline List */}
            <div className="lg:col-span-8 space-y-6 lg:space-y-8">
              
              {/* Job 1: UI/UX Product Designer */}
              <div className="relative pl-8 border-l-2 border-white/10 space-y-2">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#00DC6C] ring-4 ring-[#121212]" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-h5 md:text-h4 font-bold text-white">
                    UI/UX Product Designer
                  </h3>
                  <span className="text-b3 text-[#E8C468] uppercase tracking-wider font-semibold">
                    Jul 2024 – Jul 2026
                  </span>
                </div>

                <div className="text-h7 text-[#00DC6C] font-semibold">
                  Rogo Solutions
                </div>

                <p className="text-b2 md:text-b1 text-white/70 pt-0.5">
                  A whitelabel IoT & SaaS ecosystem — powering multi-tenant platforms for enterprise partners across Vietnam.
                </p>
              </div>

              {/* Job 2: Web & Graphic Designer */}
              <div className="relative pl-8 border-l-2 border-white/10 space-y-2">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#00DC6C]/40 border-2 border-[#00DC6C] ring-4 ring-[#121212]" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-h5 md:text-h4 font-bold text-white">
                    Web & Graphic Designer
                  </h3>
                  <span className="text-b3 text-[#E8C468] uppercase tracking-wider font-semibold">
                    Aug 2023 – Oct 2024
                  </span>
                </div>

                <div className="text-h7 text-[#00DC6C] font-semibold">
                  Think & Action Agency
                </div>

                <p className="text-b2 md:text-b1 text-white/70 pt-0.5">
                  A leading branding & marketing agency in Hanoi, helping thousands of Vietnamese businesses build their brand identity.
                </p>
              </div>

              {/* Job 3: UX/UI Design Intern */}
              <div className="relative pl-8 border-l-2 border-white/10 space-y-2">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white/20 border-2 border-white/40 ring-4 ring-[#121212]" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-h5 md:text-h4 font-bold text-white">
                    UX/UI Design Intern
                  </h3>
                  <span className="text-b3 text-[#E8C468] uppercase tracking-wider font-semibold">
                    2022
                  </span>
                </div>

                <div className="text-h7 text-[#00DC6C] font-semibold">
                  FPT Software – DES Department
                </div>

                <p className="text-b2 md:text-b1 text-white/70 pt-0.5">
                  Vietnam's largest software company, delivering IT & digital transformation services to enterprises across 30+ countries.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 3: TRUSTED BY LOGOS */}
        <section className="w-full min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-6 md:px-12 lg:px-[10vh] pt-[80px] pb-8 border-b border-white/5 bg-[#121212] overflow-hidden">
          <div className="max-w-[1440px] mx-auto w-full my-auto text-center space-y-12">
            <div className="text-b3 font-mono uppercase tracking-widest text-white/60 font-bold">
              TRUSTED BY
            </div>

            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14 lg:gap-16">
              {trustedPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="relative h-[36px] w-[130px] sm:w-[150px] md:w-[160px] flex items-center justify-center group"
                >
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    fill
                    className="object-contain filter brightness-0 invert opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: EDUCATION & CERTIFICATIONS */}
        <section className="w-full min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-6 md:px-12 lg:px-[10vh] pt-[80px] pb-8 border-b border-white/5 bg-[#121212] relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Vertical Title: Education & Certifications */}
            <div className="lg:col-span-3 flex lg:justify-start">
              <div className="text-h4 lg:text-h3 font-bold uppercase tracking-wider text-[#E8C468]">
                <div className="text-white">Education &</div>
                <div>Certifications</div>
              </div>
            </div>

            {/* Right Cards Grid */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Card 1 (Left Tall Card): Design Craft & UX & AI Practice */}
              <div className="bg-[#161D19] border border-[#00DC6C]/20 p-6 lg:p-8 rounded-[12px] space-y-6">
                {/* Block A: Design Craft */}
                <div className="space-y-2">
                  <div className="text-b3 font-mono font-bold text-[#00DC6C] uppercase">Design Craft</div>
                  <h3 className="text-h5 font-bold text-[#E8C468]">
                    FPT Arena Multimedia ADIM Certificate • 2022–2024
                  </h3>
                  <p className="text-b3 md:text-b2 text-white/70">
                    Formal visual design training — graphic design, layout, typography, and digital media production.
                  </p>
                </div>

                {/* Block B: UX & AI Practice */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="text-b3 font-mono font-bold text-[#E8C468] uppercase">UX & AI Practice</div>
                  
                  <div className="space-y-1.5">
                    <h4 className="text-h7 font-bold text-white">
                      Google UX Design Professional Certificate • 2024
                    </h4>
                    <p className="text-b3 md:text-b2 text-white/70">
                      End-to-end UX methodology — research, wireframing, prototyping, and usability testing.
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <h4 className="text-h7 font-bold text-white">
                      Google AI Essentials Certificate • 2025
                    </h4>
                    <p className="text-b3 md:text-b2 text-white/70">
                      Applied AI in real workflows — directly maps to Claude AI and Gemini CLI usage in current projects.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 & 3 (Right Stack Cards): Technical Foundation & Language */}
              <div className="space-y-6 flex flex-col justify-between">
                
                {/* Card 2: Technical Foundation */}
                <div className="bg-[#161D19] border border-[#00DC6C]/20 p-6 lg:p-8 rounded-[12px] space-y-3 flex-1">
                  <div className="text-b3 font-mono font-bold text-[#00DC6C] uppercase">Technical Foundation</div>
                  <h3 className="text-h5 font-bold text-[#E8C468]">
                    Hanoi University of Industry • Electrical Engineering • 2019–2023
                  </h3>
                  <p className="text-b3 md:text-b2 text-white/70">
                    Electrical engineering background — directly relevant to IoT system design
                  </p>
                </div>

                {/* Card 3: Language */}
                <div className="bg-[#161D19] border border-[#00DC6C]/20 p-6 lg:p-8 rounded-[12px] space-y-3 flex-1">
                  <div className="text-b3 font-mono font-bold text-[#00DC6C] uppercase">Language</div>
                  <h3 className="text-h5 font-bold text-[#E8C468]">
                    English • TOEIC 850 (B2)
                  </h3>
                  <p className="text-b3 md:text-b2 text-white/70">
                    Comfortable working with English-speaking clients and remote teams.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* SECTION 5: FEATURED PRODUCT / VISIT MY FEATURED WORK */}
        <section className="w-full min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-6 md:px-12 lg:px-[10vh] border-b border-white/5 bg-[#121212] relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Headline */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-h3 sm:text-h2 font-bold text-white tracking-tight">
                <div className="border-b border-white/20 pb-4 mb-4">Visit my</div>
                <div>featured work</div>
              </h2>

              <div className="pt-2">
                <Link
                  href="/works"
                  className="inline-flex items-center gap-3 bg-[#00DC6C] text-black text-h7 font-bold px-8 py-4 rounded-[12px] hover:bg-[#00c560] transition-colors shadow-2xl active:scale-95"
                >
                  <span>Explore Portfolio</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right Large Monitor Mockup */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-b3 font-mono uppercase tracking-widest text-white/60 font-bold text-right">
                Featured product
              </div>

              <div className="relative w-full aspect-[16/10] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 bg-[#181818]">
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

        {/* Unified Footer Section (Sync across all pages) */}
        <FooterSection
          lang={lang}
          onOpenContact={() => setContactModalOpen(true)}
        />

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
