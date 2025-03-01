import React, { useEffect, useState } from "react";
import Buttons from "../../Home/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { set, useForm } from "react-hook-form";
import { resetCourseState, setStep } from "../../../slices/course";
import apiConnector from "../../../services/apiConnector.js";
import { coursesEndpoints } from "../../../services/apis.js";

import toast from "react-hot-toast";
function Publish() {
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  console.log(course);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const goBack = () => {
    dispatch(setStep(2));
  };

  useEffect(() => { 
    if(course?.status === "published") { // if course is already published and user is editing it
      setValue("isPublic", true); 
    }
  }, [setValue, course]);

  const goToCourses = () => {
    dispatch(resetCourseState());
    // Navigate("/dashboard/my-courses");
  }

  const handleCoursePublish = async () => {
    if(course?.status === "published" && getValues("isPublic") === true ||
      course?.status !== "draft" && getValues("isPublic") === false) {
        // no updates made, so no need to update the course means if it was already draft/ published and user didn't change the status

        goToCourses();
      return;
    }

    //update course status
    console.log(getValues())
    const courseStatus = getValues("isPublic") ? "published" : "draft";
    console.log(courseStatus)
    const formData = new FormData();

    formData.append("courseId", course._id);
    formData.append("status", courseStatus);
    setLoading(true);

    try {
      const res = await apiConnector("POST", coursesEndpoints.EDIT_COURSE_API,formData,{authentication:`Bearer ${token}`});
      console.log(res)
      dispatch(setStep(2))
      if(res.data.data){
        console.log("Course status updated successfully",res.data.data);
        // goToCourses()
      }
      toast.success("Course Updated successfully")
     } catch (error) {
      toast.error("Error Updating course")
      console.log("error updating course",error)
     }
      setLoading(false)
      
    // const result = await editCourse(formData, token);
    // if(result){
    //   console.log("Course status updated successfully",result);
    //   // goToCourses()
    // }
    // setLoading(false);
  }
  const submit = () => {
    handleCoursePublish();
  };

  return (
    <div className="w-full max-w-md p-6 rounded-lg bg-gray-800 text-white shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Publish Settings</h2>

      <form onSubmit={handleSubmit(submit)}>
        <div className="mb-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              // checked={isPublic}
              // onChange={handleCheckboxChange}
              {...register("isPublic")}
              className="h-4 w-4 rounded border-gray-600 text-yellow-500 focus:ring-yellow-500"
            />
            <span className="text-gray-400">Make this course as public</span>
          </label>
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={goBack} type="submit" disabled={loading}
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all duration-200">
            Back
          </button>
          <button disabled={loading}
            className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-all duration-200">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Publish;
