"use client";

/**
 * Daily Quiz Page — คำถามรายวัน
 * 1. Calendar: เลือกวันที่ย้อนหลังเพื่อทำ Quiz
 * 2. Quiz Area: แสดงคำถาม + 4 ตัวเลือก
 * 3. XP System: คนแรกได้ 100 XP, ลดลงตามลำดับ
 * 4. Current Streak
 * 5. Feedback: แสดงผลตอบถูก/ผิด + animation
 */

import { useState, useCallback, useMemo, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { getQuizForDate, calculateQuizXP } from "@/lib/mockData";
import type { QuizAttempt } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import { getDailyQuizHistory, saveDailyQuizResult, addUserXP } from "@/lib/supabase";

/** Helper: วันที่ปัจจุบันในรูปแบบ YYYY-MM-DD */
function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Helper: สร้างวันที่ทั้งหมดในเดือน */
function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

/** ชื่อเดือนภาษาไทย */
const THAI_MONTHS = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
  "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
  "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

const THAI_DAYS = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

export default function DailyQuizPage() {
  const { user } = useAuth();
  const today = getTodayString();

  /** วันที่ที่เลือก */
  const [selectedDate, setSelectedDate] = useState(today);

  /** ปฏิทิน: เดือน/ปี ที่แสดง */
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());

  /** ผลการตอบ Quiz — เก็บตาม date key */
  const [attempts, setAttempts] = useState<Record<string, QuizAttempt>>({});

  /** ตัวเลือกที่ผู้ใช้เลือก (ก่อนส่ง) */
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  /** สถานะ: ส่งคำตอบแล้วหรือยัง */
  const [submitted, setSubmitted] = useState(false);

  /** ดึง Quiz ของวันที่เลือก */
  const quiz = useMemo(() => getQuizForDate(selectedDate), [selectedDate]);

  /** ดึงประวัติจาก Database เมื่อ mount หรือ user เปลี่ยน */
  useEffect(() => {
    async function loadHistory() {
      if (!user) return;
      try {
        const history = await getDailyQuizHistory(user.id);
        const newAttempts: Record<string, QuizAttempt> = {};
        history.forEach((h: any) => {
          newAttempts[h.quiz_date] = {
            date: h.quiz_date,
            correct: h.correct,
            xpEarned: h.xp_earned,
            answerOrder: h.answer_order,
          };
        });
        setAttempts(newAttempts);
      } catch (err) {
        console.error("โหลดประวัติ Quiz ล้มเหลว:", err);
      }
    }
    loadHistory();
  }, [user]);

  /** เช็คว่าวันนี้ทำแล้วหรือยัง */
  const currentAttempt = attempts[selectedDate] || null;

  /** นับ Streak */
  const streak = useMemo(() => {
    let count = 0;
    const d = new Date();
    while (true) {
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (attempts[key]?.correct) {
        count++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return count;
  }, [attempts]);

  /** เปลี่ยนวันที่ */
  const handleSelectDate = useCallback((dateStr: string) => {
    setSelectedDate(dateStr);
    setSelectedOption(null);
    setSubmitted(false);
  }, []);

  /** ส่งคำตอบ */
  const handleSubmit = useCallback(async () => {
    if (selectedOption === null || currentAttempt) return;

    const correct = selectedOption === quiz.question.correctIndex;
    // สมมุติ answerOrder เป็น random 1-50 สำหรับ mockup ไปก่อน (ของจริงอาจเช็ค count จาก DB)
    const answerOrder = Math.floor(Math.random() * 50) + 1;
    const xpEarned = correct ? calculateQuizXP(answerOrder) : 0;

    const attempt: QuizAttempt = {
      date: selectedDate,
      correct,
      xpEarned,
      answerOrder,
    };

    // อัปเดต UI ทันที
    setAttempts((prev) => ({ ...prev, [selectedDate]: attempt }));
    setSubmitted(true);

    // บันทึกลง Database ถ้า Login
    if (user) {
      try {
        await saveDailyQuizResult(user.id, selectedDate, correct, xpEarned, answerOrder);
        if (xpEarned > 0) {
          await addUserXP(user.id, xpEarned);
        }
      } catch (err) {
        console.error("บันทึก Daily Quiz ลง DB ล้มเหลว:", err);
      }
    }
  }, [selectedOption, currentAttempt, quiz, selectedDate, user]);

  /** วันทั้งหมดในเดือนที่แสดง */
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDayOfWeek = daysInMonth[0]?.getDay() || 0;

  /** เดือนก่อนหน้า/ถัดไป */
  const goToPrevMonth = useCallback(() => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else {
      setCalMonth((m) => m - 1);
    }
  }, [calMonth]);

  const goToNextMonth = useCallback(() => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else {
      setCalMonth((m) => m + 1);
    }
  }, [calMonth]);

  /** ผลแสดงหลังตอบ */
  const result = submitted ? currentAttempt : (currentAttempt || null);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* ===== Header ===== */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            คำถามรายวัน ⚡
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            ทดสอบความรู้ทุกวัน — สะสม XP เพื่อขึ้นอันดับ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ===== Left Column: Calendar + Streak ===== */}
          <div className="lg:col-span-1 space-y-4">
            {/* Streak Badge */}
            <div className="bg-dark-200/60 border border-white/[0.06] rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-accent-gold/10 flex items-center justify-center">
                  <span className="text-xl">🔥</span>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">Streak ปัจจุบัน</p>
                  <p className="text-2xl font-extrabold text-white">
                    {streak} <span className="text-sm font-medium text-gray-400">วัน</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-dark-200/60 border border-white/[0.06] rounded-2xl p-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={goToPrevMonth}
                  className="w-7 h-7 rounded-lg hover:bg-white/[0.06] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-sm font-bold text-white">
                  {THAI_MONTHS[calMonth]} {calYear + 543}
                </span>
                <button
                  onClick={goToNextMonth}
                  className="w-7 h-7 rounded-lg hover:bg-white/[0.06] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-1">
                {THAI_DAYS.map((d) => (
                  <div key={d} className="text-center text-[10px] text-gray-500 font-medium py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for offset */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {daysInMonth.map((date) => {
                  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
                  const isToday = dateStr === today;
                  const isSelected = dateStr === selectedDate;
                  const attempt = attempts[dateStr];
                  const isFuture = dateStr > today;

                  return (
                    <button
                      key={dateStr}
                      onClick={() => !isFuture && handleSelectDate(dateStr)}
                      disabled={isFuture}
                      className={`
                        relative w-full aspect-square rounded-lg text-[11px] font-medium
                        flex items-center justify-center transition-all duration-200
                        ${isFuture
                          ? "text-gray-700 cursor-not-allowed"
                          : isSelected
                            ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                            : isToday
                              ? "bg-primary-600/20 text-primary-400 ring-1 ring-primary-500/30"
                              : "text-gray-400 hover:bg-white/[0.06] hover:text-white"
                        }
                      `}
                    >
                      {date.getDate()}
                      {/* Attempt indicator */}
                      {attempt && (
                        <span className={`absolute bottom-0.5 w-1 h-1 rounded-full ${
                          attempt.correct ? "bg-accent-green" : "bg-red-400"
                        }`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ===== Right Column: Quiz ===== */}
          <div className="lg:col-span-2">
            <div className="bg-dark-200/60 border border-white/[0.06] rounded-2xl p-5 lg:p-6">
              {/* Quiz Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium mb-1">
                    คำถามประจำวัน
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(selectedDate + "T00:00:00").toLocaleDateString("th-TH", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                {result && (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    result.correct
                      ? "bg-accent-green/10 border border-accent-green/20 text-accent-green"
                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                  }`}>
                    {result.correct ? `+${result.xpEarned} XP` : "ไม่ถูกต้อง"}
                  </span>
                )}
              </div>

              {/* Question */}
              <h2 className="text-base md:text-lg font-bold text-white mb-6 leading-relaxed">
                {quiz.question.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {quiz.question.options.map((option, idx) => {
                  const isCorrect = idx === quiz.question.correctIndex;
                  const isChosen = (result ? (selectedOption === idx || (result && idx === quiz.question.correctIndex)) : selectedOption === idx);
                  const showResult = !!result;

                  let optionClass = "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12]";

                  if (showResult) {
                    if (isCorrect) {
                      optionClass = "bg-accent-green/10 border-accent-green/30";
                    } else if (selectedOption === idx && !isCorrect) {
                      optionClass = "bg-red-500/10 border-red-500/30";
                    } else {
                      optionClass = "bg-white/[0.02] border-white/[0.04] opacity-50";
                    }
                  } else if (selectedOption === idx) {
                    optionClass = "bg-primary-600/15 border-primary-500/30 ring-1 ring-primary-500/20";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !result && setSelectedOption(idx)}
                      disabled={!!result}
                      className={`
                        w-full flex items-center gap-3 p-3.5 rounded-xl border text-left
                        transition-all duration-200 ${optionClass}
                        ${!result && "cursor-pointer active:scale-[0.99]"}
                      `}
                    >
                      {/* Option letter */}
                      <span className={`
                        w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0
                        ${showResult && isCorrect
                          ? "bg-accent-green/20 text-accent-green"
                          : showResult && selectedOption === idx && !isCorrect
                            ? "bg-red-500/20 text-red-400"
                            : selectedOption === idx
                              ? "bg-primary-600/30 text-primary-400"
                              : "bg-white/[0.06] text-gray-500"
                        }
                      `}>
                        {String.fromCharCode(65 + idx)}
                      </span>

                      {/* Option text */}
                      <span className={`text-sm ${
                        showResult && isCorrect
                          ? "text-accent-green font-semibold"
                          : showResult && selectedOption === idx && !isCorrect
                            ? "text-red-400"
                            : isChosen && !showResult
                              ? "text-white font-medium"
                              : "text-gray-300"
                      }`}>
                        {option}
                      </span>

                      {/* Result icon */}
                      {showResult && isCorrect && (
                        <span className="ml-auto text-accent-green animate-scale-in">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                      {showResult && selectedOption === idx && !isCorrect && (
                        <span className="ml-auto text-red-400 animate-scale-in">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (after submit) */}
              {result && (
                <div className={`p-4 rounded-xl border mb-5 animate-fade-in-up ${
                  result.correct
                    ? "bg-accent-green/5 border-accent-green/20"
                    : "bg-red-500/5 border-red-500/20"
                }`}>
                  <p className="text-xs font-semibold mb-1 ${result.correct ? 'text-accent-green' : 'text-red-400'}">
                    {result.correct ? "🎉 ถูกต้อง!" : "❌ ไม่ถูกต้อง"}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {quiz.question.explanation}
                  </p>
                  {result.correct && (
                    <p className="text-[11px] text-gray-500 mt-2">
                      คุณตอบเป็นคนที่ {result.answerOrder} — ได้รับ {result.xpEarned} XP
                    </p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              {!result && (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className={`
                    w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200
                    ${selectedOption !== null
                      ? "bg-primary-600 hover:bg-primary-500 shadow-lg shadow-primary-600/20 active:scale-[0.99]"
                      : "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                    }
                  `}
                >
                  ส่งคำตอบ
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
