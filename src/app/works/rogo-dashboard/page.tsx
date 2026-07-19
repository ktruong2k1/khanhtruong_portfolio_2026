"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Menu, X, Maximize2, ExternalLink } from "lucide-react";

// Bilingual translations dictionary
const translations = {
  vi: {
    navWork: "Dự án",
    navAbout: "Giới thiệu về tôi",
    navContact: "Kết nối với tôi",
    availableRemote: "Làm việc từ xa",
    backToWorks: "Quay lại Dự án",
    role: "VAI TRÒ",
    timeline: "THỜI GIAN",
    toolsTech: "CÔNG CỤ & CÔNG NGHỆ",
    liveDemo: "Live demo",
    viewFigma: "Xem Figma",
    problemTitle: "01 Bài toán",
    contextTitle: "02 Bối cảnh: Một hệ thống, Nhiều phân tầng",
    roleTitle: "03 Vai trò của tôi",
    archTitle: "04 Kiến trúc trải nghiệm: Vẽ sơ đồ trước khi thiết kế",
    decisionsTitle: "05 Quyết định thiết kế",
    screensTitle: "06 Giao diện chính",
    designSystemTitle: "07 Hệ thống thiết kế",
    impactTitle: "08 Tác động",
    reflectionTitle: "09 Suy ngẫm",
    exploreTitle: "DỰ ÁN NỔI BẬT",
    continueExploring: "Tiếp tục khám phá",
    copied: "Đã sao chép!",
    contactModalTitle: "Gửi tin nhắn cho tôi",
    contactModalDesc: "Viết tin nhắn ngắn gọn. Click gửi sẽ tự động tạo thư nháp gửi tới địa chỉ email quản trị ktruong2k1@gmail.com.",
    contactModalLabel: "Nội dung tin nhắn",
    contactModalPlaceholder: "Chào Trường, tôi muốn liên hệ công việc về...",
    contactModalSubmit: "Gửi mail liên hệ (Draft)",
    
    // Section descriptions
    problemDesc: "Nhưng hệ thống quản lý hiện tại được xây dựng như thể chỉ có một khách hàng duy nhất. Giao diện dùng chung, không phân tách thương hiệu, không kiểm soát quyền hạn chi tiết. Mỗi khi một đối tác mới tham gia, đội ngũ Rogo phải can thiệp thủ công — các đối tác không thể tự quản lý dữ liệu của mình.",
    problemHighlight: "Điểm nghẽn đó đã kìm hãm Rogo mở rộng quy mô. Và đó là lý do dự án này được bắt đầu.",
    
    contextDesc: "Một người dùng có thể thuộc nhiều tổ chức và nhiều dự án khác nhau, với các vai trò khác nhau ở mỗi nơi. Một người quản lý một dự án có thể không được phép xem dự án khác trong cùng một tổ chức. Quyền truy cập đầy đủ tại Đối tác A không có giá trị gì tại Đối tác B.",
    contextHighlight: "Bảng điều khiển cần phản ánh cấu trúc đó một cách chính xác – không đơn giản hóa quá mức cần thiết, nhưng cũng không phức tạp hơn mức cần có.",
    
    roleLeft: "Không có đội ngũ thiết kế nào khác trong dự án này. Tôi là người duy nhất chịu trách nhiệm cho toàn bộ trải nghiệm sản phẩm — từ phân tích yêu cầu cho đến giai đoạn sản xuất.",
    roleRight: "Đảm nhận một phần công việc frontend không phải là để lấp chỗ trống — mà là trực tiếp làm chủ những phần nhạy cảm nhất về tương tác. Một số thứ dễ dàng tự code chuẩn hơn là viết đặc tả thiết kế.",
    
    roleCol1Title: "Phân tích & Đặc tả",
    roleCol1Desc: "Làm việc trực tiếp với các yêu cầu từ ban lãnh đạo, viết đặc tả cho từng luồng vận hành, định nghĩa các trường hợp đặc biệt (edge cases) trước khi bắt đầu thiết kế",
    roleCol2Title: "Kiến trúc trải nghiệm",
    roleCol2Desc: "Thiết kế mô hình điều hướng, phân cấp thông tin và luồng phân quyền",
    roleCol3Title: "Thiết kế UI",
    roleCol3Desc: "Xây dựng hệ thống thiết kế (Design System), thư viện component và bố cục responsive",
    roleCol4Title: "Lập trình Frontend",
    roleCol4Desc: "Trực tiếp lập trình 60% giao diện UI trên môi trường production",
    roleCol5Title: "Hợp tác phát triển",
    roleCol5Desc: "Đánh giá code, xác minh các trạng thái tương tác, đảm bảo thiết kế được bảo toàn trọn vẹn trong quá trình triển khai",
    
    archDesc: "Trước khi vẽ bất kỳ wireframe nào, tôi đã phác thảo ba luồng chính định hình toàn bộ trải nghiệm — không phải để ghi chép yêu cầu, mà là để tìm ra nơi cần đưa ra các quyết định thiết kế then chốt.",
    
    flow1Title: "01 — Xác thực tài khoản",
    flow1Desc: "Trang đăng nhập là nơi thương hiệu whitelabel, bảo mật token và khôi phục phiên hoạt động hội tụ trên một màn hình duy nhất. Vẽ luồng này trước tiên giúp giao diện tải đúng nhận diện đối tác trước khi người dùng nhìn thấy bất kỳ thứ gì.",
    flow2Title: "02 — Quản lý tổ chức",
    flow2Desc: "Cấu trúc nội bộ của đối tác — tổ chức, dự án, thành viên — cần được thể hiện đầy đủ ở mọi cấp độ giao diện. Việc vẽ luồng tạo mới, cập nhật, chuyển giao và thao tác thành viên giúp ngăn chặn hiện tượng phình to phạm vi (scope creep) khi thiết kế Cấu trúc truy cập (Access Tree).",
    flow3Title: "03 — Phân quyền (ABAC)",
    flow3Desc: "Luồng phức tạp nhất: quyền truy cập được tải khi đăng nhập, điều phối nội dung hiển thị ở thanh bên và vùng nội dung, với các thao tác cấp/thu hồi quyền phải có cảm giác đơn giản mà vẫn đảm bảo độ chính xác. Sơ đồ đã chỉ ra bốn phân hệ riêng biệt — thiết kế cần làm nổi bật một phần và dung hòa các phần còn lại.",
    
    decisionsDesc: "Ba quyết định dưới đây không có trong yêu cầu ban đầu. Chúng đến từ việc đặt ra một câu hỏi khó hơn: sản phẩm này thực sự cần phát triển thành cái gì — và điều gì sẽ cản trở nó nếu chúng ta không giải quyết ngay từ bây giờ?",
    
    dec1Title: "Quyết định 1 — Một bảng điều khiển thay thế nhiều trang",
    dec1Left: "Thanh bên cũ là một danh sách phẳng các mô-đun sản phẩm — Dự án, Kích hoạt thiết bị, Quản lý truy cập, Phát triển sản phẩm, Dịch vụ đám mây — hoàn toàn không thể hiện Đối tác, Tổ chức hay Dự án ở bất kỳ đâu. Cấu trúc phân cấp đơn giản là không có chỗ đứng trong điều hướng cũ.",
    dec1RightTitle: "Gộp bốn bước điều hướng vào một bảng điều khiển cố định – sơ đồ cây chính là ứng dụng.",
    dec1RightDesc: "Tôi chia thanh điều hướng mới thành hai phần: một App Nav nhỏ gọn để chuyển đổi giữa các khu vực chức năng, và một Access Tree (Sơ đồ cây truy cập) cố định bên cạnh thể hiện cấu trúc Đối tác -> Tổ chức -> Dự án, tích hợp cả tìm kiếm. Việc chọn bất kỳ nút nào sẽ cập nhật bảng tổng quan ngay lập tức — không tải lại trang, không mất vị trí hiện tại.",
    
    dec2Title: "Quyết định 2 — Whitelabel: Tính năng tạo nên giá trị thương mại",
    dec2Sub1Title: "Hộp chuyển đổi đối tác mới",
    dec2Sub1Desc: "Một câu hỏi liên tục nảy sinh trong quá trình phân tích: nếu bảng điều khiển này được bán cho nhiều đối tác, họ sẽ nhìn thấy thương hiệu nào khi đăng nhập? Chính là thương hiệu của họ — nhưng điều này không có trong yêu cầu ban đầu.",
    dec2Sub2Title: "Mô-đun cài đặt thương hiệu",
    dec2Sub2Desc: "Tôi thiết kế mô-đun Cài đặt thương hiệu — Tài nguyên logo (logo chính, favicon) và Màu thương hiệu, bên cạnh các tab Tên miền và Mẫu email riêng biệt — để nhận diện của đối tác đồng nhất xuyên suốt bảng điều khiển, tab trình duyệt và email gửi đi, chứ không chỉ là một bảng màu đơn thuần. Đây không phải là tính năng trang trí; nó giúp đối tác thực sự cảm nhận họ đang vận hành sản phẩm của chính mình, chứ không phải đi mượn từ Rogo.",
    
    dec3Title: "Quyết định 3 — Phân quyền: Ẩn đi sự phức tạp, Không ẩn đi tính năng",
    dec3Row1Title: "Hai phạm vi, một tab – giao diện thay đổi khớp với vị trí làm việc của quản trị viên.",
    dec3Row1Desc: "Mỗi người dùng có thể giữ hai bộ quyền song song đồng thời: một ở cấp đối tác — bao gồm Tổ chức, Quản lý dự án, Phát triển sản phẩm, Ủy quyền và Báo cáo — và một ở cấp dự án, áp dụng cho các dự án cụ thể hoặc tất cả cùng lúc. Việc hiển thị cả hai dưới dạng một ma trận phẳng sẽ buộc quản trị viên phải hiểu rõ kiến trúc hệ thống chỉ để cấp đúng quyền truy cập.",
    dec3Row2Title: "Cấp đối tác hay dự án, cùng một hộp thoại – hai tab, một mô hình cốt lõi phía dưới.",
    dec3Row2Desc: "Thay thế thiết kế phẳng, hộp thoại Cấp quyền chia các tùy chọn này thành hai tab rõ ràng. Partner Permission quản lý quyền truy cập cấp đối tác trên cả 5 nhóm quyền trong một màn hình. Project Permission cho phép quản trị viên chọn một hoặc nhiều dự án từ sơ đồ cây và chỉ định các quyền cấp dự án trong cùng một thao tác. Cả hai có thể cấu hình độc lập cho mỗi người dùng, theo bất kỳ tổ hợp nào.",
    
    screen1Title: "Tổng quan — Quản trị viên",
    screen2Title: "Người dùng & Phân quyền — Phạm vi Đối tác",
    screen3Title: "Tài khoản (Cài đặt thương hiệu)",
    screen4Title: "Người dùng & Phân quyền — Phạm vi Dự án",
    
    designSystemDesc: "Toàn bộ giao diện được xây dựng dựa trên một hệ sinh thái design system tự thiết kế và phát triển từ đầu — không sử dụng các mẫu có sẵn.",
    
    impactCol1Title: "Nền tảng",
    impactCol1Desc: "Đối tác mới có thể bắt đầu hoạt động hoàn toàn tự phục vụ — cấu hình thương hiệu, thiết lập tổ chức, quản lý quyền truy cập người dùng — mà không cần Rogo can thiệp thủ công.",
    impactCol2Title: "Trải nghiệm",
    impactCol2Desc: "Hệ thống phân quyền phức tạp được đóng gói gọn gàng trong một giao diện mà các quản trị viên có thể sử dụng đúng cách mà không cần hiểu lớp kỹ thuật bên dưới.",
    impactCol3Title: "Kỹ thuật",
    impactCol3Desc: "40% giao diện UI do tôi trực tiếp lập trình không cần qua khâu kiểm duyệt thiết kế (design QA) — khoảng cách giữa thiết kế và lập trình bằng không đối với các thành phần đó.",
    impactCol4Title: "Khả năng mở rộng",
    impactCol4Desc: "Kiến trúc vỏ bọc (bảng điều hướng + vùng nội dung) đủ tổng quát để có thể bổ sung các mô-đun mới mà không cần thiết kế lại — mỗi tính năng mới chỉ cần thay đổi nội dung bên trong vùng hiển thị.",
    
    reflectionDesc: "Bài học lớn nhất từ dự án này không liên quan đến công cụ hay kỹ thuật:",
    reflectionHighlight: "\"Làm cho thứ gì đó đơn giản không có nghĩa là cắt bớt tính năng. Người dùng không cần nhìn thấy tất cả mọi thứ — họ chỉ cần nhìn thấy đúng thứ, vào đúng thời điểm.\"",
    reflectionBody: "Hệ thống phân quyền có thể cực kỳ chi tiết. Nhưng người dùng không cần phải biết điều đó. Mọi quyết định thiết kế trong dự án này đều xoay quanh một câu hỏi: ở bước này, người dùng đang cố gắng làm gì — và họ cần biết những gì để thực hiện điều đó?"
  },
  en: {
    navWork: "Work",
    navAbout: "About me",
    navContact: "Connect with me",
    availableRemote: "Available for Remote",
    backToWorks: "Back to Works",
    role: "ROLE",
    timeline: "TIMELINE",
    toolsTech: "TOOLS & TECH",
    liveDemo: "Live demo",
    viewFigma: "View Figma",
    problemTitle: "01 The Problem",
    contextTitle: "02 Context: One System, Many Layers",
    roleTitle: "03 My Role",
    archTitle: "04 Experience Architecture: Mapping Before Designing",
    decisionsTitle: "05 Design Decisions",
    screensTitle: "06 Key Screens",
    designSystemTitle: "07 Design System",
    impactTitle: "08 Impact",
    reflectionTitle: "09 Reflection",
    exploreTitle: "FEATURED PROJECTS",
    continueExploring: "Continue exploring",
    copied: "Email copied!",
    contactModalTitle: "Send me a message",
    contactModalDesc: "Write a short message. Clicking send will automatically generate a draft email addressed to ktruong2k1@gmail.com.",
    contactModalLabel: "Message contents",
    contactModalPlaceholder: "Hi Truong, I want to reach out regarding...",
    contactModalSubmit: "Send email (Draft)",
    
    // Section descriptions
    problemDesc: "But the existing management system was built as if there were only one customer. A shared interface, no brand separation, no granular access control. Every time a new partner came on board, the Rogo team had to step in manually — there was no way for partners to manage themselves.",
    problemHighlight: "That bottleneck was holding Rogo back from scaling. And that’s where this project started.",
    
    contextDesc: "A single user can belong to multiple organizations and multiple projects, with different roles in each. Someone who manages one project may not be allowed to see another project in the same organization. Full access at Partner A means nothing at Partner B.",
    contextHighlight: "The dashboard needed to reflect that structure accurately – no simpler than necessary, but no more complex than it needs to be.",
    
    roleLeft: "There was no design team on this project. I was the sole person responsible for the entire experience — from requirements analysis through to production.",
    roleRight: "Taking on part of the frontend work wasn’t about filling a gap — it was about owning the most interaction-sensitive parts directly. Some things are easier to build right than to explain in a spec.",
    
    roleCol1Title: "Analysis & Specification",
    roleCol1Desc: "Worked directly with leadership requirements, wrote specs for each flow, defined edge cases before design began",
    roleCol2Title: "Experience Architecture",
    roleCol2Desc: "Designed the navigation model, information hierarchy, and permission flow",
    roleCol3Title: "UI Design",
    roleCol3Desc: "Design system, component library, responsive layout",
    roleCol4Title: "Frontend Development",
    roleCol4Desc: "Implemented 60% of UI directly in production",
    roleCol5Title: "Dev Collaboration",
    roleCol5Desc: "Reviewed code, verified interaction states, ensured design held through implementation",
    
    archDesc: "Before any wireframe, I mapped the three flows that would define the entire experience — not to document requirements, but to find where the design decisions would need to be made.",
    
    flow1Title: "01 — Authentication",
    flow1Desc: "Login is where white-label branding, token security, and session recovery all converge in a single screen. Mapping this flow first ensured the interface loads the right partner identity before the user sees anything.",
    flow2Title: "02 — Organizations",
    flow2Desc: "The partner's internal structure — orgs, projects, members — needed to be fully representable in the UI at every level. Mapping create, update, transfer, and member actions prevented scope creep when it came to designing the Access Tree.",
    flow3Title: "03 — Permissions (ABAC)",
    flow3Desc: "The most complex flow: access loaded on login, driving what's visible in the sidebar and content areas, with grant/revoke actions that had to feel simple without losing precision. The map revealed four distinct sub-systems — the design needed to surface one and absorb the rest.",
    
    decisionsDesc: "These three decisions weren't in the original requirements. They came from asking a harder question: what does this product actually need to become — and what will hold it back if we don't solve it now?",
    
    dec1Title: "Decision 1 — One Panel Replacing Many Pages",
    dec1Left: "The old sidenav was a flat list of product modules — Project, Device Activations, Access Manager, Product Development, Cloud Services — with no representation of Partner, Organization, or Project anywhere in it. The hierarchy simply had no home in the navigation.",
    dec1RightTitle: "Collapsing four navigation steps into one persistent panel – the tree is the app.",
    dec1RightDesc: "I split the new sidenav into two parts: a slim App Nav for switching between functional areas, and a persistent Access Tree beside it that models the full Partner -> Organization -> Project structure, search included. Selecting any node updates the Overview panel instantly — no reload, no lost position.",
    
    dec2Title: "Decision 2 — White-label: The Feature That Makes It Sellable",
    dec2Sub1Title: "New partner switcher",
    dec2Sub1Desc: "One question kept surfacing during analysis: if this dashboard is sold to multiple partners, what brand do they see when they log in? Their own — but that wasn't in the spec.",
    dec2Sub2Title: "Branding settings Module",
    dec2Sub2Desc: "I designed a Branding settings module — Logo Assets (primary logo, favicon) and Brand Colors, alongside separate Domain and Email Templates tabs — so a partner's identity carries through the dashboard, the browser tab, and their outbound emails, not just a color swatch. It's not a cosmetic feature; it's what lets a partner feel they're running their own product, not borrowing Rogo's.",
    
    dec3Title: "Decision 3 — Permissions: Hide the Complexity, Not the Functionality",
    dec3Row1Title: "Two scopes, one tab – the view shifts to match where the admin is working.",
    dec3Row1Desc: "Each user can hold two parallel permission sets at the same time: one at the partner level — covering Organization, Project Management, Product Development, Authorization, and Report — and one at the project level, scoped to specific projects or applied across all at once. Exposing both as a flat matrix would force admins to understand the architecture just to grant the right access.",
    dec3Row2Title: "Partner or project, same dialog – two tabs, one model underneath.",
    dec3Row2Desc: "Instead, the Grant dialog separates these cleanly into two tabs. Partner Permission handles org-wide access across all five groups in one screen. Project Permission lets the admin select one or multiple projects from a tree and assign project-scoped access in the same action. The two can be configured independently per user, in any combination.",
    
    screen1Title: "Overview — Admin",
    screen2Title: "Users & Permissions — Partner Scope",
    screen3Title: "Account",
    screen4Title: "Users & Permissions — Project Scope",
    
    designSystemDesc: "The entire interface was built on a design system created from scratch — no templates.",
    
    impactCol1Title: "Platform",
    impactCol1Desc: "New partners can onboard entirely through self-service — branding configuration, organization setup, user access management — without Rogo stepping in.",
    impactCol2Title: "Experience",
    impactCol2Desc: "A complex permission system packaged into an interface that administrators can use correctly without understanding the technical layer underneath.",
    impactCol3Title: "Engineering",
    impactCol3Desc: "The 40% of UI I implemented directly required no design QA — the gap between design and production was zero on those components.",
    impactCol4Title: "Scalability",
    impactCol4Desc: "The shell architecture (navigation panel + content area) is generic enough that new modules can be added without a redesign — each new feature only needs to change what's inside the content zone.",
    
    reflectionDesc: "The biggest lesson from this project had nothing to do with tools or techniques:",
    reflectionHighlight: "\"Making something simple doesn't mean making it less. Users don't need to see everything — they need to see the right thing, at the right moment.\"",
    reflectionBody: "The permission system can be highly granular. But users don't need to know that. Every design decision in this project came back to the same question: at this step, what is the user trying to do — and what do they need to know to do it?"
  }
};

export default function RogoDashboardPage() {
  const [lang, setLang] = useState<"vi" | "en">("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [activeFlow, setActiveFlow] = useState<number>(0);

  // Load language settings from localStorage if available
  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio_lang") as "vi" | "en" | null;
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const handleLangChange = (newLang: "vi" | "en") => {
    setLang(newLang);
    localStorage.setItem("portfolio_lang", newLang);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUri = `mailto:ktruong2k1@gmail.com?subject=Contact from Portfolio&body=${encodeURIComponent(contactMessage)}`;
    window.location.href = mailtoUri;
    setContactModalOpen(false);
    setContactMessage("");
  };

  const t = translations[lang];

  const renderSectionTitle = (num: string, text: string) => {
    // Remove leading numbers/prefixes like "01 Problem" or "02 Context" if they are present in translations
    const cleanText = text.replace(/^\d+\s+—?\s*/, "").replace(/^\d+\s+/, "");
    return (
      <div className="flex items-start gap-2 mb-2">
        <span 
          style={{
            color: "var(--color-secondary-300)",
            fontFamily: "Be Vietnam Pro",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "21px"
          }}
        >
          {num}
        </span>
        <h2 
          style={{
            color: "#FFF",
            fontFamily: "Fraunces",
            fontSize: "28px",
            fontWeight: 700,
            lineHeight: "42px"
          }}
        >
          {cleanText}
        </h2>
      </div>
    );
  };

  const flows = [
    { title: t.flow1Title, desc: t.flow1Desc, img: "/images/rogo_project/Diagram 3.png", index: 0 },
    { title: t.flow2Title, desc: t.flow2Desc, img: "/images/rogo_project/Diagram 4.png", index: 1 },
    { title: t.flow3Title, desc: t.flow3Desc, img: "/images/rogo_project/Diagram 5.png", index: 2 }
  ];

  return (
    <>
      <div className="page-wrapper text-[#E5E5E5] font-sans relative overflow-x-hidden transition-colors duration-300">
        
        {/* STICKY/FIXED HEADER */}
        <header 
          style={{
            display: 'flex',
            height: '76px',
            padding: '16px 120px',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'stretch',
            borderBottom: '1px solid var(--Colors-Neutral-800, #4B4B4B)',
            background: 'var(--Colors-Neutral-1000, #181818)',
            width: '100%',
            position: 'relative'
          }}
          className="w-full sticky top-0 z-40 transition-all duration-300"
        >
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2 text-white font-serif font-bold text-[20px] tracking-tight hover:scale-105 transition-transform duration-150">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="header-logo-mask-rogo">
                <rect width="28" height="28" fill="white" />
                <path d="M12 0C6 8 6 20 12 28" stroke="black" strokeWidth="2.5" fill="none" />
                <path d="M20 0C14 8 14 20 20 28" stroke="black" strokeWidth="2.5" fill="none" />
              </mask>
              <circle cx="14" cy="14" r="14" fill="#22C55E" mask="url(#header-logo-mask-rogo)" />
            </svg>
            khanhtruong_nguyen
          </Link>

          {/* Center: Navigation Links */}
          <nav 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              height: '100%',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
            className="hidden md:flex text-sm font-semibold"
          >
            <Link href="/works" className="nav-item active">
              {t.navWork}
              <span className="nav-item-line" />
            </Link>
            <Link href="/about" className="nav-item">
              {t.navAbout}
            </Link>
            <button 
              onClick={() => setContactModalOpen(true)}
              className="nav-item"
            >
              {t.navContact}
            </button>
          </nav>

          {/* Right: Language switch */}
          <div className="hidden md:flex items-center gap-4">
            <div 
              style={{ height: '32px' }}
              className="flex items-center rounded-full p-0.5 bg-neutral-950/80 select-none"
            >
              <button
                onClick={() => handleLangChange("vi")}
                className={`px-2.5 h-full rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${lang === "vi" ? "bg-neutral-800 text-white font-semibold" : "text-neutral-500 hover:text-neutral-300"}`}
                style={{
                  fontFamily: '"Be Vietnam Pro", sans-serif',
                  fontSize: '12px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '15px'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                  <circle cx="10" cy="10" r="10" fill="#DA251D"/>
                  <path d="M10 6.5L11.1 9.8H14.5L11.7 11.8L12.8 15.1L10 13.1L7.2 15.1L8.3 11.8L5.5 9.8H8.9L10 6.5Z" fill="#FFFF00"/>
                </svg>
                VIE
              </button>
              <button
                onClick={() => handleLangChange("en")}
                className={`px-2.5 h-full rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${lang === "en" ? "bg-neutral-800 text-white font-semibold" : "text-neutral-500 hover:text-neutral-300"}`}
                style={{
                  fontFamily: '"Be Vietnam Pro", sans-serif',
                  fontSize: '12px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '15px'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                  <clipPath id="uk-clip-rogo">
                    <circle cx="10" cy="10" r="10" />
                  </clipPath>
                  <g clipPath="url(#uk-clip-rogo)">
                    <circle cx="10" cy="10" r="10" fill="#012169" />
                    <path d="M0 0 L20 20 M20 0 L0 20" stroke="#FFFFFF" strokeWidth="2.5" />
                    <path d="M0 0 L20 20 M20 0 L0 20" stroke="#C8102E" strokeWidth="1.2" />
                    <path d="M10 0 V20 M0 10 H20" stroke="#FFFFFF" strokeWidth="4.5" />
                    <path d="M10 0 V20 M0 10 H20" stroke="#C8102E" strokeWidth="2.5" />
                  </g>
                </svg>
                ENG
              </button>
            </div>

            <a 
              href="/contact" 
              className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-status-200/50 hover:bg-status-200/10 text-xs text-[#E5E5E5] font-semibold transition-colors duration-150"
            >
              <span className="w-2 h-2 bg-status-200 rounded-full animate-pulse"></span>
              {t.availableRemote}
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-900 text-neutral-400 md:hidden transition-colors animate-fadeIn"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-[76px] left-0 right-0 border-b border-neutral-900 bg-[var(--Colors-Neutral-1000,#181818)] px-6 py-4 flex flex-col gap-4 text-sm font-semibold z-50">
              <Link href="/works" onClick={() => setMobileMenuOpen(false)} className="py-2 text-neutral-400 hover:text-white transition-colors">{t.navWork}</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-neutral-400 hover:text-white transition-colors">{t.navAbout}</Link>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setContactModalOpen(true);
                }} 
                style={{ background: 'none', border: 'none', textAlign: 'left', padding: '8px 0' }}
                className="py-2 text-neutral-400 hover:text-white transition-colors font-sans text-sm font-semibold cursor-pointer"
              >
                {t.navContact}
              </button>
            </div>
          )}
        </header>

        {/* PROJECT BANNER IMAGE */}
        <div className="w-full h-[360px] relative overflow-hidden bg-neutral-950">
          <Image 
            src="/images/rogo_project/Rogo IoT_Large.png"
            alt="Rogo IoT Platform Project Banner"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* MAIN CONTAINER */}
        <main className="w-full flex flex-col px-4 md:px-[120px] py-12 gap-20 mx-auto">
          
          {/* BACK TO WORKS LINK */}
          <div className="w-full flex justify-start -mb-12">
            <Link href="/works" className="inline-flex items-center gap-2 text-primary-300 hover:text-primary-400 font-semibold text-sm transition-colors group">
              <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
              {t.backToWorks}
            </Link>
          </div>

          {/* HEADER SECTION (TITLE + INFO CARD) */}
          <section className="flex flex-col md:flex-row justify-between items-start gap-12 w-full">
            {/* Title Block */}
            <div className="flex flex-col gap-6 w-full md:w-1/2">
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-semibold px-2.5 py-1 rounded bg-[#17211B] border border-primary-400 text-primary-400">FEATURED</span>
                <span className="text-[10px] uppercase font-semibold px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">PAAS • B2B</span>
              </div>
              <h1 className="font-serif text-white text-[32px] md:text-[48px] font-bold leading-tight tracking-tight">
                Rogo IoT Platform dashboard V2
              </h1>
              <div className="flex flex-wrap gap-4 mt-2">
                <a 
                  href="https://rogo-dashboard-web-v2.vercel.app/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-primary-400 text-neutral-1000 font-bold hover:bg-primary-300 transition-colors flex items-center gap-2 text-sm shadow-lg shadow-primary-400/10 cursor-pointer"
                >
                  {t.liveDemo} <ExternalLink size={14} />
                </a>
                <a 
                  href="https://figma.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full border border-neutral-600 hover:border-neutral-300 text-white font-semibold transition-colors flex items-center gap-2 text-sm cursor-pointer"
                >
                  {t.viewFigma} <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Project metadata Card */}
            <div className="w-full md:w-1/2 p-6 rounded-2xl border border-neutral-800 bg-[#0d1712] flex flex-col gap-6">
              <div>
                <span className="text-primary-400 font-bold text-xs tracking-wider block mb-2">{t.role}</span>
                <p className="text-white text-[14px] leading-[18px] font-medium">Lead Product Designer & Frontend Developer</p>
              </div>
              <div>
                <span className="text-primary-400 font-bold text-xs tracking-wider block mb-2">{t.timeline}</span>
                <p className="text-white text-[14px] leading-[18px] font-medium">April 2026 — June 2026 (4 Months)</p>
              </div>
              <div>
                <span className="text-primary-400 font-bold text-xs tracking-wider block mb-2">{t.toolsTech}</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Stitch AI", "Figma", "Claude AI", "Gemini CLI", "Vercel"].map((tool) => (
                    <span key={tool} className="text-[10px] font-semibold px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 01: THE PROBLEM */}
          <section className="flex flex-col gap-6 w-full">
            {renderSectionTitle("01", t.problemTitle)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
              <p style={{ width: "100%", display: "block" }} className="text-[#989898] font-sans text-[14px] font-normal leading-[18px] text-left">{t.problemDesc}</p>
              <p className="text-primary-300 font-medium md:pl-6 md:border-l border-neutral-800 text-base">{t.problemHighlight}</p>
            </div>
            
            {/* Diagram Wrapper with zoom button */}
            <div 
              className="relative w-full aspect-[21/9] overflow-hidden group cursor-zoom-in bg-transparent"
              onClick={() => setLightboxImg("/images/rogo_project/Diagram 01.png")}
            >
              <Image 
                src="/images/rogo_project/Diagram 01.png"
                alt="The Problem diagram"
                fill
                className="object-contain"
              />
              <button 
                className="absolute bottom-6 right-6 hover:scale-110 transition-transform cursor-pointer z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImg("/images/rogo_project/Diagram 01.png");
                }}
              >
                <img src="/images/rogo_project/Zoom_light.svg" alt="Zoom" className="w-6 h-6" />
              </button>
            </div>
          </section>

          {/* SECTION 02: CONTEXT */}
          <section className="flex flex-col gap-6 w-full">
            {renderSectionTitle("02", t.contextTitle)}
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between w-full">
              {/* Left description */}
              <div className="flex flex-col justify-between gap-4 py-2 flex-1 w-full text-left md:max-w-[400px]">
                <p style={{ width: "100%", display: "block" }} className="text-[#989898] font-sans text-[14px] font-normal leading-[18px] text-left">{t.contextDesc}</p>
                <p className="text-primary-300 font-medium text-base mt-2">{t.contextHighlight}</p>
              </div>
              
              {/* Right diagram */}
              <div className="w-full md:w-auto flex-shrink-0 overflow-x-auto max-w-full">
                <div 
                  className="relative w-full aspect-[1600/720] md:h-[360px] md:w-auto md:aspect-[1600/720] overflow-hidden group cursor-zoom-in bg-transparent"
                  onClick={() => setLightboxImg("/images/rogo_project/Diagram 2.png")}
                >
                  <Image 
                    src="/images/rogo_project/Diagram 2.png"
                    alt="Context diagram"
                    fill
                    className="object-contain"
                  />
                  <button 
                    className="absolute bottom-6 right-6 hover:scale-110 transition-transform cursor-pointer z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImg("/images/rogo_project/Diagram 2.png");
                    }}
                  >
                    <img src="/images/rogo_project/Zoom_light.svg" alt="Zoom" className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 03: MY ROLE */}
          <section className="flex flex-col gap-6 w-full">
            {renderSectionTitle("03", t.roleTitle)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
              <p style={{ width: "100%", display: "block" }} className="text-[#989898] font-sans text-[14px] font-normal leading-[18px] text-left">{t.roleLeft}</p>
              <p style={{ width: "100%", display: "block" }} className="md:pl-6 md:border-l border-neutral-800 text-[#989898] font-sans text-[14px] font-normal leading-[18px] text-left">{t.roleRight}</p>
            </div>

            {/* Unified horizontal table-like grid block in Section 03 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-0 w-full bg-[#0c1410] border border-neutral-800 rounded-[12px] overflow-hidden divide-y md:divide-y-0 md:divide-x divide-neutral-800">
              {[
                { title: t.roleCol1Title, desc: t.roleCol1Desc },
                { title: t.roleCol2Title, desc: t.roleCol2Desc },
                { title: t.roleCol3Title, desc: t.roleCol3Desc },
                { title: t.roleCol4Title, desc: t.roleCol4Desc },
                { title: t.roleCol5Title, desc: t.roleCol5Desc },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col p-6 md:py-6 md:px-10 items-start gap-5 self-stretch"
                >
                  <h4 
                    style={{
                      color: "var(--color-secondary-300)",
                      fontFamily: "Fraunces",
                      fontSize: "24px",
                      fontWeight: 700,
                      lineHeight: "36px"
                    }}
                    className="w-full text-left md:min-h-[72px]"
                  >
                    {item.title}
                  </h4>
                  <p 
                    style={{
                      color: "#989898",
                      fontFamily: "Be Vietnam Pro",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "18px"
                    }}
                    className="w-full text-left"
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 04: EXPERIENCE ARCHITECTURE */}
          <section className="flex flex-col gap-6 w-full" onMouseLeave={() => setActiveFlow(0)}>
            {renderSectionTitle("04", t.archTitle)}
            <p style={{ width: "100%", maxWidth: "896px", display: "block" }} className="text-[#989898] font-sans text-[14px] font-normal leading-[18px] text-left mb-4">{t.archDesc}</p>

            {/* Accordion Layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch w-full">
              {/* Left Expanded Card */}
              <div 
                className="md:col-span-3 flex flex-col bg-[#0e1713] rounded-2xl border border-primary-400 p-6 md:py-8 md:px-10 items-start justify-start gap-4 transition-all duration-300 ease-in-out min-h-[500px]"
              >
                <div key={activeFlow} className="w-full flex flex-col gap-4">
                  <h3 style={{ width: "100%", display: "block" }} className="font-serif text-[22px] font-bold text-secondary-300 animate-smartReveal">
                    {flows[activeFlow].title}
                  </h3>
                  <p style={{ width: "100%", display: "block" }} className="text-[#989898] font-sans text-[14px] font-normal leading-[18px] text-left animate-smartReveal animation-delay-100">
                    {flows[activeFlow].desc}
                  </p>
                  <div className="w-full flex justify-center mt-4 animate-smartReveal animation-delay-200">
                    <div 
                      className="relative w-full aspect-[800/360] md:h-[360px] md:w-auto md:aspect-[800/360] group cursor-zoom-in overflow-hidden rounded-[12px] bg-transparent flex-shrink-0"
                      onClick={() => setLightboxImg(flows[activeFlow].img)}
                    >
                      <Image 
                        src={flows[activeFlow].img}
                        alt={flows[activeFlow].title}
                        fill
                        className="object-contain transition-transform duration-500 hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                      <button 
                        className="absolute bottom-6 right-6 hover:scale-110 transition-transform cursor-pointer z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxImg(flows[activeFlow].img);
                        }}
                      >
                        <img src="/images/rogo_project/Zoom_light.svg" alt="Zoom" className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Collapsed Stack */}
              <div className="md:col-span-1 flex flex-col gap-6 justify-between items-stretch h-full min-h-[200px] md:min-h-0">
                {flows.map((item) => (
                  item.index !== activeFlow && (
                    <div 
                      key={item.index}
                      onMouseEnter={() => setActiveFlow(item.index)}
                      onClick={() => setActiveFlow(item.index)}
                      className="flex-1 flex flex-col bg-[#0e1713] rounded-2xl border border-transparent p-6 md:py-6 md:px-8 items-start justify-start cursor-pointer hover:border-primary-400 transition-all duration-300 ease-in-out select-none min-h-[120px] md:min-h-0"
                    >
                      <h3 style={{ width: "100%", display: "block" }} className="font-serif text-lg font-bold text-secondary-300">
                        {item.title}
                      </h3>
                    </div>
                  )
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 05: DESIGN DECISIONS */}
          <section className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-3">
              {renderSectionTitle("05", t.decisionsTitle)}
              <p style={{ width: "100%", maxWidth: "896px", display: "block" }} className="text-[#989898] font-sans text-[14px] font-normal leading-[18px] text-left">{t.decisionsDesc}</p>
            </div>

            {/* Decision 1 */}
            <div className="flex flex-col bg-primary-1000 rounded-xl p-6 md:py-6 md:px-10 items-start gap-5 self-stretch overflow-x-auto max-w-full">
              <h3 className="font-serif text-lg font-bold text-neutral-100">{t.dec1Title}</h3>
              <div className="flex justify-center w-full mt-2">
                <div 
                  className="relative w-full aspect-[2320/720] md:h-[360px] md:w-auto md:aspect-[2320/720] overflow-hidden group cursor-zoom-in bg-transparent flex-shrink-0"
                  onClick={() => setLightboxImg("/images/rogo_project/Diagram 6-1.png")}
                >
                  <Image 
                    src="/images/rogo_project/Diagram 6-1.png"
                    alt="One Panel Replacing Many Pages"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 1160px"
                  />
                  <button 
                    className="absolute bottom-6 right-6 hover:scale-110 transition-transform cursor-pointer z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImg("/images/rogo_project/Diagram 6-1.png");
                    }}
                  >
                    <img src="/images/rogo_project/Zoom_dark.svg" alt="Zoom" className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Decision 2 */}
            <div className="flex flex-col md:flex-row bg-primary-1000 rounded-xl p-6 md:py-6 md:px-10 items-start gap-8 self-stretch overflow-x-auto max-w-full">
              <div className="w-full md:w-[320px] md:flex-shrink-0 text-left">
                <h3 className="font-serif text-lg font-bold text-neutral-100">{t.dec2Title}</h3>
              </div>
              <div className="flex flex-col gap-6 w-full md:flex-1 md:min-w-0">
                <div 
                  className="relative w-full aspect-[1600/720] md:h-[360px] md:w-auto md:aspect-[1600/720] overflow-hidden group cursor-zoom-in bg-transparent flex-shrink-0"
                  onClick={() => setLightboxImg("/images/rogo_project/Diagram 7.png")}
                >
                  <Image 
                    src="/images/rogo_project/Diagram 7.png"
                    alt="New Partner Switcher"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  <button 
                    className="absolute bottom-6 right-6 hover:scale-110 transition-transform cursor-pointer z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImg("/images/rogo_project/Diagram 7.png");
                    }}
                  >
                    <img src="/images/rogo_project/Zoom_dark.svg" alt="Zoom" className="w-6 h-6" />
                  </button>
                </div>
                <div 
                  className="relative w-full aspect-[1600/720] md:h-[360px] md:w-auto md:aspect-[1600/720] overflow-hidden group cursor-zoom-in bg-transparent flex-shrink-0"
                  onClick={() => setLightboxImg("/images/rogo_project/Diagram 8.png")}
                >
                  <Image 
                    src="/images/rogo_project/Diagram 8.png"
                    alt="Branding Settings Module"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  <button 
                    className="absolute bottom-6 right-6 hover:scale-110 transition-transform cursor-pointer z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImg("/images/rogo_project/Diagram 8.png");
                    }}
                  >
                    <img src="/images/rogo_project/Zoom_dark.svg" alt="Zoom" className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Decision 3 */}
            <div className="flex flex-col bg-primary-1000 rounded-xl p-6 md:py-6 md:px-10 items-start gap-5 self-stretch overflow-x-auto max-w-full">
              <h3 className="font-serif text-lg font-bold text-neutral-100">{t.dec3Title}</h3>
              <div className="flex flex-col gap-6 w-full mt-2 justify-center items-center">
                <div 
                  className="relative w-full aspect-[2320/720] md:h-[360px] md:w-auto md:aspect-[2320/720] overflow-hidden group cursor-zoom-in bg-transparent flex-shrink-0"
                  onClick={() => setLightboxImg("/images/rogo_project/Diagram 9.png")}
                >
                  <Image 
                    src="/images/rogo_project/Diagram 9.png"
                    alt="Permissions Scope"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 1160px"
                  />
                  <button 
                    className="absolute bottom-6 right-6 hover:scale-110 transition-transform cursor-pointer z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImg("/images/rogo_project/Diagram 9.png");
                    }}
                  >
                    <img src="/images/rogo_project/Zoom_dark.svg" alt="Zoom" className="w-6 h-6" />
                  </button>
                </div>
                <div 
                  className="relative w-full aspect-[2320/720] md:h-[360px] md:w-auto md:aspect-[2320/720] overflow-hidden group cursor-zoom-in bg-transparent flex-shrink-0"
                  onClick={() => setLightboxImg("/images/rogo_project/Diagram 10.png")}
                >
                  <Image 
                    src="/images/rogo_project/Diagram 10.png"
                    alt="Permissions Dialogs"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 1160px"
                  />
                  <button 
                    className="absolute bottom-6 right-6 hover:scale-110 transition-transform cursor-pointer z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImg("/images/rogo_project/Diagram 10.png");
                    }}
                  >
                    <img src="/images/rogo_project/Zoom_dark.svg" alt="Zoom" className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 06: KEY SCREENS */}
          <section className="flex flex-col gap-6 w-full">
            {renderSectionTitle("06", t.screensTitle)}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Screen 1 */}
              <div className="flex flex-col p-10 items-start gap-4 self-stretch rounded-xl bg-primary-1000">
                <h4 className="font-serif text-lg font-bold text-secondary-300">{t.screen1Title}</h4>
                <div 
                  className="relative w-full aspect-[426/284] overflow-hidden rounded-[12px] group cursor-zoom-in bg-transparent"
                  onClick={() => setLightboxImg("/images/rogo_project/Video 1.mp4")}
                >
                  <video 
                    src="/images/rogo_project/Video 1.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain rounded-[12px]"
                  />
                  <button 
                    className="absolute bottom-6 right-6 hover:scale-110 transition-transform cursor-pointer z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImg("/images/rogo_project/Video 1.mp4");
                    }}
                  >
                    <img src="/images/rogo_project/Zoom_dark.svg" alt="Zoom" className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Screen 2 */}
              <div className="flex flex-col p-10 items-start gap-4 self-stretch rounded-xl bg-primary-1000">
                <h4 className="font-serif text-lg font-bold text-secondary-300">{t.screen2Title}</h4>
                <div 
                  className="relative w-full aspect-[2320/720] overflow-hidden group cursor-zoom-in bg-transparent"
                  onClick={() => setLightboxImg("/images/rogo_project/Diagram 9.png")}
                >
                  <Image 
                    src="/images/rogo_project/Diagram 9.png"
                    alt={t.screen2Title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  <button 
                    className="absolute bottom-6 right-6 hover:scale-110 transition-transform cursor-pointer z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImg("/images/rogo_project/Diagram 9.png");
                    }}
                  >
                    <img src="/images/rogo_project/Zoom_dark.svg" alt="Zoom" className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Screen 3 */}
              <div className="flex flex-col p-10 items-start gap-4 self-stretch rounded-xl bg-primary-1000">
                <h4 className="font-serif text-lg font-bold text-secondary-300">{t.screen3Title}</h4>
                <div 
                  className="relative w-full aspect-[1600/720] overflow-hidden group cursor-zoom-in bg-transparent"
                  onClick={() => setLightboxImg("/images/rogo_project/Diagram 8.png")}
                >
                  <Image 
                    src="/images/rogo_project/Diagram 8.png"
                    alt={t.screen3Title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  <button 
                    className="absolute bottom-6 right-6 hover:scale-110 transition-transform cursor-pointer z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImg("/images/rogo_project/Diagram 8.png");
                    }}
                  >
                    <img src="/images/rogo_project/Zoom_dark.svg" alt="Zoom" className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Screen 4 */}
              <div className="flex flex-col p-10 items-start gap-4 self-stretch rounded-xl bg-primary-1000">
                <h4 className="font-serif text-lg font-bold text-secondary-300">{t.screen4Title}</h4>
                <div 
                  className="relative w-full aspect-[2320/720] overflow-hidden group cursor-zoom-in bg-transparent"
                  onClick={() => setLightboxImg("/images/rogo_project/Diagram 10.png")}
                >
                  <Image 
                    src="/images/rogo_project/Diagram 10.png"
                    alt={t.screen4Title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  <button 
                    className="absolute bottom-6 right-6 hover:scale-110 transition-transform cursor-pointer z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImg("/images/rogo_project/Diagram 10.png");
                    }}
                  >
                    <img src="/images/rogo_project/Zoom_dark.svg" alt="Zoom" className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 07: DESIGN SYSTEM */}
          <section className="flex flex-col gap-6 w-full">
            {renderSectionTitle("07", t.designSystemTitle)}
            <p style={{ width: "100%", display: "block" }} className="text-[#989898] font-sans text-[14px] font-normal leading-[18px] text-left max-w-2xl">{t.designSystemDesc}</p>

            <div 
              className="relative w-full aspect-[16/10] overflow-hidden group cursor-zoom-in bg-transparent"
              onClick={() => setLightboxImg("/images/rogo_project/Frame 35.png")}
            >
              <Image 
                src="/images/rogo_project/Frame 35.png"
                alt="Design System Style Guide"
                fill
                className="object-contain"
              />
              <button 
                className="absolute bottom-6 right-6 hover:scale-110 transition-transform cursor-pointer z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImg("/images/rogo_project/Frame 35.png");
                }}
              >
                <img src="/images/rogo_project/Zoom_light.svg" alt="Zoom" className="w-6 h-6" />
              </button>
            </div>
          </section>

          {/* SECTION 08: IMPACT */}
          <section className="flex flex-col gap-6 w-full">
            {renderSectionTitle("08", t.impactTitle)}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl border border-neutral-800 bg-[#0c1410]">
              {[
                { title: t.impactCol1Title, desc: t.impactCol1Desc },
                { title: t.impactCol2Title, desc: t.impactCol2Desc },
                { title: t.impactCol3Title, desc: t.impactCol3Desc },
                { title: t.impactCol4Title, desc: t.impactCol4Desc }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2 w-full">
                  <h4 style={{ width: "100%", display: "block" }} className="font-bold text-secondary-300 text-sm tracking-wide">{item.title}</h4>
                  <p style={{ width: "100%", display: "block" }} className="text-[#989898] font-sans text-[14px] font-normal leading-[18px] text-left">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 09: REFLECTION */}
          <section className="flex flex-col gap-6 w-full">
            {renderSectionTitle("09", t.reflectionTitle)}
            
            <div className="w-full p-8 rounded-2xl border border-neutral-800 bg-[#0d1712] flex flex-col items-center text-center gap-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary-400">
                <Image 
                  src="/images/mini_avatar.png"
                  alt="Nguyen Khanh Truong profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div style={{ width: "100%", maxWidth: "768px" }} className="flex flex-col gap-4">
                <p style={{ width: "100%", display: "block" }} className="text-[#989898] font-sans text-[14px] font-normal leading-[18px] text-center">{t.reflectionDesc}</p>
                <p style={{ width: "100%", display: "block" }} className="text-primary-300 font-semibold text-lg leading-relaxed text-center">{t.reflectionHighlight}</p>
                <p style={{ width: "100%", display: "block" }} className="text-[#989898] font-sans text-[14px] font-normal leading-[18px] text-center">{t.reflectionBody}</p>
              </div>
            </div>
          </section>

          {/* SECTION 10: CONTINUE EXPLORING */}
          <section className="flex flex-col md:flex-row justify-between items-stretch gap-8 w-full pt-12 border-t border-neutral-900">
            {/* Title column */}
            <div className="flex flex-col gap-2 md:w-1/4">
              <span className="text-primary-400 font-bold text-xs tracking-wider">{t.exploreTitle}</span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">{t.continueExploring}</h2>
            </div>

            {/* Other 2 projects cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:w-3/4">
              {/* Card 1: RaIO */}
              <Link href="/pending" className="group flex flex-col gap-4 p-4 rounded-2xl border border-neutral-800 bg-[#161617] hover:border-primary-400 hover:shadow-lg hover:shadow-primary-400/5 transition-all duration-300">
                <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-white flex items-center justify-center">
                  <Image 
                    src="/images/raio.png"
                    alt="RaIO Smart"
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-white group-hover:text-secondary-300 text-base transition-colors">RaIO Smart</h3>
                    <ArrowUpRight size={18} className="text-neutral-500 group-hover:text-primary-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {["Mobile", "IoT", "Smart Home", "Whitelabel"].map((cat) => (
                      <span key={cat} className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">{cat}</span>
                    ))}
                  </div>
                  <p style={{ width: "100%", display: "block" }} className="text-[#989898] font-sans text-[14px] font-normal leading-[18px] text-left mt-1">
                    {lang === "vi" 
                      ? "Được triển khai và quản lý thông qua Rogo Platform như mọi ứng dụng khác trong hệ sinh thái..." 
                      : "Deployed and managed through Rogo Platform like every app in the ecosystem..."}
                  </p>
                </div>
              </Link>

              {/* Card 2: Austfly */}
              <Link href="/pending" className="group flex flex-col gap-4 p-4 rounded-2xl border border-neutral-800 bg-[#161617] hover:border-primary-400 hover:shadow-lg hover:shadow-primary-400/5 transition-all duration-300">
                <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-[#1a1b1d] flex items-center justify-center">
                  <Image 
                    src="/images/austfly.png"
                    alt="Austfly IoT App"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-white group-hover:text-secondary-300 text-base transition-colors">Austfly IoT App</h3>
                    <ArrowUpRight size={18} className="text-neutral-500 group-hover:text-primary-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {["Mobile", "IoT", "Smart Home", "Redesign"].map((cat) => (
                      <span key={cat} className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">{cat}</span>
                    ))}
                  </div>
                  <p style={{ width: "100%", display: "block" }} className="text-[#989898] font-sans text-[14px] font-normal leading-[18px] text-left mt-1">
                    {lang === "vi" 
                      ? "Thương hiệu cửa cuốn hàng đầu Việt Nam, đối tác đầu tiên áp dụng framework RaIO ngoài Rạng Đông..." 
                      : "Vietnam's leading roller shutter brand, and the first partner to adopt the RaIO framework..."}
                  </p>
                </div>
              </Link>
            </div>
          </section>

        </main>

        {/* LIGHTBOX OVERLAY */}
        {lightboxImg && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center cursor-zoom-out animate-fadeIn p-4 md:p-12"
            onClick={() => setLightboxImg(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:scale-105 transition-all cursor-pointer"
              onClick={() => setLightboxImg(null)}
            >
              <X size={24} />
            </button>
            <div className="relative w-full h-full max-w-[90%] max-h-[90%] flex items-center justify-center">
              {lightboxImg.endsWith('.mp4') ? (
                <video 
                  src={lightboxImg}
                  controls
                  autoPlay
                  loop
                  muted
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-zoomIn"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <img 
                  src={lightboxImg}
                  alt="Enlarged Diagram View"
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-zoomIn"
                />
              )}
            </div>
          </div>
        )}

        {/* CONTACT MODAL CONTAINER */}
        {contactModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 transition-opacity duration-300 animate-fadeIn">
            <div className="contact-dialog-panel w-full max-w-lg rounded-2xl border border-neutral-800 bg-[#161617] p-8 shadow-2xl relative animate-zoomIn">
              <button 
                onClick={() => setContactModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">{t.contactModalTitle}</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">{t.contactModalDesc}</p>
                </div>
                <form onSubmit={handleSendEmail} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message-box" className="text-primary-300 font-bold text-xs uppercase tracking-wider">{t.contactModalLabel}</label>
                    <textarea 
                      id="message-box"
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder={t.contactModalPlaceholder}
                      className="w-full h-32 px-4 py-3 rounded-lg border border-neutral-800 bg-neutral-950 text-white placeholder-neutral-600 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 text-sm resize-none font-sans"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-3 rounded-lg bg-primary-400 hover:bg-primary-300 text-neutral-1000 font-bold transition-colors cursor-pointer text-sm shadow-md"
                  >
                    {t.contactModalSubmit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
