"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface TopClientSectionProps {
  lang?: "vi" | "en";
  onOpenContact?: () => void;
}

const clientLogos = [
  { name: "ROGO Solutions", src: "/images/Rogo_color.svg" },
  { name: "FPT Smart Home", src: "/images/FPTSmartHome_color.svg" },
  { name: "Rạng Đông", src: "/images/RangDong_color.svg" },
  { name: "VietinBank Securities", src: "/images/VietinBankS_color.svg" },
  { name: "VCBS", src: "/images/VCBS_color.svg" },
  { name: "Think & Action", src: "/images/Think_Action_color.svg" },
];

export default function TopClientSection({
  lang = "en",
}: TopClientSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Unified Scroll Timeline across pinned height (650vh)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // =========================================================================
  // 1. STEP 1: Centered 3x2 Grid Overview View (0.00 -> 0.12)
  // =========================================================================
  const logoGridOpacity = useTransform(scrollYProgress, [0.0, 0.08, 0.13], [1, 1, 0]);
  const logoGridScale = useTransform(scrollYProgress, [0.08, 0.13], [1, 0.94]);
  const logoGridDisplay = useTransform(scrollYProgress, (v) => (v >= 0.14 ? "none" : "flex"));

  // =========================================================================
  // 2. CLIENT 1: ROGO SOLUTIONS (0.12 -> 0.54)
  // =========================================================================
  const rogoFlowOpacity = useTransform(scrollYProgress, [0.11, 0.15, 0.49, 0.53], [0, 1, 1, 0]);
  const rogoFlowDisplay = useTransform(scrollYProgress, (v) => (v < 0.09 || v > 0.55 ? "none" : "block"));

  // ROGO Photo Layer (State A Contained -> State B Full-Bleed 8%)
  const rogoPhotoTop = useTransform(scrollYProgress, [0.28, 0.40], ["220px", "0px"]);
  const rogoPhotoLeft = useTransform(scrollYProgress, [0.28, 0.40], ["max(24px, 10vh)", "0px"]);
  const rogoPhotoRight = useTransform(scrollYProgress, [0.28, 0.40], ["max(24px, 10vh)", "0px"]);
  const rogoPhotoHeight = useTransform(
    scrollYProgress,
    [0.28, 0.40],
    ["calc(100vh - 270px)", "100vh"]
  );
  const rogoPhotoRadius = useTransform(scrollYProgress, [0.28, 0.40], ["20px", "0px"]);
  const rogoPhotoOpacity = useTransform(
    scrollYProgress,
    [0.11, 0.15, 0.28, 0.40, 0.49, 0.53],
    [0, 1.0, 1.0, 0.08, 0.08, 0]
  );

  // ROGO State B Foreground Content Reveal
  const rogoStateBOpacity = useTransform(scrollYProgress, [0.36, 0.43, 0.49, 0.53], [0, 1, 1, 0]);
  const rogoStateBY = useTransform(scrollYProgress, [0.36, 0.43], [30, 0]);
  const rogoStateBPointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.36 && v <= 0.53 ? "auto" : "none"));

  // =========================================================================
  // 3. CLIENT 2: RẠNG ĐÔNG (0.50 -> 0.98 - Zero Black Gap Transition!)
  // =========================================================================
  const rangDongFlowOpacity = useTransform(scrollYProgress, [0.49, 0.54, 0.94, 0.98], [0, 1, 1, 0]);
  const rangDongFlowDisplay = useTransform(scrollYProgress, (v) => (v < 0.48 || v > 0.99 ? "none" : "block"));

  // Rạng Đông Photo Layer (State A Contained -> State B Full-Bleed 8%)
  const rangDongPhotoTop = useTransform(scrollYProgress, [0.68, 0.80], ["220px", "0px"]);
  const rangDongPhotoLeft = useTransform(scrollYProgress, [0.68, 0.80], ["max(24px, 10vh)", "0px"]);
  const rangDongPhotoRight = useTransform(scrollYProgress, [0.68, 0.80], ["max(24px, 10vh)", "0px"]);
  const rangDongPhotoHeight = useTransform(
    scrollYProgress,
    [0.68, 0.80],
    ["calc(100vh - 270px)", "100vh"]
  );
  const rangDongPhotoRadius = useTransform(scrollYProgress, [0.68, 0.80], ["20px", "0px"]);
  const rangDongPhotoOpacity = useTransform(
    scrollYProgress,
    [0.49, 0.54, 0.68, 0.80, 0.94, 0.98],
    [0, 1.0, 1.0, 0.08, 0.08, 0]
  );

  // Rạng Đông State B Foreground Content Reveal
  const rangDongStateBOpacity = useTransform(scrollYProgress, [0.76, 0.83, 0.94, 0.98], [0, 1, 1, 0]);
  const rangDongStateBY = useTransform(scrollYProgress, [0.76, 0.83], [30, 0]);
  const rangDongStateBPointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.76 && v <= 0.98 ? "auto" : "none"));

  // Fallback for Reduced Motion
  if (shouldReduceMotion) {
    return (
      <section
        id="top-clients"
        className="w-full bg-[#121212] text-white py-24 px-6 md:px-12 lg:px-[10vh] border-t border-b border-white/5 relative overflow-hidden snap-start scroll-mt-0"
      >
        <div className="max-w-[1440px] mx-auto w-full space-y-24">
          <div className="w-full space-y-8 pb-12 border-b border-white/5">
            <h3 className="font-mono text-2xl md:text-3xl font-bold text-white tracking-tight">
              Top Client
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center py-4">
              {clientLogos.map((client) => (
                <div key={client.name} className="w-full flex items-center justify-center p-2">
                  <div className="relative h-[36px] w-full max-w-[140px] opacity-80">
                    <Image src={client.src} alt={client.name} fill className="object-contain filter brightness-0 invert" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client 1: Rogo Solutions */}
          <div className="space-y-12">
            <div className="flex items-center gap-[24px]">
              <div className="relative w-[99px] h-[36px] shrink-0">
                <Image src="/images/Rogo_color.svg" alt="Rogo" fill className="object-contain object-left filter brightness-0 invert" />
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
                  <Image src="/images/Rogo_Platform_large.png" alt="Rogo Platform" fill className="object-cover" />
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <h3 className="font-mono text-4xl font-bold text-white">Rogo IoT Platform v2</h3>
                <p className="text-white/80">Rogo Solutions builds and operates the core — whitelabelable multi-tenant SaaS architecture.</p>
              </div>
            </div>
          </div>

          {/* Client 2: Rạng Đông */}
          <div className="space-y-12 pt-12 border-t border-white/10">
            <div className="flex items-center gap-[24px]">
              <div className="relative w-[156px] h-[36px] shrink-0">
                <Image src="/images/RangDong_color.svg" alt="Rạng Đông" fill className="object-contain object-left filter brightness-0 invert" />
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
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="top-clients"
      className="relative w-full h-[650vh] bg-[#121212] text-white border-t border-b border-white/5 snap-start scroll-mt-0"
    >
      {/* Sticky 100vh Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* ======================================================== */}
        {/* 1. STEP 1: Centered 3x2 Grid Overview View (0.00 -> 0.12) */}
        {/* ======================================================== */}
        <motion.div
          style={{
            opacity: logoGridOpacity,
            scale: logoGridScale,
            display: logoGridDisplay,
          }}
          className="absolute inset-0 w-full h-full flex flex-col justify-between pt-[90px] md:pt-[100px] pb-8 md:pb-12 px-6 md:px-12 lg:px-[10vh] z-30 pointer-events-auto"
        >
          {/* Top Header Bar: "Top Client" */}
          <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between shrink-0">
            <h3 className="text-h5 md:text-h4 font-bold text-white tracking-tight">
              Top Client
            </h3>
          </div>

          {/* Centered 3x2 Grid */}
          <div className="w-full max-w-[1440px] mx-auto flex-1 flex items-center justify-center">
            <div className="w-full max-w-[1040px] grid grid-cols-2 md:grid-cols-3 gap-x-12 sm:gap-x-16 md:gap-x-24 gap-y-12 sm:gap-y-16 md:gap-y-20 items-center justify-items-center px-4">
              {clientLogos.map((client) => (
                <div
                  key={client.name}
                  className="relative h-[36px] w-32 sm:w-40 md:w-48 lg:w-56 flex items-center justify-center group"
                >
                  <Image
                    src={client.src}
                    alt={client.name}
                    fill
                    className="object-contain filter brightness-0 invert opacity-85 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2. CLIENT 1: ROGO SOLUTIONS (Single Expanding Photo + Foreground Flow)   */}
        {/* ========================================================================= */}
        {/* ROGO Photo Layer */}
        <motion.div
          style={{
            top: rogoPhotoTop,
            left: rogoPhotoLeft,
            right: rogoPhotoRight,
            height: rogoPhotoHeight,
            borderRadius: rogoPhotoRadius,
            opacity: rogoPhotoOpacity,
            display: rogoFlowDisplay,
          }}
          className="absolute overflow-hidden shadow-2xl z-10 origin-center pointer-events-none"
        >
          <Image
            src="/images/rogo_award_ceremony.png"
            alt="Rogo Solutions Award Ceremony Make In Vietnam 2023"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>

        {/* ROGO Foreground Content */}
        <motion.div
          style={{
            opacity: rogoFlowOpacity,
            display: rogoFlowDisplay,
          }}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none pt-[90px] md:pt-[100px] pb-8 md:pb-12 px-6 md:px-12 lg:px-[10vh]"
        >
          <div className="max-w-[1440px] mx-auto w-full h-full flex flex-col justify-between relative">
            
            {/* Top-Left: Logo (99px) + 24px gap + Caption */}
            <div className="flex items-center gap-[24px] pointer-events-auto shrink-0 z-30">
              <div className="relative w-[99px] h-[36px] shrink-0">
                <Image
                  src="/images/Rogo_color.svg"
                  alt="Rogo Solutions"
                  fill
                  className="object-contain object-left filter brightness-0 invert"
                />
              </div>
              <h2 className="text-h7 sm:text-h6 font-mono font-normal text-white leading-tight tracking-tight whitespace-pre-line">
                Top innovation{"\n"}brand in Vietnam{"\n"}2023
              </h2>
            </div>

            {/* State B Content Reveal */}
            <motion.div
              style={{
                opacity: rogoStateBOpacity,
                y: rogoStateBY,
                pointerEvents: rogoStateBPointerEvents as any,
              }}
              className="w-full my-auto pt-6 pb-2 pointer-events-auto z-30"
            >
              <div className="w-full flex flex-col lg:flex-row items-start gap-[40px]">
                {/* Left: Device Mockup Card 640x480 */}
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

                {/* Right Side */}
                <div className="flex-1 w-full space-y-6 flex flex-col justify-start">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="text-b4 font-mono font-bold text-[#00DC6C] bg-[#00DC6C]/15 border border-[#00DC6C]/40 px-3.5 py-1 rounded-full uppercase tracking-wider">
                        FEATURED
                      </span>
                      <span className="text-b4 font-mono font-bold text-white/90 bg-white/10 border border-white/20 px-3.5 py-1 rounded-full uppercase tracking-wider">
                        PAAS • B2B
                      </span>
                    </div>
                    <h3 className="text-h4 sm:text-h3 lg:text-h2 font-mono font-bold text-white tracking-tight">
                      Rogo IoT Platform V2
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <span className="text-b3 font-mono font-medium text-white/60 uppercase tracking-wider block">
                      Clients
                    </span>
                    <div className="flex items-center gap-6 flex-wrap">
                      <div className="relative w-28 h-[24px]">
                        <Image src="/images/Rogo_color.svg" alt="Rogo Solutions" fill className="object-contain object-left filter brightness-0 invert opacity-90" />
                      </div>
                      <div className="relative w-28 h-[24px]">
                        <Image src="/images/RangDong_color.svg" alt="Rạng Đông" fill className="object-contain object-left filter brightness-0 invert opacity-90" />
                      </div>
                      <div className="relative w-28 h-[24px]">
                        <Image src="/images/FPTSmartHome_color.svg" alt="FPT Smart Home" fill className="object-contain object-left filter brightness-0 invert opacity-90" />
                      </div>
                    </div>
                  </div>

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

                  <div className="space-y-2">
                    <span className="text-b3 font-mono font-medium text-white/60 uppercase tracking-wider block">
                      Tools
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {["Stitch AI", "Figma", "Claude AI", "Gemini CLI", "Vercel"].map((tool) => (
                        <span key={tool} className="bg-white/10 text-white/90 text-b3 font-medium px-3.5 py-1 rounded-full border border-white/15 backdrop-blur-md">
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

        {/* ========================================================================= */}
        {/* 3. CLIENT 2: RẠNG ĐÔNG (Seamless Direct Transition with ZERO Black Gap)  */}
        {/* ========================================================================= */}
        {/* Rạng Đông Photo Layer */}
        <motion.div
          style={{
            top: rangDongPhotoTop,
            left: rangDongPhotoLeft,
            right: rangDongPhotoRight,
            height: rangDongPhotoHeight,
            borderRadius: rangDongPhotoRadius,
            opacity: rangDongPhotoOpacity,
            display: rangDongFlowDisplay,
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

        {/* Rạng Đông Foreground Content */}
        <motion.div
          style={{
            opacity: rangDongFlowOpacity,
            display: rangDongFlowDisplay,
          }}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none pt-[90px] md:pt-[100px] pb-8 md:pb-12 px-6 md:px-12 lg:px-[10vh]"
        >
          <div className="max-w-[1440px] mx-auto w-full h-full flex flex-col justify-between relative">
            
            {/* Top-Left: Logo Rạng Đông (156px) + 24px gap + Caption */}
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
                Top innovation{"\n"}brand in Vietnam{"\n"}2023
              </h2>
            </div>

            {/* State B Content Reveal */}
            <motion.div
              style={{
                opacity: rangDongStateBOpacity,
                y: rangDongStateBY,
                pointerEvents: rangDongStateBPointerEvents as any,
              }}
              className="w-full my-auto pt-6 pb-2 pointer-events-auto z-30"
            >
              <div className="w-full flex flex-col lg:flex-row items-start gap-[40px]">
                {/* Left: Device Mockup Card 640x480 */}
                <div className="w-full lg:w-[640px] shrink-0">
                  <div className="relative w-full aspect-[4/3] max-h-[480px] rounded-[20px] overflow-hidden shadow-2xl border border-white/15 bg-[#141414] group">
                    <Image
                      src="/images/Rogo_Platform_large.png"
                      alt="Rogo IoT Platform Interface"
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex-1 w-full space-y-6 flex flex-col justify-start">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="text-b4 font-mono font-bold text-[#00DC6C] bg-[#00DC6C]/15 border border-[#00DC6C]/40 px-3.5 py-1 rounded-full uppercase tracking-wider">
                        FEATURED
                      </span>
                      <span className="text-b4 font-mono font-bold text-white/90 bg-white/10 border border-white/20 px-3.5 py-1 rounded-full uppercase tracking-wider">
                        PAAS • B2B
                      </span>
                    </div>
                    <h3 className="text-h4 sm:text-h3 lg:text-h2 font-mono font-bold text-white tracking-tight">
                      Rogo IoT Platform V2
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <span className="text-b3 font-mono font-medium text-white/60 uppercase tracking-wider block">
                      Clients
                    </span>
                    <div className="flex items-center gap-6 flex-wrap">
                      <div className="relative w-28 h-[24px]">
                        <Image src="/images/Rogo_color.svg" alt="Rogo Solutions" fill className="object-contain object-left filter brightness-0 invert opacity-90" />
                      </div>
                      <div className="relative w-28 h-[24px]">
                        <Image src="/images/RangDong_color.svg" alt="Rạng Đông" fill className="object-contain object-left filter brightness-0 invert opacity-90" />
                      </div>
                      <div className="relative w-28 h-[24px]">
                        <Image src="/images/FPTSmartHome_color.svg" alt="FPT Smart Home" fill className="object-contain object-left filter brightness-0 invert opacity-90" />
                      </div>
                    </div>
                  </div>

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

                  <div className="space-y-2">
                    <span className="text-b3 font-mono font-medium text-white/60 uppercase tracking-wider block">
                      Tools
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      {["Stitch AI", "Figma", "Claude AI", "Gemini CLI", "Vercel"].map((tool) => (
                        <span key={tool} className="bg-white/10 text-white/90 text-b3 font-medium px-3.5 py-1 rounded-full border border-white/15 backdrop-blur-md">
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
