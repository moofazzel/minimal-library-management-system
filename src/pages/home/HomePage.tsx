import BenefitsSection from "./BenefitsSection";
import CTASection from "./CTASection";
import CategoriesSection from "./CategoriesSection";
import ContactSection from "./ContactSection";
import FeaturedBooksSection from "./FeaturedBooksSection";
import FeaturesSection from "./FeaturesSection";
import FooterCTA from "./FooterCTA";
import HeroSection from "./HeroSection";
import LatestBooks from "./LatestBooks";
import StatsSection from "./StatsSection";
import TestimonialsSection from "./TestimonialsSection";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturedBooksSection />
      <CategoriesSection />
      <LatestBooks />
      <FeaturesSection />
      <TestimonialsSection />
      <BenefitsSection />
      <CTASection />
      <ContactSection />
      <FooterCTA />
    </div>
  );
};

export default HomePage;
