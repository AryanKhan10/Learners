import {Category} from "../models/category.model.js"
import { Course } from "../models/course.model.js";
const createCategory = async (req, res) => {
    try {
        const {name, description} = req.body;
        console.log(name,description)
        if(!name || !description){
           return res.status(400).json({
            success:false,
            message:"All fields are required.",
            }) 
        }

        const category = await Category.create({name, description}); // {new: true} not work here, work with modified queries i-e update, findupdate ...
        console.log(category)
        res.status(200).json({
            success:true,
            message:"category created successfully.",
            category
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"something went wrong while creating tag.",
            error:error
        })
    }
}

const getAllCategory = async (req, res) => {

    try {
        const allTag = await Category.find({})
        res.status(200).json({
            success:true,
            message:"Categories fetched!",
            allTag
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"something went wrong while getting all tags.",
            error:error
        })
    }
}

const categoryPageDetails = async (req, res) => { 
    try { 
            //get categoryId 
            console.log("categoryId",req.body)
            const {categoryId} = req.body; 

            //get courses for specified categoryId 
            const selectedCategory = await Category.findById(categoryId)
                                    .populate({
                                        path:"courses",
                                        match:{status: "published"},
                                        populate:"ratingAndReview",
                                        populate:{
                                            path:"instructor",
                                            populate:"additionalDetails"
                                        }

                                    }) .exec();
           console.log("selectedCategory", selectedCategory)
        //    console.log("selectedCategory", !selectedCategory)

            //validation 
            if(!selectedCategory) { 
                return res.status(404).json({ 
                    success: false, 
                    message: 'Data Not Found', 
                }); 
            } 

            if(selectedCategory.courses.length === 0){
               return res.status(401).json({
                    success:false,
                    message:"No course found for the selected category"
                })
            }

            //get courses for different categories 
            const categoriesExempt = await Category.find({ _id: {$ne: categoryId} });
            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }
            
            const differentCategories= await Category.findOne( categoriesExempt[getRandomInt(categoriesExempt.length)]._id )
                                    .populate({path:"courses",
                                               match: {status: "published"},
                                               populate:{
                                                path:"instructor",
                                                populate:"additionalDetails"
                                            }
                                            
                                            }).exec();
                                                   console.log(differentCategories) 
            //get top selling courses //HW - write it on your own
            const allCategory= await Category.find()
                                        .populate({
                                            path:"courses",
                                            match:{status: "published"},
                                            populate:{
                                                path:"instructor",
                                                populate:"additionalDetails"
                                            }
                                        }) .exec();

            const allCourses = allCategory.flatMap((category) => category.courses);
            console.log("allCourses", allCourses)
            const mostSellingCourse = allCourses.sort((a,b) => b.sold - a.sold).slice(0,10)

            
            // return response
            return res.status (200).json({
                success:true,
                data: { 
                    selectedCategory, 
                    differentCategories,
                    mostSellingCourse 
                }
            });
    }catch(error){
        console.log("Error ", error)
        res.status (500).json({
            success:false,
            error,
        });
    }
}

export {createCategory, getAllCategory, categoryPageDetails}