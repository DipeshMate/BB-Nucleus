import React from 'react'
import pic from "../../assets/pic.jpg";
const UserInfo = ({ userInfo }) => {

  return (
    <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Profile Section */}
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <img
          src={pic}
          alt="User Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500"
        />
        <h4 className="text-xl font-semibold text-gray-800">{userInfo.fullname}</h4>
          <p className="text-gray-500">{userInfo.email}</p>
        {/* <button className="mt-3 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Edit Profile
        </button> */}
      </div>

      {/* Account Overview Section */}
      <div className="md:col-span-2 bg-white rounded-lg shadow-md">
        <div className="bg-indigo-600 text-white p-4 rounded-t-lg">
          <h5 className="text-lg font-semibold">Account Overview</h5>
        </div>
        <div className="p-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-semibold">Full Name:</span>
                  <span className="text-gray-900">{userInfo.fullname}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-semibold">Phone:</span>
                    <span className="text-gray-900">{userInfo.phone_number}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-semibold">Email:</span>
                  <span className="text-gray-900">{userInfo.email}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-semibold">Address:</span>
                  <span className="text-gray-900">{userInfo.address}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-semibold">City:</span>
                  <span className="text-gray-900">{userInfo.city}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-semibold">Pincode:</span>
                  <span className="text-gray-900">{userInfo.pincode}</span>
                </div>
                {/* <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-semibold">Country:</span>
                  <span className="text-gray-900">{userInfo.country}</span>
                </div> */}
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-semibold">Member Since:</span>
                  <span className="text-gray-900">{userInfo.date_joined}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-gray-600 font-semibold">Subscription:</span>
                  <span className="text-green-600 font-semibold">Premium</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit & Settings Buttons */}
          {/* <div className="flex justify-end mt-5 space-x-3">
            <button className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
              Settings
            </button>
            <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Update Info
            </button>
          </div> */}
        </div>
        </div>
        
    </div>
  </div>
  )
}

export default UserInfo;