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
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-accent">
            <path d="M8 6C6.5 8.5 6 11.5 6 14 C 6 16.5, 6.5 19.5, 8 22" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M12 9.5C11 11 10.5 12.5 10.5 14 C 10.5 15.5, 11 17, 12 18.5" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M16 13C15.8 13.5 15.7 13.8 15.7 14 C 15.7 14.2, 15.8 14.5, 16 15" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" />
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
              VIE
            </button>
            <span className="text-neutral-800 px-0.5">|</span>
            <button 
              onClick={() => setLang("en")} 
              className={`px-3.5 h-full rounded-full transition-all cursor-pointer flex items-center justify-center ${lang === "en" ? "bg-neutral-800 text-white font-semibold" : "text-neutral-500 hover:text-neutral-300"}`}
            >
              ENG
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
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-[#22C55E] hover:bg-[#1f9e4e] text-[#17211B] font-bold px-8 py-3.5 rounded-full shadow-lg transition-all duration-150 active:scale-95 text-sm cursor-pointer"
        >
          <ArrowLeft size={16} />
          {t.backHome}
        </Link>
      </main>
    </div>
  );
}
