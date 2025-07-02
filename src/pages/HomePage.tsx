import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Clock,
  Facebook,
  Globe,
  Heart,
  Instagram,
  Library,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Play,
  Quote,
  Search,
  Shield,
  Star,
  TrendingUp,
  Twitter,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import BookShowcaseSlider from "../components/books/BookShowcaseSlider";
import Slider from "../components/ui/Slider";
import type { Book } from "../types";

const HomePage = () => {
  // Hero Slider Data
  const heroSlides = [
    {
      id: 1,
      title: "Discover Your Next Great Read",
      subtitle: "Welcome to the Future of Libraries",
      description:
        "Explore our vast collection of books, manage your reading journey, and connect with fellow book lovers.",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop",
      ctaText: "Explore Library",
      ctaLink: "/books",
      overlay: true,
      kenBurns: true,
    },
    {
      id: 2,
      title: "50,000+ Books at Your Fingertips",
      subtitle: "Unlimited Access",
      description:
        "From classic literature to modern bestsellers, find exactly what you're looking for in our extensive collection.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop",
      ctaText: "Browse Collection",
      ctaLink: "/books",
      overlay: true,
      kenBurns: true,
    },
    {
      id: 3,
      title: "Smart Borrowing Made Simple",
      subtitle: "24/7 Digital Access",
      description:
        "Borrow books with ease, track your reading progress, and never miss a due date with our intelligent system.",
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1920&h=1080&fit=crop",
      ctaText: "Start Reading",
      ctaLink: "/borrow-summary",
      overlay: true,
      kenBurns: true,
    },
  ];

  // Sample Books for Showcase Slider
  const sampleBooks: Book[] = [
    {
      id: "1",
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Fiction",
      isbn: "978-1786892737",
      description:
        "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
      copies: 15,
      available: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "2",
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Help",
      isbn: "978-0735211292",
      description:
        "No matter your goals, Atomic Habits offers a proven framework for improving every day. Learn how to make time for new habits and get back on track when you fall off course.",
      copies: 12,
      available: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "3",
      title: "The Psychology of Money",
      author: "Morgan Housel",
      genre: "Finance",
      isbn: "978-0857197689",
      description:
        "Timeless lessons on wealth, greed, and happiness. Understanding how money works is more about behavior than intelligence.",
      copies: 8,
      available: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    {
      id: "4",
      title: "Sapiens",
      author: "Yuval Noah Harari",
      genre: "History",
      isbn: "978-0062316097",
      description:
        "A groundbreaking narrative of humanity's creation and evolution that explores the ways in which biology and history have defined us.",
      copies: 10,
      available: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
  ];

  const stats = [
    { icon: BookOpen, value: "50,000+", label: "Books Available" },
    { icon: Users, value: "10,000+", label: "Active Readers" },
    { icon: TrendingUp, value: "95%", label: "Satisfaction Rate" },
    { icon: Clock, value: "24/7", label: "Digital Access" },
  ];

  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description:
        "Find any book instantly with our advanced search and filtering system.",
    },
    {
      icon: Shield,
      title: "Secure Borrowing",
      description:
        "Safe and secure book borrowing with automatic due date tracking.",
    },
    {
      icon: Globe,
      title: "Global Access",
      description:
        "Access your library from anywhere, anytime with our digital platform.",
    },
    {
      icon: Award,
      title: "Curated Collections",
      description:
        "Expertly curated collections across all genres and interests.",
    },
  ];

  const categories = [
    { name: "Fiction", count: "15,000+", color: "bg-blue-500" },
    { name: "Non-Fiction", count: "12,000+", color: "bg-green-500" },
    { name: "Science", count: "8,000+", color: "bg-purple-500" },
    { name: "History", count: "6,000+", color: "bg-orange-500" },
    { name: "Technology", count: "5,000+", color: "bg-red-500" },
    { name: "Biography", count: "4,000+", color: "bg-indigo-500" },
  ];

  const latestBooks = [
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Fiction",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Help",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop",
    },
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      genre: "Finance",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop",
    },
    {
      title: "Sapiens",
      author: "Yuval Noah Harari",
      genre: "History",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=600&fit=crop",
    },
  ];

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

  const benefits = [
    "No registration fees or hidden costs",
    "Access to premium and rare book collections",
    "Personalized reading recommendations",
    "Mobile app for on-the-go reading",
    "Integration with popular e-readers",
    "Community features and book discussions",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Slider Section */}
      <section className="relative">
        <Slider
          slides={heroSlides}
          autoPlay={true}
          interval={6000}
          showNavigation={true}
          showPagination={true}
          className="rounded-none"
        />
      </section>

      {/* Stats Section */}
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
                      {stat.value}
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

      {/* Book Showcase Slider */}
      <BookShowcaseSlider
        books={sampleBooks}
        title="Featured Books"
        subtitle="Discover our latest additions and most popular titles"
        autoPlay={true}
        interval={5000}
      />

      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold tracking-tight">
              Explore by <span className="text-primary">Category</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover books across diverse genres and subjects
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/books"
                className="group p-6 bg-card rounded-xl border hover:border-primary/50 transition-all duration-200 hover:shadow-lg text-center"
              >
                <div
                  className={`w-12 h-12 ${category.color} rounded-lg mx-auto mb-4 flex items-center justify-center`}
                >
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.count}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Books Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">
                Latest <span className="text-primary">Additions</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Fresh titles added to our collection
              </p>
            </div>
            <Link
              to="/books"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestBooks.map((book, index) => (
              <div
                key={index}
                className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[2/3] bg-muted relative overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    NEW
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(book.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {book.rating}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-muted-foreground">by {book.author}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                      {book.genre}
                    </span>
                    <Link
                      to="/books"
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold tracking-tight">
              Why Choose <span className="text-primary">LibraryHub</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the perfect blend of traditional library values and
              modern technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 bg-card rounded-xl border hover:border-primary/50 transition-all duration-200 hover:shadow-lg"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold tracking-tight">
              What Our <span className="text-primary">Readers Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied readers who love our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-background p-8 rounded-xl border relative"
              >
                <Quote className="h-8 w-8 text-primary/20 absolute top-4 left-4" />
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight">
                  Everything You Need for{" "}
                  <span className="text-primary">Reading Success</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our comprehensive platform provides all the tools and
                  resources you need to make the most of your reading journey.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/books"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Start Reading Today
                </Link>
                <button className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Demo
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-card p-8 rounded-xl border shadow-lg">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        Digital Library Card
                      </h3>
                      <p className="text-muted-foreground">
                        Access anywhere, anytime
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        50K+
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Books Available
                      </div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        24/7
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Access
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Reading Progress
                      </span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">
                Ready to Start Your Reading Journey?
              </h2>
              <p className="text-xl opacity-90">
                Join thousands of readers who have already discovered their next
                favorite book
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/books"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold text-lg shadow-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-xl"
              >
                <Library className="h-5 w-5" />
                <span>Browse Collection</span>
              </Link>
              <Link
                to="/borrow-summary"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-all duration-200"
              >
                <span>View Summary</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight">
                  Get in <span className="text-primary">Touch</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Have questions? We'd love to hear from you. Send us a message
                  and we'll respond as soon as possible.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-muted-foreground">
                      hello@libraryhub.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-muted-foreground">
                      +1 (555) 123-4567
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="text-muted-foreground">
                      123 Library Street, Book City, BC 12345
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl border">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Heart className="h-5 w-5 text-red-500" />
            <span>Made with love for book lovers worldwide</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
