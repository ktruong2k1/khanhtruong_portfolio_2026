"use client";

import React, { useState } from "react";
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

  const heroDescription =
    lang === "vi"
      ? "Khung ứng dụng nhà thông minh Whitelabel — cùng kiến trúc và logic sản phẩm cốt lõi, nhưng có thể thích ứng giao diện, quy trình thêm thiết bị và tùy biến nhận diện thương hiệu cho từng đối tác một cách linh hoạt."
      : "Whitelabel Smart Home App framework — partner-adaptive UI, complex device onboarding, same core product logic, customizable brand identity across partners.";

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
          <div className="space-y-6 max-w-[900px]">
            {/* Back CTA Button synced with InteractiveCTA design */}
            <div>
              <InteractiveCTA
                direction="back"
                text={lang === "vi" ? "Quay lại danh sách" : "Back to all works"}
                href="/works"
              />
            </div>

            {/* Project Title */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              RaIO Smart
            </h1>

            {/* Hero Subtitle */}
            <p className="text-b2 md:text-b1 text-white/70 leading-relaxed max-w-[760px]">
              {heroDescription}
            </p>
          </div>

          {/* SECTION 1: HERO BANNER MOCKUP */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[3786/1440] rounded-[12px] sm:rounded-[16px] overflow-hidden border border-white/10 shadow-2xl bg-[#181818]">
            <Image
              src="/images/raio.png"
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
            {/* Left Column: The Problem & One system, many layers */}
            <div className="lg:col-span-7 py-10 sm:py-12 lg:py-16 space-y-10">
              {/* The problem */}
              <div className="space-y-3">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi" ? "Vấn đề" : "The problem"}
                </span>
                <p className="text-b2 md:text-b1 text-white/80 leading-relaxed font-normal">
                  {lang === "vi"
                    ? "Trước khi có RaIO Smart, mỗi đối tác nhà thông minh cần phát triển một ứng dụng di động riêng biệt từ đầu. Điều này dẫn đến sự phân mảnh mã nguồn, trùng lặp tính năng, khó kiểm soát chất lượng và tiêu tốn hàng tháng trời cho mỗi lần onboarding đối tác mới."
                    : "Before RaIO Smart, each smart home partner built their own mobile app from scratch. This led to fragmented codebases, duplicated development efforts, inconsistent user experiences, and months of delay for every partner launch."}
                </p>
                <p className="text-b2 md:text-b1 text-[#00DC6C] font-semibold leading-relaxed">
                  {lang === "vi"
                    ? "Một giải pháp framework dùng chung toàn diện là chìa khóa để nhân rộng hệ sinh thái IoT nhanh chóng."
                    : "A unified, reusable framework was essential to scale the entire IoT smart home ecosystem at speed."}
                </p>
              </div>

              {/* One system, many layer */}
              <div className="space-y-3">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi" ? "Một hệ thống, nhiều tầng kiến trúc" : "One system, many layers"}
                </span>
                <p className="text-b2 md:text-b1 text-white/80 leading-relaxed font-normal">
                  {lang === "vi"
                    ? "RaIO Smart phân tách kiến trúc thành các lớp độc lập: tầng kết nối IoT & Bluetooth/Wi-Fi cốt lõi, tầng quy trình thêm thiết bị (device onboarding flow), và tầng nhận diện thương hiệu tùy biến (theme, color token, icons, typography). Mỗi đối tác có thể thay đổi giao diện bên ngoài mà không chạm vào logic bên dưới."
                    : "RaIO Smart decouples the architecture into modular layers: core IoT & connectivity protocol engine, standard device onboarding flow, and customizable brand layers (tokens, icons, typography). Partners can style their own experience without modifying core logic."}
                </p>
                <p className="text-b2 md:text-b1 text-[#00DC6C] font-semibold leading-relaxed">
                  {lang === "vi"
                    ? "Khung ứng dụng đảm bảo tính linh hoạt tối đa cho thương hiệu nhưng vẫn giữ vững sự ổn định kỹ thuật tuyệt đối."
                    : "The framework enables maximum branding flexibility while maintaining complete architectural stability."}
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
                  <div className="relative w-[110px] h-[32px] group cursor-pointer">
                    <Image
                      src="/images/Austdoor.svg"
                      alt="Austdoor & Austfly"
                      fill
                      className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                    />
                  </div>
                  <div className="relative w-[120px] h-[32px] group cursor-pointer">
                    <Image
                      src="/images/FPTSmartHome_color.svg"
                      alt="FPT Smart Home"
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
                  {[
                    "UI/UX Research",
                    "App Architecture",
                    "Design System",
                    "Mobile App UI",
                    "Whitelabel Engine",
                  ].map((item) => (
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
                  {["Figma", "React Native", "TypeScript", "Claude AI", "Gemini CLI", "Vercel"].map(
                    (tool) => (
                      <span
                        key={tool}
                        className="text-[12px] font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                      >
                        {tool}
                      </span>
                    )
                  )}
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
                      src="/images/rogo_platform.png"
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
                      ? "Ứng dụng điều khiển cửa cuốn và hệ sinh thái nhà thông minh Austfly — instance tùy biến trên RaIO Smart."
                      : "Smart roller shutter & IoT control app Austfly — a fully customized instance powered by RaIO Smart."}
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


