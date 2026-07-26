-- FAIFA Database Schema
-- นำโค้ดนี้ไปรันใน SQL Editor ของ Supabase Dashboard

-- 1. สร้างตาราง users (เชื่อมกับ Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. สร้างตาราง user_progress (เก็บความคืบหน้าการเรียน)
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- 3. สร้างตาราง daily_quiz_log (ประวัติการทำ Daily Quiz)
CREATE TABLE IF NOT EXISTS daily_quiz_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  quiz_date DATE NOT NULL,
  correct BOOLEAN DEFAULT FALSE,
  xp_earned INTEGER DEFAULT 0,
  answer_order INTEGER DEFAULT 0,
  answered_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, quiz_date)
);

-- 4. สร้างตาราง usage_stats (สถิติเวลาการใช้งาน)
CREATE TABLE IF NOT EXISTS usage_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  minutes INTEGER DEFAULT 0,
  UNIQUE(user_id, date)
);

-- ==========================================
-- เปิด Row Level Security (RLS) เพื่อความปลอดภัย
-- ==========================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_quiz_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_stats ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- สร้าง Policies (อนุญาตให้ผู้ใช้จัดการข้อมูลตัวเองได้เท่านั้น)
-- ==========================================

-- Users
CREATE POLICY "Users can view all profiles for leaderboard" ON users
  FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- User Progress
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Daily Quiz Log
CREATE POLICY "Users can view own quiz logs" ON daily_quiz_log
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiz logs" ON daily_quiz_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own quiz logs" ON daily_quiz_log
  FOR UPDATE USING (auth.uid() = user_id);

-- Usage Stats
CREATE POLICY "Users can view own stats" ON usage_stats
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own stats" ON usage_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own stats" ON usage_stats
  FOR UPDATE USING (auth.uid() = user_id);
