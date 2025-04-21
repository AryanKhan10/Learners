import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    totalItems: JSON.parse(localStorage.getItem("totalItems")) || 0,
    total: JSON.parse(localStorage.getItem("total")) || 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        AddToCart(state, action) {
            const course = action.payload;
            const index = state.cart.findIndex((item) => item._id === course._id);

            if (index >= 0) {
                toast.error("Course already in cart");
                return;
            }

            state.cart.push(course);
            state.totalItems++;
            state.total += course.price;

            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

            toast.success("Course added to cart");
        },

        RemoveFromCart(state, action) {
            const courseId = action.payload;
            const index = state.cart.findIndex((item) => item._id === courseId);

            if (index >= 0) {
                state.totalItems--;
                state.total -= state.cart[index].price;
                state.cart.splice(index, 1);

                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

                toast.success("Course removed from the cart");
            }
        },

        resetCart(state) {
            state.cart = [];
            state.totalItems = 0;
            state.total = 0;

            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");

            // toast.success("Cart has been reset");
        },
    },
});

export const { AddToCart, RemoveFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
