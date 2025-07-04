import {
  AlertCircle,
  ArrowLeft,
  BookMarked,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  FileText,
  Hash,
  Tag,
  User,
  XCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BookBorrowModal from "../../components/books/BookBorrowModal";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { useGetBookByIdQuery } from "../../redux/api/baseApi";
import { Genre } from "../../types";

// Skeleton component for loading state
const BookDetailSkeleton = () => (
  <div className="space-y-8 max-w-6xl mx-auto">
    {/* Header Skeleton */}
    <div className="flex items-center gap-4">
      <div className="h-10 w-10 bg-muted rounded animate-pulse" />
      <div className="h-8 w-48 bg-muted rounded animate-pulse" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content Skeleton */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="h-8 w-64 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar Skeleton */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="h-6 w-24 bg-muted rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-6 w-20 bg-muted rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-full bg-muted rounded animate-pulse"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetBookByIdQuery(id || "");

  if (isLoading) {
    return <BookDetailSkeleton />;
  }

  if (error || !data?.data) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <span>Failed to load book details. Please try again.</span>
          </div>
        </div>
      </div>
    );
  }

  const book = data.data;

  const getGenreColor = (genre: Genre) => {
    const colors: Record<Genre, string> = {
      [Genre.FICTION]: "bg-gradient-to-r from-purple-500 to-pink-500",
      [Genre.NON_FICTION]: "bg-gradient-to-r from-blue-500 to-cyan-500",
      [Genre.SCIENCE]: "bg-gradient-to-r from-green-500 to-emerald-500",
      [Genre.HISTORY]: "bg-gradient-to-r from-amber-500 to-orange-500",
      [Genre.BIOGRAPHY]: "bg-gradient-to-r from-red-500 to-rose-500",
      [Genre.FANTASY]: "bg-gradient-to-r from-indigo-500 to-purple-500",
    };
    return colors[genre] || "bg-gradient-to-r from-gray-500 to-slate-500";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8 container mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Books
        </Button>
        <div className="h-6 w-px bg-border" />
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Book Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Book Information Card */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">
                    {book.title}
                  </h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span className="text-lg">{book.author}</span>
                  </div>
                </div>
                <Badge
                  className={`${getGenreColor(
                    book.genre
                  )} text-white border-0 px-3 py-1`}
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {book.genre.replace("_", " ")}
                </Badge>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {book.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Book Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Book Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      ISBN:
                    </span>
                    <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      {book.isbn}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Copy className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Total Copies:
                    </span>
                    <Badge variant="secondary" className="font-mono">
                      {book.copies}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Created:
                    </span>
                    <span className="text-sm">
                      {formatDate(book.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Updated:
                    </span>
                    <span className="text-sm">
                      {formatDate(book.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Availability Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookMarked className="h-5 w-5 text-primary" />
                Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Status:
                </span>
                <div className="flex items-center gap-2">
                  {book.available ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <Badge
                    className={`font-medium ${
                      book.available
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
                        : "bg-gradient-to-r from-red-500 to-rose-500 text-white border-0"
                    }`}
                  >
                    {book.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Copies Available:
                </span>
                <Badge variant="outline" className="font-mono">
                  {book.copies}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Borrow Modal */}
              <BookBorrowModal book={book} />
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Genre</span>
                <Badge variant="outline" className="text-xs">
                  {book.genre.replace("_", " ")}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Copies</span>
                <span className="font-mono font-medium">{book.copies}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Status</span>
                <Badge
                  className={`text-xs ${
                    book.available
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
                      : "bg-gradient-to-r from-red-500 to-rose-500 text-white border-0"
                  }`}
                >
                  {book.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
