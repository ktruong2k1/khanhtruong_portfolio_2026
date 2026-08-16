"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll progress within tall pinned container (450vh)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Header "Top Client" Opacity: Fixed 100% visible throughout entire section, ONLY fades out when scrolling past the last project card (0.90 -> 0.98)
  const headerOpacity = useTransform(scrollYProgress, [0.0, 0.90, 0.98], [1, 1, 0]);

  // Container Opacity & Scale & Display for logos
  const logoGroupOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.35, 0.42],
    [1, 1, 0]
  );
  const logoGroupScale = useTransform(
    scrollYProgress,
    [0.35, 0.42],
    [1, 0.92]
  );
  const logoDisplay = useTransform(scrollYProgress, (v) => (v >= 0.42 ? "none" : "block"));

  // Smart Animate Motion Transforms: 6 logos starting from Horizontally Centered single row -> morph into 3x2 grid
  // Row 1 Target Grid Slots (ROGO, FPT, Rạng Đông)
  const logo0_X = useTransform(scrollYProgress, [0.10, 0.28], ["0px", "210px"]);
  const logo0_Y = useTransform(scrollYProgress, [0.10, 0.28], ["0px", "32vh"]);

  const logo1_X = useTransform(scrollYProgress, [0.10, 0.28], ["0px", "270px"]);
  const logo1_Y = useTransform(scrollYProgress, [0.10, 0.28], ["0px", "32vh"]);

  const logo2_X = useTransform(scrollYProgress, [0.10, 0.28], ["0px", "330px"]);
  const logo2_Y = useTransform(scrollYProgress, [0.10, 0.28], ["0px", "32vh"]);

  // Row 2 Target Grid Slots (VietinBank, VCBS, Think & Action)
  const logo3_X = useTransform(scrollYProgress, [0.10, 0.28], ["0px", "-330px"]);
  const logo3_Y = useTransform(scrollYProgress, [0.10, 0.28], ["0px", "46vh"]);

  const logo4_X = useTransform(scrollYProgress, [0.10, 0.28], ["0px", "-270px"]);
  const logo4_Y = useTransform(scrollYProgress, [0.10, 0.28], ["0px", "46vh"]);

  const logo5_X = useTransform(scrollYProgress, [0.10, 0.28], ["0px", "-210px"]);
  const logo5_Y = useTransform(scrollYProgress, [0.10, 0.28], ["0px", "46vh"]);

  const logoTransforms = [
    { x: logo0_X, y: logo0_Y },
    { x: logo1_X, y: logo1_Y },
    { x: logo2_X, y: logo2_Y },
    { x: logo3_X, y: logo3_Y },
    { x: logo4_X, y: logo4_Y },
    { x: logo5_X, y: logo5_Y },
  ];

  // Step 3: Expanded Detail View - Remains 100% SOLID OPAQUE (opacity: 1) continuously throughout the entire scroll
  const expandedOpacity = useTransform(scrollYProgress, [0.42, 0.48, 0.95, 1.0], [0, 1, 1, 1]);
  const expandedDisplay = useTransform(scrollYProgress, (v) => (v < 0.40 ? "none" : "block"));
  const contentY = useTransform(scrollYProgress, [0.44, 0.90], ["0%", "-62%"]);

  // Fallback for Reduced Motion
  if (shouldReduceMotion) {
    return (
      <section
        id="top-clients"
        className="w-full bg-[#121212] text-white py-24 px-6 md:px-12 lg:px-[80px] border-t border-b border-white/5 relative overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto w-full space-y-24">
          <div className="w-full space-y-8 pb-12 border-b border-white/5">
            <h3 className="font-mono text-2xl md:text-3xl font-bold text-white tracking-tight">
              Top Client
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center py-4">
              {clientLogos.map((client) => (
                <div key={client.name} className="w-full flex items-center justify-center p-2">
                  <div className="relative h-10 md:h-12 w-full max-w-[140px] opacity-80">
                    <Image src={client.src} alt={client.name} fill className="object-contain filter brightness-0 invert" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rogo Solutions */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="relative w-48 h-16">
                  <Image src="/images/Rogo_color.svg" alt="Rogo" fill className="object-contain object-left filter brightness-0 invert" />
                </div>
                <h2 className="font-mono text-3xl font-bold text-white">Top innovation brand in Vietnam 2023</h2>
                <p className="text-white/70">Partnered to engineer enterprise IoT control planes and whitelabel SaaS ecosystems.</p>
              </div>
              <div className="lg:col-span-7">
                <div className="relative w-full aspect-[3/2] rounded-3xl overflow-hidden border border-white/10">
                  <Image src="/images/Thing_AI_VN.png" alt="Award" fill className="object-cover" />
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#181818] p-8 md:p-12 rounded-3xl border border-white/10">
              <div className="lg:col-span-5">
                <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden border border-white/10 p-2">
                  <Image src="/images/Rogo_Platform_large.png" alt="Rogo Platform" fill className="object-cover" />
                </div>
              </div>
              <div className="lg:col-span-7 space-y-6">
                <h3 className="font-mono text-4xl font-bold text-white">Rogo IoT Platform v2</h3>
                <p className="text-white/80">Rogo Solutions builds and operates the core — whitelabelable multi-tenant SaaS architecture.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="top-clients"
      className="relative w-full h-[450vh] bg-[#121212] text-white border-t border-b border-white/5"
    >
      {/* Sticky 100vh Viewport Container (Locks scroll inside section, top padding 130px for 60px gap below topnav) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pt-[130px] pb-12 px-6 md:px-12 lg:px-[80px]">
        
        {/* Fixed Header Bar: "Top Client" text fixed 60px below topnav, ONLY fades out when scrolling past last project card */}
        <motion.div
          style={{ opacity: headerOpacity }}
          className="w-full max-w-[1440px] mx-auto flex items-center justify-between z-30 relative pt-1"
        >
          <h3 className="font-mono text-2xl md:text-3xl font-bold text-white tracking-tight">
            Top Client
          </h3>
        </motion.div>

        {/* SMART ANIMATE LOGO CONTAINER: Horizontally Centered (justify-center) */}
        <motion.div
          style={{
            opacity: logoGroupOpacity,
            scale: logoGroupScale,
            display: logoDisplay,
          }}
          className="absolute top-[138px] left-0 right-0 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[80px] z-20 pointer-events-none"
        >
          <div className="relative w-full flex items-center justify-center">
            <div className="flex items-center gap-6 md:gap-12 py-1">
              {clientLogos.map((client, idx) => (
                <motion.div
                  key={client.name}
                  style={{
                    x: logoTransforms[idx].x,
                    y: logoTransforms[idx].y,
                  }}
                  className="shrink-0 relative h-8 md:h-10 w-28 md:w-36 opacity-85"
                >
                  <Image
                    src={client.src}
                    alt={client.name}
                    fill
                    className="object-contain filter brightness-0 invert"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* EXPANDED DETAIL VIEW: Remains 100% SOLID OPAQUE (opacity: 1) continuously throughout the entire scroll */}
        <motion.div
          style={{
            opacity: expandedOpacity,
            display: expandedDisplay,
          }}
          className="w-full max-w-[1440px] mx-auto h-full pt-12 flex-1 overflow-hidden z-0"
        >
          <motion.div
            style={{ y: contentY }}
            className="w-full space-y-24 pb-32"
          >
            
            {/* PARTNER BLOCK 1: Rogo Solutions & Rogo IoT Platform v2 */}
            <div className="w-full space-y-16">
              {/* Partner Highlight Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Column: Logo + Caption */}
                <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                  <div className="relative w-48 h-16">
                    <Image
                      src="/images/Rogo_color.svg"
                      alt="Rogo Solutions"
                      fill
                      className="object-contain object-left filter brightness-0 invert"
                    />
                  </div>

                  <div className="space-y-4">
                    <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                      Top innovation brand in Vietnam 2023
                    </h2>
                    <p className="font-sans text-white/70 text-base leading-relaxed">
                      {lang === "vi"
                        ? "Đối tác chiến lược phát triển hệ điều hành IoT doanh nghiệp và kiến trúc nền tảng Whitelabel SaaS multi-tenant hàng đầu."
                        : "Partnered to engineer enterprise IoT control planes and whitelabel SaaS ecosystems for high-scale multi-tenant deployments."}
                    </p>
                  </div>
                </div>

                {/* Right Column: Supporting Award Photo */}
                <div className="lg:col-span-7">
                  <div className="relative w-full aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/Thing_AI_VN.png"
                      alt="Rogo Solutions Award Ceremony"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Related Featured Project Card 1: Rogo IoT Platform v2 */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#181818] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
                {/* Left Column: Laptop Stand Screen Mockup */}
                <div className="lg:col-span-5">
                  <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl group">
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
                    <div className="ml-auto flex items-center gap-3 opacity-70">
                      <div className="relative w-5 h-5">
                        <Image src="/images/Rogo_color.svg" alt="Rogo" fill className="object-contain filter brightness-0 invert" />
                      </div>
                      <div className="relative w-5 h-5">
                        <Image src="/images/RangDong_color.svg" alt="Rang Dong" fill className="object-contain filter brightness-0 invert" />
                      </div>
                      <div className="relative w-5 h-5">
                        <Image src="/images/FPTSmartHome_color.svg" alt="FPT" fill className="object-contain filter brightness-0 invert" />
                      </div>
                    </div>
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
              </div>
            </div>

            {/* PARTNER BLOCK 2: Rạng Đông & RaIO Smart */}
            <div className="w-full space-y-16 pt-16 border-t border-white/10">
              {/* Partner Highlight Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Column: Logo + Caption */}
                <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                  <div className="relative w-48 h-16">
                    <Image
                      src="/images/RangDong_color.svg"
                      alt="Rạng Đông"
                      fill
                      className="object-contain object-left filter brightness-0 invert"
                    />
                  </div>

                  <div className="space-y-4">
                    <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                      Top 1 IoT manufacturer brand in Vietnam
                    </h2>
                    <p className="font-sans text-white/70 text-base leading-relaxed">
                      {lang === "vi"
                        ? "Đồng hành thiết kế hệ sinh thái chiếu sáng thông minh và giao diện quản lý phần cứng IoT cho hàng triệu thiết bị kết nối."
                        : "Co-designing smart lighting ecosystems and industrial IoT hardware integration interfaces for millions of connected devices."}
                    </p>
                  </div>
                </div>

                {/* Right Column: Supporting Showroom Photo */}
                <div className="lg:col-span-7">
                  <div className="relative w-full aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/thing_partner.png"
                      alt="Rạng Đông Showroom Display"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Related Featured Project Card 2: RaIO Smart */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#181818] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
                {/* Left Column: RaIO White Card Preview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="font-mono text-sm font-bold text-white/70">
                    Featured project
                  </div>
                  <div className="bg-[#FFFFFF] p-10 rounded-2xl shadow-xl flex items-center justify-center w-full aspect-[3/2]">
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
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
