import { useContext, useState, useEffect } from 'react';
import logo from '../../assets/b.jpg';
import { motion } from 'framer-motion';
import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";
import { useCart } from '../../context/cartContext';
import { useSnackbar } from 'notistack';
// import Cookies from "js-cookie";

const Navbar = () => {

  const navigate = useNavigate();
  const { numOfCartItems } = useCart();

  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation(); // Detect route changes

  const { enqueueSnackbar } = useSnackbar();
  //contextAPI for NAVLINK State
  const {isAuthenticated, setIsAuthenticated, email} = useContext(AuthContext); // if user is logged in then show his username

  // Toggle mobile menu visibility
  const toggleMenu = () => { setIsMenuOpen(!isMenuOpen); };

   // Close dropdown when route changes
   useEffect(() => {
    setIsProfileOpen(false);
   }, [location]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-container")) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

 
  function userLogout() {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    enqueueSnackbar("You Logged Out Successfully!!", { variant: "success" });  

    setTimeout(() => {
      navigate('/Allproducts');
    }, 250);

    setIsAuthenticated(false)
   }
  return (
    <>
      <nav>
        <div className="bg-gray-700 mx-auto max-w-7xl px-2 md:px-4 sm:px-6 lg:px-2">
          <div className="relative flex h-20 items-center justify-between lg:pl-6 md:pl-2">
            {/* Logo Section */}
            <div className="flex flex-1 items-center justify-center sm:mr-8 sm:justify-start">
              <div className="flex shrink-0 items-center">
                <Link to={'/'}>
                  <img className="h-8 w-auto" src={logo} alt="BB BATS" />
                </Link>
                <a
                  href="/"
                  className="px-2 font-inter font-bold text-lg text-gray-100 hover:bg-gray-700 hover:text-white"
                >
                  BB Nucleus
                </a>
              </div>
            </div>

            {/* Hamburger Menu (Mobile Version) */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden pl-4">
              <button
                onClick={toggleMenu}
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen ? 'true' : 'false'}
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg
                  className={`block h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'} transition-transform transform duration-500`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/* Close icon */}
                <svg
                  className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'} transition-transform transform duration-500`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Links (Desktop Version) */}
            <div className="hidden pl-4 sm:flex sm:ml-6 sm:space-x-4 sm:justify-center sm:items-center w-full">
      <Link
        to="/"
        className={`block rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ${
          window.location.pathname === "/" ? "bg-slate-600 text-white" : "text-gray-300 hover:bg-slate-600 hover:text-white"
        }`}
      >
        Home
      </Link>
      <Link
        to="/Allproducts"
        className={`block rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ${
          window.location.pathname === "/Allproducts" ? "bg-slate-600 text-white" : "text-gray-300 hover:bg-slate-600 hover:text-white"
        }`}
      >
        Cricket Bats
      </Link>
      <Link
        to="/About"
        className={`block rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ${
          window.location.pathname === "/About" ? "bg-slate-600 text-white" : "text-gray-300 hover:bg-slate-600 hover:text-white"
        }`}
      >
        About Us
      </Link>
      <Link
        to="/Contact"
        className={`block rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ${
          window.location.pathname === "/Contact" ? "bg-slate-600 text-white" : "text-gray-300 hover:bg-slate-600 hover:text-white"
        }`}
      >
        Contact Us
      </Link>
    </div>



            {/* Cart and Profile Icon (Right Side) */}
            <div className="absolute inset-y-0 right-0 flex items-center place-content-center pr-4 md:pr-4 lg:pr-4 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Cart Icon */}
              <div className=" relative pr-10 ms-4  mb-8 flex-col">
                <Link to={'Cart'} className='rounded-full relative'>
                  {numOfCartItems > 0 ? (
                    <span
                      className="absolute bg-zinc-900 w-8 h-8 pt-[2px]  flex text-center place-content-center rounded-2xl text-gray-300 hover:text-white transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="currentColor" className="bi bi-cart4 " viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                      </svg>
                      <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                        {numOfCartItems}
                      </span>

                    </span>
                  ) : (
                    // Show an empty cart icon or no badge if there are no items
                    <span
                      className="absolute bg-gray-300 w-7 h-7 pl-[2px] rounded-full text-gray-600 transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="26" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                      </svg>
                    </span>
                  )}
                </Link>
              </div>

              {/*-------Profile------ */}
              <div className="relative profile-container">
                {/* Profile Button */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  type="button"
                  className="relative flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800 p-1.5"
                  id="user-menu-button"
                  aria-expanded={isProfileOpen ? "true" : "false"}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="27"
                    fill="currentColor"
                    className="bi bi-person-circle text-white"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                </button>

                {/* to manage the NAvlink state we have to use ContextAPi  */}
                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none transition-opacity duration-300"
                    role="menu"
                    tabIndex = "-1"
                    aria-orientation="vertical"
                  >
                    {isAuthenticated ?
                      (
                        <>
                          <div className='px-4 py-2 text-sm font-normal'>
                     Hi, {email ? email.replace("@gmail.com", "") : "Guest"} !
                     </div>
                        <NavLink
                            to={'/profile'}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm font-normal cursor-pointer ${isActive
                          ? "text-blue-600 bg-gray-100"
                          : "text-gray-700 hover:text-blue-500 hover:bg-gray-100"
                        }`
                      }
                      role="menuitem"
                          >
                           Account Info
                          </NavLink>
                        <NavLink
                            to={'/orderhistory'}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm font-normal cursor-pointer ${isActive
                          ? "text-blue-600 bg-gray-100"
                          : "text-gray-700 hover:text-blue-500 hover:bg-gray-100"
                        }`
                      }
                      role="menuitem"
                          >
                            Order History
                          </NavLink>
                          
                    <NavLink onClick={userLogout}
                      to={'/Allproducts'}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm font-normal cursor-pointer ${isActive
                          ? "text-red-600 bg-gray-100"
                          : "text-gray-700 hover:text-red-500 hover:bg-gray-100"
                        }`
                      }
                      role="menuitem"
                    >
                      Logout
                          </NavLink>
                          </>
                      )

                      :

                      (
                        <>
                         <NavLink
                            to={'/login'}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm font-medium cursor-pointer ${isActive
                          ? "text-blue-600 bg-gray-100"
                          : "text-gray-700 hover:text-blue-500 hover:bg-gray-100"
                        }`
                      }
                      role="menuitem"
                    >
                      Login
                    </NavLink>
                    <NavLink
                            to={'/register'}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm font-medium cursor-pointer ${isActive
                          ? "text-blue-600 bg-gray-100"
                          : "text-gray-700 hover:text-blue-500 hover:bg-gray-100"
                        }`
                      }
                      role="menuitem"
                    >
                      Register
                    </NavLink>
                        </>
                      ) }

    
                   
                  </div>
                )}
              </div>
            </div>
          </div>

          {/*---- MOBILE----- */}

          {/* Mobile Menu Overlay */}
          <div
            className={`fixed inset-0 z-10 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={toggleMenu}
          ></div>

          {/* Mobile Menu */}
          <div
            className={`fixed left-0 top-0 z-20 h-full w-64 bg-gray-900 text-white transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            {/* Mobile Drawer Close Button (X) */}
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Mobile Drawer Menu Links */}
            <div className="space-y-1 px-2 pt-2 pb-3">
              <a
                href="#"
                className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
              >
                &nbsp;
              </a>
              <Link
                to={'/'}
                className="block rounded-md px-3 py-2 text-base font-medium  text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Home
              </Link>
              <Link
                to={'AllProducts'}
                className="block rounded-md px-3 py-2 text-base font-medium  text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Cricket Bats
              </Link>
              <Link
                to={'About'}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                About Us
              </Link>
              <Link
                to={'Contact'}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Contact Us
              </Link>

              <div className="w-full mb-10">
                <h4 className="text-base mt-6 font-semibold text-dark dark:text-white mb-6 divide-y-4 divide-y-reverse divide-gray-200">
                  ---Follow Us On---
                </h4>
                <div className="flex justify-center sm:justify-start space-x-4">
        {/* Facebook */}
        {/* <motion.a
          href="https://www.facebook.com/dipesh.mate.3/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
        >
          <svg
            className="w-6 h-6 text-gray-600 hover:text-blue-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M22.675 0h-21.35C.595 0 0 .6 0 1.327v21.346C0 23.4.595 24 1.325 24H12.82v-9.294H9.692V11.1h3.129V8.41c0-3.1 1.893-4.788 4.66-4.788 1.325 0 2.463.1 2.796.144v3.24l-1.922.001c-1.507 0-1.796.718-1.796 1.768V11.1h3.587l-.467 3.605h-3.12V24h6.117C23.4 24 24 23.4 24 22.673V1.327C24 .6 23.4 0 22.675 0z" />
          </svg>
        </motion.a> */}
        

        {/* Instagram */}
        <motion.a
          href="https://www.instagram.com/bb_nucleus"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
        >
          <svg
            className="w-6 h-6 text-gray-600 hover:text-pink-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7.75 2C4.022 2 2 4.022 2 7.75v8.5C2 19.978 4.022 22 7.75 22h8.5C19.978 22 22 19.978 22 16.25v-8.5C22 4.022 19.978 2 16.25 2h-8.5zM12 6.75c2.899 0 5.25 2.351 5.25 5.25s-2.351 5.25-5.25 5.25S6.75 14.899 6.75 12 9.101 6.75 12 6.75zm0 1.5c-2.062 0-3.75 1.688-3.75 3.75s1.688 3.75 3.75 3.75 3.75-1.688 3.75-3.75-1.688-3.75-3.75-3.75zm4.875-.75a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75z" />
          </svg>
        </motion.a>
        
                  {/* Whatsapp */}  
                  <motion.a
          href="https://wa.me/9425565563"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
        >
                      <svg
                className="w-6 h-6 text-gray-600 hover:text-green-500 cursor-pointer"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M16 0C7.164 0 0 7.163 0 16c0 2.801.725 5.42 1.996 7.707L0 32l8.608-1.932A15.951 15.951 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.265 13.265 0 01-6.903-1.923l-.497-.292-5.988 1.343 1.385-5.787-.321-.519A13.242 13.242 0 012.667 16c0-7.362 5.971-13.333 13.333-13.333S29.333 8.638 29.333 16 23.362 29.333 16 29.333zm7.345-9.757c-.401-.2-2.37-1.168-2.737-1.299-.367-.133-.633-.2-.9.2s-1.032 1.299-1.265 1.566c-.233.267-.467.3-.867.1-.401-.2-1.69-.622-3.22-1.98a12.05 12.05 0 01-2.2-2.69c-.233-.4 0-.622.176-.823.181-.182.401-.468.6-.7.2-.233.267-.4.4-.633.133-.233.067-.466 0-.7-.2-.4-.9-2.166-1.233-2.967-.322-.8-.667-.7-.9-.7h-.767c-.267 0-.7.1-1.065.5s-1.398 1.366-1.398 3.333c0 1.967 1.433 3.867 1.633 4.133.2.267 2.8 4.3 6.8 6.032 1 .433 1.767.7 2.367.9 1 .3 1.9.267 2.633.161.8-.133 2.37-.967 2.7-1.9.333-.934.333-1.734.233-1.9-.1-.166-.366-.267-.767-.466z" />
                    </svg>
                    </motion.a>

                 </div>
                <h2 className="text-base text-body-color dark:text-dark-6 mt-4">
                  &copy; 2025 BB Nucleus
                  <br />
                  <p className="font-extralight">BB Nucleus | ALL RIGHTS RESERVED</p>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
