import React from 'react'
import { FaHandFist } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { IoDiamondSharp } from "react-icons/io5";
import { MdDocumentScanner } from "react-icons/md";
import timelines from "../../assets/timeline.jpg"
const timeline=[
    {
        logo:<FaHandFist  className="w-[40px] h-[40px] text-purple-500"/>,
        heading:"Leadership",
        description:"Fully commited to success company",
    },
    {
        logo:<FaGraduationCap className="w-[40px] h-[40px] text-red-500"/>,
        heading:"Leadership",
        description:"Fully commited to success company",
    },
    {
        logo:<IoDiamondSharp className="w-[40px] h-[40px] text-teal-500"/>,
        heading:"Leadership",
        description:"Fully commited to success company",
    },
    {
        logo:<MdDocumentScanner className="w-[40px] h-[40px] text-yellow-400"/>,
        heading:"Leadership",
        description:"Fully commited to success company",
    },
]
function TimeLine() {

  return (
    <div>
      <div className="flex gap-10 items-center pb-20">
        <div className="flex flex-col items-center gap-6 w-5/12 ">
            {
                timeline.map((item,index)=> 
                    <div key={index} className='flex items-center gap-3'>
                        <div>{item.logo}</div>
                        <div className="flex flex-col gap-1">
                            <h3 className='font-bold'>{item.heading}</h3>
                            <p className='text-gray-600'>{item.description}</p>
                        </div>
                    </div>
                )
            }
        </div>

        <div className="relative shadow-slate-600">
            <img src={timelines} className='shadow-black w-[35rem] object-cover h-fit' alt="person doing office work" />
            <div className="absolute bg-green-500 text-white uppercase flex left-[12%] translate-y-[-40%]">
                <div className="max-w-[240px] flex gap-5 items-center border-r border-green-400 ps-6 py-6">
                    <p className='text-3xl font-bold'>10</p>
                    <p className='max-w-[120px] text-green-300 text-sm'>Years of Experience</p>
                </div>
                <div className="max-w-[240px] flex gap-5 items-center border-r border-green-400 ps-6 py-6">
                    <p className='text-3xl font-bold'>255</p>
                    <p className='max-w-[120px] text-green-300 text-sm'>Types of Courses</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLine
