import { Check } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import CourseInformation from "./CourseInformation";
import CourseBuilder from "./CourseBuilder";
import Publish from "./Publish";
import { Zap } from "lucide-react"
function RenderSteps() {
  const { step } = useSelector((state) => state.course);
  const courseSteps = [
    {
      id: 1,
      name: "Course Information",
    },
    {
      id: 2,
      name: "Course Builder",
    },
    {
      id: 3,
      name: "Publish",
    },
  ];
  return (

    <div className="flex items-center lg:flex-row flex-col-reverse sm:items-center md:items-start lg:items-start gap-4 justify-center ">
      <div className="lg:w-7/12">
      <div className="hidden sm:flex  items-center justify-between mb-1">
        {courseSteps.map((item) => (
          <div key={item.id}
           className="flex items-center w-full gap-2">
            {/* highlighted number */}
            <div
              className={` ${
                step === item.id ? "bg-blue-500" : ""
              } w-8 h-8 rounded-full flex items-center justify-center`}
            >
              {step > item.id ? <Check /> : item.id}
            </div>
            {/* to show dotted lines */}
            {item.id !== courseSteps.length && (
              <div
                className={`${
                  step > item.id ? "bg-blue-500" : "bg-gray-700"
                }  h-1 w-[10rem] sm:w-[12.5rem] md:w-[11.5rem] lg:w-[9rem] xl:w-[11rem]`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="hidden sm:flex    gap-28  mb-10 max-w-3xl">
        {courseSteps.map((item) => (
          <div key={item.id} className="text-white">{item.name}</div>
        ))}
      </div>
      {step === 1 && <CourseInformation />}
      {step===2 && <CourseBuilder/>}
  {step===3 && <Publish/>}

</div>

  {/* Tips Section */}
  <div className="col-span-1 w-10/12 lg:w-5/12 mb-10 mx-2 ms-4 sm:ms-0">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="text-yellow-400" />
                <h2 className="text-lg font-semibold">Course Upload Tips</h2>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li>• Set the Course Price option or make it free.</li>
                <li>• Standard size for the course thumbnail is 1024x576.</li>
                <li>• Video section controls the course overview video.</li>
                <li>• Course Builder is where you create & organize a course.</li>
                <li>• Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>• Information from the Additional Data section shows up on the course single page.</li>
                <li>• Make Announcements to notify any important notes to all enrolled students at once.</li>
              </ul>
            </div>
          </div>
    </div>
  );
}

export default RenderSteps;
