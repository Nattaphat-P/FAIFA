"use client";

/**
 * Dashboard Page — หน้าหลักหลังจาก Login
 * อัปเดต Prompt C: ใช้ ProgressContext แทน local state
 * - Header: "เลือกเส้นทางการเรียนรู้" + คำอธิบาย
 * - Track Cards (Grid) พร้อม 3 สถานะปุ่ม (ดึง progress จริงจาก Context)
 * - ระยะเวลาการใช้งาน (Bar Chart) — เริ่มว่าง
 * - ทักษะของผู้ใช้งาน (Radar Chart) — คำนวณจาก progress จริง
 */

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/context/ProgressContext";
import MainLayout from "@/components/layout/MainLayout";
import TrackCard from "@/components/dashboard/TrackCard";
import UsageChart from "@/components/dashboard/UsageChart";
import SkillRadar from "@/components/dashboard/SkillRadar";
import { TRACKS } from "@/lib/mockData";
import type { Track, UsageStat, SkillData } from "@/lib/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { getTrackProgress, getTrackStatus, activateTrack } = useProgress();

  /** สถิติเวลาใช้งาน — เริ่มว่าง */
  const [weeklyData] = useState<UsageStat[]>([]);
  const [monthlyData] = useState<UsageStat[]>([]);

  /** Skill data — คำนวณจาก track progress จริง (จาก ProgressContext) */
  const skillData: SkillData[] = TRACKS.map((t) => ({
    subject: t.title,
    value: getTrackProgress(t.id),
  }));

  /** จัดการเมื่อกดปุ่ม Track — activate + navigate ไปหน้า track */
  const handleTrackAction = useCallback(
    (trackId: string) => {
      /* Activate track เพื่อ unlock บทแรก */
      activateTrack(trackId);
      /* นำทางไปหน้า track */
      router.push(`/track/${trackId}`);
    },
    [router, activateTrack]
  );

  /** Tracks พร้อม progress ปัจจุบัน (จาก ProgressContext) */
  const tracksWithProgress: Track[] = TRACKS.map((t) => ({
    ...t,
    progress: getTrackProgress(t.id),
  }));

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto animate-fade-in">
        {/* ===== Header ต้อนรับ (ตาม Figma: "เลือกเส้นทางการเรียนรู้") ===== */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold">
            เลือกเส้นทางการเรียนรู้
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-2xl leading-relaxed">
            กำหนดเส้นทางการเรียนรู้เฉพาะของคุณ แต่ละเส้นทางที่คุณได้เลือกก็จะมีเนื้อหาที่แตกต่างกันออกไป
            ขอให้คุณสนุกไปกับการเรียน
          </p>
        </div>

        {/* ===== Track Cards Grid ===== */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {tracksWithProgress.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                status={getTrackStatus(track.id)}
                onAction={handleTrackAction}
              />
            ))}
          </div>
        </section>

        {/* ===== Charts Row (ระยะเวลาการใช้งาน + ทักษะของผู้ใช้งาน) ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* ระยะเวลาการใช้งาน — ใหญ่กว่า 3/5 */}
          <div className="lg:col-span-3">
            <UsageChart weeklyData={weeklyData} monthlyData={monthlyData} />
          </div>

          {/* ทักษะของผู้ใช้งาน — เล็กกว่า 2/5 */}
          <div className="lg:col-span-2">
            <SkillRadar data={skillData} />
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
