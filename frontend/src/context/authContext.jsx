// this context api helps to prevent prop drilling that means you don't have to pass a particular state form one component to another.
//so this contextAPi help to import state whereever you want to use.

import { createContext, useEffect,useState } from "react"
import { jwtDecode } from 'jwt-decode';
import api from "../api";
// import Cookies from "js-cookie";

export const AuthContext = createContext(false);

export function AuthProvider({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    //setIsAuthenticate True when user logged in and his profile and logout display

    const handleAuth = () => {
        const token = localStorage.getItem("access");
            
            if (token) {
            try {
                const decoded = jwtDecode(token); // Decode token
                const expiry_date = decoded.exp;
                const current_time = Date.now() / 1000;

                if (expiry_date >= current_time) {
                    setIsAuthenticated(true); // User is authenticated
                } else {
                    setIsAuthenticated(false); // Token expired
                }
            } catch (error) {
                console.log("❌ Error decoding token:", error);
                setIsAuthenticated(false);
            }
            } else {
            setIsAuthenticated(false);
            }
    };
    
    const [email, setEmail] = useState(""); // to get accees the email
    
    const getEmail = async () => {
        const token = localStorage.getItem("access");
        const cart_id = localStorage.getItem("cart_id");
        
        if (!cart_id) {
            console.log('card id is null');
            
        }
        if (!token) {
            console.log("🚨 No access token found. User might be logged out.");
            return null;
        }
    
        try {
            // ✅ Pass cart_id in API request
            const res = await api.get(`Cart/useremailinfo?cart_id=${cart_id}`);
    
            // console.log("✅ Fetched Email:", res.data.email);
            // console.log("🛒 Cart Updated:", res.data.cart_updated);
            // console.log("📦 Cart Items Updated:", res.data.cart_items_updated);
    
            // console.log('authcontext:',res.data);
            
            if (!res.data.email) {
                console.log("⚠️ No email returned from API.");
                return null;
            }

            setEmail(res.data.email);
            return res.data.email;
        } catch (err) {
            console.log("❌ Error fetching email:", err.message);
            return null;
            }

    };
    

    useEffect(() => {
        handleAuth();
    }, []);
    
    useEffect(() => {
        if (isAuthenticated) {
            getEmail();
        }
    }, [isAuthenticated]);  // ✅ Only call `getEmail` when authentication is confirmed
    
    
    const authValue = {isAuthenticated,setIsAuthenticated,email,getEmail}
    
    return <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
}