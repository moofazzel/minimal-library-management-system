import { useGetBooksQuery } from "@/redux/api/baseApi";
import { motion, useInView } from "framer-motion";
import { BookOpen, Calendar, ChevronRight, Star, User } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

function LatestBooks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: books } = useGetBooksQuery({ limit: 10 });
  const latestBooks = books?.data?.slice(0, 4) || [];

  return (
    <motion.section
      ref={ref}
      className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <div className="container mx-auto px-3 sm:px-0">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, rotateX: -90 }}
            animate={
              isInView
                ? { opacity: 1, rotateX: 0 }
                : { opacity: 0, rotateX: -90 }
            }
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <BookOpen className="h-4 w-4" />
            <span>Fresh Collection</span>
          </motion.div>
          <motion.h2
            className="text-5xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={
              isInView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1, delay: 0.7 }}
          >
            Latest{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Additions
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Discover the newest titles added to our collection, carefully
            curated for your reading pleasure
          </motion.p>
        </motion.div>

        {/* Books Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {latestBooks.map((book, index) => (
            <motion.div
              key={book._id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              initial={{ opacity: 0, rotateY: -15, x: -100 }}
              animate={
                isInView
                  ? { opacity: 1, rotateY: 0, x: 0 }
                  : { opacity: 0, rotateY: -15, x: -100 }
              }
              transition={{ duration: 0.8, delay: 0.8 + index * 0.15 }}
              whileHover={{
                scale: 1.03,
                rotateY: 5,
                transition: { duration: 0.4 },
              }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Book Cover */}
              <motion.div
                className="aspect-[3/3] relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-blue-100/50"
                initial={{ scale: 0.8, rotateZ: -5 }}
                animate={
                  isInView
                    ? { scale: 1, rotateZ: 0 }
                    : { scale: 0.8, rotateZ: -5 }
                }
                transition={{ duration: 0.6, delay: 1.0 + index * 0.15 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, rotate: 360 }}
                  animate={
                    isInView
                      ? { scale: 1, rotate: 0 }
                      : { scale: 0, rotate: 360 }
                  }
                  transition={{ duration: 0.7, delay: 1.2 + index * 0.15 }}
                >
                  <div className="text-6xl font-bold text-primary/40 group-hover:text-primary/60 transition-colors duration-300">
                    {book.title.charAt(0)}
                  </div>
                </motion.div>

                {/* Status Badge */}
                <motion.div
                  className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1, rotate: 0 }
                      : { opacity: 0, scale: 0, rotate: -180 }
                  }
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.15 }}
                >
                  NEW
                </motion.div>

                {/* Availability Badge */}
                <motion.div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                    book.available
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                  initial={{ opacity: 0, scale: 0, rotate: 180 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1, rotate: 0 }
                      : { opacity: 0, scale: 0, rotate: 180 }
                  }
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.15 }}
                >
                  {book.available ? "Available" : "Borrowed"}
                </motion.div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    to={`/books/${book._id}`}
                    className="bg-white text-primary px-6 py-3 rounded-full font-semibold transform scale-90 group-hover:scale-100 transition-transform duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>

              {/* Book Info */}
              <motion.div
                className="p-6 space-y-4"
                initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 30, filter: "blur(5px)" }
                }
                transition={{ duration: 0.6, delay: 1.6 + index * 0.15 }}
              >
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
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={`/books/${book._id}`}
                    className="w-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold text-center hover:from-fuchsia-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <span className="text-white">Read More</span>
                    <ChevronRight className="h-4 w-4 text-white" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8, rotateZ: -10 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1, rotateZ: 0 }
              : { opacity: 0, scale: 0.8, rotateZ: -10 }
          }
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <motion.div
            whileHover={{ scale: 1.08, rotateZ: 2 }}
            whileTap={{ scale: 0.92 }}
          >
            <Link
              to="/books"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500 text-white border-2 border-fuchsia-500 px-8 py-4 rounded-full font-semibold hover:from-fuchsia-600 hover:via-purple-600 hover:to-pink-600 hover:border-fuchsia-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-white">View All Books</span>
              <ChevronRight className="h-5 w-5 text-white" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default LatestBooks;
