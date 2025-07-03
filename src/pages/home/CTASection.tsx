import { ArrowRight, Library } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold text-lg shadow-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-xl"
            >
              <Library className="h-5 w-5" />
              <span>Browse Collection</span>
            </Link>
            <Link
              to="/borrow-summary"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-all duration-200"
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
