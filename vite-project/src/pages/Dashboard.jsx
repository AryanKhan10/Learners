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
    <div className='sidebar flex gap-2 lg:gap-16'>
      <SideBar/>

        {/* we don't know which page to show */}
      <div className="ml-10 sm:ml-60 md:ml-72 me-3"> 
        <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard
