const BASE_URL = import.meta.env.VITE_BASE_URL
// console.log(import.meta.env.VITE_BASE_URL)
export const categories = {
    CATEGORIES_API: `${BASE_URL}/course/getCategories`
};

export const settingEndpoints = {
    RESETPASSWORDTOKEN_API: `${BASE_URL}/auth/reset-password-token`,
    RESETPASSWORD_API: `${BASE_URL}/auth/reset-password`
};
export const authEndpoints = {
    SENDOTP_API: `${BASE_URL}/auth/sendOTP`,
    SIGNUP_API: `${BASE_URL}/auth/signup`,
    LOGIN_API: `${BASE_URL}/auth/login`
};
export const profileEndpoints = {
    UPDATEPROPIC_API: `${BASE_URL}/profile/updateProfilePicture`,
    UPDATEPERSONALINFO_API: `${BASE_URL}/profile/updateProfile`,

};
export const coursesEndpoints = {
    GET_USER_ENROLLED_COURSES_API: `${BASE_URL}/profile/getUserData`,
    // UPDATEPERSONALINFO_API: `${BASE_URL}/profile/updateProfile`,

};