"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ContactModal from "@/components/ContactModal";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { lang, setLang } = useLanguage();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const email = "ktruong2k1@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-[#121212] text-white selection:bg-[#00DC6C] selection:text-black overflow-x-hidden scroll-smooth">
      {/* Dynamic Top Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenContact={() => setContactModalOpen(true)}
      />

      <main className="w-full">
        {/* UPPER HERO CONTACT SECTION */}
        <section className="w-full min-h-screen lg:h-screen snap-start snap-always bg-[#121212] text-white border-b-2 border-white/5 relative overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-[10vh] pt-[80px] pb-8">
          <div className="max-w-[1440px] mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
            
            {/* Left Column: Email & Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-center py-6 lg:py-12 z-10 space-y-8 lg:space-y-10"
            >
              {/* Email Section */}
              <div className="space-y-3">
                <div className="text-b1 font-mono text-white/50 uppercase tracking-widest">
                  {lang === "vi" ? "Gửi email cho tôi" : "Email me"}
                </div>
                <div className="flex items-center gap-3 group/email">
                  <span className="text-[#00DC6C] font-heading text-3xl sm:text-4xl lg:text-[48px] font-bold select-none leading-none">•</span>
                  <a
                    href={`mailto:${email}`}
                    className="font-heading text-3xl sm:text-4xl lg:text-[48px] font-bold text-white hover:text-[#00DC6C] transition-colors break-all cursor-pointer leading-tight tracking-tight"
                  >
                    {email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer ml-2 shrink-0"
                    title="Copy Email"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-[#00DC6C]" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* 2px Divider line below Email */}
                <div className="w-full max-w-[580px] h-[2px] bg-white/20 mt-8 lg:mt-10" />
              </div>

              {/* Social Section */}
              <div className="space-y-3">
                <div className="text-b1 font-mono text-white/50 uppercase tracking-widest">
                  {lang === "vi" ? "Mạng xã hội" : "Social"}
                </div>
                <div className="flex items-center gap-4 sm:gap-6 font-heading text-3xl sm:text-4xl lg:text-[48px] font-bold text-white flex-wrap leading-tight tracking-tight">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00DC6C] leading-none">•</span>
                    <a
                      href="https://www.linkedin.com/in/nguyen-khanh-truong-designer/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#00DC6C] transition-colors cursor-pointer"
                    >
                      Linkedin
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[#00DC6C] leading-none">•</span>
                    <a
                      href="https://www.behance.net/nguyenkhanhtr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#00DC6C] transition-colors cursor-pointer"
                    >
                      Behance
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-white/30 leading-none">•</span>
                    <a
                      href="https://www.tiktok.com/@khanhtruong.design"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/30 hover:text-[#00DC6C] transition-colors cursor-pointer"
                    >
                      Tiktok
                    </a>
                  </div>
                </div>

                {/* 2px Divider line below Social */}
                <div className="w-full max-w-[580px] h-[2px] bg-white/20 mt-8 lg:mt-10" />
              </div>

            </motion.div>

            {/* Right Column: Khanh Truong Portrait Cutout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center lg:justify-end items-center h-full relative"
            >
              <div className="relative w-full max-w-[420px] lg:max-w-[480px] aspect-[3/4] max-h-[75vh] shrink-0">
                <Image
                  src="/images/KT_profilie_fading_reverse.png"
                  alt="Khanhtruong Nguyen"
                  fill
                  priority
                  className="object-contain object-bottom drop-shadow-2xl"
                />
              </div>
            </motion.div>

          </div>
        </section>

        {/* LOWER SECTION: Synchronized Full Green Footer */}
        <FooterSection
          lang={lang}
          onOpenContact={() => setContactModalOpen(true)}
        />
      </main>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
