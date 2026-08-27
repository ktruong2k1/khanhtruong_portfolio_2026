"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactModal from "@/components/ContactModal";
import { useLanguage } from "@/context/LanguageContext";

export default function PendingPage() {
  const { lang, setLang } = useLanguage();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212] text-white selection:bg-[#00DC6C] selection:text-black flex flex-col justify-between font-sans">
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-[10vh] pt-[120px] sm:pt-[140px] md:pt-[160px] pb-16 sm:pb-24">
        
        {/* Header Block: Status Tag + Big Title + Description */}
        <div className="max-w-[840px] text-left space-y-6 mb-16 sm:mb-20">
          {/* Status Chip */}
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold text-[#E8C468] bg-[#E8C468]/10 border border-[#E8C468]/20 tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#E8C468] animate-pulse" />
              {lang === "vi" ? "ĐANG CẬP NHẬT DỰ ÁN" : "UPDATE IN PROGRESS"}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold font-heading text-white tracking-tight leading-[1.15]">
            {lang === "vi" ? "Dự án này đang được cập nhật" : "This project currently updating"}
          </h1>

          {/* Subtitle Description */}
          <p className="text-base sm:text-lg text-white/70 font-mono leading-relaxed max-w-2xl">
            {lang === "vi"
              ? "Tài liệu thiết kế và case study chi tiết cho dự án này đang trong quá trình hoàn thiện. Trong thời gian chờ đợi, mời bạn khám phá các dự án nổi bật đã hoàn chỉnh bên dưới."
              : "The full case study and documentation for this project are currently being finalized. In the meantime, explore our featured live case studies below."}
          </p>

          {/* Back Link */}
          <div className="pt-2">
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-sm font-mono font-bold text-[#00DC6C] hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{lang === "vi" ? "QUAY LẠI TẤT CẢ DỰ ÁN" : "BACK TO ALL WORKS"}</span>
            </Link>
          </div>
        </div>

        {/* Section: Explore our featured projects */}
        <div className="border-t border-white/10 pt-12 sm:pt-16 space-y-8 sm:space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs sm:text-sm font-mono font-bold text-[#00DC6C] uppercase tracking-widest mb-1">
                {lang === "vi" ? "DỰ ÁN ĐÃ HOÀN THIỆN" : "AVAILABLE CASE STUDIES"}
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold font-heading text-white tracking-tight">
                {lang === "vi" ? "Khám phá các dự án nổi bật" : "Explore our featured projects"}
              </h2>
            </div>

            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-sm font-mono text-white/60 hover:text-[#00DC6C] transition-colors"
            >
              <span>{lang === "vi" ? "Xem tất cả dự án" : "View all projects"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 2 Side-by-Side Featured Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full">
            
            {/* Card 1: Rogo IoT Platform v2 / Rogo Dashboard */}
            <Link
              href="/works/rogo-dashboard"
              className="group flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 bg-[#181818]/60 hover:bg-[#1C1C1C] border border-white/10 hover:border-[#00DC6C]/40 rounded-[16px] p-5 sm:p-7 shadow-2xl"
            >
              <div className="space-y-5">
                {/* Thumbnail Mockup */}
                <div className="relative w-full aspect-[16/10] rounded-[12px] overflow-hidden bg-[#121212] border border-white/10">
                  <Image
                    src="/images/Rogo_dashboard_thumb.png"
                    alt="Rogo IoT Platform v2"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-block text-[11px] sm:text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-0.5 rounded-full uppercase">
                    FEATURED
                  </span>
                  <span className="inline-block text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-0.5 rounded-full uppercase">
                    PAAS • B2B
                  </span>
                  <span className="inline-block text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-0.5 rounded-full uppercase">
                    WHITELABEL
                  </span>
                  <span className="inline-block text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-0.5 rounded-full uppercase">
                    DESKTOP
                  </span>
                </div>

                {/* Title with Hover Arrow */}
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white group-hover:text-[#00DC6C] transition-colors flex items-center justify-between">
                  <span>Rogo IoT Platform v2</span>
                  <ArrowUpRight className="w-5 h-5 text-[#00DC6C] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 ml-2" />
                </h3>

                {/* Description */}
                <p className="text-[13px] sm:text-[14px] text-white/70 font-mono leading-relaxed">
                  {lang === "vi"
                    ? "Bảng điều khiển IoT cấp doanh nghiệp được thiết kế cho quản lý thiết bị đa thương hiệu và mở rộng quy mô đội thiết bị. 4 vai trò người dùng · 3 thương hiệu đối tác · thiết kế và bàn giao end-to-end."
                    : "Enterprise-grade IoT Dashboard designed for multibrand device management and fleet scaling. 4 user roles · 3 partner brands · end-to-end design & handoff."}
                </p>
              </div>
            </Link>

            {/* Card 2: RaIO Smart whitelabel app */}
            <Link
              href="/works/raio-smart"
              className="group flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 bg-[#181818]/60 hover:bg-[#1C1C1C] border border-white/10 hover:border-[#00DC6C]/40 rounded-[16px] p-5 sm:p-7 shadow-2xl"
            >
              <div className="space-y-5">
                {/* Thumbnail Mockup */}
                <div className="relative w-full aspect-[16/10] rounded-[12px] overflow-hidden bg-[#121212] border border-white/10">
                  <Image
                    src="/images/RaIO_smart_thumb.png"
                    alt="RaIO Smart whitelabel app"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-block text-[11px] sm:text-[12px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-0.5 rounded-full uppercase">
                    FEATURED
                  </span>
                  <span className="inline-block text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-0.5 rounded-full uppercase">
                    WHITELABEL
                  </span>
                  <span className="inline-block text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-0.5 rounded-full uppercase">
                    MOBILE
                  </span>
                  <span className="inline-block text-[11px] sm:text-[12px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-3 py-0.5 rounded-full uppercase">
                    IOT
                  </span>
                </div>

                {/* Title with Hover Arrow */}
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white group-hover:text-[#00DC6C] transition-colors flex items-center justify-between">
                  <span>RaIO Smart whitelabel app</span>
                  <ArrowUpRight className="w-5 h-5 text-[#00DC6C] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 ml-2" />
                </h3>

                {/* Description */}
                <p className="text-[13px] sm:text-[14px] text-white/70 font-mono leading-relaxed">
                  {lang === "vi"
                    ? "Bộ khung ứng dụng nhà thông minh whitelabel có thể tái sử dụng cho nhiều thương hiệu triển khai nhanh chóng. Giao diện thích ứng đối tác, quy trình kết nối thiết bị chuyên sâu."
                    : "Reusable whitelabel smart home framework built for rapid multi-brand deployment. Partner-adaptive UI, complex device onboarding, same core logic."}
                </p>
              </div>
            </Link>

          </div>
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
