import { motion, useInView } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../../redux/api/baseApi";

const CategoriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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

    // Color mapping for different genres with gradients
    const colorMap: { [key: string]: string } = {
      FICTION: "bg-gradient-to-r from-blue-500 to-indigo-600",
      "NON-FICTION": "bg-gradient-to-r from-emerald-500 to-teal-600",
      SCIENCE: "bg-gradient-to-r from-purple-500 to-pink-600",
      HISTORY: "bg-gradient-to-r from-orange-500 to-red-600",
      TECHNOLOGY: "bg-gradient-to-r from-cyan-500 to-blue-600",
      BIOGRAPHY: "bg-gradient-to-r from-indigo-500 to-purple-600",
      "SELF-HELP": "bg-gradient-to-r from-pink-500 to-rose-600",
      MYSTERY: "bg-gradient-to-r from-gray-500 to-slate-600",
      ROMANCE: "bg-gradient-to-r from-rose-500 to-pink-600",
      FANTASY: "bg-gradient-to-r from-yellow-500 to-orange-600",
      Unknown: "bg-gradient-to-r from-slate-500 to-gray-600",
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
      <motion.section
        ref={ref}
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-3 sm:px-0">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
              Explore by <span className="text-blue-600">Category</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover books across diverse genres and subjects
            </p>
          </motion.div>
          <motion.div
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p>No books available yet. Add some books to see categories!</p>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      ref={ref}
      className="py-5 pb-20 bg-gradient-to-br from-gray-50 to-blue-50"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-3 sm:px-0">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
            Explore by <span className="text-blue-600">Category</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover books across diverse genres and subjects
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 50, scale: 0.8 }
              }
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/books"
                className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 text-center block"
              >
                <motion.div
                  className={`w-16 h-16 ${category.color} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg transition-all duration-300`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={
                    isInView
                      ? { scale: 1, rotate: 0 }
                      : { scale: 0, rotate: -180 }
                  }
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.6 },
                  }}
                >
                  <motion.div
                    animate={
                      isInView
                        ? {
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <BookOpen className="h-8 w-8 text-white" />
                  </motion.div>
                </motion.div>
                <motion.h3
                  className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  {category.name}
                </motion.h3>
                <motion.p
                  className="text-sm text-gray-600 font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                >
                  {category.count}
                </motion.p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CategoriesSection;
