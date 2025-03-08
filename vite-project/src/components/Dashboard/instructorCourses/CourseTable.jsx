import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { fetchInstructorCourse } from '../../../services/course'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteCourse } from '../../../services/course'
function CourseTable({ courses, setCourses, setConfirmationModal }) {
    const dispatch = useDispatch()
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
        <div className="overflow-x-auto">
            <Table className="w-full">
                <Thead>
                    <Tr className="border-b border-white/10">
                        <Th className="py-4 px-4 text-left text-sm font-semibold text-white/80">
                            Courses
                        </Th>
                        <Th className="py-4 px-4 text-left text-sm font-semibold text-white/80">
                            Duration
                        </Th>
                        <Th className="py-4 px-4 text-left text-sm font-semibold text-white/80">
                            Price
                        </Th>
                        <Th className="py-4 px-4 text-left text-sm font-semibold text-white/80">
                            Action
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {courses?.length === 0 ? (
                        <Tr>
                            <Td colSpan="4" className="py-8 text-center text-white/60">
                                No Courses Found
                            </Td>
                        </Tr>
                    ) : (
                        courses?.map((course) => (
                            <Tr
                                key={course._id}
                                className="border-b border-white/10 hover:bg-white/5 transition-colors"
                            >
                                <Td className="py-6 px-4">
                                    <div className="flex gap-4">
                                        <img
                                            src={course?.thumbnail}
                                            loading="lazy"
                                            className="h-[100px] w-[150px] rounded-lg object-cover"
                                            alt={course.courseTitle}
                                        />
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-lg font-semibold text-white">
                                                {course.courseTitle}
                                            </h3>
                                            <p className="text-sm text-white/60 line-clamp-2">
                                                {course.courseDescription}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-white/40">
                                                    Created: 
                                                </span>
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    course.status === "draft"
                                                        ? "bg-yellow-500/20 text-yellow-500"
                                                        : "bg-green-500/20 text-green-500"
                                                }`}>
                                                    {course.status.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Td>
                                <Td className="py-6 px-4 text-white/80">
                                    2h 30min
                                </Td>
                                <Td className="py-6 px-4 text-white/80">
                                    ${course.price}
                                </Td>
                                <Td className="py-6 px-4">
                                    <div className="flex gap-2">
                                        <button
                                            disabled={loading}
                                            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
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
                                                })
                                            }}
                                            className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
        </div>
    )
}
export default CourseTable;