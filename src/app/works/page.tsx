"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail, Check, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

// Bilingual translations dictionary
const translations = {
  vi: {
    backToPortfolio: "Xem portfolio",
    myWorks: "My Works",
    projectsBadge: "9 dự án",
    systemsThinkingSub: "HỆ THỐNG PHÁT TRIỂN",
    systemsThinkingTitle: "Một nền tảng, ba tầng thiết kế, khả năng mở rộng tối đa.",
    systemsThinkingDesc: "Rogo IoT Platform là cốt lõi quản lý. RaIO Smart biến cốt lõi đó thành một framework whitelabel có thể tái sử dụng – giữ nguyên logic sản phẩm nhưng tùy biến thương hiệu linh hoạt. Mỗi đối tác sau đó chỉ cần cắm vào framework để có một instance riêng biệt của mình mà không cần xây dựng lại hệ thống từ đầu.",
    platformLayer: "Tầng nền tảng (Platform)",
    frameworkLayer: "Tầng khung mẫu (Framework)",
    instanceLayer: "Tầng phiên bản (Instance)",
    iotToolsSub: "CÔNG CỤ IOT DÀNH CHO DOANH NGHIỆP",
    iotToolsTitle: "Các công cụ độc lập được xây dựng cho quy trình kinh doanh IoT.",
    iotToolsDesc: "Khi mô hình whitelabel là chưa đủ – các công cụ được thiết kế chuyên biệt để giải quyết các vấn đề vận hành cụ thể.",
    otherWorkSub: "DỰ ÁN KHÁC",
    otherWorkTitle: "Sự đa dạng ngoài nền tảng IoT.",
    otherWorkDesc: "Thiết kế thương hiệu và website ngoài hệ sinh thái IoT – mỗi dự án đều tập trung vào việc tạo dựng sự uy tín và định vị doanh nghiệp phù hợp với khách hàng mục tiêu.",
    ctaTitle: "Bạn muốn hợp tác cùng tôi?",
    ctaAvailable: "SẴN SÀNG CHO CÁC DỰ ÁN TỰ DO VÀ VAI TRÒ TOÀN THỜI GIAN BẮT ĐẦU TỪ Q3 2026",
    navWork: "Dự án",
    navAbout: "Giới thiệu về tôi",
    navContact: "Kết nối với tôi",
    availableRemote: "Làm việc từ xa",
    copySuccess: "Đã sao chép email!",
    rogoPlatformTitle: "Rogo IoT Platform v2",
    rogoPlatformDesc: "Rogo Solutions xây dựng và vận hành cốt lõi – bản thân nền tảng cũng được thiết kế whitelabel. Mỗi thương hiệu đối tác nhận được một instance riêng biệt: cùng cấu trúc, cùng trang điều khiển, nhưng mang bản sắc riêng. Logic whitelabel không bắt đầu từ tầng ứng dụng – nó bắt đầu ngay từ đây.",
    raioSmartTitle: "RaIO Smart",
    raioSmartDesc: "Được triển khai và quản lý thông qua Rogo Platform như mọi ứng dụng khác trong hệ sinh thái. Tầng whitelabel phía trên cho phép bất kỳ đối tác nào xuất bản ứng dụng mang thương hiệu riêng của họ – mà không cần xây dựng lại logic cốt lõi bên dưới.",
    austflyTitle: "Ứng dụng IoT Austfly",
    austflyDesc: "Thương hiệu cửa cuốn hàng đầu Việt Nam, đối tác đầu tiên áp dụng framework RaIO ngoài Rạng Đông. Đã được audit UX đầu cuối, xây dựng lại hệ thống phân cấp trực quan – hệ thống thiết kế và thư viện component sẵn sàng sản xuất, đang chờ triển khai.",
    kangarooTitle: "Ứng dụng IoT Kangaroo",
    kangarooDesc: "Một danh mục phần cứng hoàn toàn khác – thiết bị gia dụng – chạy trên cùng một framework. Hệ thống thiết kế và thư viện component sẵn sàng sản xuất, chứng minh kiến trúc hoạt động ổn định trên các dòng thiết bị khác nhau.",
    thingFlowTitle: "Thing Flow",
    thingFlowDesc: "Biến các sự kiện thiết bị IoT thành quy trình kinh doanh có thể lập trình – dành cho các nhóm doanh nghiệp tự động hóa mà không cần viết code.",
    thingPartnerTitle: "Thing Partner",
    thingPartnerDesc: "Dành cho những người xây dựng thiết bị. Được nghiên cứu trực tiếp tại nhà máy, bao gồm từ firmware đến bảo hành qua 6 giai đoạn vòng đời.",
    thingAiTitle: "Thing AI VN",
    thingAiDesc: "Một startup IoT mã nguồn mở được hỗ trợ bởi Rogo Solutions, kết nối các nhà sáng tạo cộng đồng và khách hàng doanh nghiệp. Đã xây dựng nhận diện thương hiệu và website giúp thể hiện sự uy tín về mặt kỹ thuật mà không bị khô cứng.",
    antaxiTitle: "Antaxi",
    antaxiDesc: "Một startup taxi công nghệ gia nhập thị trường đã được định hình bởi Grab và Gojek. Được xây dựng từ con số 0 – logo, hệ thống màu sắc và website – được định vị hiện đại và đáng tin cậy mà không bắt chước các đối thủ hiện tại.",
    laboTitle: "Labo Việt Mỹ",
    laboDesc: "Nhà sản xuất thiết bị nha khoa cung cấp cho các phòng khám và labo – sản phẩm được chứng nhận quốc tế. Đã thiết kế nhận diện thương hiệu và website để truyền tải sự chính xác, tuân thủ và uy tín kỹ thuật tới đối tác B2B chuyên nghiệp mua hàng dựa trên sự tin cậy."
  },
  en: {
    backToPortfolio: "View portfolio",
    myWorks: "My Works",
    projectsBadge: "9 projects",
    systemsThinkingSub: "SYSTEMS THINKING",
    systemsThinkingTitle: "One platform, three layers, built to extend.",
    systemsThinkingDesc: "Rogo IoT Platform is the management core. RaIO Smart turns that core into a reusable whitelabel framework – same product logic, adaptable branding. Every partner then plugs into the framework as its own instance, without rebuilding the system from scratch.",
    platformLayer: "Platform layer",
    frameworkLayer: "Framework layer",
    instanceLayer: "Instance layer",
    iotToolsSub: "IOT TOOLS",
    iotToolsTitle: "Standalone tools built for IoT-driven business workflows.",
    iotToolsDesc: "When the whitelabel model isn't enough – purpose-built tools for specific operational problems.",
    otherWorkSub: "OTHER WORK",
    otherWorkTitle: "Breadth beyond the IoT platform.",
    otherWorkDesc: "Brand and web work outside the IoT product ecosystem – each brief was about making a business credible to the right audience.",
    ctaTitle: "Interested in working together?",
    ctaAvailable: "AVAILABLE FOR FREELANCE PROJECTS AND FULL-TIME ROLES STARTING Q3 2026",
    navWork: "Work",
    navAbout: "About me",
    navContact: "Connect with me",
    availableRemote: "Available for Remote",
    copySuccess: "Email copied!",
    rogoPlatformTitle: "Rogo IoT Platform v2",
    rogoPlatformDesc: "Rogo Solutions builds and operates the core – and the platform itself is whitelabelable. Each partner brand gets their own instance: same architecture, same control plane, their own identity. The whitelabel logic doesn't start at the app layer – it starts here.",
    raioSmartTitle: "RaIO Smart",
    raioSmartDesc: "Deployed and managed through Rogo Platform like every app in the ecosystem. The whitelabel layer on top lets any partner ship their own branded app – without rebuilding the core logic underneath.",
    austflyTitle: "Austfly IoT App",
    austflyDesc: "Vietnam's leading roller shutter brand, and the first partner to adopt the RaIO framework outside Rạng Đông. UX audited end-to-end, visual hierarchy rebuilt – design system and component library production-ready, pending implementation.",
    kangarooTitle: "Kangaroo IoT App",
    kangarooDesc: "A completely different hardware category – household appliances – running on the same framework. Design system and components production-ready, proving the architecture holds across unrelated device lines.",
    thingFlowTitle: "Thing Flow",
    thingFlowDesc: "Turns IoT device events into programmable business workflows – for enterprise teams that automate without code.",
    thingPartnerTitle: "Thing Partner",
    thingPartnerDesc: "For the people who build the devices. On-site researched, covers firmware to warranty across 6 lifecycle stages.",
    thingAiTitle: "Thing AI VN",
    thingAiDesc: "An open-source IoT startup powered by Rogo Solutions, bridging community makers and enterprise clients. Built brand identity and digital presence to feel technically credible without feeling corporate.",
    antaxiTitle: "Antaxi",
    antaxiDesc: "A tech-first taxi startup entering a market already shaped by Grab and Gojek. Built from zero – logo, color system, and website – positioned as modern and reliable without mimicking the incumbents.",
    laboTitle: "Labo Viet My",
    laboDesc: "A dental equipment manufacturer supplying clinics and dental labs – products backed by international certifications. Designed brand identity and website to communicate precision, compliance, and technical credibility to a professional B2B audience that buys on trust."
  }
};

export default function WorksPage() {
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const isInitialMount = useRef(true);
  const [mounted, setMounted] = useState(false);
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
    setMounted(true);
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

  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    if (contactModalOpen || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [contactModalOpen, mobileMenuOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ktruong2k1@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const t = translations[lang];

  // Mockup SVGs or simple graphics to mimic screenshots
  const renderMockup = (type: string) => {
    const accentColor = "#22C55E";
    const strokeColor = "#223047";
    
    switch (type) {
      case "raio-smart":
        return (
          <div className="w-full h-full bg-[#0c0d12] flex items-center justify-center relative overflow-hidden">
            <img 
              src="/images/raio.png" 
              alt="RaIO Smart Thumbnail" 
              className="w-full h-full object-cover" 
            />
          </div>
        );
      case "austfly":
        return (
          <div className="w-full h-full bg-[#0c0d12] flex items-center justify-center relative overflow-hidden">
            <img 
              src="/images/austfly.png" 
              alt="Austfly Redesign Thumbnail" 
              className="w-full h-full object-cover" 
            />
          </div>
        );
      case "kangaroo":
        return (
          <div className="w-full h-full bg-[#0c0d12] flex items-center justify-center relative overflow-hidden">
            <img 
              src="/images/kangaroo_raio.png" 
              alt="Kangaroo IoT App Thumbnail" 
              className="w-full h-full object-cover" 
            />
          </div>
        );
      case "thing-flow":
        return (
          <div className="w-full h-full bg-[#0c0d12] flex items-center justify-center relative overflow-hidden">
            <svg className="w-full h-full opacity-60" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="135" y="10" width="110" height="220" rx="10" fill="#0c121e" stroke={strokeColor} />
              <rect x="145" y="30" width="90" height="30" rx="3" fill="#13233c" stroke={strokeColor} />
              <text x="190" y="47" fill={accentColor} fontSize="7" fontWeight="bold" textAnchor="middle">{lang === "vi" ? "NẾU Sự kiện Kích hoạt" : "IF Trigger Event"}</text>
              <line x1="190" y1="60" x2="190" y2="85" stroke={accentColor} strokeWidth="1.5" strokeDasharray="3 3" />
              <rect x="145" y="85" width="90" height="30" rx="3" fill="#13233c" stroke={strokeColor} />
              <text x="190" y="102" fill="#fff" fontSize="7" fontWeight="bold" textAnchor="middle">{lang === "vi" ? "THÌ Chạy Hành động" : "THEN Run Action"}</text>
            </svg>
          </div>
        );
      case "thing-partner":
        return (
          <div className="w-full h-full bg-[#0c0d12] flex items-center justify-center relative overflow-hidden">
            <img 
              src="/images/thing_partner.png" 
              alt="Thing Partner Thumbnail" 
              className="w-full h-full object-cover" 
            />
          </div>
        );
      case "antaxi":
        return (
          <div className="w-full h-full bg-[#0c0d12] flex items-center justify-center relative overflow-hidden">
            <svg className="w-full h-full opacity-50" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="120" y="10" width="140" height="230" rx="12" fill="#0c121e" stroke={strokeColor} />
              {/* Map grid mockup */}
              <line x1="120" y1="80" x2="260" y2="110" stroke={strokeColor} strokeWidth="1" />
              <line x1="160" y1="10" x2="210" y2="240" stroke={strokeColor} strokeWidth="1.5" />
              <circle cx="185" cy="100" r="6" fill={accentColor} />
              <path d="M 185 85 L 188 92 L 195 92 L 190 96 L 192 103 L 185 99 L 178 103 L 180 96 L 175 92 L 182 92 Z" fill="#E8C468" transform="scale(0.8) translate(40, 20)" />
            </svg>
          </div>
        );
      case "labo":
        return (
          <div className="w-full h-full bg-[#0c0d12] flex items-center justify-center relative overflow-hidden">
            <img 
              src="/images/labo_viet_my.png" 
              alt="Labo Viet My Thumbnail" 
              className="w-full h-full object-cover" 
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="page-wrapper min-h-screen bg-[#0B0B0C] text-neutral-300 flex flex-col font-sans"
      style={{
        opacity: fadeOpacity,
        transform: fadeOpacity < 1 ? `translateY(${(1 - fadeOpacity) * 12}px)` : 'none',
        transition: 'opacity 450ms cubic-bezier(0.215, 0.61, 0.355, 1), transform 450ms cubic-bezier(0.215, 0.61, 0.355, 1)'
      }}
    >
      
      {/* HEADER */}
      <header 
        style={{
          display: 'flex',
          height: '76px',
          padding: '16px 120px',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'stretch',
          borderBottom: '1px solid var(--Colors-Neutral-800, #4B4B4B)',
          background: 'var(--Colors-Neutral-1000, #181818)',
          width: '100%',
          position: 'relative'
        }}
        className="w-full sticky top-0 z-40 transition-all duration-300"
      >
        {/* Left: Logo */}
        <a href="/" className="flex items-center gap-2 text-white font-serif font-bold text-[20px] tracking-tight hover:scale-105 transition-transform duration-150">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="header-logo-mask-works">
              <rect width="28" height="28" fill="white" />
              <path d="M12 0C6 8 6 20 12 28" stroke="black" strokeWidth="2.5" fill="none" />
              <path d="M20 0C14 8 14 20 20 28" stroke="black" strokeWidth="2.5" fill="none" />
            </mask>
            <circle cx="14" cy="14" r="14" fill="#22C55E" mask="url(#header-logo-mask-works)" />
          </svg>
          khanhtruong_nguyen
        </a>

        {/* Center: Centered navigation links (selected state highlighted) */}
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
          <Link 
            href="/works" 
            className={`nav-item ${!contactModalOpen ? 'active' : ''}`}
          >
            {t.navWork}
            {!contactModalOpen && <span className="nav-item-line" />}
          </Link>
          <Link href="/about" className="nav-item">
            {t.navAbout}
          </Link>
          <button 
            onClick={() => setContactModalOpen(true)}
            className={`nav-item ${contactModalOpen ? 'active' : ''}`}
          >
            {t.navContact}
            {contactModalOpen && <span className="nav-item-line" />}
          </button>
        </nav>

        {/* Right: Language switch & Available remote badge */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switch */}
          <div 
            style={{ height: '32px' }}
            className="flex items-center rounded-full p-0.5 bg-neutral-950/80 select-none"
          >
            <button
              onClick={() => handleLangChange("vi")}
              className={`px-1.5 md:px-2.5 h-full rounded-full transition-all cursor-pointer flex items-center gap-0 md:gap-1.5 ${lang === "vi" ? "bg-neutral-800 text-white font-semibold" : "text-neutral-500 hover:text-neutral-300"}`}
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
              <span className="hidden md:inline">VIE</span>
            </button>
            <button
              onClick={() => handleLangChange("en")}
              className={`px-1.5 md:px-2.5 h-full rounded-full transition-all cursor-pointer flex items-center gap-0 md:gap-1.5 ${lang === "en" ? "bg-neutral-800 text-white font-semibold" : "text-neutral-500 hover:text-neutral-300"}`}
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
                <clipPath id="uk-clip-works">
                  <circle cx="10" cy="10" r="10" />
                </clipPath>
                <g clipPath="url(#uk-clip-works)">
                  <circle cx="10" cy="10" r="10" fill="#012169" />
                  <path d="M0 0 L20 20 M20 0 L0 20" stroke="#FFFFFF" strokeWidth="2.5" />
                  <path d="M0 0 L20 20 M20 0 L0 20" stroke="#C8102E" strokeWidth="1.2" />
                  <path d="M10 0 V20 M0 10 H20" stroke="#FFFFFF" strokeWidth="4.5" />
                  <path d="M10 0 V20 M0 10 H20" stroke="#C8102E" strokeWidth="2.5" />
                </g>
              </svg>
              <span className="hidden md:inline">ENG</span>
            </button>
          </div>

          <a 
            href="/contact" 
            className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-status-200/50 hover:bg-status-200/10 text-xs text-[#E5E5E5] font-semibold transition-colors duration-150"
          >
            <span className="w-2 h-2 bg-status-200 rounded-full animate-pulse"></span>
            {t.availableRemote}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-neutral-900 text-neutral-400 md:hidden transition-colors"
        >
          {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[76px] left-0 right-0 border-b border-neutral-900 bg-[var(--Colors-Neutral-1000,#181818)] px-6 py-4 flex flex-col gap-4 text-sm font-semibold z-50">
            <a href="/works" onClick={() => setMobileMenuOpen(false)} className="py-2 text-brand-accent transition-colors">{t.navWork}</a>
            <a href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-neutral-400 hover:text-white transition-colors">{t.navAbout}</a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setContactModalOpen(true);
              }} 
              style={{ background: 'none', border: 'none', textAlign: 'left', padding: '8px 0' }}
              className="py-2 text-neutral-400 hover:text-white transition-colors font-sans text-sm font-semibold cursor-pointer"
            >
              {t.navContact}
            </button>
          </div>
        )}
      </header>

      {/* TOP VIEW PORTFOLIO LINK & HEADING */}
      <section 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
          padding: '48px 120px 24px 120px',
          background: '#0B0B0C'
        }}
        className="relative"
      >
        <a 
          href="/" 
          style={{
            color: 'var(--Colors-Primary-400, #22C55E)',
            fontFamily: '"Be Vietnam Pro", sans-serif',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '18px',
            textAlign: 'center',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
          className="hover:text-brand-accent hover:translate-x-[-4px] transition-all mb-8 uppercase"
        >
          <ArrowLeft size={16} /> {t.backToPortfolio}
        </a>

        <div className="flex items-center gap-4 w-full" style={{ width: '100%' }}>
          <h1 
            style={{ fontSize: '34px' }}
            className="font-extrabold font-serif tracking-tight text-white leading-tight"
          >
            {t.myWorks}
          </h1>
          <span 
            className="projects-badge"
            style={{
              color: 'var(--Colors-Primary-400, #22C55E)',
              fontFamily: 'Fraunces, serif',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '9999px',
              padding: '0px 16px'
            }}
          >
            {t.projectsBadge}
          </span>
        </div>
      </section>

      {/* SECTION 1: SYSTEMS THINKING */}
      <section 
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: '48px 120px 40px 120px',
          background: '#0B0B0C'
        }}
        className="relative"
      >
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            maxWidth: '896px',
            marginBottom: '64px'
          }}
        >
          <span 
            style={{
              color: 'var(--Colors-Secondary-300, #E8C468)',
              fontFamily: '"Be Vietnam Pro", sans-serif',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '21px',
              letterSpacing: '0.1em'
            }}
            className="uppercase"
          >
            {t.systemsThinkingSub}
          </span>
          <h2 className="text-3xl font-extrabold font-serif tracking-tight text-white">
            {t.systemsThinkingTitle}
          </h2>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed mt-2">
            {t.systemsThinkingDesc}
          </p>
        </div>

        {/* TIMELINE HIERARCHY GRID */}
        <div className="w-full flex flex-col gap-0" style={{ width: '100%' }}>
          
          {/* Tier 1: Platform layer */}
          <div 
            className="flex flex-col md:flex-row hover:shadow-lg transition-all duration-300 cursor-pointer group"
            style={{
              padding: '20px 24px',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: '20px',
              borderRadius: '16px',
              backgroundColor: '#17211B',
              width: 'fit-content',
              maxWidth: '100%',
              margin: '0 auto'
            }}
          >
            {/* Title & Icon (Left) */}
            <div className="flex flex-col items-start gap-4 w-full md:w-[220px] flex-shrink-0">
              <h4 
                style={{
                  color: '#E8C468',
                  fontFamily: 'var(--font-serif), serif',
                  fontSize: '34px',
                  fontWeight: 400,
                  lineHeight: '51px'
                }}
                className="text-left leading-tight"
              >
                {t.platformLayer}
              </h4>
            </div>

            {/* Details area (Right) */}
            <Link 
              href="/works/rogo-dashboard"
              className="flex flex-col md:flex-row gap-6 w-full items-start flex-1 p-3 border border-transparent hover:border-[#22C55E] transition-all duration-300 rounded-xl cursor-pointer group block"
            >
              {/* Content Block */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '16px',
                  flex: '1 0 0%'
                }}
                className="w-full"
              >
                <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#E8C468] leading-tight transition-colors duration-300">
                  {t.rogoPlatformTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["PaaS", "B2B", "Dashboard", "Whitelabel"].map((tag, idx) => (
                    <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 tracking-wider group-hover:text-neutral-100 transition-colors duration-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {t.rogoPlatformDesc}
                </p>
              </div>

              {/* Thumbnail Block */}
              <div 
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}
                className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] md:flex-shrink-0 border border-neutral-900/80 group-hover:border-transparent rounded-xl transition-all duration-300"
              >
                <Image
                  src="/images/rogo_platform.png"
                  alt="Rogo IoT Platform v2"
                  fill
                  sizes="(max-width: 768px) 100vw, 388px"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Connector Dot & Line 1 */}
          <div className="flex justify-center relative z-20">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="46" viewBox="0 0 11 46" fill="none">
              <path d="M5.33325 -2.0504e-05C2.38773 -2.06328e-05 -8.14104e-05 2.38779 -8.15392e-05 5.33331C-8.16679e-05 8.27883 2.38773 10.6666 5.33325 10.6666C8.27877 10.6666 10.6666 8.27883 10.6666 5.33331C10.6666 2.38779 8.27877 -2.03752e-05 5.33325 -2.0504e-05ZM5.33325 5.33331L4.33325 5.33331L4.33325 45.3333L5.33325 45.3333L6.33325 45.3333L6.33325 5.33331L5.33325 5.33331Z" fill="#22C55E"/>
            </svg>
          </div>

          {/* Tier 2: Framework layer */}
          <div 
            className="flex flex-col md:flex-row hover:shadow-lg transition-all duration-300 cursor-pointer group"
            style={{
              padding: '20px 24px',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: '20px',
              borderRadius: '16px',
              backgroundColor: '#17211B',
              width: 'fit-content',
              maxWidth: '100%',
              margin: '0 auto'
            }}
          >
            {/* Title & Icon (Left) */}
            <div className="flex flex-col items-start gap-4 w-full md:w-[220px] flex-shrink-0">
              <h4 
                style={{
                  color: '#E8C468',
                  fontFamily: 'var(--font-serif), serif',
                  fontSize: '34px',
                  fontWeight: 400,
                  lineHeight: '51px'
                }}
                className="text-left leading-tight"
              >
                {t.frameworkLayer}
              </h4>
            </div>

            {/* Details area (Right) */}
            <a 
              href="/pending"
              className="flex flex-col md:flex-row gap-6 w-full items-start flex-1 p-3 border border-transparent hover:border-[#22C55E] transition-all duration-300 rounded-xl cursor-pointer group block"
            >
              {/* Content Block */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '16px',
                  width: '100%',
                  maxWidth: '388px',
                  flexShrink: 0
                }}
                className="w-full md:w-[388px]"
              >
                <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#E8C468] leading-tight transition-colors duration-300">
                  {t.raioSmartTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Mobile", "IoT", "Smart Home", "Whitelabel"].map((tag, idx) => (
                    <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 tracking-wider group-hover:text-neutral-100 transition-colors duration-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {t.raioSmartDesc}
                </p>
              </div>

              {/* Thumbnail Block */}
              <div 
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}
                className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] md:flex-shrink-0 border border-neutral-900/80 group-hover:border-transparent rounded-xl transition-all duration-300"
              >
                {renderMockup("raio-smart")}
              </div>
            </a>
          </div>

          {/* Connector Dot & Line 2 */}
          <div className="flex justify-center relative z-20">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="46" viewBox="0 0 11 46" fill="none">
              <path d="M5.33325 -2.0504e-05C2.38773 -2.06328e-05 -8.14104e-05 2.38779 -8.15392e-05 5.33331C-8.16679e-05 8.27883 2.38773 10.6666 5.33325 10.6666C8.27877 10.6666 10.6666 8.27883 10.6666 5.33331C10.6666 2.38779 8.27877 -2.03752e-05 5.33325 -2.0504e-05ZM5.33325 5.33331L4.33325 5.33331L4.33325 45.3333L5.33325 45.3333L6.33325 45.3333L6.33325 5.33331L5.33325 5.33331Z" fill="#22C55E"/>
            </svg>
          </div>

          {/* Tier 3: Instance layer */}
          <div 
            className="flex flex-col md:flex-row hover:shadow-lg transition-all duration-300 cursor-pointer"
            style={{
              padding: '20px 24px',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: '24px',
              borderRadius: '16px',
              backgroundColor: '#17211B',
              width: 'fit-content',
              maxWidth: '100%',
              margin: '0 auto'
            }}
          >
            {/* Title & Icon (Left) */}
            <div className="flex flex-col items-start gap-4 w-full md:w-[220px] flex-shrink-0">
              <h4 
                style={{
                  color: '#E8C468',
                  fontFamily: 'var(--font-serif), serif',
                  fontSize: '34px',
                  fontWeight: 400,
                  lineHeight: '51px'
                }}
                className="text-left leading-tight"
              >
                {t.instanceLayer}
              </h4>
            </div>

            {/* Details area (Right) - Horizontal row side-by-side */}
            <div className="flex flex-col md:flex-row gap-6 items-stretch justify-start">
              
              {/* Instance 1: Austfly */}
              <a 
                href="/pending"
                style={{
                  maxWidth: '412px',
                  width: '100%',
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '12px',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: '20px',
                  borderRadius: '16px',
                  backgroundColor: 'transparent'
                }}
                className="border border-transparent hover:border-[#2ECC8A] transition-all duration-300 cursor-pointer group block"
              >
                {/* Thumbnail Block */}
                <div 
                  style={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}
                  className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] border border-neutral-900/80 flex-shrink-0 mx-auto rounded-xl overflow-hidden"
                >
                  {renderMockup("austfly")}
                </div>
                {/* Text Content */}
                <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#E8C468] leading-tight transition-colors duration-300">
                  {t.austflyTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Mobile", "IoT", "Smart Home", "Redesign"].map((tag, idx) => (
                    <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 tracking-wider group-hover:text-neutral-100 transition-colors duration-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {t.austflyDesc}
                </p>
              </a>

              {/* Instance 2: Kangaroo */}
              <a 
                href="/pending"
                style={{
                  maxWidth: '412px',
                  width: '100%',
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '12px',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: '20px',
                  borderRadius: '16px',
                  backgroundColor: 'transparent'
                }}
                className="border border-transparent hover:border-[#2ECC8A] transition-all duration-300 cursor-pointer group block"
              >
                {/* Thumbnail Block */}
                <div 
                  style={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}
                  className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] border border-neutral-900/80 flex-shrink-0 mx-auto rounded-xl overflow-hidden"
                >
                  {renderMockup("kangaroo")}
                </div>
                {/* Text Content */}
                <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#E8C468] leading-tight transition-colors duration-300">
                  {t.kangarooTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Mobile", "IoT", "Smart Home", "Redesign"].map((tag, idx) => (
                    <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 tracking-wider group-hover:text-neutral-100 transition-colors duration-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {t.kangarooDesc}
                </p>
              </a>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: IOT TOOLS */}
      <section 
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: '40px 120px',
          background: '#0B0B0C'
        }}
        className="relative"
      >
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            maxWidth: '896px',
            marginBottom: '64px'
          }}
        >
          <span 
            style={{
              color: 'var(--Colors-Secondary-300, #E8C468)',
              fontFamily: '"Be Vietnam Pro", sans-serif',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '21px',
              letterSpacing: '0.1em'
            }}
            className="uppercase"
          >
            {t.iotToolsSub}
          </span>
          <h2 className="text-3xl font-extrabold font-serif tracking-tight text-white">
            {t.iotToolsTitle}
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed mt-2">
            {t.iotToolsDesc}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-stretch">
          {/* Thing Flow */}
          <a 
            href="/pending"
            style={{ maxWidth: '412px', width: '100%', flexShrink: 0 }}
            className="flex flex-col gap-4 p-3 border border-transparent rounded-2xl hover:border-[#2ECC8A] hover:bg-neutral-900/10 transition-all duration-300 cursor-pointer group block text-left"
          >
            <div 
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
              className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] md:flex-shrink-0 border border-neutral-900/80 mx-auto rounded-xl overflow-hidden"
            >
              {renderMockup("thing-flow")}
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#E8C468] transition-colors duration-300">
                {t.thingFlowTitle}
              </h3>
              <ArrowUpRight size={18} className="text-brand-accent" />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Mobile", "IoT", "Smart Home", "Redesign"].map((tag, idx) => (
                <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 tracking-wider group-hover:text-neutral-100 transition-colors duration-300">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed flex-1">
              {t.thingFlowDesc}
            </p>
          </a>

          {/* Thing Partner */}
          <a 
            href="/pending"
            style={{ maxWidth: '412px', width: '100%', flexShrink: 0 }}
            className="flex flex-col gap-4 p-3 border border-transparent rounded-2xl hover:border-[#2ECC8A] hover:bg-neutral-900/10 transition-all duration-300 cursor-pointer group block text-left"
          >
            <div 
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
              className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] md:flex-shrink-0 border border-neutral-900/80 mx-auto rounded-xl overflow-hidden"
            >
              {renderMockup("thing-partner")}
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#E8C468] transition-colors duration-300">
                {t.thingPartnerTitle}
              </h3>
              <ArrowUpRight size={18} className="text-brand-accent" />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Mobile", "IoT", "Smart Home", "Redesign"].map((tag, idx) => (
                <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 tracking-wider group-hover:text-neutral-100 transition-colors duration-300">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed flex-1">
              {t.thingPartnerDesc}
            </p>
          </a>
        </div>
      </section>

      {/* SECTION 3: OTHER WORK */}
      <section 
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: '40px 120px',
          background: '#0B0B0C'
        }}
        className="relative"
      >
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            maxWidth: '896px',
            marginBottom: '64px'
          }}
        >
          <span 
            style={{
              color: 'var(--Colors-Secondary-300, #E8C468)',
              fontFamily: '"Be Vietnam Pro", sans-serif',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '21px',
              letterSpacing: '0.1em'
            }}
            className="uppercase"
          >
            {t.otherWorkSub}
          </span>
          <h2 className="text-3xl font-extrabold font-serif tracking-tight text-white">
            {t.otherWorkTitle}
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed mt-2">
            {t.otherWorkDesc}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-stretch flex-wrap">
          {/* Thing AI VN */}
          <a 
            href="https://thing.ai.vn/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ maxWidth: '412px', width: '100%', flexShrink: 0 }}
            className="flex flex-col gap-4 p-3 border border-transparent rounded-2xl hover:border-[#2ECC8A] hover:bg-neutral-900/10 transition-all duration-300 cursor-pointer group block text-left"
          >
            <div 
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
              className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] md:flex-shrink-0 border border-neutral-900/80 mx-auto rounded-xl overflow-hidden"
            >
              <Image
                src="/images/Thing_AI_VN.png"
                alt="Thing AI VN"
                fill
                sizes="(max-width: 768px) 100vw, 388px"
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#E8C468] transition-colors duration-300">
                {t.thingAiTitle}
              </h3>
              <ArrowUpRight size={18} className="text-brand-accent" />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Website", "B2B", "Brand Identity"].map((tag, idx) => (
                <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 tracking-wider group-hover:text-neutral-100 transition-colors duration-300">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed flex-1">
              {t.thingAiDesc}
            </p>
          </a>

          {/* Antaxi */}
          <a 
            href="/pending"
            style={{ maxWidth: '412px', width: '100%', flexShrink: 0 }}
            className="flex flex-col gap-4 p-3 border border-transparent rounded-2xl hover:border-[#2ECC8A] hover:bg-neutral-900/10 transition-all duration-300 cursor-pointer group block text-left"
          >
            <div 
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
              className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] md:flex-shrink-0 border border-neutral-900/80 mx-auto rounded-xl overflow-hidden"
            >
              {renderMockup("antaxi")}
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#E8C468] transition-colors duration-300">
                {t.antaxiTitle}
              </h3>
              <ArrowUpRight size={18} className="text-brand-accent" />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Website", "B2B", "Brand Identity"].map((tag, idx) => (
                <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 tracking-wider group-hover:text-neutral-100 transition-colors duration-300">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed flex-1">
              {t.antaxiDesc}
            </p>
          </a>

          {/* Labo Viet My */}
          <a 
            href="/pending"
            style={{ maxWidth: '412px', width: '100%', flexShrink: 0 }}
            className="flex flex-col gap-4 p-3 border border-transparent rounded-2xl hover:border-[#2ECC8A] hover:bg-neutral-900/10 transition-all duration-300 cursor-pointer group block text-left"
          >
            <div 
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
              className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] md:flex-shrink-0 border border-neutral-900/80 mx-auto rounded-xl overflow-hidden"
            >
              {renderMockup("labo")}
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#E8C468] transition-colors duration-300">
                {t.laboTitle}
              </h3>
              <ArrowUpRight size={18} className="text-brand-accent" />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Website", "B2B", "Brand Identity", "Redesign"].map((tag, idx) => (
                <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 tracking-wider group-hover:text-neutral-100 transition-colors duration-300">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed flex-1">
              {t.laboDesc}
            </p>
          </a>
        </div>
      </section>

      {/* SECTION 4: CALL TO ACTION */}
      <section 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          padding: '96px 120px',
          background: '#0d0f14'
        }}
        className="relative"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold font-serif text-white mb-8 tracking-tight">
          {t.ctaTitle}
        </h2>
        
        <div style={{ maxWidth: '388px', width: '100%' }} className="flex justify-center mx-auto">
          <button
            onClick={handleCopyEmail}
            className="bg-[#22C55E] hover:bg-[#1f9e4e] text-[#17211B] font-bold rounded-full shadow-lg transition-all duration-150 active:scale-95 text-base cursor-pointer cta-btn w-full"
          >
            <Mail size={18} />
            ktruong2k1@gmail.com
            {copied && <Check size={16} className="text-green-950 ml-1" />}
          </button>
        </div>

        {copied && (
          <span className="text-brand-accent text-xs font-mono mt-3 animate-fadeIn">
            {t.copySuccess}
          </span>
        )}

      </section>

      {/* FOOTER */}
      <footer 
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: '40px 120px',
          background: '#0B0B0C'
        }}
        className="text-xs text-neutral-500"
      >
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4" style={{ width: '100%' }}>
          <span>© 2026 KT Studio. All rights reserved.</span>
          <div className="flex items-center gap-6 font-semibold">
            <a href="https://www.linkedin.com/in/nguyen-khanh-truong-designer/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://www.behance.net/nguyenkhanhtr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Behance</a>
            <a href="/" className="hover:text-white transition-colors">Archive</a>
          </div>
        </div>
      </footer>

      {/* Smart Animate transition overlay */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgb(13, 43, 34)',
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: mounted ? 0 : 1,
          transition: 'opacity 600ms cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      />

      {/* CONTACT DIALOG */}
      <div 
        className="contact-dialog-container"
        style={{
          position: 'fixed',
          inset: 0,
          height: '100dvh',
          zIndex: 30,
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
          className="contact-dialog-backdrop"
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
          className="contact-dialog-panel"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '720px',
            background: '#181818',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            transform: contactModalOpen ? 'scale(1)' : 'scale(0.95)',
            opacity: contactModalOpen ? 1 : 0,
            transition: 'transform 300ms cubic-bezier(0.25, 1, 0.5, 1), opacity 300ms ease-out',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '40px 32px',
            overflow: 'hidden'
          }}
        >
          {/* Close button */}
          <button 
            onClick={() => setContactModalOpen(false)}
            className="absolute -top-12 left-4 md:left-0 text-neutral-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-neutral-800/20"
            style={{ background: 'none', border: 'none' }}
          >
            <X size={24} strokeWidth={1.5} />
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
                flex: '1 1 0%',
                width: '100%'
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
