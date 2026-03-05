import React from "react";
import { HeroLogo, BadgeSparkles } from "./LandingIcons";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="h-screen min-h-[500px] md:min-h-[604px] w-full flex flex-col items-center justify-center relative overflow-hidden text-white">
      {/* Background/Glow Effects */}
      <Image
        src="/footer-bg.svg"
        width={1900}
        height={604}
        alt="Main Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="flex flex-col items-center gap-6 md:gap-8 justify-center text-center z-10 px-6 -mt-20">
        <Image src="/logo.png" width={250} height={58} alt="Logo" className="w-40 md:w-72 h-auto" />
        <h2 className="text-3xl md:text-5xl xl:text-[72px] font-bold font-roboto">
          <span className="text-white block mb-2">Ready to accept</span>
          <span className="bg-linear-to-br from-[#BB877B] from-50% to-[#7B5EED] text-transparent bg-clip-text">
            the challenge?
          </span>
        </h2>

        <div className="flex flex-col items-center gap-6 mt-4">
          <p className="text-[#8F96A3] text-lg font-light font-inter">
            Download the app here:
          </p>
          <div className="flex gap-6 md:gap-8 items-center">
            <Link
              href="https://apps.apple.com/us/app/hi-fun/id6743761192"
              target="_blank"
              className="animate-store-flicker block transition-transform hover:scale-110 active:scale-95"
              style={{ animationDelay: "0s" }}
            >
              <Image
                src="/apple.png"
                width={180}
                height={58}
                alt="App Store"
                className="w-[130px] md:w-[180px] h-auto object-contain"
              />
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.hi.fun"
              target="_blank"
              className="animate-store-flicker block transition-transform hover:scale-110 active:scale-95"
              style={{ animationDelay: "0.4s" }}
            >
              <Image
                src="/google.png"
                width={180}
                height={58}
                alt="Google Play"
                className="w-[130px] md:w-[180px] h-auto object-contain"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="absolute bottom-0 w-full z-20 px-6 py-6 border-t border-[#2B303B4D] flex flex-col-reverse md:flex-row items-center justify-between gap-4 md:gap-0 bg-transparent">
        <p className="text-[#8F96A3] text-sm font-inter">
          © 2026 HiFun. All rights reserved.
        </p>

        {/* Follow Us */}
        <div className="flex items-center gap-2">
          <span className="text-[#8F96A3] text-sm font-inter mr-1">Follow us</span>
          <Link
            href="https://www.instagram.com/hifun_us?igsh=MXhra2t6a3Uzc285Yg%3D%3D&utm_source=qr"
            target="_blank"
            className="group flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-[#E1306C]/50 hover:bg-[#E1306C]/10"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 text-[#8F96A3] transition-colors duration-300 group-hover:text-[#E1306C]"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </Link>
          <Link
            href="https://www.facebook.com/share/187HEYW3am/?mibextid=wwXIfr"
            target="_blank"
            className="group flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110 hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 text-[#8F96A3] transition-colors duration-300 group-hover:text-[#1877F2]"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
            </svg>
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <Link
            href="#"
            className="text-[#8F96A3] hover:text-white text-sm font-inter transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-[#8F96A3] hover:text-white text-sm font-inter transition-colors"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-[#8F96A3] hover:text-white text-sm font-inter transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
