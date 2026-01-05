import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { LearningPath } from "@/components/home/LearningPath";
import { SafetyBanner } from "@/components/home/SafetyBanner";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <LearningPath />
        <SafetyBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
