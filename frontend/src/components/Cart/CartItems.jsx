import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"
import api from "../../api";
// import Cookies from "js-cookie";
import { BASE_URL } from '../../api';
// import { toast } from 'react-toastify';
import { useSnackbar } from 'notistack';
import { useCartData } from '../../hooks/useCartData';

const CartItems = ({
  item,
  numOfCartItems,
    setCartItems,
    setNumOfCartItems,
    setOriginalPrice, 
    setCartDiscountedPrice, 
    setCartTotal }) => {      
  
  const { fetchCartData } = useCartData();
  const { enqueueSnackbar } = useSnackbar();
  
  const cart_id = localStorage.getItem("cart_id");
  // const cart_id = Cookies.get("cart_id");
  
  // const [quantity, setQuantity] = useState(item.quantity); 
  const [loading, setLoading] = useState(false);
         
  const updateCart = async (newQuantity) => {
    if (newQuantity > 10) {
      enqueueSnackbar("You cannot add more than 10 items.", { variant: "warning" });
      return;
    }
    setLoading(true)
    try {
      const new_item = {cart_id: cart_id,quantity: newQuantity,};
      await api.patch(`Cart/${item.id}/itemupdate/`, new_item);
      enqueueSnackbar("Cart updated successfully!", { variant: "success" });

      // Fetch updated cart data
      const cartRes = await api.get(`Cart/getcart?cart_id=${cart_id}`);
      
      // console.log("Updated Cart Response:", cartRes.data);
      // enqueueSnackbar("CartItem Updated Successfully!", { variant: "success" });  
      
      // toast.success("CartItem Updated Successfully!");
      await fetchCartData();  // Re-fetch to ensure UI syncs with backend
      
      
      // Ensure the cart items are updated in the state
      setCartItems(cartRes.data.items);
      // Update state with fresh cart data
      setNumOfCartItems(prev => prev !== cartRes.data.num_of_items ? cartRes.data.num_of_items : prev + 1 - 1); 
      setCartTotal(cartRes.data.sum_total);
      setOriginalPrice(cartRes.data.sum_original_price);
      setCartDiscountedPrice(cartRes.data.sum_discounted_price);
    } catch (error) {
      enqueueSnackbar("Failed to update cart", { variant: "error" });
      console.log("Update Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = () => updateCart(item.quantity + 1);
  const handleDecrement = () => {
    if (item.quantity > 1) updateCart(item.quantity - 1);
  };
  
  
  const handleRemoveItem = async () => {
    if (!window.confirm("Are you sure want to delete this cartitem ?")) return;
    setLoading(true);
    
    try {
      await api.delete(`Cart/${item.id}/removeitem/`);
      
      enqueueSnackbar("Item removed successfully!", { variant: "success" });
      // toast.success("An item is successfully removed!");
      fetchCartData();
      
      // Optimistically remove the item from the local state
      setCartItems(prevItems => prevItems.filter(cartItem => cartItem.id !== item.id));
      setNumOfCartItems(prev => prev > 0 ? prev - 1 : 0); // Optimistic UI update

      const cartRes = await api.get(`Cart/getcart?cart_id=${cart_id}`);
      
      // console.log("Removed Cart items Response:", cartRes.data);
      setNumOfCartItems(cartRes.data.num_of_items); // ✅ Update with fresh backend value

      // Ensure fresh cart data is set
      setCartTotal(cartRes.data.sum_total);
      setOriginalPrice(cartRes.data.sum_original_price);
      setCartDiscountedPrice(cartRes.data.sum_discounted_price);
      setCartItems(cartRes.data.items); // Ensure cartItems is updated
    } catch (error) {
      enqueueSnackbar("Failed to remove item", { variant: "error" });
      console.log("Remove Failed", error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        key={item.id}
        className="rounded-lg border p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Product Image */}
          <Link to={`/AllProducts/${item.product.id}`} className="shrink-0">
            <img
              className="h-20 w-20 rounded-md object-cover"
              src={`${BASE_URL}${item.product.image}`}
              alt={item.product.name}
            />
          </Link>
  
          {/* Product Name */}
          <Link
            to={`/AllProducts/${item.product.id}`}
            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
          >
            {item.product.name}
          </Link>
  
             {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button onClick={handleDecrement} disabled={loading} className="h-8 w-8 flex items-center justify-center rounded-md border bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
            -
          </button>
          <input type="number" value={item.quantity} readOnly className="w-12 text-center border rounded-md dark:text-white" />
          <button onClick={handleIncrement} disabled={loading} className="h-8 w-8 flex items-center justify-center rounded-md border bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
            +
          </button>
        </div>

        {/* Remove Button */}
        <button onClick={handleRemoveItem} disabled={loading} className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600">
          {loading ? "Removing..." : "Remove"}
            </button>
            
          {/* Quantity Controls */}
          {/* <div className="flex items-center gap-2">
            <button
              onClick={decrementQuantity}
              className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-lg"
            >
              -
            </button>
            <input
                type="number"
                name='quantity'
                id='quantity'
              min={1}
              className="w-12 text-center border rounded-md dark:text-white"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              readOnly
            />
            <button
              onClick={incrementQuantity}
              className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-lg"
            >
              +
            </button>
          </div>
   */}
          {/* Action Buttons */}
          {/* <div className="flex flex-col md:flex-row items-center gap-2">
            <button
              disabled={loading}
              onClick={updateCartItem}
              className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              disabled={loading}
              onClick={removeCartItem}
              className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? "Removing..." : "Remove"}
            </button>
          </div> */}
        </div>
      </motion.div>
    </motion.div>
  </div>
   
  )
}

export default CartItems
