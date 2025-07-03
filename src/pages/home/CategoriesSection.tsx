import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../../redux/api/baseApi";

const CategoriesSection = () => {
  const { data: booksData } = useGetBooksQuery({ limit: 1000 });

  // Generate categories dynamically from actual books data
  const generateCategories = () => {
    if (!booksData?.data) return [];

    const books = booksData.data;
    const categoryCounts: { [key: string]: number } = {};

    // Count books by genre
    books.forEach((book) => {
      const genre = book.genre || "Unknown";
      categoryCounts[genre] = (categoryCounts[genre] || 0) + 1;
    });

    // Color mapping for different genres
    const colorMap: { [key: string]: string } = {
      FICTION: "bg-blue-500",
      "NON-FICTION": "bg-green-500",
      SCIENCE: "bg-purple-500",
      HISTORY: "bg-orange-500",
      TECHNOLOGY: "bg-red-500",
      BIOGRAPHY: "bg-indigo-500",
      "SELF-HELP": "bg-pink-500",
      MYSTERY: "bg-gray-500",
      ROMANCE: "bg-rose-500",
      FANTASY: "bg-yellow-500",
      Unknown: "bg-slate-500",
    };

    // Convert to array format
    return Object.entries(categoryCounts).map(([genre, count]) => ({
      name: genre,
      count: `${count}+`,
      color: colorMap[genre] || "bg-slate-500",
    }));
  };

  const categories = generateCategories();

  // If no categories found, show a message or fallback
  if (categories.length === 0) {
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
          <div className="text-center text-muted-foreground">
            <p>No books available yet. Add some books to see categories!</p>
          </div>
        </div>
      </section>
    );
  }

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
