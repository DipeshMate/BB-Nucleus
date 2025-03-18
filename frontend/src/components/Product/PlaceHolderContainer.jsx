import React from "react";
import PlaceHolder from "./PlaceHolder";

const PlaceHolderContainer = () => {
  const randomPlaceNumbers = [...Array(8).keys()];

  return (
    <section className="py-4">
      <div className="container mx-auto px-4 lg:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-2 gap-y-6">
          {randomPlaceNumbers.map((num) => (
            <PlaceHolder key={num} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlaceHolderContainer;
