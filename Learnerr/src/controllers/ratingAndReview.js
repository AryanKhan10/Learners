import mongoose from "mongoose";
import  {Course}  from "../models/course.model.js";
import  {RatingAndReview}  from "../models/ratingAndReview.model.js";

//create review
const createReview = async (req, res) => {
    try {
        //get user and course
        //check if he is enrolled
        //check if he has already reviewed the course
        //create rating adn review
        // update the course

        const userId = req.user.userId;
        const {rating, review, courseId} = req.body;
        console.log(courseId, userId)
        const courseDetails = await Course.findOne(
            {_id:courseId,
                studentsEnrolled:{$elemMatch:{$in:userId}}
            }) /// {studentsEnrolled:{$elemMatch:{$in:id}}}
            console.log(courseDetails)
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "Student not enrolled.",
            })
        }

        const alreadyReviewed = await RatingAndReview.findOne({course:courseId,user:userId})
        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message: "You have already reviewed this course.",
            })
        }

        const ratingReview = await RatingAndReview.create(
            {   course:courseId,
                user:userId,
                rating:rating, 
                review:review
            })
    console.log(ratingReview)
        await Course.findByIdAndUpdate(courseId,
                                    {$push:{ratingAndReview:ratingReview}},
                                    {new:true})

        res.status(200).json({
            success: true,
            message: "review created.",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "problem while creating review.",
            error: error.message
        })
    }
}

//get avg reviews
const getAvgReview = async (req, res) => {
    try {
        console.log(req.body.courseIds)
        const courseIds = req.body.courseIds; // Array of course IDs
        const objectIds = new mongoose.Types.ObjectId(courseIds);
    
        const avgRatings = await RatingAndReview.aggregate([
            {
                $match: {
                    course: objectIds 
                }
            },
            {
                $group: {
                    _id: "$course",
                    averageRating: { $avg: "$rating" }
                }
            }
        ]);
    
        // Format result as { courseId: avgRating }
        // const formatted = {};
        // objectIds.forEach(id => {
        //     const match = avgRatings.find(item => item._id.toString() === id.toString());
        //     formatted[id] = match ? match.averageRating : 0;
        // });
    
        res.status(200).json({
            success: true,
            message: "Average ratings fetched successfully.",
            averageRatings: avgRatings
        });
    
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || error
        });
    }
    
}

// get all reviews
const getAllRating = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
                                        .sort({rating:-1})
                                        .populate({
                                            path:"user",
                                            select:"firstName lastName email image"
                                        })
                                        .populate({
                                            path:"course",
                                            select:"courseTitle"

                                        })
                                        .exec();

                                        res.status(200).json({
                                            success: true,
                                            message: "All reviews fetched.",
                                            allReviews
                                        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

export { createReview, getAvgReview, getAllRating}