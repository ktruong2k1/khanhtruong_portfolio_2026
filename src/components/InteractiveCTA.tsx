"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion, LayoutGroup } from "framer-motion";

interface InteractiveCTAProps {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: "green" | "black";
  direction?: "forward" | "back";
  className?: string;
}

export default function InteractiveCTA({
  text,
  href,
  onClick,
  variant = "green",
  direction = "forward",
  className = "",
}: InteractiveCTAProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isGreen = variant === "green";
  const pillBg = isGreen ? "bg-[#00DC6C]" : "bg-black";
  const pillText = isGreen ? "text-black" : "text-[#00DC6C]";
  const iconBg = "bg-white";
  const iconText = "text-black";
  const isBack = direction === "back";

  const IconComponent = isBack ? ArrowLeft : ArrowRight;

  const iconElement = (
    <motion.div
      key="icon"
      layoutId={`cta-icon-${text}`}
      transition={{ type: "spring", stiffness: 450, damping: 30 }}
      className={`h-[48px] sm:h-[56px] w-[48px] sm:w-[56px] min-w-[48px] sm:min-w-[56px] rounded-[12px] ${iconBg} ${iconText} flex items-center justify-center shadow-lg`}
    >
      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-black stroke-[2.5]" />
    </motion.div>
  );

  const pillElement = (
    <motion.div
      key="pill"
      layoutId={`cta-pill-${text}`}
      transition={{ type: "spring", stiffness: 450, damping: 30 }}
      className={`h-[48px] sm:h-[56px] min-h-[48px] sm:min-h-[56px] rounded-[12px] ${pillBg} ${pillText} text-[14px] sm:text-[16px] font-sans font-bold px-6 sm:px-8 flex items-center justify-center shadow-lg whitespace-nowrap`}
    >
      {text}
    </motion.div>
  );

  const content = (
    <LayoutGroup>
      <motion.div
        className={`flex items-center gap-3 cursor-pointer w-fit select-none outline-none ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {isBack ? (
          // For Back CTA: Default has Icon on Left, Hover has Icon on Right
          isHovered ? (
            <>
              {pillElement}
              {iconElement}
            </>
          ) : (
            <>
              {iconElement}
              {pillElement}
            </>
          )
        ) : (
          // For Forward CTA: Default has Pill on Left, Hover has Pill on Right
          isHovered ? (
            <>
              {iconElement}
              {pillElement}
            </>
          ) : (
            <>
              {pillElement}
              {iconElement}
            </>
          )
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

