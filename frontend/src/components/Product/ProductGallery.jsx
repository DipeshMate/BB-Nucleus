import React, { useState } from "react";

const ProductGallery = ({ product }) => {
  
  const images =  product.images?.map(img => img.image) || []; // Extract only image URLs
1  
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="max-w-xs lg:max-w-sm mx-auto">
      {/* Main Image Display */}
      <div className="relative">
        <img
          className="w-full rounded-lg shadow-lg"
          src={images[currentIndex]}
          alt={`Product ${currentIndex}`}
        />
        
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          &#10094;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          &#10095;
        </button>
      </div>

      {/* Thumbnail Slider */}
      <div className="flex gap-2 mt-3 justify-center">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            className={`w-16 h-16 object-cover rounded-md cursor-pointer ${
              currentIndex === index ? "border-2 border-blue-500" : "opacity-70"
            }`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
