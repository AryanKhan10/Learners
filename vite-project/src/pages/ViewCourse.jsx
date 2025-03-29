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

    useEffect(()=>{
        const fetchCourse = async()=>{
            const result = await getFullDetailOfCourse(courseId, token);
            if(result){
                console.log(result)
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
    },[])
  return (
    <>
    <div>
        <div>
            <VideoSidbar setReviewModal={setReviewModal}/>
        </div>
        <div>
            <Outlet/>
        </div>
    </div>
    { reviewModal && <CourseReviewModal setReviewModal/>}
    </>
  )
}

export default ViewCourse
