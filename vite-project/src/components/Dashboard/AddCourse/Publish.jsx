import React from 'react'
import Buttons from '../../Home/Buttons'

function Publish() {
  return (
    <div className="w-full max-w-md p-6 rounded-lg bg-gray-800 text-white shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Publish Settings</h2>

      <div className="mb-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            // checked={isPublic}
            // onChange={handleCheckboxChange}
            className="h-4 w-4 rounded border-gray-600 text-yellow-500 focus:ring-yellow-500"
          />
          <span className="text-gray-400">Make this course as public</span>
        </label>
      </div>

      <div className="flex justify-end space-x-2">
        <Buttons active={false} >
          Back
        </Buttons>
        <Buttons active={true} >Save Changes</Buttons>
      </div>
    </div>
  )
}

export default Publish
