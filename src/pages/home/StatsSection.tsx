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
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full">
                  <Icon className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-foreground">
                    {stat.loading ? (
                      <div className="h-8 bg-muted animate-pulse rounded"></div>
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
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
