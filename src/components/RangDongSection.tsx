"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface RangDongSectionProps {
  lang?: "vi" | "en";
  onOpenContact?: () => void;
}

export default function RangDongSection({
  lang = "en",
}: RangDongSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll timeline tracker across pinned height (300vh for 2 states: State A -> State B)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // State A (0.00 -> 0.40): Visible contained card
  // Transition (0.40 -> 0.70): Expands to full-bleed
  // State B (0.70 -> 1.00): Full-bleed 8% opacity with foreground content

  // Master Partner Flow Visibility
  const partnerFlowOpacity = useTransform(scrollYProgress, [0.00, 0.05, 0.95, 1.00], [1, 1, 1, 1]);

  // =========================================================================
  // SINGLE EXPANDING PHOTO LAYER (STATE A CONTAINED CARD → STATE B FULL BLEED)
  // State A (0.00 -> 0.40): Contained card 60px below logo, uncropped wide ratio, 100% opacity, 20px radius
  // Transition (0.40 -> 0.70): Expands to fill 100vw x 100vh, radius 20px -> 0px, opacity 100% -> 8%
  // State B (0.70 -> 1.00): Full-bleed 100vw x 100vh background at 8% opacity
  // =========================================================================
  const photoTop = useTransform(scrollYProgress, [0.40, 0.70], ["220px", "0px"]);
  const photoLeft = useTransform(scrollYProgress, [0.40, 0.70], ["max(24px, 10vh)", "0px"]);
  const photoRight = useTransform(scrollYProgress, [0.40, 0.70], ["max(24px, 10vh)", "0px"]);
  const photoHeight = useTransform(
    scrollYProgress,
    [0.40, 0.70],
    ["calc(100vh - 270px)", "100vh"]
  );
  const photoRadius = useTransform(scrollYProgress, [0.40, 0.70], ["20px", "0px"]);
  const photoOpacity = useTransform(
    scrollYProgress,
    [0.00, 0.40, 0.70, 0.95, 1.00],
    [1.0, 1.0, 0.08, 0.08, 0.08]
  );

  // STATE B Foreground Content Reveal (Mockup + Project Details)
  const stateBOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.95, 1.00], [0, 1, 1, 1]);
  const stateBY = useTransform(scrollYProgress, [0.65, 0.75], [30, 0]);
  const stateBPointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.65 ? "auto" : "none"));

  // Fallback for Reduced Motion
  if (shouldReduceMotion) {
    return (
      <section
        id="rangdong-client"
        className="w-full bg-[#121212] text-white py-24 px-6 md:px-12 lg:px-[10vh] border-t border-b border-white/5 relative overflow-hidden snap-start scroll-mt-0"
      >
        <div className="max-w-[1440px] mx-auto w-full space-y-16">
          <div className="flex items-center gap-[24px]">
            <div className="relative w-[156px] h-[36px] shrink-0">
              <Image
                src="/images/RangDong_color.svg"
                alt="Rạng Đông"
                fill
                className="object-contain object-left filter brightness-0 invert"
              />
            </div>
            <h2 className="font-mono text-xl font-normal text-white leading-tight">
              Top innovation<br />brand in Vietnam<br />2023
            </h2>
          </div>
          
          <div className="relative w-full aspect-[2302/1052] rounded-[20px] overflow-hidden border border-white/10">
            <Image src="/images/rogo_award_ceremony.png" alt="Award" fill className="object-cover" />
          </div>

          <div className="w-full flex flex-col lg:flex-row items-start gap-[40px] bg-[#181818] p-8 md:p-12 rounded-[20px] border border-white/10">
            <div className="w-full lg:w-[640px] shrink-0">
              <div className="relative w-full aspect-[4/3] max-h-[480px] rounded-[20px] overflow-hidden border border-white/10">
                <Image src="/images/Rogo_Platform_large.png" alt="Platform" fill className="object-cover" />
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <h3 className="font-mono text-4xl font-bold text-white">Rogo IoT Platform V2</h3>
              <p className="text-white/80">Rogo Solutions builds and operates the core — whitelabelable multi-tenant SaaS architecture.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="rangdong-client"
      className="relative w-full h-[300vh] bg-[#121212] text-white border-t border-b border-white/5 snap-start scroll-mt-0"
    >
      {/* Sticky 100vh Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ========================================================================= */}
        {/* SINGLE EXPANDING PHOTO LAYER (STATE A Contained Card → STATE B Full Bleed) */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            top: photoTop,
            left: photoLeft,
            right: photoRight,
            height: photoHeight,
            borderRadius: photoRadius,
            opacity: photoOpacity,
          }}
          className="absolute overflow-hidden shadow-2xl z-10 origin-center pointer-events-none"
        >
          <Image
            src="/images/rogo_award_ceremony.png"
            alt="Rang Dong Award Ceremony Make In Vietnam 2023"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>

        {/* ======================================================== */}
        {/* FOREGROUND CONTENT LAYER (Unified Grid max-w-[1440px])   */}
        {/* ======================================================== */}
        <motion.div
          style={{
            opacity: partnerFlowOpacity,
          }}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none pt-[90px] md:pt-[100px] pb-8 md:pb-12 px-6 md:px-12 lg:px-[10vh]"
        >
          <div className="max-w-[1440px] mx-auto w-full h-full flex flex-col justify-between relative">
            
            {/* FIXED TOP-LEFT HEADER: RẠNG ĐÔNG LOGO (156px wide) + EXACT 24px GAP + CAPTION */}
            <div className="flex items-center gap-[24px] pointer-events-auto shrink-0 z-30">
              <div className="relative w-[156px] h-[36px] shrink-0">
                <Image
                  src="/images/RangDong_color.svg"
                  alt="Rạng Đông"
                  fill
                  className="object-contain object-left filter brightness-0 invert"
                />
              </div>

              <h2 className="text-h7 sm:text-h6 font-mono font-normal text-white leading-tight tracking-tight whitespace-pre-line">
                Top 1 IoT manufacturer{"\n"}brand in Vietnam
              </h2>
            </div>

            {/* ---------------------------------------------------- */}
            {/* STATE B: REVEALED CONTENT VIEW (0.65 -> 1.00)         */}
            {/* Mockup Top-Aligned (640x480) + 40px Gap + Full Right Span */}
            {/* ---------------------------------------------------- */}
            <motion.div
              style={{
                opacity: stateBOpacity,
                y: stateBY,
                pointerEvents: stateBPointerEvents as any,
              }}
              className="w-full my-auto pt-6 pb-2 pointer-events-auto z-30"
            >
              <div className="w-full flex flex-col lg:flex-row items-start gap-[40px]">
                
                {/* Left: Device Mockup Card 640x480 aligned to top */}
                <div className="w-full lg:w-[640px] shrink-0">
                  <div className="relative w-full aspect-[4/3] max-w-[640px] max-h-[480px] rounded-[20px] overflow-hidden shadow-2xl border border-white/15 bg-[#141414] group">
                    <Image
                      src="/images/Rogo_Platform_large.png"
                      alt="Rogo IoT Platform Interface"
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Right Side: Spans all the way to right padding */}
                <div className="flex-1 w-full space-y-6 flex flex-col justify-start">
                  
                  {/* Badges + Big Project Title */}
                  <div>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="text-[12px] font-mono font-bold text-[#00DC6C] bg-[#00DC6C]/15 border border-[#00DC6C]/40 px-3.5 py-1 rounded-full uppercase tracking-wider">
                        FEATURED
                      </span>
                      <span className="text-[12px] font-mono font-bold text-white/90 bg-white/10 border border-white/20 px-3.5 py-1 rounded-full uppercase tracking-wider">
                        PAAS • B2B
                      </span>
                    </div>

                    <h3 className="text-h4 sm:text-h3 lg:text-h2 font-mono font-bold text-white tracking-tight">
                      Rogo IoT Platform V2
                    </h3>
                  </div>

                  {/* Clients Row */}
                  <div className="space-y-2">
                    <span className="text-b3 font-mono font-medium text-white/60 uppercase tracking-wider block">
                      Clients
                    </span>
                    <div className="flex items-center gap-6 flex-wrap">
                      <div className="relative w-28 h-[24px]">
                        <Image
                          src="/images/Rogo_color.svg"
                          alt="Rogo Solutions"
                          fill
                          className="object-contain object-left filter brightness-0 invert opacity-90"
                        />
                      </div>
                      <div className="relative w-28 h-[24px]">
                        <Image
                          src="/images/RangDong_color.svg"
                          alt="Rạng Đông"
                          fill
                          className="object-contain object-left filter brightness-0 invert opacity-90"
                        />
                      </div>
                      <div className="relative w-28 h-[24px]">
                        <Image
                          src="/images/FPTSmartHome_color.svg"
                          alt="FPT Smart Home"
                          fill
                          className="object-contain object-left filter brightness-0 invert opacity-90"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description Paragraph */}
                  <div className="space-y-2">
                    <span className="text-b3 font-mono font-medium text-white/60 uppercase tracking-wider block">
                      Description
                    </span>
                    <p className="text-b2 lg:text-b1 text-white/80 leading-relaxed w-full">
                      {lang === "vi"
                        ? "Rogo Solutions xây dựng và vận hành core nền tảng có khả năng whitelabel toàn diện. Mỗi thương hiệu đối tác sở hữu instance riêng: cùng kiến trúc, cùng control plane, nhưng thể hiện bản sắc thương hiệu độc lập. Logic whitelabel bắt đầu ngay từ tầng kiến trúc này."
                        : "Rogo Solutions builds and operates the core — and the platform itself is whitelabelable. Each partner brand gets their own instance: same architecture, same control plane, their own identity. The whitelabel logic doesn't start at the app layer — it starts here."}
                    </p>
                  </div>

                  {/* Tools Chips Row */}
                  <div className="space-y-2">
                    <span className="text-b3 font-mono font-medium text-white/60 uppercase tracking-wider block">
                      Tools
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {["Stitch AI", "Figma", "Claude AI", "Gemini CLI", "Vercel"].map((tool) => (
                        <span
                          key={tool}
                          className="bg-white/10 text-white/90 text-b3 font-medium px-3.5 py-1 rounded-full border border-white/15 backdrop-blur-md"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
