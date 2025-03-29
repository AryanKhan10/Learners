import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCompletedLectures } from '../../slices/viewCourse';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'; // import css
import { AiFillPlayCircle } from "react-icons/ai"

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
    const [loading, setLoading] = useState(false);
     
    useEffect(() => {
        const setVdieoDetails = async () => {

            if (!courseSectionData.length) return;
            
            if(!courseId || !sectionId || !subSectionId){
                navigate('/dashboard/enrolled-course')
            }else{
                //all fields are present 

                const filteredData = courseSectionData.filter((section) => section._id === sectionId);
                const filteredVideo = filteredData?.[0].subSection?.filter((video)=>video._id === subSectionId)

                setVideoData(filteredVideo[0]);
                setVideoEnded(false);
            }
        }

        setVdieoDetails()

    }, [location.pathname, courseSectionData, courseEntireData])

    const isFirstVideo = () => {
        const sectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);
        console.log(courseSectionData)
        const subSecIndex = courseSectionData[sectionIndex]?.subSection?.findIndex((video) => video._id === subSectionId);
        
        if(sectionIndex === 0 && subSecIndex === 0){
            return true
        }
        else return false
    }

    const isLastVideo = () => {
        const sectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);
        const subSecIndex = courseSectionData[sectionIndex]?.subSection?.findIndex((video) => video._id === subSectionId);
        
        if(sectionIndex === courseSectionData?.length -1 && subSecIndex === courseSectionData[sectionIndex]?.subSection.length -1){
            return true
        }
        else return false
    }

    const goToPreviousVideo = () => {
        const sectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);
        const noOfSubSections = courseSectionData[sectionIndex].length;
        const subSecIndex = courseSectionData[sectionIndex]?.subSection?.findIndex((video) => video._id === subSectionId);

        // previous vedio of same secton i-e current index is first
        if(sectionIndex !==  0){
            const prevSubSecId = courseSectionData[sectionIndex]?.subSection[subSecIndex - 1]._id
            navigate(`view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSecId}`)
        }
        else{
            // previous section, last vedio
            const prevSecId = courseSectionData[sectionIndex - 1]._id
            const noOfSubSec = courseSectionData[sectionIndex - 1]?.subSection.length
            const prevSubSecId = courseSectionData[sectionIndex - 1]?.subSection[noOfSubSec -1]._id
            navigate(`view-course/${courseId}/section/${prevSecId}/sub-section/${prevSubSecId}`)


        }
    }

    const goToNextVideo = () => {

        const sectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);
        const noOfSubSections = courseSectionData[sectionIndex]?.length;
        const subSecIndex = courseSectionData[sectionIndex]?.subSection?.findIndex((video) => video._id === subSectionId);

        // next vedio of same secton i-e current index is not last
        if(sectionIndex !== noOfSubSections -1){
            const nextSubSecId = courseSectionData[sectionIndex]?.subSection[subSecIndex + 1]._id
            navigate(`view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSecId}`)

        }
        else{
            // next section, 1st vedio
            const nextSecId = courseSectionData[sectionIndex + 1]._id
            const nextSubSecId = courseSectionData[sectionIndex + 1]?.subSection[0]._id

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
        {
            !videoData ? ( <div>No video exist.</div> ) : ( 
                <div>
                    <Player
                    ref={ref}
                    aspectRatio='16:9'
                    playsInline
                    onEnded={()=>{setVideoEnded(true)}}
                    src={videoData.videoURL}
                        >
                    
                    <AiFillPlayCircle/>

                    {
                        videoData && (
                        <div>
                            {
                                 !completedLectures.includes(subSectionId) && (
                                    <button 
                                        disabled={loading}
                                        onClick={()=>handleLectureComplete()}
                                        
                                        >
                                            {!loading ? "Mark as Completed": "Loading..."}
                                    </button>
                                 )
                            }
                            <button 
                                disabled={loading}
                                onClick={()=>{
                                    if(ref.current){
                                        ref.current.seek(0);
                                        setVideoEnded(false)
                                    }
                                }}
                                
                                >
                                Rewatch
                            </button>
                            <div>
                                {
                                    !isFirstVideo() && (
                                        <button
                                            disabled={loading}
                                            onClick={goToPreviousVideo}
                                            >Prev</button>
                                    )
                                }
                                {
                                    !isLastVideo() && (
                                        <button
                                            disabled={loading}
                                            onClick={goToNextVideo}
                                            >Next</button>
                                    )
                                }
                            </div>
                        </div>)
                    }
                    </Player>
                </div> )
        }
        <h1>{videoData?.title}</h1>
        <p>{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails
