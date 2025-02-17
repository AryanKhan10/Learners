import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotaaAmmount from './RenderTotaaAmmount'

function Cart() {
    const {total, totalItems} = useSelector(state=>state.cart)
  return (
    <div>
      <h1>Your Cart</h1>
    {
        total >0? (
            <div>
                <RenderCartCourses/>
                <RenderTotaaAmmount/>
            </div>
        ):(
            <p>Your Cart is Empty</p>
        )
    }
    </div>
  )
}

export default Cart
