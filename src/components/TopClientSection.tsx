"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface TopClientSectionProps {
  lang?: "vi" | "en";
  onOpenContact?: () => void;
}

const topRowLogos = [
  { name: "ROGO Solutions", src: "/images/Rogo_color.svg" },
  { name: "FPT Smart Home", src: "/images/FPTSmartHome_color.svg" },
  { name: "Rạng Đông", src: "/images/RangDong_color.svg" },
];

const bottomRowLogos = [
  { name: "VietinBank Securities", src: "/images/VietinBankS_color.svg" },
  { name: "VCBS", src: "/images/VCBS_color.svg" },
  { name: "Think & Action", src: "/images/Think_Action_color.svg" },
];

const allClientLogos = [...topRowLogos, ...bottomRowLogos];

function TypingSplitText({
  text,
  isActive,
}: {
  text: string;
  isActive: boolean;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }
    setDisplayedText("");
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 10); // 10ms per character (50% faster snappy typing)

    return () => clearInterval(interval);
  }, [isActive, text]);

  return (
    <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[38px] sm:leading-[46px] md:leading-[52px] lg:leading-[56px] tracking-[-0.8px] font-bold text-[#00DC6C] text-center max-w-[960px] px-4 font-heading whitespace-pre-line">
      <span>{displayedText}</span>
      {isTyping && (
        <span className="inline-block w-[6px] h-[28px] sm:h-[34px] md:h-[40px] lg:h-[44px] bg-[#00DC6C] ml-1.5 animate-pulse align-middle" />
      )}
    </h2>
  );
}

export default function TopClientSection({
  lang,
}: TopClientSectionProps) {
  const { lang: globalLang } = useLanguage();
  const currentLang = lang || globalLang;
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll Progress across section (520vh height for clean multi-state runway)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [isSplitStateActive, setIsSplitStateActive] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.05 && latest <= 0.22) {
      setIsSplitStateActive(true);
    } else {
      setIsSplitStateActive(false);
    }
  });

  // =========================================================================
  // 1. PHASE 1: LOGOS OVERVIEW & SPLIT TYPING (0.00 -> 0.20)
  // State 1 (0.00 - 0.06): 3x2 logos clustered closely with 24px gap, 40px height
  // State 2 (0.06 - 0.20): Row 1 moves UP, Row 2 moves DOWN, Typing text appears
  // =========================================================================
  const logoOverviewOpacity = useTransform(scrollYProgress, [0.0, 0.17, 0.21], [1, 1, 0]);
  const logoOverviewDisplay = useTransform(scrollYProgress, (v) => (v >= 0.22 ? "none" : "flex"));
  
  // Row 1 (Top 3 logos) moves UP
  const topRowY = useTransform(scrollYProgress, [0.05, 0.11], [0, -100]);
  // Row 2 (Bottom 3 logos) moves DOWN
  const bottomRowY = useTransform(scrollYProgress, [0.05, 0.11], [0, 100]);
  // Typing text container opacity
  const splitTextOpacity = useTransform(scrollYProgress, [0.05, 0.09, 0.17, 0.21], [0, 1, 1, 0]);

  // =========================================================================
  // 2. PHASE 2: ROGO SOLUTIONS (0.20 -> 0.60)
  // 0.20 -> 0.32: Contained Award Photo (1052px, crisp, rounded 12px)
  // 0.32 -> 0.44: EXPAND ANIMATION -> Photo scales up (1.0 -> 1.6), radius (12px -> 0px), blurs (0px -> 24px), dims (1.0 -> 0.5)
  // 0.42 -> 0.58: Project Card (1052px) slides up and locks into place
  // =========================================================================
  const rogoDisplay = useTransform(scrollYProgress, (v) => (v < 0.19 || v > 0.61 ? "none" : "block"));
  const rogoOpacity = useTransform(scrollYProgress, [0.19, 0.23, 0.56, 0.60], [0, 1, 1, 0]);
  
  // ROGO Expanding Photo transforms
  const rogoPhotoScale = useTransform(scrollYProgress, [0.32, 0.44], [1, 1.6]);
  const rogoPhotoRadius = useTransform(scrollYProgress, [0.32, 0.40], [12, 0]);
  const rogoPhotoBlur = useTransform(scrollYProgress, [0.34, 0.44], [0, 24]);
  const rogoPhotoBrightness = useTransform(scrollYProgress, [0.34, 0.44], [1.0, 0.25]);
  const rogoPhotoDim = useTransform(scrollYProgress, [0.34, 0.44], [1.0, 0.5]);

  // ROGO Project Card View
  const rogoCardOpacity = useTransform(scrollYProgress, [0.42, 0.48, 0.56, 0.60], [0, 1, 1, 0]);
  const rogoCardY = useTransform(scrollYProgress, [0.42, 0.48], [30, 0]);
  const rogoCardPointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.42 && v <= 0.60 ? "auto" : "none"));

  // =========================================================================
  // 3. PHASE 3: RẠNG ĐÔNG (0.58 -> 1.00 - Stays until unpin)
  // 0.58 -> 0.70: Contained Showroom Photo (1052px, crisp, rounded 12px)
  // 0.70 -> 0.82: EXPAND ANIMATION -> Photo scales up (1.0 -> 1.6), radius (12px -> 0px), blurs (0px -> 24px), dims (1.0 -> 0.5)
  // 0.80 -> 1.00: Project Card (1052px) slides up and locks into place
  // =========================================================================
  const rangDongDisplay = useTransform(scrollYProgress, (v) => (v < 0.57 ? "none" : "block"));
  const rangDongOpacity = useTransform(scrollYProgress, [0.57, 0.62, 1.0], [0, 1, 1]);

  // Rạng Đông Expanding Photo transforms
  const rangDongPhotoScale = useTransform(scrollYProgress, [0.70, 0.82], [1, 1.6]);
  const rangDongPhotoRadius = useTransform(scrollYProgress, [0.70, 0.78], [12, 0]);
  const rangDongPhotoBlur = useTransform(scrollYProgress, [0.72, 0.82], [0, 24]);
  const rangDongPhotoBrightness = useTransform(scrollYProgress, [0.72, 0.82], [1.0, 0.25]);
  const rangDongPhotoDim = useTransform(scrollYProgress, [0.72, 0.82], [1.0, 0.5]);

  // Rạng Đông Project Card View
  const rangDongCardOpacity = useTransform(scrollYProgress, [0.80, 0.86, 1.0], [0, 1, 1]);
  const rangDongCardY = useTransform(scrollYProgress, [0.80, 0.86], [30, 0]);
  const rangDongCardPointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.80 ? "auto" : "none"));

  // Description synced from Works page - Body 2 (14px)
  const worksDescription =
    currentLang === "vi"
      ? "Rogo Solutions xây dựng và vận hành hệ thống cốt lõi — và bản thân nền tảng có thể whitelabel hoàn toàn. Mỗi đối tác nhận một instance riêng: cùng kiến trúc, cùng control plane, nhưng mang nhận diện thương hiệu riêng. Logic whitelabel không bắt đầu ở tầng ứng dụng — nó bắt đầu ngay tại đây."
      : "Rogo Solutions builds and operates the core — and the platform itself is whitelabelable. Each partner gets their own instance: same architecture, same control plane, their own identity. The whitelabel logic doesn't start at the app layer — it starts here.";

  const typingHeading =
    currentLang === "vi"
      ? "Thiết kế được tin tưởng\nbởi các doanh nghiệp đa lĩnh vực\nsản phẩm, thương hiệu và kỹ thuật số."
      : "Design work trusted\nby businesses across sectors\nproduct, brand, and digital.";

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Fallback for Mobile (< 1024px) & Reduced Motion
  if (!isDesktop || shouldReduceMotion) {
    return (
      <section
        id="top-clients"
        className="w-full bg-[#121212] text-white py-12 sm:py-16 px-4 sm:px-6 md:px-12 border-t border-b border-white/5 relative overflow-hidden snap-start scroll-mt-0"
      >
        <div className="max-w-[1440px] mx-auto w-full space-y-12 sm:space-y-16">
          <div className="w-full space-y-6 pb-8 border-b border-white/10">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
              {currentLang === "vi" ? "Khách hàng tiêu biểu" : "Top Client"}
            </h2>
            <div className="grid grid-cols-3 gap-3 sm:gap-6 items-center justify-items-center py-2">
              {allClientLogos.map((client) => (
                <div key={client.name} className="w-full flex items-center justify-center p-1 sm:p-2 group cursor-pointer">
                  <div className="relative h-[26px] sm:h-[34px] w-full max-w-[100px] sm:max-w-[140px] opacity-75 group-hover:opacity-100 transition-all duration-300">
                    <Image
                      src={client.src}
                      alt={client.name}
                      fill
                      className="object-contain filter brightness-0 invert group-hover:filter-none transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Intro text */}
            <div className="text-center pt-4">
              <p className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-[#00DC6C] leading-snug whitespace-pre-line max-w-xl mx-auto">
                {typingHeading}
              </p>
            </div>
          </div>

          {/* Client 1: Rogo Solutions */}
          <div className="space-y-12">
            <div className="flex items-center gap-[24px]">
              <div className="relative w-[99px] h-[36px] shrink-0 group cursor-pointer">
                <Image
                  src="/images/Rogo_color.svg"
                  alt="Rogo"
                  fill
                  className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                />
              </div>
              <h2 className="font-mono text-xl font-normal text-white leading-tight">
                {currentLang === "vi"
                  ? "Thương hiệu Đổi mới Sáng tạo\nHàng đầu Việt Nam 2023"
                  : "Top innovation brand\nin Vietnam 2023"}
              </h2>
            </div>
            
            {/* State A Contained Photo */}
            <div className="relative w-full max-w-[1052px] mx-auto aspect-[2302/1052] rounded-[12px] overflow-hidden border border-white/10 shadow-2xl">
              <Image src="/images/Rogo_solution_bg.png" alt="Rogo Solutions Award" fill className="object-cover" />
            </div>

            {/* State B Project Card */}
            <div className="w-full max-w-[1052px] mx-auto flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
              <Link
                href="/works/rogo-platform-v2"
                className="w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 bg-[#181818] relative shrink-0 block cursor-pointer group/thumb"
              >
                <Image
                  src="/images/Rogo_dashboard_thumb.png"
                  alt="Rogo Platform"
                  fill
                  className="object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/10 transition-colors pointer-events-none" />
              </Link>
              <div className="flex-1 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                    FEATURED
                  </span>
                  <span className="text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                    PAAS • B2B
                  </span>
                </div>
                <Link href="/works/rogo-platform-v2" className="block group/title">
                  <h3 className="text-h4 md:text-h3 font-bold text-white group-hover/title:text-[#00DC6C] transition-colors flex items-center gap-2">
                    <span>Rogo IoT Platform v2</span>
                    <span className="text-b2 opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all text-[#00DC6C]">↗</span>
                  </h3>
                </Link>
                <p className="text-[14px] text-white/80 leading-relaxed">{worksDescription}</p>
              </div>
            </div>
          </div>

          {/* Client 2: Rạng Đông -> RaIO Smart Framework */}
          <div className="space-y-12 pt-12 border-t border-white/10">
            <div className="flex items-center gap-[24px]">
              <div className="relative w-[156px] h-[36px] shrink-0 group cursor-pointer">
                <Image
                  src="/images/RangDong_color.svg"
                  alt="Rạng Đông"
                  fill
                  className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                />
              </div>
              <h2 className="font-mono text-xl font-normal text-white leading-tight">
                {currentLang === "vi"
                  ? "Thương hiệu Sản xuất IoT\nSố 1 tại Việt Nam"
                  : "Top 1 IoT manufacturer\nbrand in Vietnam"}
              </h2>
            </div>
            
            {/* State A Contained Photo */}
            <div className="relative w-full max-w-[1052px] mx-auto aspect-[2302/1052] rounded-[12px] overflow-hidden border border-white/10 shadow-2xl">
              <Image src="/images/rangdong_showroom.png" alt="Rạng Đông Showroom" fill className="object-cover" />
            </div>

            {/* State B Project Card: RaIO Smart Framework */}
            <div className="w-full max-w-[1052px] mx-auto flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
              <Link
                href="/works/raio-smart"
                className="w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 bg-[#181818] relative shrink-0 block cursor-pointer group/thumb"
              >
                <Image
                  src="/images/RaIO_smart_thumb.png"
                  alt="RaIO Smart Framework"
                  fill
                  className="object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/10 transition-colors pointer-events-none" />
              </Link>
              <div className="flex-1 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                    FRAMEWORK
                  </span>
                  <span className="text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                    IOT • MOBILE
                  </span>
                </div>
                <Link href="/works/raio-smart" className="block group/title">
                  <h3 className="text-h4 md:text-h3 font-bold text-white group-hover/title:text-[#00DC6C] transition-colors flex items-center gap-2 cursor-pointer">
                    <span>RaIO Smart whitelabel app</span>
                  </h3>
                </Link>
                <p className="text-[14px] text-white/80 leading-relaxed">
                  {currentLang === "vi"
                    ? "Framework ứng dụng nhà thông minh dạng Whitelabel – giao diện tùy biến cho từng đối tác, quy trình kết nối thiết bị chuyên sâu, cùng logic cốt lõi nhưng dễ dàng cá nhân hóa nhận diện thương hiệu."
                    : "Whitelabel Smart Home App framework – partner-adaptive UI, complex device onboarding, same core logic, customizable brand identity."}
                </p>
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
      className="relative w-full h-[520vh] bg-[#121212] text-white border-t border-b border-white/5 snap-start scroll-mt-0"
    >
      {/* Sticky 100vh Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* ======================================================== */}
        {/* 1. STATE 1 & STATE 2: 3x2 Grid -> Split + Typing text     */}
        {/* ======================================================== */}
        <motion.div
          style={{
            opacity: logoOverviewOpacity,
            display: logoOverviewDisplay,
          }}
          className="absolute inset-0 w-full h-full flex flex-col justify-between pt-[90px] md:pt-[100px] pb-8 md:pb-12 px-6 md:px-12 lg:px-[10vh] z-30 pointer-events-auto"
        >
          {/* Top Header Bar: "Top Client" */}
          <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between shrink-0">
            <h2 className="text-h4 font-bold text-white tracking-tight">
              {currentLang === "vi" ? "Khách hàng tiêu biểu" : "Top Client"}
            </h2>
          </div>

          {/* Centered Area: Top Row Logos, Middle Typing Text, Bottom Row Logos */}
          <div className="w-full max-w-[1440px] mx-auto flex-1 flex flex-col items-center justify-center relative min-h-[360px]">
            
            {/* Top Row (3 Logos): ROGO, FPT, Rạng Đông - 40px height, 24px gap */}
            <motion.div
              style={{ y: topRowY }}
              className="flex items-center justify-center gap-[24px] z-10"
            >
              {topRowLogos.map((client) => (
                <div
                  key={client.name}
                  className="relative h-[40px] w-[140px] sm:w-[160px] md:w-[180px] flex items-center justify-center group cursor-pointer"
                >
                  <Image
                    src={client.src}
                    alt={client.name}
                    fill
                    className="object-contain filter brightness-0 invert opacity-75 group-hover:filter-none group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </motion.div>

            {/* Middle Revealed Text: Typing animation in green (36px font size) */}
            <motion.div
              style={{ opacity: splitTextOpacity }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 px-4"
            >
              <TypingSplitText
                text={typingHeading}
                isActive={isSplitStateActive}
              />
            </motion.div>

            {/* Bottom Row (3 Logos): VietinBank, VCBS, Think & Action - 40px height, 24px gap and 24px margin top */}
            <motion.div
              style={{ y: bottomRowY }}
              className="flex items-center justify-center gap-[24px] mt-[24px] z-10"
            >
              {bottomRowLogos.map((client) => (
                <div
                  key={client.name}
                  className="relative h-[40px] w-[140px] sm:w-[160px] md:w-[180px] flex items-center justify-center group cursor-pointer"
                >
                  <Image
                    src={client.src}
                    alt={client.name}
                    fill
                    className="object-contain filter brightness-0 invert opacity-75 group-hover:filter-none group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2. PHASE 2: ROGO SOLUTIONS (Contained Photo -> Expands to BG -> Card)     */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            opacity: rogoOpacity,
            display: rogoDisplay,
          }}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        >
          {/* Continuous Expanding Photo Animation Container */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none z-10">
            <motion.div
              style={{
                scale: rogoPhotoScale,
                borderRadius: rogoPhotoRadius,
                opacity: rogoPhotoDim,
                filter: useTransform(
                  [rogoPhotoBlur, rogoPhotoBrightness],
                  ([b, br]) => `blur(${b}px) brightness(${br})`
                ),
              }}
              className="w-full max-w-[1052px] aspect-[2302/1052] overflow-hidden shadow-2xl relative"
            >
              <Image
                src="/images/Rogo_solution_bg.png"
                alt="Rogo Solutions Award Ceremony Make In Vietnam 2023"
                fill
                priority
                className="object-cover object-center"
              />
            </motion.div>
          </div>

          {/* Foreground Project Content */}
          <div className="absolute inset-0 w-full h-full z-20 pointer-events-none pt-[90px] md:pt-[100px] pb-8 md:pb-12 px-6 md:px-12 lg:px-[10vh]">
            <div className="max-w-[1440px] mx-auto w-full h-full relative flex flex-col justify-between items-center">
              
              {/* Top-Left: Logo (99px) + 24px gap + Caption */}
              <div className="w-full flex items-center gap-[24px] pointer-events-auto shrink-0 z-30">
                <div className="relative w-[99px] h-[36px] shrink-0 group cursor-pointer">
                  <Image
                    src="/images/Rogo_color.svg"
                    alt="Rogo Solutions"
                    fill
                    className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                  />
                </div>
                <h2 className="text-h7 sm:text-h6 font-mono font-normal text-white leading-tight tracking-tight whitespace-pre-line">
                  {currentLang === "vi"
                    ? "Thương hiệu Đổi mới Sáng tạo\nHàng đầu Việt Nam 2023"
                    : "Top innovation brand\nin Vietnam 2023"}
                </h2>
              </div>

              {/* Revealed Project Card View (1052px width, items-start, 12px chips, 14px description) */}
              <motion.div
                style={{
                  opacity: rogoCardOpacity,
                  y: rogoCardY,
                  pointerEvents: rogoCardPointerEvents as any,
                }}
                className="absolute inset-0 pt-[140px] pb-8 flex items-center justify-center w-full z-30"
              >
                <div className="w-full max-w-[1052px] mx-auto flex flex-col lg:flex-row items-start gap-8 lg:gap-10 pointer-events-auto">
                  {/* Left Mockup Thumbnail: 640x480 (4:3) with 12px radius */}
                  <Link
                    href="/works/rogo-platform-v2"
                    className="w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 bg-[#181818] relative shrink-0 block cursor-pointer group/thumb"
                  >
                    <Image
                      src="/images/Rogo_dashboard_thumb.png"
                      alt="Rogo IoT Platform v2"
                      fill
                      className="object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/10 transition-colors pointer-events-none" />
                  </Link>

                  {/* Right Project Details (Align top, no inner scrollbar) */}
                  <div className="flex-1 space-y-4 pt-0">
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                        FEATURED
                      </span>
                      <span className="text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                        PAAS • B2B
                      </span>
                    </div>

                    <Link href="/works/rogo-platform-v2" className="block group/title">
                      <h3 className="text-h4 md:text-h3 font-bold text-white group-hover/title:text-[#00DC6C] transition-colors flex items-center gap-2 cursor-pointer">
                        <span>Rogo IoT Platform v2</span>
                        <span className="text-b2 opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all text-[#00DC6C]">↗</span>
                      </h3>
                    </Link>

                    <div className="space-y-2">
                      <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">
                        {currentLang === "vi" ? "Khách hàng" : "Clients"}
                      </div>
                      <div className="flex flex-wrap gap-2 text-[12px] font-mono font-bold text-white/80">
                        <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#00DC6C]" /> ROGO Solutions
                        </span>
                        <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                          Rạng Đông
                        </span>
                        <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                          FPT Smart Home
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">
                        {currentLang === "vi" ? "Mô tả" : "Description"}
                      </div>
                      <p className="text-[14px] text-white/80 leading-relaxed">
                        {worksDescription}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">
                        {currentLang === "vi" ? "Công cụ" : "Tools"}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["Stitch AI", "Figma", "Claude AI", "Gemini CLI", "Vercel"].map((tool) => (
                          <span
                            key={tool}
                            className="text-[12px] font-mono text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full"
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
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 3. PHASE 3: RẠNG ĐÔNG (Contained Photo -> Expands to BG -> RaIO Smart)    */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            opacity: rangDongOpacity,
            display: rangDongDisplay,
          }}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        >
          {/* Continuous Expanding Photo Animation Container */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none z-10">
            <motion.div
              style={{
                scale: rangDongPhotoScale,
                borderRadius: rangDongPhotoRadius,
                opacity: rangDongPhotoDim,
                filter: useTransform(
                  [rangDongPhotoBlur, rangDongPhotoBrightness],
                  ([b, br]) => `blur(${b}px) brightness(${br})`
                ),
              }}
              className="w-full max-w-[1052px] aspect-[2302/1052] overflow-hidden shadow-2xl relative"
            >
              <Image
                src="/images/rangdong_showroom.png"
                alt="Rạng Đông Smart Home Showroom"
                fill
                priority
                className="object-cover object-center"
              />
            </motion.div>
          </div>

          {/* Rạng Đông Container */}
          <div className="absolute inset-0 w-full h-full z-20 pointer-events-none pt-[90px] md:pt-[100px] pb-8 md:pb-12 px-6 md:px-12 lg:px-[10vh]">
            <div className="max-w-[1440px] mx-auto w-full h-full relative flex flex-col justify-between items-center">
              
              {/* Top-Left: Logo (156px) + 24px gap + Caption */}
              <div className="w-full flex items-center gap-[24px] pointer-events-auto shrink-0 z-30">
                <div className="relative w-[156px] h-[36px] shrink-0 group cursor-pointer">
                  <Image
                    src="/images/RangDong_color.svg"
                    alt="Rạng Đông Smart Home"
                    fill
                    className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                  />
                </div>
                <h2 className="text-h7 sm:text-h6 font-mono font-normal text-white leading-tight tracking-tight whitespace-pre-line">
                  {currentLang === "vi"
                    ? "Thương hiệu Sản xuất IoT\nSố 1 tại Việt Nam"
                    : "Top 1 IoT manufacturer\nbrand in Vietnam"}
                </h2>
              </div>

              {/* Revealed Project Card View: RaIO Smart Framework (1052px width, items-start, 12px chips, 14px description) */}
              <motion.div
                style={{
                  opacity: rangDongCardOpacity,
                  y: rangDongCardY,
                  pointerEvents: rangDongCardPointerEvents as any,
                }}
                className="absolute inset-0 pt-[140px] pb-8 flex items-center justify-center w-full z-30"
              >
                <div className="w-full max-w-[1052px] mx-auto flex flex-col lg:flex-row items-start gap-8 lg:gap-10 pointer-events-auto">
                  {/* Left Mockup Thumbnail: 640x480 (4:3) with 12px radius */}
                  <Link
                    href="/works/raio-smart"
                    className="w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 bg-[#181818] relative shrink-0 block cursor-pointer group/thumb"
                  >
                    <Image
                      src="/images/RaIO_smart_thumb.png"
                      alt="RaIO Smart Framework"
                      fill
                      className="object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/10 transition-colors pointer-events-none" />
                  </Link>

                  {/* Right Project Details (Align top, no inner scrollbar) */}
                  <div className="flex-1 space-y-4 pt-0">
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                        FRAMEWORK
                      </span>
                      <span className="text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                        IOT • MOBILE
                      </span>
                    </div>

                    <Link href="/works/raio-smart" className="block group/title">
                      <h3 className="text-h4 md:text-h3 font-bold text-white group-hover/title:text-[#00DC6C] transition-colors flex items-center gap-2 cursor-pointer">
                        <span>RaIO Smart whitelabel app</span>
                      </h3>
                    </Link>

                    <div className="space-y-2">
                      <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">
                        {currentLang === "vi" ? "Khách hàng" : "Clients"}
                      </div>
                      <div className="flex flex-wrap gap-2 text-[12px] font-mono font-bold text-white/80">
                        <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                          Austfly
                        </span>
                        <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                          Kangaroo
                        </span>
                        <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#00DC6C]" /> Rạng Đông
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">
                        {currentLang === "vi" ? "Mô tả" : "Description"}
                      </div>
                      <p className="text-[14px] text-white/80 leading-relaxed">
                        {currentLang === "vi"
                          ? "Framework ứng dụng nhà thông minh dạng Whitelabel – giao diện tùy biến cho từng đối tác, quy trình kết nối thiết bị chuyên sâu, cùng logic cốt lõi nhưng dễ dàng cá nhân hóa nhận diện thương hiệu."
                          : "Whitelabel Smart Home App framework – partner-adaptive UI, complex device onboarding, same core logic, customizable brand identity."}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">
                        {currentLang === "vi" ? "Công cụ" : "Tools"}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["React Native", "Figma", "TypeScript", "Vercel"].map((tool) => (
                          <span
                            key={tool}
                            className="text-[12px] font-mono text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full"
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
