"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function TypingTitleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within this 100vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textLine1 = "How I design a product";
  const textLine2 = "from end to end";

  // Map scroll progress to total character count (textLine1 + textLine2)
  const totalChars = textLine1.length + textLine2.length;
  
  // Character count typed out as user scrolls through [0.2, 0.7] of this section
  const typedCountMotion = useTransform(scrollYProgress, [0.2, 0.75], [0, totalChars]);

  const [typedCount, setTypedCount] = React.useState(0);

  useMotionValueEvent(typedCountMotion, "change", (latest) => {
    setTypedCount(Math.min(totalChars, Math.max(0, Math.floor(latest))));
  });

  // Calculate slice lengths for line 1 and line 2
  const line1Chars = Math.min(typedCount, textLine1.length);
  const line2Chars = Math.max(0, typedCount - textLine1.length);

  const line1Typed = textLine1.slice(0, line1Chars);
  const line2Typed = textLine2.slice(0, line2Chars);

  return (
    <section
      ref={containerRef}
      className="min-h-screen py-20 px-6 md:px-12 lg:px-[80px] bg-[#121212] flex flex-col justify-center items-center relative overflow-hidden border-b border-white/5"
    >
      <div className="max-w-[1440px] w-full flex flex-col items-start font-mono text-3xl sm:text-5xl md:text-6xl lg:text-[76px] font-normal leading-tight">
        {/* Line 1 with horizontal baseline line */}
        <div className="w-full relative pb-4 mb-6 border-b border-white/20 flex items-center">
          <span className="text-[#00DC6C] whitespace-pre">
            {line1Typed}
          </span>
          {typedCount < textLine1.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-[12px] h-[48px] md:h-[64px] bg-[#00DC6C] ml-1 align-middle"
            />
          )}
        </div>

        {/* Line 2 (Indented right) with horizontal baseline line */}
        <div className="w-full relative pb-4 border-b border-white/20 flex items-center justify-end pl-12 md:pl-32">
          <span className="text-[#00DC6C] whitespace-pre text-right">
            {line2Typed}
          </span>
          {typedCount >= textLine1.length && typedCount <= totalChars && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-[12px] h-[48px] md:h-[64px] bg-[#00DC6C] ml-1 align-middle"
            />
          )}
        </div>
      </div>
    </section>
  );
}
