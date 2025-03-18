import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import PlaceHolderContainer from "./PlaceHolderContainer";
import useProductData from "../../hooks/useProductData";

const AllProducts = () => {
  const { allBats = [], loading, error } = useProductData();
  const { type } = useParams();
  const [visibleCount, setVisibleCount] = useState(8);
  
  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 8);
  };
  if (loading) {
    return <Spinner loading={loading} />
}
console.log(allBats);

  return (
    <div className='container text-center mx-auto'>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        {loading ? (
          error ? (<PlaceHolderContainer/> ):(
          <div className="error-message">Network Error. Please try again later.</div>
          ))
            : (
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              className="text-center text-3xl font-semibold mb-12 text-gray-800"
            >
              {type ? `${type}` : 'Our Products'}
            </motion.h2>

            {error != null ? '' : <p className='mb-2'>Total Products: {allBats.length}</p>}

            {/* Product Grid */}
            <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                  {allBats.length > 0 ? allBats.slice(0, visibleCount).map((bats, index) => (
                <motion.div 
                  key={bats.id} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="h-56 w-full">
                    <Link to={`/Allproducts/${bats.id}`}>
                      <img className="mx-auto h-full dark:hidden" src={bats.image} alt='' />
                      <img className="mx-auto hidden h-full dark:block" src={bats.image} alt='' />
                    </Link>
                  </div>
                  <div className="pt-6">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"> 
                        Up to {bats.discount_percentage}% off 
                      </span>
                    </div>
                    <Link to={`/Allproducts/${bats.id}`}>
                      <p className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{bats.name}</p>
                    </Link>
                    
                     {/*-----------Just a Label Fast Delivery & Best Price */}
                    
                        <ul className="mt-2 flex items-center place-content-center gap-4">
                        <li className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                          </svg>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Fast Delivery
                          </p>
                        </li>

                        <li className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                          </svg>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Best Price
                          </p>
                        </li> </ul>
                    <div className="mt-4 flex items-center justify-evenly gap-3">
                      <p className="text-sm font-medium leading-tight line-through text-gray-900 dark:text-white">
                        &#8377;{bats.og_price}
                      </p>
                      <p className="text-l font-semibold leading-tight text-gray-900 dark:text-white">
                        &#8377;{bats.selling_price}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )) : (<PlaceHolderContainer />)}
            </div>
            
            {/* Show More Button */}
            {allBats.length > visibleCount && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center"
              >
                <button 
                  type="button"
                  onClick={handleShowMore}
                  className="rounded-lg border border-gray-200 bg-slate-300 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                >
                  Show more
                </button>
              </motion.div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default AllProducts;


//  {/*-----------Just a Label Fast Delivery & Best Price */}
//  <ul className="mt-2 flex items-center place-content-center gap-4">
//  <li className="flex items-center gap-2">
//    <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
//    </svg>
//    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
//      Fast Delivery
//    </p>
//  </li>

//  <li className="flex items-center gap-2">
//    <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
//    </svg>
//    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
//      Best Price
//    </p>
//  </li>
// </ul>