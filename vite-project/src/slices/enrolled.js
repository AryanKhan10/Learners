import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    enrolledCourses: localStorage.getItem("enrolledCourses")
        ? JSON.parse(localStorage.getItem("enrolledCourses"))
        : [],
};

const enrolledSlice = createSlice({
    name: "enrolled",
    initialState,
    reducers: {
        setEnrolled(state, action) {
            state.enrolledCourses = action.payload;  // Fixed: Correctly updating the state
            localStorage.setItem("enrolledCourses", JSON.stringify(action.payload)); // Store in localStorage
        },
    },
});

export const { setEnrolled } = enrolledSlice.actions;
export default enrolledSlice.reducer;
