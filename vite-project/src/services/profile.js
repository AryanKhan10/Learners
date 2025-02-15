import toast from "react-hot-toast"
import apiConnector from "./apiConnector"
import { profileEndpoints } from "./apis"
import { updateProfilePic } from "../slices/profile";
import { setLoading } from "../slices/auth";

export function updateProfile(profile,token,setLoading){

    return async(dispatch)=>{
        setLoading(true)
        try {
            const headers = {
                "Content-Type": "multipart/form-data",
                "authentication": `Bearer ${token}`,
            };
            const formData = new FormData();
            formData.append("profile", profile); // Backend will receive it as `req.file`
           const res = await apiConnector("POST", profileEndpoints.UPDATEPROPIC_API, formData, headers)
            dispatch(updateProfilePic(res.data.user.image))
            localStorage.setItem("user", JSON.stringify(res.data.user))
            toast.success("Image Uploaded!")
        } catch (error) {
            console.log("Error uploading image", error)
            toast.error("Error uploading image")
        }
        setLoading(false)


    }
}