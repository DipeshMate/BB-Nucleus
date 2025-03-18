import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const announcements = [
  "Free Delivery in Durg, Bhilai & Raipur",
  "Soon available all Over India",
];

const AnnouncementSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-indigo-600 text-white py-2 overflow-hidden flex justify-center items-center">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
        className="text-sm font-semibold"
      >
        {announcements[index]}
      </motion.div>
    </div>
  );
};

export default AnnouncementSlider;
