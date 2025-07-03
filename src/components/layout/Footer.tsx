import { BookOpen, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-3 sm:px-0 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">LibraryHub</span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© 2024 LibraryHub. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span className="hidden sm:inline">for book lovers</span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
