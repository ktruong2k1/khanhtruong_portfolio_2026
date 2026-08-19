"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import ContactModal from "@/components/ContactModal";
import FooterSection from "@/components/FooterSection";
import InteractiveCTA from "@/components/InteractiveCTA";
import { useLanguage } from "@/context/LanguageContext";

function TypingHeroText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isInView) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }
    setDisplayedText("");
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 10); // 10ms per character (50% faster snappy typing)

    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <p
      ref={ref}
      className="text-b0 font-normal leading-relaxed text-white/90 min-h-[140px]"
    >
      <span>{displayedText}</span>
      {isTyping && (
        <span className="inline-block w-[3px] h-[20px] bg-[#00DC6C] ml-1 animate-pulse align-middle" />
      )}
    </p>
  );
}

const trustedPartners = [
  { name: "ROGO Solutions", src: "/images/Rogo_color.svg" },
  { name: "FPT Smart Home", src: "/images/FPTSmartHome_color.svg" },
  { name: "Rạng Đông", src: "/images/RangDong_color.svg" },
  { name: "AN TAXI", src: "/images/Antaxi_color.svg" },
  { name: "VietinBank Securities", src: "/images/VietinBankS_color.svg" },
  { name: "VCBS", src: "/images/VCBS_color.svg" },
  { name: "Think & Action", src: "/images/Think_Action_color.svg" },
];

export default function AboutPage() {
  const { lang, setLang } = useLanguage();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const heroStatement =
    lang === "vi"
      ? "Tôi phát triển các sản phẩm B2B phức tạp — hệ sinh thái IoT, SaaS dashboard và các nền tảng whitelabel có khả năng mở rộng cho nhiều đối tác. Tôi sử dụng các công cụ AI để rút ngắn khoảng cách giữa thiết kế và lập trình. Hiện đang sẵn sàng cho các cơ hội làm việc từ xa."
      : "I'm shipping complex B2B products — IoT ecosystems, SaaS dashboards, and whitelabel platforms built to scale across partners. I use AI tools to close the gap between design and production. Currently open to remote roles.";

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-[#121212] text-white selection:bg-[#00DC6C] selection:text-black overflow-x-hidden scroll-smooth">
      {/* Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenContact={() => setContactModalOpen(true)}
      />

      <main className="w-full">
        
        {/* SECTION 1: HERO SECTION (Profile Photo + Name + 3,5 years exp + Mission + Skills) */}
        <section className="w-full min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-6 md:px-12 lg:px-[10vh] pt-[80px] pb-8 border-b-2 border-white/5 bg-[#121212] relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Image: KT_profilie_fading 480x640 (3:4) - Pure clean seamless blending */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[480px] aspect-[3/4] max-h-[640px] rounded-[12px] overflow-hidden shrink-0">
                <Image
                  src="/images/KT_profilie_fading.png"
                  alt="KhanhTruong Nguyen"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Right Content: Name H2-64 + 3,5 years exp + Mission Statement with 50% Faster Typing & Skills Table */}
            <div className="lg:col-span-7 space-y-5 lg:space-y-6">
              {/* Name H2-64 */}
              <h2 className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-white tracking-tight leading-tight">
                KhanhTruong Nguyen
              </h2>

              {/* 3,5 years exp - Product Designer tag */}
              <div className="text-[#00DC6C] font-mono font-bold text-lg sm:text-xl lg:text-[22px] tracking-wide">
                {lang === "vi" ? "3,5 năm KN - Product Designer" : "3,5 years exp - Product Designer"}
              </div>

              {/* Main Headline with Typing Effect */}
              <TypingHeroText text={heroStatement} />

              {/* Skills Sub-table (What I Do & Expertise) */}
              <div className="grid grid-cols-2 gap-8 pt-6 border-t-2 border-white/10">
                {/* What I Do Column */}
                <div className="space-y-3">
                  <div className="text-b3 font-bold uppercase tracking-widest text-white/50">
                    {lang === "vi" ? "Lĩnh vực làm việc" : "What I Do"}
                  </div>
                  <ul className="space-y-2 text-h7 md:text-h6 font-medium text-[#E8C468]">
                    <li>UX Research</li>
                    <li>Wireframing</li>
                    <li>UI Consulting</li>
                    <li>Consult DEV</li>
                  </ul>
                </div>

                {/* Expertise Column */}
                <div className="space-y-3">
                  <div className="text-b3 font-bold uppercase tracking-widest text-white/50">
                    {lang === "vi" ? "Chuyên môn" : "Expertise"}
                  </div>
                  <ul className="space-y-2 text-h7 md:text-h6 font-medium text-[#E8C468]">
                    <li>Saas</li>
                    <li>Mobile app</li>
                    <li>Desktop app</li>
                    <li>Web app</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: EXPERIENCE / MY JOURNEY */}
        <section className="w-full min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-6 md:px-12 lg:px-[10vh] pt-[80px] pb-8 border-b-2 border-white/5 bg-[#121212] relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Experience Tag, Big Title & CV Downloads */}
            <div className="lg:col-span-4 space-y-6 pr-4">
              <div className="text-h5 uppercase tracking-widest text-[#00DC6C] font-bold">
                {lang === "vi" ? "Kinh nghiệm" : "Experience"}
              </div>

              <h2 className="text-h2 sm:text-h1 font-bold text-white tracking-tight">
                {lang === "vi" ? (
                  <>
                    <div>Hành trình</div>
                    <div>của tôi</div>
                  </>
                ) : (
                  <>
                    <div>My</div>
                    <div>journey</div>
                  </>
                )}
              </h2>

              {/* Download CV Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href="/CV_NguyenKhanhTruong_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black text-h7 font-bold px-6 py-3.5 rounded-[12px] hover:bg-neutral-200 transition-colors shadow-lg active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV – Tiếng Việt</span>
                </a>

                <a
                  href="/CV_NguyenKhanhTruong_EN_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#181818] border border-white/20 text-white text-h7 font-bold px-6 py-3.5 rounded-[12px] hover:bg-white/10 transition-colors active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV – English</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Timeline List */}
            <div className="lg:col-span-8 space-y-6 lg:space-y-8">
              
              {/* Job 1: UI/UX Product Designer */}
              <div className="relative pl-8 border-l-2 border-white/10 space-y-2">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#00DC6C] ring-4 ring-[#121212]" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-h5 md:text-h4 font-bold text-white">
                    UI/UX Product Designer
                  </h3>
                  <span className="text-b3 text-[#E8C468] uppercase tracking-wider font-semibold">
                    {lang === "vi" ? "T7/2024 – T7/2026" : "Jul 2024 – Jul 2026"}
                  </span>
                </div>

                <div className="text-h7 text-[#00DC6C] font-semibold">
                  Rogo Solutions
                </div>

                <p className="text-b2 md:text-b1 text-white/70 pt-0.5">
                  {lang === "vi"
                    ? "Hệ sinh thái IoT & SaaS whitelabel — vận hành các nền tảng đa người dùng cho các đối tác doanh nghiệp trên khắp Việt Nam."
                    : "A whitelabel IoT & SaaS ecosystem — powering multi-tenant platforms for enterprise partners across Vietnam."}
                </p>
              </div>

              {/* Job 2: Web & Graphic Designer */}
              <div className="relative pl-8 border-l-2 border-white/10 space-y-2">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#00DC6C]/40 border-2 border-[#00DC6C] ring-4 ring-[#121212]" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-h5 md:text-h4 font-bold text-white">
                    Web & Graphic Designer
                  </h3>
                  <span className="text-b3 text-[#E8C468] uppercase tracking-wider font-semibold">
                    {lang === "vi" ? "T8/2023 – T10/2024" : "Aug 2023 – Oct 2024"}
                  </span>
                </div>

                <div className="text-h7 text-[#00DC6C] font-semibold">
                  Think & Action Agency
                </div>

                <p className="text-b2 md:text-b1 text-white/70 pt-0.5">
                  {lang === "vi"
                    ? "Agency xây dựng thương hiệu & tiếp thị hàng đầu tại Hà Nội, hỗ trợ hàng ngàn doanh nghiệp Việt Nam định hình bộ nhận diện thương hiệu."
                    : "A leading branding & marketing agency in Hanoi, helping thousands of Vietnamese businesses build their brand identity."}
                </p>
              </div>

              {/* Job 3: UX/UI Design Intern */}
              <div className="relative pl-8 border-l-2 border-white/10 space-y-2">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white/20 border-2 border-white/40 ring-4 ring-[#121212]" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-h5 md:text-h4 font-bold text-white">
                    UX/UI Design Intern
                  </h3>
                  <span className="text-b3 text-[#E8C468] uppercase tracking-wider font-semibold">
                    2022
                  </span>
                </div>

                <div className="text-h7 text-[#00DC6C] font-semibold">
                  FPT Software – DES Department
                </div>

                <p className="text-b2 md:text-b1 text-white/70 pt-0.5">
                  {lang === "vi"
                    ? "Tập đoàn công nghệ phần mềm hàng đầu Việt Nam, cung cấp dịch vụ CNTT & chuyển đổi số cho các doanh nghiệp trên 30+ quốc gia."
                    : "Vietnam's largest software company, delivering IT & digital transformation services to enterprises across 30+ countries."}
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 3: EDUCATION & CERTIFICATIONS */}
        <section className="w-full min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-6 md:px-12 lg:px-[10vh] pt-[80px] pb-8 border-b-2 border-white/5 bg-[#121212] relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Vertical Title: Education & Certifications */}
            <div className="lg:col-span-3 flex lg:justify-start">
              <h2 className="text-h4 lg:text-h3 font-bold tracking-tight">
                <span className="text-white block">{lang === "vi" ? "Học vấn &" : "Education &"}</span>
                <span className="text-[#E8C468] block">{lang === "vi" ? "Chứng chỉ" : "Certifications"}</span>
              </h2>
            </div>

            {/* Right Cards Grid */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Card 1 (Left Tall Card): Design Craft & UX & AI Practice */}
              <div className="bg-[#161D19] border border-[#00DC6C]/20 p-6 lg:p-8 rounded-[12px] space-y-6">
                {/* Block A: Design Craft */}
                <div className="space-y-2">
                  <div className="text-b3 font-mono font-bold text-[#00DC6C] uppercase">Design Craft</div>
                  <h3 className="text-h5 font-bold text-[#E8C468]">
                    FPT Arena Multimedia ADIM Certificate • 2022–2024
                  </h3>
                  <p className="text-b2 text-white/70 leading-relaxed">
                    {lang === "vi"
                      ? "Đào tạo thiết kế mỹ thuật đa phương tiện chính quy — đồ họa, dàn trang, typography và sản xuất nội dung số."
                      : "Formal visual design training — graphic design, layout, typography, and digital media production."}
                  </p>
                </div>

                {/* Block B: UX & AI Practice */}
                <div className="space-y-4 pt-4 border-t-2 border-white/10">
                  <div className="text-b3 font-mono font-bold text-[#E8C468] uppercase">UX & AI Practice</div>
                  
                  <div className="space-y-1.5">
                    <h4 className="text-h7 font-bold text-white">
                      Google UX Design Professional Certificate • 2024
                    </h4>
                    <p className="text-b2 text-white/70 leading-relaxed">
                      {lang === "vi"
                        ? "Phương pháp luận UX toàn diện — nghiên cứu người dùng, xây dựng wireframe, prototype và kiểm thử khả năng sử dụng."
                        : "End-to-end UX methodology — research, wireframing, prototyping, and usability testing."}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <h4 className="text-h7 font-bold text-white">
                      Google AI Essentials Certificate • 2025
                    </h4>
                    <p className="text-b2 text-white/70 leading-relaxed">
                      {lang === "vi"
                        ? "Ứng dụng AI vào quy trình làm việc thực tế — liên kết trực tiếp với Claude AI và Gemini CLI trong các dự án hiện tại."
                        : "Applied AI in real workflows — directly maps to Claude AI and Gemini CLI usage in current projects."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 & 3 (Right Stack Cards): Technical Foundation & Language */}
              <div className="space-y-6 flex flex-col justify-between">
                
                {/* Card 2: Technical Foundation */}
                <div className="bg-[#161D19] border border-[#00DC6C]/20 p-6 lg:p-8 rounded-[12px] space-y-3 flex-1">
                  <div className="text-b3 font-mono font-bold text-[#00DC6C] uppercase">Technical Foundation</div>
                  <h3 className="text-h5 font-bold text-[#E8C468]">
                    {lang === "vi" ? "Đại học Công nghiệp Hà Nội • Kỹ thuật Điện • 2019–2023" : "Hanoi University of Industry • Electrical Engineering • 2019–2023"}
                  </h3>
                  <p className="text-b2 text-white/70 leading-relaxed">
                    {lang === "vi"
                      ? "Nền tảng kỹ thuật điện — bổ trợ trực tiếp cho tư duy thiết kế hệ thống IoT và phần cứng."
                      : "Electrical engineering background — directly relevant to IoT system design"}
                  </p>
                </div>

                {/* Card 3: Language */}
                <div className="bg-[#161D19] border border-[#00DC6C]/20 p-6 lg:p-8 rounded-[12px] space-y-3 flex-1">
                  <div className="text-b3 font-mono font-bold text-[#00DC6C] uppercase">Language</div>
                  <h3 className="text-h5 font-bold text-[#E8C468]">
                    English • TOEIC 850 (B2)
                  </h3>
                  <p className="text-b2 text-white/70 leading-relaxed">
                    {lang === "vi"
                      ? "Giao tiếp và làm việc hiệu quả với các đối tác nước ngoài và đội nhóm làm việc từ xa."
                      : "Comfortable working with English-speaking clients and remote teams."}
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* SECTION 4: FEATURED PROJECT (3-Card Grid + Bottom Trusted By Carousel) */}
        <section className="w-full min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center items-center px-6 md:px-12 lg:px-[10vh] pt-[80px] pb-8 border-b-2 border-white/5 bg-[#121212] relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto w-full my-auto flex flex-col justify-center gap-[48px]">
            
            {/* Header: Left Title + Right Interactive CTA */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-h4 font-bold text-white tracking-tight">
                {lang === "vi" ? "Dự án tiêu biểu" : "Featured project"}
              </h2>

              <InteractiveCTA text={lang === "vi" ? "Xem thêm" : "Explore more"} href="/works" />
            </div>

            {/* 3 Featured Projects Cards Grid (Clean borderless layout) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
              
              {/* Card 1: RaIO Smart */}
              <Link
                href="/works"
                className="group block flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Mockup Thumbnail */}
                  <div className="relative w-full aspect-[16/10] rounded-[12px] overflow-hidden bg-[#E8E8E8] border border-white/10 flex items-center justify-center p-6 shadow-md">
                    <Image
                      src="/images/raio.png"
                      alt="RaIO Smart"
                      fill
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Tag */}
                  <div>
                    <span className="inline-block text-[11px] sm:text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2.5 py-0.5 rounded-full uppercase">
                      WHITELABEL FRAMEWORK
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-h5 sm:text-h4 font-bold text-white group-hover:text-[#00DC6C] transition-colors">
                    RaIO Smart
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] sm:text-[14px] text-white/70 leading-relaxed">
                    {lang === "vi"
                      ? "Bộ khung ứng dụng nhà thông minh whitelabel có thể tái sử dụng cho nhiều thương hiệu triển khai nhanh chóng."
                      : "Reusable whitelabel smart home framework built for rapid multi-brand deployment."}
                  </p>
                </div>
              </Link>

              {/* Card 2: Thing Base & Build */}
              <Link
                href="/works"
                className="group block flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Mockup Thumbnail */}
                  <div className="relative w-full aspect-[16/10] rounded-[12px] overflow-hidden bg-[#181818] border border-white/10 shadow-md">
                    <Image
                      src="/images/thing_partner.png"
                      alt="Thing Base & Build"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Tag */}
                  <div>
                    <span className="inline-block text-[11px] sm:text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2.5 py-0.5 rounded-full uppercase">
                      IOT DEVELOPER TOOLS
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-h5 sm:text-h4 font-bold text-white group-hover:text-[#00DC6C] transition-colors">
                    Thing Base & Build
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] sm:text-[14px] text-white/70 leading-relaxed">
                    {lang === "vi"
                      ? "Nền tảng cấu hình IoT và xây dựng kịch bản trực quan đạt giải Top 10 Make In Vietnam 2023."
                      : "Visual IoT configuration & logic builder awarded Top 10 Make In Vietnam 2023."}
                  </p>
                </div>
              </Link>

              {/* Card 3: Thing AI VN */}
              <Link
                href="/works"
                className="group block flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Mockup Thumbnail */}
                  <div className="relative w-full aspect-[16/10] rounded-[12px] overflow-hidden bg-[#181818] border border-white/10 shadow-md">
                    <Image
                      src="/images/Thing_AI_VN.png"
                      alt="Thing AI VN"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Tag */}
                  <div>
                    <span className="inline-block text-[11px] sm:text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2.5 py-0.5 rounded-full uppercase">
                      AI PLATFORM
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-h5 sm:text-h4 font-bold text-white group-hover:text-[#00DC6C] transition-colors">
                    Thing AI VN
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] sm:text-[14px] text-white/70 leading-relaxed">
                    {lang === "vi"
                      ? "Nền tảng cộng đồng chia sẻ câu lệnh AI & tự động hóa quy trình làm việc cho các chuyên gia công nghệ."
                      : "Community AI prompt sharing & workflow automation platform for tech leaders."}
                  </p>
                </div>
              </Link>

            </div>

            {/* Bottom Trusted By Marquee Carousel (Screenshot IBhWzM) */}
            <div className="w-full flex items-center">
              {/* Static Label (Does NOT move or touch the marquee) */}
              <div className="text-b3 font-mono font-bold uppercase tracking-widest text-white/70 shrink-0 mr-8 md:mr-12 select-none">
                {lang === "vi" ? "ĐỐI TÁC TIN CẬY" : "TRUSTED BY"}
              </div>

              {/* Infinite Horizontal Running Carousel: Pauses on hover, reveals full-color logo */}
              <div className="flex-1 overflow-hidden relative group/marquee [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]">
                <div className="flex items-center gap-12 sm:gap-16 w-max animate-marquee group-hover/marquee:[animation-play-state:paused]">
                  {[...trustedPartners, ...trustedPartners].map((partner, idx) => (
                    <div
                      key={`${partner.name}-${idx}`}
                      className="relative h-[30px] w-[120px] sm:w-[140px] shrink-0 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 group/item"
                    >
                      <Image
                        src={partner.src}
                        alt={partner.name}
                        fill
                        className="object-contain filter brightness-0 invert opacity-60 group-hover/item:filter-none group-hover/item:opacity-100 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Unified Footer Section (Sync across all pages) */}
        <FooterSection
          lang={lang}
          onOpenContact={() => setContactModalOpen(true)}
        />

      </main>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
