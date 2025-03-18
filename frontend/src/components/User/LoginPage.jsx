import {useState, useContext} from 'react';
import vector_bat from '../../assets/vector_bat.jpg'
import api from "../../api";
import Error from "../../pages/Error";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { Spinner } from '../../pages';
// import Cookies from "js-cookie";

import { useSnackbar } from 'notistack';
const LoginPage = () => {

  const { setIsAuthenticated, getEmail } = useContext(AuthContext);

  const navigate = useNavigate();
  const {enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const userData = { email, password }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('token/', userData);
        
        console.log("Response from backend:", res); // Debugging ✅
        
        if (res.data.access) {
            localStorage.setItem("access", res.data.access);  // ✅ Store token
            localStorage.setItem("refresh", res.data.refresh); // If refresh token exists
            setIsAuthenticated(true);
        } else {
            console.log("❌ No access token received from API");
            setError("Login Failed. No token received.");
            return;
        }

      // enqueueSnackbar("Please Update your Cart items!", { variant: "info" });  
      setEmail('');
      setPassword('');
      setError('');

         // ✅ Call getEmail() to update the cart
         const email = await getEmail();
       
         if (!email) {
             console.log("⚠️ Email not found, skipping cart update");
         } else {
             console.log("✅ Cart successfully updated with email:", email);
         }
 
       // enqueueSnackbar("Please Update your Cart before Checkout.!!", { variant: "info" });
            navigate("/cart", { replace: true });

    } catch (err) {
        console.log("Login error:", err.message);
        setError("Login Failed. Check Your crendentials.");
    } finally {
        setLoading(false);
    }
};


  if (loading) {
    return <Spinner loading={loading} />
}

  return (
    <div className="font-[sans-serif] bg-gray-50">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center lg:gap-10 gap-4">

        <form onSubmit={handleSubmit} className="lg:col-span-2 max-w-lg w-full p-6 mx-auto">
          {error && <Error error={error} />}
          <div className="mb-12">
            <h3 className="text-gray-800 text-4xl font-extrabold">Log in</h3>
          
            <p className="text-gray-800 text-sm mt-6">Don't have an account <Link to={'/register'} className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</Link></p>
          
          </div>

          <div>
            <label className="text-gray-800 text-sm block mb-2">email</label>
            <div className="relative flex items-center">
              <input name="email" type="email"
                required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="Enter your email"
                id='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
              
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg>
            </div>
          </div>

          <div className="mt-8">
            <label className="text-gray-800 text-sm block mb-2">Password</label>
            <div className="relative flex items-center">
              <input name="password" type="password"
                required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="Enter password"
                value={password}
                id='password'
                onChange={(e)=>setPassword(e.target.value)}/>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="text-gray-800 ml-3 block text-sm">
                Remember me
              </label>
            </div>
            <div>
              <Link to={'/resetpassword'} className="text-blue-600 text-sm font-semibold hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <button type="submit"
              className="w-full py-2.5 px-5 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              disabled={loading}>
              Log in
            </button>
          </div>
        </form>

        <div className="h-full md:py-6 flex items-center place-content-center  relative max-md:before:hidden before:absolute before:bg-gradient-to-r before:from-gray-50 before:via-[#E4FE66] before:to-[#55F5A3] before:h-full before:w-3/4 before:right-0 before:z-0">
          <img src={vector_bat} className="rounded-md lg:w-5/5 lg:mr-56 md:w-11/12 sm:w-4/6 z-5 relative" alt="Dining Experience" />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
