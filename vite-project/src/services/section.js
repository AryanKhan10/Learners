import { setCourse } from "../slices/course";
import apiConnector from "./apiConnector";
import { sectionEndpoints } from "./apis";
import toast from "react-hot-toast";

export async function createSection (data,token){
    let result=null;
    try {
        const res = await apiConnector("POST",sectionEndpoints.CREATE_SECTION_API, data,
            {authentication: `Bearer ${token}`}
         )
         console.log(res);
         if(!res.data.success){
            throw new Error("Couldn't create section")
         }
         result = res.data.course;
         toast.success("Section Updated");
         return result;
    } catch (error) {
        console.log("Failed to create a section ", error);
        toast.error("Couldn't create a section");
    }
}
export async function updateSection (data,token){
    let result=null;
    try {
        const res = await apiConnector("POST",sectionEndpoints.UPDATE_SECTION_API, data,
            {authentication: `Bearer ${token}`}
         )
         console.log(res);
         if(!res.message.success){
            throw new Error("Couldn't Update section")
         }
         result = res.data.course;
         toast.success("Course Updated");
         return result;
    } catch (error) {
        console.log("Failed to update section ", error);
        toast.error("Couldn't Update section");
    }
}