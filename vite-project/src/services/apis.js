const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1`;
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
    LOGIN_API: `${BASE_URL}/auth/login`,
    REFRESH_API: `${BASE_URL}/auth/refresh-token`,
};
export const profileEndpoints = {
    UPDATEPROPIC_API: `${BASE_URL}/profile/updateProfilePicture`,
    UPDATEPERSONALINFO_API: `${BASE_URL}/profile/updateProfile`,
    INSTRUCTOR_STATS_API: `${BASE_URL}/profile/instructorDashboard`,

};
export const catalogEndpoints = {
    GET_CATALOG_DETAIL_API: `${BASE_URL}/course/getCategoryPageDetails`,

};
export const coursesEndpoints = {
    GET_USER_ENROLLED_COURSES_API: `${BASE_URL}/course/getEnrolledCourses`,
    CREATE_COURSE_API: `${BASE_URL}/course/createCourse`,
    EDIT_COURSE_API: `${BASE_URL}/course/editCourse`,
    GET_INSTRUCTORE_COURSE_API: `${BASE_URL}/course/getInstructorCourse`,
    GET_FULL_COURSE_API: `${BASE_URL}/course/getFullCourseDetails`,
    DELETE_COURSE_API: `${BASE_URL}/course/deleteCourse`,
    GET_COURSE_API: `${BASE_URL}/course/getCourseDetails`,
    BUY_COURSE_API: `${BASE_URL}/course/buyCourse`,
    GET_ENROLLED_COURSE_API: `${BASE_URL}/course/getEnrolledCourses`,
    UPDATE_COURSE_PROGRRESS_API: `${BASE_URL}/course/update-courseProgress`,
    GET_COURSE_PROGRRESS_API: `${BASE_URL}/course/get-courseProgress`,

};
export const sectionEndpoints = {
    // GET_USER_ENROLLED_COURSES_API: `${BASE_URL}/profile/getUserData`,
    CREATE_SECTION_API: `${BASE_URL}/course/addSection`,
    UPDATE_SECTION_API: `${BASE_URL}/course/updateSection`,
    DELETE_SECTION_API: `${BASE_URL}/course/deleteSection`,
    CREATE_SUB_SECTION_API: `${BASE_URL}/course/addSubSection`,
    UPDATE_SUB_SECTION_API: `${BASE_URL}/course/updateSubSection`,
    DELETE_SUB_SECTION_API: `${BASE_URL}/course/deleteSubSection`,


};
export const ratingAndReviewEndpoints = {
    CREATE_RATING_API: `${BASE_URL}/course/createRating`,
    GET_RATING_API: `${BASE_URL}/course/getRating`,
    GET_AVG_RATING_API: `${BASE_URL}/course/getAverageReviews`,
    


};
