"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Mail, Check, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const translations = {
  vi: {
    title: "Giới thiệu",
    subtitle: "Thông tin đang được cập nhật",
    desc: "Nguyễn Khánh Trường — UX/UI Designer với 3.5 năm kinh nghiệm thiết kế các hệ thống phức tạp (IoT, SaaS whitelabel, dashboard vận hành). Nội dung chi tiết về kỹ năng và tiểu sử đang được biên soạn.",
    backHome: "Quay lại Trang chủ",
    navWork: "Dự án",
    navAbout: "Giới thiệu",
    navContact: "Liên hệ",
    availableRemote: "Làm việc từ xa",
  },
  en: {
    title: "About Me",
    subtitle: "Content is being updated",
    desc: "Nguyễn Khánh Trường — UX/UI Designer with 3.5 years of experience designing complex systems (IoT, whitelabel SaaS, operational dashboards). Detailed biography and skills are currently being compiled.",
    backHome: "Back to Home",
    navWork: "Work",
    navAbout: "About",
    navContact: "Contact",
    availableRemote: "Available for Remote",
  }
};

export default function AboutPage() {
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const [pendingLang, setPendingLang] = useState<"vi" | "en" | null>(null);
  const [transitionStage, setTransitionStage] = useState<"idle" | "fading-in" | "fading-out">("idle");

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
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ktruong2k1@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <mask id="header-logo-mask-about">
              <rect width="28" height="28" fill="white" />
              <path d="M12 0C6 8 6 20 12 28" stroke="black" strokeWidth="2.5" fill="none" />
              <path d="M20 0C14 8 14 20 20 28" stroke="black" strokeWidth="2.5" fill="none" />
            </mask>
            <circle cx="14" cy="14" r="14" fill="#22C55E" mask="url(#header-logo-mask-about)" />
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
          <Link 
            href="/about" 
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              color: '#22C55E'
            }}
            className="font-bold transition-colors"
          >
            {t.navAbout}
            <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: '#22C55E' }}></span>
          </Link>
          <button 
            onClick={() => setContactModalOpen(true)}
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              color: contactModalOpen ? '#22C55E' : '#989898',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
            className={`hover:text-white transition-colors font-sans ${contactModalOpen ? 'font-bold' : ''}`}
          >
            {t.navContact}
            {contactModalOpen && (
              <span 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: '#22C55E'
                }}
              />
            )}
          </button>
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
                <clipPath id="uk-clip-about">
                  <circle cx="10" cy="10" r="10" />
                </clipPath>
                <g clipPath="url(#uk-clip-about)">
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
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
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

      {/* CONTACT DIALOG */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          pointerEvents: contactModalOpen ? 'auto' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          transition: 'all 300ms ease-out'
        }}
      >
        {/* Backdrop overlay */}
        <div 
          onClick={() => setContactModalOpen(false)}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            opacity: contactModalOpen ? 1 : 0,
            transition: 'opacity 300ms ease-out'
          }}
        />

        {/* Dialog Panel */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            background: '#181818',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            transform: contactModalOpen ? 'scale(1)' : 'scale(0.95)',
            opacity: contactModalOpen ? 1 : 0,
            transition: 'transform 300ms cubic-bezier(0.25, 1, 0.5, 1), opacity 300ms ease-out',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '32px 24px 40px 24px',
            overflowY: 'auto'
          }}
        >
          {/* Close button */}
          <button 
            onClick={() => setContactModalOpen(false)}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer mb-6 p-1 rounded-lg hover:bg-neutral-800 self-start"
            style={{ background: 'none', border: 'none', marginLeft: '16px' }}
          >
            <X size={20} />
          </button>

          {/* Two-Column split layout */}
          <div className="flex flex-col md:flex-row w-full items-start gap-0">
            
            {/* Left Column: Profile Card */}
            <div 
              style={{
                display: 'flex',
                padding: '8px 24px',
                flexDirection: 'column',
                alignItems: 'flex-start',
                alignSelf: 'stretch'
              }}
              className="border-b md:border-b-0 md:border-r border-neutral-800 pb-8 md:pb-0"
            >
              {/* Profile Card contents (avatar left, name right) */}
              <div className="flex items-center gap-4">
                <div 
                  style={{
                    position: 'relative',
                    width: '64px',
                    height: '64px',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                    border: '1px solid #262626',
                    backgroundColor: '#171717',
                    flexShrink: 0
                  }}
                >
                  <Image 
                    src="/images/mini_avatar.png" 
                    alt="Nguyen Khanh Truong" 
                    fill 
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span 
                    style={{
                      color: 'var(--Colors-Neutral-100, #FFF)',
                      fontFamily: 'Fraunces, Georgia, serif',
                      fontSize: '20px',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      lineHeight: '30px'
                    }}
                  >
                    {lang === "vi" ? "Nguyễn Khánh Trường" : "Nguyen Khanh Truong"}
                  </span>
                  <span className="text-xs text-brand-accent font-medium mt-0.5">Product Designer</span>
                </div>
              </div>
            </div>

            {/* Right Column: Actions */}
            <div 
              style={{
                display: 'flex',
                padding: '8px 24px',
                flexDirection: 'column',
                alignItems: 'flex-start',
                flex: '1 0 0px'
              }}
              className="pt-8 md:pt-0"
            >
              {/* Title */}
              <h2 className="text-3xl font-serif font-extrabold text-white mb-6 leading-tight">
                {lang === "vi" ? "Hãy cùng làm việc." : "Let's work together."}
              </h2>

              {/* Copy Email CTA */}
              <div className="w-full flex flex-col gap-2 mb-6">
                <button
                  onClick={handleCopyEmail}
                  className="bg-[#22C55E] hover:bg-[#1f9e4e] text-[#17211B] font-bold rounded-full shadow-lg transition-all duration-150 active:scale-95 text-sm cursor-pointer cta-btn w-full p-3 flex items-center justify-center gap-2"
                >
                  <Mail size={16} />
                  ktruong2k1@gmail.com
                  {copied && <Check size={14} className="text-green-950 ml-1" />}
                </button>
                {copied && (
                  <span className="text-brand-accent text-center text-[10px] font-mono mt-1 w-full block">
                    {lang === "vi" ? "Đã sao chép email!" : "Email copied!"}
                  </span>
                )}
              </div>

              {/* Social Links (Row layout) */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/nguyen-khanh-truong-designer/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-between p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/40 hover:bg-neutral-900 hover:border-brand-accent/30 transition-all duration-150 group"
                >
                  <div className="flex items-center gap-3 text-neutral-300 group-hover:text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-400 group-hover:text-white">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="text-sm font-semibold">LinkedIn</span>
                  </div>
                  <ArrowUpRight size={16} className="text-brand-accent" />
                </a>

                {/* Behance */}
                <a 
                  href="https://www.behance.net/nguyenkhanhtr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-between p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/40 hover:bg-neutral-900 hover:border-brand-accent/30 transition-all duration-150 group"
                >
                  <div className="flex items-center gap-3 text-neutral-300 group-hover:text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-400 group-hover:text-white">
                      <path d="M22 2H2C0.9 2 0 2.9 0 4V20C0 21.1 0.9 22 2 22H22C23.1 22 24 21.1 24 20V4C24 2.9 23.1 2 22 2ZM10.95 12.35H5.82V14.82H10.95V12.35ZM10.95 8.18H5.82V10.65H10.95V8.18ZM17.65 14.82C15.42 14.82 13.9 13.3 13.9 11.08C13.9 8.85 15.42 7.33 17.65 7.33C19.88 7.33 21.4 8.85 21.4 11.08C21.4 11.3 21.38 11.53 21.34 11.75H16.02C16.15 13.12 16.8 13.88 17.78 13.88C18.4 13.88 18.86 13.56 19.12 12.95H20.68C20.22 14.28 19.16 14.82 17.65 14.82ZM16.02 10.75H19.4C19.28 9.55 18.66 8.82 17.71 8.82C16.76 8.82 16.15 9.55 16.02 10.75ZM19.52 5.88H15.9V4.95H19.52V5.88Z" />
                    </svg>
                    <span className="text-sm font-semibold">Behance</span>
                  </div>
                  <ArrowUpRight size={16} className="text-brand-accent" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

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
