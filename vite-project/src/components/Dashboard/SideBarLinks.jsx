import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

function SideBarLinks({ link }) {
  const location = useLocation();
  const dispatch = useDispatch();
  return (
    <NavLink
      id={link.id}
      to={link.path}
      className={`flex items-center gap-2 px-4 py-4 text-sm font-medium transition-all duration-200
                ${
                  link.path === location.pathname
                    ? "bg-blue-900/50 border-l-4 border-blue-400 text-blue-400"
                    : "text-gray-400 hover:bg-blue-900/30 hover:text-blue-300"
                }`}
    >
                  <span className=" group flex justify-center items-center gap-5 h-4">
                {link.icon}
                <div className="w-[130px] hidden group-hover:inline sm:group-hover:hidden bg-blue-900/30 py-2 px-2">
                    {link.name}
                </div>
            </span>

      <span className="hidden sm:inline">{link.name}</span>
    </NavLink>
  );
}

export default SideBarLinks;
