import { BarChart3, BookOpen, CheckCircle, Tag, XCircle } from "lucide-react";
import type { Book } from "../../types";

interface BookStatsProps {
  books: Book[];
}

const BookStats: React.FC<BookStatsProps> = ({ books }) => {
  // Calculate statistics
  const totalBooks = books.length;
  const availableBooks = books.filter(
    (book) => book.available && book.copies > 0
  ).length;
  const unavailableBooks = totalBooks - availableBooks;
  const totalCopies = books.reduce((sum, book) => sum + book.copies, 0);

  // Get genre statistics
  const genreStats = books.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topGenres = Object.entries(genreStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const statCards = [
    {
      title: "Total Books",
      value: totalBooks,
      icon: BookOpen,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Available Books",
      value: availableBooks,
      icon: CheckCircle,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Total Copies",
      value: totalCopies,
      icon: BarChart3,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Unavailable",
      value: unavailableBooks,
      icon: XCircle,
      color: "bg-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Genre Stats */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Tag className="h-5 w-5 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Top Genres</h3>
        </div>

        {topGenres.length > 0 ? (
          <div className="space-y-3">
            {topGenres.map(([genre, count], index) => (
              <div
                key={genre}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-orange-600">
                      {index + 1}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">{genre}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{count} books</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(count / totalBooks) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No books available</p>
        )}
      </div>

      {/* Quick Summary */}
      {/* <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Library Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Books:</span>
              <span className="font-semibold">{totalBooks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Copies:</span>
              <span className="font-semibold">{totalCopies}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Available:</span>
              <span className="font-semibold text-green-600">
                {availableBooks}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Unavailable:</span>
              <span className="font-semibold text-red-600">
                {unavailableBooks}
              </span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BookStats;
