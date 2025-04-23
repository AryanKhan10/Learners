import React, { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { categories, coursesEndpoints } from "../../../services/apis";
import { setCourse, setStep } from "../../../slices/course";
import { useForm } from "react-hook-form";
import apiConnector from "../../../services/apiConnector";
import toast from "react-hot-toast";

function CourseInformation() {

  const { course, editCourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [newThumbnailSelected, setNewThumbnailSelected] = useState(false);
  const [tags, setTags] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [instructionInput, setInstructionInput] = useState("");

  const dispatch = useDispatch();
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setCategory(result.data.allTag);
    } catch (error) {
      console.log("Error while fetching Categories: ", error);
    }
    setLoading(false);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
        setNewThumbnailSelected(true);
      };
      reader.readAsDataURL(file);
    } else {
      setNewThumbnailSelected(false);
    }
  };

  useEffect(() => {
    fetchLinks();
    if (editCourse) {
      setValue("courseTitle", course.courseTitle);
      setValue("courseDescription", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseTag", course.tag);
      setTags(course.tag); // ensure UI updates accordingly
      setValue("courseCategory", course.category);
      setValue("courseRequirement", course.instructions);
      setInstructions(course.instructions); // ensure UI updates accordingly
      setValue("courseThumbnail", course.thumbnail);
      // const value =getValues();
      // console.log("value: ", value);
      setThumbnailPreview(course.thumbnail);  
      // console.log("course.thumbnail: ", course.thumbnail);
    }
  }, [editCourse]);

  useEffect(() => {
    // Update the hidden form fields with the array values
    setValue("courseRequirement", instructions.join(","));
    setValue("courseTag", tags.join(","));
  }, [instructions, tags]);


  const onSubmit = async (data) => {
    // console.log(data);
    const current = getValues();
    console.log("current: ",current)
    const formData = new FormData();
    console.log("tags: ",data.courseTag)
    const parsedTags = data.courseTag.split(",");
    const parsedInstructions = data.courseRequirement.split(",");
    console.log("parsedTags: ",parsedTags)

    if(editCourse){
      formData.append("courseId", course._id);
      if(course?.courseTitle !== current.courseTitle ){
      formData.append("courseTitle", data.courseTitle);
      }
      if(course?.courseDescription !== current.courseDescription ){
      formData.append("courseDescription", data.courseDescription);
      }
      if(course?.coursePrice !== current.coursePrice ){
      formData.append("price", data.coursePrice);
      }
      // if(course?.courseThumbnail !== current.courseThumbnail ){ this code executes if the thumbnail is changed or not
      // formData.append("thumbnail", data.courseThumbnail[0]);
      // }
      if (newThumbnailSelected && data.courseThumbnail && data.courseThumbnail.length > 0) {
        formData.append("thumbnail", data.courseThumbnail[0])
      }
      if(course?.courseCategory !== current.courseCategory ){
      formData.append("category", data.courseCategory);
      }
      if(course?.courseRequirement !== current.courseRequirement ){
      formData.append("instructions", JSON.stringify(parsedInstructions));
      }
      if(course?.courseTag !== current.courseTag ){
      formData.append("tag", JSON.stringify(parsedTags));
      }
      if(course?.courseBenefits !== current.courseBenefits ){
      formData.append("whatYouWillLearn", data.courseBenefits);
      }



      //TODO: update course pending A flag is needed to if there is any thing to update then api should be called
      setLoading(true);
     try {
      const res = await apiConnector("POST", coursesEndpoints.EDIT_COURSE_API,formData,{authentication:`Bearer ${token}`});
      console.log(res)
      dispatch(setCourse(res.data.data));
      dispatch(setStep(2))
      toast.success("Course Updated successfully")
     } catch (error) {
      toast.error("Error Updating course")
      console.log("error updating course",error)
     }
      setLoading(false)
    }
    else{
      
      formData.append("courseTitle", data.courseTitle);
        
        formData.append("courseDescription", data.courseDescription);
        formData.append("price", data.coursePrice);
        
        formData.append("thumbnail", data.courseThumbnail[0]);
        
        formData.append("category", data.courseCategory);
        
        formData.append("instructions", JSON.stringify(parsedInstructions));
        
        formData.append("tag", JSON.stringify(parsedTags));
        
        formData.append("whatYouWillLearn", data.courseBenefits);
        
      // console.log("formData ", formData.get("courseTitle"));

      setLoading(true);
     try {
      const res = await apiConnector("POST", coursesEndpoints.CREATE_COURSE_API,formData,{authentication:`Bearer ${token}`});
      console.log(res)
      dispatch(setCourse(res.data.course));
      dispatch(setStep(2))
      toast.success("Course created successfully")
     } catch (error) {
      toast.error("Error creating course")
      console.log("Error creating course",error)
     }
      setLoading(false)


    }
  };

  const handleTagInput = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(",", "");
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput(""); // Clear the input
      }
    }
  };

  const handleInstructionInput = (e) => {
    if (e.key === "Enter" && instructionInput.trim()) {
      e.preventDefault();
      const newInstruction = instructionInput.trim();
      if (newInstruction && !instructions.includes(newInstruction)) {
        setInstructions([...instructions, newInstruction]);
        setInstructionInput(""); // Clear the input
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const removeInstruction = (instructionToRemove) => {
    setInstructions(instructions.filter((instruction) => instruction !== instructionToRemove));
  };

  return (
    <div className="">
      <div className="col-span-2 flex w-full flex-col ms-3 sm:ms-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2">
              Course Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter Course Title"
              {...register("courseTitle", { required: "Title is required" })}
            />
            {errors.courseTitle && (
              <p className="mt-1 text-sm text-red-500">
                {errors.courseTitle.message}
              </p>
            )}
          </div>

          {/* Short Description */}
          <div>
            <label className="block mb-2">
              Course Short Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 h-20 focus:outline-none focus:border-blue-500"
              placeholder="Enter Short Description"
              {...register("courseBenefits", {
                required: "Course benefits is required",
              })}
            />
            {errors.courseDescription && (
              <p className="mt-1 text-sm text-red-500">
                {errors.courseDescription.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2">
              Course Benefits <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 h-32 focus:outline-none focus:border-blue-500"
              placeholder="Enter Detailed Description"
              {...register("courseDescription", { required: "Description is required" })}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2">
              Course Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter Course Price"
              {...register("coursePrice", { required: "Price is required" })}
            />
            {errors.coursePrice && (
              <p className="mt-1 text-sm text-red-500">
                {errors.coursePrice.message}
              </p>
            )}
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block mb-2">
              Course Thumbnail <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative border-2 border-dashed border-gray-700 rounded-lg p-4 hover:border-gray-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    {...register("courseThumbnail", {
                      required: editCourse ? false : "Thumbnail is required",
                    })}
                    onChange={handleThumbnailChange}
                  />
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-400">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
                {errors.courseThumbnail && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.courseThumbnail.message}
                  </p>
                )}
              </div>
              {thumbnailPreview && (
                <div className="w-40 h-24 relative">
                  <img
                    src={thumbnailPreview || "/placeholder.svg" || courseThumbnail}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2">
              Course Category <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:border-blue-500"
              {...register("courseCategory", {
                required: "Category is required",
              })}
            >
              <option value="">Choose a Category</option>
              {!loading &&
                category.map((item, index) => (
                  <option key={index} value={`${item?._id}`}>
                    {item?.name}
                  </option>
                ))}
            </select>
            {errors.courseCategory && (
              <p className="mt-1 text-sm text-red-500">
                {errors.courseCategory.message}
              </p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-2">
              Tags <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <X
                    className="w-4 h-4 cursor-pointer hover:text-red-500"
                    onClick={() => removeTag(tag)}
                  />
                </span>
              ))}
            </div>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter Tags and press Enter or Comma"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInput}
            />
            <input type="hidden" {...register("courseTag", { required: "At least one tag is required" })} />
            {errors.courseTag && tags.length === 0 && (
              <p className="mt-1 text-sm text-red-500">
                {errors.courseTag.message}
              </p>
            )}
          </div>

          {/* Instructions */}
          <div>
            <label className="block mb-2">
              Course Instructions <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter Instructions and press Enter"
              value={instructionInput}
              onChange={(e) => setInstructionInput(e.target.value)}
              onKeyDown={handleInstructionInput}
            />
            <input type="hidden" {...register("courseRequirement", { required: "At least one instruction is required" })} />
            {errors.courseRequirement && instructions.length === 0 && (
              <p className="mt-1 text-sm text-red-500">
                {errors.courseRequirement.message}
              </p>
            )}
            <div className="mt-2 space-y-2">
              {instructions.map((instruction, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-2 rounded-md flex justify-between items-center"
                >
                  {instruction}
                  <X
                    className="w-4 h-4 cursor-pointer hover:text-red-500"
                    onClick={() => removeInstruction(instruction)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2">
            {editCourse && (
              <button
                type="submit"
                onClick={() => dispatch(setStep(2))}
                className="w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-700 transition-colors"
              >
                Continue Without Saving
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              {!loading ? (!editCourse ? "Next" : "Save Changes") : "loading..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseInformation;