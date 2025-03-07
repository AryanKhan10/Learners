import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourse } from '../../services/course'
import { Plus } from 'lucide-react'
import CourseTable from './instructorCourses/CourseTable'

function MyCourses() {
    const { token } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchCourse = async () => {
            const result = await fetchInstructorCourse(token)
            if (result) {
                setCourses(result)
            }
        }
        fetchCourse()
    }, [])

    return (
        <div className="p-6 md:p-8 lg:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">My Courses</h1>
                    <button 
                        onClick={() => navigate('/add-course')}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add course</span>
                    </button>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6">
                    {courses && <CourseTable courses={courses} setCourses={setCourses} />}
                </div>
            </div>
        </div>
    )
}

export default MyCourses