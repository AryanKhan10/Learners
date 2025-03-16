import React,{useState} from 'react'
import {CheckIcon, ShareIcon, Table } from "lucide-react"
import apiConnector from '../../services/apiConnector'
import { coursesEndpoints } from '../../services/apis'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { setCourse } from '../../slices/course'

function BuyCard({Course}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {token} = useSelector(state=>state.auth)
    const {course} = useSelector(state=>state.course)
    const [enroll, setEnroll] = useState(false)
    const [enrolledCourse, setEnrolledCourse] = useState(null)

    const buyCourse = async(courseId)=>{
        const toastId = toast.loading("loading...")
        try {
            const res = await apiConnector("POST", coursesEndpoints.BUY_COURSE_API,{courseId},
                {authentication : `Bearer ${token}`}
              )
            //   console.log(res.data.success)
    
            if(res.data.success){
                setEnrolledCourse(res.data.data)
                dispatch(setCourse(res.data.data))
                setEnroll(true)                
                toast.success(`Enrolled in ${Course.courseTitle}`)
                // console.log('hi')
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
        toast.dismiss(toastId)
    }
    console.log(enrolledCourse)
    console.log(course)
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
                    onClick={!enroll? ()=>buyCourse(Course._id):()=>navigate("/enrolledCourses")}
                    className="w-full bg-yellow-400 hover:bg-yellow-500
                     text-black font-bold py-3 px-4 rounded mb-3 transition duration-200">
                  {
                    !enroll? <p>Buy Now</p>: <p>Go To Course</p>
                  }
                </button>

                <p className="text-center text-sm text-gray-400 mb-6">30-Day Money-Back Guarantee</p>

                <div className="mb-4">
                  <h4 className="font-bold mb-2">This Course Includes :</h4>
                  <div className="flex items-start mb-2">
                    <CheckIcon className="w-4 h-4 text-teal-400 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-teal-400">Numquam officia nih</span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center border border-gray-600 hover:bg-gray-700 py-2 px-4 rounded transition duration-200">
                  <ShareIcon className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
  )
}

export default BuyCard
