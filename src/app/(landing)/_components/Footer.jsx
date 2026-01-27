import React from "react";
import { HeroLogo, BadgeSparkles } from "./LandingIcons";
import Image from "next/image";

const Footer = () => {
    return (
        <div className="h-screen min-h-[604px] w-full h-full flex flex-col items-center justify-center relative overflow-hidden text-white">
            {/* Background/Glow Effects */}
            <Image src="/footer-bg.svg" width={1900} height={604} alt="Main Background" className="absolute top-0 left-0 w-full h-full object-cover" />
            <div className="flex flex-col items-center gap-8 justify-center text-center z-10">
                <HeroLogo />
                <h2 className="text-4xl md:text-5xl xl:text-[72px] font-bold font-[family-name:var(--font-roboto)]">
                    <span className="text-white block mb-2">Ready to accept</span>
                    <span className="bg-gradient-to-br from-[#BB877B] from-50% to-[#7B5EED] text-transparent bg-clip-text">
                        the challenge?
                    </span>
                </h2>
            </div>

        </div>
    );
};

export default Footer;
