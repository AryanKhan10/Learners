import { FaHandFist } from "react-icons/fa6"
import { FaGraduationCap } from "react-icons/fa"
import { IoDiamondSharp } from "react-icons/io5"
import { MdDocumentScanner } from "react-icons/md"
import timelines from "../../assets/timeline.jpg"

const timeline = [
  {
    logo: <FaHandFist className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-purple-500" />,
    heading: "Leadership",
    description: "Fully committed to success company",
  },
  {
    logo: <FaGraduationCap className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-red-500" />,
    heading: "Leadership",
    description: "Fully committed to success company",
  },
  {
    logo: <IoDiamondSharp className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-teal-500" />,
    heading: "Leadership",
    description: "Fully committed to success company",
  },
  {
    logo: <MdDocumentScanner className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-yellow-400" />,
    heading: "Leadership",
    description: "Fully committed to success company",
  },
]

function TimeLine() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-10 items-center sm:mx-10 md:mx-20 lg:mx-0 pb-10 sm:pb-20">
        <div className="flex flex-col items-start  lg:items-center gap-6 w-full lg:w-5/12">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div>{item.logo}</div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-sm sm:text-base">{item.heading}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative shadow-slate-600 w-full lg:w-7/12 mt-8 lg:mt-0">
          <img
            src={timelines || "/placeholder.svg"}
            className="shadow-black w-full max-w-[35rem] object-cover h-fit mx-auto"
            alt="person doing office work"
          />
          <div className="absolute bg-green-500 text-white uppercase flex flex-col sm:flex-row left-0 sm:left-[12%] bottom-0 sm:translate-y-[50%] w-full sm:w-auto">
            <div className="flex gap-5 items-center border-b sm:border-b-0 sm:border-r border-green-400 p-4 sm:ps-6 sm:py-6 justify-center sm:justify-start">
              <p className="text-2xl sm:text-3xl font-bold">10</p>
              <p className="max-w-[120px] text-green-300 text-xs sm:text-sm">Years of Experience</p>
            </div>
            <div className="flex gap-5 items-center p-4 sm:ps-6 sm:py-6 justify-center sm:justify-start">
              <p className="text-2xl sm:text-3xl font-bold">255</p>
              <p className="max-w-[120px] text-green-300 text-xs sm:text-sm">Types of Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLine

