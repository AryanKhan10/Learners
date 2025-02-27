import { Course } from "../models/course.model.js";
import { Section } from "../models/section.model.js";
import { SubSection } from "../models/subSection.model.js";
import fileUpload from "../utiles/uploadFile.js";
const createSubSec = async (req,res) => {
    try {
        // console.log(req.files)
        const {title,description,timeDuration,sectionId} = req.body;
        const vedio = req.files.video;
        console.log("video here", vedio)
        if(!title || !timeDuration || !description || !vedio || !sectionId ){
            return res.status(401).json({
                success:false,
                message:"All fields are required.",
            })
        }
        //upload vedio
        const uploadDetails = await fileUpload(vedio, process.env.FOLDER)
        console.log("vedio ",uploadDetails.secure_url)
        //create section
        const subSection = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoURL:uploadDetails.secure_url
        });
        console.log("subSection ",subSection)
        
        const section = await Section.findByIdAndUpdate( sectionId, {$push:{subSection: subSection._id}}, {new:true}).populate("subSection");
        
                
            console.log("Section ",section)
                res.status(200).json({
                    success:true,
                    message:"SubSection created successfully.",
                    section
                })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Something went wrong while creating section.",
            error:error
        })
    }
}

const updateSubSec = async (req,res) => {
    try {
        const {title,description,timeDuration,subSectionId} = req.body;
        const vedio = req.files?.video;
        console.log(timeDuration, title, description, subSectionId, vedio)

        //at least one field is provided
        if (!title && !timeDuration && !description && !video) {
            return res.status(400).json({
                success: false,
                message: "At least one field (title, description, timeDuration, or video) must be provided.",
            });
        }
        console.log("ved ")
        let uploadDetails;
        if(vedio){
            uploadDetails = await fileUpload(vedio, process.env.FOLDER)
            console.log("vedio ",uploadDetails.secure_url)
            
        }
        // console.log("ved ")
        //update subsection
        const subsection = await SubSection.findByIdAndUpdate({_id:subSectionId},
            {title,description,timeDuration,videoURL:uploadDetails?.secure_url},
            {new:true})
            // console.log("ved ")
        res.status(200).json({
            success:true,
            message:"SubSection updated successfully.",
            subsection
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Something went wrong while updating sunSection.",
            error:error
        })
    }
}

const deleteSubSec = async (req,res) => {
    try {
        const {subSectionId,courseId} =  req.body;

        //delete subsec
        await SubSection.findByIdAndDelete(subSectionId)

        //pull out subsec from section schema
        await Section.updateOne({subSection:subSectionId},{$pull:{subSection:subSectionId}},{new:true})
        const course =await Course.findById(courseId)
                            .populate({path:"courseContent",populate:{path:"subSection"}})
                            .exec();

        console.log("course ",course)
        res.status(200).json({
            success:true,
            message:"Sub Section deleted successfully.",
            course
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong while deleting the Subsection.",
            error:error
        })
    }
}

export {createSubSec, updateSubSec, deleteSubSec}