import HighlightText from "./HighlightText"
import Instuctor from "../../assets/professor.jpg"
import Buttons from "./Buttons"
import { FaArrowRight } from "react-icons/fa"

function InstructorSection() {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-10 justify-center items-center mt-10 px-4 md:px-0">
      <div className="w-full md:w-4/12 flex justify-center md:justify-start">
        <img
          src={Instuctor || "/placeholder.svg"}
          alt="beAnInstructor"
          className="w-[12rem] md:w-[15rem] shadow-[-5px_-5px_0px_0px_rgba(109,40,217)]"
        />
      </div>
      <div className="w-full md:w-[50%] flex flex-col justify-center gap-4 md:gap-5 text-center md:text-left">
        <div className="text-2xl md:text-3xl lg:text-4xl font-semibold w-full md:w-[50%]">
          Become an
          <HighlightText text={" Instructor"} />
        </div>
        <p className="font-medium w-full md:w-[70%] text-sm md:text-base text-gray-400">
        Share your knowledge, inspire learners, and make an impact. Join us and start shaping the future today!
        </p>

        <div className="w-full md:w-fit flex justify-center md:justify-start">
          <Buttons active={true} linkto={"/signup"}>
            <div className="flex items-center justify-center md:justify-start gap-2">
              Start Learning Today
              <FaArrowRight />
            </div>
          </Buttons>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection

