import React from "react";
import { HeroLogo, BadgeSparkles } from "./LandingIcons";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="h-screen min-h-[500px] md:min-h-[604px] w-full h-full flex flex-col items-center justify-center relative overflow-hidden text-white">
      {/* Background/Glow Effects */}
      <Image
        src="/footer-bg.svg"
        width={1900}
        height={604}
        alt="Main Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="flex flex-col items-center gap-8 justify-center text-center z-10 px-6">
        <HeroLogo />
        <h2 className="text-3xl md:text-5xl xl:text-[72px] font-bold font-[family-name:var(--font-roboto)]">
          <span className="text-white block mb-2">Ready to accept</span>
          <span className="bg-gradient-to-br from-[#BB877B] from-50% to-[#7B5EED] text-transparent bg-clip-text">
            the challenge?
          </span>
        </h2>
      </div>

      {/* Bottom Footer Bar */}
      <div className="absolute bottom-0 w-full z-20 px-6 py-6 border-t border-[#2B303B4D] flex flex-col-reverse md:flex-row items-center justify-between gap-4 md:gap-0 bg-transparent">
        <p className="text-[#8F96A3] text-sm font-[family-name:var(--font-inter)]">
          © 2026 HiFun. All rights reserved.
        </p>
        <div className="flex items-center gap-8">
          <Link
            href="#"
            className="text-[#8F96A3] hover:text-white text-sm font-[family-name:var(--font-inter)] transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-[#8F96A3] hover:text-white text-sm font-[family-name:var(--font-inter)] transition-colors"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-[#8F96A3] hover:text-white text-sm font-[family-name:var(--font-inter)] transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
