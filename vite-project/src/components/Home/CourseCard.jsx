import { IoPeopleSharp } from "react-icons/io5"
import { MdPlayLesson } from "react-icons/md"

function CourseCard({ cardData, currentCard, setCurrentCard }) {
  return (
    <div
      className={`w-full sm:w-[48%] md:w-[30%] lg:w-[23%] xl:w-[21%] flex flex-col gap-2 
        ${
          cardData.heading === currentCard
            ? "bg-white text-gray-900 shadow-[4px_4px_0px_0px_rgba(244,206,10)] sm:shadow-[8px_8px_0px_0px_rgba(244,206,10)]"
            : "bg-gray-800 text-white"
        } 
        p-3 sm:p-4 px-4 sm:px-5 relative top-10 sm:top-20 mb-4 sm:mb-0 transition-all duration-200 cursor-pointer`}
      onClick={() => setCurrentCard(cardData.heading)}
    >
      <div className="font-semibold text-sm sm:text-base">{cardData.heading}</div>
      <p className="text-xs sm:text-sm text-gray-500">{cardData.description}</p>
      <div className="flex justify-between text-xs sm:text-sm mt-3 sm:mt-5">
        <p className="text-semibold flex items-center gap-1 text-sky-600">
          <IoPeopleSharp className="hidden sm:inline" />
          {cardData.level}
        </p>
        <p className="text-semibold flex items-center gap-1 text-sky-600">
          <MdPlayLesson className="hidden sm:inline" />
          {cardData.lessonNumber} lessons
        </p>
      </div>
    </div>
  )
}

export default CourseCard

