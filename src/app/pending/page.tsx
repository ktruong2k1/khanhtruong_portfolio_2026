"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PendingPage() {
  const [lang, setLang] = useState<"vi" | "en">("vi");

  useEffect(() => {
    const savedLang = typeof window !== 'undefined' ? localStorage.getItem("portfolio_lang") as "vi" | "en" : null;
    if (savedLang === "vi" || savedLang === "en") {
      setLang(savedLang);
    }
  }, []);

  const t = {
    vi: {
      title: "Nội dung đang được cập nhật",
      desc: "Chi tiết dự án này hiện đang được hoàn thiện. Vui lòng quay lại sau.",
      backHome: "Quay lại trang chủ"
    },
    en: {
      title: "Content is being updated",
      desc: "The details for this project are currently being finalized. Please check back later.",
      backHome: "Back to Home"
    }
  }[lang];

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full text-center flex flex-col items-center gap-6">
        {/* Animated Icon */}
        <div className="w-16 h-16 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-2 animate-pulse">
          <span className="text-[#22C55E] text-2xl font-serif">!</span>
        </div>

        <h1 className="text-3xl font-bold font-serif leading-tight">
          {t.title}
        </h1>
        <p className="text-neutral-400 text-sm leading-relaxed">
          {t.desc}
        </p>

        <Link
          href="/"
          style={{
            color: 'var(--Colors-Primary-400, #22C55E)',
            fontFamily: '"Be Vietnam Pro", sans-serif',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '18px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '12px'
          }}
          className="hover:translate-x-[-4px] transition-all uppercase"
        >
          <ArrowLeft size={16} /> {t.backHome}
        </Link>
      </div>
    </div>
  );
}
