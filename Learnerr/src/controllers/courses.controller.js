import path from "path";
import { Category } from "../models/category.model.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import uploadFile from "../utiles/uploadFile.js";
import { CourseProgress } from "../models/courseProgress.model.js";
import { Section } from "../models/section.model.js";
import { SubSection } from "../models/subSection.model.js";
import mailSender from "../utiles/mailSender.js";

const createCourse = async (req, res) => {
  try {
    // console.log(req.body)
    const {
      courseTitle,
      courseDescription,
      whatYouWillLearn,
      price,
      instructions,
      tag,
      category,
    } = req.body; // tag id hogi yaha
    const thumbnail = req.files.thumbnail;
    // console.log(thumbnail)
    if (
      (!courseTitle ||
        !courseDescription ||
        !whatYouWillLearn ||
        !price ||
        !tag ||
        !thumbnail,
      !category)
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    //fetch instructor details
    const userID = req.user.userId;
    // console.log(userID)
    const instructorDetails = await User.findById(userID);
    // console.log(instructorDetails)
    if (!instructorDetails) {
      return res.status(400).json({
        success: false,
        message: "Instructor not found.",
      });
    }
    // validate tag

    // console.log(tag)
    const catDetails = await Category.findById(category); // string hai
    // console.log(catDetails)
    if (!catDetails) {
      return res.status(400).json({
        success: false,
        message: "Tag not found.",
      });
    }

    //file upload

    const image = await uploadFile(thumbnail, process.env.FOLDER);
    // console.log(image)
    // Parse tags and instructions as arrays
    const parsedTags = JSON.parse(tag);
    const parsedInstructions = JSON.parse(instructions);
    console.log("parsedTags", parsedTags);
    const course = await Course.create({
      courseTitle: courseTitle,
      courseDescription: courseDescription,
      whatYouWillLearn: whatYouWillLearn,
      price: price,
      thumbnail: image.secure_url,
      instructor: instructorDetails._id,
      tag: parsedTags,
      instructions: parsedInstructions,
      category: catDetails._id,
    });

    //add course to the user schema of instructor

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      { $push: { courses: course._id } }
    );

    await Category.findByIdAndUpdate(
      { _id: catDetails._id },
      { $push: { courses: course._id } }
    );

    res.status(200).json({
      success: true,
      message: "Course Created.",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while creating course.",
      error: error,
    });
  }
};
const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const courseDetaills = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      // .populate("ratingAndReview")
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      });
    console.log(courseDetaills);

    if (!courseDetaills) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course found.",
      data: courseDetaills,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching course.",
      error: error,
    });
  }
};
const getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({}).populate("instructor").exec();

    res.status(200).json({
      success: true,
      message: "fetched courses.",
      allCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Couldn't get any Course.",
      error: error,
    });
  }
};
const editCourse = async (req, res) => {
  try {
    console.log("req.body ", req.body);
    const { courseId } = req.body;
    const updates = req.body;
    console.log("updates ", updates);
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    // console.log("req.files ",req.files)
    if (req.files) {
      const thumbnail = req.files.thumbnail;
      const image = await uploadFile(thumbnail, process.env.FOLDER);
      course.thumbnail = image.secure_url;
    }

    for (let key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }
    await course.save();

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate("ratingAndReview")
      .exec();
    // console.log("updatedCourse ",updatedCourse)

    res.status(200).json({
      success: true,
      message: "Course updated.",
      data: updatedCourse,
    });
  } catch (error) {
    console.log("Error while updating course:", error);
    res.status(500).json({
      success: false,
      message: "Error while updating course.",
      error: error,
    });
  }
};
const instructorCourses = async (req, res) => {
  try {
    // console.log(req.user)
    const instructorId = req.user.userId;

    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });
    // console.log(instructorCourses)

    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};
const getFullCourse = async (req, res) => {
  try {
    // console.log(req)
    const { courseId } = req.body;
    const userId = req.user.userId;
    const course = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate("ratingAndReview")
      .exec();
    if (!course) {
      return res.status(201).json({
        success: false,
        message: `couldn't fetch course with id ${courseId}`,
      });
    }
    const courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });
    // console.log("Course Progress ", courseProgress);

    let totalDuration = 0;
    // console.log(course.courseContent)
    course.courseContent?.forEach((section) => {
      section.subSection?.forEach((subSec) => {
        const timeDuration = parseInt(subSec.timeDuration);
        totalDuration += timeDuration;
      });
    });
    function convertSecondsToDuration(totalSeconds) {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return `${hours}h ${minutes}m ${seconds}s`;
    }

    const duration = convertSecondsToDuration(totalDuration);
    console.log('completed Videos', courseProgress?.completedVedios)
    res.status(200).json({
      success: true,
      data: {
        course,
        totalDuration: duration,
        completedVedios: courseProgress?.completedVedios ?? [],
      },
    });
  } catch (error) {
    console.log("Error while getting full course detail", error);
    res.status(500).json({
      success: false,
      message: "Failed to get full course detail",
      error: error.message,
    });
  }
};
const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    // console.log("courseId ",courseId)
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    //unEnroll students
    const studentsEnrolled = course.studentsEnrolled;
    studentsEnrolled.forEach(async (student) => {
      const studentId = student._id;
      await User.findByIdAndUpdate(studentId, { $pull: { courses: courseId } });
    });
    //delete section and subsection
    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {
      //delete subsection
      console.log(sectionId);
      const section = await Section.findById(sectionId);

      if (section) {
        const subSections = section.subSection;
        for (const subSecId of subSections) {
          await SubSection.findByIdAndDelete(subSecId);
        }
      }

      // delete section
      await Section.findByIdAndDelete(sectionId);
    }

    // delete course
    await Course.findByIdAndDelete(courseId);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully.",
    });
  } catch (error) {
    console.log("Error while deleting Instructor's Course", error);
    res.status(500).json({
      success: false,
      message: "Couldn't delete Course",
      error: error,
    });
  }
};
const buyCourse = async (req, res) => {
    try {
        // const {courseId} = req.body;
        // const {userId, email} = req.user;

        // const course = await Course.findById(courseId);
        // if(!course){
        //     return res.status(404).json({
        //         success: false,
        //         message: "Course not Found"
        //     })
        // }

        // const user = course.studentsEnrolled.includes(userId);
        // console.log(user)
        // if(user){
        //     return res.status(404).json({
        //         success: false,
        //         message: "User already enrolled"
        //     })
        // }
        // const updatedCourse = await Course.findOneAndUpdate(
        //     {_id:courseId},
        //     {$push:{studentsEnrolled:userId}},{new:true}).populate("studentsEnrolled")
        // console.log(updatedCourse)

        // const newUser = await User.findByIdAndUpdate(
        //     {_id:userId},
        //     {$push:{courses: courseId}},{new:true})

        
        // const info = await mailSender(email, 'Enrolledment Mail', `Congratulations! You have enrolled yourself in ${updatedCourse?.courseTitle}`)

        const courses = req.body;
        console.log(courses)
        const {userId,email} = req.user;
        let updatedCourse;
        for(const courseId of courses){
          const course = await Course.findById(courseId);
          if(!course){
            return res.status(404).json({
              success: false,
              message: "Course not Found"
            })
          }

          const user = course.studentsEnrolled.includes(userId);
          // console.log(user)
          if(user){
              return res.status(404).json({
                  success: false,
                  message: "User already enrolled"
              })
          }

          //create Course progress i-e zero progress
          const courseProgress = await CourseProgress.create({
            courseId:courseId, userId:userId, completedVedios: []
          })

          // find user to add course and progress to their list of enrolled courses
          const enrolledStudent = await User.findByIdAndUpdate(
            {_id:userId},
            {$push:{courses: courseId, courseProgress: courseProgress._id}},{new:true})
          
           updatedCourse = await Course.findOneAndUpdate(
              {_id:courseId},
              {$push:{studentsEnrolled:userId}},
              {new:true})
              .populate("studentsEnrolled");


              const info = await mailSender(email, 'Enrolledment Mail', `Congratulations! You have enrolled yourself in ${updatedCourse?.courseTitle}`)
        }

        res.status(200).json({
            success:true,
            message: "You have been Enrolled",
            data: updatedCourse
        })
    } catch (error) {
        console.log("Error while buying Course", error);
        res.status(500).json({
            success: false,
            message:"Couldn't able to buy this course"
        })
    }
};
const getEnrolledCourses = async (req, res)=>{
    try {
        const userId = req.user.userId;
        const enrolledCourses = await Course.find({studentsEnrolled: {$in: userId}})
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .populate("ratingAndReview")
        .exec();
        if(!enrolledCourses){
            return res.status(404).json({
                success: false,
                message:"User has not been enrolled in any of the course"
            })
        }

        res.status(200).json({
            success:true,
            message:"Fetched all enrolled courses",
            data: enrolledCourses
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong while fetching enrolled courses",
            error:error.message
        })
    }
}
export {
  createCourse,
  getCourseDetails,
  getAllCourses,
  editCourse,
  instructorCourses,
  getFullCourse,
  deleteCourse,
  buyCourse,
  getEnrolledCourses
};
