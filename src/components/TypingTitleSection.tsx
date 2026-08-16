"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function TypingTitleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within tall pinned container (250vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textLine1 = "How I design a product";
  const textLine2 = "from end to end";

  // Map scroll progress to total character count (textLine1 + textLine2)
  const totalChars = textLine1.length + textLine2.length;
  
  // Character count typed out: starts at 0.08 and reaches 100% (totalChars) at 0.65 progress
  const typedCountMotion = useTransform(scrollYProgress, [0.08, 0.65], [0, totalChars]);

  const [typedCount, setTypedCount] = useState(0);

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
      className="relative w-full h-[250vh] bg-[#121212] border-b border-white/5"
    >
      {/* Sticky 100vh Viewport Wrapper: Pins screen right at center when scrolling from featured project section */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 lg:px-[80px] overflow-hidden">
        <div className="max-w-[1440px] w-full flex flex-col items-start font-mono text-4xl sm:text-6xl md:text-7xl lg:text-[96px] font-normal leading-tight">
          
          {/* Line 1 with horizontal baseline line (Left aligned, 96px font size) */}
          <div className="w-full relative pb-4 mb-6 border-b border-white/20 flex items-center justify-start">
            <span className="text-[#00DC6C] whitespace-pre text-left">
              {line1Typed}
            </span>
            {typedCount < textLine1.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[12px] h-[64px] lg:h-[84px] bg-[#00DC6C] ml-1 align-middle"
              />
            )}
          </div>

          {/* Line 2 with horizontal baseline line (Left aligned, typed character by character) */}
          <div className="w-full relative pb-4 border-b border-white/20 flex items-center justify-start">
            <span className="text-[#00DC6C] whitespace-pre text-left">
              {line2Typed}
            </span>
            {typedCount >= textLine1.length && typedCount <= totalChars && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[12px] h-[64px] lg:h-[84px] bg-[#00DC6C] ml-1 align-middle"
              />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
