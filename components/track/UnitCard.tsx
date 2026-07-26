"use client";

/**
 * UnitCard — กล่องแสดงบทเรียนหลัก (Unit) ในหน้าหลักสูตร
 * 3 สถานะ:
 * 1. completed — ปุ่ม "ทบทวน" สีเขียว ✅
 * 2. in_progress — ปุ่ม "เริ่มเรียน" สีน้ำเงิน + progress bar 📖
 * 3. locked — กล่องเทา ปุ่มล็อก 🔒
 */

import type { Unit } from "@/lib/types";
import type { LessonStatus } from "@/lib/types";
import ProgressBar from "@/components/shared/ProgressBar";
import DifficultyBadge from "@/components/shared/DifficultyBadge";

/** Props สำหรับ UnitCard */
interface UnitCardProps {
  /** ข้อมูล Unit */
  unit: Unit;
  /** สถานะ: locked / in_progress / completed */
  status: LessonStatus;
  /** % ความคืบหน้า */
  progress: number;
  /** callback เมื่อคลิก/hover */
  onSelect?: () => void;
  /** callback เมื่อกดปุ่ม */
  onAction?: () => void;
  /** กำลังถูกเลือกอยู่หรือไม่ (สำหรับ highlight) */
  isSelected?: boolean;
}

export default function UnitCard({
  unit,
  status,
  progress,
  onSelect,
  onAction,
  isSelected = false,
}: UnitCardProps) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  return (
    <div
      onClick={!isLocked ? onSelect : undefined}
      onMouseEnter={!isLocked ? onSelect : undefined}
      className={`
        relative rounded-2xl border p-4 md:p-5 transition-all duration-300
        ${isLocked
          ? "bg-gray-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/[0.04] opacity-60 cursor-not-allowed"
          : isSelected
            ? "bg-white dark:bg-dark-100/80 border-primary-400/40 dark:border-primary-500/30 shadow-lg shadow-primary-500/[0.08] dark:shadow-primary-500/[0.05] ring-1 ring-primary-400/20"
            : "bg-white dark:bg-dark-200/60 border-gray-100 dark:border-white/[0.06] hover:shadow-md hover:shadow-black/[0.05] dark:hover:shadow-black/20 cursor-pointer"
        }
      `}
    >
      {/* ===== Header: บทที่ + สถานะ + ความยาก ===== */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* หมายเลขบท */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
              isCompleted
                ? "bg-accent-green-100 dark:bg-accent-green-500/20 text-accent-green-600 dark:text-accent-green-400"
                : isLocked
                  ? "bg-gray-100 dark:bg-white/[0.04] text-gray-400 dark:text-gray-600"
                  : "bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400"
            }`}
          >
            {isCompleted ? (
              /* ไอคอน ✓ เมื่อเสร็จ */
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : isLocked ? (
              /* ไอคอนกุญแจ เมื่อล็อก */
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            ) : (
              <span>{String(unit.order).padStart(2, "0")}</span>
            )}
          </div>

          {/* ชื่อบท */}
          <div className="min-w-0">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-0.5">
              บทที่ {String(unit.order).padStart(2, "0")}
            </p>
            <h3
              className={`text-sm font-bold truncate ${
                isLocked
                  ? "text-gray-400 dark:text-gray-600"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {unit.title}
            </h3>
          </div>
        </div>

        {/* Badge ความยาก */}
        {!isLocked && (
          <DifficultyBadge difficulty={unit.difficulty} size="sm" />
        )}
      </div>

      {/* ===== ข้อมูลเพิ่มเติม: เวลา + จำนวนบทย่อย ===== */}
      <div className="flex items-center gap-3 mb-2 text-[11px] text-gray-400 dark:text-gray-500">
        {/* เวลา */}
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {unit.duration} นาที
        </span>
        {/* จำนวนบทย่อย */}
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {unit.lessonsCount} บทย่อย
        </span>
      </div>

      {/* ===== คำอธิบาย ===== */}
      <p
        className={`text-xs leading-relaxed mb-4 line-clamp-2 ${
          isLocked
            ? "text-gray-300 dark:text-gray-700"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        {unit.description}
      </p>

      {/* ===== Progress Bar (เฉพาะ in_progress) ===== */}
      {status === "in_progress" && (
        <ProgressBar
          value={progress}
          color="#3B82F6"
          size="sm"
          showLabel={true}
          className="mb-4"
        />
      )}

      {/* ===== ปุ่ม Action ===== */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!isLocked) onAction?.();
        }}
        disabled={isLocked}
        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
          isCompleted
            ? "bg-accent-green-600 hover:bg-accent-green-500 text-white"
            : isLocked
              ? "bg-gray-200 dark:bg-white/[0.04] text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "bg-primary-600 hover:bg-primary-500 text-white"
        }`}
      >
        {isCompleted ? "ทบทวน" : isLocked ? "🔒 ล็อกอยู่" : "เริ่มเรียน"}
      </button>
    </div>
  );
}
