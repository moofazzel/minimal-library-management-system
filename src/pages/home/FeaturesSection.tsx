import { Award, Globe, Search, Shield } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description:
        "Find any book instantly with our advanced search and filtering system.",
    },
    {
      icon: Shield,
      title: "Secure Borrowing",
      description:
        "Safe and secure book borrowing with automatic due date tracking.",
    },
    {
      icon: Globe,
      title: "Global Access",
      description:
        "Access your library from anywhere, anytime with our digital platform.",
    },
    {
      icon: Award,
      title: "Curated Collections",
      description:
        "Expertly curated collections across all genres and interests.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold tracking-tight">
            Why Choose <span className="text-primary">LibraryHub</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect blend of traditional library values and
            modern technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 bg-card rounded-xl border hover:border-primary/50 transition-all duration-200 hover:shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
