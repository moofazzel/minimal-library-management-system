import { BarChart3, LayoutGrid, ListIcon, Plus } from "lucide-react";
import { Button } from "../ui/Button";

function BookSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Book Management 🛠️
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your library's book collection
          </p>
        </div>
      </div>

      {/* Sticky Toggle Buttons */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 -mx-4 px-4 py-4 mb-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Statistics Toggle */}
            <Button
              variant="ghost"
              disabled
              className="!bg-gray-400 text-gray-600 opacity-50"
              title="Toggle Statistics"
            >
              <BarChart3 className="h-5 w-5" />
              <span className="ml-2 font-medium">Stats</span>
            </Button>

            {/* View Mode Toggles */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <Button
                variant="ghost"
                disabled
                className="!bg-gray-400 text-gray-600 opacity-50"
                title="List View"
              >
                <ListIcon className="h-5 w-5" />
                <span className="ml-2 font-medium">List</span>
              </Button>
              <Button
                variant="ghost"
                disabled
                className="!bg-gray-400 text-gray-600 opacity-50"
                title="Grid View"
              >
                <LayoutGrid className="h-5 w-5" />
                <span className="ml-2 font-medium">Grid</span>
              </Button>
            </div>
          </div>

          {/* Add Book Button */}
          <Button
            disabled
            className="!bg-gray-400 text-gray-600 opacity-50 px-6 py-3 rounded-lg font-medium"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span>Add New Book</span>
          </Button>
        </div>
      </div>

      {/* Search and Filter Skeleton */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="md:w-48">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Results Summary Skeleton */}
      <div className="mb-4">
        <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
      </div>

      {/* Books Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border p-4">
            <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="mt-4">
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 mt-2 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSkeleton;
