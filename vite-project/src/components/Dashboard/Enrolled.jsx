import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { getEnrolledCourses } from '../../services/profile';
import { useNavigate } from 'react-router-dom';
import { formatDuration } from '../../utils/formatDuration';
function Enrolled() {
    const {token} = useSelector(state=>state.auth);
    const navigate  = useNavigate()
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const [courseDuration, setCourseDuration] = useState([]);
    const [loading, setLoading] = useState(true)

    console.log(enrolledCourses)

    const getCourses = async()=>{
      const resp = await getEnrolledCourses(token);
      console.log(resp)
      setEnrolledCourses(resp)
      }

    useEffect(()=>{
        getCourses()
        setLoading(false)
    },[])
    console.log(courseDuration)
    useEffect(() => {
      const calculateDurations = () => {
        if (enrolledCourses) {
          const durations = enrolledCourses.map((course) => {
            let duration = 0;
            course?.courseContent?.forEach((sec) => {
              sec?.subSection?.forEach((sub) => {
                duration += sub.timeDuration;
              });
            });
            const dur = formatDuration(duration);
            return { id: course._id, duration: dur };
          });
          console.log(durations)
          // durations.map((course) => {})
          setCourseDuration(durations);
        }
      };
    
      calculateDurations();
    }, [enrolledCourses]);
  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <div className="max-w-[43rem] mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Enrolled Courses</h1>

        {loading ? (
          <div className="flex items-center justify-center h-64 bg-gray-800 bg-opacity-50 rounded-lg">
            <div className="text-gray-400">Loading...</div>
          </div>
        ) : !enrolledCourses?.length ? (
          <div className="text-center p-8 bg-gray-800 bg-opacity-50 rounded-lg">
            <div className="text-gray-400">You have not enrolled in any course yet</div>
          </div>
        ) : (
          <div className="bg-gray-800 bg-opacity-70 space-y-6 rounded-lg shadow-lg border border-blue-400/20">
            {/* Header row - only visible on sm and above */}
            <div className="hidden sm:grid sm:grid-cols-12 px-6 py-3 bg-gray-800 border-b border-blue-400/20 rounded-t-lg text-sm font-medium">
              <div className="col-span-6">Course Name</div>
              <div className="col-span-3 text-center">Duration</div>
              <div className="col-span-3 text-center">Progress</div>
            </div>

            <div className="space-y-4 sm:space-y-0.5 p-2 sm:p-4">
              {enrolledCourses.map((course, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg shadow-md border border-blue-400/10 hover:border-blue-400/30 transition-all duration-200 hover:shadow-blue-400/5 cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/view-course/${course._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection[0]?._id}`,
                    )
                  }
                >
                  {/* Mobile Card View (below sm) */}
                  <div className="block sm:hidden p-4 space-y-4">
                    <div className="flex flex-col space-y-3">
                      <img
                        src={course.thumbnail}
                        alt={`${course.courseTitle} thumbnail`}
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">{course.courseTitle}</h3>
                        <p className="text-sm text-gray-400">{course.courseDescription}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1 text-blue-300">
                        <Clock size={16} />
                        <span className="text-sm">
                          {courseDuration.find(c => c.id === course._id)?.duration || '0m'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-green-300">
                        <BookOpen size={16} />
                        <span className="text-sm">
                          {course.progressPercentage ? `${course.progressPercentage}%` : '0%'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${course.progressPercentage || 0}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Progress</span>
                        <span>{course.progressPercentage ? `${course.progressPercentage}%` : '0%'}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button className="flex items-center text-sm text-blue-400 hover:text-blue-300">
                        Continue Learning <ArrowRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Desktop/Tablet Grid View (sm and above) */}
                  <div className="hidden sm:grid sm:grid-cols-12 gap-4 p-4 items-center">
                    <div className="col-span-6 flex flex-row space-x-4">
                      <img
                        src={course.thumbnail}
                        alt={`${course.courseTitle} thumbnail`}
                        className="w-24 h-16 object-cover rounded-md"
                      />
                      <div className="space-y-1">
                        <h3 className="font-medium">{course.courseTitle}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{course.courseDescription}</p>
                      </div>
                    </div>

                    <div className="col-span-3 text-center">
                      <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gray-700">
                        {courseDuration.find(c => c.id === course._id)?.duration || '0m'}
                      </div>
                    </div>

                    <div className="col-span-3 space-y-2">
                      <div className="flex justify-between items-center text-sm px-1">
                        <span>Progress</span>
                        <span>{course.progressPercentage ? `${course.progressPercentage}%` : '0%'}</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${course.progressPercentage || 0}%` }}
                        ></div>
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
