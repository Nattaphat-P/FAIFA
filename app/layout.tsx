import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { ProgressProvider } from "@/context/ProgressContext";
import "./globals.css";

/**
 * Root Layout — Layout หลักของแอป FAIFA
 * - โหลดฟอนต์ Sarabun จาก Google Fonts
 * - ห่อหุ้มด้วย ThemeProvider (Light/Dark), AuthProvider และ ProgressProvider
 * - ตั้งค่า SEO metadata ภาษาไทย
 */

/* โหลดฟอนต์ Sarabun (รองรับภาษาไทย + ละติน) */
const sarabun = Sarabun({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sarabun",
  display: "swap",
});

/* SEO Metadata */
export const metadata: Metadata = {
  title: "FAIFA — แพลตฟอร์มเรียนรู้วิศวกรรมไฟฟ้า",
  description:
    "แพลตฟอร์มการเรียนรู้วิชาไฟฟ้า ไฟฟ้าภายในบ้าน และอิเล็กทรอนิกส์ สำหรับผู้ที่สนใจทางด้านวิศวกรรมไฟฟ้า พร้อมเนื้อหาเชิงลึก แล็ปจำลอง และแบบทดสอบ",
  keywords: ["FAIFA", "ไฟฟ้า", "อิเล็กทรอนิกส์", "วิศวกรรมไฟฟ้า", "เรียนรู้", "แล็ปจำลอง"],
  authors: [{ name: "Faifa Engineer Team" }],
};

/** คอมโพเนนต์ Root Layout */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${sarabun.variable} font-sarabun antialiased custom-scrollbar`}>
        {/* ห่อหุ้มด้วย ThemeProvider สำหรับ Light/Dark Mode */}
        <ThemeProvider>
          {/* ห่อหุ้มด้วย AuthProvider สำหรับจัดการผู้ใช้ */}
          <AuthProvider>
            {/* ห่อหุ้มด้วย ProgressProvider สำหรับจัดการความคืบหน้าการเรียน */}
            <ProgressProvider>{children}</ProgressProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
