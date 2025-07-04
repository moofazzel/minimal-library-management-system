import { AlertTriangle, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useDeleteBookMutation } from "../../redux/api/baseApi";
import type { Book } from "../../types";
import { Button } from "../ui/Button";

interface BookDeleteModalProps {
  book: Book;
}

// Zod validation schema for delete book request
const deleteBookSchema = z.object({
  bookId: z.string().min(1, "Book ID is required"),
  bookTitle: z.string().min(1, "Book title is required"),
});

type DeleteBookFormData = z.infer<typeof deleteBookSchema>;

const BookDeleteModal = ({ book }: BookDeleteModalProps) => {
  const { _id, title } = book;

  const [isOpen, setIsOpen] = useState(false);

  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  const validateData = (data: DeleteBookFormData) => {
    try {
      deleteBookSchema.parse(data);
      return true;
    } catch {
      return false;
    }
  };

  const handleConfirm = async () => {
    try {
      // Validate data before deletion
      const dataToValidate = { bookId: _id, bookTitle: title };
      if (!validateData(dataToValidate)) {
        toast.error("Validation failed", {
          description: "Please check the book information and try again.",
          duration: 5000,
        });
        return;
      }

      // Use optimistic handler if provided, otherwise use direct API call

      await deleteBook(_id).unwrap();

      // Success toast
      toast.success("Book deleted successfully!", {
        description: `"${title}" has been permanently removed from the library.`,
        duration: 4000,
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Failed to delete book:", error);
      toast.error("Failed to delete book", {
        description:
          "An error occurred while deleting the book. Please try again.",
        duration: 5000,
      });
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="flex-1 py-2 px-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105"
        title="Delete Book"
      >
        <Trash2 className="h-4 w-4 mr-1" />
        <span className="text-xs font-medium">Delete</span>
      </Button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-100 to-pink-100 rounded-lg">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Delete Book
                  </h2>
                  <p className="text-sm text-gray-500">
                    Remove book from library
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg mb-6">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-700 mb-2">
                    Are you sure you want to delete this book?
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    "{title}"
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    This action cannot be undone and will permanently remove the
                    book from the library.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="w-full sm:flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none border-0"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      <span className="text-sm">Deleting...</span>
                    </div>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      <span className="text-sm">Delete Book</span>
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="w-full sm:flex-1 bg-gradient-to-r from-gray-500 to-slate-500 hover:from-gray-600 hover:to-slate-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none border-0"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookDeleteModal;
