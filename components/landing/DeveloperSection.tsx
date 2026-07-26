"use client";

/**
 * DeveloperSection — ส่วน "ผู้พัฒนา FAIFA"
 * แสดงรูปภาพและข้อมูลนักพัฒนาทั้ง 3 คน
 * - นาย ณัฐพัชร (Nut) — UX/UI / แบบทดสอบ / เนื้อหา
 * - นาย อัครวินท์ (Ong) — การพัฒนาเว็บ / เนื้อหา
 * - นาย ออมพณ (Aom) — การพัฒนาเว็บ / เนื้อหา
 */

import Image from "next/image";
import type { Developer } from "@/lib/types";

/** รายชื่อนักพัฒนา */
const DEVELOPERS: Developer[] = [
  {
    name: "นาย ณัฐพัชร์",
    nickname: "Nut",
    role: "UX/UI / แบบทดสอบ / พัฒนาเว็บ",
    imageSrc: "/img/Nut.jpg",
  },
  {
    name: "นาย อัครวินท์",
    nickname: "Ong",
    role: "การพัฒนาเว็บ / เนื้อหา",
    imageSrc: "/img/Ong.jpg",
  },
  {
    name: "นาย ออมพณ",
    nickname: "Aom",
    role: "การพัฒนาเว็บ / เนื้อหา",
    imageSrc: "/img/Aom.jpg",
  },
];

export default function DeveloperSection() {
  return (
    <section id="developers" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* หัวข้อส่วน */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white mb-16">
          ผู้พัฒนา FAIFA
        </h2>

        {/* การ์ดนักพัฒนา 3 คน */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 lg:gap-20">
          {DEVELOPERS.map((dev, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center"
            >
              {/* รูปโปรไฟล์แบบวงกลม */}
              <div className="relative w-32 h-32 lg:w-36 lg:h-36 mb-4 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary-400/50 transition-all duration-300 group-hover:scale-105">
                {/* พื้นหลัง gradient กรณีไม่มีรูป */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-100 to-dark-400" />
                <Image
                  src={dev.imageSrc}
                  alt={`${dev.name} — ${dev.role}`}
                  fill
                  className="object-cover relative z-10"
                  sizes="(max-width: 768px) 128px, 144px"
                  onError={(e) => {
                    /* กรณีโหลดรูปไม่ได้ ซ่อนรูปแล้วแสดง gradient พื้นหลัง */
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* ข้อความชื่อเล่นกรณีไม่มีรูป */}
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <span className="text-3xl font-bold text-white/40">
                    {dev.nickname[0]}
                  </span>
                </div>
              </div>

              {/* ชื่อเล่น */}
              <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
                {dev.nickname}
              </h3>

              {/* บทบาท */}
              <p className="text-sm text-gray-400 mt-1">
                {dev.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
