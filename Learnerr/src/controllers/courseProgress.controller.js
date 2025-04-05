import { CourseProgress } from "../models/courseProgress.model.js";

const updateCrourseProgress = async (req, res) => {
    try {
        const {courseId, subSectionId} = req.body;
        const userId = req.user.userId;
        if(!courseId || !subSectionId) {
            return res.status(400).json({success:false, message: "Course ID and Subsection ID are required" });
        }
        const courseProgress = await CourseProgress.findOne({userId, courseId});

        //check if course progress exists
        if (!courseProgress) {
            return res.status(404).json({ message: "Course progress not found" });
        }else{
            const completedVedios = courseProgress.completedVedios;

            //check if vedio is already marked as completed
            if(completedVedios.includes(subSectionId)){
                return res.status(400).json({success:false, message: "Video already marked as completed" });
            }else{
                courseProgress.completedVedios.push(subSectionId);
                await courseProgress.save();
                return res.status(200).json({ message: "Video marked as completed" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export { updateCrourseProgress };