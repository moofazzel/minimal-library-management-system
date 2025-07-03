import { BookOpen, CheckCircle, Play } from "lucide-react";
import { Link } from "react-router-dom";

const BenefitsSection = () => {
  const benefits = [
    "No registration fees or hidden costs",
    "Access to premium and rare book collections",
    "Personalized reading recommendations",
    "Mobile app for on-the-go reading",
    "Integration with popular e-readers",
    "Community features and book discussions",
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-3 sm:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-800 to-emerald-600 bg-clip-text text-transparent">
                Everything You Need for{" "}
                <span className="text-emerald-600">Reading Success</span>
              </h2>
              <p className="text-xl text-gray-600">
                Our comprehensive platform provides all the tools and resources
                you need to make the most of your reading journey.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-600">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/books"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105"
              >
                Start Reading Today
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-500 text-emerald-600 rounded-xl font-bold hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-105">
                <Play className="h-4 w-4 mr-2" />
                Watch Demo
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Digital Library Card
                    </h3>
                    <p className="text-gray-600">Access anywhere, anytime</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      50K+
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Books Available
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      24/7
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Access
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-medium">
                      Reading Progress
                    </span>
                    <span className="text-sm font-bold text-emerald-600">
                      75%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
