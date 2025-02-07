import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function ProductImageSlider({ slides = [], autoPlayInterval = 5000, className = '' }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Check for empty slides
  if (!slides || slides.length === 0) {
    return <div>No products available at the moment.</div>;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className={`relative overflow-hidden ${className} mt-0`}>
      {/* Product Slider */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
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
                <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-xl">{slide.title}</h2>
                <p className="text-lg md:text-xl drop-shadow-lg">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/50 hover:bg-white/80 p-4 rounded-full transition-all shadow-lg"
        aria-label="Previous slide"
      >
        <ArrowLeft className="h-8 w-8 text-black" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/50 hover:bg-white/80 p-4 rounded-full transition-all shadow-lg"
        aria-label="Next slide"
      >
        <ArrowRight className="h-8 w-8 text-black" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-5 h-5 rounded-full transition-all ${
              currentSlide === index ? 'bg-yellow-500 w-10' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
