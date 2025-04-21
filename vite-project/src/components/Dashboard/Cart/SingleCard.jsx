import React from 'react'
import Rating from "react-rating-stars-component" 
import { useState,useEffect } from "react"
import apiConnector from "../../../services/apiConnector"
import { ratingAndReviewEndpoints } from "../../../services/apis"
import { useSelector } from "react-redux"
import ReactStars from "react-rating-stars-component" 
function SingleCard({course}) {
  const { token } = useSelector((state) => state.auth)
  const [review, setReview] = useState([])
    useEffect(()=>{
        const fetchRating = async()=>{
            const {data} = await apiConnector('POST', ratingAndReviewEndpoints.GET_AVG_RATING_API, {courseIds:course._id},
              {Authentication: `Bearer ${token}`}
            );
            console.log(data)
            if(data){
              const ratingsMap = {}
              data.averageRatings.forEach((item) => {
                ratingsMap[item._id] = item.averageRating
              })
              console.log(ratingsMap)
              setReview(ratingsMap)
            }
        }
        fetchRating()
      },[])

  return (
    <div className="flex space-x-2 ">
    <img src={course?.thumbnail || "/placeholder.svg"} className="w-24 h-24 object-cover rounded" alt="" />
    <div className="flex flex-col">
      {" "}
      {/* Added flex-col to ensure proper vertical stacking */}
      <p className="font-semibold text-white">{course?.courseTitle}</p>
      <p className="text-sm text-gray-300">{course?.category?.name}</p>
      <div className="flex items-center mt-1">
        {/* get average rating from backend*/}
        <span className="text-sm font-medium mr-1 text-gray-300">{Math.floor(review[course._id]) || 0 }</span>
        <div className="">
          {" "}
          {/* Added wrapper div with flex */}
          <ReactStars
                  count={5}
                  value={Math.floor(review[course._id])||0}
                  size={20}
                  activeColor="#ffd700"
                  edit={false}
              />                                         
        </div>
        <span className="text-xs text-gray-400 ml-1">({course?.ratingAndReview?.length} Ratings)</span>
      </div>
    </div>
  </div>
  )
}

export default SingleCard
