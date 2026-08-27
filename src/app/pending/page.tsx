"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactModal from "@/components/ContactModal";
import InteractiveCTA from "@/components/InteractiveCTA";
import { useLanguage } from "@/context/LanguageContext";

export default function PendingPage() {
  const { lang, setLang } = useLanguage();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212] text-white selection:bg-[#00DC6C] selection:text-black flex flex-col justify-between overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-[10vh] pt-28 md:pt-36 pb-24">
        <div className="w-full space-y-12 sm:space-y-16">
          
          {/* Header Block: Standard Back CTA + Title + Description */}
          <div className="max-w-[900px] space-y-8 sm:space-y-10 lg:space-y-12">
            {/* Standard Back CTA Button */}
            <div>
              <InteractiveCTA
                direction="back"
                text={lang === "vi" ? "Quay lại danh sách" : "Back to all works"}
                href="/works"
              />
            </div>

            {/* Status Chip & Main Title & Description */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-mono font-bold text-[#E8C468] bg-[#E8C468]/10 border border-[#E8C468]/20 tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#E8C468] animate-pulse" />
                  {lang === "vi" ? "ĐANG CẬP NHẬT DỰ ÁN" : "UPDATE IN PROGRESS"}
                </span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                {lang === "vi" ? "Dự án này đang được cập nhật" : "This project currently updating"}
              </h1>

              <p className="text-b2 md:text-b1 text-white/70 leading-relaxed max-w-[760px] font-normal">
                {lang === "vi"
                  ? "Tài liệu thiết kế và case study chi tiết cho dự án này đang trong quá trình hoàn thiện. Trong thời gian chờ đợi, mời bạn khám phá các dự án nổi bật đã hoàn chỉnh bên dưới."
                  : "The full case study and documentation for this project are currently being finalized. In the meantime, explore our featured live case studies below."}
              </p>
            </div>
          </div>

          {/* Section: Explore our featured projects (3 Projects: Rogo, RaIO, Thing AI - No outer card border outline) */}
          <section className="w-full pt-16 pb-8 border-t-2 border-white/10 space-y-8">
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-b3 font-mono font-bold text-[#00DC6C] uppercase tracking-widest mb-1">
                  {lang === "vi" ? "DỰ ÁN ĐÃ HOÀN THIỆN" : "AVAILABLE CASE STUDIES"}
                </div>
                <h2 className="text-h4 font-bold text-white tracking-tight">
                  {lang === "vi" ? "Khám phá các dự án nổi bật" : "Explore our featured projects"}
                </h2>
              </div>

              <InteractiveCTA text={lang === "vi" ? "Xem tất cả" : "Explore more"} href="/works" />
            </div>

            {/* 3 Project Cards Grid (Clean layout, no outer card box borders) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
              
              {/* Card 1: Rogo Platform V2 */}
              <Link
                href="/works/rogo-platform-v2"
                className="group block flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="relative w-full aspect-[4/3] rounded-[8px] lg:rounded-[12px] overflow-hidden bg-[#181818]">
                    <Image
                      src="/images/Rogo_dashboard_thumb.png"
                      alt="Rogo Platform V2"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-block text-[11px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2 py-0.5 rounded-full uppercase">
                      FEATURED
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      PAAS • B2B
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      WHITELABEL
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      DESKTOP
                    </span>
                  </div>

                  <h3 className="text-h5 sm:text-h4 font-bold text-white group-hover:text-[#00DC6C] transition-colors">
                    Rogo Platform V2
                  </h3>

                  <p className="text-b3 text-white/70 leading-relaxed font-mono">
                    {lang === "vi"
                      ? "Nền tảng quản trị IoT whitelabel đa tầng — kiến trúc phân quyền đa tổ chức."
                      : "Whitelabel IoT platform core — multi-tenant ABAC access control plane."}
                  </p>
                </div>
              </Link>

              {/* Card 2: RaIO Smart */}
              <Link
                href="/works/raio-smart"
                className="group block flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="relative w-full aspect-[4/3] rounded-[8px] lg:rounded-[12px] overflow-hidden bg-[#181818]">
                    <Image
                      src="/images/RaIO_smart_thumb.png"
                      alt="RaIO Smart"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-block text-[11px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2 py-0.5 rounded-full uppercase">
                      FEATURED
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      WHITELABEL
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      MOBILE
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      IOT
                    </span>
                  </div>

                  <h3 className="text-h5 sm:text-h4 font-bold text-white group-hover:text-[#00DC6C] transition-colors">
                    RaIO Smart
                  </h3>

                  <p className="text-b3 text-white/70 leading-relaxed font-mono">
                    {lang === "vi"
                      ? "Framework ứng dụng nhà thông minh dạng Whitelabel cho nhiều đối tác thương hiệu."
                      : "Whitelabel smart home app framework enabling partner brand customization."}
                  </p>
                </div>
              </Link>

              {/* Card 3: Thing AI VN */}
              <Link
                href="/works/thing-ai-vn"
                className="group block flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="relative w-full aspect-[4/3] rounded-[8px] lg:rounded-[12px] overflow-hidden bg-[#181818]">
                    <Image
                      src="/images/Thing_AI_VN.png"
                      alt="Thing AI VN"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-block text-[11px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2 py-0.5 rounded-full uppercase">
                      FEATURED
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      COMMUNITY
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      OPEN SOURCE
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      WEB
                    </span>
                  </div>

                  <h3 className="text-h5 sm:text-h4 font-bold text-white group-hover:text-[#00DC6C] transition-colors">
                    Thing AI VN
                  </h3>

                  <p className="text-b3 text-white/70 leading-relaxed font-mono">
                    {lang === "vi"
                      ? "Cộng đồng mở kết nối học sinh, sinh viên, maker và doanh nghiệp xung quanh các giải pháp IoT thực tế."
                      : "Open community connecting makers and businesses around real-world IoT solutions."}
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
