import { useState } from "react"
import { HomePageExplore } from "../../data/HomePage"
import HighlightText from "./HighlightText"
import CourseCard from "./CourseCard"

const tagNames = ["free", "Most popular", "New to coding", "Career paths", "Skills paths"]

function ExploreMore() {
  const [currentTag, setCurrentTag] = useState(tagNames[0])
  const [courses, setCourses] = useState(HomePageExplore[0].courses)
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

  const setCard = (tag) => {
    setCurrentTag(tag)
    const result = HomePageExplore.find((course) => course.tag === tag)
    if (result) {
      setCourses(result.courses)
      setCurrentCard(result.courses[0].heading)
    }
  }

  return (
    <div className="flex flex-col gap-3 px-4 lg:px-0">
      <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center">
        Unlock the
        <HighlightText text={" Power of Code"} />
      </div>

      <p className="text-center text-gray-600 text-xs sm:text-sm">Learn to build anything you can imagine</p>

      <div className="flex flex-wrap justify-center gap-2 mt-3">
        {tagNames.map((tag, index) => (
          <div
            className={`flex items-center
                        ${tag === currentTag ? "bg-gray-700 text-gray-300" : "bg-gray-800 text-gray-500"}
                        rounded-full transition-all duration-200 cursor-pointer
                        hover:bg-gray-900 hover:text-gray-200 px-3 py-1 text-xs sm:text-sm sm:px-5 sm:py-2`}
            key={index}
            onClick={() => setCard(tag)}
          >
            {tag}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center mt-8 gap-4 sm:gap-5 w-full">
        {courses.map((element, index) => (
          <CourseCard key={index} cardData={element} currentCard={currentCard} setCurrentCard={setCurrentCard} />
        ))}
      </div>
    </div>
  )
}

export default ExploreMore

