import { BookOpen, CheckCircle, Edit, Trash2, XCircle } from "lucide-react";
import type { Book } from "../../types";
import { Button } from "../ui/Button";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onBorrow: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  onEdit,
  onDelete,
  onBorrow,
}) => {
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
        <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onBorrow(book)}
          disabled={!isBookAvailable}
          className={`flex-1 py-2 px-3 rounded-lg transition-all duration-300 font-medium ${
            isBookAvailable
              ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 hover:from-green-100 hover:to-emerald-100 hover:scale-105 border border-green-200 hover:border-green-300"
              : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
          }`}
          title={
            isBookAvailable
              ? "Borrow this book"
              : "Book not available for borrowing"
          }
        >
          <BookOpen className="h-4 w-4 mr-1" />
          <span className="text-xs">Borrow</span>
        </Button>

        {/* Edit Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(book)}
          className="flex-1 py-2 px-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 rounded-lg transition-all duration-300 hover:scale-105 border border-blue-200 hover:border-blue-300 font-medium"
          title="Edit book details"
        >
          <Edit className="h-4 w-4 mr-1" />
          <span className="text-xs">Edit</span>
        </Button>

        {/* Delete Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(book)}
          className="flex-1 py-2 px-3 bg-gradient-to-r from-red-50 to-pink-50 text-red-700 hover:from-red-100 hover:to-pink-100 rounded-lg transition-all duration-300 hover:scale-105 border border-red-200 hover:border-red-300 font-medium"
          title="Delete this book"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          <span className="text-xs">Delete</span>
        </Button>
      </div>
    </div>
  );
};

export default BookCard;
