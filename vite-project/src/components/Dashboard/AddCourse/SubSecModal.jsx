import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { setCourse } from '../../../slices/course';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSec, updateSubSec } from '../../../services/section';
import { Cross, Upload } from 'lucide-react';
import UploadFile from './UploadFile';
function SubSecModal({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) {

    const dispatch = useDispatch();

    const {
        register, handleSubmit, setValue, getValues, formState:{errors}
    }= useForm();

    const {course} = useSelector( state=>state.course);
    const {token} = useSelector( state=>state.auth);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        if(view || edit){
            setValue("lectureTitle", modalData.Title)
            setValue("lectureDesc", modalData.description)
            setValue("lectureVideo", modalData.videoUrl)
        }
    },[])

    const isFormUpdated =() =>{
        const currentData = getValues();
        if(currentData.lectureTitle !== modalData.Title || currentData.lectureDesc !== modalData.description || currentData.lectureVideo !== modalData.videoUrl){
            return true;
        }
        else{
            return false;
        }
    }

    const handleEditSubmit = async() =>{

        const currentData = getValues();
        const formData = new FormData();
        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if(currentData.lectureTitle !== modalData.Title){
            formData.append("sectionName", currentData.lectureTitle);
        }
        if(currentData.lectureDesc !== modalData.description){
            formData.append("description", currentData.lectureDesc);
        }
        if(currentData.lectureVideo !== modalData.videoUrl){
            formData.append("video", currentData.lectureVideo);
        }

        setLoading(true);
        const result = await updateSubSec(formData, token);
        if(result){
            dispatch(setCourse(result));
        }
        setModalData(null);
        setLoading(false);
    }

    const submit = async(data) => {
        if(view){
            //no button for view modal
            return;
        }
        if(edit){
            if(!isFormUpdated()){
                toast.error("No changes made to the form");
            }
            else{
                // edit subsec
                handleEditSubmit();
            }
            return; 
        }
        const formData= new FormData();
        formData.append("sectionId",modalData);
        formData.append("sectionName",data.lectureTitle);
        formData.append("description",data.lectureDesc);
        formData.append("video",data.lectureVideo);

        //API call for create subsec
        setLoading(true);
        const result = await createSubSec(formData,token)
        if(result){
            dispatch(setCourse(result));
        }
        setModalData(null);
        setLoading(false);

    }
  return (
    <div>
      <div>
        <div>
            <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
            <button>
                <Cross onClick={()=>{!loading ? setModalData(null): {} }}/>
            </button>
        </div>
        <form onSubmit={handleSubmit(submit)}>
             <UploadFile
                    name='lectureVideo'
                    label='Lecture Video'
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl:null}
                    editData={edit ? modalData.videoUrl:null}
                />

                {/* Title */}
          <div>
            <label className="block mb-2">
              Course Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: "Title is required" })}
            />
            {errors.courseTitle && (
              <p className="mt-1 text-sm text-red-500">
                {errors.lectureTitle.message}
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
              {...register("lectureDesc", {
                required: true,
              })}
            />
            {errors.lectureDesc && (
              <p className="mt-1 text-sm text-red-500">
                {errors.courseDescription.message}
              </p>
            )}
          </div>

          {
            !view && (
                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-3 rounded-md w-full mt-4"
                    >
                        {loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                    </button>
                </div>
            )
          }
        </form>
      </div>
    </div>
  )
}

export default SubSecModal
