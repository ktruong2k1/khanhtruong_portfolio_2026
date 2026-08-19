"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactModal from "@/components/ContactModal";
import FooterSection from "@/components/FooterSection";
import InteractiveCTA from "@/components/InteractiveCTA";
import { useLanguage } from "@/context/LanguageContext";

export default function RogoDashboardPage() {
  const { lang, setLang } = useLanguage();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const heroDescription =
    lang === "vi"
      ? "Rogo Solutions xây dựng và vận hành hệ thống cốt lõi — và bản thân nền tảng có thể whitelabel hoàn toàn. Mỗi đối tác nhận một instance riêng: cùng kiến trúc, cùng control plane, nhưng mang nhận diện thương hiệu riêng. Logic whitelabel không bắt đầu ở tầng ứng dụng — nó bắt đầu ngay tại đây."
      : "Rogo Solutions builds and operates the core — and the platform itself is whitelabelable. Each partner brand gets their own instance: same architecture, same control plane, their own identity. The whitelabel logic doesn't start at the app layer — it starts here.";

  return (
    <div className="min-h-screen w-full bg-[#121212] text-white selection:bg-[#00DC6C] selection:text-black overflow-x-hidden">
      {/* Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Main Project Info Container: Flush with side padding px-6 md:px-12 lg:px-[10vh] max-w-[1440px] */}
      <main className="w-full pt-28 md:pt-36 pb-24 px-6 md:px-12 lg:px-[10vh]">
        <div className="max-w-[1440px] mx-auto w-full">
          
          {/* Project Title & Short Description */}
          <div className="space-y-4 max-w-[800px]">
            <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Rogo Platform V2
            </h1>
            <p className="text-b2 md:text-b1 text-white/70 leading-relaxed">
              {heroDescription}
            </p>
          </div>

          {/* Hero Banner Mockup Card: Expanded full-width aligned with side padding */}
          <div className="relative w-full aspect-[2200/1000] md:aspect-[2.2/1] rounded-[12px] overflow-hidden border border-white/10 shadow-2xl bg-[#181818] mt-8 mb-16">
            <Image
              src="/images/Rogo_Platform_large.png"
              alt="Rogo Platform V2 Overview"
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* 2-Column Info Grid with Vertical Divider */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 my-16 items-start">
            {/* Left Column Description */}
            <div className="md:col-span-6">
              <p className="text-b2 md:text-b1 text-white/80 leading-relaxed">
                {heroDescription}
              </p>
            </div>

            {/* Right Column: Service, Clients, Tools */}
            <div className="md:col-span-6 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12 space-y-8">
              {/* Service */}
              <div className="space-y-2">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi" ? "Dịch vụ" : "Service"}
                </span>
                <p className="text-b2 text-white/80 leading-relaxed">
                  {heroDescription}
                </p>
              </div>

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

              {/* Tools */}
              <div className="space-y-3">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi" ? "Công cụ" : "Tools"}
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {["Stitch AI", "Figma", "Claude AI", "Gemini CLI", "Vercel"].map((tool) => (
                    <span
                      key={tool}
                      className="text-[12px] font-mono text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Screen Gallery Mockups */}
          {/* Row 1: 2 Cards side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-8">
            <div className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden border border-white/10 shadow-2xl bg-[#181818] group">
              <Image
                src="/images/rogo_project/Desktop.png"
                alt="Rogo Platform Screen 1"
                fill
                className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
            </div>
            <div className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden border border-white/10 shadow-2xl bg-[#181818] group">
              <Image
                src="/images/rogo_project/Frame 35.png"
                alt="Rogo Platform Screen 2"
                fill
                className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Row 2: Full-width card */}
          <div className="relative w-full aspect-[2200/1000] md:aspect-[2.2/1] rounded-[12px] overflow-hidden border border-white/10 shadow-2xl bg-[#181818] mb-24 group">
            <Image
              src="/images/rogo_project/Rogo IoT_Large.png"
              alt="Rogo Platform Screen 3"
              fill
              className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
            />
          </div>

          {/* More Projects Section (Synchronized with About page Featured project layout) */}
          <section className="w-full pt-16 pb-12 border-t border-white/10 space-y-8">
            {/* Header: Title + InteractiveCTA */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-h4 font-bold text-white tracking-tight">
                {lang === "vi" ? "Dự án khác" : "More Projects"}
              </h2>

              <InteractiveCTA text={lang === "vi" ? "Xem tất cả" : "Explore more"} href="/works" />
            </div>

            {/* 3 Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
              {/* Card 1: RaIO Smart */}
              <Link
                href="/works"
                className="group block flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Mockup Thumbnail */}
                  <div className="relative w-full aspect-[16/10] rounded-[12px] overflow-hidden bg-[#181818] border border-white/10 shadow-md">
                    <Image
                      src="/images/raio.png"
                      alt="RaIO Smart"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                      ? "Framework whitelabel thông minh giúp các thương hiệu IoT tùy biến ứng dụng linh hoạt."
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
                      ? "Bộ công cụ trực quan cấu hình thiết bị IoT và thiết lập tự động hóa hàng đầu Việt Nam 2023."
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
                      ? "Nền tảng cộng đồng chia sẻ câu lệnh AI và tự động hóa quy trình cho lập trình viên."
                      : "Community AI prompt sharing & workflow automation platform for tech leaders."}
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
