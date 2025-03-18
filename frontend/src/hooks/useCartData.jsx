import {useEffect,useState} from 'react';
import api from "../api";
import Spinner from '../pages/Spinner';
import { useCart } from "../context/cartContext";
// import Cookies from 'js-cookie';

export function useCartData(){
  const { numOfCartItems, setNumOfCartItems } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [cartOriginalPrice, setOriginalPrice] = useState(0);
  const [cartDiscountedPrice, setCartDiscountedPrice] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // const tax = (cartOriginalPrice && cartDiscountedPrice) < 1 ? 0.00 : 4;
  // const total = (cartTotal + tax)  
  
  const cart_id = localStorage.getItem("cart_id")
  
  // ✅ Fetch cart data function
  const fetchCartData = async () => {
    if (!cart_id) return;
    setLoading(true);
    try {
      const res = await api.get(`Cart/getcart?cart_id=${cart_id}`);
      setCartItems(res.data.items);
      setCartTax(res.data.tax);
      setCartTotal(res.data.sum_total);
      setOriginalPrice(res.data.sum_original_price);
      setCartDiscountedPrice(res.data.sum_discounted_price);
      setNumOfCartItems(res.data.num_of_items); // ✅ Updates only if changed
    } catch (error) {
      console.error("Error fetching cart data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch cart data on component mount
  useEffect(() => {
    fetchCartData();
  }, [cart_id]);
  
  // below useEffect shows actual realtime numOfCartItems
    // Update cart item count when `cartItems` change
  // useEffect(() => {
  //   setNumOfCartItems(numOfCartItems);
  // }, [numOfCartItems]);
  
  useEffect(() => {
      if (cart_id) { 
        api.get(`Cart/status?cart_id=${cart_id}`)
          .then(res => {
            // console.log('Cart/status/cart_id::',res.data);
            setNumOfCartItems(res.data?.num_of_items || 0)
          })
          .catch(e => {
            console.log(e.message); 
          });
      } 
    }, [cart_id,cartItems])
  
    if (loading) {
      return <Spinner loading={loading} />
  }


    return {
      cart_id, cartItems,
      setCartItems, cartOriginalPrice,
      setOriginalPrice, cartDiscountedPrice,
      setCartDiscountedPrice, cartTotal,
      setCartTotal, cartTax, loading,
      numOfCartItems, setNumOfCartItems,
      fetchCartData,
    }
}
