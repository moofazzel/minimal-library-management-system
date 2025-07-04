import { BookOpen, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import type { Book } from "../../types";
import BookBorrowModal from "./BookBorrowModal";
import BookDeleteModal from "./BookDeleteModal";
import BookEditModal from "./BookEditModal";

interface BookListViewProps {
  books: Book[];
}

const BookListView = ({ books }: BookListViewProps) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p className="text-lg font-medium">No books found</p>
        <p className="text-sm">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Book
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Genre
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                ISBN
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Copies
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <Link to={`/books/${book._id}`}>
                      <h3 className="text-sm font-medium text-gray-900">
                        {book.title}
                      </h3>
                    </Link>
                    <div className="text-sm text-gray-500">
                      by {book.author}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {book.genre}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                  {book.isbn}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {book.copies}
                </td>
                <td className="px-6 py-4">
                  {book.available && book.copies > 0 ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <XCircle className="h-3 w-3 mr-1" />
                      Unavailable
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex items-center gap-2 w-full">
                    <BookBorrowModal book={book} />

                    <BookEditModal book={book} />

                    <BookDeleteModal book={book} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookListView;
