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
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="container mx-auto px-3 sm:px-0">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent">
            Why Choose <span className="text-purple-600">LibraryHub</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the perfect blend of traditional library values and
            modern technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const gradients = [
              "from-blue-500 to-indigo-600",
              "from-purple-500 to-pink-600",
              "from-emerald-500 to-teal-600",
              "from-orange-500 to-red-600",
            ];
            const gradient = gradients[index % gradients.length];

            return (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:scale-105"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${gradient} text-white rounded-2xl mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
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
