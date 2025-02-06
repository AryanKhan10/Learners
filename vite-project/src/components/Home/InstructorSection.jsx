import React from 'react'
import HighlightText from "./HighlightText"
import Instuctor from "../../assets/professor.jpg"
import Buttons from "./Buttons"
import { FaArrowRight } from "react-icons/fa";

function InstructorSection() {
  return (
    <div className=' flex flex—row gap—10 justify-center items—center mt-10' >
      <div className='w-4/12'>
        <img src={Instuctor} alt="beAnInstructor" className="w-[15rem] shadow-[-5px_-5px_0px_0px_rgba(109,40,217)]"/>

      </div>
      <div className="w-[50%] flex flex-col justify-center gap-5">
        <div className="text-4xl font-semibold w-[50%]">
          Become an
          <HighlightText text={" Instructor"}/>
        </div>
        <p className='font-medium w-[70%] text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequuntur fugiat sequi! Architecto, nesciunt rem?</p>

        <div className="w-fit">
        <Buttons active={true} linkto={'/signup'}>
          <div className="flex items-center justify-start gap-2">
          Start Learning Today
          <FaArrowRight/>
          </div>
        </Buttons>
        </div>
      </div>

    </div>
  )
}

export default InstructorSection
