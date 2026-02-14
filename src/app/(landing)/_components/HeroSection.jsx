import React from "react";
import { HeroLogo, BadgeSparkles } from "./LandingIcons";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="min-h-[600px] md:min-h-[900px] w-full h-full flex flex-col items-center justify-center relative overflow-hidden text-white">
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
        <div className="mb-10 md:mb-[113px]">
          <HeroLogo />
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
            <span className="text-white block">Discover. Join.</span>
            <span className="bg-[linear-gradient(97.93deg,#FFB300_0%,#7B5EED_100%)] text-transparent bg-clip-text">
              Complete Challenges.
            </span>
          </h2>

          <p className="font-inter text-lg md:text-xl text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
            HiFun is a social app where you can explore challenges, participate
            with others, and share your results.
          </p>
        </div>
        <div className="flex gap-8 pt-20">
          <Link
            href="https://apps.apple.com/us/app/hi-fun/id6743761192"
            target="_blank"
            className="animate-store-flicker block transition-transform hover:scale-110"
            style={{ animationDelay: "0s" }}
          >
            <Image src="/apple.png" width={150} height={100} alt="App Store" />
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=com.hi.fun"
            target="_blank"
            className="animate-store-flicker block transition-transform hover:scale-110"
            style={{ animationDelay: "0.4s" }}
          >
            <Image src="/google.png" width={150} height={100} alt="Google Play" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
