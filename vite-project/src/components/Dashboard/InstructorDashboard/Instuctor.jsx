"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { fetchInstructorCourse } from "../../../services/course"
import { getInstructorData } from "../../../services/profile"
import InstructorChart from "./InstructorChart"
import { Link } from "react-router-dom"
// import { profile } from '../../../services/profile';
function Instuctor() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstuctorData] = useState(null)
  const [courses, setCourses] = useState([])
  console.log(user)
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const instructorCourses = await fetchInstructorCourse(token)

      if (instructorApiData.length) {
        setInstuctorData(instructorApiData)
      }
      if (instructorCourses) {
        setCourses(instructorCourses)
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

  const totalAmount = instructorData?.reduce((acc, cur) => acc + cur.totalAmount, 0)
  const totalStudentEnrolled = instructorData?.reduce((acc, cur) => acc + cur.totalStudentsEnrolled, 0)
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Hi, {user.firstName}</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-lg font-medium text-blue-300">loading...</div>
          </div>
        ) : courses.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-800 rounded-lg shadow-lg p-4 border border-slate-700">
                <InstructorChart courses={instructorData} />
              </div>

              <div className="bg-slate-800 rounded-lg shadow-lg p-4 border border-slate-700">
                <div className="text-xl font-semibold mb-4 text-white">Statistics</div>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-900/50 rounded-md border border-blue-700">
                    <p className="text-sm text-blue-300">Total Courses</p>
                    <p className="text-xl font-bold text-white">{courses.length}</p>
                  </div>
                  <div className="p-3 bg-indigo-900/50 rounded-md border border-indigo-700">
                    <p className="text-sm text-indigo-300">Total Students</p>
                    <p className="text-xl font-bold text-white">{totalStudentEnrolled}</p>
                  </div>
                  <div className="p-3 bg-purple-900/50 rounded-md border border-purple-700">
                    <p className="text-sm text-purple-300">Total Income</p>
                    <p className="text-xl font-bold text-white">Rs {totalAmount}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 rounded-lg shadow-lg p-4 border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-semibold text-white">Your Courses</p>
                <Link
                  to={"/dashboard/my-courses"}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  view all
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.slice(0, 3).map((course, index) => (
                  <div
                    key={index}
                    className="bg-slate-700 border border-slate-600 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt="course image"
                      className="w-full h-40 object-cover"
                    />

                    <div className="p-3">
                      <p className="font-medium text-white mb-2 line-clamp-2">{course.courseTitle}</p>

                      <div className="flex justify-between text-sm">
                        <p className="text-slate-300">{course.studentsEnrolled.length} students</p>
                        <p className="font-semibold text-blue-300">Rs {course.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-slate-800 rounded-lg shadow-lg p-8 border border-slate-700">
            <p className="text-lg text-slate-300 mb-4">You haven't created any courses yet</p>
            <Link
              to={"/dashboard/add-course"}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Course
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Instuctor
