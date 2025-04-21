import { useDispatch, useSelector } from "react-redux"
import { Delete, Star } from "lucide-react"
import { RemoveFromCart } from "../../../slices/cart"

import SingleCard from "./SingleCard"

function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  
  // console.log( Math.floor(review[course._id]))
  return (
    <div className="space-y-4">
      {cart.map((course, index) => (
        <div key={index} className="flex flex-col sm:flex-row justify-between  border-b border-gray-600 pb-4">
          <SingleCard course={course} />
          <div className="flex flex-col items-end">
            <button
              onClick={() => dispatch(RemoveFromCart(course._id))}
              className="text-red-400 flex items-center mb-2 hover:text-red-300"
            >
              <Delete className="w-4 h-4 mr-1" />
              <span className="text-sm">Remove</span>
            </button>
            <p className="font-bold text-white">Rs {course?.price}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RenderCartCourses

