"use client";

/**
 * Navbar — แถบนำทางด้านบนสำหรับหน้า Landing Page
 * - Fixed อยู่ด้านบน พร้อม backdrop-blur (Glassmorphism)
 * - ซ้าย: โลโก้ ⚡ FAIFA
 * - กลาง: ลิงก์ เกี่ยวกับ, ผู้พัฒนา, ติดต่อ (Smooth scroll)
 * - ขวา: ปุ่ม "เข้าสู่ระบบ"
 * - Mobile: เมนู hamburger แบบ slide-down
 */

import { useState, useCallback } from "react";

/** Props สำหรับ Navbar */
interface NavbarProps {
  /** ฟังก์ชันเปิด Modal เข้าสู่ระบบ */
  onSignInClick: () => void;
}

/** รายการเมนูนำทาง */
const NAV_LINKS = [
  { label: "เกี่ยวกับ", href: "#about" },
  { label: "ผู้พัฒนา", href: "#developers" },
  { label: "ช่องทางการติดต่อ", href: "#footer" },
];

export default function Navbar({ onSignInClick }: NavbarProps) {
  /* สถานะเปิด/ปิดเมนู mobile */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /** สลับเปิด/ปิดเมนู mobile */
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  /** ปิดเมนู mobile เมื่อกดลิงก์ */
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass dark:glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* โลโก้ FAIFA */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold text-white tracking-wide group-hover:text-primary-400 transition-colors">
              FAIFA
            </span>
          </a>

          {/* เมนูนำทาง (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary-400 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ปุ่มเข้าสู่ระบบ (Desktop) */}
          <div className="hidden md:block">
            <button
              onClick={onSignInClick}
              className="px-5 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-500 rounded-xl transition-all duration-200 glow-blue"
            >
              เข้าสู่ระบบ
            </button>
          </div>

          {/* ปุ่ม Hamburger (Mobile) */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-xl transition-colors"
            aria-label="เปิดเมนู"
          >
            {isMobileMenuOpen ? (
              /* ไอคอน X ปิดเมนู */
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* ไอคอน Hamburger เปิดเมนู */
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* เมนู Mobile (Slide-down) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 space-y-2 border-t border-white/10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="block px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              {link.label}
            </a>
          ))}
          {/* ปุ่มเข้าสู่ระบบ (Mobile) */}
          <button
            onClick={() => {
              closeMobileMenu();
              onSignInClick();
            }}
            className="w-full mt-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-500 rounded-xl transition-all"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </nav>
  );
}
