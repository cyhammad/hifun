"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const SignInPage = () => {
  const router = useRouter();

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

      <div className="relative z-10 w-full max-w-[440px]">
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
          {/* Heading */}
          <h1 className="text-[40px] font-bold text-[#FFFFFF] mb-8 text-center">
            Sign In
          </h1>

          <h2 className="text-[24px] font-normal mb-4 text-left text-[#FAFAFA]">
            Enter your details
          </h2>

          <form className="flex flex-col gap-2">
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[#717171] text-[15px]">Email</label>
              <input
                type="email"
                placeholder="Enter"
                className="w-full h-[50px] bg-[#404040] rounded-[10px] px-5 py-4 text-white placeholder:text-[#999DA0] focus:ring-1 focus:ring-[#8F00FF] outline-none text-[15px]"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[#717171] text-[15px]">Password</label>
              <input
                type="password"
                placeholder="Enter"
                className="w-full h-[50px] bg-[#404040] rounded-[10px] px-5 py-4 text-white placeholder:text-[#999DA0] focus:ring-1 focus:ring-[#8F00FF] outline-none text-[15px]"
              />
            </div>

            {/* Forgot Password Link */}
            <Link
              href="/admin/forget-password"
              style={{ fontFamily: "var(--font-bricolage)" }}
              className="text-[#FFBD1D] pl-[14px] mt-1 font-medium text-[14px] hover:text-[#8b2ef0] transition-colors"
            >
              Forgot Password?
            </Link>

            {/* Continue Button */}
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="w-full mt-9 bg-[#582BB3] hover:bg-[#8b2ef0] text-white font-normal text-[16px] py-4 rounded-[8px] transition-all shadow-[0_4px_14px_0_rgba(157,40,240,0.39)] hover:shadow-[0_6px_20px_rgba(157,40,240,0.23)] active:scale-[0.98]"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
