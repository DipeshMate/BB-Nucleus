import React from "react";

const ProductDetailsPlaceHolder = () => {
  return (
    <section className="py-4">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Left Image Placeholder */}
          <div className="md:w-1/2 w-full">
            <div className="w-full h-[300px] md:h-[400px] bg-gray-300 animate-pulse rounded-lg"></div>
          </div>

          {/* Right Content Placeholder */}
          <div className="md:w-1/2 w-full space-y-4">
            <div className="w-1/3 h-6 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="w-full h-6 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="w-1/3 h-6 bg-gray-300 animate-pulse rounded-md"></div>

            {/* Description Placeholder */}
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-full h-5 bg-gray-300 animate-pulse rounded-md"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPlaceHolder;
