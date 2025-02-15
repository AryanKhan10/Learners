import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
    totalIems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : 0 //find another way
}

const cartSlice = createSlice({
    name:"cart",
    initialState: initialState,
    reducers: {
        setCart(state, value){
            state.totalIems= value.payload;
        },
        addToCart(state,value){
            state.totalIems += value.payload
        },
        removeFromCart(state,value){
            state.totalIems -= value.payload
        },
        resetCart(state){
            state.totalIems = 0
        },
    } 
})
export const {setCart, addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer