"use client";

/**
 * LessonCard — กล่องแสดงบทย่อย (Lesson) ในหน้า Unit
 * โครงสร้างคล้าย UnitCard แต่ระดับข้อมูลเป็นบทย่อย
 * 3 สถานะ: completed / in_progress / locked
 */

import type { Lesson } from "@/lib/types";
import type { LessonStatus } from "@/lib/types";
import DifficultyBadge from "@/components/shared/DifficultyBadge";

/** Props สำหรับ LessonCard */
interface LessonCardProps {
  /** ข้อมูล Lesson */
  lesson: Lesson;
  /** สถานะ: locked / in_progress / completed */
  status: LessonStatus;
  /** callback เมื่อคลิก/hover */
  onSelect?: () => void;
  /** callback เมื่อกดปุ่ม */
  onAction?: () => void;
  /** กำลังถูกเลือกอยู่หรือไม่ */
  isSelected?: boolean;
}

export default function LessonCard({
  lesson,
  status,
  onSelect,
  onAction,
  isSelected = false,
}: LessonCardProps) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  return (
    <div
      onClick={!isLocked ? onSelect : undefined}
      onMouseEnter={!isLocked ? onSelect : undefined}
      className={`
        relative rounded-2xl border p-4 transition-all duration-300
        ${isLocked
          ? "bg-gray-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/[0.04] opacity-60 cursor-not-allowed"
          : isSelected
            ? "bg-white dark:bg-dark-100/80 border-primary-400/40 dark:border-primary-500/30 shadow-lg shadow-primary-500/[0.08] ring-1 ring-primary-400/20"
            : "bg-white dark:bg-dark-200/60 border-gray-100 dark:border-white/[0.06] hover:shadow-md hover:shadow-black/[0.05] cursor-pointer"
        }
      `}
    >
      <div className="flex items-center justify-between gap-3">
        {/* ===== ซ้าย: ไอคอน + ข้อมูล ===== */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* หมายเลขบทย่อย / สถานะไอคอน */}
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              isCompleted
                ? "bg-accent-green-100 dark:bg-accent-green-500/20 text-accent-green-600 dark:text-accent-green-400"
                : isLocked
                  ? "bg-gray-100 dark:bg-white/[0.04] text-gray-400 dark:text-gray-600"
                  : "bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400"
            }`}
          >
            {isCompleted ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : isLocked ? (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            ) : (
              <span>{lesson.order}</span>
            )}
          </div>

          {/* ชื่อบทย่อย + คำอธิบาย */}
          <div className="min-w-0">
            <h4
              className={`text-sm font-bold truncate ${
                isLocked
                  ? "text-gray-400 dark:text-gray-600"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {lesson.title}
            </h4>
            <p className={`text-[11px] mt-0.5 truncate ${
              isLocked
                ? "text-gray-300 dark:text-gray-700"
                : "text-gray-400 dark:text-gray-500"
            }`}>
              {lesson.content.substring(0, 60)}...
            </p>
          </div>
        </div>

        {/* ===== ขวา: Badge + ปุ่ม ===== */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {!isLocked && (
            <DifficultyBadge difficulty={lesson.difficulty} size="sm" />
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isLocked) onAction?.();
            }}
            disabled={isLocked}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap active:scale-[0.97] ${
              isCompleted
                ? "bg-accent-green-600 hover:bg-accent-green-500 text-white"
                : isLocked
                  ? "bg-gray-200 dark:bg-white/[0.04] text-gray-400 dark:text-gray-600 cursor-not-allowed"
                  : "bg-primary-600 hover:bg-primary-500 text-white"
            }`}
          >
            {isCompleted ? "ทบทวน" : isLocked ? "🔒" : "เข้าเรียน"}
          </button>
        </div>
      </div>
    </div>
  );
}
