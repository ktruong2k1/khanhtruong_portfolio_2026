"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useInView } from "framer-motion";
import InteractiveCTA from "@/components/InteractiveCTA";
import { useLanguage } from "@/context/LanguageContext";

interface FooterSectionProps {
  lang?: "vi" | "en";
  onOpenContact?: () => void;
}

// Simultaneous Typing Menu Item for Footer (64px)
function FooterTypingMenuItem({
  fullText,
  onClick,
  trigger,
}: {
  fullText: string;
  onClick: () => void;
  trigger: boolean;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!trigger) {
      setDisplayedText("");
      setIsTyping(true);
      return;
    }

    setDisplayedText("");
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 45); // 45ms simultaneous typing speed

    return () => clearInterval(interval);
  }, [fullText, trigger]);

  return (
    <button
      onClick={onClick}
      className="menu-tab-btn menu-tab-text text-left font-heading text-[36px] sm:text-[48px] lg:text-[64px] leading-[44px] sm:leading-[56px] lg:leading-[72px] font-bold uppercase tracking-wider text-white hover:text-black transition-colors cursor-pointer w-fit flex items-center group outline-none whitespace-nowrap"
    >
      <span>{displayedText}</span>
      {isTyping && trigger && (
        <span className="inline-block w-[5px] sm:w-[8px] lg:w-[10px] h-[30px] sm:h-[40px] lg:h-[56px] bg-black ml-2 sm:ml-2.5 lg:ml-3 animate-pulse align-middle" />
      )}
    </button>
  );
}

export default function FooterSection({ lang, onOpenContact }: FooterSectionProps) {
  const { lang: globalLang } = useLanguage();
  const currentLang = lang || globalLang;
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { amount: 0.25 });
  const router = useRouter();

  const line1Text = currentLang === "vi" ? "Bắt đầu những điều" : "Start something";
  const line2Text = currentLang === "vi" ? "tuyệt vời cùng nhau" : "great together";
  const totalChars = line1Text.length + line2Text.length;

  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setCharCount(0);
      return;
    }

    let current = 0;
    const timer = setInterval(() => {
      current++;
      setCharCount(current);
      if (current >= totalChars) {
        clearInterval(timer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [isInView, totalChars]);

  const line1Typed = line1Text.slice(0, Math.min(charCount, line1Text.length));
  const line2Typed =
    charCount > line1Text.length
      ? line2Text.slice(0, charCount - line1Text.length)
      : "";

  const handleNavigate = (path: string) => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === path) {
        const scrollContainers = document.querySelectorAll(".overflow-y-scroll, main, body, html");
        scrollContainers.forEach((el) => {
          el.scrollTo({ top: 0, behavior: "smooth" });
        });
        const firstSection = document.querySelector("section") || document.getElementById("hero");
        if (firstSection) {
          firstSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push(path);
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="w-full min-h-screen lg:h-screen snap-start snap-always bg-[#00DC6C] flex flex-col justify-between overflow-hidden"
    >
      {/* Upper Half: 2-Column Grid with Topnav Height Clearance */}
      <div className="flex-1 w-full px-5 sm:px-6 md:px-12 lg:px-[10vh] pt-[80px] sm:pt-[100px] md:pt-[110px] lg:pt-[120px] pb-6 flex flex-col justify-between">
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch h-full">
          
          {/* Left Column (lg:col-span-7): 96px Typing Headline + Contact Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-start pr-0 lg:pr-12 pb-6 lg:pb-0">
            <div>
              <h2 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[96px] leading-[42px] sm:leading-[56px] md:leading-[72px] lg:leading-[100px] font-normal text-black tracking-tight select-none font-heading">
                <div>
                  {line1Typed}
                  {charCount > 0 && charCount < line1Text.length && (
                    <span className="inline-block w-1.5 sm:w-2 lg:w-3 h-8 sm:h-10 md:h-12 lg:h-[72px] bg-black ml-1.5 align-middle animate-pulse" />
                  )}
                </div>
                <div>
                  {line2Typed}
                  {charCount >= line1Text.length && charCount < totalChars && (
                    <span className="inline-block w-1.5 sm:w-2 lg:w-3 h-8 sm:h-10 md:h-12 lg:h-[72px] bg-black ml-1.5 align-middle animate-pulse" />
                  )}
                  {charCount === 0 && <span className="opacity-0">{line2Text}</span>}
                </div>
              </h2>
            </div>

            {/* Contact Action Buttons with Hover Swap Animation */}
            <div className="mt-8 sm:mt-[48px]">
              <InteractiveCTA
                text={currentLang === "vi" ? "Liên hệ" : "Contact"}
                variant="black"
                onClick={() => handleNavigate("/contact")}
              />
            </div>
          </div>

          {/* Right Column (lg:col-span-5): 64px Typing Mini Menu + Follow me Links */}
          <div className="lg:col-span-5 flex flex-col justify-between pl-0 lg:pl-12 lg:border-l-2 border-black pt-4 lg:pt-0">
            {/* 64px Mini Menu with Synchronized Typing Effect (4 Tabs: HOME, ABOUT ME, MY WORKS, CONTACT) */}
            <div className="flex flex-col gap-2.5 lg:gap-3">
              <FooterTypingMenuItem
                fullText={currentLang === "vi" ? "TRANG CHỦ" : "HOME"}
                onClick={() => handleNavigate("/")}
                trigger={isInView}
              />
              <FooterTypingMenuItem
                fullText={currentLang === "vi" ? "GIỚI THIỆU" : "ABOUT ME"}
                onClick={() => handleNavigate("/about")}
                trigger={isInView}
              />
              <FooterTypingMenuItem
                fullText={currentLang === "vi" ? "DỰ ÁN" : "MY WORKS"}
                onClick={() => handleNavigate("/works")}
                trigger={isInView}
              />
              <FooterTypingMenuItem
                fullText={currentLang === "vi" ? "LIÊN HỆ" : "CONTACT"}
                onClick={() => handleNavigate("/contact")}
                trigger={isInView}
              />
            </div>

            {/* Follow me Links (Bottom Right) with style H5 for links and Body 2 Neutral 100 for title */}
            <div className="flex items-center gap-4 sm:gap-8 pt-6 sm:pt-8 flex-wrap">
              <span className="text-b2 text-white font-mono select-none">
                {currentLang === "vi" ? "Theo dõi tôi" : "Follow me"}
              </span>
              <div className="flex items-center gap-4 sm:gap-8 text-h6 sm:text-h5 font-bold font-heading text-black">
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline transition-all"
                >
                  Tiktok
                </a>
                <a
                  href="https://www.behance.net/nguyenkhanhtr"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline transition-all"
                >
                  Behance
                </a>
                <a
                  href="https://www.linkedin.com/in/nguyen-khanh-truong-designer/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline transition-all"
                >
                  Linkedin
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Middle Banner: Giant "KhanhTruong Nguyen" on Green */}
      <div className="w-full border-t-2 border-black py-4 lg:py-6 bg-[#00DC6C] flex items-center justify-center overflow-hidden">
        <h1 className="text-h0 font-bold text-black/15 select-none tracking-tight text-center whitespace-nowrap w-full">
          KhanhTruong Nguyen
        </h1>
      </div>

      {/* Bottom Bar: Vietnam 2026 (Black Background) */}
      <div className="w-full bg-[#121212] py-3 lg:py-3.5 px-5 sm:px-6 md:px-12 lg:px-[10vh]">
        <div className="max-w-[1440px] mx-auto text-h7 sm:text-h6 font-bold text-white">
          {currentLang === "vi" ? "Việt Nam 2026" : "Vietnam 2026"}
        </div>
      </div>
    </footer>
  );
}
