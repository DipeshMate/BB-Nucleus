import { useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import dummyQRCode from "../assets/qrcode.jpg"
import instaqr from "../assets/instaqr.jpeg"

const FloatingButtons = () => {
  const [openPopup, setOpenPopup] = useState(null);

  const socialLinks = {
    whatsapp: {
      qr: `${dummyQRCode}`, // Replace with actual QR code image
      link: "https://wa.me/9425565563",
    },
    instagram: {
      qr: `${instaqr}`, // Replace with actual QR code image
      link: "https://www.instagram.com/bb_nucleus",
    },
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-20">
      {/* WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-3 bg-green-500 text-white rounded-full shadow-lg"
        onClick={() => setOpenPopup("whatsapp")}
      >
        <FaWhatsapp size={24} />
      </motion.button>

      {/* Instagram Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-3 bg-pink-500 text-white rounded-full shadow-lg"
        onClick={() => setOpenPopup("instagram")}
      >
        <FaInstagram size={24} />
      </motion.button>

      {/* QR Code Popup */}
      {openPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white p-5 rounded-lg shadow-lg text-center relative"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setOpenPopup(null)}
            >
              <ImCross size={12} />
            </button>
            <h3 className="text-lg font-semibold mb-2 capitalize">Scan to Connect on {openPopup}</h3>
            <img src={socialLinks[openPopup].qr} alt={`${openPopup} QR Code`} className="w-40 mx-auto" />
            <a
              href={socialLinks[openPopup].link}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 text-blue-600 font-semibold hover:text-blue-800 transition"
            >
              Link to Connect
            </a>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FloatingButtons;
