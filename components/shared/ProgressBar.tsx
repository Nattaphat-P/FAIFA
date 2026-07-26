"use client";

/**
 * ProgressBar — แถบแสดงความคืบหน้าแบบ Reusable
 * ใช้ทุกหน้า: Dashboard, Track, Unit, Lesson
 * รองรับ: สี custom, ขนาดต่างๆ, แสดง/ซ่อน label
 */

/** Props สำหรับ ProgressBar */
interface ProgressBarProps {
  /** ค่า % (0-100) */
  value: number;
  /** สีของ progress bar (hex color) */
  color?: string;
  /** ขนาดความสูง */
  size?: "sm" | "md" | "lg";
  /** แสดง label % หรือไม่ */
  showLabel?: boolean;
  /** ข้อความ label ซ้าย (เช่น "ความคืบหน้า") */
  label?: string;
  /** className เพิ่มเติม */
  className?: string;
}

/** ความสูงตามขนาด */
const SIZE_MAP = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

export default function ProgressBar({
  value,
  color = "#3B82F6",
  size = "md",
  showLabel = true,
  label = "ความคืบหน้า",
  className = "",
}: ProgressBarProps) {
  /* จำกัดค่า 0-100 */
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={className}>
      {/* Label + เปอร์เซ็นต์ */}
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {label}
          </span>
          <span className="text-xs font-bold" style={{ color }}>
            {clampedValue}%
          </span>
        </div>
      )}

      {/* แถบ Progress */}
      <div
        className={`${SIZE_MAP[size]} bg-gray-100 dark:bg-white/[0.06] rounded-full overflow-hidden`}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${clampedValue}%`,
            background: `linear-gradient(90deg, ${color}, ${color}CC)`,
          }}
        />
      </div>
    </div>
  );
}
