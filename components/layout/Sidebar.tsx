"use client";

/**
 * Sidebar — แถบนำทางด้านซ้าย (หลังจาก Login)
 * ออกแบบตาม Figma reference:
 * - บนสุด: Logo ⚡ FAIFA + ปุ่มย่อ/ขยาย (<)
 * - เมนู: หน้าหลัก, เส้นทางการเรียน (ไม่ได้ใส่ตาม prompt เพราะ prompt บอกไม่ต้องมี), คำถามรายวัน, โปรไฟล์
 * - ล่างสุด: การตั้งค่า, สนับสนุน, ออกจากระบบ
 * - Responsive: Mobile ซ่อนเป็น Hamburger overlay
 * - ส่ง collapsed state ผ่าน callback ไปที่ MainLayout
 */

import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

/** Props สำหรับ Sidebar */
interface SidebarProps {
  /** เปิด SettingsModal */
  onOpenSettings: () => void;
  /** สถานะ collapsed ปัจจุบัน */
  collapsed: boolean;
  /** toggle collapsed */
  onToggleCollapse: () => void;
  /** สถานะ mobile open */
  mobileOpen: boolean;
  /** toggle mobile */
  onToggleMobile: () => void;
}

/** รายการเมนูหลัก */
const MAIN_MENU = [
  { href: "/main", label: "หน้าหลัก", icon: "home" },
  { href: "/daily-quiz", label: "คำถามรายวัน", icon: "quiz" },
  { href: "/profile", label: "โปรไฟล์", icon: "profile" },
];

/** ไอคอน SVG สำหรับเมนู */
function MenuIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  switch (name) {
    case "home":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case "quiz":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "profile":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case "settings":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "support":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case "logout":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      );
    case "collapse":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      );
    case "expand":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      );
    case "hamburger":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar({ onOpenSettings, collapsed, onToggleCollapse, mobileOpen, onToggleMobile }: SidebarProps) {
  const pathname = usePathname();
  const { signOut } = useAuth();

  /** ปิด mobile menu เมื่อเปลี่ยนหน้า */
  useEffect(() => {
    if (mobileOpen) onToggleMobile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /** ปิด mobile menu เมื่อ resize ไป desktop */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) onToggleMobile();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen, onToggleMobile]);

  /** จัดการออกจากระบบ */
  const handleSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  /** เนื้อหา Sidebar (ใช้ร่วมทั้ง Desktop/Mobile) */
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* ===== ส่วนบนสุด: Logo + ปุ่ม Collapse ===== */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-white/[0.06]">
        <Link href="/main" className="flex items-center gap-2.5 min-w-0">
          <span className="text-xl flex-shrink-0">⚡</span>
          {!collapsed && (
            <span className="text-lg font-extrabold tracking-wide text-gray-900 dark:text-white whitespace-nowrap">
              FAIFA
            </span>
          )}
        </Link>
        {/* ปุ่มย่อ/ขยาย (Desktop เท่านั้น) */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all"
          aria-label={collapsed ? "ขยาย Sidebar" : "ย่อ Sidebar"}
        >
          <MenuIcon name={collapsed ? "expand" : "collapse"} className="w-4 h-4" />
        </button>
      </div>

      {/* ===== เมนูหลัก ===== */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {MAIN_MENU.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? "bg-primary-600/20 text-primary-600 dark:text-primary-400 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.15)]"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.06]"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <span className={`flex-shrink-0 transition-colors ${isActive ? "text-primary-600 dark:text-primary-400" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"}`}>
                <MenuIcon name={item.icon} />
              </span>
              {!collapsed && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ===== เมนูล่างสุด ===== */}
      <div className="px-3 py-4 border-t border-gray-200 dark:border-white/[0.06] space-y-1">
        {/* การตั้งค่า */}
        <button
          onClick={onOpenSettings}
          title={collapsed ? "การตั้งค่า" : undefined}
          className={`w-full group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all duration-200 ${collapsed ? "justify-center" : ""}`}
        >
          <MenuIcon name="settings" className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
          {!collapsed && <span className="whitespace-nowrap">การตั้งค่า</span>}
        </button>

        {/* สนับสนุน */}
        <button
          title={collapsed ? "สนับสนุน" : undefined}
          className={`w-full group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all duration-200 ${collapsed ? "justify-center" : ""}`}
        >
          <MenuIcon name="support" className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
          {!collapsed && <span className="whitespace-nowrap">สนับสนุน</span>}
        </button>

        {/* ออกจากระบบ */}
        <button
          onClick={handleSignOut}
          title={collapsed ? "ออกจากระบบ" : undefined}
          className={`w-full group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.08] transition-all duration-200 ${collapsed ? "justify-center" : ""}`}
        >
          <MenuIcon name="logout" className="w-5 h-5 transition-colors" />
          {!collapsed && <span className="whitespace-nowrap">ออกจากระบบ</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ===== Mobile Hamburger Button ===== */}
      <button
        onClick={onToggleMobile}
        className="fixed top-4 left-4 z-[60] md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 dark:bg-dark-200/90 backdrop-blur-md border border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all shadow-lg"
        aria-label="เปิดเมนู"
      >
        <MenuIcon name="hamburger" className="w-5 h-5" />
      </button>

      {/* ===== Mobile Overlay ===== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={onToggleMobile}
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`
          fixed top-0 left-0 z-[80] h-screen
          bg-cream/95 dark:bg-dark-400/95 backdrop-blur-xl border-r border-gray-200 dark:border-white/[0.06]
          transition-all duration-300 ease-in-out
          md:translate-x-0
          ${collapsed ? "md:w-[72px]" : "md:w-[240px]"}
          ${mobileOpen ? "translate-x-0 w-[260px]" : "-translate-x-full w-[260px] md:translate-x-0"}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
