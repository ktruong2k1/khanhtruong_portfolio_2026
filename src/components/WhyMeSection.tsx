"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface WhyMeSectionProps {
  lang: "vi" | "en";
  onOpenContact: () => void;
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
    <div ref={ref} className="font-mono text-6xl sm:text-7xl lg:text-[96px] font-bold text-white tracking-tight mb-4">
      {displayVal}
    </div>
  );
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
                className="cta-btn h-[56px] min-h-[56px] rounded-[8px] bg-[#00DC6C] hover:bg-[#00c560] text-black font-sans font-semibold px-8 text-base transition-all cursor-pointer shadow-lg active:scale-95"
              >
                Explore Now
              </button>
              <button
                onClick={onOpenContact}
                className="cta-btn h-[56px] w-[56px] min-h-[56px] min-w-[56px] rounded-[8px] bg-white hover:bg-gray-100 text-black transition-all duration-200 cursor-pointer shadow-lg active:scale-95 flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5 text-black" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid with 96px Digits and Number Running Effect */}
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
              <CountingStatNumber value={stat.number} />
              <div className="font-mono text-base md:text-xl font-medium text-white/90 whitespace-normal">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
