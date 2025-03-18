import React from "react";
import { BASE_URL } from "../../api";
import useUserInfo from "../../hooks/useUserInfo";
import { Link } from 'react-router-dom';

const OrderHistory = () => { 
  const {orderItems} = useUserInfo();

  return (
<section className="py-12 bg-gray-100">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <div className="p-8 bg-white rounded-3xl shadow-lg">
          <h2 className="text-center font-manrope font-bold text-3xl text-gray-800 mb-8">
            Order History
          </h2>

          <div className="overflow-x-auto">
            {orderItems && orderItems.length > 0 ? (
              <table className="min-w-full border-collapse">
                <thead className="">
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="py-3 px-4 text-left">Order Id & Date </th>
                    <th className="py-3 px-10 text-left">Product</th>
                    <th className="py-3 px-4 text-center">Price</th>
                    <th className="py-3 px-4 text-center">Qty</th>
                    <th className="py-3 px-4 text-center">Total</th>
                    <th className="py-3 px-4 text-center">Payment</th>
                    <th className="py-3 px-10 text-center"> Delivery Status</th>
                    <th className="py-3 px-4 text-center">
                    Delivery Date
                    </th>
                    <th className="py-3 px-4 text-center">
                    Remarks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-gray-200 transition duration-200"
                    >
                        <td className="py-2 px-3 text-left text-gray-700">
                        <p className="font-semibold text-gray-800">#{item.order_id}</p>
                        <p className="text-sm text-gray-500">{item.order_date}</p>
                      </td>
                      <td className="py-4 px-4 flex items-center space-x-4">
                        <img
                          src={`${BASE_URL}${item.product.image}`}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h5 className="text-lg font-semibold text-gray-800">
                            {item.product.name}
                          </h5>
                          <p className="text-sm text-gray-500">
                            {item.product.types}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center text-gray-700">
                        ₹{item.product.selling_price}
                      </td>
                      <td className="py-4 px-4 text-center text-gray-700">
                        {item.quantity}
                      </td>
                      <td className="py-4 px-4 text-center text-gray-700">
                      ₹{item.total}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            item.payment === "COD"
                              ? "bg-yellow-400"
                              : item.status === "UPI"
                              ? "bg-green-500"
                              : "bg-green-500"
                          }`}
                        >
                          {item.payment? item.payment : '--'}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <span
                          className= {`justify-center px-3 py-1 rounded-full text-white text-sm ${
                            item.status === "Pending"
                              ? "bg-orange-500"
                              : item.status === "Shipped"
                              ? "bg-yellow-300"
                              : item.status === "Out for Delivery"
                              ? "bg-yellow-500"
                              : item.status === "Delivered"
                              ? "bg-green-500"
                              : item.status === "Cancelled"
                              ? "bg-red-500"
                              : "bg-red-500"
                          }`}
                        >
                          {item.status ? item.status : '--' }
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-gray-700">
                        <p className= 
                        {item.delivery_date ? "text-green-500 font-medium " : "text-gray-600 font-medium"}> {item.delivery_date
                              ? new Date(item.delivery_date).toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric',
                                })
                          : item.status === "Cancelled" ? '------':'Expected 3 to 4 days'}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-center text-gray-700">
                        <p className="text-sm text-gray-500">{item.remarks}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <div className="flex flex-col items-center justify-center mt-10">
            <p className="text-gray-600 text-xl font-semibold">
              🛒 You haven't purchased anything yet... Time to grab some amazing deals!
            </p>
            <Link
              to={'/allproducts'}
              className="mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Start Shopping
            </Link>
          </div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderHistory;
