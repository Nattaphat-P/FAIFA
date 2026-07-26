/**
 * ไฟล์รวม TypeScript Interface สำหรับแอป FAIFA
 * กำหนดโครงสร้างข้อมูลหลักทั้งหมดของระบบ
 */

/* ===== ระดับความยาก ===== */
/** ระดับความยากของบทเรียน: 1=ง่ายมากๆ, 2=ง่าย, 3=ปานกลาง, 4=ยาก, 5=ปีศาจ */
export type Difficulty = 1 | 2 | 3 | 4 | 5;

/** ป้ายชื่อภาษาไทยสำหรับแต่ละระดับความยาก */
export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  1: "ง่ายมากๆ",
  2: "ง่าย",
  3: "ปานกลาง",
  4: "ยาก",
  5: "ปีศาจ",
};

/** สีสำหรับแต่ละระดับความยาก */
export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  1: "#22C55E", // เขียว — ง่ายมากๆ
  2: "#3B82F6", // น้ำเงิน — ง่าย
  3: "#F59E0B", // ส้ม — ปานกลาง
  4: "#EF4444", // แดง — ยาก
  5: "#9333EA", // ม่วง — ปีศาจ
};

/* ===== สถานะบทเรียน ===== */
/** สถานะการเรียนของบทเรียนแต่ละบท */
export type LessonStatus = "locked" | "in_progress" | "completed";

/* ===== ผู้ใช้ ===== */
/** ข้อมูลโปรไฟล์ผู้ใช้ */
export interface User {
  /** รหัสผู้ใช้ (UUID จาก Supabase Auth) */
  id: string;
  /** อีเมลผู้ใช้ */
  email: string;
  /** ชื่อที่แสดง */
  displayName: string;
  /** URL รูปโปรไฟล์ */
  avatarUrl: string | null;
  /** คะแนนประสบการณ์สะสม */
  xp: number;
  /** ระดับปัจจุบัน */
  level: number;
  /** วันที่สร้างบัญชี */
  createdAt: string;
}

/* ===== หลักสูตร (Track) ===== */
/** หลักสูตรหลัก เช่น อิเล็กทรอนิกส์, ไฟฟ้า, วิศวกรรมระบบ */
export interface Track {
  /** รหัสหลักสูตร */
  id: string;
  /** ชื่อหลักสูตร */
  title: string;
  /** คำอธิบายหลักสูตร */
  description: string;
  /** ไอคอนประจำหลักสูตร (emoji หรือ icon name) */
  icon: string;
  /** สีธีมของหลักสูตร */
  color: string;
  /** ความคืบหน้า (0-100%) */
  progress: number;
  /** รายการบทเรียนในหลักสูตร */
  units: Unit[];
}

/* ===== บทเรียน (Unit) ===== */
/** บทเรียนหลัก เช่น บทที่ 01, บทที่ 02 */
export interface Unit {
  /** รหัสบทเรียน */
  id: string;
  /** รหัสหลักสูตรที่สังกัด */
  trackId: string;
  /** ชื่อบทเรียน */
  title: string;
  /** คำอธิบายบทเรียน */
  description: string;
  /** ลำดับบทเรียนในหลักสูตร */
  order: number;
  /** ระยะเวลาโดยประมาณ (นาที) */
  duration: number;
  /** จำนวนบทย่อยทั้งหมด */
  lessonsCount: number;
  /** จำนวน Lab ในบทนี้ (สำหรับ Info Panel) */
  labCount: number;
  /** จำนวน Quiz ในบทนี้ (สำหรับ Info Panel) */
  quizCount: number;
  /** ระดับความยาก (สำหรับ Info Panel) */
  difficulty: Difficulty;
  /** รายการบทย่อย */
  lessons: Lesson[];
  /** สถานะบทเรียน */
  status: LessonStatus;
}

/* ===== บทย่อย (Lesson) ===== */
/** บทย่อยภายในบทเรียน */
export interface Lesson {
  /** รหัสบทย่อย */
  id: string;
  /** รหัสบทเรียนที่สังกัด */
  unitId: string;
  /** ชื่อบทย่อย */
  title: string;
  /** เนื้อหาบทย่อย (Markdown/Text) */
  content: string;
  /** ลำดับในบทเรียน */
  order: number;
  /** ระดับความยาก */
  difficulty: Difficulty;
  /** สถานะการเรียน */
  status: LessonStatus;
  /** Quiz ท้ายบทย่อย — ต้องตอบถูกถึงจะผ่าน */
  quiz: LessonQuizQuestion;
}

/* ===== Quiz ท้ายบทย่อย ===== */
/** คำถาม Quiz สำหรับท้ายบทย่อย (แยกจาก DailyQuiz) */
export interface LessonQuizQuestion {
  /** รหัส Quiz */
  id: string;
  /** โจทย์คำถาม */
  question: string;
  /** ตัวเลือก */
  options: string[];
  /** ดัชนีคำตอบที่ถูกต้อง (0-based) */
  correctIndex: number;
  /** คำอธิบายเฉลย */
  explanation: string;
}

/* ===== สถานะหลักสูตร (Track) ===== */
/** สถานะการเรียนของหลักสูตร */
export type TrackStatus = "not_started" | "in_progress" | "completed";

/* ===== เหรียญตรา (Badge) ===== */
/** เหรียญตราที่ผู้ใช้ได้รับ (เมื่อจบหลักสูตร 100%) */
export interface Badge {
  /** รหัสเหรียญตรา */
  id: string;
  /** ชื่อเหรียญตรา */
  title: string;
  /** ไอคอน (emoji) */
  icon: string;
  /** หลักสูตรที่เกี่ยวข้อง */
  trackId: string;
  /** วันที่ได้รับ */
  earnedAt: string | null;
}

/* ===== Leaderboard ===== */
/** รายการอันดับผู้ใช้ */
export interface LeaderboardEntry {
  /** ลำดับอันดับ (1-20) */
  rank: number;
  /** รหัสผู้ใช้ */
  userId: string;
  /** ชื่อที่แสดง */
  displayName: string;
  /** URL รูปโปรไฟล์ */
  avatarUrl: string | null;
  /** XP รวม */
  xp: number;
}

/* ===== สถิติการใช้งาน ===== */
/** ข้อมูลสถิติเวลาการใช้งาน (สำหรับ Bar Chart) */
export interface UsageStat {
  /** ป้ายชื่อ (ชื่อวัน/สัปดาห์) */
  label: string;
  /** จำนวนนาทีที่ใช้งาน */
  minutes: number;
}

/* ===== Skill Matrix ===== */
/** ข้อมูลทักษะสำหรับ Radar Chart */
export interface SkillData {
  /** ชื่อทักษะ (ชื่อหลักสูตร) */
  subject: string;
  /** ค่าความคืบหน้า (0-100) */
  value: number;
}

/* ===== คำถามรายวัน (Daily Quiz) ===== */
/** คำถามในแบบทดสอบรายวัน */
export interface QuizQuestion {
  /** รหัสคำถาม */
  id: string;
  /** คำถาม */
  question: string;
  /** ตัวเลือก 4 ข้อ */
  options: string[];
  /** ดัชนีคำตอบที่ถูกต้อง (0-3) */
  correctIndex: number;
  /** คำอธิบายเฉลย */
  explanation: string;
}

/** ข้อมูล Quiz ของแต่ละวัน */
export interface DailyQuiz {
  /** วันที่ (YYYY-MM-DD) */
  date: string;
  /** คำถาม */
  question: QuizQuestion;
}

/** ผลการตอบ Quiz ของผู้ใช้ */
export interface QuizAttempt {
  /** วันที่ (YYYY-MM-DD) */
  date: string;
  /** ตอบถูกหรือไม่ */
  correct: boolean;
  /** XP ที่ได้รับ */
  xpEarned: number;
  /** ลำดับที่ตอบถูก (สำหรับคำนวณ XP) */
  answerOrder: number;
}

/* ===== นักพัฒนา ===== */
/** ข้อมูลผู้พัฒนาแอปพลิเคชัน */
export interface Developer {
  /** ชื่อจริง */
  name: string;
  /** ชื่อเล่น */
  nickname: string;
  /** บทบาท/หน้าที่ */
  role: string;
  /** ที่อยู่รูปโปรไฟล์ */
  imageSrc: string;
}

/* ===== Breadcrumb ===== */
/** รายการ Breadcrumb สำหรับนำทาง */
export interface BreadcrumbItem {
  /** ข้อความที่แสดง */
  label: string;
  /** ลิงก์ (ถ้าไม่มีจะเป็นหน้าปัจจุบัน) */
  href?: string;
}
