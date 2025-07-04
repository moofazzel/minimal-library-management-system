import Layout from "@/components/layout/Layout";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const BookDetailPage = lazy(() => import("@/pages/bookDetails/BookDetailPage"));
const BooksPage = lazy(() => import("@/pages/allBooks/BooksPage"));
const BorrowSummaryPage = lazy(
  () => import("@/pages/borrowSummary/BorrowSummaryPage")
);
const HomePage = lazy(() => import("@/pages/home/HomePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/books",
    element: (
      <Layout>
        <BooksPage />
      </Layout>
    ),
  },
  {
    path: "/books/:id",
    element: (
      <Layout>
        <BookDetailPage />
      </Layout>
    ),
  },
  {
    path: "/borrow-summary",
    element: (
      <Layout>
        <BorrowSummaryPage />
      </Layout>
    ),
  },
]);

export default router;
