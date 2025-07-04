import {
  BookOpen,
  CheckCircle,
  Copy,
  Edit,
  Edit3,
  FileText,
  Hash,
  HelpCircle,
  Tag,
  User,
} from "lucide-react";
import type React from "react";
import { startTransition, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { validateISBN } from "../../lib/utils";
import { useUpdateBookMutation } from "../../redux/api/baseApi";
import type { Book } from "../../types";
import { Genre } from "../../types";
import { Button } from "../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/Input";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/Textarea";

// Zod validation schema for update book request
const updateBookSchema = z.object({
  id: z.string().min(1, "Book ID is required"),
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
    .refine(
      (value) => {
        const result = validateISBN(value);
        return result.isValid;
      },
      (value) => {
        const result = validateISBN(value);
        return { message: result.error || "Invalid ISBN format" };
      }
    ),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  copies: z
    .number()
    .int("Copies must be a whole number")
    .min(0, "Copies cannot be negative")
    .max(100, "Maximum 100 copies allowed"),
  available: z.boolean().default(true),
});

type UpdateBookFormData = z.infer<typeof updateBookSchema>;

const BookEditModal = ({ book }: { book: Book }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<UpdateBookFormData>({
    id: "",
    title: "",
    author: "",
    genre: Genre.FICTION,
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  // Update form data when book changes
  useEffect(() => {
    if (book) {
      setFormData({
        id: book._id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description,
        copies: book.copies,
        available: book.available,
      });
      setFieldErrors({});
    }
  }, [book]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFieldErrors({});
    }
  }, [isOpen]);

  const validateField = (
    field: keyof UpdateBookFormData,
    value: string | number | boolean
  ) => {
    try {
      const fieldSchema = updateBookSchema.shape[field];
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
    field: keyof UpdateBookFormData,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!book) return;

    setFieldErrors({});

    try {
      // Validate entire form
      const validatedData = updateBookSchema.parse(formData);

      // Start transition for the actual API call
      startTransition(async () => {
        try {
          await updateBook(validatedData).unwrap();

          // Success toast
          toast.success("Book updated successfully!", {
            description: `${validatedData.title} by ${validatedData.author} has been updated.`,
            duration: 4000,
          });

          setIsOpen(false);
        } catch (error) {
          console.error("Failed to update book:", error);
          toast.error("Failed to update book", {
            description:
              "An error occurred while updating the book. Please try again.",
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
        className="flex-1 py-2 px-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white hover:text-gray-100 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
        title="Edit Book"
      >
        <Edit className="h-4 w-4 mr-1" />
        <span className="text-xs font-medium hidden md:block">Edit</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md max-h-[90vh] md:max-h-[85vh] p-0">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                <Edit3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">
                  Edit Book
                </span>
                <DialogDescription>Update book information</DialogDescription>
              </div>
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-full max-h-[calc(90vh-8rem)] md:max-h-[calc(85vh-8rem)]">
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                  Title *
                </label>
                <Input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  className={
                    fieldErrors.title
                      ? "border-red-300 focus-visible:ring-red-500"
                      : ""
                  }
                  placeholder="Enter book title"
                  disabled={isLoading}
                />
                {fieldErrors.title && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  Author *
                </label>
                <Input
                  type="text"
                  name="author"
                  required
                  value={formData.author}
                  onChange={(e) => handleFieldChange("author", e.target.value)}
                  className={
                    fieldErrors.author
                      ? "border-red-300 focus-visible:ring-red-500"
                      : ""
                  }
                  placeholder="Enter author name"
                  disabled={isLoading}
                />
                {fieldErrors.author && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors.author}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-gray-500" />
                  Genre *
                </label>
                <Select
                  name="genre"
                  value={formData.genre}
                  onValueChange={(value) =>
                    handleFieldChange("genre", value as Genre)
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger
                    className={`w-full !bg-white !border-gray-200 ${
                      fieldErrors.genre
                        ? "border-red-300 focus:ring-red-500"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Genre).map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.genre && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors.genre}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Hash className="h-4 w-4 mr-2 text-gray-500" />
                  ISBN *
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    name="isbn"
                    required
                    value={formData.isbn}
                    onChange={(e) => handleFieldChange("isbn", e.target.value)}
                    className={
                      fieldErrors.isbn
                        ? "border-red-300 focus-visible:ring-red-500 pr-10"
                        : "pr-10"
                    }
                    placeholder="Enter ISBN (10 or 13 digits)"
                    disabled={isLoading}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {formData.isbn && !fieldErrors.isbn ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <HelpCircle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                {fieldErrors.isbn && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors.isbn}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  Description *
                </label>
                <Textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    handleFieldChange("description", e.target.value)
                  }
                  className={`min-h-[100px] ${
                    fieldErrors.description
                      ? "border-red-300 focus-visible:ring-red-500"
                      : ""
                  }`}
                  placeholder="Enter book description"
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
                <Input
                  type="number"
                  name="copies"
                  required
                  min={0}
                  max={100}
                  value={formData.copies}
                  onChange={(e) =>
                    handleFieldChange("copies", parseInt(e.target.value) || 0)
                  }
                  className={
                    fieldErrors.copies
                      ? "border-red-300 focus-visible:ring-red-500"
                      : ""
                  }
                  placeholder="Enter number of copies"
                  disabled={isLoading}
                />
                {fieldErrors.copies && (
                  <p className="text-xs text-red-600 mt-1">
                    {fieldErrors.copies}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Maximum 100 copies allowed
                </p>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button
                  type="submit"
                  disabled={
                    isLoading ||
                    Object.keys(fieldErrors).some(
                      (key) => fieldErrors[key] !== ""
                    )
                  }
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none border-0"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Update Book
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

export default BookEditModal;
