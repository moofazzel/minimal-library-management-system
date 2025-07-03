import Slider from "../../components/ui/Slider";

const HeroSection = () => {
  // Hero Slider Data
  const heroSlides = [
    {
      id: 1,
      title: "Discover Your Next Great Read",
      subtitle: "Welcome to the Future of Libraries",
      description:
        "Explore our vast collection of books, manage your reading journey, and connect with fellow book lovers.",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop",
      ctaText: "Explore Library",
      ctaLink: "/books",
      overlay: true,
      kenBurns: true,
    },
    {
      id: 2,
      title: "50,000+ Books at Your Fingertips",
      subtitle: "Unlimited Access",
      description:
        "From classic literature to modern bestsellers, find exactly what you're looking for in our extensive collection.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop",
      ctaText: "Browse Collection",
      ctaLink: "/books",
      overlay: true,
      kenBurns: true,
    },
    {
      id: 3,
      title: "Smart Borrowing Made Simple",
      subtitle: "24/7 Digital Access",
      description:
        "Borrow books with ease, track your reading progress, and never miss a due date with our intelligent system.",
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1920&h=1080&fit=crop",
      ctaText: "Start Reading",
      ctaLink: "/borrow-summary",
      overlay: true,
      kenBurns: true,
    },
  ];

  return (
    <section className="relative">
      <Slider
        slides={heroSlides}
        autoPlay={true}
        interval={6000}
        showNavigation={true}
        showPagination={true}
        className="rounded-none"
      />
    </section>
  );
};

export default HeroSection;
