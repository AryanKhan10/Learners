import {toast} from 'react-hot-toast'

import {setLoading, setToken} from '../slices/auth' 
import apiConnector from './apiConnector';
import { settingEndpoints } from './apis';

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