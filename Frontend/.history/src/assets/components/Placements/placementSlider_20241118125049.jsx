import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonialData = [
  {
    name: "Farman ali",
    image: "",
    description:
      "City Cabs made my daily commute a breeze! The app is user-friendly, and my cab arrived within minutes. Highly recommend!",
    aosDelay: "0",
  },
  {
    name: "Hannan",
    image: "",
    description:
      "I had a wonderful experience with City Cabs! My driver was not only punctual but also incredibly friendly. I felt safe and comfortable the entire ride.",
    aosDelay: "300",
  },
  {
    name: "aaqib ",
    image: "",
    description:
      "City Cabs offers fantastic prices without compromising quality. I appreciate the transparency in fares. Best cab service in Srinagar",
    aosDelay: "1000",
  },
  {
    name: "Dr Sabir",
    image: "",
    description:
      "I've used City Cabs for my office rides, and they've never let me down. Always on time, and the drivers are very professional!",
    aosDelay: "1500",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  // Handle resize and set cards to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setCardsToShow(3);
      } else if (window.innerWidth >= 768) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    };

    // Initial call
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex > testimonialData.length - cardsToShow ? 0 : nextIndex;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [cardsToShow]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex > testimonialData.length - cardsToShow ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? testimonialData.length - cardsToShow : nextIndex;
    });
  };

  const getTranslateValue = () => {
    const cardWidth = 100 / cardsToShow;
    return -(currentIndex * cardWidth);
  };

  return (
    <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="space-y-4 pb-12">
          <p className="text-3xl font-semibold text-center sm:text-4xl font-serif">
            What Our Clients Say About Us
          </p>
          <p className="text-center sm:px-44">{/*here some data*/}</p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute md:left-0 left-8 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full bg-yellow-200 dark:bg-yellow-800 hover:bg-yellow-300 dark:hover:bg-yellow-700 transition-colors z-10"
            aria-label="Previous testimonial">
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute md:right-0 right-8 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full bg-yellow-200 dark:bg-yellow-800 hover:bg-yellow-300 dark:hover:bg-yellow-700 transition-colors z-10"
            aria-label="Next testimonial">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Cards */}
          <div className="overflow-hidden relative px-4">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${getTranslateValue()}%)`,
              }}>
              {testimonialData.map((testimonial, index) => (
                <div
                  key={index}
                  className={`px-2 ${
                    cardsToShow === 3
                      ? "w-1/3"
                      : cardsToShow === 2
                      ? "w-1/2"
                      : "w-full"
                  } flex-shrink-0`}>
                  <div className="card text-center space-y-6 p-6 dark:bg-white/20 bg-gray-100 rounded-lg shadow-lg h-full">
                    <div className="grid place-items-center">
                      <img
                        src="https://picsum.photos/200"
                        alt={testimonial.name}
                        className="rounded-full w-16 h-16"
                      />
                    </div>
                    <div className="text-xl">⭐⭐⭐⭐⭐</div>
                    <p className="text-base">{testimonial.description}</p>
                    <p className="text-lg font-semibold">{testimonial.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {Array.from({
              length: testimonialData.length - (cardsToShow - 1),
            }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-blue-500"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial set ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
