import React from 'react'
import { useSelector } from 'react-redux'
import Login from './Login'
import Signup from './Signup'
function Template({formType}) {
    const {loading} = useSelector(state => state.auth.loading)
  return (
    <div>
      {                                        
        formType === "login" ? ( <Login/> ) : ( <Signup/> )
      }
    </div>
  )
}

export default Template
