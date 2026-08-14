"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const clientLogos = [
  { name: "ROGO Solutions", src: "/images/Rogo_color.svg" },
  { name: "FPT Smart Home", src: "/images/FPTSmartHome_color.svg" },
  { name: "Rạng Đông", src: "/images/RangDong_color.svg" },
  { name: "VietinBank Securities", src: "/images/VietinBankS_color.svg" },
  { name: "VCBS", src: "/images/VCBS_color.svg" },
  { name: "Think & Action", src: "/images/Think_Action_color.svg" },
];

export default function TopClientSection() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-[80px] bg-[#121212] border-t border-b border-white/5">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Heading */}
        <div className="lg:col-span-3">
          <h3 className="font-mono text-xl md:text-2xl font-bold text-white tracking-tight">
            Top Client
          </h3>
        </div>

        {/* Right Logo Grid - No card backgrounds, pure monochrome white logos */}
        <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
          {clientLogos.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="w-full flex items-center justify-center p-2 transition-all duration-300 group"
            >
              <div className="relative h-10 md:h-12 w-full max-w-[140px] opacity-80 group-hover:opacity-100 transition-opacity">
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
    </section>
  );
}
