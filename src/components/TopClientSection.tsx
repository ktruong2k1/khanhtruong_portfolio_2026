"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface TopClientSectionProps {
  lang?: "vi" | "en";
  onOpenContact?: () => void;
}

const clientLogos = [
  { name: "ROGO Solutions", src: "/images/Rogo_color.svg" },
  { name: "FPT Smart Home", src: "/images/FPTSmartHome_color.svg" },
  { name: "Rạng Đông", src: "/images/RangDong_color.svg" },
  { name: "VietinBank Securities", src: "/images/VietinBankS_color.svg" },
  { name: "VCBS", src: "/images/VCBS_color.svg" },
  { name: "Think & Action", src: "/images/Think_Action_color.svg" },
];

export default function TopClientSection({
  lang = "en",
  onOpenContact,
}: TopClientSectionProps) {
  return (
    <section
      id="top-clients"
      className="w-full bg-[#0A0A0A] text-white overflow-hidden relative"
    >
      {/* CSS Scroll Snap Container scoped to Top Clients + Featured Projects */}
      <div className="w-full snap-y snap-mandatory overflow-y-auto max-h-screen motion-reduce:max-h-none motion-reduce:snap-none">
        
        {/* SUB-BLOCK 0: Compact Top Clients Logo Strip (Initial View) */}
        <div className="min-h-screen h-screen w-full snap-start snap-always flex flex-col justify-between items-center py-20 px-6 md:px-12 lg:px-[80px] bg-[#0A0A0A] relative border-b border-white/5 motion-reduce:h-auto motion-reduce:min-h-0 motion-reduce:py-16">
          <div />

          <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Heading */}
            <div className="lg:col-span-3">
              <h3 className="font-mono text-2xl md:text-3xl font-bold text-white tracking-tight">
                Top Client
              </h3>
            </div>

            {/* Right Logo Grid - Pure monochrome white logos */}
            <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
              {clientLogos.map((client, index) => (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="w-full flex items-center justify-center p-2 group cursor-pointer"
                >
                  <div className="relative h-10 md:h-12 w-full max-w-[140px] opacity-75 group-hover:opacity-100 transition-opacity">
                    <Image
                      src={client.src}
                      alt={client.name}
                      fill
                      className="object-contain filter brightness-0 invert"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll Down Hint */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/50 font-mono text-xs tracking-widest uppercase cursor-pointer"
          >
            <span>Scroll to expand details</span>
            <ChevronDown className="w-4 h-4 text-[#00DC6C]" />
          </motion.div>
        </div>

        {/* SUB-BLOCK 1: Rogo Solutions Partner Highlight */}
        <div className="min-h-screen h-screen w-full snap-start snap-always flex items-center py-16 px-6 md:px-12 lg:px-[80px] bg-[#0A0A0A] relative border-b border-white/5 motion-reduce:h-auto motion-reduce:min-h-0 motion-reduce:py-16">
          <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Logo + Highlight Caption */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div className="relative w-44 h-16">
                <Image
                  src="/images/Rogo_color.svg"
                  alt="Rogo Solutions"
                  fill
                  className="object-contain object-left filter brightness-0 invert"
                />
              </div>
              <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Top innovation brand in Vietnam 2023
              </h2>
              <p className="font-sans text-white/70 text-base leading-relaxed">
                {lang === "vi"
                  ? "Đối tác chiến lược phát triển hệ điều hành IoT doanh nghiệp và kiến trúc nền tảng Whitelabel SaaS multi-tenant hàng đầu."
                  : "Partnered to engineer enterprise IoT control planes and whitelabel SaaS ecosystems for high-scale multi-tenant deployments."}
              </p>
            </div>

            {/* Right Column: Award Ceremony Photo */}
            <div className="lg:col-span-7">
              <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/images/Thing_AI_VN.png"
                  alt="Rogo Solutions Award Ceremony"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SUB-BLOCK 2: Rogo IoT Platform v2 Featured Project */}
        <div id="featured-projects" className="min-h-screen h-screen w-full snap-start snap-always flex items-center py-16 px-6 md:px-12 lg:px-[80px] bg-[#0A0A0A] relative border-b border-white/5 motion-reduce:h-auto motion-reduce:min-h-0 motion-reduce:py-16">
          <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Screen Mockup */}
            <div className="lg:col-span-5">
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
            </div>

            {/* Right Column: Project Card */}
            <div className="lg:col-span-7">
              <div className="bg-[#161616] p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between space-y-6">
                <div>
                  {/* Badges Row */}
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span className="font-mono text-[11px] font-bold tracking-widest text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                      FEATURED
                    </span>
                    <span className="font-mono text-[11px] font-bold tracking-widest text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                      PAAS • B2B
                    </span>

                    {/* Client Logos Strip */}
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
                  <h3 className="font-mono text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    Rogo IoT Platform v2
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-white/80 text-sm md:text-base leading-relaxed mb-6">
                    {lang === "vi"
                      ? "Rogo Solutions xây dựng và vận hành core nền tảng có khả năng whitelabel toàn diện. Mỗi thương hiệu đối tác sở hữu instance riêng: cùng kiến trúc, cùng control plane, nhưng thể hiện bản sắc thương hiệu độc lập."
                      : "Rogo Solutions builds and operates the core — and the platform itself is whitelabelable. Each partner brand gets their own instance: same architecture, same control plane, their own identity."}
                  </p>
                </div>

                {/* Showroom Photo */}
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
        </div>

        {/* SUB-BLOCK 3: Rạng Đông Partner Highlight */}
        <div className="min-h-screen h-screen w-full snap-start snap-always flex items-center py-16 px-6 md:px-12 lg:px-[80px] bg-[#0A0A0A] relative border-b border-white/5 motion-reduce:h-auto motion-reduce:min-h-0 motion-reduce:py-16">
          <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Logo + Highlight Caption */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div className="relative w-48 h-16">
                <Image
                  src="/images/RangDong_color.svg"
                  alt="Rạng Đông"
                  fill
                  className="object-contain object-left filter brightness-0 invert"
                />
              </div>
              <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Top 1 IoT manufacturer brand in Vietnam
              </h2>
              <p className="font-sans text-white/70 text-base leading-relaxed">
                {lang === "vi"
                  ? "Đồng hành thiết kế hệ sinh thái chiếu sáng thông minh và giao diện quản lý phần cứng IoT cho hàng triệu thiết bị kết nối."
                  : "Co-designing smart lighting ecosystems and industrial IoT hardware integration interfaces for millions of connected devices."}
              </p>
            </div>

            {/* Right Column: Showroom Photo */}
            <div className="lg:col-span-7">
              <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/images/thing_partner.png"
                  alt="Rạng Đông Showroom Display"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SUB-BLOCK 4: RaIO Smart Featured Project */}
        <div className="min-h-screen h-screen w-full snap-start snap-always flex items-center py-16 px-6 md:px-12 lg:px-[80px] bg-[#0A0A0A] relative motion-reduce:h-auto motion-reduce:min-h-0 motion-reduce:py-16">
          <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: RaIO White Card Preview */}
            <div className="lg:col-span-5 space-y-6">
              <div className="font-mono text-xl font-bold text-white/70 mb-2">
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

            {/* Right Column: Content */}
            <div className="lg:col-span-7">
              <div className="bg-[#161616] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl space-y-6">
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
        </div>

      </div>
    </section>
  );
}
