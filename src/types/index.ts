export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
}

export interface UpdateBookRequest extends Partial<CreateBookRequest> {
  id: string;
}

export interface Borrow {
  id: string;
  bookId: string;
  bookTitle: string;
  isbn: string;
  quantity: number;
  dueDate: string;
  createdAt: string;
}

export interface CreateBorrowRequest {
  bookId: string;
  quantity: number;
  dueDate: string;
}

export interface BorrowSummary {
  bookId: string;
  bookTitle: string;
  isbn: string;
  totalQuantityBorrowed: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
