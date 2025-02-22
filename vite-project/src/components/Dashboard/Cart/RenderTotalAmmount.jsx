import React from 'react'
import { useSelector } from 'react-redux'

function RenderTotaaAmmount() {
    const {total} = useSelector(state=>state.cart)
    const handleBuyCourse =()=>{
        
    }
  return (
    <div className="mt-8 bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold text-gray-300">Total:</p>
        <p className="text-2xl font-bold text-white">Rs {total}</p>
      </div>
      <button
        onClick={handleBuyCourse}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Buy Now
      </button>
    </div>
  )
}

export default RenderTotaaAmmount
