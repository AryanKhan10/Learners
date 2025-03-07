import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table, Tbody, Td, Th, Thead, Tr} from 'react-super-responsive-table'
import { fetchInstructorCourse } from '../../../services/course';
function CourseTable({courses, setCourse}) {

    const dispatch = useDispatch();
    const {token} = useSelector( state=> state.auth);
    const [loading, setloading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null)


    // console.log("Course ",courses)
    const handleCourseDelete = async(courseId)=>{
        setloading(true)
        await deleteCourse(token, courseId)
        const result = await fetchInstructorCourse(token);
        if(result){
            dispatch(setCourse(result))
        }
        setloading(false)
    }
  return (
    <div>
      <div>
       <Table>
        <Thead>
            <Tr>
                <Th>
                    Courses
                </Th>
                <Th>
                    Duration
                </Th>
                <Th>
                    Price
                </Th>
                <Th>
                    Action
                </Th>
            </Tr>
        </Thead>
        <Tbody>
            {
                courses?.length === 0 ? (
                    <Tr>
                        <Td>
                            No Courses Found
                        </Td>
                    </Tr>
                ): (
                    courses?.map((course)=>

                        <Tr key={course._id} className='flex gap-x-10 p-8 border-2 border-gray-500'>
                            <Td className='flex gap-x-4'>
                                <img src={course?.thumbnail} loading='lazy'
                                    className='h-[150px] w-[220px] rounded-lg object-cover' 
                                />
                                <div className="">
                                    <p>{course.courseTitle}</p>
                                    <p>{course.courseDescription}</p>
                                    <p>Created: </p>
                                    {
                                        course.status === "draft" ? (
                                            <p>DRAFTED</p>
                                        ):
                                        ( <p>PUBLISHED</p> )
                                    }
                                </div>
                            </Td>

                            <Td>
                                2h 30min
                            </Td>
                            <Td>
                                ${course.price}
                            </Td>
                            <Td>
                                <button
                                    disabled={loading}
                                    // onClick={()=>{navigate}}
                                    >
                                    Edit
                                </button>
                                <button
                                    disabled={loading}
                                    onClick={()=>{
                                        setConfirmationModal({
                                            text1:"Do you want to delete this course?",
                                            text2:"All the data related to the course will be deleted",
                                            btn1:"Delete",
                                            btn2:"Cancel",
                                            btn1Handler:!loading ? ()=>handleCourseDelete(course._id): ()=>{},
                                            btn2Handler: !loading ? ()=>setConfirmationModal(null):()=>{}
                                        })
                                    }}
                                    >
                                    Delete
                                </button>
                            </Td>
                        </Tr>
 
                    )
                )
            }
        </Tbody>
       </Table>
       {
        confirmationModal && <confirmationModal modalData = {confirmationModal}/>
       }
      </div>
    </div>
  )
}

export default CourseTable
