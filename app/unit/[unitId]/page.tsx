"use client";

/**
 * หน้าบทย่อย (Unit Detail) — แสดง Lessons (บทย่อย) ในบทเรียนที่เลือก
 * โครงสร้าง UI เหมือนหน้าหลักสูตร แต่เจาะลึกระดับ Lesson
 * URL: /unit/[unitId]
 */

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ProgressBar from "@/components/shared/ProgressBar";
import LessonCard from "@/components/track/LessonCard";
import InfoPanel from "@/components/track/InfoPanel";
import { useProgress } from "@/context/ProgressContext";
import { getUnitById } from "@/lib/mockData";
import type { Lesson, BreadcrumbItem } from "@/lib/types";

export default function UnitPage() {
  const params = useParams();
  const router = useRouter();
  const unitId = params.unitId as string;
  const { getLessonStatus, getUnitProgress } = useProgress();

  /** ค้นหา Unit + Track จาก ID */
  const result = getUnitById(unitId);

  /** Lesson ที่กำลัง hover/click อยู่ (สำหรับ Info Panel) */
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  /** เลือก Lesson เพื่อแสดง Info Panel */
  const handleSelectLesson = useCallback((lesson: Lesson) => {
    setSelectedLesson(lesson);
  }, []);

  /** กดปุ่มเข้าเรียน Lesson → ไปหน้า lesson/[lessonId] */
  const handleLessonAction = useCallback(
    (lessonId: string) => {
      router.push(`/lesson/${lessonId}`);
    },
    [router]
  );

  /* ถ้าไม่พบ Unit → แสดงข้อความ */
  if (!result) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto text-center py-20 animate-fade-in">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            ไม่พบบทเรียน
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            บทเรียนที่คุณค้นหาไม่มีอยู่ในระบบ
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

  const { unit, track } = result;

  /** % ความคืบหน้าของ Unit */
  const unitProgress = getUnitProgress(unitId);

  /** Breadcrumb items */
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "หน้าหลัก", href: "/main" },
    { label: track.title, href: `/track/${track.id}` },
    { label: unit.title },
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto animate-fade-in">
        {/* ===== Breadcrumb ===== */}
        <Breadcrumb items={breadcrumbItems} />

        {/* ===== Header + Progress โดยรวม ===== */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-500/15 flex items-center justify-center text-sm font-bold text-primary-600 dark:text-primary-400">
              {String(unit.order).padStart(2, "0")}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white">
                {unit.title}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {unit.description}
              </p>
            </div>
          </div>

          {/* แถบ Progress โดยรวมของ Unit */}
          <ProgressBar
            value={unitProgress}
            color={track.color}
            size="md"
            showLabel={true}
            label={`ความคืบหน้า — บทที่ ${String(unit.order).padStart(2, "0")}`}
            className="max-w-xl"
          />
        </div>

        {/* ===== 2 คอลัมน์: Lesson Cards (ซ้าย) + Info Panel (ขวา) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* ===== ซ้าย: รายการบทย่อย (Lesson Cards) ===== */}
          <div className="lg:col-span-2 space-y-3">
            {unit.lessons.map((lesson) => {
              const lessonStatus = getLessonStatus(lesson.id);

              return (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  status={lessonStatus}
                  onSelect={() => handleSelectLesson(lesson)}
                  onAction={() => handleLessonAction(lesson.id)}
                  isSelected={selectedLesson?.id === lesson.id}
                />
              );
            })}
          </div>

          {/* ===== ขวา: Info Panel (ปรากฏเมื่อ hover/click) ===== */}
          <div className="hidden lg:block">
            {selectedLesson ? (
              <InfoPanel type="lesson" data={selectedLesson} />
            ) : (
              /* Placeholder เมื่อยังไม่ได้เลือก */
              <div className="bg-white dark:bg-dark-200/60 border border-gray-100 dark:border-white/[0.06] rounded-2xl p-5 sticky top-24">
                <div className="text-center py-8">
                  <p className="text-3xl mb-3">👆</p>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    เลื่อนเมาส์ไปที่บทย่อย
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    เพื่อดูข้อมูลเพิ่มเติม
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ===== Mobile: Info Panel แสดงด้านล่าง ===== */}
          {selectedLesson && (
            <div className="lg:hidden">
              <InfoPanel type="lesson" data={selectedLesson} />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
