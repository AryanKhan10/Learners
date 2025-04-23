import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourse } from '../../services/course'
import { Plus } from 'lucide-react'
import CourseTable from './instructorCourses/CourseTable'
import ConfirmationModal from '../ConfirmationModal'

function MyCourses() {
    const { token } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])
    const [confirmationModal, setConfirmationModal] = useState(null)


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
                <div className="flex flex-col-reverse items-start gap-6 sm:gap-0 sm:flex-row justify-between sm:items-center mb-8">
                    <h1 className="sm:text-3xl text-2xl font-bold text-white">My Courses</h1>
                    <button 
                        onClick={() => navigate('/add-course')}
                        className="flex items-center gap-1 sm:gap-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 sm:px-4 sm:py-2 rounded-lg transition-colors duration-200 shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        <span className='text-sm sm:text-base'>Add course</span>
                    </button>
                </div>

                <div className=" rounded-xl shadow-xl p-6">
                    {courses && <CourseTable courses={courses} setCourses={setCourses} setConfirmationModal={setConfirmationModal} />}
                </div>
            </div>
            {confirmationModal && <ConfirmationModal data={confirmationModal} />}
        </div>
    )
}

export default MyCourses