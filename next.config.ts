import type { NextConfig } from "next";

/** การตั้งค่า Next.js สำหรับโปรเจกต์ FAIFA */
const nextConfig: NextConfig = {
  /* รองรับรูปจาก Supabase Storage และ Google Avatar */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
