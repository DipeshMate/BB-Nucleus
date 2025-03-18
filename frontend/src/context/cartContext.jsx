import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";
// import Cookies from "js-cookie";
const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const cart_id = localStorage.getItem("cart_id");

  // const cart_id = Cookies.get("cart_id");
  const [numOfCartItems, setNumOfCartItems] = useState(0);

  const fetchCartData = async () => {
    if (!cart_id) return;
    try {
      const res = await api.get(`Cart/getcart?cart_id=${cart_id}`);
      setNumOfCartItems(res.data.num_of_items);
    } catch (error) {
      console.error("Error fetching cart data:", error.message);
    }
  };

  useEffect(() => {
    if (cart_id) { 
      fetchCartData();
    }
  }, [cart_id]);

  const cartItemsValue = {numOfCartItems, setNumOfCartItems, fetchCartData}

  return (
    <CartContext.Provider value={cartItemsValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};