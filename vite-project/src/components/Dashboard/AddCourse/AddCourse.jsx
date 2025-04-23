import RenderSteps from "./RenderSteps"

function AddCourse() {
  return (
    <div className="min-h-screen my-8 mx-2 xsm:mx-8 sm:mx-8 text-gray-100">
      <div className="max-w-[21rem] xsm:max-w-6xl mx-auto flex flex-col">
        <h1 className="text-3xl font-bold mb-8 mx-5">Add Course</h1>

        {/* Progress Steps */}
          <RenderSteps/>

        <div className="grid grid-cols-3 gap-8">
          {/* Form Section */}
          
        </div>
        
      </div>
    </div>
  )
}

export default AddCourse
