"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Copy, Check, Mail } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "vi" | "en";
}

export default function ContactModal({ isOpen, onClose, lang }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const email = "ktruong2k1@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      "Liên hệ công việc - Portfolio Khanhtruong Nguyen"
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#181818] border border-white/10 rounded-[12px] p-8 shadow-2xl z-10 text-white"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#00DC6C]/10 text-[#00DC6C] rounded-[12px] border border-[#00DC6C]/20">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-h5 font-bold">
                  {lang === "vi" ? "Kết nối với tôi" : "Get in touch"}
                </h3>
                <p className="text-b3 text-white/60">
                  {lang === "vi" ? "Gửi email trực tiếp tới" : "Send direct email to"}{" "}
                  <span className="font-mono text-[#00DC6C]">{email}</span>
                </p>
              </div>
            </div>

            {/* Quick Email Copy Row */}
            <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded-[12px] p-3 mb-6">
              <span className="text-b2 font-mono text-white/80 px-2">{email}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-[12px] text-b3 font-mono text-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#00DC6C]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Message Form */}
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-b3 font-mono text-white/70 mb-2">
                  {lang === "vi" ? "Nội dung tin nhắn" : "Your Message"}
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    lang === "vi"
                      ? "Chào Trường, tôi muốn trao đổi về dự án..."
                      : "Hi Khanhtruong, I'd like to discuss a project..."
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-[12px] p-4 text-b2 text-white placeholder-white/40 focus:outline-none focus:border-[#00DC6C] transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="cta-btn h-[56px] min-h-[56px] rounded-[12px] w-full bg-[#00DC6C] hover:bg-[#00c560] text-black text-b1 font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>{lang === "vi" ? "Tạo thư nháp & Gửi" : "Send Email"}</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
