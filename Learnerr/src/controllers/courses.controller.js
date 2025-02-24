import {Category} from "../models/category.model.js"
import {Course} from "../models/course.model.js"
import {User} from "../models/user.model.js"
import uploadFile from "../utiles/uploadFile.js";

const createCourse = async (req, res) => {
    try {
        // console.log(req.body)
        const {courseTitle, courseDescription, whatYouWillLearn, price,instructions, tag, category } = req.body; // tag id hogi yaha
        const thumbnail = req.files.thumbnail;
        // console.log(thumbnail)
        if(!courseTitle || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail, !category){
            return res.status(400).json({
                success:false,
                message:"All fields are required.",
                })
        }


        //fetch instructor details
        const userID = req.user.userId;
        // console.log(userID)
        const instructorDetails = await User.findById(userID)  
        // console.log(instructorDetails)
        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor not found.",
                })
        }
        // validate tag

        // console.log(tag)
        const catDetails = await Category.findById(category); // string hai 
        // console.log(catDetails)
        if(!catDetails){
            return res.status(400).json({
                success:false,
                message:"Tag not found.",
                })
        }

        //file upload

        const image = await uploadFile(thumbnail, process.env.FOLDER)
// console.log(image)
// Parse tags and instructions as arrays
const parsedTags = JSON.parse(tag);
const parsedInstructions = JSON.parse(instructions);
console.log("parsedTags", parsedTags)
       const course = await Course.create({
            courseTitle:courseTitle,
            courseDescription:courseDescription,
            whatYouWillLearn:whatYouWillLearn,
            price:price,
            thumbnail:image.secure_url,
            instructor:instructorDetails._id,
            tag:parsedTags,
            instructions:parsedInstructions,
            category:catDetails._id
    })

        //add course to the user schema of instructor

        await User.findByIdAndUpdate({_id:instructorDetails._id},{$push:{courses:course._id}})

        await Category.findByIdAndUpdate({_id:catDetails._id},{$push:{courses:course._id}})

        res.status(200).json({
            success:true,
            message:"Course Created.",
            course
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"something went wrong while creating course.",
            error:error
        })
    }
}
const getCourseDetails = async (req, res) => {
    try {
        const {courseId} = req.body;
        const courseDetaills =  await Course.findById(courseId)
                            .populate(
                                {
                                    path:"instructor",
                                    populate:{
                                        path:"additionalDetails"
                                    }
                                }
                            )
                            // .populate("ratingAndReview")
                            .populate("category")
                            .populate({
                                path:"courseContent",
                                populate:{
                                    path:"subSection"
                                }
                            })
                            console.log(courseDetaills)

        if(!courseDetaills){
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            })
        }    

        res.status(200).json({
            success: true,
            message: "Course found.",
            Data: courseDetaills
        })

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching course.",
            error: error
        })
    }
}
const getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}).populate("instructor").exec()

        res.status(200).json({
            success: true,
            message:"fetched courses.",
            allCourses

        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Couldn't get any Course.",
            error:error
        })
    }
}

export { createCourse, getCourseDetails, getAllCourses }