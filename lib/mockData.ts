/**
 * Mock Data สำหรับ FAIFA — Prompt C Update
 * - หลักสูตร (Tracks) พร้อม Quiz ท้ายบทย่อยทุกบท
 * - Daily Quiz Questions — คลังข้อสอบตัวอย่าง
 * - Badges — โครงสร้างเหรียญตรา
 * - Helper functions สำหรับค้นหาข้อมูล
 */

import type { Track, DailyQuiz, Badge, Unit, Lesson, LessonQuizQuestion } from "./types";

/* ============================================================
   Quiz ท้ายบทย่อย — แต่ละ Lesson มี 1 Quiz
   ตอบถูกถึงจะผ่านบทย่อยนั้น (completed)
   ============================================================ */

/* ===== Quiz สำหรับหลักสูตร อิเล็กทรอนิกส์ ===== */
const quizE_U1_L1: LessonQuizQuestion = {
  id: "quiz-e-u1-l1", question: "หน่วยของแรงดันไฟฟ้าคือข้อใด?",
  options: ["แอมแปร์ (A)", "โวลต์ (V)", "โอห์ม (Ω)", "วัตต์ (W)"],
  correctIndex: 1, explanation: "แรงดันไฟฟ้า (Voltage) มีหน่วยเป็น โวลต์ (V)"
};
const quizE_U1_L2: LessonQuizQuestion = {
  id: "quiz-e-u1-l2", question: "กฎของโอห์มคือสมการใด?",
  options: ["P = IV", "V = IR", "I = V × R", "R = I/V"],
  correctIndex: 1, explanation: "กฎของโอห์ม: V = I × R (แรงดัน = กระแส × ความต้านทาน)"
};
const quizE_U1_L3: LessonQuizQuestion = {
  id: "quiz-e-u1-l3", question: "มัลติมิเตอร์ใช้วัดค่าอะไรได้บ้าง?",
  options: ["แรงดัน, กระแส, ความต้านทาน", "อุณหภูมิ, ความชื้น, แสง", "ความดัน, ปริมาตร, มวล", "ความเร็ว, ความเร่ง, แรง"],
  correctIndex: 0, explanation: "มัลติมิเตอร์วัดได้ทั้ง แรงดัน (V), กระแส (A) และความต้านทาน (Ω)"
};
const quizE_U2_L1: LessonQuizQuestion = {
  id: "quiz-e-u2-l1", question: "ตัวต้านทาน 4 แถบสี น้ำตาล-ดำ-แดง-ทอง มีค่ากี่โอห์ม?",
  options: ["100 Ω", "1,000 Ω", "10,000 Ω", "10 Ω"],
  correctIndex: 1, explanation: "น้ำตาล=1, ดำ=0, แดง=×100 → 10×100 = 1,000 Ω (1kΩ), ทอง=±5%"
};
const quizE_U2_L2: LessonQuizQuestion = {
  id: "quiz-e-u2-l2", question: "ตัวเก็บประจุ (Capacitor) เก็บพลังงานในรูปแบบใด?",
  options: ["สนามแม่เหล็ก", "สนามไฟฟ้า", "ความร้อน", "พลังงานจลน์"],
  correctIndex: 1, explanation: "Capacitor เก็บพลังงานในรูปสนามไฟฟ้า (Electric Field)"
};
const quizE_U2_L3: LessonQuizQuestion = {
  id: "quiz-e-u2-l3", question: "ไดโอด (Diode) ยอมให้กระแสไหลผ่านอย่างไร?",
  options: ["ไหลได้ทั้งสองทิศทาง", "ไหลได้ทิศทางเดียว", "ไม่ให้ไหลเลย", "ขึ้นอยู่กับอุณหภูมิ"],
  correctIndex: 1, explanation: "ไดโอดยอมให้กระแสไหลได้ทิศทางเดียว จาก Anode ไป Cathode"
};
const quizE_U3_L1: LessonQuizQuestion = {
  id: "quiz-e-u3-l1", question: "ทรานซิสเตอร์ BJT มีกี่ขา?",
  options: ["2 ขา", "3 ขา", "4 ขา", "5 ขา"],
  correctIndex: 1, explanation: "BJT มี 3 ขา คือ Base (B), Collector (C), Emitter (E)"
};
const quizE_U3_L2: LessonQuizQuestion = {
  id: "quiz-e-u3-l2", question: "วงจรขยายสัญญาณ (Amplifier) ทำหน้าที่อะไร?",
  options: ["ลดแรงดัน", "เพิ่มความแรงของสัญญาณ", "เก็บประจุ", "กรองสัญญาณรบกวน"],
  correctIndex: 1, explanation: "วงจรขยายสัญญาณทำหน้าที่เพิ่มความแรง (Gain) ของสัญญาณอินพุต"
};
const quizE_U3_L3: LessonQuizQuestion = {
  id: "quiz-e-u3-l3", question: "IC 555 นิยมใช้ทำอะไร?",
  options: ["ขยายเสียง", "สร้างสัญญาณพัลส์/ตั้งเวลา", "แปลงไฟ AC เป็น DC", "วัดอุณหภูมิ"],
  correctIndex: 1, explanation: "IC 555 ใช้สร้างสัญญาณพัลส์ (Astable), ตั้งเวลา (Monostable) และ Flip-Flop (Bistable)"
};

/* ===== Quiz สำหรับหลักสูตร ไฟฟ้าภายในบ้าน ===== */
const quizH_U1_L1: LessonQuizQuestion = {
  id: "quiz-h-u1-l1", question: "แรงดันไฟฟ้ามาตรฐานในบ้านเรือนไทยคือเท่าไร?",
  options: ["110V", "220V", "380V", "440V"],
  correctIndex: 1, explanation: "ไฟฟ้าในบ้านเรือนของไทยใช้แรงดัน 220V ความถี่ 50Hz"
};
const quizH_U1_L2: LessonQuizQuestion = {
  id: "quiz-h-u1-l2", question: "สายไฟ THW ขนาด 2.5 sq.mm. รองรับกระแสสูงสุดประมาณกี่แอมแปร์?",
  options: ["10A", "15A", "20A", "25A"],
  correctIndex: 2, explanation: "สาย THW 2.5 sq.mm. รองรับกระแสได้ประมาณ 20A (ตามมาตรฐาน วสท.)"
};
const quizH_U1_L3: LessonQuizQuestion = {
  id: "quiz-h-u1-l3", question: "เต้ารับแบบมีสายดิน (Ground) มีกี่ช่อง?",
  options: ["2 ช่อง", "3 ช่อง", "4 ช่อง", "5 ช่อง"],
  correctIndex: 1, explanation: "เต้ารับแบบมีสายดินมี 3 ช่อง คือ Line, Neutral และ Ground"
};
const quizH_U2_L1: LessonQuizQuestion = {
  id: "quiz-h-u2-l1", question: "สวิตช์ 2 ทาง (2-way switch) ใช้ทำอะไร?",
  options: ["ควบคุมไฟจากจุดเดียว", "ควบคุมไฟจาก 2 จุด", "ควบคุมพัดลม", "ตัดไฟฉุกเฉิน"],
  correctIndex: 1, explanation: "สวิตช์ 2 ทางใช้ควบคุมไฟจาก 2 จุดที่ต่างกัน เช่น ต้นบันไดและปลายบันได"
};
const quizH_U2_L2: LessonQuizQuestion = {
  id: "quiz-h-u2-l2", question: "เบรกเกอร์ (Circuit Breaker) ทำหน้าที่อะไร?",
  options: ["เพิ่มแรงดัน", "ตัดวงจรเมื่อกระแสเกิน", "แปลงไฟ AC เป็น DC", "ลดความถี่"],
  correctIndex: 1, explanation: "เบรกเกอร์ตัดวงจรอัตโนมัติเมื่อกระแสเกินค่าที่กำหนด เพื่อป้องกันอันตราย"
};
const quizH_U2_L3: LessonQuizQuestion = {
  id: "quiz-h-u2-l3", question: "สายดิน (Ground) มีสีอะไรตามมาตรฐาน?",
  options: ["แดง", "น้ำเงิน", "เขียว-เหลือง", "ดำ"],
  correctIndex: 2, explanation: "สายดินตามมาตรฐาน IEC ใช้สีเขียว-เหลือง (Green-Yellow)"
};
const quizH_U3_L1: LessonQuizQuestion = {
  id: "quiz-h-u3-l1", question: "ท่อร้อยสายไฟสีเหลืองใช้สำหรับงานประเภทใด?",
  options: ["ฝังผนัง/ฝังดิน", "เดินลอย", "กลางแจ้ง", "ใต้น้ำ"],
  correctIndex: 0, explanation: "ท่อสีเหลือง (PVC) ใช้สำหรับงานฝังผนังหรือฝังดิน"
};
const quizH_U3_L2: LessonQuizQuestion = {
  id: "quiz-h-u3-l2", question: "ถ้าเบรกเกอร์ตัดบ่อย ควรทำอย่างไรก่อน?",
  options: ["เพิ่มขนาดเบรกเกอร์ทันที", "ตรวจสอบโหลดที่ใช้งาน", "เปลี่ยนสายไฟ", "ถอดเบรกเกอร์ออก"],
  correctIndex: 1, explanation: "ควรตรวจสอบโหลด (เครื่องใช้ไฟฟ้า) ที่ใช้งานว่าเกินพิกัดหรือไม่ ก่อนแก้ไข"
};
const quizH_U3_L3: LessonQuizQuestion = {
  id: "quiz-h-u3-l3", question: "ถ้ามีคนถูกไฟดูด สิ่งแรกที่ต้องทำคืออะไร?",
  options: ["จับตัวผู้ถูกดูดดึงออก", "ตัดไฟที่เบรกเกอร์/ถอดปลั๊ก", "ราดน้ำ", "โทรเรียกรถพยาบาลทันที"],
  correctIndex: 1, explanation: "สิ่งแรกที่ต้องทำคือตัดแหล่งจ่ายไฟ (เบรกเกอร์/ถอดปลั๊ก) ก่อน ห้ามจับตัวผู้ถูกดูดโดยตรง"
};

/* ===== Quiz สำหรับหลักสูตร วิศวกรรมระบบไฟฟ้า ===== */
const quizP_U1_L1: LessonQuizQuestion = {
  id: "quiz-p-u1-l1", question: "ไฟฟ้ากระแสสลับ (AC) ในประเทศไทยมีความถี่เท่าไร?",
  options: ["50 Hz", "60 Hz", "100 Hz", "120 Hz"],
  correctIndex: 0, explanation: "ประเทศไทยใช้ไฟฟ้า AC ความถี่ 50 Hz"
};
const quizP_U1_L2: LessonQuizQuestion = {
  id: "quiz-p-u1-l2", question: "ระบบไฟฟ้า 3 เฟส แบบ Star มีแรงดันระหว่างเฟสกับนิวทรอลเท่าไร (กรณีแรงดันไลน์ 380V)?",
  options: ["110V", "220V", "380V", "440V"],
  correctIndex: 1, explanation: "ระบบ Star: V_phase = V_line / √3 = 380 / 1.732 ≈ 220V"
};
const quizP_U1_L3: LessonQuizQuestion = {
  id: "quiz-p-u1-l3", question: "Power Factor (ตัวประกอบกำลัง) ค่าที่ดีที่สุดคือเท่าไร?",
  options: ["0", "0.5", "0.8", "1.0"],
  correctIndex: 3, explanation: "Power Factor = 1.0 หมายความว่ากำลังไฟฟ้าถูกใช้อย่างมีประสิทธิภาพ 100%"
};
const quizP_U2_L1: LessonQuizQuestion = {
  id: "quiz-p-u2-l1", question: "หม้อแปลงไฟฟ้าทำงานบนหลักการใด?",
  options: ["แรงคูลอมบ์", "การเหนี่ยวนำแม่เหล็กไฟฟ้า", "ปรากฏการณ์โฟโตอิเล็กทริก", "กฎของเทอร์โมไดนามิกส์"],
  correctIndex: 1, explanation: "หม้อแปลงทำงานบนหลักการเหนี่ยวนำแม่เหล็กไฟฟ้า (Electromagnetic Induction) ของฟาราเดย์"
};
const quizP_U2_L2: LessonQuizQuestion = {
  id: "quiz-p-u2-l2", question: "มอเตอร์เหนี่ยวนำ (Induction Motor) หมุนด้วยความเร็วแบบใด?",
  options: ["เท่ากับความเร็วซิงโครนัส", "มากกว่าความเร็วซิงโครนัส", "น้อยกว่าความเร็วซิงโครนัส", "ไม่เกี่ยวกับความเร็วซิงโครนัส"],
  correctIndex: 2, explanation: "มอเตอร์เหนี่ยวนำหมุนด้วยความเร็วน้อยกว่าความเร็วซิงโครนัส (มี Slip)"
};
const quizP_U2_L3: LessonQuizQuestion = {
  id: "quiz-p-u2-l3", question: "เครื่องกำเนิดไฟฟ้า (Generator) แปลงพลังงานรูปแบบใดเป็นไฟฟ้า?",
  options: ["พลังงานความร้อน", "พลังงานกล", "พลังงานเคมี", "พลังงานนิวเคลียร์"],
  correctIndex: 1, explanation: "Generator แปลงพลังงานกล (Mechanical Energy) เป็นพลังงานไฟฟ้า"
};
const quizP_U3_L1: LessonQuizQuestion = {
  id: "quiz-p-u3-l1", question: "ระบบส่งไฟฟ้าแรงสูงของไทยใช้แรงดันกี่ kV?",
  options: ["22 kV", "115 kV", "230 kV / 500 kV", "1,000 kV"],
  correctIndex: 2, explanation: "ระบบส่งไฟฟ้าของ กฟผ. ใช้แรงดัน 230 kV และ 500 kV"
};
const quizP_U3_L2: LessonQuizQuestion = {
  id: "quiz-p-u3-l2", question: "สถานีไฟฟ้าย่อย (Substation) ทำหน้าที่หลักอะไร?",
  options: ["ผลิตไฟฟ้า", "แปลงแรงดันและจ่ายไฟ", "เก็บพลังงาน", "ผลิตก๊าซธรรมชาติ"],
  correctIndex: 1, explanation: "Substation ทำหน้าที่แปลงแรงดัน (Step Up/Down) และจ่ายไฟฟ้าไปยังพื้นที่ต่างๆ"
};
const quizP_U3_L3: LessonQuizQuestion = {
  id: "quiz-p-u3-l3", question: "Solar Cell แปลงพลังงานอะไรเป็นไฟฟ้า?",
  options: ["ความร้อน", "แสงอาทิตย์", "ลม", "คลื่นน้ำ"],
  correctIndex: 1, explanation: "Solar Cell ใช้ปรากฏการณ์โฟโตโวลตาอิก (Photovoltaic) แปลงแสงอาทิตย์เป็นไฟฟ้า"
};


/* ============================================================
   บทย่อย (Lessons) — พร้อม Quiz ท้ายบท
   ============================================================ */

/* ===== Lessons สำหรับ อิเล็กทรอนิกส์ ===== */
const electronicsUnit1Lessons: Lesson[] = [
  { id: "e-u1-l1", unitId: "e-u1", title: "หน่วยวัดพื้นฐาน", content: "ปริมาณทางไฟฟ้าต่างๆ เช่น โวลต์ (V) ใช้วัดแรงดันไฟฟ้า, แอมแปร์ (A) ใช้วัดกระแสไฟฟ้า, โอห์ม (Ω) ใช้วัดความต้านทาน และวัตต์ (W) ใช้วัดกำลังไฟฟ้า\n\nหน่วยเหล่านี้เป็นพื้นฐานสำคัญในวงจรไฟฟ้าทุกชนิด การเข้าใจความหมายและความสัมพันธ์จะช่วยให้สามารถวิเคราะห์และออกแบบวงจรได้", order: 1, difficulty: 1, status: "locked", quiz: quizE_U1_L1 },
  { id: "e-u1-l2", unitId: "e-u1", title: "กฎของโอห์ม", content: "กฎของโอห์ม (Ohm's Law) อธิบายความสัมพันธ์ระหว่าง 3 ปริมาณสำคัญ:\n\n**V = I × R**\n\nโดยที่ V = แรงดันไฟฟ้า (โวลต์), I = กระแสไฟฟ้า (แอมแปร์), R = ความต้านทาน (โอห์ม)\n\nเมื่อทราบค่าสองตัว สามารถคำนวณหาตัวที่สามได้เสมอ กฎนี้เป็นพื้นฐานที่ใช้ในการวิเคราะห์วงจรไฟฟ้าทุกรูปแบบ", order: 2, difficulty: 1, status: "locked", quiz: quizE_U1_L2 },
  { id: "e-u1-l3", unitId: "e-u1", title: "การใช้งานมัลติมิเตอร์", content: "มัลติมิเตอร์ (Multimeter) เป็นเครื่องมือวัดที่สำคัญที่สุดสำหรับช่างไฟฟ้า สามารถวัดได้ทั้ง:\n\n- แรงดันไฟฟ้า (Voltage)\n- กระแสไฟฟ้า (Current)\n- ความต้านทาน (Resistance)\n\nมีทั้งแบบอนาล็อก (เข็ม) และดิจิตอล โดยดิจิตอลนิยมใช้มากกว่าเนื่องจากอ่านค่าง่ายและแม่นยำกว่า", order: 3, difficulty: 2, status: "locked", quiz: quizE_U1_L3 },
];
const electronicsUnit2Lessons: Lesson[] = [
  { id: "e-u2-l1", unitId: "e-u2", title: "ตัวต้านทาน", content: "ตัวต้านทาน (Resistor) เป็นอุปกรณ์ที่ใช้จำกัดกระแสไฟฟ้าในวงจร\n\nการอ่านค่าจากแถบสี:\n- แถบที่ 1, 2: ตัวเลขนัยสำคัญ\n- แถบที่ 3: ตัวคูณ\n- แถบที่ 4: ค่าความคลาดเคลื่อน\n\nตัวอย่าง: น้ำตาล-ดำ-แดง-ทอง = 1,000 Ω ±5%\n\nการต่อวงจร: อนุกรม (R รวมเพิ่ม) / ขนาน (R รวมลด)", order: 1, difficulty: 2, status: "locked", quiz: quizE_U2_L1 },
  { id: "e-u2-l2", unitId: "e-u2", title: "ตัวเก็บประจุ", content: "ตัวเก็บประจุ (Capacitor) เก็บพลังงานในรูปสนามไฟฟ้า\n\nชนิดที่พบบ่อย:\n- Ceramic Capacitor: ขนาดเล็ก ค่าต่ำ ไม่มีขั้ว\n- Electrolytic Capacitor: ค่าสูง มีขั้ว (+/-)\n- Film Capacitor: เสถียรภาพสูง\n\nการชาร์จ-ดิสชาร์จ: เมื่อต่อไฟจะชาร์จจนเต็ม เมื่อถอดไฟจะคายประจุออก ค่าคงที่เวลา τ = RC", order: 2, difficulty: 2, status: "locked", quiz: quizE_U2_L2 },
  { id: "e-u2-l3", unitId: "e-u2", title: "ไดโอดและ LED", content: "ไดโอด (Diode) ทำจากสารกึ่งตัวนำ ยอมให้กระแสไหลทางเดียว\n\nหลักการ:\n- Forward Bias: กระแสไหลผ่าน (Anode → Cathode)\n- Reverse Bias: กระแสไม่ไหล\n\nLED (Light Emitting Diode) คือไดโอดที่เปล่งแสงเมื่อมีกระแสไหลผ่าน ต้องต่อตัวต้านทานจำกัดกระแสเสมอ", order: 3, difficulty: 3, status: "locked", quiz: quizE_U2_L3 },
];
const electronicsUnit3Lessons: Lesson[] = [
  { id: "e-u3-l1", unitId: "e-u3", title: "ทรานซิสเตอร์ BJT", content: "ทรานซิสเตอร์ BJT (Bipolar Junction Transistor) มี 3 ขา:\n- Base (B): ขาควบคุม\n- Collector (C): ขารับกระแส\n- Emitter (E): ขาปล่อยกระแส\n\nมี 2 ชนิด: NPN (กระแสไหลเข้า Collector) และ PNP (กระแสไหลเข้า Emitter)\n\nใช้เป็นสวิตช์อิเล็กทรอนิกส์หรือตัวขยายสัญญาณ", order: 1, difficulty: 3, status: "locked", quiz: quizE_U3_L1 },
  { id: "e-u3-l2", unitId: "e-u3", title: "วงจรขยายสัญญาณ", content: "วงจรขยายสัญญาณ (Amplifier) ใช้ทรานซิสเตอร์ขยายสัญญาณอ่อนๆ ให้แรงขึ้น\n\nตัวอย่าง: วงจรขยายเสียง Common Emitter\n- สัญญาณเข้าทาง Base → สัญญาณออกทาง Collector\n- Gain = Vout / Vin\n\nการออกแบบต้องคำนึงถึง Bias Point, Gain และ Bandwidth", order: 2, difficulty: 4, status: "locked", quiz: quizE_U3_L2 },
  { id: "e-u3-l3", unitId: "e-u3", title: "IC เบื้องต้น", content: "IC (Integrated Circuit) คือวงจรรวมที่บรรจุทรานซิสเตอร์จำนวนมากในชิปเดียว\n\nIC 555 เป็น IC ที่นิยมมากที่สุด มี 3 โหมดการทำงาน:\n1. Astable: สร้างสัญญาณพัลส์ต่อเนื่อง\n2. Monostable: สร้างพัลส์ครั้งเดียว (Timer)\n3. Bistable: ทำงานเหมือน Flip-Flop\n\nใช้ในวงจร LED กระพริบ, นาฬิกา, เสียงบี๊ป", order: 3, difficulty: 4, status: "locked", quiz: quizE_U3_L3 },
];

/* ===== Lessons สำหรับ ไฟฟ้าภายในบ้าน ===== */
const homeUnit1Lessons: Lesson[] = [
  { id: "h-u1-l1", unitId: "h-u1", title: "ระบบไฟฟ้าในบ้าน", content: "ระบบไฟฟ้าภายในบ้านประกอบด้วย:\n\n1. มิเตอร์ไฟฟ้า (จาก กฟน./กฟภ.)\n2. ตู้คอนซูเมอร์ (Consumer Unit) — เบรกเกอร์หลัก + เบรกเกอร์ย่อย\n3. สายไฟฟ้า (วงจรย่อย)\n4. อุปกรณ์ปลายทาง (เต้ารับ, สวิตช์, โคมไฟ)\n\nแรงดันไฟฟ้ามาตรฐาน: 220V AC, 50Hz", order: 1, difficulty: 1, status: "locked", quiz: quizH_U1_L1 },
  { id: "h-u1-l2", unitId: "h-u1", title: "สายไฟและขนาด", content: "สายไฟที่ใช้ในบ้านมีหลายชนิด:\n\n- **THW**: สายเดี่ยวหุ้มฉนวน PVC ใช้ร้อยท่อ\n- **VAF**: สายแบนมีเปลือก ใช้เดินลอย\n- **VCT**: สายอ่อนหลายแกน ใช้กับเครื่องใช้ไฟฟ้า\n\nการเลือกขนาด: ขึ้นอยู่กับกระแสที่ต้องใช้\n- 1.5 sq.mm. → 15A (แสงสว่าง)\n- 2.5 sq.mm. → 20A (เต้ารับทั่วไป)\n- 4.0 sq.mm. → 25A (แอร์, เครื่องทำน้ำอุ่น)", order: 2, difficulty: 1, status: "locked", quiz: quizH_U1_L2 },
  { id: "h-u1-l3", unitId: "h-u1", title: "เต้ารับและปลั๊กไฟ", content: "เต้ารับมาตรฐานในประเทศไทย:\n\n- **แบบ 2 ช่อง**: มีเฉพาะ Line และ Neutral (ไม่ปลอดภัย)\n- **แบบ 3 ช่อง**: มี Line, Neutral และ Ground (ปลอดภัยกว่า)\n\nข้อควรระวัง:\n- ติดตั้งสูงจากพื้นอย่างน้อย 30 ซม.\n- ห้องน้ำต้องใช้เต้ารับกันน้ำ (IP44 ขึ้นไป)\n- ไม่ควรเสียบปลั๊กหลายอันจนเกินพิกัด", order: 3, difficulty: 2, status: "locked", quiz: quizH_U1_L3 },
];
const homeUnit2Lessons: Lesson[] = [
  { id: "h-u2-l1", unitId: "h-u2", title: "สวิตช์ไฟฟ้า", content: "สวิตช์ไฟฟ้ามีหลายชนิด:\n\n- **สวิตช์ทางเดียว (1-way)**: เปิด-ปิดจากจุดเดียว\n- **สวิตช์ 2 ทาง (2-way)**: ควบคุมจาก 2 จุด เช่น บันได\n- **Dimmer Switch**: ปรับความสว่าง\n\nการเดินสาย 2 ทาง:\n- ใช้สวิตช์ 2 ตัว ต่อสาย Traveler 2 เส้นระหว่างกัน", order: 1, difficulty: 2, status: "locked", quiz: quizH_U2_L1 },
  { id: "h-u2-l2", unitId: "h-u2", title: "เบรกเกอร์และฟิวส์", content: "อุปกรณ์ป้องกันกระแสเกิน:\n\n**เบรกเกอร์ (Circuit Breaker)**:\n- MCB: ป้องกันกระแสเกิน/ลัดวงจร\n- RCBO/RCD: ป้องกันไฟรั่ว\n\nการเลือกขนาด:\n- แสงสว่าง: 10-16A\n- เต้ารับ: 16-20A\n- แอร์: 20-32A\n\n**ห้ามใช้เบรกเกอร์ใหญ่เกินไป** จะไม่ตัดวงจรเมื่อเกิดปัญหา", order: 2, difficulty: 2, status: "locked", quiz: quizH_U2_L2 },
  { id: "h-u2-l3", unitId: "h-u2", title: "ระบบกราวด์", content: "ระบบสายดิน (Ground/Earth) สำคัญมากเพื่อความปลอดภัย:\n\n**หลักการ**: ต่อสายจากเปลือกโลหะเครื่องใช้ไฟฟ้าลงดิน\n→ ถ้ามีไฟรั่ว กระแสจะไหลลงดินแทนที่จะผ่านร่างกายคน\n\n**การติดตั้ง**:\n- ตอกหลักดินทองแดงลงดินลึกอย่างน้อย 2.4 ม.\n- ค่าความต้านทานดินไม่เกิน 5 Ω\n- ต้องต่อร่วมกับ RCD/RCBO", order: 3, difficulty: 3, status: "locked", quiz: quizH_U2_L3 },
];
const homeUnit3Lessons: Lesson[] = [
  { id: "h-u3-l1", unitId: "h-u3", title: "การเดินสายไฟ", content: "เทคนิคการเดินสายไฟในบ้าน:\n\n**การเดินร้อยท่อ (Conduit)**:\n- ท่อ PVC สีเหลือง: ฝังผนัง/ฝังดิน\n- ท่อ PVC สีขาว: เดินลอย\n- ท่อโลหะ (EMT): งานหนัก\n\n**ข้อควรระวัง**:\n- สายไฟในท่อต้องไม่เกิน 40% ของพื้นที่ท่อ\n- ห้ามใช้สายไฟต่อกลางท่อ\n- จุดต่อต้องอยู่ในกล่องต่อสาย (Junction Box)", order: 1, difficulty: 3, status: "locked", quiz: quizH_U3_L1 },
  { id: "h-u3-l2", unitId: "h-u3", title: "การตรวจสอบระบบไฟฟ้า", content: "วิธีตรวจหาจุดบกพร่อง:\n\n1. **ตรวจแรงดัน**: วัดที่เต้ารับ ต้องได้ 220V ±10%\n2. **ตรวจสายดิน**: วัดค่าระหว่าง Ground กับ Neutral ต้องใกล้ 0V\n3. **ตรวจฉนวน**: ใช้ Megger วัดค่า ≥ 1 MΩ\n4. **ตรวจเบรกเกอร์**: กด Test ที่ RCD ต้องตัดภายใน 30ms\n\n**ปัญหาที่พบบ่อย**: ไฟตก, ไฟกระพริบ, เบรกเกอร์ตัดบ่อย", order: 2, difficulty: 3, status: "locked", quiz: quizH_U3_L2 },
  { id: "h-u3-l3", unitId: "h-u3", title: "ความปลอดภัยทางไฟฟ้า", content: "กฎความปลอดภัยทางไฟฟ้า:\n\n**ก่อนทำงาน**:\n- ตัดไฟที่เบรกเกอร์เสมอ\n- ใช้มัลติมิเตอร์ตรวจว่าไม่มีไฟ\n- ใช้เครื่องมือที่หุ้มฉนวน\n\n**การปฐมพยาบาล**:\n1. ตัดแหล่งจ่ายไฟ (ห้ามจับตัวผู้ถูกดูดโดยตรง)\n2. เรียกรถพยาบาล 1669\n3. ถ้าหยุดหายใจ ทำ CPR ทันที\n\n**ข้อห้าม**: ห้ามใช้น้ำดับไฟที่เกิดจากไฟฟ้า", order: 3, difficulty: 2, status: "locked", quiz: quizH_U3_L3 },
];

/* ===== Lessons สำหรับ วิศวกรรมระบบไฟฟ้า ===== */
const powerUnit1Lessons: Lesson[] = [
  { id: "p-u1-l1", unitId: "p-u1", title: "ไฟฟ้ากระแสสลับ", content: "ไฟฟ้ากระแสสลับ (Alternating Current — AC):\n\nสัญญาณไฟฟ้าที่เปลี่ยนทิศทางอย่างสม่ำเสมอ เป็นรูปคลื่นไซน์ (Sine Wave)\n\n**ค่าสำคัญ**:\n- ความถี่ (Frequency): 50 Hz ในไทย\n- แอมพลิจูด (Amplitude): ค่ายอด Vpeak\n- ค่า RMS: Vrms = Vpeak / √2 ≈ 0.707 × Vpeak\n- เฟส (Phase): มุมเริ่มต้นของคลื่น", order: 1, difficulty: 2, status: "locked", quiz: quizP_U1_L1 },
  { id: "p-u1-l2", unitId: "p-u1", title: "ระบบ 3 เฟส", content: "ระบบไฟฟ้า 3 เฟส (Three-Phase) มีข้อดีกว่า 1 เฟส:\n\n- ส่งกำลังได้มากกว่า (√3 เท่า)\n- มอเตอร์หมุนได้เอง ไม่ต้องมี Starting Capacitor\n\n**การต่อ**:\n- Star (Y): VLine = √3 × VPhase, ILine = IPhase\n- Delta (Δ): VLine = VPhase, ILine = √3 × IPhase\n\nในไทย: VLine = 380V, VPhase = 220V", order: 2, difficulty: 3, status: "locked", quiz: quizP_U1_L2 },
  { id: "p-u1-l3", unitId: "p-u1", title: "กำลังไฟฟ้า", content: "กำลังไฟฟ้าในระบบ AC:\n\n- **Active Power (P)**: กำลังจริงที่ทำงาน หน่วย วัตต์ (W)\n- **Reactive Power (Q)**: กำลังรีแอคทีฟ หน่วย VAR\n- **Apparent Power (S)**: กำลังปรากฏ หน่วย VA\n\nความสัมพันธ์: S² = P² + Q²\n\n**Power Factor (PF)**: cosφ = P/S\n- PF = 1.0 → ดีที่สุด (โหลด Resistive)\n- PF ต่ำ → สิ้นเปลือง ต้องชดเชยด้วย Capacitor Bank", order: 3, difficulty: 3, status: "locked", quiz: quizP_U1_L3 },
];
const powerUnit2Lessons: Lesson[] = [
  { id: "p-u2-l1", unitId: "p-u2", title: "หม้อแปลงไฟฟ้า", content: "หม้อแปลงไฟฟ้า (Transformer):\n\nทำงานบนหลักการเหนี่ยวนำแม่เหล็กไฟฟ้า (Faraday's Law)\n\n**สูตร**: V1/V2 = N1/N2\n- N1 = จำนวนรอบขดลวดปฐมภูมิ\n- N2 = จำนวนรอบขดลวดทุติยภูมิ\n\n**ชนิด**:\n- Step Up: เพิ่มแรงดัน (ส่งไกล)\n- Step Down: ลดแรงดัน (ใช้งาน)\n\nประสิทธิภาพ: 95-99%", order: 1, difficulty: 3, status: "locked", quiz: quizP_U2_L1 },
  { id: "p-u2-l2", unitId: "p-u2", title: "มอเตอร์ไฟฟ้า", content: "มอเตอร์ไฟฟ้า แปลงพลังงานไฟฟ้าเป็นพลังงานกล:\n\n**มอเตอร์ DC**:\n- ควบคุมความเร็วง่าย\n- ใช้ใน EV, หุ่นยนต์\n\n**มอเตอร์เหนี่ยวนำ AC (Induction Motor)**:\n- นิยมมากที่สุดในอุตสาหกรรม\n- โครงสร้างแข็งแรง บำรุงรักษาง่าย\n- มี Slip = (Ns - Nr) / Ns × 100%\n  - Ns = ความเร็วซิงโครนัส\n  - Nr = ความเร็วรอบจริง", order: 2, difficulty: 4, status: "locked", quiz: quizP_U2_L2 },
  { id: "p-u2-l3", unitId: "p-u2", title: "เจนเนอเรเตอร์", content: "เครื่องกำเนิดไฟฟ้า (Generator):\n\nแปลงพลังงานกล → ไฟฟ้า (ตรงข้ามกับมอเตอร์)\n\n**หลักการ**: หมุนขดลวดในสนามแม่เหล็ก → เกิดแรงเคลื่อนไฟฟ้า (EMF)\n\n**ชนิด**:\n- AC Generator (Alternator): ผลิตไฟ AC ใช้ในโรงไฟฟ้า\n- DC Generator: ผลิตไฟ DC ใช้ในบางอุตสาหกรรม\n\n**ความเร็วรอบ**: N = 120f / P\n- f = ความถี่, P = จำนวนขั้วแม่เหล็ก", order: 3, difficulty: 4, status: "locked", quiz: quizP_U2_L3 },
];
const powerUnit3Lessons: Lesson[] = [
  { id: "p-u3-l1", unitId: "p-u3", title: "ระบบส่งจ่ายไฟฟ้า", content: "โครงสร้างระบบไฟฟ้าของประเทศไทย:\n\n1. **โรงไฟฟ้า** → ผลิตไฟฟ้า (11-22 kV)\n2. **สถานี Step Up** → เพิ่มแรงดัน (230/500 kV)\n3. **สายส่งแรงสูง** → ส่งระยะไกล\n4. **สถานี Step Down** → ลดแรงดัน (22-33 kV)\n5. **สายจำหน่าย** → จ่ายไฟให้ชุมชน\n6. **หม้อแปลงจำหน่าย** → ลดลง 220/380V\n7. **ผู้ใช้ไฟฟ้า**\n\n**ทำไมต้องส่งแรงดันสูง?** เพื่อลดการสูญเสียกำลัง (Ploss = I²R)", order: 1, difficulty: 4, status: "locked", quiz: quizP_U3_L1 },
  { id: "p-u3-l2", unitId: "p-u3", title: "สถานีไฟฟ้าย่อย", content: "สถานีไฟฟ้าย่อย (Substation):\n\n**องค์ประกอบหลัก**:\n- หม้อแปลงกำลัง (Power Transformer)\n- เบรกเกอร์แรงสูง (Circuit Breaker)\n- ดิสคอนเนกต์สวิตช์ (Disconnecting Switch)\n- CT/PT (Current/Potential Transformer)\n- ระบบป้องกันและควบคุม\n- ระบบสายดิน\n\n**ชนิด**:\n- สถานีกลางแจ้ง (Air Insulated — AIS)\n- สถานีก๊าซ (Gas Insulated — GIS) — ใช้ SF₆", order: 2, difficulty: 5, status: "locked", quiz: quizP_U3_L2 },
  { id: "p-u3-l3", unitId: "p-u3", title: "พลังงานทดแทน", content: "พลังงานทดแทนในระบบไฟฟ้า:\n\n**Solar (พลังงานแสงอาทิตย์)**:\n- Solar Cell → Inverter → Grid\n- ประสิทธิภาพ ~20%\n- ผลิตได้เฉพาะกลางวัน\n\n**Wind (พลังงานลม)**:\n- กังหันลม → Generator → Grid\n- เหมาะกับพื้นที่ลมแรงสม่ำเสมอ\n\n**Battery Storage**:\n- Lithium-ion Battery\n- เก็บพลังงานส่วนเกิน ใช้ตอนที่ต้องการ\n- ช่วยรักษาเสถียรภาพของระบบ", order: 3, difficulty: 4, status: "locked", quiz: quizP_U3_L3 },
];


/* ============================================================
   หลักสูตร (Track Definitions) พร้อม Unit/Lesson
   ============================================================ */
export const TRACKS: Track[] = [
  {
    id: "electronics",
    title: "อิเล็กทรอนิกส์",
    description: "เชี่ยวชาญอุปกรณ์อิเล็กทรอนิกส์ อุปกรณ์การวัดตลอดจนถึงการออกแบบแผงวงจรพิมพ์เป็นของตัวเอง",
    icon: "🔌",
    color: "#3B82F6",
    progress: 0,
    units: [
      { id: "e-u1", trackId: "electronics", title: "ประวัติความเป็นมาของอิเล็กทรอนิกส์", description: "ความหมาย พัฒนาการ และบทบาทของอิเล็กทรอนิกส์", order: 1, duration: 70, lessonsCount: 3, labCount: 1, quizCount: 3, difficulty: 1, lessons: electronicsUnit1Lessons, status: "locked" },
      { id: "e-u2", trackId: "electronics", title: "เครื่องมือวัดพื้นฐาน", description: "การใช้งานมัลติมิเตอร์ หน่วยวัด และกฎของโอห์ม", order: 2, duration: 60, lessonsCount: 3, labCount: 2, quizCount: 3, difficulty: 2, lessons: electronicsUnit2Lessons, status: "locked" },
      { id: "e-u3", trackId: "electronics", title: "อุปกรณ์อิเล็กทรอนิกส์พื้นฐาน", description: "เบรดบอร์ด สายไฟ แบตเตอรี่ ตัวต้านทาน สวิตช์ และอื่นๆ", order: 3, duration: 330, lessonsCount: 3, labCount: 3, quizCount: 3, difficulty: 4, lessons: electronicsUnit3Lessons, status: "locked" },
    ],
  },
  {
    id: "home-electrical",
    title: "ไฟฟ้า",
    description: "เจาะลึกระบบไฟฟ้า แม่เหล็กไฟฟ้า การควบคุมมอเตอร์ และโครงสร้างพื้นฐานระบบส่งกำลังไฟฟ้าแรงสูง",
    icon: "⚡",
    color: "#F59E0B",
    progress: 0,
    units: [
      { id: "h-u1", trackId: "home-electrical", title: "พื้นฐานไฟฟ้าในบ้าน", description: "โครงสร้างระบบไฟฟ้าภายในบ้าน", order: 1, duration: 45, lessonsCount: 3, labCount: 1, quizCount: 3, difficulty: 1, lessons: homeUnit1Lessons, status: "locked" },
      { id: "h-u2", trackId: "home-electrical", title: "อุปกรณ์ป้องกัน", description: "เบรกเกอร์ ฟิวส์ และระบบกราวด์", order: 2, duration: 50, lessonsCount: 3, labCount: 2, quizCount: 3, difficulty: 2, lessons: homeUnit2Lessons, status: "locked" },
      { id: "h-u3", trackId: "home-electrical", title: "การเดินสายไฟ", description: "เทคนิคการเดินสายและความปลอดภัย", order: 3, duration: 60, lessonsCount: 3, labCount: 1, quizCount: 3, difficulty: 3, lessons: homeUnit3Lessons, status: "locked" },
    ],
  },
  {
    id: "power-systems",
    title: "วิศวกรรมระบบ",
    description: "ทฤษฎีการควบคุมเครื่องจักร การประสานเครื่องจักรไฟฟ้า และจัดการระบบพลังงาน",
    icon: "⚙️",
    color: "#10B981",
    progress: 0,
    units: [
      { id: "p-u1", trackId: "power-systems", title: "ไฟฟ้ากระแสสลับ", description: "หลักการ AC ระบบ 3 เฟส กำลังไฟฟ้า", order: 1, duration: 90, lessonsCount: 3, labCount: 2, quizCount: 3, difficulty: 3, lessons: powerUnit1Lessons, status: "locked" },
      { id: "p-u2", trackId: "power-systems", title: "เครื่องจักรไฟฟ้า", description: "หม้อแปลง มอเตอร์ เจนเนอเรเตอร์", order: 2, duration: 120, lessonsCount: 3, labCount: 3, quizCount: 3, difficulty: 4, lessons: powerUnit2Lessons, status: "locked" },
      { id: "p-u3", trackId: "power-systems", title: "ระบบจ่ายไฟฟ้า", description: "ระบบส่ง สถานีย่อย พลังงานทดแทน", order: 3, duration: 100, lessonsCount: 3, labCount: 1, quizCount: 3, difficulty: 5, lessons: powerUnit3Lessons, status: "locked" },
    ],
  },
];


/* ============================================================
   Helper Functions — ค้นหาข้อมูลจาก ID
   ============================================================ */

/** ค้นหา Track จาก trackId */
export function getTrackById(trackId: string): Track | undefined {
  return TRACKS.find((t) => t.id === trackId);
}

/** ค้นหา Unit จาก unitId (ค้นหาทุก Track) */
export function getUnitById(unitId: string): { unit: Unit; track: Track } | undefined {
  for (const track of TRACKS) {
    const unit = track.units.find((u) => u.id === unitId);
    if (unit) return { unit, track };
  }
  return undefined;
}

/** ค้นหา Lesson จาก lessonId (ค้นหาทุก Track > Unit) */
export function getLessonById(lessonId: string): { lesson: Lesson; unit: Unit; track: Track } | undefined {
  for (const track of TRACKS) {
    for (const unit of track.units) {
      const lesson = unit.lessons.find((l) => l.id === lessonId);
      if (lesson) return { lesson, unit, track };
    }
  }
  return undefined;
}


/* ============================================================
   เหรียญตราที่สามารถได้รับ
   ============================================================ */
export const AVAILABLE_BADGES: Badge[] = [
  { id: "badge-electronics", title: "นักอิเล็กทรอนิกส์", icon: "🏅", trackId: "electronics", earnedAt: null },
  { id: "badge-home-electrical", title: "ช่างไฟฟ้าบ้าน", icon: "🎖️", trackId: "home-electrical", earnedAt: null },
  { id: "badge-power-systems", title: "วิศวกรไฟฟ้ากำลัง", icon: "🏆", trackId: "power-systems", earnedAt: null },
];


/* ============================================================
   คลังคำถาม Daily Quiz
   ============================================================ */
export const QUIZ_BANK: DailyQuiz[] = [
  {
    date: "2026-07-12",
    question: { id: "q-2026-07-12", question: "กฎของโอห์ม (Ohm's Law) คือข้อใด?", options: ["V = IR", "P = IV", "V = I/R", "R = VI"], correctIndex: 0, explanation: "กฎของโอห์ม: แรงดัน (V) = กระแส (I) × ความต้านทาน (R)" },
  },
  {
    date: "2026-07-11",
    question: { id: "q-2026-07-11", question: "หน่วยของกำลังไฟฟ้าคือข้อใด?", options: ["โวลต์ (V)", "วัตต์ (W)", "แอมแปร์ (A)", "โอห์ม (Ω)"], correctIndex: 1, explanation: "กำลังไฟฟ้ามีหน่วยเป็นวัตต์ (Watt, W) โดย P = IV" },
  },
  {
    date: "2026-07-10",
    question: { id: "q-2026-07-10", question: "ตัวต้านทาน (Resistor) มีหน้าที่อะไร?", options: ["เก็บประจุไฟฟ้า", "จำกัดกระแสไฟฟ้า", "เพิ่มแรงดันไฟฟ้า", "แปลงไฟ AC เป็น DC"], correctIndex: 1, explanation: "ตัวต้านทานทำหน้าที่จำกัดกระแสไฟฟ้าที่ไหลผ่านวงจร" },
  },
  {
    date: "2026-07-09",
    question: { id: "q-2026-07-09", question: "ไดโอด (Diode) ยอมให้กระแสไหลผ่านอย่างไร?", options: ["ไหลได้ทั้งสองทิศทาง", "ไหลได้ทิศทางเดียว", "ไม่ให้ไหลผ่านเลย", "ขึ้นอยู่กับอุณหภูมิ"], correctIndex: 1, explanation: "ไดโอดยอมให้กระแสไหลได้ทิศทางเดียว จาก Anode ไป Cathode" },
  },
  {
    date: "2026-07-08",
    question: { id: "q-2026-07-08", question: "ตัวเก็บประจุ (Capacitor) เก็บพลังงานในรูปแบบใด?", options: ["สนามแม่เหล็ก", "สนามไฟฟ้า", "ความร้อน", "พลังงานจลน์"], correctIndex: 1, explanation: "Capacitor เก็บพลังงานในรูปสนามไฟฟ้า (Electric Field) ระหว่างแผ่นตัวนำ" },
  },
  {
    date: "2026-07-07",
    question: { id: "q-2026-07-07", question: "เบรกเกอร์ (Circuit Breaker) ทำหน้าที่อะไร?", options: ["เพิ่มแรงดันไฟฟ้า", "ตัดวงจรเมื่อกระแสเกิน", "แปลงไฟฟ้า AC เป็น DC", "ลดความถี่ไฟฟ้า"], correctIndex: 1, explanation: "เบรกเกอร์ทำหน้าที่ตัดวงจรอัตโนมัติเมื่อกระแสไฟฟ้าเกินค่าที่กำหนด เพื่อป้องกันอันตราย" },
  },
  {
    date: "2026-07-06",
    question: { id: "q-2026-07-06", question: "ทรานซิสเตอร์ (Transistor) ใช้ทำอะไรเป็นหลัก?", options: ["เก็บข้อมูล", "ขยายสัญญาณหรือสวิตช์", "แปลงพลังงาน", "วัดอุณหภูมิ"], correctIndex: 1, explanation: "ทรานซิสเตอร์ใช้เป็นตัวขยายสัญญาณ (Amplifier) และสวิตช์อิเล็กทรอนิกส์" },
  },
];

/** ดึง Quiz ของวันที่ระบุ — ถ้าไม่มีในคลัง ให้ generate จากวันที่ */
export function getQuizForDate(date: string): DailyQuiz {
  const found = QUIZ_BANK.find((q) => q.date === date);
  if (found) return found;

  // Fallback: สร้างคำถามง่ายๆ สำหรับวันที่ไม่มีในคลัง
  return {
    date,
    question: {
      id: `q-${date}`,
      question: "แรงดันไฟฟ้าในบ้านเรือนมาตรฐานของประเทศไทยคือเท่าไร?",
      options: ["110V", "220V", "380V", "440V"],
      correctIndex: 1,
      explanation: "ไฟฟ้าในบ้านเรือนของประเทศไทยใช้แรงดัน 220V ความถี่ 50Hz",
    },
  };
}

/** คำนวณ XP จากลำดับการตอบ: คนแรก 100, คนที่ 2 = 99, ..., ขั้นต่ำ 1 XP */
export function calculateQuizXP(answerOrder: number): number {
  return Math.max(1, 101 - answerOrder);
}
