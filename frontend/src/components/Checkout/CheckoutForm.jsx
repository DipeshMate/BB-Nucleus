
const CheckoutForm = ({formData,handleChange,formErrors, handleSaveData}) => {
  
  return (
    <div className="font-[sans-serif] bg-white place-content-center">
    <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
      <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">
          Complete your order
        </h2>

        <form className="mt-8" onSubmit={handleSaveData}>
          {/* Personal Details */}
          <div>
            <h3 className="text-sm lg:text-base text-gray-800 mb-4">
              Personal Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input type="text" name="first_name" placeholder="First Name"
                  value={formData.first_name} onChange={handleChange} className="input-field" />
                {formErrors.first_name && <p className="text-red-500 text-sm">{formErrors.first_name}</p>}
              </div>

              <div>
                <input type="text" name="last_name" placeholder="Last Name"
                  value={formData.last_name} onChange={handleChange} className="input-field" />
                {formErrors.last_name && <p className="text-red-500 text-sm">{formErrors.last_name}</p>}
              </div>

              <div>
                <input type="email" name="email" placeholder="Email"
                  value={formData.email} onChange={handleChange} className="input-field" />
                {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
              </div>

              <div>
                <input type="number" name="phone_number" placeholder="Phone No."
                  value={formData.phone_number} onChange={handleChange} className="input-field" />
                {formErrors.phone_number && <p className="text-red-500 text-sm">{formErrors.phone_number}</p>}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mt-8">
            <h3 className="text-sm lg:text-base text-gray-800 mb-4">
              Shipping Address
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input type="text" name="address" placeholder="Address Line"
                  value={formData.address} onChange={handleChange} className="input-field" />
                {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
              </div>

              <div>
                <input type="text" name="city" placeholder="City"
                  value={formData.city} onChange={handleChange} className="input-field" />
                {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}
              </div>

              <div>
                <input type="text" name="state" placeholder="State"
                  value={formData.state} onChange={handleChange} className="input-field" />
                {formErrors.state && <p className="text-red-500 text-sm">{formErrors.state}</p>}
              </div>

              <div>
                <input type="number" name="pincode" placeholder="Pin Code"
                  value={formData.pincode} onChange={handleChange} className="input-field" />
                {formErrors.pincode && <p className="text-red-500 text-sm">{formErrors.pincode}</p>}
              </div>
            </div>
          </div>

          {/* Save Info Checkbox */}
          <div className="mt-6 flex items-center">
            <input type="checkbox" id="saveInfo" name="saveInfo" checked={formData.saveInfo}
              onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
            <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-800">
              Save this information for your next order.
            </label>
          </div>
        </form>
      </div>
    </div>
  </div>
);
};

export default CheckoutForm;
