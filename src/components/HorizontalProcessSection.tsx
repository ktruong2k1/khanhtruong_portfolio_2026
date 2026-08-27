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
    descriptionViShort:
      "Ngồi lại với các bên liên quan, đọc tài liệu BA và luồng API sớm để tránh giả định mơ hồ và sửa đổi tốn kém sau này.",
    descriptionEn:
      "Before anything gets drawn, everyone in the room needs to see the same product. That means sitting with stakeholders, reading BA docs, mapping API flows — and asking enough questions until the ambiguity runs out. Design built on assumptions costs more to fix than the time it takes to align.",
    descriptionEnShort:
      "Align with stakeholders, BA docs, and API flows early to eliminate ambiguities before anything gets drawn.",
    isWhite: true,
  },
  {
    number: "02",
    titleVi: "Định hình sản phẩm trước khi thiết kế",
    titleEn: "Decide the product before designing it",
    image: "/images/process_step_2.jpg",
    descriptionVi:
      "Bản mô tả yêu cầu hiếm khi đầy đủ ngay từ đầu. Nền tảng, bối cảnh người dùng và các luồng cốt lõi cần được xác định chặt chẽ trước khi lên wireframe — và các quyết định đó sẽ khác nhau trên mỗi dự án. Ứng dụng mobile trên sàn nhà máy là một sản phẩm hoàn toàn khác so với bản desktop ở văn phòng, dù tính năng tương tự. Xác định rõ bản chất sản phẩm là ưu tiên hàng đầu.",
    descriptionViShort:
      "Xác định rõ nền tảng, bối cảnh người dùng và luồng tương tác cốt lõi trước khi tiến hành vẽ wireframe.",
    descriptionEn:
      "The brief rarely arrives complete. Platform, user context, and core flows need to be locked before wireframes exist — and those decisions look different on every project. Mobile on a factory floor is a different product than desktop in a back office, even with identical features. Figuring out which one this actually is comes first.",
    descriptionEnShort:
      "Lock down platform context and core user flows before wireframes exist to solve the real problem.",
    isWhite: false,
  },
  {
    number: "03",
    titleVi: "Thực thi song song, bàn giao chuẩn chỉnh",
    titleEn: "Execute in parallel, hand off clean",
    image: "/images/process_step_3.jpg",
    descriptionVi:
      "Bàn giao thiết kế không chỉ là ném file qua rào cản. Đó là một cuộc đối thoại liên tục với đội ngũ kỹ thuật — thiết lập hệ thống token rõ ràng, đặc tả linh kiện, các trạng thái và trường hợp biên ngay từ sớm để việc phát triển diễn ra nhanh chóng, chính xác và không phải phỏng đoán.",
    descriptionViShort:
      "Trao đổi liên tục với dev, thiết lập token hệ thống, component specs và edge cases để lập trình chính xác.",
    descriptionEn:
      "Design handoff isn't throwing files over a fence. It's a continuous conversation with engineering — establishing clear token systems, component specs, states, and edge cases early so development builds with speed and precision without guesswork.",
    descriptionEnShort:
      "Maintain continuous dialogue with dev teams, setting clear token systems, component specs, and edge cases.",
    isWhite: true,
  },
  {
    number: "04",
    titleVi: "Tiếp tục cải tiến sau khi ra mắt",
    titleEn: "Keep moving after handoff",
    image: "/images/process_step_4.jpg",
    descriptionVi:
      "Ra mắt sản phẩm mới chỉ là vạch xuất phát. Khi người dùng thực tương tác với sản phẩm, dữ liệu thực tế sẽ đổ về — làm lộ ra các điểm nghẽn và trường hợp ngoài dự tính. Việc liên tục thử nghiệm, đánh giá QA và tối ưu UX sẽ giúp sản phẩm không ngừng phát triển thành một hệ sinh thái dẫn đầu thị trường.",
    descriptionViShort:
      "Theo dõi dữ liệu thực tế sau ra mắt, liên tục thử nghiệm QA và tinh chỉnh UX để sản phẩm luôn dẫn đầu.",
    descriptionEn:
      "Shipped is just the starting line. Once real users interact with the product, real data flows in — revealing telemetry, edge cases, and friction points. Continuous iteration, QA reviews, and UX refinements ensure the product evolves into a market-leading ecosystem.",
    descriptionEnShort:
      "Review live telemetry, run QA iterations, and refine UX post-launch to keep evolving the product.",
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

  const step1Shift = 0;
  const step2Shift = -(singleCardWidth + gap);
  const step3Shift = -2 * (singleCardWidth + gap);
  const step4Shift = -3 * (singleCardWidth + gap);

  const rawX = useTransform(
    scrollYProgress,
    isMobile
      ? [0, 0.05, 0.22, 0.35, 0.52, 0.65, 0.82, 0.95, 1.0]
      : [0, 0.08, 0.30, 0.50, 0.75, 0.92, 1.0],
    isMobile
      ? [
          step1Shift,
          step1Shift,
          step2Shift,
          step2Shift,
          step3Shift,
          step3Shift,
          step4Shift,
          step4Shift,
          step4Shift,
        ]
      : [
          step1Shift,
          step1Shift,
          step2Shift,
          step2Shift,
          step3Shift,
          step3Shift,
          step3Shift,
        ]
  );
  
  const x = useSpring(rawX, { stiffness: 100, damping: 20, mass: 0.2 });

  const headingText =
    currentLang === "vi"
      ? "Cách một sản phẩm thực sự được tạo ra"
      : "How a product actually gets made";

  const subtitleText =
    currentLang === "vi"
      ? "Bốn bước dưới đây luôn diễn ra. Thứ tự và mức độ ưu tiên thay đổi tùy theo từng dự án."
      : "The four things below always happen. The order and weight shift depending on context.";

  const ctaText = currentLang === "vi" ? "Khám phá dự án" : "Explore my work";

  return (
    <section
      id="process"
      ref={targetRef}
      className={`w-full bg-[#121212] text-white border-b border-white/5 relative snap-start scroll-mt-0 ${
        isMobile ? "h-[380vh]" : "h-[280vh]"
      }`}
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden px-5 sm:px-6 md:px-12 lg:px-[10vh] py-4 sm:py-8 lg:py-12">
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-12 items-center">
          
          <div className="lg:col-span-4 flex flex-col justify-center z-10 pr-0 lg:pr-4 min-w-0 shrink-0 w-full">
            <div className="w-full">
              <h2 className="text-[24px] sm:text-[36px] lg:text-[48px] lg:leading-[56px] font-bold text-white tracking-tight leading-tight whitespace-normal font-heading">
                {headingText}
              </h2>

              <p className="text-[13px] sm:text-b2 md:text-b1 text-white/70 leading-relaxed w-full block whitespace-normal mt-1 sm:mt-3 lg:mt-5 font-mono">
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
                const descriptionFull = currentLang === "vi" ? step.descriptionVi : step.descriptionEn;
                const descriptionShort = currentLang === "vi" ? step.descriptionViShort : step.descriptionEnShort;
                return (
                  <div
                    key={step.number}
                    style={{
                      width: `${singleCardWidth}px`,
                    }}
                    className={`flex-shrink-0 rounded-[12px] p-4 sm:p-5 lg:p-6 shadow-2xl flex flex-col justify-between transition-all self-stretch ${
                      step.isWhite
                        ? "bg-white text-black"
                        : "bg-[#1A1A1A] text-white border border-white/10"
                    }`}
                  >
                    {/* Top Header & Title */}
                    <div className="space-y-1 sm:space-y-2 w-full flex flex-col justify-start">
                      <div className="text-[24px] sm:text-[36px] lg:text-[48px] lg:leading-[56px] font-bold tracking-tight font-heading">
                        {step.number}
                      </div>
                      <h3 className="text-[18px] sm:text-[20px] lg:text-[24px] lg:leading-[32px] font-bold leading-snug whitespace-normal font-heading min-h-[48px] sm:min-h-[56px] lg:min-h-0 flex items-start">
                        {title}
                      </h3>
                    </div>

                    {/* Step Image Photo (Restored on ALL screens) */}
                    <div className="relative w-full aspect-[16/10] rounded-[8px] sm:rounded-[10px] overflow-hidden shrink-0 my-2 sm:my-3">
                      <Image
                        src={step.image}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Description Paragraph (Concise on mobile, full on tablet/desktop) */}
                    <p
                      className={`block sm:hidden text-[12px] leading-relaxed font-mono line-clamp-3 ${
                        step.isWhite ? "text-neutral-900" : "text-white/70"
                      }`}
                    >
                      {descriptionShort}
                    </p>
                    <p
                      className={`hidden sm:block text-[14px] whitespace-normal leading-relaxed font-mono ${
                        step.isWhite ? "text-neutral-900" : "text-white/70"
                      }`}
                    >
                      {descriptionFull}
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
