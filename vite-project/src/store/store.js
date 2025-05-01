// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/index"; // Adjust the path if needed

const store = configureStore({
  reducer: rootReducer,
});

export default store;
