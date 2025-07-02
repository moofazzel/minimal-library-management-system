import Layout from "@/components/layout/Layout";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const BookDetailPage = lazy(() => import("@/pages/BookDetailPage"));
const BooksPage = lazy(() => import("@/pages/BooksPage"));
const BorrowBookPage = lazy(() => import("@/pages/BorrowBookPage"));
const BorrowSummaryPage = lazy(() => import("@/pages/BorrowSummaryPage"));
const EditBookPage = lazy(() => import("@/pages/EditBookPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const CreateBookPage = lazy(() => import("@/pages/CreateBookPage"));

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
    path: "/create-book",
    element: (
      <Layout>
        <CreateBookPage />
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
    path: "/edit-book/:id",
    element: (
      <Layout>
        <EditBookPage />
      </Layout>
    ),
  },
  {
    path: "/borrow/:bookId",
    element: (
      <Layout>
        <BorrowBookPage />
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
