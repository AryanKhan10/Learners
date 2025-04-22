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
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <div className="w-64 lg:w-72 flex-shrink-0">
        <SideBar />
      </div>

      {/* Main content area */}
      <div className="md:w-full ms-10  md:ms-0 overflow-auto p-4 justify-end">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
