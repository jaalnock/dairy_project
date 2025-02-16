import React, { useState, useEffect } from "react";

export function ProductImageSlider({
  slides = [],
  autoPlayInterval = 500,
  className = "",
}) {
  // Changed interval to 500ms
  const [currentSlide, setCurrentSlide] = useState(0);

  // Check for empty slides
  if (!slides || slides.length == 0) {
    return <div>No products available at the moment.</div>;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, slides.length]);

  return (
    <div className={`relative overflow-hidden ${className} mt-0`}>
      {/* Product Slider */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110 hover:rotate-2"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-xl">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl drop-shadow-lg">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-5 h-5 rounded-full transition-all ${
              currentSlide === index ? "bg-yellow-500 w-10" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
