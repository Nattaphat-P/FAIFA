"use client";

/**
 * AuthContext — Context สำหรับจัดการสถานะการเข้าสู่ระบบ
 * เชื่อมต่อกับ Supabase Auth จริง (Google OAuth)
 * - ฟัง onAuthStateChange เพื่ออัปเดตสถานะผู้ใช้
 * - แปลง Supabase User → FAIFA User interface
 * - ดึง Session อัตโนมัติเมื่อ mount
 * - รองรับ OAuth Redirect (Google Login → Callback → Session)
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/types";
import {
  supabase,
  signInWithGoogle as supabaseSignIn,
  signOutUser as supabaseSignOut,
  upsertUserProfile,
  calculateLevel,
} from "@/lib/supabase";
import type { Session, User as SupabaseUser } from "@supabase/supabase-js";

/** โครงสร้าง Auth Context */
interface AuthContextType {
  /** ข้อมูลผู้ใช้ปัจจุบัน (null = ยังไม่ได้เข้าสู่ระบบ) */
  user: User | null;
  /** สถานะกำลังโหลด */
  isLoading: boolean;
  /** ฟังก์ชันเข้าสู่ระบบด้วย Google */
  signInWithGoogle: () => Promise<void>;
  /** ฟังก์ชันออกจากระบบ */
  signOut: () => Promise<void>;
}

/** สร้าง Context */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Props สำหรับ AuthProvider */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * แปลง Supabase User → FAIFA User
 * ดึง displayName จาก Google metadata (user_metadata)
 */
function mapSupabaseUser(supabaseUser: SupabaseUser): User {
  const meta = supabaseUser.user_metadata || {};
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || "",
    displayName:
      meta.full_name || meta.name || meta.display_name || supabaseUser.email?.split("@")[0] || "ผู้ใช้",
    avatarUrl: meta.avatar_url || meta.picture || null,
    xp: 0,
    level: 1,
    createdAt: supabaseUser.created_at || new Date().toISOString(),
  };
}

/** Provider สำหรับจัดการ Authentication */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // เริ่มต้น loading เพราะต้องเช็ค session
  const router = useRouter();

  /**
   * บันทึกโปรไฟล์ผู้ใช้ลง Database (ถ้ามี Supabase)
   * ใช้ upsert — สร้างใหม่หรืออัปเดตอัตโนมัติ
   */
  const syncProfileToDatabase = useCallback(async (faifaUser: User) => {
    try {
      await upsertUserProfile({
        id: faifaUser.id,
        email: faifaUser.email,
        display_name: faifaUser.displayName,
        avatar_url: faifaUser.avatarUrl,
      });
    } catch {
      // ถ้าตาราง users ยังไม่ได้สร้างก็ข้ามไป — ไม่ block
      console.warn("⚠️ ไม่สามารถ sync โปรไฟล์ไปยัง Database (อาจยังไม่ได้สร้างตาราง users)");
    }
  }, []);

  /**
   * จัดการเมื่อ Session เปลี่ยนแปลง
   * - SIGNED_IN → แปลง user + set state + sync DB
   * - SIGNED_OUT → clear user
   */
  const handleAuthChange = useCallback(
    async (session: Session | null) => {
      if (session?.user) {
        const faifaUser = mapSupabaseUser(session.user);
        setUser(faifaUser);
        /* sync โปรไฟล์ไปยัง Database (ไม่ block) */
        syncProfileToDatabase(faifaUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    },
    [syncProfileToDatabase]
  );

  /**
   * ฟัง Auth State Change จาก Supabase
   * - เมื่อ mount → ดึง session ปัจจุบัน
   * - ฟัง onAuthStateChange → อัปเดตตามสถานะ
   */
  useEffect(() => {
    /* ดึง session ปัจจุบันเมื่อ mount */
    const initSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        await handleAuthChange(session);
      } catch {
        console.error("❌ ไม่สามารถดึง session ได้");
        setIsLoading(false);
      }
    };

    initSession();

    /* ฟัง Auth State Change */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔐 Auth Event:", event);
      await handleAuthChange(session);

      /* ถ้า SIGNED_IN → redirect ไป dashboard */
      if (event === "SIGNED_IN" && session) {
        router.replace("/main");
      }
      /* ถ้า SIGNED_OUT → redirect ไป landing */
      if (event === "SIGNED_OUT") {
        router.replace("/");
      }
    });

    /* Cleanup — ยกเลิก subscription เมื่อ unmount */
    return () => {
      subscription.unsubscribe();
    };
  }, [handleAuthChange, router]);

  /** ฟังก์ชันเข้าสู่ระบบด้วย Google — เรียก Supabase OAuth */
  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    try {
      await supabaseSignIn();
      /* หลังจากเรียก signInWithOAuth จะ redirect ไป Google
         ไม่ต้อง setUser ตรงนี้ — onAuthStateChange จะจัดการให้ */
    } catch (error) {
      console.error("❌ เข้าสู่ระบบล้มเหลว:", error);
      setIsLoading(false);
    }
  }, []);

  /** ฟังก์ชันออกจากระบบ */
  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await supabaseSignOut();
      setUser(null);
      /* onAuthStateChange จะ redirect ไป landing */
    } catch (error) {
      console.error("❌ ออกจากระบบล้มเหลว:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook สำหรับเข้าถึง Auth Context */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth ต้องใช้ภายใน AuthProvider เท่านั้น");
  }
  return context;
}
