import React from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/b.jpg';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const Footer = () => {
  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative z-10 bg-gray-300 pt-10 pb-6 lg:pt-16 lg:pb-10"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap justify-center gap-8 text-center sm:text-left">
          {/* Logo and Contact */}
          <motion.div variants={fadeInUp} className="w-full sm:w-2/3 lg:w-1/4 lg:ml-20 px-4">
            <Link to="/">
              <motion.img
                src={logo}
                width={70}
                height={10}
                alt="logo"
                className="mx-auto sm:mx-0 max-w-full"
                whileHover={{ scale: 1.1 }}
              />
            </Link>
            <p className="text-base text-gray-700 mt-4">BB Nucleus</p>
            <ul className="space-y-1 mt-4 text-gray-600">
              <li>Station Road, Durg, Chhattisgarh, 491001</li>
              <li>+91 9425567424</li>
              <li className="text-blue-500">info@BBBats.com</li>
            </ul>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={fadeInUp} className="w-full sm:w-2/3 lg:w-1/4 px-4">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-1 text-gray-600">
              <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-500">About us</Link></li>
              <li><Link to="/types/Custom Bats" className="hover:text-blue-500">Customize Bat</Link></li>
              <li><Link to="/contact" className="hover:text-blue-500">Contact Us</Link></li>
            </ul>
          </motion.div>
          
          {/* Social Links */}
          <motion.div variants={fadeInUp} className="w-full sm:w-2/3 lg:w-1/4 px-4">
      <h3 className="text-xl font-semibold mb-4">Follow Us On</h3>
      <div className="flex justify-center sm:justify-start space-x-4">        

        {/* Instagram */}
        <motion.a
          href="https://www.instagram.com/bb_nucleus"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
        >
          <svg
            className="w-6 h-6 text-gray-600 hover:text-pink-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7.75 2C4.022 2 2 4.022 2 7.75v8.5C2 19.978 4.022 22 7.75 22h8.5C19.978 22 22 19.978 22 16.25v-8.5C22 4.022 19.978 2 16.25 2h-8.5zM12 6.75c2.899 0 5.25 2.351 5.25 5.25s-2.351 5.25-5.25 5.25S6.75 14.899 6.75 12 9.101 6.75 12 6.75zm0 1.5c-2.062 0-3.75 1.688-3.75 3.75s1.688 3.75 3.75 3.75 3.75-1.688 3.75-3.75-1.688-3.75-3.75-3.75zm4.875-.75a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75z" />
          </svg>
        </motion.a>
        
                  {/* Whatsapp */}  
                  <motion.a
          href="https://wa.me/9425565563"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
        >
                      <svg
                className="w-6 h-6 text-gray-600 hover:text-green-500 cursor-pointer"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M16 0C7.164 0 0 7.163 0 16c0 2.801.725 5.42 1.996 7.707L0 32l8.608-1.932A15.951 15.951 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.265 13.265 0 01-6.903-1.923l-.497-.292-5.988 1.343 1.385-5.787-.321-.519A13.242 13.242 0 012.667 16c0-7.362 5.971-13.333 13.333-13.333S29.333 8.638 29.333 16 23.362 29.333 16 29.333zm7.345-9.757c-.401-.2-2.37-1.168-2.737-1.299-.367-.133-.633-.2-.9.2s-1.032 1.299-1.265 1.566c-.233.267-.467.3-.867.1-.401-.2-1.69-.622-3.22-1.98a12.05 12.05 0 01-2.2-2.69c-.233-.4 0-.622.176-.823.181-.182.401-.468.6-.7.2-.233.267-.4.4-.633.133-.233.067-.466 0-.7-.2-.4-.9-2.166-1.233-2.967-.322-.8-.667-.7-.9-.7h-.767c-.267 0-.7.1-1.065.5s-1.398 1.366-1.398 3.333c0 1.967 1.433 3.867 1.633 4.133.2.267 2.8 4.3 6.8 6.032 1 .433 1.767.7 2.367.9 1 .3 1.9.267 2.633.161.8-.133 2.37-.967 2.7-1.9.333-.934.333-1.734.233-1.9-.1-.166-.366-.267-.767-.466z" />
                    </svg>
                    </motion.a>


        {/* LinkedIn */}
        {/* <motion.a
          href="https://www.linkedin.com/in/dipeshmate/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
        >
          <svg
            className="w-6 h-6 text-gray-600 hover:text-blue-700"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452H16.89V14.89c0-1.332-.028-3.045-1.859-3.045-1.86 0-2.144 1.455-2.144 2.957v5.65h-3.56V9h3.42v1.57h.047c.477-.9 1.637-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.47v6.26zM5.337 7.433a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM6.891 20.452H3.782V9h3.11v11.452z" />
          </svg>
        </motion.a> */}
                 </div>
              </motion.div>
              </div>
        
        {/* Copyright */}
        <motion.div variants={fadeInUp} className="text-center text-gray-500 mt-8">
          &copy; 2025 BB BATS | All Rights Reserved
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
