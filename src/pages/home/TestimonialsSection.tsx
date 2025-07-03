import { Quote } from "lucide-react";

const TestimonialsSection = () => {
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
    <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="container mx-auto px-3 sm:px-0">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-800 to-orange-600 bg-clip-text text-transparent">
            What Our <span className="text-orange-600">Readers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied readers who love our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const gradients = [
              "from-blue-500 to-indigo-600",
              "from-purple-500 to-pink-600",
              "from-emerald-500 to-teal-600",
            ];
            const gradient = gradients[index % gradients.length];

            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-200 relative hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:scale-105"
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
