import { combineReducers } from '@reduxjs/toolkit'
import auth from '../slices/auth.js'
import profile from '../slices/profile.js'
import cart from '../slices/cart.js'
import course from '../slices/course.js'
const rootReducer =  combineReducers({
  auth:auth,
  profile:profile,
  cart:cart,
  course:course
})

export default rootReducer;
