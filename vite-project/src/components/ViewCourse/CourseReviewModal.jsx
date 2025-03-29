import { CrossIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import RatingStars from "../RatingStars";
import { useForm } from "react-hook-form";

function CourseReviewModal({setReviewModal}) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const {
    register,
    handleSubmit,
    setValue,
    formState:{errors},
  } = useForm()

  useEffect(()=>{
    setValue("courseExperience", '')
    setValue("rating", 0)
  },[])

  const ratingChanged = (newRating) => {
    setValue("rating", newRating);
  }
    const onSubmit = async (data) => {
         await createRating(
            {
                courseId: courseEntireData._id,
                rating:data.rating,
                review:data.courseExperience
            },
            {token}
        );
        setReviewModal(false);
    }
  console.log(user);
  return (
    <div>
      <div>
        <div>
          <div>
            <p>Add Review</p>
          </div>
          <div>
            <CrossIcon onClick={()=>setReviewModal(false)} />
          </div>
        </div>
        <div>
          <img
            className="rounded-full w-[60px] h-[60px] object-cover border-2 border-blue-400"
            src={user?.image}
            alt={`profile ${user?.firstName}`}
          />
          <div>
            <p className="text-xl font-semibold">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <RatingStars Review_Count={rating} onChange={ratingChanged}/>

            <div>
                <label htmlFor="courseExperience">
                    Add Your Experience
                </label>
                <textarea 
                name="courseExperience" id="courseExperience"
                placeholder="Add Your Experience here" cols={4} rows={4}
                {...register("courseExperience", {required:true})}/>
                {errors?.courseExperience && <p className="text-red-500">Please add your experience</p>}
            </div>

            <div>
            <button onClick={()=>setReviewModal(false)}>Cancel</button>
            <button type="submit">Submit</button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default CourseReviewModal;
