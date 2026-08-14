"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface WhyMeSectionProps {
  lang: "vi" | "en";
  onOpenContact: () => void;
}

export default function WhyMeSection({ lang, onOpenContact }: WhyMeSectionProps) {
  const stats = [
    { number: "3,5+", label: lang === "vi" ? "Năm kinh nghiệm" : "Year Experience" },
    { number: "20+", label: lang === "vi" ? "Dự án đã triển khai" : "Project deployed" },
    { number: "20+", label: lang === "vi" ? "Khách hàng hài lòng" : "Happy Clients" },
  ];

  return (
    <section id="why-me" className="py-24 px-6 md:px-12 lg:px-[80px] bg-[#121212] text-white border-b border-white/5 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto space-y-20 w-full">
        {/* Top Header & Paragraph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Left Label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 min-w-0"
          >
            <h3 className="font-mono text-xl md:text-2xl font-bold text-white">
              Why me
            </h3>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-9 space-y-8 w-full min-w-0"
          >
            <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold leading-snug text-white tracking-tight w-full block whitespace-normal">
              {lang === "vi"
                ? "Thu hẹp khoảng cách giữa tầm nhìn thẩm mỹ độ trung thực cao và việc thực thi kỹ thuật nghiêm ngặt — dành cho các sản phẩm SaaS, từ nền tảng multi-tenant đến hệ sinh thái IoT."
                : "Bridging the gap between high-fidelity aesthetic vision and rigorous technical execution — for SaaS products, from multi-tenant platforms to IoT ecosystems."}
            </h2>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenContact}
                className="bg-[#00DC6C] hover:bg-[#00c560] text-black font-sans font-semibold rounded-xl px-7 py-3 text-base transition-all cursor-pointer shadow-lg active:scale-95"
              >
                Explore Now
              </button>
              <button
                onClick={onOpenContact}
                className="bg-white hover:bg-gray-100 text-black p-3 rounded-xl transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5 text-black" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid - Appear from top to bottom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 w-full">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
              className="border-t border-white/20 pt-8 flex flex-col justify-between min-w-0"
            >
              <div className="font-mono text-6xl sm:text-7xl lg:text-[88px] font-bold text-white tracking-tight mb-4">
                {stat.number}
              </div>
              <div className="font-mono text-base md:text-xl font-medium text-white/90 whitespace-normal">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Running Marquee Text Ticker ("text chữ sẽ chạy") */}
        <div className="w-full overflow-hidden py-8 border-t border-b border-white/10 mt-16 bg-[#161616]">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-16 whitespace-nowrap font-mono text-4xl md:text-6xl font-bold text-white/20 select-none"
          >
            <span>3,5+ YEARS EXP</span>
            <span>•</span>
            <span>20+ PROJECTS DEPLOYED</span>
            <span>•</span>
            <span>20+ HAPPY CLIENTS</span>
            <span>•</span>
            <span>PRODUCT DESIGNER</span>
            <span>•</span>
            <span>IOT PLATFORMS</span>
            <span>•</span>
            <span>SAAS & DASHBOARDS</span>
            <span>•</span>
            <span>3,5+ YEARS EXP</span>
            <span>•</span>
            <span>20+ PROJECTS DEPLOYED</span>
            <span>•</span>
            <span>20+ HAPPY CLIENTS</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
