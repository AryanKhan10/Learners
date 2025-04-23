import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { fetchInstructorCourse } from '../../../services/course'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteCourse } from '../../../services/course'
function CourseTable({ courses, setCourses, setConfirmationModal }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { token } = useSelector(state => state.auth)
    const [loading, setloading] = useState(false)

    const handleCourseDelete = async (courseId) => {
        setloading(true)
        await deleteCourse(courseId, token)
        const result = await fetchInstructorCourse(token)
        if (result) {
            setCourses(result)
        }
        setloading(false)
        setConfirmationModal(null)
    }

    return (
        <div className="min-h-screen bg-gray-900 lg:p-6">
        <div className="w-full overflow-hidden bg-gray-800 rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-white/80 hidden lg:table-cell">
                    Courses
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-white/80 hidden lg:table-cell">
                    Duration
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-white/80 hidden lg:table-cell">
                    Price
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-white/80 hidden lg:table-cell">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {courses?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-white/60">
                      No Courses Found
                    </td>
                  </tr>
                ) : (
                  courses?.map((course) => (
                    <tr key={course._id} className="block lg:table-row border-b border-gray-700 hover:bg-white/5">
                      {/* Mobile view - card style */}
                      <td className="block lg:table-cell lg:py-6 px-4">
                        <div className="flex flex-col lg:flex-row gap-4 py-4 lg:py-0">
                          <img
                            src={course.thumbnail}
                            loading="lazy"
                            className="w-full lg:w-[150px] h-[300px] lg:h-[100px] rounded-lg object-cover"
                            alt={course.courseTitle}
                          />
                          <div className="flex flex-col gap-2 flex-grow">
                            <h3 className="text-lg font-semibold text-white">
                              {course.courseTitle}
                            </h3>
                            <p className="text-sm text-white/60 line-clamp-2">
                              {course.courseDescription}
                            </p>
                            
                            {/* Mobile-only price and duration */}
                            <div className="flex flex-wrap gap-4 mt-2 md:hidden">
                              <div className="text-white/80">
                                <span className="text-white/40 text-sm">Duration: </span>
                                2h 30min
                              </div>
                              <div className="text-white/80">
                                <span className="text-white/40 text-sm">Price: </span>
                                ${course.price}
                              </div>
                            </div>
  
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-white/40">Status: </span>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                course.status === "draft"
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : "bg-green-500/20 text-green-500"
                              }`}>
                                {course.status.toUpperCase()}
                              </span>
                            </div>
  
                            {/* Mobile-only actions */}
                            <div className="flex gap-2 mt-4 md:hidden">
                              <button
                                onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                disabled={loading}
                                className="flex items-center gap-2 px-3 py-2 text-white/60 hover:text-blue-500 rounded-lg transition-colors"
                              >
                                <Pencil className="w-5 h-5" />
                                <span>Edit</span>
                              </button>
                              <button
                                disabled={loading}
                                onClick={() => {
                                  setConfirmationModal({
                                    text1: "Do you want to delete this course?",
                                    text2: "All the data related to the course will be deleted",
                                    btn1Text: "Delete",
                                    btn2Text: "Cancel",
                                    btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                                    btn2Handler: !loading ? () => setConfirmationModal(null) : () => {}
                                  });
                                }}
                                className="flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      {/* Desktop-only columns */}
                      <td className="hidden md:table-cell py-6 px-4 text-white/80">
                        2h 30min
                      </td>
                      <td className="hidden md:table-cell py-6 px-4 text-white/80">
                        ${course.price}
                      </td>
                      <td className="hidden md:table-cell py-6 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                            disabled={loading}
                            className="p-2 text-white/60 hover:text-blue-500 rounded-lg transition-colors"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button
                            disabled={loading}
                            onClick={() => {
                              setConfirmationModal({
                                text1: "Do you want to delete this course?",
                                text2: "All the data related to the course will be deleted",
                                btn1Text: "Delete",
                                btn2Text: "Cancel",
                                btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                                btn2Handler: !loading ? () => setConfirmationModal(null) : () => {}
                              });
                            }}
                            className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
}
export default CourseTable;