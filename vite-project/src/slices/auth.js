import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData:null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null, //access token
    loading: false
}

const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers: {
        setSignupData(state, value){
            state.signupData= value.payload;
            console.log(state.signupData)
        },
        setToken(state, value){
            // console.log(value.payload)
            state.token= value.payload;
            // console.log(state.token)
        },
        setLoading(state, value){
            state.loading= value.payload;
        },
    } 
})
export const {setSignupData, setToken, setLoading} = authSlice.actions;
export default authSlice.reducer