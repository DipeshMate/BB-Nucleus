import React from 'react'
import {Link} from 'react-router-dom'
const NotFoundPage = () => {
  return (
      <main className='py-3 my-5 bg-[#6050DC]'>
          <div className='container px-4 lg:px-5 my-5'>
              <h1 className='text-4xl font-bold mb-4'>Page Not Found</h1>
              <p className='font-normal text-white mb-4'>The Page you tried accessing does not exist. </p>
              <Link to={'/'} className='text-lime-400 rounded-xl px-4 py-2'>Back to Home</Link>
          </div>
    </main>
  )
}

export default NotFoundPage
