import { BookOpen, Calendar, Copy, Hash, User, X } from "lucide-react";
import type React from "react";
import { startTransition, useEffect, useOptimistic, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateBorrowMutation } from "../../redux/api/baseApi";
import type { Book } from "../../types";
import { Button } from "../ui/Button";

interface BookBorrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}

// Zod validation schema for borrow request
const borrowSchema = z.object({
  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .min(1, "At least 1 copy must be borrowed")
    .max(10, "Maximum 10 copies can be borrowed at once"),
  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine((date) => {
      const selectedDate = new Date(date);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      return selectedDate >= tomorrow;
    }, "Due date must be at least tomorrow"),
});

type BorrowFormData = z.infer<typeof borrowSchema>;

const BookBorrowModal: React.FC<BookBorrowModalProps> = ({
  isOpen,
  onClose,
  book,
}) => {
  const [createBorrow, { isLoading }] = useCreateBorrowMutation();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<BorrowFormData>({
    quantity: 1,
    dueDate: "",
  });

  // Optimistic state for the book
  const [optimisticBook, addOptimisticBook] = useOptimistic(
    book,
    (currentBook, optimisticUpdate: { type: "borrow"; quantity: number }) => {
      if (!currentBook) return currentBook;

      if (optimisticUpdate.type === "borrow") {
        return {
          ...currentBook,
          copies: Math.max(0, currentBook.copies - optimisticUpdate.quantity),
          available:
            Math.max(0, currentBook.copies - optimisticUpdate.quantity) > 0,
        };
      }

      return currentBook;
    }
  );

  // Set default due date when modal opens (minimum 1 day from today)
  useEffect(() => {
    if (isOpen) {
      // Set default due date to 14 days from now
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 14);
      setFormData((prev) => ({
        ...prev,
        dueDate: defaultDate.toISOString().split("T")[0],
      }));
    }
  }, [isOpen]);

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const validateField = (
    field: keyof BorrowFormData,
    value: string | number
  ) => {
    try {
      const fieldSchema = borrowSchema.shape[field];
      fieldSchema.parse(value);
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find((e) => e.path.includes(field));
        if (fieldError) {
          setFieldErrors((prev) => ({ ...prev, [field]: fieldError.message }));
        }
      }
      return false;
    }
  };

  const handleFieldChange = (
    field: keyof BorrowFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!book) return;

    setFieldErrors({});

    try {
      // Validate form data
      const validatedData = borrowSchema.parse(formData);

      // Add optimistic update
      addOptimisticBook({ type: "borrow", quantity: validatedData.quantity });

      // Start transition for the actual API call
      startTransition(async () => {
        try {
          await createBorrow({
            book: book._id,
            quantity: validatedData.quantity,
            dueDate: new Date(validatedData.dueDate).toISOString(),
          }).unwrap();

          // Success toast
          toast.success("Book borrowed successfully!", {
            description: `${validatedData.quantity} copy${
              validatedData.quantity > 1 ? "ies" : "y"
            } of "${book.title}" borrowed until ${new Date(
              validatedData.dueDate
            ).toLocaleDateString()}.`,
            duration: 4000,
          });

          // Reset form
          setFormData({
            quantity: 1,
            dueDate: "",
          });
          onClose();
        } catch (error) {
          // Revert optimistic update on error
          console.error("Failed to borrow book:", error);
          toast.error("Failed to borrow book", {
            description:
              "An error occurred while borrowing the book. Please try again.",
            duration: 5000,
          });
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Validation errors
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          errors[field] = err.message;
        });
        setFieldErrors(errors);

        toast.error("Validation failed", {
          description: "Please check the form fields and try again.",
          duration: 5000,
        });
      }
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        quantity: 1,
        dueDate: "",
      });
      setFieldErrors({});
      onClose();
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    handleFieldChange("dueDate", selectedDate);
  };

  if (!isOpen) return null;

  // Use optimistic book for display
  const displayBook = optimisticBook || book;
  if (!displayBook) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Borrow Book</h2>
              <p className="text-sm text-gray-500">
                Select quantity and due date
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

        {/* Book Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 space-y-3 border border-blue-100">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-gray-900">
                {displayBook.title}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-gray-600">
                by {displayBook.author}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Hash className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600 font-mono">
                {displayBook.isbn}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Copy className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">
                Available copies:{" "}
                <span
                  className={`font-semibold ${
                    displayBook.copies > 0 ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {displayBook.copies}
                </span>
                {optimisticBook !== book && (
                  <span className="text-xs text-blue-600 ml-2">
                    (Processing...)
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Copy className="h-4 w-4 mr-2 text-gray-500" />
              Quantity *
            </label>
            <input
              type="number"
              min="1"
              max={Math.min(displayBook.copies, 10)}
              required
              value={formData.quantity}
              onChange={(e) =>
                handleFieldChange("quantity", parseInt(e.target.value) || 1)
              }
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                fieldErrors.quantity
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter quantity"
              disabled={isLoading}
            />
            {fieldErrors.quantity && (
              <p className="text-xs text-red-600 mt-1">
                {fieldErrors.quantity}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Maximum {Math.min(displayBook.copies, 10)} copies available
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              Due Date *
            </label>
            <input
              type="date"
              min={getMinDate()}
              required
              value={formData.dueDate}
              onChange={handleDateChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                fieldErrors.dueDate
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              disabled={isLoading}
            />
            {fieldErrors.dueDate && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.dueDate}</p>
            )}

            {formData.dueDate && (
              <p className="text-xs text-emerald-600 mt-1 font-medium">
                Selected:{" "}
                {new Date(formData.dueDate).toLocaleDateString("en-US", {
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
              disabled={
                isLoading ||
                Object.keys(fieldErrors).some(
                  (key) => fieldErrors[key] !== ""
                ) ||
                displayBook.copies === 0
              }
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
