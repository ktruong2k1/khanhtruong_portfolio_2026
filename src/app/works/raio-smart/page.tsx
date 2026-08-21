"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactModal from "@/components/ContactModal";
import FooterSection from "@/components/FooterSection";
import InteractiveCTA from "@/components/InteractiveCTA";
import { useLanguage } from "@/context/LanguageContext";

export default function RaIOSmartPage() {
  const { lang, setLang } = useLanguage();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const titleSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Automatically snap / scroll to the Title & Hero Mockup when entering project page
    const timer = setTimeout(() => {
      if (titleSectionRef.current) {
        const navOffset = 88; // Height of fixed navbar + breathing space
        const elementPosition = titleSectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  const heroDescription =
    lang === "vi"
      ? "RaIO không chỉ là một ứng dụng nhà thông minh thông thường — đây là nỗ lực giải quyết vấn đề cấu trúc cốt lõi trong thị trường IoT Việt Nam: sự phân mảnh thương hiệu. Bằng cách cung cấp cho các thương hiệu một nền tảng dùng chung mà không bắt buộc họ phải từ bỏ nhận diện riêng, RaIO mở ra lộ trình hướng tới trải nghiệm smarthome kết nối liền mạch, xóa bỏ các rào cản phân mảnh cho người dùng Việt."
      : "RaIO isn't just another smart home app — it's an attempt to solve a structural problem in the Vietnamese IoT market: brand fragmentation. By giving brands a shared foundation without asking them to give up their identity, RaIO opens a path toward a more connected, less siloed smart home experience for Vietnamese consumers.";

  return (
    <div className="min-h-screen w-full bg-[#121212] text-white selection:bg-[#00DC6C] selection:text-black overflow-x-hidden">
      {/* Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Main Project Info Container: Flush with side padding px-5 sm:px-8 md:px-12 lg:px-[10vh] */}
      <main className="w-full pt-28 md:pt-36 pb-24 px-5 sm:px-8 md:px-12 lg:px-[10vh]">
        <div className="max-w-[1440px] mx-auto w-full space-y-12 sm:space-y-16">
          
          {/* Top Header: Back CTA Button + Project Title & Short Description */}
          <div className="max-w-[900px] space-y-8 sm:space-y-10 lg:space-y-12">
            {/* Back CTA Button synced with InteractiveCTA design */}
            <div>
              <InteractiveCTA
                direction="back"
                text={lang === "vi" ? "Quay lại danh sách" : "Back to all works"}
                href="/works"
              />
            </div>

            {/* Project Title & Hero Subtitle */}
            <div ref={titleSectionRef} className="space-y-4 sm:space-y-6 scroll-mt-24">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
                RaIO Smart whitelabel app
              </h1>

              <p className="text-b2 md:text-b1 text-white/70 leading-relaxed max-w-[760px]">
                {heroDescription}
              </p>
            </div>
          </div>

          {/* SECTION 1: HERO BANNER MOCKUP */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[3786/1440] rounded-[12px] sm:rounded-[16px] overflow-hidden border border-white/10 shadow-2xl bg-[#181818]">
            <Image
              src="/images/raio_smart_project/Diagram hero.jpg"
              alt="RaIO Smart Overview Mockup"
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, 1440px"
              className="object-cover object-center"
            />
          </div>

          {/* SECTION 2: 2-COLUMN INFO GRID (The Problem & Architecture vs Clients, Service, Tools) with 2px continuous borders */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 border-t-2 border-b-2 border-white/10">
            {/* Left Column: The Problem, The Product & Where RaIO Fits in the Bigger Picture */}
            <div className="lg:col-span-7 py-10 sm:py-12 lg:py-16 space-y-10">
              {/* The problem */}
              <div className="space-y-3">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi" ? "Vấn đề" : "The problem"}
                </span>
                <p className="text-b2 md:text-b1 text-white/80 leading-relaxed font-normal">
                  {lang === "vi"
                    ? "Thị trường nhà thông minh Việt Nam bị phân mảnh nghiêm trọng. Mỗi thương hiệu phần cứng đều phát hành ứng dụng riêng, luồng đăng nhập riêng, logic thiết bị riêng — buộc người dùng phải chuyển đổi liên tục giữa nhiều app chỉ để quản lý một ngôi nhà. Chưa từng có nền tảng nào đứng ra thống nhất bức tranh phân mảnh này thành một trải nghiệm nhất quán, linh hoạt theo từng thương hiệu."
                    : "Vietnam's smart home market is fragmented. Every hardware brand ships its own app, its own login, its own device logic — forcing consumers to juggle multiple apps just to manage a single smart home. No platform had yet stepped up to unify this landscape under one consistent, brand-flexible experience."}
                </p>
              </div>

              {/* The Product */}
              <div className="space-y-3">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi" ? "Sản phẩm" : "The Product"}
                </span>
                <p className="text-b2 md:text-b1 text-white/80 leading-relaxed font-normal">
                  {lang === "vi" ? (
                    <>
                      RaIO là thương hiệu hệ sinh thái được đồng sáng lập bởi{" "}
                      <span className="text-[#00DC6C] font-semibold">Rogo Solutions</span> và{" "}
                      <span className="text-[#00DC6C] font-semibold">Rạng Đông</span>, xây dựng nhằm
                      thu hẹp khoảng cách phân mảnh đó. Vận hành trên nền tảng của Rogo và phát
                      triển hợp tác cùng Rạng Đông, RaIO Smart là ứng dụng whitelabel kết nối các
                      thiết bị IoT Wifi từ nhiều thương hiệu vào một hệ sinh thái đồng nhất.
                    </>
                  ) : (
                    <>
                      RaIO is a Vietnamese ecosystem brand co-founded by{" "}
                      <span className="text-[#00DC6C] font-semibold">Rogo Solutions</span> and{" "}
                      <span className="text-[#00DC6C] font-semibold">Rạng Đông</span>, built to close
                      that gap. Powered by Rogo&apos;s platform and developed in partnership with Rạng
                      Đông, RaIO Smart is the whitelabel app that brings Wifi IoT devices from
                      multiple brands into one unified ecosystem.
                    </>
                  )}
                </p>
                <p className="text-b2 md:text-b1 text-white/80 leading-relaxed font-normal">
                  {lang === "vi"
                    ? "Mô hình hoạt động ở hai cấp độ: Các thương hiệu lớn có thể whitelabel toàn bộ nền tảng — phát hành ứng dụng mang trọn vẹn nhận diện thương hiệu riêng trong khi vẫn chạy trên hạ tầng cốt lõi của RaIO — trong khi các thương hiệu nhỏ hơn có thể tích hợp trực tiếp vào hệ sinh thái RaIO để thiết bị của họ được điều khiển ngay trong chính ứng dụng RaIO. Dù ở lộ trình nào, logic cốt lõi bên dưới vẫn đồng nhất; chỉ có lớp giao diện hiển thị thay đổi."
                    : "The model works on two levels: larger brands can whitelabel the platform entirely — shipping an app that carries their own identity while running on RaIO's core infrastructure — while smaller brands can plug directly into the RaIO ecosystem and let their devices be controlled through the RaIO app itself. Either path, the underlying logic stays the same; only the presentation layer changes."}
                </p>
              </div>

              {/* Where RaIO Fits in the Bigger Picture */}
              <div className="space-y-3">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi"
                    ? "Vị trí của RaIO trong bức tranh tổng thể"
                    : "Where RaIO Fits in the Bigger Picture"}
                </span>
                <p className="text-b2 md:text-b1 text-white/80 leading-relaxed font-normal">
                  {lang === "vi" ? (
                    <>
                      RaIO Smart không vận hành biệt lập — mọi thiết bị, mọi đối tác, mọi phân
                      quyền người dùng trong RaIO đều được khởi tạo và quản trị thông qua{" "}
                      <Link
                        href="/works/rogo-platform-v2"
                        className="group/link inline-flex items-center gap-1 font-semibold text-[#00DC6C] hover:text-[#33ff8a] underline underline-offset-4 decoration-[#00DC6C]/40 hover:decoration-[#33ff8a] transition-colors"
                      >
                        <svg
                          className="w-3.5 h-3.5 shrink-0 text-[#00DC6C] group-hover/link:text-[#33ff8a] transition-transform duration-200 group-hover/link:-rotate-12 inline align-middle"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                        <span>Rogo Platform Dashboard V2</span>
                      </Link>
                      , chính là hệ thống quản trị toàn bộ hệ sinh thái đa thương hiệu của Rogo.
                    </>
                  ) : (
                    <>
                      RaIO Smart doesn&apos;t run in isolation — every device, every partner, every
                      user permission inside RaIO is provisioned and governed through the{" "}
                      <Link
                        href="/works/rogo-platform-v2"
                        className="group/link inline-flex items-center gap-1 font-semibold text-[#00DC6C] hover:text-[#33ff8a] underline underline-offset-4 decoration-[#00DC6C]/40 hover:decoration-[#33ff8a] transition-colors"
                      >
                        <svg
                          className="w-3.5 h-3.5 shrink-0 text-[#00DC6C] group-hover/link:text-[#33ff8a] transition-transform duration-200 group-hover/link:-rotate-12 inline align-middle"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                        <span>Rogo Platform Dashboard V2</span>
                      </Link>
                      , the same system that manages Rogo&apos;s entire multi-brand ecosystem.
                    </>
                  )}
                </p>
                <p className="text-b2 md:text-b1 text-white/80 leading-relaxed font-normal">
                  {lang === "vi"
                    ? "Sự kết nối đó là yếu tố cốt lõi giúp mô hình whitelabel có thể khả thi ngay từ đầu. Khi một thương hiệu lớn whitelabel RaIO, hoặc một thương hiệu nhỏ gia nhập ứng dụng chung, hệ thống vẫn phải định nghĩa rõ: ai quản lý thiết bị của thương hiệu đó, họ được phép nhìn thấy những gì và ranh giới quyền hạn nằm ở đâu. Dashboard chính là nơi cấu trúc đó tồn tại — tổ chức, dự án, vai trò — và RaIO Smart là một trong những sản phẩm được xây dựng để hỗ trợ cấu trúc phân quyền này."
                    : "That connection is what made the whitelabel model possible in the first place. When a large brand whitelabels RaIO, or a smaller brand joins the shared app, someone still has to define: who manages that brand's devices, what they're allowed to see, and where their boundary ends. The dashboard is where that structure lives — organizations, projects, roles — and RaIO Smart is one of the products that structure was built to support."}
                </p>
                <p className="text-b2 md:text-b1 text-white/80 leading-relaxed font-normal">
                  {lang === "vi" ? (
                    <>
                      <span className="text-[#00DC6C] font-semibold">
                        Thiết kế song hành cả hai hệ thống đảm bảo tính đồng bộ tuyệt đối không bị lệch pha.
                      </span>{" "}
                      Mọi quyết định whitelabel ở tầng ứng dụng đều có quyết định phân quyền tương ứng
                      trên tầng dashboard — ranh giới thương hiệu của đối tác trên RaIO luôn khớp hoàn
                      hảo với ranh giới phân quyền trên platform, đảm bảo toàn bộ mô hình vận hành bền vững.
                    </>
                  ) : (
                    <>
                      <span className="text-[#00DC6C] font-semibold">
                        Designing one alongside the other meant the two could never drift apart.
                      </span>{" "}
                      Every whitelabel decision on the app side had a corresponding access decision
                      on the dashboard side — a partner&apos;s brand boundary in RaIO had to match
                      their permission boundary in the platform, or the whole model would break.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Right Column: Clients, Service, Tools (Full-height 2px vertical border line) */}
            <div className="lg:col-span-5 border-t-2 lg:border-t-0 lg:border-l-2 border-white/10 pt-8 pb-10 sm:pb-12 lg:pt-16 lg:pb-16 lg:pl-12 space-y-8 flex flex-col justify-start">
              {/* Clients */}
              <div className="space-y-3">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi" ? "Khách hàng" : "Clients"}
                </span>
                <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
                  <div className="relative w-[100px] h-[32px] group cursor-pointer">
                    <Image
                      src="/images/Rogo_color.svg"
                      alt="ROGO Solutions"
                      fill
                      className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                    />
                  </div>
                  <div className="relative w-[120px] h-[32px] group cursor-pointer">
                    <Image
                      src="/images/RangDong_color.svg"
                      alt="Rạng Đông"
                      fill
                      className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Service */}
              <div className="space-y-3">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi" ? "Dịch vụ" : "Service"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {["UI/UX research", "BA development", "UI Design"].map((item) => (
                    <span
                      key={item}
                      className="text-[12px] font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="space-y-3">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi" ? "Công cụ" : "Tools"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Figma", "Claude AI"].map((tool) => (
                    <span
                      key={tool}
                      className="text-[12px] font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: PLATFORM ARCHITECTURE OVERVIEW DIAGRAM (Diagram 01.jpg - Aspect 3720/1440) */}
          <div className="relative w-full aspect-[3720/1440] rounded-[12px] sm:rounded-[16px] overflow-hidden border border-white/10 shadow-2xl bg-[#181818]">
            <Image
              src="/images/rogo_project/Diagram 01.jpg"
              alt="Rogo IoT Platform Dashboard Architecture"
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 1440px"
              className="object-cover object-center"
            />
          </div>

          {/* SECTION 4: BA DEVELOPMENT (Heading 36px, Diagram 2, 3, 4, 5 - Aspect 3720/1440 each) */}
          <div className="space-y-6 sm:space-y-8 pt-8">
            <h2 className="font-heading text-[28px] sm:text-[36px] font-bold text-white tracking-tight leading-tight">
              BA Development
            </h2>

            <div className="space-y-6 sm:space-y-8">
              {/* Diagram 2: Platform layers */}
              <div className="relative w-full aspect-[3720/1440] rounded-[12px] sm:rounded-[16px] overflow-hidden border border-white/10 shadow-2xl bg-[#181818]">
                <Image
                  src="/images/rogo_project/Diagram 2.jpg"
                  alt="Platform layers data structure"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </div>

              {/* Diagram 3: 01 — Authentication */}
              <div className="relative w-full aspect-[3720/1440] rounded-[12px] sm:rounded-[16px] overflow-hidden border border-white/10 shadow-2xl bg-[#181818]">
                <Image
                  src="/images/rogo_project/Diagram 3.jpg"
                  alt="01 — Authentication flow"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </div>

              {/* Diagram 4: 02 — Organizations */}
              <div className="relative w-full aspect-[3720/1440] rounded-[12px] sm:rounded-[16px] overflow-hidden border border-white/10 shadow-2xl bg-[#181818]">
                <Image
                  src="/images/rogo_project/Diagram 4.jpg"
                  alt="02 — Organizations management"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </div>

              {/* Diagram 5: 03 — Permissions (ABAC) */}
              <div className="relative w-full aspect-[3720/1440] rounded-[12px] sm:rounded-[16px] overflow-hidden border border-white/10 shadow-2xl bg-[#181818]">
                <Image
                  src="/images/rogo_project/Diagram 5.jpg"
                  alt="03 — Permissions (ABAC) matrix"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* SECTION 5: WHITELABEL ADAPTATION (Heading 36px, Kangaroo & Austfly Instances) */}
          <div className="space-y-6 sm:space-y-8 pt-8">
            <h2 className="font-heading text-[28px] sm:text-[36px] font-bold text-white tracking-tight leading-tight">
              {lang === "vi" ? "Khả năng tùy biến Whitelabel" : "Whitelabel Customization"}
            </h2>

            <div className="space-y-6 sm:space-y-8">
              {/* Full-width Top Card: Diagram 6.jpg (Aspect 3720/1440) */}
              <div className="relative w-full aspect-[3720/1440] rounded-[12px] sm:rounded-[16px] overflow-hidden border border-white/10 shadow-2xl bg-[#181818]">
                <Image
                  src="/images/rogo_project/Diagram 6.jpg"
                  alt="Design system follow brand guideline"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </div>

              {/* Middle 2-Column Grid: Kangaroo RaIO & Austfly Instances */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full">
                {/* Left Card: Kangaroo RaIO */}
                <div className="relative w-full aspect-[4/3] rounded-[12px] sm:rounded-[16px] overflow-hidden border border-white/10 shadow-2xl bg-[#181818]">
                  <Image
                    src="/images/kangaroo_raio.png"
                    alt="Kangaroo RaIO Mobile Instance"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Right Card: Austfly */}
                <div className="relative w-full aspect-[4/3] rounded-[12px] sm:rounded-[16px] overflow-hidden border border-white/10 shadow-2xl bg-[#181818]">
                  <Image
                    src="/images/austfly.png"
                    alt="Austfly Smart Roller Shutter Mobile Instance"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 6: MORE PROJECTS SECTION (with 2px border) */}
          <section className="w-full pt-16 pb-8 border-t-2 border-white/10 space-y-8">
            {/* Header: Title + InteractiveCTA */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-h4 font-bold text-white tracking-tight">
                {lang === "vi" ? "Dự án khác" : "More Projects"}
              </h2>

              <InteractiveCTA text={lang === "vi" ? "Xem tất cả" : "Explore more"} href="/works" />
            </div>

            {/* 3 Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
              {/* Card 1: Rogo Platform V2 */}
              <Link
                href="/works/rogo-platform-v2"
                className="group block flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Mockup Thumbnail (Aspect 4:3) */}
                  <div className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden bg-[#181818] border border-white/10 shadow-md">
                    <Image
                      src="/images/Rogo_dashboard_thumb.png"
                      alt="Rogo Platform V2"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Tag */}
                  <div>
                    <span className="inline-block text-[11px] sm:text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2.5 py-0.5 rounded-full uppercase">
                      PAAS • B2B
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-h5 sm:text-h4 font-bold text-white group-hover:text-[#00DC6C] transition-colors">
                    Rogo Platform V2
                  </h3>

                  {/* Description */}
                  <p className="text-b3 text-white/70 leading-relaxed font-mono">
                    {lang === "vi"
                      ? "Nền tảng quản trị IoT whitelabel đa tầng — kiến trúc phân quyền đa tổ chức."
                      : "Whitelabel IoT platform core — multi-tenant ABAC access control plane."}
                  </p>
                </div>
              </Link>

              {/* Card 2: Thing Partner */}
              <Link
                href="/works"
                className="group block flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Mockup Thumbnail (Aspect 4:3) */}
                  <div className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden bg-[#181818] border border-white/10 shadow-md">
                    <Image
                      src="/images/Rogo_IoT_Platform_Dashboard_Interface.png"
                      alt="Thing Partner"
                      fill
                      className="object-cover object-left group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Tag */}
                  <div>
                    <span className="inline-block text-[11px] sm:text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2.5 py-0.5 rounded-full uppercase">
                      PAAS • B2B
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-h5 sm:text-h4 font-bold text-white group-hover:text-[#00DC6C] transition-colors">
                    Thing Partner
                  </h3>

                  {/* Description */}
                  <p className="text-b3 text-white/70 leading-relaxed font-mono">
                    {lang === "vi"
                      ? "Dành cho đội ngũ trực tiếp sản xuất và quản lý thiết bị, bao quát từ firmware đến bảo hành qua 6 giai đoạn."
                      : "Purpose-built for hardware manufacturers to manage end-to-end device lifecycle across 6 stages."}
                  </p>
                </div>
              </Link>

              {/* Card 3: Austfly */}
              <Link
                href="/works"
                className="group block flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Mockup Thumbnail (Aspect 4:3) */}
                  <div className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden bg-[#181818] border border-white/10 shadow-md">
                    <Image
                      src="/images/austfly.png"
                      alt="Austfly"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Tag */}
                  <div>
                    <span className="inline-block text-[11px] sm:text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2.5 py-0.5 rounded-full uppercase">
                      LIVE APP INSTANCE
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-h5 sm:text-h4 font-bold text-white group-hover:text-[#00DC6C] transition-colors">
                    Austfly
                  </h3>

                  {/* Description */}
                  <p className="text-b3 text-white/70 leading-relaxed font-mono">
                    {lang === "vi"
                      ? "Ứng dụng điều khiển cửa cuốn và hệ sinh thái nhà thông minh Austfly — instance tùy biến trên RaIO Smart whitelabel app."
                      : "Smart roller shutter & IoT control app Austfly — a fully customized instance powered by RaIO Smart whitelabel app."}
                  </p>
                </div>
              </Link>
            </div>
          </section>

        </div>
      </main>

      {/* Footer Section */}
      <FooterSection
        lang={lang}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}


