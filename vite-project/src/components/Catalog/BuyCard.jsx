import React from 'react'
import {CheckIcon, ShareIcon } from "lucide-react"

function BuyCard({course}) {

    

  return (
    <div className="lg:col-span-1">
            <div className="bg-[#1a1f2c] rounded-lg overflow-hidden shadow-lg">
              {/* Course image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course?.thumbnail}
                  alt="Course thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Price and CTA */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">$ {course?.price}</h3>
                </div>

                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded mb-3 transition duration-200">
                  Go To Course
                </button>

                <p className="text-center text-sm text-gray-400 mb-6">30-Day Money-Back Guarantee</p>

                <div className="mb-4">
                  <h4 className="font-bold mb-2">This Course Includes :</h4>
                  <div className="flex items-start mb-2">
                    <CheckIcon className="w-4 h-4 text-teal-400 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-teal-400">Numquam officia nih</span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center border border-gray-600 hover:bg-gray-700 py-2 px-4 rounded transition duration-200">
                  <ShareIcon className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
  )
}

export default BuyCard
