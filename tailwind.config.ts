import type { Config } from "tailwindcss";

/**
 * การตั้งค่า Tailwind CSS สำหรับ FAIFA
 * - Dark mode แบบ class (สลับผ่าน next-themes)
 * - สีพื้นฐาน: Cream (#FDFBF7) สำหรับ Light / Dark (#162233) สำหรับ Dark
 * - สี Primary: Blue palette
 * - สี Accent: Gold (สำหรับ highlight), Green (สำหรับผ่านด่าน)
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      /* สีพื้นฐานของแอป */
      colors: {
        cream: {
          DEFAULT: "#FDFBF7",
          50: "#FEFEFE",
          100: "#FDFBF7",
          200: "#F8F4EB",
          300: "#F0E8D8",
          400: "#E5D9C3",
        },
        dark: {
          DEFAULT: "#162233",
          50: "#2a3a4e",
          100: "#243346",
          200: "#1e2c3e",
          300: "#162233",
          400: "#111b29",
          500: "#0d1520",
          600: "#090f17",
        },
        primary: {
          DEFAULT: "#2563EB",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        accent: {
          gold: {
            DEFAULT: "#F59E0B",
            50: "#FFFBEB",
            100: "#FEF3C7",
            200: "#FDE68A",
            300: "#FCD34D",
            400: "#FBBF24",
            500: "#F59E0B",
            600: "#D97706",
          },
          green: {
            DEFAULT: "#10B981",
            50: "#ECFDF5",
            100: "#D1FAE5",
            200: "#A7F3D0",
            300: "#6EE7B7",
            400: "#34D399",
            500: "#10B981",
            600: "#059669",
          },
        },
      },
      /* Font Sarabun */
      fontFamily: {
        sarabun: ["var(--font-sarabun)", "sans-serif"],
      },
      /* Border radius ที่ใช้บ่อย */
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      /* Animation สำหรับ UI */
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(37, 99, 235, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(37, 99, 235, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
