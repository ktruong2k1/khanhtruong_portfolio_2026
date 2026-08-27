"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactModal from "@/components/ContactModal";
import FooterSection from "@/components/FooterSection";
import InteractiveCTA from "@/components/InteractiveCTA";
import SwitchProjectModal, {
  LAYER_PROJECTS,
  TargetProjectInfo,
} from "@/components/SwitchProjectModal";
import { useLanguage } from "@/context/LanguageContext";

export default function AustflyProjectPage() {
  const { lang, setLang } = useLanguage();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [activeLayer, setActiveLayer] = useState(2); // Instance layer active by default
  const [switchModalOpen, setSwitchModalOpen] = useState(false);
  const [targetProject, setTargetProject] = useState<TargetProjectInfo | null>(null);
  const titleSectionRef = useRef<HTMLDivElement>(null);

  const handleLayerClick = (layerId: number) => {
    if (layerId === 2) {
      setActiveLayer(2);
    } else {
      setTargetProject(LAYER_PROJECTS[layerId]);
      setSwitchModalOpen(true);
    }
  };

  const layers = [
    { id: 0, label: "Platform layer" },
    { id: 1, label: "Framework layer" },
    { id: 2, label: "Instance layer" },
  ];

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
      ? "Một nền tảng whitelabel chỉ đáng tin cậy khi các instance ứng dụng thực tế hoạt động trơn tru — và đây là thương hiệu cửa cuốn số 1 Việt Nam, vận hành trên nền tảng hạ tầng mà hầu hết người dùng chưa từng nhìn thấy. Nếu RaIO không thể biến sự phức tạp kỹ thuật phía sau thành trải nghiệm mượt mà, lời hứa của cả hệ sinh thái sẽ sụp đổ. Đây không chỉ là việc sửa một ứng dụng — đây là minh chứng cho thấy nền tảng có thể biến sự phức tạp vô hình trở nên đơn giản."
      : "A whitelabel platform is only as credible as its weakest instance — and this one carries Vietnam's #1 roller-shutter brand, running on infrastructure most users never see. If RaIO can't turn that much backend complexity into something effortless, the whole ecosystem promise breaks down. This wasn't just fixing one app — it was proof the platform could make invisible complexity feel simple.";

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

            {/* Project Title & Hero Subtitle */}
            <div ref={titleSectionRef} className="space-y-4 sm:space-y-6 scroll-mt-24">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                Austfly - Rolling door Control app
              </h1>

              <p className="text-b2 md:text-b1 text-white/70 leading-relaxed max-w-[760px]">
                {heroDescription}
              </p>
            </div>
          </div>

          {/* SECTION 1: HERO BANNER MOCKUP */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[3786/1440] rounded-[8px] lg:rounded-[16px] overflow-hidden">
            <Image
              src="/images/austfly_project/Diagram hero.jpg"
              alt="Austfly Rolling Door Control App Mockup"
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, 1440px"
              className="object-cover object-center"
            />
          </div>

          {/* SECTION 1.5: 3-LAYER MINI TABS & ARCHITECTURE OVERVIEW (Diagram 0.jpg) */}
          <div className="space-y-[20px]">
            {/* Mini Tab for 3 layers: heading-24px with active green bar indicator */}
            <div className="flex items-center gap-6 sm:gap-8 flex-wrap font-heading text-[20px] sm:text-[24px] font-bold">
              {layers.map((layer) => {
                const isActive = activeLayer === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => handleLayerClick(layer.id)}
                    className="flex items-center gap-2.5 transition-colors cursor-pointer bg-transparent border-0 outline-none p-0 text-left group"
                  >
                    {isActive && (
                      <span className="w-1.5 h-[20px] sm:h-[24px] bg-[#00DC6C] rounded-full inline-block shrink-0" />
                    )}
                    <span
                      className={`transition-colors ${
                        isActive
                          ? "text-[#00DC6C]"
                          : "text-white/40 hover:text-white/80"
                      }`}
                    >
                      {layer.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Diagram 0.jpg White Card Container (Aspect 3720/1440) */}
            <div className="relative w-full aspect-[3720/1440] rounded-[8px] lg:rounded-[16px] overflow-hidden">
              <Image
                src="/images/austfly_project/Diagram 0.jpg"
                alt="3-Layer Architecture Diagram - Instance Layer Highlighted"
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 1440px"
                className="object-cover object-center"
              />
            </div>

            {/* Contextual navigation link when Platform or Framework layer is selected */}
            {activeLayer === 0 && (
              <div className="flex items-center justify-between p-4 bg-[#00DC6C]/10 border border-[#00DC6C]/30 rounded-[8px] lg:rounded-xl transition-all">
                <span className="text-b3 sm:text-b2 text-white/90 font-mono">
                  {lang === "vi"
                    ? "Tầng Nền tảng cốt lõi: Rogo Platform Dashboard V2"
                    : "Core Platform Layer: Rogo Platform Dashboard V2"}
                </span>
                <Link
                  href="/works/rogo-platform-v2"
                  className="text-b3 sm:text-b2 font-bold text-[#00DC6C] hover:underline inline-flex items-center gap-1 font-mono"
                >
                  {lang === "vi" ? "Xem chi tiết dự án Rogo Platform →" : "View Rogo Platform project →"}
                </Link>
              </div>
            )}

            {activeLayer === 1 && (
              <div className="flex items-center justify-between p-4 bg-[#00DC6C]/10 border border-[#00DC6C]/30 rounded-[8px] lg:rounded-xl transition-all">
                <span className="text-b3 sm:text-b2 text-white/90 font-mono">
                  {lang === "vi"
                    ? "Tầng Framework ứng dụng: RaIO Smart whitelabel app"
                    : "Framework Layer: RaIO Smart whitelabel app"}
                </span>
                <Link
                  href="/works/raio-smart"
                  className="text-b3 sm:text-b2 font-bold text-[#00DC6C] hover:underline inline-flex items-center gap-1 font-mono"
                >
                  {lang === "vi" ? "Xem chi tiết dự án RaIO Smart →" : "View RaIO Smart project →"}
                </Link>
              </div>
            )}
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
                  <div className="relative w-[130px] h-[32px] group cursor-pointer">
                    <Image
                      src="/images/Austdoor.svg"
                      alt="AUSTDOOR"
                      fill
                      className="object-contain object-left filter brightness-0 invert hover:filter-none transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* My Role */}
              <div className="space-y-4">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi" ? "Vai trò của tôi" : "My Role"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {["UI/UX research", "BA development", "UI Design"].map((item) => (
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
                    ? "Vai trò của tôi là chuyển hóa sự phức tạp kỹ thuật thành trải nghiệm trực quan: trực tiếp trải nghiệm ứng dụng và sơ đồ hóa cách các thiết bị giao tiếp với nhau, sau đó thiết kế luồng UX và giao diện UI giúp che giấu sự phức tạp của các giao thức sau một trải nghiệm mà bất kỳ chủ nhà nào cũng có thể dễ dàng sử dụng — từ luồng cài đặt có hướng dẫn, giám sát đa camera nhóm, truy cập camera mã hóa, trạng thái đóng/mở trực tiếp, cho đến các kịch bản tự động hóa mặc định (đèn, điều hòa, ổ cắm) giúp sản phẩm mở rộng từ một thiết bị đơn lẻ thành một thói quen sống."
                    : "My role was to translate that technical complexity into experience: I used the app firsthand and mapped how each device actually talked to the others, then designed the UX and UI that hides the protocol-juggling behind something a non-technical homeowner could follow — a guided setup flow, grouped multi-camera monitoring, encrypted camera access, live open/close status, and default automation scenarios (lights, AC, plugs) that let the product grow beyond one device into a habit."}
                </p>
              </div>

              {/* Tools */}
              <div className="space-y-3">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi" ? "Công cụ" : "Tools"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Figma", "Chat GPT"].map((tool) => (
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

            {/* Left Column: The Problem, The Product & Where Austfly Fits (Below summary on mobile/tablet, Left on desktop) */}
            <div className="order-2 lg:order-1 lg:col-span-7 py-8 lg:py-16 space-y-10">
              {/* The problem */}
              <div className="space-y-3">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi" ? "Vấn đề" : "The problem"}
                </span>
                <p className="text-b2 md:text-b1 text-white/80 leading-relaxed font-normal">
                  {lang === "vi"
                    ? "Austdoor là thương hiệu cửa cuốn thông minh hàng đầu Việt Nam — thương hiệu đã tiên phong mang tiêu chuẩn Úc vào thị trường trong nước và xây dựng mạng lưới phân phối toàn quốc từ năm 2003. Tuy nhiên, vị thế dẫn đầu về phần cứng đã vượt xa phần mềm điều khiển. Austfly, ứng dụng đại diện cho tuyên ngôn 'thông minh', ban đầu gặp phải luồng camera không mã hóa, quy trình cài đặt tách rời hub Wi-Fi và camera thành hai bước thiếu liên kết, cùng quy trình khôi phục buộc người dùng phải factory reset hoàn toàn khi gặp sự cố. Một thương hiệu định vị là an toàn nhất phân khúc lại đang được đại diện bởi một ứng dụng chưa đáp ứng trọn vẹn lời hứa đó."
                    : "Austdoor is Vietnam's leading name in smart roller shutters — the brand that introduced Australian-standard shutters to the local market and built a nationwide distribution network since 2003. But market leadership in hardware had outpaced the software meant to carry it into the smart-home era. Austfly, the app powering that 'smart' claim, shipped with camera feeds that had no encryption, a setup flow that treated the Wi-Fi hub and camera as two disconnected steps, and a recovery process where any malfunction meant a full factory reset. A brand positioned as the safest name in the category was being represented by an app that couldn't consistently deliver on that promise."}
                </p>
              </div>

              {/* The Product */}
              <div className="space-y-3">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi" ? "Sản phẩm" : "The Product"}
                </span>
                <p className="text-b2 md:text-b1 text-white/80 leading-relaxed font-normal">
                  {lang === "vi"
                    ? "Austfly là instance mang thương hiệu riêng của Austdoor trong hệ sinh thái RaIO — tầng nơi phần cứng cửa cuốn hàng đầu Việt Nam hội tụ cùng trải nghiệm điều khiển tương xứng với vị thế dẫn đầu. Ứng dụng đồng bộ bộ điều khiển cửa cuốn với camera an ninh để chủ nhà có thể giám sát lối vào theo thời gian thực ngay cả khi cửa đóng hoàn toàn, biến một sản phẩm cơ khí an ninh thành một giải pháp thông minh thực thụ. Nếu RaIO giải quyết bài toán phân mảnh đa thương hiệu, thì Austfly chính là minh chứng cho năng lực thực thi của hệ sinh thái đối với một thương hiệu dẫn đầu: phần cứng được cả nước tin dùng, nay được song hành cùng phần mềm đạt chuẩn tương đương."
                    : "Austfly is Austdoor's branded instance within the RaIO ecosystem — the layer where Vietnam's leading roller-shutter hardware meets a control experience built to match its market position. It syncs shutter controllers with cameras so homeowners can monitor their entryway in real time, even with the shutter fully closed, turning a mechanical security product into a genuinely intelligent one. Where RaIO solved fragmentation across brands, Austfly is the proof point for what the ecosystem enables within a category leader: hardware trusted nationwide, finally paired with software built to the same standard."}
                </p>
              </div>

              {/* Where Austfly Fits in the Bigger Picture */}
              <div className="space-y-3">
                <span className="text-b3 font-mono text-white/40 uppercase tracking-wider block">
                  {lang === "vi"
                    ? "Vị trí của Austfly trong bức tranh tổng thể"
                    : "Where Austfly Fits in the Bigger Picture"}
                </span>
                <p className="text-b2 md:text-b1 text-white/80 leading-relaxed font-normal">
                  {lang === "vi"
                    ? "Austdoor chính là ca kiểm chứng thực tế của RaIO — thương hiệu được lựa chọn để chứng minh rằng một nhà sản xuất lớn, đặt nặng uy tín lâu năm có thể ứng dụng nền tảng mà không làm mờ nhạt nhận diện thương hiệu. Điều này khiến việc ra mắt Austfly mang tính thử thách cao hơn các instance thông thường: bất kỳ điểm nghẽn trải nghiệm nào không chỉ ảnh hưởng đến Austdoor, mà còn là thước đo đánh giá liệu mô hình whitelabel của RaIO có thực sự đứng vững trước các thương hiệu lớn hay không."
                    : "Austdoor was RaIO's proof case — the brand chosen to demonstrate that an established, reputation-driven manufacturer could adopt the platform without diluting its own identity. That made Austfly's launch high-stakes in a way most whitelabel instances aren't: any friction users hit wouldn't just reflect on Austdoor, it would reflect on whether RaIO's whitelabel model actually holds up for a brand with something to lose."}
                </p>
                <p className="text-b2 md:text-b1 text-white/80 leading-relaxed font-normal">
                  {lang === "vi"
                    ? "Một luồng truyền camera không mã hóa không phải là thiếu sót nhỏ đối với một thương hiệu phần cứng an ninh — nó mâu thuẫn trực tiếp với cam kết 'an toàn' cốt lõi của Austdoor. Và trong một phân khúc mà niềm tin là toàn bộ giá trị sản phẩm, lỗ hổng đó là rủi ro uy tín chứ không đơn thuần là lỗi UX. Việc tái cấu trúc Austfly không phải bảo trì phụ; đó là bài kiểm tra thực sự đầu tiên về việc RaIO có thể mở rộng tới những thương hiệu có uy tín lớn cần bảo vệ."
                    : "A camera feed without encryption isn't a minor gap for a security-hardware brand — it directly contradicts the 'an toàn' (safety) claim at the center of Austdoor's market position, and in a category where trust is the entire product, that gap was reputational risk, not just a UX flaw. Fixing Austfly wasn't optional maintenance; it was the first real test of whether RaIO could scale to brands that had more to protect than to gain."}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 3: MECHANISM BETWEEN DEVICES */}
          <div className="space-y-[20px] pt-4">
            <h2 className="font-heading text-[28px] sm:text-[36px] font-bold text-white tracking-tight leading-tight">
              {lang === "vi" ? "Cơ chế giao tiếp giữa các thiết bị" : "Mechanism between devices"}
            </h2>

            <div className="space-y-[20px]">
              {/* Diagram 9: 5-Device overview (1. Austfly app, 2. Hub, 3. Remote, 4. Shutter controller, 4. Camera) */}
              <div className="relative w-full aspect-[3720/1440] rounded-[8px] lg:rounded-[16px] overflow-hidden bg-white shadow-md">
                <Image
                  src="/images/austfly_project/Diagram 9.jpg"
                  alt="1. Austfly mobile app, 2. Austdoor 5.0 wifi hub, 3. Remote control, 4. Roller shutter controller, 4. Austfly Ezviz Camera"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </div>

              {/* Diagram 10: System Communication Graph */}
              <div className="relative w-full aspect-[3720/2880] rounded-[8px] lg:rounded-[16px] overflow-hidden bg-white shadow-md">
                <Image
                  src="/images/austfly_project/Diagram 10.jpg"
                  alt="The graph shows how all the devices and app can work together"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: APP DESIGN */}
          <div className="space-y-[20px] pt-4">
            <h2 className="font-heading text-[28px] sm:text-[36px] font-bold text-white tracking-tight leading-tight">
              App Design
            </h2>

            <div className="space-y-[20px]">
              {/* Block 1: Design system follow brand guideline (Diagram 1.jpg) */}
              <div className="relative w-full aspect-[3720/1440] rounded-[8px] lg:rounded-[16px] overflow-hidden shadow-md">
                <Image
                  src="/images/austfly_project/Diagram 1.jpg"
                  alt="Design system follow brand guideline"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </div>

              {/* Block 2: 2-Column Grid - Logo (Diagram 2.jpg) & Color Palette (Diagram 3.jpg) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] w-full">
                <div className="relative w-full aspect-[1800/1440] rounded-[8px] lg:rounded-[16px] overflow-hidden shadow-md">
                  <Image
                    src="/images/austfly_project/Diagram 2.jpg"
                    alt="AUSTfly Logo"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative w-full aspect-[1800/1440] rounded-[8px] lg:rounded-[16px] overflow-hidden shadow-md">
                  <Image
                    src="/images/austfly_project/Diagram 3.jpg"
                    alt="Brand Color Palette: Primary, Neutral light, Secondary, Neutral dark"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Block 3: 2-Column Grid - Rolling door UI (Diagram 4.jpg) & Icon set (Diagram 5.jpg) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] w-full">
                <div className="relative w-full aspect-[1800/1440] rounded-[8px] lg:rounded-[16px] overflow-hidden shadow-md">
                  <Image
                    src="/images/austfly_project/Diagram 4.jpg"
                    alt="Rolling door 1 control interface"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative w-full aspect-[1800/1440] rounded-[8px] lg:rounded-[16px] overflow-hidden shadow-md">
                  <Image
                    src="/images/austfly_project/Diagram 5.jpg"
                    alt="Austfly Iconography System"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Block 4: Splash Screen Banner (Diagram 16.jpg) */}
              <div className="relative w-full aspect-[3720/1440] rounded-[8px] lg:rounded-[16px] overflow-hidden shadow-md">
                <Image
                  src="/images/austfly_project/Diagram 16.jpg"
                  alt="Austfly Splash Screen"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </div>

              {/* Block 5: 2-Column Grid - Remote devices (Diagram 6.jpg) & Add device UI (Diagram 7.jpg) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] w-full">
                <div className="relative w-full aspect-[1800/1440] rounded-[8px] lg:rounded-[16px] overflow-hidden shadow-md">
                  <Image
                    src="/images/austfly_project/Diagram 6.jpg"
                    alt="Austdoor remote & other remotes on market"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative w-full aspect-[1800/1440] rounded-[8px] lg:rounded-[16px] overflow-hidden shadow-md">
                  <Image
                    src="/images/austfly_project/Diagram 7.jpg"
                    alt="Add device - Choose remote control UI"
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Block 6: Full-Width Mobile Lifestyle Mockup (Diagram 8.jpg) */}
              <div className="relative w-full aspect-[3786/1440] rounded-[8px] lg:rounded-[16px] overflow-hidden shadow-md">
                <Image
                  src="/images/austfly_project/Diagram 8.jpg"
                  alt="Austfly in real world smart home garage"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* SECTION 5: RELATED WORKS / MORE PROJECTS */}
          <section className="space-y-8 pt-12 border-t-2 border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {lang === "vi" ? "Dự án liên quan" : "Related Projects"}
              </h2>
              <Link
                href="/works"
                className="text-b3 sm:text-b2 font-mono text-[#00DC6C] hover:underline flex items-center gap-1"
              >
                {lang === "vi" ? "Xem tất cả dự án →" : "View all projects →"}
              </Link>
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

              {/* Card 3: Thing Partner */}
              <Link
                href="/works"
                className="group block flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="relative w-full aspect-[4/3] rounded-[8px] lg:rounded-[12px] overflow-hidden bg-[#181818]">
                    <Image
                      src="/images/Thing Partner.png"
                      alt="Thing Partner"
                      fill
                      className="object-cover object-left group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-block text-[11px] font-mono font-bold text-white/70 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                      PAAS • B2B
                    </span>
                  </div>

                  <h3 className="text-h5 sm:text-h4 font-bold text-white group-hover:text-[#00DC6C] transition-colors">
                    Thing Partner
                  </h3>

                  <p className="text-b3 text-white/70 leading-relaxed font-mono">
                    {lang === "vi"
                      ? "Dành cho đội ngũ trực tiếp sản xuất và quản lý thiết bị, bao quát từ firmware đến bảo hành qua 6 giai đoạn."
                      : "Purpose-built for hardware manufacturers to manage end-to-end device lifecycle across 6 stages."}
                  </p>
                </div>
              </Link>
            </div>
          </section>

        </div>
      </main>

      {/* Footer Section */}
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

      {/* Switch Project Modal for System Thinking Layers */}
      <SwitchProjectModal
        isOpen={switchModalOpen}
        onClose={() => setSwitchModalOpen(false)}
        targetProject={targetProject}
        lang={lang}
      />
    </div>
  );
}
