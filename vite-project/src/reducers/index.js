import { combineReducers } from '@reduxjs/toolkit'
import auth from '../slices/auth.js'
import profile from '../slices/profile.js'
import cart from '../slices/cart.js'
import course from '../slices/course.js'
import viewCourse from '../slices/viewCourse.js'
import enrolled from '../slices/enrolled.js'

const rootReducer =  combineReducers({
  auth,
  profile,
  cart,
  course,
  enrolled,
  viewCourse
})

export default rootReducer;
