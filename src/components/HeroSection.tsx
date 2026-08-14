"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  lang: "vi" | "en";
  onOpenContact: () => void;
}

export default function HeroSection({ lang, onOpenContact }: HeroSectionProps) {
  const scrollToAbout = () => {
    const el = document.getElementById("why-me");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center bg-[#121212] relative overflow-hidden px-6 md:px-12 lg:px-[80px] pt-32 pb-16"
    >
      <div className="max-w-[1440px] mx-auto w-full my-auto flex flex-col justify-center">
        {/* Gold Portfolio tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[#C6A85B] text-lg md:text-xl font-bold tracking-wide mb-6"
        >
          Portfolio
        </motion.div>

        {/* 2-Column Alignment Grid: Top-Left (Name), Top-Right (Role+Avatar), Bottom-Left (Sub Content), Bottom-Right (CTA Buttons) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 gap-y-[60px] items-start">
          {/* Top-Left: Name Heading (96px font size) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start min-w-0"
          >
            <h1 className="font-mono text-5xl sm:text-7xl lg:text-[96px] font-normal text-white leading-[1.0] tracking-tight whitespace-normal">
              Khanhtruong
              <br />
              Nguyen
            </h1>
          </motion.div>

          {/* Top-Right: Job Title + Badges + Avatar (Aligned TOP with Name) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex items-start gap-6 pt-2"
          >
            <div className="flex flex-col items-start text-left">
              <h2 className="font-mono text-3xl sm:text-4xl lg:text-[44px] font-bold text-white mb-3 tracking-tight whitespace-nowrap">
                Product Designer
              </h2>
              <div className="flex items-center gap-3 flex-wrap justify-start">
                <span className="font-mono text-[#00DC6C] font-bold text-lg sm:text-xl whitespace-nowrap">
                  3,5 years exp
                </span>
                <span className="border border-white/20 rounded-full px-3 py-1 text-xs font-sans text-white/80 flex items-center gap-1.5 bg-white/5 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-[#00DC6C] animate-pulse" />
                  Available for Remote
                </span>
              </div>
            </div>

            {/* Profile Avatar */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-[104px] lg:h-[104px] rounded-full bg-[#00DC6C] flex-shrink-0 overflow-hidden shadow-2xl border-2 border-[#00DC6C]">
              <Image
                src="/images/KT_profilie.png"
                alt="Khanhtruong Nguyen"
                fill
                className="object-cover object-top scale-105"
                priority
              />
            </div>
          </motion.div>

          {/* Bottom-Left: Sub Content Paragraph (16px text, width matching Khanhtruong text ~635px) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7 flex flex-col items-start min-w-0"
          >
            <p className="font-sans text-white/80 text-[16px] leading-relaxed font-light w-full max-w-[635px] block whitespace-normal">
              {lang === "vi"
                ? "Thu hẹp khoảng cách giữa tầm nhìn thẩm mỹ độ trung thực cao và việc thực thi kỹ thuật nghiêm ngặt — dành cho các sản phẩm SaaS, từ nền tảng multi-tenant đến hệ sinh thái IoT."
                : "Bridging the gap between high-fidelity aesthetic vision and rigorous technical execution — for SaaS products, from multi-tenant platforms to IoT ecosystems."}
            </p>
          </motion.div>

          {/* Bottom-Right: CTA Buttons (Aligned LEFT with Product Designer job title) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 flex items-center gap-3"
          >
            <button
              onClick={scrollToAbout}
              className="bg-[#00DC6C] hover:bg-[#00c560] text-black font-sans font-semibold rounded-xl px-7 py-3.5 text-base transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[#00DC6C]/20 hover:scale-[1.02] active:scale-95"
            >
              {lang === "vi" ? "Về tôi" : "About me"}
            </button>
            <button
              onClick={onOpenContact}
              className="bg-white hover:bg-gray-100 text-black p-3.5 rounded-xl transition-all duration-200 cursor-pointer shadow-lg hover:scale-[1.02] active:scale-95 flex items-center justify-center"
              aria-label="Contact"
            >
              <ArrowRight className="w-5 h-5 text-black" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
