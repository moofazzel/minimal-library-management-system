import { useEffect, useState } from "react";
import type { Book, CreateBookRequest } from "../../types";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";

interface BookFormProps {
  book?: Book;
  onSubmit: (data: CreateBookRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const BookForm = ({
  book,
  onSubmit,
  onCancel,
  isLoading = false,
}: BookFormProps) => {
  const [formData, setFormData] = useState<CreateBookRequest>({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description,
        copies: book.copies,
        available: book.available,
      });
    }
  }, [book]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }

    if (!formData.genre.trim()) {
      newErrors.genre = "Genre is required";
    }

    if (!formData.isbn.trim()) {
      newErrors.isbn = "ISBN is required";
    } else if (!/^\d{10}(\d{3})?$/.test(formData.isbn.replace(/-/g, ""))) {
      newErrors.isbn = "Please enter a valid ISBN (10 or 13 digits)";
    }

    if (formData.copies < 0) {
      newErrors.copies = "Copies cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (
    field: keyof CreateBookRequest,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{book ? "Edit Book" : "Add New Book"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title *
              </label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter book title"
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="author" className="text-sm font-medium">
                Author *
              </label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                placeholder="Enter author name"
                className={errors.author ? "border-destructive" : ""}
              />
              {errors.author && (
                <p className="text-sm text-destructive">{errors.author}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="genre" className="text-sm font-medium">
                Genre *
              </label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) => handleInputChange("genre", e.target.value)}
                placeholder="Enter genre"
                className={errors.genre ? "border-destructive" : ""}
              />
              {errors.genre && (
                <p className="text-sm text-destructive">{errors.genre}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="isbn" className="text-sm font-medium">
                ISBN *
              </label>
              <Input
                id="isbn"
                value={formData.isbn}
                onChange={(e) => handleInputChange("isbn", e.target.value)}
                placeholder="Enter ISBN"
                className={errors.isbn ? "border-destructive" : ""}
              />
              {errors.isbn && (
                <p className="text-sm text-destructive">{errors.isbn}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="copies" className="text-sm font-medium">
                Copies *
              </label>
              <Input
                id="copies"
                type="number"
                min="0"
                value={formData.copies}
                onChange={(e) =>
                  handleInputChange("copies", parseInt(e.target.value) || 0)
                }
                className={errors.copies ? "border-destructive" : ""}
              />
              {errors.copies && (
                <p className="text-sm text-destructive">{errors.copies}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="available" className="text-sm font-medium">
                Available
              </label>
              <div className="flex items-center space-x-2">
                <input
                  id="available"
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) =>
                    handleInputChange("available", e.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">
                  Book is available for borrowing
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter book description"
              rows={4}
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : book ? "Update Book" : "Add Book"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookForm;
