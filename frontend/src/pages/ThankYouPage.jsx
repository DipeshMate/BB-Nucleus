import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import Cookies from "js-cookie";

export default function ThankYouPage() {
    const [fireworks, setFireworks] = useState([]);
     const cart_id = localStorage.getItem("cart_id");
    // const cart_id = Cookies.get("cart_id")

    useEffect(() => {
        const interval = setInterval(() => {
            setFireworks((prev) => [
                ...prev,
                { id: Date.now(), x: Math.random() * 100, y: Math.random() * 100, color: getRandomColor() },
            ]);
            setTimeout(() => setFireworks((prev) => prev.slice(1)), 1500);
        }, 300);
        return () => clearInterval(interval);
    }, []);

    function getRandomColor() {
        const colors = ["#FF5733", "#FFC300", "#DAF7A6", "#FF33F6", "#33FFF5", "#FF3333"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    return (
        <div className="relative flex flex-col
            items-center justify-center min-h-screen
            bg-green-200 text-white overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5 }} 
                className="bg-gradient-to-r from-green-500 to-blue-600 p-10 rounded-2xl shadow-2xl text-center max-w-lg"
            >
                <div className="flex flex-col items-center mb-2">
                    <FaCheckCircle className="text-6xl text-white animate-bounce mb-4" aria-hidden="true" />
                    <h1 className="text-4xl font-extrabold">Thank You for Your Purchase!</h1>
                    <p className="text-lg opacity-90 mt-2">Your order <span className="font-semibold">#{cart_id}</span> has been successfully placed.</p>
                </div>
                
                <div className="flex justify-center gap-4">
                    <Link
                        to={'/orderhistory'}
                        className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-md transition-transform transform hover:scale-110 hover:shadow-lg"
                    >
                        View Order Details
                    </Link>
                    <Link
                        to={'/allproducts'}
                        className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-md transition-transform transform hover:scale-110 hover:shadow-lg"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </motion.div>
            {fireworks.map((fw) => (
                <motion.div
                    key={fw.id}
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 3 }}
                    transition={{ duration: 1.5 }}
                    className="absolute rounded-full w-10 h-10"
                    style={{ top: `${fw.y}%`, left: `${fw.x}%`, backgroundColor: fw.color }}
                ></motion.div>
            ))}
        </div>
    );
}
