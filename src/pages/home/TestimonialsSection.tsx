import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";
import { useRef } from "react";

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Book Club Leader",
      content:
        "LibraryHub has transformed how our book club operates. The easy borrowing system and vast collection make every meeting more engaging.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Michael Chen",
      role: "Student",
      content:
        "As a student, I love the 24/7 access and the ability to search through thousands of books. It's like having a library in my pocket!",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Professor",
      content:
        "The academic collection is impressive. I can easily find research materials and recommend books to my students through this platform.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-3 sm:px-0">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-800 to-orange-600 bg-clip-text text-transparent">
            What Our <span className="text-orange-600">Readers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied readers who love our platform
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 0.3 },
            },
          }}
        >
          {testimonials.map((testimonial, index) => {
            const gradients = [
              "from-blue-500 to-indigo-600",
              "from-purple-500 to-pink-600",
              "from-emerald-500 to-teal-600",
            ];
            const gradient = gradients[index % gradients.length];

            return (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-200 relative hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.9, y: 40 }
                }
                transition={{ duration: 0.7, delay: 0.3 + index * 0.15 }}
              >
                <div
                  className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <Quote className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-4 mt-4">
                  <p className="text-gray-600 leading-relaxed italic text-lg">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <div className="font-bold text-gray-800">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
