"use client";

/**
 * InfoPanel — Panel ด้านขวาแสดงรายละเอียดบทที่เลือก (Hover/Click)
 * แสดง: ชื่อบท, ระดับความยาก, จำนวน Lab, จำนวน Quiz, คำอธิบาย
 * ใช้ใน: หน้าหลักสูตร (Track) และหน้าบทย่อย (Unit)
 */

import type { Unit, Lesson, Difficulty } from "@/lib/types";
import DifficultyBadge from "@/components/shared/DifficultyBadge";

/** Props แบบ Unit */
interface InfoPanelUnitProps {
  type: "unit";
  data: Unit;
}

/** Props แบบ Lesson */
interface InfoPanelLessonProps {
  type: "lesson";
  data: Lesson;
}

type InfoPanelProps = InfoPanelUnitProps | InfoPanelLessonProps;

export default function InfoPanel(props: InfoPanelProps) {
  const isUnit = props.type === "unit";
  const data = props.data;

  return (
    <div className="bg-white dark:bg-dark-200/60 border border-gray-100 dark:border-white/[0.06] rounded-2xl p-5 animate-fade-in sticky top-24 transition-all duration-300">
      {/* ===== Header ===== */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-500/15 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-primary-600 dark:text-primary-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          ข้อมูลเพิ่มเติม
        </h3>
      </div>

      {/* ===== ชื่อบท ===== */}
      <h4 className="text-base font-extrabold text-gray-900 dark:text-white mb-3 leading-snug">
        {data.title}
      </h4>

      {/* ===== ระดับความยาก ===== */}
      <div className="mb-4">
        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-1.5">
          ระดับความยาก
        </p>
        <DifficultyBadge difficulty={data.difficulty as Difficulty} size="md" />
      </div>

      {/* ===== รายละเอียด (สำหรับ Unit) ===== */}
      {isUnit && (
        <>
          {/* จำนวน Lab */}
          <div className="flex items-center justify-between py-2.5 border-t border-gray-100 dark:border-white/[0.06]">
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Lab (แล็ปจำลอง)
            </span>
            <span className="text-xs font-bold text-gray-900 dark:text-white">
              {(data as Unit).labCount} แล็ป
            </span>
          </div>

          {/* จำนวน Quiz */}
          <div className="flex items-center justify-between py-2.5 border-t border-gray-100 dark:border-white/[0.06]">
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              แบบทดสอบ
            </span>
            <span className="text-xs font-bold text-gray-900 dark:text-white">
              {(data as Unit).quizCount} ข้อ
            </span>
          </div>

          {/* จำนวนบทย่อย */}
          <div className="flex items-center justify-between py-2.5 border-t border-gray-100 dark:border-white/[0.06]">
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              บทย่อย
            </span>
            <span className="text-xs font-bold text-gray-900 dark:text-white">
              {(data as Unit).lessonsCount} บท
            </span>
          </div>

          {/* เวลา */}
          <div className="flex items-center justify-between py-2.5 border-t border-gray-100 dark:border-white/[0.06]">
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ระยะเวลาโดยประมาณ
            </span>
            <span className="text-xs font-bold text-gray-900 dark:text-white">
              {(data as Unit).duration} นาที
            </span>
          </div>
        </>
      )}

      {/* ===== คำอธิบาย ===== */}
      {isUnit && (data as Unit).description && (
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/[0.06]">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-1.5">
            คำอธิบาย
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            {(data as Unit).description}
          </p>
        </div>
      )}
    </div>
  );
}
