import React , { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getFullDetailOfCourse } from '../services/course';
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLectures } from '../slices/viewCourse';
import VideoSidbar from '../components/ViewCourse/VideoSidbar';
import CourseReviewModal from '../components/ViewCourse/CourseReviewModal';

function ViewCourse() {

    const [reviewModal, setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const {courseEntireData} = useSelector((state)=>state.viewCourse)
    useEffect(()=>{
        
        console.log('hi')

        const fetchCourse = async()=>{
            const result = await getFullDetailOfCourse(courseId, token);
            if(result){
                console.log(result.course.courseContent)
                dispatch(setCourseEntireData(result.course))
                dispatch(setCourseSectionData(result.course.courseContent))
                dispatch(setCompletedLectures(result.completedVedios))
                let lectures = 0;
                result.course.courseContent.forEach((section)=>{
                    lectures += section.subSection.length
                })
                dispatch(setTotalNoOfLectures(lectures))

            }
        }
        fetchCourse()
    },[courseId])
  return (
     <div className="flex min-h-screen bg-gray-100">
      
        <VideoSidbar setReviewModal={setReviewModal} />
      
      <div className="flex-1 overflow-x-hidden bg-gray-900">
        <Outlet />
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  )
}

export default ViewCourse
