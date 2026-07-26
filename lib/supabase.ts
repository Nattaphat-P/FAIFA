/**
 * lib/supabase.ts — Supabase Client Configuration
 * สร้าง Supabase Client สำหรับเชื่อมต่อ Database และ Authentication
 * 
 * ใช้ Environment Variables จากไฟล์ .env.local:
 * - NEXT_PUBLIC_SUPABASE_URL: URL ของโปรเจกต์ Supabase
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Publishable Key (Anon Key)
 * 
 * === Schema ของ Database ที่ใช้ (สำหรับอ้างอิง) ===
 * 
 * -- ตาราง users: ข้อมูลผู้ใช้ (เชื่อมกับ Supabase Auth)
 * CREATE TABLE users (
 *   id UUID PRIMARY KEY REFERENCES auth.users(id),
 *   email TEXT NOT NULL,
 *   display_name TEXT NOT NULL,
 *   avatar_url TEXT,
 *   xp INTEGER DEFAULT 0,
 *   level INTEGER DEFAULT 1,
 *   created_at TIMESTAMPTZ DEFAULT now()
 * );
 * 
 * -- ตาราง tracks: หลักสูตร
 * CREATE TABLE tracks (
 *   id TEXT PRIMARY KEY,
 *   title TEXT NOT NULL,
 *   description TEXT,
 *   icon TEXT,
 *   color TEXT,
 *   "order" INTEGER DEFAULT 0
 * );
 * 
 * -- ตาราง units: บทเรียน (สังกัดหลักสูตร)
 * CREATE TABLE units (
 *   id TEXT PRIMARY KEY,
 *   track_id TEXT REFERENCES tracks(id),
 *   title TEXT NOT NULL,
 *   description TEXT,
 *   "order" INTEGER DEFAULT 0,
 *   duration INTEGER DEFAULT 0,
 *   lessons_count INTEGER DEFAULT 0,
 *   lab_count INTEGER DEFAULT 0,
 *   quiz_count INTEGER DEFAULT 0,
 *   difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5)
 * );
 * 
 * -- ตาราง lessons: บทย่อย (สังกัดบทเรียน)
 * CREATE TABLE lessons (
 *   id TEXT PRIMARY KEY,
 *   unit_id TEXT REFERENCES units(id),
 *   title TEXT NOT NULL,
 *   content TEXT,
 *   "order" INTEGER DEFAULT 0,
 *   difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
 *   quiz_question TEXT,
 *   quiz_options JSONB,
 *   quiz_correct_index INTEGER,
 *   quiz_explanation TEXT
 * );
 * 
 * -- ตาราง user_progress: ความคืบหน้าการเรียนของผู้ใช้
 * CREATE TABLE user_progress (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID REFERENCES users(id),
 *   lesson_id TEXT REFERENCES lessons(id),
 *   completed BOOLEAN DEFAULT FALSE,
 *   completed_at TIMESTAMPTZ,
 *   UNIQUE(user_id, lesson_id)
 * );
 * 
 * -- ตาราง daily_quiz_log: ประวัติการทำ Daily Quiz
 * CREATE TABLE daily_quiz_log (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID REFERENCES users(id),
 *   quiz_date DATE NOT NULL,
 *   correct BOOLEAN DEFAULT FALSE,
 *   xp_earned INTEGER DEFAULT 0,
 *   answer_order INTEGER DEFAULT 0,
 *   answered_at TIMESTAMPTZ DEFAULT now(),
 *   UNIQUE(user_id, quiz_date)
 * );
 * 
 * -- ตาราง usage_stats: สถิติเวลาการใช้งาน
 * CREATE TABLE usage_stats (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID REFERENCES users(id),
 *   date DATE NOT NULL,
 *   minutes INTEGER DEFAULT 0,
 *   UNIQUE(user_id, date)
 * );
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

/* ===== Environment Variables ===== */
/** URL ของโปรเจกต์ Supabase */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

/** Publishable Anon Key (ใช้ฝั่ง Client ได้อย่างปลอดภัย) */
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/* ===== ตรวจสอบ Environment Variables ===== */
/**
 * ตรวจสอบว่าตั้งค่า Environment Variables ครบหรือไม่
 * ถ้าไม่ครบ จะแสดง Warning แทนการ throw error เพื่อให้ Mock Mode ยังทำงานได้
 */
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ FAIFA: ไม่พบ NEXT_PUBLIC_SUPABASE_URL หรือ NEXT_PUBLIC_SUPABASE_ANON_KEY\n" +
    "   → กรุณาตั้งค่าใน .env.local (ดูตัวอย่างที่ .env.local.example)\n" +
    "   → ระบบจะทำงานแบบ Mock Mode (ไม่เชื่อมต่อ Database จริง)"
  );
}

/* ===== สร้าง Supabase Client ===== */
/**
 * สร้าง Client สำหรับใช้ฝั่ง Browser (Client-side)
 * - ใช้ Anon Key ซึ่งปลอดภัยสำหรับ Client
 * - Auth จัดการ Session อัตโนมัติ
 * - เปิด Persist Session เก็บลง LocalStorage
 */
export const supabase: SupabaseClient = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
  {
    auth: {
      /* เปิดการเก็บ Session อัตโนมัติ */
      persistSession: true,
      /* ตรวจจับ Session อัตโนมัติจาก URL (สำหรับ OAuth Callback) */
      autoRefreshToken: true,
      /* ตรวจจับ Session จาก URL (เช่น Google OAuth redirect) */
      detectSessionInUrl: true,
    },
  }
);

/* ===== Helper Functions สำหรับ Authentication ===== */

/**
 * เข้าสู่ระบบด้วย Google OAuth
 * - Redirect ผู้ใช้ไปยัง Google Login
 * - หลัง Login สำเร็จ จะ Redirect กลับมาที่ /main
 */
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      /* URL ที่จะ Redirect กลับมาหลัง Login (ผ่านหน้า callback) */
      redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback`,
    },
  });

  if (error) {
    console.error("❌ เข้าสู่ระบบด้วย Google ล้มเหลว:", error.message);
    throw error;
  }

  return data;
}

/**
 * ออกจากระบบ
 * - ลบ Session ทั้งหมด
 */
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("❌ ออกจากระบบล้มเหลว:", error.message);
    throw error;
  }
}

/**
 * ดึงข้อมูล Session ปัจจุบัน
 * ใช้เมื่อต้องการตรวจสอบว่าผู้ใช้ Login อยู่หรือไม่
 */
export async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error("❌ ดึง Session ล้มเหลว:", error.message);
    return null;
  }

  return session;
}

/**
 * ดึงข้อมูลผู้ใช้ปัจจุบัน
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error("❌ ดึงข้อมูลผู้ใช้ล้มเหลว:", error.message);
    return null;
  }

  return user;
}

/* ===== Helper Functions สำหรับ Database ===== */

/**
 * ดึงข้อมูลโปรไฟล์ผู้ใช้จากตาราง users
 * @param userId - UUID ของผู้ใช้ (จาก auth.users)
 */
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("❌ ดึงโปรไฟล์ล้มเหลว:", error.message);
    return null;
  }

  return data;
}

/**
 * บันทึกหรืออัปเดตโปรไฟล์ผู้ใช้
 * ใช้ upsert เพื่อสร้างใหม่หรืออัปเดตอัตโนมัติ
 */
export async function upsertUserProfile(profile: {
  id: string;
  email: string;
  display_name: string;
  avatar_url?: string | null;
}) {
  const { data, error } = await supabase
    .from("users")
    .upsert(profile, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("❌ บันทึกโปรไฟล์ล้มเหลว:", error.message);
    return null;
  }

  return data;
}

/**
 * บันทึกความคืบหน้าบทเรียน (เมื่อผ่าน Quiz)
 * @param userId - UUID ของผู้ใช้
 * @param lessonId - ID ของบทย่อยที่เสร็จ
 */
export async function saveLessonProgress(userId: string, lessonId: string) {
  const { data, error } = await supabase
    .from("user_progress")
    .upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,lesson_id" }
    )
    .select()
    .single();

  if (error) {
    console.error("❌ บันทึกความคืบหน้าล้มเหลว:", error.message);
    return null;
  }

  return data;
}

/**
 * ดึงความคืบหน้าทั้งหมดของผู้ใช้
 * @param userId - UUID ของผู้ใช้
 * @returns รายการ lesson_id ที่เสร็จแล้ว
 */
export async function getUserProgress(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("user_progress")
    .select("lesson_id")
    .eq("user_id", userId)
    .eq("completed", true);

  if (error) {
    console.error("❌ ดึงความคืบหน้าล้มเหลว:", error.message);
    return [];
  }

  return data?.map((row: { lesson_id: string }) => row.lesson_id) || [];
}

/**
 * บันทึกผลการทำ Daily Quiz
 * @param userId - UUID ของผู้ใช้
 * @param quizDate - วันที่ (YYYY-MM-DD)
 * @param correct - ตอบถูกหรือไม่
 * @param xpEarned - XP ที่ได้รับ
 * @param answerOrder - ลำดับที่ตอบ (คนที่เท่าไร)
 */
export async function saveDailyQuizResult(
  userId: string,
  quizDate: string,
  correct: boolean,
  xpEarned: number,
  answerOrder: number
) {
  const { data, error } = await supabase
    .from("daily_quiz_log")
    .upsert(
      {
        user_id: userId,
        quiz_date: quizDate,
        correct,
        xp_earned: xpEarned,
        answer_order: answerOrder,
      },
      { onConflict: "user_id,quiz_date" }
    )
    .select()
    .single();

  if (error) {
    console.error("❌ บันทึก Daily Quiz ล้มเหลว:", error.message);
    return null;
  }

  return data;
}

/**
 * ดึงประวัติ Daily Quiz ของผู้ใช้
 * @param userId - UUID ของผู้ใช้
 */
export async function getDailyQuizHistory(userId: string) {
  const { data, error } = await supabase
    .from("daily_quiz_log")
    .select("*")
    .eq("user_id", userId)
    .order("quiz_date", { ascending: false });

  if (error) {
    console.error("❌ ดึงประวัติ Daily Quiz ล้มเหลว:", error.message);
    return [];
  }

  return data || [];
}

/**
 * อัปเดต XP ของผู้ใช้
 * @param userId - UUID ของผู้ใช้
 * @param xpToAdd - จำนวน XP ที่จะเพิ่ม
 */
export async function addUserXP(userId: string, xpToAdd: number) {
  /* ดึง XP ปัจจุบัน */
  const { data: currentData } = await supabase
    .from("users")
    .select("xp, level")
    .eq("id", userId)
    .single();

  if (!currentData) return null;

  /* คำนวณ XP และ Level ใหม่ */
  const newXP = (currentData.xp || 0) + xpToAdd;
  const newLevel = calculateLevel(newXP);

  /* อัปเดตลง Database */
  const { data, error } = await supabase
    .from("users")
    .update({ xp: newXP, level: newLevel })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("❌ อัปเดต XP ล้มเหลว:", error.message);
    return null;
  }

  return data;
}

/**
 * ดึงข้อมูล Leaderboard (Top 20 ตาม XP)
 */
export async function getLeaderboard() {
  const { data, error } = await supabase
    .from("users")
    .select("id, display_name, avatar_url, xp")
    .order("xp", { ascending: false })
    .limit(20);

  if (error) {
    console.error("❌ ดึง Leaderboard ล้มเหลว:", error.message);
    return [];
  }

  return data || [];
}

/**
 * บันทึกเวลาใช้งาน (สำหรับ Usage Chart)
 * @param userId - UUID ของผู้ใช้
 * @param minutes - จำนวนนาทีที่ใช้งานวันนี้
 */
export async function saveUsageTime(userId: string, minutes: number) {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const { data, error } = await supabase
    .from("usage_stats")
    .upsert(
      {
        user_id: userId,
        date: today,
        minutes,
      },
      { onConflict: "user_id,date" }
    )
    .select()
    .single();

  if (error) {
    console.error("❌ บันทึกเวลาใช้งานล้มเหลว:", error.message);
    return null;
  }

  return data;
}

/* ===== Utility Functions ===== */

/**
 * คำนวณ Level จาก XP
 * สูตร: Level = floor(sqrt(XP / 100)) + 1
 * ตัวอย่าง: 0 XP = Lv.1, 100 XP = Lv.2, 400 XP = Lv.3, 900 XP = Lv.4
 */
export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

/**
 * คำนวณ XP ที่ต้องการสำหรับ Level ถัดไป
 */
export function xpForNextLevel(currentLevel: number): number {
  return currentLevel * currentLevel * 100;
}
