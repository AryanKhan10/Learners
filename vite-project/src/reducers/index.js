import { combineReducers } from '@reduxjs/toolkit'
import auth from '../slices/auth.js'
import profile from '../slices/profile.js'
import cart from '../slices/cart.js'
const rootReducer =  combineReducers({
  auth:auth,
  profile:profile,
  cart:cart,
})

export default rootReducer;
