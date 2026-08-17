import type { Metadata } from "next";
import { Be_Vietnam_Pro, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nguyễn Khánh Trường — UX/UI Product Designer",
  description: "Portfolio của Nguyễn Khánh Trường, UX/UI Product Designer với 3.5 năm kinh nghiệm làm việc end-to-end cho IoT, B2B SaaS và Management Dashboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${ibmPlexMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full transition-colors duration-300 bg-[#121212] text-white selection:bg-[#00DC6C] selection:text-black">
        {children}
      </body>
    </html>
  );
}
