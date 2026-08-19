"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail, Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactModal from "@/components/ContactModal";
import FooterSection from "@/components/FooterSection";
import { motion, useScroll, useMotionValueEvent, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// Reusable Green Typing Headline with matching underlines for Section Intros
function TypingGreenHeadline({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const totalChars = lines.reduce((acc, l) => acc + l.length, 0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(0);
  }, [lines]);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setCharCount(current);
      if (current >= totalChars) {
        clearInterval(timer);
      }
    }, 38); // Crisp 38ms typing speed
    return () => clearInterval(timer);
  }, [isInView, totalChars, lines]);

  let charsLeft = charCount;

  return (
    <div
      ref={ref}
      className="w-fit shrink-0 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-bold leading-snug text-[#00DC6C]"
    >
      {lines.map((line, idx) => {
        const lineChars = Math.min(line.length, Math.max(0, charsLeft));
        charsLeft -= line.length;
        const isTypingHere = (charsLeft <= 0 && charsLeft + line.length > 0) || (charCount === 0 && idx === 0 && isInView);
        const showCursor = isTypingHere && charCount < totalChars;
        const typedText = line.slice(0, lineChars);

        return (
          <div
            key={idx}
            className={`border-b border-white/20 pb-3 w-fit ${idx < lines.length - 1 ? "mb-4" : ""}`}
          >
            <span>{typedText || "\u00A0"}</span>
            {showCursor && (
              <span className="inline-block w-[3px] h-[0.85em] bg-[#00DC6C] ml-1.5 animate-pulse align-middle" />
            )}
          </div>
        );
      })}
    </div>
  );
}

// Typing Headline for Works Hero Section (h1-64px with matching underline lines + Safe Auto-scroll on completion)
function HeroTypingHeadline({ onComplete, lang = "en" }: { onComplete?: () => void; lang?: "vi" | "en" }) {
  const line1Full = lang === "vi" ? "Cùng nhìn lại cách từng" : "Take a closer look at";
  const line2Full = lang === "vi" ? "sản phẩm được hoàn thiện" : "how each product came together";
  const totalChars = line1Full.length + line2Full.length;

  const [charCount, setCharCount] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const completedRef = useRef(false);

  useEffect(() => {
    setCharCount(0);
  }, [lang]);

  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setCharCount(current);
      if (current >= totalChars) {
        clearInterval(timer);
        if (!completedRef.current) {
          completedRef.current = true;
          setTimeout(() => {
            onCompleteRef.current?.();
          }, 700); // Wait 700ms after typing before auto-scrolling to next section
        }
      }
    }, 45); // Smooth 45ms typing speed

    return () => clearInterval(timer);
  }, [totalChars, lang]);

  const line1Typed = line1Full.slice(0, Math.min(charCount, line1Full.length));
  const line2Typed =
    charCount > line1Full.length
      ? line2Full.slice(0, charCount - line1Full.length)
      : "";

  return (
    <div className="w-fit mx-auto font-heading text-3xl sm:text-5xl md:text-[54px] lg:text-[64px] font-extrabold leading-tight text-[#00DC6C] text-center tracking-tight">
      <div className="border-b border-white/20 pb-3 mb-6 w-fit mx-auto min-h-[1.25em] flex items-center justify-center">
        <span>{line1Typed}</span>
        {charCount > 0 && charCount < line1Full.length && (
          <span className="inline-block w-2 sm:w-3 h-8 sm:h-12 bg-[#00DC6C] ml-2 animate-pulse align-middle" />
        )}
      </div>
      <div className="border-b border-white/20 pb-3 w-fit mx-auto min-h-[1.25em] flex items-center justify-center">
        <span>{line2Typed}</span>
        {charCount >= line1Full.length && charCount < totalChars && (
          <span className="inline-block w-2 sm:w-3 h-8 sm:h-12 bg-[#00DC6C] ml-2 animate-pulse align-middle" />
        )}
        {charCount === 0 && <span className="opacity-0">{line2Full}</span>}
      </div>
    </div>
  );
}

export default function WorksPage() {
  const { lang, setLang } = useLanguage();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Section 1 scroll tracking for 400vh step snap scroll sequence (System Thinking)
  const section1Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAutoScrolledRef = useRef(false);

  const handleTypingComplete = useCallback(() => {
    if (hasAutoScrolledRef.current) return;
    // Check if the user is still at the Hero section (scrollTop is near top)
    if (containerRef.current && containerRef.current.scrollTop > 80) {
      // User has already scrolled down manually; do not hijack or force-scroll up!
      hasAutoScrolledRef.current = true;
      return;
    }
    hasAutoScrolledRef.current = true;
    if (section1Ref.current) {
      section1Ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const { scrollYProgress: section1Progress } = useScroll({
    target: section1Ref,
    container: containerRef,
    offset: ["start start", "end end"],
  });

  // Step state for Section 1 sequential animation sequence:
  // Step 0 (0.00-0.22): Intro Layout - Tag, Heading & Description (Screenshot klxeqN)
  // Step 1 (0.22-0.48): Platform Layer - Intro pushes up, Layer 0 Active (Screenshot OsNvHE)
  // Step 2 (0.48-0.74): Framework Layer - Layer 1 Active (RaIO Smart)
  // Step 3 (0.74-1.00): Instance Layer - Layer 2 Active (Austfly & Kangaroo)
  const [step, setStep] = useState<number>(0);

  useMotionValueEvent(section1Progress, "change", (latest) => {
    if (latest < 0.22) {
      setStep(0);
    } else if (latest < 0.48) {
      setStep(1);
    } else if (latest < 0.74) {
      setStep(2);
    } else {
      setStep(3);
    }
  });

  const activeLayer = step <= 1 ? 0 : step === 2 ? 1 : 2;

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tab0Ref = useRef<HTMLButtonElement>(null);
  const tab1Ref = useRef<HTMLButtonElement>(null);
  const tab2Ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isDesktop) {
      const tabs = [tab0Ref, tab1Ref, tab2Ref];
      tabs[activeLayer]?.current?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeLayer, isDesktop]);

  const scrollToLayer = (layerIndex: number) => {
    if (section1Ref.current && containerRef.current) {
      const sectionTop = section1Ref.current.offsetTop;
      const sectionHeight = section1Ref.current.offsetHeight;
      const targetY = sectionTop + (layerIndex + 1) * (sectionHeight / 4);
      containerRef.current.scrollTo({ top: targetY, behavior: "smooth" });
    }
    setStep(layerIndex + 1);
  };

  // Section 2 scroll tracking for 300vh step snap scroll sequence (IoT tools: Intro, Thing Partner, Thing Flow)
  const section2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: section2Progress } = useScroll({
    target: section2Ref,
    container: containerRef,
    offset: ["start start", "end end"],
  });

  const [section2Step, setSection2Step] = useState<number>(0);

  useMotionValueEvent(section2Progress, "change", (latest) => {
    if (latest < 0.28) {
      setSection2Step(0);
    } else if (latest < 0.68) {
      setSection2Step(1);
    } else {
      setSection2Step(2);
    }
  });

  // Section 3 scroll tracking for 200vh step snap scroll sequence (Other work)
  const section3Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: section3Progress } = useScroll({
    target: section3Ref,
    container: containerRef,
    offset: ["start start", "end end"],
  });

  const [section3Step, setSection3Step] = useState<number>(0);

  useMotionValueEvent(section3Progress, "change", (latest) => {
    if (latest < 0.45) {
      setSection3Step(0);
    } else {
      setSection3Step(1);
    }
  });

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
        {/* HERO SECTION: "Take a closer look at / how each product came together" with h1-64px typing animation */}
        <section className="w-full min-h-screen snap-start snap-always flex flex-col items-center justify-center px-6 md:px-12 lg:px-[10vh] border-b border-white/5 bg-[#121212] relative z-10">
          <div className="max-w-[1440px] mx-auto w-full flex flex-col items-center justify-center text-center">
            <HeroTypingHeadline onComplete={handleTypingComplete} lang={lang} />
          </div>
        </section>

        {/* SECTION 1: SYSTEM THINKING (400vh container with discrete snap points for Intro + 3 Layers) */}
        <section
          ref={section1Ref}
          className="relative w-full h-[400vh] bg-[#121212] border-b border-white/5 snap-start"
        >
          {/* CSS Scroll Snap Step Anchors: 4 Steps (Intro, Platform, Framework, Instance) */}
          <div className="absolute inset-0 w-full h-full flex flex-col justify-between pointer-events-none z-0">
            <div className="h-screen w-full snap-start snap-always" />
            <div className="h-screen w-full snap-start snap-always" />
            <div className="h-screen w-full snap-start snap-always" />
            <div className="h-screen w-full snap-start snap-always" />
          </div>

          {/* Sticky 100vh Viewport */}
          <div className="sticky top-0 h-screen w-full overflow-hidden px-4 sm:px-6 md:px-12 lg:px-[10vh] flex flex-col justify-start lg:justify-center items-center z-10 pt-[72px] sm:pt-[80px] lg:pt-16">
            
            <div className="max-w-[1440px] mx-auto w-full relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center min-h-0 lg:min-h-[520px]">
              
              {/* STAGE 1: Step 0 - Intro Layout (Wide container with top-left subheadline in regular weight) */}
              <motion.div
                animate={{
                  opacity: step === 0 ? 1 : 0,
                  y: step === 0 ? "0%" : "-120%",
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full flex flex-col justify-center items-center ${
                  step !== 0 ? "pointer-events-none absolute inset-0 z-0" : "relative z-10"
                }`}
              >
                <div className="w-full lg:w-[65vw] max-w-[1100px] mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
                  {/* Subheadline placed at top-left in 24px regular all-caps Bricolage Grotesque */}
                  <div className="text-subhead text-white">
                    {lang === "vi" ? "Tư duy hệ thống" : "System Thinking"}
                  </div>

                  {/* 2-Column Content: Left Title with typing animation & lines matching text width + Right Flexible Description */}
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 items-start w-full">
                    {/* Left Column: Heading with typing effect and underlines matching text length */}
                    <TypingGreenHeadline
                      lines={
                        lang === "vi"
                          ? ["Một nền tảng,", "ba tầng kiến trúc,", "xây để mở rộng."]
                          : ["One platform,", "three layers,", "built to extend."]
                      }
                    />

                    {/* Right Column: Description Body 0 */}
                    <div className="flex-1 min-w-0 pt-1 lg:pt-2">
                      <p className="text-b0 font-normal text-white/90 leading-relaxed">
                        {lang === "vi"
                          ? "Rogo IoT Platform là cốt lõi quản lý. RaIO Smart biến cốt lõi đó thành một whitelabel framework tái sử dụng – cùng logic sản phẩm, tùy biến thương hiệu linh hoạt. Mỗi đối tác cắm vào framework để sở hữu instance riêng biệt mà không cần xây dựng lại hệ thống từ đầu."
                          : "Rogo IoT Platform is the management core. RaIO Smart turns that core into a reusable whitelabel framework – same product logic, adaptable branding. Every partner then plugs into the framework as its own instance, without rebuilding the system from scratch."}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* STAGE 2: Step 1, 2, 3 - Full 3-Column Project View (Layer Menu + Center Mockup + Right Info) */}
              <motion.div
                animate={{
                  opacity: step >= 1 ? 1 : 0,
                  y: step >= 1 ? "0%" : "100%",
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-start ${
                  step < 1 ? "pointer-events-none absolute inset-0 z-0" : "relative z-10"
                }`}
              >
                {/* Top / Left Menu: Horizontal Tab Menu on Mobile/Tablet (< lg), 3-Layer Indicator Column on Desktop (>= lg) */}
                <div className="w-full lg:w-auto lg:col-span-3 flex flex-row items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-none pb-2 sm:pb-3 border-b border-white/10 lg:border-none lg:flex-col lg:items-start lg:space-y-6 lg:gap-0 lg:pb-0 font-heading text-[14px] sm:text-[17px] md:text-[20px] lg:text-[24px] font-bold shrink-0 whitespace-nowrap">
                  {/* Platform layer */}
                  <button
                    ref={tab0Ref}
                    onClick={() => scrollToLayer(0)}
                    className="flex items-center gap-2 sm:gap-3 transition-colors cursor-pointer bg-transparent border-0 outline-none p-0 shrink-0"
                  >
                    {activeLayer === 0 && (
                      <span className="w-1.5 h-[16px] sm:h-[20px] lg:h-[24px] bg-[#00DC6C] rounded-full inline-block shrink-0" />
                    )}
                    <span className={activeLayer === 0 ? "text-[#00DC6C]" : "text-white/30 hover:text-white/70"}>
                      {lang === "vi" ? "Tầng Nền tảng (Platform)" : "Platform layer"}
                    </span>
                  </button>

                  {/* Framework layer */}
                  <button
                    ref={tab1Ref}
                    onClick={() => scrollToLayer(1)}
                    className="flex items-center gap-2 sm:gap-3 transition-colors cursor-pointer bg-transparent border-0 outline-none p-0 shrink-0"
                  >
                    {activeLayer === 1 && (
                      <span className="w-1.5 h-[16px] sm:h-[20px] lg:h-[24px] bg-[#00DC6C] rounded-full inline-block shrink-0" />
                    )}
                    <span className={activeLayer === 1 ? "text-[#00DC6C]" : "text-white/30 hover:text-white/70"}>
                      {lang === "vi" ? "Tầng Khung (Framework)" : "Framework layer"}
                    </span>
                  </button>

                  {/* Instance layer */}
                  <button
                    ref={tab2Ref}
                    onClick={() => scrollToLayer(2)}
                    className="flex items-center gap-2 sm:gap-3 transition-colors cursor-pointer bg-transparent border-0 outline-none p-0 shrink-0"
                  >
                    {activeLayer === 2 && (
                      <span className="w-1.5 h-[16px] sm:h-[20px] lg:h-[24px] bg-[#00DC6C] rounded-full inline-block shrink-0" />
                    )}
                    <span className={activeLayer === 2 ? "text-[#00DC6C]" : "text-white/30 hover:text-white/70"}>
                      {lang === "vi" ? "Tầng Phiên bản (Instance)" : "Instance layer"}
                    </span>
                  </button>
                </div>

                {/* Center & Right Columns (lg:col-span-9): Dynamic Layer Content with Horizontal Carousel Transitions on Mobile */}
                <div className="w-full lg:col-span-9 relative flex-1 min-h-[480px] lg:min-h-[520px]">
                  
                  {/* LAYER 1: Platform Layer Content */}
                  <motion.div
                    animate={
                      isDesktop
                        ? {
                            opacity: activeLayer === 0 ? 1 : 0,
                            y: activeLayer === 0 ? "0%" : "-80%",
                            x: "0%",
                          }
                        : {
                            opacity: activeLayer === 0 ? 1 : 0,
                            x: activeLayer === 0 ? "0%" : "-100%",
                            y: "0%",
                          }
                    }
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full flex flex-col lg:flex-row gap-5 sm:gap-6 lg:gap-8 items-start ${
                      activeLayer !== 0 ? "pointer-events-none absolute inset-0 z-0" : "relative z-10"
                    }`}
                  >
                    {/* Thumbnail Card on Top for Mobile/Tablet (< lg), Left for Desktop (>= lg) */}
                    <Link
                      href="/works/rogo-platform-v2"
                      className="w-full max-w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 bg-[#181818] relative shrink-0 block cursor-pointer group/thumb"
                    >
                      <Image
                        src="/images/Rogo_Platform_large.png"
                        alt="Rogo IoT Platform v2"
                        fill
                        className="object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/10 transition-colors pointer-events-none" />
                    </Link>

                    {/* Right / Bottom Content Details */}
                    <div className="flex-1 space-y-2 sm:space-y-3 lg:space-y-4 pt-0 w-full">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          FEATURED
                        </span>
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          PAAS • B2B
                        </span>
                      </div>

                      <Link href="/works/rogo-platform-v2" className="block group/title">
                        <h3 className="font-mono text-h5 sm:text-h4 md:text-h3 font-bold text-white group-hover/title:text-[#00DC6C] transition-colors flex items-center gap-2 cursor-pointer leading-tight">
                          <span>Rogo IoT Platform<br className="hidden sm:block" /> V2</span>
                          <span className="text-b2 opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all text-[#00DC6C]">↗</span>
                        </h3>
                      </Link>

                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="text-[11px] sm:text-b3 font-mono text-white/40 uppercase tracking-wider">
                          {lang === "vi" ? "Khách hàng" : "Clients"}
                        </div>
                        <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
                          <div className="relative w-[70px] sm:w-[90px] h-[20px] sm:h-[28px] group cursor-pointer">
                            <Image
                              src="/images/Rogo_color.svg"
                              alt="ROGO Solutions"
                              fill
                              className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                            />
                          </div>
                          <div className="relative w-[80px] sm:w-[100px] h-[20px] sm:h-[28px] group cursor-pointer">
                            <Image
                              src="/images/RangDong_color.svg"
                              alt="Rạng Đông"
                              fill
                              className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                            />
                          </div>
                          <div className="relative w-[80px] sm:w-[100px] h-[20px] sm:h-[28px] group cursor-pointer">
                            <Image
                              src="/images/FPTSmartHome_color.svg"
                              alt="FPT Smart Home"
                              fill
                              className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="text-[11px] sm:text-b3 font-mono text-white/40 uppercase tracking-wider">
                          {lang === "vi" ? "Mô tả" : "Description"}
                        </div>
                        <p className="font-mono text-[12px] sm:text-[13px] lg:text-[14px] text-white/80 leading-relaxed">
                          {lang === "vi"
                            ? "Rogo Solutions xây dựng và vận hành lõi nền tảng – hỗ trợ mô hình whitelabel linh hoạt. Mỗi thương hiệu đối tác sở hữu một instance độc lập: chung kiến trúc, chung lớp điều khiển, nhưng mang trọn vẹn nhận diện thương hiệu riêng."
                            : "Rogo Solutions builds and operates the core — and the platform itself is whitelabelable. Each partner brand gets their own instance: same architecture, same control plane, their own identity. The whitelabel logic doesn't start at the app layer — it starts here."}
                        </p>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="text-[11px] sm:text-b3 font-mono text-white/40 uppercase tracking-wider">
                          {lang === "vi" ? "Công cụ" : "Tools"}
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {["Stitch AI", "Figma", "Claude AI", "Gemini CLI", "Vercel"].map((tool) => (
                            <span key={tool} className="text-[10px] sm:text-[12px] font-mono text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* LAYER 2: Framework Layer Content */}
                  <motion.div
                    animate={
                      isDesktop
                        ? {
                            opacity: activeLayer === 1 ? 1 : 0,
                            y: activeLayer === 1 ? "0%" : activeLayer < 1 ? "80%" : "-80%",
                            x: "0%",
                          }
                        : {
                            opacity: activeLayer === 1 ? 1 : 0,
                            x: activeLayer === 1 ? "0%" : activeLayer < 1 ? "100%" : "-100%",
                            y: "0%",
                          }
                    }
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full flex flex-col lg:flex-row gap-5 sm:gap-6 lg:gap-8 items-start ${
                      activeLayer !== 1 ? "pointer-events-none absolute inset-0 z-0" : "relative z-10"
                    }`}
                  >
                    {/* Thumbnail Card on Top for Mobile/Tablet (< lg), Left for Desktop (>= lg) */}
                    <div className="w-full max-w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 bg-[#181818] relative shrink-0">
                      <Image
                        src="/images/raio.png"
                        alt="RaIO Smart Framework"
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Right / Bottom Content Details */}
                    <div className="flex-1 space-y-2 sm:space-y-3 lg:space-y-4 pt-0 w-full">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          FRAMEWORK
                        </span>
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          IOT • MOBILE
                        </span>
                      </div>

                      <h3 className="font-mono text-h5 sm:text-h4 md:text-h3 font-bold text-white leading-tight">
                        RaIO Smart<br className="hidden sm:block" /> Framework
                      </h3>

                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="text-[11px] sm:text-b3 font-mono text-white/40 uppercase tracking-wider">
                          {lang === "vi" ? "Khách hàng" : "Clients"}
                        </div>
                        <div className="flex flex-wrap gap-2 text-[11px] sm:text-[12px] font-mono font-bold text-white/80">
                          <span className="bg-white/5 border border-white/10 px-2.5 py-0.5 sm:py-1 rounded">Austfly</span>
                          <span className="bg-white/5 border border-white/10 px-2.5 py-0.5 sm:py-1 rounded">Kangaroo</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="text-[11px] sm:text-b3 font-mono text-white/40 uppercase tracking-wider">
                          {lang === "vi" ? "Mô tả" : "Description"}
                        </div>
                        <p className="font-mono text-[12px] sm:text-[13px] lg:text-[14px] text-white/70 leading-relaxed">
                          {lang === "vi"
                            ? "Khung ứng dụng nhà thông minh Whitelabel – giao diện thích ứng theo đối tác, quy trình thêm thiết bị thông minh, đồng nhất logic sản phẩm, tùy biến thương hiệu nhanh chóng."
                            : "Whitelabel Smart Home App framework – partner-adaptive UI, complex device onboarding, same core logic, customizable brand identity."}
                        </p>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="text-[11px] sm:text-b3 font-mono text-white/40 uppercase tracking-wider">
                          {lang === "vi" ? "Công cụ" : "Tools"}
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {["React Native", "Figma", "TypeScript", "Vercel"].map((tool) => (
                            <span key={tool} className="text-[10px] sm:text-[12px] font-mono text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* LAYER 3: Instance Layer Content (Austfly only) */}
                  <motion.div
                    animate={
                      isDesktop
                        ? {
                            opacity: activeLayer === 2 ? 1 : 0,
                            y: activeLayer === 2 ? "0%" : "80%",
                            x: "0%",
                          }
                        : {
                            opacity: activeLayer === 2 ? 1 : 0,
                            x: activeLayer === 2 ? "0%" : "100%",
                            y: "0%",
                          }
                    }
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full flex flex-col lg:flex-row gap-5 sm:gap-6 lg:gap-8 items-start ${
                      activeLayer !== 2 ? "pointer-events-none absolute inset-0 z-0" : "relative z-10"
                    }`}
                  >
                    {/* Thumbnail Card on Top for Mobile/Tablet (< lg), Left for Desktop (>= lg) */}
                    <div className="w-full max-w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 bg-[#181818] relative shrink-0">
                      <Image
                        src="/images/austfly.png"
                        alt="Austfly App Instance"
                        fill
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Right / Bottom Content Details */}
                    <div className="flex-1 space-y-2 sm:space-y-3 lg:space-y-4 pt-0 w-full">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          INSTANCE
                        </span>
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          LIVE APP
                        </span>
                      </div>

                      <h3 className="font-mono text-h5 sm:text-h4 md:text-h3 font-bold text-white leading-tight">
                        Austfly
                      </h3>

                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="text-[11px] sm:text-b3 font-mono text-white/40 uppercase tracking-wider">
                          {lang === "vi" ? "Khách hàng" : "Clients"}
                        </div>
                        <div className="flex flex-wrap gap-2 text-[11px] sm:text-[12px] font-mono font-bold text-white/80">
                          <span className="bg-white/5 border border-white/10 px-2.5 py-0.5 sm:py-1 rounded">Austdoor Group</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="text-[11px] sm:text-b3 font-mono text-white/40 uppercase tracking-wider">
                          {lang === "vi" ? "Mô tả" : "Description"}
                        </div>
                        <p className="font-mono text-[12px] sm:text-[13px] lg:text-[14px] text-white/70 leading-relaxed">
                          {lang === "vi"
                            ? "Ứng dụng điều khiển cửa cuốn và hệ sinh thái nhà thông minh Austfly — instance tùy biến hoàn chỉnh vận hành trên nền tảng RaIO Smart Framework."
                            : "Smart roller shutter & IoT control app Austfly — a fully customized instance powered by the RaIO Smart Framework."}
                        </p>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="text-[11px] sm:text-b3 font-mono text-white/40 uppercase tracking-wider">
                          {lang === "vi" ? "Công cụ" : "Tools"}
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {["RaIO Framework", "Rogo IoT Platform", "Figma", "React Native"].map((tool) => (
                            <span key={tool} className="text-[10px] sm:text-[12px] font-mono text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
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

        {/* SECTION 2: IOT TOOLS (300vh with synchronized Intro + Thing Partner + Thing Flow scroll transitions) */}
        <section
          ref={section2Ref}
          className="relative w-full h-[300vh] bg-[#121212] border-b border-white/5 snap-start"
        >
          {/* CSS Scroll Snap Step Anchors: 3 Steps (Intro, Thing Partner, Thing Flow) */}
          <div className="absolute inset-0 w-full h-full flex flex-col justify-between pointer-events-none z-0">
            <div className="h-screen w-full snap-start snap-always" />
            <div className="h-screen w-full snap-start snap-always" />
            <div className="h-screen w-full snap-start snap-always" />
          </div>

          {/* Sticky 100vh Viewport */}
          <div className="sticky top-0 h-screen w-full overflow-hidden px-4 sm:px-6 md:px-12 lg:px-[10vh] flex flex-col justify-start lg:justify-center items-center z-10 pt-[72px] sm:pt-[80px] lg:pt-16">
            <div className="max-w-[1440px] mx-auto w-full relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center min-h-0 lg:min-h-[520px]">
              
              {/* STAGE 1: Step 0 - Intro Layout (Wide container with top-left subheadline in regular weight) */}
              <motion.div
                animate={{
                  opacity: section2Step === 0 ? 1 : 0,
                  y: section2Step === 0 ? "0%" : "-120%",
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full flex flex-col justify-center items-center ${
                  section2Step !== 0 ? "pointer-events-none absolute inset-0 z-0" : "relative z-10"
                }`}
              >
                <div className="w-full lg:w-[65vw] max-w-[1100px] mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
                  {/* Subheadline placed at top-left in 24px regular all-caps Bricolage Grotesque */}
                  <div className="text-subhead text-white">
                    {lang === "vi" ? "Công cụ IoT" : "IoT tools"}
                  </div>

                  {/* 2-Column Content: Left Title with typing animation in Bricolage Grotesque + Right Flexible Description */}
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 items-start w-full">
                    {/* Left Column: Heading with typing effect and underlines matching text length */}
                    <TypingGreenHeadline
                      lines={
                        lang === "vi"
                          ? ["Công cụ chuyên biệt", "cho quy trình nghiệp vụ", "vận hành IoT."]
                          : ["Standalone tools", "built for IoT-driven", "business workflows."]
                      }
                    />

                    {/* Right Column: Description Body 0 */}
                    <div className="flex-1 min-w-0 pt-1 lg:pt-2">
                      <p className="text-b0 font-normal text-white/90 leading-relaxed">
                        {lang === "vi"
                          ? "Khi mô hình whitelabel không đủ — giải pháp là các công cụ chuyên biệt giải quyết chính xác các bài toán vận hành."
                          : "When the whitelabel model isn't enough – purpose-built tools for specific operational problems."}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* STAGE 2: Step 1 - Project View (Thing Partner) */}
              <motion.div
                animate={
                  isDesktop
                    ? {
                        opacity: section2Step === 1 ? 1 : 0,
                        y: section2Step === 1 ? "0%" : section2Step < 1 ? "100%" : "-80%",
                        x: "0%",
                      }
                    : {
                        opacity: section2Step === 1 ? 1 : 0,
                        x: section2Step === 1 ? "0%" : section2Step < 1 ? "100%" : "-100%",
                        y: "0%",
                      }
                }
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full max-w-[1052px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10 items-start ${
                  section2Step !== 1 ? "pointer-events-none absolute inset-0 z-0" : "relative z-10"
                }`}
              >
                {/* Left Thumbnail Mockup Card: 4:3 & rounded-[12px] */}
                <div className="w-full max-w-full lg:w-[560px] lg:min-w-[560px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 bg-[#181818] relative shrink-0">
                  <Image
                    src="/images/Rogo_IoT_Platform_Dashboard_Interface.png"
                    alt="Thing Partner"
                    fill
                    className="object-cover object-left"
                  />
                </div>

                {/* Right Project Details (Align top, no inner scrollbar) */}
                <div className="flex-1 space-y-2 sm:space-y-3 lg:space-y-4 pt-0 w-full">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="text-[11px] sm:text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                      FEATURED
                    </span>
                    <span className="text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                      PAAS • B2B
                    </span>
                  </div>

                  <h3 className="font-mono text-h5 sm:text-h4 md:text-h3 font-bold text-white leading-tight">
                    Thing Partner
                  </h3>

                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="text-[11px] sm:text-b3 font-mono text-white/40 uppercase tracking-wider">
                      {lang === "vi" ? "Khách hàng" : "Clients"}
                    </div>
                    <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
                      <div className="relative w-[70px] sm:w-[90px] h-[20px] sm:h-[28px] group cursor-pointer">
                        <Image
                          src="/images/Rogo_color.svg"
                          alt="ROGO Solutions"
                          fill
                          className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                        />
                      </div>
                      <div className="relative w-[80px] sm:w-[100px] h-[20px] sm:h-[28px] group cursor-pointer">
                        <Image
                          src="/images/RangDong_color.svg"
                          alt="Rạng Đông"
                          fill
                          className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                        />
                      </div>
                      <div className="relative w-[80px] sm:w-[100px] h-[20px] sm:h-[28px] group cursor-pointer">
                        <Image
                          src="/images/FPTSmartHome_color.svg"
                          alt="FPT Smart Home"
                          fill
                          className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="text-[11px] sm:text-b3 font-mono text-white/40 uppercase tracking-wider">
                      {lang === "vi" ? "Mô tả" : "Description"}
                    </div>
                    <p className="font-mono text-[12px] sm:text-[13px] lg:text-[14px] text-white/80 leading-relaxed">
                      {lang === "vi"
                        ? "Dành cho đội ngũ trực tiếp sản xuất và quản lý thiết bị. Được nghiên cứu thực địa trực tiếp, bao quát từ firmware đến bảo hành qua 6 giai đoạn vòng đời."
                        : "Rogo Solutions builds and operates the core — and the platform itself is whitelabelable. Each partner brand gets their own instance: same architecture, same control plane, their own identity."}
                    </p>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="text-[11px] sm:text-b3 font-mono text-white/40 uppercase tracking-wider">
                      {lang === "vi" ? "Công cụ" : "Tools"}
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {["Stitch AI", "Figma", "Claude AI", "Gemini CLI", "Vercel"].map((tool) => (
                        <span key={tool} className="text-[10px] sm:text-[12px] font-mono text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* STAGE 3: Step 2 - Project View (Thing Flow) */}
              <motion.div
                animate={
                  isDesktop
                    ? {
                        opacity: section2Step === 2 ? 1 : 0,
                        y: section2Step === 2 ? "0%" : "100%",
                        x: "0%",
                      }
                    : {
                        opacity: section2Step === 2 ? 1 : 0,
                        x: section2Step === 2 ? "0%" : "100%",
                        y: "0%",
                      }
                }
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full max-w-[1052px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10 items-start ${
                  section2Step !== 2 ? "pointer-events-none absolute inset-0 z-0" : "relative z-10"
                }`}
              >
                {/* Left Thumbnail Mockup Card: 4:3 & rounded-[12px] */}
                <div className="w-full max-w-full lg:w-[560px] lg:min-w-[560px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 bg-[#181818] relative shrink-0">
                  <Image
                    src="/images/rogo_project/Diagram 10.png"
                    alt="Thing Flow"
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Right Project Details (Align top, no inner scrollbar) */}
                <div className="flex-1 space-y-1.5 sm:space-y-2.5 lg:space-y-4 pt-0 w-full">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-[11px] sm:text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                      FEATURED
                    </span>
                    <span className="text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                      IOT AUTOMATION • B2B
                    </span>
                  </div>

                  <h3 className="font-mono text-h5 sm:text-h4 md:text-h3 font-bold text-white leading-tight">
                    Thing Flow
                  </h3>

                  <div className="space-y-2">
                    <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">
                      {lang === "vi" ? "Khách hàng" : "Clients"}
                    </div>
                    <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
                      <div className="relative w-[90px] h-[28px] group cursor-pointer">
                        <Image
                          src="/images/Rogo_color.svg"
                          alt="ROGO Solutions"
                          fill
                          className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                        />
                      </div>
                      <div className="relative w-[100px] h-[28px] group cursor-pointer">
                        <Image
                          src="/images/FPTSmartHome_color.svg"
                          alt="FPT Smart Home"
                          fill
                          className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">
                      {lang === "vi" ? "Mô tả" : "Description"}
                    </div>
                    <p className="font-mono text-[14px] text-white/80 leading-relaxed">
                      {lang === "vi"
                        ? "Nền tảng tự động hóa luồng điều khiển và kịch bản thông minh cho hệ sinh thái IoT đa thiết bị. Tối ưu hóa vận hành và xử lý sự kiện tức thời."
                        : "Visual automation flow and smart rule orchestration engine for complex multi-device IoT ecosystems. Streamlines operations with real-time event triggers."}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">
                      {lang === "vi" ? "Công cụ" : "Tools"}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Figma", "Claude AI", "Gemini CLI", "Vercel"].map((tool) => (
                        <span key={tool} className="text-[12px] font-mono text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* SECTION 3: OTHER WORK (200vh with synchronized Intro + Project View scroll transition) */}
        <section
          ref={section3Ref}
          className="relative w-full h-[200vh] bg-[#121212] border-b border-white/5 snap-start"
        >
          {/* CSS Scroll Snap Step Anchors: 2 Steps (Intro & Project Details) */}
          <div className="absolute inset-0 w-full h-full flex flex-col justify-between pointer-events-none z-0">
            <div className="h-screen w-full snap-start snap-always" />
            <div className="h-screen w-full snap-start snap-always" />
          </div>

          {/* Sticky 100vh Viewport */}
          <div className="sticky top-0 h-screen w-full overflow-hidden px-6 md:px-12 lg:px-[10vh] flex flex-col justify-center items-center z-10 pt-16">
            <div className="max-w-[1440px] mx-auto w-full relative overflow-hidden flex items-center min-h-[520px]">
              
              {/* STAGE 1: Step 0 - Intro Layout (Wide container with top-left subheadline in regular weight) */}
              <motion.div
                animate={{
                  opacity: section3Step === 0 ? 1 : 0,
                  y: section3Step === 0 ? "0%" : "-120%",
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full flex flex-col justify-center items-center ${
                  section3Step !== 0 ? "pointer-events-none absolute inset-0 z-0" : "relative z-10"
                }`}
              >
                <div className="w-full lg:w-[65vw] max-w-[1100px] mx-auto space-y-12 sm:space-y-16">
                  {/* Subheadline placed at top-left in 24px regular all-caps Bricolage Grotesque */}
                  <div className="text-subhead text-white">
                    {lang === "vi" ? "Dự án khác" : "Other work"}
                  </div>

                  {/* 2-Column Content: Left Title with typing animation in Bricolage Grotesque + Right Flexible Description */}
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start w-full">
                    {/* Left Column: Heading with typing effect and underlines matching text length */}
                    <TypingGreenHeadline
                      lines={
                        lang === "vi"
                          ? ["Các dự án độc lập", "tạo nên giá trị."]
                          : ["Independent projects", "crafted for impact."]
                      }
                    />

                    {/* Right Column: Description Body 0 */}
                    <div className="flex-1 min-w-0 pt-2">
                      <p className="text-b0 font-normal text-white/90 leading-relaxed">
                        {lang === "vi"
                          ? "Các dự án xây dựng sản phẩm và định hình thương hiệu bên ngoài hệ sinh thái chính — từ AI prompt platform đến bộ nhận diện cho doanh nghiệp."
                          : "Product and brand initiatives crafted outside the main ecosystem — from AI platforms to brand identity systems."}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* STAGE 2: Step 1 - Project View (Left Mockup + Right Details) with exact 1052px container width */}
              <motion.div
                animate={{
                  opacity: section3Step >= 1 ? 1 : 0,
                  y: section3Step >= 1 ? "0%" : "100%",
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full max-w-[1052px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10 items-start h-full ${
                  section3Step < 1 ? "pointer-events-none absolute inset-0 z-0" : "relative z-10"
                }`}
              >
                {/* Left Mockup Card: 4:3 & rounded-[12px] */}
                <a
                  href="https://thing.ai.vn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full lg:w-[560px] lg:min-w-[560px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 relative shrink-0 block group"
                >
                  <Image
                    src="/images/Thing_AI_VN.png"
                    alt="Thing AI VN"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </a>

                {/* Right Details (Align top, no inner scrollbar) */}
                <div className="flex-1 space-y-4 pt-0">
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                      COMMUNITY
                    </span>
                    <span className="text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                      OPEN SOURCE • WEB
                    </span>
                  </div>

                  <h3 className="font-mono text-h4 md:text-h3 font-bold text-white flex items-center justify-between">
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
                    <div className="flex flex-wrap gap-2 text-[12px] font-mono font-bold text-white/80">
                      <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00DC6C]" /> Maker Community
                      </span>
                      <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded">Enterprise Developers</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Description</div>
                    <p className="font-mono text-[14px] text-white/70 leading-relaxed">
                      {lang === "vi"
                        ? "Startup IoT mã nguồn mở kết nối cộng đồng nhà sáng chế (makers) và khách hàng doanh nghiệp. Được xây dựng từ con số không."
                        : "Open-source IoT startup bridging community makers and enterprise clients. Built from zero."}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-b3 font-mono text-white/40 uppercase tracking-wider">Tools</div>
                    <div className="flex flex-wrap gap-2">
                      {["Next.js", "Figma", "Tailwind CSS", "Vercel", "TypeScript"].map((tool) => (
                        <span key={tool} className="text-[12px] font-mono text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

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
