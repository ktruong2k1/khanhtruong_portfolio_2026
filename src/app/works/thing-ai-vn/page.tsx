"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactModal from "@/components/ContactModal";
import FooterSection from "@/components/FooterSection";
import InteractiveCTA from "@/components/InteractiveCTA";
import { useLanguage } from "@/context/LanguageContext";

export default function ThingAIVNProjectPage() {
  const { lang, setLang } = useLanguage();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const titleSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Automatically snap / scroll to the Title & Hero Mockup when entering project page
    const timer = setTimeout(() => {
      if (titleSectionRef.current) {
        const navOffset = 88; // Height of fixed navbar + breathing space
        const elementPosition = titleSectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  const heroDescription =
    lang === "vi"
      ? "Thing AI VN là cộng đồng mở kết nối học sinh, sinh viên, cộng đồng maker và doanh nghiệp xung quanh các giải pháp IoT thực tế. Dự án kế thừa nền tảng giáo dục và tài nguyên từ Thing Edu cùng cộng đồng Maker Việt rộng lớn — đồng thời giới thiệu nền tảng Thing Edges và các công cụ mã nguồn mở như MEO 3, VIA giúp bất kỳ ai cũng có thể xây dựng giải pháp IoT không cần lập trình. Cộng đồng chính là sản phẩm cốt lõi; công nghệ sinh ra để phục vụ con người."
      : "Thing AI VN is an open community connecting students, makers, and businesses around real-world IoT. It builds on an existing foundation — inheriting the educational programs and resources of Thing Edu and the wider Maker Việt community — while introducing its own platform, Thing Edges, along with open tools like MEO 3 and VIA that let anyone build IoT solutions without coding. The community is the product; the technology exists to serve it.";

  return (
    <div className="min-h-screen w-full bg-[#121212] text-white selection:bg-[#00DC6C] selection:text-black overflow-x-hidden">
      {/* Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Main Project Info Container: Flush with side padding px-5 sm:px-8 md:px-12 lg:px-[10vh] */}
      <main className="w-full pt-28 md:pt-36 pb-24 px-5 sm:px-8 md:px-12 lg:px-[10vh]">
        <div className="max-w-[1440px] mx-auto w-full space-y-12 sm:space-y-16">
          
          {/* Top Header: Back CTA Button + Project Title & Short Description */}
          <div className="max-w-[900px] space-y-8 sm:space-y-10 lg:space-y-12">
            {/* Back CTA Button */}
            <div>
              <InteractiveCTA
                direction="back"
                text={lang === "vi" ? "Quay lại danh sách" : "Back to all works"}
                href="/works"
              />
            </div>

            {/* Project Title & Context Description */}
            <div ref={titleSectionRef} className="space-y-4 sm:space-y-6 scroll-mt-24">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                Thing AI VN
              </h1>

              <p className="text-b2 md:text-b1 text-white/70 leading-relaxed max-w-[760px]">
                {heroDescription}
              </p>
            </div>
          </div>

          {/* SECTION 1: HERO BANNER MOCKUP (No outer white outline) */}
          <div className="relative w-full aspect-[3720/1440] rounded-[8px] lg:rounded-[12px] overflow-hidden">
            <Image
              src="/images/thing_ai_project/Diagram Hero.jpg"
              alt="Thing AI VN Hero Banner Mockup"
              fill
              priority
              quality={100}
              sizes="(max-width: 768px) 100vw, 1440px"
              className="object-cover object-center"
            />
          </div>

          {/* SECTION 2: 2-COLUMN INFO GRID (Summary on top on mobile/tablet, right column on desktop) */}
          <div className="w-full flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 border-t-2 border-b-2 border-white/10">
            {/* Summary Column: Clients, Role, Tools (Top on mobile/tablet, Right on desktop) */}
            <div className="order-1 lg:order-2 lg:col-span-5 border-b-2 lg:border-b-0 lg:border-l-2 border-white/10 pt-8 pb-8 lg:pt-16 lg:pb-16 lg:pl-12 space-y-8 flex flex-col justify-start">
              {/* Clients */}
              <div className="space-y-3">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi" ? "Khách hàng" : "Clients"}
                </span>
                <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
                  <div className="relative w-[100px] h-[32px] group cursor-pointer">
                    <Image
                      src="/images/Rogo_color.svg"
                      alt="ROGO Solutions"
                      fill
                      className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <span className="font-heading font-bold text-white text-[20px] tracking-tight group-hover:text-[#00DC6C] transition-colors">
                      Thing Edu
                    </span>
                  </div>
                </div>
              </div>

              {/* My Role */}
              <div className="space-y-4">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi" ? "Vai trò của tôi" : "My Role"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Brand research",
                    "Brand development",
                    "Brand Identity Design",
                    "Website Design",
                  ].map((item) => (
                    <span
                      key={item}
                      className="text-[12px] font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded-[8px] lg:rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-b2 md:text-b1 text-white/80 leading-relaxed font-normal">
                  {lang === "vi"
                    ? "Vai trò của tôi là chuyển hóa tinh thần công nghệ thành nhận diện trực quan: nghiên cứu hành vi cộng đồng và hệ sinh thái Maker Việt, sau đó thiết kế bộ nhận diện thương hiệu hoàn chỉnh (Brand Identity) cùng giao diện Website giúp truyền tải trọn vẹn sứ mệnh — từ linh vật thân thiện, quy chuẩn màu sắc, hệ thống ấn phẩm thực tế cho đến giao diện landing page hiện đại, trực quan."
                    : "My role was to translate that technical complexity into experience: I used the app firsthand and mapped how each device actually talked to the others, then designed the UX and UI that hides the protocol-juggling behind something a non-technical homeowner could follow — a guided setup flow, grouped multi-camera monitoring, encrypted camera access, live open/close status, and default automation scenarios (lights, AC, plugs) that let the product grow beyond one device into a habit."}
                </p>
              </div>

              {/* Tools */}
              <div className="space-y-3">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi" ? "Công cụ" : "Tools"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Figma", "Adobe Illustrator", "Adobe Photoshop", "Chat GPT"].map((tool) => (
                    <span
                      key={tool}
                      className="text-[12px] font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded-[8px] lg:rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Left Column: The Problem & Where Thing AI VN Fits (Below summary on mobile/tablet, Left on desktop) */}
            <div className="order-2 lg:order-1 lg:col-span-7 py-8 lg:py-16 space-y-10">
              {/* The problem */}
              <div className="space-y-3">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi" ? "Vấn đề" : "The problem"}
                </span>
                <p className="text-b2 md:text-b1 text-white/80 leading-relaxed font-normal">
                  {lang === "vi"
                    ? "Thing AI VN ra mắt như một thương hiệu mới chưa có nhận diện hình ảnh riêng — dù đã sở hữu nền tảng thực lực vững chắc: các chương trình giáo dục đã được kiểm chứng, cộng đồng maker năng động và công nghệ thực tế đang vận hành. Thách thức không phải là tạo dựng uy tín từ con số không, mà là tạo cho một cộng đồng đã có sẵn uy tín một diện mạo xứng tầm — một hình ảnh có thể giao thoa giữa hai nhóm đối tượng hiếm khi chia sẻ chung ngôn ngữ thị giác: học sinh, sinh viên và maker đam mê thử nghiệm công cụ mã nguồn mở, cùng các doanh nghiệp đang tìm kiếm giải pháp hạ tầng thực sự. Đa số các thương hiệu công nghệ trong lĩnh vực này thường chỉ chọn một hướng và đánh mất nhóm còn lại. Thing AI VN cần một thương hiệu dung hòa được cả hai mà không làm lu mờ bên nào."
                    : "Thing AI VN launched as a new brand without a visual identity of its own — even though it stood on real substance: proven education programs, an active maker community, and working technology already in use. The challenge wasn't inventing credibility from nothing; it was giving an already-credible community a face, one that could sit at the intersection of two audiences that rarely share a visual language — students and hobbyist makers experimenting with open-source tools, and businesses evaluating it as real infrastructure. Most tech brands in this space pick one lane and lose the other. Thing AI VN needed a brand that could hold both without diluting either."}
                </p>
              </div>

              {/* Where Thing AI VN Fits in the Bigger Picture */}
              <div className="space-y-3">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi"
                    ? "Vị trí của Thing AI VN trong bức tranh tổng thể"
                    : "Where Thing AI VN Fits in the Bigger Picture"}
                </span>
                <p className="text-b2 md:text-b1 text-white/80 leading-relaxed font-normal">
                  {lang === "vi"
                    ? "Hệ sinh thái giáo dục IoT và maker tại Việt Nam vốn đã tồn tại — thông qua các chương trình của Thing Edu và cộng đồng Maker Việt — nhưng lại thiếu một diện mạo thống nhất. Thực lực thực tế bị phân tán khắp cộng đồng, khiến doanh nghiệp khó nhận diện đây là nền tảng đáng để đầu tư và người ngoài dễ đánh giá thấp. Trong khi đó, làn sóng IoT ứng dụng AI đang bùng nổ, và cơ hội để khẳng định vị thế khác biệt, uy tín trong phân khúc này trước khi thị trường trở nên đông đúc là rất ngắn ngủi. Việc ra mắt một bộ nhận diện thiếu rõ ràng vào lúc này không chỉ là một cơ hội bị bỏ lỡ — mà còn khiến những năm tháng nỗ lực xây dựng cộng đồng tiếp tục vô hình ngay tại thời điểm lĩnh vực này bắt đầu nhận được sự chú ý lớn."
                    : "Vietnam's IoT and maker education ecosystem already existed — through Thing Edu's programs and Maker Việt's community — but it existed without a unifying face. Real substance was scattered across a community, hard for businesses to recognize as a platform worth building on and easy for outsiders to underestimate. Meanwhile, the wave AI-driven IoT is entering the tools that make Thing AI VN's identity have arrived, and the window to claim a distinct, credible presence in that space before it gets crowded is narrow. Launching an unclear or underbuilt identity now wouldn't just be a missed opportunity — it would mean years of real community work staying invisible right as the category it belongs in starts getting attention."}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 3: BRAND IDENTITY (No outer white outline) */}
          <div className="space-y-[20px] pt-4">
            <h2 className="font-heading text-[28px] sm:text-[36px] font-bold text-white tracking-tight leading-tight">
              Brand Identity
            </h2>

            <div className="space-y-[20px]">
              {/* Block 1: 2-Column Grid - Logo (Diagram 1) & 4-Color Grid (Diagram 2) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] w-full">
                <div className="relative w-full aspect-[1800/1440] rounded-[8px] lg:rounded-[12px] overflow-hidden bg-white">
                  <Image
                    src="/images/thing_ai_project/Diagram 1.jpg"
                    alt="Thing AI VN Mascot Logo"
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative w-full aspect-[1800/1440] rounded-[8px] lg:rounded-[12px] overflow-hidden">
                  <Image
                    src="/images/thing_ai_project/Diagram 2.jpg"
                    alt="Brand Color Pillars: Pioneering, Trust, Wisdom, Connection"
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Block 2: 1/ Friendly & 2/ Professional Card (Diagram 3) */}
              <div className="relative w-full aspect-[3720/1440] rounded-[8px] lg:rounded-[12px] overflow-hidden bg-white">
                <Image
                  src="/images/thing_ai_project/Diagram 3.jpg"
                  alt="1/ Friendly and 2/ Professional Brand Applications"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </div>

              {/* Block 3: Innovation, Collaboration, Build Future Card (Diagram 4) */}
              <div className="relative w-full aspect-[3720/1440] rounded-[8px] lg:rounded-[12px] overflow-hidden">
                <Image
                  src="/images/thing_ai_project/Diagram 4.jpg"
                  alt="Innovation, Collaboration, Build Future - Community Pillars"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </div>

              {/* Block 4: 2-Column Grid - Cyan Pin Badges (Diagram 5) & White/Cyan Pin Badges (Diagram 6) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] w-full">
                <div className="relative w-full aspect-[1800/1440] rounded-[8px] lg:rounded-[12px] overflow-hidden">
                  <Image
                    src="/images/thing_ai_project/Diagram 5.jpg"
                    alt="Thing AI VN Cyan Pin Badges"
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative w-full aspect-[1800/1440] rounded-[8px] lg:rounded-[12px] overflow-hidden">
                  <Image
                    src="/images/thing_ai_project/Diagram 6.jpg"
                    alt="Thing AI VN White and Cyan Pin Badges"
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Block 5: Community & Hashtag Tiles Collage (Diagram 7) */}
              <div className="relative w-full aspect-[3720/1440] rounded-[8px] lg:rounded-[12px] overflow-hidden bg-white">
                <Image
                  src="/images/thing_ai_project/Diagram 7.jpg"
                  alt="Thing AI VN Community and Key Visual Collage"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </div>

              {/* Block 6: 2-Column Grid - Lanyard ID Badge (Diagram 19) & Event Post Mockup (Diagram 9) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] w-full">
                <div className="relative w-full aspect-[1800/1440] rounded-[8px] lg:rounded-[12px] overflow-hidden bg-white">
                  <Image
                    src="/images/thing_ai_project/Diagram 19.jpg"
                    alt="Thing AI VN Lanyard and Member ID Card"
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative w-full aspect-[1803/1440] rounded-[8px] lg:rounded-[12px] overflow-hidden">
                  <Image
                    src="/images/thing_ai_project/Diagram 9.jpg"
                    alt="Event Post: Thing AI VN join Robotic Event in Hanoi, Vietnam"
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Block 7: Brand Guideline 16-Slide Overview (Diagram 11) */}
              <div className="relative w-full aspect-[3720/1440] rounded-[8px] lg:rounded-[12px] overflow-hidden">
                <Image
                  src="/images/thing_ai_project/Diagram 11.jpg"
                  alt="Thing AI VN Brand Guideline Slides Overview"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: LANDINGPAGE DESIGN (No outer white outline) */}
          <div className="space-y-[20px] pt-4">
            <h2 className="font-heading text-[28px] sm:text-[36px] font-bold text-white tracking-tight leading-tight">
              Landingpage Design
            </h2>

            <div className="space-y-[20px]">
              {/* Block 8: Landing Page Hero Banner (Diagram 12) */}
              <div className="relative w-full aspect-[3720/1440] rounded-[8px] lg:rounded-[12px] overflow-hidden">
                <Image
                  src="/images/thing_ai_project/Diagram 12.jpg"
                  alt="Landingpage Hero: IoT Application, Build Future"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </div>

              {/* Block 9: About Thing AI Section (Diagram 13) */}
              <div className="relative w-full aspect-[3720/1440] rounded-[8px] lg:rounded-[12px] overflow-hidden">
                <Image
                  src="/images/thing_ai_project/Diagram 13.jpg"
                  alt="Landingpage Section: About Thing AI - Connecting Technology, Shaping the Future"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </div>

              {/* Block 10: Khám phá Thing Edges Section (Diagram 14) */}
              <div className="relative w-full aspect-[3720/1440] rounded-[8px] lg:rounded-[12px] overflow-hidden">
                <Image
                  src="/images/thing_ai_project/Diagram 14.jpg"
                  alt="Landingpage Section: Khám phá Thing Edges - Mobile App Features"
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* SECTION 5: MORE PROJECTS SECTION */}
          <section className="w-full pt-16 pb-8 border-t-2 border-white/10 space-y-8">
            {/* Header: Title + InteractiveCTA */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-h4 font-bold text-white tracking-tight">
                {lang === "vi" ? "Dự án khác" : "More Projects"}
              </h2>

              <InteractiveCTA text={lang === "vi" ? "Xem tất cả" : "Explore more"} href="/works" />
            </div>

            {/* 3 Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
              {/* Card 1: Rogo Platform V2 */}
              <Link
                href="/works/rogo-platform-v2"
                className="group block flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="relative w-full aspect-[4/3] rounded-[8px] lg:rounded-[12px] overflow-hidden bg-[#181818]">
                    <Image
                      src="/images/Rogo_dashboard_thumb.png"
                      alt="Rogo Platform V2"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-block text-[11px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2 py-0.5 rounded-full uppercase">
                      FEATURED
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      PAAS • B2B
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      WHITELABEL
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      DESKTOP
                    </span>
                  </div>

                  <h3 className="text-h5 sm:text-h4 font-bold text-white group-hover:text-[#00DC6C] transition-colors">
                    Rogo Platform V2
                  </h3>

                  <p className="text-b3 text-white/70 leading-relaxed font-mono">
                    {lang === "vi"
                      ? "Nền tảng quản trị IoT whitelabel đa tầng — kiến trúc phân quyền đa tổ chức."
                      : "Whitelabel IoT platform core — multi-tenant ABAC access control plane."}
                  </p>
                </div>
              </Link>

              {/* Card 2: RaIO Smart */}
              <Link
                href="/works/raio-smart"
                className="group block flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="relative w-full aspect-[4/3] rounded-[8px] lg:rounded-[12px] overflow-hidden bg-[#181818]">
                    <Image
                      src="/images/RaIO_smart_thumb.png"
                      alt="RaIO Smart"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-block text-[11px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2 py-0.5 rounded-full uppercase">
                      FEATURED
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      WHITELABEL
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      MOBILE
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      IOT
                    </span>
                  </div>

                  <h3 className="text-h5 sm:text-h4 font-bold text-white group-hover:text-[#00DC6C] transition-colors">
                    RaIO Smart
                  </h3>

                  <p className="text-b3 text-white/70 leading-relaxed font-mono">
                    {lang === "vi"
                      ? "Framework ứng dụng nhà thông minh dạng Whitelabel cho nhiều đối tác thương hiệu."
                      : "Whitelabel smart home app framework enabling partner brand customization."}
                  </p>
                </div>
              </Link>

              {/* Card 3: Austfly */}
              <Link
                href="/works/austfly"
                className="group block flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="relative w-full aspect-[4/3] rounded-[8px] lg:rounded-[12px] overflow-hidden bg-[#181818]">
                    <Image
                      src="/images/austfly.png"
                      alt="Austfly"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-block text-[11px] font-mono font-bold text-[#00DC6C] border border-[#00DC6C]/40 bg-[#00DC6C]/10 px-2 py-0.5 rounded-full uppercase">
                      FEATURED
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      INSTANCE
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      MOBILE
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      IOT
                    </span>
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      WHITELABEL
                    </span>
                  </div>

                  <h3 className="text-h5 sm:text-h4 font-bold text-white group-hover:text-[#00DC6C] transition-colors">
                    Austfly
                  </h3>

                  <p className="text-b3 text-white/70 leading-relaxed font-mono">
                    {lang === "vi"
                      ? "Ứng dụng điều khiển cửa cuốn và hệ sinh thái nhà thông minh Austfly — instance tùy biến trên RaIO Smart whitelabel app."
                      : "Smart roller shutter & IoT control app Austfly — a fully customized instance powered by RaIO Smart whitelabel app."}
                  </p>
                </div>
              </Link>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <FooterSection
        lang={lang}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
