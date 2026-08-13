"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface FooterSectionProps {
  lang: "vi" | "en";
  onOpenContact: () => void;
}

export default function FooterSection({ lang, onOpenContact }: FooterSectionProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="w-full bg-[#121212] text-white">
      {/* Top Green Box (#00DC6C) */}
      <div className="bg-[#00DC6C] text-black w-full pt-16 pb-6 px-6 md:px-16 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (60%) */}
          <div className="lg:col-span-7 flex flex-col justify-between pr-0 lg:pr-12 lg:border-r border-black/20 pb-8 lg:pb-0">
            <div>
              <h2 className="font-mono text-4xl sm:text-6xl lg:text-[76px] font-normal leading-[1.05] text-black tracking-tight mb-8">
                Start something
                <br />
                great together
              </h2>
            </div>

            <div className="flex items-center gap-3 mt-auto">
              <button
                onClick={onOpenContact}
                className="bg-[#141414] hover:bg-black text-white font-sans text-xs font-semibold rounded-xl px-6 py-3 transition-all cursor-pointer shadow-lg active:scale-95"
              >
                Contact
              </button>
              <button
                onClick={onOpenContact}
                className="bg-white hover:bg-gray-100 text-black p-3 rounded-xl transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center"
              >
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>

          {/* Right Column (40%) */}
          <div className="lg:col-span-5 flex flex-col justify-between pl-0 lg:pl-12 pt-4 lg:pt-0">
            <div className="flex flex-col gap-4 font-mono text-3xl sm:text-5xl font-bold text-white tracking-wider">
              <button
                onClick={() => scrollToSection("featured-projects")}
                className="text-left hover:text-black transition-colors cursor-pointer"
              >
                MY WORKS
              </button>
              <button
                onClick={() => scrollToSection("why-me")}
                className="text-left hover:text-black transition-colors cursor-pointer"
              >
                ABOUT ME
              </button>
              <button
                onClick={onOpenContact}
                className="text-left hover:text-black transition-colors cursor-pointer"
              >
                CONTACT
              </button>
            </div>

            {/* Social Follow Links Sub-bar */}
            <div className="flex items-center justify-end gap-6 pt-12 text-xs font-mono font-bold text-black border-t border-black/10 mt-8">
              <span className="text-black/60 font-semibold">Follow me</span>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="hover:underline opacity-80 hover:opacity-100"
              >
                Tiktok
              </a>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                className="hover:underline opacity-80 hover:opacity-100"
              >
                Behance
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:underline opacity-80 hover:opacity-100"
              >
                Linkedin
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Dark Section */}
      <div className="bg-[#121212] py-16 px-6 md:px-16 lg:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Huge Brand Typography */}
          <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-[130px] font-bold text-[#15803D] leading-none tracking-tight select-none">
            KhanhTruong Nguyen
          </h1>

          {/* Subtitle */}
          <div className="font-mono text-xl sm:text-2xl font-bold text-white mt-6">
            Vietnam 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
