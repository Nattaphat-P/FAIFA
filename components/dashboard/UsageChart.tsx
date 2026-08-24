"use client";

/**
 * UsageChart — Bar Chart สถิติเวลาการใช้งาน
 * - แสดง Bar Chart ด้วย Recharts
 * - สลับ สัปดาห์/เดือน
 * - เริ่มต้นว่างเปล่า แสดง empty state จนกว่าจะมีข้อมูล
 */

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { UsageStat } from "@/lib/types";

/** Props สำหรับ UsageChart */
interface UsageChartProps {
  /** ข้อมูลรายสัปดาห์ */
  weeklyData: UsageStat[];
  /** ข้อมูลรายเดือน */
  monthlyData: UsageStat[];
}

type ViewMode = "weekly" | "monthly";

/** Custom Tooltip */
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-dark-400/95 border border-white/10 rounded-lg px-3 py-2 shadow-xl backdrop-blur-sm">
      <p className="text-[11px] text-gray-400 mb-0.5">{label}</p>
      <p className="text-sm font-bold text-primary-400">{payload[0].value} นาที</p>
    </div>
  );
}

export default function UsageChart({ weeklyData, monthlyData }: UsageChartProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("weekly");
  const data = viewMode === "weekly" ? weeklyData : monthlyData;
  const hasData = data.length > 0 && data.some((d) => d.minutes > 0);

  return (
    <div className="bg-white dark:bg-dark-200/60 border border-gray-100 dark:border-white/[0.06] rounded-2xl p-5">
      {/* Header + Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">ระยะเวลาการใช้งาน</h3>
        </div>
        {/* Toggle สัปดาห์/เดือน */}
        <div className="flex bg-gray-100 dark:bg-dark-400/50 rounded-lg p-0.5">
          <button
            onClick={() => setViewMode("weekly")}
            className={`px-3 py-1 text-[11px] font-medium rounded-md transition-all ${
              viewMode === "weekly"
                ? "bg-primary-600/20 text-primary-400"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            สัปดาห์
          </button>
          <button
            onClick={() => setViewMode("monthly")}
            className={`px-3 py-1 text-[11px] font-medium rounded-md transition-all ${
              viewMode === "monthly"
                ? "bg-primary-600/20 text-primary-400"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            เดือน
          </button>
        </div>
      </div>

      {/* Chart Area */}
      {hasData ? (
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="label"
                tick={{ fill: "#6B7280", fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                unit=" น."
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar
                dataKey="minutes"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
                maxBarSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        /* Empty State */
        <div className="h-48 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/[0.04] flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500 text-center">ยังไม่มีข้อมูล</p>
          <p className="text-[10px] text-gray-600 text-center mt-1">เริ่มเรียนเพื่อดูสถิติ</p>
        </div>
      )}
    </div>
  );
}
