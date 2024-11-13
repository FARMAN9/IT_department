import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const ImageSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [intervalId, setIntervalId] = useState(null);

  const images = [
    {
      url: "https://images.pexels.com/photos/16689050/pexels-photo-16689050/free-photo-of-woman-hand-on-koran.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Slide 1",
    },
    {
      url: "https://images.pexels.com/photos/8489005/pexels-photo-8489005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Slide 2",
    },
    {
      url: "https://images.pexels.com/photos/2432394/pexels-photo-2432394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Slide 3",
    },
    { url: "/api/placeholder/800/400", alt: "Slide 4" },
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide functionality
  useEffect(() => {
    if (isPlaying) {
      const id = setInterval(nextSlide, 3000); // Change slide every 3 seconds
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, nextSlide, intervalId]);

  // Pause auto-slide when hovering over the slider
  const handleMouseEnter = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      const id = setInterval(nextSlide, 3000);
      setIntervalId(id);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto h-96 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {/* Slider container */}
      <div className="relative w-full h-full perspective-1000">
        {/* Images */}
        <div className="relative w-full h-full">
          {images.map((image, index) => {
            const difference = index - currentIndex;
            const rotationY = difference * 45;
            const translateZ = difference === 0 ? 0 : -300;
            const opacity = Math.abs(difference) <= 1 ? 1 : 0;

            return (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out`}
                style={{
                  transform: `rotateY(${rotationY}deg) translateZ(${translateZ}px)`,
                  opacity,
                }}>
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-lg shadow-xl"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Play/Pause button */}
      <button
        onClick={togglePlayPause}
        className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors">
        {isPlaying ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Play className="w-6 h-6" />
        )}
      </button>

      {/* Dots navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlide;
