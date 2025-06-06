import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    courseSectionData: [],
    courseEntireData: [],
    completedLectures: localStorage.getItem('completedLectures')?  localStorage.getItem('completedLectures') :[],
    totalNoOfLectures:localStorage.getItem('totalNoOfLectures')?  localStorage.getItem('totalNoOfLectures'): 0
};

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        setCourseSectionData(state, action) {
           state.courseSectionData = action.payload;
        },
        setCourseEntireData(state, action) {
           state.courseEntireData = action.payload;
        },
        setTotalNoOfLectures(state, action) {
           state.totalNoOfLectures = action.payload;
             localStorage.setItem('totalNoOfLectures', action.payload)
        },
        setCompletedLectures(state, action) {
           state.completedLectures = action.payload;
           localStorage.setItem('completedLectures', JSON.stringify(action.payload))
        },
        updateCompletedLectures(state, action) {
           state.completedLectures = [...state.completedLectures, action.payload];
             localStorage.setItem('completedLectures', JSON.stringify([...state.completedLectures, action.payload]))
        },
    },
});

export const { setCourseSectionData, setCourseEntireData, setCompletedLectures, setTotalNoOfLectures, updateCompletedLectures } = viewCourseSlice.actions;
export default viewCourseSlice.reducer;
