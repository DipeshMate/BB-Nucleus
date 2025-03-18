import React from "react";

const PlaceHolder = () => {
  return (
    <div className="bg-white/50 dark:bg-gray-800/50 shadow-md rounded-lg animate-pulse p-4">
      {/* Image Placeholder */}
      <div className="h-44 bg-gray-300/50 rounded-md"></div>

      {/* Text Placeholder */}
      <div className="space-y-3 mt-4">
        <div className="h-4 bg-gray-300/50 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300/50 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default PlaceHolder;
