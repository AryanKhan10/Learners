import {toast} from 'react-hot-toast'

import {setLoading, setToken} from '../slices/auth'
import {setUser} from '../slices/profile' 
import {resetCart} from '../slices/cart' 
import apiConnector from './apiConnector';
import { authEndpoints, settingEndpoints } from './apis';

export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch) =>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", settingEndpoints.RESETPASSWORDTOKEN_API,{email:email})
            console.log("Reset Password: ", response)
            // console.log("here...")
            if(!response.data.success){
                throw new Error(response.data.message);

            }
            toast.success(`Reset Email Sent ${email}`);
            setEmailSent(true)
        } catch (error) {
            console.log("Error while emailing reset password link", error);
            toast.error("Failed to sent reset pass link")
        }
        dispatch(setLoading(false));

    }
}
export function resetPassword(password, confirmPassword, token, navigate){
    return async(dispatch) =>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", settingEndpoints.RESETPASSWORD_API,{password, confirmPassword, token})
            console.log("Password has been Reset: ", response)
            // console.log("here...")
            if(!response.data.success){
                throw new Error(response.data.message);

            }
            toast.success("Password has been reset");
            navigate('/login')
        } catch (error) {
            console.log("Error while reseting the password.", error);
            toast.error("Failed to reset password")
        }
        dispatch(setLoading(false));

    }
}
export function sendOTP(email, navigate){
    return async(dispatch) =>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", authEndpoints.SENDOTP_API,{email})
            console.log("OTP has been Reset: ", response.data.message)
            // console.log("here...")
            if(!response.data.success){
                throw new Error(response.data.message);

            }
            navigate('/verify-email')
            toast.success(response.data.message);
        } catch (error) {
            console.log("Error while sending the OTP.", error);
            toast.error("Failed to send OTP")
        }
        dispatch(setLoading(false));

    }
}
export function signup(firstName, lastName, email, password, confirmPassword, contactNumber, accountType, otp, navigate){
    return async(dispatch) =>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", authEndpoints.SIGNUP_API,
                {firstName, lastName, email, password, confirmPassword, contactNumber, accountType, otp})
            console.log("Signup Successfully: ", response)
            // console.log("here...")
            if(!response.data.success){
                throw new Error(response.data.message);

            }
            toast.success("Signed Up Successfully!");
            navigate('/login')
        } catch (error) {
            console.log("Error while Signing.", error);
            toast.error("Failed to signup")
            // navigate('/signup')
        }
        dispatch(setLoading(false));

    }
}
export function login(email, password, navigate){
    return async(dispatch) =>{
        dispatch(setLoading(true));
        try {
            console.log(password)
            const response = await apiConnector("POST", authEndpoints.LOGIN_API,
                {email,password})
            console.log("LoggedIn Successfully: ", response.data)
            // console.log("here...")
            if(!response.data.success){
                throw new Error(response.data.message);

            }
            toast.success(response.data.message);
            dispatch(setToken(response.data.accessToken))
            localStorage.setItem("token", JSON.stringify(response.data.accessToken))
            localStorage.setItem("user", JSON.stringify(response.data.registeredUser))
            dispatch(setUser(response.data.registeredUser))

            navigate('/dashboard/profile')
        } catch (error) {
            console.log("Error while Signing.", error);
            toast.error("Failed to Login")
            // navigate('/signup')
        }
        dispatch(setLoading(false));

    }
}
export function logout(navigate){
    return async(dispatch) =>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart(null));
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('enrolledCourses')
        localStorage.removeItem('totalNoOfLectures')
        localStorage.removeItem('completedLectures')
        toast.success("Logged Out")
        navigate('/')
}
}