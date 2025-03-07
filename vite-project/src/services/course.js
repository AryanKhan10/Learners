import toast from "react-hot-toast";
import apiConnector from "./apiConnector";
import { coursesEndpoints } from "./apis";

export async function fetchInstructorCourse (token) {
    try {
        const res = await apiConnector("GET", coursesEndpoints.GET_INSTRUCTORE_COURSE_API,null, 
            { Authentication: `Bearer ${token}`})
        
            console.log(res.data.data)
        if(!res.data.success){
            throw new Error(res.data.message)
        }
        toast.success("Instructor courses fetched!")
         return res.data.data
    } catch (error) {
        console.log("Error while fetching Instructor Courses",error)
        toast.error("Couldn't fetch instructor Course")
    }
}
export async function deleteCourse (courseId,token) {
    try {
        
    } catch (error) {
        console.log("Error while deleting Instructor's Course")
        toast.error("Couldn't delete Course")
    }
}
