import { AlertTriangle, Trash2, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useDeleteBookMutation } from "../../redux/api/baseApi";
import { Button } from "../ui/Button";

interface BookDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: string;
  bookTitle: string;
}

const BookDeleteModal: React.FC<BookDeleteModalProps> = ({
  isOpen,
  onClose,
  bookId,
  bookTitle,
}) => {
  const [deleteBook] = useDeleteBookMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteBook(bookId).unwrap();
      onClose();
    } catch (err) {
      setError("Failed to delete book. Please try again.");
      console.error("Failed to delete book:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setError(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Delete Book</h2>
              <p className="text-sm text-gray-500">Remove book from library</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-700 mb-2">
                Are you sure you want to delete this book?
              </p>
              <p className="text-sm font-medium text-gray-900">"{bookTitle}"</p>
              <p className="text-xs text-red-600 mt-1">
                This action cannot be undone and will permanently remove the
                book from the library.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              onClick={handleConfirm}
              disabled={isLoading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? "Deleting..." : "Delete Book"}
            </Button>
            <Button
              variant="ghost"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
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
