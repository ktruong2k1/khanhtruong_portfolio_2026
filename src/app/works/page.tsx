"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Mail, Check, Menu, X } from "lucide-react";

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
    navAbout: "Giới thiệu",
    navContact: "Liên hệ",
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
    navAbout: "About",
    navContact: "Contact",
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <div className="w-full h-full bg-[#0d1016] rounded-xl flex items-center justify-center p-4 relative overflow-hidden border border-neutral-900">
            <svg className="w-full h-full opacity-40" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="360" height="180" rx="8" fill="#111c30" stroke={strokeColor} strokeWidth="1" />
              <rect x="25" y="25" width="80" height="20" rx="3" fill="#13233c" stroke={strokeColor} />
              <rect x="35" y="32" width="60" height="6" rx="2.5" fill={accentColor} />
              {/* Chart lines */}
              <path d="M 30 150 C 70 120, 110 180, 150 130 C 190 80, 230 160, 270 100 C 310 40, 330 90, 350 70" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="270" cy="100" r="5" fill="#fff" />
              <circle cx="270" cy="100" r="2" fill={accentColor} />
            </svg>
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-[10px] font-mono text-neutral-400">{lang === "vi" ? "TỔNG QUAN CHỈ SỐ" : "METRICS OVERVIEW"}</span>
              <span className="text-xs font-bold text-white">RaIO Smart Framework UI Dashboard</span>
            </div>
          </div>
        );
      case "austfly":
        return (
          <div className="w-full h-[220px] bg-[#0c0d12] rounded-xl flex items-center justify-center p-4 relative overflow-hidden border border-neutral-900">
            <svg className="w-full h-full opacity-50" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="125" y="10" width="130" height="220" rx="12" fill="#0d1424" stroke={accentColor} strokeWidth="1.5" />
              {/* Austfly roller shutter UI */}
              <text x="190" y="35" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">AUSTFLY</text>
              <rect x="145" y="55" width="90" height="65" rx="4" fill="#13233c" stroke="#223047" />
              <line x1="150" y1="70" x2="230" y2="70" stroke="#223047" strokeWidth="2" />
              <line x1="150" y1="80" x2="230" y2="80" stroke="#223047" strokeWidth="2" />
              <line x1="150" y1="90" x2="230" y2="90" stroke="#223047" strokeWidth="2" />
              {/* Shutter Swipe Button */}
              <circle cx="190" cy="85" r="14" fill={accentColor} fillOpacity="0.2" stroke={accentColor} />
              <path d="M 190 92 L 190 78 M 185 83 L 190 78 L 195 83" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Quick action button */}
              <rect x="155" y="135" width="70" height="15" rx="3.5" fill={accentColor} />
              <text x="190" y="145" fill="#17211B" fontSize="6.5" fontWeight="bold" textAnchor="middle">{lang === "vi" ? "Mở một chạm" : "One-tap Open"}</text>
            </svg>
            <div className="absolute inset-x-0 bottom-0 p-3 bg-neutral-950/80 border-t border-neutral-900">
              <span className="text-[10px] font-mono text-brand-accent font-bold">{lang === "vi" ? "Tái thiết kế UI Ứng dụng" : "App UI Redesign"}</span>
            </div>
          </div>
        );
      case "kangaroo":
        return (
          <div className="w-full h-[220px] bg-[#0c0d12] rounded-xl flex items-center justify-center p-4 relative overflow-hidden border border-neutral-900">
            <svg className="w-full h-full opacity-50" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="125" y="10" width="130" height="220" rx="12" fill="#0d1424" stroke={accentColor} strokeWidth="1.5" />
              {/* Appliance controls */}
              <text x="190" y="35" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">KANGAROO IoT</text>
              <circle cx="190" cy="80" r="24" fill="#13233c" stroke="#223047" strokeWidth="1" />
              <circle cx="190" cy="80" r="20" fill="none" stroke={accentColor} strokeWidth="2" strokeDasharray="60 30" />
              <text x="190" y="83" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">75°C</text>
              {/* Controls */}
              <rect x="145" y="120" width="40" height="15" rx="2" fill="#13233c" stroke="#223047" />
              <rect x="195" y="120" width="40" height="15" rx="2" fill="#13233c" stroke="#223047" />
            </svg>
            <div className="absolute inset-x-0 bottom-0 p-3 bg-neutral-950/80 border-t border-neutral-900">
              <span className="text-[10px] font-mono text-brand-accent font-bold">{lang === "vi" ? "Tích hợp thiết bị gia dụng" : "Smart Appliance Integration"}</span>
            </div>
          </div>
        );
      case "thing-flow":
        return (
          <div className="w-full h-[200px] bg-[#0c0d12] rounded-xl flex items-center justify-center p-4 relative overflow-hidden border border-neutral-900">
            <svg className="w-full h-full opacity-50" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="135" y="10" width="110" height="220" rx="10" fill="#0c121e" stroke={strokeColor} />
              <rect x="145" y="30" width="90" height="30" rx="3" fill="#13233c" stroke={strokeColor} />
              <text x="190" y="47" fill={accentColor} fontSize="7" fontWeight="bold" textAnchor="middle">{lang === "vi" ? "NẾU Sự kiện Kích hoạt" : "IF Trigger Event"}</text>
              <line x1="190" y1="60" x2="190" y2="85" stroke={accentColor} strokeWidth="1.5" strokeDasharray="3 3" />
              <rect x="145" y="85" width="90" height="30" rx="3" fill="#13233c" stroke={strokeColor} />
              <text x="190" y="102" fill="#fff" fontSize="7" fontWeight="bold" textAnchor="middle">{lang === "vi" ? "THÌ Chạy Hành động" : "THEN Run Action"}</text>
            </svg>
            <div className="absolute inset-x-0 bottom-0 p-3 bg-neutral-950/80 border-t border-neutral-900">
              <span className="text-[10px] font-mono text-brand-accent font-bold">{lang === "vi" ? "Trình dựng kịch bản tự động" : "Visual Workflow Engine"}</span>
            </div>
          </div>
        );
      case "thing-partner":
        return (
          <div className="w-full h-[200px] bg-[#0c0d12] rounded-xl flex items-center justify-center p-4 relative overflow-hidden border border-neutral-900">
            <svg className="w-full h-full opacity-50" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="25" y="25" width="330" height="150" rx="6" fill="#111c30" stroke={strokeColor} />
              <rect x="40" y="40" width="80" height="120" rx="2" fill="#0d1424" stroke={strokeColor} />
              <rect x="45" y="50" width="70" height="6" rx="1.5" fill={accentColor} />
              <rect x="135" y="40" width="200" height="40" rx="3" fill="#13233c" stroke={strokeColor} />
              <circle cx="155" cy="60" r="10" fill={accentColor} fillOpacity="0.2" />
              <path d="M 152 60 L 154 62 L 158 58" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
              <rect x="175" y="57" width="140" height="6" rx="3" fill={accentColor} />
            </svg>
            <div className="absolute inset-x-0 bottom-0 p-3 bg-neutral-950/80 border-t border-neutral-900">
              <span className="text-[10px] font-mono text-brand-accent font-bold">{lang === "vi" ? "Công cụ QA Kiểm thử Nhà máy" : "Factory QA Testing Companion"}</span>
            </div>
          </div>
        );
      case "antaxi":
        return (
          <div className="w-full h-[200px] bg-[#0c0d12] rounded-xl flex items-center justify-center p-4 relative overflow-hidden border border-neutral-900">
            <svg className="w-full h-full opacity-40" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="120" y="10" width="140" height="230" rx="12" fill="#0c121e" stroke={strokeColor} />
              {/* Map grid mockup */}
              <line x1="120" y1="80" x2="260" y2="110" stroke={strokeColor} strokeWidth="1" />
              <line x1="160" y1="10" x2="210" y2="240" stroke={strokeColor} strokeWidth="1.5" />
              <circle cx="185" cy="100" r="6" fill={accentColor} />
              <path d="M 185 85 L 188 92 L 195 92 L 190 96 L 192 103 L 185 99 L 178 103 L 180 96 L 175 92 L 182 92 Z" fill="#E8C468" transform="scale(0.8) translate(40, 20)" />
            </svg>
            <div className="absolute inset-x-0 bottom-0 p-3 bg-neutral-950/80 border-t border-neutral-900">
              <span className="text-[10px] font-mono text-brand-accent font-bold">{lang === "vi" ? "Giao diện concept Gọi xe" : "Taxi Hailing UI Concept"}</span>
            </div>
          </div>
        );
      case "labo":
        return (
          <div className="w-full h-[200px] bg-[#0c0d12] rounded-xl flex items-center justify-center p-4 relative overflow-hidden border border-neutral-900">
            <svg className="w-full h-full opacity-40" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="20" width="340" height="160" rx="4" fill="#111c30" stroke={strokeColor} />
              {/* Header navbar inside medical site mockup */}
              <circle cx="40" cy="35" r="5" fill={accentColor} />
              <rect x="55" y="32" width="40" height="6" rx="2" fill="#223047" />
              <rect x="105" y="32" width="30" height="6" rx="2" fill="#223047" />
              <rect x="300" y="30" width="45" height="10" rx="5" fill={accentColor} />
              {/* Medical card */}
              <rect x="40" y="60" width="100" height="100" rx="3" fill="#13233c" stroke={strokeColor} />
              <rect x="160" y="60" width="180" height="100" rx="3" fill="#13233c" stroke={strokeColor} />
              <circle cx="90" cy="100" r="20" fill={accentColor} fillOpacity="0.1" />
              <path d="M 82 100 C 82 90, 98 90, 98 100 C 98 110, 82 110, 82 100 Z" stroke={accentColor} strokeWidth="1.5" fill="none" />
              <rect x="152.5" y="70" width="100" height="8" rx="2" fill="#223047" />
              <rect x="152.5" y="85" width="150" height="4" rx="1" fill="#223047" />
              <rect x="152.5" y="95" width="130" height="4" rx="1" fill="#223047" />
            </svg>
            <div className="absolute inset-x-0 bottom-0 p-3 bg-neutral-950/80 border-t border-neutral-900">
              <span className="text-[10px] font-mono text-brand-accent font-bold">{lang === "vi" ? "Giao diện Cổng thông tin B2B" : "B2B Portal Interface"}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-wrapper min-h-screen bg-[#0B0B0C] text-neutral-300 flex flex-col font-sans">
      
      {/* HEADER */}
      <header 
        style={{
          display: 'flex',
          height: '76px',
          padding: 'var(--Spacing-Padding-L, 16px) 100px',
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
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-accent">
            <path d="M8 6C6.5 8.5 6 11.5 6 14 C 6 16.5, 6.5 19.5, 8 22" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M12 9.5C11 11 10.5 12.5 10.5 14 C 10.5 15.5, 11 17, 12 18.5" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M16 13C15.8 13.5 15.7 13.8 15.7 14 C 15.7 14.2, 15.8 14.5, 16 15" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" />
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
          <a 
            href="/works" 
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              color: '#22C55E'
            }}
            className="font-bold transition-colors"
          >
            {t.navWork}
            <span 
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '2px',
                backgroundColor: '#22C55E'
              }}
            ></span>
          </a>
          <a 
            href="/about" 
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              color: '#989898'
            }}
            className="hover:text-white transition-colors"
          >
            {t.navAbout}
          </a>
          <a 
            href="/contact" 
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              color: '#989898'
            }}
            className="hover:text-white transition-colors"
          >
            {t.navContact}
          </a>
        </nav>

        {/* Right: Language switch & Available remote badge */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switch */}
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

          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-status-200/50 hover:bg-status-200/10 text-xs text-[#E5E5E5] font-semibold transition-colors duration-150"
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
            <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 text-neutral-400 hover:text-white transition-colors">{t.navContact}</a>
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
          padding: '48px 100px 24px 100px',
          background: '#0B0B0C'
        }}
        className="relative"
      >
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-neutral-400 hover:text-brand-accent hover:translate-x-[-4px] transition-all mb-8"
        >
          <ArrowLeft size={14} /> {t.backToPortfolio}
        </a>

        <div className="flex items-baseline gap-4 w-full" style={{ width: '100%' }}>
          <h1 
            style={{ fontSize: '34px' }}
            className="font-extrabold font-serif tracking-tight text-white leading-tight"
          >
            {t.myWorks}
          </h1>
          <span className="text-brand-accent text-sm font-sans font-bold bg-brand-accent/10 px-3 py-1 rounded-full border border-brand-accent/20">
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
          padding: '48px 100px 40px 100px',
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
          <span className="text-xs font-mono uppercase tracking-widest text-[#E8C468] font-bold">
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
            className="flex flex-col md:flex-row w-full hover:shadow-lg transition-all duration-200"
            style={{
              padding: '48px 100px',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: '24px',
              alignSelf: 'stretch',
              borderRadius: '16px',
              backgroundColor: '#17211B'
            }}
          >
            {/* Title (Left) */}
            <h4 
              style={{
                color: '#E8C468',
                fontFamily: 'var(--font-serif), serif',
                fontSize: '34px',
                fontWeight: 400,
                lineHeight: '51px',
                flexShrink: 0
              }}
              className="w-full md:w-[220px] text-left"
            >
              {t.platformLayer}
            </h4>

            {/* Details area (Right) */}
            <div className="flex flex-col md:flex-row gap-6 w-full items-start flex-1">
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
                <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                  {t.rogoPlatformTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["PaaS", "B2B", "Dashboard", "Whitelabel"].map((tag, idx) => (
                    <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 uppercase tracking-wider">
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
                className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] md:flex-shrink-0 border border-neutral-900/80"
              >
                <Image
                  src="/images/Rogo_IoT_Platform_Dashboard_Interface.png"
                  alt="Rogo IoT Platform v2"
                  fill
                  sizes="(max-width: 768px) 100vw, 388px"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Connector Dot & Line 1 */}
          <div className="flex justify-center relative z-20">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="46" viewBox="0 0 11 46" fill="none">
              <path d="M5.33325 -2.0504e-05C2.38773 -2.06328e-05 -8.14104e-05 2.38779 -8.15392e-05 5.33331C-8.16679e-05 8.27883 2.38773 10.6666 5.33325 10.6666C8.27877 10.6666 10.6666 8.27883 10.6666 5.33331C10.6666 2.38779 8.27877 -2.03752e-05 5.33325 -2.0504e-05ZM5.33325 5.33331L4.33325 5.33331L4.33325 45.3333L5.33325 45.3333L6.33325 45.3333L6.33325 5.33331L5.33325 5.33331Z" fill="#22C55E"/>
            </svg>
          </div>

          {/* Tier 2: Framework layer */}
          <div 
            className="flex flex-col md:flex-row hover:shadow-lg transition-all duration-200"
            style={{
              padding: '48px 100px',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: '24px',
              alignSelf: 'stretch',
              borderRadius: '16px',
              backgroundColor: '#17211B',
              width: 'fit-content',
              maxWidth: '100%',
              margin: '0 auto'
            }}
          >
            {/* Title (Left) */}
            <h4 
              style={{
                color: '#E8C468',
                fontFamily: 'var(--font-serif), serif',
                fontSize: '34px',
                fontWeight: 400,
                lineHeight: '51px',
                flexShrink: 0
              }}
              className="w-full md:w-[220px] text-left"
            >
              {t.frameworkLayer}
            </h4>

            {/* Details area (Right) */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Content Block */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '16px',
                  width: '388px',
                  flexShrink: 0
                }}
                className="w-full md:w-[388px]"
              >
                <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                  {t.raioSmartTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Mobile", "IoT", "Smart Home", "Whitelabel"].map((tag, idx) => (
                    <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 uppercase tracking-wider">
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
                className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] md:flex-shrink-0 border border-neutral-900/80"
              >
                {renderMockup("raio-smart")}
              </div>
            </div>
          </div>

          {/* Connector Dot & Line 2 */}
          <div className="flex justify-center relative z-20">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="46" viewBox="0 0 11 46" fill="none">
              <path d="M5.33325 -2.0504e-05C2.38773 -2.06328e-05 -8.14104e-05 2.38779 -8.15392e-05 5.33331C-8.16679e-05 8.27883 2.38773 10.6666 5.33325 10.6666C8.27877 10.6666 10.6666 8.27883 10.6666 5.33331C10.6666 2.38779 8.27877 -2.03752e-05 5.33325 -2.0504e-05ZM5.33325 5.33331L4.33325 5.33331L4.33325 45.3333L5.33325 45.3333L6.33325 45.3333L6.33325 5.33331L5.33325 5.33331Z" fill="#22C55E"/>
            </svg>
          </div>

          {/* Tier 3: Instance layer */}
          <div 
            className="flex flex-col md:flex-row hover:shadow-lg transition-all duration-200"
            style={{
              padding: '48px 100px',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: '24px',
              alignSelf: 'stretch',
              borderRadius: '16px',
              backgroundColor: '#17211B',
              width: 'fit-content',
              maxWidth: '100%',
              margin: '0 auto'
            }}
          >
            {/* Title (Left) */}
            <h4 
              style={{
                color: '#E8C468',
                fontFamily: 'var(--font-serif), serif',
                fontSize: '34px',
                fontWeight: 400,
                lineHeight: '51px',
                flexShrink: 0
              }}
              className="w-full md:w-[220px] text-left"
            >
              {t.instanceLayer}
            </h4>

            {/* Details area (Right) - Horizontal row side-by-side */}
            <div className="flex flex-col md:flex-row gap-6 items-stretch justify-start">
              
              {/* Instance 1: Austfly */}
              <div 
                style={{ maxWidth: '388px', width: '100%', flexShrink: 0 }}
                className="flex flex-col gap-4"
              >
                {/* Thumbnail Block */}
                <div 
                  style={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}
                  className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] border border-neutral-900/80 flex-shrink-0 mx-auto"
                >
                  {renderMockup("austfly")}
                </div>
                {/* Text Content */}
                <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                  {t.austflyTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Mobile", "IoT", "Smart Home", "Redesign"].map((tag, idx) => (
                    <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {t.austflyDesc}
                </p>
              </div>

              {/* Instance 2: Kangaroo */}
              <div 
                style={{ maxWidth: '388px', width: '100%', flexShrink: 0 }}
                className="flex flex-col gap-4"
              >
                {/* Thumbnail Block */}
                <div 
                  style={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}
                  className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] border border-neutral-900/80 flex-shrink-0 mx-auto"
                >
                  {renderMockup("kangaroo")}
                </div>
                {/* Text Content */}
                <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                  {t.kangarooTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Mobile", "IoT", "Smart Home", "Redesign"].map((tag, idx) => (
                    <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {t.kangarooDesc}
                </p>
              </div>

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
          padding: '40px 100px',
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
          <span className="text-xs font-mono uppercase tracking-widest text-[#E8C468] font-bold">
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
          <div 
            style={{ maxWidth: '388px', width: '100%', flexShrink: 0 }}
            className="transition-all duration-200 flex flex-col gap-4"
          >
            <div 
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
              className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] md:flex-shrink-0 border border-neutral-900/80 mx-auto"
            >
              {renderMockup("thing-flow")}
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif font-bold text-white">
                {t.thingFlowTitle}
              </h3>
              <ArrowUpRight size={18} className="text-brand-accent" />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Mobile", "IoT", "Smart Home", "Redesign"].map((tag, idx) => (
                <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed flex-1">
              {t.thingFlowDesc}
            </p>
          </div>

          {/* Thing Partner */}
          <div 
            style={{ maxWidth: '388px', width: '100%', flexShrink: 0 }}
            className="transition-all duration-200 flex flex-col gap-4"
          >
            <div 
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
              className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] md:flex-shrink-0 border border-neutral-900/80 mx-auto"
            >
              {renderMockup("thing-partner")}
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif font-bold text-white">
                {t.thingPartnerTitle}
              </h3>
              <ArrowUpRight size={18} className="text-brand-accent" />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Mobile", "IoT", "Smart Home", "Redesign"].map((tag, idx) => (
                <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed flex-1">
              {t.thingPartnerDesc}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: OTHER WORK */}
      <section 
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: '40px 100px',
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
          <span className="text-xs font-mono uppercase tracking-widest text-[#E8C468] font-bold">
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
          <div 
            style={{ maxWidth: '388px', width: '100%', flexShrink: 0 }}
            className="transition-all duration-200 flex flex-col gap-4"
          >
            <div 
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
              className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] md:flex-shrink-0 border border-neutral-900/80 mx-auto"
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
              <h3 className="text-xl font-serif font-bold text-white">
                {t.thingAiTitle}
              </h3>
              <ArrowUpRight size={18} className="text-brand-accent" />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Website", "B2B", "Brand Identity"].map((tag, idx) => (
                <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed flex-1">
              {t.thingAiDesc}
            </p>
          </div>

          {/* Antaxi */}
          <div 
            style={{ maxWidth: '388px', width: '100%', flexShrink: 0 }}
            className="transition-all duration-200 flex flex-col gap-4"
          >
            <div 
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
              className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] md:flex-shrink-0 border border-neutral-900/80 mx-auto"
            >
              {renderMockup("antaxi")}
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif font-bold text-white">
                {t.antaxiTitle}
              </h3>
              <ArrowUpRight size={18} className="text-brand-accent" />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Website", "B2B", "Brand Identity"].map((tag, idx) => (
                <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed flex-1">
              {t.antaxiDesc}
            </p>
          </div>

          {/* Labo Viet My */}
          <div 
            style={{ maxWidth: '388px', width: '100%', flexShrink: 0 }}
            className="transition-all duration-200 flex flex-col gap-4"
          >
            <div 
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
              className="w-full aspect-[388/256] md:w-[388px] md:h-[256px] md:flex-shrink-0 border border-neutral-900/80 mx-auto"
            >
              {renderMockup("labo")}
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif font-bold text-white">
                {t.laboTitle}
              </h3>
              <ArrowUpRight size={18} className="text-brand-accent" />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Website", "B2B", "Brand Identity", "Redesign"].map((tag, idx) => (
                <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed flex-1">
              {t.laboDesc}
            </p>
          </div>
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
          padding: '96px 100px',
          background: '#0d0f14'
        }}
        className="relative"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold font-serif text-white mb-8 tracking-tight">
          {t.ctaTitle}
        </h2>
        
        <button
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-2 bg-[#22C55E] hover:bg-[#1f9e4e] text-[#17211B] font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-150 active:scale-95 text-base cursor-pointer"
        >
          <Mail size={18} />
          ktruong2k1@gmail.com
          {copied && <Check size={16} className="text-green-950 ml-1" />}
        </button>

        {copied && (
          <span className="text-brand-accent text-xs font-mono mt-3 animate-fadeIn">
            {t.copySuccess}
          </span>
        )}

        <p className="text-neutral-500 font-mono text-[10px] md:text-[11px] tracking-wider mt-12 uppercase">
          {t.ctaAvailable}
        </p>
      </section>

      {/* FOOTER */}
      <footer 
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: '40px 100px',
          background: '#0B0B0C'
        }}
        className="text-xs text-neutral-500"
      >
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4" style={{ width: '100%' }}>
          <span>© 2026 KT Studio. All rights reserved.</span>
          <div className="flex items-center gap-6 font-semibold">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Dribbble</a>
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

    </div>
  );
}
