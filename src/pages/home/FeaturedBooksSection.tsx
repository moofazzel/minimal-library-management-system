import { useGetBooksQuery } from "@/redux/api/baseApi";
import { AlertCircle, BookOpen, Loader2 } from "lucide-react";
import BookShowcaseSlider from "../../components/books/BookShowcaseSlider";

const FeaturedBooksSection = () => {
  const { data: booksData, isLoading, error } = useGetBooksQuery({ limit: 5 });

  // Use actual books from API, fallback to empty array if no data
  const actualBooks = booksData?.data || [];

  // Loading state
  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 w-full">
        <div className="text-center space-y-4 mb-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            Featured Books
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our latest additions and most popular titles
          </p>
        </div>

        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto" />
            <p className="text-gray-600 font-medium">
              Loading featured books...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-red-50/50 to-pink-50/50 w-full">
        <div className="text-center space-y-4 mb-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            Featured Books
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our latest additions and most popular titles
          </p>
        </div>

        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4 max-w-md mx-auto px-4">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-900">
              Unable to Load Featured Books
            </h3>
            <p className="text-gray-600">
              We're experiencing some technical difficulties. Please try
              refreshing the page or check back later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!actualBooks.length) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50/50 to-slate-50/50 w-full">
        <div className="text-center space-y-4 mb-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            Featured Books
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our latest additions and most popular titles
          </p>
        </div>

        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4 max-w-md mx-auto px-4">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-900">
              No Featured Books Available
            </h3>
            <p className="text-gray-600">
              We're currently updating our featured collection. Check back soon
              for new additions!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 w-full relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <BookShowcaseSlider
          books={actualBooks}
          title="Featured Books"
          subtitle="Discover our latest additions and most popular titles"
          autoPlay={true}
          interval={5000}
          className="relative z-10"
        />
      </div>
    </section>
  );
};

export default FeaturedBooksSection;
