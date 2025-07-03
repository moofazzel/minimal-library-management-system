import { useGetBooksQuery } from "@/redux/api/baseApi";
import { BookOpen, Calendar, ChevronRight, Star, User } from "lucide-react";
import { Link } from "react-router-dom";

function LatestBooks() {
  const { data: books } = useGetBooksQuery({ limit: 10 });
  const latestBooks = books?.data?.slice(0, 4) || [];
  console.log("🚀 ~ latestBooks:", latestBooks);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-3 sm:px-0">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="h-4 w-4" />
            <span>Fresh Collection</span>
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-4">
            Latest{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Additions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the newest titles added to our collection, carefully
            curated for your reading pleasure
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {latestBooks.map((book) => (
            <div
              key={book._id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Book Cover */}
              <div className="aspect-[3/3] relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-blue-100/50">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-primary/40 group-hover:text-primary/60 transition-colors duration-300">
                    {book.title.charAt(0)}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  NEW
                </div>

                {/* Availability Badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                    book.available
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {book.available ? "Available" : "Borrowed"}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    to={`/books/${book._id}`}
                    className="bg-white text-primary px-6 py-3 rounded-full font-semibold transform scale-90 group-hover:scale-100 transition-transform duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Book Info */}
              <div className="p-6 space-y-4">
                {/* Title and Author */}
                <div className="space-y-2">
                  <h3 className="font-bold text-xl line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {book.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{book.author}</span>
                  </div>
                </div>

                {/* Genre and ISBN */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                      {book.genre}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {book.isbn}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {book.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{book.copies} copies</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(book.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Rating Placeholder */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={`/books/${book._id}`}
                  className="w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold text-center hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Read More</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/books"
            className="inline-flex items-center space-x-3 bg-white text-primary border-2 border-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>View All Books</span>
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LatestBooks;
