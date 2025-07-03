import BookShowcaseSlider from "../../components/books/BookShowcaseSlider";
import type { Book } from "../../types";

const FeaturedBooksSection = () => {
  // Sample Books for Showcase Slider
  const sampleBooks: Book[] = [
    {
      _id: "1",
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
      _id: "2",
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
      _id: "3",
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
      _id: "4",
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

  return (
    <BookShowcaseSlider
      books={sampleBooks}
      title="Featured Books"
      subtitle="Discover our latest additions and most popular titles"
      autoPlay={true}
      interval={5000}
    />
  );
};

export default FeaturedBooksSection;
