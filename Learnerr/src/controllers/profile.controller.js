import {Profile} from "../models/profile.model.js";
import {User} from "../models/user.model.js";
import uploadFile from "../utiles/uploadFile.js";
import fileUpload from "express-fileupload";
import { Course } from '../models/course.model.js'
// create is leye nai kr rahe kiu k user signup krte hue hi hm ne os ki profile ko null kr deya tha
const updateProfile = async (req, res) => {
  try {
    const { gender = "", dateOfBirth = "", about, contactNumber } = req.body;

    // profile ki id k base pe update krna hai pr id sirf user ki hai
    // tho user schema se profile ki id nikal k profile updaye karengy
    const id = req.user.userId;
    console.log(id)
    const user = await User.findById({ _id: id });
    const updatedProfile = await Profile.findByIdAndUpdate(
      { _id: user.additionalDetails },
      {
        gender: gender,
        dateOfBirth: dateOfBirth,
        about: about,
        contactNumber: contactNumber,
      },{new:true}
    );

    res.status(200).json({
      success: true,
      message: "profile updated successfully.",
      updatedProfile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating the prpfile.",
      error: error,
    });
  }
};


const deleteAccount = async (req, res) => {
    try {
        //get user id
        //validate
        // delete profile first
        // delete user and return res

        const id = req.user.userId
        console.log(id)
        const user = await User.findById(id)

        if(!user){
            res.status(404).json({
                success: false,
                message: "User not found.",
              });
        }
        //dlt profile
        await Profile.findByIdAndDelete({_id: user.additionalDetails})
        // dlt fron enrolled users
        //dlt user
        await User.findByIdAndDelete({_id: id})
        
        res.status(200).json({
            success: true,
            message: "Account deleted successfully.",
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the Account.",
            error: error,
          });
    }
}

const updateProfilePic = async (req, res) => {
  try {
    console.log("Checking uploaded file", req.files);
    const file = req.files.profile; // Directly accessing req.file if handling a single file upload
    console.log(file);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found.",
      });
    }

    // Assume `updateProfile` is a function that processes the uploaded file
    const response = await uploadFile(file, process.env.FOLDER);
    // console.log("response", response);
    
    const userId = req.user.userId;
    console.log("user: ",userId)
    const user = await User.findByIdAndUpdate({_id : userId},{image:response.secure_url},{new:true})
    
    res.status(200).json({
      success: true,
      message: "Updated Profile Picture.",
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Couldn't update Profile Picture.",
      error: error.message,
    });
  }
};

const getUserData = async(req, res) => {
  try {
    const id = req.user.userId;
    console.log(id)
    const user =  await User.findById(id).populate("additionalDetails");

    if(user){
      res.status(200).json({
        success: true,
        message: "User data fetched!",
        data:user
        
      })
    }else{
      res.status(404).json({
        success: false,
        message: "User data not found!",
  
      }) 
    }
    } catch (error) {
    res.status(505).json({
      success: false,
      message: "something went wrong while fetching user data",
      error:error

    })
    
  }
}

const instructorDashboard = async (req, res) => {
  try {
    
    const courseDetails = await Course.find({instructor: req.user.userId});

    const courseData = courseDetails.map((course)=>{
      const totalStudentsEnrolled = course.studentsEnrolled = course.studentsEnrolled.length;
      const totalAmount = totalStudentsEnrolled*course.price;

      const courseInfo = {
        _id: course._id,
        courseTitle: course.courseTitle,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmount,
      }
      return courseInfo;
    });

    res.status(200).json({courses:courseData});
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error'});
  }
}

export { updateProfile, deleteAccount, updateProfilePic, getUserData, instructorDashboard};
