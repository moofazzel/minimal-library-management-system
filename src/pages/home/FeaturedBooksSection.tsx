import { useGetBooksQuery } from "@/redux/api/baseApi";
import BookShowcaseSlider from "../../components/books/BookShowcaseSlider";

const FeaturedBooksSection = () => {
  const { data: booksData } = useGetBooksQuery({ limit: 5 });

  // Use actual books from API, fallback to empty array if no data
  const actualBooks = booksData?.data || [];

  return (
    <BookShowcaseSlider
      books={actualBooks}
      title="Featured Books"
      subtitle="Discover our latest additions and most popular titles"
      autoPlay={true}
      interval={5000}
    />
  );
};

export default FeaturedBooksSection;
