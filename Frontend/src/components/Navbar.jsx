import React from 'react'

function Navbar() {
  return (
    <>
      <div className='max-w-screen-2x1 max-w-full container px-6 py-3 md:px-40 shadow-lg h-16 fixed  bg-indigo-300'>
        <div className='flex justify-between '>
          <h1 className='text-2xl cursor-pointer font-bold'>Word<span className='text-3xl text-white'>To</span>PDF</h1>
          <h1 className='mt-1 text-2xl cursor-pointer font-bold hover:scale-110 duration-500'>Home</h1>
        </div>
      </div>
    </>
  )
}

export default Navbar