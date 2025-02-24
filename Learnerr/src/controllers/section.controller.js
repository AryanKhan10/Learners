import {Section}  from "../models/section.model.js";
import {Course}  from "../models/course.model.js";
import { SubSection } from "../models/subSection.model.js";

const createSection = async (req, res) => {
    try {
        // get sectionName and course id ( id k base pe hi course k schema mai section update hoga na )
        const {sectionName, courseId} = req.body;

        // console.log(sectionName,courseId)
        if(!sectionName || !courseId){
            return res.status(401).json({
                success:false,
                message:"All fields are required.",
            })
        }
        //create section
        const section = await Section.create({sectionName})
        console.log(section)
        
        //update course by adding section to it
        const course = await Course.findByIdAndUpdate({_id:courseId}, {$push:{courseContent:section._id}},{new:true}).populate("courseContent").exec()
        // console.log("course ",course)

        res.status(200).json({
            success:true,
            message:"Section created successfully.",
            course
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong while creating section.",
            error:error
        })
    }
}

const updateSection = async (req, res) => {
    try {
        const {sectionName, sectionId} = req.body;
        console.log(sectionName, sectionId)
        if(!sectionName || !sectionId){
            return res.status(401).json({
                success:false,
                message:"All fields are required.",
            })
        }

        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true})
        res.status(200).json({
            success:true,
            message:"Section updated successfully.",
            section
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong while updating the section.",
            error:error
        })
    }
}

const deleteSection = async (req, res) => {
    try {
        const {sectionId} = req.params; // /sectin:id/ can be done via body 
        console.log(sectionId)
        //dlt section
        const section=await Section.findByIdAndDelete({_id:sectionId})
        // console.log("Section dlt")
        
        //remove the section from course (pull out section from an array of cource section in course schema )
        await Course.updateOne({courseContent : sectionId},{$pull:{courseContent:sectionId}})
        console.log("Course dlt")

        //dlt all the subsections associated with this section
        await SubSection.deleteMany({_id:{$in: section.subSection}}) //delete all the subSections whose id is in section.subSection array

        const updatedSec= await Section.findById(sectionId).populate("subSection").exec();
        res.status(200).json({
            success:true,
            section:updatedSec,
            message:"Section deleted successfully!",
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong while deleting the section.",
            error:error
        })
    }
}

export {createSection, updateSection, deleteSection}
