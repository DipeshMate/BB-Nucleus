import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import CartSummary from './CartSummary';
import CartItems from './CartItems';
import Spinner from '../../pages/Spinner';
import { useCartData } from '../../hooks/useCartData';
import { useCart } from '../../context/cartContext';

const CartPage = () => {
  const { numOfCartItems, setNumOfCartItems } = useCart();


  const {
    cartItems = [], setCartItems,
    cartOriginalPrice, setOriginalPrice,
    cartDiscountedPrice, setCartDiscountedPrice,
    cartTotal, setCartTotal,
    tax, total, loading
  } = useCartData();

  if (loading) { return <Spinner loading={loading} /> }

  const zeroItems = () => {
    if (cartItems.length < 1) {
      return (
        <motion.div
          className="text-center py-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            You haven't added any items to your cart.
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Link
              to="/AllProducts"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
            >
              Browse Prducts
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      )
    }
    return null;
  }

  return (
    <div className="container text-center mx-auto">
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <motion.h2
            className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Shopping Cart
          </motion.h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            {/*------------ Cart items-------------- */}

            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              {zeroItems() ? zeroItems() : (
                cartItems.map(item => <CartItems key={item.id}
                  item={item}
                  numOfCartItems={numOfCartItems}
                  setNumOfCartItems={setNumOfCartItems}
                  setOriginalPrice={setOriginalPrice}
                  setCartDiscountedPrice={setCartDiscountedPrice}
                  setCartTotal={setCartTotal}
                  setCartItems={setCartItems} cartItems={cartItems} />)
              )}
            </div>

            {/*------------ Cart Summary-------------- */}
            <CartSummary cartOriginalPrice={cartOriginalPrice}
              cartDiscountedPrice={cartDiscountedPrice} 
            total={total} cartTotal={cartTotal} tax={tax} />
          </div>
          <div className="p-6 space-y-4">
            <Link to={'/Allproducts'}>
            <button className="w-2/6 gap-2 bg-blue-700 text-white px-4 sm:py-1 md:py-2 rounded-md shadow-md hover:bg-blue-800 transition">
                       <p> Browse More Products</p>
            </button>
            </Link> 
          </div>
        </div>
      </section>
    </div>
  );
}

export default CartPage;
