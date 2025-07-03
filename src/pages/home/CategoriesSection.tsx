import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const CategoriesSection = () => {
  const categories = [
    { name: "Fiction", count: "15,000+", color: "bg-blue-500" },
    { name: "Non-Fiction", count: "12,000+", color: "bg-green-500" },
    { name: "Science", count: "8,000+", color: "bg-purple-500" },
    { name: "History", count: "6,000+", color: "bg-orange-500" },
    { name: "Technology", count: "5,000+", color: "bg-red-500" },
    { name: "Biography", count: "4,000+", color: "bg-indigo-500" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold tracking-tight">
            Explore by <span className="text-primary">Category</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover books across diverse genres and subjects
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to="/books"
              className="group p-6 bg-card rounded-xl border hover:border-primary/50 transition-all duration-200 hover:shadow-lg text-center"
            >
              <div
                className={`w-12 h-12 ${category.color} rounded-lg mx-auto mb-4 flex items-center justify-center`}
              >
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
