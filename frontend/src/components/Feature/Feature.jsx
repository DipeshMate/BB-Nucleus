import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import red from '../../assets/red.jpg';
import red1 from '../../assets/red1.jpg';
import yellow from '../../assets/yellow.jpg';
import vector_bat from '../../assets/vector_bat.jpg';
import fire from '../../assets/fire.jpg';
import Tournament from '../../assets/Tournament.jpg';
import Ground from '../../assets/Ground.jpg';
import Hattrick from '../../assets/Hattrick.jpg';
import try1 from '../../assets/try.png';
import try2 from '../../assets/try2.png';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const scaleOnHover = {
  whileHover: { scale: 1.05, transition: { duration: 0.3 } },
};

const Feature = () => {
  return (
    <motion.div initial="hidden" animate="visible" exit="hidden" variants={fadeIn} className="py-8 px-4 lg:px-8">
      <section className="bg-white py-8 dark:bg-gray-900 md:py-16">
        <div className="grid max-w-screen-xl px-4 pb-8 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0">
          <div className="md:col-span-7 text-center">
            <motion.h1 variants={fadeIn} className="mb-4 text-4xl font-extrabold dark:text-white md:max-w-2xl md:text-5xl xl:text-6xl">
              "DOUBLE B NUCLEUS" Chhattisgarh's First homegrown Cricket Bat Brand for both Soft and Hard Tennis!
            </motion.h1>
            <motion.p variants={fadeIn} className="max-w-2xl text-gray-500 dark:text-gray-400 md:text-lg lg:text-xl">
              Don't Wait - Limited Stock at Unbeatable Prices!
            </motion.p>
            <Link to={'/allproducts'} className="inline-block mt-6 rounded-lg bg-amber-300 px-6 py-3.5 text-black font-medium hover:bg-lime-300">
              Shop Now
            </Link>
          </div>
          <div className="md:col-span-5 flex justify-center">
            <motion.img src={vector_bat} alt="vector_bat" className="md:h-80 md:w-80" variants={fadeIn} />
          </div>
        </div>

        <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-8 text-gray-500 sm:grid-cols-3 lg:grid-cols-6 px-4">
          {[try2, fire, Tournament, Ground, Hattrick, try1].map((image, index) => (
            <motion.img key={index} src={image} className="sm:h-40 sm:w-6/6" {...scaleOnHover} />
          ))}
        </div>
      </section>

      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-semibold mb-12 text-gray-800">Our Product Categories</h2>
        <div className="grid grid-cols-1 gap-8">
          {[{ img: red, title: "Hard Tennis Bats", desc:"Experience the power and precision with our Hard Tennis Bats, designed for professionals.",link: "/types/Hard Tennis Bats" },
            { img: red1, title: "Soft Tennis Bats", desc:"Perfect for beginners and intermediate players, soft and light, ideal for controlled play.", link: "/types/Soft Tennis Bats" },
            { img: yellow, title: "Season Custom Bats",desc:"Personalize your bat with the finest materials and expert craftsmanship.", link: "/types/Custom Bats" }].map((product, index) => (
            <motion.div key={index} className="relative group overflow-hidden rounded-2xl shadow-lg" {...scaleOnHover}>
              <motion.img src={product.img} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 flex items-center justify-center text-center bg-opacity-60 bg-black">
                <div className="text-white">
                  <h3 className="text-2xl font-semibold transform transition duration-300 group-hover:scale-105">{product.title}</h3>
                  <p className="mt-4 text-lg font-light opacity-80">{product.desc}</p>
                    <Link to={product.link} className="mt-4 inline-block bg-yellow-500 py-2 px-4 rounded-md text-black hover:bg-yellow-600">
                    View Catalog →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Feature;

// <div className="absolute inset-0 flex items-center justify-center text-center bg-opacity-60 bg-black group-hover:bg-opacity-40 transition-all duration-300">
{/* <div className="text-white">
<h3 className="text-2xl font-semibold transform transition duration-300 group-hover:scale-105">
  Season Custom Bats
</h3>
<p className="mt-4 text-lg font-light opacity-80 transition-opacity duration-300 group-hover:opacity-100">
  Personalize your bat with the finest materials and expert craftsmanship.
</p> */}