import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotatAmmount from './RenderTotalAmmount'

function Cart() {
    const {total, totalItems} = useSelector(state=>state.cart)
  return (
    <div className="w-[29rem] sm:w-[40rem] sm:ml-10 md:mx-auto p-4 text-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-white">Your Cart</h1>
        {total > 0 ? (
        <div className='md:w-[]'> 
            <RenderCartCourses />
            <RenderTotatAmmount />
        </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4">
          <p className="text-xl text-gray-400 mb-4">Your Cart is Empty</p>
          <button 
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
              Continue Shopping
          </button>
      </div>
        )}
  </div>
  )
}

export default Cart
