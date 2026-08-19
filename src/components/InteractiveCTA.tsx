"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, LayoutGroup } from "framer-motion";

interface InteractiveCTAProps {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: "green" | "black";
  className?: string;
}

export default function InteractiveCTA({
  text,
  href,
  onClick,
  variant = "green",
  className = "",
}: InteractiveCTAProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isGreen = variant === "green";
  const pillBg = isGreen ? "bg-[#00DC6C]" : "bg-black";
  const pillText = isGreen ? "text-black" : "text-[#00DC6C]";
  const iconBg = "bg-white";
  const iconText = "text-black";

  const content = (
    <LayoutGroup>
      <motion.div
        className={`flex items-center gap-3 cursor-pointer w-fit select-none outline-none ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {isHovered ? (
          <>
            {/* Hover state: Icon square first, then Text pill */}
            <motion.div
              layoutId={`cta-icon-${text}`}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className={`h-[56px] w-[56px] min-w-[56px] rounded-[12px] ${iconBg} ${iconText} flex items-center justify-center shadow-lg`}
            >
              <ArrowRight className="w-6 h-6 text-black stroke-[2.5]" />
            </motion.div>

            <motion.div
              layoutId={`cta-pill-${text}`}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className={`h-[56px] min-h-[56px] rounded-[12px] ${pillBg} ${pillText} text-[16px] font-sans font-bold px-8 flex items-center justify-center shadow-lg whitespace-nowrap`}
            >
              {text}
            </motion.div>
          </>
        ) : (
          <>
            {/* Default state: Text pill first, then Icon square */}
            <motion.div
              layoutId={`cta-pill-${text}`}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className={`h-[56px] min-h-[56px] rounded-[12px] ${pillBg} ${pillText} text-[16px] font-sans font-bold px-8 flex items-center justify-center shadow-lg whitespace-nowrap`}
            >
              {text}
            </motion.div>

            <motion.div
              layoutId={`cta-icon-${text}`}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className={`h-[56px] w-[56px] min-w-[56px] rounded-[12px] ${iconBg} ${iconText} flex items-center justify-center shadow-lg`}
            >
              <ArrowRight className="w-6 h-6 text-black stroke-[2.5]" />
            </motion.div>
          </>
        )}
      </motion.div>
    </LayoutGroup>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
