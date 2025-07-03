import { BookOpen, Calendar, Copy, Hash, User, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
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
      } else {
        // API errors
        console.error("Failed to borrow book:", error);
        toast.error("Failed to borrow book", {
          description:
            "An error occurred while borrowing the book. Please try again.",
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

  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto modal-scroll">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto my-4 max-h-[95vh] overflow-y-auto scrollbar-thin modal-scroll">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="p-1.5 sm:p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex-shrink-0">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                Borrow Book
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                Check out book from library
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
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Copy className="h-4 w-4 mr-2 text-gray-500" />
              Quantity *
            </label>
            <input
              type="number"
              min="1"
              max={Math.min(book.copies, 10)}
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
              Maximum {Math.min(book.copies, 10)} copies available
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
                value={formData.dueDate}
                onChange={handleDateChange}
                min={getMinDate()}
                className={`w-full px-4 py-3 pl-10 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors cursor-pointer ${
                  fieldErrors.dueDate
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
                disabled={isLoading}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            {fieldErrors.dueDate && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.dueDate}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Must be at least tomorrow. Default is 14 days from today.
            </p>
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
                Object.keys(fieldErrors).some((key) => fieldErrors[key] !== "")
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
