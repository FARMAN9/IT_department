import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      url: "https://www.pexels.com/photo/man-in-cap-and-shirt-standing-with-forest-behind-17249659/",
      alt: "Slide 1",
    },
    { url: "/api/placeholder/800/400", alt: "Slide 2" },
    { url: "/api/placeholder/800/400", alt: "Slide 3" },
    { url: "/api/placeholder/800/400", alt: "Slide 4" },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto h-96 overflow-hidden">
      {/* Slider container */}
      <div className="relative w-full h-full perspective-1000">
        {/* Images */}
        <div className="relative w-full h-full">
          {images.map((image, index) => {
            // Calculate rotation and position based on index difference
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
                  src=https://www.pexels.com/photo/man-in-cap-and-shirt-standing-with-forest-behind-17249659/     {image.url}
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
