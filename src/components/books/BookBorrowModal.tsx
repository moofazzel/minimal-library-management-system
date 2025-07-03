import { BookOpen, Calendar, Copy, Hash, User, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useCreateBorrowMutation } from "../../redux/api/baseApi";
import type { Book } from "../../types";
import { Button } from "../ui/Button";

interface BookBorrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}

const BookBorrowModal: React.FC<BookBorrowModalProps> = ({
  isOpen,
  onClose,
  book,
}) => {
  const [createBorrow, { isLoading }] = useCreateBorrowMutation();
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  // Set default due date when modal opens (minimum 1 day from today)
  useEffect(() => {
    if (isOpen) {
      // Set default due date to 14 days from now
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 14);
      setDueDate(defaultDate.toISOString().split("T")[0]);
    }
  }, [isOpen]);

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!book || !dueDate) return;

    setError(null);

    try {
      // Validate due date is in the future
      const selectedDate = new Date(dueDate);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      if (selectedDate < tomorrow) {
        setError("Due date must be at least tomorrow");
        return;
      }

      await createBorrow({
        book: book._id,
        quantity,
        dueDate: selectedDate.toISOString(),
      }).unwrap();

      // Reset form
      setQuantity(1);
      setDueDate("");
      onClose();
    } catch (err) {
      setError("Failed to borrow book. Please try again.");
      console.error("Failed to borrow book:", err);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setQuantity(1);
      setDueDate("");
      setError(null);
      onClose();
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDueDate(selectedDate);

    // Clear any previous date errors
    if (error && error.includes("Due date")) {
      setError(null);
    }
  };

  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Borrow Book</h2>
              <p className="text-sm text-gray-500">
                Check out book from library
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isLoading}
            className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:transform-none"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Book Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 space-y-3 border border-blue-100">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-gray-900">{book.title}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-gray-600">by {book.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Hash className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600 font-mono">
                {book.isbn}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Copy className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">
                Available copies:{" "}
                <span className="font-semibold text-green-700">
                  {book.copies}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Copy className="h-4 w-4 mr-2 text-gray-500" />
              Quantity *
            </label>
            <input
              type="number"
              min="1"
              max={book.copies}
              required
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="Enter quantity"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum {book.copies} copies available
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              Due Date *
            </label>
            <div
              className="relative cursor-pointer"
              onClick={() => {
                const dateInput = document.getElementById(
                  "due-date-input"
                ) as HTMLInputElement;
                if (dateInput && !isLoading) {
                  dateInput.focus();
                  if (dateInput.showPicker) {
                    dateInput.showPicker();
                  }
                }
              }}
            >
              <input
                id="due-date-input"
                type="date"
                required
                value={dueDate}
                onChange={handleDateChange}
                min={getMinDate()}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors cursor-pointer"
                disabled={isLoading}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Must be at least tomorrow. Default is 14 days from today.
            </p>
            {dueDate && (
              <p className="text-xs text-emerald-600 mt-1 font-medium">
                Selected:{" "}
                {new Date(dueDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <Button
              type="submit"
              disabled={isLoading || !dueDate}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none border-0"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Borrow Book
                </>
              )}
            </Button>
            <Button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-gray-500 to-slate-500 hover:from-gray-600 hover:to-slate-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none border-0"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookBorrowModal;
