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
        const { sectionId, courseId } = req.body; 
        
        console.log("Deleting Section ID:", sectionId, "from Course ID:", courseId);

        // Delete the section
        const section = await Section.findByIdAndDelete({_id:sectionId});
        if (!section) {
            return res.status(404).json({ success: false, message: "Section not found!" });
        }
        
        // Remove the section reference from the course
        const course = await Course.findByIdAndUpdate(
            courseId, 
            { $pull: { courseContent: sectionId } }, 
            { new: true } // Return updated document
        );

        console.log("Section removed from course");

        // Delete all subsections associated with this section
        if (section.subSection && section.subSection.length > 0) {
            await SubSection.deleteMany({ _id: { $in: section.subSection } });
            console.log("SubSections deleted");
        }

        // Get updated course with populated courseContent and subSections
        const updatedCourse = await Course.findById(courseId)
            .populate({ path: "courseContent", populate: { path: "subSection" } })
            .exec();

        res.status(200).json({
            success: true,
            course: updatedCourse,
            message: "Section deleted successfully!",
        });

    } catch (error) {
        console.error("Error while deleting section:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the section.",
            error: error.message
        });
    }
};


export {createSection, updateSection, deleteSection}
