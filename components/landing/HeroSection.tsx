"use client";

/**
 * HeroSection — ส่วน Hero ด้านบนสุดของหน้า Landing Page
 * - ซ้าย: หัวข้อหลัก + คำอธิบาย + ปุ่ม "เริ่มต้นใช้งาน"
 * - ขวา: รูปภาพ circuit board
 * - Responsive: จัดเรียงแนวตั้งบน mobile
 */

import Image from "next/image";

/** Props สำหรับ HeroSection */
interface HeroSectionProps {
  /** ฟังก์ชันเปิด Modal เข้าสู่ระบบ */
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* พื้นหลัง gradient เพิ่มมิติ */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-400/50 via-dark-300 to-dark-200/30 dark:from-dark-400/50 dark:via-dark-300 dark:to-dark-200/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* คอลัมน์ซ้าย — ข้อความ */}
          <div className="space-y-6 animate-fade-in-up">
            {/* หัวข้อหลัก */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              <span className="text-white">เริ่มต้นเส้นทางการเรียนรู้ด้าน</span>
              <br />
              <span className="text-gradient-blue inline-block pt-2 pb-1">ไฟฟ้าของคุณ</span>
            </h1>

            {/* คำอธิบาย */}
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl">
              เว็บไซต์นี้เป็นแพลตฟอร์มการเรียนรู้ชั้นสูงสำหรับผู้ที่สนใจทางด้านวิศวกรรมไฟฟ้า
              เว็บไซต์นี้จะช่วยให้คุณเข้าใจเนื้อหาผ่าน แล็ปจำลอง เนื้อหาจากผู้เชี่ยวชาญ
              และแบบทดสอบสุดโหด
            </p>

            {/* ปุ่ม CTA */}
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-primary-600 hover:bg-primary-500 rounded-full transition-all duration-300 glow-blue hover:scale-105 active:scale-95"
            >
              เริ่มต้นใช้งาน
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* คอลัมน์ขวา — รูปภาพ */}
          <div className="relative animate-fade-in lg:animate-slide-in-right">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {/* เงาเรืองแสงรอบรูป */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-accent-gold-500/20 rounded-2xl blur-xl" />
              <Image
                src="/img/hero-circuit.png"
                alt="วงจรอิเล็กทรอนิกส์ — แพลตฟอร์มเรียนรู้วิศวกรรมไฟฟ้า"
                fill
                className="object-cover rounded-2xl relative z-10"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
