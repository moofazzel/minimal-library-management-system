import { Heart } from "lucide-react";

const FooterCTA = () => {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Heart className="h-5 w-5 text-red-500" />
          <span>Made with love for book lovers worldwide</span>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
