"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const translations = {
  vi: {
    title: "Liên hệ",
    subtitle: "Thông tin đang được cập nhật",
    desc: "Bạn có nhu cầu hợp tác thiết kế sản phẩm hoặc tuyển dụng từ xa? Vui lòng liên hệ trực tiếp qua email ktruong2k1@gmail.com. Cổng liên hệ trực tuyến đang được xây dựng.",
    backHome: "Quay lại Trang chủ",
    navWork: "Dự án",
    navAbout: "About me",
    navContact: "Liên hệ",
    availableRemote: "Làm việc từ xa",
  },
  en: {
    title: "Contact",
    subtitle: "Content is being updated",
    desc: "Looking to collaborate on product design or remote hiring? Please reach out directly to ktruong2k1@gmail.com. The online inquiry system is currently under construction.",
    backHome: "Back to Home",
    navWork: "Work",
    navAbout: "About me",
    navContact: "Contact",
    availableRemote: "Available for Remote",
  }
};

export default function ContactPage() {
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const isInitialMount = useRef(true);
  const [pendingLang, setPendingLang] = useState<"vi" | "en" | null>(null);
  const [transitionStage, setTransitionStage] = useState<"idle" | "fading-in" | "fading-out">("idle");
  const [fadeOpacity, setFadeOpacity] = useState(0);

  const handleLangChange = (newLang: "vi" | "en") => {
    if (newLang === lang || transitionStage !== "idle") return;
    setPendingLang(newLang);
    setTransitionStage("fading-in");
    
    setTimeout(() => {
      setLang(newLang);
    }, 150);

    setTimeout(() => {
      setTransitionStage("fading-out");
    }, 600);

    setTimeout(() => {
      setTransitionStage("idle");
      setPendingLang(null);
    }, 750);
  };

  useEffect(() => {
    const savedLang = typeof window !== 'undefined' ? localStorage.getItem("portfolio_lang") as "vi" | "en" : null;
    if (savedLang && (savedLang === "vi" || savedLang === "en")) {
      setLang(savedLang);
    }
    setFadeOpacity(1);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem("portfolio_lang", lang);
    }
  }, [lang]);

  const t = translations[lang];

  return (
    <div 
      className="page-wrapper min-h-screen bg-[#0B0B0C] text-neutral-300 flex flex-col font-sans"
      style={{
        opacity: fadeOpacity,
        transform: `translateY(${(1 - fadeOpacity) * 12}px)`,
        transition: 'opacity 450ms cubic-bezier(0.215, 0.61, 0.355, 1), transform 450ms cubic-bezier(0.215, 0.61, 0.355, 1)'
      }}
    >
      
      {/* HEADER */}
      <header 
        style={{
          display: 'flex',
          height: '76px',
          padding: '16px 100px',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'stretch',
          borderBottom: '1px solid var(--Colors-Neutral-800, #4B4B4B)',
          background: 'var(--Colors-Neutral-1000, #181818)',
          width: '100%',
          position: 'relative'
        }}
        className="w-full sticky top-0 z-40"
      >
        <Link href="/" className="flex items-center gap-2 text-white font-serif font-bold text-[20px] tracking-tight">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="header-logo-mask-contact">
              <rect width="28" height="28" fill="white" />
              <path d="M12 0C6 8 6 20 12 28" stroke="black" strokeWidth="2.5" fill="none" />
              <path d="M20 0C14 8 14 20 20 28" stroke="black" strokeWidth="2.5" fill="none" />
            </mask>
            <circle cx="14" cy="14" r="14" fill="#22C55E" mask="url(#header-logo-mask-contact)" />
          </svg>
          khanhtruong_nguyen
        </Link>

        <nav 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            height: '100%',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          className="hidden md:flex text-sm font-semibold"
        >
          <Link href="/works" className="text-neutral-400 hover:text-white transition-colors">{t.navWork}</Link>
          <Link href="/about" className="text-neutral-400 hover:text-white transition-colors">{t.navAbout}</Link>
          <Link 
            href="/contact" 
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              color: '#22C55E'
            }}
            className="font-bold transition-colors"
          >
            {t.navContact}
            <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: '#22C55E' }}></span>
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div 
            style={{ height: '32px' }}
            className="flex items-center rounded-full p-0.5 bg-neutral-950/80 select-none"
          >
            <button 
              onClick={() => handleLangChange("vi")} 
              className={`px-2.5 h-full rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${lang === "vi" ? "bg-neutral-800 text-white font-semibold" : "text-neutral-500 hover:text-neutral-300"}`}
              style={{
                fontFamily: '"Be Vietnam Pro", sans-serif',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '15px',
                color: lang === "vi" ? 'var(--Colors-Neutral-100, #FFF)' : undefined
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <circle cx="10" cy="10" r="10" fill="#DA251D"/>
                <path d="M10 6.5L11.1 9.8H14.5L11.7 11.8L12.8 15.1L10 13.1L7.2 15.1L8.3 11.8L5.5 9.8H8.9L10 6.5Z" fill="#FFFF00"/>
              </svg>
              <span>Vie</span>
            </button>
            <button 
              onClick={() => handleLangChange("en")} 
              className={`px-2.5 h-full rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${lang === "en" ? "bg-neutral-800 text-white font-semibold" : "text-neutral-500 hover:text-neutral-300"}`}
              style={{
                fontFamily: '"Be Vietnam Pro", sans-serif',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '15px',
                color: lang === "en" ? 'var(--Colors-Neutral-100, #FFF)' : undefined
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <clipPath id="uk-clip-contact">
                  <circle cx="10" cy="10" r="10" />
                </clipPath>
                <g clipPath="url(#uk-clip-contact)">
                  <circle cx="10" cy="10" r="10" fill="#012169" />
                  <path d="M0 0 L20 20 M20 0 L0 20" stroke="#FFFFFF" strokeWidth="2.5" />
                  <path d="M0 0 L20 20 M20 0 L0 20" stroke="#C8102E" strokeWidth="1.2" />
                  <path d="M10 0 V20 M0 10 H20" stroke="#FFFFFF" strokeWidth="4.5" />
                  <path d="M10 0 V20 M0 10 H20" stroke="#C8102E" strokeWidth="2.5" />
                </g>
              </svg>
              <span>Eng</span>
            </button>
          </div>

          <Link href="/contact" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-status-200/50 hover:bg-status-200/10 text-xs text-[#E5E5E5] font-semibold transition-colors duration-150">
            <span className="w-2 h-2 bg-status-200 rounded-full animate-pulse"></span>
            {t.availableRemote}
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '672px',
          margin: '0 auto',
          padding: '80px 24px',
          textAlign: 'center',
          flex: '1 1 0%'
        }}
      >
        <div className="w-16 h-16 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-6 animate-pulse">
          <Mail size={26} />
        </div>
        <h1 className="text-4xl font-extrabold font-serif text-white tracking-tight mb-3">
          {t.title}
        </h1>
        <span className="text-xs font-mono uppercase tracking-widest text-[#E8C468] font-bold mb-6 block">
          {t.subtitle}
        </span>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-10">
          {t.desc}
        </p>
        <div style={{ maxWidth: '388px', width: '100%' }} className="flex justify-center mx-auto">
          <Link 
            href="/"
            className="bg-[#22C55E] hover:bg-[#1f9e4e] text-[#17211B] font-bold rounded-full shadow-lg transition-all duration-150 active:scale-95 text-sm cursor-pointer cta-btn w-full"
          >
            <ArrowLeft size={16} />
            {t.backHome}
          </Link>
        </div>
      </main>
      {/* Language Transition Overlay */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0C]/70 transition-all duration-150 ease-out"
        style={{
          opacity: transitionStage === "fading-in" ? 1 : 0,
          backdropFilter: transitionStage === "fading-in" ? "blur(12px)" : "blur(0px)",
          WebkitBackdropFilter: transitionStage === "fading-in" ? "blur(12px)" : "blur(0px)",
          pointerEvents: transitionStage === "fading-in" ? "all" : "none",
        }}
      >
        <div className="text-center max-w-md px-6">
          <p 
            style={{
              color: 'var(--Colors-Secondary-300, #E8C468)',
              fontFamily: 'Fraunces, serif',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '36px',
              textAlign: 'center'
            }}
          >
            {pendingLang === "vi" 
              ? "Đang chuyển sang Tiếng Việt, vui lòng đợi" 
              : "Changing to English, please wait"}
          </p>
        </div>
      </div>

    </div>
  );
}
