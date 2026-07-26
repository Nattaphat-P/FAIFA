"use client";

/**
 * ProgressContext — จัดการความคืบหน้าการเรียนทั้งหมด
 * - เก็บ state ว่า lesson ไหน completed บ้าง (localStorage)
 * - คำนวณ % ของ Unit จากจำนวน Lesson ที่เสร็จ
 * - คำนวณ % ของ Track จากค่าเฉลี่ย % ของ Unit
 * - จัดการ Lock/Unlock: บทแรกของ Track = in_progress เมื่อเข้า, ถัดไป unlock เมื่อบทก่อนหน้า completed
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { TRACKS } from "@/lib/mockData";
import type { LessonStatus, TrackStatus } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import { getUserProgress, saveLessonProgress } from "@/lib/supabase";

/* ===== Key สำหรับเก็บใน localStorage ===== */
const STORAGE_KEY = "faifa-progress";

/* ===== โครงสร้าง Context ===== */
interface ProgressContextType {
  /** Set ของ lessonId ที่ completed แล้ว */
  completedLessons: Set<string>;
  /** Set ของ trackId ที่เคยกดเข้าแล้ว (เพื่อ unlock บทแรก) */
  activatedTracks: Set<string>;
  /** บันทึกว่า lesson นี้ completed (ผ่าน Quiz) */
  completeLesson: (lessonId: string) => void;
  /** บันทึกว่า track นี้ถูกกดเข้าแล้ว (unlock บทแรก) */
  activateTrack: (trackId: string) => void;
  /** ดึงสถานะของ lesson */
  getLessonStatus: (lessonId: string) => LessonStatus;
  /** ดึงสถานะของ unit */
  getUnitStatus: (unitId: string) => LessonStatus;
  /** ดึง % ความคืบหน้าของ unit (0-100) */
  getUnitProgress: (unitId: string) => number;
  /** ดึง % ความคืบหน้าของ track (0-100) */
  getTrackProgress: (trackId: string) => number;
  /** ดึงสถานะของ track */
  getTrackStatus: (trackId: string) => TrackStatus;
}

/** สร้าง Context */
const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

/** Props สำหรับ ProgressProvider */
interface ProgressProviderProps {
  children: ReactNode;
}

/* ===== ข้อมูลที่เก็บลง localStorage ===== */
interface PersistedProgress {
  completedLessons: string[];
  activatedTracks: string[];
}

/** อ่านข้อมูลจาก localStorage */
function loadFromStorage(): PersistedProgress {
  if (typeof window === "undefined") {
    return { completedLessons: [], activatedTracks: [] };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw) as PersistedProgress;
      return data;
    }
  } catch {
    // ถ้า parse ไม่ได้ ก็ใช้ค่าเริ่มต้น
  }
  return { completedLessons: [], activatedTracks: [] };
}

/** บันทึกข้อมูลลง localStorage */
function saveToStorage(data: PersistedProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage เต็มหรือไม่รองรับ
  }
}

/** Provider สำหรับจัดการ Progress */
export function ProgressProvider({ children }: ProgressProviderProps) {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );
  const [activatedTracks, setActivatedTracks] = useState<Set<string>>(
    new Set()
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useAuth();

  /* โหลดข้อมูลจาก localStorage และ Database เมื่อ mount หรือ user เปลี่ยน */
  useEffect(() => {
    async function loadProgress() {
      // 1. โหลดจาก Local Storage ก่อนเสมอ
      const localData = loadFromStorage();
      let mergedLessons = new Set(localData.completedLessons);
      let mergedTracks = new Set(localData.activatedTracks);

      // 2. ถ้าเข้าสู่ระบบแล้ว ดึงข้อมูลจาก Database มาทับ
      if (user) {
        try {
          const dbProgress = await getUserProgress(user.id);
          // เอาของ DB มารวมกับ Local
          dbProgress.forEach(id => mergedLessons.add(id));
        } catch (error) {
          console.error("โหลด Progress จาก DB ล้มเหลว:", error);
        }
      }

      setCompletedLessons(mergedLessons);
      setActivatedTracks(mergedTracks);
      setIsLoaded(true);
    }
    
    loadProgress();
  }, [user]);

  /* บันทึกลง localStorage เมื่อข้อมูลเปลี่ยน (ใช้เป็น Fallback) */
  useEffect(() => {
    if (!isLoaded) return;
    saveToStorage({
      completedLessons: Array.from(completedLessons),
      activatedTracks: Array.from(activatedTracks),
    });
  }, [completedLessons, activatedTracks, isLoaded]);

  /** บันทึกว่า lesson นี้ completed */
  const completeLesson = useCallback((lessonId: string) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      next.add(lessonId);
      return next;
    });

    // บันทึกลง Database ถ้า Login อยู่ (แบบ Background)
    if (user) {
      saveLessonProgress(user.id, lessonId).catch((err) => 
        console.error("บันทึก Progress ลง DB ล้มเหลว:", err)
      );
    }
  }, [user]);

  /** บันทึกว่า track นี้ถูก activate (เพื่อ unlock บทแรก) */
  const activateTrack = useCallback((trackId: string) => {
    setActivatedTracks((prev) => {
      const next = new Set(prev);
      next.add(trackId);
      return next;
    });
  }, []);

  /** คำนวณ % ของ unit — จำนวน lesson completed / จำนวน lesson ทั้งหมด × 100 */
  const getUnitProgress = useCallback(
    (unitId: string): number => {
      for (const track of TRACKS) {
        const unit = track.units.find((u) => u.id === unitId);
        if (unit) {
          const total = unit.lessons.length;
          if (total === 0) return 0;
          const done = unit.lessons.filter((l) =>
            completedLessons.has(l.id)
          ).length;
          return Math.round((done / total) * 100);
        }
      }
      return 0;
    },
    [completedLessons]
  );

  /** คำนวณ % ของ track — ค่าเฉลี่ยของ % ทุก unit */
  const getTrackProgress = useCallback(
    (trackId: string): number => {
      const track = TRACKS.find((t) => t.id === trackId);
      if (!track || track.units.length === 0) return 0;

      // นับ lesson ที่เสร็จทั้งหมดใน track / จำนวน lesson ทั้งหมด
      let totalLessons = 0;
      let completedCount = 0;
      for (const unit of track.units) {
        totalLessons += unit.lessons.length;
        completedCount += unit.lessons.filter((l) =>
          completedLessons.has(l.id)
        ).length;
      }
      if (totalLessons === 0) return 0;
      return Math.round((completedCount / totalLessons) * 100);
    },
    [completedLessons]
  );

  /** ดึงสถานะของ lesson — locked / in_progress / completed */
  const getLessonStatus = useCallback(
    (lessonId: string): LessonStatus => {
      /* ถ้า completed แล้ว → completed */
      if (completedLessons.has(lessonId)) return "completed";

      /* หา lesson นี้อยู่ unit ไหน track ไหน */
      for (const track of TRACKS) {
        for (const unit of track.units) {
          const lessonIndex = unit.lessons.findIndex(
            (l) => l.id === lessonId
          );
          if (lessonIndex === -1) continue;

          /* ต้อง activate track ก่อน */
          if (!activatedTracks.has(track.id)) return "locked";

          /* ต้อง unlock unit ก่อน — ตรวจสอบ unit ก่อนหน้า */
          const unitIndex = track.units.findIndex(
            (u) => u.id === unit.id
          );
          if (unitIndex > 0) {
            const prevUnit = track.units[unitIndex - 1];
            const prevUnitDone = prevUnit.lessons.every((l) =>
              completedLessons.has(l.id)
            );
            if (!prevUnitDone) return "locked";
          }

          /* Lesson แรกของ unit ที่ unlock แล้ว → in_progress */
          if (lessonIndex === 0) return "in_progress";

          /* Lesson ถัดไป: ต้อง lesson ก่อนหน้า completed */
          const prevLesson = unit.lessons[lessonIndex - 1];
          if (completedLessons.has(prevLesson.id)) return "in_progress";

          return "locked";
        }
      }
      return "locked";
    },
    [completedLessons, activatedTracks]
  );

  /** ดึงสถานะของ unit — locked / in_progress / completed */
  const getUnitStatus = useCallback(
    (unitId: string): LessonStatus => {
      for (const track of TRACKS) {
        const unitIndex = track.units.findIndex((u) => u.id === unitId);
        if (unitIndex === -1) continue;
        const unit = track.units[unitIndex];

        /* ต้อง activate track ก่อน */
        if (!activatedTracks.has(track.id)) return "locked";

        /* ถ้าทุก lesson completed → unit completed */
        const allDone = unit.lessons.every((l) =>
          completedLessons.has(l.id)
        );
        if (allDone) return "completed";

        /* ถ้ามี lesson ที่เสร็จบ้าง → in_progress */
        const anyDone = unit.lessons.some((l) =>
          completedLessons.has(l.id)
        );

        /* Unit แรก → in_progress ทันทีที่ activate track */
        if (unitIndex === 0) return anyDone ? "in_progress" : "in_progress";

        /* Unit ถัดไป: ต้อง unit ก่อนหน้า completed */
        const prevUnit = track.units[unitIndex - 1];
        const prevAllDone = prevUnit.lessons.every((l) =>
          completedLessons.has(l.id)
        );
        if (prevAllDone) return "in_progress";

        return "locked";
      }
      return "locked";
    },
    [completedLessons, activatedTracks]
  );

  /** ดึงสถานะของ track */
  const getTrackStatus = useCallback(
    (trackId: string): TrackStatus => {
      const progress = getTrackProgress(trackId);
      if (progress >= 100) return "completed";
      if (activatedTracks.has(trackId)) return "in_progress";
      return "not_started";
    },
    [getTrackProgress, activatedTracks]
  );

  return (
    <ProgressContext.Provider
      value={{
        completedLessons,
        activatedTracks,
        completeLesson,
        activateTrack,
        getLessonStatus,
        getUnitStatus,
        getUnitProgress,
        getTrackProgress,
        getTrackStatus,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

/** Hook สำหรับเข้าถึง Progress Context */
export function useProgress(): ProgressContextType {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress ต้องใช้ภายใน ProgressProvider เท่านั้น");
  }
  return context;
}
