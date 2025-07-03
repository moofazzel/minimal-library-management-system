import BookPageTurn from "../components/ui/BookPageTurn";

const BookDemoPage = () => {
  const sampleBookPages = [
    {
      id: 1,
      title: "Chapter 1: The Beginning",
      content:
        "In the quiet corners of the library, where dust motes dance in the golden afternoon light, stories come alive. Each book holds within its pages the power to transport us to distant lands, introduce us to unforgettable characters, and teach us lessons that last a lifetime.",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop",
      pageNumber: 1,
    },
    {
      id: 2,
      title: "Chapter 2: The Journey Begins",
      content:
        "The protagonist stood at the crossroads of destiny, the weight of their choices heavy upon their shoulders. The path ahead was uncertain, but the call to adventure was irresistible. With a deep breath and a heart full of courage, they took the first step into the unknown.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      pageNumber: 2,
    },
    {
      id: 3,
      title: "Chapter 3: The Discovery",
      content:
        "Hidden within the ancient tome were secrets that had been guarded for centuries. The discovery would change everything - not just for our hero, but for the entire world. The knowledge contained within these pages held the power to heal or destroy.",
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
      pageNumber: 3,
    },
    {
      id: 4,
      title: "Chapter 4: The Transformation",
      content:
        "Change is the only constant in life, and our characters learned this truth in the most profound way. Through trials and tribulations, they emerged stronger, wiser, and more compassionate. The journey had transformed them into the heroes they were always meant to be.",
      image:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=500&fit=crop",
      pageNumber: 4,
    },
    {
      id: 5,
      title: "Chapter 5: The Resolution",
      content:
        "As the final pages turn, we find our characters at peace with their journey. The lessons learned, the friendships forged, and the challenges overcome have all led to this moment of understanding. Every story has an ending, but the best ones live on in our hearts forever.",
      pageNumber: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-bold text-gray-900">
            Interactive <span className="text-amber-600">Book Experience</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the magic of reading with our interactive book
            page-turning effect. Click on the book to open it and explore its
            pages.
          </p>
        </div>

        {/* Book Component */}
        <div className="flex justify-center">
          <BookPageTurn
            pages={sampleBookPages}
            title="The Library Chronicles"
            author="By LibraryHub"
            className="w-full max-w-4xl"
          />
        </div>

        {/* Instructions */}
        <div className="mt-16 text-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Click to Open
              </h3>
              <p className="text-gray-600 text-sm">
                Click on the closed book to open it and reveal its contents.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Navigate Pages
              </h3>
              <p className="text-gray-600 text-sm">
                Use the navigation buttons or dots to turn pages and explore the
                book.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Close Book</h3>
              <p className="text-gray-600 text-sm">
                Click "Close Book" to return to the closed state and start over.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Interactive Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📖</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Realistic Design
              </h3>
              <p className="text-gray-600 text-sm">
                Beautiful book cover with spine and page edges for authenticity.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🔄</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Smooth Transitions
              </h3>
              <p className="text-gray-600 text-sm">
                Fluid page-turning animations with loading effects.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🖼️</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Image Support
              </h3>
              <p className="text-gray-600 text-sm">
                Each page can display images alongside text content.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Easy Navigation
              </h3>
              <p className="text-gray-600 text-sm">
                Intuitive controls with page indicators and navigation buttons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDemoPage;
