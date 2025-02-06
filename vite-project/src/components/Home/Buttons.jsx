import React from 'react'
import { Link } from 'react-router-dom'

function Buttons({
    children,
    active,
    linkto,
    color
}) {
  return (
   <Link to={linkto}>
        <div className={`text-center text-lg font-semibold px-6 py-3 rounded-md ${active ? "bg-yellow-300 text-slate-800":"bg-slate-700"} transition-all duration-200 hover:scale-95 ${color} `}>
            {children}
        </div>
   </Link>
  )
}

export default Buttons
