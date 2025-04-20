import toast from "react-hot-toast";
import apiConnector from "./apiConnector";
import { coursesEndpoints, profileEndpoints } from "./apis";
import { updateProfilePic } from "../slices/profile";

export function updateProfile(profile, token, setLoading) {
  return async (dispatch) => {
    setLoading(true);
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        authentication: `Bearer ${token}`,
      };
      const formData = new FormData();
      formData.append("profile", profile); // Backend will receive it as `req.file`
      const res = await apiConnector(
        "POST",
        profileEndpoints.UPDATEPROPIC_API,
        formData,
        headers
      );
      dispatch(updateProfilePic(res.data.user.image));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Image Uploaded!");
    } catch (error) {
      console.log("Error uploading image", error);
      toast.error("Error uploading image");
    }
    setLoading(false);
  };
}
export function updatePersonalInfo(
  gender,
  about,
  dateOfBirth,
  contactNumber,
  token
) {
  return async (dispatch) => {
    // setLoading(true)
    try {
      const headers = {
        "Content-Type": "application/json",
        authentication: `Bearer ${token}`,
      };
      // console.log(gender)
      // toast.loading("loading...")
      const res = await apiConnector(
        "POST",
        profileEndpoints.UPDATEPERSONALINFO_API,
        { gender, about, dateOfBirth, contactNumber },
        headers
      );
      console.log(res.data);
      // dispatch(updateProfileInfo(res.data.updatedProfile))
      // localStorage.setItem("user", JSON.stringify(res.data.user))
      toast.success("personal information Uploaded!");
    } catch (error) {
      console.log("Error uploading personal information", error);
      toast.error("Error uploading personal information");
    }
    // setLoading(false)
  };
}

export async function getEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let courses = [];
  try {
    const resp = await apiConnector("GET", coursesEndpoints.GET_USER_ENROLLED_COURSES_API,null, {
        authentication: `Bearer ${token}`,
    });
    console.log(resp)
    if(!resp.data.success){
        throw new Error(resp.data.message)
    }
    // console.log(resp)
    courses = resp.data.data
  } catch (error) {
    console.log("Error Fetching Enrolled Courses",error)
    toast.error("Error Fetching Enrolled Courses")
  }
  toast.dismiss(toastId);
  return courses;
}


export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const resp = await apiConnector("GET", profileEndpoints.INSTRUCTOR_STATS_API,null, {
        authentication: `Bearer ${token}`,
    });
    console.log("Instructor Data: ",resp);
    result = resp?.data?.courses;

  } catch (error) {
    console.log("Error Fetching Instructor Data",error)
    toast.error("Error Fetching Instructor Data")
  }
  toast.dismiss(toastId);
  return result;
}
