"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { setCourse } from "../../../slices/course"
import { useDispatch, useSelector } from "react-redux"
import { createSubSec, updateSubSec } from "../../../services/section"
import { X } from "lucide-react"
import UploadFile from "./UploadFile"

function SubSecModal({ modalData, setModalData, add = false, view = false, edit = false }) {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.Title)
      setValue("lectureDesc", modalData.description)
      setValue("lectureVideo", modalData.videoUrl)
    }
  }, [view, edit, modalData, setValue])

  const isFormUpdated = () => {
    const currentData = getValues()
    return (
      currentData.lectureTitle !== modalData.Title ||
      currentData.lectureDesc !== modalData.description ||
      currentData.lectureVideo !== modalData.videoUrl
    )
  }

  const handleEditSubmit = async () => {
    const currentData = getValues()
    const formData = new FormData()
    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)

    if (currentData.lectureTitle !== modalData.Title) {
      formData.append("sectionName", currentData.lectureTitle)
    }
    if (currentData.lectureDesc !== modalData.description) {
      formData.append("description", currentData.lectureDesc)
    }
    if (currentData.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentData.lectureVideo)
    }

    setLoading(true)
    const result = await updateSubSec(formData, token)
    if (result) {
      dispatch(setCourse(result))
    }
    setModalData(null)
    setLoading(false)
  }

  const submit = async (data) => {
    if (view) return
    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        handleEditSubmit()
      }
      return
    }
    const formData = new FormData()
    formData.append("sectionId", modalData)
    formData.append("sectionName", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("video", data.lectureVideo)

    setLoading(true)
    const result = await createSubSec(formData, token)
    if (result) {
      dispatch(setCourse(result))
    }
    setModalData(null)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </h2>
          <button
            onClick={() => {
              !loading && setModalData(null)
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-auto flex-grow">
          <form onSubmit={handleSubmit(submit)} className="p-6 space-y-4">
            <UploadFile
              name="lectureVideo"
              label="Lecture Video"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view ? modalData.videoUrl : null}
              editData={edit ? modalData.videoUrl : null}
            />

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Lecture Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter Lecture Title"
                {...register("lectureTitle", { required: "Title is required" })}
              />
              {errors.lectureTitle && <p className="mt-1 text-sm text-red-500">{errors.lectureTitle.message}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Lecture Description <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 h-24 text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter Lecture Description"
                {...register("lectureDesc", {
                  required: "Description is required",
                })}
              />
              {errors.lectureDesc && <p className="mt-1 text-sm text-red-500">{errors.lectureDesc.message}</p>}
            </div>

            {!view && (
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default SubSecModal

