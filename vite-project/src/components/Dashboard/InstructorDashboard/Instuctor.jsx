import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorCourse } from '../../../services/course'
import { getInstructorData } from '../../../services/profile';
import InstructorChart from './InstructorChart'
import { Link } from 'react-router-dom';
// import { profile } from '../../../services/profile';
function Instuctor() {
    const {user}  = useSelector(state => state.profile)
    const {token} = useSelector(state => state.auth);
    const [loading,setLoading] = useState(false);
    const [instructorData, setInstuctorData] = useState(null)
    const [courses, setCourses] = useState([])
console.log(user)
    useEffect(()=>{
        const fetchStats = async ()=>{
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            const instructorCourses = await fetchInstructorCourse(token)

            if(instructorApiData.length){
                setInstuctorData(instructorApiData)
            }
            if(instructorCourses){
                setCourses(instructorCourses)
            }
            setLoading(false)
        }
        fetchStats()
    },[])

    const totalAmount = instructorData?.reduce((acc, cur)=> acc+cur.totalAmount, 0)
    const totalStudentEnrolled = instructorData?.reduce((acc, cur)=> acc+cur.totalStudentsEnrolled, 0)
  return (
    <div>
      <div className="">
        Hi, {user.firstName}
      </div>

      {
        loading ? ( <div>loading...</div> ):
        ( courses.length > 0 ? ( 
        <div>
            <div>
                <InstructorChart courses= {instructorData}/>

                <div>
                    <div>Statistics</div>
                    <div>
                        <p>Total Courses</p>
                        <p>{courses.length}</p>
                    </div>
                    <div>
                        <p>Total Students</p>
                        <p>{totalStudentEnrolled}</p>
                    </div>
                    <div>
                        <p>Total Income</p>
                        <p>{totalAmount}</p>
                    </div>

                </div>
            </div>
            <div>
                <div>
                    <p>Your Courses</p>
                    <Link to={'/dashboard/my-courses'}>
                        view all
                    </Link>
                </div>

                <div>
                    {
                        courses.slice(0,3).map((course, index)=>(
                            <div key={index} className="">
                                <img src={course.thumbnail} alt="course image" />

                                <div>
                                    <p>{course.courseTitle}</p>

                                    <div>
                                    <p>{course.studentsEnrolled.length} students</p>
                                    <p>Rs {course.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

         )
        :( <div>
            <p>You haven't created any courses yet</p>
            <Link to={'/dashboard/add-course'}>Create Course</Link>
        </div> ))
      }
    </div>
  )
}

export default Instuctor
