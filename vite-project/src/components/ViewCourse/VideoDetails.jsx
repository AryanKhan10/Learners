import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useDispatch, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { set } from 'mongoose';
import { updateCompletedLectures } from '../../slices/viewCourse';

function VideoDetails({setReviewModal}) {

    const {courseId, sectionId, subSectionId} = useParams();
    const {courseEntireData, courseSectionData, completedLectures, totalNoOfLectures} = useSelector(state=>state.viewCourse);
    const {token} = useSelector(state=>state.auth);
    const ref = useRef();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [videoData, setVideoData] = useState([]);
    const [videoEnded, setVideoEnded] = useState(false);
    const [Loading, setLoading] = useState(false);
     
    useEffect(() => {
        const setVdieoDetails = async () => {

            if (!courseSectionData.length) return;
            
            if(!courseId || !sectionId || !subSectionId){
                navigate('/dashboard/enrolled-course')
            }else{
                //all fields are present 

                const filteredData = courseSectionData.filter((section) => section._id === sectionId);
                const filteredVideo = filteredData?.[0].subSection.filter((video)=>video._id === subSectionId)

                setVideoData(filteredVideo[0]);
                setVideoEnded(false);
            }
        }

        setVdieoDetails()

    }, [location.pathname, courseSectionData, courseEntireData])

    const isFirstVideo = () => {
        const sectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);
        const subSecIndex = courseSectionData[sectionIndex].subSection.findIndex((video) => video._id === subSectionId);
        
        if(sectionIndex === 0 && subSecIndex === 0){
            return true
        }
        else return false
    }

    const isLastVideo = () => {
        const sectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);
        const subSecIndex = courseSectionData[sectionIndex].subSection.findIndex((video) => video._id === subSectionId);
        
        if(sectionIndex === courseSectionData.length -1 && subSecIndex === courseSectionData[sectionIndex].subSection.length -1){
            return true
        }
        else return false
    }

    const goToPreviousVideo = () => {
        const sectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);
        const noOfSubSections = courseSectionData[sectionIndex].length;
        const subSecIndex = courseSectionData[sectionIndex].subSection.findIndex((video) => video._id === subSectionId);

        // previous vedio of same secton i-e current index is first
        if(sectionIndex !==  0){
            const prevSubSecId = courseSectionData[sectionIndex].subSection[subSecIndex - 1]._id
            navigate(`view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSecId}`)
        }
        else{
            // previous section, last vedio
            const prevSecId = courseSectionData[sectionIndex - 1]._id
            const noOfSubSec = courseSectionData[sectionIndex - 1].subSection.length
            const prevSubSecId = courseSectionData[sectionIndex - 1].subSection[noOfSubSec -1]._id
            navigate(`view-course/${courseId}/section/${prevSecId}/sub-section/${prevSubSecId}`)


        }
    }

    const goToNextVideo = () => {

        const sectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);
        const noOfSubSections = courseSectionData[sectionIndex].length;
        const subSecIndex = courseSectionData[sectionIndex].subSection.findIndex((video) => video._id === subSectionId);

        // next vedio of same secton i-e current index is not last
        if(sectionIndex !== noOfSubSections -1){
            const nextSubSecId = courseSectionData[sectionIndex].subSection[subSecIndex + 1]._id
            navigate(`view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSecId}`)

        }
        else{
            // next section, 1st vedio
            const nextSecId = courseSectionData[sectionIndex + 1]._id
            const nextSubSecId = courseSectionData[sectionIndex + 1].subSection[0]._id

            navigate(`view-course/${courseId}/section/${nextSecId}/sub-section/${nextSubSecId}`)


        }
    }

    const ishandleVideoCompleted = async() => {

        setLoading(true)
            const res = await markLectureAsCompleted({courseId: courseId, subSectionId: subSectionId}, token)

            if(res){
                dispatch(updateCompletedLectures(subSectionId))
            }
        setLoading(false)

    }

  return (
    <div>
      
    </div>
  )
}

export default VideoDetails
