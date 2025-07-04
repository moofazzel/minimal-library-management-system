import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/api";
import type {
  ApiErrorResponse,
  ApiResponse,
  Book,
  BookQueryParams,
  Borrow,
  BorrowQueryParams,
  BorrowSummary,
  CreateBookRequest,
  CreateBorrowRequest,
  PaginatedResponse,
  UpdateBookRequest,
} from "../../types";

const baseUrl = API_BASE_URL;

// Simple error type
export interface ApiError {
  status: number;
  data: ApiErrorResponse;
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Books", "Borrows"],
  endpoints: (builder) => ({
    // Get all books
    getBooks: builder.query<PaginatedResponse<Book>, BookQueryParams>({
      query: (params) => ({
        url: "/books",
        params,
      }),
      providesTags: ["Books"],
    }),

    // Get a single book by ID
    getBookById: builder.query<ApiResponse<Book>, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Books", id }],
    }),

    // Create a new book
    createBook: builder.mutation<ApiResponse<Book>, CreateBookRequest>({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Books"],
    }),

    // Update an existing book
    updateBook: builder.mutation<ApiResponse<Book>, UpdateBookRequest>({
      query: ({ id, ...bookData }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Books", id },
        "Books",
      ],
    }),

    // Delete a book
    deleteBook: builder.mutation<ApiResponse<{ id: string }>, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

    // Get all borrows
    getBorrows: builder.query<PaginatedResponse<Borrow>, BorrowQueryParams>({
      query: (params) => ({
        url: "/borrows",
        params,
      }),
      providesTags: ["Borrows"],
    }),

    // Create a new borrow
    createBorrow: builder.mutation<ApiResponse<Borrow>, CreateBorrowRequest>({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Borrows", "Books"],
    }),

    // Get borrow summary
    getBorrowSummary: builder.query<ApiResponse<BorrowSummary[]>, void>({
      query: () => "/borrow",
      providesTags: ["Borrows"],
    }),
  }),
});

// Export typed hooks
export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetBorrowsQuery,
  useCreateBorrowMutation,
  useGetBorrowSummaryQuery,
} = baseApi;
