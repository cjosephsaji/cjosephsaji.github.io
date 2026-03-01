import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExpeditionsSection from "@/components/ExpeditionsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import StorytellingSection from "@/components/StorytellingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/ui/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <ExpeditionsSection />
        <WhyChooseUsSection />
        <StorytellingSection />
        <TestimonialsSection />
        <FinalCTASection />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
