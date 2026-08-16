"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail, Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactModal from "@/components/ContactModal";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function WorksPage() {
  const [lang, setLang] = useState<"vi" | "en">("en");
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Section 1 scroll tracking for 500vh step snap scroll sequence
  const section1Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: section1Progress } = useScroll({
    target: section1Ref,
    container: containerRef,
    offset: ["start start", "end end"],
  });

  // Step state for Section 1 sequential animation sequence:
  // Step 0 (0.00-0.15): Intro Tag & Heading appear (Screenshot 1)
  // Step 1 (0.15-0.35): Description paragraph fades in + Indicator & Project Image peek appear on right
  // Step 2 (0.35-0.55): Intro text slides left & disappears; Full 3-Column Project View enters - Platform Layer
  // Step 3 (0.55-0.75): Framework layer card & details appear
  // Step 4 (0.75-0.95): Instance layer card & details appear
  // Step 5 (>0.95): Scroll snaps to Section 2 (IoT tools)
  const [step, setStep] = useState<number>(0);

  useMotionValueEvent(section1Progress, "change", (latest) => {
    if (latest < 0.15) {
      setStep(0);
    } else if (latest < 0.35) {
      setStep(1);
    } else if (latest < 0.55) {
      setStep(2);
    } else if (latest < 0.75) {
      setStep(3);
    } else {
      setStep(4);
    }
  });

  const activeLayer = step <= 2 ? 0 : step === 3 ? 1 : 2;

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-[#121212] text-white font-sans selection:bg-[#00DC6C] selection:text-black overflow-x-hidden scroll-smooth"
    >
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenContact={() => setContactModalOpen(true)}
      />

      <main className="w-full">
        
        {/* SECTION 1: SYSTEM THINKING (500vh tall container with CSS Snap Targets for each discrete step) */}
        <section
          ref={section1Ref}
          className="relative w-full h-[500vh] bg-[#121212] border-b border-white/5 snap-start"
        >
          {/* CSS Scroll Snap Step Anchors */}
          <div className="absolute inset-0 w-full h-full flex flex-col justify-between pointer-events-none z-0">
            <div className="h-screen w-full snap-start snap-always" />
            <div className="h-screen w-full snap-start snap-always" />
            <div className="h-screen w-full snap-start snap-always" />
            <div className="h-screen w-full snap-start snap-always" />
            <div className="h-screen w-full snap-start snap-always" />
          </div>

          {/* Sticky 100vh Viewport - Vertically Centered with the screen */}
          <div className="sticky top-0 h-screen w-full overflow-hidden px-6 md:px-12 lg:px-[80px] flex flex-col justify-center items-center z-10 pt-16">
            
            <div className="max-w-[1440px] mx-auto w-full relative overflow-hidden flex items-center min-h-[520px]">
              
              {/* STAGE 1: Step 0 & Step 1 */}
              {/* Left Column (30% width / col-span-4): Heading + Description | Right Area (70% width / col-span-8): Indicator + Project Peek */}
              <motion.div
                animate={{
                  opacity: step < 2 ? 1 : 0,
                  x: step < 2 ? "0%" : "-120%",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full w-full ${
                  step >= 2 ? "pointer-events-none absolute inset-0 z-0" : "relative z-10"
                }`}
              >
                {/* Left Column (lg:col-span-4 - 30% width proportion): Tag + Heading + Description */}
                <div className="lg:col-span-4 space-y-6 py-0 pr-4">
                  {/* Category Title: SYSTEM THINKING (Synced to 24px IBM Plex Mono) */}
                  <div className="font-mono text-[24px] uppercase tracking-widest text-white/70">
                    System Thinking
                  </div>

                  {/* Heading: One platform, three layers, built to extend */}
                  <div className="font-mono text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight text-[#00DC6C]">
                    <div className="border-b border-white/20 pb-2 mb-3">One platform,</div>
                    <div className="border-b border-white/20 pb-2 mb-3">three layers,</div>
                    <div className="pb-2">built to extend.</div>
                  </div>

                  {/* Description Paragraph: Pure Opacity Fade In on Step 1 */}
                  <motion.p
                    animate={{
                      opacity: step >= 1 ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="font-sans text-white/70 text-sm md:text-base leading-relaxed pt-2"
                  >
                    {lang === "vi"
                      ? "Rogo IoT Platform là cốt lõi quản lý. RaIO Smart biến cốt lõi đó thành một whitelabel framework tái sử dụng – giữ nguyên logic sản phẩm nhưng tùy biến thương hiệu linh hoạt. Mỗi đối tác cắm vào framework để sở hữu instance riêng biệt mà không cần làm lại từ đầu."
                      : "Rogo IoT Platform is the management core. RaIO Smart turns that core into a reusable whitelabel framework – same product logic, adaptable branding. Every partner then plugs into the framework as its own instance, without rebuilding the system from scratch."}
                  </motion.p>
                </div>

                {/* Right Area (lg:col-span-8 - 70% width proportion): Indicator + Project Image Peek (Aligned Top with Project Banner) */}
                <motion.div
                  animate={{
                    opacity: step >= 1 ? 1 : 0,
                    x: step >= 1 ? "0%" : "40%",
                  }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-8 flex items-start justify-between gap-6 h-full w-full overflow-hidden"
                >
                  {/* 3-Layer Indicator (Aligned Top with Project Banner) */}
                  <div className="flex flex-col justify-start space-y-8 font-mono text-lg md:text-xl font-bold shrink-0 pt-0">
                    <div className="flex items-center gap-3 text-[#00DC6C]">
                      <span className="w-1.5 h-12 bg-[#00DC6C] rounded-full inline-block" />
                      <span>Platform layer</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/30">
                      <span>Framework layer</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/30">
                      <span>Instance layer</span>
                    </div>
                  </div>

                  {/* Device Mockup Card Peek: Adjusted to dominant 4:3 aspect-ratio & rounded-3xl (Screenshot 3) */}
                  <div className="relative w-full lg:w-[620px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 shrink-0 bg-[#181818]">
                    <Image
                      src="/images/Rogo_Platform_large.png"
                      alt="Rogo IoT Platform v2"
                      fill
                      className="object-cover object-right"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* STAGE 2: Step 2, Step 3, Step 4 */}
              {/* Full 3-Column Layout: Layer Indicator Left (col-span-3 - Top Aligned), Image Center (col-span-5), Info Details Right (col-span-4) - Top Aligned */}
              <motion.div
                animate={{
                  opacity: step >= 2 ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full w-full ${
                  step < 2 ? "pointer-events-none absolute inset-0 z-0" : "relative z-10"
                }`}
              >
                {/* Left Column (lg:col-span-3): 3-Layer Indicator (Aligned Top with Project Banner) */}
                <div className="lg:col-span-3 flex flex-col justify-start space-y-8 font-mono text-lg md:text-xl font-bold pr-4 pt-0">
                  {/* Platform layer */}
                  <div className="flex items-center gap-3 transition-colors">
                    {activeLayer === 0 && (
                      <span className="w-1.5 h-12 bg-[#00DC6C] rounded-full inline-block" />
                    )}
                    <span className={activeLayer === 0 ? "text-[#00DC6C]" : "text-white/30"}>
                      Platform layer
                    </span>
                  </div>

                  {/* Framework layer */}
                  <div className="flex items-center gap-3 transition-colors">
                    {activeLayer === 1 && (
                      <span className="w-1.5 h-12 bg-[#00DC6C] rounded-full inline-block" />
                    )}
                    <span className={activeLayer === 1 ? "text-[#00DC6C]" : "text-white/30"}>
                      Framework layer
                    </span>
                  </div>

                  {/* Instance layer */}
                  <div className="flex items-center gap-3 transition-colors">
                    {activeLayer === 2 && (
                      <span className="w-1.5 h-12 bg-[#00DC6C] rounded-full inline-block" />
                    )}
                    <span className={activeLayer === 2 ? "text-[#00DC6C]" : "text-white/30"}>
                      Instance layer
                    </span>
                  </div>
                </div>

                {/* Center Column (lg:col-span-5) & Right Column (lg:col-span-4): Dynamic Layer Content */}
                <div className="lg:col-span-9 relative h-full flex items-start overflow-hidden">
                  
                  {/* LAYER 1: Platform Layer Content */}
                  <motion.div
                    animate={{
                      opacity: step === 2 ? 1 : 0,
                      x: step === 2 ? "0%" : step < 2 ? "100%" : "-100%",
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 grid grid-cols-1 lg:grid-cols-9 gap-8 items-start w-full"
                  >
                    {/* Center Image Mockup Card: Adjusted to dominant 4:3 aspect-ratio & rounded-3xl (Screenshot 4) */}
                    <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#181818]">
                      <Image
                        src="/images/Rogo_Platform_large.png"
                        alt="Rogo IoT Platform v2"
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Right Details (lg:col-span-4 - Top Aligned with Indicator & Banner) */}
                    <div className="lg:col-span-4 space-y-5 overflow-y-auto max-h-full">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                          FEATURED
                        </span>
                        <span className="font-mono text-[11px] font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                          PAAS • B2B
                        </span>
                      </div>

                      <h3 className="font-mono text-3xl md:text-4xl font-bold text-white">
                        Rogo IoT Platform v2
                      </h3>

                      <div className="space-y-2">
                        <div className="font-mono text-xs text-white/40 uppercase tracking-wider">Clients</div>
                        <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-white/80">
                          <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#00DC6C]" /> ROGO Solutions
                          </span>
                          <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded">Rạng Đông</span>
                          <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded">FPT Smart Home</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="font-mono text-xs text-white/40 uppercase tracking-wider">Description</div>
                        <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed">
                          Rogo Solutions builds and operates the core — and the platform itself is whitelabelable. Each partner gets their own instance: same architecture, same control plane, their own identity. The whitelabel logic doesn't start at the app layer — it starts here.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="font-mono text-xs text-white/40 uppercase tracking-wider">Tools</div>
                        <div className="flex flex-wrap gap-2">
                          {["Stitch AI", "Figma", "Claude AI", "Gemini CLI", "Vercel"].map((tool) => (
                            <span key={tool} className="font-mono text-[10px] text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* LAYER 2: Framework Layer Content */}
                  <motion.div
                    animate={{
                      opacity: step === 3 ? 1 : 0,
                      x: step === 3 ? "0%" : step < 3 ? "100%" : "-100%",
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 grid grid-cols-1 lg:grid-cols-9 gap-8 items-start w-full"
                  >
                    {/* Center Image (lg:col-span-5) */}
                    <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white p-8 flex items-center justify-center">
                      <div className="relative w-48 h-16">
                        <Image src="/images/raio.png" alt="RaIO Smart Framework" fill className="object-contain" />
                      </div>
                    </div>

                    {/* Right Details (lg:col-span-4 - Top Aligned with Indicator & Banner) */}
                    <div className="lg:col-span-4 space-y-5 overflow-y-auto max-h-full">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                          FRAMEWORK
                        </span>
                        <span className="font-mono text-[11px] font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                          IOT • MOBILE
                        </span>
                      </div>

                      <h3 className="font-mono text-3xl md:text-4xl font-bold text-white">
                        RaIO Smart Framework
                      </h3>

                      <div className="space-y-2">
                        <div className="font-mono text-xs text-white/40 uppercase tracking-wider">Clients</div>
                        <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-white/80">
                          <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded">Austfly</span>
                          <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded">Kangaroo</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="font-mono text-xs text-white/40 uppercase tracking-wider">Description</div>
                        <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed">
                          Whitelabel Smart Home App framework – partner-adaptive UI, complex device onboarding, same core logic, customizable brand identity.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="font-mono text-xs text-white/40 uppercase tracking-wider">Tools</div>
                        <div className="flex flex-wrap gap-2">
                          {["React Native", "Figma", "TypeScript", "Vercel"].map((tool) => (
                            <span key={tool} className="font-mono text-[10px] text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* LAYER 3: Instance Layer Content */}
                  <motion.div
                    animate={{
                      opacity: step >= 4 ? 1 : 0,
                      x: step >= 4 ? "0%" : "100%",
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 grid grid-cols-1 lg:grid-cols-9 gap-8 items-start w-full"
                  >
                    {/* Center Images (lg:col-span-5) */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                        <Image src="/images/austfly.png" alt="Austfly" fill className="object-cover" />
                      </div>
                      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                        <Image src="/images/kangaroo_raio.png" alt="Kangaroo" fill className="object-cover" />
                      </div>
                    </div>

                    {/* Right Details (lg:col-span-4 - Top Aligned with Indicator & Banner) */}
                    <div className="lg:col-span-4 space-y-5 overflow-y-auto max-h-full">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                          INSTANCES
                        </span>
                        <span className="font-mono text-[11px] font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                          LIVE APPS
                        </span>
                      </div>

                      <h3 className="font-mono text-3xl md:text-4xl font-bold text-white">
                        Austfly & Kangaroo
                      </h3>

                      <div className="space-y-2">
                        <div className="font-mono text-xs text-white/40 uppercase tracking-wider">Description</div>
                        <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed">
                          Live app instances running on RaIO Smart Framework, tailored for roller shutter IoT and household appliance ecosystems.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="font-mono text-xs text-white/40 uppercase tracking-wider">Tools</div>
                        <div className="flex flex-wrap gap-2">
                          {["RaIO Framework", "Rogo IoT Platform", "Figma"].map((tool) => (
                            <span key={tool} className="font-mono text-[10px] text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                </div>

              </motion.div>

            </div>

          </div>
        </section>

        {/* SECTION 2: IOT TOOLS (Synced 3:2 Thumbnails & 24px IBM Plex Mono Category Title) */}
        <section className="w-full min-h-screen snap-start snap-always pt-[166px] pb-24 px-6 md:px-12 lg:px-[80px] border-b border-white/5 bg-[#121212] flex flex-col justify-center">
          <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (lg:col-span-4): Heading & Description */}
            <div className="lg:col-span-4 space-y-6 pr-4">
              {/* Category Title: IOT TOOLS (Synced to 24px IBM Plex Mono) */}
              <div className="font-mono text-[24px] uppercase tracking-widest text-white/70">
                IoT tools
              </div>

              <div className="font-mono text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight text-[#00DC6C]">
                <div className="border-b border-white/20 pb-2 mb-3">Standalone tools</div>
                <div className="border-b border-white/20 pb-2 mb-3">built for IoT-driven</div>
                <div className="pb-2">business workflows.</div>
              </div>

              <p className="font-sans text-white/70 text-sm md:text-base leading-relaxed pt-2">
                {lang === "vi"
                  ? "Khi mô hình whitelabel không đủ — giải pháp là các công cụ chuyên biệt giải quyết chính xác các bài toán vận hành."
                  : "When the whitelabel model isn't enough – purpose-built tools for specific operational problems."}
              </p>
            </div>

            {/* Right Column (lg:col-span-8): Project Cards with Synced 3:2 Thumbnails */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Thing Flow */}
              <div className="bg-[#181818] border border-white/10 p-8 rounded-3xl space-y-6 hover:border-[#00DC6C]/40 transition-colors">
                <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#1E1E1E] flex items-center justify-center font-mono text-2xl font-bold text-[#00DC6C]">
                  THING FLOW
                </div>
                <div className="font-mono text-xs font-bold text-[#00DC6C] uppercase">No-code automation</div>
                <h3 className="font-mono text-3xl font-bold text-white">Thing Flow</h3>
                <p className="font-sans text-white/70 text-sm leading-relaxed">
                  Turns IoT device events into programmable business workflows – for enterprise teams that automate without code.
                </p>
              </div>

              {/* Thing Partner */}
              <div className="bg-[#181818] border border-white/10 p-8 rounded-3xl space-y-6 hover:border-[#00DC6C]/40 transition-colors">
                <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <Image src="/images/thing_partner.png" alt="Thing Partner" fill className="object-cover" />
                </div>
                <div className="font-mono text-xs font-bold text-[#00DC6C] uppercase">Device Lifecycle</div>
                <h3 className="font-mono text-3xl font-bold text-white">Thing Partner</h3>
                <p className="font-sans text-white/70 text-sm leading-relaxed">
                  For the people who build the devices. On-site researched, covers firmware to warranty across 6 lifecycle stages.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: OTHER WORK (Synced 3:2 Thumbnails & 24px IBM Plex Mono Category Title) */}
        <section className="w-full min-h-screen snap-start snap-always pt-[166px] pb-24 px-6 md:px-12 lg:px-[80px] border-b border-white/5 bg-[#121212] flex flex-col justify-center">
          <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (lg:col-span-4): Heading & Description */}
            <div className="lg:col-span-4 space-y-6 pr-4">
              {/* Category Title: OTHER WORK (Synced to 24px IBM Plex Mono) */}
              <div className="font-mono text-[24px] uppercase tracking-widest text-white/70">
                Other work
              </div>

              <div className="font-mono text-3xl sm:text-4xl lg:text-[44px] font-bold leading-tight text-[#00DC6C]">
                <div className="border-b border-white/20 pb-2 mb-3">Breadth beyond</div>
                <div className="pb-2">the IoT platform</div>
              </div>

              <p className="font-sans text-white/70 text-sm md:text-base leading-relaxed pt-2">
                {lang === "vi"
                  ? "Các dự án thương hiệu và website ngoài hệ sinh thái sản phẩm IoT — mỗi dự án nhằm tạo dựng uy tín cho doanh nghiệp với đúng đối tượng mục tiêu."
                  : "Brand and web work outside the IoT product ecosystem – each brief was about making a business credible to the right audience."}
              </p>
            </div>

            {/* Right Column (lg:col-span-8): Project Cards with Synced 3:2 Thumbnails */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Thing AI VN */}
              <a
                href="https://thing.ai.vn/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#181818] border border-white/10 p-6 rounded-3xl space-y-4 hover:border-[#00DC6C] transition-colors block group"
              >
                <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden border border-white/10">
                  <Image src="/images/Thing_AI_VN.png" alt="Thing AI VN" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="font-mono text-2xl font-bold text-white flex items-center justify-between">
                  <span>Thing AI VN</span>
                  <ArrowUpRight className="w-5 h-5 text-[#00DC6C]" />
                </h3>
                <p className="font-sans text-xs text-white/70 leading-relaxed">
                  Open-source IoT startup bridging community makers and enterprise clients.
                </p>
              </a>

              {/* Antaxi */}
              <div className="bg-[#181818] border border-white/10 p-6 rounded-3xl space-y-4">
                <div className="w-full aspect-[3/2] bg-[#1E1E1E] rounded-2xl border border-white/10 flex items-center justify-center font-mono text-2xl font-bold text-white/50">
                  ANTAXI
                </div>
                <h3 className="font-mono text-2xl font-bold text-white">Antaxi</h3>
                <p className="font-sans text-xs text-white/70 leading-relaxed">
                  Tech-first taxi startup entering a market shaped by incumbents. Built from zero.
                </p>
              </div>

              {/* Labo Viet My */}
              <div className="bg-[#181818] border border-white/10 p-6 rounded-3xl space-y-4">
                <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden border border-white/10">
                  <Image src="/images/labo_viet_my.png" alt="Labo Viet My" fill className="object-cover" />
                </div>
                <h3 className="font-mono text-2xl font-bold text-white">Labo Viet My</h3>
                <p className="font-sans text-xs text-white/70 leading-relaxed">
                  Dental equipment manufacturer supplying clinics – precision & technical credibility.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* BOTTOM CTA BANNER: Green Background (CSS Snap Section) */}
        <section className="w-full min-h-screen snap-start snap-always bg-[#00DC6C] text-black py-20 px-6 md:px-12 lg:px-[80px] flex items-center">
          <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
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

        {/* FOOTER TEXT */}
        <footer className="w-full bg-[#121212] text-white py-12 px-6 md:px-12 lg:px-[80px] border-t border-white/10 snap-start">
          <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 font-mono">
            <h1 className="text-4xl md:text-6xl font-bold text-white/20 tracking-tight">
              KhanhTruong Nguyen
            </h1>
            <div className="text-sm font-bold text-white/50">
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
