import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
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

const baseUrl = "https://phl-2-assignment-03-5vy5.vercel.app/api/";

// Simple error type
export interface ApiError {
  status: number;
  data: ApiErrorResponse;
}

// Simple base query
const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | ApiError
> = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({ baseUrl })(args, api, extraOptions);

  if (result.error) {
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
    // Get all books
    getBooks: builder.query<PaginatedResponse<Book>, BookQueryParams>({
      query: (params) => ({
        url: "/books",
        params,
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
    getBorrows: builder.query<PaginatedResponse<Borrow>, BorrowQueryParams>({
      query: (params) => ({
        url: "/borrows",
        params,
      }),
      providesTags: ["Borrow"],
    }),

    // Create a new borrow
    createBorrow: builder.mutation<ApiResponse<Borrow>, CreateBorrowRequest>({
      query: (borrowData) => ({
        url: "/borrow",
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
      query: () => "/borrow",
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
