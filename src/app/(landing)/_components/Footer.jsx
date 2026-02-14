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
      <div className="flex flex-col items-center gap-6 md:gap-8 justify-center text-center z-10 px-6 -mt-20">
        <HeroLogo />
        <h2 className="text-3xl md:text-5xl xl:text-[72px] font-bold font-[family-name:var(--font-roboto)]">
          <span className="text-white block mb-2">Ready to accept</span>
          <span className="bg-gradient-to-br from-[#BB877B] from-50% to-[#7B5EED] text-transparent bg-clip-text">
            the challenge?
          </span>
        </h2>

        <div className="flex flex-col items-center gap-6 mt-4">
          <p className="text-[#8F96A3] text-lg font-light font-[family-name:var(--font-inter)]">
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
