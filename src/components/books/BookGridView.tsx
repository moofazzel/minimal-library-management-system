import { BookOpen } from "lucide-react";
import type { Book } from "../../types";
import BookCard from "./BookCard";

interface BookGridViewProps {
  books: Book[];
}

const BookGridView = ({ books }: BookGridViewProps) => {
  if (books.length === 0) {
    return (
      <div className="col-span-full text-center py-12 text-gray-500">
        <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p className="text-lg font-medium">No books found</p>
        <p className="text-sm">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookGridView;
