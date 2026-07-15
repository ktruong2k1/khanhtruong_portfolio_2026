"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowUpRight, ArrowRight, Mail, Check, X, Menu, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Bilingual translations dictionary
const translations = {
  vi: {
    navWork: "Dự án",
    navAbout: "Giới thiệu về tôi",
    navContact: "Liên hệ",
    availableRemote: "Làm việc từ xa",
    backHome: "Quay lại Trang chủ",
    viewResume: "Xem Resume",
    aboutMeTitle: "Giới thiệu bản thân",
    name: "Nguyễn Khánh Trường",
    experienceYears: "3,5 năm kinh nghiệm UX/UI Designer",
    bio: "Product Designer & Engineer với 3,5 năm kinh nghiệm thiết kế các hệ sinh thái IoT hiệu năng cao, nền tảng SaaS và dashboard kỹ thuật. Tôi kết nối khoảng cách giữa dữ liệu phức tạp và trải nghiệm người dùng trực quan.",
    downloadCvVi: "Tải CV – Tiếng Việt",
    downloadCvEn: "Tải CV – Tiếng Anh",
    experienceTitle: "Kinh nghiệm",
    featuredWorkTitle: "Dự án nổi bật",
    viewAllProject: "Xem tất cả dự án",
    howProductMadeTitle: "Cách một sản phẩm thực sự được tạo ra",
    howProductMadeDesc: "Quy trình của tôi không phải là một danh sách kiểm tra. Đó là một tập hợp các nguyên tắc thích ứng với bất kỳ nhu cầu thực tế nào của dự án — chạy nước rút startup hay triển khai doanh nghiệp lớn, làm việc độc lập hay đội ngũ liên chức năng, ưu tiên Figma hay ưu tiên API. Bốn điều dưới đây luôn xảy ra. Thứ tự và mức độ quan trọng sẽ thay đổi tùy thuộc vào bối cảnh.",
    expertiseTitle: "Chuyên môn",
    eduCertTitle: "Giáo dục & Chứng chỉ",
    designCraft: "Thiết kế mỹ thuật",
    designCraftTitle: "Chứng chỉ ADIM FPT Arena Multimedia • 2022–2024",
    designCraftDesc: "Đào tạo thiết kế trực quan bài bản — thiết kế đồ họa, bố cục, kiểu chữ và sản xuất truyền thông số.",
    uxAiPractice: "Thực hành UX & AI",
    googleUxTitle: "Chứng chỉ nghề nghiệp Google UX Design Professional • 2024",
    googleUxDesc: "Phương pháp luận UX toàn diện (end-to-end) — nghiên cứu, xây dựng wireframe, thiết kế prototype và kiểm thử độ khả dụng. Chứng chỉ tiêu chuẩn ngành.",
    googleAiTitle: "Chứng chỉ nghề nghiệp Google AI Essentials • 2025",
    googleAiDesc: "Ứng dụng AI vào quy trình làm việc thực tế — liên kết trực tiếp với việc sử dụng Claude AI và Gemini CLI trong các dự án hiện tại.",
    techFoundation: "Nền tảng kỹ thuật",
    hanoiUniTitle: "Đại học Công nghiệp Hà Nội • Kỹ thuật điện tử & viễn thông • 2019–2023",
    hanoiUniDesc: "Nền tảng kỹ thuật điện tử & viễn thông — liên quan trực tiếp đến tư duy thiết kế hệ thống IoT.",
    language: "Ngôn ngữ",
    toeicTitle: "Tiếng Anh • TOEIC 850 (B2)",
    toeicDesc: "Tự tin làm việc với khách hàng nói tiếng Anh và các đội ngũ làm việc từ xa.",
    letsWork: "Hãy cùng hợp tác.",
    trustedBy: "Đối tác tin cậy",
    
    // Featured works data translations
    rogoPlatformTitle: "Rogo IoT Platform v2",
    rogoPlatformDesc: "Rogo Solutions xây dựng và vận hành cốt lõi – bản thân nền tảng cũng được thiết kế whitelabel. Mỗi thương hiệu đối tác nhận được một instance riêng biệt: cùng cấu trúc, cùng trang điều khiển, nhưng mang bản sắc riêng. Logic whitelabel không bắt đầu từ tầng ứng dụng – nó bắt đầu ngay từ đây.",
    raioSmartTitle: "RaIO Smart",
    raioSmartDesc: "Được triển khai và quản lý thông qua Rogo Platform như mọi ứng dụng khác trong hệ sinh thái. Tầng whitelabel phía trên cho phép bất kỳ đối tác nào xuất bản ứng dụng mang thương hiệu riêng của họ – mà không cần xây dựng lại logic cốt lõi bên dưới.",
    austflyTitle: "Ứng dụng IoT Austfly",
    austflyDesc: "Thương hiệu cửa cuốn hàng đầu Việt Nam, đối tác đầu tiên áp dụng framework RaIO ngoài Rạng Đông. Đã được audit UX đầu cuối, xây dựng lại hệ thống phân cấp trực quan – hệ thống thiết kế và thư viện component sẵn sàng sản xuất, đang chờ triển khai."
  },
  en: {
    navWork: "Work",
    navAbout: "About me",
    navContact: "Contact",
    availableRemote: "Available for Remote",
    backHome: "Back to Home",
    viewResume: "View Resume",
    aboutMeTitle: "About me",
    name: "Nguyen Khanh Truong",
    experienceYears: "3,5 years UX/UI Designer",
    bio: "Product Designer & Engineer with 3,5 years of experience crafting high-performance IoT ecosystems, SaaS platforms, and technical dashboards. I bridge the gap between complex data and intuitive human experiences.",
    downloadCvVi: "Download CV – Tiếng Việt",
    downloadCvEn: "Download CV – English",
    experienceTitle: "Experience",
    featuredWorkTitle: "Featured Work",
    viewAllProject: "View all project",
    howProductMadeTitle: "How a product actually gets made",
    howProductMadeDesc: "My process isn't a checklist. It's a set of principles that adapt to whatever the project actually needs — startup sprint or enterprise rollout, solo or cross-functional team, Figma-first or API-first. The four things below always happen. The order and weight shift depending on context.",
    expertiseTitle: "Expertise",
    eduCertTitle: "Education & Certifications",
    designCraft: "Design Craft",
    designCraftTitle: "FPT Arena Multimedia ADIM Certificate • 2022–2024",
    designCraftDesc: "Formal visual design training — graphic design, layout, typography, and digital media production.",
    uxAiPractice: "UX & AI Practice",
    googleUxTitle: "Google UX Design Professional Google Career Certificate • 2024",
    googleUxDesc: "End-to-end UX methodology — research, wireframing, prototyping, and usability testing. Industry-standard certification.",
    googleAiTitle: "Google AI Essentials Google Career Certificate • 2025",
    googleAiDesc: "Applied AI in real workflows — directly maps to Claude AI and Gemini CLI usage in current projects.",
    techFoundation: "Technical Foundation",
    hanoiUniTitle: "Hanoi University of Industry • Electronics & Telecommunications Engineering • 2019–2023",
    hanoiUniDesc: "Electronics & Telecommunications Engineering background — directly relevant to IoT system design",
    language: "Language",
    toeicTitle: "English • TOEIC 850 (B2)",
    toeicDesc: "Comfortable working with English-speaking clients and remote teams.",
    letsWork: "Let's work together.",
    trustedBy: "Trusted by",

    // Featured works data translations
    rogoPlatformTitle: "Rogo IoT Platform v2",
    rogoPlatformDesc: "Rogo Solutions builds and operates the core – and the platform itself is whitelabelable. Each partner brand gets their own instance: same architecture, same control plane, their own identity. The whitelabel logic doesn't start at the app layer – it starts here.",
    raioSmartTitle: "RaIO Smart",
    raioSmartDesc: "Deployed and managed through Rogo Platform like every app in the ecosystem. The whitelabel layer on top lets any partner ship their own branded app – without rebuilding the core logic underneath.",
    austflyTitle: "Austfly IoT App",
    austflyDesc: "Vietnam's leading roller shutter brand, and the first partner to adopt the RaIO framework outside Rạng Đông. UX audited end-to-end, visual hierarchy rebuilt – design system and component library production-ready, pending implementation."
  }
};

export default function AboutPage() {
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const isInitialMount = useRef(true);
  const [pendingLang, setPendingLang] = useState<"vi" | "en" | null>(null);
  const [transitionStage, setTransitionStage] = useState<"idle" | "fading-in" | "fading-out">("idle");
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
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

  const t = translations[lang];

  const renderBrandLogo = (brand: string, customHeight: number = 40) => {
    let src = "";
    let alt = "";
    switch (brand) {
      case "rogo":
        src = "/images/Rogo_color.svg";
        alt = "Rogo Solutions";
        break;
      case "fpt":
        src = "/images/FPTSmartHome_color.svg";
        alt = "FPT Smart Home";
        break;
      case "rangdong":
        src = "/images/RangDong_color.svg";
        alt = "Rạng Đông";
        break;
      case "antaxi":
        src = "/images/Antaxi_color.svg";
        alt = "An Taxi";
        break;
      case "vietin":
        src = "/images/VietinBankS_color.svg";
        alt = "VietinBank Securities";
        break;
      case "vcbs":
        src = "/images/VCBS_color.svg";
        alt = "VCBS";
        break;
      case "think":
        src = "/images/Think_Action_color.svg";
        alt = "Think & Action";
        break;
      default:
        return null;
    }
    return (
      <Image
        src={src}
        alt={alt}
        width={customHeight * 5}
        height={customHeight}
        style={{ height: `${customHeight}px`, maxHeight: `${customHeight}px` }}
        className="w-auto object-contain brightness-0 invert opacity-50 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 hover:brightness-100 hover:invert-0 hover:opacity-100 transition-all duration-250 ease-in-out"
      />
    );
  };

  const renderMockup = (type: string) => {
    switch (type) {
      case "dashboard":
        return (
          <Image
            src="/images/rogo_platform.png"
            alt="Rogo IoT Platform v2"
            fill
            sizes="(max-width: 768px) 100vw, 388px"
            className="object-cover hover:scale-105 transition-transform duration-300"
            priority
          />
        );
      case "raio-smart":
        return (
          <Image
            src="/images/raio.png"
            alt="RaIO Smart"
            fill
            sizes="(max-width: 768px) 100vw, 388px"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        );
      case "austfly":
        return (
          <Image
            src="/images/austfly.png"
            alt="Austfly IoT App"
            fill
            sizes="(max-width: 768px) 100vw, 388px"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        );
      default:
        return null;
    }
  };

  // Timeline jobs data based on layout
  const jobs = [
    {
      role: "UI/UX Product Designer",
      company: "Rogo Solutions",
      period: lang === "vi" ? "Tháng 7, 2024 – Hiện tại" : "Jul 2024 – Present",
      current: true,
      bullets: lang === "vi" ? [
        "Thiết kế hệ sinh thái IoT & SaaS đầu cuối (end-to-end) — lo-fi → wireframe → hi-fi → design token → bàn giao developer — trên 3+ sản phẩm chủ lực trong một nền tảng duy nhất.",
        "Dẫn dắt các buổi phỏng vấn bên liên quan và phiên phân tích nghiệp vụ trực tiếp với khách hàng và BA đối tác, chuyển đổi yêu cầu kinh doanh thành đặc tả UX gắn với luồng API thực tế.",
        "Xây dựng hệ thống Whitelabel UI tự động thích ứng nhận diện thương hiệu (logo, màu sắc, favicon, component theming) cho từng đối tác; kiến trúc phân quyền UX đa cấp (admin / operator / partner / user).",
        "Bàn giao mã nguồn UI bằng Gemini CLI và triển khai qua Vercel, rút ngắn đáng kể chu kỳ thiết kế → sản xuất."
      ] : [
        "Designed an IoT & SaaS ecosystem end-to-end — lo-fi → wireframe → hi-fi → design token → developer handoff — across 3+ flagship products within a single platform.",
        "Led stakeholder interviews and BA sessions directly with clients and partner BAs, translating business requirements into UX specs tied to actual API flows.",
        "Built a whitelabel UI system that adapts brand identity (logo, colour, favicon, component theming) per partner; architected multi-level role-based UX (admin / operator / partner / user).",
        "Shipped UI code using Gemini CLI and deployed via Vercel, reducing the design → production cycle significantly."
      ]
    },
    {
      role: "Web & Graphic Designer",
      company: "Think & Action Agency",
      period: lang === "vi" ? "Tháng 8, 2023 – Tháng 10, 2024" : "Aug 2023 – Oct 2024",
      current: false,
      bullets: lang === "vi" ? [
        "Thiết kế website, landing page và các chiến dịch hình ảnh cho các khách hàng B2B trong lĩnh vực tài chính và bất động sản.",
        "Bàn giao ấn phẩm truyền thông thương hiệu và hình ảnh cho Chứng khoán VietinBank (CTS) và Chứng khoán Vietcombank (VCBS): hình ảnh chủ đạo chiến dịch, tài liệu sự kiện.",
        "Xây dựng hệ thống component và bố cục UX cho dashboard web ZNS nội bộ; làm việc trực tiếp với quản lý khách hàng và đối tác."
      ] : [
        "Designed websites, landing pages, and visual campaigns for B2B clients in finance and real estate.",
        "Delivered brand and visual communication for VietinBank Securities (CTS) and Vietcombank Securities (VCBS): campaign key visuals, event materials.",
        "Built a component system and UX layout for an internal ZNS web dashboard; worked directly with account managers and clients."
      ]
    },
    {
      role: "Part-time UX/UI Design Intern",
      company: "FPT Software – DES Department",
      period: "2022",
      current: false,
      bullets: lang === "vi" ? [
        "Hỗ trợ đội ngũ thiết kế nội bộ chuẩn bị mockup UI, tài nguyên đồ họa và tài liệu bàn giao kỹ thuật cho các dự án phần mềm doanh nghiệp.",
        "Tích lũy kinh nghiệm thực tế về quy trình làm việc Agile và cộng tác liên chức năng với các đội ngũ kỹ thuật."
      ] : [
        "Supported the internal design team with UI mockups, assets, and handoff documentation for enterprise software projects.",
        "Gained hands-on experience with Agile workflows and cross-functional collaboration with engineering teams."
      ]
    }
  ];

  // How a product gets made steps
  const steps = [
    { 
      num: "01", 
      title: lang === "vi" ? "Thống nhất định hướng trước khi bắt đầu" : "Align the room before the work begins",
      desc: lang === "vi" 
        ? "Trước khi vẽ bất cứ điều gì, mọi người trong phòng cần phải nhìn thấy cùng một sản phẩm. Điều đó có nghĩa là ngồi lại với các bên liên quan, đọc tài liệu BA, thiết lập sơ đồ luồng API – và đặt đủ câu hỏi cho đến khi không còn sự mơ hồ nào. Thiết kế được xây dựng dựa trên các giả định sẽ tốn kém chi phí sửa chữa hơn nhiều so với thời gian bỏ ra để thống nhất từ đầu."
        : "Before anything gets drawn, everyone in the room needs to see the same product. That means sitting with stakeholders, reading BA docs, mapping API flows – and asking enough questions until the ambiguity runs out. Design built on assumptions costs more to fix than the time it takes to align.",
      image: "/images/process_step_1.jpg"
    },
    { 
      num: "02", 
      title: lang === "vi" ? "Định hình sản phẩm trước khi thiết kế" : "Decide the product before designing it",
      desc: lang === "vi"
        ? "Yêu cầu ban đầu hiếm khi đầy đủ. Nền tảng, ngữ cảnh người dùng và các luồng cốt lõi cần phải được chốt trước khi có wireframe — và những quyết định đó trông sẽ khác nhau ở mỗi dự án. Ứng dụng di động dùng trên sàn nhà máy là một sản phẩm khác với phiên bản máy tính dùng trong văn phòng hành chính, ngay cả khi có các tính năng giống hệt nhau. Việc tìm ra sản phẩm này thực chất thuộc loại nào cần được thực hiện trước tiên."
        : "The brief rarely arrives complete. Platform, user context, and core flows need to be locked before wireframes exist — and those decisions look different on every project. Mobile on a factory floor is a different product than desktop in a back office, even with identical features. Figuring out which one this actually is comes first.",
      image: "/images/process_step_2.jpg"
    },
    { 
      num: "03", 
      title: lang === "vi" ? "Triển khai song song, bàn giao chuẩn chỉ" : "Execute in parallel, hand off clean",
      desc: lang === "vi"
        ? "Wireframe được chuyển đi nhanh nhất có thể theo tiến độ tư duy — để quá trình phát triển có thể bắt đầu trong khi thiết kế vẫn tiếp tục. Các lộ trình song song giúp phát hiện sớm vấn đề trước khi chi phí khắc phục trở nên đắt đỏ. Khi đến lúc bàn giao, định dạng sẽ thích ứng với đội ngũ: tệp Figma, tài liệu kỹ thuật viết tay, chú thích liên kết API hoặc hướng dẫn trực tiếp. Định dạng thay đổi, nhưng tiêu chuẩn thì không: lập trình viên không cần phải quay lại hỏi thêm câu hỏi."
        : "Wireframes go out as fast as the thinking allows — so development can begin while design keeps going. Parallel tracks surface problems before they're expensive to fix. When it's time to hand off, the format adapts to the team: Figma file, written spec, API-tied annotation, or a live walkthrough. The format changes. The standard doesn't: dev shouldn't need to come back with questions.",
      image: "/images/process_step_3.jpg"
    },
    { 
      num: "04", 
      title: lang === "vi" ? "Tiếp tục hỗ trợ vận hành sau bàn giao" : "Keep moving after handoff",
      desc: lang === "vi"
        ? "Sau bàn giao, trọng tâm sẽ dịch chuyển — chứ không dừng lại. Việc đó trông như thế nào tùy thuộc vào dự án: giai đoạn tiếp theo, vấn đề lân cận, chức năng mới cần nghiên cứu hoặc một vòng lặp phản hồi nhanh nếu đội phát triển gặp phải vấn đề bất ngờ. Công việc phát triển liên tục cùng với sự trưởng thành của sản phẩm."
        : "After handoff, the focus shifts — not stops. What that looks like depends on the project: next phase, adjacent problem, new functionality to research, or a fast feedback loop if dev hits something unexpected. The work evolves with the product.",
      image: "/images/process_step_4.jpg"
    }
  ];

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
              color: contactModalOpen ? '#989898' : '#22C55E'
            }}
            className={contactModalOpen ? "hover:text-white transition-colors" : "font-bold transition-colors"}
          >
            {t.navAbout}
            {!contactModalOpen && (
              <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: '#22C55E' }}></span>
            )}
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
                <clipPath id="uk-clip-about">
                  <circle cx="10" cy="10" r="10"/>
                </clipPath>
                <g clipPath="url(#uk-clip-about)">
                  <circle cx="10" cy="10" r="10" fill="#012169"/>
                  <path d="M0 0 L20 20 M20 0 L0 20" stroke="#FFFFFF" strokeWidth="2.5"/>
                  <path d="M0 0 L20 20 M20 0 L0 20" stroke="#C8102E" strokeWidth="1.2"/>
                  <path d="M10 0 V20 M0 10 H20" stroke="#FFFFFF" strokeWidth="4.5"/>
                  <path d="M10 0 V20 M0 10 H20" stroke="#C8102E" strokeWidth="2.5"/>
                </g>
              </svg>
              <span className="hidden md:inline">ENG</span>
            </button>
          </div>

          <div 
            style={{
              display: 'flex',
              padding: '6px 14px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px',
              borderRadius: '9999px',
              border: '1px solid rgba(46, 204, 138, 0.20)',
              background: 'rgba(46, 204, 138, 0.10)',
              height: '32px'
            }}
            className="hidden md:flex"
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%' }} className="bg-[#2ECC8A]"></span>
            <span 
              style={{
                color: '#FFF',
                fontFamily: '"Be Vietnam Pro", sans-serif',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '15px',
              }}
            >
              {t.availableRemote}
            </span>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-neutral-900 text-neutral-400 md:hidden transition-colors"
        >
          {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[76px] left-0 right-0 border-b border-neutral-900 bg-[var(--Colors-Neutral-1000,#181818)] px-6 py-4 flex flex-col gap-4 text-sm font-semibold z-50">
            <Link href="/works" onClick={() => setMobileMenuOpen(false)} className="py-2 text-neutral-400 hover:text-white transition-colors">{t.navWork}</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-brand-accent transition-colors">{t.navAbout}</Link>
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

      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full">
        
        {/* HERO SECTION */}
        <section 
          style={{
            width: '100%',
            padding: '48px 120px',
            background: '#0B0B0C'
          }}
          className="relative"
        >
          {/* Back button */}
          <Link 
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
            <ArrowLeft size={16} /> {t.viewResume}
          </Link>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold font-serif tracking-tight text-white mb-10 leading-tight">
            {t.aboutMeTitle}
          </h1>

          {/* Two-Column split layout using Tailwind flexbox */}
          <div className="about-hero-flex-container relative z-10 w-full">
            {/* Left: Avatar (25% on desktop) */}
            <div className="about-hero-left-flex flex justify-start">
              <div 
                style={{
                  width: '282px',
                  height: '338px',
                  position: 'relative'
                }}
              >
                <Image 
                  src="/images/KT_profilie.png"
                  alt="Nguyen Khanh Truong avatar"
                  fill
                  sizes="282px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right: Info (75% on desktop) */}
            <div className="about-hero-right-flex">
              <h2 className="text-3xl md:text-[34px] font-extrabold font-serif tracking-tight text-white leading-tight mb-4">
                {t.name}
              </h2>
              <div 
                style={{ 
                  color: 'var(--Colors-Secondary-300, #E8C468)',
                  fontFamily: 'Fraunces, serif',
                  fontSize: '20px',
                  fontWeight: 700,
                  lineHeight: '30px'
                }}
                className="mb-4 block"
              >
                {t.experienceYears}
              </div>
              <p 
                style={{
                  display: 'block',
                  width: '100%',
                  maxWidth: '640px'
                }}
                className="text-neutral-400 text-sm md:text-[15px] leading-relaxed mb-6"
              >
                {t.bio}
              </p>

              {/* Action CV Buttons */}
              <div className="flex flex-wrap gap-4 w-full">
                <a 
                  href="/CV_NguyenKhanhTruong_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: 'var(--Colors-Primary-400, #22C55E)',
                    color: '#0B0B0C',
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    lineHeight: '18px',
                    padding: '12px 24px',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  className="hover:bg-[#1f9e4e] transition-all duration-150 cursor-pointer active:scale-95 text-center"
                >
                  <Download size={16} /> {t.downloadCvVi}
                </a>
                <a 
                  href="/CV_NguyenKhanhTruong_EN_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    border: '1.5px solid var(--Colors-Primary-400, #22C55E)',
                    color: 'var(--Colors-Primary-400, #22C55E)',
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    lineHeight: '18px',
                    padding: '11px 23px',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  className="hover:bg-brand-accent/5 transition-all duration-150 cursor-pointer active:scale-95 text-center"
                >
                  <Download size={16} /> {t.downloadCvEn}
                </a>
              </div>
            </div>
          </div>

          {/* Watermark Logo */}
          <div className="absolute right-[50px] top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none hidden xl:block z-0">
            <svg width="340" height="340" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <mask id="hero-watermark-mask-about">
                <rect width="28" height="28" fill="white" />
                <path d="M12 0C6 8 6 20 12 28" stroke="black" strokeWidth="2.5" fill="none" />
                <path d="M20 0C14 8 14 20 20 28" stroke="black" strokeWidth="2.5" fill="none" />
              </mask>
              <circle cx="14" cy="14" r="14" fill="currentColor" mask="url(#hero-watermark-mask-about)" />
            </svg>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section 
          style={{
            width: '100%',
            padding: '48px 120px',
            background: '#0B0B0C'
          }}
          className="relative border-t border-neutral-950/60 about-exp-grid"
        >
          {/* Left: Section Title */}
          <div>
            <h2 className="text-3xl font-extrabold font-serif tracking-tight text-white">
              {t.experienceTitle}
            </h2>
          </div>

          {/* Right: Jobs list */}
          <div className="w-full">
            {jobs.map((job, index) => (
              <div key={index} className="flex gap-6 w-full mb-10 last:mb-0">
                {/* Timeline line and dot */}
                <div className="flex flex-col items-center flex-shrink-0 relative w-6">
                  {/* Vertical connector line */}
                  {index < jobs.length - 1 && (
                    <div 
                      style={{
                        position: 'absolute',
                        top: '24px',
                        bottom: '-48px',
                        width: '2px',
                        backgroundColor: '#1E293B'
                      }}
                    />
                  )}
                  {/* Dot */}
                  <div 
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: job.current ? '#22C55E' : 'transparent',
                      border: job.current ? 'none' : '2px solid rgba(34, 197, 94, 0.4)',
                      marginTop: '6px',
                      zIndex: 10
                    }}
                  />
                </div>

                {/* Job Content */}
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between w-full mb-2">
                    <h3 className="text-xl font-bold font-serif text-white">
                      {job.role}
                    </h3>
                    <span 
                      style={{ color: 'var(--Colors-Secondary-300, #E8C468)' }}
                      className="text-xs font-sans font-medium"
                    >
                      {job.period}
                    </span>
                  </div>
                  
                  <div className="text-sm font-sans text-brand-accent font-semibold mb-3">
                    {job.company}
                  </div>

                  <ul className="ml-4">
                    {job.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-xs md:text-sm text-neutral-400 leading-relaxed list-disc mb-2">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRUSTED BY LOGOS */}
        <section 
          style={{
            width: '100%',
            background: '#0B0B0C',
            textAlign: 'center',
            paddingTop: '48px',
            paddingBottom: '48px'
          }}
          className="relative border-t border-neutral-950/60"
        >
          <span 
            style={{
              color: 'var(--Colors-Neutral-500, #989898)',
              fontFamily: '"Be Vietnam Pro", sans-serif',
              fontSize: '12px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '15px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
            className="text-center block mb-8"
          >
            {translations[lang].trustedBy}
          </span>
          <div className="marquee-container">
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .marquee-container {
                overflow: hidden;
                width: 100%;
                position: relative;
                display: flex;
                align-items: center;
                mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
                -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
              }
              .marquee-track {
                display: flex;
                width: max-content;
                gap: 48px;
                animation: marquee 25s linear infinite;
              }
              .marquee-track:hover {
                animation-play-state: paused;
              }
            ` }} />
            <div className="marquee-track flex items-center">
              {[...["rogo", "fpt", "rangdong", "antaxi", "vietin", "vcbs", "think"], ...["rogo", "fpt", "rangdong", "antaxi", "vietin", "vcbs", "think"]].map((brand, idx) => (
                <div 
                  key={`${brand}-${idx}`} 
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                  className="group"
                >
                  {renderBrandLogo(brand, 40)}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED WORK SECTION */}
        <section 
          style={{
            width: '100%',
            padding: '48px 120px',
            background: '#0B0B0C'
          }}
          className="relative border-t border-neutral-950/60"
        >
          <div className="flex items-center justify-between mb-8 border-b border-neutral-900 pb-4">
            <h2 className="text-3xl font-extrabold font-serif tracking-tight text-white">
              {t.featuredWorkTitle}
            </h2>
            <Link href="/works" className="text-brand-accent text-sm font-bold inline-flex items-center gap-1.5 hover:underline">
              {t.viewAllProject} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="about-work-grid w-full">
            {/* Card 1: Rogo IoT Platform */}
            <div className="group cursor-pointer mb-8 md:mb-0">
              <div className="w-full aspect-[388/256] border border-neutral-900 rounded-2xl overflow-hidden relative mb-4">
                {renderMockup("dashboard")}
              </div>
              <div>
                <div className="flex items-center justify-between w-full mb-2">
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-brand-accent transition-colors duration-150">
                    {t.rogoPlatformTitle}
                  </h3>
                  <ArrowUpRight size={18} className="text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {["PaaS", "B2B", "Dashboard", "Whitelabel"].map((tag, idx) => (
                    <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                  {t.rogoPlatformDesc}
                </p>
              </div>
            </div>

            {/* Card 2: RaIO Smart */}
            <div className="group cursor-pointer mb-8 md:mb-0">
              <div className="w-full aspect-[388/256] border border-neutral-900 rounded-2xl overflow-hidden relative mb-4">
                {renderMockup("raio-smart")}
              </div>
              <div>
                <div className="flex items-center justify-between w-full mb-2">
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-brand-accent transition-colors duration-150">
                    {t.raioSmartTitle}
                  </h3>
                  <ArrowUpRight size={18} className="text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {["Mobile", "IoT", "Smart Home", "Whitelabel"].map((tag, idx) => (
                    <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                  {t.raioSmartDesc}
                </p>
              </div>
            </div>

            {/* Card 3: Austfly IoT App */}
            <div className="group cursor-pointer">
              <div className="w-full aspect-[388/256] border border-neutral-900 rounded-2xl overflow-hidden relative mb-4">
                {renderMockup("austfly")}
              </div>
              <div>
                <div className="flex items-center justify-between w-full mb-2">
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-brand-accent transition-colors duration-150">
                    {t.austflyTitle}
                  </h3>
                  <ArrowUpRight size={18} className="text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {["Mobile", "IoT", "Smart Home", "Redesign"].map((tag, idx) => (
                    <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                  {t.austflyDesc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW A PRODUCT GETS MADE */}
        <section 
          style={{
            width: '100%',
            padding: '48px 120px',
            background: '#0B0B0C'
          }}
          className="relative border-t border-neutral-950/60"
        >
          <div 
            style={{
              width: '100%',
              maxWidth: '896px',
              marginBottom: '40px'
            }}
          >
            <h2 className="text-3xl font-extrabold font-serif text-white mb-3">
              {t.howProductMadeTitle}
            </h2>
            <p 
              style={{
                display: 'block',
                width: '100%',
                maxWidth: '640px'
              }}
              className="text-neutral-400 text-sm leading-relaxed mt-2"
            >
              {t.howProductMadeDesc}
            </p>
          </div>

          <div className="about-process-grid w-full">
            {steps.map((step, index) => {
              const hasBorder = index % 2 === 1; // Card 02 (index 1) and Card 04 (index 3)
              const isHovered = hoveredStep === index;
              const isAnyHovered = hoveredStep !== null;
              const isOtherHovered = hoveredStep !== null && hoveredStep !== index;
              
              return (
                <div 
                  key={index}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => setHoveredStep(hoveredStep === index ? null : index)}
                  style={{
                    padding: '24px',
                    borderRadius: '12px',
                    backgroundColor: isHovered 
                      ? (hasBorder ? '#161617' : '#1e2f25')
                      : (hasBorder ? '#0B0B0C' : '#17211B'),
                    border: isHovered 
                      ? (hasBorder ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(34, 197, 94, 0.3)')
                      : (hasBorder ? '1px solid rgba(34, 197, 94, 0.2)' : '1px solid transparent'),
                    opacity: isOtherHovered ? 0.6 : 1,
                    transition: 'all 350ms cubic-bezier(0.25, 1, 0.5, 1)',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    overflow: 'hidden'
                  }}
                  className={`about-process-card transition-all duration-300 ${isHovered ? 'is-expanded' : ''} ${isAnyHovered ? 'any-expanded' : ''}`}
                >
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {/* Default State (Visible when NOT hovered) */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: isHovered ? 0 : 1,
                        visibility: isHovered ? 'hidden' : 'visible',
                        transition: 'opacity 300ms cubic-bezier(0.25, 1, 0.5, 1), visibility 300ms',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'between',
                        height: '100%'
                      }}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div 
                            style={{
                              color: 'var(--Colors-Secondary-300, #E8C468)',
                              fontFamily: 'Fraunces, serif',
                              fontSize: '36px',
                              fontWeight: 700,
                              lineHeight: '40px',
                              marginBottom: '24px'
                            }}
                          >
                            {step.num}
                          </div>
                          <h3 
                            style={{
                              color: '#FFF',
                              fontFamily: 'Fraunces, serif',
                              fontSize: '24px',
                              fontWeight: 700,
                              lineHeight: '30px'
                            }}
                          >
                            {step.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Hovered State (Visible when hovered) */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: isHovered ? 1 : 0,
                        visibility: isHovered ? 'visible' : 'hidden',
                        transition: 'opacity 400ms cubic-bezier(0.25, 1, 0.5, 1) 50ms, transform 400ms cubic-bezier(0.25, 1, 0.5, 1) 50ms, visibility 400ms',
                        transform: isHovered ? 'translateY(0)' : 'translateY(15px)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        gap: '16px'
                      }}
                    >
                      {/* Header: Number and Title side-by-side */}
                      <div className="flex items-start gap-4">
                        <div 
                          style={{
                            color: 'var(--Colors-Secondary-300, #E8C468)',
                            fontFamily: 'Fraunces, serif',
                            fontSize: '36px',
                            fontWeight: 700,
                            lineHeight: '40px',
                            flexShrink: 0
                          }}
                        >
                          {step.num}
                        </div>
                        <h3 
                          style={{
                            color: '#FFF',
                            fontFamily: 'Fraunces, serif',
                            fontSize: '24px',
                            fontWeight: 700,
                            lineHeight: '30px',
                            paddingTop: '4px'
                          }}
                        >
                          {step.title}
                        </h3>
                      </div>
                      
                      {/* Description */}
                      <p 
                        style={{ fontSize: '14px' }}
                        className="text-neutral-400 leading-relaxed mt-2"
                      >
                        {step.desc}
                      </p>

                      {/* Thumbnail Image */}
                      <div 
                        style={{
                          width: '100%',
                          maxWidth: '388px',
                          aspectRatio: '388/256',
                          borderRadius: '12px',
                          position: 'relative',
                          overflow: 'hidden',
                          marginTop: 'auto',
                          border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        <Image 
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 388px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EXPERTISE SECTION */}
        <section 
          style={{
            width: '100%',
            padding: '48px 120px',
            background: '#0B0B0C'
          }}
          className="relative border-t border-neutral-950/60"
        >
          <h2 className="text-3xl font-extrabold font-serif tracking-tight text-white mb-8">
            {t.expertiseTitle}
          </h2>

          <div className="about-expert-grid w-full">
            {/* Column 1 */}
            <div className="mb-6 md:mb-0">
              <div className="border-b border-neutral-850 pb-2 mb-4">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-400">
                  UX PROCESS
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {["Stakeholder interview", "Business analysis", "User research Wireframing", "Usability testing", "UX audit & redesign"].map((skill, idx) => (
                  <span key={idx} className="app-chip text-xs bg-[#12221a]/60 text-[#2ECC8A] border border-[#2ECC8A]/20 py-1.5 px-3 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div className="mb-6 md:mb-0">
              <div className="border-b border-neutral-850 pb-2 mb-4">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-400">
                  UI CRAFT
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {["Design system", "Style guide & token", "Whitelabel UI Hi-fi prototype", "Dev handoff spec"].map((skill, idx) => (
                  <span key={idx} className="app-chip text-xs bg-[#12221a]/60 text-[#2ECC8A] border border-[#2ECC8A]/20 py-1.5 px-3 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 3 */}
            <div className="mb-6 md:mb-0">
              <div className="border-b border-neutral-850 pb-2 mb-4">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-400">
                  DOMAIN
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {["IoT / Smart home", "SaaS", "PaaS", "Mobile", "Desktop"].map((skill, idx) => (
                  <span key={idx} className="app-chip text-xs bg-[#12221a]/60 text-[#2ECC8A] border border-[#2ECC8A]/20 py-1.5 px-3 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 4 */}
            <div>
              <div className="border-b border-neutral-850 pb-2 mb-4">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-400">
                  TOOLS
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {["Figma", "Illustrator", "Claude AI", "Antigravity CLI", "GitHub", "Vercel"].map((skill, idx) => (
                  <span key={idx} className="app-chip text-xs bg-[#12221a]/60 text-[#2ECC8A] border border-[#2ECC8A]/20 py-1.5 px-3 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS SECTION */}
        <section 
          style={{
            width: '100%',
            padding: '48px 120px',
            background: '#0B0B0C'
          }}
          className="relative border-t border-neutral-950/60"
        >
          <h2 className="text-3xl font-extrabold font-serif tracking-tight text-white mb-8">
            {t.eduCertTitle}
          </h2>

          <div className="about-edu-grid w-full items-stretch">
            {/* Left Card: Design & UX/AI */}
            <div 
              style={{
                backgroundColor: '#12141c',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '32px'
              }}
              className="mb-6 lg:mb-0"
            >
              <div className="mb-6">
                <span className="text-xs font-sans text-brand-accent font-semibold block mb-2">
                  {t.designCraft}
                </span>
                <h3 
                  style={{ color: 'var(--Colors-Secondary-300, #E8C468)' }}
                  className="text-lg font-serif font-bold mb-2 leading-snug"
                >
                  {t.designCraftTitle}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {t.designCraftDesc}
                </p>
              </div>

              <div 
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  paddingTop: '24px'
                }}
              >
                <span style={{ color: 'var(--Colors-Secondary-300, #E8C468)' }} className="text-xs font-sans font-bold block mb-4">
                  {t.uxAiPractice}
                </span>
                <div className="mb-4">
                  <h4 className="text-white text-sm font-sans font-bold mb-2">
                    {t.googleUxTitle}
                  </h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {t.googleUxDesc}
                  </p>
                </div>
                <div>
                  <h4 className="text-white text-sm font-sans font-bold mb-2">
                    {t.googleAiTitle}
                  </h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {t.googleAiDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Cards Column */}
            <div className="flex flex-col gap-6 items-stretch justify-between">
              {/* Hanoi University of Industry Card */}
              <div 
                style={{
                  backgroundColor: '#12141c',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '32px',
                  display: 'flex',
                  flex: '1 1 0%'
                }}
                className="flex-col md:flex-row md:items-center gap-6"
              >
                <div className="flex-1">
                  <span className="text-xs font-sans text-brand-accent font-semibold block mb-2">
                    {t.techFoundation}
                  </span>
                  <h3 
                    style={{ color: 'var(--Colors-Secondary-300, #E8C468)' }}
                    className="text-lg font-serif font-bold leading-snug"
                  >
                    {t.hanoiUniTitle}
                  </h3>
                </div>
                <div className="flex-1 border-t md:border-t-0 md:border-l border-neutral-800 pt-4 md:pt-0 md:pl-6">
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {t.hanoiUniDesc}
                  </p>
                </div>
              </div>

              {/* Language Card */}
              <div 
                style={{
                  backgroundColor: '#12141c',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '32px',
                  flex: '1 1 0%'
                }}
              >
                <div className="mb-3">
                  <span className="text-xs font-sans text-brand-accent font-semibold block mb-2">
                    {t.language}
                  </span>
                  <h3 
                    style={{ color: 'var(--Colors-Secondary-300, #E8C468)' }}
                    className="text-lg font-serif font-bold leading-snug"
                  >
                    {t.toeicTitle}
                  </h3>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {t.toeicDesc}
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* GREEN LET'S WORK TOGETHER BANNER */}
        <section 
          style={{
            width: '100%',
            padding: '48px 120px',
            background: '#0B0B0C'
          }}
          className="relative"
        >
          <div 
            style={{
              backgroundColor: '#22C55E',
              borderRadius: '24px',
              padding: '64px 24px',
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center'
            }}
            className="group"
          >
            {/* Watermark Logo */}
            <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none select-none z-0">
              <svg width="280" height="280" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <mask id="banner-watermark-mask-about">
                  <rect width="28" height="28" fill="white" />
                  <path d="M12 0C6 8 6 20 12 28" stroke="black" strokeWidth="2.5" fill="none" />
                  <path d="M20 0C14 8 14 20 20 28" stroke="black" strokeWidth="2.5" fill="none" />
                </mask>
                <circle cx="14" cy="14" r="14" fill="currentColor" mask="url(#banner-watermark-mask-about)" />
              </svg>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold font-serif text-[#0b0b0c] text-center mb-8 relative z-10">
              {t.letsWork}
            </h2>
            <button
              onClick={handleCopyEmail}
              style={{
                backgroundColor: '#0B0B0C',
                color: 'var(--Colors-Primary-400, #22C55E)',
                border: 'none',
                borderRadius: '9999px',
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
              className="hover:bg-[#1a1a1c] transition-all duration-150 active:scale-95 relative z-10 shadow-lg mx-auto"
            >
              <Mail size={16} />
              ktruong2k1@gmail.com
              {copied && <Check size={14} className="text-brand-accent ml-1" />}
            </button>
            {copied && (
              <span className="text-green-950 text-center text-xs font-semibold mt-2.5 block relative z-10">
                {lang === "vi" ? "Đã sao chép email!" : "Email copied!"}
              </span>
            )}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer 
        style={{
          display: 'flex',
          padding: '48px 120px',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'stretch',
          background: '#0B0B0C',
          borderTop: '1px solid #181818'
        }}
        className="w-full text-xs text-neutral-500 font-sans flex-col md:flex-row gap-4"
      >
        <span>© 2026 KT Studio. All rights reserved.</span>
        <div className="flex gap-6 font-semibold">
          <a href="https://www.linkedin.com/in/nguyen-khanh-truong-designer/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://www.behance.net/nguyenkhanhtr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Behance</a>
          <Link href="/works" className="hover:text-white transition-colors">Archive</Link>
        </div>
      </footer>

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
              className="w-full md:w-5/12 border-b md:border-b-0 md:border-r border-neutral-850 pb-8 md:pb-0"
            >
              <div className="flex items-center gap-4 mb-6">
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
