import React from 'react'
import { IoPeopleSharp } from "react-icons/io5";
import { MdPlayLesson } from "react-icons/md";

function CourseCard({cardData,currentCard,setCurrentCard}) {
    // console.log(cardData)
  return (
    <div className={`w-[21%] flex flex-col gap-2 
        ${cardData.heading === currentCard ? "bg-white text-gray-900 shadow-[8px_8px_0px_0px_rgba(244,206,10)]"  :
         "bg-gray-800 text-white"} p-4 px-5 relative top-20`}>
      <div className="font-semibold">{cardData.heading}</div>
      <p className='text-sm text-gray-500'>{cardData.description}</p>
      <div className="flex justify-between text-sm mt-5">
        <p className='text-semibold flex items-center gap-1 text-sky-600'>
            <IoPeopleSharp/>
            {cardData.level}
        </p>
        <p className='text-semibold flex items-center gap-1 text-sky-600'>
            <MdPlayLesson/>
            {cardData.lessonNumber} lessons
        </p>
      </div>
    </div>
  )
}

export default CourseCard
