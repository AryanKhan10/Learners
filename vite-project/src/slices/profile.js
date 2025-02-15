import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading:false
}

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value){
            state.user= value.payload;
        },
        updateProfilePic(state,value){
            console.log(value);
            state.user.image=value.payload;
        }
    } 
})
export const {setUser, updateProfilePic} = profileSlice.actions;
export default profileSlice.reducer