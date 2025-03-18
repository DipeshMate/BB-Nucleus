import React, { useState } from 'react';
import b from "../assets/b.jpg";
import { motion } from "framer-motion";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { MdOutlineMail, MdLocationPin } from "react-icons/md";
import { useSnackbar } from 'notistack';
import api from "../api";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length >= 500) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate before sending API request
    if (!validateForm()) {
      console.log("Form validation failed", errors);
      return;
    }
  
    setLoading(true);
  
    try {
      const res = await api.post('Cart/usermessage/', formData);
      console.log("Response messages:", res.data);
  
      // Reset form data after successful submission
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
      
      // Show success notification
      enqueueSnackbar("Message sent successfully..!!", { variant: "success" });
  
    } catch (error) {
      console.log('Message failed:', error.message);
      enqueueSnackbar("Failed to send message!", { variant: "error" });
  
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="py-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:mb-0 mb-10">
            <div className="group w-full h-full">
              <div className="relative h-full">
                <img src={b} alt="ContactUs" className="pt-8 w-full h-4/6 lg:rounded-l-2xl rounded-2xl bg-blend-multiply object-cover" />
                <h1 className="font-manrope text-gray-700 text-4xl font-bold leading-10 absolute top-11 left-11">Contact us</h1>
                <div className="absolute bottom-0 w-full lg:p-11 p-4">
                  <div className="bg-white rounded-lg p-6 block">
                    <div className="flex items-center mb-6 ">
                      <a href="tel:9425567424" alt="Call 9425567424" target="_blank" rel="noopener noreferrer" className='flex'>
                      <FaPhone className="text-2xl ml-1 text-lime-300" />
                        <h5 className="text-black text-base ml-3">9425567424</h5>
                        </a>

                        <a href="https://wa.me/9425565563" alt="WhatsApp 9425565563" target="_blank" rel="noopener noreferrer" className='flex'>
                        <FaWhatsapp className="text-3xl ml-5 text-green-400" />
                        <h5 className="text-black text-base ml-3">9425565563</h5>
                        </a>
                    </div>
                    <a href="#" className="flex items-center mb-6">
                      <MdOutlineMail className="text-3xl text-zinc-600" />
                      <h5 className="text-black text-base ml-5">infoBBNucleus@gmail.com</h5>
                    </a>
                    <a href="#" className="flex items-center">
                      <MdLocationPin className="text-3xl text-zinc-600" />
                      <h5 className="text-black text-base ml-5">Station Road, Durg, Chhattisgarh, 491001</h5>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-50 p-8 lg:rounded-r-2xl rounded-2xl"
        >            <h2 className="text-indigo-600 text-4xl font-semibold mb-11">Send Us A Message</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg rounded-full border border-gray-200 focus:outline-none pl-4 mb-2" />
              {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

              <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg rounded-full border border-gray-200 focus:outline-none pl-4 mb-2" />
              {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg rounded-full border border-gray-200 focus:outline-none pl-4 mb-2" />
              {errors.phone && <p className="text-red-500 text-sm mb-2">{errors.phone}</p>}

              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" className="w-full h-24 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg rounded-lg border border-gray-200 focus:outline-none pl-4 pt-2 mb-2"></textarea>
              {errors.message && <p className="text-red-500 text-sm mb-2">{errors.message}</p>}

              <button type="submit" className="w-full h-12 text-white text-base font-semibold leading-6 rounded-full bg-indigo-600 hover:bg-indigo-800">Send</button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
