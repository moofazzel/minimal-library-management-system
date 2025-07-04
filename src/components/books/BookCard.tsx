import { CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import type { Book } from "../../types";
import BookBorrowModal from "./BookBorrowModal";
import BookDeleteModal from "./BookDeleteModal";
import BookEditModal from "./BookEditModal";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const isBookAvailable = book.available && book.copies > 0;

  return (
    <div className="bg-white rounded-xl shadow-md border p-5 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200">
          {book.genre}
        </span>
        {isBookAvailable ? (
          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Available
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Unavailable
          </span>
        )}
      </div>

      <div className="flex-1">
        <Link to={`/books/${book._id}`}>
          <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
        <p className="text-xs text-gray-500 mb-2 font-mono bg-gray-50 px-2 py-1 rounded">
          ISBN: {book.isbn}
        </p>
        <p className="text-xs text-gray-500 mb-2">
          Copies:{" "}
          <span className="font-semibold text-blue-600">{book.copies}</span>
        </p>
        <p className="text-xs text-gray-500 mb-3 leading-relaxed">
          {book.description.substring(0, 80)}
          {book.description.length > 80 ? "..." : ""}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
        {/* Borrow Button */}

        {/* Edit Button */}
        <BookBorrowModal book={book} />

        {/* Edit Button */}
        <BookEditModal book={book} />

        {/* Delete Button */}
        <BookDeleteModal book={book} />
      </div>
    </div>
  );
};

export default BookCard;
