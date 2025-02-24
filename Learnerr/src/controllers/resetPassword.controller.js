import {User} from "../models/user.model.js";
import mailSender from "../utiles/mailSender.js";
import bcrypt from "bcrypt"

const resetPasswordToken = async (req, res) =>{
    try {
        const {email} = req.body; // logged in wala email hona chahiye

        console.log(email)
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not exists with this email",
            }) 
        }

        // generate frontend link, token k base pe, kiu k phir ik hi link hoga jo sb user use kr k pass reset karengy

        const token = crypto.randomUUID();
        // save token in user model in db
        const updateUserDetails = await User.findOneAndUpdate({email:email},
                                                                {
                                                                    token:token,
                                                                    resetPasswordExpire:Date.now()+3*60*60*1000
                                                                },{new:true})
        const url = `http://localhost:5173/reset-password/${token}`

        //send mail with the reset url
        await mailSender(email, "Password resent link", `reset your password using ${url}`)
        res.status(200).json({
            success: true,
            message: "Email send successfully.",
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Could not reset password.",
            error:error
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const {password, confirmPassword, token} =req.body // token ko frontend ne body mai daal deya hai

        if(password !== confirmPassword ){
            return res.status(401).json({
                success: false,
                message: "Password must match.",
            }) 
        }

        const user = await User.findOne({token})
        //either token invalid,
        if(!user){
            return res.status(401).json({
                success: false,
                message: "invalid Token.",
            })
        }
        // or token expired 
        if(Date.now()> user.resetPasswordExpire){
            return res.status(401).json({
                success: false,
                message: "Token has expired.",
            })
        }

        //hash pass and update in db
        console.log(11)
        const hashPass = await bcrypt.hash(password,10)
        console.log(hashPass)
        const updatedUser = await User.findOneAndUpdate({token},{$set: {password: hashPass}},{new: true}) //TODO:use $set keywprd

        res.status(200).json({
            success: true,
            updatedUser,
            message: "Password has been changed.",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Could not reset password.",
            error:error
        })
    }
}
export {resetPasswordToken, resetPassword}