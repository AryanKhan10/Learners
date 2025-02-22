import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import { Delete, Star } from 'lucide-react'
import { RemoveFromCart } from '../../../slices/cart'
function RenderCartCourses() {
    const {cart} = useSelector(state=>state.cart)
    const dispatch = useDispatch();
  return (
    <div className="space-y-4">
      {
        cart.map((course, index)=>
        <div  key={index} className="flex justify-between items-center border-b border-gray-600 pb-4">
            <div  className="flex space-x-4">
                <img src={course?.thumbnail}  className="w-24 h-24 object-cover rounded" alt="" />
                <div className="">
                <p className="font-semibold text-white">{course?.name}</p>
              <p className="text-sm text-gray-300">{course?.category?.name}</p>
              <div className="flex items-center mt-1">
                    {/* get average rating  from backend*/}
                <span className="text-sm font-medium mr-1 text-gray-300">4.8</span>
                        <Rating
                        count={5}
                        size={20}
                        edit={false}
                        activeColors="#ffd700"
                        fullIcon={<Star/>}
                        emptyIcon={ <Star/> }
                        />

                    <span className="text-xs text-gray-400 ml-1">
                        ({course?.ratingAndReviews?.length} Ratings)
                    </span>
                    </div>
                </div>
            </div>
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
        </div> )
      }
    </div>
  )
}

export default RenderCartCourses
