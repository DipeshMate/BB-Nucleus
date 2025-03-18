import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import deliveryIcon from "../assets/deliveryIcon.gif";
import shippingIcon from "../assets/shippingIcon.gif";
import paymentIcon from "../assets/paymentIcon.gif";
import supportIcon from "../assets/supportIcon.gif";
import customerIcon1 from "../assets/customerIcon1.gif";
import Victory from "../assets/Victory.jpg"
const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
        <motion.div 
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">About BB Nucleus</h2>
          <p className="text-lg text-gray-700">
            Welcome to BB Nucleus, where we craft premium cricket bats engineered for performance and durability. Designed for champions, built with precision.
          </p>
        </motion.div>
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          className="h-full md:py-6 flex items-center place-content-center relative max-md:before:hidden before:absolute before:bg-gradient-to-r before:from-gray-50 before:via-[#E4FE66] before:to-[#55F5A3] before:h-full before:w-3/4 before:right-0 before:z-0">
                  <img src={Victory} className="rounded-md lg:w-2/5 lg:mr-46 md:w-11/12 sm:w-4/6 z-5 relative" alt="About BB Nucleus" />
        </motion.div>
      </div>
      
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <img src={feature.image} alt={feature.title} className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <motion.h2 
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Are You Following Us Yet?
        </motion.h2>
        <p className="text-lg">Join our community and stay updated with the latest content!</p>
        <div className="flex justify-center gap-6 mt-6">
    <a href="https://www.instagram.com/bb_nucleus" target="_blank" rel="noopener noreferrer">
      <FaInstagram className="text-3xl cursor-pointer hover:text-pink-400" />
    </a>
    <a href="https://wa.me/9425565563" target="_blank" rel="noopener noreferrer">
      <FaWhatsapp className="text-3xl cursor-pointer hover:text-green-500" />
    </a>
  </div>
      </div>
    </div>
  );
};

const features = [
  { title: "Happy Customer", image: customerIcon1 },
  { title: "Doorstep Delivery", image: deliveryIcon },
  { title: "Free Shipping", image: shippingIcon },
  { title: "Secure Payments", image: paymentIcon },
  { title: "24/7 Customer Support", image: supportIcon },
];

export default AboutUs;
