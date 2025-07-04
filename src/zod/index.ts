import { validateISBN } from "@/lib/utils";
import { Genre } from "@/types";
import { z } from "zod";

// Zod validation schema for borrow request
export const borrowSchema = z.object({
  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .min(1, "At least 1 copy must be borrowed")
    .max(10, "Maximum 10 copies can be borrowed at once"),
  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine((date: string) => {
      const selectedDate = new Date(date);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      return selectedDate >= tomorrow;
    }, "Due date must be at least tomorrow"),
});

export type BorrowFormData = z.infer<typeof borrowSchema>;

// Zod validation schema based on API documentation
export const createBookSchema = z.object({
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
    .min(1, "At least 1 copy is required")
    .max(100, "Maximum 100 copies allowed"),
  available: z.boolean().default(true),
});

export type CreateBookFormData = z.infer<typeof createBookSchema>;
