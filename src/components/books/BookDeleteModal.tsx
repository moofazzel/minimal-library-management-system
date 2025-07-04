import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useDeleteBookMutation } from "../../redux/api/baseApi";
import type { Book } from "../../types";
import { Button } from "../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface BookDeleteModalProps {
  book: Book;
}

// Zod validation schema for delete book request
const deleteBookSchema = z.object({
  bookId: z.string().min(1, "Book ID is required"),
  bookTitle: z.string().min(1, "Book title is required"),
});

type DeleteBookFormData = z.infer<typeof deleteBookSchema>;

export default function BookDeleteModal({ book }: BookDeleteModalProps) {
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
        className="flex-1 py-2 px-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white hover:text-gray-100 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105 border border-red-400 hover:border-red-500"
        title="Delete Book"
      >
        <Trash2 className="h-4 w-4 mr-1" />
        <span className="text-xs font-medium hidden md:block">Delete</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md max-h-[90vh] md:max-h-[85vh] p-0">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-red-100 to-pink-100 rounded-lg">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">
                  Delete Book
                </span>
                <DialogDescription>Remove book from library</DialogDescription>
              </div>
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-full max-h-[calc(90vh-8rem)] md:max-h-[calc(85vh-8rem)]">
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
              <div className="flex space-x-3">
                <Button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none border-0"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Book
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-gray-500 to-slate-500 hover:from-gray-600 hover:to-slate-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none border-0"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
