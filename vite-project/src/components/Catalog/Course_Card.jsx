import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../RatingStars'
import GetAvgRating from '../../utils/avgRating';
function Course_Card({course, key, Height}) {

    const [avgReviewCount, setAvgReviewCount] = useState(0);
    console.log(course.instructor)
    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReview);
        setAvgReviewCount(count)
    }, [course])

  return (
    <div key={key} className="group h-full w-full max-w-sm transition-all duration-300 hover:translate-y-[-8px]">
      <Link href={`/course/${course._id}`} className="flex h-full">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-sky-700/30 bg-sky-950/40 backdrop-blur-sm transition-all duration-300 hover:border-sky-500/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.15)]">
          <div className="relative">
            <img
              src={course?.thumbnail || "/placeholder.svg"}
              alt="Course image"
              className={`${Height} w-full object-cover transition-transform duration-500 group-hover:scale-105`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sky-950/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </div>
          <div className="flex flex-1 flex-col p-4">
            <div className="flex-1">
              <p className="mb-1 line-clamp-2 min-h-[3.5rem] text-lg font-bold text-white">{course?.name}</p>
              <p className="mb-2 line-clamp-1 text-sm font-medium text-sky-200/80">
                {course?.instructor?.firstName} {course?.instructor?.lastName}
              </p>
            </div>
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="font-medium text-amber-400">{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount} />
                <span className="text-xs text-sky-300/70">{course?.ratingAndReview?.length} Ratings</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-cyan-400">${course?.price}</p>
                <span className="rounded-full bg-cyan-900/50 px-3 py-1 text-xs font-medium text-cyan-300 ring-1 ring-cyan-700/50 transition-colors duration-300 group-hover:bg-cyan-800/50 group-hover:text-cyan-200 group-hover:ring-cyan-500/50">
                  Enroll Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Course_Card
