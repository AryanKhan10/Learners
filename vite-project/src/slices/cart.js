import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [], //find another way
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("cart")) : 0, //find another way
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("cart")) : 0, //find another way
}

const cartSlice = createSlice({
    name:"cart",
    initialState: initialState,
    reducers: {
        AddToCart(state, value){
            const course= value.payload;
            const index = state.cart.findIndex((item)=>item._id===course._id)

            if(index>=0){
                toast.error("Course alreadt in cart");
                return;
            }
            state.cart.push(course);
            // update total qualtity
            state.totalItems++;
            state.total += course.price;
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            toast.success("Course added to cart")
        },
        RemoveFromCart(state,value){
            const courseId= value.payload;
            const index = state.cart.findIndex((item)=>item._id===courseId)

            if(index>=0){
                toast.error("Course alreadt in cart");
                // state.cart.pop(inde);
                // update total qualtity
                state.totalItems--;
                state.total -=cart[index].price;
                state.cart.splice(index,1)
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                toast.success("Course removed from the cart")
            }
        },
        // removeFromCart(state,value){
        //     state.totalIems -= value.payload
        // },
        // resetCart(state){
        //     state.totalIems = 0
        // },
    } 
})
export const {AddToCart, RemoveFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer