"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Check, X } from "lucide-react";
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
    <div className="w-fit mx-auto font-heading text-3xl sm:text-5xl md:text-[54px] lg:text-[64px] font-bold leading-tight text-[#00DC6C] text-center tracking-tight">
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

// Feature flag: Set to true when Thing Flow design is ready to display
const SHOW_THING_FLOW = false;

export default function WorksPage() {
  const { lang, setLang } = useLanguage();
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Responsive check for vertical vs horizontal slide transitions
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Section 1 scroll tracking for 400vh step snap scroll sequence (System Thinking)
  const section1Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAutoScrolledRef = useRef(false);

  const handleTypingComplete = useCallback(() => {
    if (hasAutoScrolledRef.current) return;
    if (containerRef.current && containerRef.current.scrollTop > 80) {
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

  // Step 0 (0.00-0.22): Intro Layout - Tag, Heading & Description
  // Step 1 (0.22-0.48): Platform Layer - Intro pushes up, Layer 0 Active
  // Step 2 (0.48-0.74): Framework Layer - Layer 1 Active
  // Step 3 (0.74-1.00): Instance Layer - Layer 2 Active
  const [step, setStep] = useState<number>(0);

  // Sync scroll progress with visual step
  useMotionValueEvent(section1Progress, "change", (latest) => {
    if (latest < 0.22) {
      setStep(0);
    } else if (latest < 0.48) {
      setStep(1);
      setActiveLayer(0);
    } else if (latest < 0.74) {
      setStep(2);
      setActiveLayer(1);
    } else {
      setStep(3);
      setActiveLayer(2);
    }
  });

  // Layer Content mapping for 3 sub-projects
  const layers = [
    {
      id: 0,
      title: "Rogo IoT Platform V2",
      slug: "/works/rogo-platform-v2",
      tags: ["FEATURED", "PAAS • B2B", "WHITELABEL", "DESKTOP"],
      description:
        lang === "vi"
          ? "Nền tảng quản trị IoT whitelabel đa tầng — kiến trúc phân quyền đa tổ chức, quản lý thiết bị tập trung cho quy mô lớn."
          : "Enterprise whitelabel IoT platform core – unified device fleet management and multi-tenant control plane.",
      image: "/images/Rogo_dashboard_thumb.png",
      alt: "Rogo IoT Platform v2",
    },
    {
      id: 1,
      title: "RaIO Smart whitelabel app",
      slug: "/works/raio-smart",
      tags: ["FEATURED", "WHITELABEL", "MOBILE", "IOT"],
      description:
        lang === "vi"
          ? "Framework ứng dụng nhà thông minh dạng Whitelabel cho phép tùy biến nhận diện đa thương hiệu và tích hợp thiết bị linh hoạt."
          : "Multi-brand IoT mobile app framework enabling rapid UI customization and complex onboarding workflows.",
      image: "/images/RaIO_smart_thumb.png",
      alt: "RaIO Smart whitelabel app",
    },
    {
      id: 2,
      title: "Austfly",
      slug: "/works/austfly",
      tags: ["FEATURED", "INSTANCE", "MOBILE", "IOT", "WHITELABEL"],
      description:
        lang === "vi"
          ? "Ứng dụng điều khiển cửa cuốn và nhà thông minh Austfly — một instance tùy biến cao cấp trên nền tảng RaIO Smart."
          : "Smart roller shutter & IoT control app Austfly — a customized instance powered by RaIO Smart framework.",
      image: "/images/austfly.png",
      alt: "Austfly & Kangaroo Instances",
    },
  ];

  // Auto-scroll the active tab into view horizontally on Mobile/Tablet when step changes
  const tab0Ref = useRef<HTMLButtonElement>(null);
  const tab1Ref = useRef<HTMLButtonElement>(null);
  const tab2Ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isDesktop) {
      const tabs = [tab0Ref, tab1Ref, tab2Ref];
      tabs[activeLayer]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
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

  // Section 2 scroll tracking for step snap scroll sequence (IoT tools: Intro, Thing Partner, [optional] Thing Flow)
  const section2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: section2Progress } = useScroll({
    target: section2Ref,
    container: containerRef,
    offset: ["start start", "end end"],
  });

  const [section2Step, setSection2Step] = useState<number>(0);

  useMotionValueEvent(section2Progress, "change", (latest) => {
    if (SHOW_THING_FLOW) {
      if (latest < 0.28) {
        setSection2Step(0);
      } else if (latest < 0.68) {
        setSection2Step(1);
      } else {
        setSection2Step(2);
      }
    } else {
      if (latest < 0.45) {
        setSection2Step(0);
      } else {
        setSection2Step(1);
      }
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
                <div className="w-full lg:w-auto lg:col-span-3 flex flex-row items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-none pb-2 sm:pb-3 border-b border-white/10 lg:border-none lg:flex-col lg:items-start lg:space-y-8 lg:gap-0 lg:pb-0 font-heading shrink-0 whitespace-nowrap">
                  {/* Platform layer */}
                  <button
                    ref={tab0Ref}
                    onClick={() => scrollToLayer(0)}
                    className="flex items-center gap-2.5 sm:gap-3.5 transition-colors cursor-pointer bg-transparent border-0 outline-none p-0 shrink-0 text-left"
                  >
                    {activeLayer === 0 && (
                      <span className="w-1.5 lg:w-2 h-[18px] sm:h-[22px] lg:h-[26px] bg-[#00DC6C] rounded-full inline-block shrink-0" />
                    )}
                    <span className={`text-[15px] sm:text-[18px] lg:text-[24px] lg:leading-[32px] font-bold ${activeLayer === 0 ? "text-[#00DC6C]" : "text-white/30 hover:text-white/70"}`}>
                      {lang === "vi" ? "Tầng Nền tảng (Platform)" : "Platform layer"}
                    </span>
                  </button>

                  {/* Framework layer */}
                  <button
                    ref={tab1Ref}
                    onClick={() => scrollToLayer(1)}
                    className="flex items-center gap-2.5 sm:gap-3.5 transition-colors cursor-pointer bg-transparent border-0 outline-none p-0 shrink-0 text-left"
                  >
                    {activeLayer === 1 && (
                      <span className="w-1.5 lg:w-2 h-[18px] sm:h-[22px] lg:h-[26px] bg-[#00DC6C] rounded-full inline-block shrink-0" />
                    )}
                    <span className={`text-[15px] sm:text-[18px] lg:text-[24px] lg:leading-[32px] font-bold ${activeLayer === 1 ? "text-[#00DC6C]" : "text-white/30 hover:text-white/70"}`}>
                      {lang === "vi" ? "Tầng Khung (Framework)" : "Framework layer"}
                    </span>
                  </button>

                  {/* Instance layer */}
                  <button
                    ref={tab2Ref}
                    onClick={() => scrollToLayer(2)}
                    className="flex items-center gap-2.5 sm:gap-3.5 transition-colors cursor-pointer bg-transparent border-0 outline-none p-0 shrink-0 text-left"
                  >
                    {activeLayer === 2 && (
                      <span className="w-1.5 lg:w-2 h-[18px] sm:h-[22px] lg:h-[26px] bg-[#00DC6C] rounded-full inline-block shrink-0" />
                    )}
                    <span className={`text-[15px] sm:text-[18px] lg:text-[24px] lg:leading-[32px] font-bold ${activeLayer === 2 ? "text-[#00DC6C]" : "text-white/30 hover:text-white/70"}`}>
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
                        src="/images/Rogo_dashboard_thumb.png"
                        alt="Rogo IoT Platform v2"
                        fill
                        className="object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/10 transition-colors pointer-events-none" />
                    </Link>

                    {/* Right / Bottom Content Details */}
                    <div className="flex-1 space-y-2 sm:space-y-3 lg:space-y-4 pt-0 w-full">
                      <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          FEATURED
                        </span>
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          PAAS • B2B
                        </span>
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          WHITELABEL
                        </span>
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          DESKTOP
                        </span>
                      </div>

                      <Link href="/works/rogo-platform-v2" className="block group/title">
                        <h3 className="font-heading text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] lg:leading-[48px] font-bold text-white group-hover/title:text-[#00DC6C] transition-colors leading-tight">
                          <span>Rogo IoT Platform V2</span>
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
                            ? "Nền tảng quản trị IoT whitelabel đa tầng – kiểm soát toàn diện thiết bị và phân quyền đa tổ chức."
                            : "Enterprise whitelabel IoT platform core – unified device fleet management and multi-tenant control plane."}
                        </p>
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
                    <Link
                      href="/works/raio-smart"
                      className="w-full max-w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 bg-[#181818] relative shrink-0 block cursor-pointer group/thumb"
                    >
                      <Image
                        src="/images/RaIO_smart_thumb.png"
                        alt="RaIO Smart whitelabel app"
                        fill
                        className="object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Right / Bottom Content Details */}
                    <div className="flex-1 space-y-2 sm:space-y-3 lg:space-y-4 pt-0 w-full">
                      <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          FEATURED
                        </span>
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          WHITELABEL
                        </span>
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          MOBILE
                        </span>
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          IOT
                        </span>
                      </div>

                      <Link href="/works/raio-smart" className="group/title block">
                        <h3 className="font-heading text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] lg:leading-[48px] font-bold text-white group-hover/title:text-[#00DC6C] transition-colors leading-tight">
                          RaIO Smart whitelabel app
                        </h3>
                      </Link>

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
                            ? "Framework ứng dụng di động IoT đa thương hiệu tùy biến giao diện linh hoạt và luồng kết nối chuyên sâu."
                            : "Multi-brand IoT mobile app framework enabling rapid UI customization and complex onboarding workflows."}
                        </p>
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
                    <Link
                      href="/works/austfly"
                      className="w-full max-w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] rounded-[12px] overflow-hidden shadow-2xl border border-white/10 bg-[#181818] relative shrink-0 block group/thumb cursor-pointer"
                    >
                      <Image
                        src="/images/austfly.png"
                        alt="Austfly & Kangaroo Instances"
                        fill
                        className="object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/10 transition-colors pointer-events-none" />
                    </Link>

                    {/* Right / Bottom Content Details */}
                    <div className="flex-1 space-y-2 sm:space-y-3 lg:space-y-4 pt-0 w-full">
                      <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          FEATURED
                        </span>
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          INSTANCE
                        </span>
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          MOBILE
                        </span>
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          IOT
                        </span>
                        <span className="text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                          WHITELABEL
                        </span>
                      </div>

                      <Link href="/works/austfly" className="block group/title">
                        <h3 className="font-heading text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] lg:leading-[48px] font-bold text-white group-hover/title:text-[#00DC6C] transition-colors leading-tight flex items-center gap-2">
                          <span>Austfly</span>
                          <span className="text-b2 opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all text-[#00DC6C]">↗</span>
                        </h3>
                      </Link>

                      <div className="space-y-1.5 sm:space-y-2">
                        <div className="text-[11px] sm:text-b3 font-mono text-white/40 uppercase tracking-wider">
                          {lang === "vi" ? "Khách hàng" : "Clients"}
                        </div>
                        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                          <div className="relative w-[70px] sm:w-[85px] h-[20px] sm:h-[26px] group cursor-pointer">
                            <Image
                              src="/images/Rogo_color.svg"
                              alt="ROGO Solutions"
                              fill
                              className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                            />
                          </div>
                          <div className="relative w-[95px] sm:w-[115px] h-[20px] sm:h-[26px] group cursor-pointer">
                            <Image
                              src="/images/Austdoor.svg"
                              alt="Austdoor"
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
                        <p className="font-mono text-[12px] sm:text-[13px] lg:text-[14px] text-white/70 leading-relaxed">
                          {lang === "vi"
                            ? "Ứng dụng điều khiển cửa cuốn thông minh Austfly — instance tùy biến hoàn chỉnh trên nền tảng RaIO Smart."
                            : "Smart roller shutter & IoT control app Austfly — a customized instance powered by RaIO Smart framework."}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                </div>

              </motion.div>

            </div>

          </div>
        </section>

        {/* SECTION 2: IOT TOOLS (Synchronized Intro + Thing Partner + [hidden] Thing Flow scroll transitions) */}
        <section
          ref={section2Ref}
          className={`relative w-full ${SHOW_THING_FLOW ? "h-[300vh]" : "h-[200vh]"} bg-[#121212] border-b border-white/5 snap-start`}
        >
          {/* CSS Scroll Snap Step Anchors: (Intro, Thing Partner, [optional] Thing Flow) */}
          <div className="absolute inset-0 w-full h-full flex flex-col justify-between pointer-events-none z-0">
            <div className="h-screen w-full snap-start snap-always" />
            <div className="h-screen w-full snap-start snap-always" />
            {SHOW_THING_FLOW && <div className="h-screen w-full snap-start snap-always" />}
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
                        y: section2Step === 1 ? "0%" : SHOW_THING_FLOW && section2Step > 1 ? "-80%" : "100%",
                        x: "0%",
                      }
                    : {
                        opacity: section2Step === 1 ? 1 : 0,
                        x: section2Step === 1 ? "0%" : SHOW_THING_FLOW && section2Step > 1 ? "-100%" : "100%",
                        y: "0%",
                      }
                }
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 items-start ${
                  section2Step !== 1 ? "pointer-events-none absolute inset-0 z-0" : "relative z-10"
                }`}
              >
                {/* Left Thumbnail Mockup Card: 4:3 & rounded-[8px] lg:rounded-[12px] */}
                <Link
                  href="/pending"
                  className="w-full max-w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] rounded-[8px] lg:rounded-[12px] overflow-hidden shadow-2xl border border-white/10 bg-[#181818] relative shrink-0 block group/thumb cursor-pointer"
                >
                  <Image
                    src="/images/Thing Partner.png"
                    alt="Thing Partner"
                    fill
                    className="object-cover object-left group-hover/thumb:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/10 transition-colors pointer-events-none" />
                </Link>

                {/* Right Project Details (Align top, no inner scrollbar) */}
                <div className="flex-1 space-y-2 sm:space-y-3 lg:space-y-4 pt-0 w-full">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                      PAAS • B2B
                    </span>
                  </div>

                  <Link href="/pending" className="block group/title">
                    <h3 className="font-heading text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] lg:leading-[48px] font-bold text-white group-hover/title:text-[#00DC6C] transition-colors leading-tight flex items-center gap-2">
                      <span>Thing Partner</span>
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
                        ? "Cổng thông tin quản lý vòng đời thiết bị IoT dành cho đội ngũ sản xuất từ firmware đến bảo hành."
                        : "Purpose-built portal for hardware manufacturers to manage end-to-end device lifecycles."}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* STAGE 3: Step 2 - Project View (Thing Flow - Temporarily hidden until design is available) */}
              {SHOW_THING_FLOW && (
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
                  className={`w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 items-start ${
                    section2Step !== 2 ? "pointer-events-none absolute inset-0 z-0" : "relative z-10"
                  }`}
                >
                  {/* Left Thumbnail Mockup Card: 4:3 & rounded-[8px] lg:rounded-[12px] */}
                  <Link
                    href="/pending"
                    className="w-full max-w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] rounded-[8px] lg:rounded-[12px] overflow-hidden shadow-2xl border border-white/10 bg-[#181818] relative shrink-0 block group/thumb cursor-pointer"
                  >
                    <Image
                      src="/images/rogo_project/Diagram 10.png"
                      alt="Thing Flow"
                      fill
                      className="object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/10 transition-colors pointer-events-none" />
                  </Link>

                  {/* Right Project Details (Align top, no inner scrollbar) */}
                  <div className="flex-1 space-y-1.5 sm:space-y-2.5 lg:space-y-4 pt-0 w-full">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase">
                        IOT AUTOMATION • B2B
                      </span>
                    </div>

                    <Link href="/pending" className="block group/title">
                      <h3 className="font-heading text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] lg:leading-[48px] font-bold text-white group-hover/title:text-[#00DC6C] transition-colors leading-tight flex items-center gap-2">
                        <span>Thing Flow</span>
                        <span className="text-b2 opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all text-[#00DC6C]">↗</span>
                      </h3>
                    </Link>

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
                          ? "Nền tảng tự động hóa luồng điều khiển và kịch bản thông minh cho hệ sinh thái IoT đa thiết bị."
                          : "Visual automation and smart rule orchestration engine for complex IoT ecosystems."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

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

              {/* STAGE 2: Step 1 - Project View (Left Mockup + Right Details) with exact 1100px container width */}
              <motion.div
                animate={{
                  opacity: section3Step >= 1 ? 1 : 0,
                  y: section3Step >= 1 ? "0%" : "100%",
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 items-start h-full ${
                  section3Step < 1 ? "pointer-events-none absolute inset-0 z-0" : "relative z-10"
                }`}
              >
                {/* Left Mockup Card: 4:3 & rounded-[8px] lg:rounded-[12px] */}
                <Link
                  href="/works/thing-ai-vn"
                  className="w-full lg:w-[640px] lg:min-w-[640px] aspect-[4/3] rounded-[8px] lg:rounded-[12px] overflow-hidden shadow-2xl border border-white/10 relative shrink-0 block group cursor-pointer"
                >
                  <Image
                    src="/images/Thing_AI_VN.png"
                    alt="Thing AI VN"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                </Link>

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

                  <Link href="/works/thing-ai-vn" className="block group/title">
                    <h3 className="font-heading text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] lg:leading-[48px] font-bold text-white group-hover/title:text-[#00DC6C] transition-colors leading-tight flex items-center gap-2">
                      <span>Thing AI VN</span>
                      <span className="text-b2 opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all text-[#00DC6C]">↗</span>
                    </h3>
                  </Link>

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
                        ? "Nền tảng cộng đồng chia sẻ câu lệnh AI và tự động hóa quy trình cho chuyên gia công nghệ."
                        : "Open-source AI prompt sharing and workflow automation platform for tech makers."}
                    </p>
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
