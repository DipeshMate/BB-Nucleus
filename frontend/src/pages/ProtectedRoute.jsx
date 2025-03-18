import { useState, useEffect } from "react";
import api from "../api";
import { jwtDecode } from "jwt-decode";
import Spinner from "./Spinner";
import { Navigate, useLocation } from "react-router-dom";
// import Cookies from "js-cookie";

const ProtectedRoute = ({ children, requiresCart = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [hasCart, setHasCart] = useState(true);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        await auth();
      } catch (error) {
        console.error("Authentication failed:", error);
        logoutUser();
      }
    })();
  }, []);

  async function refreshToken() {
   // const refreshToken = Cookies.get("refresh_token")
     const refreshToken = localStorage.getItem("refresh");
    if (!refreshToken) {
      logoutUser();
      return;
    }

    try {
      const res = await api.post("/token/refresh/", { refresh: refreshToken });
      if (res.status === 200) {
        // Cookies.set("access_token", res.data.access);
        localStorage.setItem("access", res.data.access);
        setIsAuthenticated(true);
      } else {
        logoutUser();
      }
    } catch (err) {
      console.error("Token refresh failed:", err);
      logoutUser();
    }
  }

  async function auth() {
    const token = localStorage.getItem("access");
    // const token = Cookies.get("access_token");
    if (!token) {
      logoutUser();
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const expiry_date = decoded.exp;
      const current_time = Date.now() / 1000;

      if (current_time > expiry_date) {
        await refreshToken();
      } else {
        await verifyUser();
      }
    } catch (error) {
      console.error("Token decoding error:", error);
      logoutUser();
    }
  }

  async function verifyUser() {
    try {
      const res = await api.get("/Cart/useremailinfo"); // Replace with actual user verification API
      if (res.status === 200) {
        setIsAuthenticated(true);
        if (requiresCart) {
          await verifyCart();
        }
      } else {
        console.warn("User verification failed. Not logging out immediately.");
      }
    } catch (error) {
      console.error("User verification error:", error);
    }
  }

  async function verifyCart() {
    //const cartId = Cookies.get("cart_id")
    const cartId = localStorage.getItem("cart_id");
    if (!cartId) {
      console.warn("Cart ID not found in Local Storage.");
      setHasCart(false);
      return;
    }

    try {
      const cartRes = await api.get(`/Cart/getcart?cart_id=${cartId}`);
      if (cartRes.status === 200 && cartRes.data.items.length > 0) {
        setHasCart(true);
      } else {
        console.warn("Cart is empty or cart verification failed.");
        setHasCart(false);
      }
    } catch (error) {
      console.error("Cart verification error:", error);
      setHasCart(false);
    }
  }

  function logoutUser() {
    console.warn("Logging out user due to an authentication issue.");
    // Cookies.remove("access_token")
    // Cookies.remove("refresh_token")
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
  }

  if (isAuthenticated === null) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiresCart && !hasCart) {
    return <Navigate to="/cart" replace />;
  }

  return children;
};

export default ProtectedRoute;



// import { useState , useEffect} from 'react'
// import api from "../api";
// import {jwtDecode} from 'jwt-decode';
// import Spinner from "./Spinner";
// import { Navigate, useLocation } from "react-router-dom";

// // this component is being protected, which help us protect our routes--> if user is not logged in like your checkout page.
// const ProtectedRoute = ({ children }) => {

//     const [isAuthenticated, setIsAuthenticated] = useState(null);
    
//     const location = useLocation();
//     useEffect(function () {
//         auth().catch(() => setIsAuthenticated(false))
//     }, [])
//     async function refreshToken() {

//         const refreshToken = localStorage.getItem("refresh") // get a refresh token if it is in localstorage
        
//         try {
        
//             const res = await api.post("/token/refresh/", {
//                 refresh: refreshToken, // in this the response we get a access token while we call a refreshtoken
//             });
//             if (res.status === 200) {
//                 localStorage.setItem("access", res.data.access) // and here just set a access token to a local storage.
//                 setIsAuthenticated(true) //this will give access to protected page
//             } else {
//                 setIsAuthenticated(false)// this will redirected back to login page.
//             }
//         }
//         catch (err) {
//             console.log(err.message);
//             setIsAuthenticated(false)
//         }
//     }

//     async function auth() {

//         const token = localStorage.getItem("access")
//         if (!token) {
//             setIsAuthenticated(false)
//             return; // it will redirected to login Page
//         }
//         const decoded = jwtDecode(token)
//         const expiry_date = decoded.exp
//         const current_time = Date.now() / 1000 // in seconds
        
//         if (current_time > expiry_date) {
//             await refreshToken() // token has expired so it will call a refresh token which will help to generate new access token
//         }
//         else { // if token is not expired then 
//             setIsAuthenticated(true) // it will help to access the protected page, 
//         }
//     }
    
//     if (isAuthenticated === null) {
//         return <Spinner />
//     }
//     return (
//         isAuthenticated ? children : <Navigate to={'/login'} state={{ from: location }} replace /> // here children is a protected page that is checkout page. and from key is holding the location where we intender to visit that is checkout page. and if we logged in and we'll check if it has a value, we will redirect the user to that value and the value is checkout page
//   )
// }

// export default ProtectedRoute
