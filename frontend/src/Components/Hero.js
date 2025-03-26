import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"; // Icons for navigation
import Hero1 from "../Assets/hero1.png";
import Hero2 from "../Assets/hero2.png";
import Hero3 from "../Assets/hero3.png";
import Hero4 from "../Assets/hero4.png";
import Hero5 from "../Assets/hero5.png";
import Hero6 from "../Assets/hero6.png";

const images = [Hero6, Hero1, Hero2, Hero3, Hero4, Hero5];
function Hero() {

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the previous image
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next image
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Auto-slide effect every 7 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 7000); // Changed to 7 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-w-[1640px] mx-auto overflow-hidden">
      <div className="relative flex max-h-[500px] w-full">
        {/* Image Wrapper with Sliding Effect */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              className="w-full h-[500px] object-cover flex-shrink-0"
              src={img}
              alt={`Featured slide ${index + 1}`} // Fixed ESLint warning
              aria-hidden={currentIndex !== index} // Improves accessibility
            />
          ))}
        </div>

        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition-all duration-300"
          aria-label="Previous Slide"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition-all duration-300"
          aria-label="Next Slide"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
export default Hero;