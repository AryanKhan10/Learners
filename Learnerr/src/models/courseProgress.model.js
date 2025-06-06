import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema(
    {
        courseId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        completedVedios :[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"SubSection"
        }]
        
    }
);

export const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema)