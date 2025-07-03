import { BookOpen, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import type { Book } from "../../types";

interface BookShowcaseSliderProps {
  books: Book[];
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

const BookShowcaseSlider = ({
  books,
  title = "Featured Books",
  subtitle = "Discover our latest additions",
  autoPlay = true,
  interval = 4000,
  className,
}: BookShowcaseSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % books.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [books.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + books.length) % books.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [books.length, isTransitioning]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [currentIndex, isTransitioning]
  );

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, nextSlide]);

  if (!books.length) return null;

  const currentBook = books[currentIndex];

  return (
    <section
      className={cn(
        "py-20 bg-gradient-to-br from-primary/5 to-secondary/5 w-full",
        className
      )}
    >
      {/* Header */}
      <div className="text-center space-y-4 mb-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative w-full">
        {/* Main Book Display */}
        <div className="relative bg-card overflow-hidden shadow-2xl mx-4 sm:mx-6 lg:mx-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
            {/* Book Image */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <div className="relative h-full flex items-center justify-center p-8">
                <div className="relative group">
                  <div className="w-64 h-80 bg-muted rounded-lg shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-primary/50" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {currentBook.genre}
                  </span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < 4
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      4.8
                    </span>
                  </div>
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold leading-tight">
                  {currentBook.title}
                </h3>

                <p className="text-lg text-muted-foreground">
                  by{" "}
                  <span className="font-semibold text-foreground">
                    {currentBook.author}
                  </span>
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  {currentBook.description ||
                    "A captivating story that will keep you engaged from start to finish. Perfect for readers who love compelling narratives and rich character development."}
                </p>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>ISBN: {currentBook.isbn}</span>
                  <span>•</span>
                  <span>{currentBook.copies} copies available</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to={`/books/${currentBook._id}`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Read More
                </Link>
                <Link
                  to={`/books/${currentBook._id}`}
                  className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Borrow Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg z-20"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg z-20"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {books.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-200",
                index === currentIndex
                  ? "bg-primary scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      {autoPlay && (
        <div className="mt-12 max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-100 ease-linear"
              style={{
                width: `${((currentIndex + 1) / books.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default BookShowcaseSlider;
