import { ArrowBigRight, ArrowDownRight, ArrowRight, Plus } from 'lucide-react';
import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {setCourse, setEditCourse, setStep} from '../../../slices/course'
import NestedView from './NestedView';
import { createSection,updateSection } from '../../../services/section';
function CourseBuilder() {

    const [editSecName, setEditSecName] = useState(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const {course} = useSelector( state => state.course );
    const {token} = useSelector( state => state.auth );
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    console.log(course)
    const cancelEdit = () => {
      console.log("cancel")
      setEditSecName(false);
      setValue("sectionName", "");
    }
    const goBack = ()=>{
      dispatch(setStep(1)); //move to step 1 again
      dispatch(setEditCourse(true)) // now you will only edit the step 1 course, cannot register another course
    }
    const next = ()=>{
      if(course.courseContent.length === 0){
        toast.error("Please add at least one section");
        return;
      }
      if(course.courseContent.some( (section) =>section.Subsection.length === 0 )){
        toast.error("Please add at least one lecture in each section");
        return;
      }

      //if all good,

      dispatch(setStep(3));
    }

    const handleEditSectionName = (sectionId, sectionName)=>{
      console.log("in")
      if(sectionId === sectionName){
        cancelEdit();
        return;
      }
      setEditSecName(sectionId);
      setValue("sectionName",sectionName);
    }

    const submit = async (data) => {
      setLoading(true);
      let result;
      if(editSecName){
        result= await updateSection({
          sectionName:data.sectionName,
          sectionId:editSecName,
          courseId:course._id
        }, token)
      }
      else{
        result= await createSection({
          sectionName:data.sectionName,
          courseId:course._id
        }, token)
      }

      if(result){
        console.log(result)
        dispatch(setCourse(result));
        setEditSecName(null);
        setValue("sectionName","");
      }

      setLoading(false)
    }

  return (
    <div>
      <div className="text-2xl font-semibold">Course Builder</div>
      <form onSubmit={handleSubmit(submit)}>
        {/* Name */}
        <div className='my-6'>
            <label className="block mb-2">
              Section Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter Secrion Name"
              {...register("sectionName", { required: true })}
            />
            {errors.sectionName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.sectionName.message}
              </p>
            )}
          </div>

          <div className='my-3'>
          <button
              type="submit"
              className="flex bg-transparent outline text-yellow-500 py-2 px-2 rounded-md transition-colors"
            >
              {!editSecName ? "Create Section" : "Edit Section"}

              <Plus/>
            </button>
          {
            editSecName && (
            <button
              onClick={cancelEdit}
              type='button'
              className="rounded-md transition-colors"
            >
              Cancel Edit

            </button>
            )
          }
          {
            course.courseContent && (
              <NestedView handleEditSectionName={handleEditSectionName}/>
            )
          }

            <div className=" w-full flex justify-end gap-2">
            <button
              onClick={goBack}
              type='button'
              className="bg-gray-500 px-3 py-2 rounded-md hover:bg-gray-600 hover:scale-95 transition-all duration-200"
            >
              Back
            </button>
            <button
              onClick={next}
              type='button'
              className="flex justify-between items-center bg-sky-500 px-3 py-2 rounded-md hover:bg-sky-600 hover:scale-95 transition-all duration-200"
            >
              Next
              <ArrowRight/>
            </button>
            </div>

          </div>
      </form>
    </div>
  )
}

export default CourseBuilder
