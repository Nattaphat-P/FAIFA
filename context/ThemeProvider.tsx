"use client";

/**
 * ThemeProvider — คอมโพเนนต์ห่อหุ้มสำหรับระบบ Light/Dark Mode
 * ใช้ next-themes เก็บค่า theme ลง LocalStorage
 * รองรับการสลับระหว่างธีม cream (สว่าง) และ dark (มืด)
 */

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

/** Props สำหรับ ThemeProvider */
interface ThemeProviderProps {
  children: ReactNode;
}

/** Provider สำหรับจัดการธีมแอปพลิเคชัน */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="faifa-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
