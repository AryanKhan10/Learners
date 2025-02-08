const BASE_URL = import.meta.env.VITE_BASE_URL
// console.log(import.meta.env.VITE_BASE_URL)
export const categories = {
    CATEGORIES_API: `${BASE_URL}/course/getCategories`
};

export const settingEndpoints = {
    RESETPASSWORDTOKEN_API: `${BASE_URL}/auth/reset-password-token`,
    RESETPASSWORD_API: `${BASE_URL}/auth/reset-password`
};