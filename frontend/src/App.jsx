import './App.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import MainLayout from "./Layout/MainLayout";
import HomePage from './components/Home/HomePage';
import CartPage from './components/Cart/CartPage';
import ProductDetails from './components/Product/ProductDetails';
import CheckoutPage from './components/Checkout/CheckoutPage';
import UserProfile from './components/UserProfile/UserProfile';
import LoginPage from './components/User/LoginPage';
import RegisterPage from './components/User/RegisterPage';
import ResetPassword from './components/User/ResetPassword';
import PasswordPopup from './components/User/PasswordPopup';
import PaymentSection from './components/Checkout/PaymentSection';
import CheckoutForm from './components/Checkout/CheckoutForm';
import { AboutUs, ContactUs, AllProducts, NotFoundPage,ThankYouPage,ProtectedRoute } from './pages';
import { AuthProvider } from './context/authContext';
// import useProductData from './hooks/useProductData';

import { SnackbarProvider } from "notistack";
import { CartProvider, useCart } from './context/cartContext';
import OrderHistory from './components/UserProfile/OrderHistory';


function App() {

  // const { allBats = [] } = useProductData();
  
  return (
    
      <CartProvider>
    <AuthProvider>
      <SnackbarProvider maxSnack={3} anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}>
    
        <BrowserRouter>

      <Routes>
        {/*-------Home Route with Feature Component-------*/}
              <Route path="/" element={<HomePage  />} />
          {/*----Layout Wrapping All Other Routes----*/}
          <Route path="/Checkoutpage" element={<ProtectedRoute requiresCart={true}><CheckoutPage /></ProtectedRoute>} />
<Route path="/Paymentsection" element={<ProtectedRoute requiresCart={true}><PaymentSection  /></ProtectedRoute>} />
<Route path="/CheckoutForm" element={<ProtectedRoute requiresCart={true}><CheckoutForm /></ProtectedRoute>} />
<Route path="/ThankYouPage" element={<ProtectedRoute requiresCart={true}> <ThankYouPage/> </ProtectedRoute>} />

          <Route element={<MainLayout />}>
            <Route path="/About" element={<AboutUs />} />
            <Route path="/Contact" element={<ContactUs />} />
            <Route path="/types/:type" element={<AllProducts />} />
            <Route path="/Allproducts" element={<AllProducts  />} />
            <Route path="/AllProducts/:id" element={<ProductDetails />} />
            <Route path="/Cart" element={<CartPage  />} />
                <Route path="/Profile" element={<UserProfile />} />
                <Route path="/OrderHistory" element={<OrderHistory />} />
                
            <Route path="/Login" element={<LoginPage />} />
                <Route path="/Resetpassword" element={< ResetPassword />} />
                <Route path="/Passwordpopup" element={< PasswordPopup />} />
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route> 
        </Routes>
        </BrowserRouter>
        </SnackbarProvider>
    </AuthProvider>
          </CartProvider>
    
  );
}

export default App;
