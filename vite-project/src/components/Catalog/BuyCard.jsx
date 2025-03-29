import React,{useEffect, useState} from 'react'
import {CheckIcon, ShareIcon } from "lucide-react"
import apiConnector from '../../services/apiConnector'
import { coursesEndpoints } from '../../services/apis'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { setEnrolled } from '../../slices/enrolled'
import { AddToCart } from '../../slices/cart'
import { enrollInCourses } from '../../services/course'
import {setCourse} from '../../slices/course'
function BuyCard({Course}) {

    // console.log(Course?._id)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const location =useLocation()
    const {token} = useSelector(state=>state.auth)
    const {enrolledCourses} = useSelector(state => state.enrolled)
    const {user} = useSelector(state=>state.profile) //you can check this user id in course's enrolled student array if the id includes then change the text of button accordingly 

    const {course} = useSelector(state=>state.course)
    const [enroll, setEnroll] = useState(false)
    // const [enrolledCourse, setEnrolledCourse] = useState(null)

    const buyCourse = async(courseId)=>{
       if(!token){
        navigate('/login')
        return
       }
      const result= await enrollInCourses([courseId],token)
      if(result){
        dispatch(setCourse(result))
        setEnroll(true)
            toast.success("Enrolled in course")
        
        navigate('/dashboard/enrolled-course')

      }
    }

    const hanldeAddToCart = () =>{
      if(user && user.role === "instructor"){
        toast.error("Instructor can't enroll in course")
        return
      }
      if(!token){
        navigate('/login')
        return
      }
      dispatch(AddToCart(Course))
    }
    const handleShare = () =>{
      navigator.clipboard.writeText(window.location.href)
      // copy(window.location.href)
      toast.success("Link copied to clipboard");
    }

    useEffect(()=>{
        const getEnrolledCourses = async()=>{
            try {
                const res = await apiConnector("GET", coursesEndpoints.GET_ENROLLED_COURSE_API, null, {authentication: `Bearer ${token}`});
                // console.log(res.data.data)
                if(res.data.success){
                    dispatch(setEnrolled(res.data.data))

                    // console.log(enrolledCourses)
  
                    enrolledCourses.map((course)=>{
                        console.log(course._id, Course._id)
                        course?._id===Course._id ? setEnroll(true) : null })
                }
                // if(enrolledCourse.)
            } catch (error) {
                console.log("Error while fetching enrolled course", error)
            }
        }
        getEnrolledCourses()
    },[course])

    // console.log(Course)
  return (
    <div className="lg:col-span-1">
            <div className="bg-[#1a1f2c] rounded-lg overflow-hidden shadow-lg">
              {/* Course image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={Course?.thumbnail}
                  alt="Course thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Price and CTA */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">$ {Course?.price}</h3>
                </div>

                <button
                    onClick={!enroll? ()=>buyCourse(Course._id):()=>navigate("/dashboard/enrolled-courses")}
                    className="w-full bg-yellow-400 hover:bg-yellow-500
                     text-black font-bold py-3 px-4 rounded mb-3 transition duration-200">
                  {
                    !enroll ? <p>Buy Now</p>: <p>Go To Course</p>
                  }
                </button>
                  {
                    !enroll && <button
                                onClick={hanldeAddToCart}
                                className='w-full border-[1px] border-gray-600 hover:bg-gray-700
                                font-bold py-3 px-4 rounded mb-3 transition duration-200'>Add to cart</button>
                  }

                <p className="text-center text-sm text-gray-400 mb-6">30-Day Money-Back Guarantee</p>

                <div className="mb-4">
                  <h4 className="font-bold mb-2">This Course Includes :</h4>
                  <div className="flex items-start mb-2">
                    <CheckIcon className="w-4 h-4 text-teal-400 mt-1 mr-2 flex-shrink-0" />
                    {
                      Course?.instructions?.map((item, index)=>(
                        <span key={index} className="text-teal-400">{item}</span>

                      ))
                    }
                  </div>
                </div>

                <button onClick={handleShare}
                className="w-full flex items-center justify-center border border-gray-600 hover:bg-gray-700 py-2 px-4 rounded transition duration-200">
                  <ShareIcon className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
  )
}

export default BuyCard
