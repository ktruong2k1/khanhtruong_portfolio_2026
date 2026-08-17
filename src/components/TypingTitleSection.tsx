"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function TypingTitleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within tall pinned container (200vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textLine1 = "How I design a product";
  const textLine2 = "from end to end";

  // Map scroll progress to total character count (textLine1 + textLine2)
  const totalChars = textLine1.length + textLine2.length;
  
  // Character count typed out: starts at 0.06 and reaches 100% (totalChars) at 0.72 progress
  const typedCountMotion = useTransform(scrollYProgress, [0.06, 0.72], [0, totalChars]);

  const [typedCount, setTypedCount] = useState(0);

  useMotionValueEvent(typedCountMotion, "change", (latest) => {
    setTypedCount(Math.min(totalChars, Math.max(0, Math.floor(latest))));
  });

  // Calculate slice lengths for line 1 and line 2
  const line1Chars = Math.min(typedCount, textLine1.length);
  const line2Chars = Math.max(0, typedCount - textLine1.length);

  const line1Typed = textLine1.slice(0, line1Chars);
  const line2Typed = textLine2.slice(0, line2Chars);

  // Baseline border opacity animations:
  // 0% opacity when approaching the section (0.0 to 0.05), fades in only as Line 1 and Line 2 start typing
  const line1BorderOpacity = useTransform(scrollYProgress, [0.05, 0.08], [0, 1]);
  const line2BorderOpacity = useTransform(scrollYProgress, [0.35, 0.40], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[200vh] bg-[#121212] border-b border-white/5 snap-start scroll-mt-0"
    >
      {/* Sticky 100vh Viewport Wrapper: Pins screen right at center when scrolling from featured project section */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 lg:px-[10vh] overflow-hidden">
        <div className="max-w-[1440px] w-full flex flex-col items-start text-h1 font-normal">
          
          {/* Line 1 with horizontal baseline line (Left aligned, 64px font size) */}
          <div className="w-full relative pb-4 mb-6 flex items-center justify-start min-h-[70px] lg:min-h-[85px]">
            <span className="text-[#00DC6C] whitespace-pre text-left">
              {line1Typed}
            </span>
            {typedCount > 0 && typedCount < textLine1.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[10px] h-[52px] lg:h-[60px] bg-[#00DC6C] ml-1 align-middle"
              />
            )}
            {/* Animated baseline border: Hidden when approaching section (opacity: 0), reveals when Line 1 starts */}
            <motion.div
              style={{ opacity: line1BorderOpacity }}
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/20"
            />
          </div>

          {/* Line 2 with horizontal baseline line (Left aligned, typed character by character) */}
          <div className="w-full relative pb-4 flex items-center justify-start min-h-[70px] lg:min-h-[85px]">
            <span className="text-[#00DC6C] whitespace-pre text-left">
              {line2Typed}
            </span>
            {typedCount >= textLine1.length && typedCount <= totalChars && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[10px] h-[52px] lg:h-[60px] bg-[#00DC6C] ml-1 align-middle"
              />
            )}
            {/* Animated baseline border: Hidden until Line 2 begins typing */}
            <motion.div
              style={{ opacity: line2BorderOpacity }}
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/20"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
