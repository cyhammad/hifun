"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Mail, ArrowLeft } from "lucide-react";

const ForgetPasswordPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        if (!email) {
            setError("Please enter your email address");
            setLoading(false);
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess("Password reset link sent to your email!");
            // Optional: redirect after some time
            setTimeout(() => router.push("/admin/sign-in"), 3000);
        } catch (err) {
            console.error("Reset password error:", err);
            const message =
                err.code === "auth/user-not-found"
                    ? "No account found with this email"
                    : err.code === "auth/invalid-email"
                        ? "Invalid email format"
                        : "Failed to send reset link. Please try again.";
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

                {/* Content Structure */}
                <div className="w-full">
                    <h1 className="text-[40px] font-bold text-[#FFFFFF] mt-10 mb-2 text-center font-sans">
                        Forgot Password
                    </h1>

                    <h2 className="text-[24px] font-normal mb-8 text-left text-[#FAFAFA] font-sans">
                        Enter your email to recover
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        {error && (
                            <p className="text-[#FF4B4B] text-[14px] bg-white/10 rounded-[8px] px-4 py-2 mb-2">
                                {error}
                            </p>
                        )}
                        {success && (
                            <p className="text-green-400 text-[14px] bg-white/10 rounded-[8px] px-4 py-2 mb-2">
                                {success}
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
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-[50px] bg-[#404040] rounded-[10px] pl-11 pr-5 py-4 text-white placeholder:text-[#999DA0] focus:ring-1 focus:ring-[#8F00FF] outline-none text-[15px] transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-9 bg-[#582BB3] hover:bg-[#8b2ef0] disabled:opacity-70 disabled:cursor-not-allowed text-white font-normal text-[16px] py-4 rounded-[8px] transition-all shadow-[0_4px_14px_0_rgba(157,40,240,0.39)] hover:shadow-[0_6px_20px_rgba(157,40,240,0.23)] active:scale-[0.98]"
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>

                        <Link
                            href="/admin/sign-in"
                            className="flex items-center justify-center gap-2 mt-6 text-[#999DA0] hover:text-white transition-colors"
                        >
                            <ArrowLeft size={16} />
                            <span className="text-[14px]">Back to Sign In</span>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordPage;
