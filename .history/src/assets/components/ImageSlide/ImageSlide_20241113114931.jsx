import React, { useState } from "react";

const images = [
  "",
  "",
  "https://via.placeholder.com/600x400?text=Image+3",
  "https://via.placeholder.com/600x400?text=Image+4",
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative flex justify-center items-center w-full h-[400px] perspective-[1000px]">
      {/* Slider Wrapper */}
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="absolute inset-0 flex transition-transform duration-700"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}>
          {images.map((src, index) => (
            <div
              key={index}
              className="min-w-full h-full transform transition-all duration-700"
              style={{
                transform: `rotateY(${(index - currentIndex) * 30}deg) scale(${
                  index === currentIndex ? 1 : 0.9
                })`,
                zIndex: index === currentIndex ? 10 : 5,
              }}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2">
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2">
        ›
      </button>
    </div>
  );
}
