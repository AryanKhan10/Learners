"use client"

import { ArrowRight, Plus } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { setCourse, setEditCourse, setStep } from "../../../slices/course"
import NestedView from "./NestedView"
import { createSection, updateSection } from "../../../services/section"

function CourseBuilder() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [editSecName, setEditSecName] = useState(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editSecName && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editSecName])

  const cancelEdit = () => {
    setEditSecName(null)
    setValue("sectionName", "")
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  const next = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one section")
      return
    }
    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add at least one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }

  const handleEditSectionName = (sectionId, sectionName) => {
    console.log("Editing section:", sectionId, sectionName)
    if (sectionId === editSecName) {
      cancelEdit()
      return
    }
    setEditSecName(sectionId)
    setValue("sectionName", sectionName)
  }

  const submit = async (data) => {
    console.log("Submitting data:", data)
    setLoading(true)
    let result
    try {
      if (editSecName) {
        result = await updateSection(
          { sectionName: data.sectionName, sectionId: editSecName, courseId: course._id },
          token,
        )
        console.log("Update result:", result)
        if (result) {
          const updatedSections = course.courseContent.map((section) => (section._id === result._id ? result : section))
          const updatedCourse = { ...course, courseContent: updatedSections }
          dispatch(setCourse(updatedCourse))
          setEditSecName(null)
          setValue("sectionName", "")
        }
      } else {
        result = await createSection(
          {
            sectionName: data.sectionName,
            courseId: course._id,
          },
          token,
        )
        console.log("Create result:", result)
        if (result) {
          dispatch(setCourse(result))
          setValue("sectionName", "")
        }
      }
      // toast.success(editSecName ? "Section updated successfully" : "Section created successfully")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to " + (editSecName ? "update" : "create") + " section")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-6">Course Builder</h2>
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Section Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:border-blue-500 text-white"
            placeholder="Enter Section Name"
            {...register("sectionName",{ required: "Section Name is required" })}
            ref={(e) => {
              register("sectionName").ref(e);  // Ensure react-hook-form gets the ref
              inputRef.current = e;            // Also store ref for focus
            }}
          />
          {errors.sectionName && <p className="mt-1 text-sm text-red-500">{errors.sectionName.message}</p>}
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="flex items-center bg-yellow-600 text-white py-2 px-4 rounded-md transition-colors hover:bg-yellow-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Processing..." : !editSecName ? "Create Section" : "Edit Section"}
            {!loading && <Plus className="ml-2" />}
          </button>
          {editSecName && (
            <button
              onClick={cancelEdit}
              type="button"
              className="text-gray-400 hover:text-gray-300 transition-colors"
              disabled={loading}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course?.courseContent && course?.courseContent.length>0 &&<NestedView handleEditSectionName={handleEditSectionName} />}

      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={goBack}
          type="button"
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all duration-200"
        >
          Back
        </button>
        <button
          onClick={next}
          type="button"
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
        >
          Next
          <ArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  )
}

export default CourseBuilder

