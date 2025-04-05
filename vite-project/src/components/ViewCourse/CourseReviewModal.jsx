
import { X } from "lucide-react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { createRating } from "../../services/rating"
import ReactStars from "react-rating-stars-component" 

function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("rating", 0)
  }, [])

  const ratingChanged = (rate) => {
    console.log(rate)
    setValue("rating", rate)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.rating,
        review: data.courseExperience,
      },
       token ,
    )
    setReviewModal(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Add Review</h2>
            <button
              onClick={() => setReviewModal(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4 mb-8">
            <img
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
              src={user?.image || "/placeholder.svg"}
              alt={`profile ${user?.firstName}`}
            />
            <div>
              <p className="text-xl font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Review Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center">
              <ReactStars count={5} onChange={ratingChanged} size={25} activeColor="#ffd700" />
            </div>

            <div>
              <label htmlFor="courseExperience" className="block text-sm font-medium text-gray-700 mb-2">
                Add Your Experience
              </label>
              <textarea
                id="courseExperience"
                placeholder="Share your learning experience..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                {...register("courseExperience", { required: true })}
              />
              {errors?.courseExperience && <p className="mt-1 text-sm text-red-600">Please share your experience</p>}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal

