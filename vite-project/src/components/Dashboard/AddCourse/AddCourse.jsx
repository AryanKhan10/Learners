import RenderSteps from "./RenderSteps"

function AddCourse() {
  return (
    <div className="min-h-screen my-8 mx-2 xsm:mx-8 sm:mx-8 text-gray-100">
      <div className="max-w-[21rem] xsm:max-w-6xl mx-auto flex flex-col">
        <h1 className="text-3xl font-bold mb-8">Add Course</h1>

        {/* Progress Steps */}
          <RenderSteps/>

        <div className="grid grid-cols-3 gap-8">
          {/* Form Section */}
          {/* <div className="col-span-2">
            <form className="space-y-6">
              <div>
                <label className="block mb-2">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:border-blue-500"
                  placeholder="Enter Course Title"
                />
              </div>

              <div>
                <label className="block mb-2">
                  Course Short Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 h-32 focus:outline-none focus:border-blue-500"
                  placeholder="Enter Description"
                />
              </div>

              <div>
                <label className="block mb-2">
                  Course Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:border-blue-500"
                  placeholder="Enter Course Price"
                />
              </div>

              <div>
                <label className="block mb-2">
                  Course Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Choose a Category</option>
                  <option value="development">Development</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">
                  Tags <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  onKeyDown={handleTagInput}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:border-blue-500"
                  placeholder="Enter Tags and press Enter"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </form>
          </div> */}

          
        </div>
        
      </div>
    </div>
  )
}

export default AddCourse
