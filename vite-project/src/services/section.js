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
         toast.success("Section Created!!");
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
         if(!res.data.success){
            throw new Error("Couldn't Update section")
         }
         result = res.data.section;
         toast.success("Course Updated");
         return result;
    } catch (error) {
        console.log("Failed to update section ", error);
        toast.error("Couldn't Update section");
    }
}
export async function deleteSubSection(subSecId, token) {
    try {
        const response = await apiConnector("DELETE", sectionEndpoints.DELETE_SUB_SECTION_API, null, 
            { authentication: `Bearer ${token}` }, {params:subSecId});
            if(!response.data.success){
                throw new Error("Couldn't Delete the subSection")
            }
            toast.success("SubSection deleted!")
            return response.data.course
    } catch (error) {
        console.log("Couldn't Delete subSection",error)
        toast.error("SubSection could not deleted!")
    }
    
}
export async function deleteSection(sectionId,courseId, token) {
    try {
        const response = await apiConnector("DELETE", sectionEndpoints.DELETE_SECTION_API , {courseId:courseId,sectionId:sectionId}, 
            { authentication: `Bearer ${token}` });
            if(!response.data.success){
                throw new Error("Couldn't Delete the section")
            }
            toast.success("Section deleted!")
            console.log(response.data)
            return response.data.course
    } catch (error) {
        console.log("Couldn't Delete section",error)
        toast.error("Section could not deleted!")
    }
    
}
export async function updateSubSec(secId, token) {
    try {
        const response = await apiConnector("DELETE", sectionEndpoints.DELETE_SECTION_API, null, 
            { authentication: `Bearer ${token}` }, {params:secId});
            if(!response.data.success){
                throw new Error("Couldn't Delete the section")
            }
            toast.success("Section deleted!")
            return response.data.course
    } catch (error) {
        console.log("Couldn't Delete section",error)
        toast.error("Section could not deleted!")
    }
    
}
export async function createSubSec(secId, token) {
    try {
        const response = await apiConnector("DELETE", sectionEndpoints.DELETE_SECTION_API, null, 
            { authentication: `Bearer ${token}` }, {params:secId});
            if(!response.data.success){
                throw new Error("Couldn't Delete the section")
            }
            toast.success("Section deleted!")
            return response.data.course
    } catch (error) {
        console.log("Couldn't Delete section",error)
        toast.error("Section could not deleted!")
    }
    
}