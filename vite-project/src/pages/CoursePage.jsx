import { StarIcon, ClockIcon, GlobeIcon, CheckIcon, ShareIcon } from "lucide-react"
import { useEffect, useState } from "react"
import apiConnector from "../services/apiConnector"
import { coursesEndpoints } from "../services/apis"
import { useParams } from "react-router-dom"
import GetAvgRating from "../utils/avgRating"
import RatingStars from "../components/RatingStars"
import { formateDate } from "../utils/formatDate"
import BuyCard from "../components/Catalog/BuyCard"
const CoursePage = () => {
    const {courseId} = useParams();
    const [course, setCourse]= useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [date, setDate] = useState('');
    
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

  return (
    <div className="min-h-screen bg-[#121620] text-white">

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course details - left side (2/3 width on large screens) */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-1">My Course</h1>
            <p className="text-gray-400 mb-4">{course?.courseTitle}</p>

            <div className="flex items-center mb-2">
              <span className="text-yellow-400 mr-2">4</span>
              <div className="flex mr-2">
              <RatingStars Review_Count={avgReviewCount} />
               
              </div>
              <span className="text-gray-400">({avgReviewCount} reviews)</span>
              <span className="mx-2 text-gray-500">|</span>
              <span className="text-gray-400">{course?.studentsEnrolled?.length|| 2 } students enrolled</span>
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
              <p className="text-gray-400">Voluptate quod quam</p>
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