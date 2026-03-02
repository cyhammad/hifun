import React from "react";
import { HeroLogo, BadgeSparkles } from "./LandingIcons";
import Image from "next/image";
import Link from "next/link";

// Floating decorative icons (cash, trophy, star) – no border/box
const StickerWrapper = ({ children, rotate, delay = "0s", className = "" }) => (
  <div className={`absolute flex items-center justify-center ${className}`} style={{ transform: `rotate(${rotate})` }}>
    <div className="animate-float flex items-center justify-center" style={{ animationDelay: delay }}>
      {children}
    </div>
  </div>
);
const CashSticker = ({ className = "" }) => (
  <StickerWrapper rotate="-8deg" className={className}>
    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 md:w-12 md:h-12" stroke="#FFB300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  </StickerWrapper>
);
const TrophySticker = ({ className = "" }) => (
  <StickerWrapper rotate="6deg" delay="0.5s" className={className}>
    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 md:w-12 md:h-12" stroke="#7B5EED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4z" />
      <path d="M7 4V2h10v2M7 8a5 5 0 0 0 10 0" />
      <path d="M12 8v4M9 12h6" />
      <path d="M6 12H4a2 2 0 0 1-2-2V8h2v2a2 2 0 0 0 2 2zM18 12h2a2 2 0 0 0 2-2V8h-2v2a2 2 0 0 1-2 2z" />
    </svg>
  </StickerWrapper>
);
// const StarSticker = ({ className = "" }) => (
//   <StickerWrapper rotate="-5deg" delay="1s" className={className}>
//     <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 md:w-11 md:h-11" stroke="#FFB300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M12 2l3 7h7l-5.5 4 2 7-6.5-4.5L5.5 20l2-7L2 9h7l3-7z" />
//     </svg>
//   </StickerWrapper>
// );

const HeroSection = () => {
  return (
    <div className="min-h-[600px] md:min-h-[800px] w-full h-full flex flex-col items-center justify-center relative overflow-hidden text-white">
      {/* Stickers */}
      <CashSticker className="top-[18%] left-[8%] md:left-[12%]" />
      <TrophySticker className="top-[22%] right-[6%] md:right-[10%]" />
      {/* <StarSticker className="bottom-[32%] left-[5%] md:left-[8%]" /> */}
      <CashSticker className="bottom-[28%] right-[7%] md:right-[12%]" />
      {/* Background/Glow Effects */}
      <Image
        src="/main-bg.svg"
        width={1900}
        height={900}
        alt="Main Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center relative z-10 w-full h-full pt-28 md:pt-[107px]">
        {/* Logo */}
        <div className="mb-8 md:mb-14">
          <Image src="/logo.png" width={250} height={58} alt="Logo" className="w-40 md:w-72 h-auto" />
        </div>

        {/* Badge */}
        <div className="mb-8">
          <div className="inline-flex h-[38px] w-fit items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1D21] border border-white/5 shadow-2xl backdrop-blur-sm">
            <BadgeSparkles />

            <span className="text-sm text-white font-extralight font-inter">
              Challenge-based social app
            </span>
          </div>
        </div>

        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-semibold mb-8 font-roboto">
            <span className="text-white block">Join Us</span>
            <span className="bg-[linear-gradient(97.93deg,#FFB300_0%,#7B5EED_100%)] text-transparent bg-clip-text">
              Complete Challenges
            </span>
            <span className="text-white block mt-2">Get Cash</span>
          </h2>

          <p className="font-inter text-lg md:text-xl text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
            HiFun is a social app where you can explore challenges, participate
            with others, and share your results.
          </p>
        </div>
        <div className="flex gap-8 md:gap-10 pt-20 md:pt-24 items-center">
          <Link
            href="https://apps.apple.com/us/app/hi-fun/id6743761192"
            target="_blank"
            className="animate-store-flicker block transition-transform hover:scale-110 active:scale-95"
            style={{ animationDelay: "0s" }}
          >
            <Image
              src="/apple.png"
              width={200}
              height={64}
              alt="App Store"
              className="w-[150px] md:w-[200px] h-auto object-contain"
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
              width={200}
              height={64}
              alt="Google Play"
              className="w-[150px] md:w-[200px] h-auto object-contain"
            />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
