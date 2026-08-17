"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "framer-motion";

interface FooterSectionProps {
  lang?: "vi" | "en";
  onOpenContact: () => void;
}

export default function FooterSection({ lang = "en", onOpenContact }: FooterSectionProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { amount: 0.25 });

  const line1Text = "Start something";
  const line2Text = "great together";
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

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="w-full min-h-screen lg:h-screen snap-start snap-always bg-[#00DC6C] flex flex-col justify-between overflow-hidden"
    >
      {/* Upper Half: 2-Column Grid with Topnav Height Clearance */}
      <div className="flex-1 w-full px-6 md:px-12 lg:px-[10vh] pt-[96px] md:pt-[110px] lg:pt-[120px] pb-6 flex flex-col justify-between">
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch h-full">
          
          {/* Left Column (lg:col-span-7): 96px Typing Headline + Contact Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-between pr-0 lg:pr-12 pb-6 lg:pb-0">
            <div>
              <h2 className="text-h1 font-normal text-black tracking-tight select-none">
                <div>
                  {line1Typed}
                  {charCount > 0 && charCount < line1Text.length && (
                    <span className="inline-block w-2 lg:w-3 h-6 lg:h-12 bg-black ml-1.5 align-middle animate-pulse" />
                  )}
                </div>
                <div>
                  {line2Typed}
                  {charCount >= line1Text.length && charCount < totalChars && (
                    <span className="inline-block w-2 lg:w-3 h-6 lg:h-12 bg-black ml-1.5 align-middle animate-pulse" />
                  )}
                  {charCount === 0 && <span className="opacity-0">great together</span>}
                </div>
              </h2>
            </div>

            {/* Contact Action Buttons (Bottom Aligned) */}
            <div className="flex items-center gap-3 pt-6 lg:pt-8">
              <button
                onClick={onOpenContact}
                className="cta-btn h-[56px] min-h-[56px] rounded-[12px] bg-black hover:bg-neutral-900 text-[#00DC6C] text-h7 font-bold px-8 transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center"
              >
                Contact
              </button>
              <button
                onClick={onOpenContact}
                className="cta-btn h-[56px] w-[56px] min-h-[56px] min-w-[56px] rounded-[12px] bg-white hover:bg-neutral-100 text-black transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center"
                aria-label="Contact"
              >
                <ArrowRight className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          {/* Right Column (lg:col-span-5): 64px Mini Menu + Follow me Links */}
          <div className="lg:col-span-5 flex flex-col justify-between pl-0 lg:pl-12 lg:border-l border-black pt-4 lg:pt-0">
            {/* 64px Mini Menu */}
            <div className="flex flex-col gap-3 lg:gap-6 text-h4 sm:text-h2 lg:text-h1 font-bold text-white uppercase tracking-wider">
              <Link
                href="/works"
                className="hover:text-black transition-colors"
              >
                MY WORKS
              </Link>
              <Link
                href="/about"
                className="hover:text-black transition-colors"
              >
                ABOUT ME
              </Link>
              <button
                onClick={onOpenContact}
                className="text-left hover:text-black transition-colors cursor-pointer"
              >
                CONTACT
              </button>
            </div>

            {/* Follow me Links (Bottom Right) */}
            <div className="flex items-center gap-6 pt-8 text-b3 sm:text-b2 font-bold text-black">
              <span>Follow me</span>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Tiktok
              </a>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Behance
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Linkedin
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Middle Banner: Giant "KhanhTruong Nguyen" on Green */}
      <div className="w-full border-t border-black px-6 md:px-12 lg:px-[10vh] py-3 lg:py-4 bg-[#00DC6C]">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-h3 sm:text-h1 lg:text-h0 font-bold text-[#147a3e] select-none tracking-tight">
            KhanhTruong Nguyen
          </h1>
        </div>
      </div>

      {/* Bottom Bar: Vietnam 2026 (Black Background) */}
      <div className="w-full bg-[#121212] py-3 lg:py-3.5 px-6 md:px-12 lg:px-[10vh]">
        <div className="max-w-[1440px] mx-auto text-h7 sm:text-h6 font-bold text-white">
          Vietnam 2026
        </div>
      </div>
    </footer>
  );
}
