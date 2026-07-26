"use client";

/**
 * LessonQuiz — แบบทดสอบท้ายบทย่อย
 * - แสดงโจทย์ + 4 ตัวเลือก
 * - ตอบถูก → บทย่อยนี้ completed + % เพิ่ม + แสดง celebration
 * - ตอบผิด → ให้ตอบใหม่ได้เรื่อยๆ จนกว่าจะถูก
 * - เมื่อเสร็จแล้วจะแสดงคำอธิบายเฉลย
 */

import { useState, useCallback } from "react";
import type { LessonQuizQuestion } from "@/lib/types";

/** Props สำหรับ LessonQuiz */
interface LessonQuizProps {
  /** ข้อมูล Quiz */
  quiz: LessonQuizQuestion;
  /** callback เมื่อตอบถูก */
  onComplete: () => void;
  /** ตอบถูกแล้วหรือยัง (กรณีกลับมาทบทวน) */
  alreadyCompleted?: boolean;
}

export default function LessonQuiz({
  quiz,
  onComplete,
  alreadyCompleted = false,
}: LessonQuizProps) {
  /** ตัวเลือกที่เลือก */
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  /** สถานะ: idle / wrong / correct */
  const [status, setStatus] = useState<"idle" | "wrong" | "correct">(
    alreadyCompleted ? "correct" : "idle"
  );
  /** จำนวนครั้งที่ตอบผิด */
  const [wrongCount, setWrongCount] = useState(0);

  /** กดเลือกตัวเลือก */
  const handleSelect = useCallback(
    (index: number) => {
      /* ถ้าตอบถูกแล้วไม่ให้เปลี่ยน */
      if (status === "correct") return;
      setSelectedIndex(index);
      /* Reset สถานะ wrong เพื่อให้กดส่งใหม่ได้ */
      if (status === "wrong") setStatus("idle");
    },
    [status]
  );

  /** กดปุ่มส่งคำตอบ */
  const handleSubmit = useCallback(() => {
    if (selectedIndex === null) return;

    if (selectedIndex === quiz.correctIndex) {
      /* ตอบถูก */
      setStatus("correct");
      if (!alreadyCompleted) {
        onComplete();
      }
    } else {
      /* ตอบผิด */
      setStatus("wrong");
      setWrongCount((prev) => prev + 1);
    }
  }, [selectedIndex, quiz.correctIndex, onComplete, alreadyCompleted]);

  /** สีของตัวเลือก */
  const getOptionStyle = (index: number) => {
    const isSelected = selectedIndex === index;
    const isCorrectAnswer = index === quiz.correctIndex;

    /* เมื่อตอบถูกแล้ว → ไฮไลท์คำตอบที่ถูก */
    if (status === "correct") {
      if (isCorrectAnswer) {
        return "border-accent-green-500 bg-accent-green-50 dark:bg-accent-green-500/10 text-accent-green-700 dark:text-accent-green-400 ring-1 ring-accent-green-400/30";
      }
      return "border-gray-200 dark:border-white/[0.06] text-gray-400 dark:text-gray-600";
    }

    /* เมื่อตอบผิด → ไฮไลท์คำตอบที่เลือก (ผิด) เป็นสีแดง */
    if (status === "wrong" && isSelected) {
      return "border-red-400 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 ring-1 ring-red-400/30";
    }

    /* สถานะปกติ */
    if (isSelected) {
      return "border-primary-400 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 ring-1 ring-primary-400/30";
    }

    return "border-gray-200 dark:border-white/[0.06] text-gray-700 dark:text-gray-300 hover:border-primary-300 dark:hover:border-primary-500/30 hover:bg-primary-50/50 dark:hover:bg-primary-500/5";
  };

  return (
    <div className="rounded-2xl border border-gray-100 dark:border-white/[0.06] bg-white dark:bg-dark-200/60 p-5 md:p-6 animate-fade-in">
      {/* ===== Header ===== */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-accent-gold-100 dark:bg-accent-gold-500/20 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-accent-gold-600 dark:text-accent-gold-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            แบบทดสอบท้ายบท
          </h3>
          <p className="text-[10px] text-gray-400 dark:text-gray-500">
            ตอบถูกเพื่อผ่านบทย่อยนี้
          </p>
        </div>
        {/* Badge สถานะ */}
        {status === "correct" && (
          <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent-green-100 dark:bg-accent-green-500/20 text-accent-green-600 dark:text-accent-green-400">
            ✓ ผ่านแล้ว
          </span>
        )}
      </div>

      {/* ===== คำถาม ===== */}
      <div className="mb-5">
        <p className="text-base font-semibold text-gray-900 dark:text-white leading-relaxed">
          {quiz.question}
        </p>
      </div>

      {/* ===== ตัวเลือก ===== */}
      <div className="space-y-2.5 mb-5">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={status === "correct"}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${getOptionStyle(
              index
            )} ${status === "correct" ? "cursor-default" : "cursor-pointer"}`}
          >
            <span className="flex items-center gap-3">
              {/* วงกลมหมายเลข */}
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                  status === "correct" && index === quiz.correctIndex
                    ? "bg-accent-green-500 text-white"
                    : status === "wrong" && selectedIndex === index
                      ? "bg-red-500 text-white"
                      : selectedIndex === index
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400"
                }`}
              >
                {status === "correct" && index === quiz.correctIndex
                  ? "✓"
                  : status === "wrong" && selectedIndex === index
                    ? "✗"
                    : String.fromCharCode(65 + index)}
              </span>
              {option}
            </span>
          </button>
        ))}
      </div>

      {/* ===== ข้อความตอบผิด ===== */}
      {status === "wrong" && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 animate-scale-in">
          <p className="text-xs text-red-600 dark:text-red-400 font-medium">
            ❌ คำตอบไม่ถูกต้อง — ลองเลือกใหม่อีกครั้ง
            {wrongCount > 1 && (
              <span className="text-red-400 dark:text-red-500 ml-1">
                (ตอบผิด {wrongCount} ครั้ง)
              </span>
            )}
          </p>
        </div>
      )}

      {/* ===== คำอธิบายเฉลย (เมื่อตอบถูก) ===== */}
      {status === "correct" && (
        <div className="mb-4 p-4 rounded-xl bg-accent-green-50 dark:bg-accent-green-500/10 border border-accent-green-200 dark:border-accent-green-500/20 animate-fade-in-up">
          <p className="text-xs font-bold text-accent-green-700 dark:text-accent-green-400 mb-1">
            🎉 ยอดเยี่ยม! คำตอบถูกต้อง
          </p>
          <p className="text-xs text-accent-green-600 dark:text-accent-green-300 leading-relaxed">
            {quiz.explanation}
          </p>
        </div>
      )}

      {/* ===== ปุ่มส่งคำตอบ ===== */}
      {status !== "correct" && (
        <button
          onClick={handleSubmit}
          disabled={selectedIndex === null}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
            selectedIndex === null
              ? "bg-gray-200 dark:bg-white/[0.04] text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/20"
          }`}
        >
          ส่งคำตอบ
        </button>
      )}
    </div>
  );
}
