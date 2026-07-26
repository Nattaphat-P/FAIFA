"use client";

/**
 * DifficultyBadge — Badge แสดงระดับความยาก 5 ระดับ
 * 1=ง่ายมากๆ (เขียว), 2=ง่าย (น้ำเงิน), 3=ปานกลาง (ส้ม), 4=ยาก (แดง), 5=ปีศาจ (ม่วง)
 * ใช้ใน: Info Panel, UnitCard, LessonCard
 */

import { DIFFICULTY_LABELS, DIFFICULTY_COLORS, type Difficulty } from "@/lib/types";

/** Props สำหรับ DifficultyBadge */
interface DifficultyBadgeProps {
  /** ระดับความยาก (1-5) */
  difficulty: Difficulty;
  /** ขนาด */
  size?: "sm" | "md";
}

export default function DifficultyBadge({
  difficulty,
  size = "sm",
}: DifficultyBadgeProps) {
  const label = DIFFICULTY_LABELS[difficulty];
  const color = DIFFICULTY_COLORS[difficulty];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold border transition-colors ${
        size === "sm"
          ? "px-2 py-0.5 text-[10px]"
          : "px-2.5 py-1 text-xs"
      }`}
      style={{
        color,
        borderColor: `${color}40`,
        backgroundColor: `${color}15`,
      }}
    >
      {/* จุดสี */}
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}
