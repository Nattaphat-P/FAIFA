"use client";

/**
 * Breadcrumb — แถบนำทางแสดงตำแหน่งปัจจุบันในโครงสร้างหน้า
 * ใช้ใน: หน้าหลักสูตร, หน้าบทย่อย, หน้าเนื้อหา
 * รายการสุดท้ายจะเป็นหน้าปัจจุบัน (ไม่มีลิงก์)
 */

import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/types";

/** Props สำหรับ Breadcrumb */
interface BreadcrumbProps {
  /** รายการ Breadcrumb */
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 animate-fade-in">
      <ol className="flex items-center flex-wrap gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {/* ลูกศร separator (ไม่แสดงตัวแรก) */}
              {index > 0 && (
                <svg
                  className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}

              {/* ถ้ามี href และไม่ใช่รายการสุดท้าย → ลิงก์ */}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                /* รายการสุดท้าย → ข้อความธรรมดา */
                <span
                  className={`font-semibold ${
                    isLast
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
