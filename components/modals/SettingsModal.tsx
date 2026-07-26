"use client";

/**
 * SettingsModal — Modal ตั้งค่า
 * - หัวข้อ "การตั้งค่า" + ปุ่ม X ปิด
 * - Toggle สลับธีม สว่าง/มืด (ใช้ next-themes)
 * - ข้อความ "FAIFA" ด้านล่าง
 * - พื้นหลังเบลอ กด backdrop ปิดได้
 */

import { useEffect, useCallback } from "react";
import { useTheme } from "next-themes";

/** Props สำหรับ SettingsModal */
interface SettingsModalProps {
  /** สถานะเปิด/ปิด Modal */
  isOpen: boolean;
  /** ฟังก์ชันปิด Modal */
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { theme, setTheme } = useTheme();

  /** ปิด Modal เมื่อกด Escape */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  /** สลับธีมระหว่าง light / dark */
  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  /* ไม่แสดงถ้า Modal ปิดอยู่ */
  if (!isOpen) return null;

  /** ตรวจสอบว่าเป็น dark mode หรือไม่ */
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* พื้นหลังเบลอ — กดเพื่อปิด */}
      <div
        className="absolute inset-0 modal-backdrop animate-fade-in"
        onClick={onClose}
      />

      {/* กล่อง Modal */}
      <div className="relative w-full max-w-sm mx-4 bg-white dark:bg-white rounded-2xl shadow-2xl animate-scale-in p-6">
        {/* หัวข้อ + ปุ่มปิด */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            การตั้งค่า
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-all"
            aria-label="ปิด"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ตัวเลือก Toggle ธีม */}
        <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50">
          {/* ไอคอนและข้อความ */}
          <div className="flex items-center gap-3">
            <span className="text-xl">🎨</span>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                ธีมแอปพลิเคชัน
              </p>
              <p className="text-xs text-gray-500">
                สว่าง / มืด
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 ${
              isDark ? "bg-primary-600" : "bg-gray-300"
            }`}
            role="switch"
            aria-checked={isDark}
            aria-label="สลับธีม"
          >
            {/* ปุ่ม Thumb ของ Toggle */}
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                isDark ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* ข้อความ FAIFA ด้านล่าง */}
        <p className="text-center text-xs text-gray-300 mt-6 tracking-widest">
          FAIFA
        </p>
      </div>
    </div>
  );
}
