import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/Dashboard/SideBar'
function Dashboard() {
    const {loading:authloading} = useSelector(state=>state.auth)
    const {loading:profileloading} = useSelector(state=>state.profile)

    if(authloading || profileloading){
        return(
            <div className="spinner mx-auto">
          <div></div>   
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
          <div></div>    
        </div>
        )
    }
  return (
    <div className='sidebar flex justify-center sm:gap-16 lg:gap-0'>
      <div className='xsm:w-3/12'>

      <SideBar/>
      </div>

        {/* we don't know which page to show */}
      <div className="w-9/12 mx-2 flex "> 
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard
