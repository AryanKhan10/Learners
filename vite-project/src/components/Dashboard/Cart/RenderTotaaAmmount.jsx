import React from 'react'
import { useSelector } from 'react-redux'

function RenderTotaaAmmount() {
    const {total} = useSelector(state=>state.cart)
    const handleBuyCourse =()=>{
        
    }
  return (
    <div>
        <p>Total:</p>
        <p>Rs {total}</p>
        <button onClick={handleBuyCourse} className=''>
            Buy Now
        </button>
    </div>
  )
}

export default RenderTotaaAmmount
