"use client";

/**
 * หน้าหลักสูตร (Track Detail) — แสดงบทเรียน (Units) ในหลักสูตรที่เลือก
 * Layout: Breadcrumb → Progress โดยรวม → 2 คอลัมน์ (ซ้าย: UnitCards / ขวา: InfoPanel)
 * URL: /track/[trackId]
 */

import { useState, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ProgressBar from "@/components/shared/ProgressBar";
import UnitCard from "@/components/track/UnitCard";
import InfoPanel from "@/components/track/InfoPanel";
import { useProgress } from "@/context/ProgressContext";
import { getTrackById } from "@/lib/mockData";
import type { Unit, BreadcrumbItem } from "@/lib/types";

export default function TrackPage() {
  const params = useParams();
  const router = useRouter();
  const trackId = params.trackId as string;
  const {
    activateTrack,
    getUnitStatus,
    getUnitProgress,
    getTrackProgress,
  } = useProgress();

  /** ค้นหา Track จาก ID */
  const track = getTrackById(trackId);

  /** Unit ที่กำลัง hover/click อยู่ (สำหรับ Info Panel) */
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  /** Activate track เมื่อเข้าหน้านี้ (unlock บทแรก) */
  useEffect(() => {
    if (track) {
      activateTrack(track.id);
    }
  }, [track, activateTrack]);

  /** เลือก Unit เพื่อแสดง Info Panel */
  const handleSelectUnit = useCallback((unit: Unit) => {
    setSelectedUnit(unit);
  }, []);

  /** กดปุ่มเข้าเรียน Unit → ไปหน้า unit/[unitId] */
  const handleUnitAction = useCallback(
    (unitId: string) => {
      router.push(`/unit/${unitId}`);
    },
    [router]
  );

  /* ถ้าไม่พบ Track → แสดงข้อความ */
  if (!track) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto text-center py-20 animate-fade-in">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            ไม่พบหลักสูตร
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            หลักสูตรที่คุณค้นหาไม่มีอยู่ในระบบ
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

  /** % ความคืบหน้ารวมของ Track */
  const trackProgress = getTrackProgress(trackId);

  /** Breadcrumb items */
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "หน้าหลัก", href: "/main" },
    { label: track.title },
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto animate-fade-in">
        {/* ===== Breadcrumb ===== */}
        <Breadcrumb items={breadcrumbItems} />

        {/* ===== Header + Progress โดยรวม ===== */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{track.icon}</span>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white">
                {track.title}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {track.description}
              </p>
            </div>
          </div>

          {/* แถบ Progress โดยรวม */}
          <ProgressBar
            value={trackProgress}
            color={track.color}
            size="md"
            showLabel={true}
            label="ความคืบหน้าโดยรวม"
            className="max-w-xl"
          />
        </div>

        {/* ===== 2 คอลัมน์: Unit Cards (ซ้าย) + Info Panel (ขวา) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* ===== ซ้าย: รายการบทเรียน (Unit Cards) ===== */}
          <div className="lg:col-span-2 space-y-4">
            {track.units.map((unit) => {
              const unitStatus = getUnitStatus(unit.id);
              const unitProgress = getUnitProgress(unit.id);

              return (
                <UnitCard
                  key={unit.id}
                  unit={unit}
                  status={unitStatus}
                  progress={unitProgress}
                  onSelect={() => handleSelectUnit(unit)}
                  onAction={() => handleUnitAction(unit.id)}
                  isSelected={selectedUnit?.id === unit.id}
                />
              );
            })}
          </div>

          {/* ===== ขวา: Info Panel (ปรากฏเมื่อ hover/click) ===== */}
          <div className="hidden lg:block">
            {selectedUnit ? (
              <InfoPanel type="unit" data={selectedUnit} />
            ) : (
              /* Placeholder เมื่อยังไม่ได้เลือก */
              <div className="bg-white dark:bg-dark-200/60 border border-gray-100 dark:border-white/[0.06] rounded-2xl p-5 sticky top-24">
                <div className="text-center py-8">
                  <p className="text-3xl mb-3">👆</p>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    เลื่อนเมาส์ไปที่บทเรียน
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    เพื่อดูข้อมูลเพิ่มเติม
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ===== Mobile: Info Panel แสดงด้านล่าง ===== */}
          {selectedUnit && (
            <div className="lg:hidden">
              <InfoPanel type="unit" data={selectedUnit} />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
