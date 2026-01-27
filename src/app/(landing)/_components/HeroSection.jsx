import React from "react";
import { HeroLogo, BadgeSparkles } from "./LandingIcons";

const HeroSection = () => {
  return (
    <>
      {/* Background/Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-[#6C5DD3] opacity-[0.15] blur-[140px] rounded-full pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center relative z-10 w-full">
        {/* Logo */}
        <div className="mb-15 md:mb-28">
          <HeroLogo />
        </div>

        {/* Badge */}
        <div className="mb-8">
          <div className="inline-flex h-fit w-fit items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1D21] border border-white/5 shadow-2xl backdrop-blur-sm">
            <BadgeSparkles />

            <span className="text-[14px] text-white font-extralight font-[family-name:var(--font-inter)]">
              Challenge-based social app
            </span>
          </div>
        </div>

        <div className="container mx-auto max-w-5xl">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold mb-8 font-[family-name:var(--font-roboto)]">
            <span className="text-white block">Discover. Join.</span>
            <span className="bg-[linear-gradient(97.93deg,#FFB300_0%,#7B5EED_100%)] text-transparent bg-clip-text">
              Complete Challenges.
            </span>
          </h2>

          <p className="font-[family-name:var(--font-inter)] text-lg md:text-xl text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
            HiFun is a social app where you can explore challenges, participate
            with others, and share your results.
          </p>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
