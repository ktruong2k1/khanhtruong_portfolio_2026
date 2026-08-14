"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface FeaturedProjectsSectionProps {
  lang: "vi" | "en";
  onOpenContact: () => void;
}

export default function FeaturedProjectsSection({
  lang,
  onOpenContact,
}: FeaturedProjectsSectionProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Vertical scroll transformation inside pinned 100vh sticky viewport
  const y = useTransform(scrollYProgress, [0, 0.95], ["0%", "-50%"]);

  return (
    <section
      id="featured-projects"
      ref={targetRef}
      className="relative h-[250vh] bg-[#121212] text-white"
    >
      {/* Sticky 100vh Full Viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center px-6 md:px-12 lg:px-[80px]">
        <div className="max-w-[1440px] mx-auto w-full h-full flex items-center overflow-hidden relative">
          <motion.div style={{ y }} className="w-full flex flex-col space-y-24 py-12">
            {/* Project 1 Block: Rogo IoT Platform v2 */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch min-h-[80vh]">
              {/* Left Column - Branding & Laptop Stand Mockup */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                {/* Top Brand Info */}
                <div className="flex items-start gap-4">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src="/images/Rogo_color.svg"
                      alt="Rogo Solutions"
                      fill
                      className="object-contain filter brightness-0 invert"
                    />
                  </div>
                  <div>
                    <p className="font-mono text-sm md:text-base text-white/90 font-medium">
                      Top innovation brand in Vietnam 2023
                    </p>
                  </div>
                </div>

                {/* Laptop Stand Screen Mockup */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#1E1E1E] border border-white/10 p-3 shadow-2xl group">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src="/images/Rogo_Platform_large.png"
                      alt="Rogo IoT Platform Interface"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Bottom Brand Info (Rang Dong) */}
                <div className="flex items-start gap-4 pt-4 border-t border-white/10">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src="/images/RangDong_color.svg"
                      alt="Rạng Đông"
                      fill
                      className="object-contain filter brightness-0 invert"
                    />
                  </div>
                  <div>
                    <p className="font-mono text-sm md:text-base text-white/90 font-medium">
                      Top 1 IoT manufacturer brand in Vietnam
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Project Content & Showcase Photos */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                {/* Top Showcase Image (Award Stage Photo) */}
                <div className="relative w-full h-44 md:h-52 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src="/images/Thing_AI_VN.png"
                    alt="Award ceremony stage photo"
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Main Project Details Card */}
                <div className="bg-[#181818] p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between flex-grow space-y-6">
                  <div>
                    {/* Badges Row */}
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="font-mono text-[11px] font-bold tracking-widest text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                        FEATURED
                      </span>
                      <span className="font-mono text-[11px] font-bold tracking-widest text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                        PAAS • B2B
                      </span>

                      {/* Client Logos Strip (White monochrome) */}
                      <div className="ml-auto flex items-center gap-4 opacity-70">
                        <div className="relative w-6 h-6">
                          <Image
                            src="/images/Rogo_color.svg"
                            alt="Rogo"
                            fill
                            className="object-contain filter brightness-0 invert"
                          />
                        </div>
                        <div className="relative w-6 h-6">
                          <Image
                            src="/images/RangDong_color.svg"
                            alt="Rang Dong"
                            fill
                            className="object-contain filter brightness-0 invert"
                          />
                        </div>
                        <div className="relative w-6 h-6">
                          <Image
                            src="/images/FPTSmartHome_color.svg"
                            alt="FPT"
                            fill
                            className="object-contain filter brightness-0 invert"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-mono text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                      Rogo IoT Platform v2
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-white/80 text-xs md:text-sm leading-relaxed">
                      {lang === "vi"
                        ? "Rogo Solutions xây dựng và vận hành core nền tảng có khả năng whitelabel toàn diện. Mỗi thương hiệu đối tác sở hữu instance riêng: cùng kiến trúc, cùng control plane, nhưng thể hiện bản sắc thương hiệu độc lập. Logic whitelabel được xử lý ngay từ tầng kiến trúc core."
                        : "Rogo Solutions builds and operates the core — and the platform itself is whitelabelable. Each partner brand gets their own instance: same architecture, same control plane, their own identity. The whitelabel logic doesn't start at the app layer — it starts here."}
                    </p>
                  </div>

                  {/* Bottom Showroom Photo */}
                  <div className="relative w-full h-36 md:h-44 rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src="/images/thing_partner.png"
                      alt="Showroom display"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 Block: RaIO Smart */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[80vh]">
              {/* Left Column - Card Preview */}
              <div className="lg:col-span-5 space-y-6">
                <div className="font-mono text-xl font-bold text-white mb-2">
                  Featured project
                </div>
                <div className="bg-white p-12 rounded-3xl shadow-2xl flex items-center justify-center min-h-[260px]">
                  <div className="relative w-48 h-20">
                    <Image
                      src="/images/raio.png"
                      alt="RaIO Smart Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="lg:col-span-7">
                <div className="bg-[#181818] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl space-y-6">
                  {/* Badges */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-bold tracking-widest text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                      FEATURED
                    </span>
                    <span className="font-mono text-[11px] font-bold tracking-widest text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                      IoT • Mobile
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-mono text-3xl md:text-5xl font-bold text-white tracking-tight">
                    RaIO Smart
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-white/80 text-base md:text-lg leading-relaxed">
                    {lang === "vi"
                      ? "Ứng dụng nhà thông minh Whitelabel — Giao diện thích ứng linh hoạt theo thương hiệu đối tác, tối ưu quy trình kết nối & onboarding thiết bị phần cứng IoT phức tạp."
                      : "Whitelabel smart home app — partner-adaptive UI, complex device onboarding."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
