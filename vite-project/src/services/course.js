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
        // toast.success("Instructor courses fetched!")
         return res.data.data
    } catch (error) {
        console.log("Error while fetching Instructor Courses",error)
        toast.error("Couldn't fetch instructor Course")
    }
}
export async function deleteCourse (courseId,token) {
    const toastId = toast.loading("Deleting Course...")
    try {
        const response = await apiConnector("DELETE", coursesEndpoints.DELETE_COURSE_API, { courseId },
            { Authentication: `Bearer ${token}` })
            console.log(response)
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Course Deleted!")
        toast.remove(toastId)
        return true;
    } catch (error) {
        console.log("Error while deleting Instructor's Course")
        toast.error("Couldn't delete Course")
    }
}
export async function enrollInCourses (data,token) {
    const toastId = toast.loading("loading...")
    let result;
    try {
        const res = await apiConnector("POST", coursesEndpoints.BUY_COURSE_API,data,
            {authentication : `Bearer ${token}`}
          )
        //   console.log(res.data.success)

        if(!res.data.success){
            throw new Error(res.data.message);
        }
        result= res.data.data;
        // setEnrolledCourse(res.data.data)
        // console.log('hi')
    } catch (error) {
        console.log("Error while enrolling in course",error)
        toast.error("Couldn't enroll in course")
        // toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return result;
}
export async function getFullDetailOfCourse (courseId,token) {
    // const toastId = toast.loading("Deleting Course...")
    try {
        const response = await apiConnector("POST", coursesEndpoints.GET_FULL_COURSE_API, { courseId },
            { Authentication: `Bearer ${token}` })
            console.log(response)
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        // toast.success("Course Deleted!")
        return response.data.data;
    } catch (error) {
        console.log("Error while fetching full Course details",error)
        toast.error("Couldn't fetching full Course details")
    }
}
