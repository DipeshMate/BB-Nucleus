import React from 'react'
import { BASE_URL } from '../../api';

const OrderedItem = ({ cartItems = [] }) => {  // Default to an empty array
  if (!Array.isArray(cartItems)) {
    console.error("cartItems is not an array:", cartItems);
    return null;  // Prevents rendering if invalid
  }

  return (
    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
      <div className={`overflow-y-auto ${cartItems.length > 2 ? 'max-h-64' : ''} scrollbar-gutter scrollbar-thumb-gray-400 scrollbar-track-gray-200`}>
        {cartItems.map((cartItem, index) => (
          <div key={index} className="flex flex-col items-center rounded-lg bg-white sm:flex-row">
            <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" 
                 src={`${BASE_URL}${cartItem?.product?.image || ""}`} 
                 alt={cartItem?.product?.name || "Product"} 
            />
            <div className="flex space-y-1 w-full flex-col px-4 py-4">
              <span className="font-semibold">{cartItem?.product?.name || "Unknown Product"}</span>
              <div>
                <p className="float-right text-base font-extralight">
                  Quantity: <span className="font-semibold">{cartItem?.quantity || 0}</span>
                </p>   
                <p className="text-base font-extralight">
                  Total: <span className='font-semibold'>₹{cartItem?.total || 0}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default OrderedItem
