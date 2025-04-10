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
        <p className="text-xl text-gray-300">Your Cart is Empty</p>
        )}
  </div>
  )
}

export default Cart
