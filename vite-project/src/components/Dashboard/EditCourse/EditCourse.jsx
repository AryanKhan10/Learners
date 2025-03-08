import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { setCourse, setEditCourse } from '../../../slices/course';
import { getFullDetailOfCourse } from '../../../services/course';
function EditCourse() {

    const dispatch = useDispatch();
    const {courseId}= useParams();
    const {course} =useSelector(state=> state.course);
    const [loading, setLoading] = useState();
    const {token} = useSelector(state=>state.auth);

    //add course to the slice coz when you render the rendersteps comp, the the useEffect will populate the fields
    useEffect(()=>{

        const populateCourse = async ()=>{
            setLoading(true);
            const result = await getFullDetailOfCourse(courseId,token)
            if(result){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.course))
            }
            setLoading(false);
        }
        populateCourse();

    },[])
  return (
    <div className="min-h-screen my-8 mx-2 xsm:mx-8 sm:mx-8 text-gray-100">
      <h1>Edit Course</h1>
      
      <div>
        {
            course ? ( <RenderSteps/> ) : ( <div className="">Course not found</div> )
        }
      </div>
    </div>
  )
}

export default EditCourse
