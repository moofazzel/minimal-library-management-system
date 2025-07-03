import { Heart } from "lucide-react";

const FooterCTA = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-3 sm:px-0 text-center">
        <div className="flex items-center justify-center space-x-2 text-white">
          <Heart className="h-5 w-5 text-red-500 animate-pulse" />
          <span className="font-medium">
            Made with love for book lovers worldwide
          </span>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
