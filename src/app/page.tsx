"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Sun, 
  Moon, 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  ArrowRight, 
  ExternalLink, 
  Code, 
  Copy, 
  Check, 
  X, 
  Send,
  Menu,
  ArrowUpRight
} from "lucide-react";
import localProjects from "../../data/projects.json";

interface Project {
  id: string;
  title: string;
  tags: string[];
  summary: string;
  skills: string[];
  coverImage: string;
  period: string;
  tier: number;
  layout: "full" | "half" | "third";
  links: {
    caseStudy?: string;
    figmaUrl?: string;
    liveUrl?: string;
    behanceUrl?: string;
  };
  visible: boolean;
  techTokens?: string[];
  specInfo?: {
    components: string;
    whitelabelConfig: string;
    states: string;
  };
  caseStudyContent?: {
    overview: string;
    problem: string;
    solution: string;
    result: string;
  };
}

const experiencesData = [
  {
    company: "Rogo Solutions",
    role: "UX/UI Product Designer",
    period: "2023 - Hiện tại (3.5 năm)",
    bullets: [
      "Thiết kế end-to-end hệ sinh thái IoT Platform (Rogo Dashboard) quản lý hàng triệu thiết bị thông minh đa thương hiệu.",
      "Xây dựng Master Design System động dựa trên CSS tokens/variables, tối ưu hóa quy trình whitelabel giao diện cho các đối tác lớn như Rạng Đông, FPT Smart Home.",
      "Hợp tác chặt chẽ với Stakeholders, BAs đọc hiểu tài liệu nghiệp vụ, vẽ luồng người dùng (user flow) chi tiết và bàn giao (handoff) chuẩn chỉ trực tiếp cho dev team."
    ]
  },
  {
    company: "Đơn vị Freelance / Thiết kế B2B",
    role: "UX/UI Designer",
    period: "2022 - 2023",
    bullets: [
      "Thực hiện UX Audit, cấu trúc lại sơ đồ thông tin (Information Architecture) cho các dự án ứng dụng di động và website doanh nghiệp B2B.",
      "Thiết kế giao diện website Labo Việt Mỹ nâng cao tỷ lệ đặt răng sứ B2B thêm 40% nhờ biểu mẫu đặt hàng nhanh thông minh.",
      "Thiết kế bộ nhận diện thương hiệu số (Brand Identity) cho startup Thing AI VN đồng bộ trên website và các điểm chạm số."
    ]
  }
];

const translations = {
  vi: {
    name: "Nguyễn Khánh Trường",
    navWork: "Dự án",
    navAbout: "Giới thiệu về tôi",
    navContact: "Liên hệ",
    availableRemote: "Làm việc từ xa",
    heroSubheading: "Tôi thiết kế sản phẩm. Và tôi triển khai nó.",
    heroParagraph: "Nhà thiết kế UX/UI với 3.5 năm kinh nghiệm triển khai các sản phẩm B2B phức tạp — hệ sinh thái IoT, trang quản trị SaaS và các nền tảng whitelabel có khả năng mở rộng cho nhiều đối tác. Tôi sử dụng các công cụ AI để rút ngắn khoảng cách từ thiết kế đến production. Hiện tại đang tìm kiếm các cơ hội làm việc từ xa.",
    emailMe: "Gửi email",
    viewResume: "Xem Resume",
    trustedBy: "Đối tác tin cậy",
    featuredBadge: "Nổi bật",
    moreProjects: "Dự án khác",
    viewAll: "Xem tất cả",
    scrollMore: "Cuộn để xem thêm dự án",
    copied: "Đã sao chép!",
    contactModalTitle: "Gửi tin nhắn cho tôi",
    contactModalDesc: "Viết tin nhắn ngắn gọn. Click gửi sẽ tự động tạo thư nháp gửi tới địa chỉ email quản trị ktruong2k1@gmail.com.",
    contactModalLabel: "Nội dung tin nhắn",
    contactModalPlaceholder: "Chào Trường, tôi muốn liên hệ công việc về...",
    contactModalSubmit: "Gửi mail liên hệ (Draft)",
    "rogo-dashboard-summary": "Bảng điều khiển IoT cấp doanh nghiệp được thiết kế cho quản lý thiết bị đa thương hiệu và mở rộng quy mô đội thiết bị. 4 vai trò người dùng · 3 thương hiệu đối tác · thiết kế và bàn giao end-to-end.",
    "raio-smart-summary": "Ứng dụng nhà thông minh thích ứng với bất kỳ thương hiệu đối tác nào — cùng codebase, nhận diện khác nhau. Thiết kế luồng kết nối thiết bị và giám sát thời gian thực từ con số 0 đến sản phẩm hoàn chỉnh.",
    "austfly-summary": "Đánh giá UX toàn diện ứng dụng di động điều khiển cửa cuốn IoT — tìm kiếm điểm nghẽn, tinh giản thao tác, tái cấu trúc luồng. Kết quả: thao tác chạm ít hơn, sử dụng một tay, phân cấp hình ảnh rõ ràng hơn.",
    "partner-app-summary": "Nghiên cứu thực tế tại nhà xưởng — bao quát toàn bộ vòng đời thiết bị từ firmware đến bảo hành.",
    "thing-ai-summary": "Hệ thống nhận diện thương hiệu cho startup AI — logo, màu sắc và kiểu chữ xây dựng để mở rộng.",
    "labo-viet-my-summary": "Thiết kế website B2B — cấu trúc thông tin và ngôn ngữ hình ảnh chuyên nghiệp cho đối tác y khoa.",
    rogoPlatformTitle: "Rogo IoT Platform v2",
    rogoPlatformDesc: "Rogo Solutions xây dựng và vận hành cốt lõi – bản thân nền tảng cũng được thiết kế whitelabel. Mỗi thương hiệu đối tác nhận được một instance riêng biệt: cùng cấu trúc, cùng trang điều khiển, nhưng mang bản sắc riêng. Logic whitelabel không bắt đầu từ tầng ứng dụng – nó bắt đầu ngay từ đây.",
    raioSmartTitle: "RaIO Smart",
    raioSmartDesc: "Được triển khai và quản lý thông qua Rogo Platform như mọi ứng dụng khác trong hệ sinh thái. Tầng whitelabel phía trên cho phép bất kỳ đối tác nào xuất bản ứng dụng mang thương hiệu riêng của họ – mà không cần xây dựng lại logic cốt lõi bên dưới.",
    austflyTitle: "Austfly Redesign",
    austflyDesc: "Thương hiệu cửa cuốn hàng đầu Việt Nam, đối tác đầu tiên áp dụng framework RaIO ngoài Rạng Đông. Đã được audit UX đầu cuối, xây dựng lại hệ thống phân cấp trực quan – hệ thống thiết kế và thư viện component sẵn sàng sản xuất, đang chờ triển khai."
  },
  en: {
    name: "Nguyen Khanh Truong",
    navWork: "Work",
    navAbout: "About me",
    navContact: "Contact",
    availableRemote: "Available for Remote",
    heroSubheading: "I design the product. Then I ship it.",
    heroParagraph: "UX/UI designer with 3.5 years shipping complex B2B products — IoT ecosystems, SaaS dashboards, and whitelabel platforms built to scale across partners. I use AI tools to close the gap between design and production. Currently open to remote roles.",
    emailMe: "Email me",
    viewResume: "View Resume",
    trustedBy: "Trusted by",
    featuredBadge: "Featured",
    moreProjects: "More Projects",
    viewAll: "View all Projects",
    scrollMore: "Scroll to see more projects",
    copied: "Copied!",
    contactModalTitle: "Send me a message",
    contactModalDesc: "Write a short message. Clicking send will automatically create an email draft to the administrator address ktruong2k1@gmail.com.",
    contactModalLabel: "Message content",
    contactModalPlaceholder: "Hello Truong, I would like to contact you regarding...",
    contactModalSubmit: "Send message (Draft)",
    "rogo-dashboard-summary": "Enterprise-grade IoT Dashboard designed for multibrand device management and fleet scaling.",
    "raio-smart-summary": "Whitelabel smart home app — partner-adaptive UI, complex device onboarding.",
    "austfly-summary": "Full UX audit to hi-fi redesign — fewer steps, one-hand usability.",
    "partner-app-summary": "Field-researched at the factory floor — covers the full device lifecycle from firmware to warranty.",
    "thing-ai-summary": "Visual identity system for an AI startup — logo, color, and type built to scale.",
    "labo-viet-my-summary": "B2B website design — information hierarchy and visual language for a professional audience.",
    rogoPlatformTitle: "Rogo IoT Platform v2",
    rogoPlatformDesc: "Rogo Solutions builds and operates the core – and the platform itself is whitelabelable. Each partner brand gets their own instance: same architecture, same control plane, their own identity. The whitelabel logic doesn't start at the app layer – it starts here.",
    raioSmartTitle: "RaIO Smart",
    raioSmartDesc: "Deployed and managed through Rogo Platform like every app in the ecosystem. The whitelabel layer on top lets any partner ship their own branded app – without rebuilding the core logic underneath.",
    austflyTitle: "Austfly Redesign",
    austflyDesc: "Vietnam's leading roller shutter brand, and the first partner to adopt the RaIO framework outside Rạng Đông. UX audited end-to-end, visual hierarchy rebuilt – design system and component library production-ready, pending implementation."
  }
};

export default function Home() {
  const router = useRouter();
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


  const [darkMode, setDarkMode] = useState(true);
  const [specMode, setSpecMode] = useState(false);
  const [projects, setProjects] = useState<Project[]>(localProjects as Project[]);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isStuck, setIsStuck] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [bannerHeight, setBannerHeight] = useState("64px");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [canTriggerWorksTransition, setCanTriggerWorksTransition] = useState(false);

  // Cooldown timer to prevent scroll momentum from triggering transition instantly
  useEffect(() => {
    if (isAtBottom) {
      const timer = setTimeout(() => {
        setCanTriggerWorksTransition(true);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setCanTriggerWorksTransition(false);
    }
  }, [isAtBottom]);

  // Scroll to works transition
  useEffect(() => {
    // Disable transition redirect for the first 800ms to allow scroll position restoration
    let canRedirect = false;
    const enableTimer = setTimeout(() => {
      canRedirect = true;
    }, 800);

    const handleScrollTransition = () => {
      setScrolledPastHero(window.scrollY > 150);

      // Check if user has scrolled close to the bottom scroll placeholder
      const placeholder = document.getElementById("scroll-placeholder");
      if (placeholder) {
        const rect = placeholder.getBoundingClientRect();
        const startTrigger = window.innerHeight - 64; // height of closed banner
        
        if (rect.top <= startTrigger) {
          setIsStuck(true);

          const scrolledDistance = startTrigger - rect.top;
          const threshold = window.innerHeight * 0.35; // 35% height
          const maxScrollDistance = threshold - 64;
          
          if (!isTransitioning) {
            const progress = Math.min(1, Math.max(0, scrolledDistance / maxScrollDistance));
            setScrollProgress(progress);

            // Dynamically grow height from 64px up to 35% height
            const targetHeight = 64 + progress * maxScrollDistance;
            
            if (progress >= 0.95) {
              setBannerHeight("35vh");
              setIsAtBottom(true);
            } else {
              setBannerHeight(`${targetHeight}px`);
              setIsAtBottom(false);
            }
          }
        } else {
          setIsStuck(false);
          setIsAtBottom(false);
          setScrollProgress(0);
          if (!isTransitioning) {
            setBannerHeight("64px");
          }
        }
      }
    };
    window.addEventListener("scroll", handleScrollTransition);
    return () => {
      clearTimeout(enableTimer);
      window.removeEventListener("scroll", handleScrollTransition);
    };
  }, [router, isTransitioning]);

  // Listen for extra scrolling gesture at the bottom to trigger works page transition
  useEffect(() => {
    if (!isAtBottom || !canTriggerWorksTransition || isTransitioning) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 5) {
        triggerTransition();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touchEndY = e.touches[0].clientY;
        const diffY = touchStartY - touchEndY; // Positive means swipe up (scrolling down)
        if (diffY > 10) {
          triggerTransition();
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        triggerTransition();
      }
    };

    const triggerTransition = () => {
      setIsTransitioning(true);
      setBannerHeight("100vh");
      setScrollProgress(1);
      setTimeout(() => {
        router.push("/works");
      }, 600);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAtBottom, canTriggerWorksTransition, isTransitioning, router]);
  
  // Modals state
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const [copied, setCopied] = useState(false);

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
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  // Copy to clipboard notification
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Apply theme class
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Load latest projects dynamically in dev if available
  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
      })
      .catch(() => {});
  }, []);

  // Keyboard shortcut listener for Spec Mode (Alt + S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        setSpecMode(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // IntersectionObserver to track active section
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight || 600;
      setScrolledPastHero(window.scrollY > heroHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);

    const sections = ["hero", "work", "about", "contact"];
    const observers = sections.map(secId => {
      const el = document.getElementById(secId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(secId);
            }
          });
        },
        { threshold: 0.25, rootMargin: "-80px 0px -20% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach(obs => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUri = `mailto:ktruong2k1@gmail.com?subject=Liên hệ từ Portfolio&body=${encodeURIComponent(contactMessage)}`;
    window.location.href = mailtoUri;
    setContactModalOpen(false);
    setContactMessage("");
  };

  // Render SVG illustrations for cover mockups
  const renderProjectCover = (type: string) => {
    const strokeColor = darkMode ? "#223047" : "#e2e8f0";
    const accentColor = "#2ECC8A";
    
    switch (type) {
      case "dashboard":
        return (
          <img 
            src="/images/rogo_platform.png" 
            alt="Rogo IoT Platform Thumbnail" 
            className="w-full h-full object-cover" 
          />
        );
      case "smarthome":
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
          <img 
            src="/images/austfly.png" 
            alt="Austfly Redesign Thumbnail" 
            className="w-full h-full object-cover" 
          />
        );
      case "factory":
        return (
          <svg className="w-full h-full bg-[#0d1016]" viewBox="0 0 380 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="35" y="35" width="310" height="170" rx="4" fill="#111c30" stroke={strokeColor} strokeWidth="1.5" />
            {/* Sidebar list of devices */}
            <rect x="45" y="45" width="70" height="150" rx="2" fill="#0c101c" stroke={strokeColor} />
            <rect x="50" y="55" width="60" height="6" rx="1.5" fill={accentColor} />
            <rect x="50" y="68" width="60" height="4" rx="1" fill="#223047" />
            <rect x="50" y="78" width="60" height="4" rx="1" fill="#223047" />
            <rect x="50" y="88" width="60" height="4" rx="1" fill="#223047" />
            
            {/* Main Content Area */}
            <rect x="130" y="70" width="200" height="30" rx="4" fill="#13233c" stroke={strokeColor} />
            <rect x="140" y="82" width="140" height="6" rx="3" fill={accentColor} />
            <text x="315" y="88" fill={accentColor} fontSize="8" fontFamily="var(--font-sans), sans-serif" fontWeight="bold">82%</text>
            <text x="140" y="62" fill="#94a3b8" fontSize="6.5" fontFamily="var(--font-sans), sans-serif">Firmware Flashing Status</text>

            <rect x="130" y="115" width="95" height="70" rx="4" fill="#13233c" stroke={strokeColor} />
            <rect x="235" y="115" width="95" height="70" rx="4" fill="#13233c" stroke={strokeColor} />
            <circle cx="177" cy="140" r="10" fill="#22c55e" fillOpacity="0.2" />
            <path d="M 173 140 L 176 143 L 182 137" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
            <text x="177" y="165" fill="#94a3b8" fontSize="6" fontFamily="sans-serif" textAnchor="middle">BLE Connected</text>

            <circle cx="282" cy="140" r="10" fill="#22c55e" fillOpacity="0.2" />
            <path d="M 278 140 L 281 143 L 287 137" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
            <text x="282" y="165" fill="#94a3b8" fontSize="6" fontFamily="sans-serif" textAnchor="middle">Quality Test Pass</text>
          </svg>
        );
      case "branding":
        return (
          <svg className="w-full h-full bg-[#0d1016]" viewBox="0 0 380 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="190" cy="110" r="50" fill="none" stroke={strokeColor} strokeWidth="1" />
            <circle cx="190" cy="110" r="60" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="4 4" />
            {/* Neon infinity Neurons node */}
            <path d="M 150 110 C 150 90, 230 90, 230 110 C 230 130, 150 130, 150 110 Z" fill="none" stroke={accentColor} strokeWidth="3" />
            <circle cx="150" cy="110" r="4" fill="#00D2FF" />
            <circle cx="230" cy="110" r="4" fill="#00D2FF" />
            <circle cx="190" cy="110" r="5" fill={accentColor} />
            <text x="190" y="195" fill="#f8fafc" fontSize="14" fontWeight="900" fontFamily="sans-serif" letterSpacing="5" textAnchor="middle">THING AI</text>
          </svg>
        );
      case "medical":
      default:
        return (
          <img 
            src="/images/labo_viet_my.png" 
            alt="Labo Viet My Thumbnail" 
            className="w-full h-full object-cover" 
          />
        );
    }
  };

  // Render SVG logos for clients with beautiful modern shapes
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

  const featuredProjects = projects.filter(p => p.tier === 1 && p.visible);
  const moreProjects = projects.filter(p => p.tier === 2 && p.visible);

  return (
    <>
      <div 
        className="page-wrapper text-[#E5E5E5] font-sans relative overflow-x-hidden transition-colors duration-300"
        style={{
          opacity: fadeOpacity,
          transform: fadeOpacity < 1 ? `translateY(${(1 - fadeOpacity) * 12}px)` : 'none',
          transition: 'opacity 450ms cubic-bezier(0.215, 0.61, 0.355, 1), transform 450ms cubic-bezier(0.215, 0.61, 0.355, 1)'
        }}
      >
      
      {/* Dev Spec Mode Grid Overlay */}
      {specMode && (
        <div className="fixed inset-0 pointer-events-none z-50 border-4 border-red-500/20">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-sans font-normal px-3 py-1 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
            DEV HANDOFF SPEC MODE: ON
          </div>
          <div className="w-full h-full opacity-[0.03] bg-[linear-gradient(to_right,#ef4444_1px,transparent_1px),linear-gradient(to_bottom,#ef4444_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      )}

      {/* STICKY HEADER */}
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
        <a href="#hero" className="flex items-center gap-2 text-white font-serif font-bold text-[20px] tracking-tight hover:scale-105 transition-transform duration-150">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="header-logo-mask">
              <rect width="28" height="28" fill="white" />
              <path d="M12 0C6 8 6 20 12 28" stroke="black" strokeWidth="2.5" fill="none" />
              <path d="M20 0C14 8 14 20 20 28" stroke="black" strokeWidth="2.5" fill="none" />
            </mask>
            <circle cx="14" cy="14" r="14" fill="#22C55E" mask="url(#header-logo-mask)" />
          </svg>
          <span>khanhtruong_nguyen</span>
        </a>

        {/* Center: Navigation Links (Desktop) - Unselected state on Home Page */}
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
          <Link href="/works" className="nav-item">
            {translations[lang].navWork}
          </Link>
          <Link href="/about" className="nav-item">
            {translations[lang].navAbout}
          </Link>
          <button 
            onClick={() => setContactModalOpen(true)}
            className={`nav-item ${contactModalOpen ? 'active' : ''}`}
          >
            {translations[lang].navContact}
            {contactModalOpen && <span className="nav-item-line" />}
          </button>
        </nav>

        {/* Right Area Badge and Language Switch */}
        <div className="flex items-center gap-4">
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
                <clipPath id="uk-clip-home">
                  <circle cx="10" cy="10" r="10" />
                </clipPath>
                <g clipPath="url(#uk-clip-home)">
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
            {translations[lang].availableRemote}
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-900 text-neutral-400 md:hidden transition-colors"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[76px] left-0 right-0 border-b border-neutral-900 bg-[var(--Colors-Neutral-1000,#181818)] px-6 py-4 flex flex-col gap-4 text-sm font-semibold z-50">
            <a href="/works" onClick={() => setMobileMenuOpen(false)} className="py-2 text-neutral-400 hover:text-white transition-colors">{translations[lang].navWork}</a>
            <a href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-neutral-400 hover:text-white transition-colors">{translations[lang].navAbout}</a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setContactModalOpen(true);
              }} 
              style={{ background: 'none', border: 'none', textAlign: 'left', padding: '8px 0' }}
              className="py-2 text-neutral-400 hover:text-white transition-colors font-sans text-sm font-semibold cursor-pointer"
            >
              {translations[lang].navContact}
            </button>
          </div>
        )}

        {/* Spec Label for Header */}
        {specMode && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-950/20 text-red-400 border-t border-red-200/50 px-[var(--side-padding)] py-1 text-[10px] font-sans font-normal flex items-center justify-between z-40">
            <span>Class: sticky top-0 | Height: 76px</span>
            <span>Padding: py-4 px-120 | Border-B: 1px</span>
          </div>
        )}
      </header>

      {/* MAIN BLURRABLE CONTENT WRAPPER */}
      <div 
        style={{
          filter: isTransitioning ? 'blur(12px)' : (isStuck ? `blur(${scrollProgress * 8}px)` : 'none'),
          transform: isTransitioning ? 'translateY(-120px)' : (isStuck ? `translateY(-${scrollProgress * 60}px)` : 'none'),
          opacity: isTransitioning ? 0 : (isStuck ? 1 - scrollProgress * 0.5 : 1),
          transition: isTransitioning 
            ? 'filter 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)' 
            : 'none'
        }}
      >
        {/* HERO SECTION */}
        <section id="hero" className="w-full px-[var(--side-padding)] pt-[40px] pb-[24px] relative flex justify-center">
        <div 
          className="grid grid-cols-1 md:grid-cols-5 xl:grid-cols-3 gap-8 w-full items-center max-w-[1440px]"
        >
          
          {/* Left Column: Portrait & Text content */}
          <div 
            className="md:col-span-3 xl:col-span-2 flex flex-col md:flex-row items-center gap-6 md:gap-[24px] w-full text-center md:text-left"
            style={{
              flexShrink: 1
            }}
          >
            {/* Portrait Image */}
            <div className="relative w-24 h-24 md:w-[282px] md:h-[338px] flex-shrink-0 rounded-full md:rounded-none overflow-hidden md:overflow-visible aspect-square md:aspect-[136/163] mx-auto md:mx-0">
              <Image
                src="/images/KT_profilie.png"
                alt={lang === "vi" ? "Chân dung Nguyễn Khánh Trường" : "Nguyen Khanh Truong portrait"}
                fill
                priority
                className="object-cover md:object-contain"
                sizes="(max-width: 768px) 96px, 282px"
              />
            </div>

            {/* Biography & Tagline */}
            <div className="flex flex-col gap-4 text-center md:text-left w-full">
              <h1 
                style={{
                  fontSize: 'var(--font-size-hero-title)',
                  lineHeight: '1.4'
                }}
                className="font-bold font-serif text-white"
              >
                {translations[lang].name}
              </h1>
              <h2 
                style={{
                  color: 'var(--Colors-Secondary-300, #E8C468)',
                  fontFamily: 'Fraunces, serif',
                  fontSize: 'var(--font-size-hero-subhead)',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '1.5'
                }}
              >
                {translations[lang].heroSubheading}
              </h2>
              <p 
                style={{ 
                  color: 'var(--Colors-Neutral-500, #989898)',
                  fontFamily: '"Be Vietnam Pro", sans-serif',
                  fontSize: 'var(--font-size-body)',
                  fontWeight: 400,
                  lineHeight: '1.5',
                  width: '100%',
                  alignSelf: 'stretch'
                }}
              >
                {translations[lang].heroParagraph}
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3.5 pt-3 w-full sm:w-auto">
                <button
                  onClick={() => setContactModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3 text-center bg-brand-accent hover:bg-[#27b378] text-[#17211B] font-bold text-[14px] rounded-full transition-all duration-150 active:scale-[0.97] cta-btn"
                >
                  {translations[lang].emailMe}
                </button>
                <a
                  href={lang === "vi" ? "/CV_NguyenKhanhTruong_2026.pdf" : "/CV_NguyenKhanhTruong_EN_2026.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 text-center inline-flex items-center justify-center border border-white/60 hover:bg-white/10 text-white font-bold text-[14px] rounded-full transition-all duration-150 active:scale-[0.97] cta-btn"
                >
                  {translations[lang].viewResume}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Client Logos (Aligned with heading, padding adjusted, initials badge removed) */}
          <div className="md:col-span-2 xl:col-span-1 w-full relative flex flex-col gap-6 py-6 pl-0 pr-2">
            <div className="flex items-center">
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
                className="block"
              >
                {translations[lang].trustedBy}
              </span>
            </div>
 
            {/* Grayscale Client Logos Grid in 3 Columns - Aligned to the left (justify-start) */}
            <div className="grid grid-cols-3 gap-y-8 gap-x-6 items-center">
              {/* Row 1 */}
              <div className="group flex items-center justify-start">{renderBrandLogo("rogo", 32)}</div>
              <div className="group flex items-center justify-start">{renderBrandLogo("fpt", 32)}</div>
              <div className="group flex items-center justify-start">{renderBrandLogo("rangdong", 32)}</div>
 
              {/* Row 2 */}
              <div className="group flex items-center justify-start">{renderBrandLogo("antaxi", 32)}</div>
              <div className="group flex items-center justify-start">{renderBrandLogo("vietin", 32)}</div>
              <div></div>
 
              {/* Row 3 */}
              <div className="group flex items-center justify-start">{renderBrandLogo("vcbs", 32)}</div>
              <div className="group flex items-center justify-start">{renderBrandLogo("think", 32)}</div>
              <div></div>
            </div>
          </div>

        </div>
      </section>

      {/* CORE WORK PORTFOLIO (Featured and More Projects Grid) */}
      <section id="work" className="w-full px-[120px] pt-[24px] pb-[40px] relative flex flex-col items-center">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '32px',
            width: '100%',
            alignItems: 'stretch'
          }}
        >
          
          {/* LEFT COLUMN: FEATURED PROJECTS */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--Spacing-2xl, 32px)',
              alignSelf: 'stretch',
              flexDirection: 'column',
              width: '100%',
              flexShrink: 1
            }}
          >
            
            {/* Project 1: Hero Project (Rogo IoT Platform Box - 2:1 ratio, filling left column) */}
            {featuredProjects[0] && (
              <a 
                href="https://rogo-dashboard-web-v2.vercel.app/login"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group block border border-neutral-900 hover:border-brand-accent rounded-xl bg-[#12141c] overflow-hidden transition-all duration-200 hover:-translate-y-1"
                style={{
                  display: 'flex',
                  width: '100%',
                  minHeight: '260px',
                  height: 'auto',
                  padding: '24px',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexShrink: 0
                }}
              >
                {/* SVG Dashboard Mockup as a semi-transparent background */}
                <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none select-none">
                  {renderProjectCover(featuredProjects[0].coverImage)}
                </div>

                {/* Top Row: Indicators and Logos */}
                <div className="w-full flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <span className="app-chip featured-chip text-[10px] font-bold">
                      {translations[lang].featuredBadge}
                    </span>
                    <span className="app-chip text-[10px] font-bold bg-[#1E1E20] text-neutral-100 border border-neutral-800">
                      PAAS • B2B • Desktop
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 opacity-50 group-hover:opacity-90 transition-opacity duration-200">
                    {renderBrandLogo("rogo", 16)}
                    {renderBrandLogo("rangdong", 16)}
                    {renderBrandLogo("fpt", 16)}
                  </div>
                </div>

                {/* Middle Row: Title & Summary */}
                <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    alignSelf: 'stretch',
                    width: '100%'
                  }}
                  className="z-10 mt-4"
                >
                  <h3 
                    style={{ alignSelf: 'stretch', width: '100%' }}
                    className="text-[24px] font-bold leading-tight text-white font-serif group-hover:text-[#E8C468] transition-colors duration-150"
                  >
                    {translations[lang].rogoPlatformTitle}
                  </h3>

                  {/* Hover content wrapper */}
                  <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:max-h-56 group-hover:opacity-100 mt-0 group-hover:mt-3 flex flex-col gap-3 w-full">
                    <p 
                      style={{ 
                        color: 'var(--Colors-Neutral-500, #989898)',
                        fontFamily: '"Be Vietnam Pro", sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '18px'
                      }}
                      className="text-left"
                    >
                      {translations[lang].rogoPlatformDesc}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {(featuredProjects[0]?.techTokens || []).map((tag, idx) => (
                        <span key={idx} className="app-chip text-[10px] font-sans bg-neutral-900 text-neutral-400 border border-neutral-800 tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* Row holding Cards 2 and 3 */}
            <div 
              style={{
                display: 'flex',
                height: 'auto',
                minHeight: '270px',
                justifyContent: 'center',
                alignItems: 'stretch',
                gap: '16px',
                alignSelf: 'stretch',
                flexShrink: 0
              }}
            >
               {featuredProjects.slice(1, 3).map((proj) => (
                <a
                  href="/pending"
                  key={proj.id}
                  className="relative group block border border-neutral-900 hover:border-brand-accent rounded-xl bg-[#12141c] overflow-hidden transition-all duration-200 hover:-translate-y-1"
                  style={{
                    display: 'flex',
                    flex: '1 1 0%',
                    minHeight: '270px',
                    height: 'auto',
                    padding: '16px',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexShrink: 1
                  }}
                >
                  {/* Background mockup graphic */}
                  <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none select-none">
                    {renderProjectCover(proj.coverImage)}
                  </div>

                  {/* Top Row: Indicators and Logo */}
                  <div className="w-full flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <span className="app-chip featured-chip text-[9px] font-bold">
                        {translations[lang].featuredBadge}
                      </span>
                      <span className="app-chip text-[9px] font-bold bg-[#1E1E20] text-neutral-100 border border-neutral-800">
                        IoT • Mobile
                      </span>
                    </div>
                    
                    <div className="flex-shrink-0 flex items-center z-10">
                      {proj.id === "raio-smart" ? (
                        <div className="opacity-50 group-hover:opacity-90 transition-opacity duration-200">
                          {renderBrandLogo("rangdong", 16)}
                        </div>
                      ) : (
                        <div className="opacity-50 group-hover:opacity-90 transition-opacity duration-200">
                          <svg width="64" height="16" viewBox="0 0 64 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-400 group-hover:text-white transition-colors duration-150">
                            <g fill="currentColor">
                              <rect x="1" y="3" width="9" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1" />
                              <line x1="1" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="0.6" />
                              <line x1="1" y1="9" x2="10" y2="9" stroke="currentColor" strokeWidth="0.6" />
                              <text x="12" y="11" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="6.5" letterSpacing="0.2">AUSTDOOR</text>
                            </g>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Row: Text Cluster */}
                  <div 
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '0px',
                      alignSelf: 'stretch',
                      width: '100%'
                    }}
                    className="z-10 mt-3 w-full text-left"
                  >
                    {/* Green tag above title, only visible on hover */}
                    <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:max-h-6 group-hover:opacity-100 mb-0 group-hover:mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#22C55E]">
                        {proj.id === "raio-smart" ? "SMART HOME" : "REDESIGN"}
                      </span>
                    </div>

                    <h4 
                      style={{ alignSelf: 'stretch', width: '100%' }}
                      className="text-[24px] font-bold leading-tight text-white font-serif group-hover:text-[#E8C468] transition-colors duration-150"
                    >
                      {proj.id === "raio-smart" 
                        ? translations[lang].raioSmartTitle 
                        : translations[lang].austflyTitle}
                    </h4>

                    {/* Description, only visible on hover */}
                    <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100 mt-0 group-hover:mt-2">
                      <p 
                        style={{ 
                          color: 'var(--Colors-Neutral-500, #989898)',
                          fontFamily: '"Be Vietnam Pro", sans-serif',
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '18px'
                        }}
                      >
                        {proj.id === "raio-smart" 
                          ? translations[lang].raioSmartDesc
                          : translations[lang].austflyDesc}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: MORE PROJECTS & SIDEBAR QUOTE */}
          <div className="flex flex-col gap-8 w-full flex-shrink h-full">
            
            {/* More Projects block */}
            <div className="flex flex-col gap-6 w-full h-full">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
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
                >
                  {translations[lang].moreProjects}
                </span>
                <a 
                  href="/works" 
                  style={{
                    color: 'var(--Colors-Primary-400, #22C55E)',
                    fontFamily: '"Be Vietnam Pro", sans-serif',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '18px',
                    textAlign: 'center'
                  }}
                  className="inline-flex items-center gap-1 hover:opacity-85 transition-opacity"
                >
                  {translations[lang].viewAll} <ArrowRight size={14} strokeWidth={2.5} />
                </a>
              </div>

              {/* Sidebar list items */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 'var(--Spacing-m, 16px)',
                  flex: '1 1 0%',
                  width: '100%'
                }}
              >
                {moreProjects.map((proj) => (
                  <a
                    href={proj.id === "thing-ai" ? "https://thing.ai.vn/" : "/pending"}
                    target={proj.id === "thing-ai" ? "_blank" : undefined}
                    rel={proj.id === "thing-ai" ? "noopener noreferrer" : undefined}
                    key={proj.id}
                    style={{
                      display: 'flex',
                      padding: '16px',
                      alignItems: 'center',
                      gap: '16px',
                      alignSelf: 'stretch',
                      borderRadius: '12px',
                      background: '#1E1E1E',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      flex: '1 1 0%'
                    }}
                    className="transition-all duration-150 relative group block hover:bg-[#252525] hover:border-brand-accent/30"
                  >
                    <div className="flex items-center gap-4 w-full">
                      {/* Small Mockup Thumbnail (96x64px, radius 4px) */}
                      <div 
                        style={{ borderRadius: '4px' }} 
                        className="w-24 h-16 flex items-center justify-center flex-shrink-0 overflow-hidden bg-[#2C2C2E] relative border border-neutral-800"
                      >
                        <img 
                          src={
                            proj.id === "partner-app" 
                              ? "/images/thing_partner.png" 
                              : proj.id === "thing-ai" 
                                ? "/images/Thing_AI_VN.png" 
                                : "/images/labo_viet_my.png"
                          }
                          alt={proj.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          style={{ borderRadius: '4px' }}
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-full text-left">
                        <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-neutral-400">
                          {proj.tags.join(" · ")}
                        </span>
                        <h4 className="text-[18px] font-serif font-bold text-white group-hover:text-[#E8C468] transition-colors duration-150 leading-snug">
                          {proj.title}
                        </h4>
                        <p className="text-[13px] font-sans text-neutral-400 font-normal leading-normal mt-0.5">
                          {translations[lang][`${proj.id}-summary` as keyof typeof translations.vi] || proj.summary}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Static scroll placeholder at the bottom of the home content */}
      <div 
        id="scroll-placeholder"
        style={{ 
          background: '#0B0B0C',
          height: '35vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: '20px'
        }}
      >
        {!isStuck && (
          <div 
            style={{
              color: '#E8C468',
              fontFamily: 'var(--font-serif), serif',
              fontWeight: 'bold',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span className="animate-bounce inline-block">↓</span>
            <span>{translations[lang].scrollMore}</span>
          </div>
        )}
      </div>
      </div>

      {/* STICKY BOTTOM BANNER */}
      {isStuck && (
        <div 
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            background: isTransitioning 
              ? '#0D2B22' 
              : 'url(/images/scroll_background.png) no-repeat center bottom / 100% 100%',
            padding: '20px 120px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            zIndex: 9999,
            color: '#E8C468',
            fontFamily: 'var(--font-serif), serif',
            fontWeight: 'bold',
            fontSize: '24px',
            height: bannerHeight,
            transition: isTransitioning 
              ? 'height 600ms cubic-bezier(0.16, 1, 0.3, 1), background-color 600ms ease'
              : 'none'
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              opacity: isTransitioning ? 0 : 1,
              transition: 'opacity 300ms ease'
            }}
          >
            <span className="animate-bounce inline-block">↓</span>
            <span>{translations[lang].scrollMore}</span>
          </div>
        </div>
      )}

      {/* 
      All sections below (About, Timeline, Skills, Contact, Footer) are hidden per design request
      */}
      {false && (
        <>
          {/* ABOUT SECTION */}
          <section id="about" className="w-full bg-slate-50 dark:bg-[var(--Colors-Neutral-1000,#181818)] px-[120px] py-[40px] relative">
            {specMode && (
              <div className="absolute top-2 left-[120px] bg-red-600/10 border border-red-500/30 text-red-500 text-[9px] font-mono px-2 py-0.5 rounded">
                Section #about | Proportions: 2 columns Bio (Left) vs How I Work (Right)
              </div>
            )}

            <div className="w-full grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16">
              <div className="flex flex-col gap-6">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-500 font-bold">About</span>
                <h3 className="text-3xl font-extrabold font-serif tracking-tight dark:text-white leading-tight">
                  Full-Stack Designer: <br />
                  <span className="text-slate-500 dark:text-slate-400">UX → code → ship.</span>
                </h3>

                <div className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed flex flex-col gap-4">
                  <p>
                    I&apos;m a UX/UI designer with <strong>3.5 years building complex products</strong> — IoT ecosystems, SaaS dashboards, whitelabel platforms.
                  </p>
                  <p>
                    I work end-to-end: from sitting with stakeholders and reading BA docs, to shipping production UI with Gemini CLI and Vercel.
                  </p>
                  <p>
                    Currently at <strong>Rogo Solutions</strong>. Open to remote product roles.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 text-brand-500 text-xs font-semibold w-fit border border-brand-500/10">
                  <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse"></span>
                  Available for remote roles — June 2026
                </div>
              </div>

              <div className="flex flex-col gap-8 bg-white dark:bg-[#0d1425] p-8 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl">
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200/60 dark:border-slate-800/80 pb-3">
                  How I work
                </h4>

                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-brand-500 block mb-1">01.</span>
                    <span className="font-bold text-sm block dark:text-white mb-1">Understand the system</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Stakeholder interview, BA doc review, API mapping — before opening Figma.
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-brand-500 block mb-1">02.</span>
                    <span className="font-bold text-sm block dark:text-white mb-1">Design for handoff, not presentation</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      UX spec linked directly to API flow. Dev doesn&apos;t have to guess.
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-brand-500 block mb-1">03.</span>
                    <span className="font-bold text-sm block dark:text-white mb-1">Ship when possible</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      If scope allows: code the UI, deploy, verify in production.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CORE EXPERIENCE WORK TIMELINE */}
          <section className="w-full px-[120px] py-[40px] relative border-b border-slate-200/60 dark:border-slate-800/50">
            <div className="flex flex-col items-center text-center gap-3 mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-500 font-bold">Timeline</span>
              <h3 className="text-3xl font-extrabold font-serif tracking-tight dark:text-white">Quá Trình Làm Việc</h3>
            </div>

            <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-6 space-y-12">
              {experiencesData.map((exp, index) => (
                <div key={index} className="relative pl-8 md:pl-10 group">
                  <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full border-4 border-white dark:border-[#090d16] bg-slate-300 dark:bg-slate-700 group-hover:bg-brand-500 transition-colors duration-205 flex items-center justify-center" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-lg font-bold tracking-tight dark:text-white flex items-center gap-2">
                        {exp.company}
                        {index === 0 && (
                          <span className="px-2 py-0.5 text-[9px] font-semibold bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 rounded-full border border-brand-500/20">
                            Hiện tại
                          </span>
                        )}
                      </h4>
                      <span className="text-xs text-brand-600 dark:text-brand-400 font-semibold">{exp.role}</span>
                    </div>
                    <span className="text-xs font-mono font-medium px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 w-fit">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {exp.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2.5 leading-relaxed">
                        <span className="text-brand-500 text-lg leading-[1] mt-0.5">•</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* CORE SKILLS SECTION */}
          <section id="skills" className="w-full bg-slate-50 dark:bg-[var(--Colors-Neutral-1000,#181818)] px-[120px] py-[40px] relative border-b border-slate-200/60 dark:border-slate-800/50">
            <div className="w-full">
              <div className="flex flex-col items-center text-center gap-3 mb-16">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-500 font-bold">Skills</span>
                <h3 className="text-3xl font-extrabold font-serif tracking-tight dark:text-white">Core Skills</h3>
              </div>

              <div className="flex flex-col gap-6 bg-white dark:bg-[#0d1425] p-8 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl">
                {[
                  { cat: "UX Process", items: ["Wireframe", "Usability testing", "Stakeholder interview", "Business analysis", "User flow", "UX audit & redesign"] },
                  { cat: "UI Craft", items: ["Design system", "Whitelabel UI", "Hi-fi prototype", "Style guide & token", "Component library", "Dev handoff"] },
                  { cat: "Domain", items: ["IoT / Smart home", "SaaS B2B", "Management dashboard", "Role-based access UX", "Onboarding flow"] },
                  { cat: "Tools", items: ["Figma", "Illustrator", "Claude AI", "Gemini CLI", "GitHub", "Vercel", "Jira / Trello"] }
                ].map((skillGrp, index) => (
                  <div key={index} className="grid md:grid-cols-[160px_1fr] gap-4 py-4 border-b border-slate-100 dark:border-slate-800/50 last:border-0">
                    <span className="font-bold text-sm dark:text-white">{skillGrp.cat}</span>
                    <div className="flex flex-wrap gap-2">
                      {skillGrp.items.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs px-3 py-1 bg-slate-50 dark:bg-[#13233c] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800/80 hover:border-brand-500 hover:text-brand-500 rounded-lg transition-colors duration-150"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section id="contact" className="w-full px-[120px] py-[40px] text-center relative">
            <div className="flex flex-col items-center gap-6 max-w-xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-500 font-bold">Contact</span>
              <h2 className="text-4xl md:text-5xl font-extrabold font-serif dark:text-white">
                Let&apos;s work together.
              </h2>

              <button
                onClick={() => handleCopy("ktruong2k1@gmail.com", "contact-email")}
                className="text-lg md:text-xl font-mono font-bold tracking-tight text-brand-accent hover:underline inline-flex items-center gap-2 cursor-pointer transition-all active:scale-95 animate-pulse"
                title="Click to copy email address"
              >
                ktruong2k1@gmail.com
                {copiedText === "contact-email" ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-slate-400" />}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setContactModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-brand-accent hover:bg-[#27b378] text-[#17211B] font-semibold px-6 py-3 rounded-xl hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-150"
                >
                  Send me a message →
                </button>
                <a 
                  href="https://www.linkedin.com/in/nguyen-khanh-truong-designer/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-200 font-semibold px-6 py-3"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://www.behance.net/nguyenkhanhtr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-200 font-semibold px-6 py-3"
                >
                  Behance
                </a>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="w-full px-[120px] py-[40px] border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
              <span>© 2026 {translations[lang].name}. All rights reserved.</span>
              <div className="flex items-center gap-4 font-mono text-[10px]">
                <span>ENV: PRODUCTION</span>
                <span>SHIPPED via Gemini CLI</span>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>


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

    </>
  );
}
