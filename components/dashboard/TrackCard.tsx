"use client";

/**
 * TrackCard — Card แสดงหลักสูตร (ตาม Figma)
 * ออกแบบตาม reference: พื้นหลังขาว, Icon กลมๆ, ชื่อ,
 * ระดับความยาก แบบ segment bar, คำอธิบาย, progress bar, ปุ่ม 3 สถานะ
 */

import type { Track, TrackStatus } from "@/lib/types";

/** Props สำหรับ TrackCard */
interface TrackCardProps {
  track: Track;
  status: TrackStatus;
  onAction?: (trackId: string) => void;
}

/** ข้อมูลปุ่มตามสถานะ */
const STATUS_CONFIG: Record<TrackStatus, { label: string; className: string }> = {
  not_started: {
    label: "เริ่มเรียน",
    className: "bg-gray-400 hover:bg-gray-500 text-white",
  },
  in_progress: {
    label: "กลับเข้าสู่บทเรียน",
    className: "bg-primary-600 hover:bg-primary-500 text-white",
  },
  completed: {
    label: "เรียนจบแล้ว",
    className: "bg-accent-green-600 hover:bg-accent-green-500 text-white",
  },
};

/** ระดับความยากข้อมูล */
function getDifficultyInfo(trackId: string): { label: string; level: number } {
  switch (trackId) {
    case "electronics":
      return { label: "ง่าย", level: 2 };
    case "home-electrical":
      return { label: "ง่าย", level: 2 };
    case "power-systems":
      return { label: "ยาก", level: 4 };
    default:
      return { label: "ปานกลาง", level: 3 };
  }
}

export default function TrackCard({ track, status, onAction }: TrackCardProps) {
  const config = STATUS_CONFIG[status];
  const difficulty = getDifficultyInfo(track.id);

  return (
    <div className="bg-white dark:bg-dark-200/60 border border-gray-100 dark:border-white/[0.06] rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.05] dark:hover:shadow-black/20 hover:-translate-y-0.5">
      {/* ===== Header: Icon + Title ===== */}
      <div className="flex items-center gap-3 mb-3">
        {/* Track Icon — วงกลมพื้นสี */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ backgroundColor: `${track.color}15` }}
        >
          {track.icon}
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          {track.title}
        </h3>
      </div>

      {/* ===== ระดับความยาก (Segment bar ตาม Figma) ===== */}
      <div className="mb-3">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">
          ระดับความยาก: {difficulty.label}
        </p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((seg) => (
            <div
              key={seg}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                seg <= difficulty.level
                  ? "bg-primary-600"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ===== Description ===== */}
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
        {track.description}
      </p>

      {/* ===== Progress Bar ===== */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">ความคืบหน้า</span>
          <span className="text-xs font-bold" style={{ color: track.color }}>
            {track.progress}%
          </span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${track.progress}%`,
              background: `linear-gradient(90deg, ${track.color}, ${track.color}CC)`,
            }}
          />
        </div>
      </div>

      {/* ===== Action Button ===== */}
      <button
        onClick={() => onAction?.(track.id)}
        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${config.className}`}
      >
        {config.label}
      </button>
    </div>
  );
}
