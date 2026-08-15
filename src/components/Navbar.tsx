"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  lang: "vi" | "en";
  setLang: (lang: "vi" | "en") => void;
  onOpenContact: () => void;
}

export default function Navbar({ lang, setLang, onOpenContact }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Switch to sticky topbar after scrolling past hero (~400px)
      if (window.scrollY > 400) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Dynamic Navbar Container */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "w-full bg-[#121212]/60 backdrop-blur-md border-b border-white/10 py-4 px-6 md:px-12 lg:px-[80px] pointer-events-auto"
            : "pt-[80px] px-6 md:px-12 lg:px-[80px] pointer-events-none"
        }`}
      >
        <div className="max-w-[1440px] mx-auto w-full">
          <AnimatePresence mode="wait">
            {!isScrolled ? (
              /* State 1: Floating Centered Pill Topnav (Hero Section) */
              <motion.div
                key="hero-nav"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-between"
              >
                <div className="pointer-events-auto bg-[#242424]/90 backdrop-blur-md rounded-2xl px-5 py-3 shadow-2xl flex items-center justify-between gap-6 md:gap-10 border border-white/5">
                  <div className="flex items-center gap-6 md:gap-8 font-sans text-sm font-medium text-white/90">
                    <button
                      onClick={() => scrollToSection("why-me")}
                      className="hover:text-[#00DC6C] transition-colors cursor-pointer"
                    >
                      {lang === "vi" ? "Giới thiệu" : "About me"}
                    </button>
                    <button
                      onClick={() => scrollToSection("top-clients")}
                      className="hover:text-[#00DC6C] transition-colors cursor-pointer"
                    >
                      {lang === "vi" ? "Dự án" : "My Work"}
                    </button>
                    <button
                      onClick={onOpenContact}
                      className="hover:text-[#00DC6C] transition-colors cursor-pointer"
                    >
                      {lang === "vi" ? "Liên hệ" : "Contact"}
                    </button>
                  </div>

                  {/* Language Switcher Pill */}
                  <div className="bg-black/60 border border-white/10 rounded-full p-1 flex items-center gap-1">
                    <button
                      onClick={() => setLang("vi")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        lang === "vi"
                          ? "bg-[#2A2A2A] text-white shadow-inner"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full overflow-hidden inline-flex items-center justify-center bg-red-600 text-[10px] leading-none text-yellow-300 font-bold border border-white/20">
                        ★
                      </span>
                      <span>VIE</span>
                    </button>
                    <button
                      onClick={() => setLang("en")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        lang === "en"
                          ? "bg-[#383838] text-white shadow-inner"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full overflow-hidden inline-flex items-center justify-center text-[10px] leading-none bg-blue-900 text-white font-bold border border-white/20">
                        🇬🇧
                      </span>
                      <span>ENG</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* State 2: Full-Width Topbar with 60% Opacity Overlay Layer (Scrolled Past Hero - Screenshots 2 & 3) */
              <motion.div
                key="minimal-nav"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="w-full flex items-center justify-between"
              >
                {/* Brand text left (Screenshot 2 & 3) */}
                <div
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="cursor-pointer flex items-center gap-2 select-none group"
                >
                  <span className="font-sans font-bold text-white text-lg md:text-xl group-hover:text-white/90 transition-colors">
                    Khanhtruong Nguyen
                  </span>
                  <span className="font-mono text-[#C6A85B] text-lg md:text-xl font-semibold">
                    Portfolio
                  </span>
                </div>

                {/* Right side compact pill: Contact + Hamburger Menu (Screenshot 2 & 3) */}
                <div className="bg-[#242424]/90 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-3 shadow-xl">
                  <button
                    onClick={onOpenContact}
                    className="px-2 py-1 text-sm font-sans font-medium text-white hover:text-[#00DC6C] transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                  <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="p-2 bg-[#1A1A1A] hover:bg-[#333] rounded-xl text-white transition-colors cursor-pointer flex items-center justify-center border border-white/5 active:scale-95"
                    aria-label="Toggle menu"
                  >
                    <Menu className="w-5 h-5 text-white" />
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
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-between p-8"
          >
            <div className="flex justify-between items-center max-w-[1440px] mx-auto w-full">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xl">Khanhtruong Nguyen</span>
                <span className="font-mono text-[#C6A85B] text-xl font-semibold">Portfolio</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-6 my-auto max-w-[1440px] mx-auto w-full font-mono text-3xl md:text-5xl font-bold">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-left text-white/70 hover:text-[#00DC6C] transition-colors"
              >
                01. HERO
              </button>
              <button
                onClick={() => scrollToSection("top-clients")}
                className="text-left text-white/70 hover:text-[#00DC6C] transition-colors"
              >
                02. FEATURED WORKS
              </button>
              <button
                onClick={() => scrollToSection("process-section")}
                className="text-left text-white/70 hover:text-[#00DC6C] transition-colors"
              >
                03. MY PROCESS
              </button>
              <button
                onClick={() => scrollToSection("why-me")}
                className="text-left text-white/70 hover:text-[#00DC6C] transition-colors"
              >
                04. WHY ME
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="text-left text-[#00DC6C] hover:underline"
              >
                05. CONTACT ME →
              </button>
            </div>

            <div className="flex justify-between items-center max-w-[1440px] mx-auto w-full text-sm font-mono text-white/50 border-t border-white/10 pt-6">
              <div>Language: {lang.toUpperCase()}</div>
              <div>Vietnam 2026</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
