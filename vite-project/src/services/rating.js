import toast from "react-hot-toast"
import apiConnector from "./apiConnector"
import { ratingAndReviewEndpoints } from "./apis"

export const createRating = async({courseId,rating,review},token) =>{
    try {
        console.log(token)
        const response = await apiConnector('POST', ratingAndReviewEndpoints.CREATE_RATING_API,
            {rating,review,courseId}, { Authentication: `Bearer ${token}` })
        console.log(response.data)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Rating Created!")
        return response.data.data
        
    } catch (error) {
        console.log("Error while creating rating",error)
        toast.error("Couldn't create rating")
        return false
    }
}
