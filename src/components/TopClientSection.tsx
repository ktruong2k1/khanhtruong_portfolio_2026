"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, Transition } from "framer-motion";
import { Maximize2, Minimize2 } from "lucide-react";

interface TopClientSectionProps {
  lang?: "vi" | "en";
  onOpenContact?: () => void;
}

const clientLogos = [
  { name: "ROGO Solutions", src: "/images/Rogo_color.svg", tag: "Top innovation brand in Vietnam 2023" },
  { name: "FPT Smart Home", src: "/images/FPTSmartHome_color.svg", tag: "Leading Smart Home Ecosystem" },
  { name: "Rạng Đông", src: "/images/RangDong_color.svg", tag: "Top 1 IoT manufacturer brand in Vietnam" },
  { name: "VietinBank Securities", src: "/images/VietinBankS_color.svg", tag: "Enterprise Financial Tech" },
  { name: "VCBS", src: "/images/VCBS_color.svg", tag: "Securities & Trading System" },
  { name: "Think & Action", src: "/images/Think_Action_color.svg", tag: "Innovation & Growth Partner" },
];

export default function TopClientSection({
  lang = "en",
  onOpenContact,
}: TopClientSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.35, once: false });
  const [userToggled, setUserToggled] = useState<boolean | null>(null);

  // Auto-expand when locked into view or manually toggled
  const isExpanded = userToggled !== null ? userToggled : isInView;
  const shouldReduceMotion = useReducedMotion();

  // Spring physics for logo layout morphing
  const springTransition: Transition = shouldReduceMotion
    ? { duration: 0.2 }
    : { type: "spring", damping: 22, stiffness: 180 };

  return (
    <section
      ref={sectionRef}
      id="top-clients"
      className="w-full bg-[#0A0A0A] text-white overflow-hidden relative border-t border-b border-white/5 py-16 px-6 md:px-12 lg:px-[80px]"
    >
      <div className="max-w-[1440px] mx-auto w-full transition-all duration-500">
        
        {/* Top Header Row with Toggle Button */}
        <div className="w-full flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <h3 className="font-mono text-2xl md:text-3xl font-bold text-white tracking-tight">
              Top Client
            </h3>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 hidden sm:inline-block">
              {isExpanded ? "Expanded Detail View" : "Compact Overview"}
            </span>
          </div>

          <button
            onClick={() => setUserToggled(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 transition-all cursor-pointer"
          >
            {isExpanded ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-[#00DC6C]" />
                <span>Collapse</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-[#00DC6C]" />
                <span>Expand Details</span>
              </>
            )}
          </button>
        </div>

        {/* INITIAL STATE: Compact Horizontal Row */}
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.4 }}
            className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center py-12"
          >
            {clientLogos.map((client) => (
              <motion.div
                key={client.name}
                layoutId={shouldReduceMotion ? undefined : `logo-${client.name}`}
                transition={springTransition}
                className="w-full flex items-center justify-center p-2 group cursor-pointer"
                onClick={() => setUserToggled(true)}
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
          </motion.div>
        )}

        {/* EXPANDED STATE: Staggered Partner Blocks & Featured Cards */}
        {isExpanded && (
          <div className="space-y-24">
            
            {/* PARTNER BLOCK 1: Rogo Solutions */}
            <div className="space-y-12">
              {/* Partner Highlight Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Column: Shared Layout Logo + Caption */}
                <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                  <motion.div
                    layoutId={shouldReduceMotion ? undefined : "logo-ROGO Solutions"}
                    transition={springTransition}
                    className="relative w-48 h-16"
                  >
                    <Image
                      src="/images/Rogo_color.svg"
                      alt="Rogo Solutions"
                      fill
                      className="object-contain object-left filter brightness-0 invert"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: shouldReduceMotion ? 0 : 0.15,
                    }}
                    className="space-y-4"
                  >
                    <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                      Top innovation brand in Vietnam 2023
                    </h2>
                    <p className="font-sans text-white/70 text-base leading-relaxed">
                      {lang === "vi"
                        ? "Đối tác chiến lược phát triển hệ điều hành IoT doanh nghiệp và kiến trúc nền tảng Whitelabel SaaS multi-tenant hàng đầu."
                        : "Partnered to engineer enterprise IoT control planes and whitelabel SaaS ecosystems for high-scale multi-tenant deployments."}
                    </p>
                  </motion.div>
                </div>

                {/* Right Column: Supporting Award Ceremony Photo */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: shouldReduceMotion ? 0 : 0.25,
                  }}
                  className="lg:col-span-7"
                >
                  <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <Image
                      src="/images/Thing_AI_VN.png"
                      alt="Rogo Solutions Award Ceremony"
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Related Featured Project Card 1: Rogo IoT Platform v2 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : 0.4,
                }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#141414] p-8 md:p-12 rounded-3xl border border-white/10"
              >
                {/* Left Column: Laptop Stand Screen Mockup */}
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

                {/* Right Column: Card Details */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-[11px] font-bold tracking-widest text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                      FEATURED
                    </span>
                    <span className="font-mono text-[11px] font-bold tracking-widest text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                      PAAS • B2B
                    </span>
                  </div>

                  <h3 className="font-mono text-3xl md:text-5xl font-bold text-white tracking-tight">
                    Rogo IoT Platform v2
                  </h3>

                  <p className="font-sans text-white/80 text-base leading-relaxed">
                    {lang === "vi"
                      ? "Rogo Solutions xây dựng và vận hành core nền tảng có khả năng whitelabel toàn diện. Mỗi thương hiệu đối tác sở hữu instance riêng: cùng kiến trúc, cùng control plane, nhưng thể hiện bản sắc thương hiệu độc lập."
                      : "Rogo Solutions builds and operates the core — and the platform itself is whitelabelable. Each partner brand gets their own instance: same architecture, same control plane, their own identity."}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* PARTNER BLOCK 2: Rạng Đông */}
            <div className="space-y-12 pt-12 border-t border-white/10">
              {/* Partner Highlight Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Column: Shared Layout Logo + Caption */}
                <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                  <motion.div
                    layoutId={shouldReduceMotion ? undefined : "logo-Rạng Đông"}
                    transition={springTransition}
                    className="relative w-48 h-16"
                  >
                    <Image
                      src="/images/RangDong_color.svg"
                      alt="Rạng Đông"
                      fill
                      className="object-contain object-left filter brightness-0 invert"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: shouldReduceMotion ? 0 : 0.15,
                    }}
                    className="space-y-4"
                  >
                    <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                      Top 1 IoT manufacturer brand in Vietnam
                    </h2>
                    <p className="font-sans text-white/70 text-base leading-relaxed">
                      {lang === "vi"
                        ? "Đồng hành thiết kế hệ sinh thái chiếu sáng thông minh và giao diện quản lý phần cứng IoT cho hàng triệu thiết bị kết nối."
                        : "Co-designing smart lighting ecosystems and industrial IoT hardware integration interfaces for millions of connected devices."}
                    </p>
                  </motion.div>
                </div>

                {/* Right Column: Supporting Showroom Photo */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: shouldReduceMotion ? 0 : 0.25,
                  }}
                  className="lg:col-span-7"
                >
                  <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <Image
                      src="/images/thing_partner.png"
                      alt="Rạng Đông Showroom Display"
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Related Featured Project Card 2: RaIO Smart */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : 0.4,
                }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#141414] p-8 md:p-12 rounded-3xl border border-white/10"
              >
                {/* Left Column: RaIO White Card Preview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="font-mono text-sm font-bold text-white/70">
                    Featured project
                  </div>
                  <div className="bg-white p-10 rounded-2xl shadow-xl flex items-center justify-center min-h-[220px]">
                    <div className="relative w-44 h-16">
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
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-bold tracking-widest text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-3 py-1 rounded-full uppercase">
                      FEATURED
                    </span>
                    <span className="font-mono text-[11px] font-bold tracking-widest text-white/70 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                      IoT • Mobile
                    </span>
                  </div>

                  <h3 className="font-mono text-3xl md:text-5xl font-bold text-white tracking-tight">
                    RaIO Smart
                  </h3>

                  <p className="font-sans text-white/80 text-base md:text-lg leading-relaxed">
                    {lang === "vi"
                      ? "Ứng dụng nhà thông minh Whitelabel — Giao diện thích ứng linh hoạt theo thương hiệu đối tác, tối ưu quy trình kết nối & onboarding thiết bị phần cứng IoT phức tạp."
                      : "Whitelabel smart home app — partner-adaptive UI, complex device onboarding."}
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
