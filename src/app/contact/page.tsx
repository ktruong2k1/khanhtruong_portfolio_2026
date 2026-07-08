"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

const translations = {
  vi: {
    title: "Liên hệ",
    subtitle: "Thông tin đang được cập nhật",
    desc: "Bạn có nhu cầu hợp tác thiết kế sản phẩm hoặc tuyển dụng từ xa? Vui lòng liên hệ trực tiếp qua email ktruong2k1@gmail.com. Cổng liên hệ trực tuyến đang được xây dựng.",
    backHome: "Quay lại Trang chủ",
    navWork: "Dự án",
    navAbout: "Giới thiệu",
    navContact: "Liên hệ",
    availableRemote: "Làm việc từ xa",
  },
  en: {
    title: "Contact",
    subtitle: "Content is being updated",
    desc: "Looking to collaborate on product design or remote hiring? Please reach out directly to ktruong2k1@gmail.com. The online inquiry system is currently under construction.",
    backHome: "Back to Home",
    navWork: "Work",
    navAbout: "About",
    navContact: "Contact",
    availableRemote: "Available for Remote",
  }
};

export default function ContactPage() {
  const [lang, setLang] = useState<"vi" | "en">("vi");

  useEffect(() => {
    const savedLang = typeof window !== 'undefined' ? localStorage.getItem("portfolio_lang") as "vi" | "en" : null;
    if (savedLang && (savedLang === "vi" || savedLang === "en")) {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("portfolio_lang", lang);
    }
  }, [lang]);

  const t = translations[lang];

  return (
    <div className="page-wrapper min-h-screen bg-[#0B0B0C] text-neutral-300 flex flex-col font-sans">
      
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
            style={{ height: '30px' }}
            className="flex items-center rounded-full p-0.5 bg-neutral-950/80 text-[10px] font-medium select-none"
          >
            <button 
              onClick={() => setLang("vi")} 
              className={`px-3.5 h-full rounded-full transition-all cursor-pointer flex items-center justify-center ${lang === "vi" ? "bg-neutral-800 text-white font-semibold" : "text-neutral-500 hover:text-neutral-300"}`}
            >
              Vie
            </button>
            <button 
              onClick={() => setLang("en")} 
              className={`px-3.5 h-full rounded-full transition-all cursor-pointer flex items-center justify-center ${lang === "en" ? "bg-neutral-800 text-white font-semibold" : "text-neutral-500 hover:text-neutral-300"}`}
            >
              Eng
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
    </div>
  );
}
