"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

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
      "Before anything gets drawn, everyone in the room needs to see the same product. That means sitting with stakeholders, reading BA docs, mapping API flows — and asking enough questions until the ambiguity runs out. Design built on assumptions costs more to fix than the time it takes to align.",
    isWhite: true,
  },
  {
    number: "04",
    title: "Keep moving after handoff",
    image: "/images/process_step_4.jpg",
    description:
      "Before anything gets drawn, everyone in the room needs to see the same product. That means sitting with stakeholders, reading BA docs, mapping API flows — and asking enough questions until the ambiguity runs out. Design built on assumptions costs more to fix than the time it takes to align.",
    isWhite: false,
  },
];

export default function HorizontalProcessSection({
  lang,
  onOpenContact,
}: HorizontalProcessSectionProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform vertical scroll to horizontal x-translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  return (
    <section
      id="process-section"
      ref={targetRef}
      className="relative h-[300vh] bg-[#121212] text-white"
    >
      {/* Sticky full screen viewport wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center px-6 md:px-12 lg:px-[80px]">
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full py-16">
          {/* Fixed Left Sidebar Info */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full max-w-md z-10 pr-6">
            <div className="space-y-8 my-auto">
              <p className="font-mono text-base md:text-xl font-normal leading-relaxed text-white/90">
                {lang === "vi"
                  ? "Quy trình của tôi không phải là checklist. Đó là bộ nguyên tắc thích ứng với mọi nhu cầu thực tế của dự án — từ startup sprint đến triển khai doanh nghiệp lớn, làm việc độc lập hay phối hợp đa chức năng."
                  : "My process isn't a checklist. It's a set of principles that adapt to whatever the project actually needs — startup sprint or enterprise rollout, solo or cross-functional team, Figma-first or API-first."}
              </p>

              <p className="font-sans text-white/70 text-sm md:text-base leading-relaxed">
                {lang === "vi"
                  ? "Bốn bước dưới đây luôn diễn ra. Thứ tự và trọng số sẽ thay đổi tùy thuộc vào bối cảnh."
                  : "The four things below always happen. The order and weight shift depending on context."}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <button
                onClick={onOpenContact}
                className="bg-[#00DC6C] hover:bg-[#00c560] text-black font-semibold rounded-xl px-6 py-3 text-base transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
              >
                Contact
              </button>
              <button
                onClick={onOpenContact}
                className="bg-white hover:bg-gray-100 text-black p-3 rounded-xl transition-all duration-200 cursor-pointer shadow-lg active:scale-95 flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          {/* Sliding Horizontal Cards Track */}
          <div className="lg:col-span-8 overflow-hidden h-full flex items-center">
            <motion.div style={{ x }} className="flex gap-8 items-stretch py-4">
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
                  <div className="space-y-4">
                    <div className="font-mono text-4xl md:text-5xl font-bold tracking-tight">
                      {step.number}
                    </div>
                    <h3 className="font-mono text-2xl md:text-4xl font-bold leading-tight">
                      {step.title}
                    </h3>
                  </div>

                  {/* Step Image Photo */}
                  <div className="relative w-full h-52 md:h-64 rounded-2xl overflow-hidden border border-black/10">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Description Paragraph */}
                  <p
                    className={`font-sans text-xs md:text-sm leading-relaxed ${
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
