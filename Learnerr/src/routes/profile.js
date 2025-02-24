import express from "express"
const router = express.Router()
import {deleteAccount,updateProfile, updateProfilePic, getUserData} from "../controllers/profile.controller.js"
import { auth } from "../middlewares/auth.middleware.js"

//dlt user acc
router.post("/updateProfile",auth,updateProfile)
router.delete("/deleteProfile",auth, deleteAccount)
router.post("/updateProfilePicture",auth, updateProfilePic)
// get enrolled user 
router.get("/getUserData",auth, getUserData)

export default router;
