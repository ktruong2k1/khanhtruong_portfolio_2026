"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import InteractiveCTA from "@/components/InteractiveCTA";
import { useLanguage } from "@/context/LanguageContext";

interface HeroSectionProps {
  lang?: "vi" | "en";
  onOpenContact?: () => void;
}

export default function HeroSection({ lang, onOpenContact }: HeroSectionProps) {
  const { lang: globalLang } = useLanguage();
  const currentLang = lang || globalLang;
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ultra-smooth, buttery spring physics for fluid organic cursor trailing
  const springX = useSpring(mouseX, { stiffness: 180, damping: 24, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 24, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const scrollToAbout = () => {
    const el = document.getElementById("why-me");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen flex flex-col justify-center bg-[#121212] relative overflow-hidden px-5 sm:px-6 md:px-12 lg:px-[10vh] pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 snap-start scroll-mt-0 cursor-default"
    >
      {/* Mouse Follower "Scroll Down" circle: 100x100px, Neutral-700, sitting below hero content */}
      <motion.div
        className="pointer-events-none hidden md:flex absolute top-0 left-0 w-[100px] h-[100px] rounded-full bg-[#656565] flex-col items-center justify-center font-mono font-bold text-[#181818] text-[15px] leading-tight select-none z-0 shadow-lg text-center px-2"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { duration: 0.2, ease: "easeOut" },
        }}
      >
        {currentLang === "vi" ? (
          <>
            <span>Cuộn</span>
            <span>xuống</span>
          </>
        ) : (
          <>
            <span>Scroll</span>
            <span>Down</span>
          </>
        )}
      </motion.div>

      <div className="max-w-[1440px] mx-auto w-full my-auto flex flex-col justify-center relative z-10">
        {/* Gold Portfolio tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#C6A85B] text-h7 sm:text-h6 font-bold tracking-wide mb-4 sm:mb-6"
        >
          Portfolio
        </motion.div>

        {/* 2-Column Alignment Grid: Top-Left (Name), Top-Right (Role+Avatar), Bottom-Left (Sub Content), Bottom-Right (CTA Buttons) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-16 gap-y-6 sm:gap-y-10 lg:gap-y-[60px] items-start">
          {/* Top-Left: Name Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start min-w-0"
          >
            <h1 className="text-[40px] sm:text-[64px] md:text-[80px] lg:text-[96px] lg:leading-[100px] leading-[1.1] font-normal text-white tracking-tight whitespace-normal break-words">
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
            className="lg:col-span-5 flex items-start justify-between sm:justify-start gap-4 sm:gap-6 pt-0 lg:pt-2"
          >
            <div className="flex flex-col items-start text-left min-w-0">
              <h2 className="text-h4 sm:text-h3 lg:text-h2 font-bold text-white mb-2 sm:mb-3 tracking-tight whitespace-nowrap">
                Product Designer
              </h2>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-start">
                <span className="text-[#00DC6C] font-bold text-h6 sm:text-h5 whitespace-nowrap">
                  {currentLang === "vi" ? "3,5 năm KN" : "3,5 years exp"}
                </span>
                <span className="border border-white/20 rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-b3 text-white/80 flex items-center gap-1.5 bg-white/5 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-[#00DC6C] animate-pulse" />
                  {currentLang === "vi" ? "Sẵn sàng Remote" : "Available for Remote"}
                </span>
              </div>
            </div>

            {/* Profile Avatar (108x108px, face facing left) */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-[108px] lg:h-[108px] rounded-full bg-[#00DC6C] flex-shrink-0 overflow-hidden shadow-2xl border-2 border-[#00DC6C]">
              <Image
                src="/images/KT_profilie_fading_reverse.png"
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
            <p className="text-[14px] sm:text-b1 text-white/80 font-light w-full max-w-[635px] block whitespace-normal leading-relaxed">
              {currentLang === "vi"
                ? "UX/UI designer với 3.5 năm kinh nghiệm phát triển các sản phẩm B2B phức tạp — hệ sinh thái IoT, SaaS dashboard và các nền tảng whitelabel có khả năng mở rộng cho nhiều đối tác. Tôi sử dụng các công cụ AI để rút ngắn khoảng cách giữa thiết kế và lập trình. Hiện đang sẵn sàng cho các cơ hội làm việc từ xa."
                : "UX/UI designer with 3.5 years shipping complex B2B products — IoT ecosystems, SaaS dashboards, and whitelabel platforms built to scale across partners. I use AI tools to close the gap between design and production. Currently open to remote roles."}
            </p>
          </motion.div>

          {/* Bottom-Right: Interactive CTA Button with Hover Swap Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 flex items-center pt-2 sm:pt-0"
          >
            <InteractiveCTA
              text={currentLang === "vi" ? "Về tôi" : "About me"}
              href="/about"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
