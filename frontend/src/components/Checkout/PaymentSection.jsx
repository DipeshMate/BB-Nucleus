import React, { useState} from 'react'
import dummyQRCode from "../../assets/qrcode.jpg"
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { useSnackbar } from "notistack";
// import Cookies from "js-cookie";

import api from "../../api";
import { useCart } from '../../context/cartContext';

const PaymentSection = ({cartTotal, formData, handleSaveData}) => {
  
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState('');
  const { setNumOfCartItems } = useCart();

  
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  
  const cart_id = localStorage.getItem("cart_id");
  
  
  const handlePlaceOrder = async () => {
    
    if (!paymentMethod) {
      enqueueSnackbar("Please select a payment method!", { variant: "error" });  
      // toast.error("Please select a payment method!");
      return;
    }
    
    const requiredFields = ["first_name", "last_name", "phone_number", "address", "city", "state", "pincode"];
    const missingFields = requiredFields.filter(
      field => !formData[field] || (typeof formData[field] === "string" && !formData[field].trim())
    );   
    console.log(missingFields, 'and', formData.saveInfo);
    
    if (missingFields.length > 0 || !formData.saveInfo) {
      enqueueSnackbar(`Please Save and fill in: ${missingFields.join(", ")} before placing your order.`, { variant: "info" });  
      // toast.error(`Please Save and fill in: ${missingFields.join(", ")} before placing your order.`);
      return;
    }
    
    if (paymentMethod === "UPI" && !transactionId.trim()) {
      enqueueSnackbar("Please enter the UPI transaction ID.", { variant: "error" });  
    }
    
    try {
      if (formData.saveInfo) await handleSaveData();
      
      const payload = {
        payment: paymentMethod,
        cart_id,
        ...(paymentMethod === "UPI" ? { txnId: transactionId } : {}),
      };
      
      console.log("Payload:", payload);
      
      const response = await api.post("/Cart/placeorder/", payload);
      
      if (response.data &&response.status === 200) {
          enqueueSnackbar("Order placed successfully!", { variant: "success" });  
          // toast.success("Order placed successfully!");
          setNumOfCartItems(0);
          navigate("/Thankyoupage");
          setTimeout(() =>     localStorage.removeItem("cart_id")
          , 5000);
        }else {
         enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });  
         // toast.error("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Order placement failed:", error);
        enqueueSnackbar("Failed to place order. Please try again.", { variant: "error" });  
      //  toast.error("Failed to place order. Please try again.");
    }
 };
 
  return (
    <div className="w-full md:w-3/3 p-6">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-indigo-600 text-white p-4 text-center text-lg font-semibold">
        Select one Payment Option
      </div>
      <div className="p-6 space-y-4">
        {/* Radio Button - COD */}
        <label
          className={`w-full p-4 flex items-center justify-between border rounded-lg cursor-pointer text-lg font-medium ${
            paymentMethod === "COD" ? "bg-indigo-500 text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="hidden"
          />
          Cash on Delivery
        </label>

        {/* Radio Button - UPI */}
        <label
          className={`w-full p-4 flex items-center justify-between border rounded-lg cursor-pointer text-lg font-medium ${
            paymentMethod === "UPI" ? "bg-indigo-500 text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="UPI"
            checked={paymentMethod === "UPI"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="hidden"
          />
          Pay with UPI QR Code
        </label>

        {/* UPI Payment Section */}
        {paymentMethod === "UPI" && (
          <div className="mt-4 p-6 bg-gray-100 rounded-lg text-center transition-opacity duration-500">
            <p className="text-sm">Scan the QR Code to pay:</p>
            <img src={dummyQRCode} alt="UPI QR Code" className="mt-2 mx-auto w-40 shadow-lg rounded-md" />
            <p className="text-sm mt-2">Total: ₹{cartTotal} | Cart ID: {cart_id}</p>
            <input
              type="text"
              className="mt-2 p-2 border rounded-md w-full"
              placeholder="Enter UPI Transaction/UTR/Ref ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
            <p className="text-xs text-left text-gray-500 mt-2">Kindly enter valid transaction Id. otherwise the order will not deliver. </p>
          </div>
        )}

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          className="mt-4 w-full bg-indigo-600 text-white p-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  </div>
  );
  };

export default PaymentSection
