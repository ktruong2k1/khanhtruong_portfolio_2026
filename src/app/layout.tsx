import type { Metadata } from "next";
import { Be_Vietnam_Pro, Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://khanhtruong-portfolio-2026.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nguyễn Khánh Trường — UX/UI Product Designer",
  description:
    "Portfolio của Nguyễn Khánh Trường, UX/UI Product Designer với 3.5 năm kinh nghiệm làm việc end-to-end cho IoT, B2B SaaS và Management Dashboards.",
  keywords: [
    "Nguyễn Khánh Trường",
    "Khanhtruong Nguyen",
    "Product Designer",
    "UX/UI Designer",
    "Portfolio",
    "IoT Platform",
    "B2B SaaS",
  ],
  authors: [{ name: "Nguyễn Khánh Trường" }],
  creator: "Nguyễn Khánh Trường",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    title: "Nguyễn Khánh Trường — UX/UI Product Designer",
    description:
      "Portfolio của Nguyễn Khánh Trường, UX/UI Product Designer với 3.5 năm kinh nghiệm làm việc end-to-end cho IoT, B2B SaaS và Management Dashboards.",
    siteName: "Nguyễn Khánh Trường Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nguyễn Khánh Trường — UX/UI Product Designer",
      },
      {
        url: "/images/og-image-square.png",
        width: 600,
        height: 600,
        alt: "Nguyễn Khánh Trường — UX/UI Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyễn Khánh Trường — UX/UI Product Designer",
    description:
      "Portfolio của Nguyễn Khánh Trường, UX/UI Product Designer với 3.5 năm kinh nghiệm làm việc end-to-end cho IoT, B2B SaaS và Management Dashboards.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${bricolageGrotesque.variable} ${ibmPlexMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full transition-colors duration-300 bg-[#121212] text-white selection:bg-[#00DC6C] selection:text-black">
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
