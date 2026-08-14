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
      className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-[80px] flex flex-col justify-center bg-[#121212] relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto w-full flex flex-col justify-between space-y-16 lg:space-y-24">
        {/* Top Row: Left (Portfolio + Name) & Right (Role + Exp + Avatar) */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-start gap-8">
          {/* Top Left: Gold tag + Huge Name Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start min-w-0"
          >
            {/* Gold Portfolio tag */}
            <div className="font-mono text-[#C6A85B] text-lg md:text-xl font-bold tracking-wide mb-4">
              Portfolio
            </div>

            {/* Main Name Heading */}
            <h1 className="font-mono text-5xl sm:text-7xl lg:text-[88px] font-normal text-white leading-[1.05] tracking-tight whitespace-normal">
              Khanhtruong
              <br />
              Nguyen
            </h1>
          </motion.div>

          {/* Top Right: Role + Years Exp + Avatar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-6 pt-2 flex-shrink-0"
          >
            <div className="flex flex-col items-start lg:items-end">
              <h2 className="font-mono text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight whitespace-nowrap">
                Product Designer
              </h2>
              <div className="flex items-center gap-3 flex-wrap justify-start lg:justify-end">
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
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#00DC6C] flex-shrink-0 overflow-hidden shadow-2xl border-2 border-[#00DC6C]">
              <Image
                src="/images/KT_profilie.png"
                alt="Khanhtruong Nguyen"
                fill
                className="object-cover object-top scale-105"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Row: Left (Sub Content Expanded Horizontally) & Right (CTA Cluster) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pt-8"
        >
          {/* Sub Content - Expanded Horizontally across full available width */}
          <div className="w-full flex-1 max-w-2xl lg:max-w-3xl min-w-0">
            <p className="font-sans text-white/80 text-base md:text-lg leading-relaxed font-light w-full block whitespace-normal">
              {lang === "vi"
                ? "Thu hẹp khoảng cách giữa tầm nhìn thẩm mỹ độ trung thực cao và việc thực thi kỹ thuật nghiêm ngặt — dành cho các sản phẩm SaaS, từ nền tảng multi-tenant đến hệ sinh thái IoT."
                : "Bridging the gap between high-fidelity aesthetic vision and rigorous technical execution — for SaaS products, from multi-tenant platforms to IoT ecosystems."}
            </p>
          </div>

          {/* CTA Cluster aligned on the right */}
          <div className="flex items-center gap-3 flex-shrink-0">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
