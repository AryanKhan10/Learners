import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
    course:null,
    editCourse: false,
    step:1,

}

const courseSlice = createSlice({
    name:"course",
    initialState: initialState,
    reducers: {
        setStep(state, action){
            console.log(action.payload)
             state.step = action.payload;
        },
        setCourse(state, action){
             state.course = action.payload;
        },
        setEditCourse(state, action){
             state.editCourse = action.payload;
        },
        resetCourseState(state){
            state.step=1;
            state.course=null;
            state.editCourse = false;
        },
        
    } 
})
export const {setStep, setCourse, setEditCourse, resetCourseState} = courseSlice.actions;
export default courseSlice.reducer