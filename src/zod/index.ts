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
