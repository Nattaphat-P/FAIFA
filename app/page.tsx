"use client";

/**
 * Landing Page — หน้าแรกของ FAIFA (ยังไม่ Login)
 * ประกอบด้วย:
 * 1. Navbar — แถบนำทางด้านบน (backdrop-blur)
 * 2. HeroSection — ส่วน Hero หลัก
 * 3. AboutSection — เกี่ยวกับแพลตฟอร์ม (3 Cards)
 * 4. DeveloperSection — ผู้พัฒนา (3 คน)
 * 5. Footer — ส่วนท้าย
 * 6. SignInModal — Modal เข้าสู่ระบบ
 * 7. SettingsModal — Modal ตั้งค่า (เตรียมไว้)
 */

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import DeveloperSection from "@/components/landing/DeveloperSection";
import Footer from "@/components/landing/Footer";
import SignInModal from "@/components/modals/SignInModal";
import SettingsModal from "@/components/modals/SettingsModal";

export default function LandingPage() {
  const { user } = useAuth();
  const router = useRouter();

  /** Redirect ไป dashboard ถ้า login แล้ว */
  useEffect(() => {
    if (user) {
      router.replace("/main");
    }
  }, [user, router]);
  /* สถานะเปิด/ปิด Modal เข้าสู่ระบบ */
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  /* สถานะเปิด/ปิด Modal ตั้งค่า */
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  /** เปิด Modal เข้าสู่ระบบ */
  const openSignIn = useCallback(() => setIsSignInOpen(true), []);

  /** ปิด Modal เข้าสู่ระบบ */
  const closeSignIn = useCallback(() => setIsSignInOpen(false), []);

  /** เปิด Modal ตั้งค่า */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openSettings = useCallback(() => setIsSettingsOpen(true), []);

  /** ปิด Modal ตั้งค่า */
  const closeSettings = useCallback(() => setIsSettingsOpen(false), []);

  return (
    <div className="min-h-screen bg-dark-300 dark:bg-dark-300 text-white">
      {/* แถบนำทาง — Fixed, Backdrop-blur */}
      <Navbar onSignInClick={openSignIn} />

      {/* เนื้อหาหลัก */}
      <main>
        {/* ส่วน Hero — หัวข้อหลัก + CTA + รูปภาพ */}
        <HeroSection onGetStarted={openSignIn} />

        {/* เส้นแบ่ง subtle */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <hr className="border-white/5" />
        </div>

        {/* ส่วนเกี่ยวกับแพลตฟอร์ม — 3 Feature Cards */}
        <AboutSection />

        {/* เส้นแบ่ง subtle */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <hr className="border-white/5" />
        </div>

        {/* ส่วนผู้พัฒนา — 3 โปรไฟล์ */}
        <DeveloperSection />
      </main>

      {/* ส่วนท้าย */}
      <Footer />

      {/* Modal เข้าสู่ระบบ */}
      <SignInModal isOpen={isSignInOpen} onClose={closeSignIn} />

      {/* Modal ตั้งค่า (เตรียมไว้ — สามารถเปิดได้จากหน้าหลังจาก Login) */}
      <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
    </div>
  );
}
