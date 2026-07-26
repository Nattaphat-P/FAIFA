"use client";

/**
 * หน้าเนื้อหาบทเรียน (Lesson Content) — แสดงเนื้อหา + Lab placeholder + Quiz ท้ายบท
 * URL: /lesson/[lessonId]
 * 
 * Flow:
 * 1. แสดง Breadcrumb 4 ระดับ
 * 2. แสดงเนื้อหาบทเรียน (Text)
 * 3. แสดง Lab (Placeholder)
 * 4. แสดง Quiz ท้ายบท — ตอบถูก = ผ่าน → % เพิ่ม
 */

import { useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import Breadcrumb from "@/components/shared/Breadcrumb";
import DifficultyBadge from "@/components/shared/DifficultyBadge";
import LessonQuiz from "@/components/lesson/LessonQuiz";
import { useProgress } from "@/context/ProgressContext";
import { getLessonById } from "@/lib/mockData";
import type { BreadcrumbItem } from "@/lib/types";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;
  const { completeLesson, getLessonStatus } = useProgress();

  /** ค้นหา Lesson + Unit + Track จาก ID */
  const result = getLessonById(lessonId);

  /** callback เมื่อตอบ Quiz ถูก */
  const handleQuizComplete = useCallback(() => {
    completeLesson(lessonId);
  }, [completeLesson, lessonId]);

  /* ถ้าไม่พบ Lesson → แสดงข้อความ */
  if (!result) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto text-center py-20 animate-fade-in">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            ไม่พบบทย่อย
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            บทย่อยที่คุณค้นหาไม่มีอยู่ในระบบ
          </p>
          <button
            onClick={() => router.push("/main")}
            className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold transition-all"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </MainLayout>
    );
  }

  const { lesson, unit, track } = result;

  /** สถานะของ lesson นี้ */
  const lessonStatus = getLessonStatus(lessonId);
  const isCompleted = lessonStatus === "completed";

  /** Breadcrumb items — 4 ระดับ */
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "หน้าหลัก", href: "/main" },
    { label: track.title, href: `/track/${track.id}` },
    { label: unit.title, href: `/unit/${unit.id}` },
    { label: lesson.title },
  ];

  /** แปลงเนื้อหาเป็นย่อหน้า (แบ่งตาม \n\n) */
  const contentParagraphs = lesson.content.split("\n\n");

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* ===== Breadcrumb ===== */}
        <Breadcrumb items={breadcrumbItems} />

        {/* ===== Header ===== */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              {/* หมายเลขบทย่อย */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  isCompleted
                    ? "bg-accent-green-100 dark:bg-accent-green-500/20 text-accent-green-600 dark:text-accent-green-400"
                    : "bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400"
                }`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{lesson.order}</span>
                )}
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white">
                  {lesson.title}
                </h1>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                  บทที่ {String(unit.order).padStart(2, "0")} — บทย่อยที่ {lesson.order}
                </p>
              </div>
            </div>
            <DifficultyBadge difficulty={lesson.difficulty} size="md" />
          </div>

          {/* สถานะ */}
          {isCompleted && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-green-50 dark:bg-accent-green-500/10 text-accent-green-600 dark:text-accent-green-400 border border-accent-green-200 dark:border-accent-green-500/20 mt-2">
              ✓ เรียนจบแล้ว
            </div>
          )}
        </div>

        {/* ===== เนื้อหาบทเรียน ===== */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-primary-50 dark:bg-primary-500/15 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">
              📖 เนื้อหาบทเรียน
            </h2>
          </div>

          <div className="bg-white dark:bg-dark-200/60 border border-gray-100 dark:border-white/[0.06] rounded-2xl p-5 md:p-6">
            <div className="prose-sm max-w-none">
              {contentParagraphs.map((paragraph, index) => {
                /* ตรวจจับหัวข้อ **text** */
                const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);

                return (
                  <div key={index} className="mb-4 last:mb-0">
                    {parts.map((part, partIndex) => {
                      /* ถ้าเป็น bold text → แสดงเป็น <strong> */
                      if (part.startsWith("**") && part.endsWith("**")) {
                        return (
                          <strong
                            key={partIndex}
                            className="text-gray-900 dark:text-white font-bold"
                          >
                            {part.slice(2, -2)}
                          </strong>
                        );
                      }

                      /* แยกบรรทัดปกติ */
                      const lines = part.split("\n");
                      return lines.map((line, lineIndex) => {
                        /* เช็คว่าเป็น bullet point */
                        if (line.trim().startsWith("- ")) {
                          return (
                            <div
                              key={`${partIndex}-${lineIndex}`}
                              className="flex items-start gap-2 pl-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                            >
                              <span className="text-primary-500 mt-0.5 flex-shrink-0">
                                •
                              </span>
                              <span>{line.trim().substring(2)}</span>
                            </div>
                          );
                        }

                        /* เช็คว่าเป็นรายการมีหมายเลข */
                        const numberedMatch = line.trim().match(/^(\d+)\.\s(.+)/);
                        if (numberedMatch) {
                          return (
                            <div
                              key={`${partIndex}-${lineIndex}`}
                              className="flex items-start gap-2 pl-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                            >
                              <span className="text-primary-600 dark:text-primary-400 font-bold flex-shrink-0 w-5 text-right">
                                {numberedMatch[1]}.
                              </span>
                              <span>{numberedMatch[2]}</span>
                            </div>
                          );
                        }

                        /* ข้อความปกติ */
                        if (line.trim()) {
                          return (
                            <p
                              key={`${partIndex}-${lineIndex}`}
                              className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                            >
                              {line}
                            </p>
                          );
                        }
                        return null;
                      });
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== Lab (Placeholder) ===== */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-accent-gold-100 dark:bg-accent-gold-500/20 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-accent-gold-600 dark:text-accent-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">
              🧪 แล็ปจำลอง
            </h2>
          </div>

          <div className="bg-white dark:bg-dark-200/60 border border-dashed border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 md:p-8 text-center">
            <p className="text-4xl mb-3">🔬</p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              แล็ปจำลองกำลังอยู่ในระหว่างพัฒนา
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              จะสามารถทดลองวงจรไฟฟ้าเสมือนจริงได้ในเวอร์ชันถัดไป
            </p>
          </div>
        </section>

        {/* ===== Quiz ท้ายบท ===== */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-accent-green-100 dark:bg-accent-green-500/20 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-accent-green-600 dark:text-accent-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">
              ✏️ แบบทดสอบท้ายบท
            </h2>
          </div>

          <LessonQuiz
            quiz={lesson.quiz}
            onComplete={handleQuizComplete}
            alreadyCompleted={isCompleted}
          />
        </section>

        {/* ===== ปุ่มนำทาง (ก่อนหน้า / ถัดไป) ===== */}
        <div className="flex items-center justify-between pb-8">
          <button
            onClick={() => router.push(`/unit/${unit.id}`)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            กลับไปรายการบทย่อย
          </button>

          {/* ปุ่มไปบทถัดไป (ถ้ามี) */}
          {(() => {
            const currentIndex = unit.lessons.findIndex(
              (l) => l.id === lessonId
            );
            const nextLesson = unit.lessons[currentIndex + 1];
            if (nextLesson && isCompleted) {
              return (
                <button
                  onClick={() => router.push(`/lesson/${nextLesson.id}`)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-primary-600 hover:bg-primary-500 text-white transition-all active:scale-[0.98]"
                >
                  บทถัดไป: {nextLesson.title}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              );
            }
            return null;
          })()}
        </div>
      </div>
    </MainLayout>
  );
}
