import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { getEnrolledCourses } from '../../services/profile';
import { useNavigate } from 'react-router-dom';
function Enrolled() {
    const {token} = useSelector(state=>state.auth);
    const navigate  = useNavigate()
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    console.log(enrolledCourses)
    const getCourses = async()=>{
        const resp = await getEnrolledCourses(token);
        console.log(resp)
        setEnrolledCourses(resp)

    }
    useEffect(()=>{
        getCourses()

    },[])
  return (
    <div className="min-h-screen  text-white py-8">
      <div className="sm:w-[29rem] md:w-[30rem] lg:w-[43rem] mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Enrolled Courses</h1>

        {!enrolledCourses ? (
        //   <div className="flex items-center justify-center h-64 bg-[#2a2a2a] rounded-lg">
            <div className="text-gray-400">Loading...</div>
        //   </div>
        ) : !enrolledCourses.length ? (
          <div className="text-center">
            <div className="text-gray-400">You have not enrolled in any course yet</div>
          </div>
        ) : (
          <div className="bg-[#2a2a2a8d] space-y-6">
            <div className="grid grid-cols-12 px-6 py-3 bg-[#2a2a2a] rounded-lg text-sm font-medium">
              <div className="col-span-6">Course Name</div>
              <div className="col-span-3 text-center">Duration</div>
              <div className="col-span-3 text-center">Progress</div>
            </div>

            <div className="space-y-4">
              {enrolledCourses.map((course, index) => (
                <div
                  key={index}
                  className="bg-[#2a2a2a] rounded-lg shadow-lg"
                >
                  <div className="grid grid-cols-12 gap-4 p-4 items-center" 
                    onClick={()=> navigate( `/view-course/${course._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection[0]?._id}` )}>
                    <div className="col-span-4 sm:col-span-6 flex flex-col sm:flex-row space-y-3 space-x-4">
                      <img
                        src={course.thumbnail}
                        alt={`${course.courseTitle} thumbnail`}
                        className="w-24 h-16 object-cover rounded-md"
                      />
                      <div className="space-y-1">
                        <h3 className="font-medium">
                          {course.courseTitle}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {course.courseDescription}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-3 text-center">
                      <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#333333]">
                        {/* {course.timeDuration} */} no
                      </div>
                    </div>

                    <div className="col-span-3 space-y-2">
                      <div className=" flex space-x-1 justify-between items-center text-sm px-1">
                        <span>Progress</span>
                        <span>{course.progressPercentage ? course.progressPercentage +'%' : '0%'}</span>
                      </div>
                      <div className="h-2 bg-[#333333] rounded-full overflow-hidden">
                      <ProgressBar 
                                            completed={course.progressPercentage || 0}
                                            height='8px'
                                            isLabelVisible={false}/>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  
  )
}

export default Enrolled
