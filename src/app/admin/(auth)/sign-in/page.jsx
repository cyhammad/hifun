"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Eye, EyeClosed, Mail, Lock } from "lucide-react";

const DEFAULT_EMAIL = "admin@hifun.com";
const DEFAULT_PASSWORD = "password";

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create session");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      const message =
        err.code === "auth/invalid-credential" || err.code === "auth/wrong-password"
          ? "Invalid email or password"
          : err.code === "auth/user-not-found"
            ? "No account found with this email"
            : err.message || "Sign in failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/login.png"
        alt="Background"
        fill
        className="object-cover pointer-events-none -z-10"
        priority
      />

      <div className="relative z-10 w-full max-w-[440px] px-6">
        {/* Logo Section */}
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="HiFun"
            width={185}
            height={78}
            className="w-[185px] select-none h-auto"
          />
        </div>

        {/* Provided Content Structure */}
        <div className="w-full">
          <h1 className="text-[40px] font-bold text-[#FFFFFF] mt-10 mb-2 text-center font-sans">
            Sign In
          </h1>

          <h2 className="text-[24px] font-normal mb-4 text-left text-[#FAFAFA] font-sans">
            Enter your details
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {error && (
              <p className="text-[#FF4B4B] text-[14px] bg-white/10 rounded-[8px] px-4 py-2 mb-2">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-[#717171] text-[15px]">Email</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999DA0]">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="Enter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[50px] bg-[#404040] rounded-[10px] pl-11 pr-5 py-4 text-white placeholder:text-[#999DA0] focus:ring-1 focus:ring-[#8F00FF] outline-none text-[15px] transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#717171] text-[15px]">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999DA0]">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[50px] bg-[#404040] rounded-[10px] pl-11 pr-11 py-4 text-white placeholder:text-[#999DA0] focus:ring-1 focus:ring-[#8F00FF] outline-none text-[15px] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999DA0] hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                </button>
              </div>
            </div>

            <Link
              href="/admin/forget-password"
              style={{ fontFamily: "var(--font-bricolage)" }}
              className="text-[#FFBD1D] pl-[4px] mt-1 font-medium text-[14px] hover:text-[#8b2ef0] transition-colors self-start"
            >
              Forgot Password?
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-9 bg-[#582BB3] hover:bg-[#8b2ef0] disabled:opacity-70 disabled:cursor-not-allowed text-white font-normal text-[16px] py-4 rounded-[8px] transition-all shadow-[0_4px_14px_0_rgba(157,40,240,0.39)] hover:shadow-[0_6px_20px_rgba(157,40,240,0.23)] active:scale-[0.98]"
            >
              {loading ? "Signing in…" : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

