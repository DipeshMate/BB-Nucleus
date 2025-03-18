import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useCartData } from '../../hooks/useCartData';

const CartSummary = ({cartDiscountedPrice,cartOriginalPrice,cartTotal}) => {
    const navigate = useNavigate();
  const { numOfCartItems } = useCartData();
    const handleCheckout = () => {
      // console.log("Proceeding to checkout, current cart items:", numOfCartItems);
  
      if (numOfCartItems > 0) {
        setTimeout(() => {
          navigate("/checkoutPage");  // ✅ Navigate after 200ms
        },1000);
      } else {
        // console.log("Cart is empty! Redirecting to /AllProducts");
        navigate("/allproducts");
      }
    };
  
  return (
    <motion.div
    className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full"
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="space-y-4 rounded-lg border p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      <p className="text-xl font-semibold text-gray-900 dark:text-white">Cart Item Summary</p>

      <div className="space-y-4">
        <dl className="flex items-center justify-between">
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
            Original Price
          </dt>
          <dd className="text-base font-medium text-gray-900 dark:text-white">
            ₹{cartOriginalPrice}
          </dd>
        </dl>
        <dl className="flex items-center justify-between">
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
          <dd className="text-base font-medium text-green-600">₹{cartDiscountedPrice}</dd>
        </dl>
        {/* <dl className="flex items-center justify-between">
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
          <dd className="text-base font-medium text-gray-900 dark:text-white">₹{tax}</dd>
        </dl> */}
        <dl className="flex items-center justify-between border-t pt-2">
          <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
          <dd className="text-base font-bold text-gray-900 dark:text-white">₹{cartTotal}</dd>
        </dl>
      </div>

      <button
      onClick={handleCheckout}
      className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700"
    >
      Proceed to Checkout
    </button>
    </div>
  </motion.div>
  )
}

export default CartSummary
