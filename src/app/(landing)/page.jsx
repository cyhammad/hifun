import HeroSection from "./_components/HeroSection";
import FeaturesSection from "./_components/FeaturesSection";
import FAQSection from "./_components/FAQSection";
import Footer from "./_components/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full bg-[#0C0E12]">
      <HeroSection />
      <FeaturesSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
