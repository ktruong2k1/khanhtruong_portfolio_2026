"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

export interface TargetProjectInfo {
  id: number;
  titleVi: string;
  titleEn: string;
  layerLabelVi: string;
  layerLabelEn: string;
  tags: string[];
  thumbnail: string;
  href: string;
}

interface SwitchProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProject: TargetProjectInfo | null;
  lang?: "vi" | "en";
}

export const LAYER_PROJECTS: Record<number, TargetProjectInfo> = {
  0: {
    id: 0,
    titleVi: "Rogo IoT Platform v2",
    titleEn: "Rogo IoT Platform v2",
    layerLabelVi: "Tầng Nền tảng (Platform layer)",
    layerLabelEn: "Platform layer",
    tags: ["FEATURED", "PAAS • B2B", "WHITELABEL", "DESKTOP"],
    thumbnail: "/images/Rogo_dashboard_thumb.png",
    href: "/works/rogo-platform-v2",
  },
  1: {
    id: 1,
    titleVi: "RaIO Smart Framework",
    titleEn: "RaIO Smart Framework",
    layerLabelVi: "Tầng Framework (Framework layer)",
    layerLabelEn: "Framework layer",
    tags: ["FEATURED", "MOBILE", "WHITELABEL", "IOT"],
    thumbnail: "/images/RaIO_smart_thumb.png",
    href: "/works/raio-smart",
  },
  2: {
    id: 2,
    titleVi: "Austfly Smart Door",
    titleEn: "Austfly Smart Door",
    layerLabelVi: "Tầng Phiên bản (Instance layer)",
    layerLabelEn: "Instance layer",
    tags: ["FEATURED", "INSTANCE", "MOBILE", "IOT", "WHITELABELED"],
    thumbnail: "/images/austfly.png",
    href: "/works/austfly",
  },
};

export default function SwitchProjectModal({
  isOpen,
  onClose,
  targetProject,
  lang = "vi",
}: SwitchProjectModalProps) {
  const router = useRouter();

  if (!targetProject) return null;

  const title = lang === "vi" ? targetProject.titleVi : targetProject.titleEn;
  const layerLabel =
    lang === "vi" ? targetProject.layerLabelVi : targetProject.layerLabelEn;

  const handleConfirm = () => {
    onClose();
    router.push(targetProject.href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-[540px] bg-[#181818] border border-white/15 rounded-[16px] shadow-2xl p-5 sm:p-7 z-10 overflow-hidden space-y-5"
          >
            {/* Header with Title & Close Button */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] sm:text-b3 font-mono font-bold text-[#00DC6C] uppercase tracking-wider">
                  {layerLabel}
                </span>
                <h3 className="text-[20px] sm:text-[24px] font-heading font-bold text-white leading-tight">
                  {lang === "vi"
                    ? "Bạn có muốn chuyển sang dự án này không?"
                    : "Switch to this project?"}
                </h3>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0 outline-none"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Project Card Preview */}
            <div className="w-full bg-[#121212] border border-white/10 rounded-[12px] p-3.5 sm:p-4 flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-center">
              {/* Thumbnail (4:3 ratio) */}
              <div className="w-full sm:w-[170px] aspect-[4/3] rounded-[8px] overflow-hidden relative shrink-0 border border-white/10 bg-[#202020]">
                <Image
                  src={targetProject.thumbnail}
                  alt={title}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Project Meta */}
              <div className="w-full flex-1 space-y-2 text-left">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {targetProject.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-[10px] sm:text-[11px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                        tag === "FEATURED"
                          ? "text-[#00DC6C] bg-[#00DC6C]/10 border border-[#00DC6C]/40"
                          : "text-white/70 bg-white/5 border border-white/10"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-[17px] sm:text-[19px] font-heading font-bold text-white leading-snug">
                  {title}
                </div>

                <p className="text-[12px] font-mono text-white/50 line-clamp-1">
                  {targetProject.href}
                </p>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 sm:px-5 py-2.5 rounded-full text-b3 sm:text-b2 font-mono text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
              >
                {lang === "vi" ? "Hủy" : "Cancel"}
              </button>

              <button
                onClick={handleConfirm}
                className="px-5 sm:px-6 py-2.5 rounded-full text-b3 sm:text-b2 font-mono font-bold text-black bg-[#00DC6C] hover:bg-[#00DC6C]/90 shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{lang === "vi" ? "Chuyển sang xem" : "Confirm & View"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
