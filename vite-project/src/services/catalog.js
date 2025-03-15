import toast from "react-hot-toast";
import apiConnector from "./apiConnector";
import { catalogEndpoints } from "./apis";

export async function getCatalogPageDetail(categoryId){
    let toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", catalogEndpoints.GET_CATALOG_DETAIL_API, 
            {categoryId: categoryId});
        if(!response.data.success){
            throw new Error("Could not Fetch Catagory page details");
        }
        result= response?.data;
    } catch (error) {
        console.log("Catalog Page Data Api Error...",error);
        toast.error(error.message);
        result= error.response?.data;
    }
    toast.dismiss(toastId);
    return result
}