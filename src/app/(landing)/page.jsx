import HeroSection from "./_components/HeroSection";
import FeaturesSection from "./_components/FeaturesSection";
import FAQSection from "./_components/FAQSection";

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-[#0C0E12]">
      <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden text-white">
        <HeroSection />
      </div>
      <FeaturesSection />
      <FAQSection />
    </main>
  );
}
