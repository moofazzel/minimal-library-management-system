import { ArrowRight, Library } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
      <div className="container mx-auto px-3 sm:px-0 text-center relative z-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">
              Ready to Start Your Reading Journey?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of readers who have already discovered their next
              favorite book
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/books"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <Library className="h-5 w-5" />
              <span>Browse Collection</span>
            </Link>
            <Link
              to="/borrow-summary"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              <span>View Summary</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
