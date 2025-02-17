import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import { Delete, Star } from 'lucide-react'
import { RemoveFromCart } from '../../../slices/cart'
function RenderCartCourses() {
    const {cart} = useSelector(state=>state.cart)
    const dispatch = useDispatch();
  return (
    <div>
      {
        cart.map((course, index)=>
        <div>
            <div className="">
                <img src={course?.thumbnail} alt="" />
                <div className="">
                    <p>{course?.name}</p>
                    <p>{course?.category?.name}</p>
                    <div className="">
                    {/* get average rating  from backend*/}
                        <span>4.8</span>
                        <Rating
                        count={5}
                        size={20}
                        edit={false}
                        activeColors="#ffd700"
                        fullIcon={<Star/>}
                        emptyIcon={ <Star/> }
                        />

                        <span>{course?.ratingAndReviews?.length} Ratings</span>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={() => dispatch(RemoveFromCart(course._ic))}>
                    <Delete/>
                    <span>Remove</span>   
                </button>
                <p>Rs {course?.prize}</p>
            </div>
        </div> )
      }
    </div>
  )
}

export default RenderCartCourses
