import { StarIcon, ClockIcon, GlobeIcon, CheckIcon, ShareIcon, ArrowBigDown } from "lucide-react"
import { useEffect, useState } from "react"
import apiConnector from "../services/apiConnector"
import { coursesEndpoints } from "../services/apis"
import { useParams } from "react-router-dom"
import GetAvgRating from "../utils/avgRating"
import RatingStars from "../components/RatingStars"
import { formateDate } from "../utils/formatDate"
import BuyCard from "../components/Catalog/BuyCard"
import { IoMdArrowDropdown,IoMdArrowDropup } from "react-icons/io";
const CoursePage = () => {g

    const {courseId} = useParams();
    const [course, setCourse]= useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [date, setDate] = useState('');
    const [totalNoOfLecture, setTotalNoOfLecture] = useState(0)
    const [isActive, setIsActive] = useState(Array(0))

    const totalDuration = course?.courseContent.reduce((courseAcc, sec) => {
      return courseAcc + sec.subSection.reduce((secAcc, sub) => secAcc + sub.timeDuration, 0);
    }, 0);
    
    // Convert seconds to HH:MM:SS format
      const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);;

        return `${hours>0 ? hours+'h':''} ${minutes >0? minutes+'m':''} ${remainingSeconds}s`;
      };

    const formattedDuration = formatDuration(totalDuration);
    console.log(formattedDuration); // Example Output: "2h 35m 20s"

    // console.log(course)
    //Fetch courses
    useEffect(()=>{   
        const getCourseDetails = async ()=>{
            const res = await apiConnector("POST", coursesEndpoints.GET_COURSE_API, {courseId:courseId})
            // console.log(res.data.data)
            if(res){
                setCourse(res?.data?.data)
            }
        }
        getCourseDetails()
    },[courseId])

    //populate date and rating
    useEffect(() => {
        if (course?.ratingAndReview) {
          setAvgReviewCount(GetAvgRating(course.ratingAndReview));
        //   console.log(avgReviewCount)
        }
        if(course?.createdAt){
            setDate(formateDate(course.createdAt))
        }
      }, [course]);

      //populate total no of lecture
      useEffect(()=>{
        let lecture = 0
        course?.courseContent?.forEach( (sec) => {
          lecture += sec?.subSection?.length || 0
        })
        setTotalNoOfLecture(lecture);
      },[course])
      console.log(course)

      const handleActive = (id) => {
        console.log(id)
        setIsActive(
          !isActive.includes(id) ? isActive.concat(id) : isActive.filter((i) => i !== id)
        )
      }
      console.log(isActive)
  return (
    <div className="min-h-screen bg-[#121620] text-white">

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course details - left side (2/3 width on large screens) */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-1">My Course</h1>
            <p className="text-gray-400 mb-4">{course?.courseTitle}</p>

            <div className="flex items-center mb-2">
              <span className="text-yellow-400 mr-2">{avgReviewCount}</span>
              <div className="flex mr-2">
              <RatingStars Review_Count={avgReviewCount} />
               
              </div>
              <span className="text-gray-400">({course?.ratingAndReview.length} reviews)</span>
              <span className="mx-2 text-gray-500">|</span>
              <span className="text-gray-400">{course?.studentsEnrolled?.length|| 0 } students enrolled</span>
            </div>

            <p className="mb-2">Created By {course?.instructor?.firstName} {course?.instructor?.LastName}</p>

            <div className="flex items-center text-gray-400 mb-8">
              <ClockIcon className="w-4 h-4 mr-1" />
              <span className="mr-2">Created at {date} </span>
              <GlobeIcon className="w-4 h-4 mr-1" />
              <span>English</span>
            </div>

            {/* What you'll learn section */}
            <div className="border border-gray-700 rounded-lg p-6 mt-8">
              <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
              <p className="text-gray-400">{course?.whatYouWillLearn}</p>
            </div>

            {/* Course content section */}
            <div>
              <div><p>Course Content:</p></div>

              <div className="flex gap-x-3">
                  <span>{course?.courseContent?.length} sections</span>
                
                <span>
                  {totalNoOfLecture} lectures
                </span>
                <span>
                  {/* {course?.courseContent?.reduce((acc, sec) => acc+=sec.timeDuration , 0)} total length */}
                  {formattedDuration} total length
                </span>
              </div>
              <div>
                <button onClick={() =>setIsActive([])} className="text-white bg-[#1f2937] rounded-lg px-4 py-2 mt-4">
                  Collapse all Sections
                </button>
              </div>
               
            </div>
            <div>
        {course?.courseContent.map((section) => (
          <div key={section._id} className="border-b border-[#333]">
            <div
              className="flex justify-between p-4 cursor-pointer bg-[#2a2a2a]"
              onClick={() => handleActive(section._id)}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs text-gray-400 inline-block transition-transform duration-200 ${section.isExpanded ? "transform rotate-90" : ""}`}
                >
                  {isActive.includes(section._id) ? <IoMdArrowDropdown className="w-4 h-4" /> : <IoMdArrowDropup className="w-4 h-4" />}
                </span>
                <span>{section.title}</span>
              </div>
              <span className="text-sm text-[#e6c700]">{section.subSection.length} lecture(s)</span>
            </div>

            {isActive.includes(section._id) && (
              <div className="bg-[#111]">
                {section.subSection.map((lecture) => (
                  <div key={lecture.id} className="flex items-center gap-2 py-3 px-4 pl-10 border-b border-[#222]">
                    <span className="text-xs text-gray-400">▶</span>
                    <span className="text-sm">{lecture.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

          </div>

          {/* Course card - right side (1/3 width on large screens) */}
          {course && <BuyCard Course={course} />}
        </div>
      </div>
    </div>
  )
}

export default CoursePage;