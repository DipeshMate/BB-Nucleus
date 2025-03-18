import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { animate } from "framer-motion";
import api, { BASE_URL } from '../../api';
import {randomValue } from "../../pages/GenerateCardCode"; // //whenever all products render, it will store the random value to localstorage.
// import { toast } from 'react-toastify';
import { useSnackbar } from "notistack";
// import Cookies from 'js-cookie';

import ProductDetailsPlaceHolder from './ProductDetailsPlaceHolder';
import ProductGallery from './ProductGallery';
import { useCartData } from '../../hooks/useCartData';
import { useCart } from '../../context/cartContext';
import useProductData from '../../hooks/useProductData';




const ProductDetails = () => {
  
  const { allBats = [] } = useProductData();

  const { setNumOfCartItems, fetchCartData } = useCart();

  const {
    setCartTotal,
    setOriginalPrice,
    setCartDiscountedPrice,
  } = useCartData();
  const { enqueueSnackbar } = useSnackbar();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { id } = useParams();

  
  const cart_id = localStorage.getItem("cart_id");
  // const cart_id = Cookies.get("cart_id")

  
  // product add to a cart with a cart_id & product_id
  const add_to_cart = async (product_id) => {
    if (!product_id) {
      console.error("Product ID is undefined.");
      return;
    }

    const new_item = {
      cart_id: cart_id,
      product_id: product_id,
    };
  
      try {
        const res = await api.post('Cart/add/', new_item);
        setInCart(true);
        setNumOfCartItems(curr => curr + 1);
        enqueueSnackbar("Item added to cart!", { variant: "success" });  
        await fetchCartData();  // Re-fetch to ensure UI syncs with backend

        const cartRes = await api.get(`Cart/getcart?cart_id=${cart_id}`);
        // console.log("Cart Updated After Add:", cartRes.data);
        setCartTotal(cartRes.data.sum_total);
        setOriginalPrice(cartRes.data.sum_original_price);
        setCartDiscountedPrice(cartRes.data.sum_discounted_price);
      } catch (err) {
        console.error(err.message);
        // toast.error("Failed to add item to cart");
        enqueueSnackbar("Failed to add item to cart", { variant: "error" });

      }
    };
  //whenever all products render, it will store the random value to localstorage. 
  useEffect(() => {
    // let cart_id = Cookies.get("cart_id"); // Don't check for `null`, check `undefined`
    let cart_id = localStorage.getItem("cart_id");

    if (!cart_id) {
      // console.log('here on productdetails cart_id get null');
      // console.log("🛒 Cart ID is missing, generating a new one...");
      // Cookies.set("cart_id", randomValue, { expires: 7, path: '/', secure: true, sameSite: "Lax" });
      localStorage.setItem("cart_id", randomValue)
    }
  }, [])

 // Fetching single Product from the backend
  useEffect(() => {
    const fetchBats = async () => {
      setLoading(true)
      try {
        const endpoint = `/Home/${id}`;
        const res = await api.get(endpoint)
        // console.log(res.data);
        setProduct(res.data)
        scrollToTop()
        setLoading(false)
      } catch (err) {
        console.log(err.message)
        setLoading(false)
      }
    };
    fetchBats();
  }, [id]);

  // Page Scroll up to the Top
  const scrollToTop = () => {
    animate(0, 0, {
      duration: 0.5, // Adjust duration
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
  };
  

  const relatedProducts =
    product && allBats?.length > 0
      ? allBats.filter((bat) => bat.types === product.types)
      : [];
  
  
      const getItemsPerPage = () => {
        if (window.innerWidth >= 1024) return 4;
        if (window.innerWidth >= 768) return 3;
        return 2;
      };
    
      const itemsPerPage = getItemsPerPage();
      const totalPages = Math.ceil(relatedProducts.length / itemsPerPage);
    
      const handlePrev = () => {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
      };
    
      const handleNext = () => {
        setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
      };
  
  useEffect(() => {
    if (product.id) {
      api.get(`Cart/incart?cart_id=${cart_id}&product_id=${product.id}`).then(res => {
        // console.log(res.data);
        setInCart(res.data.product_in_cart)
      }).catch(e => {
        console.log(e.message);
      })
    }
  }, [cart_id, product.id])
  
  if (loading) {
    return <ProductDetailsPlaceHolder />
  }  

  return (
    
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">

      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      <h2 className="text-center text-3xl font-semibold mb-12 text-gray-800">{(product && allBats?.length > 0) ? product.types : allBats?.types} </h2>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {product && ( 
            <>
                          {/*---- Left Side Image */}
              <ProductGallery product={product} />
            
          {/*---- Right Side Content */}
<div className="mt-4 sm:mt-8 lg:mt-2 px-20">

{/* Category */}
<h4 className="pl-2 text-left text-gray-500 dark:text-gray-400 font-semibold">
  BB Nucleus
</h4>

{/* Product Name */}
<h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white ">
  {product.name}
</h1>

{/* Pricing & Discount */}
<div className="mt-4 flex sm:items-center place-content-center sm:gap-4 sm:flex">
  <p className="text-2xl font-medium line-through text-gray-900 dark:text-white">
    &#8377;{product.og_price}
  </p>
  <p className="text-2xl font-bold text-green-600 sm:text-3xl dark:text-white">
    &#8377;{product.selling_price}
  </p>
  <p className="text-xs px-3 py-1 font-bold text-white sm:text-xs rounded-full bg-black dark:text-white">
    -{product.discount_percentage}% OFF
  </p>
</div>

{/* Low Stock Indicator */}
<div className="flex items-center mt-3">
  <input
    type="radio"
    checked
    className="h-4 w-4 text-red-500 border-red-500 focus:ring-red-500"
    readOnly
  />
  <p className="ml-2 text-lg font-semibold text-red-500">Low Stock</p>
</div>

{/* Features */}
<div className="flex flex-col gap-4 mt-4">
  <div className="flex items-center p-4 border rounded-lg shadow-md">
    <span className="text-2xl mr-3">🎒</span>
    <p className="text-lg font-semibold">Inclusive of Bat Cover</p>
  </div>
  <div className="flex items-center p-4 border rounded-lg shadow-md">
    <span className="text-2xl mr-3">🏏</span>
    <p className="text-lg font-semibold">Lightweight with Extra Power</p>
  </div>
</div>

{/* Ratings & Reviews */}
{/* <div className="flex items-center place-content-center gap-2 mt-2 sm:mt-0">
  <div className="flex items-center gap-1">
    <span className="text-yellow-400 text-lg">★★★★★</span>
  </div>
  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">(5.0)</p>
  <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
    10 Reviews
  </a>
</div> */}

{/* Shipping Info */}
<span className='text-xs flex gap-1 mt-1 text-gray-500 dark:text-gray-400'>
  <p className='underline'>Shipping</p> Calculated at checkout.
</span>

{/* Add to Cart Button */}
<div className="mt-3 sm:gap-4 place-content-center sm:items-center sm:flex sm:mt-8">    
  {product.stock <= 0 ? (<button className='ml-3 inline-flex items-center rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold cursor-none text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-slate-400 dark:hover:bg-primary-700 dark:focus:ring-primary-800 '>Out Of Stock</button>): ( <button
                    onClick={() => add_to_cart(product.id)}
                    type="button"
                    className="ml-3 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    disabled={inCart}
                    >
    🛒 {inCart ? "Product Added to Cart" : "Add to Cart"}
  </button>)}
</div>

{/* Divider */}
<hr className="my-3 md:my-4 border-gray-300 dark:border-gray-700" />

{/* Product Details */}
<div className="mt-6  flex flex-col gap-4">

  {/* Bat Specifications */}
  <div className="product-box p-4 border rounded-2xl shadow-xl hover:shadow-2xl transition-shadow bg-white dark:bg-gray-800">
    <h2 className="text-lg font-bold underline decoration-primary-600">Bat Specifications</h2>
    <ul className="mt-2 space-y-1">
      <li><strong>Type:</strong> {product.types}</li>
      <li><strong>Length:</strong> {product.size} Inch</li>
      <li><strong>Thickness:</strong> Available in between 35-40 mm</li>
      <li><strong>Weight:</strong> {product.weight_value} grams</li>
    </ul>
  </div>

  {/* Product Details */}
  <div className="product-box p-4 border rounded-2xl shadow-xl hover:shadow-2xl transition-shadow bg-white dark:bg-gray-800">
    <h3 className="text-lg font-bold underline decoration-primary-600">Product Details</h3>
    <ul className="mt-2 space-y-1">
      <li>{product.desc}</li>
      <li>Lightweight with machine-crafted scooped design</li>
      <li>Maximizes power and comfort for enjoyable play</li>
      <li>Timely dried for powerful batting</li>
      <li>Large sweet spot for versatile shots</li>
      <li>Suitable for various tennis cricket types</li>
      <li>Get Free full bat cover & comfy grip with this purchase</li>
    </ul>
  </div>


        {/* <div className="product-box p-4  border rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
          <h3 className="text-lg font-semibold">Shipping Information</h3>
          <p>Free Shipping all over India. Delivery mostly in between 10-12 working days.</p>
        </div> */}

        {/* <div className="product-box p-4  border rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
          <h3 className="text-lg font-semibold">Get Free With This Bat</h3>
          <ul>
            <li>Bat Cover</li>
            <li>Comfy Grip</li>
          </ul>
        </div> */}
                </div>
    </div>
       
              </>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-2 2xl:px-0">
        <h2 className="mt-6 text-center text-3xl font-semibold mb-12 text-gray-800">Related Products ({relatedProducts.length})</h2>
        <p className='flex text-lg mb-4 font-semibold text-gray-800'>
  Type: {(product && allBats?.length > 0) ? product.types : allBats?.[0]?.types || "No type available"}
</p>

        {/*-------Related Product Section----- */}
        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {relatedProducts.length > 0 ? (
          relatedProducts
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((bats) => (
              <div
                key={bats.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:shadow-xl transition-shadow duration-300 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="h-50 w-full">
                  <Link to={`/AllProducts/${bats.id}`}>
                    <img
                      className="mx-auto h-80 dark:hidden"
                      src={bats.image}
                      alt={bats.desc}
                    />
                    <img
                      className="mx-auto hidden h-80 dark:block"
                      src={bats.image}
                      alt={bats.desc}
                    />
                  </Link>
                </div>
                <div className="pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                      Up to {bats.discount_percentage}% off
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-lg font-semibold text-gray-900 hover:underline dark:text-white"
                  >
                    {bats.name}
                  </a>
                  
                  <ul className="mt-2 flex items-center gap-4">
                    <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                      </svg> Fast Delivery
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                      </svg> Best Price
                    </li>
                  </ul>
                  <div className="mt-4 flex items-center justify-evenly">
                    <p className="text-sm line-through text-gray-900 dark:text-white">
                      ₹{bats.og_price}
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      ₹{bats.selling_price}
                    </p>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <h2 className="text-center text-gray-500">No Related Product Found</h2>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={handlePrev}
            className="px-3 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
            disabled={currentPage === 0}
          >
            &#10094;
          </button>
          <span className="text-gray-700 dark:text-white">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            className="px-3 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
            disabled={currentPage === totalPages - 1}
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
    </section>
  )
}

export default ProductDetails
