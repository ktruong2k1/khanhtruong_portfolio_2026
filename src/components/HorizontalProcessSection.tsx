"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import InteractiveCTA from "@/components/InteractiveCTA";
import { useLanguage } from "@/context/LanguageContext";

interface HorizontalProcessSectionProps {
  lang?: "vi" | "en";
  onOpenContact?: () => void;
}

const processSteps = [
  {
    number: "01",
    titleVi: "Thống nhất mục tiêu trước khi bắt đầu",
    titleEn: "Align the room before the work begins",
    image: "/images/process_step_1.jpg",
    descriptionVi:
      "Trước khi vẽ bất cứ điều gì, mọi người trong phòng cần nhìn thấy cùng một sản phẩm. Điều đó có nghĩa là ngồi lại với các bên liên quan, đọc tài liệu BA, ánh xạ các luồng API — và đặt đủ câu hỏi cho đến khi không còn sự mơ hồ nào. Thiết kế dựa trên giả định tốn kém chi phí sửa chữa hơn nhiều so với thời gian để thống nhất ngay từ đầu.",
    descriptionEn:
      "Before anything gets drawn, everyone in the room needs to see the same product. That means sitting with stakeholders, reading BA docs, mapping API flows — and asking enough questions until the ambiguity runs out. Design built on assumptions costs more to fix than the time it takes to align.",
    isWhite: true,
  },
  {
    number: "02",
    titleVi: "Định hình sản phẩm trước khi thiết kế",
    titleEn: "Decide the product before designing it",
    image: "/images/process_step_2.jpg",
    descriptionVi:
      "Bản mô tả yêu cầu hiếm khi đầy đủ ngay từ đầu. Nền tảng, bối cảnh người dùng và các luồng cốt lõi cần được xác định chặt chẽ trước khi lên wireframe — và các quyết định đó sẽ khác nhau trên mỗi dự án. Ứng dụng mobile trên sàn nhà máy là một sản phẩm hoàn toàn khác so với bản desktop ở văn phòng, dù tính năng tương tự. Xác định rõ bản chất sản phẩm là ưu tiên hàng đầu.",
    descriptionEn:
      "The brief rarely arrives complete. Platform, user context, and core flows need to be locked before wireframes exist — and those decisions look different on every project. Mobile on a factory floor is a different product than desktop in a back office, even with identical features. Figuring out which one this actually is comes first.",
    isWhite: false,
  },
  {
    number: "03",
    titleVi: "Thực thi song song, bàn giao chuẩn chỉnh",
    titleEn: "Execute in parallel, hand off clean",
    image: "/images/process_step_3.jpg",
    descriptionVi:
      "Bàn giao thiết kế không chỉ là ném file qua rào cản. Đó là một cuộc đối thoại liên tục với đội ngũ kỹ thuật — thiết lập hệ thống token rõ ràng, đặc tả linh kiện, các trạng thái và trường hợp biên ngay từ sớm để việc phát triển diễn ra nhanh chóng, chính xác và không phải phỏng đoán.",
    descriptionEn:
      "Design handoff isn't throwing files over a fence. It's a continuous conversation with engineering — establishing clear token systems, component specs, states, and edge cases early so development builds with speed and precision without guesswork.",
    isWhite: true,
  },
  {
    number: "04",
    titleVi: "Tiếp tục cải tiến sau khi ra mắt",
    titleEn: "Keep moving after handoff",
    image: "/images/process_step_4.jpg",
    descriptionVi:
      "Ra mắt sản phẩm mới chỉ là vạch xuất phát. Khi người dùng thực tương tác với sản phẩm, dữ liệu thực tế sẽ đổ về — làm lộ ra các điểm nghẽn và trường hợp ngoài dự tính. Việc liên tục thử nghiệm, đánh giá QA và tối ưu UX sẽ giúp sản phẩm không ngừng phát triển thành một hệ sinh thái dẫn đầu thị trường.",
    descriptionEn:
      "Shipped is just the starting line. Once real users interact with the product, real data flows in — revealing telemetry, edge cases, and friction points. Continuous iteration, QA reviews, and UX refinements ensure the product evolves into a market-leading ecosystem.",
    isWhite: false,
  },
];

export default function HorizontalProcessSection({
  lang,
}: HorizontalProcessSectionProps) {
  const { lang: globalLang } = useLanguage();
  const currentLang = lang || globalLang;
  const targetRef = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(880);

  // ResizeObserver to calculate dynamic exact 2-card container width & pixel-perfect shifts
  useEffect(() => {
    const updateWidth = () => {
      if (trackContainerRef.current) {
        setContainerWidth(trackContainerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    const observer = new ResizeObserver(updateWidth);
    if (trackContainerRef.current) {
      observer.observe(trackContainerRef.current);
    }
    return () => {
      window.removeEventListener("resize", updateWidth);
      observer.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Dynamic card widths and shift offsets:
  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1024;
  
  const gap = isMobile ? 16 : isTablet ? 24 : 32;
  const singleCardWidth = isMobile
    ? Math.max(260, containerWidth - 40)
    : isTablet
    ? (containerWidth - 24) / 2
    : containerWidth > 0
    ? (containerWidth - 32) / 2
    : 420;

  // Distinct magnetic snap stops: 4 stops on mobile (1 card visible), 3 stops on desktop (2 cards visible)
  const step1Shift = 0;
  const step2Shift = -(singleCardWidth + gap);
  const step3Shift = -2 * (singleCardWidth + gap);
  const step4Shift = -3 * (singleCardWidth + gap);

  const rawX = useTransform(
    scrollYProgress,
    isMobile
      ? [0, 0.05, 0.28, 0.42, 0.62, 0.76, 0.95, 1.0]
      : [0, 0.08, 0.35, 0.55, 0.82, 1.0],
    isMobile
      ? [step1Shift, step1Shift, step2Shift, step2Shift, step3Shift, step3Shift, step4Shift, step4Shift]
      : [step1Shift, step1Shift, step2Shift, step2Shift, step3Shift, step3Shift]
  );
  
  // Highly responsive, snappy spring physics for lightweight scroll interactions
  const x = useSpring(rawX, { stiffness: 280, damping: 24, mass: 0.6 });

  const headingText =
    currentLang === "vi"
      ? "Cách một sản phẩm thực sự được tạo ra"
      : "How a product actually gets made";

  const subtitleText =
    currentLang === "vi"
      ? "Bốn bước dưới đây luôn diễn ra. Thứ tự và trọng số sẽ thay đổi tùy thuộc vào bối cảnh."
      : "The four things below always happen. The order and weight shift depending on context.";

  const ctaText = currentLang === "vi" ? "Khám phá dự án" : "Explore my work";

  return (
    <section
      id="process-section"
      ref={targetRef}
      className="relative h-[250vh] bg-[#121212] text-white snap-start scroll-mt-0"
    >
      {/* Sticky full screen viewport wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-[10vh]">
        <div className="max-w-[1440px] mx-auto w-full flex flex-col lg:grid lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-12 items-center justify-center my-auto">
          
          {/* Top / Left Header Info */}
          <div className="lg:col-span-4 flex flex-col justify-center z-10 pr-0 lg:pr-4 min-w-0 shrink-0 w-full">
            <div className="w-full">
              <h2 className="text-[28px] sm:text-[36px] lg:text-[48px] lg:leading-[56px] font-bold text-white tracking-tight leading-tight whitespace-normal font-heading">
                {headingText}
              </h2>

              <p className="text-[14px] sm:text-b2 md:text-b1 text-white/70 leading-relaxed w-full block whitespace-normal mt-2 sm:mt-3 lg:mt-5 font-mono">
                {subtitleText}
              </p>

              <div className="hidden lg:block mt-8 lg:mt-10 flex-shrink-0">
                <InteractiveCTA
                  text={ctaText}
                  href="/works"
                />
              </div>
            </div>
          </div>

          {/* Sliding Horizontal Cards Track (Equal card heights, step number 48px, card title 24px, description 14px) */}
          <div
            ref={trackContainerRef}
            className="lg:col-span-8 overflow-hidden w-full flex items-center min-w-0 py-2"
          >
            <motion.div
              style={{ x }}
              className="flex gap-4 sm:gap-6 lg:gap-8 items-stretch py-2 w-max"
            >
              {processSteps.map((step) => {
                const title = currentLang === "vi" ? step.titleVi : step.titleEn;
                const description = currentLang === "vi" ? step.descriptionVi : step.descriptionEn;
                return (
                  <div
                    key={step.number}
                    style={{
                      width: `${singleCardWidth}px`,
                    }}
                    className={`flex-shrink-0 rounded-[12px] p-4 sm:p-5 lg:p-6 shadow-2xl flex flex-col justify-between space-y-3 sm:space-y-4 transition-all self-stretch ${
                      step.isWhite
                        ? "bg-white text-black"
                        : "bg-[#1A1A1A] text-white border border-white/10"
                    }`}
                  >
                    {/* Top Header & Title */}
                    <div className="space-y-1 sm:space-y-2 w-full flex flex-col justify-start">
                      <div className="text-xl sm:text-2xl lg:text-[48px] lg:leading-[56px] font-bold tracking-tight font-heading">
                        {step.number}
                      </div>
                      <h3 className="text-base sm:text-lg lg:text-[24px] lg:leading-[32px] font-bold leading-snug whitespace-normal font-heading">
                        {title}
                      </h3>
                    </div>

                    {/* Step Image Photo */}
                    <div className="relative w-full aspect-[16/10] rounded-[8px] sm:rounded-[10px] overflow-hidden shrink-0">
                      <Image
                        src={step.image}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Description Paragraph */}
                    <p
                      className={`text-[13px] sm:text-[14px] lg:text-[14px] whitespace-normal leading-relaxed font-mono ${
                        step.isWhite ? "text-neutral-900" : "text-white/70"
                      }`}
                    >
                      {description}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
