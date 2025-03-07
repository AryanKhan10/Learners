import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourse } from '../../services/course';
import { Plus } from 'lucide-react'
import CourseTable from './instructorCourses/CourseTable';
function MyCourses() {

    const {token} = useSelector( state=>state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([])

    useEffect(()=>{

        const fetchCourse = async ()=>{
            const result = await fetchInstructorCourse(token);
            if(result){
                setCourses(result)
            }
        }
        fetchCourse()
        console.log(courses)
    },[])
  return (

    <div>
      <div>
        <h1>My Courses</h1>
        <button>
            Add course
            <Plus/>
        </button>

        {courses && <CourseTable courses= {courses} setCourses= {setCourses}/>}

      </div>
    </div>
  
    )
}

export default MyCourses
