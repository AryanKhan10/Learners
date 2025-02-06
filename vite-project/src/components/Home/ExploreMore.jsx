import React, { useState } from 'react'
import { HomePageExplore } from '../../data/HomePage'
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';
const tagNames = [
    "free",
    "Most popular",
    "New to coding",
    "Career paths",
    "Skills paths"
]
function ExploreMore() {

    const[CurrentTag,setCurrentTag] = useState(tagNames[0]);
    const[course, setCourse] = useState(HomePageExplore[0].courses);
    const[currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setCard = (tag)=>{
        setCurrentTag(tag);
        const result = HomePageExplore.filter(course => course.tag===tag )
        setCourse(result[0].courses);
        setCourse(result[0].courses[0].heading);

    }
  return (
    <div className='flex flex-col gap-3'>
        <div className='text-4xl font-semibold text-center'>
            Unlock the 
            <HighlightText text={" Power of Code"}/>
        </div>

        <p className='text-center text-gray-600 text-sm'>
            Learn to build anything you can imagine
        </p>

        <div className="flex rounded-full justify-center gap-2 mt-3">
            {
                tagNames.map((tag, index)=>{
                    return (
                        <div className={`flex items-center gap-2
                        ${tag === CurrentTag ? "bg-gray-700 text-gray-300":"bg-gray-800 text-gray-500"}
                        rounded-full transition-all duration-200 cursor-pointer
                        hover:bg-gray-900 hover:text-gray-200 px-5 py-1`}
                        key={index}
                        onClick={()=>setCard(tag)}>
                            {tag}
                        </div>
                    )
                })
            }
        </div>

        <div className="flex justify-center mt-8 gap-5 w-full">
            {
                course.map((element, index)=>{
                    return <CourseCard 
                    key={index} 
                    cardData={element}
                    currentCard={currentCard}
                    setCurrentCard={setCurrentCard}/>
                })
            }
        </div>
    </div>
  )
}

export default ExploreMore
