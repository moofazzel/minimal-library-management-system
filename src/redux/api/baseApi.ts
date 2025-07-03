import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  ApiResponse,
  Book,
  Borrow,
  BorrowSummary,
  CreateBookRequest,
  CreateBorrowRequest,
  PaginatedResponse,
  UpdateBookRequest,
} from "../../types";

const baseUrl = "https://phl-2-assignment-03-5vy5.vercel.app/api/";

// Custom error type for better error handling
export interface ApiError {
  status: number;
  data: {
    message: string;
    success: false;
  };
}

// Enhanced base query with better error handling
const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | ApiError
> = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({ baseUrl })(args, api, extraOptions);

  if (result.error) {
    // Transform fetch errors into consistent format
    const error: ApiError = {
      status:
        "status" in result.error && typeof result.error.status === "number"
          ? result.error.status
          : 500,
      data: {
        message:
          "data" in result.error &&
          typeof result.error.data === "object" &&
          result.error.data
            ? (result.error.data as { message?: string }).message ||
              "An error occurred"
            : "Network error",
        success: false,
      },
    };
    return { error };
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["Book", "Borrow"],
  endpoints: (builder) => ({
    // Get all books with pagination support
    getBooks: builder.query<
      PaginatedResponse<Book>,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/books",
        params: { page, limit },
      }),
      providesTags: ["Book"],
    }),

    // Get a single book by ID
    getBookById: builder.query<ApiResponse<Book>, string>({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: "Book", id }],
    }),

    // Create a new book
    createBook: builder.mutation<ApiResponse<Book>, CreateBookRequest>({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),

    // Update an existing book
    updateBook: builder.mutation<ApiResponse<Book>, UpdateBookRequest>({
      query: ({ id, ...bookData }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Book", id },
        "Book",
      ],
    }),

    // Delete a book
    deleteBook: builder.mutation<ApiResponse<{ id: string }>, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),

    // Get all borrows
    getBorrows: builder.query<
      PaginatedResponse<Borrow>,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/borrows",
        params: { page, limit },
      }),
      providesTags: ["Borrow"],
    }),

    // Create a new borrow
    createBorrow: builder.mutation<ApiResponse<Borrow>, CreateBorrowRequest>({
      query: (borrowData) => ({
        url: "/borrows",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Borrow", "Book"],
    }),

    // Get borrow summary
    getBorrowSummary: builder.query<
      ApiResponse<{ summary: BorrowSummary[] }>,
      void
    >({
      query: () => "/borrows/summary",
      providesTags: ["Borrow"],
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
