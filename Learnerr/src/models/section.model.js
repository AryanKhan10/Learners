import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
    {
        sectionName:{
            type: String
        },
        subSection:[{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: "SubSection"
        }],
        
        
    },{timestamps: true}
);

export const Section = mongoose.model("Section", SectionSchema)