import {
  BookOpen,
  CheckCircle,
  Copy,
  FileText,
  Hash,
  Tag,
  User,
  X,
} from "lucide-react";
import type React from "react";
import { startTransition, useEffect, useOptimistic, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateBookMutation } from "../../redux/api/baseApi";
import { Genre, type Book } from "../../types";
import { Button } from "../ui/Button";

interface BookAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Zod validation schema based on API documentation
const createBookSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must be less than 200 characters"),
  author: z
    .string()
    .min(1, "Author is required")
    .min(2, "Author must be at least 2 characters")
    .max(100, "Author must be less than 100 characters"),
  genre: z.nativeEnum(Genre, {
    errorMap: () => ({ message: "Please select a valid genre" }),
  }),
  isbn: z
    .string()
    .min(1, "ISBN is required")
    .regex(
      /^[0-9-]{10,17}$/,
      "ISBN must be 10-17 digits with optional hyphens"
    ),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  copies: z
    .number()
    .int("Copies must be a whole number")
    .min(1, "At least 1 copy is required")
    .max(100, "Maximum 100 copies allowed"),
  available: z.boolean().default(true),
});

type CreateBookFormData = z.infer<typeof createBookSchema>;

const BookAddModal: React.FC<BookAddModalProps> = ({ isOpen, onClose }) => {
  const [createBook, { isLoading }] = useCreateBookMutation();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<CreateBookFormData>({
    title: "",
    author: "",
    genre: Genre.FICTION,
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  // Optimistic state for the new book
  const [optimisticBook, addOptimisticBook] = useOptimistic(
    null as Book | null,
    (currentBook, newBookData: CreateBookFormData) => {
      console.log("🚀 ~ currentBook:", currentBook);
      // Create a temporary book object for optimistic display
      return {
        _id: `temp-${Date.now()}`,
        ...newBookData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        image: undefined,
      } as Book;
    }
  );

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: "",
        author: "",
        genre: Genre.FICTION,
        isbn: "",
        description: "",
        copies: 1,
        available: true,
      });
      setFieldErrors({});
    }
  }, [isOpen]);

  const validateField = (
    field: keyof CreateBookFormData,
    value: string | number | boolean
  ) => {
    try {
      const fieldSchema = createBookSchema.shape[field];
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
    field: keyof CreateBookFormData,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    try {
      // Validate entire form
      const validatedData = createBookSchema.parse(formData);

      // Add optimistic update
      addOptimisticBook(validatedData);

      // Start transition for the actual API call
      startTransition(async () => {
        try {
          await createBook(validatedData).unwrap();

          // Success toast
          toast.success("Book added successfully!", {
            description: `${validatedData.title} by ${validatedData.author} has been added to the library.`,
            duration: 4000,
          });

          // Reset form
          setFormData({
            title: "",
            author: "",
            genre: Genre.FICTION,
            isbn: "",
            description: "",
            copies: 1,
            available: true,
          });
          onClose();
        } catch (error) {
          // Revert optimistic update on error
          console.error("Failed to create book:", error);
          toast.error("Failed to add book", {
            description:
              "An error occurred while adding the book. Please try again.",
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
        title: "",
        author: "",
        genre: Genre.FICTION,
        isbn: "",
        description: "",
        copies: 1,
        available: true,
      });
      setFieldErrors({});
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
            <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex-shrink-0">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                Add New Book
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                Create a new book entry
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

        {/* Optimistic Preview */}
        {optimisticBook && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
            <div className="flex items-center space-x-2 mb-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm font-medium text-blue-700">
                Adding book to library...
              </span>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-200">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-gray-900">
                  {optimisticBook.title}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <User className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-gray-600">
                  by {optimisticBook.author}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Hash className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 font-mono">
                  {optimisticBook.isbn}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Copy className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">
                  Copies:{" "}
                  <span className="font-semibold text-green-700">
                    {optimisticBook.copies}
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-3 sm:space-y-4 pb-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                fieldErrors.title
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter book title"
              disabled={isLoading}
            />
            {fieldErrors.title && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <User className="h-4 w-4 mr-2 text-gray-500" />
              Author *
            </label>
            <input
              type="text"
              required
              value={formData.author}
              onChange={(e) => handleFieldChange("author", e.target.value)}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                fieldErrors.author
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter author name"
              disabled={isLoading}
            />
            {fieldErrors.author && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.author}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Tag className="h-4 w-4 mr-2 text-gray-500" />
              Genre *
            </label>
            <select
              required
              value={formData.genre}
              onChange={(e) =>
                handleFieldChange("genre", e.target.value as Genre)
              }
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer ${
                fieldErrors.genre
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              disabled={isLoading}
            >
              <option value={Genre.FICTION}>Fiction</option>
              <option value={Genre.NON_FICTION}>Non-Fiction</option>
              <option value={Genre.SCIENCE}>Science</option>
              <option value={Genre.HISTORY}>History</option>
              <option value={Genre.BIOGRAPHY}>Biography</option>
              <option value={Genre.FANTASY}>Fantasy</option>
            </select>
            {fieldErrors.genre && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.genre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Hash className="h-4 w-4 mr-2 text-gray-500" />
              ISBN *
            </label>
            <input
              type="text"
              required
              value={formData.isbn}
              onChange={(e) => handleFieldChange("isbn", e.target.value)}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono ${
                fieldErrors.isbn
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter ISBN number (e.g., 9780743273565)"
              disabled={isLoading}
            />
            {fieldErrors.isbn && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.isbn}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-gray-500" />
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
              rows={3}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                fieldErrors.description
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter book description (optional)"
              disabled={isLoading}
            />
            {fieldErrors.description && (
              <p className="text-xs text-red-600 mt-1">
                {fieldErrors.description}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Copy className="h-4 w-4 mr-2 text-gray-500" />
              Number of Copies *
            </label>
            <input
              type="number"
              min="1"
              max="100"
              required
              value={formData.copies}
              onChange={(e) =>
                handleFieldChange("copies", parseInt(e.target.value) || 1)
              }
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                fieldErrors.copies
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter number of copies"
              disabled={isLoading}
            />
            {fieldErrors.copies && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.copies}</p>
            )}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 p-2.5 sm:p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
            <input
              type="checkbox"
              id="available"
              checked={formData.available}
              onChange={(e) => handleFieldChange("available", e.target.checked)}
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 flex-shrink-0"
              disabled={isLoading}
            />
            <label
              htmlFor="available"
              className="text-sm font-medium text-gray-700 flex items-center"
            >
              <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                Available for borrowing
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
            <Button
              type="submit"
              disabled={
                isLoading ||
                Object.keys(fieldErrors).some((key) => fieldErrors[key] !== "")
              }
              className="w-full sm:flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none border-0 text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  <span className="text-xs sm:text-sm">Adding...</span>
                </div>
              ) : (
                <>
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span className="text-xs sm:text-sm">Add Book</span>
                </>
              )}
            </Button>
            <Button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="w-full sm:flex-1 bg-gradient-to-r from-gray-500 to-slate-500 hover:from-gray-600 hover:to-slate-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none border-0 text-sm sm:text-base"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAddModal;
