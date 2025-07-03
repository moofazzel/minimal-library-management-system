import { AlertTriangle, Trash2, X } from "lucide-react";
import type React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useDeleteBookMutation } from "../../redux/api/baseApi";
import { Button } from "../ui/Button";

interface BookDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: string;
  bookTitle: string;
}

// Zod validation schema for delete book request
const deleteBookSchema = z.object({
  bookId: z.string().min(1, "Book ID is required"),
  bookTitle: z.string().min(1, "Book title is required"),
});

type DeleteBookFormData = z.infer<typeof deleteBookSchema>;

const BookDeleteModal: React.FC<BookDeleteModalProps> = ({
  isOpen,
  onClose,
  bookId,
  bookTitle,
}) => {
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
      const dataToValidate = { bookId, bookTitle };
      if (!validateData(dataToValidate)) {
        toast.error("Validation failed", {
          description: "Please check the book information and try again.",
          duration: 5000,
        });
        return;
      }

      await deleteBook(bookId).unwrap();

      // Success toast
      toast.success("Book deleted successfully!", {
        description: `"${bookTitle}" has been permanently removed from the library.`,
        duration: 4000,
      });

      onClose();
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
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto modal-scroll">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto my-4 max-h-[95vh] overflow-y-auto scrollbar-thin modal-scroll">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="p-1.5 sm:p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex-shrink-0">
              <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                Delete Book
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                Remove book from library
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isLoading}
            className="p-1.5 sm:p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:transform-none flex-shrink-0"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 pb-6">
          <div className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg mb-4 sm:mb-6">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-700 mb-2">
                Are you sure you want to delete this book?
              </p>
              <p className="text-sm font-medium text-gray-900 truncate">
                "{bookTitle}"
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
              className="w-full sm:flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none border-0 text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  <span className="text-xs sm:text-sm">Deleting...</span>
                </div>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  <span className="text-xs sm:text-sm">Delete Book</span>
                </>
              )}
            </Button>
            <Button
              onClick={handleClose}
              disabled={isLoading}
              className="w-full sm:flex-1 bg-gradient-to-r from-gray-500 to-slate-500 hover:from-gray-600 hover:to-slate-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none border-0 text-sm sm:text-base"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDeleteModal;
