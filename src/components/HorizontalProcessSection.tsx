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

  // Calculate pixel-perfect 2-card lock positions:
  // Step 1: 0px (Cards 1 & 2 locked)
  // Step 2: -1 * (CardWidth + Gap) = -(containerWidth + 32) / 2 (Cards 2 & 3 locked)
  // Step 3: -2 * (CardWidth + Gap) = -(containerWidth + 32) (Cards 3 & 4 locked)
  const step1Shift = 0;
  const step2Shift = -((containerWidth + 32) / 2);
  const step3Shift = -(containerWidth + 32);

  // Magnetic Snap scroll timeline: 3 distinct locked stops with light, sensitive activation
  const rawX = useTransform(
    scrollYProgress,
    [0, 0.08, 0.35, 0.55, 0.82, 1.0],
    [step1Shift, step1Shift, step2Shift, step2Shift, step3Shift, step3Shift]
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

  const singleCardWidth = containerWidth > 0 ? (containerWidth - 32) / 2 : 420;

  return (
    <>
      {/* MOBILE & TABLET LAYOUT (< lg): Natural vertical flow with scroll-snap cards */}
      <section
        id="process-section-mobile"
        className="block lg:hidden w-full bg-[#121212] text-white py-12 sm:py-16 px-5 sm:px-6 md:px-12 border-b border-white/5 scroll-mt-0"
      >
        <div className="max-w-[1440px] mx-auto w-full space-y-10 sm:space-y-12">
          {/* Header Info - Full Width, No narrow column */}
          <div className="w-full space-y-4 snap-start snap-always min-h-[45vh] flex flex-col justify-center">
            <h2 className="text-[28px] sm:text-3xl md:text-h2 font-bold text-white tracking-tight leading-tight whitespace-normal break-words">
              {headingText}
            </h2>
            <p className="text-[14px] sm:text-base text-white/80 leading-relaxed w-full whitespace-normal break-words">
              {subtitleText}
            </p>
            <div className="pt-2">
              <InteractiveCTA text={ctaText} href="/works" />
            </div>
          </div>

          {/* Vertical 4 Process Cards with Scroll-Snap */}
          <div className="space-y-8 sm:space-y-12 w-full">
            {processSteps.map((step) => {
              const title = currentLang === "vi" ? step.titleVi : step.titleEn;
              const description = currentLang === "vi" ? step.descriptionVi : step.descriptionEn;
              return (
                <div
                  key={step.number}
                  className={`w-full max-w-[640px] mx-auto min-h-[calc(100vh-100px)] snap-start snap-always rounded-[16px] p-6 sm:p-8 shadow-2xl flex flex-col justify-center space-y-4 ${
                    step.isWhite
                      ? "bg-white text-black"
                      : "bg-[#1A1A1A] text-white border border-white/10"
                  }`}
                >
                  {/* Top Header & Title */}
                  <div className="space-y-2 w-full flex flex-col justify-start">
                    <div className="text-[32px] sm:text-h2 font-bold tracking-tight">
                      {step.number}
                    </div>
                    <h3 className="text-[20px] sm:text-h4 font-bold leading-tight whitespace-normal">
                      {title}
                    </h3>
                  </div>

                  {/* Step Image Photo */}
                  <div className="relative w-full aspect-[3/2] rounded-[10px] overflow-hidden shrink-0">
                    <Image
                      src={step.image}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Description Paragraph */}
                  <p
                    className={`text-[13px] sm:text-[14px] leading-relaxed whitespace-normal break-words ${
                      step.isWhite ? "text-neutral-900" : "text-neutral-300"
                    }`}
                  >
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DESKTOP LAYOUT (>= lg): 250vh Sticky Horizontal Snap Scroll */}
      <section
        id="process-section"
        ref={targetRef}
        className="hidden lg:block relative h-[250vh] bg-[#121212] text-white snap-start scroll-mt-0"
      >
        {/* Sticky full screen viewport wrapper: Left aligned with navbar logo */}
        <div className="sticky top-0 h-screen overflow-hidden flex items-center px-6 md:px-12 lg:px-[10vh]">
          <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch h-full pt-24 pb-16">
            
            {/* Fixed Left Sidebar Info */}
            <div className="lg:col-span-4 flex flex-col justify-center h-full z-10 pr-4 min-w-0 pt-2 pb-2">
              <div className="w-full">
                <h2 className="text-h2 font-bold text-white tracking-tight leading-tight whitespace-normal">
                  {headingText}
                </h2>

                <p className="text-b2 md:text-b1 text-white/70 leading-relaxed w-full block whitespace-normal mt-6">
                  {subtitleText}
                </p>

                <div className="mt-[48px] flex-shrink-0">
                  <InteractiveCTA
                    text={ctaText}
                    href="/works"
                  />
                </div>
              </div>
            </div>

            {/* Sliding Horizontal Cards Track: Exact 2-card lock viewport */}
            <div
              ref={trackContainerRef}
              className="lg:col-span-8 overflow-hidden h-full flex items-stretch min-w-0 pt-2 pb-2"
            >
              <motion.div
                style={{ x }}
                className="flex gap-8 items-stretch py-2 w-max h-full"
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
                      className={`flex-shrink-0 rounded-[12px] p-6 md:p-8 xl:p-10 shadow-2xl flex flex-col justify-start space-y-6 transition-all ${
                        step.isWhite
                          ? "bg-white text-black"
                          : "bg-[#1A1A1A] text-white border border-white/10"
                      }`}
                    >
                      {/* Top Header & Title (Locked min-h so all images align top perfectly) */}
                      <div className="space-y-3 xl:space-y-4 w-full min-h-[140px] xl:min-h-[160px] flex flex-col justify-start">
                        <div className="text-h3 md:text-h2 font-bold tracking-tight">
                          {step.number}
                        </div>
                        <h3 className="text-h5 md:text-h4 font-bold leading-tight whitespace-normal">
                          {title}
                        </h3>
                      </div>

                      {/* Step Image Photo (Exact same aspect ratio & top aligned) */}
                      <div className="relative w-full aspect-[3/2] rounded-[12px] overflow-hidden shrink-0">
                        <Image
                          src={step.image}
                          alt={title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Description Paragraph (Top aligned with uniform gap below image) */}
                      <p
                        className={`text-[14px] whitespace-normal leading-relaxed ${
                          step.isWhite ? "text-neutral-1000" : "text-neutral-300"
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
    </>
  );
}
