"use client";

import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface TypingTitleSectionProps {
  lang?: "vi" | "en";
}

export default function TypingTitleSection({ lang }: TypingTitleSectionProps = {}) {
  const { lang: globalLang } = useLanguage();
  const currentLang = lang || globalLang;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const line1Full = currentLang === "vi" ? "Tôi thiết kế sản phẩm" : "I design the product";
  const line2Full = currentLang === "vi" ? "Rồi đưa vào thực tế" : "Then I ship it";
  const totalChars = line1Full.length + line2Full.length;

  const [charCount, setCharCount] = useState(0);
  const hasAutoScrolledRef = useRef(false);

  useEffect(() => {
    setCharCount(0);
  }, [currentLang]);

  useEffect(() => {
    if (!isInView || hasAutoScrolledRef.current) return;

    let current = 0;
    const timer = setInterval(() => {
      current++;
      setCharCount(current);
      if (current >= totalChars) {
        clearInterval(timer);
        setTimeout(() => {
          if (!hasAutoScrolledRef.current && sectionRef.current) {
            hasAutoScrolledRef.current = true;
            const nextElement = sectionRef.current.nextElementSibling;
            if (nextElement) {
              nextElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        }, 700); // 700ms pause after typing finishes before auto-scrolling to next section
      }
    }, 45); // Smooth 45ms typing speed

    return () => clearInterval(timer);
  }, [isInView, totalChars, currentLang]);

  const line1Typed = line1Full.slice(0, Math.min(charCount, line1Full.length));
  const line2Typed =
    charCount > line1Full.length
      ? line2Full.slice(0, charCount - line1Full.length)
      : "";

  return (
    <section
      ref={sectionRef}
      id="typing-title"
      className="w-full min-h-screen snap-start snap-always flex flex-col items-center justify-center px-6 md:px-12 lg:px-[10vh] border-b border-white/5 bg-[#121212] relative z-10"
    >
      <div className="max-w-[1440px] mx-auto w-full flex flex-col items-center justify-center text-center">
        <div className="w-fit mx-auto font-heading text-3xl sm:text-5xl md:text-[54px] lg:text-[64px] font-extrabold leading-tight text-[#00DC6C] text-center tracking-tight">
          {/* Line 1 */}
          <div className="border-b border-white/20 pb-3 mb-6 w-fit mx-auto min-h-[1.25em] flex items-center justify-center">
            <span>{line1Typed}</span>
            {charCount > 0 && charCount < line1Full.length && (
              <span className="inline-block w-2 sm:w-3 h-8 sm:h-12 bg-[#00DC6C] ml-2 animate-pulse align-middle" />
            )}
            {charCount === 0 && <span className="opacity-0">{line1Full}</span>}
          </div>

          {/* Line 2 */}
          <div className="border-b border-white/20 pb-3 w-fit mx-auto min-h-[1.25em] flex items-center justify-center">
            <span>{line2Typed}</span>
            {charCount >= line1Full.length && charCount < totalChars && (
              <span className="inline-block w-2 sm:w-3 h-8 sm:h-12 bg-[#00DC6C] ml-2 animate-pulse align-middle" />
            )}
            {charCount === 0 && <span className="opacity-0">{line2Full}</span>}
          </div>
        </div>
      </div>
    </section>
  );
}
