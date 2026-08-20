"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

interface NavbarProps {
  lang?: "vi" | "en";
  setLang?: (lang: "vi" | "en") => void;
  onOpenContact?: () => void;
}

// Clean SVG for Vietnam Flag
function VietnamFlagIcon() {
  return (
    <svg viewBox="0 0 512 512" className="w-4 h-4 rounded-full overflow-hidden shrink-0 block">
      <rect width="512" height="512" fill="#DA251D" />
      <polygon
        points="256,80 305,215 448,215 332,298 376,432 256,348 136,432 180,298 64,215 207,215"
        fill="#FFFF00"
      />
    </svg>
  );
}

// Clean SVG for UK Flag (Union Jack expanding 100% inside circle)
function UKFlagIcon() {
  return (
    <svg viewBox="0 0 60 60" className="w-4 h-4 rounded-full overflow-hidden shrink-0 block">
      <clipPath id="uk-flag-clip">
        <circle cx="30" cy="30" r="30" />
      </clipPath>
      <g clipPath="url(#uk-flag-clip)">
        <rect width="60" height="60" fill="#012169" />
        <path d="M0,0 L60,60 M60,0 L0,60" stroke="#FFFFFF" strokeWidth="12" />
        <path d="M0,0 L30,30 M60,0 L30,30 M60,60 L30,30 M0,60 L30,30" stroke="#C8102E" strokeWidth="6" />
        <path d="M30,0 v60 M0,30 h60" stroke="#FFFFFF" strokeWidth="20" />
        <path d="M30,0 v60 M0,30 h60" stroke="#C8102E" strokeWidth="12" />
      </g>
    </svg>
  );
}

// Simultaneous Typing Menu Tab Component
function TypingMenuItem({
  fullText,
  onClick,
  isActive = false,
}: {
  fullText: string;
  onClick: () => void;
  isActive?: boolean;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 45); // 45ms simultaneous typing speed

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <button
      onClick={onClick}
      className={`text-left font-heading text-h1 text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] leading-[40px] sm:leading-[52px] md:leading-[64px] lg:leading-[72px] font-bold uppercase tracking-wider transition-colors cursor-pointer w-fit flex items-center group outline-none ${
        isActive ? "text-[#00DC6C]" : "text-white/75 hover:text-white"
      }`}
    >
      <span className={isActive ? "text-[#00DC6C]" : "group-hover:text-[#00DC6C] transition-colors"}>
        {displayedText}
      </span>
      {isTyping && (
        <span className="inline-block w-[8px] md:w-[12px] h-[28px] sm:h-[40px] md:h-[56px] bg-[#00DC6C] ml-2 md:ml-3 animate-pulse align-middle" />
      )}
    </button>
  );
}

export default function Navbar({ lang, setLang, onOpenContact }: NavbarProps) {
  const { lang: globalLang, setLang: globalSetLang } = useLanguage();
  const currentLang = lang || globalLang;
  const handleSetLang = (newLang: "vi" | "en") => {
    globalSetLang(newLang);
    if (setLang) setLang(newLang);
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isWorks = pathname.startsWith("/works");
  const isContact = pathname === "/contact";

  useEffect(() => {
    const handleScroll = (e?: Event) => {
      let scrollPos = window.scrollY;
      if (e && e.target && (e.target as HTMLElement).scrollTop !== undefined) {
        const targetScrollTop = (e.target as HTMLElement).scrollTop;
        if (targetScrollTop > 0) {
          scrollPos = targetScrollTop;
        }
      }
      if (scrollPos > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Capture scroll events globally on both window and scrollable container elements
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  const navigateOrScrollTop = (targetPath: string) => {
    setMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      const isCurrentPage =
        targetPath === "/"
          ? pathname === "/"
          : pathname === targetPath || pathname.startsWith(targetPath + "/");

      if (isCurrentPage) {
        const scrollContainers = document.querySelectorAll(".overflow-y-scroll, main, body, html");
        scrollContainers.forEach((el) => {
          el.scrollTo({ top: 0, behavior: "smooth" });
        });
        const firstSection = document.querySelector("section") || document.getElementById("hero");
        if (firstSection) {
          firstSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push(targetPath);
      }
    }
  };

  const scrollToHero = () => navigateOrScrollTop("/");
  const goToAbout = () => navigateOrScrollTop("/about");
  const goToWorks = () => navigateOrScrollTop("/works");
  const goToContact = () => navigateOrScrollTop("/contact");

  return (
    <>
      {/* Dynamic Navbar Container */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "w-full bg-[#121212]/80 backdrop-blur-xl border-b border-white/10 py-3 px-5 sm:px-6 md:px-12 lg:px-[10vh] pointer-events-auto shadow-2xl"
            : "py-3 md:py-0 md:pt-[40px] lg:pt-[60px] px-5 sm:px-6 md:px-12 lg:px-[10vh] pointer-events-auto md:pointer-events-none"
        }`}
      >
        <div className="max-w-[1440px] mx-auto w-full">
          {/* MOBILE TOPNAV (< 768px): Always compact horizontal flex row with 24px height logo on left and hamburger button on right */}
          <div className="mobile-only-header pointer-events-auto py-1">
            {/* Mobile Header Logo (Left) */}
            <div
              onClick={scrollToHero}
              className="cursor-pointer flex items-center select-none group shrink-0"
            >
              <Image
                src="/images/Website_logo.svg"
                alt="Khanhtruong Nguyen Portfolio"
                width={110}
                height={28}
                className="h-[26px] w-auto object-contain"
                priority
              />
            </div>

            {/* Hamburger Button Only (Right) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-8 h-8 bg-transparent text-white hover:text-[#00DC6C] flex items-center justify-center transition-colors cursor-pointer active:scale-95 border-0 outline-none p-0 shrink-0"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* DESKTOP & TABLET TOPNAV (>= 768px) */}
          <div className="desktop-only-header">
            <AnimatePresence mode="wait">
              {!isScrolled ? (
                /* State 1: Floating Centered Pill Topnav (Hero Section) */
                <motion.div
                  key="hero-nav"
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between"
                >
                  <div className="pointer-events-auto bg-[#242424]/90 backdrop-blur-md rounded-[12px] px-5 py-3 shadow-2xl flex items-center justify-between gap-6 md:gap-10 border-0 outline-none">
                    {/* Nav Links with Primary Green (#00DC6C) Selected State */}
                    <div className="flex items-center gap-6 md:gap-8 text-[16px] font-sans font-medium">
                      <button
                        onClick={scrollToHero}
                        className={`transition-colors cursor-pointer outline-none ${
                          isHome ? "text-[#00DC6C] font-semibold" : "text-white/80 hover:text-white"
                        }`}
                      >
                        {currentLang === "vi" ? "Trang chủ" : "Home"}
                      </button>
                      <button
                        onClick={goToAbout}
                        className={`transition-colors cursor-pointer outline-none ${
                          isAbout ? "text-[#00DC6C] font-semibold" : "text-white/80 hover:text-white"
                        }`}
                      >
                        {currentLang === "vi" ? "Giới thiệu" : "About me"}
                      </button>
                      <button
                        onClick={goToWorks}
                        className={`transition-colors cursor-pointer outline-none ${
                          isWorks ? "text-[#00DC6C] font-semibold" : "text-white/80 hover:text-white"
                        }`}
                      >
                        {currentLang === "vi" ? "Dự án" : "My Work"}
                      </button>
                      <button
                        onClick={goToContact}
                        className={`transition-colors cursor-pointer outline-none ${
                          isContact ? "text-[#00DC6C] font-semibold" : "text-white/80 hover:text-white"
                        }`}
                      >
                        {currentLang === "vi" ? "Liên hệ" : "Contact"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* State 2: Full-Width Topbar with Brand Logo, Let's chat & Transparent Hamburger Menu */
                <motion.div
                  key="minimal-nav"
                  initial={{ opacity: 0, y: -20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex items-center justify-between"
                >
                  {/* Portfolio Brand Logo */}
                  <div
                    onClick={scrollToHero}
                    className="cursor-pointer flex items-center select-none group h-[40px]"
                  >
                    <Image
                      src="/images/Website_logo.svg"
                      alt="Khanhtruong Nguyen Portfolio"
                      width={158}
                      height={40}
                      className="h-[36px] sm:h-[40px] w-auto object-contain hover:opacity-90 transition-opacity"
                      priority
                    />
                  </div>

                  {/* Right Header Controls: "Let's chat" Button + Transparent Hamburger Menu */}
                  <div className="flex items-center gap-4 md:gap-6">
                    <button
                      onClick={goToContact}
                      className="h-10 px-5 bg-transparent border border-white/20 hover:border-[#00DC6C] text-white hover:text-[#00DC6C] rounded-full flex items-center justify-center text-[16px] font-sans font-semibold transition-all cursor-pointer shadow-sm active:scale-95 outline-none"
                    >
                      {currentLang === "vi" ? "Liên hệ ngay" : "Let's chat"}
                    </button>

                    <button
                      onClick={() => setMobileMenuOpen(true)}
                      className="w-10 h-10 bg-transparent text-white hover:text-[#00DC6C] flex items-center justify-center transition-colors cursor-pointer active:scale-95 border-0 outline-none p-0"
                      aria-label="Open Navigation Menu"
                    >
                      <Menu className="w-6 h-6" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Fullscreen Navigation Drawer Modal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#121212]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:px-[10vh] lg:py-[40px]"
          >
            {/* Top Modal Header */}
            <div className="flex justify-between items-center max-w-[1440px] mx-auto w-full">
              {/* Logo */}
              <div
                onClick={scrollToHero}
                className="cursor-pointer flex items-center select-none group shrink-0"
              >
                <Image
                  src="/images/Website_logo.svg"
                  alt="Khanhtruong Nguyen Portfolio"
                  width={158}
                  height={40}
                  className="h-[26px] md:h-[36px] w-auto object-contain"
                  priority
                />
              </div>

              {/* Close Button Top Right */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 md:w-12 md:h-12 bg-transparent hover:bg-white/10 rounded-full text-white transition-colors cursor-pointer flex items-center justify-center border-0 outline-none active:scale-95"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Main Menu Items Container: Language Switcher on top, then HOME, MY WORKS, ABOUT ME, CONTACT */}
            <div className="max-w-[1440px] mx-auto w-full my-auto py-6 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8">
              {/* Language Switcher */}
              <div className="flex items-center gap-1.5 mb-2">
                <button
                  onClick={() => handleSetLang("vi")}
                  className={`flex items-center gap-2 px-3.5 py-1.5 md:px-4 md:py-2 rounded-full text-[14px] md:text-[16px] font-sans font-semibold transition-all cursor-pointer outline-none border-0 ${
                    currentLang === "vi"
                      ? "bg-[#383838] text-white shadow-inner"
                      : "text-white/60 hover:text-white bg-transparent"
                  }`}
                >
                  <VietnamFlagIcon />
                  <span>VIE</span>
                </button>
                <button
                  onClick={() => handleSetLang("en")}
                  className={`flex items-center gap-2 px-3.5 py-1.5 md:px-4 md:py-2 rounded-full text-[14px] md:text-[16px] font-sans font-semibold transition-all cursor-pointer outline-none border-0 ${
                    currentLang === "en"
                      ? "bg-[#383838] text-white shadow-inner"
                      : "text-white/60 hover:text-white bg-transparent"
                  }`}
                >
                  <UKFlagIcon />
                  <span>ENG</span>
                </button>
              </div>

              <TypingMenuItem
                fullText={currentLang === "vi" ? "TRANG CHỦ" : "HOME"}
                onClick={scrollToHero}
                isActive={isHome}
              />
              <TypingMenuItem
                fullText={currentLang === "vi" ? "GIỚI THIỆU" : "ABOUT ME"}
                onClick={goToAbout}
                isActive={isAbout}
              />
              <TypingMenuItem
                fullText={currentLang === "vi" ? "DỰ ÁN" : "MY WORKS"}
                onClick={goToWorks}
                isActive={isWorks}
              />
              <TypingMenuItem
                fullText={currentLang === "vi" ? "LIÊN HỆ" : "CONTACT"}
                onClick={goToContact}
                isActive={isContact}
              />
            </div>

            {/* Modal Bottom Footer */}
            <div className="flex justify-between items-center max-w-[1440px] mx-auto w-full text-b1 md:text-h5 font-bold font-heading text-white/70 border-t-2 border-white/10 pt-4 md:pt-6 flex-wrap gap-4">
              <div className="flex items-center gap-5 sm:gap-8 text-sm md:text-base">
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00DC6C] transition-colors"
                >
                  Tiktok
                </a>
                <a
                  href="https://www.behance.net/nguyenkhanhtr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00DC6C] transition-colors"
                >
                  Behance
                </a>
                <a
                  href="https://www.linkedin.com/in/nguyen-khanh-truong-designer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00DC6C] transition-colors"
                >
                  Linkedin
                </a>
              </div>
              <div className="text-b2 md:text-h6 font-bold text-white/50">Vietnam 2026</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
