import { useState, useEffect } from 'react';
import OrderedItem from './OrderedItem';
import PaymentSection from './PaymentSection';
import logo from '../../assets/b.jpg';
import { Link } from 'react-router-dom';
import { useCartData } from '../../hooks/useCartData';
import CheckoutForm from './CheckoutForm';
import useUserInfo from "../../hooks/useUserInfo";
import api from "../../api";
import { useSnackbar } from 'notistack';



const CheckoutPage = () => {
    const { cart_id, cartItems, setCartItems, cartOriginalPrice, setOriginalPrice, cartDiscountedPrice, setCartDiscountedPrice, cartTotal, setCartTotal,cartTax, loading
    } = useCartData();
    const { userInfo } = useUserInfo();
  const {enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    saveInfo: false,
  });

  const [formErrors, setFormErrors] = useState({}); // Store validation errors
  // Validate fields
  const validateForm = () => {
    let errors = {};

    if (!formData.first_name.trim()) errors.first_name = "First Name is required";
    if (!formData.last_name.trim()) errors.last_name = "Last Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Invalid email format";

    if (!formData.phone_number.trim()) errors.phone_number = "Phone Number is required";
    else if (!/^\d{10}$/.test(formData.phone_number))
      errors.phone_number = "Phone Number must be 10 digits";

    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State is required";

    if (!formData.pincode.trim()) errors.pincode = "Pin Code is required";
    else if (!/^\d{6}$/.test(formData.pincode))
      errors.pincode = "Pin Code must be 6 digits";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  useEffect(() => {
    if (userInfo) {
      setFormData((prev) => ({
        ...prev,
        first_name: userInfo.first_name || "",
        last_name: userInfo.last_name || "",
        email: userInfo.email || "",
        phone_number: userInfo.phone_number || "",
        address: userInfo.address || "",
        city: userInfo.city || "",
        state: userInfo.state || "",
        pincode: userInfo.pincode || "",
      }));
    }
  }, [userInfo]);
   
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
  
      // Call handleSaveData after state update for saveInfo checkbox
      if (name === "saveInfo") {
        handleSaveData(updatedFormData);
      }
  
      return updatedFormData;
    });
    // Clear error message when user starts typing
    
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSaveData = async (data) => {
    if (!validateForm()) return; // Stop if validation fails

    try {
      const response = await api.post('/Account/update-user-info/', {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        state: formData.state
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
        

      if (response.data && response.status === 200) {
        enqueueSnackbar("Information saved successfully!", { variant: "success" });  
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  
  
  
  

    return (
        <div className='container'>
            <div className="bg-gray-700 flex flex-col items-center border-b py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                <div className="flex shrink-0 items-center">
                    <Link to={'/'} >
                        <img className="h-8 w-auto" src={logo} alt="BB BATS" />
                    </Link>
                    <Link
                        to={'/'}
                        className="px-2 font-inter font-bold text-lg text-gray-100 hover:bg-gray-700 hover:text-white"
                    >
                        BB Bats
                    </Link>
                </div>
                <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                    <div className="relative">
                        <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <Link to={'/cart'} className='flex gap-3 items-center' >
                                    <p className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </p>
                                    <span className="text-white font-semibold">Back to Cart</span>
                                </Link>
                            </li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            <li className="flex items-center space-x-3 text-left sm:space-x-4 cursor-context-menu">
                                <p className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2">2</p>
                                <span className="font-semibold text-white">Shipping</span>
                            </li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            <li className="flex items-center space-x-3 text-left sm:space-x-4 cursor-context-menu">
                                <p className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">3</p>
                                <span className="font-semibold text-gray-500">Payment</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-10 xl:px-32">
                {/* Order Details Section */}
                <div className="px-4 pt-8">
                    <p className="bg-indigo-600 text-white p-4 text-center text-xl font-medium">Review Your Order</p>
                    <p className="text-gray-500 mt-2">Please review your selected items and choose a payment method to proceed.</p>

                    {/* Ordered Items List */}
                    <div className="mt-6 space-y-4">
                        <OrderedItem cartItems={cartItems} />
                    </div>
                    {/* Total Summary */}
      <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
        <div className="border-b pb-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotal</p>
            <p className="font-semibold text-gray-900">₹{cartOriginalPrice}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Discount</p>
            <p className="font-semibold text-green-500">-₹{cartDiscountedPrice}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Shipping</p>
            <p className="font-semibold text-gray-900">₹{cartTax}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-lg font-semibold">
          <p>Total</p>
          <p className="text-xl text-indigo-600">₹{cartTotal}</p>
        </div>
      </div>
                </div>
                <div className='flex flex-col place-content-center justify-center'>
                    <CheckoutForm formData={formData} handleChange={handleChange} formErrors={formErrors} handleSaveData={handleSaveData} />
                    <PaymentSection
                        formData={formData}
                        handleSaveData={handleSaveData}
                    cart_id={cart_id}
                    cartTotal={cartTotal} />
                    </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
