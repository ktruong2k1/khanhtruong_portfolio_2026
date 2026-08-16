"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

interface HorizontalProcessSectionProps {
  lang: "vi" | "en";
  onOpenContact: () => void;
}

const processSteps = [
  {
    number: "01",
    title: "Align the room before the work begins",
    image: "/images/process_step_1.jpg",
    description:
      "Before anything gets drawn, everyone in the room needs to see the same product. That means sitting with stakeholders, reading BA docs, mapping API flows — and asking enough questions until the ambiguity runs out. Design built on assumptions costs more to fix than the time it takes to align.",
    isWhite: true,
  },
  {
    number: "02",
    title: "Decide the product before designing it",
    image: "/images/process_step_2.jpg",
    description:
      "The brief rarely arrives complete. Platform, user context, and core flows need to be locked before wireframes exist — and those decisions look different on every project. Mobile on a factory floor is a different product than desktop in a back office, even with identical features. Figuring out which one this actually is comes first.",
    isWhite: false,
  },
  {
    number: "03",
    title: "Execute in parallel, hand off clean",
    image: "/images/process_step_3.jpg",
    description:
      "Design handoff isn't throwing files over a fence. It's a continuous conversation with engineering — establishing clear token systems, component specs, states, and edge cases early so development builds with speed and precision without guesswork.",
    isWhite: true,
  },
  {
    number: "04",
    title: "Keep moving after handoff",
    image: "/images/process_step_4.jpg",
    description:
      "Shipped is just the starting line. Once real users interact with the product, real data flows in — revealing telemetry, edge cases, and friction points. Continuous iteration, QA reviews, and UX refinements ensure the product evolves into a market-leading ecosystem.",
    isWhite: false,
  },
];

function TypingProcessParagraph({ fullText }: { fullText: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isInView) return;
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
    }, 25); // 25ms per character

    return () => clearInterval(interval);
  }, [isInView, fullText]);

  return (
    <p
      ref={ref}
      className="font-mono text-xl sm:text-[24px] font-normal leading-relaxed text-white/90 w-full block whitespace-normal min-h-[140px]"
    >
      <span>{displayedText}</span>
      {isTyping && isInView && (
        <span className="inline-block w-[10px] h-[24px] bg-[#00DC6C] ml-1 animate-pulse align-middle" />
      )}
    </p>
  );
}

export default function HorizontalProcessSection({
  lang,
  onOpenContact,
}: HorizontalProcessSectionProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Magnetic Snap scroll transform mapping for the 4 step cards (01, 02, 03, 04)
  const rawX = useTransform(
    scrollYProgress,
    [0, 0.05, 0.28, 0.36, 0.60, 0.68, 0.92, 1.0],
    ["0%", "0%", "-26%", "-26%", "-52%", "-52%", "-76%", "-76%"]
  );
  
  // Smooth spring physics for magnetic snap transitions
  const x = useSpring(rawX, { stiffness: 240, damping: 28 });

  const processParagraphText =
    lang === "vi"
      ? "Quy trình của tôi không phải là checklist. Đó là bộ nguyên tắc thích ứng với mọi nhu cầu thực tế của dự án — từ startup sprint đến triển khai doanh nghiệp lớn, làm việc độc lập hay phối hợp đa chức năng."
      : "My process isn't a checklist. It's a set of principles that adapt to whatever the project actually needs — startup sprint or enterprise rollout, solo or cross-functional team, Figma-first or API-first.";

  return (
    <section
      id="process-section"
      ref={targetRef}
      className="relative h-[350vh] bg-[#121212] text-white"
    >
      {/* Sticky full screen viewport wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center px-6 md:px-12 lg:px-[80px]">
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-full pt-24 pb-16">
          {/* Fixed Left Sidebar Info: Top Aligned with typing paragraph, Bottom Aligned CTA buttons */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full max-w-md z-10 pr-6 min-w-0 pt-2 pb-2">
            <div className="space-y-8 w-full">
              {/* 24px IBM Plex Mono Typing Paragraph on scroll */}
              <TypingProcessParagraph fullText={processParagraphText} />

              {/* Subtitle in 24px IBM Plex Mono typeface */}
              <p className="font-mono text-xl sm:text-[24px] font-normal leading-relaxed text-white/70 w-full block whitespace-normal">
                {lang === "vi"
                  ? "Bốn bước dưới đây luôn diễn ra. Thứ tự và trọng số sẽ thay đổi tùy thuộc vào bối cảnh."
                  : "The four things below always happen. The order and weight shift depending on context."}
              </p>
            </div>

            {/* CTA Buttons: Aligned flush with the BOTTOM of the 4 steps cards track */}
            <div className="flex items-center gap-3 mt-auto mb-2 flex-shrink-0">
              <button
                onClick={onOpenContact}
                className="cta-btn h-[56px] min-h-[56px] rounded-[8px] bg-[#00DC6C] hover:bg-[#00c560] text-black font-semibold px-8 text-base transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
              >
                Contact
              </button>
              <button
                onClick={onOpenContact}
                className="cta-btn h-[56px] w-[56px] min-h-[56px] min-w-[56px] rounded-[8px] bg-white hover:bg-gray-100 text-black transition-all duration-200 cursor-pointer shadow-lg active:scale-95 flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          {/* Sliding Horizontal Cards Track with Snap Scroll Physics */}
          <div className="lg:col-span-8 overflow-hidden h-full flex items-stretch min-w-0 pt-2 pb-2">
            <motion.div style={{ x }} className="flex gap-8 items-stretch py-2">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className={`w-[85vw] sm:w-[480px] md:w-[540px] flex-shrink-0 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col justify-between space-y-6 transition-all ${
                    step.isWhite
                      ? "bg-white text-black"
                      : "bg-[#1A1A1A] text-white border border-white/10"
                  }`}
                >
                  {/* Top Header & Title */}
                  <div className="space-y-4 w-full">
                    <div className="font-mono text-4xl md:text-5xl font-bold tracking-tight">
                      {step.number}
                    </div>
                    <h3 className="font-mono text-2xl md:text-4xl font-bold leading-tight whitespace-normal">
                      {step.title}
                    </h3>
                  </div>

                  {/* Step Image Photo */}
                  <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Description Paragraph */}
                  <p
                    className={`font-sans text-xs md:text-sm leading-relaxed whitespace-normal ${
                      step.isWhite ? "text-neutral-700" : "text-neutral-300"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
