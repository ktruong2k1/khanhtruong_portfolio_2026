"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
  Menu
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
    navWork: "Dự án",
    navAbout: "Giới thiệu",
    navContact: "Liên hệ",
    availableRemote: "Làm việc từ xa",
    heroSubheading: "Tôi thiết kế sản phẩm. Và tôi triển khai nó.",
    heroParagraph: "Kết nối khoảng cách giữa tầm nhìn thẩm mỹ độ phân giải cao và khả năng kỹ thuật mạnh mẽ cho các nền tảng doanh nghiệp & IoT.",
    emailMe: "Gửi email",
    viewResume: "Xem Resume",
    trustedBy: "ĐỐI TÁC TIN CẬY",
    featuredBadge: "NỔI BẬT",
    moreProjects: "DỰ ÁN KHÁC",
    viewAll: "Xem tất cả",
    scrollMore: "↓ Cuộn để xem thêm dự án",
    copied: "Đã sao chép!",
    contactModalTitle: "Gửi tin nhắn cho tôi",
    contactModalDesc: "Viết tin nhắn ngắn gọn. Click gửi sẽ tự động tạo thư nháp gửi tới địa chỉ email quản trị ktruong2k1@gmail.com.",
    contactModalLabel: "Nội dung tin nhắn",
    contactModalPlaceholder: "Chào Trường, tôi muốn liên hệ công việc về...",
    contactModalSubmit: "Gửi mail liên hệ (Draft)",
    "rogo-dashboard-summary": "Bảng điều khiển IoT cấp doanh nghiệp được thiết kế cho quản lý thiết bị đa thương hiệu và mở rộng quy mô đội thiết bị. 4 vai trò người dùng · 3 thương hiệu đối tác · thiết kế và bàn giao end-to-end.",
    "raio-smart-summary": "Ứng dụng nhà thông minh thích ứng với bất kỳ thương hiệu đối tác nào — cùng codebase, nhận diện khác nhau. Thiết kế luồng kết nối thiết bị và giám sát thời gian thực từ con số 0 đến sản phẩm hoàn chỉnh.",
    "austfly-summary": "Đánh giá UX toàn diện ứng dụng di động điều khiển cửa cuốn IoT — tìm kiếm điểm nghẽn, tinh giản thao tác, tái cấu trúc luồng. Kết quả: thao tác chạm ít hơn, sử dụng một tay, phân cấp hình ảnh rõ ràng hơn.",
    "partner-app-summary": "Thiết kế cho nhà xưởng sản xuất — nghiên cứu thực địa tại chỗ, sau đó xây dựng trải nghiệm UX cho 6 giai đoạn vòng đời thiết bị từ đầu đến cuối.",
    "thing-ai-summary": "Hệ thống nhận diện thương hiệu cho startup AI — logo, màu sắc, kiểu chữ, xây dựng để mở rộng đồng bộ trên mọi điểm chạm.",
    "labo-viet-my-summary": "Thiết kế trang web B2B — cấu trúc thông tin hợp lý, hệ thống bố cục và ngôn ngữ hình ảnh chuyên nghiệp dành cho đối tác y khoa."
  },
  en: {
    navWork: "Work",
    navAbout: "About",
    navContact: "Contact",
    availableRemote: "Available for Remote",
    heroSubheading: "I design the product. Then I ship it.",
    heroParagraph: "Bridging the gap between high-fidelity aesthetic vision and rigorous technical execution for enterprise and IoT platforms.",
    emailMe: "Email me",
    viewResume: "View Resume",
    trustedBy: "TRUSTED BY",
    featuredBadge: "FEATURED",
    moreProjects: "MORE PROJECTS",
    viewAll: "View all",
    scrollMore: "↓ Scroll for more projects",
    copied: "Copied!",
    contactModalTitle: "Send me a message",
    contactModalDesc: "Write a short message. Clicking send will automatically create an email draft to the administrator address ktruong2k1@gmail.com.",
    contactModalLabel: "Message content",
    contactModalPlaceholder: "Hello Truong, I would like to contact you regarding...",
    contactModalSubmit: "Send message (Draft)",
    "rogo-dashboard-summary": "Enterprise-grade IoT Dashboard designed for multibrand device management and fleet scaling.",
    "raio-smart-summary": "Whitelabel smart home app — partner-adaptive UI, complex device onboarding.",
    "austfly-summary": "Full UX audit to hi-fi redesign — fewer steps, one-hand usability.",
    "partner-app-summary": "Designed for the factory floor — researched on-site, then built UX for 6 device lifecycle stages end-to-end.",
    "thing-ai-summary": "Visual identity system for an AI startup — logo, color, type, built to scale across touchpoints.",
    "labo-viet-my-summary": "B2B website design — information hierarchy, layout system, and visual language for a professional audience."
  }
};

export default function Home() {
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const [darkMode, setDarkMode] = useState(true);
  const [specMode, setSpecMode] = useState(false);
  const [projects, setProjects] = useState<Project[]>(localProjects as Project[]);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Modals state
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  
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
          <svg className="w-full h-full bg-[#0d1016]" viewBox="0 0 380 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="15" width="350" height="210" rx="6" fill="#121824" stroke={strokeColor} strokeWidth="1.5" />
            <line x1="85" y1="15" x2="85" y2="225" stroke={strokeColor} strokeWidth="1.5" />
            {/* Sidebar menu items */}
            <rect x="25" y="30" width="45" height="6" rx="2" fill={accentColor} fillOpacity="0.8" />
            <rect x="25" y="50" width="45" height="5" rx="1.5" fill="#223047" />
            <rect x="25" y="65" width="45" height="5" rx="1.5" fill="#223047" />
            <rect x="25" y="80" width="45" height="5" rx="1.5" fill="#223047" />
            
            {/* Search/Header bar */}
            <rect x="100" y="30" width="100" height="8" rx="3" fill="#223047" />
            
            {/* Client Logos inside Dashboard Mockup Top-Right */}
            <g transform="translate(242, 28)" opacity="0.6">
              {/* ROGO */}
              <g transform="translate(0, 0)">
                <rect x="0" y="3" width="1" height="4" rx="0.5" transform="rotate(-30 0 3)" fill="#fff" />
                <rect x="2" y="2" width="1" height="6" rx="0.5" transform="rotate(-30 2 2)" fill="#fff" />
                <rect x="4" y="1" width="1" height="8" rx="0.5" transform="rotate(-30 4 1)" fill="#fff" />
                <text x="7" y="6" fill="#fff" fontSize="4.5" fontWeight="bold" fontFamily="var(--font-sans), sans-serif">ROGO</text>
              </g>
              {/* Rạng Đông */}
              <g transform="translate(32, 0)">
                <circle cx="3.5" cy="4" r="3.2" stroke="#fff" strokeWidth="0.5" fill="none" />
                <text x="8" y="6" fill="#fff" fontSize="4.5" fontWeight="bold" fontFamily="var(--font-sans), sans-serif">Rạng Đông</text>
              </g>
              {/* FPT */}
              <g transform="translate(72, 0)">
                <text x="0" y="6" fill="#fff" fontSize="5.5" fontWeight="bold" fontStyle="italic" fontFamily="var(--font-sans), sans-serif">FPT</text>
                <text x="11" y="6" fill="#fff" fontSize="3" fontFamily="var(--font-sans), sans-serif">Smart Home</text>
              </g>
            </g>

            {/* Content widgets */}
            <rect x="100" y="55" width="115" height="60" rx="4" fill="#13233c" stroke={strokeColor} strokeWidth="1" />
            <rect x="230" y="55" width="120" height="60" rx="4" fill="#13233c" stroke={strokeColor} strokeWidth="1" />
            <circle cx="120" cy="75" r="10" fill={accentColor} fillOpacity="0.15" />
            <circle cx="120" cy="75" r="4" fill={accentColor} />
            <rect x="140" y="70" width="55" height="4" rx="1" fill="#334155" />
            <rect x="100" y="130" width="250" height="80" rx="4" fill="#13233c" stroke={strokeColor} strokeWidth="1" />
            <path d="M 110 190 L 150 160 L 190 175 L 240 145 L 290 165 L 340 140" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "smarthome":
        return (
          <svg className="w-full h-full bg-[#0d1016]" viewBox="0 0 380 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background Phone */}
            <rect x="75" y="40" width="95" height="175" rx="10" fill="#111c30" stroke={strokeColor} strokeWidth="1.5" />
            <rect x="110" y="45" width="25" height="3" rx="1.5" fill={strokeColor} />
            <circle cx="122.5" cy="80" r="15" fill={accentColor} fillOpacity="0.08" />
            <circle cx="122.5" cy="80" r="3" fill={accentColor} />
            <rect x="90" y="110" width="30" height="30" rx="4" fill="#13233c" stroke={strokeColor} />
            <rect x="125" y="110" width="30" height="30" rx="4" fill="#13233c" stroke={strokeColor} />
            <rect x="90" y="150" width="30" height="30" rx="4" fill="#13233c" stroke={strokeColor} />
            <rect x="125" y="150" width="30" height="30" rx="4" fill="#13233c" stroke={strokeColor} />
            
            {/* Foreground Phone */}
            <rect x="195" y="25" width="95" height="180" rx="12" fill="#0d1424" stroke={accentColor} strokeWidth="1.8" />
            <rect x="227.5" y="31" width="30" height="3.5" rx="1.8" fill={strokeColor} />
            <circle cx="242.5" cy="70" r="18" fill={accentColor} fillOpacity="0.15" />
            <path d="M 238 66 C 238 62, 247 62, 247 66 C 247 70, 242.5 73, 242.5 77" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="242.5" cy="80" r="1.2" fill={accentColor} />
            <rect x="207.5" y="105" width="32" height="32" rx="5" fill="#13233c" stroke={strokeColor} />
            <rect x="247.5" y="105" width="32" height="32" rx="5" fill="#13233c" stroke={strokeColor} />
            <rect x="207.5" y="145" width="32" height="32" rx="5" fill="#13233c" stroke={strokeColor} />
            <rect x="247.5" y="145" width="32" height="32" rx="5" fill="#13233c" stroke={strokeColor} />
            <circle cx="223.5" cy="121" r="5" fill={accentColor} />
            <circle cx="263.5" cy="121" r="5" fill="#223047" />
          </svg>
        );
      case "austfly":
        return (
          <svg className="w-full h-full bg-[#0d1016]" viewBox="0 0 380 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Before (Left Screen) */}
            <rect x="35" y="25" width="125" height="185" rx="6" fill="#0b0e14" stroke={strokeColor} />
            <text x="97" y="42" fill="#475569" fontSize="6.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">BEFORE</text>
            <text x="97" y="55" fill="#475569" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">AUSTFLY</text>
            <circle cx="97.5" cy="100" r="22" fill="#1e293b" opacity="0.4" stroke={strokeColor} strokeWidth="1" />
            {/* Cluttered small buttons */}
            <rect x="50" y="135" width="24" height="12" rx="2" fill="#1e293b" opacity="0.4" />
            <rect x="85" y="135" width="24" height="12" rx="2" fill="#1e293b" opacity="0.4" />
            <rect x="120" y="135" width="24" height="12" rx="2" fill="#1e293b" opacity="0.4" />
            <rect x="50" y="155" width="24" height="12" rx="2" fill="#1e293b" opacity="0.4" />
            <rect x="85" y="155" width="24" height="12" rx="2" fill="#1e293b" opacity="0.4" />
            <rect x="120" y="155" width="24" height="12" rx="2" fill="#1e293b" opacity="0.4" />
            
            {/* Splitter Line with Redesign Indicator */}
            <line x1="190" y1="15" x2="190" y2="225" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="165" y="110" width="50" height="15" rx="4" fill="#22C55E" stroke="#16813D" strokeWidth="1" />
            <text x="190" y="120" fill="#17211B" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Redesign</text>

            {/* After (Right Screen) */}
            <rect x="220" y="25" width="125" height="185" rx="6" fill="#111c30" stroke={accentColor} strokeWidth="1.5" />
            <text x="282.5" y="42" fill={accentColor} fontSize="6.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">AFTER</text>
            <text x="282.5" y="55" fill="#f8fafc" fontSize="9" fontWeight="950" fontFamily="sans-serif" textAnchor="middle">austfly</text>
            {/* Shutter graphic */}
            <rect x="235" y="70" width="95" height="75" rx="8" fill="#13233c" stroke={strokeColor} />
            <line x1="240" y1="85" x2="325" y2="85" stroke="#223047" strokeWidth="2" />
            <line x1="240" y1="95" x2="325" y2="95" stroke="#223047" strokeWidth="2" />
            <line x1="240" y1="105" x2="325" y2="105" stroke="#223047" strokeWidth="2" />
            <line x1="240" y1="115" x2="325" y2="115" stroke="#223047" strokeWidth="2" />
            {/* Easy Swipe Gestures */}
            <circle cx="282.5" cy="110" r="16" fill={accentColor} fillOpacity="0.1" stroke={accentColor} strokeWidth="1" />
            <path d="M 282.5 118 L 282.5 102 M 277 107 L 282.5 102 L 288 107" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Quick action button */}
            <rect x="245" y="160" width="75" height="18" rx="4" fill={accentColor} />
            <text x="282.5" y="171" fill="#17211B" fontSize="7" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">One-tap Open</text>
          </svg>
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
            <text x="315" y="88" fill={accentColor} fontSize="8" fontFamily="monospace" fontWeight="bold">82%</text>
            <text x="140" y="62" fill="#94a3b8" fontSize="6.5" fontFamily="monospace">Firmware Flashing Status</text>

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
          <svg className="w-full h-full bg-[#0d1016]" viewBox="0 0 380 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="25" width="330" height="190" rx="4" fill="#111c30" stroke={strokeColor} strokeWidth="1.5" />
            <rect x="35" y="35" width="55" height="8" rx="2" fill={accentColor} />
            <rect x="100" y="35" width="35" height="8" rx="2" fill="#223047" />
            <rect x="145" y="35" width="35" height="8" rx="2" fill="#223047" />
            
            {/* Dental catalog grid elements */}
            <rect x="35" y="60" width="95" height="115" rx="4" fill="#13233c" stroke={strokeColor} />
            <circle cx="82.5" cy="95" r="18" fill="#1e293b" />
            <path d="M 75 95 C 75 88, 90 88, 90 95 C 90 102, 75 102, 75 95 Z" stroke={accentColor} strokeWidth="1.5" fill="none" />
            <rect x="45" y="130" width="75" height="6" rx="1.5" fill="#223047" />
            <rect x="45" y="142" width="50" height="6" rx="1.5" fill={accentColor} />

            <rect x="142" y="60" width="96" height="115" rx="4" fill="#13233c" stroke={strokeColor} />
            <circle cx="190" cy="95" r="18" fill="#1e293b" />
            <path d="M 182.5 95 C 182.5 88, 197.5 88, 197.5 95 C 197.5 102, 182.5 102, 182.5 95 Z" stroke={accentColor} strokeWidth="1.5" fill="none" />
            <rect x="152.5" y="130" width="75" height="6" rx="1.5" fill="#223047" />
            <rect x="152.5" y="142" width="50" height="6" rx="1.5" fill={accentColor} />

            <rect x="250" y="60" width="95" height="115" rx="4" fill="#13233c" stroke={strokeColor} />
            <circle cx="297.5" cy="95" r="18" fill="#1e293b" />
            <rect x="260" y="130" width="75" height="6" rx="1.5" fill="#223047" />
            <rect x="260" y="142" width="50" height="6" rx="1.5" fill={accentColor} />
          </svg>
        );
    }
  };

  // Render SVG logos for clients with beautiful modern shapes
  const renderBrandLogo = (brand: string, customHeight: number = 28) => {
    let src = "";
    let alt = "";
    switch (brand) {
      case "rogo":
        src = "/images/Rogo_logo.png";
        alt = "Rogo Solutions";
        break;
      case "fpt":
        src = "/images/FPTSmartHome_logo.png";
        alt = "FPT Smart Home";
        break;
      case "rangdong":
        src = "/images/RangDong_logo.png";
        alt = "Rạng Đông";
        break;
      case "antaxi":
        src = "/images/Antaxi_logo.png";
        alt = "An Taxi";
        break;
      case "vietin":
        src = "/images/VietinBankS_logo.png";
        alt = "VietinBank Securities";
        break;
      case "vcbs":
        src = "/images/VCBS_logo.png";
        alt = "VCBS";
        break;
      case "think":
        src = "/images/Think_Action.png";
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
        className="w-auto object-contain filter grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-250 ease-in-out"
      />
    );
  };

  const featuredProjects = projects.filter(p => p.tier === 1 && p.visible);
  const moreProjects = projects.filter(p => p.tier === 2 && p.visible);

  return (
    <>
      <div className="page-wrapper text-[#E5E5E5] font-sans relative overflow-x-hidden transition-colors duration-300">
      
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
          padding: 'var(--Spacing-Padding-L, 16px) var(--Spacing-Padding-5XL, 48px)',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'stretch',
          borderBottom: '1px solid var(--Colors-Neutral-800, #4B4B4B)',
          background: 'var(--Colors-Neutral-1000, #181818)'
        }}
        className="w-full sticky top-0 z-40 transition-all duration-300"
      >
        {/* Logo with Green Concentric Arcs */}
        <a href="#hero" className="flex items-center gap-2 text-white font-serif font-bold text-[20px] tracking-tight hover:scale-105 transition-transform duration-150">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-accent">
            <path d="M8 6C6.5 8.5 6 11.5 6 14 C 6 16.5, 6.5 19.5, 8 22" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M12 9.5C11 11 10.5 12.5 10.5 14 C 10.5 15.5, 11 17, 12 18.5" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M16 13C15.8 13.5 15.7 13.8 15.7 14 C 15.7 14.2, 15.8 14.5, 16 15" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
          <span>khanhtruong_nguyen</span>
        </a>

        {/* Navigation Links (Desktop) */}
        <nav 
          style={{ gap: 'var(--spacing-m, 16px)' }}
          className="hidden md:flex items-center text-[14px] font-medium"
        >
          <a 
            href="#hero" 
            className={`relative py-1.5 transition-colors duration-150 ${activeSection === "hero" ? "text-brand-accent font-semibold" : "hover:text-brand-accent"}`}
          >
            {translations[lang].navWork}
            {activeSection === "hero" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent animate-growWidth"></span>}
          </a>
          <a 
            href="#about" 
            className={`relative py-1.5 transition-colors duration-150 ${activeSection === "about" ? "text-brand-accent font-semibold" : "hover:text-brand-accent"}`}
          >
            {translations[lang].navAbout}
            {activeSection === "about" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent animate-growWidth"></span>}
          </a>
          <a 
            href="#contact" 
            className={`relative py-1.5 transition-colors duration-150 ${activeSection === "contact" ? "text-brand-accent font-semibold" : "hover:text-brand-accent"}`}
          >
            {translations[lang].navContact}
            {activeSection === "contact" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent animate-growWidth"></span>}
          </a>
        </nav>

        {/* Right Area Badge and Theme Toggle */}
        <div className="flex items-center gap-4">
          
          {/* Language Switch */}
          <div className="flex items-center border border-neutral-800 rounded-lg p-0.5 bg-neutral-950/80 text-[10px] font-medium select-none">
            <button
              onClick={() => setLang("vi")}
              className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${lang === "vi" ? "bg-neutral-800 text-white font-semibold" : "text-neutral-500 hover:text-neutral-300"}`}
            >
              VIE
            </button>
            <span className="text-neutral-800 px-0.5">|</span>
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${lang === "en" ? "bg-neutral-800 text-white font-semibold" : "text-neutral-500 hover:text-neutral-300"}`}
            >
              ENG
            </button>
          </div>

          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-status-200/50 hover:bg-status-200/10 text-xs text-[#E5E5E5] font-semibold transition-colors duration-150"
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
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className={`py-2 transition-colors ${activeSection === "hero" ? "text-brand-accent" : ""}`}>{translations[lang].navWork}</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className={`py-2 transition-colors ${activeSection === "about" ? "text-brand-accent" : ""}`}>{translations[lang].navAbout}</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className={`py-2 transition-colors ${activeSection === "contact" ? "text-brand-accent" : ""}`}>{translations[lang].navContact}</a>
          </div>
        )}

        {/* Spec Label for Header */}
        {specMode && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-950/20 text-red-400 border-t border-red-200/50 px-6 py-1 text-[10px] font-sans font-normal flex items-center justify-between z-40">
            <span>Class: sticky top-0 | Height: 76px</span>
            <span>Padding: py-4 px-12 | Border-B: 1px</span>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="w-full px-[100px] py-[40px] relative flex justify-center">
        <div className="flex max-w-[1200px] w-full items-center gap-[32px]">
          
          {/* Left Column: Portrait & Text content */}
          <div 
            className="flex flex-row items-center"
            style={{
              display: 'flex',
              width: '800px',
              alignItems: 'center',
              gap: 'var(--Spacing-xl, 24px)',
              flexShrink: 0
            }}
          >
            {/* Portrait Image */}
            <div className="relative w-[282px] h-[338px] flex-shrink-0 aspect-[136/163]">
              <Image
                src="/images/KT_profilie.png"
                alt="Chân dung Nguyễn Khánh Trường"
                fill
                priority
                className="object-contain"
                sizes="282px"
              />
            </div>

            {/* Biography & Tagline */}
            <div className="flex flex-col gap-4 text-center sm:text-left">
              <h1 className="text-[34px] font-bold font-serif leading-[51px] text-white">
                Nguyễn Khánh Trường
              </h1>
              <h2 className="text-[20px] font-bold leading-[30px] text-brand-accent">
                {translations[lang].heroSubheading}
              </h2>
              <p 
                style={{ 
                  color: 'var(--Colors-Neutral-500, #989898)',
                  fontFamily: '"Be Vietnam Pro", sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '18px'
                }}
                className="max-w-sm"
              >
                {translations[lang].heroParagraph}
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 pt-3">
                <button
                  onClick={() => setContactModalOpen(true)}
                  className="bg-brand-accent hover:bg-[#27b378] text-[#17211B] font-bold text-[14px] px-6 py-2.5 rounded-full transition-all duration-150 active:scale-[0.97]"
                >
                  {translations[lang].emailMe}
                </button>
                <a
                  href="file:///Users/khanhtruongvu/Desktop/Portfolio/2026%20Portfolio/CV_NguyenKhanhTruong_2026.pdf"
                  target="_blank"
                  className="inline-flex items-center gap-2 border border-white/60 hover:bg-white/10 text-white font-bold text-[14px] px-6 py-2.5 rounded-full transition-all duration-150 active:scale-[0.97]"
                >
                  {translations[lang].viewResume}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Client Logos (Aligned with heading, padding adjusted, initials badge removed) */}
          <div className="w-[368px] flex-shrink-0 relative flex flex-col gap-6 py-6 pl-0 pr-2 lg:pr-8">
            <div className="flex items-center">
              <span className="text-[10px] font-sans font-normal uppercase tracking-wider text-neutral-500 block">
                {translations[lang].trustedBy}
              </span>
            </div>
 
            {/* Grayscale Client Logos Grid in 3 Columns - Aligned to the left (justify-start) */}
            <div className="grid grid-cols-3 gap-y-8 gap-x-6 items-center">
              {/* Row 1 */}
              <div className="group flex items-center justify-start">{renderBrandLogo("rogo")}</div>
              <div className="group flex items-center justify-start">{renderBrandLogo("fpt")}</div>
              <div className="group flex items-center justify-start">{renderBrandLogo("rangdong")}</div>
 
              {/* Row 2 */}
              <div className="group flex items-center justify-start">{renderBrandLogo("antaxi")}</div>
              <div className="group flex items-center justify-start">{renderBrandLogo("vietin")}</div>
              <div></div>
 
              {/* Row 3 */}
              <div className="group flex items-center justify-start">{renderBrandLogo("vcbs")}</div>
              <div className="group flex items-center justify-start">{renderBrandLogo("think")}</div>
              <div></div>
            </div>
          </div>

        </div>
      </section>

      {/* CORE WORK PORTFOLIO (Featured and More Projects Grid) */}
      <section id="work" className="w-full px-[100px] py-[40px] relative flex flex-col items-center">
        <div 
          style={{
            display: 'flex',
            maxWidth: '1200px',
            width: '100%',
            alignItems: 'flex-start',
            gap: '32px'
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
              width: '796px',
              flexShrink: 0
            }}
          >
            
            {/* Project 1: Hero Project (Rogo IoT Platform Box - exactly 796px x 236px) */}
            {featuredProjects[0] && (
              <div 
                className="relative group border border-neutral-900 hover:border-brand-accent rounded-3xl bg-[#12141c] overflow-hidden transition-all duration-200 hover:-translate-y-1"
                style={{
                  display: 'flex',
                  width: '796px',
                  height: '236px',
                  padding: '24px',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexShrink: 0
                }}
              >
                {/* SVG Dashboard Mockup as a semi-transparent background */}
                <div className="absolute inset-0 z-0 opacity-15 pointer-events-none select-none">
                  {renderProjectCover(featuredProjects[0].coverImage)}
                </div>

                {/* Top Row: Indicators and Logos */}
                <div className="w-full flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <span className="app-chip text-[10px] font-bold bg-brand-accent/15 text-brand-accent border border-brand-accent/10">
                      {translations[lang].featuredBadge}
                    </span>
                    <span className="app-chip text-[10px] font-sans font-normal bg-neutral-900 text-neutral-400 border border-neutral-800/50 uppercase tracking-wider">
                      PAAS • B2B
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
                    gap: 'var(--Spacing-s, 12px)',
                    alignSelf: 'stretch',
                    width: '100%'
                  }}
                  className="z-10"
                >
                  <h3 
                    style={{ alignSelf: 'stretch', width: '100%' }}
                    className="text-[26px] font-bold leading-tight text-white font-serif group-hover:text-brand-accent transition-colors duration-150"
                  >
                    {featuredProjects[0].title}
                  </h3>
                  <p 
                    style={{ 
                      color: 'var(--Colors-Neutral-500, #989898)',
                      fontFamily: '"Be Vietnam Pro", sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '18px'
                    }}
                  >
                    {translations[lang]['rogo-dashboard-summary']}
                  </p>
                </div>

                {/* Bottom Row: Tech Pills */}
                <div className="flex flex-wrap gap-2.5 z-10">
                  {featuredProjects[0].techTokens?.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="app-chip text-[10px] font-sans bg-[#17211B] text-[#2ECC8A] border border-[#2ECC8A]/20 font-normal"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Row holding Cards 2 and 3 */}
            <div 
              style={{
                display: 'flex',
                height: '240px',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: '16px',
                alignSelf: 'stretch',
                flexShrink: 0
              }}
            >
              {featuredProjects.slice(1, 3).map((proj) => (
                <div
                  key={proj.id}
                  className="relative group border border-neutral-900 hover:border-brand-accent rounded-3xl bg-[#12141c] overflow-hidden transition-all duration-200 hover:-translate-y-1"
                  style={{
                    display: 'flex',
                    width: '390px',
                    height: '238px',
                    padding: '16px',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexShrink: 0
                  }}
                >
                  {/* Background mockup graphic */}
                  <div className="absolute inset-0 z-0 opacity-15 pointer-events-none select-none">
                    {renderProjectCover(proj.coverImage)}
                  </div>

                  {/* Top Row: Indicators and Logo */}
                  <div className="w-full flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <span className="app-chip text-[9px] font-bold bg-brand-accent/15 text-brand-accent border border-brand-accent/10">
                        {translations[lang].featuredBadge}
                      </span>
                      <span className="app-chip text-[10px] font-sans font-normal bg-neutral-900 text-neutral-500 border border-neutral-800/50 uppercase tracking-wide">
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
                      gap: '6px',
                      alignSelf: 'stretch',
                      width: '100%'
                    }}
                    className="z-10"
                  >
                    <span className="text-[10px] uppercase font-sans font-normal tracking-wider text-brand-accent block">
                      {proj.id === "raio-smart" ? "SMART HOME" : "REDESIGN"}
                    </span>
                    <h4 
                      style={{ alignSelf: 'stretch', width: '100%' }}
                      className="text-[20px] font-bold leading-tight text-white font-serif group-hover:text-brand-accent transition-colors duration-150"
                    >
                      {proj.id === "raio-smart" ? "RaIO Smart" : "Austfly Redesign"}
                    </h4>
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
                        ? translations[lang]['raio-smart-summary']
                        : translations[lang]['austfly-summary']}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: MORE PROJECTS & SIDEBAR QUOTE */}
          <div className="flex flex-col gap-8 w-[372px] flex-shrink-0">
            
            {/* More Projects block */}
            <div className="flex flex-col gap-6 w-full">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
                <span className="text-[10px] font-sans font-normal uppercase tracking-wider text-neutral-500">
                  {translations[lang].moreProjects}
                </span>
                <a href="#work" className="text-brand-accent text-xs font-bold inline-flex items-center gap-1 hover:underline">
                  {translations[lang].viewAll} <ArrowRight size={12} />
                </a>
              </div>

              {/* Sidebar list items */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 'var(--Spacing-m, 16px)',
                  flex: '1 0 0',
                  width: '100%'
                }}
              >
                {moreProjects.map((proj) => (
                  <div
                    key={proj.id}
                    style={{
                      display: 'flex',
                      padding: '8px',
                      alignItems: 'center',
                      gap: 'var(--Spacing-s, 12px)',
                      alignSelf: 'stretch',
                      borderRadius: '8px',
                      background: 'var(--Colors-Neutral-900, #323232)'
                    }}
                    className="transition-all duration-150 relative group"
                  >
                    {/* Small Colored box icon */}
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {proj.id === "partner-app" ? (
                        <div className="w-full h-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="14" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" />
                          </svg>
                        </div>
                      ) : proj.id === "thing-ai" ? (
                        <div className="w-full h-full flex items-center justify-center">
                          {/* Stylized Owl Face with exact colors matching screenshot */}
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="8" fill="#00D2FF" />
                            <circle cx="14" cy="20" r="7" fill="white" />
                            <circle cx="14" cy="20" r="3.5" fill="#1E293B" />
                            <circle cx="14" cy="20" r="1.5" fill="white" />
                            <circle cx="26" cy="20" r="7" fill="white" />
                            <circle cx="26" cy="20" r="3.5" fill="#1E293B" />
                            <circle cx="26" cy="20" r="1.5" fill="white" />
                            <polygon points="20,20 18,24 22,24" fill="#FBBF24" />
                            <path d="M8 12 L14 15 L20 12 L26 15 L32 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-slate-500/10 text-slate-400 flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18.7 8l-5.1 5.2-2.8-2.7-4.7 4.7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <span className="text-[10px] font-sans font-normal uppercase tracking-wide text-neutral-500">{proj.tags.join(" • ")}</span>
                      <h4 className="text-[14px] font-bold text-white group-hover:text-brand-accent transition-colors leading-snug">{proj.title}</h4>
                      <p 
                        style={{ 
                          color: 'var(--Colors-Neutral-500, #989898)',
                          fontFamily: '"Be Vietnam Pro", sans-serif',
                          fontSize: '14px',
                          fontWeight: 400,
                          lineHeight: '18px'
                        }}
                      >
                        {translations[lang][`${proj.id}-summary` as keyof typeof translations.vi] || proj.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="flex items-center justify-center gap-2 text-brand-accent font-serif font-bold text-sm tracking-tight mt-16 animate-bounce">
          <span>{translations[lang].scrollMore}</span>
        </div>
      </section>

      {/* 
      All sections below (About, Timeline, Skills, Contact, Footer) are hidden per design request
      */}
      {false && (
        <>
          {/* ABOUT SECTION */}
          <section id="about" className="w-full bg-slate-50 dark:bg-[var(--Colors-Neutral-1000,#181818)] px-[100px] py-[40px] relative">
            {specMode && (
              <div className="absolute top-2 left-6 bg-red-600/10 border border-red-500/30 text-red-500 text-[9px] font-mono px-2 py-0.5 rounded">
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
          <section className="w-full px-[100px] py-[40px] relative border-b border-slate-200/60 dark:border-slate-800/50">
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
          <section id="skills" className="w-full bg-slate-50 dark:bg-[var(--Colors-Neutral-1000,#181818)] px-[100px] py-[40px] relative border-b border-slate-200/60 dark:border-slate-800/50">
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
          <section id="contact" className="w-full px-[100px] py-[40px] text-center relative">
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
                <a href="#" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-200 font-semibold px-6 py-3">LinkedIn</a>
                <a href="#" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-200 font-semibold px-6 py-3">Behance</a>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="w-full px-[100px] py-[40px] border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
              <span>© 2026 Nguyễn Khánh Trường. All rights reserved.</span>
              <div className="flex items-center gap-4 font-mono text-[10px]">
                <span>ENV: PRODUCTION</span>
                <span>SHIPPED via Gemini CLI</span>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>


      {/* CONTACT POPUP MODAL */}
      {contactModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0d1425] border border-slate-800 rounded-2xl max-w-md w-full relative p-6">
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-300"
            >
              <X size={15} />
            </button>

            <h3 className="text-xl font-bold font-serif text-white mb-2">{translations[lang].contactModalTitle}</h3>
             <p className="text-xs text-slate-400 mb-4 leading-relaxed">
               {translations[lang].contactModalDesc}
             </p>

            <form onSubmit={handleSendEmail} className="flex flex-col gap-4">
              <div>
                <label className="text-[9px] uppercase font-mono font-bold text-slate-400 block mb-1">{translations[lang].contactModalLabel}</label>
                <textarea
                  required
                  rows={4}
                  value={contactMessage}
                  onChange={e => setContactMessage(e.target.value)}
                  placeholder={translations[lang].contactModalPlaceholder}
                  className="w-full bg-[#111c30] border border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:border-brand-500 text-white leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="bg-[#22C55E] hover:bg-[#16813D] text-[#17211B] font-semibold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                {translations[lang].contactModalSubmit}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
