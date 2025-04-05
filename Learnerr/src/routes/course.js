import express from "express"
import { auth, isAdmin, isInstructor, isStudent } from "../middlewares/auth.middleware.js";
import { createReview, getAvgReview, getAllRating} from "../controllers/ratingAndReview.js"
import { createCategory, getAllCategory, categoryPageDetails } from "../controllers/category.controller.js";
import { createSection, updateSection, deleteSection } from "../controllers/section.controller.js"
import { createCourse, getCourseDetails, getAllCourses, editCourse, instructorCourses, getFullCourse, deleteCourse, buyCourse, getEnrolledCourses } from "../controllers/courses.controller.js"
import { createSubSec, updateSubSec, deleteSubSec } from "../controllers/subSection.controller.js";
import { updateCrourseProgress } from "../controllers/courseProgress.controller.js";
const router = express.Router();

router.post("/createCourse", auth, isInstructor, createCourse)
router.post("/addSection", auth, isInstructor, createSection)
router.post("/editCourse", auth, isInstructor, editCourse)
router.post("/updateSection", auth, isInstructor, updateSection)
router.delete("/deleteSection", auth, isInstructor, deleteSection)

router.post("/getCourseDetails", getCourseDetails)
router.get("/getAllCourses", getAllCourses)
router.get("/getInstructorCourse",auth, instructorCourses)
router.post("/getFullCourseDetails",auth, getFullCourse)
router.delete("/deleteCourse", auth, isInstructor, deleteCourse)
router.post("/buyCourse", auth, isStudent, buyCourse)
router.get("/getEnrolledCourses", auth, getEnrolledCourses)

router.post("/addSubSection", auth, isInstructor, createSubSec)
router.post("/updateSubSection", auth, isInstructor, updateSubSec)
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSec)

router.post("/createCategory",auth, isAdmin, createCategory)
router.get("/getCategories", getAllCategory)
router.post("/getCategoryPageDetails", categoryPageDetails)

router.post("/createRating", auth, isStudent, createReview)
router.get("/getRating", getAllRating)
router.get("/getAverageReviews", getAvgReview)

router.post("/update-courseProgress", auth, isStudent, updateCrourseProgress)
export default router;