"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import InteractiveCTA from "@/components/InteractiveCTA";
import { useLanguage } from "@/context/LanguageContext";

interface WhyMeSectionProps {
  lang?: "vi" | "en";
  onOpenContact?: () => void;
}

function CountingStatNumber({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayVal, setDisplayVal] = useState(value.includes("3,5") || value.includes("3.5") ? "0,0+" : "0+");

  useEffect(() => {
    if (!isInView) return;

    if (value.includes("3,5") || value.includes("3.5")) {
      let start = 0;
      const interval = setInterval(() => {
        start += 0.1;
        if (start >= 3.5) {
          setDisplayVal("3,5+");
          clearInterval(interval);
        } else {
          setDisplayVal(start.toFixed(1).replace(".", ",") + "+");
        }
      }, 45);
      return () => clearInterval(interval);
    } else {
      const target = parseInt(value, 10) || 20;
      let start = 0;
      const step = Math.max(1, Math.floor(target / 20));
      const interval = setInterval(() => {
        start += step;
        if (start >= target) {
          setDisplayVal(target + "+");
          clearInterval(interval);
        } else {
          setDisplayVal(start + "+");
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-h1 lg:text-h0 font-bold text-[#E8C468] tracking-tight mb-4">
      {displayVal}
    </div>
  );
}

export default function WhyMeSection({ lang, onOpenContact }: WhyMeSectionProps) {
  const { lang: globalLang } = useLanguage();
  const currentLang = lang || globalLang;

  const stats = [
    { number: "3,5+", label: currentLang === "vi" ? "Năm kinh nghiệm" : "Year Experience" },
    { number: "20+", label: currentLang === "vi" ? "Dự án đã triển khai" : "Project deployed" },
    { number: "20+", label: currentLang === "vi" ? "Khách hàng hài lòng" : "Happy Clients" },
  ];

  return (
    <section
      id="why-me"
      className="w-full min-h-screen lg:h-screen snap-start snap-always bg-[#121212] text-white border-b border-white/5 relative overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-[10vh] py-12 md:py-16 scroll-mt-0"
    >
      <div className="max-w-[1440px] mx-auto space-y-12 lg:space-y-16 w-full my-auto">
        {/* Top Header & Paragraph - Aligned exactly with 3-Column Stats Grid below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start w-full">
          {/* Left Label (1/3 width, aligned with Stat 1) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1 min-w-0"
          >
            <h2 className="text-h4 font-bold text-white tracking-tight">
              {currentLang === "vi" ? "Vì sao chọn tôi" : "Why me"}
            </h2>
          </motion.div>

          {/* Right Content (2/3 width, aligned with Stat 2 & Stat 3) */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 space-y-8 w-full min-w-0"
          >
            <p className="text-b0 font-normal text-white/90 leading-relaxed w-full block whitespace-normal">
              {currentLang === "vi"
                ? "UX/UI designer với 3.5 năm kinh nghiệm phát triển các sản phẩm B2B phức tạp — hệ sinh thái IoT, SaaS dashboard và các nền tảng whitelabel có khả năng mở rộng cho nhiều đối tác. Tôi sử dụng các công cụ AI để rút ngắn khoảng cách giữa thiết kế và lập trình. Hiện đang sẵn sàng cho các cơ hội làm việc từ xa."
                : "UX/UI designer with 3.5 years shipping complex B2B products — IoT ecosystems, SaaS dashboards, and whitelabel platforms built to scale across partners. I use AI tools to close the gap between design and production. Currently open to remote roles."}
            </p>

            <div className="pt-2">
              <InteractiveCTA
                text={currentLang === "vi" ? "Khám phá ngay" : "Explore Now"}
                href="/about"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Grid with 96px Digits and Number Running Effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-8 w-full">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
              className="border-t border-white/20 pt-8 flex flex-col justify-between min-w-0"
            >
              <CountingStatNumber value={stat.number} />
              <div className="text-h7 md:text-h6 font-medium text-white/90 whitespace-normal">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
