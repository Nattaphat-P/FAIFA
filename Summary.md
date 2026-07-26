# 📘 Summary.md — แผนที่โปรเจกต์ FAIFA

> **FAIFA** — แพลตฟอร์มการเรียนรู้วิชาไฟฟ้า ไฟฟ้าภายในบ้าน และอิเล็กทรอนิกส์
> 
> **Tech Stack:** Next.js (App Router) · React · TypeScript · Tailwind CSS · Supabase · Google OAuth · Recharts
> 
> **Font:** Sarabun (ไทย+ละติน) | **Theme:** Light (ครีม #FDFBF7) / Dark (#162233)

---

## 📁 โครงสร้าง Folder

```
FAIFA/
├── app/                          # Next.js App Router (หน้าเว็บทั้งหมด)
│   ├── layout.tsx                # Root Layout — Font, Theme, Auth, Progress
│   ├── globals.css               # Tailwind + Custom styles
│   ├── page.tsx                  # Landing Page (หน้าแรก)
│   ├── main/
│   │   └── page.tsx              # Dashboard (หน้าหลัก — หลัง Login)
│   ├── track/
│   │   └── [trackId]/
│   │       └── page.tsx          # หน้าหลักสูตร (รายการบทเรียน)
│   ├── unit/
│   │   └── [unitId]/
│   │       └── page.tsx          # หน้าบทเรียน (รายการบทย่อย)
│   ├── lesson/
│   │   └── [lessonId]/
│   │       └── page.tsx          # หน้าเนื้อหา + Lab + Quiz
│   ├── profile/
│   │   └── page.tsx              # หน้าโปรไฟล์ + Badges + Leaderboard
│   └── daily-quiz/
│       └── page.tsx              # หน้าคำถามรายวัน + ปฏิทิน
│
├── components/                   # React Components (แยกตามหน้าที่)
│   ├── landing/                  # คอมโพเนนต์สำหรับ Landing Page
│   │   ├── Navbar.tsx            # แถบนำทาง (FAIFA + เมนู + ปุ่มเข้าสู่ระบบ)
│   │   ├── HeroSection.tsx       # Hero: Text + CTA + รูปภาพ
│   │   ├── AboutSection.tsx      # เกี่ยวกับแพลตฟอร์ม (3 Cards)
│   │   ├── DeveloperSection.tsx  # ผู้พัฒนา (3 คน: Nut, Ong, Aom)
│   │   └── Footer.tsx           # Footer: IG, YouTube, นโยบาย
│   │
│   ├── layout/                   # คอมโพเนนต์ Layout (หลัง Login)
│   │   ├── Sidebar.tsx           # Sidebar: เมนูนำทาง (ย่อ/ขยายได้)
│   │   └── MainLayout.tsx        # Layout wrapper (Sidebar + Content)
│   │
│   ├── modals/                   # Pop-up / Modal
│   │   ├── SignInModal.tsx       # เข้าสู่ระบบด้วย Google
│   │   └── SettingsModal.tsx     # ตั้งค่า Theme (ครีม/ดำ)
│   │
│   ├── dashboard/                # คอมโพเนนต์ Dashboard
│   │   ├── TrackCard.tsx         # Card หลักสูตร (3 สถานะปุ่ม)
│   │   ├── UsageChart.tsx        # กราฟเวลาใช้งาน (Bar Chart)
│   │   └── SkillRadar.tsx        # กราฟทักษะ (Radar Chart)
│   │
│   ├── track/                    # คอมโพเนนต์หน้าหลักสูตร/บทเรียน
│   │   ├── UnitCard.tsx          # กล่องบทเรียน (3 สถานะ: เสร็จ/เรียนอยู่/ล็อก)
│   │   ├── LessonCard.tsx        # กล่องบทย่อย (3 สถานะ)
│   │   └── InfoPanel.tsx         # Panel แสดงข้อมูลบท (Hover/Click)
│   │
│   ├── lesson/                   # คอมโพเนนต์เนื้อหาบทเรียน
│   │   └── LessonQuiz.tsx        # Quiz ท้ายบทย่อย (ตอบผิด → ตอบใหม่ได้)
│   │
│   └── shared/                   # คอมโพเนนต์ที่ใช้ร่วม
│       ├── Breadcrumb.tsx        # แถบนำทาง (หน้าหลัก > หลักสูตร > บท)
│       ├── DifficultyBadge.tsx   # Badge ความยาก (ง่ายมากๆ → ปีศาจ)
│       └── ProgressBar.tsx       # แถบความคืบหน้า
│
├── context/                      # React Context (Global State)
│   ├── AuthContext.tsx           # จัดการ Login/Logout (Mock → Supabase)
│   ├── ProgressContext.tsx       # จัดการความคืบหน้าการเรียน + Lock/Unlock
│   └── ThemeProvider.tsx         # จัดการ Light/Dark Mode
│
├── lib/                          # ไลบรารี / ข้อมูล / Config
│   ├── types.ts                  # TypeScript Interfaces ทั้งหมด
│   ├── mockData.ts               # ข้อมูลจำลอง (Tracks, Quizzes, Badges)
│   └── supabase.ts               # Supabase Client + Helper Functions
│
├── public/                       # Static Files
│   └── img/                      # รูปภาพ
│       ├── Nut.jpg               # ภาพผู้พัฒนา: ณัฐพัชร
│       ├── Ong.jpg               # ภาพผู้พัฒนา: อัครวินท์
│       ├── Aom.jpg               # ภาพผู้พัฒนา: ออมพณ
│       └── hero-circuit.png      # ภาพ Hero Section
│
├── .env.local                    # Environment Variables (ห้าม push ขึ้น Git)
├── .env.local.example            # ตัวอย่าง Environment Variables
├── .gitignore                    # ไฟล์ที่ไม่ต้อง push
├── tailwind.config.ts            # Tailwind CSS Configuration
├── next.config.ts                # Next.js Configuration
├── tsconfig.json                 # TypeScript Configuration
├── postcss.config.mjs            # PostCSS Configuration
├── package.json                  # Dependencies & Scripts
├── AI_PROGRESS.md                # สถานะการพัฒนา (Checklist)
└── Summary.md                    # ไฟล์นี้ (แผนที่โปรเจกต์)
```

---

## 📄 อธิบายไฟล์แต่ละอัน

### 🔧 Configuration Files

| ไฟล์ | หน้าที่ |
|------|---------|
| `package.json` | จัดการ dependencies (Next.js, React, Supabase, Recharts, next-themes) + scripts: `dev`, `build`, `start`, `lint` |
| `tailwind.config.ts` | ตั้งค่าสี (Cream/Dark/Primary/Accent), Font Sarabun, Animation (fade-in, scale-in, pulse-glow), Dark mode แบบ class |
| `next.config.ts` | ตั้งค่า Image domains (Supabase, Google) สำหรับ `<Image />` |
| `tsconfig.json` | TypeScript strict mode + Path alias `@/` |
| `.env.local` | Supabase URL + Anon Key (ห้าม commit) |

### 📱 App Pages

| ไฟล์ | หน้าที่ | URL |
|------|---------|-----|
| `app/layout.tsx` | Root Layout: โหลด Font Sarabun, ห่อด้วย Theme/Auth/Progress Provider | — |
| `app/globals.css` | Tailwind directives + Custom scrollbar + Global styles | — |
| `app/page.tsx` | **Landing Page**: Navbar + Hero + About + Developers + Footer + Modals | `/` |
| `app/main/page.tsx` | **Dashboard**: Track Cards + Usage Chart + Skill Radar | `/main` |
| `app/track/[trackId]/page.tsx` | **หน้าหลักสูตร**: Breadcrumb + Progress + UnitCards + InfoPanel | `/track/electronics` |
| `app/unit/[unitId]/page.tsx` | **หน้าบทเรียน**: รายการ LessonCards + InfoPanel | `/unit/e-u1` |
| `app/lesson/[lessonId]/page.tsx` | **หน้าเนื้อหา**: เนื้อหา + Lab (placeholder) + Quiz | `/lesson/e-u1-l1` |
| `app/profile/page.tsx` | **โปรไฟล์**: ข้อมูลผู้ใช้ + Badges + Leaderboard Top 20 | `/profile` |
| `app/daily-quiz/page.tsx` | **คำถามรายวัน**: Quiz + XP + Streak + ปฏิทิน | `/daily-quiz` |

### 🧩 Components

| ไฟล์ | หน้าที่ |
|------|---------|
| `Navbar.tsx` | แถบนำทางหน้าแรก: FAIFA logo, เมนู (scroll ไปยัง section), ปุ่มเข้าสู่ระบบ |
| `HeroSection.tsx` | ส่วน Hero: หัวข้อหลัก + ปุ่มเริ่มใช้งาน (เปิด Sign In Modal) + รูป circuit |
| `AboutSection.tsx` | 3 Cards: ห้องปฏิบัติการเสมือน, แบบทดสอบประจำวัน, เรียนรู้ได้ทุกที่ |
| `DeveloperSection.tsx` | แสดงรูป + ชื่อ + บทบาทของผู้พัฒนา 3 คน |
| `Footer.tsx` | FAIFA © + IG/YouTube icons + นโยบายความเป็นส่วนตัว |
| `Sidebar.tsx` | เมนูด้านซ้าย: หน้าหลัก, คำถามรายวัน, โปรไฟล์ / การตั้งค่า, สนับสนุน, ออกจากระบบ. ย่อ/ขยายได้ + Responsive (Mobile: Hamburger) |
| `MainLayout.tsx` | ห่อ Sidebar + Content area ให้ Responsive |
| `SignInModal.tsx` | Pop-up Login: พื้นหลังเบลอ + ปุ่ม X ปิด + ปุ่ม Login ด้วย Google |
| `SettingsModal.tsx` | Pop-up ตั้งค่า: เลือก Theme ครีม/ดำ |
| `TrackCard.tsx` | Card หลักสูตร: icon, ชื่อ, ความยาก, คำอธิบาย, Progress bar, ปุ่ม 3 สถานะ (เทา/น้ำเงิน/เขียว) |
| `UsageChart.tsx` | กราฟแท่ง (Recharts): เวลาใช้งาน สลับสัปดาห์/เดือนได้ |
| `SkillRadar.tsx` | กราฟเรดาร์ (Recharts): ทักษะผู้ใช้คำนวณจาก % ความคืบหน้าแต่ละหลักสูตร |
| `UnitCard.tsx` | กล่องบทเรียน: บทที่, สถานะ (เสร็จ ✓ / กำลังเรียน / ล็อก 🔒), ชื่อ, เวลา, บทย่อย, คำอธิบาย, ปุ่ม |
| `LessonCard.tsx` | กล่องบทย่อย: เหมือน UnitCard แต่ระดับบทย่อย |
| `InfoPanel.tsx` | Panel ด้านขวา: ชื่อบท, ความยาก, จำนวน Lab/Quiz (ปรากฏเมื่อ hover/click) |
| `LessonQuiz.tsx` | Quiz ท้ายบทย่อย: แสดงโจทย์ + ตัวเลือก, ตอบผิด → ลองใหม่, ตอบถูก → ผ่าน + คำอธิบาย |
| `Breadcrumb.tsx` | แถบนำทาง: หน้าหลัก > หลักสูตร > บทเรียน (กดกลับได้) |
| `DifficultyBadge.tsx` | Badge ความยาก 5 ระดับ: ง่ายมากๆ (เขียว), ง่าย (น้ำเงิน), ปานกลาง (ส้ม), ยาก (แดง), ปีศาจ (ม่วง) |
| `ProgressBar.tsx` | แถบความคืบหน้า: รองรับสี/ขนาด/label ที่ปรับแต่งได้ |

### ⚙️ Context (Global State)

| ไฟล์ | หน้าที่ |
|------|---------|
| `AuthContext.tsx` | จัดการ Login/Logout: ปัจจุบันเป็น **Mock** (จำลองผู้ใช้), เตรียมโครงสร้างเชื่อม Supabase |
| `ProgressContext.tsx` | จัดการความคืบหน้า: **เก็บใน localStorage**, คำนวณ % (lesson → unit → track), Lock/Unlock (ต้องเรียนบทก่อนหน้าจบก่อน) |
| `ThemeProvider.tsx` | สลับ Light/Dark mode ด้วย **next-themes**, เก็บลง localStorage |

### 📚 Library

| ไฟล์ | หน้าที่ |
|------|---------|
| `types.ts` | TypeScript interfaces: User, Track, Unit, Lesson, Quiz, Badge, Leaderboard, UsageStat, SkillData, Difficulty (1-5), LessonStatus, TrackStatus, BreadcrumbItem |
| `mockData.ts` | ข้อมูลจำลอง: 3 หลักสูตร (อิเล็กทรอนิกส์, ไฟฟ้า, วิศวกรรมระบบ) × 3 บท × 3 บทย่อย + Quiz ท้ายบท + Daily Quiz 7 วัน + Badges 3 อัน + Helper functions (getTrackById, getUnitById, getLessonById) |
| `supabase.ts` | Supabase Client: เชื่อมต่อ Database + Auth helpers (signInWithGoogle, signOut, getSession) + Database helpers (getUserProfile, saveLessonProgress, saveDailyQuizResult, getLeaderboard, addUserXP) + Schema documentation |

---

## 🔄 ระบบ Progress & Level ทำงานอย่างไร

### การคิด % ความคืบหน้า

```
หลักสูตร (Track)
├── บทที่ 1 (Unit) → % = เฉลี่ยของ Lesson ทั้งหมดใน Unit
│   ├── บทย่อย 1.1 (Lesson) → 0% หรือ 100%
│   ├── บทย่อย 1.2 (Lesson) → 0% หรือ 100%
│   └── บทย่อย 1.3 (Lesson) → 0% หรือ 100%
├── บทที่ 2 (Unit) → ...
└── บทที่ 3 (Unit) → ...

Track % = จำนวน Lesson ที่เสร็จ / จำนวน Lesson ทั้งหมดใน Track × 100
```

**ตัวอย่าง:** หลักสูตร A มี 3 บท (Unit) แต่ละบทมี 3 บทย่อย (Lesson) = 9 Lesson ทั้งหมด
- ถ้าจบ 3 Lesson → Track = 33%
- ถ้าจบ 9 Lesson → Track = 100% → ได้รับ Badge 🏅

### ระบบ Lock/Unlock

```
Lesson 1.1 → in_progress (เมื่อกดเข้าหลักสูตร)
Lesson 1.2 → locked (ต้อง Lesson 1.1 เสร็จก่อน)
Lesson 1.3 → locked (ต้อง Lesson 1.2 เสร็จก่อน)
Unit 2 → locked (ต้องทุก Lesson ใน Unit 1 เสร็จก่อน)
```

- **เงื่อนไข Unlock:** ทำ Quiz ท้ายบทย่อยถูก → Lesson = completed → ปลดล็อกบทถัดไป
- **ถ้าตอบผิด:** สามารถตอบใหม่ได้เรื่อยๆ จนกว่าจะถูก

### ระบบ Level & XP

```
Level = floor(sqrt(XP / 100)) + 1

XP 0     → Level 1
XP 100   → Level 2
XP 400   → Level 3
XP 900   → Level 4
XP 1600  → Level 5
```

**แหล่ง XP:**
- ทำ Daily Quiz ถูก → ได้ XP (ลดตามลำดับ: คนแรก 100, คนที่ 10 = 99)
- จบ Lesson → (เตรียมรองรับในอนาคต)

### ระบบ Badge

- ได้รับเมื่อจบหลักสูตร 100% (ทุก Lesson ผ่านหมด)
- 3 Badge: 🏅 นักอิเล็กทรอนิกส์, 🎖️ ช่างไฟฟ้าบ้าน, 🏆 วิศวกรไฟฟ้ากำลัง

---

## 🚀 วิธีการ Run & Deploy

### Development (รันบนเครื่อง)

```bash
# 1. ติดตั้ง Dependencies
npm install

# 2. สร้างไฟล์ .env.local (ดูตัวอย่างจาก .env.local.example)
cp .env.local.example .env.local

# 3. รัน Development Server
npm run dev

# 4. เปิด Browser ไปที่
# http://localhost:3000
```

### Production Build (ทดสอบ Build)

```bash
npm run build    # สร้าง Production Build
npm start        # รัน Production Server
```

### Deploy ขึ้น Vercel (เชื่อม GitHub)

```
1. Push โค้ดขึ้น GitHub Repository
   git init
   git add .
   git commit -m "Initial commit: FAIFA v1.0"
   git remote add origin https://github.com/<username>/faifa.git
   git push -u origin main

2. ไปที่ https://vercel.com
   - Import Repository จาก GitHub
   - Framework: Next.js (จะตรวจจับอัตโนมัติ)

3. ตั้งค่า Environment Variables ใน Vercel Dashboard
   NEXT_PUBLIC_SUPABASE_URL = https://baslcifbsndmkeaerome.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_publishable_7JuqTUGDB7k_qiNnKnobcw_7bJ9uMD3

4. กด Deploy

5. ตั้งค่า OAuth Redirect URL ใน Supabase Dashboard
   - ไปที่ Authentication > URL Configuration
   - เพิ่ม Redirect URL: https://<your-vercel-domain>/main
```

### ตั้งค่า Google OAuth ใน Supabase

```
1. ไปที่ Supabase Dashboard > Authentication > Providers
2. เปิด Google Provider
3. ตั้งค่า:
   - Client ID: (จาก Google Cloud Console)
   - Client Secret: (จาก Google Cloud Console)
4. ไปที่ Google Cloud Console > Credentials
   - สร้าง OAuth 2.0 Client
   - Authorized redirect URIs: 
     https://baslcifbsndmkeaerome.supabase.co/auth/v1/callback
```

---

## 📊 สรุป Mock Data ที่มี

| หมวด | จำนวน | รายละเอียด |
|------|-------|------------|
| หลักสูตร (Track) | 3 | อิเล็กทรอนิกส์, ไฟฟ้า, วิศวกรรมระบบ |
| บทเรียน (Unit) | 9 | 3 บทต่อหลักสูตร |
| บทย่อย (Lesson) | 27 | 3 บทย่อยต่อบท (มี Quiz ทุกบท) |
| Daily Quiz | 7 วัน | คำถามตั้งแต่ 6-12 ก.ค. 2026 |
| Badges | 3 | 1 ต่อหลักสูตรที่จบ 100% |
| ระดับความยาก | 5 | ง่ายมากๆ → ปีศาจ |

---

## 💡 หมายเหตุสำหรับ Developer

1. **Comment ทุกไฟล์เป็นภาษาไทย** — อ่านเข้าใจง่าย ตรงตามข้อกำหนด
2. **ไม่มีมุมฉาก** — ใช้ `rounded-xl` หรือ `rounded-2xl` เสมอ
3. **Responsive Design** — ทุกหน้ารองรับ Mobile/Tablet/Desktop
4. **ไม่มี "เส้นทางการเรียนรู้" ใน Sidebar** — ตามที่กำหนดไว้
5. **Skill Matrix** — อยู่แค่หน้าหลัก (Dashboard) ตามที่กำหนด
6. **เมื่อเชื่อม Supabase จริง** — แก้ไขที่ `context/AuthContext.tsx` ให้เรียก functions จาก `lib/supabase.ts` แทน Mock

---

*สร้างโดย AI Assistant — Project Structure พร้อมสำหรับ `npm run dev` อย่างสมบูรณ์ ✅*
