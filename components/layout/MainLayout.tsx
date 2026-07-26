"use client";

/**
 * MainLayout — Layout หลักสำหรับหน้าหลังจาก Login
 * - รวม Sidebar + Content area
 * - จัดการ spacing ตาม sidebar collapsed/expanded (แก้ไขให้ content ขยายตาม)
 * - รวม SettingsModal
 * - Redirect ไป Landing ถ้ายังไม่ Login
 */

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "./Sidebar";
import SettingsModal from "@/components/modals/SettingsModal";

/** Props สำหรับ MainLayout */
interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  /** สถานะเปิด/ปิด SettingsModal */
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  /** สถานะ Sidebar ย่อ/ขยาย — ยกขึ้นมาเก็บที่ MainLayout เพื่อให้ content ขยายตาม */
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  /** สถานะ Mobile Sidebar เปิด/ปิด */
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  /** เปิด SettingsModal */
  const openSettings = useCallback(() => setIsSettingsOpen(true), []);

  /** ปิด SettingsModal */
  const closeSettings = useCallback(() => setIsSettingsOpen(false), []);

  /** สลับ sidebar collapsed */
  const toggleCollapse = useCallback(() => setSidebarCollapsed((p) => !p), []);

  /** สลับ mobile sidebar */
  const toggleMobile = useCallback(() => setMobileSidebarOpen((p) => !p), []);

  /** Redirect ไป landing ถ้ายังไม่ login */
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  /* แสดง loading ขณะตรวจสอบ auth */
  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-dark-300 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-primary-400/30 border-t-primary-400 rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-300 text-dark-300 dark:text-white transition-colors duration-300">
      {/* Sidebar — รับ collapsed/mobile state จาก MainLayout */}
      <Sidebar
        onOpenSettings={openSettings}
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleCollapse}
        mobileOpen={mobileSidebarOpen}
        onToggleMobile={toggleMobile}
      />

      {/* Content Area — margin-left ปรับตาม sidebar collapsed state */}
      <main
        className={`min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "md:ml-[72px]" : "md:ml-[240px]"
        }`}
      >
        <div className="p-4 pt-16 md:p-6 md:pt-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* SettingsModal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
    </div>
  );
}
