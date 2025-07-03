import { BookOpen, Clock, TrendingUp, Users } from "lucide-react";
import { useGetBooksQuery } from "../../redux/api/baseApi";

const StatsSection = () => {
  const { data: booksData } = useGetBooksQuery({ limit: 1000 });

  // Calculate actual statistics based on the actual API response structure
  const totalBooks = booksData?.data?.length || 0;

  // Static data for metrics that aren't available from current API
  const activeReaders = 100; // Static active readers count
  const satisfactionRate = 96; // Static satisfaction rate percentage

  const stats = [
    {
      icon: BookOpen,
      value: `${totalBooks.toLocaleString()}+`,
      label: "Books Available",
      loading: !booksData,
    },
    {
      icon: Users,
      value: `${activeReaders.toLocaleString()}+`,
      label: "Active Readers",
      loading: false,
    },
    {
      icon: TrendingUp,
      value: `${satisfactionRate}%`,
      label: "Satisfaction Rate",
      loading: false,
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Digital Access",
      loading: false,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-3 sm:px-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const gradients = [
              "from-blue-500 to-indigo-600",
              "from-purple-500 to-pink-600",
              "from-emerald-500 to-teal-600",
              "from-orange-500 to-red-600",
            ];
            const gradient = gradients[index % gradients.length];

            return (
              <div key={index} className="text-center space-y-4 group">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${gradient} text-white rounded-2xl shadow-lg shadow-${
                    gradient.split("-")[1]
                  }-500/25 group-hover:scale-110 transition-all duration-300`}
                >
                  <Icon className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {stat.loading ? (
                      <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-lg"></div>
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {stat.label}
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

export default StatsSection;
