import toast from "react-hot-toast";
import apiConnector from "./apiConnector";
import { catalogEndpoints } from "./apis";

export async function getCatalogPageDetail(categoryId){
    let toastId = toast.loading("Loading...");
    let result;
    try {
        const response = await apiConnector("POST", catalogEndpoints.GET_CATALOG_DETAIL_API, 
            {categoryId: categoryId});
        if(!response.data.success){
            toast.error(response.data.message || "Something went wrong");
            throw new Error("Could not Fetch Catagory page details");
        }
        result= response?.data;
    } catch (error) {
        console.log("Catalog Page Data Api Error...",error);
        toast.error(error.response?.data?.message || error.message || "Something went wrong while fetching catalog page details");
        result= error.response?.data;
    }
    toast.dismiss(toastId);
    return result
}