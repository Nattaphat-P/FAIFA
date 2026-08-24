"use client";

/**
 * Profile & Leaderboard Page
 * 1. ข้อมูลผู้ใช้: ชื่อ, รูป, XP รวม
 * 2. Badges: แสดงเหรียญตราที่ได้รับ (จบ 100%)
 * 3. Leaderboard: Top 20 จาก XP — เริ่มว่างเปล่า
 *    - อันดับ 1 สีทอง, อันดับ 2 สีเงิน, อันดับ 3 สีทองแดง
 */

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/context/ProgressContext";
import MainLayout from "@/components/layout/MainLayout";
import { AVAILABLE_BADGES } from "@/lib/mockData";
import { getLeaderboard } from "@/lib/supabase";
import type { LeaderboardEntry, Badge } from "@/lib/types";

/** สีสำหรับ Top 3 */
const RANK_STYLES: Record<number, { bg: string; border: string; text: string; icon: string }> = {
  1: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", icon: "🥇" },
  2: { bg: "bg-gray-300/10", border: "border-gray-400/30", text: "text-gray-300", icon: "🥈" },
  3: { bg: "bg-orange-600/10", border: "border-orange-600/30", text: "text-orange-400", icon: "🥉" },
};

export default function ProfilePage() {
  const { user } = useAuth();
  const { getTrackProgress } = useProgress();

  /** Leaderboard — ดึงจาก Database */
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const data = await getLeaderboard();
        // แปลงข้อมูลจาก DB ให้ตรงกับ Interface
        const formatted: LeaderboardEntry[] = data.map((u, index) => ({
          rank: index + 1,
          userId: u.id,
          displayName: u.display_name,
          avatarUrl: u.avatar_url,
          xp: u.xp || 0,
        }));
        setLeaderboard(formatted);
      } catch (err) {
        console.error("ดึง Leaderboard ล้มเหลว:", err);
      }
    }
    fetchLeaderboard();
  }, []);

  /** Badges — คำนวณจาก progress จริง (ได้เมื่อ track 100%) */
  const badges: Badge[] = AVAILABLE_BADGES.map((badge) => {
    const trackProgress = getTrackProgress(badge.trackId);
    return {
      ...badge,
      earnedAt: trackProgress >= 100 ? new Date().toISOString() : null,
    };
  });

  /** ตัวอักษรย่อชื่อผู้ใช้ (fallback avatar) */
  const initials = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : "?";

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* ===== User Profile Card ===== */}
        <div className="relative bg-white dark:bg-dark-200/60 border border-gray-100 dark:border-white/[0.06] rounded-2xl p-6 mb-6 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/[0.07] via-transparent to-accent-gold/[0.05] pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Avatar */}
            <div className="relative">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.displayName}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-200 dark:border-white/10 shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-2xl font-extrabold text-white shadow-lg border-2 border-gray-200 dark:border-white/10">
                  {initials}
                </div>
              )}
              {/* Level badge */}
              <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center text-[10px] font-bold text-white shadow-md border border-white dark:border-dark-300">
                {user?.level || 1}
              </span>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">
                {user?.displayName || "ผู้ใช้"}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {user?.email}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-xs font-semibold">
                  ⭐ {(user?.xp || 0).toLocaleString()} XP
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-600/10 border border-primary-600/20 text-primary-600 dark:text-primary-400 text-xs font-semibold">
                  Level {user?.level || 1}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Badges Section ===== */}
        <div className="bg-white dark:bg-dark-200/60 border border-gray-100 dark:border-white/[0.06] rounded-2xl p-5 mb-6">
          <h2 className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-4">
            เหรียญตรา
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {badges.map((badge) => {
              const earned = badge.earnedAt !== null;
              return (
                <div
                  key={badge.id}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl border transition-all
                    ${earned
                      ? "bg-accent-gold/5 border-accent-gold/20"
                      : "bg-gray-50 dark:bg-white/[0.02] border-gray-100 dark:border-white/[0.06] opacity-50"
                    }
                  `}
                >
                  <span className={`text-2xl ${!earned && "grayscale"}`}>{badge.icon}</span>
                  <div>
                    <p className={`text-xs font-semibold ${earned ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>
                      {badge.title}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {earned
                        ? `ได้รับ: ${new Date(badge.earnedAt!).toLocaleDateString("th-TH")}`
                        : "ยังไม่ได้รับ — เรียนจบ 100%"
                      }
                    </p>
                  </div>
                  {earned && (
                    <span className="ml-auto text-accent-gold">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== Leaderboard ===== */}
        <div className="bg-white dark:bg-dark-200/60 border border-gray-100 dark:border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                อันดับผู้ใช้
              </h2>
              <p className="text-[11px] text-gray-500 mt-0.5">Top 20 จาก XP</p>
            </div>
            <span className="text-lg">🏆</span>
          </div>

          {leaderboard.length > 0 ? (
            <div className="space-y-2">
              {leaderboard.map((entry) => {
                const rankStyle = RANK_STYLES[entry.rank];
                const isCurrentUser = entry.userId === user?.id;
                return (
                  <div
                    key={entry.userId}
                    className={`
                      flex items-center gap-3 p-3 rounded-xl border transition-all
                      ${isCurrentUser
                        ? "bg-primary-50 dark:bg-primary-600/10 border-primary-200 dark:border-primary-600/20 ring-1 ring-primary-400/20 dark:ring-primary-500/20"
                        : rankStyle
                          ? `${rankStyle.bg} ${rankStyle.border}`
                          : "bg-gray-50 dark:bg-white/[0.02] border-gray-100 dark:border-white/[0.04]"
                      }
                    `}
                  >
                    {/* Rank */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      rankStyle ? rankStyle.text : "text-gray-500"
                    }`}>
                      {rankStyle ? rankStyle.icon : `#${entry.rank}`}
                    </div>

                    {/* Avatar */}
                    {entry.avatarUrl ? (
                      <img src={entry.avatarUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-100 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400">
                        {entry.displayName.charAt(0)}
                      </div>
                    )}

                    {/* Name */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold truncate ${isCurrentUser ? "text-primary-600 dark:text-primary-300" : "text-gray-900 dark:text-white"}`}>
                        {entry.displayName}
                        {isCurrentUser && <span className="text-primary-500 dark:text-primary-400 text-[10px] ml-1">(คุณ)</span>}
                      </p>
                    </div>

                    {/* XP */}
                    <span className={`text-xs font-bold ${rankStyle ? rankStyle.text : "text-gray-500 dark:text-gray-400"}`}>
                      {entry.xp.toLocaleString()} XP
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-white/[0.04] flex items-center justify-center mb-4">
                <span className="text-2xl opacity-50">🏆</span>
              </div>
              <p className="text-sm text-gray-500 text-center font-medium">ยังไม่มีอันดับ</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-600 text-center mt-1">
                เริ่มเรียนและทำ Quiz เพื่อสะสม XP และติดอันดับ!
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
