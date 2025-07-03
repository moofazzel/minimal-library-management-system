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
import { useState } from "react";
import BookAddModal from "../../components/books/BookAddModal";
import BookBorrowModal from "../../components/books/BookBorrowModal";
import BookCard from "../../components/books/BookCard";
import BookDeleteModal from "../../components/books/BookDeleteModal";
import BookEditModal from "../../components/books/BookEditModal";
import BookStats from "../../components/books/BookStats";
import { Button } from "../../components/ui/Button";
import { useGetBooksQuery } from "../../redux/api/baseApi";
import type { Book } from "../../types";

const BooksPage = () => {
  const {
    data: booksData,
    isLoading,
    error,
  } = useGetBooksQuery({ limit: 1000 });

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

  // Filter books based on search and genre
  const filteredBooks = books.filter((book) => {
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

  // Open borrow modal
  const openBorrowModal = (book: Book) => {
    setSelectedBook(book);
    setIsBorrowModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <XCircle className="h-12 w-12 mx-auto mb-4" />
          <p>Error loading books. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Book Management 🛠️
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your library's book collection
          </p>
        </div>
      </div>

      {/* Sticky Toggle Buttons */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 -mx-4 px-4 py-4 mb-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Statistics Toggle */}
            <Button
              variant={showStats ? "default" : "ghost"}
              onClick={() => setShowStats(!showStats)}
              className={`relative overflow-hidden transition-all duration-300 ${
                showStats
                  ? "bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25"
                  : "!bg-gray-400 hover:bg-gradient-to-r hover:from-violet-50 hover:to-fuchsia-50 text-gray-600"
              }`}
              title="Toggle Statistics"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r from-violet-400 to-fuchsia-500 opacity-0 transition-opacity duration-300 ${
                  showStats ? "opacity-100" : ""
                }`}
              />
              <BarChart3 className="h-5 w-5 relative z-10" />
              <span className="ml-2 relative z-10 font-medium">Stats</span>
            </Button>

            {/* View Mode Toggles */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <Button
                variant="ghost"
                onClick={() => setViewMode("list")}
                className={`relative overflow-hidden transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                    : "!bg-gray-400 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 text-gray-600"
                }`}
                title="List View"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 transition-opacity duration-300 ${
                    viewMode === "list" ? "opacity-100" : ""
                  }`}
                />
                <ListIcon className="h-5 w-5 relative z-10" />
                <span className="ml-2 relative z-10 font-medium">List</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setViewMode("grid")}
                className={`relative overflow-hidden transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                    : "!bg-gray-400 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 text-gray-600"
                }`}
                title="Grid View"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 transition-opacity duration-300 ${
                    viewMode === "grid" ? "opacity-100" : ""
                  }`}
                />
                <LayoutGrid className="h-5 w-5 relative z-10" />
                <span className="ml-2 relative z-10 font-medium">Grid</span>
              </Button>
            </div>
          </div>

          {/* Add Book Button */}
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <Plus className="h-5 w-5 relative z-10 mr-2" />
            <span className="relative z-10">Add New Book</span>
          </Button>
        </div>
      </div>

      {/* Statistics */}
      {showStats && (
        <div className="mb-8">
          <BookStats books={books} />
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <div className="md:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
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
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredBooks.length} of {books.length} books
        </p>
        {searchTerm && (
          <p className="text-sm text-gray-500">
            Search results for: "
            <span className="font-medium">{searchTerm}</span>"
          </p>
        )}
      </div>

      {/* Books Table or Grid */}
      {viewMode === "list" ? (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title & Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ISBN
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Copies
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredBooks.map((book) => (
                  <tr
                    key={book._id}
                    className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="text-sm font-semibold text-gray-900 mb-1">
                          {book.title}
                        </div>
                        <div className="text-xs text-gray-500 leading-relaxed">
                          {book.description.length > 60
                            ? `${book.description.substring(0, 60)}...`
                            : book.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {book.author}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-violet-100 to-purple-100 text-violet-800 border border-violet-200">
                        {book.genre}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-mono bg-gray-50 px-2 py-1 rounded">
                      {book.isbn}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                      <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-md">
                        {book.copies} {book.copies === 1 ? "copy" : "copies"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {book.available && book.copies > 0 ? (
                        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200">
                          <XCircle className="h-3 w-3 mr-1" />
                          Unavailable
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openBorrowModal(book)}
                          disabled={!book.available || book.copies === 0}
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            !book.available || book.copies === 0
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                              : "hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 text-green-600 hover:scale-105"
                          }`}
                          title={
                            !book.available || book.copies === 0
                              ? "Book not available"
                              : "Borrow Book"
                          }
                        >
                          <BookOpen className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(book)}
                          className="p-2 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 text-blue-600 rounded-lg transition-all duration-300 hover:scale-105"
                          title="Edit Book"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteModal(book)}
                          className="p-2 hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 text-red-600 rounded-lg transition-all duration-300 hover:scale-105"
                          title="Delete Book"
                        >
                          <Trash2 className="h-4 w-4" />
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
