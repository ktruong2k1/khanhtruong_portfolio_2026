"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail, Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactModal from "@/components/ContactModal";
import FooterSection from "@/components/FooterSection";
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
  const [activeIotTool, setActiveIotTool] = useState<0 | 1>(0);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-[#121212] text-white selection:bg-[#00DC6C] selection:text-black overflow-x-hidden scroll-smooth"
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
          <div className="sticky top-0 h-screen w-full overflow-hidden px-6 md:px-12 lg:px-[10vh] flex flex-col justify-center items-center z-10 pt-16">
            
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
                  <div className="text-h5 uppercase tracking-widest text-white/70">
                    System Thinking
                  </div>

                  {/* Heading: One platform, three layers, built to extend */}
                  <div className="text-h4 sm:text-h3 font-bold leading-tight text-[#00DC6C]">
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
                    className="text-b2 md:text-b1 text-white/70 pt-2"
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
                  <div className="flex flex-col justify-start space-y-8 text-h6 font-bold shrink-0 pt-0">
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

                  {/* Device Mockup Card Peek: 4:3 aspect-ratio (640x480) & rounded-[12px] */}
                  <div className="relative w-full lg:w-[640px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 shrink-0 bg-[#181818]">
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
              {/* Full 3-Column Layout: Layer Indicator Left (col-span-3 - Top Aligned), Image Center (640x480), Info Details Right - Top Aligned */}
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
                <div className="lg:col-span-3 flex flex-col justify-start space-y-8 text-h6 font-bold pr-4 pt-0 shrink-0">
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

                {/* Center & Right Columns (lg:col-span-9): Dynamic Layer Content with 640x480 thumbnail & 12px radius */}
                <div className="lg:col-span-9 relative h-full flex items-start overflow-hidden">
                  
                  {/* LAYER 1: Platform Layer Content */}
                  <motion.div
                    animate={{
                      opacity: step === 2 ? 1 : 0,
                      x: step === 2 ? "0%" : step < 2 ? "100%" : "-100%",
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col lg:flex-row gap-8 items-start w-full"
                  >
                    {/* Center Image Mockup Card: 640x480 (4:3) & rounded-[12px] */}
                    <div className="w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 bg-[#181818] relative shrink-0">
                      <Image
                        src="/images/Rogo_Platform_large.png"
                        alt="Rogo IoT Platform v2"
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Right Details */}
                    <div className="flex-1 space-y-5 overflow-y-auto max-h-[480px]">
                      <div className="flex items-center gap-3">
                        <span className="text-b4 font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                          FEATURED
                        </span>
                        <span className="text-b4 font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                          PAAS • B2B
                        </span>
                      </div>

                      <h3 className="text-h4 md:text-h3 font-bold text-white">
                        Rogo IoT Platform v2
                      </h3>

                      <div className="space-y-2">
                        <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Clients</div>
                        <div className="flex flex-wrap gap-2 text-b3 font-mono font-bold text-white/80">
                          <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#00DC6C]" /> ROGO Solutions
                          </span>
                          <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded">Rạng Đông</span>
                          <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded">FPT Smart Home</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Description</div>
                        <p className="text-b3 md:text-b2 text-white/70">
                          Rogo Solutions builds and operates the core — and the platform itself is whitelabelable. Each partner gets their own instance: same architecture, same control plane, their own identity. The whitelabel logic doesn't start at the app layer — it starts here.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Tools</div>
                        <div className="flex flex-wrap gap-2">
                          {["Stitch AI", "Figma", "Claude AI", "Gemini CLI", "Vercel"].map((tool) => (
                            <span key={tool} className="text-b4 font-mono text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
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
                    className="absolute inset-0 flex flex-col lg:flex-row gap-8 items-start w-full"
                  >
                    {/* Center Image: 640x480 (4:3) & rounded-[12px] */}
                    <div className="w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 bg-white p-8 flex items-center justify-center relative shrink-0">
                      <div className="relative w-48 h-[36px]">
                        <Image src="/images/raio.png" alt="RaIO Smart Framework" fill className="object-contain" />
                      </div>
                    </div>

                    {/* Right Details */}
                    <div className="flex-1 space-y-5 overflow-y-auto max-h-[480px]">
                      <div className="flex items-center gap-3">
                        <span className="text-b4 font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                          FRAMEWORK
                        </span>
                        <span className="text-b4 font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                          IOT • MOBILE
                        </span>
                      </div>

                      <h3 className="text-h4 md:text-h3 font-bold text-white">
                        RaIO Smart Framework
                      </h3>

                      <div className="space-y-2">
                        <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Clients</div>
                        <div className="flex flex-wrap gap-2 text-b3 font-mono font-bold text-white/80">
                          <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded">Austfly</span>
                          <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded">Kangaroo</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Description</div>
                        <p className="text-b3 md:text-b2 text-white/70">
                          Whitelabel Smart Home App framework – partner-adaptive UI, complex device onboarding, same core logic, customizable brand identity.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Tools</div>
                        <div className="flex flex-wrap gap-2">
                          {["React Native", "Figma", "TypeScript", "Vercel"].map((tool) => (
                            <span key={tool} className="text-b4 font-mono text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
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
                    className="absolute inset-0 flex flex-col lg:flex-row gap-8 items-start w-full"
                  >
                    {/* Center Images: 640x480 (4:3) container with rounded-[12px] */}
                    <div className="w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] grid grid-cols-2 gap-4 relative shrink-0">
                      <div className="relative w-full h-full rounded-[12px] overflow-hidden shadow-2xl border border-white/10">
                        <Image src="/images/austfly.png" alt="Austfly" fill className="object-cover" />
                      </div>
                      <div className="relative w-full h-full rounded-[12px] overflow-hidden shadow-2xl border border-white/10">
                        <Image src="/images/kangaroo_raio.png" alt="Kangaroo" fill className="object-cover" />
                      </div>
                    </div>

                    {/* Right Details */}
                    <div className="flex-1 space-y-5 overflow-y-auto max-h-[480px]">
                      <div className="flex items-center gap-3">
                        <span className="text-b4 font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                          INSTANCES
                        </span>
                        <span className="text-b4 font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                          LIVE APPS
                        </span>
                      </div>

                      <h3 className="text-h4 md:text-h3 font-bold text-white">
                        Austfly & Kangaroo
                      </h3>

                      <div className="space-y-2">
                        <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Description</div>
                        <p className="text-b3 md:text-b2 text-white/70">
                          Live app instances running on RaIO Smart Framework, tailored for roller shutter IoT and household appliance ecosystems.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Tools</div>
                        <div className="flex flex-wrap gap-2">
                          {["RaIO Framework", "Rogo IoT Platform", "Figma"].map((tool) => (
                            <span key={tool} className="text-b4 font-mono text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
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

        {/* SECTION 2: IOT TOOLS (Synced 640x480 Form & Dimension) */}
        <section className="w-full min-h-screen snap-start snap-always pt-32 pb-24 px-6 md:px-12 lg:px-[10vh] border-b border-white/5 bg-[#121212] flex flex-col justify-center">
          <div className="max-w-[1440px] mx-auto w-full relative overflow-hidden flex items-center min-h-[520px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full w-full">
              
              {/* Left Column (lg:col-span-3): Category + Tool Switcher */}
              <div className="lg:col-span-3 flex flex-col justify-start space-y-8 pr-4 pt-0 shrink-0">
                <div className="text-h5 uppercase tracking-widest text-white/70">
                  IoT tools
                </div>

                {/* Tool selector list */}
                <div className="flex flex-col space-y-6 text-h6 font-bold">
                  <button
                    onClick={() => setActiveIotTool(0)}
                    className="flex items-center gap-3 text-left transition-colors cursor-pointer"
                  >
                    {activeIotTool === 0 && (
                      <span className="w-1.5 h-10 bg-[#00DC6C] rounded-full inline-block" />
                    )}
                    <span className={activeIotTool === 0 ? "text-[#00DC6C]" : "text-white/30 hover:text-white/60"}>
                      Thing Flow
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveIotTool(1)}
                    className="flex items-center gap-3 text-left transition-colors cursor-pointer"
                  >
                    {activeIotTool === 1 && (
                      <span className="w-1.5 h-10 bg-[#00DC6C] rounded-full inline-block" />
                    )}
                    <span className={activeIotTool === 1 ? "text-[#00DC6C]" : "text-white/30 hover:text-white/60"}>
                      Thing Partner
                    </span>
                  </button>
                </div>

                <p className="text-b3 md:text-b2 text-white/70 pt-2">
                  {lang === "vi"
                    ? "Khi mô hình whitelabel không đủ — giải pháp là các công cụ chuyên biệt giải quyết chính xác các bài toán vận hành."
                    : "When the whitelabel model isn't enough – purpose-built tools for specific operational problems."}
                </p>
              </div>

              {/* Right Column (lg:col-span-9): Dynamic Project Content matching exact Screenshot 3 layout */}
              <div className="lg:col-span-9 relative min-h-[480px] flex items-start overflow-hidden">
                
                {/* TOOL 1: Thing Flow */}
                {activeIotTool === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col lg:flex-row gap-8 items-start w-full"
                  >
                    {/* 640x480 Thumbnail */}
                    <div className="w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 bg-[#1E1E1E] flex items-center justify-center text-h4 font-bold text-[#00DC6C] relative shrink-0">
                      THING FLOW
                    </div>

                    {/* Right Details */}
                    <div className="flex-1 space-y-5 overflow-y-auto max-h-[480px]">
                      <div className="flex items-center gap-3">
                        <span className="text-b4 font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                          AUTOMATION
                        </span>
                        <span className="text-b4 font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                          NO-CODE • B2B
                        </span>
                      </div>

                      <h3 className="text-h4 md:text-h3 font-bold text-white">
                        Thing Flow
                      </h3>

                      <div className="space-y-2">
                        <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Clients</div>
                        <div className="flex flex-wrap gap-2 text-b3 font-mono font-bold text-white/80">
                          <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#00DC6C]" /> ROGO Solutions
                          </span>
                          <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded">Enterprise Partners</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Description</div>
                        <p className="text-b3 md:text-b2 text-white/70">
                          {lang === "vi"
                            ? "Biến các sự kiện thiết bị IoT thành quy trình làm việc tự động hóa có thể lập trình — dành cho các nhóm doanh nghiệp tự động hóa mà không cần viết mã."
                            : "Turns IoT device events into programmable business workflows – for enterprise teams that automate without code."}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Tools</div>
                        <div className="flex flex-wrap gap-2">
                          {["Figma", "React", "TypeScript", "Node.js", "Tailwind CSS"].map((tool) => (
                            <span key={tool} className="text-b4 font-mono text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TOOL 2: Thing Partner */}
                {activeIotTool === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col lg:flex-row gap-8 items-start w-full"
                  >
                    {/* 640x480 Thumbnail */}
                    <div className="w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 relative shrink-0 bg-[#181818]">
                      <Image src="/images/thing_partner.png" alt="Thing Partner" fill className="object-cover" />
                    </div>

                    {/* Right Details */}
                    <div className="flex-1 space-y-5 overflow-y-auto max-h-[480px]">
                      <div className="flex items-center gap-3">
                        <span className="text-b4 font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                          LIFECYCLE
                        </span>
                        <span className="text-b4 font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                          IOT • HARDWARE
                        </span>
                      </div>

                      <h3 className="text-h4 md:text-h3 font-bold text-white">
                        Thing Partner
                      </h3>

                      <div className="space-y-2">
                        <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Clients</div>
                        <div className="flex flex-wrap gap-2 text-b3 font-mono font-bold text-white/80">
                          <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#00DC6C]" /> Hardware OEM
                          </span>
                          <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded">Rogo Device Ops</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Description</div>
                        <p className="text-b3 md:text-b2 text-white/70">
                          {lang === "vi"
                            ? "Dành cho đội ngũ trực tiếp sản xuất và quản lý thiết bị. Được nghiên cứu thực địa trực tiếp, bao quát từ firmware đến bảo hành qua 6 giai đoạn vòng đời."
                            : "For the people who build the devices. On-site researched, covers firmware to warranty across 6 lifecycle stages."}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Tools</div>
                        <div className="flex flex-wrap gap-2">
                          {["Figma", "Design System", "React", "GraphQL", "Tailwind CSS"].map((tool) => (
                            <span key={tool} className="text-b4 font-mono text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

              </div>

            </div>
          </div>
        </section>

        {/* SECTION 3: OTHER WORK (Thing AI VN only with exact 640x480 Form & Dimension) */}
        <section className="w-full min-h-screen snap-start snap-always pt-32 pb-24 px-6 md:px-12 lg:px-[10vh] border-b border-white/5 bg-[#121212] flex flex-col justify-center">
          <div className="max-w-[1440px] mx-auto w-full relative overflow-hidden flex items-center min-h-[520px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full w-full">
              
              {/* Left Column (lg:col-span-3): Category */}
              <div className="lg:col-span-3 flex flex-col justify-start space-y-8 pr-4 pt-0 shrink-0">
                <div className="text-h5 uppercase tracking-widest text-white/70">
                  Other work
                </div>

                <div className="flex items-center gap-3 text-h6 font-bold text-[#00DC6C]">
                  <span className="w-1.5 h-10 bg-[#00DC6C] rounded-full inline-block" />
                  <span>Thing AI VN</span>
                </div>

                <p className="text-b3 md:text-b2 text-white/70 pt-2">
                  {lang === "vi"
                    ? "Các dự án thương hiệu và website ngoài hệ sinh thái sản phẩm IoT — mỗi dự án nhằm tạo dựng uy tín cho doanh nghiệp với đúng đối tượng mục tiêu."
                    : "Brand and web work outside the IoT product ecosystem – each brief was about making a business credible to the right audience."}
                </p>
              </div>

              {/* Right Column (lg:col-span-9): Exact 640x480 Form & Dimension */}
              <div className="lg:col-span-9 relative min-h-[480px] flex items-start overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
                  {/* 640x480 Thumbnail */}
                  <a
                    href="https://thing.ai.vn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 relative shrink-0 block group"
                  >
                    <Image
                      src="/images/Thing_AI_VN.png"
                      alt="Thing AI VN"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </a>

                  {/* Right Details */}
                  <div className="flex-1 space-y-5 overflow-y-auto max-h-[480px]">
                    <div className="flex items-center gap-3">
                      <span className="text-b4 font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                        COMMUNITY
                      </span>
                      <span className="text-b4 font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                        OPEN SOURCE • WEB
                      </span>
                    </div>

                    <h3 className="text-h4 md:text-h3 font-bold text-white flex items-center justify-between">
                      <span>Thing AI VN</span>
                      <a
                        href="https://thing.ai.vn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00DC6C] hover:text-[#00DC6C]/80"
                      >
                        <ArrowUpRight className="w-6 h-6" />
                      </a>
                    </h3>

                    <div className="space-y-2">
                      <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Clients</div>
                      <div className="flex flex-wrap gap-2 text-b3 font-mono font-bold text-white/80">
                        <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#00DC6C]" /> Maker Community
                        </span>
                        <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded">Enterprise Developers</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Description</div>
                      <p className="text-b3 md:text-b2 text-white/70">
                        {lang === "vi"
                          ? "Startup IoT mã nguồn mở kết nối cộng đồng nhà sáng chế (makers) và khách hàng doanh nghiệp. Được xây dựng từ con số không."
                          : "Open-source IoT startup bridging community makers and enterprise clients. Built from zero."}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Tools</div>
                      <div className="flex flex-wrap gap-2">
                        {["Next.js", "Figma", "Tailwind CSS", "Vercel", "TypeScript"].map((tool) => (
                          <span key={tool} className="text-b4 font-mono text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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
