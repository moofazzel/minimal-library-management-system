import { BookOpen, Calendar, Copy, Hash, User, X } from "lucide-react";
import type React from "react";
import { startTransition, useEffect, useOptimistic, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";
import { useCreateBorrowMutation } from "../../redux/api/baseApi";
import type { Book } from "../../types";
import { borrowSchema, type BorrowFormData } from "../../zod";
import { Button } from "../ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface BookBorrowModalProps {
  book: Book;
}

const BookBorrowModal = ({ book }: BookBorrowModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
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
      setFormData((prev: BorrowFormData) => ({
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
    } catch (error: unknown) {
      if (error && typeof error === "object" && "errors" in error) {
        const zodError = error as {
          errors: Array<{ path: (string | number)[]; message: string }>;
        };
        const fieldError = zodError.errors.find(
          (err) => typeof field === "string" && err.path.includes(field)
        );
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
    setFormData((prev: BorrowFormData) => ({ ...prev, [field]: value }));
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
          setIsOpen(false);
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
    } catch (error: unknown) {
      if (error && typeof error === "object" && "errors" in error) {
        // Validation errors
        const zodError = error as {
          errors: Array<{ path: (string | number)[]; message: string }>;
        };
        const errors: Record<string, string> = {};
        zodError.errors.forEach((err) => {
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
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md max-h-[90vh] md:max-h-[85vh] p-0">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-red-100 data-[state=open]:text-red-950 hover:bg-red-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">
                  Borrow Book
                </span>
                <DialogDescription>
                  Select quantity and due date
                </DialogDescription>
              </div>
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-full max-h-[calc(90vh-8rem)] md:max-h-[calc(85vh-8rem)]">
            {/* Book Info */}
            <div className="p-6 border-b border-gray-200">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 space-y-3 border border-blue-100">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-gray-900">
                    {book.title}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-gray-600">
                    by {book.author}
                  </span>
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
                    <span
                      className={`font-semibold ${
                        book.copies > 0 ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {book.copies}
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
                <div className="relative w-full">
                  <DatePicker
                    selected={
                      formData.dueDate ? new Date(formData.dueDate) : null
                    }
                    onChange={(date: Date | null) => {
                      if (date) {
                        handleFieldChange(
                          "dueDate",
                          date.toISOString().split("T")[0]
                        );
                      }
                    }}
                    minDate={new Date(getMinDate())}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select due date"
                    className={`w-full px-4 py-3 pl-10 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                      fieldErrors.dueDate
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300"
                    }`}
                    disabled={isLoading}
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
                {fieldErrors.dueDate && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors.dueDate}
                  </p>
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
                    book.copies === 0
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
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookBorrowModal;
