"use client";

/**
 * Auth Callback Page — จัดการ OAuth Redirect
 * เมื่อ Google Login สำเร็จ Supabase จะ redirect มาที่ URL นี้พร้อม tokens ใน URL hash
 * Supabase Client จะจัดการ detect session จาก URL อัตโนมัติ (detectSessionInUrl: true)
 * หน้านี้แค่แสดง Loading แล้ว redirect ไปหน้าหลัก
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    /** ตรวจจับ session จาก URL hash (OAuth tokens) */
    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("❌ Auth Callback Error:", error.message);
          router.replace("/");
          return;
        }

        if (session) {
          /* มี session → ไป dashboard */
          router.replace("/main");
        } else {
          /* ไม่มี session → กลับ landing */
          router.replace("/");
        }
      } catch {
        console.error("❌ Auth Callback Exception");
        router.replace("/");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-dark-300 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-primary-600/30 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-400 font-medium">
          กำลังเข้าสู่ระบบ...
        </p>
        <p className="text-xs text-gray-600 mt-1">
          กรุณารอสักครู่
        </p>
      </div>
    </div>
  );
}
