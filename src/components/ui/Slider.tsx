import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "../../lib/utils";

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  overlay?: boolean;
  kenBurns?: boolean;
  parallax?: boolean;
}

interface SliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
  showPlayPause?: boolean;
  className?: string;
}

const Slider = ({
  slides,
  autoPlay = true,
  interval = 5000,
  showNavigation = true,
  showPagination = true,
  showPlayPause = true,
  className,
}: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [slides.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [slides.length, isTransitioning]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setProgress(0);
      setTimeout(() => setIsTransitioning(false), 800);
    },
    [currentSlide, isTransitioning]
  );

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 100 / (interval / 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isPlaying, interval, nextSlide]);

  useEffect(() => {
    setProgress(0);
  }, [currentSlide]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Slides Container */}
      <div className="relative h-[600px] md:h-[700px] lg:h-[800px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-all duration-800 ease-out",
              index === currentSlide
                ? "opacity-100 scale-100 translate-x-0"
                : index < currentSlide
                ? "opacity-0 scale-95 -translate-x-full"
                : "opacity-0 scale-95 translate-x-full"
            )}
          >
            {/* Background Image with Ken Burns Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-10000 ease-out",
                  slide.kenBurns && index === currentSlide
                    ? "scale-110 animate-ken-burns"
                    : "scale-100"
                )}
              />
              {slide.overlay && (
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
              )}
            </div>

            {/* Content with Layer Animations */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white max-w-5xl mx-auto px-6 space-y-8">
                <div className="space-y-6">
                  {slide.subtitle && (
                    <div
                      className={cn(
                        "animate-slide-in-up",
                        index === currentSlide ? "animate-delay-200" : ""
                      )}
                    >
                      <span className="inline-block bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl text-lg font-bold border border-white/30 shadow-xl">
                        {slide.subtitle}
                      </span>
                    </div>
                  )}

                  <h2
                    className={cn(
                      "text-5xl md:text-7xl lg:text-8xl font-bold leading-tight animate-slide-in-up",
                      index === currentSlide ? "animate-delay-400" : ""
                    )}
                  >
                    {slide.title}
                  </h2>

                  {slide.description && (
                    <p
                      className={cn(
                        "text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-slide-in-up",
                        index === currentSlide ? "animate-delay-600" : ""
                      )}
                    >
                      {slide.description}
                    </p>
                  )}
                </div>

                {slide.ctaText && slide.ctaLink && (
                  <div
                    className={cn(
                      "animate-slide-in-up",
                      index === currentSlide ? "animate-delay-800" : ""
                    )}
                  >
                    <a
                      href={slide.ctaLink}
                      className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-110 transform transition-all duration-300 border border-white/20 backdrop-blur-md"
                    >
                      <span className="text-white">{slide.ctaText}</span>
                      <ChevronRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Play/Pause Button */}
      {showPlayPause && (
        <button
          onClick={togglePlayPause}
          className="absolute top-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl flex items-center justify-center transition-all duration-300 z-30 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 hover:scale-110 transform backdrop-blur-md border border-white/20"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </button>
      )}

      {/* Navigation Arrows */}
      {showNavigation && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-transparent hover:bg-white/10 text-white rounded-2xl flex items-center justify-center transition-all duration-300 z-30 shadow-lg hover:shadow-xl hover:shadow-white/25 hover:scale-110 transform backdrop-blur-lg border border-white/30"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-transparent hover:bg-white/10 text-white rounded-2xl flex items-center justify-center transition-all duration-300 z-30 shadow-lg hover:shadow-xl hover:shadow-white/25 hover:scale-110 transform backdrop-blur-lg border border-white/30"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {showPagination && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2.5 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "size-2 rounded-full transition-all duration-300 hover:scale-125 border border-white/30",
                index === currentSlide
                  ? "bg-gradient-to-r from-orange-500 to-red-600 scale-125 shadow-lg shadow-orange-500/50 border-white"
                  : "bg-white/30 hover:bg-white/50 hover:shadow-lg"
              )}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {autoPlay && (
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/20 z-30 backdrop-blur-md">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-100 ease-linear shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Slide Counter */}
      <div className="absolute top-6 left-6 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-sm font-bold z-30 border border-white/20 shadow-lg">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Slider;
