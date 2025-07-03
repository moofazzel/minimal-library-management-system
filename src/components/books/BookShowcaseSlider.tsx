import { AnimatePresence, motion } from "framer-motion";
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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "py-20 bg-gradient-to-br from-primary/5 to-secondary/5 w-full",
        className
      )}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center space-y-4 mb-16 px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      </motion.div>

      {/* Slider Container */}
      <div className="relative w-full">
        {/* Main Book Display */}
        <motion.div
          className="relative bg-card overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
            {/* Book Image */}
            <motion.div
              className="relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <div className="relative h-full flex items-center justify-center p-8">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-64 h-80 bg-muted rounded-lg shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500"
                    animate={{ rotate: [3, 0, 3] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <BookOpen className="h-16 w-16 text-primary/50" />
                      </motion.div>
                    </div>
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                </motion.div>
              </div>
            </motion.div>

            {/* Book Details */}
            <motion.div
              className="p-8 lg:p-12 flex flex-col justify-center space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBook._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <motion.span
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {currentBook.genre}
                    </motion.span>
                    <motion.div
                      className="flex items-center space-x-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                        >
                          <Star
                            className={cn(
                              "h-4 w-4",
                              i < 4
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            )}
                          />
                        </motion.div>
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        4.8
                      </span>
                    </motion.div>
                  </div>

                  <motion.h3
                    className="text-3xl lg:text-4xl font-bold leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    {currentBook.title}
                  </motion.h3>

                  <motion.p
                    className="text-lg text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    by{" "}
                    <span className="font-semibold text-foreground">
                      {currentBook.author}
                    </span>
                  </motion.p>

                  <motion.p
                    className="text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    {currentBook.description ||
                      "A captivating story that will keep you engaged from start to finish. Perfect for readers who love compelling narratives and rich character development."}
                  </motion.p>

                  <motion.div
                    className="flex items-center space-x-4 text-sm text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <span>ISBN: {currentBook.isbn}</span>
                    <span>•</span>
                    <span>{currentBook.copies} copies available</span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/books/${currentBook._id}`}
                    className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform border border-white/20 backdrop-blur-md"
                  >
                    <BookOpen className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300 text-white" />
                    <span className="text-white">Read More</span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/books/${currentBook._id}`}
                    className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/25 transform border border-white/20 backdrop-blur-md"
                  >
                    <BookOpen className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300 text-white" />
                    <span className="text-white">Borrow Now</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-transparent hover:bg-white/10 text-white rounded-2xl flex items-center justify-center transition-all duration-300 z-30 shadow-lg hover:shadow-xl hover:shadow-white/25 hover:scale-110 transform backdrop-blur-lg border border-white/30"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <ChevronLeft className="h-8 w-8 text-white" />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-transparent hover:bg-white/10 text-white rounded-2xl flex items-center justify-center transition-all duration-300 z-30 shadow-lg hover:shadow-xl hover:shadow-white/25 hover:scale-110 transform backdrop-blur-lg border border-white/30"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <ChevronRight className="h-8 w-8" />
        </motion.button>

        {/* Pagination Dots */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          {books.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-200",
                index === currentIndex
                  ? "bg-primary scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 1.5 + index * 0.1 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Progress Bar */}
      {autoPlay && (
        <motion.div
          className="mt-12 max-w-md mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary transition-all duration-100 ease-linear"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentIndex + 1) / books.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default BookShowcaseSlider;
