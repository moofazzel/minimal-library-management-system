import { BookOpen, Calendar, Edit, Trash2 } from "lucide-react";
import type { Book } from "../../types";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onBorrow: (book: Book) => void;
}

const BookCard = ({ book, onEdit, onDelete, onBorrow }: BookCardProps) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle
              className="text-lg font-semibold truncate"
              title={book.title}
            >
              {book.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              by {book.author}
            </p>
          </div>
          <Badge
            variant={book.available ? "success" : "destructive"}
            className="ml-2 flex-shrink-0"
          >
            {book.available ? "Available" : "Unavailable"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Genre:</span>
            <span className="text-muted-foreground">{book.genre}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">ISBN:</span>
            <span className="text-muted-foreground font-mono">{book.isbn}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Copies:</span>
            <span className="text-muted-foreground">{book.copies}</span>
          </div>
        </div>

        {book.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {book.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-3">
        <div className="flex items-center space-x-2 w-full">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(book)}
            className="flex-1"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => onBorrow(book)}
            disabled={!book.available || book.copies === 0}
            className="flex-1"
          >
            <Calendar className="h-4 w-4 mr-1" />
            Borrow
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(book)}
            className="flex-shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
