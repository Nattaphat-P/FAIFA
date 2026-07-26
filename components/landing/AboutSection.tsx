"use client";

/**
 * AboutSection — ส่วน "เกี่ยวกับแพลตฟอร์ม"
 * แสดง 3 Feature Cards อธิบายจุดเด่นของ FAIFA
 * - ห้องปฏิบัติการเสมือน
 * - แบบทดสอบประจำวัน
 * - เรียนรู้ได้ทุกที่
 */

/** ข้อมูล Feature Card */
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
}

/** รายการ Feature ทั้ง 3 อัน */
const FEATURES: Feature[] = [
  {
    icon: (
      /* ไอคอน ห้องปฏิบัติการ (Beaker) */
      <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "ห้องปฏิบัติการเสมือน",
    description: "การจำลองระบบไฟฟ้าแบบอินเทอร์แอกทีฟ (แล็ปจำลอง) ทดสอบทฤษฎี และสร้างวงจรในสภาพแวดล้อมเสมือนจริงที่ปลอดภัย",
    iconBgColor: "bg-primary-600/20",
  },
  {
    icon: (
      /* ไอคอน แบบทดสอบ (Question Mark) */
      <svg className="w-6 h-6 text-accent-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
    title: "แบบทดสอบประจำวัน",
    description: "คำถามรายวันประลองปัญญา เพื่อพัฒนาความรู้ของคุณในทุกๆ วัน ด้วยความท้าทายของโจทย์",
    iconBgColor: "bg-accent-gold-500/20",
  },
  {
    icon: (
      /* ไอคอน เรียนรู้ทุกที่ (Globe) */
      <svg className="w-6 h-6 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "เรียนรู้ได้ทุกที่",
    description: "เข้าถึงเนื้อหาเชิงลึกได้ทุกเวลา ปรับให้เหมาะสม เพื่อการเรียนรู้ที่ราบรื่นทั้งบนเดสก์ท็อปและอุปกรณ์มือถือของผู้เรียน",
    iconBgColor: "bg-primary-500/20",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* หัวข้อส่วน */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white mb-16">
          เกี่ยวกับแพลตฟอร์ม
        </h2>

        {/* Feature Cards 3 ใบ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="group p-6 lg:p-8 rounded-2xl border border-white/10 bg-dark-50/50 hover:bg-dark-50 transition-all duration-300 hover:border-primary-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-600/5"
            >
              {/* ไอคอน */}
              <div
                className={`w-12 h-12 ${feature.iconBgColor} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>

              {/* ชื่อ Feature */}
              <h3 className="text-lg font-bold text-white mb-3">
                {feature.title}
              </h3>

              {/* คำอธิบาย */}
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
