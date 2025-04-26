import React, { useState } from 'react'
import { CircleUser, LayoutDashboard, BookOpenText, Plus, ExternalLink, ShoppingBag, LogOut, Settings } from "lucide-react"
// import {sidebar} from '../../data/Dashboard'
import { useDispatch, useSelector } from 'react-redux'
import SideBarLinks from './SideBarLinks'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../services/authApi'
import ConfirmationModal from '../ConfirmationModal'

const SideBar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sidebar = [
        {
            id:1,
            name: "My Profile",
            path: "/dashboard/profile",
            icon: <CircleUser />
        },
        {
            id:2,
            name: "Dashboard",
            path: "/dashboard/instructor",
            type:"Instructor",
            icon:<LayoutDashboard />
        },
        {
            id:3,
            name: "My Courses",
            path: "/dashboard/my-courses",
            type:"Instructor",
            icon: <BookOpenText />
        },
        {
            id:4,
            name: "Add Course",
            path: "/dashboard/add-course",
            type:"Instructor",
            icon: <Plus />
        },
        {
            id:5,
            name: "Enrolled Courses",
            path: "/dashboard/enrolled-courses",
            type:"Student",
            icon: <ExternalLink />
        },
        {
            id:6,
            name: "Cart",
            path: "/dashboard/cart",
            type:"Student",
            icon: <ShoppingBag />
        },
  ]
  const { loading:authloading} = useSelector(state=>state.auth)
    const {user, loading:profileloading} = useSelector(state=>state.profile)
    const [confirmationModal, setConfirmationModal] = useState(null)

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
   <>
      <div className="fixed  top-[4.6rem]  left-0 h-screen md:h-auto md:min-h-screen w-16 md:w-64 bg-[#0c2641] flex flex-col pt-7 justify-start shadow-lg z-10">
        <div className="flex flex-col space-y-2">
          {sidebar.map((link, index) => {
            if (link.type && user?.accountType !== link.type) return null
            return <SideBarLinks key={index} link={link} />
          })}
        </div>
        <div className="mt-6 flex flex-col space-y-2">
          <SideBarLinks link={{ name: "Settings", icon: <Settings />, path: "/dashboard/settings" }} />

          <button
            className="text-gray-400 px-4 mt-2 gap-2 text-sm font-medium flex justify-start items-center hover:bg-gray-700 hover:text-white py-2 rounded-md transition-colors"
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <p className="hidden md:block">Logout</p>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal data={confirmationModal} />}
    </>
  )
}

export default SideBar
