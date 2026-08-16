"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  lang: "vi" | "en";
  setLang: (lang: "vi" | "en") => void;
  onOpenContact: () => void;
}

// Simultaneous Typing Menu Tab Component
function TypingMenuItem({
  fullText,
  onClick,
}: {
  fullText: string;
  onClick: () => void;
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
      className="text-left font-mono text-[36px] sm:text-[52px] md:text-[64px] font-bold uppercase tracking-wider text-white/75 hover:text-white transition-colors cursor-pointer w-fit flex items-center group outline-none"
    >
      <span className="group-hover:text-[#00DC6C] transition-colors">{displayedText}</span>
      {isTyping && (
        <span className="inline-block w-[8px] md:w-[12px] h-[36px] md:h-[56px] bg-[#00DC6C] ml-2 animate-pulse align-middle" />
      )}
    </button>
  );
}

export default function Navbar({ lang, setLang, onOpenContact }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

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

  const goToHome = () => {
    setMobileMenuOpen(false);
    router.push("/");
  };

  const goToAbout = () => {
    setMobileMenuOpen(false);
    router.push("/about");
  };

  const goToWorks = () => {
    setMobileMenuOpen(false);
    router.push("/works");
  };

  return (
    <>
      {/* Dynamic Navbar Container */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "w-full bg-[#121212]/80 backdrop-blur-xl border-b border-white/10 py-3 px-6 md:px-12 lg:px-[80px] pointer-events-auto shadow-2xl"
            : "pt-[40px] md:pt-[60px] px-6 md:px-12 lg:px-[80px] pointer-events-none"
        }`}
      >
        <div className="max-w-[1440px] mx-auto w-full">
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
                <div className="pointer-events-auto bg-[#242424]/90 backdrop-blur-md rounded-2xl px-5 py-3 shadow-2xl flex items-center justify-between gap-6 md:gap-10 border-0 outline-none">
                  <div className="flex items-center gap-6 md:gap-8 font-sans text-sm font-medium text-white/90">
                    <button
                      onClick={goToHome}
                      className="hover:text-[#00DC6C] transition-colors cursor-pointer outline-none"
                    >
                      {lang === "vi" ? "Trang chủ" : "Home"}
                    </button>
                    <button
                      onClick={goToAbout}
                      className="hover:text-[#00DC6C] transition-colors cursor-pointer outline-none"
                    >
                      {lang === "vi" ? "Giới thiệu" : "About me"}
                    </button>
                    <button
                      onClick={goToWorks}
                      className="hover:text-[#00DC6C] transition-colors cursor-pointer outline-none"
                    >
                      {lang === "vi" ? "Dự án" : "My Work"}
                    </button>
                    <button
                      onClick={onOpenContact}
                      className="hover:text-[#00DC6C] transition-colors cursor-pointer outline-none"
                    >
                      {lang === "vi" ? "Liên hệ" : "Contact"}
                    </button>
                  </div>

                  {/* Language Switcher Pill */}
                  <div className="bg-black/60 rounded-full p-1 flex items-center gap-1 border-0 outline-none">
                    <button
                      onClick={() => setLang("vi")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer outline-none ${
                        lang === "vi"
                          ? "bg-[#2A2A2A] text-white shadow-inner"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full overflow-hidden inline-flex items-center justify-center bg-red-600 text-[10px] leading-none text-yellow-300 font-bold border-0">
                        ★
                      </span>
                      <span>VIE</span>
                    </button>
                    <button
                      onClick={() => setLang("en")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer outline-none ${
                        lang === "en"
                          ? "bg-[#383838] text-white shadow-inner"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full overflow-hidden inline-flex items-center justify-center text-[10px] leading-none bg-blue-900 text-white font-bold border-0">
                        🇬🇧
                      </span>
                      <span>ENG</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* State 2: Full-Width Topbar with Brand Logo & Menu Pill (No Outlines) */
              <motion.div
                key="minimal-nav"
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex items-center justify-between"
              >
                {/* 40px Height Portfolio Brand Logo */}
                <div
                  onClick={() => router.push("/")}
                  className="cursor-pointer flex flex-col justify-center select-none group h-[40px]"
                >
                  <span className="font-sans font-bold text-white text-base md:text-lg leading-tight group-hover:text-white/90 transition-colors">
                    Khanhtruong
                  </span>
                  <span className="font-sans font-bold text-white text-base md:text-lg leading-tight group-hover:text-white/90 transition-colors">
                    Nguyen <span className="font-mono text-[#C6A85B]">Portfolio</span>
                  </span>
                </div>

                {/* Right Header Controls: Language Switcher Pill + Menu Button (No Outlines) */}
                <div className="flex items-center gap-3 md:gap-4">
                  {/* Language Switcher Pill (Border & Outline Removed) */}
                  <div className="bg-[#242424]/90 backdrop-blur-md rounded-full p-1 flex items-center gap-1 shadow-lg border-0 outline-none">
                    <button
                      onClick={() => setLang("vi")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer outline-none border-0 ${
                        lang === "vi"
                          ? "bg-[#383838] text-white shadow-inner"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full overflow-hidden inline-flex items-center justify-center bg-red-600 text-[10px] leading-none text-yellow-300 font-bold border-0">
                        ★
                      </span>
                      <span>VIE</span>
                    </button>
                    <button
                      onClick={() => setLang("en")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer outline-none border-0 ${
                        lang === "en"
                          ? "bg-[#383838] text-white shadow-inner"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full overflow-hidden inline-flex items-center justify-center text-[10px] leading-none bg-blue-900 text-white font-bold border-0">
                        🇬🇧
                      </span>
                      <span>ENG</span>
                    </button>
                  </div>

                  {/* Clean Menu Button Pill (Double Border & Outline Removed) */}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-3 bg-[#242424]/90 hover:bg-[#333] backdrop-blur-md rounded-2xl text-white transition-colors cursor-pointer flex items-center justify-center shadow-xl border-0 outline-none active:scale-95"
                    aria-label="Toggle menu"
                  >
                    {mobileMenuOpen ? (
                      <X className="w-5 h-5 text-white" />
                    ) : (
                      <Menu className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Fullscreen Navigation Drawer Modal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#121212]/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-12 lg:px-[80px] lg:py-[40px]"
          >
            {/* Top Modal Header */}
            <div className="flex justify-between items-center max-w-[1440px] mx-auto w-full">
              {/* 40px Height Logo */}
              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/");
                }}
                className="cursor-pointer flex flex-col justify-center select-none group h-[40px]"
              >
                <span className="font-sans font-bold text-white text-base md:text-lg leading-tight">
                  Khanhtruong
                </span>
                <span className="font-sans font-bold text-white text-base md:text-lg leading-tight">
                  Nguyen <span className="font-mono text-[#C6A85B]">Portfolio</span>
                </span>
              </div>

              {/* Close Button Top Right */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer flex items-center justify-center border-0 outline-none active:scale-95"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Menu Items Container: HOME, MY WORKS, ABOUT ME, CONTACT with Simultaneous Typing Effect */}
            <div className="max-w-[1440px] mx-auto w-full my-auto py-12 flex flex-col items-center justify-center gap-6 md:gap-10">
              <TypingMenuItem
                fullText="HOME"
                onClick={goToHome}
              />
              <TypingMenuItem
                fullText="MY WORKS"
                onClick={goToWorks}
              />
              <TypingMenuItem
                fullText="ABOUT ME"
                onClick={goToAbout}
              />
              <TypingMenuItem
                fullText="CONTACT"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
              />
            </div>

            {/* Modal Bottom Footer */}
            <div className="flex justify-between items-center max-w-[1440px] mx-auto w-full text-xs md:text-sm font-mono text-white/50 border-t border-white/10 pt-6">
              <div className="flex items-center gap-6">
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00DC6C] transition-colors"
                >
                  Tiktok
                </a>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00DC6C] transition-colors"
                >
                  Behance
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00DC6C] transition-colors"
                >
                  Linkedin
                </a>
              </div>
              <div>Vietnam 2026</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
