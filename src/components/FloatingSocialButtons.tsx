"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { FaInstagram, FaWhatsapp, FaFacebookF } from "react-icons/fa";

export default function FloatingSocialButtons() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-50 sm:bottom-8 sm:right-7">
      {/* Social Buttons */}
      <div
        className={`
          absolute bottom-[72px] right-0
          flex flex-col items-center gap-4
          transition-all duration-300 ease-out
          ${
            isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0"
          }
        `}
      >
        {/* Instagram */}
        <a
          href="#"
          aria-label="Instagram"
          className="
            group flex h-14 w-14 items-center justify-center
            rounded-full
            bg-gradient-to-br from-[#FF6B35] via-[#E1306C] to-[#8A2387]
            text-white
            shadow-[0_8px_25px_rgba(225,48,108,0.3)]
            transition-all duration-300
            hover:scale-110
            hover:shadow-[0_10px_35px_rgba(225,48,108,0.45)]
          "
        >
          <FaInstagram
            size={25}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/8801701275099"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="
            group flex h-14 w-14 items-center justify-center
            rounded-full
            bg-[#20D463]
            text-white
            shadow-[0_8px_25px_rgba(32,212,99,0.28)]
            transition-all duration-300
            hover:scale-110
            hover:bg-[#25D366]
            hover:shadow-[0_10px_35px_rgba(32,212,99,0.45)]
          "
        >
          <FaWhatsapp
            size={27}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Facebook */}
        <a
          href="#"
          aria-label="Facebook"
          className="
            group flex h-14 w-14 items-center justify-center
            rounded-full
            bg-[#1877F2]
            text-white
            shadow-[0_8px_25px_rgba(24,119,242,0.3)]
            transition-all duration-300
            hover:scale-110
            hover:shadow-[0_10px_35px_rgba(24,119,242,0.45)]
          "
        >
          <FaFacebookF
            size={24}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </a>
      </div>

      {/* Main Toggle Button */}
      <button
        type="button"
        aria-label={isOpen ? "Close social buttons" : "Open social buttons"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          group relative flex h-14 w-14 items-center justify-center
          rounded-full
          border-2 border-[#EF1B23]
          bg-[#090909]
          text-white
          shadow-[0_0_0_4px_rgba(239,27,35,0.15)]
          transition-all duration-300
          hover:bg-[#EF1B23]
          hover:shadow-[0_0_25px_rgba(239,27,35,0.4)]
          active:scale-95
        "
      >
        <span
          className={`
            flex items-center justify-center
            transition-transform duration-300 ease-out
            ${isOpen ? "rotate-90" : "rotate-0"}
          `}
        >
          {isOpen ? (
            <X size={27} strokeWidth={2} />
          ) : (
            <MessageCircle size={27} strokeWidth={2} />
          )}
        </span>
      </button>
    </div>
  );
}
