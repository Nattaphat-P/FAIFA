"use client";

/**
 * SkillRadar — Radar Chart ทักษะผู้ใช้
 * - แสดง % ความคืบหน้าจากแต่ละหลักสูตร
 * - เริ่มว่างเปล่า จนกว่าจะมี progress
 */

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { SkillData } from "@/lib/types";

/** Props สำหรับ SkillRadar */
interface SkillRadarProps {
  /** ข้อมูลทักษะ */
  data: SkillData[];
}

/** Custom Tooltip */
function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { subject: string } }> }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-dark-400/95 border border-white/10 rounded-lg px-3 py-2 shadow-xl backdrop-blur-sm">
      <p className="text-[11px] text-gray-400 mb-0.5">{payload[0].payload.subject}</p>
      <p className="text-sm font-bold text-primary-400">{payload[0].value}%</p>
    </div>
  );
}

export default function SkillRadar({ data }: SkillRadarProps) {
  const hasData = data.length > 0 && data.some((d) => d.value > 0);

  return (
    <div className="bg-white dark:bg-dark-200/60 border border-gray-100 dark:border-white/[0.06] rounded-2xl p-5">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-900 dark:text-white">ทักษะของผู้ใช้งาน</h3>
      </div>

      {hasData ? (
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#9CA3AF", fontSize: 11 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: "#4B5563", fontSize: 9 }}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Radar
                name="ทักษะ"
                dataKey="value"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        /* Empty State */
        <div className="h-48 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-1 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
            </svg>
          </div>
          <p className="text-xs text-gray-500 text-center">ยังไม่มีข้อมูลทักษะ</p>
          <p className="text-[10px] text-gray-600 text-center mt-1">เรียนหลักสูตรเพื่อพัฒนาทักษะ</p>
        </div>
      )}
    </div>
  );
}
