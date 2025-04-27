import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { setCourse } from '../../../slices/course'
import { enrollInCourses } from '../../../services/course'
import { resetCart } from '../../../slices/cart'
function RenderTotaaAmmount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const {token} = useSelector(state=>state.auth)
    const {total} = useSelector(state=>state.cart)
    const {cart} = useSelector(state=>state.cart)
    const [loading, setLoading] = useState(false)
    console.log(cart)
    const handleBuyCourse = async()=>{
      setLoading(true)
      const result= await enrollInCourses(cart,token)
      if(result){
        dispatch(setCourse(result))
            toast.success("Enrolled successfully!")
            dispatch(resetCart());
            navigate('/dashboard/enrolled-courses')

      }
      setLoading(false)
    }
  return (
    <div className="mt-8 bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold text-gray-300">Total:</p>
        <p className="text-2xl font-bold text-white">Rs {total}</p>
      </div>
      <button
      disabled={loading}
        onClick={handleBuyCourse}
        className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        { !loading ? 'Buy Now': 'Processing'}
      </button>
    </div>
  )
}

export default RenderTotaaAmmount
