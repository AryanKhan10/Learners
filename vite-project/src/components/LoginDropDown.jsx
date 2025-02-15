import React from 'react'
import { logout } from "../services/authApi.js";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { LogOut } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
function LoginDropDown() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  return (
    <div className='bg-gray-800 rounded-md'>
                <Link to={'/dashboard/profile'}
                        className="flex cursor-pointer  gap-1 justify-around w-full px-4 py-2 hover:bg-gray-900 transition-all duration-200 rounded-md">
                
                <LayoutDashboard/>
                    dashboard
                </Link>
                <button 
                        onClick={()=>dispatch(logout(navigate))}
                        className="flex cursor-pointer  gap-1 justify-around w-full px-4 py-2 hover:bg-gray-900 transition-all duration-200 rounded-md">
                            <LogOut />
                    LogOut
                </button>
    </div>
  )
}

export default LoginDropDown
