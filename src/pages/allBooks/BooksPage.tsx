import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  CheckCircle,
  Edit,
  Filter,
  LayoutGrid,
  List as ListIcon,
  Plus,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import { startTransition, useOptimistic, useState } from "react";
import { toast } from "sonner";
import BookAddModal from "../../components/books/BookAddModal";
import BookBorrowModal from "../../components/books/BookBorrowModal";
import BookCard from "../../components/books/BookCard";
import BookDeleteModal from "../../components/books/BookDeleteModal";
import BookEditModal from "../../components/books/BookEditModal";
import BookSkeleton from "../../components/books/BookSkeleton";
import BookStats from "../../components/books/BookStats";
import { Button } from "../../components/ui/Button";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../../redux/api/baseApi";
import type { Book } from "../../types";

const BooksPage = () => {
  const {
    data: booksData,
    isLoading,
    error,
  } = useGetBooksQuery({ limit: 1000 });

  const [deleteBook] = useDeleteBookMutation();

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  // Search, filter, and view states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showStats, setShowStats] = useState(true);

  const books = booksData?.data || [];

  // Optimistic state for books
  const [optimisticBooks, addOptimisticBook] = useOptimistic(
    books,
    (currentBooks, optimisticUpdate: { type: "delete"; bookId: string }) => {
      if (optimisticUpdate.type === "delete") {
        return currentBooks.filter(
          (book) => book._id !== optimisticUpdate.bookId
        );
      }
      return currentBooks;
    }
  );

  // Filter books based on search and genre
  const filteredBooks = optimisticBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm);
    const matchesGenre = filterGenre === "" || book.genre === filterGenre;
    return matchesSearch && matchesGenre;
  });

  // Get unique genres for filter
  const genres = [...new Set(books.map((book) => book.genre))];

  // Open edit modal
  const openEditModal = (book: Book) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (book: Book) => {
    setBookToDelete(book);
    setIsDeleteModalOpen(true);
  };

  // Handle optimistic deletion
  const handleOptimisticDelete = async (bookId: string, bookTitle: string) => {
    // Add optimistic update
    addOptimisticBook({ type: "delete", bookId });

    // Start transition for the actual API call
    startTransition(async () => {
      try {
        await deleteBook(bookId).unwrap();

        // Success toast
        toast.success("Book deleted successfully!", {
          description: `"${bookTitle}" has been permanently removed from the library.`,
          duration: 4000,
        });
      } catch (error) {
        // Revert optimistic update on error
        console.error("Failed to delete book:", error);
        toast.error("Failed to delete book", {
          description:
            "An error occurred while deleting the book. Please try again.",
          duration: 5000,
        });
      }
    });
  };

  // Open borrow modal
  const openBorrowModal = (book: Book) => {
    setSelectedBook(book);
    setIsBorrowModalOpen(true);
  };

  if (isLoading) {
    return <BookSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Books
          </h2>
          <p className="text-gray-600">
            An error occurred while loading the books. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Library Books
          </h1>
          <p className="text-gray-600">
            Manage and explore your library collection
          </p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Book
        </Button>
      </div>

      {/* Stats */}
      {showStats && (
        <div className="mb-8">
          <BookStats books={optimisticBooks} />
        </div>
      )}

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-md border p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Genre Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Toggle and Stats Toggle */}
          <div className="flex items-center space-x-3">
            {/* Stats Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowStats(!showStats)}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm font-medium">
                {showStats ? "Hide" : "Show"} Stats
              </span>
            </Button>

            {/* View Toggle */}
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "px-3 py-1.5 rounded-md transition-all duration-200",
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600"
                    : "!bg-gray-300 text-gray-600 hover:bg-gray-200"
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={cn(
                  "px-3 py-1.5 rounded-md transition-all duration-200",
                  viewMode === "list"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600"
                    : "!bg-gray-300 text-gray-600 hover:bg-gray-200"
                )}
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Books List */}
      {viewMode === "list" ? (
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
                {filteredBooks.map((book) => (
                  <tr
                    key={book._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {book.title}
                        </div>
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openBorrowModal(book)}
                          disabled={!book.available || book.copies === 0}
                          className={`flex-1 py-2 px-3 rounded-lg transition-all duration-300 ${
                            !book.available || book.copies === 0
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                              : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/25 hover:scale-105"
                          }`}
                          title={
                            !book.available || book.copies === 0
                              ? "Book not available"
                              : "Borrow Book"
                          }
                        >
                          <BookOpen className="h-4 w-4 mr-1" />
                          <span className="text-xs font-medium">Borrow</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(book)}
                          className="flex-1 py-2 px-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                          title="Edit Book"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          <span className="text-xs font-medium">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteModal(book)}
                          className="flex-1 py-2 px-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105"
                          title="Delete Book"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span className="text-xs font-medium">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No books found</p>
              <p className="text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              onBorrow={openBorrowModal}
            />
          ))}

          {filteredBooks.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No books found</p>
              <p className="text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <BookAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <BookEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        book={selectedBook}
      />

      <BookDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        bookId={bookToDelete?._id || ""}
        bookTitle={bookToDelete?.title || ""}
        onConfirm={handleOptimisticDelete}
      />

      <BookBorrowModal
        isOpen={isBorrowModalOpen}
        onClose={() => setIsBorrowModalOpen(false)}
        book={selectedBook}
      />
    </div>
  );
};

export default BooksPage;
